#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info rcst"[$(ps | grep rcst.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

#仅A星使用
sh /rcst/rcst_sh/chage_judge.sh

echo $(uci get system.system.timezone) > /etc/TZ

uci set system.system.hostname=ZIDU631
uci commit system
/etc/init.d/system reload
#open syslog
syslog_sh "########begin########"
echo  "2.0########begin########" >> /mnt/rcst_log/abridged_log.txt
syslogd -O /mnt/rcst_log/messages -l 6 -s 4096
klogd
uci set dropbear.@dropbear[0].IdleTimeout=300
uci set dropbear.@dropbear[0].RootPasswordAuth='off'
uci commit dropbear
/etc/init.d/dropbear restart
cp /rcst/rcst_sh/sudoers /etc/
uci set beamaccsss_config.beamaccsss_config.beamcheck_init=256
uci commit beamaccsss_config
sleep 1
sh /rcst/rcst_sh/rcst_sys_start_judge_2.sh & > /dev/null

#加速工具
sh /rcst/rcst_sh/htop/htop_install.sh & > /dev/null
#修改arp与打印级别
lan_name=$(uci get network.lan.ifname)
echo 0 > /proc/sys/net/ipv4/conf/$lan_name/proxy_arp
echo 1 > /proc/sys/kernel/printk
echo 1 > /proc/sys/net/ipv4/ip_forward
echo 1 > /proc/sys/net/ipv4/tcp_orphan_retries
echo "1" > /proc/sys/net/netfilter/nf_conntrack_udp_timeout
echo "2" > /proc/sys/net/netfilter/nf_conntrack_icmp_timeout

#sleep 1

version_num_crt=$(uci get update.update.image_crtvsn)
version_num_new=$(cat /rcst/upgrade_sh/version)

sh /rcst/rcst_sh/upgrade_check.sh
if [ ! -f "/mnt/rcst_version_type" ]; then
	cp /rcst/rcst_sh/rcst_version_type /mnt/
	sync
fi
#if [ ! -f "/etc/config/TXCS_config" ]; then
	cp /rcst/rcst_sh/TXCS_config /etc/config/
#else
	uci set TXCS_config.TXCS_config.nosync_reset_switch='0'
	uci set TXCS_config.TXCS_config.nosync_mainback_switch='0'
	uci commit TXCS_config	
#fi	
if [ "$version_num_new" ] && [ $version_num_crt != $version_num_new ] ; then
	uci set update.update.image_crtvsn=$version_num_new
	uci set update.update.image_newvsn=$version_num_new
	uci set update.update.sft_crtvsn=$version_num_new
	uci set update.update.sft_newvsn=$version_num_new
	uci set update.update.version_number=$version_num_new
	uci commit update
else 
	if [ -z "$version_num_crt" ]; then
		uci set update.update.image_crtvsn=$version_num_new
		uci set update.update.image_newvsn=$version_num_new
		uci set update.update.sft_crtvsn=$version_num_new
		uci set update.update.sft_newvsn=$version_num_new
		uci set update.update.version_number=$version_num_new
		uci commit update
	fi
fi
version_display=$(cat /rcst/upgrade_sh/version | awk -F '[-]+' '{print $1}')
hostname="SSTC_""${version_display//./_}"
uci set system.system.hostname=$hostname
uci commit system
/etc/init.d/system reload
sync
#sleep 1
cp /rcst/rcst_sh/firewall /etc/init.d/
#cp /rcst/rcst_sh/qos/qos /etc/init.d/
#cp /rcst/rcst_sh/qos/tcrules.awk /usr/lib/qos
#cp /rcst/rcst_sh/qos/generate.sh /usr/lib/qos
/etc/init.d/qos stop
cp /rcst/rcst_sh/pdnsd /etc/init.d/
cp /rcst/rcst_sh/pdnsd.conf /etc
#复制pppoe options文件
cp /rcst/rcst_sh/options /etc/ppp/

cp -rf /rcst/rcst_sh/spi_app_monitor /etc/init.d/
cp /rcst/rcst_app/oled_yf.bin /mnt/work/
#sleep 1
#chmod -R 644 /mnt/work/*

#fou_version_type
fou_version_type=$(cat /mnt/fou_version_type)
if [ "$fou_version_type" == 1 ];then
	echo "fou_version_type: 1,fou test version"
	sh /mnt/work/config_fou_pc.sh
	exit 0
