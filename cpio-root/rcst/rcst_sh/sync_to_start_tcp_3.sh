#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info sync_to_start_tcp_3"[$(ps | grep sync_to_start_tcp_3.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

source /etc/profile

networkmode=$(uci get networkmode.networkmode.networkmode)
var_tcp_switch=$(uci get proset.tcp_set.switch)
new_tcp_proxy_ip=$(uci get update.update.tcpaipaddr)

syslog_sh "------------------networkmode: $networkmode, var_tcp_switch: $var_tcp_switch------------------------"

#异常情况下的处理，网管加速开关关了，但小站上加速是开的
syslog_sh "---------------------------/rcst/http_sh/tcp_shutdown.sh--------------------"
sh /rcst/http_sh/tcp_stop.sh > /dev/null

sed -i '/tcpa_proxy_ip/c tcpa_proxy_ip = '"$new_tcp_proxy_ip"'' /mnt/etc/config/tcpa_config.ini

if [ "$networkmode" == 2 ]; then
	three_layer_vlanflag=$(uci get networkmode.networkmode.three_layer_vlanflag)
	if [ "$three_layer_vlanflag" = "0" ]; then
	   syslog_sh "--------------------------------three networkmode: /rcst/http_sh/default_vlan.sh-----------------------------"
	   sh /rcst/http_sh/default_vlan.sh > /dev/null
	elif [ "$three_layer_vlanflag" = "1" ]; then
	   syslog_sh "--------------------------------three networkmode: /rcst/http_sh/no_default_vlan.sh--------------------------"
	   sh /rcst/http_sh/no_default_vlan.sh > /dev/null
	fi
elif [ "$networkmode" == 1 ]; then
	syslog_sh "--------------------------------two networkmode--------------------------"
#	echo 1 > /proc/sys/net/bridge/bridge-nf-filter-vlan-tagged
	sed -i '/tcpacc_gateway_l2/c tcpacc_gateway_l2         = 1' /mnt/etc/config/tcpa_config.ini
	sed -i '/mesh_switch/c mesh_switch         = 1' /mnt/etc/config/tcpa_config.ini
	sed -i '/lan_name/c lan_name         = '"$(uci get network.lan.ifname)"'' /mnt/etc/config/tcpa_config.ini

	if [ "$var_tcp_switch" = "1" ]; then
		syslog_sh "-----------------------/rcst/http_sh/tcp_start.sh----------------------------"
		sh /rcst/http_sh/tcp_start.sh > /dev/null
	fi
fi

