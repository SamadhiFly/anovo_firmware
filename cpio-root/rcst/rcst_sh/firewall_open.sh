#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info vlan_open"[$(ps | grep vlan_open.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

uci set firewall.@defaults[0].input='ACCEPT'
uci set firewall.@defaults[0].output='ACCEPT'
uci set firewall.@defaults[0].forward='ACCEPT'


uci set firewall.@zone[0].output='ACCEPT'
uci set firewall.@zone[0].forward='ACCEPT'

uci set firewall.@zone[1].input='ACCEPT'
uci set firewall.@zone[1].output='ACCEPT'
uci set firewall.@zone[1].forward='ACCEPT'


uci commit firewall
/etc/init.d/firewall restart

