#!/bin/bash
syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info tcp_check"[$(ps | grep tcp_check.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

tcpacc_switch=$(cat /mnt/etc/config/tcpa_config.ini |sed -n 70p |awk '{print $3}')
m5g4g_switch=$(cat /mnt/etc/config/tcpa_config.ini |sed -n 72p |awk '{print $3}')

syslog_sh "------------------tcpa_config.ini:: tcpacc_switch: $tcpacc_switch, m5g4g_switch: $m5g4g_switch------------------------"

if [ "$tcpacc_switch" = "1" ]; then
	uci set proset.tcp_set.switch=1;
	if [ "$m5g4g_switch" == "1" ]; then
		syslog_sh "---------------->>tcpacc open, 4g/5g acc open!"
		uci set switch_redirect.redirect_set.5g4g_switch=1;
	elif [ "$m5g4g_switch" == "0" ]; then
		syslog_sh "---------------->>tcpacc open, 4g/5g acc close!"
		uci set switch_redirect.redirect_set.5g4g_switch=0;
	fi
#	uci set proset.http_set.switch=0;
	uci commit switch_redirect;
	uci commit proset;
else
	uci set proset.tcp_set.switch=0;
	syslog_sh "---------------->>tcpacc close, 4g/5g acc close!"
	uci set switch_redirect.redirect_set.5g4g_switch=0;

#	uci set proset.http_set.switch=0;
	uci commit switch_redirect;
	uci commit proset;
fi


