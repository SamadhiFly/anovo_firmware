#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info upgrade_check"[$(ps | grep upgrade_check.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}


if [ ! -f "/mnt/first_install" ]; then
	echo 0 > /mnt/first_install
	sync
fi
var1=$(cat /mnt/first_install)
syslog_sh "open software install shell ... $var1"

if [ "$var1" = "0" ]; then


	#fw_setenv ethaddr ""


#	folder_file=/mnt/random_mac.txt
	 
#	touch "$folder_file"

#	echo $(echo 40:`cat /proc/sys/kernel/random/uuid | md5sum | sed 's/../&:/g'|cut -c 1-14`) > $folder_file

#	echo "random_mac $(cat $folder_file)"
		
#	fw_setenv ethaddr $(cat $folder_file)
	      
	sync
	
	  if [ ! -f "/etc/config/networkmode" ]; then
	      	cp /rcst/rcst_sh/networkmode /etc/config/
			networkmode=`brctl show | grep br-wan | cut -f 1`
			 if [  "$networkmode" = "br-wan"  ]; then
				uci set networkmode.networkmode.networkmode=1
				uci commit networkmode
			else
				networkmode=`brctl show | grep sn0 | cut -f 8`
				if [  "$networkmode" = "sn0"  ]; then
					uci set networkmode.networkmode.networkmode=1
					uci commit networkmode
				else
					uci set networkmode.networkmode.networkmode=2
					uci commit networkmode
				fi
			fi	      	
       else
           if [  "$(uci show networkmode.networkmode | grep mtu | wc -l)" -eq 0 ]; then
			    uci set networkmode.networkmode.mtu=1500
			    uci commit networkmode
          fi
       fi
           
	 #小站网络架构识别
    #~ networkmode=`brctl show | grep br-wan | cut -f 1`
     #~ if [  "$networkmode" = "br-wan"  ]; then
		#~ uci set networkmode.networkmode.networkmode=1
		#~ uci commit networkmode
    #~ else
		#~ networkmode=`brctl show | grep sn0 | cut -f 8`
		#~ if [  "$networkmode" = "sn0"  ]; then
			#~ uci set networkmode.networkmode.networkmode=1
			#~ uci commit networkmode
		#~ else
			#~ uci set networkmode.networkmode.networkmode=2
			#~ uci commit networkmode
		#~ fi
    #~ fi
		#液晶
#	if [ "$(uci get update.update.stm32_newvsn | awk '-F[.]+' '{print $1}')"  != "V3"  ]; then		
		uci set update.update.stm32_newvsn=V4.20
		uci set update.update.stm32_nowvsn=V4.20
		uci commit update		
#	fi
	   if [  "$(cat /mnt/cmd_add.sh | grep /mnt/network_monitor.sh | wc -l)" != 0 ]; then
			rm -rf /mnt/cmd_add.sh
			sync
	  fi
	#BOOT.bin update 
	if [ ! -f "/mmc1/fsbl_qspi_mode" ]; then
		cp /rcst/rcst_sh/fsbl_qspi_mode   /mmc1/
		sync
	fi
	#bhjz_config配置文件
	if [ ! -f "/etc/config/sqm" ]; then
		cp /rcst/rcst_sh/sqm /etc/config/
		sync
	fi
	#backup_lockfreq映射配置文件
	if [ ! -f "/etc/config/backup_lockfreq" ]; then
		cp /rcst/rcst_sh/backup_lockfreq /etc/config/
		sync
	fi
	if [ ! -f "/etc/config/power_atten_config" ]; then
		cp /rcst/rcst_sh/power_atten_config /etc/config/
		sync
	fi
	if [ ! -f "/etc/config/ipsec_config" ]; then
		cp /rcst/rcst_sh/ipsec_config /etc/config/
		sync
	fi
	if [ ! -f "/etc/config/vlanconfig" ]; then
		cp /rcst/rcst_sh/vlanconfig /etc/config/
		sync
    fi
	#bhjz_config配置文件
	if [ ! -f "/etc/config/bhjz_config" ]; then
		cp /rcst/rcst_sh/bhjz_config /etc/config/
		sync
	fi
		#防火墙规则配置文件
	if [ ! -f "/etc/config/firewall_config" ]; then
		cp /rcst/rcst_sh/firewall_config /etc/config/
		sync
	fi
	if [ ! -f "/etc/config/gre_config" ]; then
		cp /rcst/rcst_sh/gre_config /etc/config/
		sync
	fi	

	if [ ! -f "/etc/syslog.conf" ]; then
		cp /rcst/rcst_sh/syslog.conf /etc/
		sync
	fi	
	if [ ! -f "/etc/config/gre_routeconfig" ]; then
		cp /rcst/rcst_sh/gre_routeconfig /etc/config/
		sync
	fi		

	if [ ! -f "/etc/config/sqm" ]; then
		cp /rcst/rcst_sh/sqm /etc/config/
		sync
	fi

	if [ ! -f "/etc/config/IFFixed_config" ]; then
		cp /rcst/rcst_sh/IFFixed_config /etc/config/
		sync
	fi
	if [ ! -f "/etc/config/user_info" ]; then
		cp /rcst/rcst_sh/user_info /etc/config/
		sync
	fi
#	if [ ! -f "/etc/config/fpga_cfg" ]; then
		cp /rcst/rcst_sh/fpga_cfg /etc/config/
		sync
#	fi
#	uci set fpga_cfg.fpga_addr.ADDR_RELOAD_MODE=1
#      uci commit fpga_cfg	

	if [ ! -f "/etc/config/gre_info" ]; then
		cp /rcst/rcst_sh/gre_info /etc/config/
		sync
	fi	
	if [ ! -f "/etc/config/gre_routeinfo" ]; then
		cp /rcst/rcst_sh/gre_routeinfo /etc/config/
		sync
	fi
	#Qos配置文件
	if [ ! -f "/etc/config/qos_config" ]; then
		cp /rcst/rcst_sh/qos_config /etc/config/
		sync
	fi
	#端口映射配置文件
	if [ ! -f "/etc/config/natport_config" ]; then
		cp /rcst/rcst_sh/natport_config /etc/config/
		sync
	fi	
        #anybeam_config配置文件
    if [ ! -f "/etc/config/anybeam_config" ]; then
		cp /rcst/rcst_sh/anybeam_config /etc/config/
		sync
	fi

    if [ ! -f "/etc/config/query_beamlockinfo" ]; then
		cp /rcst/rcst_sh/query_beamlockinfo /etc/config/
		sync
	fi


#    if [ ! -f "/etc/strongswan.conf" ]; then
		cp /rcst/rcst_sh/strongswan.conf /etc/
		sync
#	fi	
    if [ ! -f "/etc/config/modem_connect" ]; then
		cp /rcst/rcst_sh/modem_connect /etc/config/
		sync
	fi	
	
	if [ ! -f "/etc/config/host_config" ]; then
		cp /rcst/rcst_sh/host_config /etc/config/
		sync
	fi		

	if [ "$(uci get modem_connect.modem_connect.snmp_init_flag | wc -l)" -eq "0" ]; then
		uci set modem_connect.modem_connect.snmp_init_flag=0
		uci commit modem_connect
	fi
		if [ "$(uci get modem_connect.modem_connect.network_lan_ip | wc -l)" -eq "0" ]; then
		uci set modem_connect.modem_connect.network_lan_ip=0
		uci commit modem_connect
	fi
		if [ "$(uci get modem_connect.modem_connect.network_lan_mask | wc -l)" -eq "0" ]; then
		uci set modem_connect.modem_connect.network_lan_mask=0
		uci commit modem_connect
	fi
	#液晶卫星配置文件
	if [ ! -f "/etc/config/satellite_info" ]; then
		cp /rcst/rcst_sh/satellite_info /etc/config/
		sync
	fi	
	if [ ! -f "/mnt/rcst_type" ]; then
		cp /rcst/rcst_sh/rcst_type /mnt/
		sync
	fi

#	if [ ! -f "/mnt/rcst_xph_type" ]; then
		cp /rcst/rcst_sh/rcst_xph_type /mnt/
		sync
#	fi
	if [ ! -f "/mnt/rcst_version_type" ]; then
		cp /rcst/rcst_sh/rcst_version_type /mnt/
		sync
	fi	
	if [ ! -f "/mnt/etc/config/f_stack_config/config.ini" ]; then
		cp -r /rcst/rcst_sh/f_stack_config /mnt/etc/config/
		sync
    fi
    
	#anybeam_config配置文件
	if [ ! -f "/etc/config/anybeam_config" ]; then
		cp /rcst/rcst_sh/anybeam_config /etc/config/
		sync
	fi	
	#nas_config
	if [ ! -f "/etc/config/nas_config" ]; then
		cp /rcst/rcst_sh/nas_config /etc/config/
		sync
	fi
		#usim
	if [ ! -f "/etc/config/usim" ]; then
		cp /rcst/rcst_sh/usim /etc/config/
		sync
	fi
	#beamaccsss_config配置文件
	if [ ! -f "/etc/config/beamaccsss_config" ]; then
		cp /rcst/rcst_sh/beamaccsss_config /etc/config/
		sync
	fi	
	if [ ! -f "/etc/config/ft_brlanip_config" ]; then
		cp /rcst/rcst_sh/ft_brlanip_config /etc/config/
		sync
	fi	

	if [ ! -f "/etc/config/datausagestrategy" ]; then
		cp /rcst/rcst_sh/datausagestrategy /etc/config/
		sync
	fi

    if [ "$(uci show datausagestrategy.datausagestrategy.Overageibswitch | wc -l)"  -eq "0"  ]; then
     		uci set datausagestrategy.datausagestrategy.Overageibswitch=0
        uci commit datausagestrategy
    
    fi

