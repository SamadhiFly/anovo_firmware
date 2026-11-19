#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info sync_apprestartconfig"[$(ps | grep add_multicast_ip.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

syslog_sh "--------------------------------this terminal is 1 sync_apprestartconfig-----------------------------"
sh /rcst/rcst_sh/acu_ipconfig.sh
kill -9 $(ps | grep modem_to_acu_client | grep -v grep | awk '{print $1}')
/etc/init.d/modem_to_acu_client_monitor restart
kill -9 $(ps | grep fh_nmi_app | grep -v grep | awk '{print $1}')
/etc/init.d/fh_snmp_monitor restart
kill -9 $(ps | grep vehicular_app | grep -v grep | awk '{print $1}')
vehicular_type=$(uci get update.update.vehicular_type)
if [ "$vehicular_type" = "1" ]; then
	syslog_sh "--------------------------------this terminal is 1 vehicular_app-----------------------------"
	sh /rcst/rcst_sh/ft_brlanip_config.sh
	/etc/init.d/vehicular_app_monitor restart
fi
