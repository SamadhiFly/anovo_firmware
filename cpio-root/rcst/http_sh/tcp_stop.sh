#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info tcp_stop"[$(ps | grep tcp_stop.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

var_tcp_switch=$(uci get proset.tcp_set.switch)
m5g4g_switch=$(uci get switch_redirect.redirect_set.5g4g_switch)

syslog_sh "---------------tcp_switch: $var_tcp_switch, 4g/5g switch: $m5g4g_switch---------------"


sed -i '/tcpacc_trans_mode/c tcpacc_trans_mode         = 0' /mnt/etc/config/tcpa_config.ini

syslog_sh "close tcpacc switch..."

/rcst/rcst_app/tcpacc_gw_app &


