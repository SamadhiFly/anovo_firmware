#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info pimd_conf"[$(ps | grep pimd_conf.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

#~ iii_vlan_tag=$(uci get networkmode.networkmode.tag)
#~ networkmode=$(uci get networkmode.networkmode.networkmode)
#~ if [ "$networkmode" == 2 ];then
	#~ #三层access模式
	#~ if [ $iii_vlan_tag == 1 ];then
		#~ pimd_switch=$(uci get switch_redirect.redirect_set.pimd_switch)
		#~ if [ $pimd_switch == 1 ];then
			#~ kill -9 $(ps | grep pimd | grep -v grep | awk '{print $1}')
			#~ cp /rcst/rcst_sh/pimd.conf /etc

			#~ vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
			#~ if [ $vlannum == 1 ];then
				#~ vid=$(uci get vrfvlanconfig.vlan1.vid)
				#~ wanvrfip=$(uci get vrfvlanconfig.vlan1.wanvrfip)
				#~ wanvrfnetmask=$(uci get vrfvlanconfig.vlan1.wanvrfnetmask)
				#~ wanvrfgateway=$(uci get vrfvlanconfig.vlan1.wanvrfgateway)

#				echo bsr-candidate sn0.$vid priority 1 >> /etc/pimd.conf
#				echo rp-candidate sn0.$vid time 30 priority 1 >> /etc/pimd.conf
#				echo rp-address $wanvrfgateway 224.0.0.0/4 >> /etc/pimd.conf
			#~ else
				#~ syslog_sh "warning-->>pimd_conf III access vlannum:$vlannum != 1....!"
			#~ fi		
			
			#~ pimd -c /etc/pimd.conf &
		#~ else
			#~ kill -9 $(ps | grep pimd | grep -v grep | awk '{print $1}')
		#~ fi
	#~ else
		pimd_switch=$(uci get switch_redirect.redirect_set.pimd_switch)
		
		if [ $pimd_switch == 1 ];then
			kill -9 $(ps | grep pimd | grep -v grep | awk '{print $1}')
			killall pimd
#			cp /rcst/rcst_sh/pimd_4.conf /etc/pimd.conf
			rm /etc/pimd_vlan*
			i=0
			vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
			while [[ "$i" -lt "$vlannum" ]]
			do	
				let "i+=1"
				vid=$(uci get vrfvlanconfig.vlan$i.vid)
				#networkmode=$(uci get vrfvlanconfig.vlan$i.network_type)
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
				if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
							##二三层混合模式
					if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ]  ;then				
						echo "eth$eth_interface network is two-three mixed-mode cur is three_layer need two config"
					else	
						wanvrfip=$(uci get vrfvlanconfig.vlan$i.wanvrfip)
						wanvrfgateway=$(uci get vrfvlanconfig.vlan$i.wanvrfgateway)

						if [ $vid != 0 ];then
							#if [ "$(uci get networkmode.eth$eth_interface.bridge)" == "0" ];then 
								cp /rcst/rcst_sh/pimd_4.conf /etc/pimd_vlan$vid.conf
								if [ "$(cat /etc/pimd_vlan$vid.conf | grep -w "sn0.$vid" | wc -l)" == "0" ] ; then 
									#echo bsr-candidate sn0.$vid priority $i >> /etc/pimd_vlan$vid.conf
									#echo rp-candidate sn0.$vid time 30 priority $i >> /etc/pimd_vlan$vid.conf
									if [ "$tag" != 0 ];then ##三层网络access
										if [ "$eth_interface" == "0" ];then 
											echo "phyint br-lan enable" >> /etc/pimd_vlan$vid.conf
										else 
											echo "phyint br-lan1 enable" >> /etc/pimd_vlan$vid.conf
										fi			
									else #三层网络trunk
											echo "phyint br-lan$vid enable" >> /etc/pimd_vlan$vid.conf
									fi #if [ "$tag" != 0 ];then
									echo "phyint sn0.$vid enable" >> /etc/pimd_vlan$vid.conf								
									echo "rp-address $wanvrfgateway 224.0.0.0/4" >> /etc/pimd_vlan$vid.conf
									echo "rp-address $wanvrfgateway 224.0.0.13/32" >> /etc/pimd_vlan$vid.conf	
									echo "rp-address $wanvrfgateway 224.0.0.22/32" >> /etc/pimd_vlan$vid.conf	
									echo "rp-address $wanvrfgateway 224.0.0.2/32" >> /etc/pimd_vlan$vid.conf	
									echo "rp-address $wanvrfgateway 224.0.0.251/32" >> /etc/pimd_vlan$vid.conf
								else
									echo "sn0.$vid has exit"
								fi						
								if [ $(ps | grep -v grep |grep /etc/pimd_vlan$vid.conf | wc -l) == 0 ];then
									sh /tmp/multicast_route_add.sh
									sh /tmp/multicast_staticroute_add.sh
									pimd -t $i -N -s err -c /etc/pimd_vlan$vid.conf &	
								fi	
							#fi #if [ "$(uci get networkmode.eth$eth_interface.bridge)" == "0" ];then
						fi	#if [ $vid != 0 ];then
					fi	###二三层混合模式
				fi	 #if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
			done
				
#			pimd -c /etc/pimd.conf &
		else
			kill -9 $(ps | grep pimd | grep -v grep | awk '{print $1}')
		fi
#	fi
#~ else #er ceng
	#~ kill -9 $(ps | grep pimd | grep -v grep | awk '{print $1}')
#~ fi	
