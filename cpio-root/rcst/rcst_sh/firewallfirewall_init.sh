#!/bin/bash
                                                                                                                          
                                                                                                                                            
                                                                             
comment=$1                                                                                                                                          
vlanid=$2
desttype=$3

#define LAN 1
#define WAN 2
#define ALL_LW 3
echo "$comment $vlanid $desttype"
if [ "$desttype" == 1 ] ; then
	dest="lan"
elif [ "$desttype" == 2 ] ; then
	dest="wan"
elif [ "$desttype" == 3 ] ; then
	dest="*"
fi
echo "dest:$dest"
uci set firewall.$comment=rule                                                                                      
uci commit firewall   

uci set firewall.$comment.src=*                                                                            
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
			echo "eth$eth_interface network is two-three mixed-mode cur is two_layer"
			if [ "$vlanid" == "$vid" ] ; then
				uci set firewall.$comment.dest=*                                                                        
				uci commit firewall  	
			
			fi	
		else
			if [ "$vlanid" == "$vid" ] ; then
				if [ "$tag" != 0 ];then ##三层网络access
				
					if [ "$dest" == "wan" ];then
						echo " wan dest:$dest"
						uci set firewall.$comment.dest=$dest$vlanid                                                                         
						uci commit firewall
					else #lan
						if [ "$eth_interface" == "0" ];then 
							if [ "$(uci show network | grep -w lan | wc -l)" != "0" ];then    
								if [ "$dest" == "*" ];then   
									uci set firewall.$comment.dest=$dest                                                                        
									uci commit firewall  							
								else                                                                                     
									uci set firewall.$comment.dest=$dest                                                                         
									uci commit firewall  	
								fi
							fi
						else  #if [ "$eth_interface" == "0" ];then 
							if [ "$(uci show network | grep -w lan$eth_interface | wc -l)" != "0" ];then    
								if [ "$dest" == "*" ];then   
									uci set firewall.$comment.dest=$dest                                                                        
									uci commit firewall  							
								else                                                                                     
									uci set firewall.$comment.dest=$dest$eth_interface                                                                         
									uci commit firewall  	
								fi	
							fi
						fi	  #if [ "$eth_interface" == "0" ];then                      
					fi  	#if [ $dest == "wan" ];then 																					
				else #三层网络trunk
					if [ "$(uci show network | grep -w lan$vlanid  | wc -l)" != "0" ];then   
						if [ "$dest" == "*" ];then   
							uci set firewall.$comment.dest=$dest                                                                        
							uci commit firewall  							
						else                                                                                     
							uci set firewall.$comment.dest=$dest$vlanid                                                                         
							uci commit firewall  	
						fi	
					fi
				fi #if [ "$tag" != 0 ];then
			fi #if [ "$vlanid" == "$vid" ] ; then
		fi ##二三层混合模式
	elif  [ "$network_type" == 1 ]  ;then
		if [ "$vlanid" == "$vid" ] ; then
			uci set firewall.$comment.dest=*                                                                        
			uci commit firewall  	
			
		fi	
		
	fi	 #if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
		
done
                                                                                                                       
     uci commit firewall                                                                                                                       
  

      