else
	echo "fou_version_type: 0,fou zs version"
fi 


sleep 1
#wan_proto=$(uci get network.wan.proto)
#if [ "$wan_proto" = "pppoe" ]; then
#	sh /rcst/rcst_sh/nat_switch_open.sh
#else
#	var_nat_switch=$(uci get switch_redirect.redirect_set.switch)
#	if [ "$var_nat_switch" = "1" ]; then
#		sh /rcst/rcst_sh/nat_switch_open.sh
#		sh /rcst/rcst_sh/tos_set.sh &
#	else
#		sh /rcst/rcst_sh/nat_switch_close.sh
#		sh /rcst/rcst_sh/tos_set.sh &
#	fi
#	var_firewall_switch=$(uci get switch_redirect.redirect_set.firewall_switch)
#	if [ "$var_firewall_switch" = "1" ]; then
#		sh /rcst/rcst_sh/firewall_switch_open.sh
#	else
#		sh /rcst/rcst_sh/firewall_switch_close.sh
#	fi	
#fi	
#sleep 1

#加速相关
rm -rf /mnt/etc/config/tcpa_config.ini
cp /etc/config/tcpa_config.ini /mnt/etc/config/
rm -rf /mnt/etc/config/debug_config.ini
cp /etc/config/debug_config.ini /mnt/etc/config/
rm -rf /mnt/etc/config/tcpa_config_pppoe.ini
cp /etc/config/tcpa_config_pppoe.ini /mnt/etc/config/
rm -rf /mnt/etc/config/debug_config_pppoe.ini
cp /etc/config/debug_config_pppoe.ini /mnt/etc/config/
new_tcp_proxy_ip=$(uci get update.update.tcpaipaddr)
sed -i '/tcpa_proxy_ip/c tcpa_proxy_ip = '"$new_tcp_proxy_ip"'' /mnt/etc/config/tcpa_config.ini
echo 0 > /proc/sys/net/bridge/bridge-nf-call-iptables

if [ ! -f "/mnt/switch_5gc" ]; then
	echo 1 > /mnt/switch_5gc
fi   

#sleep 1

#LLA_STiD135
syslog_sh "########LLA_STiD135 DRV########"
#rf_rx_lock_freq=$(uci get rf_rx.rf_rx.rf_rx_lock_freq)
#rf_rx_symbol=$(uci get rf_rx.rf_rx.rf_rx_symbol)
#LLA_STiD135 BBFN $rf_rx_lock_freq $rf_rx_symbol &
insmod /rcst/rcst_drv/stm_fe_os_wrapper.ko
insmod /rcst/rcst_drv/stm_fe_util.ko
insmod /rcst/rcst_drv/stm_fe.ko
insmod /rcst/rcst_drv/stid135_lla.ko  lla_wrapper_debug=0 u32_set_gse_bbf_mode=1  demod0_mllr=260
insmod /rcst/rcst_drv/stm_fe_configure.ko

sleep 1
#STiD135 snr minus 0.8dB
echo 80 > /sys/module/stid135_lla/parameters/s32_snr_num

rcst_type=$(cat /mnt/rcst_type)



cat /rcst/rcst_drv/term_top_TD.bin > /dev/xdevcfg 

sleep 1
#读取新旧板卡硬件（update.update.hardware_version）  旧板卡为1  新板卡为2
/rcst/rcst_app/satbox631_hardware_version_test_app -T


ifconfig eth1 down
ifconfig eth1 up
ethtool -s eth1 speed 100 duplex full autoneg on
ethtool -K eth0 rx off tx off
ethtool -K eth1 rx off tx off
#sleep 1
#insmod ko
syslog_sh "########insmod ko########"
insmod /rcst/rcst_drv/cdma_driver.ko
insmod /rcst/rcst_drv/lcmb_lla_driver.ko
sleep 1


insmod /rcst/rcst_drv/gateway_fou_2.ko

sleep 1

#pimd

cp  /rcst/rcst_sh/pimd.conf /etc/
#x509
if [ ! -d "/mnt/x509_cert" ]; then
	mkdir -p /mnt/x509_cert
fi

if [ ! -d "/mnt/pkcs12" ]; then	
	mkdir -p /mnt/pkcs12
fi    
if [ ! -d "/mnt/ca_cert" ]; then
	mkdir -p /mnt/ca_cert
