#!/bin/sh

#wan口IP修改后，自动修该WAN口默认路由为*.*.*.254
var_netmask=$(uci get network.wan.netmask)

if [ "$var_netmask" == "255.255.255.0" ] ; then
	uci set networkmode.networkmode.defaultgw=$( uci get network.wan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,254}' ) 
elif [ "$var_netmask" == "255.255.0.0" ] ; then
	uci set networkmode.networkmode.defaultgw=$( uci get network.wan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,255,254}' )
elif [ "$var_netmask" == "255.0.0.0" ] ; then
	uci set networkmode.networkmode.defaultgw=$( uci get network.wan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,255,255,254}' )
fi

uci commit networkmode
uci del network.0000
uci commit network
