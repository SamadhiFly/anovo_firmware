#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info run_newnetwork_config"[$(ps | grep run_newnetwork_config.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
mtu=$(uci get networkmode.networkmode.mtu)
if [ "$mtu" == 0 ];then
	mtu=1500
fi
vlan_exit_flag=0
i=0

local_rcst_mac=$(cat /etc/config/rcst_mac | grep rcst_mac | awk '{print $2":"$3":"$4":"$5":"$6":"$7}')
acu_ip=$(uci get satellite_config.satellite.src_ip)
brlan100_default_ip=$(uci get networkmode.networkmode.default_ip)
networkmode_type_exit_flag=0  #网口断当前配置是否和之前配置一致 0:不一致 1一致
sh /rcst/rcst_sh/remote_tcp_stop.sh

#0：eth0配置管理口 1：eth1配置管理口
network_acubrlaneth_flag=$(uci get networkmode.networkmode.network_acubrlaneth_flag) 

#0：eth1配置ip 1：eth1不配置ip
network_eth1_configswitch=$(uci get networkmode.networkmode.network_eth1_configswitch)

#kill -9 $(ps | grep "/usr/lib/ipsec" | grep -v grep | awk '{print $1}')
#kill -9 $(ps | grep "/usr/lib/ipsec/charon" | grep -v grep | awk '{print $1}')

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
			if [ -z $vid  ] ; then
				echo  "4.0 uci get vrfvlanconfig.vlan$i.vid is null" >> /mnt/rcst_log/abridged_log.txt
				syslog_sh  "4.0 uci get vrfvlanconfig.vlan$i.vid is null"
				vid=50
				let "vid+=$i"
			fi
			vmap_sys_vid=$(uci get vrfvlanconfig.vlan$i.vmap_sys_vid)
			if [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ] ; then
				lanvrfip=$(uci get network.lan.ipaddr)
				echo "netowrk config default i:$i lanvrfip:$lanvrfip"
			else
				lanvrfip=$(uci get vrfvlanconfig.vlan$i.lanvrfip)
			fi

			if [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfnetmask | wc -l)" == 0 ] ; then
				lanvrfnetmask=$(uci get network.lan.netmask)
				echo "netowrk config default i:$i lanvrfnetmask:$lanvrfnetmask"
			else
				lanvrfnetmask=$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask)
			fi
			
			#lanvrfnetmask=$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask)
			wanvrfip=$(uci get vrfvlanconfig.vlan$i.wanvrfip)
			wanvrfnetmask=$(uci get vrfvlanconfig.vlan$i.wanvrfnetmask)
			wanvrfgateway=$(uci get vrfvlanconfig.vlan$i.wanvrfgateway)
			dhcp_start_ip=$(uci get vrfvlanconfig.vlan$i.dhcp_start_ip)
			dhcp_end_ip=$(uci get vrfvlanconfig.vlan$i.dhcp_end_ip)
			dhcp_lease=$(uci get vrfvlanconfig.vlan$i.dhcp_lease)
			
			ifname=$(uci get vrfvlanconfig.vlan$i.ifname)						
			wan_ip=$(uci get network.wan.ipaddr)
			wan_netmask=$(uci get network.wan.netmask)
			gateway=$(uci get networkmode.networkmode.defaultgw)
			echo "netowrk config i:$i vlannum:$vlannum"

			echo "netowrk config network_type:$network_type 
			eth_interface:$eth_interface 
			tag:$tag 
			vmap_switch:$vmap_switch 
			vid:$vid 
			vmap_sys_vid:$vmap_sys_vid 
			lanvrfip:$lanvrfip 
			lanvrfnetmask:$lanvrfnetmask 
			wanvrfip:$wanvrfip 
			wanvrfnetmask:$wanvrfnetmask 
			wanvrfgateway:$wanvrfgateway 
			dhcp_start_ip:$dhcp_start_ip 
			dhcp_end_ip:$dhcp_start_ip 
			dhcp_lease:$dhcp_lease"
			
			echo "netowrk config ifname:$ifname
			wan_ip:$wan_ip 
			wan_netmask:$wan_netmask 
			gateway:$gateway"
			
		##判断当前配置是否和之前配置一致
		networkmode_ethnum=$(cat /etc/config/networkmode | grep eth | wc -l)
		networkmode_eth_i=0
		while [[ "$networkmode_eth_i" -lt "$networkmode_ethnum" ]]
		do
			let "networkmode_eth_i+=1"
			networkmode_network_name=$(cat /etc/config/networkmode  | grep eth | sed -n "$networkmode_eth_i"p | awk  -F "[\']+" '{print $2}')
			networkmode_network_type=$(uci get networkmode.$networkmode_network_name.network_type)
			networkmode_network_tag=$(uci get networkmode.$networkmode_network_name.tag)
			networkmode_eth_vid_i=0
			networkmode_eth_vid_num=$(uci show networkmode.$networkmode_network_name | grep vid | wc -l)
			echo "netowrkmode networkmode_eth_vid_num:$networkmode_eth_vid_num "
			networkmode_network_vid_flag=0
			networkmode_network_vid=0
			while [[ "$networkmode_eth_vid_i" -lt "$networkmode_eth_vid_num" ]]
			do
				let "networkmode_eth_vid_i+=1"
				networkmode_network_vid=$(uci get networkmode.$networkmode_network_name.vid$networkmode_eth_vid_i)		
				echo "netowrkmode networkmode_network_vid:$networkmode_network_vid $vid"
				if [ "$networkmode_network_vid" == "$vid" ]  ;then
					networkmode_network_vid_flag=1
					echo "netowrkmode networkmode_network_vid:$networkmode_network_vid $vid same"
					break;
				else
					networkmode_network_vid_flag=0
					echo "netowrkmode networkmode_network_vid:$networkmode_network_vid $vid diff"
				fi
			done
			networkmode_network_eth_interface=$(uci get networkmode.$networkmode_network_name.eth_interface)
			echo "netowrkmode networkmode_network_name:$networkmode_network_name
						networkmode_network_type:$networkmode_network_type 
						networkmode_network_tag:$networkmode_network_tag 
						networkmode_network_vid_flag:$networkmode_network_vid_flag 
						networkmode_network_eth_interface:$networkmode_network_eth_interface"
			
			if [ "$networkmode_network_name" != "eth$eth_interface" ]  ;then
				if [ "$networkmode_network_vid_flag" == 1 ] && [ "$networkmode_network_tag" == "$tag" ]  ;then
					echo "netowrkmode networkmode_network_name eth$eth_interface networkmode_network_name:$networkmode_network_name network type same"			
					networkmode_type_exit_flag=1
					break;
				else
					networkmode_type_exit_flag=0
				fi
			else
				networkmode_type_exit_flag=0
			fi				
		done
		echo "networkmode_type_exit_flag:$networkmode_type_exit_flag"
		if [ "$networkmode_type_exit_flag" == 0 ];then
			#三层网络
			if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
						##二三层混合模式
				if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ]  ;then				
					echo "eth$eth_interface network is two-three mixed-mode cur is three_layer need two config"
				else
					echo "三层网络:$network_type $tag"	
					if [ "$tag" != 0 ];then ##三层网络access
					echo "三层网络access:$network_type $tag start"

						vconfig add sn0 $vid
						echo "vconfig add sn0 $vid"
						ifconfig sn0.$vid  hw ether $local_rcst_mac mtu $mtu up
						echo "ifconfig sn0.$vid  hw ether $local_rcst_mac mtu $mtu up"
						ifconfig sn0.$vid $wanvrfip netmask $wanvrfnetmask hw ether $local_rcst_mac mtu $mtu up
						echo "ifconfig sn0.$vid $wanvrfip netmask $wanvrfnetmask hw ether $local_rcst_mac mtu $mtu up"
						
						if [ "$eth_interface" == "0" ];then 
							uci set network.lan=interface
							uci set network.lan.ifname="eth0"
							uci set network.lan.proto='static'
							uci set network.lan.netmask=$lanvrfnetmask
							uci set network.lan.ip6assign='60'
							uci set network.lan.mtu=$mtu
							uci set network.lan.ipaddr=$lanvrfip
							uci set network.lan.type='bridge'
							uci commit network
						else							
							uci set network.lan$eth_interface=interface
							uci set network.lan$eth_interface.ifname=eth$eth_interface
							uci set network.lan$eth_interface.proto='static'
							uci set network.lan$eth_interface.netmask=$lanvrfnetmask
							uci set network.lan$eth_interface.ip6assign='60'
							uci set network.lan$eth_interface.mtu=$mtu
							uci set network.lan$eth_interface.ipaddr=$lanvrfip
							uci set network.lan$eth_interface.type='bridge'
							uci commit network					
						fi

						if [ "$(uci show firewall |grep ' wan$vid' | wc -l)" -eq "0" ]; then
							uci set	firewall.wan$vid=zone
							uci set	firewall.wan$vid.name=wan$vid
							uci set	firewall.wan$vid.network=wan$vid
							uci set	firewall.wan$vid.input=ACCEPT
							uci set	firewall.wan$vid.output=ACCEPT
							uci set	firewall.wan$vid.forward=ACCEPT
							uci set	firewall.wan$vid.mtu_fix=1
							uci set	firewall.wan$vid.masq=1
						fi
						uci commit firewall
						if [ "$(uci show network |grep ' wan$vid' | wc -l)" -eq "0" ]; then
							uci set network.wan$vid=interface
							uci set network.wan$vid.ifname=sn0.$vid
							uci set network.wan$vid.proto=static
							uci set network.wan$vid.mtu=$(uci get network.wan.mtu)
							uci set network.wan$vid.ipaddr=$wanvrfip
							uci set network.wan$vid.netmask=$wanvrfnetmask
							uci commit network
						fi		
						/etc/init.d/network reload
						if [ "$(brctl show | grep -w br-lan | wc -l)" == 0 ];then
							brctl addbr br-lan
						fi	

						##无论eth0有没有配置都桥接在brlan上，作为acu通信网口
						ifconfig eth0 up
						brctl addif br-lan eth0
						if [ "$eth_interface" == "0" ];then 						
								ifconfig br-lan $lanvrfip netmask $lanvrfnetmask mtu $mtu up
								echo "111ifconfig br-lan $lanvrfip netmask $lanvrfnetmask mtu $mtu up"					
						else						
								ifconfig br-lan$eth_interface $lanvrfip netmask $lanvrfnetmask mtu $mtu up
								echo "222ifconfig br-lan$eth_interface $lanvrfip netmask $lanvrfnetmask mtu $mtu up"						
						fi
						#echo $(ifconfig br-lan) > /tmp/ifconfigbr-lan						
						#ifconfig br-lan:2 $acu_ip netmask 255.255.255.0 up					
						brlan100_num=$(ifconfig | grep -w "br-lan:100" | wc -l)
						if [ "$brlan100_num" == 0 ];then
							ifconfig br-lan:100 $brlan100_default_ip netmask 255.255.255.0 up
						fi	

	#						echo "三层网络access不同vlan:$vlannum $i $vid" 
							if [ "$eth_interface" == "0" ];then  ##三层网络access不同vlan	
	#							brctl addif br-lan eth$eth_interface 
								ip link add vrf_test$vid type vrf table $i
								ip link set dev vrf_test$vid up	
								ip link set dev br-lan master vrf_test$vid
								ip link set dev sn0.$vid master vrf_test$vid
								ifconfig 	vrf_test$vid multicast up										
							else
								brctl addif br-lan$eth_interface eth$eth_interface
								ip link add vrf_test$vid type vrf table $i
								ip link set dev vrf_test$vid up	
								ip link set dev br-lan$eth_interface master vrf_test$vid
								ip link set dev sn0.$vid master vrf_test$vid	
								ifconfig 	vrf_test$vid multicast up						
							fi
							route add default gw $wanvrfgateway dev sn0.$vid	
							if [ "$eth_interface" == "0" ];then  ##三层网络access不同vlan	
								route add -net  224.0.0.13/32 dev br-lan											
							else
								route add -net  224.0.0.13/32 dev br-lan$eth_interface						
							fi							
							
							uci set switch_redirect.$vid=vlanid;uci commit switch_redirect
							if [ "$(uci get switch_redirect.$vid.switch | wc -l)" -eq "0" ]; then
								uci set switch_redirect.$vid.switch=0
								uci commit switch_redirect	
							fi	
							if [ "$(uci get switch_redirect.$vid.firewall_switch | wc -l)" -eq "0" ]; then
								uci set switch_redirect.$vid.firewall_switch=0
								uci commit switch_redirect	
							fi	
							if [ "$(uci get switch_redirect.$vid.tag | wc -l)" -eq "0" ]; then
								uci set switch_redirect.$vid.tag=$tag
								uci commit switch_redirect	
							fi	
							if [ "$(uci get switch_redirect.$vid.interface | wc -l)" -eq "0" ]; then
								uci set switch_redirect.$vid.interface$i=$eth_interface
								uci commit switch_redirect	
							fi																
								true > /tmp/vrf_switch_del.sh
								nat_vlanswitch_cnt=$(uci show /etc/config/switch_redirect | grep vlanid | wc -l)
								nat_vlanswitch_i=0
								while [[ "$nat_vlanswitch_i" -lt "$nat_vlanswitch_cnt" ]]
								do
									let "nat_vlanswitch_i+=1"
									nat_vlanswitch_num=$(uci show /etc/config/switch_redirect | grep vlanid | sed -n "$nat_vlanswitch_i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
										nat_vlanswitch_j=0
										vlan_exit_flag=0
										while [[ "$nat_vlanswitch_j" -lt "$vlannum" ]]
										do
											let "nat_vlanswitch_j+=1"
											nat_vlanswitch_vid=$(uci get vrfvlanconfig.vlan$nat_vlanswitch_j.vid)
											if [ "$nat_vlanswitch_vid" -eq "$nat_vlanswitch_num" ]; then
												vlan_exit_flag=1
											fi
										done
										if [ "$vlan_exit_flag" -eq "0" ]; then
											echo nat_vlanswitch_num:$nat_vlanswitch_num
											if [ "$nat_vlanswitch_num" ];then
												uci del network.lan$nat_vlanswitch_num
												uci del network.wan$nat_vlanswitch_num
												uci commit network

												uci del firewall.$nat_vlanswitch_num
												uci del firewall.lan$nat_vlanswitch_num
												uci del firewall.wan$nat_vlanswitch_num
												uci commit firewall
												
												uci del dns_dhcp_config.dns_config_vlan$nat_vlanswitch_num
												uci commit dns_dhcp_config
												
												echo "uci del switch_redirect.$nat_vlanswitch_num;uci commit switch_redirect" >> /tmp/vrf_switch_del.sh
																						
												num_name=$(uci show /etc/config/firewall  |grep _vlannat_trunk | grep wan"$nat_vlanswitch_num" |awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
												echo num_name111:$num_name
												uci del firewall.$num_name
												
												num_name=$(uci show /etc/config/firewall | grep _vlanfirewall_trunk | grep wan"$nat_vlanswitch_num" |awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
												echo num_name222:$num_name
												uci del firewall.$num_name
												uci commit firewall
											fi
										fi	
								done
								sh /tmp/vrf_switch_del.sh																	
					
						echo "三层网络access:$network_type $tag end"		
					else ##三层网络trunk
						echo "三层网络trunk:$network_type $tag start"
						if [ $vid != 0 ];then

								if [ "$(uci show network |grep ' lan$vid' | wc -l)" -eq "0" ]; then

									if [ "$eth_interface" == "0" ];then 
										uci set network.lan=interface
										uci set network.lan.ifname="eth0"
										uci set network.lan.proto='static'
										uci set network.lan.netmask=255.255.255.0
										uci set network.lan.ip6assign='60'
										uci set network.lan.mtu=$mtu
										uci set network.lan.ipaddr=$brlan100_default_ip
										uci set network.lan.type='bridge'
										uci commit network
										ifconfig br-lan $brlan100_default_ip netmask 255.255.255.0   mtu $mtu up
									else
										
										uci set network.lan$eth_interface=interface
										uci set network.lan$eth_interface.ifname=eth$eth_interface
										uci set network.lan$eth_interface.proto='static'
										uci set network.lan$eth_interface.netmask=255.255.255.0
										uci set network.lan$eth_interface.ip6assign='60'
										uci set network.lan$eth_interface.mtu=$mtu
										eth_default_ip_num=1
										let "eth_default_ip_num+=$eth_interface"
										uci set network.lan$eth_interface.ipaddr="192.168.253.$eth_default_ip_num"
										uci set network.lan$eth_interface.type='bridge'
										uci commit network			
										ifconfig br-lan$eth_interface 192.168.253.$eth_default_ip_num netmask 255.255.255.0   mtu $mtu up	
									fi

									uci set network.lan$vid=interface
									uci set network.lan$vid.ifname=eth$eth_interface.$vid
									uci set network.lan$vid.proto=static
									uci set network.lan$vid.mtu=$(uci get network.lan.mtu)
									uci set network.lan$vid.ipaddr=$lanvrfip
									uci set network.lan$vid.netmask=$lanvrfnetmask
									uci set network.lan$vid.type='bridge'
									uci commit network
								fi
								if [ "$(uci show network |grep ' wan$vid' | wc -l)" -eq "0" ]; then
									uci set network.wan$vid=interface
									uci set network.wan$vid.ifname=sn0.$vid
									uci set network.wan$vid.proto=static
									uci set network.wan$vid.mtu=$(uci get network.wan.mtu)
									uci set network.wan$vid.ipaddr=$wanvrfip
									uci set network.wan$vid.netmask=$wanvrfnetmask
									uci commit network
								fi			
								/etc/init.d/network reload
								ifconfig eth$eth_interface up
								vconfig add eth$eth_interface $vid
								vconfig add sn0 $vid	
								ifconfig br-lan$vid up
								#brctl stp br-lan$vid on
								brctl addif br-lan$vid eth$eth_interface.$vid						
								ifconfig br-lan$vid $lanvrfip netmask $lanvrfnetmask   mtu $mtu up
								ifconfig sn0.$vid $wanvrfip netmask $wanvrfnetmask  hw ether $local_rcst_mac mtu $mtu up
								
								#~ route add default gw $wanvrfgateway dev sn0.$vid
								#~ route add -net  224.0.0.13/32 dev eth$eth_interface.$vid
								
								ifconfig eth0 up
								brctl addif br-lan eth0
								#ifconfig br-lan:2 $acu_ip netmask 255.255.255.0 up	
																
								ip link add vrf_test$vid type vrf table $i      			#创建vrf
								ip link set dev vrf_test$vid up					#启动vrf
								ip link set dev br-lan$vid master vrf_test$vid	#给vrf分配网络接口eth0.10
								ip link set dev sn0.$vid master vrf_test$vid			#给vrf分配网络接口sn0.10
								
								ifconfig 	vrf_test$vid multicast up
								
								route add default gw $wanvrfgateway dev sn0.$vid
								route add -net  224.0.0.13/32 dev br-lan$vid
								

								uci set switch_redirect.$vid=vlanid;uci commit switch_redirect
								if [ "$(uci get switch_redirect.$vid.switch | wc -l)" -eq "0" ]; then
									uci set switch_redirect.$vid.switch=0
									uci commit switch_redirect	
								fi	
								if [ "$(uci get switch_redirect.$vid.firewall_switch | wc -l)" -eq "0" ]; then
									uci set switch_redirect.$vid.firewall_switch=0
									uci commit switch_redirect	
								fi	
								if [ "$(uci get switch_redirect.$vid.tag | wc -l)" -eq "0" ]; then
									uci set switch_redirect.$vid.tag=$tag
									uci commit switch_redirect	
								fi	
								if [ "$(uci get switch_redirect.$vid.interface | wc -l)" -eq "0" ]; then
									uci set switch_redirect.$vid.interface$i=$eth_interface
									uci commit switch_redirect	
								fi									
								if [ "$(uci show firewall |grep 'firewall.$vid' | wc -l)" -eq "0" ]; then
									uci set	firewall.$vid=forwarding
									uci set	firewall.$vid.src=lan$vid
									uci set	firewall.$vid.dest=wan$vid
									
								fi
								
								if [ "$(uci show firewall |grep ' lan$vid' | wc -l)" -eq "0" ]; then
									uci set	firewall.lan$vid=zone
									uci set	firewall.lan$vid.name=lan$vid
									uci set	firewall.lan$vid.network=lan$vid
									uci set	firewall.lan$vid.output=ACCEPT
									uci set	firewall.lan$vid.forward=ACCEPT
								fi
								
								if [ "$(uci show firewall |grep ' wan$vid' | wc -l)" -eq "0" ]; then
									uci set	firewall.wan$vid=zone
									uci set	firewall.wan$vid.name=wan$vid
									uci set	firewall.wan$vid.network=wan$vid
									uci set	firewall.wan$vid.input=ACCEPT
									uci set	firewall.wan$vid.output=ACCEPT
									uci set	firewall.wan$vid.forward=ACCEPT
									uci set	firewall.wan$vid.mtu_fix=1
									uci set	firewall.wan$vid.masq=1
								fi
								uci commit firewall
								
								sh /rcst/rcst_sh/vlanmap_routeadd.sh
								true > /tmp/vrf_switch_del.sh
								nat_vlanswitch_cnt=$(uci show /etc/config/switch_redirect | grep vlanid | wc -l)
								nat_vlanswitch_i=0
								while [[ "$nat_vlanswitch_i" -lt "$nat_vlanswitch_cnt" ]]
								do
									let "nat_vlanswitch_i+=1"
									nat_vlanswitch_num=$(uci show /etc/config/switch_redirect | grep vlanid | sed -n "$nat_vlanswitch_i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
										nat_vlanswitch_j=0
										vlan_exit_flag=0
										while [[ "$nat_vlanswitch_j" -lt "$vlannum" ]]
										do
											let "nat_vlanswitch_j+=1"
											nat_vlanswitch_vid=$(uci get vrfvlanconfig.vlan$nat_vlanswitch_j.vid)
											if [ "$nat_vlanswitch_vid" -eq "$nat_vlanswitch_num" ]; then
												vlan_exit_flag=1
											fi
										done
										if [ "$vlan_exit_flag" -eq "0" ]; then
											echo nat_vlanswitch_num:$nat_vlanswitch_num
											if [ "$nat_vlanswitch_num" ];then
												uci del network.lan$nat_vlanswitch_num
												uci del network.wan$nat_vlanswitch_num
												uci commit network

												uci del firewall.$nat_vlanswitch_num
												uci del firewall.lan$nat_vlanswitch_num
												uci del firewall.wan$nat_vlanswitch_num
												uci commit firewall
												
												uci del dns_dhcp_config.dns_config_vlan$nat_vlanswitch_num
												uci commit dns_dhcp_config
												
												echo "uci del switch_redirect.$nat_vlanswitch_num;uci commit switch_redirect" >> /tmp/vrf_switch_del.sh
																						
												num_name=$(uci show /etc/config/firewall  |grep _vlannat_trunk | grep wan"$nat_vlanswitch_num" |awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
												echo num_name111:$num_name
												uci del firewall.$num_name
												
												num_name=$(uci show /etc/config/firewall | grep _vlanfirewall_trunk | grep wan"$nat_vlanswitch_num" |awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
												echo num_name222:$num_name
												uci del firewall.$num_name
												uci commit firewall
											fi
										fi	
								done
								sh /tmp/vrf_switch_del.sh		
								
								##无论eth0有没有配置都桥接在brlan上，作为acu通信网口

								echo "三层网络trunk:$network_type $tag end"																
						fi ###三层网络trunk if [ $vid != 0 ];then
					fi #if [ "$tag" == 1 ];then ##三层网络access
				fi ##二三层混合模式
				/etc/init.d/network reload			
					
				if [ "$eth_interface" == 0 ];then
					#brctl stp br-lan on
					brctl addif br-lan eth$eth_interface	
					echo "三层网络brctl stp br-lan on/brctl addif br-lan eth$eth_interface"
				else
					#brctl stp br-lan$eth_interface on
					brctl addif br-lan$eth_interface eth$eth_interface
					echo $(brctl show) >> /tmp/test
					echo "三层网络brctl stp br-lan$eth_interface on/brctl addif br-lan$eth_interface eth$eth_interface	"
				fi		
				brlan100_num=$(ifconfig | grep -w "br-lan:100" | wc -l)
				if [ "$brlan100_num" == 0 ];then
					ifconfig br-lan:100 $brlan100_default_ip netmask 255.255.255.0 up
				fi				
			fi  #三层网络 if [ "$network_type" == 2 ];then
			
			#二层网络
			if [ "$network_type" == 1 ] || [ "$network_type" == 3 ]  ;then	
				
				##二三层混合模式
				if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" != 0 ]  ;then	
					
					echo "eth$eth_interface network is two-three mixed-mode cur is two_layer need three config"
				else
					echo "二层模式:$network_type $tag"

					if [ "$(ifconfig | grep 'br-wan:100 ' |wc -l)" != 0 ];then
						ifconfig br-wan:100 down
					fi

					if [ "$(ifconfig | grep 'br-wan:2 ' |wc -l)" != 0 ];then
						ifconfig br-wan:2 down
					fi

					if [ "$(ifconfig | grep 'br-wan ' |wc -l)" != 0 ];then
						ifconfig br-wan down
					fi				
					if [ "$(brctl show | grep -w br-wan | wc -l)" != "0" ];then
						brctl delif br-wan sn0
						brctl delif br-wan eth$eth_interface
						brctl delbr br-wan
					fi

					if [ "$(ifconfig | grep 'br-lan:1 ' |wc -l)" != 0 ];then
						ifconfig br-lan:1 down
					fi
					
					
					if [ "$tag" == 0 ];then ##二层trunk模式
						echo "二层trunk模式:$network_type $tag"
						
						ifconfig sn0 0.0.0.0 mtu $mtu   	     
						ifconfig eth$eth_interface 0.0.0.0  mtu $mtu  

						if [ $vid != 0 ];then
							ifname_num=$(ifconfig | grep "$ifname " | awk '{print $1}' | wc -l)
							if [ "$ifname_num" == 0 ];then
								if [ "$eth_interface" == 0 ];then
								brctl addbr br-lan
								else
									brctl addbr br-lan$eth_interface
								fi
								 vconfig add eth$eth_interface $vid
								 vconfig add sn0 $vid
								 ifconfig eth$eth_interface.$vid 0.0.0.0  mtu $mtu up
								 ifconfig sn0.$vid  hw ether $local_rcst_mac mtu $mtu  up
								 ifconfig sn0.$vid 0.0.0.0 hw ether $local_rcst_mac mtu $mtu up
								 brctl addbr br-lan$vid
								 brctl addif br-lan$vid eth$eth_interface.$vid
								 brctl addif br-lan$vid sn0.$vid

								 #brctl stp br-lan$vid on
								ifconfig br-lan$vid 0.0.0.0 hw ether F6:E4:85:$i:$i:04 mtu $mtu up #业务口
								 
							fi						
						fi

						 brctl addbr br-lan$vid
						 brctl addif br-lan$vid eth$eth_interface.$vid
						 brctl addif br-lan$vid sn0.$vid

						 #brctl stp br-lan$vid on
						ifconfig br-lan$vid 0.0.0.0 hw ether F6:E4:85:$i:$i:04 mtu $mtu up #业务口


						ifconfig  eth$eth_interface 0.0.0.0 up
					
						ifconfig sn0 0.0.0.0  up
						
						sn0_mac=$(ifconfig -a sn0 | grep HWaddr | awk '{print $5}')
						ifconfig sn0 $wan_ip netmask $wan_netmask hw ether $sn0_mac up #管理口
						##无论eth0有没有配置都桥接在brlan上，作为acu通信网口
						ifconfig eth0 up
						brctl addif br-lan eth0
						#ifconfig br-lan:2 $acu_ip netmask 255.255.255.0 up	
						route del default gw $(route | grep default | awk '{print $2}')
						#route add default gw $gateway
	#					if [ "$network_type" != 3 ];then	
							if [ "$eth_interface" == 0 ];then
								#brctl stp br-lan on
								ifconfig br-lan 0.0.0.0 up	
								brctl addif br-lan eth$eth_interface

	#							echo "ifconfig br-lan 0.0.0.0 up	$network_type" >> /tmp/test
							else
								brctl addbr br-lan$eth_interface
								#brctl stp br-lan$eth_interface on
								ifconfig br-lan$eth_interface 0.0.0.0 up	
								brctl addif br-lan$eth_interface eth$eth_interface
	#							echo "ifconfig br-lan$eth_interface 0.0.0.0 up	$network_type" >> /tmp/test							
							fi		
	#					fi
						echo "二层trunk模式:$network_type $tag $vlannum config end"
						
								uci set switch_redirect.$vid=vlanid;uci commit switch_redirect

								if [ "$(uci get switch_redirect.$vid.firewall_switch | wc -l)" -eq "0" ]; then
									uci set switch_redirect.$vid.firewall_switch=0
									uci commit switch_redirect	
								fi	
								if [ "$(uci get switch_redirect.$vid.tag | wc -l)" -eq "0" ]; then
									uci set switch_redirect.$vid.tag=$tag
									uci commit switch_redirect	
								fi	
								if [ "$(uci get switch_redirect.$vid.interface | wc -l)" -eq "0" ]; then
									uci set switch_redirect.$vid.interface$i=$eth_interface
									uci commit switch_redirect	
								fi									
						
						
					else   ##二层access模式
						echo "二层access模式:$network_type $tag $vlannum start"
				
						if [ "$(brctl show | grep -w br-lan | wc -l)" == 0 ];then
							brctl addbr br-lan
						fi				
						#~ if [ "$vlannum" == "1" ];then  ##二层网络access同vlan													
							#~ brctl addbr br-lan
							#~ brctl addif br-lan eth$eth_interface
							#~ brctl addif  br-lan sn0
							#~ brctl stp br-lan on											
							#~ ifconfig sn0 0.0.0.0 mtu $mtu hw ether $local_rcst_mac up
							#~ ifconfig br-lan:1 $wan_ip netmask $wan_netmask up		
							
						#~ else 		##二层网络access不同vlan		
							if [ "$eth_interface" == "0" ];then  ##二层网络access同vlan
								vconfig add sn0 $vid
								ifconfig sn0.$vid up
								ifconfig sn0.$vid 0.0.0.0 up
								brctl addbr br-lan
								brctl addif br-lan eth$eth_interface
								brctl addif br-lan sn0.$vid	
								#brctl stp br-lan on
								ifconfig br-lan 0.0.0.0 mtu $mtu up	
								ifconfig br-lan:100 $brlan100_default_ip netmask 255.255.255.0 up	
							else	
								vconfig add sn0 $vid
								ifconfig sn0.$vid up
								ifconfig sn0.$vid 0.0.0.0 up
								brctl addbr br-lan$eth_interface
								brctl addif br-lan$eth_interface eth$eth_interface
								brctl addif br-lan$eth_interface sn0.$vid	
								ifconfig br-lan$eth_interface 0.0.0.0 mtu $mtu up	
							
								#brctl stp br-lan$eth_interface on
								ifconfig br-lan$eth_interface 0.0.0.0  up #业务口				
							fi
							ifconfig sn0 $wan_ip netmask $wan_netmask  mtu $mtu hw ether $local_rcst_mac up				
						#fi							
						echo "0" > /sys/devices/virtual/net/br-lan/bridge/multicast_snooping
						echo 2 > /proc/sys/net/ipv4/conf/all/force_igmp_version
						iptables -t mangle -A PREROUTING -p ospf -j TTL --ttl-inc 1		
		#				ifconfig sn0 $wan_ip netmask $wan_netmask mtu $mtu hw ether $local_rcst_mac up
						ifconfig eth$eth_interface mtu $mtu up
						##无论eth0有没有配置都桥接在brlan上，作为acu通信网口
						ifconfig eth0 up
						brctl addif br-lan eth0
						#ifconfig br-lan:2 $acu_ip netmask 255.255.255.0 up					
						route del default gw $(route | grep default | awk '{print $2}')
#						route add default gw $gateway		
						echo "二层access模式:$network_type $tag $vlannum end"	
						
						uci set switch_redirect.$vid=vlanid;uci commit switch_redirect
						if [ "$(uci get switch_redirect.$vid.firewall_switch | wc -l)" -eq "0" ]; then
							uci set switch_redirect.$vid.firewall_switch=0
							uci commit switch_redirect	
						fi	
						if [ "$(uci get switch_redirect.$vid.tag | wc -l)" -eq "0" ]; then
							uci set switch_redirect.$vid.tag=$tag
							uci commit switch_redirect	
						fi	
						if [ "$(uci get switch_redirect.$vid.interface | wc -l)" -eq "0" ]; then
							uci set switch_redirect.$vid.interface$i=$eth_interface
							uci commit switch_redirect	
						fi	
							
					fi  #if [ "$tag" == 0 ];then ##二层trunk模式
					
				brlan100_num=$(ifconfig | grep -w "br-lan:100" | wc -l)
				if [ "$brlan100_num" == 0 ];then
					ifconfig br-lan:100 $brlan100_default_ip netmask 255.255.255.0 up
				fi	
					
				fi ####二三层混合模式
	#			echo $(ifconfig br-lan) >> /tmp/test
			fi  #二层网络 if [ "$network_type" == 1 ];then
			#二三层混合模式
		else	
			if [ "$networkmode_network_name" == "eth0" ]  ;then 
				ifconfig eth$eth_interface up
				brctl addif br-lan eth$eth_interface
				if [ "$tag" == "0" ]  ;then ##trunk
				
					vconfig add eth$eth_interface $vid				
					ifconfig eth$eth_interface.$vid up
					brctl addif br-lan$vid eth$eth_interface.$vid			
				
				fi ##if [ "$tag" == "0" ]  ;then ##trunk
	
				echo "7 ifconfig eth$eth_interface up/brctl addif br-lan eth$eth_interface"			
			
			else
				ifconfig eth$eth_interface up
				brctl addif br-lan$networkmode_network_eth_interface eth$eth_interface		
				if [ "$tag" == "0" ]  ;then ##trunk			
					vconfig add eth$eth_interface $vid				
					ifconfig eth$eth_interface.$vid up
					brctl addif br-lan$vid eth$eth_interface.$vid							
				fi ##if [ "$tag" == "0" ]  ;then ##trunk
				echo "8 ifconfig eth$eth_interface up/brctl addif br-lan$networkmode_network_eth_interface eth$eth_interface"			
							
			fi				

		fi ##if [ "$networkmode_type_exit_flag" == 0 ];then
		##记录网口配置
		uci set networkmode.eth$eth_interface=vrfconfig
		uci set networkmode.eth$eth_interface.network_type=$network_type
		uci set networkmode.eth$eth_interface.tag=$tag		
		uci set networkmode.eth$eth_interface.eth_interface=$eth_interface
		if [ "$networkmode_type_exit_flag" == 1 ]  ;then 
			uci set networkmode.eth$eth_interface.bridge=eth$networkmode_network_eth_interface	
		else
			uci set networkmode.eth$eth_interface.bridge=0
		fi
		uci set networkmode.eth$eth_interface.vid$i=$vid
		uci set networkmode.eth$eth_interface.vmap_switch$i=$vmap_switch
		uci set networkmode.eth$eth_interface.vmap_sys_vid$i=$vmap_sys_vid	
	
		if [ "$network_type" == 2 ]  ;then 	
			uci set networkmode.eth$eth_interface.lanvrfip$i=$lanvrfip
			uci set networkmode.eth$eth_interface.lanvrfnetmask$i=$lanvrfnetmask
			uci set networkmode.eth$eth_interface.wanvrfip$i=$wanvrfip
			uci set networkmode.eth$eth_interface.wanvrfnetmask$i=$wanvrfnetmask
			uci set networkmode.eth$eth_interface.wanvrfgateway$i=$wanvrfgateway
			uci set networkmode.eth$eth_interface.dhcp_start_ip$i=$dhcp_start_ip
			uci set networkmode.eth$eth_interface.dhcp_end_ip$i=$dhcp_end_ip
			uci set networkmode.eth$eth_interface.dhcp_lease$i=$dhcp_lease	
		elif [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" != 0 ]  ;then		
			uci set networkmode.eth$eth_interface.lanvrfip$i=$lanvrfip
			uci set networkmode.eth$eth_interface.lanvrfnetmask$i=$lanvrfnetmask
			uci set networkmode.eth$eth_interface.wanvrfip$i=$wanvrfip
			uci set networkmode.eth$eth_interface.wanvrfnetmask$i=$wanvrfnetmask
			uci set networkmode.eth$eth_interface.wanvrfgateway$i=$wanvrfgateway
			uci set networkmode.eth$eth_interface.dhcp_start_ip$i=$dhcp_start_ip
			uci set networkmode.eth$eth_interface.dhcp_end_ip$i=$dhcp_end_ip
			uci set networkmode.eth$eth_interface.dhcp_lease$i=$dhcp_lease	
		fi		
		uci commit networkmode

done

else
	networkmode=$(uci get networkmode.networkmode.networkmode)


	sh /rcst/rcst_sh/vlan_close_4.sh > /dev/null

	if [ "$networkmode" == 1 ];then

		sh /rcst/rcst_sh/nat_switch_close_4.sh
		sleep 3
		sh /rcst/rcst_sh/vlan_open_4.sh > /dev/null

	elif [ "$networkmode" == 2 ];then
		sh /rcst/rcst_sh/del_vrf.sh
		wan_proto=$(uci get network.wan.proto)
		if [ "$wan_proto" = "pppoe" ]; then
			sh /rcst/rcst_sh/nat_switch_open_4.sh
		else
			var_nat_switch=$(uci get switch_redirect.redirect_set.switch)
			if [ "$var_nat_switch" = "1" ]; then
				sh /rcst/rcst_sh/nat_switch_open_4.sh
				sh /rcst/rcst_sh/tos_set.sh &
			else
				sh /rcst/rcst_sh/nat_switch_close_4.sh
				sh /rcst/rcst_sh/tos_set.sh &
			fi

		fi

		sh /rcst/rcst_sh/run_vrf.sh
		eth0_flag=$(brctl show |grep eth0 | wc -l)
		if [ "$eth0_flag" == 0 ];then
			brctl addif br-lan eth0
		fi
		eth1_flag=$(brctl show |grep eth1 | wc -l)
		if [ "$eth1_flag" == 0 ];then
		ifconfig eth1 up
			brctl addif br-lan eth1
		fi
		iii_vlan_tag=$(uci get vrfvlanconfig.mode.tag)
		if [ $iii_vlan_tag == 1 ];then
			brlan100_num=$(ifconfig | grep -w "br-lan:100" | wc -l)
			if [ "$brlan100_num" == 0 ];then
				ifconfig br-lan:100 $(uci get networkmode.networkmode.default_ip) netmask 255.255.255.0 up
			fi	
		fi
	fi

fi

sh /rcst/rcst_sh/acu_ipconfig.sh
uci set firewall.@defaults[0].input='ACCEPT'
uci set firewall.@defaults[0].output='ACCEPT'
uci set firewall.@defaults[0].forward='ACCEPT'
uci set firewall.@zone[0].output='ACCEPT'
uci set firewall.@zone[0].forward='ACCEPT'

uci set firewall.@zone[1].input='ACCEPT'
uci set firewall.@zone[1].output='ACCEPT'
uci set firewall.@zone[1].forward='ACCEPT'
uci commit firewall
sleep 1
sh /mnt/route_wan_add.sh
/etc/init.d/firewall restart
sh /rcst/rcst_sh/dns_config_4.sh
sh /rcst/rcst_sh/multicast_config.sh
#sh /tmp/multicast_route_add.sh
/etc/init.d/x509_auth_monitor restart
sh /tmp/ipsec_iprule_add.sh
sh /tmp/ipsec_config.sh
vehicular_type=$(uci get update.update.vehicular_type)
if [ "$vehicular_type" = "1" ]; then
	syslog_sh "--------------------------------this 631 terminal is 1 vehicular_app-----------------------------"
	sh /rcst/rcst_sh/ft_brlanip_config.sh
	/etc/init.d/vehicular_app_monitor restart
fi
if [ "$(ip rule | grep l3mdev-table | wc -l)" == 0 ] ; then
	ip rule add l3mdev pre 1000
fi
#ssh ok
echo 1 > /proc/sys/net/ipv4/udp_l3mdev_accept
echo 1 > /proc/sys/net/ipv4/tcp_l3mdev_accept
/etc/init.d/fh_snmp_monitor restart