fi


if [ ! -f "/mnt/x509_cert/pfx_public_crt.crt" ]; then
	cp /rcst/rcst_sh/terminal_FF_EC_256.crt /mnt/x509_cert/pfx_public_crt.crt
else
	if [ "$(ls -l /mnt/x509_cert/ | grep -v grep |grep pfx_public_crt.crt | awk '{print $5}')" == "0" ]; then
		syslog_sh "/mnt/x509_cert/pfx_public_crt.crt is null need restart copy from default"
		cp /rcst/rcst_sh/terminal_FF_EC_256.crt /mnt/x509_cert/pfx_public_crt.crt
	fi		
fi   
if [ ! -f "/mnt/x509_cert/pfx_private_key.key" ]; then
	cp /rcst/rcst_sh/terminal_FF_EC_256.pem /mnt/x509_cert/pfx_private_key.key
else
	if [ "$(ls -l /mnt/x509_cert/ | grep -v grep |grep pfx_private_key.key | awk '{print $5}')" == "0" ]; then
		syslog_sh "/mnt/x509_cert/pfx_private_key.key is null need restart copy from default"
		cp /rcst/rcst_sh/terminal_FF_EC_256.pem /mnt/x509_cert/pfx_private_key.key
	fi	
fi 

if [  -f "/mnt/x509_cert/pfx_public_crt.crt" ] && [  -f "/mnt/x509_cert/pfx_private_key.key" ]  ; then
	if [ "$(md5sum /mnt/x509_cert/pfx_public_crt.crt | awk '{print $1}')" == "$(md5sum /mnt/x509_cert/pfx_private_key.key | awk '{print $1}')" ]; then
		syslog_sh "/mnt/x509_cert/pfx_public_crt.crt and /mnt/x509_cert/pfx_private_key.key md5 is same so restart copy from default"
		cp /rcst/rcst_sh/terminal_FF_EC_256.crt /mnt/x509_cert/pfx_public_crt.crt
		cp /rcst/rcst_sh/terminal_FF_EC_256.pem /mnt/x509_cert/pfx_private_key.key
	fi
fi

cp /rcst/rcst_sh/ca.crt /mnt/ca_cert/
cp /rcst/rcst_sh/load_pkcs12.sh /mnt/
#x509 
if [ ! -f "/mnt/pkcs12/x509_auth_status" ]; then
	echo 2 > /mnt/pkcs12/x509_auth_status
fi
if [ ! -f "/mnt/rcst_version_type" ]; then
	echo 2 > /mnt/rcst_version_type
fi

if [ "$( uci get sys_monitor.lockstatus_info_cnt  | wc -l)" -eq "0" ]; then
uci set sys_monitor.lockstatus_info_cnt=lockstatus_info_cnt
fi	
uci set sys_monitor.lockstatus_info_cnt.lockstatus_info_cnt=0
uci commit sys_monitor

uci set backup_lockfreq.backuplockfreq.mainback_flag=1
uci commit backup_lockfreq

#yangfei auth

rcst_status=$(uci get sys_monitor.rcst_status.cur_rcst_status)
uci set sys_monitor.rcst_status.b_reboot_rcst_status=$rcst_status
uci set sys_monitor.rcst_status.cur_rcst_status=0
uci commit sys_monitor

cd /rcst/rcst_app/

./zidu_config_app 6  &
sleep 1
./satbox631_config_app 0 &

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


sleep 1
sh /rcst/rcst_sh/rcst_sys_start_judge_2.sh & > /dev/null




if [ "$( uci get network.lan.type  | wc -l)" -eq "0" ]; then
		uci set network.lan.type='bridge'
		uci commit network
fi

sleep 1
if [ "$(uci show vrfvlanconfig.vlan1 | grep network_type | wc -l)" != 0 ] ; then
	if [ "$(uci get vrfvlanconfig.vlan1.network_type)" != "$(uci get networkmode.networkmode.networkmode)" ];then
		uci set networkmode.networkmode.networkmode=$(uci get vrfvlanconfig.vlan1.network_type)
		uci commit networkmode
	fi
