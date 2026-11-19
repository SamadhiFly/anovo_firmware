#!/bin/bash

#0：eth0配置管理口 1：eth1配置管理口
network_acubrlaneth_flag=$(uci get networkmode.networkmode.network_acubrlaneth_flag) 
acu_ip=$(uci get satellite_config.satellite.src_ip)
antenna_type=$(uci get satellite_config.satellite_antenna.antenna_type)
#0：eth0配置管理口 1：eth1配置管理口
if [ "$antenna_type" == "fix" ] || [ "$antenna_type" == "manual_portable" ] ; then
	if [ "$(ifconfig | grep -w 'br-lan:2 ' |wc -l)" != 0 ];then
		ifconfig br-lan:2 0.0.0.0 down
	fi
	if [ "$(ifconfig | grep -w 'br-lan1:2 ' |wc -l)" != 0 ];then
		ifconfig br-lan1:2 0.0.0.0 down
	fi
	/etc/init.d/fh_snmp_monitor stop
else

	if [ "$network_acubrlaneth_flag" = "1" ]; then
		#是否有brlan1
		if [ "$(brctl show | grep -w br-lan1 | wc -l)" -eq "1" ];then
			#brlan1是否有eth1 
			if [ "$(brctl show | grep -w br-lan1 | grep -w eth1 | wc -l)" -eq "1" ];then
				if [ "$(ifconfig | grep -w 'br-lan1 ' |wc -l)" == 0 ];then
					ifconfig br-lan1 0.0.0.0 up
				fi
				#brctl stp br-lan1 on
				ifconfig br-lan1:2 $acu_ip netmask 255.255.255.0 up
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
				ifconfig br-lan1:2 $acu_ip netmask 255.255.255.0 up	
						
			fi
		#没有brlan1看是否eth1在brlan上
		else
			if [ "$(brctl show | grep -w eth1 | wc -l)" != "0" ];then
				ifconfig br-lan:2 $acu_ip netmask 255.255.255.0 up
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
				ifconfig br-lan1:2 $acu_ip netmask 255.255.255.0 up		
			fi
		fi
	else
		ifconfig br-lan:2 $acu_ip netmask 255.255.255.0 up
	fi
	/etc/init.d/fh_snmp_monitor restart
fi
