#!/bin/bash

uci show network | grep '=lan' | while read line; do 
	var_netmask=$(uci get network.lan.netmask)

	if [ "$var_netmask" == "255.255.255.0" ] ; then
		var_route=$(echo $line | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2}') 
		var_gateway=$(uci show $var_route.gateway | awk -F '[=]+' '{print $2}' | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3}')
		var_ipaddr=$(uci show network.lan.ipaddr | awk -F '[=]+' '{print $2}' | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3}')

		if [ "$var_gateway" != "$var_ipaddr" ]; then
			uci delete $var_route
			uci commit network
		fi
	elif [ "$var_netmask" == "255.255.0.0" ] ; then
		var_route=$(echo $line | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2}') 
		var_gateway=$(uci show $var_route.gateway | awk -F '[=]+' '{print $2}' | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2}')
		var_ipaddr=$(uci show network.lan.ipaddr | awk -F '[=]+' '{print $2}' | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2}')

		if [ "$var_gateway" != "$var_ipaddr" ]; then
			uci delete $var_route
			uci commit network
		fi
	elif [ "$var_netmask" == "255.0.0.0" ] ; then
		var_route=$(echo $line | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2}') 
		var_gateway=$(uci show $var_route.gateway | awk -F '[=]+' '{print $2}' | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}')
		var_ipaddr=$(uci show network.lan.ipaddr | awk -F '[=]+' '{print $2}' | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}')

		if [ "$var_gateway" != "$var_ipaddr" ]; then
			uci delete $var_route
			uci commit network
		fi
	fi
	
done

uci show network | grep '=wan' | while read line; do 
	var_proto=$(uci get network.wan.proto)
	if [ "$var_proto" == "pppoe" ] ; then
		var_netmask=$(ifconfig pppoe-wan | sed -n 2p | awk '{print $4}' | tr -d 'Mask:')
	else
		var_netmask=$(ifconfig sn0 | sed -n 2p | awk '{print $4}' | tr -d 'Mask:')
	fi

	if [ "$var_netmask" == "255.255.255.0" ] ; then
		var_route=$(echo $line | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2}') 
		var_gateway=$(uci show $var_route.gateway | awk -F '[=]+' '{print $2}' | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3}')
		var_ipaddr=$(uci show network.wan.ipaddr | awk -F '[=]+' '{print $2}' | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3}')

		if [ "$var_gateway" != "$var_ipaddr" ]; then
			uci delete $var_route
			uci commit network
		fi
	elif [ "$var_netmask" == "255.255.0.0" ] ; then
		var_route=$(echo $line | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2}') 
		var_gateway=$(uci show $var_route.gateway | awk -F '[=]+' '{print $2}' | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2}')
		var_ipaddr=$(uci show network.wan.ipaddr | awk -F '[=]+' '{print $2}' | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2}')

		if [ "$var_gateway" != "$var_ipaddr" ]; then
			uci delete $var_route
			uci commit network
		fi
	elif [ "$var_netmask" == "255.0.0.0" ] ; then
		var_route=$(echo $line | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2}') 
		var_gateway=$(uci show $var_route.gateway | awk -F '[=]+' '{print $2}' | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}')
		var_ipaddr=$(uci show network.wan.ipaddr | awk -F '[=]+' '{print $2}' | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}')

		if [ "$var_gateway" != "$var_ipaddr" ]; then
			uci delete $var_route
			uci commit network
		fi
	fi
	
done

/etc/init.d/network reload
