#! /bin/bash

source /etc/profile
wan_proto=$(uci get network.wan.proto)
data=$(sar -n DEV 1 1 | grep Average:)

LAN0_RX=$(echo "$data" | grep "eth0 "  | awk '{printf("%d\n",$5*1024)}')
LAN0_TX=$(echo "$data" | grep "eth0 "  | awk '{printf("%d\n",$6*1024)}')

LAN_RX=$(echo "$data" | grep "eth1 "  | awk '{printf("%d\n",$5*1024)}')
LAN_TX=$(echo "$data" | grep "eth1 "  | awk '{printf("%d\n",$6*1024)}')

WLAN_RX=$(echo "$data" | grep wlan0  | awk '{printf("%d\n",$5*1024)}')
WLAN_TX=$(echo "$data" | grep wlan0  | awk '{printf("%d\n",$6*1024)}')

if [ "$wan_proto" == "static" ]; then
    WAN_RX=$(echo "$data" | grep "sn0 " | awk '{printf("%d\n",$5*1024)}')
    WAN_TX=$(echo "$data" | grep "sn0 " | awk '{printf("%d\n",$6*1024)}')
elif [ "$wan_proto" == "pppoe" ]; then
    WAN_RX=$(echo "$data" | grep "pppoe-wan " | awk '{printf("%d\n",$5*1024)}')
    WAN_TX=$(echo "$data" | grep "pppoe-wan " | awk '{printf("%d\n",$6*1024)}')
fi

if [ ! -n "$LAN0_RX" ] ; then
	LAN0_RX=0
fi

if [ ! -n "$LAN0_TX" ] ; then
	LAN0_TX=0
fi

if [ ! -n "$LAN_RX" ] ; then
	LAN_RX=0
fi

if [ ! -n "$LAN_TX" ] ; then
	LAN_TX=0
fi

if [ ! -n "$WLAN_RX" ] ; then
	WLAN_RX=0
fi

if [ ! -n "$WLAN_TX" ] ; then
	WLAN_TX=0
fi

if [ ! -n "$WAN_RX" ] ; then
	WAN_RX=0
fi

if [ ! -n "$WAN_TX" ] ; then
	WAN_TX=0
fi

let LAN_RX=LAN0_RX+LAN_RX+WLAN_RX
let LAN_TX=LAN0_TX+LAN_TX+WLAN_TX

echo -e "$LAN_RX" "$LAN_TX" "$WAN_RX" "$WAN_TX\n{"'"'"lan_rx"'"'":$LAN_RX"","'"'"lan_tx"'"'":$LAN_TX"","'"'"wan_rx"'"'":$WAN_RX"","'"'"wan_tx"'"'":$WAN_TX\n""$WAN_RX\n""$WAN_TX" > /tmp/speed_cop
