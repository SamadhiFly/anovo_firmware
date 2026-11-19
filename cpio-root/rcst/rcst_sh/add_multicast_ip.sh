#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info add_multicast_ip"[$(ps | grep add_multicast_ip.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

vlanid=$1
multicast_ip=$2
multicast_flag=$3
operation=$4
syslog_sh "add_multicast_ip:vlanid:$vlanid multicast_ip:$multicast_ip operation:$operation multicast_flag:$multicast_flag"

del_multicast_ip()
{
	del_multicast_ip_num=$(cat /etc/pimd.conf | grep "$multicast_ip/32" | wc -l)
	echo "$del_multicast_ip_num $del_multicast_ip_num"
	i=0
	if [ "$del_multicast_ip_num" != 0 ] ; then
		while [[ "$i" -lt "$del_multicast_ip_num" ]]
		do	
		let "i+=1"
		del_multicast_ip_name=$(grep -rn "$multicast_ip/32" /etc/pimd.conf  | awk '-F[:]' '{print $1}' | sed -n "$i"p )
		echo "$del_multicast_ip_name $del_multicast_ip_name"
		sed -i "$del_multicast_ip_name d" /etc/pimd.conf
		done
	fi
}

add_multicast() {
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
		#syslog_sh "1111:$vlanid $vmap_sys_vid $vmap_switch"
		if [ "$vlanid" == "$vmap_sys_vid" ] ; then
			if [ "$vmap_switch" == 0 ] ; then
				vlanid_temp=$vlanid
			else
				vlanid_temp=$(uci get vrfvlanconfig.vlan$i.vid)
			fi
		else
			vlanid_temp=$vlanid
		fi
		#syslog_sh "4444:$vlanid_temp $vlanid"
		if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
					##二三层混合模式
			if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ]  ;then				
				echo "eth$eth_interface network is two-three mixed-mode cur is three_layer need two config"
			else
				if [ "$vlanid_temp" == "$vid" ] ; then
					if [ "$tag" != 0 ];then ##三层网络access
						if [ "$eth_interface" == "0" ];then 
							
							if [ "$(ip route show table $i |grep $multicast_ip | grep -v multicast | wc -l)" == 0 ];then
								route add -net $multicast_ip/32 dev br-lan								
								syslog_sh "route add -net $multicast_ip/32 dev br-lan"	
							fi
							if [ "$(cat /etc/pimd_vlan$vid.conf | grep "$multicast_ip/32" | wc -l)" == 0 ];then
								echo "rp-address $wanvrfgateway $multicast_ip/32" >> /etc/pimd_vlan$vid.conf								
							fi
							if [ "$multicast_flag" == 1 ];then
								if [ "$(cat /tmp/multicast_staticroute_add.sh | grep route | grep -w br-lan | grep $multicast_ip | wc -l)" == 0 ];then
									echo "route add -net $multicast_ip/32 dev br-lan" >> /tmp/multicast_staticroute_add.sh
									echo "route del -net $multicast_ip/32 dev br-lan" >> /tmp/multicast_staticroute_del.sh
								fi
								if [ "$(cat /tmp/multicast_staticroute_add.sh | grep rp-address | grep -w /etc/pimd_vlan$vid.conf | grep $multicast_ip | wc -l)" == 0 ];then
									echo "echo \"rp-address $wanvrfgateway $multicast_ip/32\" >> /etc/pimd_vlan$vid.conf" >> /tmp/multicast_staticroute_add.sh
								fi
							else
								if [ "$(cat /tmp/multicast_route_add.sh | grep route | grep -w br-lan | grep $multicast_ip | wc -l)" == 0 ];then
									echo "route add -net $multicast_ip/32 dev br-lan" >> /tmp/multicast_route_add.sh
									echo "route del -net $multicast_ip/32 dev br-lan" >> /tmp/multicast_route_del.sh
								fi
								if [ "$(cat /tmp/multicast_route_add.sh | grep rp-address | grep -w /etc/pimd_vlan$vid.conf | grep $multicast_ip | wc -l)" == 0 ];then
									echo "echo \"rp-address $wanvrfgateway $multicast_ip/32\" >> /etc/pimd_vlan$vid.conf" >> /tmp/multicast_route_add.sh
								fi
								
							fi
							echo "route add -net $multicast_ip/32 dev br-lan"
						else 
							if [ "$(ip route show table $i |grep $multicast_ip | grep -v multicast | wc -l)" == 0 ];then
								route add -net $multicast_ip/32 dev br-lan$eth_interface
								syslog_sh "route add -net $multicast_ip/32 dev br-lan$eth_interface"
							fi

