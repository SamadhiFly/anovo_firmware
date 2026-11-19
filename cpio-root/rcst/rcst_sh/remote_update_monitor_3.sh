#! /bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info remote_start_update_monitor_3"[$(ps | grep remote_start_update_monitor_3.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

kill -9 $(ps | grep remote_start_update_monitor | grep -v grep | awk '{print $1}')
sh /rcst/rcst_sh/remote_start_update_monitor_3.sh &
#syslog_sh "60s"
