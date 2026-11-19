#! /bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info auth_status_monitor"[$(ps | grep auth_status_monitor.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

sync_status=4
x509_auth_status=$(cat /mnt/pkcs12/x509_auth_status)
rcst_sync_status=$(cat /proc/rcst_status/rcst_status_mode)

if [ "$rcst_sync_status" -eq "$sync_status" ] ; then 
	if [ "$x509_auth_status" -eq "0" ] ; then
		kill -9 $(ps | grep x509_auth | grep -v grep | awk '{print $1}')
		/etc/init.d/x509_auth_monitor restart
		echo $(date) "5mins x509 monitor reset!" >> /mnt/rcst_log/status_monitor.txt
	fi	
fi
