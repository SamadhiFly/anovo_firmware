#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info vlanmap_routeadd"[$(ps | grep vlanmap_routeadd.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

interface_lan_name=$(uci get network.lan.ifname)

i=0

iii_vlan_tag=$(uci get networkmode.networkmode.tag)
#三层trunk模式
#if [ $iii_vlan_tag == 0 ];then

	if [  -f "/mnt/route_add.sh" ]; then
		route_num=$(cat /mnt/route_add.sh | wc -l)
		while [[ "$i" -lt "$route_num" ]]
		do
		let "i+=1"
		route_vid=$(cat /mnt/route_add.sh | sed -n "$i"p | awk '{print $8}' | awk -F'[.]+' '{print $2}')
		vrf_name=$(uci show vrfvlanconfig | grep vmap_sys_vid | grep "vmap_sys_vid='$route_vid'" | awk -F[.]+ '{print $2}')
		vmap_switch=$(uci get vrfvlanconfig.$vrf_name.vmap_switch)
		echo "route_vid:$route_vid vrf_name:$vrf_name vmap_switch:$vmap_switch"
		if [  "$vmap_switch" == "1" ]; then
			vid=$(uci get vrfvlanconfig.$vrf_name.vid)
			route_ip_netmask=$(cat /mnt/route_add.sh | sed -n "$i"p | awk '{print $4}')
			route_gateway=$(cat /mnt/route_add.sh | sed -n "$i"p | awk '{print $6}')
			echo "vid:$vid route_ip_netmask:$route_ip_netmask route_gateway:$route_gateway"
			sed -i "$i d" /mnt/route_add.sh
			sed -i "$i i route add -net $route_ip_netmask gateway $route_gateway dev $interface_lan_name.$vid" /mnt/route_add.sh
			
			sed -i "$i d" /mnt/route_del.sh
			sed -i "$i i route del -net $route_ip_netmask gateway $route_gateway dev $interface_lan_name.$vid" /mnt/route_del.sh
				
		fi
		done
	fi

#fi
