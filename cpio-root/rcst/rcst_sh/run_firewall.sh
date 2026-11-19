#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info run_newnetwork_config"[$(ps | grep run_newnetwork_config.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

rcst_type=$(cat /mnt/rcst_type)
p2p_flag=$(uci get rf_tx.rf_tx_config.rf_tx_type)
if [ "$rcst_type" = "1" ] && [ "$p2p_flag" = "1" ]; then
	syslog_sh "rcst_type:$rcst_type p2p_flag:$p2p_flag donot need noting"
else
vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
mtu=$(uci get networkmode.networkmode.mtu)
if [ "$mtu" == 0 ];then
	mtu=1500
fi
vlan_exit_flag=0
i=0

local_rcst_mac=$(cat /etc/config/rcst_mac | grep rcst_mac | awk '{print $2":"$3":"$4":"$5":"$6":"$7}')
acu_ip=$(uci get satellite_config.satellite.src_ip)
brlan100_default_ip=$(uci get networkmode.networkmode.default_ip)
networkmode_type_exit_flag=0  #网口断当前配置是否和之前配置一致 0:不一致 1一致


if [ "$vlannum" != 0 ] ; then
while [[ "$i" -lt "$vlannum" ]]
do
		let "i+=1"
			if [ "$(uci show vrfvlanconfig.vlan$i | grep eth_interface | wc -l)" == 0 ] ; then
				eth_interface=0
				echo "netowrk config default i:$i eth_interface:$eth_interface"
			else
				eth_interface=$(uci get vrfvlanconfig.vlan$i.eth_interface)
			fi
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
			vmap_switch=$(uci get vrfvlanconfig.vlan$i.vmap_switch)

			vid=$(uci get vrfvlanconfig.vlan$i.vid)
			if [ -z $vid  ] ; then
				echo  "4.0 uci get vrfvlanconfig.vlan$i.vid is null" >> /mnt/rcst_log/abridged_log.txt
				syslog_sh  "4.0 uci get vrfvlanconfig.vlan$i.vid is null"
				vid=50
				let "vid+=$i"
			fi
			vmap_sys_vid=$(uci get vrfvlanconfig.vlan$i.vmap_sys_vid)
			if [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ] ; then
				lanvrfip=$(uci get network.lan.ipaddr)
				echo "netowrk config default i:$i lanvrfip:$lanvrfip"
			else
				lanvrfip=$(uci get vrfvlanconfig.vlan$i.lanvrfip)
			fi

			if [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfnetmask | wc -l)" == 0 ] ; then
				lanvrfnetmask=$(uci get network.lan.netmask)
				echo "netowrk config default i:$i lanvrfnetmask:$lanvrfnetmask"
			else
				lanvrfnetmask=$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask)
			fi
			
			#lanvrfnetmask=$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask)
			wanvrfip=$(uci get vrfvlanconfig.vlan$i.wanvrfip)
			wanvrfnetmask=$(uci get vrfvlanconfig.vlan$i.wanvrfnetmask)
			wanvrfgateway=$(uci get vrfvlanconfig.vlan$i.wanvrfgateway)
			
			
			ifname=$(uci get vrfvlanconfig.vlan$i.ifname)						
			wan_ip=$(uci get network.wan.ipaddr)
			wan_netmask=$(uci get network.wan.netmask)
			gateway=$(uci get networkmode.networkmode.defaultgw)
			echo "netowrk config i:$i vlannum:$vlannum"

			echo "netowrk config network_type:$network_type 
			eth_interface:$eth_interface 
			tag:$tag 
			vmap_switch:$vmap_switch 
			vid:$vid 
			vmap_sys_vid:$vmap_sys_vid 
			lanvrfip:$lanvrfip 
			lanvrfnetmask:$lanvrfnetmask 
			wanvrfip:$wanvrfip 
			wanvrfnetmask:$wanvrfnetmask 
			wanvrfgateway:$wanvrfgateway "
			
			
			echo "netowrk config ifname:$ifname
			wan_ip:$wan_ip 
			wan_netmask:$wan_netmask 
			gateway:$gateway"
			
		if [ "$networkmode_type_exit_flag" == 0 ];then
			#三层网络
			if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
						##二三层混合模式
				if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ]  ;then				
					echo "eth$eth_interface network is two-three mixed-mode cur is three_layer need two config"
				else
					echo "三层网络:$network_type $tag"	
					if [ "$tag" != 0 ];then ##三层网络access
						echo "三层网络access:$network_type $tag start"
						iptables -t raw -D zone_wan"$vid"_helper -p tcp -i sn0.$vid --dst $wanvrfip -j DROP
						iptables -t raw -D zone_wan"$vid"_helper -p tcp -i sn0.$vid --dst $lanvrfip -j DROP
						iptables -t raw -I zone_wan"$vid"_helper -p tcp -i sn0.$vid --dst $wanvrfip -j DROP
						iptables -t raw -I zone_wan"$vid"_helper -p tcp -i sn0.$vid --dst $lanvrfip -j DROP								
																																							
						echo "三层网络access:$network_type $tag end"		
					else ##三层网络trunk
						echo "三层网络trunk:$network_type $tag start"
						if [ $vid != 0 ];then
							iptables -t raw -D zone_wan"$vid"_helper -p tcp -i sn0.$vid --dst $wanvrfip -j DROP
							iptables -t raw -D zone_wan"$vid"_helper -p tcp -i sn0.$vid --dst $lanvrfip -j DROP
							iptables -t raw -I zone_wan"$vid"_helper -p tcp -i sn0.$vid --dst $wanvrfip -j DROP
							iptables -t raw -I zone_wan"$vid"_helper -p tcp -i sn0.$vid --dst $lanvrfip -j DROP
							echo "三层网络trunk:$network_type $tag end"																
						fi ###三层网络trunk if [ $vid != 0 ];then
					fi #if [ "$tag" == 1 ];then ##三层网络access
				fi ##二三层混合模式
				
			fi  
					
		fi ##if [ "$networkmode_type_exit_flag" == 0 ];then
		##记录网口配置

done

fi

nms_ip=$(uci get update.dst_ip.ip_addr)
wan_ip=$(uci get network.wan.ipaddr)
iptables -t raw -D zone_wan_helper -p tcp -i sn0 --src $nms_ip/24 -j ACCEPT
iptables -t raw -D zone_wan_helper -p tcp -i sn0 --dst $wan_ip -j DROP
iptables -t raw -I zone_wan_helper -p tcp -i sn0 --src $nms_ip/24 -j ACCEPT
iptables -t raw -A zone_wan_helper -p tcp -i sn0 --dst $wan_ip -j DROP
fi
