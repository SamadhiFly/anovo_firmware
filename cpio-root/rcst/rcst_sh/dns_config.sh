#!/bin/bash
#echo interface=wlan0 > /etc/dnsmasq.conf
#echo listen-address=$(uci get wlan.wlan0.ipaddr) >> /etc/dnsmasq.conf
#echo dhcp-range=$( uci get wlan.wlan0.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,2}' ),$( uci get wlan.wlan0.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,250}' ),12h  >> /etc/dnsmasq.conf

getptop_landhcp()
{
	IP=$1
	mask=$2
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
	echo dhcp-range=set:lan,$fistdhcplan,$lastdhcplan,300  >> /etc/dnsmasq.conf		
}

get_lan_startenddhcp()
{
	IP=$1
	mask=$2
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
	uci set dns_dhcp_config.dhcp_config.dhcp_start=$fistdhcplan
	uci set dns_dhcp_config.dhcp_config.dhcp_end=$lastdhcplan
	uci commit dns_dhcp_config		
}

if [ "$(ifconfig | grep br-lan | wc -l)" == 0 ];then
ifname=$(uci get network.lan.ifname)
else
ifname="br-lan"
fi
lan_ip=$(uci get network.lan.ipaddr)
networkmode=$(uci get networkmode.networkmode.networkmode)
rcst_type=$(cat /mnt/rcst_type)
ifname1=$(uci get network.lan.ifname)
netlanip=$(uci get network.lan.ipaddr)
if [ "$(uci show network | grep network.lan.ipaddr | wc -l)" == "1" ]; then

	dhcplan1=$(($(uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )&$(uci get network.lan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )))
	dhcplan2=$(($(uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )&$(uci get network.lan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )))
	dhcplan3=$(($(uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )&$(uci get network.lan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )))
	dhcplan4=$(($(uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )&$(uci get network.lan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )))

	dhcpstart1=$(($(uci get dns_dhcp_config.dhcp_config.dhcp_start | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )&$(uci get network.lan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )))
	dhcpstart2=$(($(uci get dns_dhcp_config.dhcp_config.dhcp_start | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )&$(uci get network.lan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )))
	dhcpstart3=$(($(uci get dns_dhcp_config.dhcp_config.dhcp_start | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )&$(uci get network.lan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )))
	dhcpstart4=$(($(uci get dns_dhcp_config.dhcp_config.dhcp_start | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )&$(uci get network.lan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )))

	dhcpend1=$(($(uci get dns_dhcp_config.dhcp_config.dhcp_end | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )&$(uci get network.lan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}' )))
	dhcpend2=$(($(uci get dns_dhcp_config.dhcp_config.dhcp_end | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )&$(uci get network.lan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $2}' )))
	dhcpend3=$(($(uci get dns_dhcp_config.dhcp_config.dhcp_end | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )&$(uci get network.lan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $3}' )))
	dhcpend4=$(($(uci get dns_dhcp_config.dhcp_config.dhcp_end | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )&$(uci get network.lan.netmask | awk -F '[.]+' 'BEGIN{OFS="."}END{print $4}' )))

	dhcp_lan="$dhcplan1.$dhcplan2.$dhcplan3.$dhcplan4"
	dhcp_start="$dhcpstart1.$dhcpstart2.$dhcpstart3.$dhcpstart4"
	dhcp_end="$dhcpend1.$dhcpend2.$dhcpend3.$dhcpend4"


	#~ if [ "$rcst_type" == 2 ];then
		#~ if [ "$ifname1" = "eth0" ]; then
			#~ ifconfig eth1 192.168.251.100 netmask 255.255.255.0 up
			#~ ifconfig br-lan:253 192.168.253.252 netmask 255.255.255.0 up
		#~ else
			#~ ifconfig eth0 192.168.251.100 netmask 255.255.255.0 up
			#~ ifconfig br-lan:253 192.168.253.252 netmask 255.255.255.0 up
		#~ fi
	#~ elif [ "$rcst_type" == 1 ];then 
		#~ if [ "$ifname1" = "eth0" ]; then
			#~ ifconfig eth1 192.168.251.100 netmask 255.255.255.0 up
		#~ else
			#~ ifconfig eth0 192.168.251.100 netmask 255.255.255.0 up
		#~ fi
	#~ fi
	if [ "$networkmode" == 2 ];then
		true >/etc/dnsmasq.conf
		echo interface=br-lan > /etc/dnsmasq.conf
		echo listen-address=$(uci get network.lan.ipaddr) >> /etc/dnsmasq.conf
		if [ -f "/etc/config/dns_dhcp_config" ]; then
				if [ "$dhcp_lan" != "$dhcp_start" ] || [ "$dhcp_lan" != "$dhcp_end" ]; then
					get_lan_startenddhcp $(uci get network.lan.ipaddr) $(uci get network.lan.netmask)

				fi
				if [ "$(uci get dns_dhcp_config.dhcp_config.lensetime | wc -l)" -eq "0" ]; then
					uci set dns_dhcp_config.dhcp_config.lensetime=5
					uci commit dns_dhcp_config		
				fi		
				if [ "$(uci get dns_dhcp_config.dhcp_config.lensetime | wc -l)"  != "0"  ]; then		
					lensetime=$(uci get dns_dhcp_config.dhcp_config.lensetime)
					if [ "$lensetime" -le 0 ];then
						lensetime=300
					else
						let "lensetime*=60"
					fi
				else
					lensetime=300	
				fi			
					
				if [ "$rcst_type" == 1 ];then
					if [ "$(uci get rf_tx.rf_tx_config.rf_tx_type)" -eq "1" ]; then
						#echo dhcp-range=set:lan,$(uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,2}' ),$( uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,250}' ),300  >> /etc/dnsmasq.conf		
						getptop_landhcp $(uci get network.lan.ipaddr) $(uci get network.lan.netmask)
					else						
						echo dhcp-range=set:lan,$(uci get dns_dhcp_config.dhcp_config.dhcp_start),$(uci get dns_dhcp_config.dhcp_config.dhcp_end),$lensetime  >> /etc/dnsmasq.conf
					fi
				else
					echo dhcp-range=set:lan,$(uci get dns_dhcp_config.dhcp_config.dhcp_start),$(uci get dns_dhcp_config.dhcp_config.dhcp_end),$lensetime  >> /etc/dnsmasq.conf	
				fi
		else
			echo dhcp-range=set:lan,$( uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,2}' ),$( uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,250}' ),300  >> /etc/dnsmasq.conf
		fi
		echo listen-address=127.0.0.1 >> /etc/dnsmasq.conf
		echo cache-size=500 >> /etc/dnsmasq.conf

		#~ if [ -f "/etc/config/dns_dhcp_config" ]; then
			if [ "$(uci get dns_dhcp_config.dns_config.dns_switch)" = "1" ]; then
				if [ "$(uci show dns_dhcp_config | grep dns_dhcp_config.dns_config.dns_main | wc -l)" -eq "0" ] ; then
					uci set dns_dhcp_config.dns_config.dns_main=8.8.8.8
					uci commit dns_dhcp_config
				fi
				if [ "$(uci show dns_dhcp_config | grep dns_dhcp_config.dns_config.dns_back | wc -l)" -eq "0" ]; then
					uci set dns_dhcp_config.dns_config.dns_back=114.114.114.114
					uci commit dns_dhcp_config
				fi	
				echo dhcp-option=lan,6,$netlanip,$(uci get dns_dhcp_config.dns_config.dns_main),$(uci get dns_dhcp_config.dns_config.dns_back) >> /etc/dnsmasq.conf
				#~ echo server=$(uci get dns_dhcp_config.dns_config.dns_main) >> /etc/dnsmasq.conf
				#~ echo server=$(uci get dns_dhcp_config.dns_config.dns_back) >> /etc/dnsmasq.conf
			else
					uci set dns_dhcp_config.dns_config.dns_main=114.114.114.114
					uci set dns_dhcp_config.dns_config.dns_back=8.8.8.8
					uci commit dns_dhcp_config
				echo dhcp-option=lan,6,$netlanip,114.114.114.114,8.8.8.8 >> /etc/dnsmasq.conf
			fi
		#~ else
			#~ echo server=8.8.8.8 >> /etc/dnsmasq.conf
			#~ echo server=114.114.114.114 >> /etc/dnsmasq.conf
		#~ fi
		echo address=/www.anovo.com/$(uci get wlan.wlan0.ipaddr) >> /etc/dnsmasq.conf
		echo address=/www.anovo.com/$(uci get network.lan.ipaddr) >> /etc/dnsmasq.conf

		echo 127.0.0.1 localhost > /etc/hosts
		echo $(uci get network.lan.ipaddr) www.anovo.com >> /etc/hosts
		#dhcp_chage
		/etc/init.d/dnsmasq restart
		kill -9 $(ps | grep pdnsd | grep -v grep | awk '{print $1}')
			#~ if [ "$(iptables -t nat -L | grep PDNSD_LAN | wc -l)" -eq "0" ]; then 
				#~ iptables -t nat -N PDNSD_LAN
			#~ fi
			#~ iptables -t nat -D PREROUTING  -j PDNSD_LAN
			#~ iptables -t nat -I PREROUTING  -j PDNSD_LAN
			#~ iptables -t nat -F PDNSD_LAN

			#~ if [ "$(uci get dns_dhcp_config.dns_config.dns_switch)" = "1" ]; then
				#~ sed -i '7d' /etc/pdnsd.conf
				#~ sed -i '7i perm_cache=4096;' /etc/pdnsd.conf
				
				#~ sed -i '11d' /etc/pdnsd.conf
				#~ sed -i '11i server_ip = '$lan_ip';' /etc/pdnsd.conf

				#~ sed -i '12d' /etc/pdnsd.conf
				#~ sed -i '12i server_port = 5353;' /etc/pdnsd.conf
				
				#~ sed -i '28d' /etc/pdnsd.conf
				#~ if [ -f "/etc/config/dns_dhcp_config" ]; then
					#~ sed -i '28i ip ='$(uci get dns_dhcp_config.dns_config.dns_main)','$(uci get dns_dhcp_config.dns_config.dns_back)';' /etc/pdnsd.conf
				#~ else
					#~ sed -i '28i ip =8.8.8.8,114.114.114.114;' /etc/pdnsd.conf
				#~ fi
				#~ sed -i '36d' /etc/pdnsd.conf
				#~ sed -i '36i interface = br-lan;' /etc/pdnsd.conf
				#~ pdnsd &
				#~ if [ "$(ps | grep pdnsd | grep -v grep | wc -l)" -eq "1" ]; then
				#~ iptables -t nat -A PDNSD_LAN -p udp -i $ifname -d $lan_ip/32 --dport 53 -j DNAT --to $lan_ip:5353
				#~ iptables -t nat -A PDNSD_LAN -p tcp -i $ifname -d $lan_ip/32 --dport 53 -j DNAT --to $lan_ip:5353
				#~ # /etc/init.d/pdnsd stop
				#~ fi 
			 #~ fi
	#
	 else
		/etc/init.d/dnsmasq stop
			kill -9 $(ps | grep pdnsd | grep -v grep | awk '{print $1}')
			
			#~ if [ "$(iptables -t nat -L | grep PDNSD_LAN | wc -l)" -eq "0" ]; then 
				#~ iptables -t nat -N PDNSD_LAN
			#~ fi
			#~ iptables -t nat -D PREROUTING  -j PDNSD_LAN
			#~ iptables -t nat -I PREROUTING  -j PDNSD_LAN
			#~ iptables -t nat -F PDNSD_LAN

			#~ if [ "$(uci get dns_dhcp_config.dns_config.dns_switch)" = "1" ]; then
				#~ sed -i '7d' /etc/pdnsd.conf
				#~ sed -i '7i perm_cache=4096;' /etc/pdnsd.conf
				
				#~ sed -i '11d' /etc/pdnsd.conf
				#~ sed -i '11i server_ip = '$lan_ip';' /etc/pdnsd.conf

				#~ sed -i '12d' /etc/pdnsd.conf
				#~ sed -i '12i server_port = 5353;' /etc/pdnsd.conf
				
				#~ sed -i '28d' /etc/pdnsd.conf
				#~ if [ -f "/etc/config/dns_dhcp_config" ]; then
					#~ sed -i '28i ip ='$(uci get dns_dhcp_config.dns_config.dns_main)','$(uci get dns_dhcp_config.dns_config.dns_back)';' /etc/pdnsd.conf
				#~ else
					#~ sed -i '28i ip =8.8.8.8,114.114.114.114;' /etc/pdnsd.conf
				#~ fi
				#~ sed -i '36d' /etc/pdnsd.conf
				#~ sed -i '36i interface = br-lan;' /etc/pdnsd.conf
				#~ pdnsd &
				#~ if [ "$(ps | grep pdnsd | grep -v grep | wc -l)" -eq "1" ]; then
				#~ iptables -t nat -A PDNSD_LAN -p udp -i $ifname -d $lan_ip/32 --dport 53 -j DNAT --to $lan_ip:5353
				#~ iptables -t nat -A PDNSD_LAN -p tcp -i $ifname -d $lan_ip/32 --dport 53 -j DNAT --to $lan_ip:5353
				#~ # /etc/init.d/pdnsd stop
				#~ fi	 
			 #~ fi
	fi

fi
