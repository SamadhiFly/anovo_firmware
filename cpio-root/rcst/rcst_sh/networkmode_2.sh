#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info networkmode_2"[$(ps | grep run_newnetwork_config.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

networkmode_ethnum=$(cat /etc/config/networkmode | grep eth | wc -l)
networkmode_eth_i=0
while [[ "$networkmode_eth_i" -le "$networkmode_ethnum" ]]
do
	let "networkmode_eth_i+=1"
	num=$(cat /etc/config/networkmode | grep eth | sed -n "$networkmode_eth_i"p | awk  -F "[\']+" '{print $2}')
	if [ "$num" ];then
	uci del networkmode.$num

	fi
done
uci commit networkmode

uci set networkmode.eth0=vrfconfig
uci set networkmode.eth0.network_type=$(uci get networkmode.networkmode.networkmode)

uci set networkmode.eth0.tag='1'
uci set networkmode.eth0.eth_interface='0'
uci set networkmode.eth0.bridge='0'
uci set networkmode.eth0.vid1='1'
uci set networkmode.eth0.vmap_switch1='0'
uci set networkmode.eth0.vmap_sys_vid1='1'
uci set networkmode.eth0.lanvrfip1=$(uci get network.lan.ipaddr)
uci set networkmode.eth0.lanvrfnetmask1=$(uci get network.lan.netmask)
uci set networkmode.eth0.wanvrfip1=$(uci get network.wan.ipaddr)
uci set networkmode.eth0.wanvrfnetmask1=$(uci get network.wan.netmask)
uci set networkmode.eth0.wanvrfgateway1=$(uci get network.0000.gateway)
uci set networkmode.eth0.dhcp_start_ip1=$(uci get dns_dhcp_config.dhcp_config.dhcp_start)
uci set networkmode.eth0.dhcp_end_ip1=$(uci get dns_dhcp_config.dhcp_config.dhcp_end)
uci set networkmode.eth0.dhcp_lease1='120'

uci commit networkmode


