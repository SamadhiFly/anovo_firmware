#!/bin/bash
operation_num=$(cat /etc/config/natport_config | grep "operation_tmp " | wc -l)
init_nat() {

		proto=$(uci get natport_config.classify.type_tmp)
		ipaddr=$(uci get natport_config.classify.ipaddr_tmp)
		startport=$(uci get natport_config.classify.startport_tmp)
		endport=$(uci get natport_config.classify.endport_tmp)
		name=$(uci get natport_config.classify.name_tmp)
		comment=$(uci get natport_config.classify.comment_tmp)

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
	
#	if [ "$natenable" -eq "1" ] ; then

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
		comment=$(uci get natport_config.classify.comment_tmp)
		uci delete firewall.$comment
		uci commit firewall
		del_nat
		/etc/init.d/firewall stop
		/etc/init.d/firewall restart
		sh /rcst/rcst_sh/tos_set.sh &

		exit 0
				
	elif [ "$operation" -eq "2" ] ; then
		comment=$(uci get natport_config.classify.comment_tmp)
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
