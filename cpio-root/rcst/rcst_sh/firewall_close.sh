#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info vlan_open"[$(ps | grep vlan_open.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}
sh /rcst/rcst_sh/remote_tcp_stop.sh
uci set firewall.@defaults[0].input='REJECT'
uci set firewall.@defaults[0].output='REJECT'
uci set firewall.@defaults[0].forward='REJECT'
uci set firewall.@zone[0].output='REJECT'
uci set firewall.@zone[0].forward='REJECT'

uci set firewall.@zone[1].input='REJECT'
uci set firewall.@zone[1].output='REJECT'
uci set firewall.@zone[1].forward='REJECT'

uci commit firewall
/etc/init.d/firewall restart
