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

sh /rcst/rcst_sh/remote_tcp_stop.sh
uci set firewall.@defaults[0].input='REJECT'
uci set firewall.@defaults[0].output='REJECT'
uci set firewall.@defaults[0].forward='REJECT'
uci set firewall.@zone[0].output='REJECT'
uci set firewall.@zone[0].forward='REJECT'

uci set firewall.@zone[1].input='REJECT'
uci set firewall.@zone[1].output='REJECT'
uci set firewall.@zone[1].forward='REJECT'

uci commit firewall
/etc/init.d/firewall restart

if [ "$networkmode" == 1 ];then

	#~ ifconfig br-wan down
	#~ brctl delbr br-wan
	#~ ifconfig br-lan:1 down
	#~ ifconfig br-lan:2 down
	#~ if [ "$(brctl show | grep -w br-lan:1 | wc -l)" != 0 ];then
	#~ brctl delbr 	br-lan:1
	#~ fi
	#~ if [ "$(brctl show | grep -w br-lan:2 | wc -l)" != 0 ];then
	#~ brctl delbr 	br-lan:2
	#~ fi
	#~ brctl delif br-lan sn0
	#~ /etc/init.d/network restart
	#~ sleep 3
	#~ /etc/init.d/firewall reload
	#~ /etc/init.d/nmi_app_monitor stop
	#~ sleep 1
	#~ /etc/init.d/nmi_app_monitor start
	#~elif [ "$networkmode" == 1 ];then
	sh /rcst/rcst_sh/del_trunkconfig.sh
	ifconfig br-wan down
	brctl delbr br-wan
	ifconfig br-lan:1 down
	ifconfig br-lan:2 down
	ifconfig br-lan:100 down
	if [ "$(brctl show | grep -w br-lan:1 | wc -l)" != 0 ];then
	brctl delbr 	br-lan:1
	fi
	if [ "$(brctl show | grep -w br-lan:2 | wc -l)" != 0 ];then
	brctl delbr 	br-lan:2
	fi
	brctl delif br-lan sn0



	if [ "$(brctl show | grep -w br-lan | wc -l)" -ne "0" ];then
	brctl delif br-lan sn0
	brctl delif br-lan $lan_ifname
	brctl delif br-lan $interface_other_lan_name
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
		#~ vmap_switch=$(uci get vlanconfig.vlan$i.vmap_switch)
		#~ if [ $vmap_switch != 0 ];then
			#~ vid=$(uci get vlanconfig.vlan$i.vmap_user_vlan)
		#~ else
			#~ vid=$(uci get vlanconfig.vlan$i.vid)
		#~ fi	
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
	sh /rcst/rcst_sh/snmp_restart_4.sh &


fi



