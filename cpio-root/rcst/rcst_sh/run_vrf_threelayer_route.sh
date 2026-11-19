#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info run_vrf"[$(ps | grep run_vrf.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

interface_lan_name=$(uci get network.lan.ifname)
vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
mtu=$(uci get networkmode.networkmode.mtu)
if [ "$mtu" == 0 ];then
	mtu=1600
fi
vlan_exit_flag=0
i=0
#networkmode=$(uci get networkmode.networkmode.networkmode)
#iii_vlan_tag=$(uci get networkmode.networkmode.tag)

#~ if [ "$networkmode" == 2 ];then
	#~ if [ $iii_vlan_tag == 0 ];then
	#三层trunk模式
		lanip=$(ifconfig br-lan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		if [ ! "$lanip" ];then
			ifconfig br-lan $(uci get network.lan.ipaddr) netmask $(uci get network.lan.netmask) mtu $mtu up
		fi
		while [[ "$i" -lt "$vlannum" ]]
		do
			let "i+=1"
			if [ "$(uci show vrfvlanconfig.vlan$i | grep network_type | wc -l)" == 0 ] ; then
				network_type=$(uci get networkmode.networkmode.networkmode)
				echo "netowrk config default i:$i network_type:$network_type"
			else
				network_type=$(uci get vrfvlanconfig.vlan$i.network_type)
			fi
			if [ "$(uci show vrfvlanconfig.vlan$i | grep tag | wc -l)" == 0 ] ; then
				tag=$(uci get vrfvlanconfig.mode.tag)
				echo "netowrk config default i:$i tag:$tag"
			else
				tag=$(uci get vrfvlanconfig.vlan$i.tag)
			fi				
			vid=$(uci get vrfvlanconfig.vlan$i.vid)
			lanvrfip=$(uci get vrfvlanconfig.vlan$i.lanvrfip)
			lanvrfnetmask=$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask)
			lanvrfmac=$(uci get vrfvlanconfig.vlan$i.lanvrfmac)
			wanvrfip=$(uci get vrfvlanconfig.vlan$i.wanvrfip)
			wanvrfnetmask=$(uci get vrfvlanconfig.vlan$i.wanvrfnetmask)
			wanvrfgateway=$(uci get vrfvlanconfig.vlan$i.wanvrfgateway)
			wanvrfmac=$(uci get vrfvlanconfig.vlan$i.wanvrfmac)

			echo $vid $lanvrfip $lanvrfnetmask $lanvrfmac $wanvrfip $wanvrfnetmask $wanvrfgateway $wanvrfmac >> /tmp/run_vrf_threelayer_route
			if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
						##二三层混合模式
				if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ]  ;then				
					echo "eth$eth_interface network is two-three mixed-mode cur is three_layer need two config"
				else
					if [ $vid != 0 ];then
						if [ "$(route -n |grep $wanvrfgateway | wc -l)" == 0 ];then
							route add default gw $wanvrfgateway dev sn0.$vid
							echo "route add default gw $wanvrfgateway dev sn0.$vid" >> /tmp/run_vrf_threelayer_route
						fi
						route add -net  224.0.0.13/32 dev $interface_lan_name.$vid	
						echo "route add -net  224.0.0.13/32 dev $interface_lan_name.$vid	" >> /tmp/run_vrf_threelayer_route
					fi #if [ $vid != 0 ];then
				fi ##二三层混合模式
			fi	#if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
		done
	#~ fi
	sh /mnt/route_wan_add.sh
#~ fi

