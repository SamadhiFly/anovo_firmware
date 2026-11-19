#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info tcp_debug_stop"[$(ps | grep tcp_debug_stop.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

var_tcp_switch=$(uci get proset.tcp_set.switch)
m5g4g_switch=$(uci get switch_redirect.redirect_set.5g4g_switch)

syslog_sh "---------------tcp_switch: $var_tcp_switch, 4g/5g switch: $m5g4g_switch---------------"

sed -i '/g_tcp_monitor_debug/c g_tcp_monitor_debug = 0' /mnt/etc/config/debug_config.ini

/rcst/rcst_app/tcpacc_gw_debug_app &