fi
networkmode=$(uci get networkmode.networkmode.networkmode)
#sleep 5
uci set networkmode.networkmode.rf_lock_update_flag=0
uci commit networkmode
sync
#sleep 2
sh /rcst/rcst_sh/vlan_close_2.sh > /dev/null
sh /rcst/rcst_sh/del_newnetwork_config.sh
#sleep 3
if [ "$networkmode" == 1 ];then

	sh /rcst/rcst_sh/nat_switch_close.sh
	sleep 3
	sh /rcst/rcst_sh/vlan_open_2.sh > /dev/null
#	sleep 3
#		sh /rcst/rcst_sh/NetworkTypeSwitch.sh
else

sh /rcst/rcst_sh/del_vrf.sh
    wan_proto=$(uci get network.wan.proto)
	if [ "$wan_proto" = "pppoe" ]; then
		sh /rcst/rcst_sh/nat_switch_open.sh
	else
		var_nat_switch=$(uci get switch_redirect.redirect_set.switch)
		if [ "$var_nat_switch" = "1" ]; then
			sh /rcst/rcst_sh/nat_switch_open.sh
			sh /rcst/rcst_sh/tos_set.sh &
		else
			sh /rcst/rcst_sh/nat_switch_close.sh
			sh /rcst/rcst_sh/tos_set.sh &
		fi
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
	sh /rcst/rcst_sh/networkmode_2.sh 		
fi
echo 0 > /tmp/ubi_rw_flag
echo 0 > /tmp/ubi_rw_time
echo 0 > /tmp/ubi_rw_send
echo 0 > /tmp/webconfig_reset_switch
echo 0 > /tmp/changebeam_linkdelay_switch
echo 0 > /tmp/beammapaccess_flag
echo 0 > /tmp/lockfreq_web_switch
echo 0 > /tmp/lockfreq_config_switch
echo 3 > /tmp/acu_tx_status
echo 0 > /tmp/changebeam_flag_switch
echo 2 > /tmp/beam_int
echo 0 > /tmp/acu_connect_flag
echo 0 > /tmp/SDDP_updatebeamfile_flag
if [ "$networkmode" == 1 ];then
echo "0" > /proc/sys/net/bridge/bridge-nf-call-iptables
echo "0" > /sys/devices/virtual/net/br-lan/bridge/multicast_snooping
elif [ "$networkmode" == 2 ];then
echo "0" > /proc/sys/net/bridge/bridge-nf-call-iptables
echo "1" > /proc/sys/net/netfilter/nf_conntrack_udp_timeout
echo "2" > /proc/sys/net/netfilter/nf_conntrack_icmp_timeout
fi
cp -rf /rcst/rcst_sh/buzzer_config_app_monitor /etc/init.d/
cp -rf /rcst/rcst_sh/diagnostics_monitor /etc/init.d/
cp -rf /rcst/rcst_sh/logoff_monitor_app_monitor /etc/init.d/
cp -rf /rcst/rcst_sh/modem_to_acu_client_monitor /etc/init.d/
cp -rf /rcst/rcst_sh/nmi_app_monitor /etc/init.d/
cp -rf /rcst/rcst_sh/param_config_app_monitor /etc/init.d/
cp -rf /rcst/rcst_sh/SDDP_monitor /etc/init.d/
cp -rf /rcst/rcst_sh/fh_snmp_monitor /etc/init.d/
cp -rf /rcst/rcst_sh/x509_auth_monitor /etc/init.d/
cp -rf /rcst/rcst_sh/vehicular_app_monitor /etc/init.d/

cd /rcst/rcst_app/

#sleep 1
#hi3593_config_app_monitor
#/etc/init.d/hi3593_config_app_monitor start

#sleep 1
#param_config_app"
syslog_sh "########param_config_app########"
#./param_config_app_2 &
/etc/init.d/param_config_app_monitor start

#./modem_to_acu_client &
/etc/init.d/modem_to_acu_client_monitor start
#sleep 1
#fou_tx_config_app"
syslog_sh "########fou_tx_config_app########"
./fou_tx_config_app &

#sleep 1
#nmi_app"
#syslog_sh "########nmi_app########"
#./nmi_app &
#./nmi_app &
sh /rcst/rcst_sh/snmp_restart_2.sh &

sleep 1
#sleep 1
#diagnostics"
syslog_sh "########diagnostics########"
#./diagnostics &
/etc/init.d/diagnostics_monitor start

#sleep 1
#buzzer_config_app"
syslog_sh "########buzzer_config_app########"
#./buzzer_config_app &
/etc/init.d/buzzer_config_app_monitor start

