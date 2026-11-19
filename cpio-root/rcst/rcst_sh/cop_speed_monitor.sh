#! /bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info cop_speed_monitor"[$(ps | grep cop_speed_monitor.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

kill -9 $(ps | grep cop_speed_start_monitor | grep -v grep | awk '{print $1}')
sh /rcst/rcst_sh/cop_speed_start_monitor.sh &
#syslog_sh "60s"