#							del_multicast_ip
							if [ "$(cat /etc/pimd_vlan$vid.conf | grep "$multicast_ip/32" | wc -l)" == 0 ];then
								echo "rp-address $wanvrfgateway $multicast_ip/32" >> /etc/pimd_vlan$vid.conf
								
							fi
							if [ "$multicast_flag" == 1 ];then
								if [ "$(cat /tmp/multicast_staticroute_add.sh | grep route | grep -w br-lan$eth_interface| grep $multicast_ip | wc -l)" == 0 ];then
									echo "route add -net $multicast_ip/32 dev br-lan$eth_interface" >> /tmp/multicast_staticroute_add.sh
									echo "route del -net $multicast_ip/32 dev br-lan$eth_interface" >> /tmp/multicast_staticroute_del.sh
								fi
								if [ "$(cat /tmp/multicast_staticroute_add.sh | grep rp-address | grep -w /etc/pimd_vlan$vid.conf | grep $multicast_ip | wc -l)" == 0 ];then
									echo "echo \"rp-address $wanvrfgateway $multicast_ip/32\" >> /etc/pimd_vlan$vid.conf" >> /tmp/multicast_staticroute_add.sh
								fi
							else
								if [ "$(cat /tmp/multicast_route_add.sh | grep route | grep -w br-lan$eth_interface| grep $multicast_ip | wc -l)" == 0 ];then
									echo "route add -net $multicast_ip/32 dev br-lan$eth_interface" >> /tmp/multicast_route_add.sh
									echo "route del -net $multicast_ip/32 dev br-lan$eth_interface" >> //tmp/multicast_route_del.sh
								fi
								if [ "$(cat /tmp/multicast_route_add.sh | grep rp-address | grep -w /etc/pimd_vlan$vid.conf | grep $multicast_ip | wc -l)" == 0 ];then
									echo "echo \"rp-address $wanvrfgateway $multicast_ip/32\" >> /etc/pimd_vlan$vid.conf" >> /tmp/multicast_route_add.sh
								fi														
							fi
							echo "route add -net $multicast_ip/32 dev br-lan$eth_interface"
						fi			
					else #三层网络trunk
						if [ "$(ip route show table $i |grep $multicast_ip | grep -v multicast | wc -l)" == 0 ];then
							route add -net $multicast_ip/32 dev br-lan$vlanid_temp	
							
							syslog_sh "route add -net $multicast_ip/32 dev br-lan$vlanid_temp"	
						fi
#						del_multicast_ip
						if [ "$(cat /etc/pimd_vlan$vid.conf | grep "$multicast_ip/32" | wc -l)" == 0 ];then
							echo "rp-address $wanvrfgateway $multicast_ip/32" >> /etc/pimd_vlan$vid.conf	
							
						fi
						if [ "$multicast_flag" == 1 ];then
							if [ "$(cat /tmp/multicast_staticroute_add.sh | grep route | grep -w br-lan$vlanid_temp | grep $multicast_ip | wc -l)" == 0 ];then
								echo "route add -net $multicast_ip/32 dev br-lan$vlanid_temp" >> /tmp/multicast_staticroute_add.sh
								echo "route del -net $multicast_ip/32 dev br-lan$vlanid_temp" >> /tmp/multicast_staticroute_del.sh
							fi
							if [ "$(cat /tmp/multicast_staticroute_add.sh | grep rp-address | grep -w /etc/pimd_vlan$vid.conf | grep $multicast_ip | wc -l)" == 0 ];then
								echo "echo \"rp-address $wanvrfgateway $multicast_ip/32\" >> /etc/pimd_vlan$vid.conf" >> /tmp/multicast_staticroute_add.sh
							fi
						else
							if [ "$(cat /tmp/multicast_route_add.sh | grep route | grep -w br-lan$vlanid_temp | grep $multicast_ip | wc -l)" == 0 ];then
								echo "route add -net $multicast_ip/32 dev br-lan$vlanid_temp" >> /tmp/multicast_route_add.sh
								echo "route del -net $multicast_ip/32 dev br-lan$vlanid_temp" >> /tmp/multicast_route_del.sh
							fi
							if [ "$(cat /tmp/multicast_route_add.sh | grep rp-address | grep -w /etc/pimd_vlan$vid.conf | grep $multicast_ip | wc -l)" == 0 ];then
								echo "echo \"rp-address $wanvrfgateway $multicast_ip/32\" >> /etc/pimd_vlan$vid.conf" >> /tmp/multicast_route_add.sh
							fi
						fi
						echo "route add -net $multicast_ip/32 dev br-lan$vlanid_temp"		
					fi #if [ "$tag" != 0 ];then
				fi #if [ "$vlanid_temp" == "$vid" ] ; then
