#! /bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info network_monitor"[$(ps | grep network_monitor.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

#echo $(date) "network_monitor.sh start!!" >> /mnt/rcst_log/status_monitor.txt

ip_wan_length=0
networkmode=$(uci get networkmode.networkmode.networkmode) 
wan_proto=$(uci get network.wan.proto)
networkwanip=$(uci get network.wan.ipaddr)
re_sync_status=$(cat /proc/rcst_status/rcst_status_mode | awk '{print $1}')
if [ "$(ifconfig | grep 'br-wan ' | wc -l)" ==  1 ] ; then

	ip_wan=$(ifconfig br-wan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
 echo 111111:$ip_wan
elif [ "$(ifconfig | grep 'br-lan:1 ' | wc -l)" == 1 ] ; then
	ip_wan=$(ifconfig br-lan:1 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
 echo 22222:$ip_wan	
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
echo 33333:$ip_wan		
fi
 echo $ip_wan
ip_wan_length=$(echo $ip_wan | awk '{print length($0)}')

if [ "7" -le "$ip_wan_length" ]; then
     echo $ip_wan
else
	echo " "
fi
if [ "$re_sync_status" -eq "4" ]; then
	if [ "$networkwanip" != "$ip_wan" ];then
		ifconfig sn0 $(uci get network.wan.ipaddr) netmask $(uci get network.wan.netmask) up
		#route add default gw $(uci get networkmode.networkmode.defaultgw)
		sh /mnt/route_wan_add.sh
		echo $(date) "beacuse $networkwanip and $ip_wan ip ERR vsat need config again!!" >> /mnt/rcst_log/status_monitor.txt
		if [ "$(uci get network.wan.ifname)" == "sn0." ];then
			uci set network.wan.ifname=sn0
			uci commit network
			echo $(date) "beacuse $(uci get network.wan.ifname) ip ERR vsat need reset!!" >> /mnt/rcst_log/status_monitor.txt
			uci set networkmode.networkmode.reset_flag=1;uci commit networkmode
		fi
		sleep 5
		#route add default gw $(uci get networkmode.networkmode.defaultgw)
		sh /mnt/route_wan_add.sh
		networkwanip=$(uci get network.wan.ipaddr)
		if [ "$(ifconfig | grep 'br-wan ' | wc -l)" ==  1 ] ; then

			ip_wan=$(ifconfig br-wan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		 echo 111111:$ip_wan
		elif [ "$(ifconfig | grep 'br-lan:1 ' | wc -l)" == 1 ] ; then
			ip_wan=$(ifconfig br-lan:1 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		 echo 22222:$ip_wan	
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
		echo 33333:$ip_wan		
		fi
		if [ "$networkwanip" != "$ip_wan" ];then
			echo $(date) "beacuse $networkwanip and $ip_wan ip ERR vsat need reset!!" >> /mnt/rcst_log/status_monitor.txt
			uci set networkmode.networkmode.reset_flag=1;uci commit networkmode
		fi
	fi
fi

zd_version=$(cat /mnt/zd_version)
if [ "$zd_version" == 4 ];then
	rcst_type_new=$(cat /mnt/rcst_type_new)
	p2p_flag=$(uci get rf_tx.rf_tx_config.rf_tx_type)
	if [ "$rcst_type_new" = "1" ] && [ "$p2p_flag" = "1" ]; then
		echo $(date) "p2p donot do del route default dev sn0"
	else
		routedefault_num=$(route  | grep default | grep $(uci get networkmode.networkmode.defaultgw) | wc -l)
		if [ $routedefault_num == 1 ];then
			route del default gw $(uci get networkmode.networkmode.defaultgw) dev sn0
		fi
	fi
fi


pimd_switch=$(uci get switch_redirect.redirect_set.pimd_switch)

if [ $pimd_switch == 1 ];then
	if [ $(ps | grep -v grep|  grep pimd | wc -l) == 0 ];then
		echo $(date) "60s print: pimd stoped phenomena!" >> /mnt/rcst_log/status_monitor.txt
		sh /rcst/rcst_sh/multicast_config.sh
	fi

fi

vlannumi=0
vlannum=$(ip vrf show  |grep vrf_test | wc -l)
echo vlannum:$vlannum
while [[ "$vlannumi" -lt "$vlannum" ]]
do
	let "vlannumi+=1"
	echo vlannumi:$vlannumi
	if [ $(ip rule show table $vlannumi | grep "from all lookup $vlannumi" | wc -l) != 0 ];then
	
	prefnum=$(ip rule show table $vlannumi | grep "from all lookup $vlannumi" | sed -n 1p |awk -F '[:]+' '{print $1}')
		if [ ! -z  "$prefnum" ]; then
			ip rule del from all lookup $vlannumi pref $prefnum
			echo $(date) "60s print: ip rule del from all lookup $vlannumi pref $prefnum!" >> /mnt/rcst_log/status_monitor.txt
		else
			echo $(date) "$(ip rule show table $vlannumi | grep "from all lookup $vlannumi" | sed -n 1p |awk -F '[:]+' '{print $1}') is NULL" >> /mnt/rcst_log/status_monitor.txt
		fi
	fi
done	
