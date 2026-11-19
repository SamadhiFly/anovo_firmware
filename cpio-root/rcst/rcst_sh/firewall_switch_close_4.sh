#!/bin/bash

#~ iii_vlan_tag=$(uci get networkmode.networkmode.tag)
#~ networkmode=$(uci get networkmode.networkmode.networkmode)
#~ if [ "$networkmode" == 2 ];then
	#三层access模式
	#~ if [ $iii_vlan_tag == 1 ];then
		#~ num=$(uci show vrfvlanconfig | grep vid |grep -v vmap_sys_vid| awk -F[\'] '{print $2}')	
		#~ if [ "$(uci show firewall |grep ' wan$num' | wc -l)" -eq "0" ]; then
			#~ uci set	firewall.wan$num=zone
			#~ uci set	firewall.wan$num.name=wan$num
			#~ uci set	firewall.wan$num.network=wan$num
			#~ uci set	firewall.wan$num.input=ACCEPT
			#~ uci set	firewall.wan$num.output=ACCEPT			
			#~ uci set	firewall.wan$num.mtu_fix=1
			#~ uci set	firewall.wan$num.forward=ACCEPT
			#~ uci set	firewall.wan$num.masq=1
			#~ uci commit firewall			
		#~ fi

		#~ firewall_ruln=$(uci show /etc/config/firewall | grep rule | wc -l)
		#~ i=0

		#~ while [[ "$i" -lt "$firewall_ruln" ]]
		#~ do
			#~ let "i+=1"
			#~ num=$(uci show /etc/config/firewall | grep rule  | grep -v ']' | sed -n "$i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
			#~ uci set firewall.$num.enabled=0
		#~ done	

		#~ uci set switch_redirect.redirect_set.firewall_switch=0

		#~ uci commit firewall
		#~ uci commit switch_redirect
		#~ /etc/init.d/firewall stop
		#~ /etc/init.d/firewall restart
	#~ else
		uci set switch_redirect.redirect_set.firewall_switch=0
		uci commit switch_redirect
		firewall_ruln=$(uci show /etc/config/firewall | grep rule | grep _vlanfirewall_trunk | wc -l)
		i=0
		while [[ "$i" -lt "$firewall_ruln" ]]
		do
			let "i+=1"
			num=$(uci show /etc/config/firewall | grep rule | grep _vlanfirewall_trunk | sed -n "$i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
			vlanid_temp=$( echo $num | awk -F[_] '{print $4}')
			uci set firewall.$num.enabled=$(uci get switch_redirect.$vlanid_temp.firewall_switch)
	
		done
		uci commit firewall

		bridgenfcalliptables_flag=0

		vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
		i=0
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
			wanvrfgateway=$(uci get vrfvlanconfig.vlan$i.wanvrfgateway)
			vmap_switch=$(uci get vrfvlanconfig.vlan$i.vmap_switch)
			vid=$(uci get vrfvlanconfig.vlan$i.vid)
			vmap_sys_vid=$(uci get vrfvlanconfig.vlan$i.vmap_sys_vid)
			if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
				if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ]  ;then	
					if  [ "$(uci get switch_redirect.$vid.firewall_switch)" == 1 ]  ;then
						bridgenfcalliptables_flag=1
					fi
				fi
			elif  [ "$network_type" == 1 ]  ;then
				if  [ "$(uci get switch_redirect.$vid.firewall_switch)" == 1 ]  ;then
					bridgenfcalliptables_flag=1
				fi		
			fi
		done
		
		if  [ "$bridgenfcalliptables_flag" == 1 ]  ;then
			echo 1 > /proc/sys/net/bridge/bridge-nf-call-iptables
		else
			echo 0 > /proc/sys/net/bridge/bridge-nf-call-iptables
		fi	
		
		#~ nat_vlanswitch_cnt=$(uci show /etc/config/switch_redirect | grep vlanid | wc -l)
		#~ i=0

		#~ while [[ "$i" -lt "$nat_vlanswitch_cnt" ]]
		#~ do
			#~ let "i+=1"
			#~ num=$(uci show /etc/config/switch_redirect | grep vlanid | sed -n "$i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
			#~ uci set switch_redirect.$num.firewall_switch=0
			#~ uci commit switch_redirect

		#~ done
		

		/etc/init.d/firewall stop
		/etc/init.d/firewall restart
	#~ fi
#~ fi
