#!/bin/bash
                                                                                                                        
i=0
j=0

true > /tmp/ipsec_config.sh
sh /tmp/ipsec_iprule_del.sh
rm /tmp/ipsec_iprule_del.sh
rm /tmp/ipsec_iprule_add.sh
ipsecconf_num=$(cat /etc/ipsec.conf | grep conn | wc -l)
if [ $ipsecconf_num != "0" ];then 
	
	while [[ "$j" -lt "$ipsecconf_num" ]]
	do
	let "j+=1"
	ipsecconf_name=$(cat /etc/ipsec.conf | grep conn | sed -n "$j"p | awk  '{print $2}')
	echo "ipsec down $ipsecconf_name" >> /tmp/ipsec_config.sh
	done
fi

ipsec down tunnel1
ipsec down tunnel2
/etc/init.d/ipsec stop
kill -9 $(ps | grep "/usr/lib/ipsec" | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep "/usr/lib/ipsec/charon" | grep -v grep | awk '{print $1}')

ipsecnum=$(uci show ipsec_config  | grep interface | wc -l)	
if [ $ipsecnum != "0" ];then 
	cp -rf /rcst/rcst_sh/ipsec.conf /etc/
	cp -rf /rcst/rcst_sh/ipsec.secrets /etc/	
	echo "/etc/init.d/ipsec stop" >> /tmp/ipsec_config.sh
	echo "/etc/init.d/ipsec restart" >> /tmp/ipsec_config.sh			
	while [[ "$i" -lt "$ipsecnum" ]]
	do  
		let "i+=1"
		ipsectunnel_name=$(uci show ipsec_config  | grep interface  |sed -n "$i"p |awk  -F '[=]+' '{print $1}' | awk -F '[.]+' '{print $2}')
		
		ipsectunnel_ipsvid=$(uci get ipsec_config.$ipsectunnel_name.ipsvid)                 #='28'
		ipsectunnel_ipstid=$(uci get ipsec_config.$ipsectunnel_name.ipstid)                 #='1'
		ipsectunnel_ipsen=$(uci get ipsec_config.$ipsectunnel_name.ipsen)                    #='open'
		ipsectunnel_ipskey=$(uci get ipsec_config.$ipsectunnel_name.ipskey)                 #='123456'
		ipsectunnel_ipsrmhost=$(uci get ipsec_config.$ipsectunnel_name.ipsrmhost)         #='10.6.37.1'
		ipsectunnel_ipslocalhost=$(uci get ipsec_config.$ipsectunnel_name.ipslochost)         #='10.6.77.1'
		ipsectunnel_ipsdh=$(uci get ipsec_config.$ipsectunnel_name.ipsdh)                    #='modp1024'
		ipsectunnel_ipsesp=$(uci get ipsec_config.$ipsectunnel_name.ipsesp)                 #='3des'
		ipsectunnel_ipsah=$(uci get ipsec_config.$ipsectunnel_name.ipsah)                    #='md5'
		ipsectunnel_ipsctype=$(uci get ipsec_config.$ipsectunnel_name.ipsctype)            #='route'
		ipsectunnel_ipsiketime=$(uci get ipsec_config.$ipsectunnel_name.ipsiketime)      #='10800'
		ipsectunnel_ipssatype=$(uci get ipsec_config.$ipsectunnel_name.ipssatype)         #='lifetime'
		ipsectunnel_ipssanum=$(uci get ipsec_config.$ipsectunnel_name.ipssanum)    #='1000'
		ipsectunnel_ipspfs=$(uci get ipsec_config.$ipsectunnel_name.ipspfs)                 #='open'
		ipsectunnel_ipsdpddelay=$(uci get ipsec_config.$ipsectunnel_name.ipsdpddelay)                 #='30'
		ipsectunnel_ipsrmnet=$(uci get ipsec_config.$ipsectunnel_name.ipsrmnet | sed 's/a/,/')           #='2,10.6.37.0/24,192.168.3.0/24'
		ipsectunnel_ipslocnet=$(uci get ipsec_config.$ipsectunnel_name.ipslocnet | sed 's/a/,/')        #='2,10.6.77.0/24,192.168.2.0.24'
		ipsectunnel_ipssuc=$(uci get ipsec_config.$ipsectunnel_name.ipssuc)                 #='123'
		ipsectunnel_ipsopt=$(uci get ipsec_config.$ipsectunnel_name.ipsopt)                 #='1'

		echo "conn $ipsectunnel_name" >> /etc/ipsec.conf
		echo "	keyexchange=ike"   >> /etc/ipsec.conf
		echo "	margintime=10"   >> /etc/ipsec.conf
		echo "	rekeyfuzz=0%"   >> /etc/ipsec.conf
		echo "	leftauth=psk"   >> /etc/ipsec.conf
		
		echo "	ikelifetime=$ipsectunnel_ipsiketime"   >> /etc/ipsec.conf
		echo "	dpddelay=$ipsectunnel_ipsdpddelay"   >> /etc/ipsec.conf
		
		if [ $ipsectunnel_ipssatype == "lifetime" ];then 
			echo "	lifetime=$ipsectunnel_ipssanum"   >> /etc/ipsec.conf
		elif [ $ipsectunnel_ipssatype == "lifetraffic" ];then 
			echo "	lifebytes=$ipsectunnel_ipssanum"   >> /etc/ipsec.conf
		fi
		echo "	left=$ipsectunnel_ipslocalhost"   >> /etc/ipsec.conf
		echo "	leftsubnet=$ipsectunnel_ipslocnet"   >> /etc/ipsec.conf
		
		if [ $ipsectunnel_ipspfs == "open" ];then 
			echo "	ike=$ipsectunnel_ipsesp-$ipsectunnel_ipsah-$ipsectunnel_ipsdh!"   >> /etc/ipsec.conf
			echo "	esp=$ipsectunnel_ipsesp-$ipsectunnel_ipsah-$ipsectunnel_ipsdh!"   >> /etc/ipsec.conf
		elif [ $ipsectunnel_ipspfs == "close" ];then
			echo "	ike=$ipsectunnel_ipsesp-$ipsectunnel_ipsah-$ipsectunnel_ipsdh!"   >> /etc/ipsec.conf
			echo "	esp=$ipsectunnel_ipsesp-$ipsectunnel_ipsah-null!"   >> /etc/ipsec.conf		
		fi
		echo "	leftid=$ipsectunnel_ipslocalhost"   >> /etc/ipsec.conf
		echo "	rightauth=psk"   >> /etc/ipsec.conf
		echo "	right=$ipsectunnel_ipsrmhost"   >> /etc/ipsec.conf
		echo "	rightsubnet=$ipsectunnel_ipsrmnet"   >> /etc/ipsec.conf
		echo "	rightid=$ipsectunnel_ipsrmhost"   >> /etc/ipsec.conf

		if [ $ipsectunnel_ipsen == "open" ];then 
			echo "	auto=$ipsectunnel_ipsctype"   >> /etc/ipsec.conf
			echo "ipsec up $ipsectunnel_name &" >> /tmp/ipsec_config.sh
		elif [ $ipsectunnel_ipsen == "close" ];then 
			echo "	auto=ignore"   >> /etc/ipsec.conf
			echo "ipsec down $ipsectunnel_name &" >> /tmp/ipsec_config.sh
		fi
			
		echo "$ipsectunnel_ipsrmhost : PSK \"$ipsectunnel_ipskey\""   >> /etc/ipsec.secrets


		vlannum=$(cat /etc/config/vrfvlanconfig | grep vlan | wc -l)
		table_i=0
		while [[ "$table_i" -lt "$vlannum" ]]
		do
			let "table_i+=1"
			if [ "$(uci show vrfvlanconfig.vlan$table_i | grep eth_interface | wc -l)" == 0 ] ; then
				eth_interface=0
				echo "netowrk config default table_i:$table_i eth_interface:$eth_interface"
			else
				eth_interface=$(uci get vrfvlanconfig.vlan$table_i.eth_interface)
			fi
			if [ "$(uci show vrfvlanconfig.vlan$table_i | grep network_type | wc -l)" == 0 ] ; then
				network_type=$(uci get networkmode.networkmode.networkmode)
				echo "netowrk config default table_i:$table_i network_type:$network_type"
			else
				network_type=$(uci get vrfvlanconfig.vlan$table_i.network_type)
			fi
			if [ "$(uci show vrfvlanconfig.vlan$table_i | grep network_type | wc -l)" == 0 ] ; then
				tag=$(uci get vrfvlanconfig.mode.tag)
				echo "netowrk config default table_i:$table_i tag:$tag"
			else
				tag=$(uci get vrfvlanconfig.vlan$table_i.tag)
			fi			
			wanvrfgateway=$(uci get vrfvlanconfig.vlan$table_i.wanvrfgateway)
			vmap_switch=$(uci get vrfvlanconfig.vlan$table_i.vmap_switch)
			#vid=$(uci get vrfvlanconfig.vlan$table_i.vid)
			vmap_sys_vid=$(uci get vrfvlanconfig.vlan$table_i.vmap_sys_vid)
			if [ "$vmap_switch" == 0 ] ; then
				vid=$(uci get vrfvlanconfig.vlan$table_i.vid)
			else
				vid=$(uci get vrfvlanconfig.vlan$table_i.vmap_sys_vid)
			fi
			if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
						##二三层混合模式
				if [ "$network_type" == 3 ] && [ "$tag" == 0 ]  && [ "$(uci show vrfvlanconfig.vlan$i | grep lanvrfip | wc -l)" == 0 ]  ;then				
					echo "eth$eth_interface network is two-three mixed-mode cur is three_layer need two config"
				else
					if [ "$ipsectunnel_ipsvid" == "$vid" ] ; then
						if [ "$(ip rule | grep -w "$ipsectunnel_ipsrmhost" | wc -l)" == "0" ] ; then 
							ip rule add to $ipsectunnel_ipsrmhost/32 table $table_i
						fi
							echo "ip rule del to $ipsectunnel_ipsrmhost/32 table $table_i" >> /tmp/ipsec_iprule_del.sh
							
							echo "if [ \"\$(ip rule | grep -w \"$ipsectunnel_ipsrmhost\" | wc -l)\" == \"0\" ] ; then" >> /tmp/ipsec_iprule_add.sh	
							echo "ip rule add to $ipsectunnel_ipsrmhost/32 table $table_i" >> /tmp/ipsec_iprule_add.sh
							echo "fi" >> /tmp/ipsec_iprule_add.sh					
					fi #if [ "$vlanid" == "$vid" ] ; then

				fi ##二三层混合模式
			fi	 #if [ "$network_type" == 2 ] || [ "$network_type" == 3 ] ;then
				
		done

		


	#	echo "ipsec up $ipsectunnel_name &" >> /tmp/ipsec_config.sh

	done                                                                                                                                 
fi                                                                                                                    
sh /tmp/ipsec_config.sh

