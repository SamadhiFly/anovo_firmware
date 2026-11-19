#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info mac_check"[$(ps | grep mac_check.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/alarm_log
}


var1=$(cat /sys/class/net/eth0/address |  awk -F ":" '{print $1}')
echo "mac_check head = $var1"

if [ "$var1" != "40" ]; then


	#fw_setenv ethaddr ""

	syslog_sh "eth0 mac error, config new mac, reboot!!!"

	folder_file=/mnt/random_mac.txt
	 
	touch "$folder_file"

	echo $(echo 40:`cat /proc/sys/kernel/random/uuid | md5sum | sed 's/../&:/g'|cut -c 1-14`) > $folder_file

	echo "random_mac $(cat $folder_file)"
		
	fw_setenv ethaddr $(cat $folder_file)
	      
	sync
	echo "config new eth0 mac, reboot"
	sleep 1
	
	reboot -f
	
fi


echo "mac_check end"
