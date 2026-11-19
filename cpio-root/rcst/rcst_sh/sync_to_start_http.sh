#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info sync_to_start_http"[$(ps | grep sync_to_start_http.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /var/log/status_monitor.txt
}

var_http_switch=$(uci get proset.http_set.switch)

syslog_sh "------------------networkmode: $networkmode, var_http_switch: $var_http_switch------------------------"

syslog_sh "---------------------------/home/rcst/http_sh/http_shutdown.sh--------------------"
sh /home/rcst/http_sh/http_stop.sh > /dev/null

if [ "$networkmode" == 2 ]; then
	   syslog_sh "--------------------------------three networkmode: /rcst/http_sh/http_start.sh-----------------------------"
	   sh /rcst/http_sh/http_start.sh > /dev/null
elif [ "$networkmode" == 1 ]; then

	if [ "$var_http_switch" = "1" ]; then
		syslog_sh "-----------------------http_acc_can_not_surport_level2-----------------------------"
	fi
fi

