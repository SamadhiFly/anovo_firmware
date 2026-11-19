#!/bin/sh

#wan口IP修改后，自动修该WAN口默认路由为*.*.*.254
var_netmask=$(uci get network.wan.netmask)

route_value=$(cat /etc/config/network | grep 0000 | wc -l)
#if [ "$route_value" == "0" ] ; then
	uci set network.0000=route
	uci set network.0000.interface=wan
	uci set network.0000.target=0.0.0.0
	uci set network.0000.netmask=0.0.0.0
	uci commit network
#fi

if [ "$var_netmask" == "255.255.255.0" ] ; then
	uci set network.0000.gateway=$( uci get network.wan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,254}' ) 
elif [ "$var_netmask" == "255.255.0.0" ] ; then
	uci set network.0000.gateway=$( uci get network.wan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,255,254}' )
elif [ "$var_netmask" == "255.0.0.0" ] ; then
	uci set network.0000.gateway=$( uci get network.wan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,255,255,254}' )
else
	gatewayip1=$(($(uci get network.wan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )&$(uci get network.wan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )))
	gatewayip2=$(($(uci get network.wan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )&$(uci get network.wan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )))
	gatewayip3=$(($(uci get network.wan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )&$(uci get network.wan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )))
	gatewayip4=$(($(uci get network.wan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )&$(uci get network.wan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )))
	uci set network.0000.gateway="$gatewayip1.$gatewayip2.$gatewayip3.254"

fi

uci commit network
