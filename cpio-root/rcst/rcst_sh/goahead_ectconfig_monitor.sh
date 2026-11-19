#! /bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info goahead_ectconfig_monitor"[$(ps | grep goahead_ectconfig_monitor.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

echo $(date) "goahead_ectconfig_ps start!!" >> /mnt/rcst_log/status_monitor.txt
kill -9 $(ps | grep goahead_ectconfig_upload.sh | grep -v grep | awk '{print $1}')
killall ftpput
sh /rcst/rcst_sh/goahead_ectconfig_upload.sh > /dev/null &



