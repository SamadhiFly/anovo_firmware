#! /bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info remote_tcp_start"[$(ps | grep remote_tcp_start.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

syslog_sh "---------------------------remote_tcp_start: tcp_start.sh, tcp_check.sh---------------------------"
sh /rcst/http_sh/tcp_start.sh > /dev/null
sh /rcst/http_sh/tcp_check.sh > /dev/null
uci set networkmode.networkmode.tcpswitch_flag=0;uci commit networkmode
