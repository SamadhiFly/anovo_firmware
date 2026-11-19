#!/bin/bash

source /etc/profile

kill -9 $(ps | grep nmi_app | grep -v grep | awk '{print $1}')
re_sync_status=$(cat /proc/rcst_status/rcst_status_mode)
ip_wan_length=0
until [ "$re_sync_status" = "4" ] && [ "7" -le "$ip_wan_length" ]; do
	sleep 5
	re_sync_status=$(cat /proc/rcst_status/rcst_status_mode)
	wan_proto=$(uci get network.wan.proto)
	networkmode=$(uci get networkmode.networkmode.networkmode) 
	if [ "$networkmode" == 1 ];then
		if [ "$wan_proto" == "static" ]; then
			ip_wan=$(ifconfig br-wan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		else
			echo $(date) "read wan proto failed!" >> /tmp/snmp_status_monitor.txt
		fi
    else	
		if [ "$wan_proto" == "static" ]; then
			ip_wan=$(ifconfig sn0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		elif [ "$wan_proto" == "dhcp" ];  then
			ip_wan=$(ifconfig sn0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		elif [ "$wan_proto" == "pppoe" ]; then
			ip_wan=$(ifconfig pppoe-wan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		else
			echo $(date) "read wan proto failed!" >> /tmp/snmp_status_monitor.txt
		fi
    fi	
	ip_wan_length=$(echo $ip_wan | awk '{print length($0)}')
done
cd /rcst/rcst_app

/etc/init.d/nmi_app_monitor stop
echo 0 > /tmp/snmp_trap_flag
/etc/init.d/nmi_app_monitor start

sleep 10

sh /rcst/rcst_sh/tos_set.sh &
networkmode=$(uci get networkmode.networkmode.networkmode)
if [ "$networkmode" == 2  ];then
	if [ "$(ps | grep -v grep |grep pimd | wc -l)" == 0 ];then
#		opkg install /rcst/rcst_app/pimd_2.3.2-1_omap.ipk
		kill -9 $(ps | grep pimd | grep -v grep | awk '{print $1}')	
		pimd -c /etc/pimd.conf &
	fi
fi
#~ sleep 10
#~ snmp_port=$(netstat -anup | grep snmp | awk '{print $4}'| awk -F '[:]+' '{print $2}')
#~ until [ "$snmp_port" = "161" ]; do
	#~ kill -9 $(ps | grep snmp | grep -v grep | grep -v snmp_monitor.sh | grep -v snmp_restart.sh | awk '{print $1}')
	#~ snmp > /dev/null &
	#~ sleep 10
	#~ snmp_port=$(netstat -anup | grep snmp | awk '{print $4}'| awk -F '[:]+' '{print $2}')
#~ done

