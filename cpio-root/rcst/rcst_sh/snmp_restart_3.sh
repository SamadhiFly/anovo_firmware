#!/bin/bash

source /etc/profile
#kill -9 $(ps | grep nmi_app | grep -v grep | awk '{print $1}')
#~ re_sync_status=$(cat /proc/rcst_status/rcst_status_mode)
#~ ip_wan_length=0
#~ until [ "$re_sync_status" = "4" ] && [ "7" -le "$ip_wan_length" ]; do
	#~ sleep 5
	#~ re_sync_status=$(cat /proc/rcst_status/rcst_status_mode)
	#~ wan_proto=$(uci get network.wan.proto)
	#~ networkmode=$(uci get networkmode.networkmode.networkmode) 
	#~ if [ "$networkmode" == 1 ];then
		#~ vlantype=$(uci get vlanconfig.mode.tag)
		#~ if [ "$wan_proto" == "static" ]; then
			#~ if [ "$vlantype" != 0 ];then
				#~ ip_wan=$(ifconfig br-lan:1 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
			#~ else
				#~ ip_wan=$(ifconfig br-wan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
			#~ fi
		#~ else
			#~ echo $(date) "read wan proto failed!" >> /tmp/snmp_status_monitor.txt
		#~ fi
    #~ else	
		#~ if [ "$wan_proto" == "static" ]; then
			#~ ip_wan=$(ifconfig sn0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		#~ elif [ "$wan_proto" == "dhcp" ];  then
			#~ ip_wan=$(ifconfig sn0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		#~ elif [ "$wan_proto" == "pppoe" ]; then
			#~ ip_wan=$(ifconfig pppoe-wan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		#~ else
			#~ echo $(date) "read wan proto failed!" >> /tmp/snmp_status_monitor.txt
		#~ fi
    #~ fi	
	#~ ip_wan_length=$(echo $ip_wan | awk '{print length($0)}')
#~ done
#~ cd /rcst/rcst_app

/etc/init.d/nmi_app_monitor stop
uci del beamaccsss_config.beamaccsss_config.nmsftp_name
uci del beamaccsss_config.beamaccsss_config.nmsftp_passwd
uci commit beamaccsss_config
echo 0 > /tmp/snmp_trap_flag
/etc/init.d/nmi_app_monitor start
#~ ./nmi_app > /dev/null &

sleep 10
NAT_switch=$(uci get switch_redirect.redirect_set.switch)
#iptables -t nat -S | grep "zone_wan_postrouting -j MASQUERADE" | wc -l
if [ "$NAT_switch" = "0" ]; then
	if [ "$(iptables -t nat -S | grep 'zone_wan_postrouting -j MASQUERADE' | wc -l)" != "0" ]; then
		iptables -t nat -D zone_wan_postrouting -m comment --comment "!fw3" -j MASQUERADE
	fi
else
	if [ "$(iptables -t nat -S | grep 'zone_wan_postrouting -j MASQUERADE' | wc -l)" = "0" ]; then
		iptables -t nat -A zone_wan_postrouting -m comment --comment "!fw3" -j MASQUERADE
	fi
fi
sh /rcst/rcst_sh/tos_set.sh &

networkmode=$(uci get networkmode.networkmode.networkmode)
if [ "$networkmode" == 2  ];then
	if [ "$(ps | grep -v grep |grep pimd | wc -l)" == 0 ];then
		#~ opkg install /rcst/rcst_app/pimd_2.3.2-1_omap.ipk
		kill -9 $(ps | grep pimd | grep -v grep | awk '{print $1}')	
		pimd -c /etc/pimd.conf &
	fi
	if [ -f "/mnt/route_del.sh" ]; then
		sh /mnt/route_del.sh
	fi

	if [ -f "/mnt/route_add.sh" ]; then
		sh /mnt/route_add.sh
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

