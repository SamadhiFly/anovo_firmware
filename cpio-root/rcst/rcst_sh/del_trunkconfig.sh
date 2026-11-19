#!/bin/bash

#~ nat_vlanswitch_cnt=$(uci show /etc/config/switch_redirect | grep vlanid | wc -l)
#~ i=0

#~ while [[ "$i" -lt "$nat_vlanswitch_cnt" ]]
#~ do
	#~ let "i+=1"
	#~ num=$(uci show /etc/config/switch_redirect | grep vlanid | sed -n "$i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
	#~ if [ "$num" ];then
		#~ uci del network.lan$num
		#~ uci del network.wan$num
		#~ uci commit network
		
		#~ uci del firewall.lan$num
		#~ uci del firewall.wan$num
		#~ uci commit firewall	
	#~ fi
	
#~ done

nat_ruln=$(uci show /etc/config/firewall | grep _vlannat_trunk | wc -l)
i=0

while [[ "$i" -lt "$nat_ruln" ]]
do
	let "i+=1"
	num=$(uci show /etc/config/firewall | grep redirect | grep _vlannat_trunk | sed -n "$i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
	if [ "$num" ];then
	uci del firewall.$num
	fi
done
uci commit firewall

firewall_ruln=$(uci show /etc/config/firewall | grep _vlanfirewall_trunk | wc -l)
i=0

while [[ "$i" -lt "$firewall_ruln" ]]
do
	let "i+=1"
	num=$(uci show /etc/config/firewall | grep rule | grep _vlanfirewall_trunk | sed -n "$i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
	if [ "$num" ];then
	uci del firewall.$num
	fi
done
uci commit firewall

dns_dhcp_ruln=$(uci show /etc/config/dns_dhcp_config | grep vlan_config | wc -l)
i=0

while [[ "$i" -lt "$dns_dhcp_ruln" ]]
do
	let "i+=1"
	num=$(uci show /etc/config/dns_dhcp_config | grep vlan_config | sed -n "$i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
	if [ "$num" ];then
	uci del dns_dhcp_config.$num
	fi
done
uci commit dns_dhcp_config

switch_redirect_ruln=$(uci show /etc/config/switch_redirect | grep vlanid | wc -l)
i=0

while [[ "$i" -lt "$switch_redirect_ruln" ]]
do
	let "i+=1"
	num=$(uci show /etc/config/switch_redirect | grep vlanid | sed -n "$i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
	if [ "$num" ];then
	uci del switch_redirect.$num
	fi

done
uci commit switch_redirect
/etc/init.d/firewall stop
/etc/init.d/firewall restart

gre_cnt=$(ifconfig | grep tun | wc -l)
i=0

while [[ "$i" -lt "$gre_cnt" ]]
do
	let "i+=1"
	tunname=$(ifconfig | grep tun | sed -n "$i"p | awk  '{print $1}')
	if [ "$num" ];then
		ip tunnel del $tunname
	fi
done

true > /etc/config/gre_info
true > /etc/config/gre_routeinfo