#	if [ "$(uci get beamaccsss_config.beamaccsss_config.mapaccess_version | wc -l)"  != "0"  ]; then		
		uci set beamaccsss_config.beamaccsss_config.mapaccess_version=0
		uci commit beamaccsss_config		
#	fi	
		uci set beamaccsss_config.beamaccsss_config.nmsftp_ver=0
		uci commit beamaccsss_config	
    if [ "$(uci show beamaccsss_config |grep beammapaccess_flag | wc -l)"  -eq "0"  ]; then
     	uci set beamaccsss_config.beamaccsss_config.beammapaccess_flag=0
        uci commit beamaccsss_config
    
    fi
    if [ "$(uci show beamaccsss_config |grep beamaccsss_map_isnot_dbs_flag | wc -l)"  -eq "0"  ]; then
     	uci set beamaccsss_config.beamaccsss_config.beamaccsss_map_isnot_dbs_flag=0
        uci commit beamaccsss_config
    
    fi
	 uci set beamaccsss_config.beamaccsss_config.beamcheck_init=256
	 uci commit beamaccsss_config
	uci set beamaccsss_config.beamaccsss_config.cur_change_beamsource_flag=0
	uci commit beamaccsss_config

	uci del beamaccsss_config.beamaccsss_config.nmsftp_name
	uci del beamaccsss_config.beamaccsss_config.nmsftp_passwd
	uci del beamaccsss_config.beamaccsss_config.nmsftp_ip
	uci set beamaccsss_config.beamaccsss_config.data_office_hf=56876b496cf0891912ad692bee9a1ee8
	uci set beamaccsss_config.beamaccsss_config.mapaccess_version='0'
	uci commit beamaccsss_config

	#vrfvlanconfig配置文件
	if [ ! -f "/etc/config/vrfvlanconfig" ]; then
		cp /rcst/rcst_sh/vrfvlanconfig /etc/config/
	fi    
	#DNS主备服务器DHCP起始结束地址
	if [ ! -f "/etc/config/dns_dhcp_config" ]; then		
		cp /rcst/rcst_sh/dns_dhcp_config /etc/config/
		sync
		
		if [ ! -f "/rcst/rcst_sh/rcst_test_flag" ]; then
			uci set dns_dhcp_config.dhcp_config.dhcp_start=$(uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,2}')
			uci set dns_dhcp_config.dhcp_config.dhcp_end=$(uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,250}')
			uci commit dns_dhcp_config
		else
			rcst_test_flag=$(cat /rcst/rcst_sh/rcst_test_flag)
			if [ "$rcst_test_flag" = "0" ]; then
				uci set dns_dhcp_config.dhcp_config.dhcp_start=$(uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,2}')
				uci set dns_dhcp_config.dhcp_config.dhcp_end=$(uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,250}')
				uci commit dns_dhcp_config					
			fi
		fi
	else
		if [ -z "$(uci get dns_dhcp_config.dhcp_config.dhcp_start | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1}')" ]; then
				uci set dns_dhcp_config.dhcp_config.dhcp_start=$(uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,2}')
				uci set dns_dhcp_config.dhcp_config.dhcp_end=$(uci get network.lan.ipaddr | awk -F '[.]+' 'BEGIN{OFS="."}END{print $1,$2,$3,250}')
				uci commit dns_dhcp_config	
		fi
	fi
    if [ "$(uci show dns_dhcp_config | grep dns_dhcp_config.dns_config.dns_main | wc -l)" -eq "0" ] ; then
    	uci set dns_dhcp_config.dns_config.dns_main=8.8.8.8
    	uci commit dns_dhcp_config
    fi
    if [ "$(uci show dns_dhcp_config | grep dns_dhcp_config.dns_config.dns_back | wc -l)" -eq "0" ]; then
    	uci set dns_dhcp_config.dns_config.dns_back=114.114.114.114
    	uci commit dns_dhcp_config
    fi	
	if [ "$(uci get networkmode.networkmode.dns_config_flag | wc -l)" -eq "0" ]; then
		uci set networkmode.networkmode.dns_config_flag=0
		uci commit networkmode	
	fi
	if [ "$(uci get networkmode.networkmode.tcpswitch_flag | wc -l)" -eq "0" ]; then
		uci set networkmode.networkmode.tcpswitch_flag=0
		uci commit networkmode	
	fi	

	if [ "$(uci get networkmode.networkmode.default_ip | wc -l)" -eq "0" ]; then
		uci set networkmode.networkmode.default_ip=192.168.251.1
		uci commit networkmode	
	fi	

	if [ "$(uci get networkmode.networkmode.network_acubrlaneth_flag | wc -l)" -eq "0" ]; then
		uci set networkmode.networkmode.network_acubrlaneth_flag=0
		uci commit networkmode	
	fi	
	
	if [ "$(uci get networkmode.networkmode.network_vehbrlaneth_flag | wc -l)" -eq "0" ]; then
		uci set networkmode.networkmode.network_vehbrlaneth_flag=0
		uci commit networkmode	
	fi	

	if [ "$(uci get networkmode.networkmode.network_eth1_configswitch | wc -l)" -eq "0" ]; then
		uci set networkmode.networkmode.network_eth1_configswitch=0
		uci commit networkmode	
	fi	

	if [ "$(uci show update | grep test_speed_ip | wc -l)" -eq "0" ]; then #lixch@20190411 默认为三层
		uci set update.test_speed_ip=test_speed_ip
		uci set update.test_speed_ip.ip_addr='192.168.1.1'
		uci set update.test_speed_ip.port='0'
		uci commit update
	fi

	if [ "$(uci get rf_rx.rf_rx.rx_snr_adj | wc -l)" -eq "0" ]; then
		uci set rf_rx.rf_rx.rx_snr_adj=0
		uci commit rf_rx
	fi
	if [ "$(uci get rf_tx.rf_tx_config.tx_snr_adj | wc -l)" -eq "0" ]; then
		uci set rf_tx.rf_tx_config.tx_snr_adj=0
		uci commit rf_tx
	fi
	#odu.boda
	#~ echo "odu.boda"
	if [ "$( uci get odu.boda  | wc -l)" -eq "0" ]; then
			uci set odu.boda=ODU
			uci set odu.boda.buzzer=0
			uci set odu.boda.RL_freq=400
			uci set odu.boda.power_armplifier=0
			uci set odu.boda.Oscillator_HL=0
			uci set odu.boda.Oscillator_freq=27750000
			uci set odu.boda.odu_test_flag=0
			uci set odu.boda.Oscillator_freq_test=0
			uci set odu.boda.odu_gain=57
			uci commit odu
	else
		if [ "$(uci get odu.boda.buzzer | wc -l)" -eq "0" ]; then
			uci set odu.boda.buzzer=0
		fi
		
		if [ "$(uci get odu.boda.RL_freq | wc -l)" -eq "0" ]; then
			uci set odu.boda.RL_freq=400
		fi	
		
		if [ "$(uci get odu.boda.power_armplifier | wc -l)" -eq "0" ]; then
			uci set odu.boda.power_armplifier=0
		fi
		
		if [ "$(uci get odu.boda.Oscillator_HL | wc -l)" -eq "0" ]; then
			uci set odu.boda.Oscillator_HL=0
		fi
		
		if [ "$(uci get odu.boda.Oscillator_freq | wc -l)" -eq "0" ]; then
			uci set odu.boda.Oscillator_freq=27750000
		fi
		
		if [ "$(uci get odu.boda.odu_test_flag | wc -l)" -eq "0" ]; then
			uci set odu.boda.odu_test_flag=0
		fi
		
		if [ "$(uci get odu.boda.Oscillator_freq_test | wc -l)" -eq "0" ]; then
			uci set odu.boda.Oscillator_freq_test=0
		fi
		
		if [ "$(uci get odu.boda.RX_freq | wc -l)" -eq "0" ]; then
			uci set odu.boda.RX_freq=0
		fi
		
		if [ "$(uci get odu.boda.odu_gain | wc -l)" -eq "0" ]; then
			uci set odu.boda.odu_gain=57
		fi
		
		if [ "$(uci get odu.boda.TX_freq | wc -l)" -eq "0" ]; then
			uci set odu.boda.TX_freq=29530000
		fi
		uci commit odu		 
	fi
    
	#odu.Transceiver_type
	#~ echo "odu.Transceiver_type"
	if [ "$( uci get odu.Transceiver_type  | wc -l)" -eq "0" ]; then
			uci set odu.Transceiver_type=ODU
			uci set odu.Transceiver_type.Transceiver_type=divide
			uci set odu.Transceiver_type.freqType=1
			 uci commit odu		
	else
		if [ "$(uci get odu.Transceiver_type.Transceiver_type | wc -l)" -eq "0" ]; then
			uci set odu.Transceiver_type.Transceiver_type=divide
		fi
		
		if [ "$(uci get odu.Transceiver_type.freqType | wc -l)" -eq "0" ]; then
			uci set odu.Transceiver_type.freqType=1
		fi
		uci commit odu		
	fi   

	if [ "$(uci get odu.satellite.link_delay_bc | wc -l)" -eq "0" ]; then
		uci set odu.satellite.link_delay_bc=0
		uci commit odu
	fi
	#odu
	#~ echo "odu"
	if [ "$(uci get odu.mesh | wc -l)" -eq "0" ]; then
		uci set odu.mesh=mesh
		uci set odu.mesh.spectral=0
		uci commit odu
	fi

	if [ "$(uci get odu.switch.lnb_10m_en | wc -l)" -eq "0" ]; then
		uci set odu.switch.lnb_10m_en=0
		uci commit odu	
	fi

	if [ "$(uci get odu.switch.22k_en | wc -l)" -eq "0" ]; then
		uci set odu.switch.22k_en=0
		uci commit odu	
	fi

	#if [ "$(uci get odu.switch.spectral | wc -l)" -eq "0" ]; then
		uci set odu.switch.spectral=0
		uci commit odu	
	#fi

	if [ "$(uci get odu.satellite.fre_offset | wc -l)" -eq "0" ]; then
		uci set odu.satellite.fre_offset=0
		uci commit odu
	fi

	if [ "$( uci get odu.Transceiver_type  | wc -l)" -eq "0" ]; then
			uci set odu.Transceiver_type=ODU
			uci set odu.Transceiver_type.Transceiver_type=divide
			uci set odu.Transceiver_type.freqType=1
			 uci commit odu		
	else
		if [ "$(uci get odu.Transceiver_type.Transceiver_type | wc -l)" -eq "0" ]; then
			uci set odu.Transceiver_type.Transceiver_type=divide
		fi
		
		if [ "$(uci get odu.Transceiver_type.freqType | wc -l)" -eq "0" ]; then
			uci set odu.Transceiver_type.freqType=1
		fi
		uci commit odu		
	fi   

	if [ "$(uci get odu.satellite.link_delay_bc | wc -l)" -eq "0" ]; then
		uci set odu.satellite.link_delay_bc=0
		uci commit odu
	fi
	#odu
	
	#~ echo "odu"

	if [ "$(uci get odu.satellite.link_ncc_delay | wc -l)" -eq "0" ]; then
		uci set odu.satellite.link_ncc_delay=0
		uci commit odu	
	fi
	if [ "$(uci get odu.satellite.link_rcst_delay | wc -l)" -eq "0" ]; then
		uci set odu.satellite.link_rcst_delay=0
		uci commit odu	
	fi	
	if [ "$(uci get odu.switch.lnb_13V_en | wc -l)" -eq "0" ]; then
		uci set odu.switch.lnb_13V_en=0
		uci commit odu	
	fi
	if [ "$(uci get odu.switch.lnb_18V_en | wc -l)" -eq "0" ]; then
		uci set odu.switch.lnb_18V_en=0
		uci commit odu	
	fi		
	#proset
	#~ echo "proset"
	if [ "$( uci get proset.6to4  | wc -l)" -eq "0" ]; then
			uci set proset.6to4=proset
			uci set proset.6to4.switch=0
			uci commit proset
	fi
	#rf_rx
	echo "rf_rx"
	if [ "$(uci  get rf_rx.rf_rx.rf_rx_set_flag)" -eq "close" ]; then
		uci rf_rx.rf_rx.rf_rx_set_flag=0
			uci commit rf_rx
	fi	
	#rf_tx
	#~ echo "rf_tx"
	if [ "$(uci get  rf_tx.rf_tx_config.tx_gain_fpga | wc -l)" -eq "0" ]; then
		uci set rf_tx.rf_tx_config.tx_gain_fpga=1.0
		uci commit rf_tx
	fi

	if [ "$(uci get  rf_tx.rf_tx_config.tx_p2p_modulation | wc -l)" -eq "0" ]; then
		uci set rf_tx.rf_tx_config.tx_p2p_modulation=1
		uci commit rf_tx
	fi

	if [ "$(uci get rf_tx.rf_tx_config.tx_p2p_symbol | wc -l)" -eq "0" ]; then
		uci set rf_tx.rf_tx_config.tx_p2p_symbol=100000
		uci commit rf_tx
	fi
	
	if [ "$(uci get rf_tx.rf_tx_config.tx_p2p_freq | wc -l)" -eq "0" ]; then
		uci set rf_tx.rf_tx_config.tx_p2p_freq=9500000
		uci commit rf_tx
	fi
	
	if [ "$(uci get rf_tx.rf_tx_config.rf_tx_type | wc -l)" -eq "0" ]; then
		uci set rf_tx.rf_tx_config.rf_tx_type=0
		uci commit rf_tx
	fi
		
	#if [ "$(uci get rf_tx.rf_tx_config.tx_p2p_frame | wc -l)" -eq "0" ]; then
		uci set rf_tx.rf_tx_config.tx_p2p_frame=0
		uci commit rf_tx
	#fi
	if [ "$(uci get rf_tx.rf_tx_config.mesh_t2t_power | wc -l)" -eq "0" ]; then
		uci set rf_tx.rf_tx_config.mesh_t2t_power=-20
		uci commit rf_tx
	fi

	if [ "$(uci get rf_tx.rf_single.sig_time | wc -l)" -eq "0" ]; then
		uci set rf_tx.rf_single.sig_time=0
		uci commit rf_tx
	fi

	if [ "$(uci get rf_tx.rf_tx_config.measure_type | wc -l)" -eq "0" ]; then
		uci set rf_tx.rf_tx_config.measure_type=1
		uci set rf_tx.rf_tx_config.saturated_point=0.2
		uci set rf_tx.rf_tx_config.nmsswitch=0
		uci commit rf_tx
	fi

	if [ "$(uci show odu.switch | grep en_22KHz | wc -l)"  -eq "0" ]; then
			uci set odu.switch.en_22KHz=0
			uci commit odu
	fi
		
	if [ "$(uci get rf_tx.rf_tx_config.p2p_network_type | wc -l)" -eq "0" ]; then #lixch@20190411 默认为三层
		uci set rf_tx.rf_tx_config.p2p_network_type=0
		uci commit rf_tx
	fi
	if [ "$(uci get switch_redirect.redirect_set.x509_auth_uploadflag | wc -l)" -eq "0" ]; then
		if [  -f "/mnt/pkcs12/terminal_EC_256.pfx" ]; then
			uci set switch_redirect.redirect_set.x509_auth_uploadflag=1
			uci commit switch_redirect
		else
			uci set switch_redirect.redirect_set.x509_auth_uploadflag=0
			uci commit switch_redirect			
		fi
	fi

		if [  -f "/mnt/pkcs12/terminal_EC_256.pfx" ]; then
			uci set switch_redirect.redirect_set.x509_auth_uploadflag=1
			uci commit switch_redirect
		else
			uci set switch_redirect.redirect_set.x509_auth_uploadflag=0
			uci commit switch_redirect			
		fi

	if [ "$(uci get switch_redirect.redirect_set.x509_transec_uploadflag | wc -l)" -eq "0" ]; then
		if [  -f "/mnt/pkcs12/terminal_RSA_2048.pfx" ]; then
			uci set switch_redirect.redirect_set.x509_transec_uploadflag=1
			uci commit switch_redirect
		else
			uci set switch_redirect.redirect_set.x509_transec_uploadflag=0
			uci commit switch_redirect		
		fi
	fi

		if [  -f "/mnt/pkcs12/terminal_RSA_2048.pfx" ]; then
			uci set switch_redirect.redirect_set.x509_transec_uploadflag=1
			uci commit switch_redirect
		else
			uci set switch_redirect.redirect_set.x509_transec_uploadflag=0
			uci commit switch_redirect		
		fi
	
	if [ "$(uci get switch_redirect.redirect_set.firewall_switch | wc -l)" -eq "0" ]; then
		uci set switch_redirect.redirect_set.firewall_switch=0
		uci commit switch_redirect
	fi	

	if [ "$(uci get anybeam_config.anybeam_config.update_switch | wc -l)" -eq "0" ]; then #lixch@20190411 默认为三层
		uci set anybeam_config.anybeam_config.update_switch=0
		uci commit anybeam_config
	fi
	
	if [ "$(uci get anybeam_config.anybeam_config.config_switch | wc -l)" -eq "0" ]; then #lixch@20190411 默认为三层
		uci set anybeam_config.anybeam_config.config_switch=0
		uci commit anybeam_config
	fi
	if [ "$(uci get anybeam_config.anybeam_config.beam_update_switch | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.beam_update_switch=0
		uci commit anybeam_config
	fi
	
	if [ "$(uci get anybeam_config.anybeam_config.acess_update_switch | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.acess_update_switch=0
		uci commit anybeam_config
	fi	
	
	if [ "$(uci get anybeam_config.anybeam_config.config_switch | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.config_switch=0
		uci commit anybeam_config
	fi
	if [ "$(uci get anybeam_config.anybeam_config.config_reset_flag | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.config_reset_flag=0
		uci commit anybeam_config
	fi
	#是否开启地图查询波束id功能 默认 1开启
	if [ "$(uci get anybeam_config.anybeam_config.auto_config_lockinfo | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.auto_config_lockinfo=1
		uci commit anybeam_config	
	fi
	#终端是否开启根据信噪比判断自动切波束 
	if [ "$(uci get anybeam_config.anybeam_config.auto_change_lockinfo | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.auto_change_lockinfo=1
		uci commit anybeam_config	
	fi
	if [ "$(uci get anybeam_config.anybeam_config.auto_search_num | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.auto_search_num=2
		uci commit anybeam_config
	fi			
	if [ "$(uci get anybeam_config.anybeam_config.auto_change_fw_snr | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.auto_change_fw_snr=40
		uci commit anybeam_config
	fi	
	if [ "$(uci get anybeam_config.anybeam_config.web_config_lockinfo | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.web_config_lockinfo=0
		uci commit anybeam_config
	fi		
	if [ "$(uci get anybeam_config.anybeam_config.sync_longitude | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.sync_longitude=0
		uci commit anybeam_config
	fi
	
	if [ "$(uci get anybeam_config.anybeam_config.sync_latitude | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.sync_latitude=0
		uci commit anybeam_config
	fi
	
	if [ "$(uci get anybeam_config.anybeam_config.default_dist | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.default_dist=1
		uci commit anybeam_config
	fi		
	if [ "$(uci get anybeam_config.anybeam_config.changebeam_closeswitch | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.changebeam_closeswitch=0
		uci commit anybeam_config
	fi	
	if [ "$(uci get anybeam_config.anybeam_config.config_isvrf_flag | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.config_isvrf_flag=0
		uci commit anybeam_config
	fi	
	if [ "$(uci get anybeam_config.anybeam_config.locksourcefile_flag | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.locksourcefile_flag=0
		uci commit anybeam_config
	fi
	if [ "$(uci get anybeam_config.anybeam_config.locksourcefile_update | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.locksourcefile_update=0
		uci commit anybeam_config
	fi			
	if [ "$(uci get anybeam_config.anybeam_config.twolnb_change_type | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.twolnb_change_type=0
		uci commit anybeam_config
	fi	
	
	if [ "$(uci get anybeam_config.anybeam_config.read_locksyncstatus_count | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.read_locksyncstatus_count=30
		uci commit anybeam_config
	fi		
	
	if [ "$(uci get anybeam_config.anybeam_config.sync_webbeamid | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.sync_webbeamid=0
		uci commit anybeam_config
	fi		

	if [ "$(uci get anybeam_config.anybeam_config.web_searchbeamlockinfo_flag | wc -l)" -eq "0" ]; then #lixch@20190411 默认为三层
		uci set anybeam_config.anybeam_config.web_searchbeamlockinfo_flag=0
		uci commit anybeam_config
	fi

	if [ "$(uci get anybeam_config.anybeam_config.query_beamcenter_switch | wc -l)" -eq "0" ]; then #lixch@20190411 默认为三层
		uci set anybeam_config.anybeam_config.query_beamcenter_switch=0
		uci commit anybeam_config
	fi
	if [ "$(uci get anybeam_config.anybeam_config.openorclose_22k13v18v_flag | wc -l)" -eq "0" ]; then #lixch@20190411 默认为三层
		uci set anybeam_config.anybeam_config.openorclose_22k13v18v_flag=1
		uci commit anybeam_config
	fi	
	if [ "$(uci get switch_redirect.redirect_set.pimd_switch | wc -l)" -eq "0" ]; then
		uci set switch_redirect.redirect_set.pimd_switch=1
		uci commit switch_redirect
	fi	
	if [ "$(uci get switch_redirect.redirect_set.5g4g_switch | wc -l)" -eq "0" ]; then
		uci set switch_redirect.redirect_set.5g4g_switch=0
		uci commit switch_redirect
	fi
	if [ "$(uci get switch_redirect.redirect_set.postionJM_switch | wc -l)" -eq "0" ]; then
		uci set switch_redirect.redirect_set.postionJM_switch=0
		uci commit switch_redirect
	fi
	
	if [ "$(uci get update.update.lcd_flag | wc -l)" -eq "0" ]; then #lixch@20190411 默认为三层
		uci set update.update.lcd_flag=0
		uci commit update
	fi
	if [ "$(uci get update.update.SDDPupdateswitch | wc -l)" -eq "0" ]; then #lixch@20190411 默认为三层
		uci set update.update.SDDPupdateswitch=0
		uci commit update
	fi


	if [ "$(uci get odu.switch.en_22KHz | wc -l)" -eq "0" ]; then #22K默认关
		uci set odu.switch.en_22KHz=0
		uci commit odu
	fi
	if [ "$(uci get odu.Transceiver_type.backup_freqType | wc -l)" -eq "0" ]; then
		uci set odu.Transceiver_type.backup_freqType='2'
		uci commit odu
	fi
	if [ "$(uci get backup_lockfreq.backuplockfreq.satellite_name | wc -l)" -eq "0" ]; then
		uci set backup_lockfreq.backuplockfreq.satellite_name='China10_Vertical'
		uci commit backup_lockfreq
	fi
	if [ "$(uci get backup_lockfreq.backuplockfreq.mainback_switch | wc -l)" -eq "0" ]; then
		uci set backup_lockfreq.backuplockfreq.mainback_switch=0
		uci commit backup_lockfreq
	fi	
	if [ "$(uci get odu.backup_switch | wc -l)" -eq "0" ]; then
		uci set odu.backup_switch=ODU
		uci set odu.backup_switch.backup_lnb_18v=0                                              
		uci set odu.backup_switch.backup_lnb_10m_en=0                                           
		uci set odu.backup_switch.backup_enable=0                                               
		uci set odu.backup_switch.backup_power=0                                                
		uci set odu.backup_switch.backup_reference=0                                            
		uci set odu.backup_switch.backup_en_22KHz=0                                             
		uci set odu.backup_switch.backup_spectral=0
		uci commit odu
	fi

	if [ "$(uci get odu.high_low_config | wc -l)" -eq "0" ]; then
		uci set odu.high_low_config=ODU
		uci set odu.high_low_config.high_lnb=$(uci get odu.LNB.rx_freq)	
		uci set odu.high_low_config.high_low_flag=2
		uci set odu.high_low_config.low_lnb=9750
		uci commit odu
	fi

	if [ "$(uci get odu.backup_high_low_config | wc -l)" -eq "0" ]; then
		uci set odu.backup_high_low_config=ODU
		uci set odu.backup_high_low_config.low_lnb=9750
		uci set odu.backup_high_low_config.high_low_flag=2
		uci set odu.backup_high_low_config.high_lnb=$(uci get backup_lockfreq.backuplockfreq.rx_freq)	
		uci commit odu
	fi
	#下线告警
	if [ "$( uci get sys_monitor.system_status  | wc -l)" -eq "0" ]; then
			uci set sys_monitor.system_status=system_status
			uci set sys_monitor.system_status.ubi_rw_flag=0
			uci set sys_monitor.system_status.ubi_rw_time=0
			uci set sys_monitor.system_status.ubi_rw_send=0
			uci set sys_monitor.system_status.meminfo_flag=0
			uci set sys_monitor.system_status.meminfo_time=0
			uci set sys_monitor.system_status.meminfo_send=0
			uci set sys_monitor.system_status.http_status_flag=0
			uci set sys_monitor.system_status.http_status_time=0
			uci set sys_monitor.system_status.http_status_send=0
			uci set sys_monitor.system_status.dns_status_flag=0
			uci set sys_monitor.system_status.dns_status_time=0
			uci set sys_monitor.system_status.dns_status_send=0
			uci set sys_monitor.system_status.klogs_status_flag=0
			uci set sys_monitor.system_status.klogs_status_time=0
			uci set sys_monitor.system_status.klogs_status_send=0
			uci commit sys_monitor		
	fi

	if [ "$( uci get sys_monitor.acu_status  | wc -l)" -eq "0" ]; then
			uci set sys_monitor.acu_status=acu_status
			uci set sys_monitor.acu_status.acu_connect_flag=0
			uci set sys_monitor.acu_status.acu_connect_time=0
			uci set sys_monitor.acu_status.acu_connect_send=0
			uci set sys_monitor.acu_status.acu_changebeaminfo_flag=0
			uci set sys_monitor.acu_status.acu_changebeaminfo_time=0
			uci set sys_monitor.acu_status.acu_changebeaminfo_send=0
			uci set sys_monitor.acu_status.acu_location_flag=0
			uci set sys_monitor.acu_status.acu_location_time=0
			uci set sys_monitor.acu_status.acu_location_send=0
			uci set sys_monitor.acu_status.acu_lockstatus_flag=0
			uci set sys_monitor.acu_status.acu_lockstatus_time=0
			uci set sys_monitor.acu_status.acu_lockstatus_send=0
			uci set sys_monitor.acu_status.acu_weblockstatus_fw_flag=0
			uci set sys_monitor.acu_status.acu_weblockstatus_fw_time=0
			uci set sys_monitor.acu_status.acu_webnolock_flag=0
			uci set sys_monitor.acu_status.acu_webnolock_time=0
			uci commit sys_monitor		
	fi	
	
	if [ "$( uci get sys_monitor.networkinfo  | wc -l)" -eq "0" ]; then
			uci set sys_monitor.networkinfo=networkinfo
			uci set sys_monitor.networkinfo.network_ipinfo_flag=0
			uci set sys_monitor.networkinfo.network_ipinfo_time=0
			uci set sys_monitor.networkinfo.network_laniperror_flag=0
			uci set sys_monitor.networkinfo.network_laniperror_time=0
			uci set sys_monitor.networkinfo.network_waniperror_flag=0
			uci set sys_monitor.networkinfo.network_waniperror_time=0
			uci set sys_monitor.networkinfo.network_gatewayiperror_flag=0
			uci set sys_monitor.networkinfo.network_gatewayiperror_time=0
			uci commit sys_monitor		
	fi
	if [ "$( uci get sys_monitor.FL_RL_info  | wc -l)" -eq "0" ]; then
			uci set sys_monitor.FL_RL_info=FL_RL_info
			uci set sys_monitor.FL_RL_info.FLRL_fpgastatus_flag=0
			uci set sys_monitor.FL_RL_info.FLRL_fpgastatus_time=0
			uci set sys_monitor.FL_RL_info.FLRL_LB_nosend_flag=0
			uci set sys_monitor.FL_RL_info.FLRL_LB_nosend_time=0
			uci set sys_monitor.FL_RL_info.FLRL_LBsendRA_noret_flag=0
			uci set sys_monitor.FL_RL_info.FLRL_LBsendRA_noret_time=0
			uci set sys_monitor.FL_RL_info.FLRL_LBsendDA_noret_flag=0
			uci set sys_monitor.FL_RL_info.FLRL_LBsendDA_noret_time=0
			uci commit sys_monitor	
	fi

	if [ "$( uci get sys_monitor.fw_loss  | wc -l)" -eq "0" ]; then
			uci set sys_monitor.fw_loss=fw_loss
			uci set sys_monitor.fw_loss.fw_loss_flag=0
			uci set sys_monitor.fw_loss.fw_loss_time=0
			uci set sys_monitor.fw_loss.fw_loss_send=0
			uci commit sys_monitor
	fi

	if [ "$( uci get sys_monitor.alarm_ncc_logoff  | wc -l)" -eq "0" ]; then
			uci set sys_monitor.alarm_ncc_logoff=alarm_ncc_logoff
			uci set sys_monitor.alarm_ncc_logoff.alarm_ncc_logoff_flag=0
			uci set sys_monitor.alarm_ncc_logoff.alarm_ncc_logoff_time=0
			uci set sys_monitor.alarm_ncc_logoff.alarm_ncc_logoff_send=0
			uci commit sys_monitor
	fi

	if [ "$(uci get sys_monitor.sys_reboot.sys_nms_upgrade_reboot_flag | wc -l)" -eq "0" ]; then
		uci set sys_monitor.sys_reboot.sys_nms_upgrade_reboot_flag=0
		uci commit sys_monitor
	fi
	
	if [ "$(uci get sys_monitor.sys_reboot.sys_reboot_judge_flag_web | wc -l)" -eq "0" ]; then
		uci set sys_monitor.sys_reboot.sys_reboot_judge_flag_web=0
		uci commit sys_monitor
	fi	
	if [ "$( uci get sys_monitor.rcst_status  | wc -l)" -eq "0" ]; then
			uci set sys_monitor.rcst_status=rcst_status
			uci set sys_monitor.rcst_status.cur_rcst_status=0
			uci set sys_monitor.rcst_status.b_reboot_rcst_status=0
			uci commit sys_monitor		
	fi
	if [ "$( uci get sys_monitor.lockstatus_info_cnt  | wc -l)" -eq "0" ]; then
			uci set sys_monitor.lockstatus_info_cnt=lockstatus_info_cnt
			uci set sys_monitor.lockstatus_info_cnt.lockstatus_info_cnt=0
			uci commit sys_monitor		
	fi	
	if [ "$(uci get odu.boda.odu_alarm_status | wc -l)" -eq "0" ]; then
		uci set odu.boda.odu_alarm_status=-2
		uci commit odu
	fi
	if [ "$(uci get odu.boda.odu_alarm_status_sig | wc -l)" -eq "0" ]; then
		uci set odu.boda.odu_alarm_status_sig=-2
		uci commit odu
	fi

#20220215 by chenp,vehcular
	if [ "$(uci get update.update.vehicular_nms_ip | wc -l)" -eq "0" ]; then
		uci set update.update.vehicular_nms_ip=192.168.2.146
		uci commit update
	fi

	if [ "$(uci get odu.ANT_Param.FLY429_altitude | wc -l)" -eq "0" ]; then
		uci set odu.ANT_Param.FLY429_altitude=3000
		uci commit odu
	fi

	if [ "$(uci get odu.ANT_Param.netstatus | wc -l)" -eq "0" ]; then
		uci set odu.ANT_Param.netstatus=2
		uci commit odu
	fi
    #天线控制器开关(0：关闭,1：打开)
    if [ ! -f "/etc/config/satellite_config" ]; then
		 cp /rcst/rcst_sh/satellite_config /etc/config/
		 uci set satellite_config.satellite.set_flag=1
		 uci commit satellite_config
	else
		 uci set satellite_config.satellite.set_flag=1
		 uci commit satellite_config	
	 
    fi	
# 卫星资源配置
	if [ "$( uci show satellite_config | grep satellite_antenna | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite_antenna=satellite_antenna
		uci commit satellite_config
	fi
	if [ "$(uci get satellite_config.satellite_antenna.antenna_type | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite_antenna.antenna_type="move"
		uci commit satellite_config
	fi 
 	if [ "$(uci get satellite_config.satellite_antenna.antenna_manufacture | wc -l)" -eq "0" ]; then 
		uci set satellite_config.satellite_antenna.antenna_manufacture="SpaceStar"
		uci commit satellite_config
	fi	

 	if [ "$(uci get satellite_config.satellite_antenna.use_fl_cal_rl_doppler_freq | wc -l)" -eq "0" ]; then 
		uci set satellite_config.satellite_antenna.use_fl_cal_rl_doppler_freq="0"
		uci commit satellite_config
	fi

 	if [ "$(uci get satellite_config.satellite_antenna.ra_max_frq_offset_hz | wc -l)" -eq "0" ]; then 
		uci set satellite_config.satellite_antenna.ra_max_frq_offset_hz="100000"
		uci commit satellite_config
	fi

	if [ "$(uci get satellite_config.satellite.seekstar | wc -l)" -eq "0" ]; then 
		uci set satellite_config.satellite.seekstar=1
		uci commit satellite_config
	fi

	if [ "$(uci get satellite_config.satellite.rolloff | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite.rolloff=120
		uci commit satellite_config	
	else
		rolloff_now=$(uci get satellite_config.satellite.rolloff)
		if [ "$rolloff_now" -eq 12 ]; then 
			uci set satellite_config.satellite.rolloff=120
			uci commit satellite_config	
		fi
		if [ "$rolloff_now" -eq 10 ]; then 
			uci set satellite_config.satellite.rolloff=100
			uci commit satellite_config	
		fi	
	fi
	if [ "$(uci get satellite_config.satellite.acuexit_flag| wc -l)" -eq "0" ]; then 
		uci set satellite_config.satellite.acuexit_flag=1
		uci commit satellite_config
	fi	
#backup
	if [ "$(uci get backup_lockfreq.backuplockfreq.rolloff | wc -l)" -eq "0" ]; then
		uci set backup_lockfreq.backuplockfreq.rolloff=$(uci get satellite_config.satellite.rolloff)
		uci commit backup_lockfreq	
	fi		
	if [ "$(uci get backup_lockfreq.backuplockfreq.satellite_polarization_mode_tx | wc -l)" -eq "0" ]; then #lixch@20190411 默认为三层
		uci set backup_lockfreq.backuplockfreq.satellite_polarization_mode_tx=L
		uci commit backup_lockfreq
	fi		
	if [ "$(uci get satellite_config.satellite.buc_lnb_type | wc -l)" -eq "0" ]; then 
		uci set satellite_config.satellite.buc_lnb_type=1
		uci commit satellite_config
	fi

	if [ "$(uci get satellite_config.satellite.acu_switch | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite.acu_switch=0
		uci commit satellite_config
	fi

	if [ "$(uci get satellite_config.satellite.max_snr | wc -l)" -eq "0" ]; then 
		uci set satellite_config.satellite.max_snr=-30
		uci commit satellite_config
	fi
	if [ "$(uci get satellite_config.satellite.acu_type | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite.acu_type=1
		uci commit satellite_config
	fi   

	if [ "$(uci get satellite_config.satellite.satellite_longitude | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite.satellite_longitude='0.0'
		uci commit satellite_config
	fi

	if [ "$(uci get satellite_config.satellite.satellite_polarization_mode_rx | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite.satellite_polarization_mode_rx='V'
		uci commit satellite_config
	fi
	if [ "$(uci get satellite_config.satellite.satellite_polarization_mode_tx | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite.satellite_polarization_mode_tx='R'
		uci commit satellite_config
	fi
	if [ "$(uci get satellite_config.satellite.dst_ip | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite.dst_ip='10.177.1.100'
		uci commit satellite_config
	else
		if [ "$(uci get satellite_config.satellite.dst_ip)" -eq "0" ]; then
			uci set satellite_config.satellite.dst_ip='10.177.1.100'
			uci commit satellite_config
		fi			
	fi
	if [ "$(uci get satellite_config.satellite.src_ip | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite.src_ip='10.177.1.1'
		uci commit satellite_config
	else
		if [ "$(uci get satellite_config.satellite.src_ip)" -eq "0" ]; then
			uci set satellite_config.satellite.src_ip='10.177.1.1'
			uci commit satellite_config
		fi		
	fi
	if [ "$(uci get satellite_config.satellite.port | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite.port='4001'
		uci commit satellite_config
	fi					
	
      #天线控制器acu维度默认为0
    if [  "$(uci get satellite_config.satellite.satellite_latitude)" != "0" ]; then
			uci set satellite_config.satellite.satellite_latitude=0
			uci set satellite_config.satellite.satellite_polarization_bias=0
			uci commit satellite_config
    fi
    
      #天线控制器acu状态(0：锁定,1：未锁定)
    if [  "$(uci show satellite_config | grep acu_status | wc -l)" -eq 0 ]; then
			uci set satellite_config.satellite.acu_status=0
			uci commit satellite_config
    fi
    
        #天线控制器gps周秒
    if [  "$(uci show satellite_config | grep gps_time | wc -l)" -eq 0 ]; then
			uci set satellite_config.satellite.gps_time=0
			uci commit satellite_config
    fi

    if [  "$(uci get satellite_config.satellite_antenna.postion_write_flag)" != "0" ]; then
			uci set satellite_config.satellite_antenna.postion_write_flag=0
			uci commit satellite_config
    fi
    if [ "$(uci get anybeam_config.anybeam_config.mainback_config_time | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.mainback_config_time=300
		uci commit anybeam_config
	fi	
	if [ "$(uci get anybeam_config.anybeam_config.auto_lockstatus_read_cnt| wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.auto_lockstatus_read_cnt=60
		uci commit anybeam_config
	fi	
	if [ "$(uci get anybeam_config.anybeam_config.auto_syncstatus_read_cnt | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.auto_syncstatus_read_cnt=20
		uci commit anybeam_config
	fi	
	#if [ "$(uci get anybeam_config.anybeam_config.auto_lockstatus_read_less_cnt | wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.auto_lockstatus_read_less_cnt=30
		uci commit anybeam_config
	#fi  
	if [ "$(uci get anybeam_config.anybeam_config.rolloff_flag| wc -l)" -eq "0" ]; then 
		uci set anybeam_config.anybeam_config.rolloff_flag=0
		uci commit anybeam_config
	fi	
	#天线控制器change_flag(默认为关)
    if [  "$(uci show satellite_config | grep change_flag | wc -l)" -eq 0 ]; then
			uci set satellite_config.satellite.change_flag=0
			uci commit satellite_config
    fi
	if [ "$(uci get satellite_config.satellite.symboltype | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite.symboltype=1
		uci commit satellite_config	
	fi
	if [ "$(uci get satellite_config.satellite.odupower | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite.odupower=1
		uci commit satellite_config	
	fi

    
    if [ "$( uci show satellite_config | grep satellite_resource | wc -l)" -eq "0" ]; then
		uci set satellite_config.CHINASAT10_Vertical=satellite_resource
		uci set satellite_config.CHINASAT10_Vertical.beacon="12741"
		uci set satellite_config.CHINASAT10_Vertical.satellite_longitude="110.5"
		uci set satellite_config.CHINASAT10_Vertical.satellite_polarization_mode_rx="V"
		uci set satellite_config.CHINASAT10_Vertical.rf_rx_symbol="0"
		uci set satellite_config.CHINASAT10_Vertical.rf_rx_freq="0"

		uci set satellite_config.CHINASAT10_Horizontal=satellite_resource
		uci set satellite_config.CHINASAT10_Horizontal.beacon="12745"
		uci set satellite_config.CHINASAT10_Horizontal.satellite_longitude="110.5"
		uci set satellite_config.CHINASAT10_Horizontal.satellite_polarization_mode_rx="H"
		uci set satellite_config.CHINASAT10_Horizontal.rf_rx_symbol="0"
		uci set satellite_config.CHINASAT10_Horizontal.rf_rx_freq="0"
		
		uci set satellite_config.CHINASAT12_Vertical1=satellite_resource
		uci set satellite_config.CHINASAT12_Vertical1.beacon="12253.5"
		uci set satellite_config.CHINASAT12_Vertical1.satellite_longitude="87.5"
		uci set satellite_config.CHINASAT12_Vertical1.satellite_polarization_mode_rx="V"
		uci set satellite_config.CHINASAT12_Vertical1.rf_rx_symbol="0"
		uci set satellite_config.CHINASAT12_Vertical1.rf_rx_freq="0"
		
		uci set satellite_config.CHINASAT12_Horizontal=satellite_resource
		uci set satellite_config.CHINASAT12_Horizontal.beacon="-"
		uci set satellite_config.CHINASAT12_Horizontal.satellite_longitude="87.5"
		uci set satellite_config.CHINASAT12_Horizontal.satellite_polarization_mode_rx="H"
		uci set satellite_config.CHINASAT12_Horizontal.rf_rx_symbol="0"
		uci set satellite_config.CHINASAT12_Horizontal.rf_rx_freq="0"
		
		uci set satellite_config.CHINASAT12_Vertical2=satellite_resource
		uci set satellite_config.CHINASAT12_Vertical2.beacon="12741"
		uci set satellite_config.CHINASAT12_Vertical2.satellite_longitude="110.5"
		uci set satellite_config.CHINASAT12_Vertical2.satellite_polarization_mode_rx="V"
		uci set satellite_config.CHINASAT12_Vertical2.rf_rx_symbol="0"
		uci set satellite_config.CHINASAT12_Vertical2.rf_rx_freq="0"	

		uci set satellite_config.172B_Horizontal=satellite_resource
		uci set satellite_config.172B_Horizontal.beacon="12250.1"
		uci set satellite_config.172B_Horizontal.satellite_longitude="172"
		uci set satellite_config.172B_Horizontal.satellite_polarization_mode_rx="H"
		uci set satellite_config.172B_Horizontal.rf_rx_symbol="0"
		uci set satellite_config.172B_Horizontal.rf_rx_freq="0"																														

		uci set satellite_config.172B_Vertical=satellite_resource
		uci set satellite_config.172B_Vertical.beacon="11200.6"
		uci set satellite_config.172B_Vertical.satellite_longitude="172"
		uci set satellite_config.172B_Vertical.satellite_polarization_mode_rx="V"
		uci set satellite_config.172B_Vertical.rf_rx_symbol="0"
		uci set satellite_config.172B_Vertical.rf_rx_freq="0"	
		uci commit satellite_config		
		
		#~ sate_name=$(uci show satellite_config | grep satellite_resource |  awk '-F[=]+' '{print $1}' | awk '-F[.]+' '{print $2}') 
		#~ sate_now=$(uci get satellite_config.satellite_antenna.satellite_name)
		rf_rx_freq_now=$(uci get rf_rx.rf_rx.rf_rx_freq)
		rf_rx_symbol_now=$(uci get rf_rx.rf_rx.rf_rx_symbol)
		uci set satellite_config.satellite_antenna.satellite_name='Satellite'
		uci set satellite_config.Satellite=satellite_resource
		uci set satellite_config.Satellite.beacon="-"
		uci set satellite_config.Satellite.satellite_longitude=$(uci get satellite_config.satellite.satellite_longitude)
		uci set satellite_config.Satellite.satellite_polarization_mode_rx=$(uci get satellite_config.satellite.satellite_polarization_mode_rx)
		uci set satellite_config.Satellite.rf_rx_freq=$(uci get rf_rx.rf_rx.rf_rx_freq)
		uci set satellite_config.Satellite.rf_rx_symbol=$(uci get rf_rx.rf_rx.rf_rx_symbol)
		
		uci set satellite_config.satellite_antenna.satellite_name='Satellite'
		
		uci commit satellite_config
	
#rolloff
		rolloff_now=$(uci get satellite_config.satellite.rolloff)
		plus="0"
		rolloff_now_plus=${rolloff_now}${plus}
		echo $rolloff_now_plus
		sate_name=$(uci show satellite_config | grep satellite_resource |  awk '-F[=]+' '{print $1}' | awk '-F[.]+' '{print $2}')
		for sate_name_op in $sate_name
		do 
			echo $sate_name
			uci set satellite_config.$sate_name_op.rolloff="120"
			uci commit satellite_config
		done
	
		if [ "$(uci get backup_lockfreq.backuplockfreq.satellite_name | wc -l)" -eq "0" ]; then
			uci set backup_lockfreq.backuplockfreq.satellite_name='Satellite'
			uci commit odu
		fi
		sync
	else
		if [ "$( uci show satellite_config | grep satellite_resource | wc -l)" -eq "1" ]; then
			sate_now_temp=$(uci get satellite_config.satellite_antenna.satellite_name)	
			sate_name_temp=$(uci show satellite_config | grep satellite_resource |  awk '-F[=]+' '{print $1}' | awk '-F[.]+' '{print $2}')
			if [ "$sate_now_temp" != "$sate_name_temp" ]; then
				uci set satellite_config.satellite_antenna.satellite_name=$sate_name_temp
				uci commit satellite_config
			fi
		fi
				#射频界面已经分开，但没有一键切星
		mainback_flag=$(uci get backup_lockfreq.backuplockfreq.mainback_flag)
		if [ $mainback_flag == "1" ]; then
			sate_now=$(uci get satellite_config.satellite_antenna.satellite_name)
			rf_rx_freq_now=$(uci get rf_rx.rf_rx.rf_rx_freq)
			rf_rx_symbol_now=$(uci get rf_rx.rf_rx.rf_rx_symbol)
			sate_name=$(uci show satellite_config | grep satellite_resource |  awk '-F[=]+' '{print $1}' | awk '-F[.]+' '{print $2}')
			for sate_name_op in $sate_name
			do 
				if [ $sate_name_op = $sate_now ]; then 
					uci set satellite_config.$sate_now.rf_rx_symbol=$rf_rx_symbol_now
					uci set satellite_config.$sate_now.rf_rx_freq=$rf_rx_freq_now
					uci commit satellite_config
				fi
			done
		else
			sate_now=$(uci get backup_lockfreq.backuplockfreq.satellite_name)
			rf_rx_freq_now=$(uci get backup_lockfreq.backuplockfreq.rf_rx_freq)
			rf_rx_symbol_now=$(uci get backup_lockfreq.backuplockfreq.rf_rx_symbol)
			sate_name=$(uci show satellite_config | grep satellite_resource |  awk '-F[=]+' '{print $1}' | awk '-F[.]+' '{print $2}')
			for sate_name_op in $sate_name
			do 
				if [ $sate_name_op = $sate_now ]; then 
					uci set satellite_config.$sate_now.rf_rx_symbol=$rf_rx_symbol_now
					uci set satellite_config.$sate_now.rf_rx_freq=$rf_rx_freq_now
					uci commit satellite_config
				fi
			done		
		fi	
	fi	
	#rolloff
	rolloff_now=$(uci get satellite_config.satellite.rolloff)
	plus="0"
	rolloff_now_plus=${rolloff_now}${plus}
	echo $rolloff_now_plus
	sate_name=$(uci show satellite_config | grep satellite_resource |  awk '-F[=]+' '{print $1}' | awk '-F[.]+' '{print $2}')
	for sate_name_op in $sate_name
	do 
		if [ "$( uci show satellite_config.$sate_name_op | grep rolloff |wc -l)" -eq "0" ]; then
		echo $sate_name
		uci set satellite_config.$sate_name_op.rolloff=$rolloff_now
		uci commit satellite_config
		fi
	done	
	#升级 BOOT_fsbl_qspi_1bit.bin 没有只升级一次
	fsbl_qspi_mode_type=$(cat /mmc1/fsbl_qspi_mode)
	if [ "$fsbl_qspi_mode_type" == 0 ];then
		syslog_sh "update BOOT_fsbl_qspi_1bit.bin start ..."
		flashcp -v /rcst/rcst_drv/BOOT_fsbl_qspi_1bit.bin   /dev/mtd0
		echo 1 > /mmc1/fsbl_qspi_mode
		syslog_sh "update BOOT_fsbl_qspi_1bit.bin success ..."
		sync
		reboot -f  
	fi 
	echo 1 > /mnt/first_install
	sync
fi

	if [ "$(uci show satellite_config | grep satellite_resourced | wc -l)" -ne "0" ]; then
		sed -i 's/satellite_resourced/satellite_resource/g' /etc/config/satellite_config
	fi
if [ "$(uci get rf_tx.rf_single.tx_freq | wc -l)" -eq "0" ]; then
	cp /rcst/rcst_sh/rf_tx /etc/config/
fi

#add_2.0/3.0
	sate_name=$(uci show satellite_config | grep satellite_resource |  awk '-F[=]+' '{print $1}' | awk '-F[.]+' '{print $2}')
	for sate_name_op in $sate_name
	do 
		if [ "$( uci get satellite_config.$sate_name_op.system_23  | wc -l)" -eq "0" ]; then
			uci set satellite_config.$sate_name_op.system_23='3'
			uci commit satellite_config
		fi	
	done
	if [ "$(uci get satellite_config.satellite.system_23 | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite.system_23='3'
		uci commit satellite_config
	fi	
#xinzeng anybeam_info locksource
	anybeam_infonum=$(uci show anybeam_info |grep ns_id |wc -l)
	anybeam_info_loop=0
	while [[ "$anybeam_info_loop" -lt "$anybeam_infonum" ]]
	do
		let "anybeam_info_loop+=1"
		anybeam_info_nsid=$(uci show anybeam_info |grep ns_id | sed -n "$anybeam_info_loop"p | awk '-F[=]+' '{print $2}')
		if [ "$(uci get anybeam_info.$anybeam_info_nsid.enable | wc -l)" -eq "0" ]; then
			uci set anybeam_info.$anybeam_info_nsid.enable=1
			uci commit anybeam_info
		fi			
	done

	locksource_num=$(uci show lockresource |grep nsid |wc -l)
	locksource_loop=0
	while [[ "$locksource_loop" -lt "$locksource_num" ]]
	do
		let "locksource_loop+=1"
		anybeam_info_nsid=$(uci show lockresource |grep nsid | sed -n "$locksource_loop"p | awk '-F[=]+' '{print $2}')
		if [ "$(uci get lockresource.$anybeam_info_nsid.enable | wc -l)" -eq "0" ]; then
			uci set lockresource.$anybeam_info_nsid.enable=1
			uci commit lockresource
		fi			
	done

if [ ! -f "/etc/config/ANT_RF_config" ]; then
	touch /etc/config/ANT_RF_config
	LNB_freq1=$(uci get odu.LNB.rx_freq)
	BUC_freq1=$(uci get odu.LNB.tx_freq)

	let "LNB_start1=$LNB_freq1+950"
	let "LNB_end1=$LNB_freq1+3000"

	let "BUC_start1=$BUC_freq1+900"
	let "BUC_end1=$BUC_freq1+3000"

	uci set ANT_RF_config.ANT=ANT_RF_resource
	uci commit ANT_RF_config

	uci set ANT_RF_config.ANT.antenna_type=$(uci get satellite_config.satellite_antenna.antenna_type)
	uci set ANT_RF_config.ANT.seekstar=$(uci get satellite_config.satellite.seekstar)
	uci set ANT_RF_config.ANT.antenna_manufacture=$(uci get satellite_config.satellite_antenna.antenna_manufacture)
	uci set ANT_RF_config.ANT.src_ip=$(uci get satellite_config.satellite.src_ip)
	uci set ANT_RF_config.ANT.dst_ip=$(uci get satellite_config.satellite.dst_ip)
	uci set ANT_RF_config.ANT.port=$(uci get satellite_config.satellite.port)
	uci set ANT_RF_config.ANT.LNB_type="1"
	uci set ANT_RF_config.ANT.BUC_type="1"
	uci set ANT_RF_config.ANT.LNB_count="1"
	uci set ANT_RF_config.ANT.BUC_count="1"
	uci set ANT_RF_config.ANT.LNB_freq1=$LNB_freq1
	uci set ANT_RF_config.ANT.BUC_freq1=$BUC_freq1
	uci set ANT_RF_config.ANT.LNB_start1=$LNB_start1
	uci set ANT_RF_config.ANT.LNB_end1=$LNB_end1
	uci set ANT_RF_config.ANT.BUC_start1=$BUC_start1
	uci set ANT_RF_config.ANT.BUC_end1=$BUC_end1
	uci commit ANT_RF_config

	uci set satellite_config.satellite_antenna.antenna_name=ANT
	uci commit satellite_config
fi

	if [ "$(uci get satellite_config.satellite_antenna.antenna_name | wc -l)" -eq "0" ]; then
		uci set satellite_config.satellite_antenna.antenna_name=ANT
		uci commit satellite_config
	fi
		if [ "$(uci get backup_lockfreq.backuplockfreq.antenna_name | wc -l)" -eq "0" ]; then
		uci set backup_lockfreq.backuplockfreq.antenna_name=$(uci get satellite_config.satellite_antenna.antenna_name)
		uci commit backup_lockfreq	
	fi

if [ "$(uci get satellite_config.satellite.t1temp | wc -l)" -eq "0" ]; then
	uci set satellite_config.satellite.t1temp=0.0
	uci commit satellite_config	
fi

if [ "$(uci get satellite_config.satellite.t2temp | wc -l)" -eq "0" ]; then
	uci set satellite_config.satellite.t2temp=0.0
	uci commit satellite_config	
fi

if [ "$(uci get satellite_config.satellite.antpowertemp | wc -l)" -eq "0" ]; then
	uci set satellite_config.satellite.antpowertemp=0.0
	uci commit satellite_config	
fi

if [ "$(uci get satellite_config.satellite.antmodetemp | wc -l)" -eq "0" ]; then
	uci set satellite_config.satellite.antmodetemp=0.0
	uci commit satellite_config	
fi

if [ "$(uci get update.update.vehicular_udp_ip | wc -l)" -eq "0" ]; then
	uci set update.update.vehicular_udp_ip=192.168.2.146
	uci commit update	
fi

if [ "$(uci get update.update.vehicular_udp_port | wc -l)" -eq "0" ]; then
	uci set update.update.vehicular_udp_port=10003
	uci commit update	
fi

if [ "$(uci get update.update.vehicular_udp_port)" -eq "10001" ]; then
	uci set update.update.vehicular_udp_port=10003
	uci commit update
fi

if [ "$(uci get update.update.vehicular_nms_ip | wc -l)" -eq "0" ]; then
	uci set update.update.vehicular_nms_ip=192.168.2.145
	uci commit update	
fi

if [ "$(uci get update.update.vehicular_port | wc -l)" -eq "0" ]; then
	uci set update.update.vehicular_port=10001
	uci commit update
fi

if [ "$(uci get update.update.vehicular_port)" -eq "10002" ]; then
	uci set update.update.vehicular_port=10001
	uci commit update
fi

if [ "$(uci get update.update.vehicular_type | wc -l)" -eq "0" ]; then
	uci set update.update.vehicular_type=0
	uci commit update
else
	if [ "$(uci get ft_brlanip_config.ft_brlanip_config.ft_brlan_ip)" == "172.30.0.171" ] && [ "$(uci get update.update.vehicular_nms_ip)" == "192.168.2.146" ]; then
		uci set update.update.vehicular_type=0
		uci commit update
	fi
fi
if [ ! -f "/etc/config/RS422_config" ]; then
	cp /rcst/rcst_sh/RS422_config /etc/config/
	sync
fi

if [ ! -f "/etc/config/ft_brlanip_config" ]; then
	cp /rcst/rcst_sh/ft_brlanip_config /etc/config/
	sync
fi

if [ "$(uci get vlanconfig.mode.tag | wc -l)" -eq "0" ]; then
	cp /rcst/rcst_sh/vlanconfig /etc/config/
	sync	
fi

#add ANT_RF_config rolloff
	ANT_RF_resource_infonum=$(uci show ANT_RF_config  | grep ANT_RF_resource |wc -l)
	ANT_RF_resource_info_loop=0
	while [[ "$ANT_RF_resource_info_loop" -lt "$ANT_RF_resource_infonum" ]]
	do
		let "ANT_RF_resource_info_loop+=1"
		ANT_RF_resource_info_name=$(uci show ANT_RF_config  | grep ANT_RF_resource | sed -n "$ANT_RF_resource_info_loop"p | awk '-F[.]+' '{print $2}' | awk '-F[=]+' '{print $1}')
		if [ "$(uci get ANT_RF_config.$ANT_RF_resource_info_name.rolloff | wc -l)" -eq "0" ]; then
			uci set ANT_RF_config.$ANT_RF_resource_info_name.rolloff=$(uci get satellite_config.satellite.rolloff)
			uci commit ANT_RF_config
		fi			
	done
	rolloff_infonum=$(uci show satellite_config | grep satellite_resource | wc -l)
	rolloff_info_loop=0
	while [[ "$rolloff_info_loop" -lt "$rolloff_infonum" ]]
	do
		let "rolloff_info_loop+=1"
		rolloff_info_name=$(uci show satellite_config  | grep satellite_resource | sed -n "$rolloff_info_loop"p | awk '-F[.]+' '{print $2}' | awk '-F[=]+' '{print $1}')
		if [ "$(uci get satellite_config.$rolloff_info_name.rolloff )" != "$(uci get satellite_config.satellite.rolloff)" ]; then
			uci set satellite_config.$rolloff_info_name.rolloff=$(uci get satellite_config.satellite.rolloff)
			uci commit satellite_config
		fi			
	done
	satellite_resource_infonum=$(uci show satellite_config | grep satellite_resource | wc -l)
	satellite_resource_info_loop=0
	while [[ "$satellite_resource_info_loop" -lt "$satellite_resource_infonum" ]]
	do
		let "satellite_resource_info_loop+=1"
		satellite_resource_info_name=$(uci show satellite_config  | grep satellite_resource | sed -n "$satellite_resource_info_loop"p | awk '-F[.]+' '{print $2}' | awk '-F[=]+' '{print $1}')
		if [ "$(uci get satellite_config.$satellite_resource_info_name.system_23 )" != "$(cat /mnt/zd_version)" ]; then
			uci set satellite_config.$satellite_resource_info_name.system_23=$(cat /mnt/zd_version)
			uci commit satellite_config
		fi			
	done
#	if [ ! -f "/mnt/rcst_xph_type" ]; then
		cp /rcst/rcst_sh/rcst_xph_type /mnt/
		sync
#	fi

	if [ ! -f "/mnt/shadow_init.txt" ]; then
		cp /rcst/rcst_sh/shadow /etc
		cp /rcst/rcst_sh/shadow /mnt/shadow_init.txt
		uci set user_info.user_info.adminpasswd='b30b571ba600360784c66644e36a3fdf'
		uci commit user_info
	fi
	if [ ! -f "/etc/shadow" ]; then
		cp /rcst/rcst_sh/shadow /etc
		cp /rcst/rcst_sh/shadow /mnt/shadow_init.txt
		uci set user_info.user_info.adminpasswd='b30b571ba600360784c66644e36a3fdf'
		uci commit user_info
	fi
	if [ "$(cat /etc/shadow |grep -w 'admin:eurhsOvC8TmYU:16792:0:99999:7:::' | wc -l)" != 0 ]; then
		cp /rcst/rcst_sh/shadow /etc
		cp /rcst/rcst_sh/shadow /mnt/shadow_init.txt
		uci set user_info.user_info.adminpasswd='b30b571ba600360784c66644e36a3fdf'
		uci commit user_info
	fi
	cp /rcst/rcst_sh/passwd /etc
	#重启时修改system时区

	if [ ! -f "/etc/config/631bgp" ]; then
		cp /rcst/rcst_sh/631bgp /etc/config/
		sync
	fi

	if [ "$(uci get vlanconfig.mode.tag | wc -l)" -eq "0" ]; then
		cp /rcst/rcst_sh/vlanconfig /etc/config/
		sync	
	fi

	if [ "$(uci get 631bgp.631bgp.bgp_as_number | wc -l)" -eq "0" ]; then
		uci set 631bgp.631bgp.bgp_as_number=65008
		uci commit 631bgp	
	fi

	if [ "$(uci get 631bgp.631bgp.remote_530_netmask | wc -l)" -eq "0" ]; then
		uci set 631bgp.631bgp.remote_530_netmask=24
		uci commit 631bgp	
	fi

	if [ "$(uci get 631bgp.631bgp.is_bgp_switch | wc -l)" -eq "0" ]; then
		uci set 631bgp.631bgp.is_bgp_switch=0
		uci commit 631bgp	
	fi

	if [ "$(uci get update.update.watch_dog_switch | wc -l)" -eq "0" ]; then
		uci set update.update.watch_dog_switch=1
		uci commit update	
	fi

	if [ "$(uci get update.update.hardware_version | wc -l)" -eq "0" ]; then
		uci set update.update.hardware_version=1
		uci commit update	
	fi

	if [ "$(uci get networkmode.networkmode.dns_config_flag | wc -l)" -eq "0" ]; then
		uci set networkmode.networkmode.dns_config_flag=0
		uci commit networkmode	
	fi
	if [ "$(uci get networkmode.networkmode.tcpswitch_flag | wc -l)" -eq "0" ]; then
		uci set networkmode.networkmode.tcpswitch_flag=0
		uci commit networkmode	
	fi	

	if [ "$(uci get networkmode.networkmode.default_ip | wc -l)" -eq "0" ]; then
		uci set networkmode.networkmode.default_ip=192.168.251.1
		uci commit networkmode	
	fi	

	if [ "$(uci get networkmode.networkmode.network_acubrlaneth_flag | wc -l)" -eq "0" ]; then
		uci set networkmode.networkmode.network_acubrlaneth_flag=0
		uci commit networkmode	
	fi	
	
	if [ "$(uci get networkmode.networkmode.network_vehbrlaneth_flag | wc -l)" -eq "0" ]; then
		uci set networkmode.networkmode.network_vehbrlaneth_flag=0
		uci commit networkmode	
	fi	

	if [ "$(uci get networkmode.networkmode.network_eth1_configswitch | wc -l)" -eq "0" ]; then
		uci set networkmode.networkmode.network_eth1_configswitch=0
		uci commit networkmode	
	fi
	if [ ! -f "/etc/config/fpga_cfg" ]; then
		cp /rcst/rcst_sh/fpga_cfg /etc/config/
		sync
	fi
	if [ "$(uci get fpga_cfg.fpga_addr.ADDR_RELOAD_MODE | wc -l)" -eq "0" ]; then
		uci set fpga_cfg.fpga_addr.ADDR_RELOAD_MODE=1
        	uci commit fpga_cfg	
	fi

	if [ "$(uci get update.update.ftp_name | wc -l)" != "0" ]; then
		uci del update.update.ftp_name
        	uci commit update	
	fi

	if [ "$(uci get update.update.ftp_passwd | wc -l)" != "0" ]; then
		uci del update.update.ftp_passwd
        	uci commit update	
	fi

	if [ "$(cat /etc/config/anybeam_info  | wc -l)" != 0 ]; then
		rm /etc/config/anybeam_info*	
	fi
	if [ "$(cat /etc/config/lockresource  | wc -l)" != 0 ]; then
		 rm /etc/config/lockresource	
	fi

	uci set system.system.zonename=Asia/Shanghai
	uci set system.system.timezone=CST-8
	uci commit system	
