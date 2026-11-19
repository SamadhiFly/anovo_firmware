#!/bin/bash
syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info dns_config_4"[$(ps | grep dns_config_4.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}
mask2cdr()
{
	local x=${1##*255.}
	
	set -- 0^^^128^192^224^240^248^252^254 $(( (${#1} -${#x})*2 )) ${x%%.*}
	x=${1%%$3*}
	echo $(( $2 + (${#x}/4) ))
	return $(( $2 + (${#x}/4) ))
}

get_lan_startenddhcp()
{
	IP=$1
	mask=$2
	vlanid=$3
	dhcpptoplan1=$(echo $IP | cut -d. -f1)
	dhcpptoplan2=$(echo $IP | cut -d. -f2)
	dhcpptoplan3=$(echo $IP | cut -d. -f3)
	dhcpptoplan4=$(echo $IP | cut -d. -f4)

	dhcp_ptoplan="$dhcpptoplan1.$dhcpptoplan2.$dhcpptoplan3.$dhcpptoplan4"
	echo dhcp_ptoplan:$dhcp_ptoplan

	dhcpptopmask1=$(echo $mask | cut -d. -f1)
	dhcpptopmask2=$(echo $mask | cut -d. -f2)
	dhcpptopmask3=$(echo $mask | cut -d. -f3)
	dhcpptopmask4=$(echo $mask | cut -d. -f4)

	dhcp_ptopmask="$dhcpptopmask1.$dhcpptopmask2.$dhcpptopmask3.$dhcpptopmask4"
	echo dhcp_ptopmask:$dhcp_ptopmask

	dhcpptopmask1_temp=$(($dhcpptopmask1 ^ 0xFF ))
	dhcpptopmask2_temp=$(($dhcpptopmask2 ^ 0xFF ))
	dhcpptopmask3_temp=$(($dhcpptopmask3 ^ 0xFF ))
	dhcpptopmask4_temp=$(($dhcpptopmask4 ^ 0xFF ))
	dhcpptopmask_temp="$dhcpptopmask1_temp.$dhcpptopmask2_temp.$dhcpptopmask3_temp.$dhcpptopmask4_temp"
	echo dhcpptopmask_temp:$dhcpptopmask_temp


	fistdhcplan1=$(($dhcpptoplan1 & $dhcpptopmask1 ))
	fistdhcplan2=$(($dhcpptoplan2 & $dhcpptopmask2 ))
	fistdhcplan3=$(($dhcpptoplan3 & $dhcpptopmask3 ))
	fistdhcplan4=$(($dhcpptoplan4 & $dhcpptopmask4 ))

	echo fistdhcplan4:$fistdhcplan4
	if [ "$fistdhcplan4" -lt "255" ]; then
		fistdhcplan4=`expr $fistdhcplan4 + 2`
	fi


	fistdhcplan="$fistdhcplan1.$fistdhcplan2.$fistdhcplan3.$fistdhcplan4"
	echo fistdhcplan:$fistdhcplan

	lastdhcplan1=$(($dhcpptoplan1 | $dhcpptopmask1_temp ))
	lastdhcplan2=$(($dhcpptoplan2 | $dhcpptopmask2_temp ))
	lastdhcplan3=$(($dhcpptoplan3 | $dhcpptopmask3_temp ))
	lastdhcplan4=$(($dhcpptoplan4 | $dhcpptopmask4_temp ))
	echo lastdhcplan4:$lastdhcplan4
	if [ "$lastdhcplan4" -gt "0" ] && [ "$lastdhcplan4" -gt "$fistdhcplan4"  ]; then
		lastdhcplan4=`expr $lastdhcplan4 - 1`
	fi

	lastdhcplan="$lastdhcplan1.$lastdhcplan2.$lastdhcplan3.$lastdhcplan4"
	echo lastdhcplan:$lastdhcplan
#	echo dhcp-range=set:lan,$fistdhcplan,$lastdhcplan,300  >> /etc/dnsmasq.conf
	uci set vrfvlanconfig.vlan$vlanid.dhcp_start_ip=$fistdhcplan
	uci set vrfvlanconfig.vlan$vlanid.dhcp_end_ip=$lastdhcplan
	uci commit vrfvlanconfig		
}

#route_default=$(route  |grep default | wc -l)
#if [ "$route_default" == 0 ] ; then
#	route add default gw $(uci get networkmode.networkmode.defaultgw) dev sn0
#fi

uci set dhcp.@dnsmasq[0].nonwildcard=0
uci set dhcp.@dnsmasq[0].resolvfile='/etc/resolv.dnsmasq.conf'
uci del dhcp.lan
uci commit dhcp
lensetime=36000
true > /etc/resolv.dnsmasq.conf
true > /tmp/dhcp.leases
vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
i=0
true > /etc/dnsmasq.conf
echo 127.0.0.1 localhost > /etc/hosts
#echo 222.72.231.75 epdg.epc.mnc011.mcc460.pub.3gppnetwork.org >> /etc/hosts

if [ "$(cat /mnt/space0_or_weitong1)" == 1 ] ; then
	host_zonenmae="www.modem.satzone.com"
elif [ "$(cat /mnt/space0_or_weitong1)" == 2 ] ; then
	host_zonenmae="www.JHEIT.com"
else
	host_zonenmae="www.anovo.com"
fi

while [[ "$i" -lt "$vlannum" ]]
do
	let "i+=1"
	
	##三层配置dns dhcp
	if [ "$(uci show vrfvlanconfig.vlan$i | grep eth_interface | wc -l)" == 0 ] ; then
		eth_interface=0
	else
		eth_interface=$(uci get vrfvlanconfig.vlan$i.eth_interface)
	fi
	if [ "$(uci show vrfvlanconfig.vlan$i | grep network_type | wc -l)" == 0 ] ; then
		network_type=$(uci get networkmode.networkmode.networkmode)
	else
		network_type=$(uci get vrfvlanconfig.vlan$i.network_type)
	fi
	if [ "$(uci show vrfvlanconfig.vlan$i | grep tag | wc -l)" == 0 ] ; then
		tag=$(uci get vrfvlanconfig.mode.tag)
	else
		tag=$(uci get vrfvlanconfig.vlan$i.tag)
	fi
	vid=$(uci get vrfvlanconfig.vlan$i.vid)
	lanvrfip=$(uci get vrfvlanconfig.vlan$i.lanvrfip)
	lanvrfnetmask=$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask)
	
	if [ "$(uci show vrfvlanconfig.vlan$i | grep u16_dhcp_lease | wc -l )" == 1 ] ; then
		lensetime=$(uci get vrfvlanconfig.vlan$i.u16_dhcp_lease)
	else
		lensetime=$(uci get vrfvlanconfig.vlan$i.dhcp_lease)
	fi
	echo "dns config i:$i vlannum:$vlannum"
	echo "dns config network_type:$network_type 
	eth_interface:$eth_interface 
	tag:$tag 
	vid:$vid 
	lanvrfip:$lanvrfip 
	lanvrfnetmask:$lanvrfnetmask 
	networkmode_bridge_flag:$networkmode_bridge_flag"

	if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
		##二三层混合模式
		if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ]  ;then				
			echo "eth$eth_interface network is two-three mixed-mode cur is  two layer donot need config dns_dhcp"
		else

			dhcplan1=$(($(uci get vrfvlanconfig.vlan$i.lanvrfip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )))
			dhcplan2=$(($(uci get vrfvlanconfig.vlan$i.lanvrfip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )))
			dhcplan3=$(($(uci get vrfvlanconfig.vlan$i.lanvrfip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )))
			dhcplan4=$(($(uci get vrfvlanconfig.vlan$i.lanvrfip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )))
			
			if [ "$(uci show vrfvlanconfig.vlan$i | grep u32_dhcp_start_ip | wc -l )" == 1 ] ; then
				dhcpstart1=$(($(uci get vrfvlanconfig.vlan$i.u32_dhcp_start_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )))
				dhcpstart2=$(($(uci get vrfvlanconfig.vlan$i.u32_dhcp_start_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )))
				dhcpstart3=$(($(uci get vrfvlanconfig.vlan$i.u32_dhcp_start_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )))
				dhcpstart4=$(($(uci get vrfvlanconfig.vlan$i.u32_dhcp_start_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )))
						
			else
				dhcpstart1=$(($(uci get vrfvlanconfig.vlan$i.dhcp_start_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )))
				dhcpstart2=$(($(uci get vrfvlanconfig.vlan$i.dhcp_start_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )))
				dhcpstart3=$(($(uci get vrfvlanconfig.vlan$i.dhcp_start_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )))
				dhcpstart4=$(($(uci get vrfvlanconfig.vlan$i.dhcp_start_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )))
			fi
			if [ "$(uci show vrfvlanconfig.vlan$i | grep u32_dhcp_end_ip | wc -l )" == 1 ] ; then			

				dhcpend1=$(($(uci get vrfvlanconfig.vlan$i.u32_dhcp_end_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )))
				dhcpend2=$(($(uci get vrfvlanconfig.vlan$i.u32_dhcp_end_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )))
				dhcpend3=$(($(uci get vrfvlanconfig.vlan$i.u32_dhcp_end_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )))
				dhcpend4=$(($(uci get vrfvlanconfig.vlan$i.u32_dhcp_end_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )))
			else
				dhcpend1=$(($(uci get vrfvlanconfig.vlan$i.dhcp_end_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )))
				dhcpend2=$(($(uci get vrfvlanconfig.vlan$i.dhcp_end_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )))
				dhcpend3=$(($(uci get vrfvlanconfig.vlan$i.dhcp_end_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )))
				dhcpend4=$(($(uci get vrfvlanconfig.vlan$i.dhcp_end_ip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )))
			fi
			dhcp_lan="$dhcplan1.$dhcplan2.$dhcplan3.$dhcplan4"
			dhcp_start="$dhcpstart1.$dhcpstart2.$dhcpstart3.$dhcpstart4"
			dhcp_end="$dhcpend1.$dhcpend2.$dhcpend3.$dhcpend4"
			echo "dhcp_lan:$dhcp_lan"
			echo "dhcp_start:$dhcp_start"
			echo "dhcp_end:$dhcp_end"

			if [ "$dhcp_lan" != "$dhcp_start" ] || [ "$dhcp_lan" != "$dhcp_end" ]; then
				#dhcp_start_ip=$(uci get vrfvlanconfig.vlan$i.lanvrfip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,2}')
				#dhcp_end_ip=$(uci get vrfvlanconfig.vlan$i.lanvrfip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,250}')
				get_lan_startenddhcp $(uci get vrfvlanconfig.vlan$i.lanvrfip) $(uci get vrfvlanconfig.vlan$i.lanvrfnetmask)	$i		
			fi
			if [ "$(uci show vrfvlanconfig.vlan$i | grep u32_dhcp_start_ip | wc -l )" == 1 ] ; then
				dhcp_start_ip=$(uci get vrfvlanconfig.vlan$i.u32_dhcp_start_ip)
			else
				dhcp_start_ip=$(uci get vrfvlanconfig.vlan$i.dhcp_start_ip)
			fi
			if [ "$(uci show vrfvlanconfig.vlan$i | grep u32_dhcp_end_ip | wc -l )" == 1 ] ; then			
				dhcp_end_ip=$(uci get vrfvlanconfig.vlan$i.u32_dhcp_end_ip)
			else
				dhcp_end_ip=$(uci get vrfvlanconfig.vlan$i.dhcp_end_ip)
			fi			

			
			echo "dhcp_start_ip:$dhcp_start_ip"
			echo "dhcp_end_ip:$dhcp_end_ip"
			if [ "$(uci get vrfvlanconfig.vlan$i.dhcp_lease | wc -l)"  != "0"  ]; then								
				lensetime=$(uci get vrfvlanconfig.vlan$i.dhcp_lease)
				if [ "$lensetime" -le 0 ];then
					lensetime=300
				else				
					let "lensetime*=60"
				fi	
			else
				lensetime=300
			fi		
			echo "lensetime:$lensetime"
			if [ "$(uci show dns_dhcp_config | grep -w dns_config_vlan$vid | wc -l)" = "0" ]; then
				uci set dns_dhcp_config.dns_config_vlan$vid=vlan_config
				uci set dns_dhcp_config.dns_config_vlan$vid.dns_switch=1
				uci set dns_dhcp_config.dns_config_vlan$vid.dns_make=0
				uci set dns_dhcp_config.dns_config_vlan$vid.dns_main=8.8.8.8
				uci set dns_dhcp_config.dns_config_vlan$vid.dns_back=114.114.114.114
				uci commit dns_dhcp_config
			else
				if [ "$(uci get dns_dhcp_config.dns_config_vlan$vid.dns_switch)" = "1" ]; then
					if [ "$(uci show dns_dhcp_config | grep dns_dhcp_config.dns_config_vlan$vid.dns_main | wc -l)" -eq "0" ] ; then
						uci set dns_dhcp_config.dns_config_vlan$vid.dns_main=8.8.8.8
						uci commit dns_dhcp_config
					fi
					if [ "$(uci show dns_dhcp_config | grep dns_dhcp_config.dns_config_vlan$vid.dns_back | wc -l)" -eq "0" ]; then
						uci set dns_dhcp_config.dns_config_vlan$vid.dns_back=114.114.114.114
						uci commit dns_dhcp_config
					fi	
				fi
			fi		
			if [ "$(uci get dns_dhcp_config.dns_config_vlan$vid.dns_main)" = "0.0.0.0" ]; then
					uci set dns_dhcp_config.dns_config_vlan$vid.dns_main=8.8.8.8
					uci commit dns_dhcp_config					
			fi

			if [ "$(uci get dns_dhcp_config.dns_config_vlan$vid.dns_back)" = "0.0.0.0" ]; then
					uci set dns_dhcp_config.dns_config_vlan$vid.dns_back=114.114.114.114
					uci commit dns_dhcp_config					
			fi
				
				uci set dns_dhcp_config.dns_config_vlan$vid.dhcp_start_ip=$dhcp_start_ip
				uci set dns_dhcp_config.dns_config_vlan$vid.dhcp_end_ip=$dhcp_end_ip
				uci set dns_dhcp_config.dns_config_vlan$vid.lensetime=$lensetime
				uci commit dns_dhcp_config
					#if [ "$(uci get networkmode.eth$eth_interface.bridge)" == "0" ];then 
						if [ "$tag" != 0 ];then ##三层网络access
							if [ "$eth_interface" == "0" ];then 
								if [ "$(cat /etc/dnsmasq.conf | grep -w "interface=br-lan" | wc -l)" == "0" ];then 
									echo interface=br-lan >> /etc/dnsmasq.conf	
									echo listen-address=$lanvrfip >> /etc/dnsmasq.conf					
									echo dhcp-range=set:lan,$dhcp_start_ip,$dhcp_end_ip,$lensetime  >> /etc/dnsmasq.conf
									if [ "$(uci get dns_dhcp_config.dns_config_vlan$vid.dns_switch)" = "1" ]; then
									echo dhcp-option=lan,6,$lanvrfip,$(uci get dns_dhcp_config.dns_config_vlan$vid.dns_main),$(uci get dns_dhcp_config.dns_config_vlan$vid.dns_back) >> /etc/dnsmasq.conf				
									fi
								else
									echo "interface=br-lan has exit"
								fi
							else
								if [ "$(cat /etc/dnsmasq.conf | grep -w "interface=br-lan$eth_interface" | wc -l)" == "0" ];then 
									echo interface=br-lan$eth_interface >> /etc/dnsmasq.conf
									echo listen-address=$lanvrfip >> /etc/dnsmasq.conf
									echo dhcp-range=set:lan$eth_interface,$dhcp_start_ip,$dhcp_end_ip,$lensetime  >> /etc/dnsmasq.conf
									if [ "$(uci get dns_dhcp_config.dns_config_vlan$vid.dns_switch)" = "1" ]; then
									echo dhcp-option=lan$eth_interface,6,$lanvrfip,$(uci get dns_dhcp_config.dns_config_vlan$vid.dns_main),$(uci get dns_dhcp_config.dns_config_vlan$vid.dns_back) >> /etc/dnsmasq.conf				
									fi
								else
									echo "interface=br-lan$eth_interface has exit"
								fi
							fi																			
						else  #trunk		
								echo 11111
							if [ "$(cat /etc/dnsmasq.conf | grep -w "interface=br-lan$vid" | wc -l)" == "0" ] ; then 
								echo  interface=br-lan$vid  >> /etc/dnsmasq.conf	
								echo listen-address=$lanvrfip >> /etc/dnsmasq.conf
								echo dhcp-range=set:lan$vid,$dhcp_start_ip,$dhcp_end_ip,$lensetime  >> /etc/dnsmasq.conf
								if [ "$(uci get dns_dhcp_config.dns_config_vlan$vid.dns_switch)" = "1" ]; then
								echo dhcp-option=lan$vid,6,$lanvrfip,$(uci get dns_dhcp_config.dns_config_vlan$vid.dns_main),$(uci get dns_dhcp_config.dns_config_vlan$vid.dns_back) >> /etc/dnsmasq.conf				
								fi
							else
								echo "interface=br-lan$vid has exit"
							fi
						fi
						if [ "$(uci get dns_dhcp_config.dns_config_vlan$vid.dns_switch)" = "1" ]; then
							echo "nameserver $(uci get dns_dhcp_config.dns_config_vlan$vid.dns_main)" >> /etc/resolv.dnsmasq.conf
							echo "nameserver $(uci get dns_dhcp_config.dns_config_vlan$vid.dns_back)" >> /etc/resolv.dnsmasq.conf
						fi
						echo address=/$host_zonenmae/$lanvrfip >> /etc/dnsmasq.conf
						echo $lanvrfip $host_zonenmae >> /etc/hosts	
						dhcplan1=$(($(uci get vrfvlanconfig.vlan$i.lanvrfip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )))
						dhcplan2=$(($(uci get vrfvlanconfig.vlan$i.lanvrfip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )))
						dhcplan3=$(($(uci get vrfvlanconfig.vlan$i.lanvrfip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )))
						dhcplan4=$(($(uci get vrfvlanconfig.vlan$i.lanvrfip | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )&$(uci get vrfvlanconfig.vlan$i.lanvrfnetmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )))
						dhcp_lan="$dhcplan1.$dhcplan2.$dhcplan3.$dhcplan4"								
						netmask_cdr=$(mask2cdr $lanvrfnetmask)
						echo "netmask_cdr:$dhcp_lan $lanvrfnetmask $netmask_cdr"
						if [ "$(uci show vrfvlanconfig | grep lanvrfip | grep $lanvrfip | wc -l)" != "1" ] ; then
							if [ "$(uci show vrfvlanconfig | grep vid | grep -v vmap_sys_vid | grep $vid | wc -l)" == "$(uci show vrfvlanconfig | grep lanvrfip | grep $lanvrfip | wc -l)" ] ; then
								if [ "$(ip rule | grep -w "$dhcp_lan" | wc -l)" == "0" ] ; then
									if [ "$netmask_cdr" != "0" ] ; then
										ip rule add from $dhcp_lan/$netmask_cdr table $i
										ip rule add to $dhcp_lan/$netmask_cdr table $i
										if [ ! -z "$(uci get vrfvlanconfig.vlan$i.wanvrfgateway)" ] ; then
											ip rule add from all to $(uci get vrfvlanconfig.vlan$i.wanvrfgateway) table $i
										fi
									fi							
								fi							
							fi						
						else
							if [ "$(ip rule | grep -w "$dhcp_lan" | wc -l)" == "0" ] ; then
								if [ "$netmask_cdr" != "0" ] ; then
									ip rule add from $dhcp_lan/$netmask_cdr table $i
									ip rule add to $dhcp_lan/$netmask_cdr table $i
									if [ ! -z "$(uci get vrfvlanconfig.vlan$i.wanvrfgateway)" ] ; then
										ip rule add from all to $(uci get vrfvlanconfig.vlan$i.wanvrfgateway) table $i
									fi
								fi
							fi	
						fi												
						sync			
					#fi		 #if [ "$(uci get networkmode.eth$eth_interface.bridge)" == "0" ];then


			##
		fi ##二三层混合模式
	fi	 #if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then

done		

echo listen-address=127.0.0.1 >> /etc/dnsmasq.conf
echo cache-size=500 >> /etc/dnsmasq.conf	
#echo address=/$host_zonenmae/$(uci get wlan.wlan0.ipaddr) >> /etc/dnsmasq.conf
#echo address=/epdg.epc.mnc011.mcc460.pub.3gppnetwork.org/222.72.231.75 >> /etc/dnsmasq.conf
echo min-cache-ttl=300 >> /etc/dnsmasq.conf
echo resolv-file=/etc/resolv.dnsmasq.conf >> /etc/dnsmasq.conf
#echo log-queries >> /etc/dnsmasq.conf
#echo log-facility=/tmp/dnsmasq.log >> /etc/dnsmasq.conf

hostnameip_num=$(cat /etc/config/host_config | grep hname | wc -l)
hostnameip_cnt=0
while [[ "$hostnameip_cnt" -lt "$hostnameip_num" ]]

do
	let "hostnameip_cnt+=1"
	num=$(uci show host_config | grep hname | sed -n "$hostnameip_cnt"p | awk -F[.] '{print $2}')
	hname=$(uci get host_config.$num.hname)
	hip=$(uci get host_config.$num.hip)
	echo "address=/$hname/$hip" >> /etc/dnsmasq.conf
	echo "$hip $hname" >> /etc/hosts
done

#dhcp_chage
/etc/init.d/dnsmasq restart
