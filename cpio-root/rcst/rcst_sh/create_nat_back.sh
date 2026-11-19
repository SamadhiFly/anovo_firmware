#!/bin/bash
operation_num=$(cat /etc/config/natport_config | grep "operation_tmp " | wc -l)
init_nat() {

		proto=$(uci get natport_config.classify.type_tmp)
		dest_addr=$(uci get natport_config.classify.ipaddr_tmp)
		start_port=$(uci get natport_config.classify.startport_tmp)
		end_port=$(uci get natport_config.classify.endport_tmp)
		name=$(uci get natport_config.classify.name_tmp)
		comment=$(uci get natport_config.classify.comment_tmp)

		ip_lan=$(ifconfig eth0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		wan_proto=$(uci get network.wan.proto)
		if [ "$wan_proto" == "static" ]; then
			ip_wan=$(ifconfig sn0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		elif [ "$wan_proto" == "dhcp" ];  then
			ip_wan=$(ifconfig sn0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		elif [ "$wan_proto" == "pppoe" ]; then
			ip_wan=$(ifconfig pppoe-wan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		else
			echo "read wan proto failed!"
		fi
	
			uci set firewall.$comment=redirect

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

			uci set firewall.$comment.src=wan
			uci set firewall.$comment.dest=lan
			uci set firewall.$comment.target=DNAT
			uci set firewall.$comment.enabled=1
					
			uci commit firewall	
			
			if [ "$proto" = "TCPUDP" ] || [ "$proto" = "tcpudp" ] ; then
				iptables -t nat -A PREROUTING -p udp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port
				iptables -t nat -A POSTROUTING  -d $dest_addr/32 -p udp  --dport $start_port:$end_port  -j SNAT --to-source $ip_lan
				iptables -t nat -A PREROUTING  -d $ip_wan/32 -p udp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port	

				
				iptables -t nat -A PREROUTING -p tcp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port
				iptables -t nat -A POSTROUTING  -d $dest_addr/32 -p tcp  --dport $start_port:$end_port  -j SNAT --to-source $ip_lan
				iptables -t nat -A PREROUTING  -d $ip_wan/32 -p tcp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port	
		
			else		
			
				iptables -t nat -A PREROUTING -p $proto  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port
				iptables -t nat -A POSTROUTING  -d $dest_addr/32 -p $proto  --dport $start_port:$end_port  -j SNAT --to-source $ip_lan
				iptables -t nat -A PREROUTING  -d $ip_wan/32 -p $proto  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port	
			fi															
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

	natenable=$(uci get proset.nat_set.switch)
	type_num=$(cat /etc/config/natport_config | grep "type_tmp " | wc -l)
	dest_addr_num=$(cat /etc/config/natport_config | grep "ipaddr_tmp " | wc -l)
	start_port_num=$(cat /etc/config/natport_config | grep "startport_tmp " | wc -l)
	end_port_num=$(cat /etc/config/natport_config | grep "endport_tmp " | wc -l)
	description_num=$(cat /etc/config/natport_config | grep "name_tmp " | wc -l)
	operation_num=$(cat /etc/config/natport_config | grep "operation_tmp " | wc -l)
	comment_num=$(cat /etc/config/natport_config | grep "comment_tmp " | wc -l)
	

	ip_lan=$(ifconfig eth0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	wan_proto=$(uci get network.wan.proto)
	if [ "$wan_proto" == "static" ]; then
		ip_wan=$(ifconfig sn0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	elif [ "$wan_proto" == "dhcp" ];  then
		ip_wan=$(ifconfig sn0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	elif [ "$wan_proto" == "pppoe" ]; then
		ip_wan=$(ifconfig pppoe-wan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	else
		echo "read wan proto failed!"
	fi
	
	if [ "$natenable" -eq "1" ] ; then

		if [ "$comment_num" -eq "1" ] ; then
			comment=$(uci get natport_config.classify.comment_tmp)
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
			uci set firewall.$comment.src=wan
			uci set firewall.$comment.dest=lan
			uci set firewall.$comment.target=DNAT
			uci set firewall.$comment.enabled=1
			uci commit firewall		
			#fou zhanshi tianjia
			if [ "$type_num" -eq "1" ] && [ "$dest_addr_num" -eq "1" ] && [ "$start_port_num" -eq "1" ] && [ "$end_port_num" -eq "1" ] ; then
					
				if [ "$proto" = "TCPUDP" ] || [ "$proto" = "tcpudp" ] ; then		
					iptables -t nat -A PREROUTING -p udp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port
					iptables -t nat -A POSTROUTING  -d $dest_addr/32 -p udp  --dport $start_port:$end_port  -j SNAT --to-source $ip_lan
					iptables -t nat -A PREROUTING  -d $ip_wan/32 -p udp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port	

					iptables -t nat -A PREROUTING -p tcp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port
					iptables -t nat -A POSTROUTING  -d $dest_addr/32 -p tcp  --dport $start_port:$end_port  -j SNAT --to-source $ip_lan
					iptables -t nat -A PREROUTING  -d $ip_wan/32 -p tcp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port	
				else	
					iptables -t nat -A PREROUTING -p $proto  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port
					iptables -t nat -A POSTROUTING  -d $dest_addr/32 -p $proto  --dport $start_port:$end_port  -j SNAT --to-source $ip_lan
					iptables -t nat -A PREROUTING  -d $ip_wan/32 -p $proto  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port	
				fi
			fi
		
				
		fi
		
	fi
}


del_iptables_nat() {

	natenable=$(uci get proset.nat_set.switch)
	comment_num=$(cat /etc/config/natport_config | grep "comment_tmp " | wc -l)
	

	ip_lan=$(ifconfig eth0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	wan_proto=$(uci get network.wan.proto)
	if [ "$wan_proto" == "static" ]; then
		ip_wan=$(ifconfig sn0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	elif [ "$wan_proto" == "dhcp" ];  then
		ip_wan=$(ifconfig sn0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	elif [ "$wan_proto" == "pppoe" ]; then
		ip_wan=$(ifconfig pppoe-wan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	else
		echo "read wan proto failed!"
	fi
	
	if [ "$natenable" -eq "1" ] ; then

		if [ "$comment_num" -eq "1" ] ; then
			comment=$(uci get natport_config.classify.comment_tmp)

			dest_addr=$(uci get firewall.$comment.dest_ip)


			proto=$(uci get firewall.$comment.proto)


			start_port=$(uci get firewall.$comment.src_dport | awk -F[-] '{print $1}')
			
			end_port=$(uci get firewall.$comment.dest_port | awk -F[-] '{print $2}')


			description=$(uci get firewall.$comment.name)

		#fou zhanshi tianjia
			if [ "$proto" = "TCPUDP" ] || [ "$proto" = "tcpudp" ] ; then	
				iptables -t nat -D PREROUTING -p udp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port
				iptables -t nat -D POSTROUTING  -d $dest_addr/32 -p udp  --dport $start_port:$end_port  -j SNAT --to-source $ip_lan
				iptables -t nat -D PREROUTING  -d $ip_wan/32 -p udp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port	
	
				iptables -t nat -D PREROUTING -p tcp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port
				iptables -t nat -D POSTROUTING  -d $dest_addr/32 -p tcp  --dport $start_port:$end_port  -j SNAT --to-source $ip_lan
				iptables -t nat -D PREROUTING  -d $ip_wan/32 -p tcp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port	
				
			else
				iptables -t nat -D PREROUTING -p $proto  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port
				iptables -t nat -D POSTROUTING  -d $dest_addr/32 -p $proto  --dport $start_port:$end_port  -j SNAT --to-source $ip_lan
				iptables -t nat -D PREROUTING  -d $ip_wan/32 -p $proto  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port	
			fi
	
			
		fi
		
	fi
}


if [ "$operation_num" -eq "1" ] ; then

	wan_proto=$(uci get network.wan.proto)
	if [ "$wan_proto" == "static" ]; then
		if [ "$(iptables -t nat -S | grep 'sn0 -j MASQUERADE' | wc -l)" -eq "0" ]; then
			iptables -t nat -A POSTROUTING -o sn0 -j MASQUERADE
		fi
	elif [ "$wan_proto" == "pppoe" ]; then
		if [ "$(iptables -t nat -S | grep 'ppp0 -j MASQUERADE' | wc -l)" -eq "0" ]; then
			iptables -t nat -A POSTROUTING -o ppp0 -j MASQUERADE
		fi
	else
		echo "read wan proto failed!"
	fi
	
	operation=$(uci get natport_config.classify.operation_tmp)
	
	if [ "$operation" -eq "1" ] ; then
		add_nat
		del_nat
#		/etc/init.d/firewall reload
#		sh /rcst/rcst_sh/tos_set.sh &

		exit 0	

	elif [ "$operation" -eq "0" ] ; then
		del_iptables_nat
		
		comment=$(uci get natport_config.classify.comment_tmp)
		uci delete firewall.$comment
		uci commit firewall
				
		del_nat
#		/etc/init.d/firewall reload
#		sh /rcst/rcst_sh/tos_set.sh &


		exit 0
				
	elif [ "$operation" -eq "2" ] ; then

		del_iptables_nat
		comment=$(uci get natport_config.classify.comment_tmp)
		uci delete firewall.$comment
		uci commit firewall		
		add_nat
		del_nat
#		/etc/init.d/firewall reload
#		sh /rcst/rcst_sh/tos_set.sh &


		exit 0
			
	elif [ "$operation" -eq "3" ] ; then
		
		init_nat
		del_nat
#		/etc/init.d/firewall reload
#		sh /rcst/rcst_sh/tos_set.sh &

	fi
fi
