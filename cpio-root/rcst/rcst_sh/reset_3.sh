#!/bin/bash
syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info reset_3"[$(ps | grep reset_3.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}
reset_ps=$(ps | grep "reset_3.sh" | grep -v grep | awk '{print $1}' |wc -l)
syslog_sh "---------------------------reset_ps:$reset_ps---------------------------"
if [ "$reset_ps" == "2" ]; then #zhiyouyige reset.sh
echo  "3.0########reset########" >> /mnt/rcst_log/abridged_log.txt
echo 3 > /mnt/zd_version

sync
#yangfei auth

rcst_status=$(uci get sys_monitor.rcst_status.cur_rcst_status)
uci set sys_monitor.rcst_status.b_reboot_rcst_status=$rcst_status
uci set sys_monitor.rcst_status.cur_rcst_status=0
uci commit sys_monitor

#killall LLA_STiD135
/etc/init.d/cron stop


/etc/init.d/diagnostics_monitor stop
/etc/init.d/logoff_monitor_app_monitor stop
/etc/init.d/modem_to_acu_client_monitor stop
/etc/init.d/nmi_app_monitor stop
/etc/init.d/param_config_app_monitor stop
/etc/init.d/SDDP_monitor stop
/etc/init.d/buzzer_config_app_monitor stop
/etc/init.d/x509_auth_monitor stop
/etc/init.d/fh_snmp_monitor stop
/etc/init.d/vehicular_app_monitor stop
kill -9 $(ps | grep snmp_restart | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep param_config_app | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep fou_tx_config_app | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep cron | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep nmi_app | grep -v grep | grep -v fh_nmi_app | awk '{print $1}')
kill -9 $(ps | grep buzzer_config_app | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep logoff_monitor_app | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep SDDP_upgrade | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep x509_auth | grep -v grep | awk '{print $1}')

#stop crontab

count=$(lsmod | grep gateway_fou |sed -n 1p | awk '{print $3}')
#lixch@202101018
if [ "$count" == 0 ]; then
	count=1
fi

if [ ! -f "count" ]; then
	count=1
fi

gatewaystatuscnt=0
rebootstatuscnt=0

while [ "$count" != 0 ];do

	kill -9 $(ps | grep snmp_restart | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep param_config_app | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep fou_tx_config_app | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep cron | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep nmi_app | grep -v grep | grep -v fh_nmi_app | awk '{print $1}')
	kill -9 $(ps | grep x509_auth | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep remote_start_update_monitor | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep diagnostics | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep buzzer_config_app | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep logoff_monitor_app | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep SDDP_upgrade | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep modem_to_acu_client | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep pdnsd | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep pppoe-relay | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep x509_auth | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep beam_check | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep remote_update_monitor | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep fh_nmi_app | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep vehicular_app | grep -v grep | awk '{print $1}')	
	/etc/init.d/dnsmasq stop
	pimd -q
	muticast_ps=$(ps | grep pimd | grep -v grep | awk '{print $1}')
	
	if [ -n "$muticast_ps" ]; then
		kill -9 $muticast_ps
	fi
	count=$(lsmod | grep gateway_fou |sed -n 1p | awk '{print $3}')
	if [ "$count" != 0 ]; then
	rebootstatuscnt=`expr $rebootstatuscnt + 1`
	sleep 1
	if [ "$rebootstatuscnt" -gt 30 ]; then
		syslog_sh "---------------gateway donot rmmod need reboot---------------"
		rebootstatuscnt=0
		reboot -f -d 5
	fi
	else
		rebootstatuscnt=0
	fi	
	#lixch@202101018
	if [ -z "$count" ]; then
		count=0
	fi
done

#stop stid135
syslog_sh "---------------------------stop stid135---------------------------"
cd /rcst/rcst_app

./stm_fe_config -d 0
sleep 1
./stm_fe_config -s -p 1 -o 0

sleep 2

syslog_sh "---------------------------rmmod ko---------------------------"
ifconfig sn0 down
cd /rcst/rcst_drv
rrcst_type=$(cat /mnt/rcst_type)

rmmod gateway_fou.ko

rmmod lcmb_lla_driver.ko
rmmod cdma_driver.ko 

