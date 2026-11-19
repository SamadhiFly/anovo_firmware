#!/bin/bash
interface_lan_name=$(uci get network.lan.ifname)

if [ "$interface_lan_name" = "eth0" ]; then
interface_other_lan_name="eth1"
else
interface_other_lan_name="eth0"
fi	

vlannum=$(cat /etc/config/vlanconfig | grep vlan | wc -l)
i=0
networkmode=$(uci get networkmode.networkmode.networkmode)
mtu=$(uci get networkmode.networkmode.mtu)
#vlantype=$(uci get vlanconfig.mode.mode)
wan_ip=$(uci get network.wan.ipaddr)
wan_netmask=$(uci get network.wan.netmask)
acu_ip=$(uci get satellite_config.satellite.src_ip)
vlantype=$(uci get vlanconfig.mode.tag)
trunk_mode=$(uci get vlanconfig.mode.trunk_mode)
gateway=$(uci get network.0000.gateway)
rcst_type=$(cat /mnt/rcst_type)
if [ "$mtu" == 0 ];then
mtu=1600
fi

local_rcst_mac=$(cat /etc/config/rcst_mac | grep rcst_mac | awk '{print $2":"$3":"$4":"$5":"$6":"$7}')

if [ "$networkmode" == 1 ];then
	
	if [ "$vlantype" == 0 ];then #trunk
	

#		if [ "$trunk_mode" == 2 ];then  #//上次终端为access模式 向trunk切换
#		if [ "$(ifconfig | grep 'br-lan:100 ' |wc -l)" != 0 ];then
#			ifconfig br-lan:100 down
#		fi

		if [ "$(ifconfig | grep 'br-wan:100 ' |wc -l)" != 0 ];then
			ifconfig br-wan:100 down
		fi

		if [ "$(ifconfig | grep 'br-wan:2 ' |wc -l)" != 0 ];then
			ifconfig br-wan:2 down
		fi

		if [ "$(ifconfig | grep 'br-lan:1 ' |wc -l)" != 0 ];then
			ifconfig br-lan:1 down
		fi


		
#		if [ "$(ifconfig | grep 'br-lan:2 ' |wc -l)" != 0 ];then
#			ifconfig br-lan:2 down
#		fi
		
#		if [ "$(ifconfig | grep 'br-lan ' |wc -l)" != 0 ];then
#			ifconfig br-lan down
#		fi							
			
#			uci set vlanconfig.mode.trunk_mode=0
#			uci commit vlanconfig

#		fi

			ifconfig sn0 0.0.0.0 mtu $mtu   	     
			ifconfig $interface_lan_name 0.0.0.0  mtu $mtu  
			
			while [[ "$i" -lt "$vlannum" ]]
			do
				let "i+=1"
				ifname=$(uci get vlanconfig.vlan$i.ifname)
				vid=$(uci get vlanconfig.vlan$i.vid)
				
				if [ $vid != 0 ];then
				ifname_num=$(ifconfig | grep "$ifname " | awk '{print $1}' | wc -l)
					if [ "$ifname_num" == 0 ];then

						 vconfig add $interface_lan_name $vid
						 vconfig add sn0 $vid
						 ifconfig $interface_lan_name.$vid 0.0.0.0 mtu $mtu
						 ifconfig sn0.$vid 0.0.0.0 mtu $mtu 


					fi						
				fi
			done
			i=0
			while [[ "$i" -lt "$vlannum" ]]
			do
				let "i+=1"
				ifname=$(uci get vlanconfig.vlan$i.ifname)
				vid=$(uci get vlanconfig.vlan$i.vid)
				
				if [ $vid != 0 ];then
				ifname_num=$(ifconfig | grep "$ifname " | awk '{print $1}' | wc -l)
					if [ "$ifname_num" != 0 ];then

						 brctl addbr br-lan$vid
						 brctl addif br-lan$vid $interface_lan_name.$vid
						 brctl addif br-lan$vid sn0.$vid

						 #brctl stp br-lan$vid on
						ifconfig br-lan$vid 0.0.0.0 hw ether F6:E4:85:$i:$i:04 mtu $mtu up #业务口

					fi						
				fi
			done
			
			ifconfig  $interface_lan_name 0.0.0.0 up
		
			ifconfig sn0 0.0.0.0  up
			if [ "$(brctl show | grep -w br-wan | wc -l)" == 0 ];then
			brctl addbr br-wan
			fi
