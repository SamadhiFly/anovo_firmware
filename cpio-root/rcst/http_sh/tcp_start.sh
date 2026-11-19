#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info tcp_start"[$(ps | grep tcp_start.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

var_tcp_switch=$(uci get proset.tcp_set.switch)
m5g4g_switch=$(uci get switch_redirect.redirect_set.5g4g_switch)

syslog_sh "---------------tcp_switch: $var_tcp_switch, 4g/5g switch: $m5g4g_switch---------------"


sed -i '/tcpacc_trans_mode/c tcpacc_trans_mode         = 1' /mnt/etc/config/tcpa_config.ini

#4g/5g加速开关，业务逻辑：普通加速开，4g/5g可以开关；普通加速关，4g/5g关
if [ "$m5g4g_switch" == 1 ]; then
	syslog_sh "open tcpacc switch, open 4g/5g acc switch..."
	sed -i '/m5g_switch/c m5g_switch         = 1' /mnt/etc/config/tcpa_config.ini
elif [ "$m5g4g_switch" == 0 ]; then
	syslog_sh "open tcpacc switch, close 4g/5g acc switch..."
	sed -i '/m5g_switch/c m5g_switch         = 0' /mnt/etc/config/tcpa_config.ini
fi


/rcst/rcst_app/tcpacc_gw_app &