sleep 1
rmmod  stm_fe_configure.ko  
rmmod  stid135_lla.ko    
rmmod  stm_fe.ko  
rmmod  stm_fe_util.ko  
rmmod  stm_fe_os_wrapper.ko  
rmmod  rohc.ko
sleep 1
#LLA_STiD135 "---------------------------LLA_STiD135---------------------------"
#rf_rx_lock_freq=$(uci get rf_rx.rf_rx.rf_rx_lock_freq)
#rf_rx_symbol=$(uci get rf_rx.rf_rx.rf_rx_symbol)
#LLA_STiD135 BBFN $rf_rx_lock_freq $rf_rx_symbol &

gatewayisexist=0
gatewayisexist=$(lsmod | awk '{print $1,$2}' | grep gateway_fou |  awk '{print $2}')
syslog_sh "---------------gatewayisexist=$gatewayisexist---------------"
if [ -n "$gatewayisexist" ]; then
		syslog_sh "---------------gateway donot rmmod1 need reboot---------------"
		gatewayisexist=0
		reboot -f -d 5
fi

#sleep 3
insmod /rcst/rcst_drv/stm_fe_os_wrapper.ko
insmod /rcst/rcst_drv/stm_fe_util.ko
insmod /rcst/rcst_drv/stm_fe.ko
insmod /rcst/rcst_drv/stid135_lla.ko  lla_wrapper_debug=0 u32_set_gse_bbf_mode=1 demod0_mllr=260
insmod /rcst/rcst_drv/stm_fe_configure.ko

sleep 1
#STiD135 snr minus 0.8dB
echo 80 > /sys/module/stid135_lla/parameters/s32_snr_num


rcst_type_new=$(cat /mnt/rcst_type_new)

#echo $rcst_type_new > /mnt/rcst_type

cat /rcst/rcst_drv/term_top_TD.bin > /dev/xdevcfg 

sleep 1
ifconfig eth1 down
ifconfig eth1 up
ethtool -s eth1 speed 100 duplex full autoneg on
sleep 1
#insmod ko"
syslog_sh "---------------------------insmod ko---------------------------"
insmod /rcst/rcst_drv/cdma_driver.ko
insmod /rcst/rcst_drv/lcmb_lla_driver.ko
sleep 1

insmod /rcst/rcst_drv/gateway_fou_3.ko


sleep 1
cp /rcst/rcst_sh/root_3 /etc/crontabs/root
cp /rcst/rcst_sh/pimd.conf /etc/pimd.conf
cd /rcst/rcst_app/
#fou_dev_tool
lnb_en=$(uci get odu.switch.lnb_en)
buc_en=$(uci get odu.switch.buc_en)
odu_10m_en=$(uci get odu.switch.odu_10m_en)
sw_22k_en=$(uci get odu.switch.22k_en)
hardware_version=$(uci get update.update.hardware_version)
syslog_sh "########fou_dev_tool########"
if [ "$hardware_version" == 1 ] ; then
	uci set anybeam_config.anybeam_config.openorclose_22k13v18v_flag=1
	uci commit anybeam_config
fi
#sleep 1
if [ "$odu_10m_en" == 1 ] ; then
	./fou_dev_tool -v 0
else
	./fou_dev_tool -v 1
fi
#sleep 1
if [ "$buc_en" == 1 ] ; then
	./fou_dev_tool -v 2
else
	./fou_dev_tool -v 3
fi
#sleep 1
if [ "$lnb_en" == 1 ] ; then
	if [ "$hardware_version" == 2 ] ; then
		uci set odu.switch.lnb_13V_en=0
		uci set odu.switch.lnb_18V_en=1
		uci commit odu
	else
		./fou_dev_tool -v 4
	fi
else
	./fou_dev_tool -v 5
fi
#sleep 1

if [ "$hardware_version" == 2 ] ; then

	if [ "$sw_22k_en" == 1 ] ; then
		./fou_dev_tool -w 8356 71
	else
		./fou_dev_tool -w 8356 91
	fi	
else
	if [ "$sw_22k_en" == 1 ] ; then
		./fou_dev_tool -v 6
	else
		./fou_dev_tool -v 7
	fi
fi
#sleep 1

