#!/bin/bash
vlannum=$(cat /etc/config/vlanconfig | grep vlan | wc -l)
networkmode=$(uci get networkmode.networkmode.networkmode)
vlantype=$(uci get vlanconfig.mode.mode)
lan_ifname=$(uci get network.lan.ifname)
interface_lan_name=$(uci get network.lan.ifname)
if [ "$interface_lan_name" = "eth0" ]; then
interface_other_lan_name="eth1"
else
interface_other_lan_name="eth0"
fi	
i=0
if [ "$networkmode" == 2 ];then
ifconfig br-wan down
brctl delbr br-wan
/etc/init.d/network restart
elif [ "$networkmode" == 1 ];then

	if [ "$vlantype" == 1 ];then

		/etc/init.d/network restart
		brctl delif br-lan sn0
	else
		uci set qos.lan.upload=10240
		uci set qos.lan.download=10240
		uci set qos.lan.enabled=0
		uci commit qos
		/etc/init.d/qos reload
		uci del network.lan.type
		uci commit network
		/etc/init.d/network restart
		ifconfig br-lan down
		brctl delif br-lan $lan_ifname
		brctl delif br-lan $interface_other_lan_name
		brctl delbr br-lan
		
		
		while [[ "$i" -lt "$vlannum" ]]
		do
			let "i+=1"
			ifname=$(uci get vlanconfig.vlan$i.ifname)
			vid=$(uci get vlanconfig.vlan$i.vid)
			if [ $vid != 1 ];then
				if [ -n "$(ifconfig | grep $ifname | awk '{print $1}')" ];then
						vconfig rem $ifname
						vconfig rem sn0.$vid	            
						ifconfig br-lan$vid down
						brctl delbr br-lan$vid
				fi
			fi
		done
		
	fi
fi


