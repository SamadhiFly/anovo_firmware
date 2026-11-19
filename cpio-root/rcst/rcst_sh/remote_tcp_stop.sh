#! /bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info remote_tcp_stop"[$(ps | grep remote_start_update_monitor.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /tmp/messages
}


 syslog_sh "---------------------------tcpswitch_flag stop tcp_stop.sh tcp_check.sh---------------------------"
 sh /rcst/http_sh/tcp_stop.sh > /dev/null
 sh /rcst/http_sh/tcp_check.sh > /dev/null
 uci set networkmode.networkmode.tcpswitch_flag=0;uci commit networkmode
