#! /bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info copy_message0"[$(ps | grep copy_message0.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

if [ ! -d "/mnt/log_back" ]; then
	mkdir -p /mnt/log_back
fi

if [ ! -f "/mnt/log_back/messages0_0.txt" ]; then
	syslog_sh "init /mnt/log_back/messages0_0.txt"
	echo 0 > /mnt/log_back/messages0_0.txt
fi

if [ ! -f "/mnt/log_back/messages0_1.txt" ]; then
	syslog_sh "init /mnt/log_back/messages0_1.txt"
	echo 0 > /mnt/log_back/messages0_1.txt
fi

if [ ! -f "/mnt/log_back/messages0_2.txt" ]; then
	syslog_sh "init /mnt/log_back/messages0_2.txt"
	echo 0 > /mnt/log_back/messages0_2.txt
fi

messages0md5=$(md5sum /mnt/rcst_log/messages.0 | awk '{print $1}')
messages0backmd5=$(md5sum /mnt/log_back/messages0_2.txt | awk '{print $1}')
if [  "$messages0md5" != "$messages0backmd5" ]; then
	syslog_sh "cp /mnt/rcst_log/messages.0 /mnt/messages0_2.txt"
	cp /mnt/log_back/messages0_1.txt /mnt/log_back/messages0_0.txt
	cp /mnt/log_back/messages0_2.txt /mnt/log_back/messages0_1.txt
	cp /mnt/rcst_log/messages.0 /mnt/log_back/messages0_2.txt
fi


if [ ! -f "/tmp/syslog_sync_change_flag" ]; then
	echo 0 > /tmp/syslog_sync_change_flag
	sync
fi



re_sync_status=$(cat /proc/rcst_status/rcst_status_mode | awk '{print $1}')
if [ "$re_sync_status" -eq "4" ]; then
echo 1 > /tmp/syslog_sync_change_flag

else
	resyslog_sync_change_flag=$(cat /tmp/syslog_sync_change_flag)
	if [ "$resyslog_sync_change_flag" -eq "1" ]; then
		echo 0 > /tmp/syslog_sync_change_flag
		echo $(date) "because sync_status change copy messages" >> /mnt/rcst_log/status_monitor.txt
		syslog_sh "because sync_status change copy messages"
		rm -rf /mnt/log_back/messages_sync_offline_*
		rm -rf /mnt/log_back/messages0_sync_offline_*
		cp /mnt/rcst_log/messages /mnt/log_back/messages_sync_offline_$(date "+%Y%m%d_%H_%M_%S")
		cp /mnt/rcst_log/messages.0 /mnt/log_back/messages0_sync_offline_$(date "+%Y%m%d_%H_%M_%S")
	fi
fi

