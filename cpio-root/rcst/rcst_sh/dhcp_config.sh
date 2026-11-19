#!/bin/bash


true >/etc/dnsmasq.conf
true >/etc/dhcp/dnsmasq.conf
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

if [ -f "/etc/config/dns_dhcp_config" ]; then
		if [ "$dhcp_lan" != "$dhcp_start" ] || [ "$dhcp_lan" != "$dhcp_end" ]; then
			uci set dns_dhcp_config.dhcp_config.dhcp_start=$(uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,2}')
			uci set dns_dhcp_config.dhcp_config.dhcp_end=$(uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,250}')
			uci commit dns_dhcp_config
		fi
else
	echo dhcp-range=$( uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,2}' ),$( uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,250}' ),12h  >> /etc/dnsmasq.conf
fi

ipaddr=$(uci get network.lan.ipaddr)
netmask=$(uci get network.lan.netmask)
dhcp_start=$(uci get dns_dhcp_config.dhcp_config.dhcp_start)
dhcp_end=$(uci get dns_dhcp_config.dhcp_config.dhcp_end)

#sed -i '$d' /etc/dnsmasq.conf
#sed -i '$d' /etc/dnsmasq.conf
echo listen-address=127.0.0.1 >> /etc/dnsmasq.conf
echo cache-size=500 >> /etc/dnsmasq.conf
echo listen-address=$ipaddr >> /etc/dnsmasq.conf
echo address=/www.anovo.com/$ipaddr >> /etc/dnsmasq.conf

#sed -i '$d' /etc/dhcp/dnsmasq.conf
echo dhcp-range=lan,$dhcp_start,$dhcp_end,$netmask,12h >> /etc/dhcp/dnsmasq.conf

kill -9 $(ps | grep /usr/sbin/dnsmasq | grep -v grep | awk '{print $1}')

if [ ! -d "/var/lib/misc" ]; then
	mkdir /var/lib/misc
fi
cd /etc/dhcp/
cp -r dhcp.leases resolv.conf.auto hosts/ dnsmasq.d/ /tmp
cp -r dhcp.leases /var/lib/misc
sync
/usr/sbin/dnsmasq -C /etc/dhcp/dnsmasq.conf -k &
