#!/bin/bash
syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info del_vrf"[$(ps | grep del_vrf.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

#~ lanvlan_cnt=$(uci show network |grep "lan" | grep =interface | wc -l)
#~ echo $lanvlan_cnt
#~ i=0
#~ if [ "$lanvlan_cnt" != "1" ];then
	#~ while [[ "$i" -lt "$lanvlan_cnt" ]]
	#~ do
	#~ let "i+=1"
	#~ echo $i
	#~ num_lan=$(cat /etc/config/network |grep lan | grep interface |sed -n "$i"p | awk -F[\'] '{print $2}')
	#~ echo $num_lan
	#~ if [ "$num_lan" != "lan" ];then
		#~ uci del network.$num_lan
		#~ uci commit network
	#~ fi
	#~ done
#~ fi


#~ wanvlan_cnt=$(uci show network |grep wan | grep =interface | wc -l)
#~ echo $wanvlan_cnt
#~ i=0
#~ if [ "$wanvlan_cnt" != "1" ];then
	#~ while [[ "$i" -lt "$wanvlan_cnt" ]]
	#~ do
		#~ let "i+=1"
		#~ num_wan=$(uci show network |grep wan | grep =interface | awk -F[=] '{print $1}' | awk -F[.] '{print $2}' |sed -n "$i"p)
		#~ echo $i
		#~ echo $num_wan
		#~ if [ "$num_wan" != "wan" ];then
			#~ uci del network.$num_wan
			#~ uci commit network
		#~ fi
	#~ done	
#~ fi

interface_lan_name=$(uci get network.lan.ifname)
vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
i=0

iii_vlan_tag=$(uci get vrfvlanconfig.mode.tag)
networkmode=$(uci get networkmode.networkmode.networkmode)

if [ "$networkmode" == 2 ];then
	#三层access模式
	if [ "$iii_vlan_tag" == 1 ];then
			if [ "$vlannum" == 1 ];then
				vid=$(uci get vrfvlanconfig.vlan1.vid)
				wanvrfip=$(uci get vrfvlanconfig.vlan1.wanvrfip)
				wanvrfnetmask=$(uci get vrfvlanconfig.vlan1.wanvrfnetmask)
				wanvrfgateway=$(uci get vrfvlanconfig.vlan1.wanvrfgateway)

				route del default gw $wanvrfgateway dev sn0.$vid
				ifconfig sn0.$vid down
				vconfig rem sn0.$vid
				if [ "$vid" ];then
					uci del network.wan$vid
					uci commit network
				fi
			else
				syslog_sh "warning-->>del_vrf III access vlannum:$vlannum != 1....!"
			fi
	else
		while [[ "$i" -lt "$vlannum" ]]
		do
			let "i+=1"
			#~ vmap_switch=$(uci get vrfvlanconfig.vlan$i.vmap_switch)
			#~ if [ $vmap_switch != 0 ];then
				#~ vid=$(uci get vrfvlanconfig.vlan$i.vmap_user_vlan)
			#~ else
				#~ vid=$(uci get vrfvlanconfig.vlan$i.vid)
			#~ fi
			vid=$(uci get vrfvlanconfig.vlan$i.vid)
			wanvrfgateway=$(uci get vrfvlanconfig.vlan$i.wanvrfgateway)

			route del default gw $wanvrfgateway dev sn0.$vid
			route del -net  224.0.0.13/32 dev $interface_lan_name.$vid

			ip link set dev $interface_lan_name.$vid nomaster
			ip link set dev sn0.$vid nomaster
			ip link set dev vrf_test$vid down
			ip link del vrf_test$vid type vrf table $i

			ifconfig $interface_lan_name.$vid down
			ifconfig sn0.$vid down
			vconfig rem $interface_lan_name.$vid
			vconfig rem sn0.$vid
			if [ "$vid" ];then
				uci del network.lan$vid
				uci del network.wan$vid
				uci commit network
			fi
		done
	fi
        tun_num=$(ip tunnel show | grep tun | wc -l)
        i=0
        while [[ "$i" -lt "$tun_num" ]]
        do
                let "i+=1"
                echo $i
                tunname=$(ip tunnel show | grep tun | awk -F[:] '{print $1}' | tail -n 1)
                echo tunname:$tunname
                ip tunnel del $tunname
        done

	
fi
