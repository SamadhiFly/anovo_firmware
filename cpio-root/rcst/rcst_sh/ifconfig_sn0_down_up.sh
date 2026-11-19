#!/bin/bash

ifconfig sn0 down
ifconfig sn0 up
sh /mnt/route_wan_add.sh
vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
i=0
if [ "$vlannum" != 0 ] ; then
while [[ "$i" -lt "$vlannum" ]]
do
	let "i+=1"
	if [ "$(uci show vrfvlanconfig.vlan$i | grep network_type | wc -l)" == 0 ] ; then
		network_type=$(uci get networkmode.networkmode.networkmode)
		echo "netowrk config default i:$i network_type:$network_type"
	else
		network_type=$(uci get vrfvlanconfig.vlan$i.network_type)
	fi
	if [ "$(uci show vrfvlanconfig.vlan$i | grep tag | wc -l)" == 0 ] ; then
		tag=$(uci get vrfvlanconfig.mode.tag)
		echo "netowrk config default i:$i tag:$tag"
	else
		tag=$(uci get vrfvlanconfig.vlan$i.tag)
	fi
	vid=$(uci get vrfvlanconfig.vlan$i.vid)
	wanvrfgateway=$(uci get vrfvlanconfig.vlan$i.wanvrfgateway)
	if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
				##二三层混合模式
		if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ]  ;then				
			echo "eth$eth_interface network is two-three mixed-mode cur is three_layer need two config"
		else
			route add default gw $wanvrfgateway dev sn0.$vid
		fi #if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ]  ;then

	fi #if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then

done
fi
rcst_type=$(cat /mnt/rcst_type)
p2p_flag=$(uci get rf_tx.rf_tx_config.rf_tx_type)
if [ "$rcst_type" = "1" ] && [ "$p2p_flag" = "1" ]; then
	p2p_network_type=$(uci get rf_tx.rf_tx_config.p2p_network_type)
	if [ "$p2p_network_type" == 0 ];then
		sh /rcst/rcst_sh/wan_default_route.sh
	else
		uci del network.0000
		uci commit network
	fi
	/etc/init.d/network restart

	uci set firewall.@defaults[0].input='ACCEPT'
	uci set firewall.@defaults[0].output='ACCEPT'
	uci set firewall.@defaults[0].forward='ACCEPT'
	uci set firewall.@zone[0].output='ACCEPT'
	uci set firewall.@zone[0].forward='ACCEPT'

	uci set firewall.@zone[1].input='ACCEPT'
	uci set firewall.@zone[1].output='ACCEPT'
	uci set firewall.@zone[1].forward='ACCEPT'
	uci commit firewall
	sleep 1
	/etc/init.d/firewall restart
	sh /rcst/rcst_sh/dns_config.sh
	#acu_ip=$(uci get satellite_config.satellite.src_ip)
	#ifconfig br-lan:2 $acu_ip netmask 255.255.255.0 up					
	brlan100_num=$(ifconfig | grep -w "br-lan:100" | wc -l)
	if [ "$brlan100_num" == 0 ];then
		brlan100_default_ip=$(uci get networkmode.networkmode.default_ip)
		ifconfig br-lan:100 $brlan100_default_ip netmask 255.255.255.0 up
	fi	

	#lixch@20180926
	p2p_network_type=$(uci get rf_tx.rf_tx_config.p2p_network_type)
	if [ "$p2p_network_type" == 1 ];then
		brctl addif br-lan sn0
	fi
	sleep 1
	eth1_num=$(ifconfig | grep "eth1" | wc -l)
	if [ "$eth1_num" == 0 ];then
		ifconfig eth1 0.0.0.0  up
	fi	
	#brctl stp br-lan on	
	#0：eth1配置ip 1：eth1不配置ip
	if [ "$(uci get networkmode.networkmode.network_eth1_configswitch)" -eq "1" ];then
		#brctl stp br-lan1 on
		##无论eth1有没有配置都桥接在brlan1上，作为acu通信网口
		brctl delif br-lan eth1
		ifconfig eth1 up
		if [ "$(ifconfig | grep -w 'br-lan1 ' |wc -l)" != 0 ];then
			ifconfig br-lan1 0.0.0.0 up
		fi
		brctl addif br-lan1 eth1		
	else
		ifconfig eth1 up
		brctl addif br-lan eth1
	fi


	sh /rcst/rcst_sh/sync_apprestartconfig.sh
fi
