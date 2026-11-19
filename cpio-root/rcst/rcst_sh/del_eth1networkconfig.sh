#!/bin/bash

vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
i=0
if [ "$vlannum" != 0 ] ; then
	while [[ "$i" -lt "$vlannum" ]]
	do
		let "i+=1"
		if [ "$(uci show vrfvlanconfig.vlan$i | grep eth_interface | wc -l)" == 0 ] ; then
			eth_interface=0
			echo "netowrk config default i:$i eth_interface:$eth_interface"
		else
			eth_interface=$(uci get vrfvlanconfig.vlan$i.eth_interface)
		fi
		
		if [ "$eth_interface" == 1 ] ; then
			uci del vrfvlanconfig.vlan$i
		fi

	done

fi
uci commit vrfvlanconfig


init_vrfvlanconfig() {
true > /etc/config/eth1notconfigtmp
cp /etc/config/vrfvlanconfig /etc/config/eth1notconfigtmp
sync
true > /etc/config/vrfvlanconfig
vlannum_temp=$(cat /etc/config/eth1notconfigtmp | grep vlan | wc -l)
i_temp=0

uci set vrfvlanconfig.mode=interface
uci set  vrfvlanconfig.mode.tag=$(uci get eth1notconfigtmp.mode.tag)

if [ "$vlannum_temp" != 0 ] ; then
	while [[ "$i_temp" -lt "$vlannum_temp" ]]
	do
		let "i_temp+=1"
		vlanname=$(uci show eth1notconfigtmp | grep eth_interface | sed -n "$i_temp"p | awk -F '[.]' '{print $2}')
		uci set vrfvlanconfig.vlan$i_temp=interface
		uci set vrfvlanconfig.vlan$i_temp.tag=$(uci get eth1notconfigtmp.$vlanname.tag)
		uci set vrfvlanconfig.vlan$i_temp.eth_interface=$(uci get eth1notconfigtmp.$vlanname.eth_interface)
		uci set vrfvlanconfig.vlan$i_temp.network_type=$(uci get eth1notconfigtmp.$vlanname.network_type)
		uci set vrfvlanconfig.vlan$i_temp.vid=$(uci get eth1notconfigtmp.$vlanname.vid)
		uci set vrfvlanconfig.vlan$i_temp.ifname=$(uci get eth1notconfigtmp.$vlanname.ifname)
		uci set vrfvlanconfig.vlan$i_temp.vmap_switch=$(uci get eth1notconfigtmp.$vlanname.vmap_switch)
		uci set vrfvlanconfig.vlan$i_temp.vmap_sys_vid=$(uci get eth1notconfigtmp.$vlanname.vmap_sys_vid)
	done

fi
uci commit vrfvlanconfig
}

eth1_config_init_flag=0
vrfvlanconfig_temp=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
vrfvlanconfig_tempi_temp=0
if [ "$vrfvlanconfig_temp" != 0 ] ; then
	while [[ "$vrfvlanconfig_tempi_temp" -lt "$vrfvlanconfig_temp" ]]
	do
		let "vrfvlanconfig_tempi_temp+=1"
		echo "vrfvlanconfig_tempi_temp:$vrfvlanconfig_tempi_temp"
		echo "$(uci show vrfvlanconfig | grep eth_interface | sed -n "$vrfvlanconfig_tempi_temp"p | awk -F '[.]' '{print $2}')"
		echo "vlan$vrfvlanconfig_tempi_temp"
		if [ "$(uci show vrfvlanconfig | grep eth_interface | sed -n "$vrfvlanconfig_tempi_temp"p | awk -F '[.]' '{print $2}')" != "vlan$vrfvlanconfig_tempi_temp" ] ; then
			
			eth1_config_init_flag=1
			break;
		else
			eth1_config_init_flag=0
		fi
	done

fi
echo "eth1_config_init_flag:$eth1_config_init_flag"
if [ "$eth1_config_init_flag" == 1 ] ; then
	init_vrfvlanconfig
	echo "init_vrfvlanconfig" >> /mnt/rcst_log/status_monitor.txt
fi


