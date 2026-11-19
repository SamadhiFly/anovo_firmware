#! /bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info remote_start_update_monitor_3"[$(ps | grep remote_start_update_monitor_3.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

source /etc/profile

#间隔数
step=5
remote_updateflag=0
i=0

while [ "$i" -lt "60" ];do	#5s循环
	remote_updateflag=$(uci get update.update.remote_updateflag)

	if [ "$remote_updateflag" -eq "1" ] ; then
		ip_addr=$(uci get update.update.ip_addr)
		file_name=$(uci get update.update.file_name)
		#ftp_name=$(uci get update.update.ftp_name)
		#ftp_passwd=$(uci get update.update.ftp_passwd)
		remote_upgradetype=$(uci get update.update.remote_upgradetype)
		version_number=$(uci get update.update.version_number)
		#sh /rcst/upgrade_sh/remote_upgrade.sh $ftp_name $ftp_passwd $ip_addr $file_name $remote_upgradetype $version_number &
		uci set update.update.remote_updateflag=0
		uci commit update
		syslog_sh "remote_update_monitor_3 remote upgrade....!"
	fi
    rf_lock_update_flag=$(uci get networkmode.networkmode.rf_lock_update_flag)
	if [ "$rf_lock_update_flag" = "1" ]; then
		uci set networkmode.networkmode.rf_lock_update_flag=0;uci commit networkmode
		sh /rcst/rcst_sh/reset_3.sh > /dev/null & 
		syslog_sh "reset  as rf_lock_frequency changed or sync pppoe move to static !"
	fi
    reset_flag=$(uci get networkmode.networkmode.reset_flag)
	if [ "$reset_flag" = "1" ]; then
		uci set networkmode.networkmode.reset_flag=0;uci commit networkmode
		sh /rcst/rcst_sh/reset_3.sh > /dev/null & 
		uci set networkmode.networkmode.sync2start_tcp_flag=0;uci commit networkmode
	else
		#re_sync_status=$(cat /proc/rcst_status/rcst_status_mode)
		sync2start_tcp_flag=$(uci get networkmode.networkmode.sync2start_tcp_flag)		
		#if [ "$re_sync_status" = "4" ] && [ "$sync2start_tcp_flag" = "1" ]; then
		if [ "$sync2start_tcp_flag" = "1" ]; then
			uci set networkmode.networkmode.sync2start_tcp_flag=0;uci commit networkmode
			syslog_sh "-------------------sync_to_start_tcp_3.sh---------------------------"
			sh /rcst/http_sh/sync_to_start_tcp_3.sh  > /dev/null &
		fi 
	fi

    cop_reset_flag=$(uci get update.cop_ip.reset_flag)
	if [ "$cop_reset_flag" = "1" ]; then
		uci set update.cop_ip.reset_flag=0;uci commit update
		sh /rcst/rcst_sh/reset_3.sh > /dev/null & 
		syslog_sh "reset  as cop reset or lock freq changed !"
	fi

    cop_reboot_flag=$(uci get update.cop_ip.reboot_flag)
	if [ "$cop_reboot_flag" = "1" ]; then
		uci set update.cop_ip.reboot_flag=0;uci commit update
		syslog_sh "reset  as cop reboot !"
		reboot -f -d 5 > /dev/null		
	fi
	 
     tcpswitch_flag=$(uci get networkmode.networkmode.tcpswitch_flag)
     if [ "$tcpswitch_flag" != "0" ]; then
		if [ "$tcpswitch_flag" = "1" ]; then
#			 uci set networkmode.networkmode.tcpswitch_flag=3;uci commit networkmode
			 sh /rcst/http_sh/remote_tcp_stop.sh > /dev/null &
		elif [ "$tcpswitch_flag" = "2" ]; then	 
#			  uci set networkmode.networkmode.tcpswitch_flag=3;uci commit networkmode
			 sh /rcst/http_sh/remote_tcp_start.sh > /dev/null &
		fi
	fi

#     httpswitch_flag=$(uci get networkmode.networkmode.httpswitch_flag)
#     if [ "$tcpswitch_flag" != "0" ]; then
#		if [ "$tcpswitch_flag" = "1" ]; then
#			 uci set networkmode.networkmode.httpswitch_flag=3;uci commit networkmode
#			 sh /rcst/rcst_sh/remote_tcp_stop.sh > /dev/null & 
#		elif [ "$tcpswitch_flag" = "2" ]; then	 
#			  uci set networkmode.networkmode.httpswitch_flag=3;uci commit networkmode
#			  sh /rcst/rcst_sh/remote_tcp_start.sh > /dev/null & 
#		fi
#	fi
	
	dns_config_flag=$(uci get networkmode.networkmode.dns_config_flag)
	if [ "$dns_config_flag" = "1" ]; then
		  uci set networkmode.networkmode.dns_config_flag=0;uci commit networkmode
		  syslog_sh "---------------------------dns_config_flag start dns_config.sh---------------------------"		
		  sh /rcst/rcst_sh/dns_config.sh > /dev/null	&  #nocpulixch@20211015
	fi	
	bhjz_config_flag=$(uci get bhjz_config.bhjz_config.reset_flag)
	if [ "$bhjz_config_flag" = "1" ]; then
		  uci set bhjz_config.bhjz_config.reset_flag=0;uci commit bhjz_config
		  syslog_sh "---------------------------bhjz_config_flag reset_3.sh start reset_3.sh---------------------------"		
		  sh /rcst/rcst_sh/reset_3.sh > /dev/null	&
	fi	
	anybeam_reset_flag=$(uci get anybeam_config.anybeam_config.config_reset_flag)
	if [ "$anybeam_reset_flag" = "1" ]; then
		  uci set  anybeam_config.anybeam_config.config_reset_flag=0;uci commit anybeam_config
		  syslog_sh "---------------------------anybeam_reset_flag start reset_config.sh---------------------------"		
		  sh /rcst/rcst_sh/reset_3.sh > /dev/null & 
	fi	
	anybeam_isvrf_flag=$(uci get anybeam_config.anybeam_config.config_isvrf_flag)
	if [ "$anybeam_isvrf_flag" != "0" ]; then
		 syslog_sh "---------------------------anybeam_reset_flag start anybeam_isvrf_flag config_isvrf.sh---------------------------"		
		sh /rcst/rcst_sh/config_isvrf.sh > /dev/null & 
	fi		
