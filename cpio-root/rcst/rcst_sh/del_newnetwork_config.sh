#!/bin/bash
syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info del_newnetwork_config"[$(ps | grep del_newnetwork_config.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

mask2cdr()
{
	local x=${1##*255.}
	
	set -- 0^^^128^192^224^240^248^252^254 $(( (${#1} -${#x})*2 )) ${x%%.*}
	x=${1%%$3*}
	echo $(( $2 + (${#x}/4) ))
	return $(( $2 + (${#x}/4) ))
}

networkmode_ethnum=$(cat /etc/config/networkmode | grep eth | wc -l)
networkmode_eth_i=0
while [[ "$networkmode_eth_i" -le "$networkmode_ethnum" ]]
do
	let "networkmode_eth_i+=1"
	num=$(cat /etc/config/networkmode | grep eth | sed -n "$networkmode_eth_i"p | awk  -F "[\']+" '{print $2}')
	if [ "$num" ];then
	uci del networkmode.$num

	fi
done
uci commit networkmode

sh /rcst/rcst_sh/wan_default_route_4.sh
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
			lanvrfip=$(uci get vrfvlanconfig.vlan$i.lanvrfip)
			lanvrfnetmask=$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask)
			wanvrfip=$(uci get vrfvlanconfig.vlan$i.wanvrfip)
			wanvrfnetmask=$(uci get vrfvlanconfig.vlan$i.wanvrfnetmask)
			wanvrfgateway=$(uci get vrfvlanconfig.vlan$i.wanvrfgateway)
			
			two_ifname=$(uci get vrfvlanconfig.vlan$i.ifname)					
			wan_ip=$(uci get network.wan.ipaddr)
			wan_netmask=$(uci get network.wan.netmask)
			gateway=$(uci get networkmode.networkmode.defaultgw)		

		#三层网络
		if [ "$network_type" == 2 ]  || [ "$network_type" == 3 ] ;then
				##二三层混合模式
			if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip|wc -l)" == 0 ]  ;then	
				
				echo "eth$eth_interface network is two-three mixed-mode cur is three_layer need two config"
			else
				echo "three layer netowrk config $network_type $eth_interface $tag $vmap_switch $vid $vmap_sys_vid $lanvrfip $lanvrfnetmask $wanvrfip $wanvrfnetmask $wanvrfgateway"

				ifconfig br-lan 0.0.0.0 
				ifconfig br-lan:100 down
				ifconfig br-lan:2 down
				ifconfig br-lan:5 down
				ifconfig br-lan1:2 down
				ifconfig br-lan1:5 down
				ifconfig br-lan1 down
				if [ "$(brctl show | grep -w br-lan | wc -l)" -ne "0" ];then
					brctl delif br-lan sn0
					brctl delif br-lan eth$eth_interface
				fi
				if [ "$(brctl show | grep -w br-lan1 | wc -l)" -ne "0" ];then
					brctl delif br-lan1 eth$eth_interface
				fi				
				if [ "$(brctl show | grep -w br-lan1 | wc -l)" != 0 ];then
					brctl delbr 	br-lan1
				fi						
				if [ "$vlannum" == 1 ];then
					route del default gw $wanvrfgateway dev sn0.$vid
					ifconfig sn0.$vid down
					vconfig rem sn0.$vid
					if [ "$vid" ];then
						uci del network.wan$vid
						uci commit network
					fi
					ifconfig_eth_num=$(ifconfig -a | grep eth | wc -l)
					ifconfig_eth_i=0
					while [[ "$ifconfig_eth_i" -lt "$ifconfig_eth_num" ]]
					do				
						let "ifconfig_eth_i+=1"
#						ifconfig $(ifconfig -a | grep eth | awk '{print$1}' | sed -n "$ifconfig_eth_i"p) down
						brctl delif br-lan $(ifconfig -a | grep eth | awk '{print$1}' | sed -n "$ifconfig_eth_i"p)
					done	
				else
					ifconfig br-lan$eth_interface 0.0.0.0
					ifconfig br-lan$eth_interface down
					brctl delif br-lan$eth_interface eth$eth_interface
					brctl delbr br-lan$eth_interface		
					uci del network.lan$eth_interface
					uci commit network
				fi
				
				route del default gw $wanvrfgateway dev sn0.$vid
				route del -net  224.0.0.13/32 dev eth$eth_interface.$vid

				dhcplan1=$(($(uci get vrfvlanconfig.vlan$i.lanvrfip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )))
				dhcplan2=$(($(uci get vrfvlanconfig.vlan$i.lanvrfip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )))
				dhcplan3=$(($(uci get vrfvlanconfig.vlan$i.lanvrfip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )))
				dhcplan4=$(($(uci get vrfvlanconfig.vlan$i.lanvrfip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )))
				dhcp_lan="$dhcplan1.$dhcplan2.$dhcplan3.$dhcplan4"

				netmask_cdr=$(mask2cdr $lanvrfnetmask)
				echo "netmask_cdr:$dhcp_lan $netmask_cdr"
				if [ "$(ip rule | grep -w "$dhcp_lan" | wc -l)" != "0" ] ; then
					ip rule del from $dhcp_lan/$netmask_cdr table $i
					ip rule del to $dhcp_lan/$netmask_cdr table $i
					ip rule del from all to $wanvrfgateway  table $i	
				fi	
				ipsec down tunnel1
				ipsec down tunnel2
				/etc/init.d/ipsec stop	
				kill -9 $(ps | grep "/usr/lib/ipsec" | grep -v grep | awk '{print $1}')
				kill -9 $(ps | grep "/usr/lib/ipsec/charon" | grep -v grep | awk '{print $1}')							
				sh /tmp/ipsec_iprule_del.sh
				
				ip link set dev eth$eth_interface.$vid nomaster
				ip link set dev sn0.$vid nomaster
				ip link set dev vrf_test$vid down
				ip link del vrf_test$vid type vrf table $i

				ifconfig eth$eth_interface.$vid down
				echo "ifconfig eth$eth_interface.$vid down"
				ifconfig sn0.$vid down
				vconfig rem eth$eth_interface.$vid
				vconfig rem sn0.$vid
				if [ "$vid" ];then
					uci del network.lan$vid
					uci del network.wan$vid
					uci commit network
					uci del firewall.$vid								
					uci del firewall.lan$vid
					uci del firewall.wan$vid	
					uci commit dfirewall			
				fi	
				if [ "$i" ];then
					uci del network.lan$i
					uci commit network
				fi				
				/etc/init.d/network reload
				sh /rcst/rcst_sh/del_trunkconfig.sh
			fi ##二三层混合模式
		fi  #三层网络 if [ "$network_type" == 2 ];then
		
		#二层网络
		if [ "$network_type" == 1 ] || [ "$network_type" == 3 ] ;then	

				##二三层混合模式
			if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip|wc -l)" != 0 ]  ;then	
				
				echo "eth$eth_interface network is two-three mixed-mode cur is two_layer need three config"
			else			
				sh /rcst/rcst_sh/del_trunkconfig.sh
				ifconfig br-wan down
				brctl delbr br-wan
				ifconfig br-lan:1 down
				ifconfig br-lan1:2 down
				ifconfig br-lan1:5 down
				ifconfig br-lan1 down
				ifconfig br-lan:2 down
				ifconfig br-lan:5 down
				ifconfig br-lan:100 down
				
				
				if [ "$(brctl show | grep -w br-lan:1 | wc -l)" != 0 ];then
				brctl delbr 	br-lan:1
				fi
				if [ "$(brctl show | grep -w br-lan:2 | wc -l)" != 0 ];then
				brctl delbr 	br-lan:2
				fi
	
				if [ "$(brctl show | grep -w br-lan | wc -l)" -ne "0" ];then
					brctl delif br-lan sn0
					brctl delif br-lan eth$eth_interface
				fi
				if [ "$(brctl show | grep -w br-lan1 | wc -l)" -ne "0" ];then
					brctl delif br-lan1 eth$eth_interface
				fi				
				if [ "$(brctl show | grep -w br-lan1 | wc -l)" != 0 ];then
					brctl delbr 	br-lan1
				fi					

				
				ifconfig br-lan0 down
	
				brctl delif br-lan sn0
				if [ "$(brctl show | grep -w br-lan0 | wc -l)" != 0 ];then
					brctl delbr 	br-lan0
				fi		
				ifconfig_eth_num=$(ifconfig -a | grep eth | wc -l)
				ifconfig_eth_i=0
				while [[ "$ifconfig_eth_i" -lt "$ifconfig_eth_num" ]]
				do						
					let "ifconfig_eth_i+=1"
					ifconfig $(ifconfig -a | grep eth | awk '{print$1}' | sed -n "$ifconfig_eth_i"p) down
					brctl delif br-lan $(ifconfig -a | grep eth | awk '{print$1}' | sed -n "$ifconfig_eth_i"p)
				done

				if [ "$(brctl show | grep -w br-lan | wc -l)" -ne "0" ];then
					brctl delif br-lan sn0
					brctl delif br-lan eth$eth_interface
				fi

				if [ "$(brctl show | grep -w br-lan$eth_interface | wc -l)" -ne "0" ];then
					ifconfig br-lan$eth_interface down
					brctl delif br-lan$eth_interface sn0.vid
					brctl delif br-lan$eth_interface eth$eth_interface
					brctl delbr br-lan$eth_interface 
				fi
				
				if [ "$(brctl show | grep -w br-wan | wc -l)" -ne "0" ];then
					brctl delif br-wan sn0
					brctl delif br-wan eth$eth_interface
				fi
				if [ "$eth_interface" == 0 ];then
					ifconfig br-lan 0.0.0.0 
				fi
	#			ifname_num=$(ifconfig | grep "$two_ifname " | awk '{print $1}' | wc -l)
	#			if [ "$ifname_num" != 0  ];then
						vconfig rem $two_ifname
						vconfig rem sn0.$vid	           
						ifconfig br-lan$vid down
						brctl delbr br-lan$vid
	#			fi	
			fi ##二三层混合模式
		fi  #二层网络 if [ "$network_type" == 1 ];then
		#二三层混合模式
		
		#不配置
		
done
if [ "$(uci get networkmode.networkmode.network_eth1_configswitch)" -eq "1" ];then
	sh /rcst/rcst_sh/del_eth1networkconfig.sh
fi
