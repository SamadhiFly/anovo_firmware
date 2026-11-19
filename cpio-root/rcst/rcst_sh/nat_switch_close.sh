#!/bin/bash

firewall_ruln=$(uci show /etc/config/firewall | grep redirect | wc -l)
i=0

while [[ "$i" -lt "$firewall_ruln" ]]
do
	let "i+=1"
	num=$(uci show /etc/config/firewall | grep redirect | sed -n "$i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
	uci set firewall.$num.enabled=0
done


uci set firewall.@zone[1].masq=0
uci set firewall.@defaults[0].forward=ACCEPT
uci set firewall.@zone[1].forward=ACCEPT
uci commit firewall
#/etc/init.d/firewall stop
#/etc/init.d/firewall restart
#sh /rcst/rcst_sh/nat_config.sh > /dev/null

uci set switch_redirect.redirect_set.switch=0
uci commit switch_redirect

#uci set firewall.@zone[1].masq=1
#uci set firewall.@defaults[0].forward=ACCEPT
#uci set firewall.@zone[1].forward=ACCEPT
#uci commit firewall
/etc/init.d/firewall stop
/etc/init.d/firewall restart
sh /rcst/rcst_sh/nat_config.sh > /dev/null
iptables -t nat -D zone_wan_postrouting -m comment --comment "!fw3" -j MASQUERADE

