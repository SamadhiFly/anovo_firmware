#!/bin/bash

#~ iii_vlan_tag=$(uci get networkmode.networkmode.tag)
#~ networkmode=$(uci get networkmode.networkmode.networkmode)
#~ if [ "$networkmode" == 2 ];then
	#~ #三层access模式
	#~ if [ $iii_vlan_tag == 1 ];then
		#~ firewall_ruln=$(uci show /etc/config/firewall | grep redirect | wc -l)
		#~ i=0

		#~ while [[ "$i" -lt "$firewall_ruln" ]]
		#~ do
			#~ let "i+=1"
			#~ num=$(uci show /etc/config/firewall | grep redirect | sed -n "$i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
			#~ uci set firewall.$num.enabled=0
		#~ done


		#~ uci set firewall.@zone[1].masq=0
		#~ uci set firewall.@defaults[0].forward=ACCEPT
		#~ uci set firewall.@zone[1].forward=ACCEPT
		#~ uci commit firewall
		#~ uci set switch_redirect.redirect_set.switch=0
		#~ uci commit switch_redirect
		
		#~ num=$(uci show vrfvlanconfig | grep vid |grep -v vmap_sys_vid| awk -F[\'] '{print $2}')	
		#~ if [ "$(uci show firewall |grep ' wan$num' | wc -l)" -eq "0" ]; then
			#~ uci set	firewall.wan$num=zone
			#~ uci set	firewall.wan$num.name=wan$num
			#~ uci set	firewall.wan$num.network=wan$num
			#~ uci set	firewall.wan$num.input=ACCEPT
			#~ uci set	firewall.wan$num.output=ACCEPT			
			#~ uci set	firewall.wan$num.mtu_fix=1
		#~ fi
		#~ uci set	firewall.wan$num.forward=ACCEPT
		#~ uci set	firewall.wan$num.masq=0
		#~ uci commit firewall		
		#~ /etc/init.d/firewall stop
		#~ /etc/init.d/firewall restart
		#~ sh /rcst/rcst_sh/nat_config.sh > /dev/null
		#~ iptables -t nat -D zone_wan_postrouting -m comment --comment "!fw3" -j MASQUERADE	
		#~ iptables -t nat -D zone_wan"$num"_postrouting -m comment --comment "!fw3" -j MASQUERADE		
	#~ else
	
		#trunk vlan mast close firewall.@zone[1].masq zone_wan_postrouting -m comment --comment "!fw3" -j MASQUERADE
		uci set switch_redirect.redirect_set.switch=0
		uci commit switch_redirect
		iptables -t nat -D zone_wan_postrouting -m comment --comment "!fw3" -j MASQUERADE
		
		firewall_ruln=$(uci show /etc/config/firewall | grep redirect | grep _vlannat_trunk | wc -l)
		i=0
		while [[ "$i" -lt "$firewall_ruln" ]]
		do
			let "i+=1"
			num=$(uci show /etc/config/firewall | grep redirect | grep _vlannat_trunk | sed -n "$i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
			vlanid_temp=$(echo $num | awk -F[_] '{print $4}')
			uci set firewall.$num.enabled=$(uci get switch_redirect.$vlanid_temp.switch)

		done
		uci commit firewall
		
		nat_vlanswitch_cnt=$(uci show /etc/config/switch_redirect | grep vlanid | wc -l)
		j=0
		while [[ "$j" -lt "$nat_vlanswitch_cnt" ]]
		do
			let "j+=1"
			num=$(uci show /etc/config/switch_redirect | grep vlanid | sed -n "$j"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
			#~ uci set switch_redirect.$num.switch=0
			#~ uci commit switch_redirect

			vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
			i=0
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
				wanvrfgateway=$(uci get vrfvlanconfig.vlan$i.wanvrfgateway)
				vmap_switch=$(uci get vrfvlanconfig.vlan$i.vmap_switch)
				vid=$(uci get vrfvlanconfig.vlan$i.vid)
				vmap_sys_vid=$(uci get vrfvlanconfig.vlan$i.vmap_sys_vid)

				if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
							##二三层混合模式
					if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ]  ;then				
						echo "eth$eth_interface network is two-three mixed-mode cur is three_layer need two config"
					else
						if [ "$num" == "$vid" ] ; then
							if [ "$tag" != 0 ];then ##三层网络access
								if [ "$eth_interface" == "0" ];then 
									if [ "$(uci show network | grep -w lan | wc -l)" != "0" ];then 

										if [ "$(uci show firewall |grep ' wan$num' | wc -l)" -eq "0" ]; then
											uci set	firewall.wan$num=zone
											uci set	firewall.wan$num.name=wan$num
											uci set	firewall.wan$num.network=wan$num
											uci set	firewall.wan$num.input=ACCEPT
											uci set	firewall.wan$num.output=ACCEPT			
											uci set	firewall.wan$num.mtu_fix=1
										fi
									fi
								else 
									if [ "$(uci show network | grep -w lan$eth_interface | wc -l)" != "0" ];then 
		
										if [ "$(uci show firewall |grep ' wan$num' | wc -l)" -eq "0" ]; then
											uci set	firewall.wan$num=zone
											uci set	firewall.wan$num.name=wan$num
											uci set	firewall.wan$num.network=wan$num
											uci set	firewall.wan$num.input=ACCEPT
											uci set	firewall.wan$num.output=ACCEPT			
											uci set	firewall.wan$num.mtu_fix=1
										fi
									fi

								fi			
							else #三层网络trunk
								if [ "$(uci show network | grep -w lan$num | wc -l)" != "0" ];then 
									if [ "$(uci show firewall |grep 'firewall.$num' | wc -l)" -eq "0" ]; then
										uci set	firewall.$num=forwarding
										uci set	firewall.$num.src=lan$num
										uci set	firewall.$num.dest=wan$num
										
									fi
									if [ "$(uci show firewall |grep ' lan$num' | wc -l)" -eq "0" ]; then
										uci set	firewall.lan$num=zone
										uci set	firewall.lan$num.name=lan$num
										uci set	firewall.lan$num.network=lan$num
										uci set	firewall.lan$num.output=ACCEPT
										uci set	firewall.lan$num.forward=ACCEPT
									fi
									
									if [ "$(uci show firewall |grep ' wan$num' | wc -l)" -eq "0" ]; then
										uci set	firewall.wan$num=zone
										uci set	firewall.wan$num.name=wan$num
										uci set	firewall.wan$num.network=wan$num
										uci set	firewall.wan$num.input=ACCEPT
										uci set	firewall.wan$num.output=ACCEPT			
										uci set	firewall.wan$num.mtu_fix=1
									fi
								fi

							fi #if [ "$tag" != 0 ];then
						fi #if [ "$vlanid" == "$vid" ] ; then

					fi ##二三层混合模式
				fi	 #if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
					
			done
			
			uci set	firewall.wan$num.forward=ACCEPT
			uci set	firewall.wan$num.masq=0
			uci commit firewall
		done

		uci set firewall.@defaults[0].forward=ACCEPT
		uci set firewall.@zone[1].forward=ACCEPT
		uci commit firewall
		/etc/init.d/firewall stop
		/etc/init.d/firewall restart
		sh /rcst/rcst_sh/nat_config.sh > /dev/null

		j=0

		while [[ "$i" -lt "$nat_vlanswitch_cnt" ]]
		do
			let "j+=1"
			num=$(uci show /etc/config/switch_redirect | grep vlanid | sed -n "$j"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
			#~ uci set switch_redirect.$num.switch=0
			#~ uci commit switch_redirect

			vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
			i=0
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
				wanvrfgateway=$(uci get vrfvlanconfig.vlan$i.wanvrfgateway)
				vmap_switch=$(uci get vrfvlanconfig.vlan$i.vmap_switch)
				vid=$(uci get vrfvlanconfig.vlan$i.vid)
				vmap_sys_vid=$(uci get vrfvlanconfig.vlan$i.vmap_sys_vid)

				if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
							##二三层混合模式
					if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ]  ;then				
						echo "eth$eth_interface network is two-three mixed-mode cur is three_layer need two config"
					else
						if [ "$num" == "$vid" ] ; then
							if [ "$tag" != 0 ];then ##三层网络access
								if [ "$eth_interface" == "0" ];then 
									if [ "$(uci show network | grep -w lan | wc -l)" != "0" ];then 

										if [ "$(uci show firewall |grep ' wan$num' | wc -l)" -eq "0" ]; then
											uci set	firewall.wan$num=zone
											uci set	firewall.wan$num.name=wan$num
											uci set	firewall.wan$num.network=wan$num
											uci set	firewall.wan$num.input=ACCEPT
											uci set	firewall.wan$num.output=ACCEPT			
											uci set	firewall.wan$num.mtu_fix=1
										fi
									fi
								else 
									if [ "$(uci show network | grep -w lan$eth_interface | wc -l)" != "0" ];then 
		
										if [ "$(uci show firewall |grep ' wan$num' | wc -l)" -eq "0" ]; then
											uci set	firewall.wan$num=zone
											uci set	firewall.wan$num.name=wan$num
											uci set	firewall.wan$num.network=wan$num
											uci set	firewall.wan$num.input=ACCEPT
											uci set	firewall.wan$num.output=ACCEPT			
											uci set	firewall.wan$num.mtu_fix=1
										fi
									fi

								fi			
							else #三层网络trunk
								if [ "$(uci show network | grep -w lan$num | wc -l)" != "0" ];then 
									if [ "$(uci show firewall |grep 'firewall.$num' | wc -l)" -eq "0" ]; then
										uci set	firewall.$num=forwarding
										uci set	firewall.$num.src=lan$num
										uci set	firewall.$num.dest=wan$num
										
									fi
									if [ "$(uci show firewall |grep ' lan$num' | wc -l)" -eq "0" ]; then
										uci set	firewall.lan$num=zone
										uci set	firewall.lan$num.name=lan$num
										uci set	firewall.lan$num.network=lan$num
										uci set	firewall.lan$num.output=ACCEPT
										uci set	firewall.lan$num.forward=ACCEPT
									fi
									
									if [ "$(uci show firewall |grep ' wan$num' | wc -l)" -eq "0" ]; then
										uci set	firewall.wan$num=zone
										uci set	firewall.wan$num.name=wan$num
										uci set	firewall.wan$num.network=wan$num
										uci set	firewall.wan$num.input=ACCEPT
										uci set	firewall.wan$num.output=ACCEPT			
										uci set	firewall.wan$num.mtu_fix=1
									fi
								fi

							fi #if [ "$tag" != 0 ];then
						fi #if [ "$vlanid" == "$vid" ] ; then

					fi ##二三层混合模式
				fi	 #if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
					
			done
			
			uci set	firewall.wan$num.forward=ACCEPT
			uci set	firewall.wan$num.masq=0
			uci commit firewall
		done

		uci set firewall.@defaults[0].forward=ACCEPT
		uci set firewall.@zone[1].forward=ACCEPT
		uci commit firewall
		/etc/init.d/firewall stop
		/etc/init.d/firewall restart
		sh /rcst/rcst_sh/nat_config.sh > /dev/null