lnb_13V_en=$(uci get odu.switch.lnb_13V_en)
lnb_18V_en=$(uci get odu.switch.lnb_18V_en)

if [ "$lnb_13V_en" = "1" ] && [ "$lnb_18V_en" = "0" ]; then
	./satbox631_config_app 7 -v
	if [ "$hardware_version" == 1 ] ; then
		uci set odu.switch.lnb_en=0
		uci commit odu
		./fou_dev_tool -v 5
	fi
elif [ "$lnb_13V_en" = "0" ] && [ "$lnb_18V_en" = "1" ]; then
	./satbox631_config_app 7 -h
	if [ "$hardware_version" == 1 ] ; then
		uci set odu.switch.lnb_en=0
		uci commit odu
		./fou_dev_tool -v 5
	fi	
else
	./satbox631_config_app 7 -s
fi
#sleep 1
sh /rcst/rcst_sh/vlan_close_3.sh > /dev/null
	sh /rcst/rcst_sh/del_newnetwork_config.sh
#sleep 3
if [ "$(uci show vrfvlanconfig.vlan1 | grep network_type | wc -l)" != 0 ] ; then
	if [ "$(uci get vrfvlanconfig.vlan1.network_type)" != "$(uci get networkmode.networkmode.networkmode)" ];then
		uci set networkmode.networkmode.networkmode=$(uci get vrfvlanconfig.vlan1.network_type)
		uci commit networkmode
	fi
fi
networkmode=$(uci get networkmode.networkmode.networkmode)
if [ "$networkmode" == 1 ];then
	vlantype=$(uci get vlanconfig.mode.tag)
	if [ "$vlantype" != 0 ];then
		uci set network.lan.type=bridge
		uci commit network
		/etc/init.d/network reload
	fi	
	
#	sh /rcst/rcst_sh/NetworkTypeSwitch.sh
	syslog_sh "-------------------Two layer mode make sure nat is closed---------------------------"
	sh /rcst/rcst_sh/nat_switch_close.sh
	sh /rcst/rcst_sh/tos_set.sh &
	sleep 3
    sh /rcst/rcst_sh/vlan_open_3.sh  > /dev/null
 #   sleep 3
 #   sh /rcst/rcst_sh/NetworkTypeSwitch.sh
else

	sh /rcst/rcst_sh/del_vrf.sh
	  uci set network.lan.type=bridge
	  uci commit network
	  /etc/init.d/network reload
	   wan_proto=$(uci get network.wan.proto)
	   if [ "$wan_proto" = "pppoe" ]; then
	        syslog_sh "-------------------PPPOE mode make sure nat is opened---------------------------"
		    sh /rcst/rcst_sh/nat_switch_open.sh
	   else
	    var_nat_switch=$(uci get switch_redirect.redirect_set.switch)
	      if [ "$var_nat_switch" = "1" ]; then
	        syslog_sh "------------------- open nat switch based on configuration at present---------------------------"
            sh /rcst/rcst_sh/nat_switch_open.sh
			sh /rcst/rcst_sh/tos_set.sh &
	       else
	        syslog_sh "-------------------close nat switch based on configuration at present---------------------------"
            sh /rcst/rcst_sh/nat_switch_close.sh
			sh /rcst/rcst_sh/tos_set.sh &
	      fi
			#~ var_firewall_switch=$(uci get switch_redirect.redirect_set.firewall_switch)
			#~ if [ "$var_firewall_switch" = "1" ]; then
				#~ sh /rcst/rcst_sh/firewall_switch_open.sh
			#~ else
				#~ sh /rcst/rcst_sh/firewall_switch_close.sh
			#~ fi		      
	    fi
	    if [ "$(ifconfig | grep -w eth0 | wc -l)" == 0 ];then
			ifconfig eth0 up
	    fi	    
	    eth0_flag=$(brctl show |grep eth0 | wc -l)
	    if [ "$eth0_flag" == 0 ];then
			brctl addif br-lan eth0
	    fi
	    eth1_flag=$(brctl show |grep eth1 | wc -l)
	    if [ "$eth1_flag" == 0 ];then
			ifconfig eth1 up
			brctl addif br-lan eth1
	    fi
		lanip=$(ifconfig br-lan | sed -n 2p | awk '{print $2}' | tr -d 'addr:')
		if [ ! "$lanip" ];then
			ifconfig br-lan $(uci get network.lan.ipaddr) netmask $(uci get network.lan.netmask)  up
		fi	    
		brlan100_num=$(ifconfig | grep -w "br-lan:100" | wc -l)
	    if [ "$brlan100_num" == 0 ];then
		ifconfig br-lan:100 $(uci get networkmode.networkmode.default_ip) netmask 255.255.255.0 up
	    fi
