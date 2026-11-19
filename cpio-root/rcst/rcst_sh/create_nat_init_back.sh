#!/bin/bash
natconfig_num=$(cat /etc/config/firewall | grep "redirect " | wc -l)

loop=1
#uci show firewall | grep redirect | sed -n 1p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}'

iptables -t nat -F

ip_lan=$(ifconfig eth0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
wan_proto=$(uci get network.wan.proto)
if [ "$wan_proto" == "static" ]; then
	ip_wan=$(ifconfig sn0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	if [ "$(iptables -t nat -S | grep 'sn0 -j MASQUERADE' | wc -l)" -eq "0" ]; then
			iptables -t nat -A POSTROUTING -o sn0 -j MASQUERADE
	fi
	echo pppoe:$ip_wan
elif [ "$wan_proto" == "dhcp" ];  then
	ip_wan=$(ifconfig sn0 | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
elif [ "$wan_proto" == "pppoe" ]; then
	ip_wan=$(ifconfig pppoe-wan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
	
	if [ "$(iptables -t nat -S | grep 'pppoe-wan -j MASQUERADE' | wc -l)" -eq "0" ]; then
    	sh /rcst/rcst_sh/nat_iptables_open.sh
	fi


	echo pppoe:$ip_wan
else
	echo "read wan proto failed!"
fi

while [[ "$loop" -le  "$natconfig_num" ]]
do
	
	natconfig_loop=$(uci show firewall | grep redirect | sed -n "$loop"p | awk -F[=] '{print $1}' | awk -F[.] '{print $2}')
	proto=$(uci get firewall.$natconfig_loop.proto)
	dest_addr=$(uci get firewall.$natconfig_loop.dest_ip)
	start_port=$(uci get firewall.$natconfig_loop.src_dport | awk -F[-] '{print $1}')
	end_port=$(uci get firewall.$natconfig_loop.dest_port | awk -F[-] '{print $2}')

	if [ "$proto" = "TCPUDP" ] || [ "$proto" = "tcpudp" ] ; then
		iptables -t nat -A PREROUTING -p udp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port
		iptables -t nat -A POSTROUTING  -d $dest_addr/32 -p udp  --dport $start_port:$end_port  -j SNAT --to-source $ip_lan
		iptables -t nat -A PREROUTING  -d $ip_wan/32 -p udp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port	

		
		iptables -t nat -A PREROUTING -p tcp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port
		iptables -t nat -A POSTROUTING  -d $dest_addr/32 -p tcp  --dport $start_port:$end_port  -j SNAT --to-source $ip_lan
		iptables -t nat -A PREROUTING  -d $ip_wan/32 -p tcp  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port	

	else		
	
		iptables -t nat -A PREROUTING -p $proto  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port
		iptables -t nat -A POSTROUTING  -d $dest_addr/32 -p $proto  --dport $start_port:$end_port  -j SNAT --to-source $ip_lan
		iptables -t nat -A PREROUTING  -d $ip_wan/32 -p $proto  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port	
	echo "iptables -t nat -A PREROUTING -p $proto  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port"
	echo "iptables -t nat -A POSTROUTING  -d $dest_addr/32 -p $proto  --dport $start_port:$end_port  -j SNAT --to-source $ip_lan"
	echo "iptables -t nat -A PREROUTING  -d $ip_wan/32 -p $proto  --dport $start_port:$end_port  -j DNAT --to-destination $dest_addr:$start_port-$end_port"
	fi	

	
	let "loop+=1"
done


																