#			brctl addif br-wan $interface_lan_name		
			brctl addif br-wan sn0
			#brctl stp br-wan on

			if [ "$(brctl show | grep -w br-lan | wc -l)" == 0 ];then
				brctl addbr br-lan
			fi
			
			brctl addif br-lan $interface_lan_name	
			ifconfig $interface_other_lan_name up
			brctl addif br-lan $interface_other_lan_name
		
			#brctl stp br-lan on
			ifconfig br-lan 0.0.0.0 up				
			
			sn0_mac=$(ifconfig -a sn0 | grep HWaddr | awk '{print $5}')
			ifconfig br-wan $wan_ip netmask $wan_netmask hw ether $sn0_mac up #管理口
			ifconfig br-lan:2 $acu_ip netmask 255.255.255.0 up #管理口
			route del default gw $(route | grep default | awk '{print $2}')
			route add default gw $gateway
		
#			if [ "$rcst_type" == 0 ];then
				ifconfig br-lan:100 $(uci get networkmode.networkmode.default_ip) netmask 255.255.255.0 up
#			fi
			
	else #access
	
#		if [ "$trunk_mode" == 1 ];then     #//上次终端为trunk模式 向access切换

		if [ "$(ifconfig | grep 'br-wan:100 ' |wc -l)" != 0 ];then
			ifconfig br-wan:100 down
		fi

		if [ "$(ifconfig | grep 'br-wan:2 ' |wc -l)" != 0 ];then
			ifconfig br-wan:2 down
		fi

		if [ "$(ifconfig | grep 'br-wan ' |wc -l)" != 0 ];then
			ifconfig br-wan down
		fi				
#			uci set vlanconfig.mode.trunk_mode=0
#			uci commit vlanconfig

#		fi
	
		if [ "$(brctl show | grep -w br-wan | wc -l)" -ne "0" ];then
			brctl delif br-wan sn0
			brctl delif br-wan $interface_lan_name
			brctl delbr br-wan
		fi
		
		if [ "$(brctl show | grep -w br-lan | wc -l)" == 0 ];then
			brctl addbr br-lan
		fi
		sleep 1
		/etc/init.d/firewall reload
		brctl addif  br-lan $interface_lan_name
		brctl addif  br-lan sn0
		#brctl stp br-lan on
		
		ifconfig $interface_other_lan_name up
		brctl addif br-lan $interface_other_lan_name		
		
		ifconfig br-lan 0.0.0.0 up
		echo "0" > /sys/devices/virtual/net/br-lan/bridge/multicast_snooping
		echo 2 > /proc/sys/net/ipv4/conf/all/force_igmp_version
		iptables -t mangle -A PREROUTING -p ospf -j TTL --ttl-inc 1
		ifconfig sn0 0.0.0.0 mtu $mtu hw ether $local_rcst_mac up
		ifconfig $interface_lan_name mtu $mtu up
		ifconfig br-lan 0.0.0.0 mtu $mtu up
		ifconfig br-lan:1 $wan_ip netmask $wan_netmask up
		ifconfig br-lan:2 $acu_ip netmask 255.255.255.0 up
		
		route del default gw $(route | grep default | awk '{print $2}')
		route add default gw $gateway
		
#		if [ "$rcst_type" == 0 ];then
			ifconfig br-lan:100 192.168.251.1 netmask 255.255.255.0 up
#		fi
	fi
	
#	echo 0 > /proc/sys/net/bridge/bridge-nf-call-iptables #lixch@20201112
	cp /etc/config/network /rcst_back/
fi
#~ uci set qos.lan.upload=10240
#~ uci set qos.lan.download=10240
#~ uci set qos.lan.enabled=0
#~ uci commit qos
#~ /etc/init.d/qos reload