fi
echo 0 > /tmp/changebeam_linkdelay_switch
echo 0 > /tmp/lockfreq_web_switch
echo 0 > /tmp/changebeam_flag_switch
echo 0 > /tmp/acu_connect_flag
echo 0 > /tmp/SDDP_updatebeamfile_flag
cd /rcst/rcst_app

sleep 1
#~ ./modem_to_acu_client &
/etc/init.d/modem_to_acu_client_monitor start

#sleep 1
#param_config_app"
syslog_sh "---------------------------param_config_app-------------------------------"
#~ ./param_config_app &
/etc/init.d/param_config_app_monitor start
#sleep 1
#fou_tx_config_app"
syslog_sh "---------------------------fou_tx_config_app-------------------------------"
./fou_tx_config_app &

#sleep 1
#nmi_app"
syslog_sh "---------------------------nmi_app-------------------------------"
#./nmi_app &
sh /rcst/rcst_sh/snmp_restart_3.sh &

#sleep 1
#diagnostics"
syslog_sh "---------------------------diagnostics-------------------------------"
#~ ./diagnostics &
/etc/init.d/diagnostics_monitor start

#sleep 1
#buzzer_config_app"
#syslog_sh "---------------------------buzzer_config_app-------------------------------"
#./buzzer_config_app &
/etc/init.d/buzzer_config_app_monitor start
#sleep 1
#logoff_monitor_app"
syslog_sh "---------------------------logoff_monitor_app-------------------------------"
#~ ./logoff_monitor_app &
/etc/init.d/logoff_monitor_app_monitor start


#sleep 1
#SDDP_upgrade"
syslog_sh "---------------------------SDDP_upgrade-------------------------------"
#~ ./SDDP_upgrade &
cd /mnt
/etc/init.d/SDDP_monitor start
/etc/init.d/fh_snmp_monitor start
#crontab
syslog_sh "---------------------------crontab---------------------------"
/etc/init.d/cron start

/etc/init.d/network reload
/etc/init.d/firewall stop
/etc/init.d/firewall restart
/etc/init.d/dnsmasq start
kill -9 $(ps | grep pdnsd | grep -v grep | awk '{print $1}')
#~ if [ "$(uci get dns_dhcp_config.dns_config.dns_switch)" = "1" ]; then
	#~ pdnsd  &
#~ fi
#硬件复位次数加一
hardware_reset_temp=$(uci get update.update.hardware_reset)
let "hardware_reset_temp=hardware_reset_temp+1"
uci set update.update.hardware_reset=$hardware_reset_temp
uci commit update

#stid135 acm
syslog_sh "########stid135 acm start########"
cd /rcst/rcst_app
./stm_fe_config -d 2000

kill -9 $(ps | grep pppoe-relay | grep -v grep | awk '{print $1}')
pppoe-relay -S sn0 -C br-lan &

sh /mnt/route_del.sh
sh /mnt/route_add.sh
sh /rcst/rcst_sh/dns_config.sh > /dev/null &


echo 0 > /tmp/changebeam_linkdelay_switch
echo 0 > /tmp/lockfreq_web_switch
echo 0 > /tmp/changebeam_flag_switch
sh /mnt/cmd_add.sh &
#/etc/init.d/dnsmasq stop
gatewaystatuscnt=0
gatewaystatuscnt=$(lsmod | grep gateway_fou |sed -n 1p | awk '{print $3}')
if [ -z "$gatewaystatuscnt" ]; then
	gatewaystatuscnt=0
fi
if [ "$gatewaystatuscnt" == 0 ]; then
	syslog_sh "---------------gateway donot insmod need reboot---------------"
	reboot -f -d 5
fi	
else
syslog_sh "---------------------------reset.sh has start---------------------------"
fi
