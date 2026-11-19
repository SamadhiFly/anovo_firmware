#!/bin/bash

#删除无效路由
sh /rcst/rcst_sh/null_route_delete.sh > /dev/null

#备份network文件
cp /etc/config/network /rcst_back/

rf_tx_type=$(uci get rf_tx.rf_tx_config.rf_tx_type)
p2p_network_type=$(uci get rf_tx.rf_tx_config.p2p_network_type)
if [ "$rf_tx_type" == 1 ];then
	#lixch@20180926
#	if [ "$p2p_network_type" == 1 ];then
		brctl delif br-lan sn0
#	fi
fi

#重启snmp
#kill -9 $(ps | grep snmp | grep -v grep | awk '{print $1}')
#snmp &
kill -9 $(ps | grep snmp_restart.sh | grep -v grep | awk '{print $1}')
uci set proset.nmi_set=proset
uci set proset.nmi_set.nmi_resetflag=0
uci commit proset
sh /rcst/rcst_sh/snmp_restart.sh & > /dev/null
#重启路由
#~ wan_proto=$(uci get network.wan.proto)
#~ if [ "$wan_proto" = "pppoe" ]; then
#~ uci delete firewall.@rule[0]
#~ uci delete firewall.@rule[0]
#~ uci commit firewall
#~ if [ "$(cat /etc/config/firewall | grep rule | wc -l)" -ge "1" ]; then #lixch20161119 为了防止未删除干净（高级终端出现了此情况）
	#~ uci delete firewall.@rule[0]
	#~ uci delete firewall.@rule[0]
	#~ uci commit firewall
#~ fi
#~ uci add firewall rule
#~ uci set firewall.@rule[0].src='wan'
#~ uci set firewall.@rule[0].proto='igmp'
#~ uci set firewall.@rule[0].target='ACCEPT'
#~ uci add firewall rule
#~ uci set firewall.@rule[1].src='wan'
#~ uci set firewall.@rule[1].proto='udp'
#~ uci set firewall.@rule[1].dest='lan'
#~ uci set firewall.@rule[1].dest_ip='244.0.0.0/4'
#~ uci set firewall.@rule[1].target='ACCEPT'
#~ uci set firewall.@rule[1].family='ipv4'
#~ uci commit firewall
 #~ /etc/init.d/igmpproxy stop

    #~ uci set firewall.@zone[1].masq=1
	#~ uci set firewall.@defaults[0].forward=REJECT
	#~ uci set firewall.@zone[1].forward=REJECT
	#~ uci commit firewall
    #~ /etc/init.d/firewall reload
    #~ sh /rcst/rcst_sh/tos_set.sh &

 #~ /etc/init.d/igmpproxy start
#~ else
/etc/init.d/igmpproxy stop
	#~ if [ "$(cat /etc/config/firewall | grep rule | wc -l)" -ge "1" ]; then #lixch20161119 为了防止未删除干净（高级终端出现了此情况）
		#~ uci delete firewall.@rule[0]
		#~ uci delete firewall.@rule[0]
		#~ uci commit firewall
	#~ fi
var_nat_switch=$(uci get switch_redirect.redirect_set.switch)
	#~ if [ "$var_nat_switch" = "1" ]; then
		#~ uci set firewall.@zone[1].masq=1
		#~ uci set firewall.@defaults[0].forward=REJECT
		#~ uci set firewall.@zone[1].forward=REJECT
		#~ uci commit firewall
		#~ /etc/init.d/firewall reload
		#~ sh /rcst/rcst_sh/tos_set.sh &
	#~ else
		uci set firewall.@zone[1].masq=1
		uci set firewall.@defaults[0].forward=ACCEPT
		uci set firewall.@zone[1].forward=ACCEPT
		uci commit firewall
		/etc/init.d/firewall reload
		iptables -t nat -D zone_wan_postrouting -j MASQUERADE
		sh /rcst/rcst_sh/tos_set.sh &
	#~ fi
#~ fi

#lixch@20180926
rf_tx_type=$( uci get rf_tx.rf_tx_config.rf_tx_type)
#lixch@20180926
if [ "$rf_tx_type" == 1 ];then
	#lixch@20180926
	p2p_network_type=$(uci get rf_tx.rf_tx_config.p2p_network_type)
	if [ "$p2p_network_type" == 1 ];then
		brctl addif br-lan sn0
		uci del network.0000
		uci commit network
	else
		sh /rcst/rcst_sh/wan_default_route.sh
	fi
fi
/etc/init.d/network reload
#acu_ip=$(uci get satellite_config.satellite.src_ip)
#ifconfig br-lan:2 $acu_ip netmask 255.255.255.0 up	
#sh /rcst/rcst_sh/acu_ipconfig.sh				
brlan100_num=$(ifconfig | grep -w "br-lan:100" | wc -l)
if [ "$brlan100_num" == 0 ];then
	brlan100_default_ip=$(uci get networkmode.networkmode.default_ip)
	ifconfig br-lan:100 $brlan100_default_ip netmask 255.255.255.0 up
fi	



if [ "$rf_tx_type" == 1 ];then
	p2p_network_type=$(uci get rf_tx.rf_tx_config.p2p_network_type)
	if [ "$p2p_network_type" == 1 ];then
		brctl addif br-lan sn0
	fi
fi
sleep 1
eth1_num=$(ifconfig | grep "eth1" | wc -l)
if [ "$eth1_num" == 0 ];then
	ifconfig eth1 0.0.0.0  up
fi	
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
	brctl addif br-lan eth1
fi


sh /rcst/rcst_sh/sync_apprestartconfig.sh
