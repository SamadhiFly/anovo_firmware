#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info run_vrf"[$(ps | grep run_vrf.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

interface_lan_name=$(uci get network.lan.ifname)

if [ "$interface_lan_name" = "eth0" ]; then
interface_other_lan_name="eth1"
else
interface_other_lan_name="eth0"
fi	
vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
mtu=$(uci get networkmode.networkmode.mtu)
if [ "$mtu" == 0 ];then
	mtu=1500
fi
vlan_exit_flag=0
i=0

iii_vlan_tag=$(uci get vrfvlanconfig.mode.tag)
local_rcst_mac=$(cat /etc/config/rcst_mac | grep rcst_mac | awk '{print $2":"$3":"$4":"$5":"$6":"$7}')

#三层access模式
if [ $iii_vlan_tag == 1 ];then
		if [ $vlannum == 1 ];then
			vid=$(uci get vrfvlanconfig.vlan1.vid)
			wanvrfip=$(uci get vrfvlanconfig.vlan1.wanvrfip)
			wanvrfnetmask=$(uci get vrfvlanconfig.vlan1.wanvrfnetmask)
			wanvrfgateway=$(uci get vrfvlanconfig.vlan1.wanvrfgateway)
			lanip=$(ifconfig br-lan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
			if [ ! "$lanip" ];then
				ifconfig br-lan $(uci get network.lan.ipaddr) netmask $(uci get network.lan.netmask) mtu $mtu up
			fi
			vconfig add sn0 $vid
			ifconfig sn0.$vid  hw ether $local_rcst_mac mtu $mtu up
			echo "ifconfig sn0.$vid  hw ether $local_rcst_mac mtu $mtu up"  > /tmp/test
			ifconfig sn0.$vid $wanvrfip netmask $wanvrfnetmask hw ether $local_rcst_mac mtu $mtu up
			echo "ifconfig sn0.$vid $wanvrfip netmask $wanvrfnetmask hw ether $local_rcst_mac mtu $mtu up"  >> /tmp/test
			route add default gw $wanvrfgateway dev sn0.$vid
			sh /rcst/rcst_sh/del_trunkconfig.sh
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
			sleep 1
			route add default gw $wanvrfgateway dev sn0.$vid
			if [ "$(brctl show |grep $interface_lan_name | wc -l)" -eq "0" ]; then
					brctl addif br-lan $interface_lan_name
			fi
			ifconfig $interface_other_lan_name up
			brctl addif br-lan $interface_other_lan_name
			ifconfig br-lan:100 $(uci get networkmode.networkmode.default_ip) netmask 255.255.255.0 up
		
		else
			syslog_sh "warning-->>run_vrf III access vlannum:$vlannum != 1....!"
		fi

else
#三层trunk模式
	lanip=$(ifconfig br-lan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	if [ ! "$lanip" ];then
		ifconfig br-lan $(uci get network.lan.ipaddr) netmask $(uci get network.lan.netmask) mtu $mtu up
	fi
	if [ "$(brctl show |grep $interface_lan_name | wc -l)" -eq "0" ]; then
			brctl addif br-lan $interface_lan_name
	fi	
	while [[ "$i" -lt "$vlannum" ]]
	do
		let "i+=1"
		vid=$(uci get vrfvlanconfig.vlan$i.vid)
		lanvrfip=$(uci get vrfvlanconfig.vlan$i.lanvrfip)
		lanvrfnetmask=$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask)
		lanvrfmac=$(uci get vrfvlanconfig.vlan$i.lanvrfmac)
		wanvrfip=$(uci get vrfvlanconfig.vlan$i.wanvrfip)
		wanvrfnetmask=$(uci get vrfvlanconfig.vlan$i.wanvrfnetmask)
		wanvrfgateway=$(uci get vrfvlanconfig.vlan$i.wanvrfgateway)
		wanvrfmac=$(uci get vrfvlanconfig.vlan$i.wanvrfmac)

		echo $vid $lanvrfip $lanvrfnetmask $lanvrfmac $wanvrfip $wanvrfnetmask $wanvrfgateway $wanvrfmac

		if [ $vid != 0 ];then
			vconfig add $interface_lan_name $vid
			vconfig add sn0 $vid
			
			ifconfig $interface_lan_name.$vid $lanvrfip netmask $lanvrfnetmask   mtu $mtu up
			ifconfig sn0.$vid   hw ether $local_rcst_mac  mtu $mtu up
			ifconfig sn0.$vid $wanvrfip netmask $wanvrfnetmask  hw ether $local_rcst_mac mtu $mtu up

			ip link add vrf_test$vid type vrf table $i      			#创建vrf
			ip link set dev vrf_test$vid up					#启动vrf
			ip link set dev $interface_lan_name.$vid master vrf_test$vid	#给vrf分配网络接口eth0.10
			ip link set dev sn0.$vid master vrf_test$vid			#给vrf分配网络接口sn0.10

			route add default gw $wanvrfgateway dev sn0.$vid
			route add -net  224.0.0.13/32 dev $interface_lan_name.$vid

			if [ "$(uci show network |grep ' lan$vid' | wc -l)" -eq "0" ]; then
				uci set network.lan$vid=interface
				uci set network.lan$vid.ifname=$interface_lan_name.$vid
				uci set network.lan$vid.proto=static
				uci set network.lan$vid.mtu=$(uci get network.lan.mtu)
				uci set network.lan$vid.ipaddr=$lanvrfip
				uci set network.lan$vid.netmask=$lanvrfnetmask
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
			sleep 1
			route add default gw $wanvrfgateway dev sn0.$vid
			route add -net  224.0.0.13/32 dev $interface_lan_name.$vid
			uci set switch_redirect.$vid=vlanid;uci commit switch_redirect
			if [ "$(uci get switch_redirect.$vid.switch | wc -l)" -eq "0" ]; then
				uci set switch_redirect.$vid.switch=0
				uci commit switch_redirect	
			fi	
			if [ "$(uci get switch_redirect.$vid.firewall_switch | wc -l)" -eq "0" ]; then
				uci set switch_redirect.$vid.firewall_switch=0
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
						
		fi
	done
		sh /rcst/rcst_sh/vlanmap_routeadd.sh
		true > /tmp/vrf_switch_del.sh
		nat_vlanswitch_cnt=$(uci show /etc/config/switch_redirect | grep vlanid | wc -l)
		i=0

		while [[ "$i" -lt "$nat_vlanswitch_cnt" ]]
		do
			let "i+=1"
			num=$(uci show /etc/config/switch_redirect | grep vlanid | sed -n "$i"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
				j=0
				vlan_exit_flag=0
				while [[ "$j" -lt "$vlannum" ]]
				do
					let "j+=1"
					vid=$(uci get vrfvlanconfig.vlan$j.vid)
					#~ vmap_switch=$(uci get vrfvlanconfig.vlan$j.vmap_switch)
					#~ if [ $vmap_switch != 0 ];then
						#~ vid=$(uci get vrfvlanconfig.vlan$j.vmap_user_vlan)
						#~ #vid_back=$(uci get vrfvlanconfig.vlan$i.vid)
					#~ else
						#~ vid=$(uci get vrfvlanconfig.vlan$j.vid)
					#~ fi
					if [ "$vid" -eq "$num" ]; then
						vlan_exit_flag=1
					fi
				done
			if [ "$vlan_exit_flag" -eq "0" ]; then
				echo num:$num
				if [ "$num" ];then
					uci del network.lan$num
					uci del network.wan$num
					uci commit network

					uci del firewall.$num
					uci del firewall.lan$num
					uci del firewall.wan$num
					uci commit firewall
					
					uci del dns_dhcp_config.dns_config_vlan$num
					uci commit dns_dhcp_config
					
					#~ echo 2222i:$i switch_redirect:$num >> /tmp/vrf_test
					#~ uci del switch_redirect.$num
					#~ uci commit switch_redirect
					echo "uci del switch_redirect.$num;uci commit switch_redirect" >> /tmp/vrf_switch_del.sh
										
					
					num_name=$(uci show /etc/config/firewall  |grep _vlannat_trunk | grep wan"$num" |awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
					echo num_name111:$num_name
					uci del firewall.$num_name
					
					num_name=$(uci show /etc/config/firewall | grep _vlanfirewall_trunk | grep wan"$num" |awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
					echo num_name222:$num_name
					uci del firewall.$num_name
					uci commit firewall
				fi
			fi	
		done
		sh /tmp/vrf_switch_del.sh	
		if [ "$(brctl show |grep $interface_lan_name | wc -l)" -eq "0" ]; then
				brctl addif br-lan $interface_lan_name
		fi
		ifconfig $interface_other_lan_name up
		brctl addif br-lan $interface_other_lan_name			

fi

uci set firewall.@defaults[0].input='ACCEPT'
uci set firewall.@defaults[0].output='ACCEPT'
uci set firewall.@defaults[0].forward='ACCEPT'
uci set firewall.@zone[0].output='ACCEPT'
uci set firewall.@zone[0].forward='ACCEPT'

uci set firewall.@zone[1].input='ACCEPT'
uci set firewall.@zone[1].output='ACCEPT'
uci set firewall.@zone[1].forward='ACCEPT'
uci commit firewall
sleep 5
/etc/init.d/firewall restart

