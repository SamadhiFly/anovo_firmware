#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info sync_to_start_tcp"[$(ps | grep sync_to_start_tcp.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

var_tcp_switch=$(uci get proset.tcp_set.switch)
m5g4g_switch=$(uci get switch_redirect.redirect_set.5g4g_switch)

syslog_sh "---------------------------tcp_switch: $var_tcp_switch, 4g/5g switch: $m5g4g_switch---------------------------"

if [ "$var_tcp_switch" = "1" ]; then
	syslog_sh "-----------------------remote_tcp_start.sh----------------------------"
	sh /rcst/http_sh/remote_tcp_start.sh > /dev/null
fi