#	syslog_sh "i=$i"
	#~ acm_ping_ps_flag=$(ps |grep acm_ping.sh | grep -v grep | wc -l )
	#~ if [ "$acm_ping_ps_flag" = "0" ]; then
		  #~ syslog_sh "---------------------------monitor start acm_ping.sh---------------------------"		
		  #~ sh /rcst/rcst_sh/acm_ping.sh >  /dev/null	&
	#~ fi
	#lixch@20210114
	if [ ! -f "/tmp/beammap_snmpinit_time" ]; then
		echo 0 > /tmp/beammap_snmpinit_time
	fi
	
	re_sync_status=$(cat /proc/rcst_status/rcst_status_mode | awk '{print $1}')
	snmp_init_flag=$(cat /tmp/snmp_trap_flag)
	beam_step_time=$(cat /tmp/beammap_snmpinit_time)
	if [ "$re_sync_status" -eq "4" ]; then
		if [ "$snmp_init_flag" -eq "1" ] || [ "$beam_step_time" -ge "57" ]; then
			beammapaccess_flag=$(uci get beamaccsss_config.beamaccsss_config.beammapaccess_flag)
			if [ "$beammapaccess_flag" == "2" ]; then
				beammapaccess_ps=$(ps | grep beammapaccess_ftpupdate.sh | grep -v grep | wc -l)
				if [ "$beammapaccess_ps" == "0" ]; then
					kill -9 $(ps | grep beammapaccess_ftpupdate.sh | grep -v grep | awk '{print $1}')
					syslog_sh "beammapaccess snmp_init_flag:$snmp_init_flag beam_step_time:$beam_step_time!"
					sh /rcst/rcst_sh/beammapaccess_ftpupdate.sh > /dev/null &
					echo 0 > /tmp/beammap_snmpinit_time
				fi
			fi
		else
			beam_step_time=`expr $beam_step_time + 1`
			echo $beam_step_time > /tmp/beammap_snmpinit_time
		fi
	fi

	re_sync_status=$(cat /proc/rcst_status/rcst_status_mode | awk '{print $1}')
	if [ "$re_sync_status" -eq "4" ]; then
		snmp_ps=$(ps | grep nmi_app | grep -v fh_nmi_app | grep -v grep | awk '{print $1}')
		if [  ! -n "$snmp_ps" ]; then
			sleep 10
			snmp_ps=$(ps | grep nmi_app | grep -v fh_nmi_app | grep -v grep | awk '{print $1}')
			if [  ! -n "$snmp_ps" ]; then
				echo $(date) "60s print: nmi_app abnormal stoped phenomena!" >> /tmp/snmp_status_monitor.txt
				kill -9 $(netstat -anup | grep 161 | grep -v nmi_app | grep -v fh_nmi_app | grep -v cop_app | awk '{print $6}'| awk -F '[/]+' '{print $1}' | sed -n 1p)
				kill -9 $(ps | grep snmp_restart.sh | grep -v grep | awk '{print $1}')
				kill -9 $(ps | grep nmi_app | grep -v fh_nmi_app | grep -v grep | awk '{print $1}')
				/etc/init.d/nmi_app_monitor stop
				/etc/init.d/nmi_app_monitor start
			fi
		fi
	fi
    web_searchbeamlockinfo_flag=$(uci get anybeam_config.anybeam_config.web_searchbeamlockinfo_flag)
	if [ "$web_searchbeamlockinfo_flag" = "1" ]; then
		beamlockinfo_query_app_ps=$(ps | grep beamlockinfo_query_app  | grep -v grep | awk '{print $1}')
		if [  ! -n "$beamlockinfo_query_app_ps" ]; then
			syslog_sh "start beamlockinfo_query_app"
			echo $(date) "start beamlockinfo_query_app" >> /mnt/rcst_log/status_monitor.txt
			cd /rcst/rcst_app;./beamlockinfo_query_app	
		fi		
	fi
	goahead_ps=$(ps | grep goahead  | grep -v grep | awk '{print $1}')
	if [  ! -n "$goahead_ps" ]; then
		#waiting 10 sec, read snmp_ps again!
		sleep 5
		goahead_ps=$(ps | grep goahead  | grep -v grep | awk '{print $1}')
		if [  ! -n "$goahead_ps" ]; then
			echo $(date) "60s print: goahead_ps abnormal stoped phenomena!" >> /tmp/snmp_status_monitor.txt
			kill -9 $(ps | grep goahead  | grep -v grep | awk '{print $1}')
			cd /tmp
			./goahead -v -l /tmp/goahead_log:1 /tmp/rcst_ui/web/ &

		fi
	fi	
	i=`expr $i + 5`
	sleep $step
done
