#! /bin/bash

source /etc/profile
wan_proto=$(uci get network.wan.proto)
data=$(sar -n DEV 1 1 | grep Average:)

#~ LAN0_RX=$(echo "$data" | grep "eth0 "  | awk '{printf("%d\n",$5*1024)}')
#~ LAN0_TX=$(echo "$data" | grep "eth0 "  | awk '{printf("%d\n",$6*1024)}')

eth0_num=$(ifconfig |grep eth0 |wc -l)

i=0
LAN0_RX=0;
LAN0_TX=0;
LAN0_RX_temp=0;
LAN0_TX_temp=0;
while [[ "$i" -lt "$eth0_num" ]]
do
	let "i+=1"
	num=$(ifconfig | grep eth0 | sed -n "$i"p  | awk  '{print $1}')
	LAN0_RX_temp=0;
	LAN0_TX_temp=0;
	LAN0_RX_temp=$(echo "$data" | grep "$num "  | awk '{printf("%d\n",$5*1024)}')
	LAN0_TX_temp=$(echo "$data" | grep "$num "  | awk '{printf("%d\n",$6*1024)}')
	echo num:$num
	echo LAN0_RX_temp:$LAN0_RX_temp
	echo LAN0_TX_temp:$LAN0_TX_temp
	let "LAN0_RX+=LAN0_RX_temp"
	let "LAN0_TX+=LAN0_TX_temp"
done

echo LAN0_RX:$LAN0_RX
echo LAN0_TX:$LAN0_TX


#~ LAN_RX=$(echo "$data" | grep "eth1 "  | awk '{printf("%d\n",$5*1024)}')
#~ LAN_TX=$(echo "$data" | grep "eth1 "  | awk '{printf("%d\n",$6*1024)}')

eth1_num=$(ifconfig |grep eth1 |wc -l)

i=0
LAN_RX=0;
LAN_TX=0;
LAN_RX_temp=0;
LAN_TX_temp=0;
while [[ "$i" -lt "$eth1_num" ]]
do
	let "i+=1"
	num=$(ifconfig | grep eth1 | sed -n "$i"p  | awk  '{print $1}')
	LAN_RX_temp=0;
	LAN_TX_temp=0;
	LAN_RX_temp=$(echo "$data" | grep "$num "  | awk '{printf("%d\n",$5*1024)}')
	LAN_TX_temp=$(echo "$data" | grep "$num "  | awk '{printf("%d\n",$6*1024)}')
	echo num:$num
	echo LAN_RX_temp:$LAN0_RX_temp
	echo LAN_TX_temp:$LAN0_TX_temp
	let "LAN_RX+=LAN_RX_temp"
	let "LAN_TX+=LAN_TX_temp"
done

echo LAN_RX:$LAN_RX
echo LAN_TX:$LAN_TX


WLAN_RX=$(echo "$data" | grep wlan0  | awk '{printf("%d\n",$5*1024)}')
WLAN_TX=$(echo "$data" | grep wlan0  | awk '{printf("%d\n",$6*1024)}')

if [ "$wan_proto" == "static" ]; then
	
    #~ WAN_RX=$(echo "$data" | grep "sn0 " | awk '{printf("%d\n",$5*1024)}')
    #~ WAN_TX=$(echo "$data" | grep "sn0 " | awk '{printf("%d\n",$6*1024)}')
	sn0_num=$(ifconfig |grep sn0 |wc -l)
	i=0
	WAN_RX=0;
	WAN_TX=0;
	WAN_RX_temp=0;
	WAN_TX_temp=0;
	while [[ "$i" -lt "$sn0_num" ]]
	do
		let "i+=1"
		num=$(ifconfig | grep sn0 | sed -n "$i"p  | awk  '{print $1}')
		WAN_RX_temp=0;
		WAN_TX_temp=0;
		WAN_RX_temp=$(echo "$data" | grep "$num " | awk '{printf("%d\n",$5*1024)}')
		WAN_TX_temp=$(echo "$data" | grep "$num " | awk '{printf("%d\n",$6*1024)}')
		let "WAN_RX+=WAN_RX_temp"
		let "WAN_TX+=WAN_TX_temp"
	done    
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
