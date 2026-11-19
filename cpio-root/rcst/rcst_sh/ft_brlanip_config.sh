#!/bin/bash

ft_brlan_ip=$(uci get ft_brlanip_config.ft_brlanip_config.ft_brlan_ip)
ft_brlan_netmask=$(uci get ft_brlanip_config.ft_brlanip_config.ft_brlan_netmask)
#0：eth0配置管理口 1：eth1配置管理口
network_vehbrlaneth_flag=$(uci get networkmode.networkmode.network_vehbrlaneth_flag) 
vehicular_type=$(uci get update.update.vehicular_type)
if [ "$vehicular_type" = "1" ]; then
	#0：eth0配置管理口 1：eth1配置管理口
	if [ "$network_vehbrlaneth_flag" = "1" ]; then
		#是否有brlan1
		if [ "$(brctl show | grep -w br-lan1 | wc -l)" -eq "1" ];then
			#brlan1是否有eth1 
			if [ "$(brctl show | grep -w br-lan1 | grep -w eth1 | wc -l)" -eq "1" ];then
				if [ "$(ifconfig | grep -w 'br-lan1 ' |wc -l)" == 0 ];then
					ifconfig br-lan1 0.0.0.0 up
				fi
				#brctl stp br-lan1 on
				ifconfig br-lan1:5 $ft_brlan_ip netmask $ft_brlan_netmask up 
			else
				if [ "$(brctl show | grep -w br-lan1 | wc -l)" == 0 ];then
					brctl addbr br-lan1
				fi	
				#brctl stp br-lan1 on
				##无论eth1有没有配置都桥接在brlan1上，作为acu通信网口
				brctl delif br-lan eth1
				ifconfig eth1 up
				if [ "$(ifconfig | grep -w 'br-lan1 ' |wc -l)" != 0 ];then
					ifconfig br-lan1 0.0.0.0 up
				fi
				brctl addif br-lan1 eth1		
				ifconfig br-lan1:5 $ft_brlan_ip netmask $ft_brlan_netmask up 			
			fi
		#没有brlan1看是否eth1在brlan上
		else
			if [ "$(brctl show | grep -w eth1 | wc -l)" != "0" ];then
				ifconfig br-lan:5 $ft_brlan_ip netmask $ft_brlan_netmask up
			else
				if [ "$(brctl show | grep -w br-lan1 | wc -l)" == 0 ];then
					brctl addbr br-lan1
				fi	
				#brctl stp br-lan1 on
				##无论eth1有没有配置都桥接在brlan1上，作为acu通信网口
				brctl delif br-lan eth1
				ifconfig eth1 up
				if [ "$(ifconfig | grep -w 'br-lan1 ' |wc -l)" == 0 ];then
					ifconfig br-lan1 0.0.0.0 up
				fi
				brctl addif br-lan1 eth1	
				ifconfig br-lan1:5 $ft_brlan_ip netmask $ft_brlan_netmask up 	
			fi
		fi
	else
		ifconfig br-lan:5 $ft_brlan_ip netmask $ft_brlan_netmask up
	fi
else #if [ "$vehicular_type" = "1" ]; then
ifconfig br-lan:5 0.0.0.0 down
ifconfig br-lan1:5 0.0.0.0 down
fi
