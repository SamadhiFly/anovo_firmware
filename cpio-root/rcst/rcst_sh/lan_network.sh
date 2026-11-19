#!/bin/bash

ipaddr=$(uci get network.lan.ipaddr)
netmask=$(uci get network.lan.netmask)

sed -i '$d' /etc/network/interfaces
sed -i '$d' /etc/network/interfaces

echo address $ipaddr >> /etc/network/interfaces
echo netmask $netmask >> /etc/network/interfaces

ifconfig eth0 $ipaddr netmask $netmask
