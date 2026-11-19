#!/bin/bash
operation_num=$(cat /etc/config/natport_config | grep "operation_tmp " | wc -l)
init_nat() {
		iii_vlan_tag=$(uci get networkmode.networkmode.tag)
		proto=$(uci get natport_config.classify.type_tmp)
		ipaddr=$(uci get natport_config.classify.ipaddr_tmp)
		startport=$(uci get natport_config.classify.startport_tmp)
		endport=$(uci get natport_config.classify.endport_tmp)
		name=$(uci get natport_config.classify.name_tmp)
		vlanid=$(uci get natport_config.classify.vlanid_tmp)
		successid=$(uci get natport_config.classify.comment_tmp)

			#~ if [ $iii_vlan_tag == 1 ];then
				#~ comment="$successid"_"$vlanid"
			#~ else
				comment="$successid"_vlannat_trunk_"$vlanid"			
			#~ fi	
				

			uci set firewall.$comment=redirect
			uci commit firewall

			
			uci set firewall.$comment.dest_ip=$ipaddr
						
			if [ "$proto" = "UDP" ] || [ "$proto" = "udp" ]; then
				uci set firewall.$comment.proto=udp
			elif [ "$proto" = "TCP" ] || [ "$proto" = "tcp" ] ; then
				uci set firewall.$comment.proto=tcp
			elif [ "$proto" = "TCPUDP" ] || [ "$proto" = "tcpudp" ] ; then
				uci set firewall.$comment.proto=tcpudp
			fi

			uci set firewall.$comment.src_dport=$start_port"-"$end_port
			uci set firewall.$comment.dest_port=$start_port"-"$end_port

			uci set firewall.$comment.name=$name
			
			#三层access模式
			#~ if [ $iii_vlan_tag == 1 ];then
				#~ uci set firewall.$comment.src=wan$vlanid
				#~ uci set firewall.$comment.dest=lan
			#~ else
				uci set firewall.$comment.src=wan$vlanid
				uci set firewall.$comment.dest=lan$vlanid
			#~ fi
			uci set firewall.$comment.target=DNAT
			uci set firewall.$comment.enabled=1
					
			uci commit firewall																				
}



del_nat() {
	
			nat_num=$(uci show natport_config.classify | wc -l)
			i=1
			while [[ "$i" -lt "$nat_num" ]]
			do
				uci delete natport_config.classify.$(uci show natport_config.classify |awk -F '[.]+' '{print $3}'| awk -F '[=]+' '{print $1}' | sed -n "2 p")
				let "i=i+1"
				uci commit natport_config
			done
}