#sleep 1
#logoff_monitor_app"
syslog_sh "########logoff_monitor_app########"
#./logoff_monitor_app &
/etc/init.d/logoff_monitor_app_monitor start

#sleep 1
if [ "$(uci get update.dst_ip.fh_ip_addr | wc -l)" -eq "0" ]; then
	uci set update.dst_ip.fh_ip_addr=192.168.2.146
	uci commit update
fi

#sleep 1
#fh_nmi_app"
syslog_sh "########fh_nmi_app########"
#~ ./fh_nmi_app &
/etc/init.d/fh_snmp_monitor start

#sleep 1
sh /rcst/upgrade_sh/reboot_upgrade.sh & > /dev/null
sleep 1
#SDDP_upgrade"
syslog_sh "########SDDP_upgrade########"
#./SDDP_upgrade &
/etc/init.d/SDDP_monitor start

#sleep 1
#web
syslog_sh "########goahead########"
cp -r /rcst/rcst_ui  /tmp/
cp /rcst/rcst_app/goahead /tmp/
cp /rcst/rcst_app/route.txt /tmp/
cp /rcst/rcst_app/gopass /tmp


if [ ! -f "/mnt/auth_init.txt" ]; then
	sh /rcst/rcst_sh/rcstmac_webinit.sh
fi

if [ ! -f "/mnt/auth_web_save.txt" ]; then
	sh /rcst/rcst_sh/rcstmac_webinit.sh
else
	cp /mnt/auth_web_save.txt /tmp/auth.txt
fi
chmod 755 /tmp/goahead 
chmod 755 /tmp/route.txt
chmod 755 /tmp/gopass
chmod 755 /tmp/auth.txt
cd /tmp
./goahead -v  -l /tmp/goahead_log:1 /tmp/rcst_ui/web/ &



#sleep 1

uci set update.update.hardware_reset=0
uci set update.update.hwlast_reset_cal=0
uci set update.update.hwreset_count=0

uci set update.update.software_reset=0
uci set update.update.sflast_reset_cal=0
uci set update.update.sfreset_count=0

uci set update.update.down_losskey=0
uci set update.update.last_unlock_cal=0
uci set update.update.unlock_count=0
uci commit update



/etc/init.d/network reload
#sleep 5
/etc/init.d/firewall stop
/etc/init.d/firewall restart
sleep 1
#dns
sh /rcst/rcst_sh/dns_config.sh > /dev/null &

#sleep 1

if [ ! -f "/etc/config/natport_config" ]; then
	cp  /rcst/rcst_sh/natport_config /etc/config
fi

#pimd
if [ ! -f "/etc/pimd.conf" ]; then
	cp  /rcst/rcst_sh/pimd.conf /etc/
fi

#加速相关
rcst_type=$(cat /mnt/rcst_type)
rf_tx_type=$(uci get rf_tx.rf_tx_config.rf_tx_type)
if [ "$rcst_type" = "1" ] && [ "$rf_tx_type" = "1" ]; then
	syslog_sh "--------------------------------rcst.sh scpc p2p mode: /rcst/http_sh/default_vlan.sh-----------------------------"	
	sh /rcst/http_sh/default_vlan.sh > /dev/null
fi

#stid135 acm
syslog_sh "########stid135 acm start########"
cd /rcst/rcst_app
./stm_fe_config -d 2000

syslog_sh "########spi_app########"
/etc/init.d/spi_app_monitor start

if [ ! -f "/mnt/rcst_xph_type" ]; then
	cp /rcst/rcst_sh/rcst_xph_type /mnt/
	sync
fi

#crontab
syslog_sh "########cron acm start########"
cp /rcst/rcst_sh/root_2 /etc/crontabs/root 
/etc/init.d/cron restart 

echo "########end########"
sync
pppoe-relay -S sn0 -C eth0 &

ethtool -s eth0 speed 100 duplex full autoneg on
if [ "$(uci get update.update.process)" == "1" ];then
	uci set update.update.process=0
	uci commit update
fi
md5sum /mmc1/image_a.ub > /mnt/versionname_a
md5sum /mmc1/image_b.ub > /mnt/versionname_b
sh /rcst/rcst_sh/chmod_config.sh
sh /rcst/rcst_sh/mem_reclaim.sh &
sh /mnt/cmd_add.sh &