#				echo "rp-address $wanvrfgateway $multicast_ip/32" >> /etc/pimd.conf
			fi ##二三层混合模式
		fi	 #if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
			
	done
}


del_multicast() {
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
		vmap_switch=$(uci get vrfvlanconfig.vlan$i.vmap_switch)
		vid=$(uci get vrfvlanconfig.vlan$i.vid)
		vmap_sys_vid=$(uci get vrfvlanconfig.vlan$i.vmap_sys_vid)
		#syslog_sh "2222:$vlanid $vmap_sys_vid $vmap_switch"
		if [ "$vlanid" == "$vmap_sys_vid" ] ; then
			if [ "$vmap_switch" == 0 ] ; then
				vlanid_temp=$vlanid
			else
				vlanid_temp=$(uci get vrfvlanconfig.vlan$i.vid)
			fi
		else
			vlanid_temp=$vlanid
		fi
		#syslog_sh "3333:$vlanid_temp $vlanid"
		if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
					##二三层混合模式
			if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ]  ;then				
				echo "eth$eth_interface network is two-three mixed-mode cur is three_layer need two config"
			else
				#if [ "$vlanid" == "$vid" ] ; then
					if [ "$tag" != 0 ];then ##三层网络access
						if [ "$eth_interface" == "0" ];then 
							if [ "$(cat /mnt/multicast_route_del.sh | grep "$multicast_ip/32" | wc -l)" == 0 ];then
								#route del -net $multicast_ip/32 dev br-lan
								echo "route del -net $multicast_ip/32 dev br-lan" >> /mnt/multicast_route_del.sh
								syslog_sh "route del -net $multicast_ip/32 dev br-lan"
							fi
							echo "route del -net $multicast_ip/32 dev br-lan"
						else 
							if [ "$(cat /mnt/multicast_route_del.sh | grep "$multicast_ip/32" | wc -l)" == 0 ];then
								#route del -net $multicast_ip/32 dev br-lan$eth_interface
								echo "route del -net $multicast_ip/32 dev br-lan$eth_interface" >> /mnt/multicast_route_del.sh
								syslog_sh "route del -net $multicast_ip/32 dev br-lan$eth_interface"
							fi
							echo "route del -net $multicast_ip/32 dev br-lan$eth_interface"
						fi			
					else #三层网络trunk
						if [ "$(cat /mnt/multicast_route_del.sh | grep "$multicast_ip/32" | wc -l)" == 0 ];then
							#route del -net $multicast_ip/32 dev br-lan$vlanid_temp
							echo "route del -net $multicast_ip/32 dev br-lan$vlanid_temp"	>> /mnt/multicast_route_del.sh	 
							syslog_sh "route del -net $multicast_ip/32 dev br-lan$vlanid_temp"
						fi
						echo "route del -net $multicast_ip/32 dev br-lan$vlanid_temp"		
					fi #if [ "$tag" != 0 ];then
				#fi #if [ "$vlanid" == "$vid" ] ; then
			fi ##二三层混合模式
		fi	 #if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
			
	done
}

if [ "$operation" -eq "1" ] ; then  
echo 111
add_multicast
#pimd -q
#kill -9 $(ps | grep pimd | grep -v grep | awk '{print $1}')
#pimd -c /etc/pimd.conf &
elif [ "$operation" -eq "2" ] ; then 
echo 222
del_multicast
fi