add_nat() {
	
	iii_vlan_tag=$(uci get networkmode.networkmode.tag)
	natenable=$(uci get proset.nat_set.switch)
	type_num=$(cat /etc/config/natport_config | grep "type_tmp " | wc -l)
	dest_addr_num=$(cat /etc/config/natport_config | grep "ipaddr_tmp " | wc -l)
	start_port_num=$(cat /etc/config/natport_config | grep "startport_tmp " | wc -l)
	end_port_num=$(cat /etc/config/natport_config | grep "endport_tmp " | wc -l)
	description_num=$(cat /etc/config/natport_config | grep "name_tmp " | wc -l)
	operation_num=$(cat /etc/config/natport_config | grep "operation_tmp " | wc -l)

	comment_num=$(cat /etc/config/natport_config | grep "comment_tmp " | wc -l)
	
#	if [ "$natenable" -eq "1" ] ; then

		if [ "$comment_num" -eq "1" ] ; then
			vlanid=$(uci get natport_config.classify.vlanid_tmp)
			successid=$(uci get natport_config.classify.comment_tmp)

			#~ if [ $iii_vlan_tag == 1 ];then
				#~ comment="$successid"_"$vlanid"
			#~ else
				comment="$successid"_vlannat_trunk_"$vlanid"			
			#~ fi	
			

			uci set firewall.$comment=redirect
			uci commit firewall




			if [ "$dest_addr_num" -eq "1" ] ; then
				dest_addr=$(uci get natport_config.classify.ipaddr_tmp)
				uci set firewall.$comment.dest_ip=$dest_addr
				uci commit firewall

			fi


			if [ "$type_num" -eq "1" ] ; then
				proto=$(uci get natport_config.classify.type_tmp)
				if [ "$proto" = "UDP" ] || [ "$proto" = "udp" ]; then

					uci set firewall.$comment.proto=udp
					uci commit firewall
				elif [ "$proto" = "TCP" ] || [ "$proto" = "tcp" ] ; then

					uci set firewall.$comment.proto=tcp
					uci commit firewall
				elif [ "$proto" = "TCPUDP" ] || [ "$proto" = "tcpudp" ] ; then

					uci set firewall.$comment.proto=tcpudp
					uci commit firewall
				fi

			fi

			if [ "$start_port_num" -eq "1" ] && [ "$end_port_num" -eq "1" ]; then
				start_port=$(uci get natport_config.classify.startport_tmp)
				end_port=$(uci get natport_config.classify.endport_tmp)

				uci set firewall.$comment.src_dport=$start_port"-"$end_port
				uci set firewall.$comment.dest_port=$start_port"-"$end_port
				uci commit firewall

			fi
			if [ "$description_num" -eq "1" ] ; then
				description=$(uci get natport_config.classify.name_tmp)
				uci set firewall.$comment.name=$description
				uci commit firewall

			fi
	
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
						if [ "$vlanid" == "$vid" ] ; then
							if [ "$tag" != 0 ];then ##三层网络access
								if [ "$eth_interface" == "0" ];then
									if [ "$(uci show network | grep -w lan | wc -l)" != "0" ];then  
										uci set firewall.$comment.src=wan$vlanid
										uci set firewall.$comment.dest=lan
									fi
								else 
									if [ "$(uci show network | grep -w lan$eth_interface | wc -l)" != "0" ];then
										uci set firewall.$comment.src=wan$vlanid
										uci set firewall.$comment.dest=lan$eth_interface
									fi	
								fi			
							else #三层网络trunk
								if [ "$(uci show network | grep -w lan$vlanid | wc -l)" != "0" ];then
									uci set firewall.$comment.src=wan$vlanid
									uci set firewall.$comment.dest=lan$vlanid
								fi
							fi #if [ "$tag" != 0 ];then
							
						fi #if [ "$vlanid" == "$vid" ] ; then

					fi ##二三层混合模式
				fi	 #if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
					
			done			
			
			#三层access模式
			#~ if [ $iii_vlan_tag == 1 ];then
				#~ uci set firewall.$comment.src=wan$vlanid
				#~ uci set firewall.$comment.dest=lan
			#~ else
#				uci set firewall.$comment.src=wan$vlanid
#				uci set firewall.$comment.dest=lan$vlanid
			#~ fi
			
			
			
			uci set firewall.$comment.target=DNAT
			uci set firewall.$comment.enabled=1
			uci commit firewall			
		fi
		
#	fi
}

if [ "$operation_num" -eq "1" ] ; then
	operation=$(uci get natport_config.classify.operation_tmp)
	if [ "$operation" -eq "1" ] ; then
		add_nat
		del_nat
		/etc/init.d/firewall stop
		/etc/init.d/firewall restart
		sh /rcst/rcst_sh/tos_set.sh &

		exit 0	

	elif [ "$operation" -eq "0" ] ; then
		iii_vlan_tag=$(uci get networkmode.networkmode.tag)
		vlanid=$(uci get natport_config.classify.vlanid_tmp)
		successid=$(uci get natport_config.classify.comment_tmp)
		#~ if [ $iii_vlan_tag == 1 ];then
			#~ comment="$successid"_"$vlanid"
		#~ else
			comment="$successid"_vlannat_trunk_"$vlanid"			
		#~ fi	
		uci delete firewall.$comment
		uci commit firewall
		del_nat
		/etc/init.d/firewall stop
		/etc/init.d/firewall restart
		sh /rcst/rcst_sh/tos_set.sh &

		exit 0
				
	elif [ "$operation" -eq "2" ] ; then
		iii_vlan_tag=$(uci get networkmode.networkmode.tag)
		vlanid=$(uci get natport_config.classify.vlanid_tmp)
		successid=$(uci get natport_config.classify.comment_tmp)
		#~ if [ $iii_vlan_tag == 1 ];then
			#~ comment="$successid"_"$vlanid"
		#~ else
			comment="$successid"_vlannat_trunk_"$vlanid"			
		#~ fi	
		uci delete firewall.$comment
		uci commit firewall
		add_nat
		del_nat
		/etc/init.d/firewall stop
		/etc/init.d/firewall restart
		sh /rcst/rcst_sh/tos_set.sh &

		exit 0
			
	elif [ "$operation" -eq "3" ] ; then
		
		init_nat
		del_nat
		/etc/init.d/firewall stop
		/etc/init.d/firewall restart
		sh /rcst/rcst_sh/tos_set.sh &

	fi
fi
