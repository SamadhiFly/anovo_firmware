#!/bin/bash

firewall_ruln=$(uci show /etc/config/firewall | grep rule | wc -l)
i=0

while [[ "$i" -lt "$firewall_ruln" ]]
do
	let "i+=1"
	num=$(uci show /etc/config/firewall | grep rule | grep -v ']' | sed -n "$i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
	uci set firewall.$num.enabled=1
done	

uci set switch_redirect.redirect_set.firewall_switch=1

uci commit firewall
uci commit switch_redirect
/etc/init.d/firewall stop
/etc/init.d/firewall restart	
