#! /bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info remote_http_start"[$(ps | grep remote_http_start.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /var/log/status_monitor.txt
}


  syslog_sh "---------------------------httpswitch_flag start http_start.sh http_check.sh---------------------------"
  sh /home/rcst/http_sh/http_start.sh > /dev/null
  sh /home/rcst/http_sh/http_check.sh > /dev/null
  uci set networkmode.networkmode.httpswitch_flag=0;uci commit networkmode
