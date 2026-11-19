#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info pimd_conf"[$(ps | grep multicastpimd_monitor.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

true > /tmp/multipimdip_deltemp.sh
pimd_switch=$(uci get switch_redirect.redirect_set.pimd_switch)
if [ $pimd_switch == 1 ];then
	multicast_num=$(cat /tmp/multicast_route_add.sh | grep route | wc -l)
	i=0                                                                                                                 
	while [[ "$i" -le "$multicast_num" ]]                                                                                
	do
		let "i=i+1"	 
		multicast_ip=$(cat /tmp/multicast_route_add.sh | grep route | sed -n "$i p" | awk -F '[/]+' '{print $1}' | awk '{print $4}')
		if [ -n "$multicast_ip" ];then
			if [ $(ip mroute show table all |grep "$multicast_ip" | wc -l) == 0 ];then
				cat /tmp/multicast_route_add.sh | grep route | sed -n "$i p" | sed 's/add/del/g' >> /tmp/multipimdip_deltemp.sh
				echo "sed -i \"/$multicast_ip/d\" /tmp/multicast_route_add.sh" >> /tmp/multipimdip_deltemp.sh
				syslog_sh "multicastpimd_monitor.sh del $multicast_ip"
			else
				table_id=$(ip mroute show table all |grep "$multicast_ip" | awk '{print $9}')
				if [ "$(ip route show table $table_id |grep $multicast_ip | grep -v multicast | wc -l)" == 0 ];then
					interface=$(ip mroute show table all |grep "$multicast_ip" | awk '{print $5}')
					route add -net $multicast_ip/32 dev $interface	
					syslog_sh "route add -net $multicast_ip/32 dev $interface"	
				fi		
			fi
		fi
	done
	sh /tmp/multipimdip_deltemp.sh
	true > /tmp/multipimdip_deltemp.sh
fi

