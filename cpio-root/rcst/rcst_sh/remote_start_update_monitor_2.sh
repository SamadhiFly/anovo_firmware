#! /bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info remote_start_update_monitor_2"[$(ps | grep remote_start_update_monitor_2.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
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
		syslog_sh "remote_update_monitor_2 remote upgrade....!"
	fi
    rf_lock_update_flag=$(uci get networkmode.networkmode.rf_lock_update_flag)
	if [ "$rf_lock_update_flag" = "1" ]; then
		uci set networkmode.networkmode.rf_lock_update_flag=0;uci commit networkmode
		sh /rcst/rcst_sh/reset_2.sh > /dev/null & 
		syslog_sh "reset  as rf_lock_frequency changed or sync pppoe move to static !"
	fi
    reset_flag=$(uci get networkmode.networkmode.reset_flag)
	if [ "$reset_flag" = "1" ]; then
		uci set networkmode.networkmode.reset_flag=0;uci commit networkmode
		sh /rcst/rcst_sh/reset_2.sh > /dev/null & 
		uci set networkmode.networkmode.sync2start_tcp_flag=0;uci commit networkmode
	else
		#re_sync_status=$(cat /proc/rcst_status/rcst_status_mode)
		sync2start_tcp_flag=$(uci get networkmode.networkmode.sync2start_tcp_flag)		
		#if [ "$re_sync_status" = "4" ] && [ "$sync2start_tcp_flag" = "1" ]; then
		if [ "$sync2start_tcp_flag" = "1" ]; then
			uci set networkmode.networkmode.sync2start_tcp_flag=0;uci commit networkmode
			syslog_sh "-------------------cron stop, sync_to_start_tcp_2.sh, cron start---------------------------"
			kill -9 $(ps | grep cron | grep -v grep | awk '{print $1}')
			/etc/init.d/cron stop
			sh /rcst/rcst_sh/sync_to_start_tcp_2.sh  > /dev/null
			/etc/init.d/cron start
		fi 
	fi

    cop_reset_flag=$(uci get update.cop_ip.reset_flag)
	if [ "$cop_reset_flag" = "1" ]; then
		uci set update.cop_ip.reset_flag=0;uci commit update
		sh /rcst/rcst_sh/reset_2.sh > /dev/null & 
		syslog_sh "reset  as cop reset or lock freq changed !"
	fi

    cop_reboot_flag=$(uci get update.cop_ip.reboot_flag)
	if [ "$cop_reboot_flag" = "1" ]; then
		uci set update.cop_ip.reboot_flag=0;uci commit update
		syslog_sh "reset  as cop reboot !"
		reboot > /dev/null		
	fi
	 
    tcpswitch_flag=$(uci get networkmode.networkmode.tcpswitch_flag)
	if [ "$tcpswitch_flag" = "1" ]; then
	     uci set networkmode.networkmode.tcpswitch_flag=0;uci commit networkmode
	     syslog_sh "---------------------------tcpswitch_flag stop tcp_stop.sh tcp_check.sh---------------------------"
		 sh /rcst/http_sh/tcp_stop.sh > /dev/null
		 sh /rcst/http_sh/tcp_check.sh > /dev/null
	elif [ "$tcpswitch_flag" = "2" ]; then	 
		  uci set networkmode.networkmode.tcpswitch_flag=0;uci commit networkmode
		  syslog_sh "---------------------------tcpswitch_flag start tcp_start.sh tcp_check.sh---------------------------"
		  sh /rcst/http_sh/tcp_start.sh > /dev/null
		  sh /rcst/http_sh/tcp_check.sh > /dev/null
	fi
	
	dns_config_flag=$(uci get networkmode.networkmode.dns_config_flag)
	if [ "$dns_config_flag" = "1" ]; then
		  uci set networkmode.networkmode.dns_config_flag=0;uci commit networkmode
		  syslog_sh "---------------------------dns_config_flag start dns_config.sh---------------------------"		
		  sh /rcst/rcst_sh/dns_config.sh > /dev/null	
	fi	
#	syslog_sh "i=$i"
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
