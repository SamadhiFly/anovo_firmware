#!/bin/bash

networkmode=$(uci get networkmode.networkmode.networkmode) 
wan_proto=$(uci get network.wan.proto)

if [ "$wan_proto" == "pppoe" ]; then
	ifconfig sn0  0.0.0.0
else
	ipaddr=$(uci get network.wan.ipaddr)
	netmask=$(uci get network.wan.netmask)
	ifconfig sn0 $ipaddr netmask $netmask
fi
gateway=$(uci get network.0000.gateway)
route del default
route add default gw $gateway


