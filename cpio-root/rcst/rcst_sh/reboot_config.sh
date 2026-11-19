#!/bin/bash
syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info reset_3"[$(ps | grep reset.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}
syslog_sh "---------------------------killall---------------------------"
#killall LLA_STiD135

kill -9 $(ps | grep snmp_restart | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep param_config_app | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep fou_tx_config_app | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep cron | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep nmi_app | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep remote_start_update_monitor | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep diagnostics | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep buzzer_config_app | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep logoff_monitor_app | grep -v grep | awk '{print $1}')
kill -9 $(ps | grep SDDP_upgrade | grep -v grep | awk '{print $1}')

#stop crontab
killall -9 cron
rm /var/run/cron.pid 
crontab /dev/null 
cron start

count=$(lsmod | grep gateway_fou |sed -n 1p | awk '{print $3}')
while [ "$count" != 0 ];do

	kill -9 $(ps | grep snmp_restart | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep param_config_app | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep fou_tx_config_app | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep cron | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep nmi_app | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep remote_start_update_monitor | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep diagnostics | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep buzzer_config_app | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep logoff_monitor_app | grep -v grep | awk '{print $1}')
	kill -9 $(ps | grep SDDP_upgrade | grep -v grep | awk '{print $1}')
	count=$(lsmod | grep gateway_fou |sed -n 1p | awk '{print $3}')
	
done

#stop stid135
syslog_sh "---------------------------stop stid135---------------------------"
cd /rcst/rcst_app
./stm_fe_config -s -p 1 -o 0

sleep 2

syslog_sh "---------------------------rmmod ko---------------------------"
ifconfig sn0 down
cd /rcst/rcst_drv
rmmod gateway_fou.ko
rmmod lcmb_lla_driver.ko
rmmod cdma_driver.ko 

sleep 1


