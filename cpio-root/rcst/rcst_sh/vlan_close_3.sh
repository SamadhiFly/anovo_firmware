#!/bin/bash
vlannum=$(cat /etc/config/vlanconfig | grep vlan | wc -l)
networkmode=$(uci get networkmode.networkmode.networkmode)
vlantype=$(uci get vlanconfig.mode.tag)
lan_ifname=$(uci get network.lan.ifname)
if [ "$lan_ifname" = "eth0" ]; then
interface_other_lan_name="eth1"
else
interface_other_lan_name="eth0"
fi	
trunk_mode=$(uci get vlanconfig.mode.trunk_mode)
interface_lan_name=$(uci get network.lan.ifname)
i=0

if [ "$networkmode" == 2 ];then

	ifconfig br-wan down
	brctl delbr br-wan
	ifconfig br-lan:1 down
	ifconfig br-lan:2 down
	ifconfig br-lan:5 down
	ifconfig br-lan1:2 down
	ifconfig br-lan1:5 down
	ifconfig br-lan1 down
	if [ "$(brctl show | grep -w br-lan:1 | wc -l)" != 0 ];then
	brctl delbr 	br-lan:1
	fi
	if [ "$(brctl show | grep -w br-lan:2 | wc -l)" != 0 ];then
	brctl delbr 	br-lan:2
	fi
	if [ "$(brctl show | grep -w br-lan1:2 | wc -l)" != 0 ];then
	brctl delbr 	br-lan1:2
	fi	
	if [ "$(brctl show | grep -w br-lan1 | wc -l)" -ne "0" ];then
		brctl delif br-lan1 eth1
	fi				
	if [ "$(brctl show | grep -w br-lan1 | wc -l)" != 0 ];then
		brctl delbr 	br-lan1
	fi		
	brctl delif br-lan sn0
	/etc/init.d/network restart
	if [ "$(brctl show |grep $interface_lan_name | wc -l)" -eq "0" ]; then
			brctl addif br-lan $interface_lan_name
	fi
	mtu=$(uci get network.lan.mtu)
	lanip=$(ifconfig br-lan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	if [ ! "$lanip" ];then
		ifconfig br-lan $(uci get network.lan.ipaddr) netmask $(uci get network.lan.netmask) mtu $mtu up
	fi
	sleep 3
	/etc/init.d/firewall reload
elif [ "$networkmode" == 1 ];then

	ifconfig br-lan:5 down
	ifconfig br-lan1:2 down
	ifconfig br-lan1:5 down
	ifconfig br-lan1 down	
	if [ "$(brctl show | grep -w br-lan | wc -l)" -ne "0" ];then
	brctl delif br-lan sn0
	brctl delif br-lan $lan_ifname
	brctl delif br-lan $interface_other_lan_name
	fi
	if [ "$(brctl show | grep -w br-lan1 | wc -l)" -ne "0" ];then
		brctl delif br-lan1 eth1
	fi				
	if [ "$(brctl show | grep -w br-lan1 | wc -l)" != 0 ];then
		brctl delbr 	br-lan1
	fi	
	if [ "$(brctl show | grep -w br-wan | wc -l)" -ne "0" ];then
	brctl delif br-wan sn0
	brctl delif br-wan $lan_ifname
	fi
	

	if [ "$vlantype" == 0 ];then #trunk

	while [[ "$i" -lt "$vlannum" ]]
	do
		let "i+=1"
		ifname=$(uci get vlanconfig.vlan$i.ifname)
		vid=$(uci get vlanconfig.vlan$i.vid)
		ifname_num=$(ifconfig | grep "$ifname " | awk '{print $1}' | wc -l)
#		if [ $vid != 0 ];then
			if [ "$ifname_num" != 0  ];then
					vconfig rem $ifname
					vconfig rem sn0.$vid	           
					ifconfig br-lan$vid down
					brctl delbr br-lan$vid
			fi
#		fi
	done

	fi

	/etc/init.d/network reload


fi



