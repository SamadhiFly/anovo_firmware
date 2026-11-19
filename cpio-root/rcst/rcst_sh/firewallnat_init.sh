#!/bin/bash
                                                                                                                          
                                                                                                                                            
                                                                             
comment=$1                                                                                                                                          
vlanid=$2

uci set firewall.$comment=redirect                                                                                      
uci commit firewall   
vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
i=0
while [[ "$i" -lt "$vlannum" ]]
do
	let "i+=1"
	if [ "$(uci show vrfvlanconfig.vlan$i | grep eth_interface | wc -l)" == 0 ] ; then
		eth_interface=0
		echo "netowrk config default i:$i eth_interface:$eth_interface"
	else
		eth_interface=$(uci get vrfvlanconfig.vlan$i.eth_interface)
	fi
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
	wanvrfgateway=$(uci get vrfvlanconfig.vlan$i.wanvrfgateway)
	vmap_switch=$(uci get vrfvlanconfig.vlan$i.vmap_switch)
	vid=$(uci get vrfvlanconfig.vlan$i.vid)
	vmap_sys_vid=$(uci get vrfvlanconfig.vlan$i.vmap_sys_vid)

	if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
				##二三层混合模式
		if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ]  ;then				
			echo "eth$eth_interface network is two-three mixed-mode cur is three_layer need two config"
		else
			if [ "$vlanid" == "$vid" ] ; then
				if [ "$tag" != 0 ];then ##三层网络access
					if [ "$eth_interface" == "0" ];then
						if [ "$(uci show network | grep -w lan | wc -l)" != "0" ];then  
							uci set firewall.$comment.src=wan$vlanid
							uci set firewall.$comment.dest=lan
						fi
					else 
						if [ "$(uci show network | grep -w lan$eth_interface | wc -l)" != "0" ];then
							uci set firewall.$comment.src=wan$vlanid
							uci set firewall.$comment.dest=lan$eth_interface
						fi	
					fi			
				else #三层网络trunk
					if [ "$(uci show network | grep -w lan$vlanid | wc -l)" != "0" ];then
						uci set firewall.$comment.src=wan$vlanid
						uci set firewall.$comment.dest=lan$vlanid
					fi
				fi #if [ "$tag" != 0 ];then
				
			fi #if [ "$vlanid" == "$vid" ] ; then

		fi ##二三层混合模式
	fi	 #if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
		
done	
                                                                                                                       
    uci commit firewall                                                                                                                        
  

      
