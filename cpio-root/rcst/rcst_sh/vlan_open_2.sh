#!/bin/bash
interface_lan_name=$(uci get network.lan.ifname)

if [ "$interface_lan_name" = "eth0" ]; then
interface_other_lan_name="eth1"
else
interface_other_lan_name="eth0"
fi	

vlannum=$(cat /etc/config/vlanconfig | grep vlan | wc -l)
i=0
vlanmode=$(uci get vlan_mode.vlan_mode.vlan_mode)
mtu=$(uci get networkmode.networkmode.mtu)
vlantype=$(uci get vlanconfig.mode.mode)
rcst_type=$(cat /mnt/rcst_type)
acu_ip=$(uci get satellite_config.satellite.src_ip)
if [ "$mtu" == 0 ];then
mtu=1500
fi
if [ "$vlanmode" == 2 ];then
	
	if [ "$vlantype" == 1 ];then
	
	/etc/init.d/network restart
	sleep 1
	/etc/init.d/firewall reload
	brctl addif br-lan sn0
	ifconfig br-lan:2 $acu_ip netmask 255.255.255.0 up #管理口
	if [ "$rcst_type" == 0 ];then
		ifconfig br-lan:100 $(uci get networkmode.networkmode.default_ip) netmask 255.255.255.0 up
	fi		
	else
	
		if [ "$(brctl show | grep -w br-lan | wc -l)" == 0 ];then
			brctl addbr br-lan
		fi
		
		brctl addif br-lan $interface_lan_name	
		ifconfig $interface_lan_name 0.0.0.0 up
		ifconfig $interface_other_lan_name up
		brctl addif br-lan $interface_other_lan_name
		#brctl stp br-lan on
		ifconfig br-lan 0.0.0.0 up	
		ifconfig br-lan:2 $acu_ip netmask 255.255.255.0 up #管理口
		if [ "$rcst_type" == 0 ];then
			ifconfig br-lan:100 $(uci get networkmode.networkmode.default_ip) netmask 255.255.255.0 up
		fi	
	
		while [[ "$i" -lt "$vlannum" ]]
		do
			let "i+=1"
			ifname=$(uci get vlanconfig.vlan$i.ifname)
			vid=$(uci get vlanconfig.vlan$i.vid)
			ipaddr=$(uci get vlanconfig.vlan$i.ipaddr)
			netmask=$(uci get vlanconfig.vlan$i.netmask)
			gateway=$(uci get vlanconfig.vlan$i.gateway)
			
			if [ $vid != 1 ];then
				if [ -z "$(ifconfig | grep $ifname | awk '{print $1}')" ];then
					 ifconfig sn0 0.0.0.0 mtu $mtu         		     
					 ifconfig $interface_lan_name 0.0.0.0  mtu $mtu 
					 vconfig add $interface_lan_name $vid
					 vconfig add sn0 $vid
					 ifconfig $interface_lan_name.$vid 0.0.0.0 mtu $mtu
					 ifconfig sn0.$vid 0.0.0.0 mtu $mtu
					 brctl addbr br-lan$vid
					 brctl addif br-lan$vid $interface_lan_name.$vid
					 brctl addif br-lan$vid sn0.$vid
					 ifconfig br-lan$vid $ipaddr netmask $netmask  hw ether F6:E4:85:$i:$i:04 mtu $mtu up #业务口
				fi	
			fi
		done
	fi
	
	
	cp /etc/config/network /rcst_back/
fi
uci set qos.lan.upload=10240
uci set qos.lan.download=10240
uci set qos.lan.enabled=0
uci commit qos
/etc/init.d/qos reload
