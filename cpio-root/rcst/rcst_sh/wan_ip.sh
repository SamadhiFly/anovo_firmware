#!/bin/bash

ip_wan_length=0
networkmode=$(uci get networkmode.networkmode.networkmode) 
wan_proto=$(uci get network.wan.proto)

if [ "$(ifconfig | grep 'br-wan ' | wc -l)" == 1 ];then
	ip_wan=$(ifconfig br-wan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')

elif [ "$(ifconfig | grep 'br-lan:1 ' | wc -l)" == 1 ];then
	ip_wan=$(ifconfig br-lan:1 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	
else
	if [ "$wan_proto" == "static" ]; then
		ip_wan=$(ifconfig sn0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	elif [ "$wan_proto" == "dhcp" ];  then
		ip_wan=$(ifconfig sn0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	elif [ "$wan_proto" == "pppoe" ]; then
		ip_wan=$(ifconfig pppoe-wan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	else
		echo "read wan proto failed!"
	fi
fi

ip_wan_length=$(echo $ip_wan | awk '{print length($0)}')

if [ "7" -le "$ip_wan_length" ]; then
     echo $ip_wan
else
	echo " "
fi
