#!/bin/bash
mem_used_max=450000 #单位KByte
messages0_max_size=10485760 #单位Bytes
status_monitor_max_size=10485760 #单位Bytes
mem_free_max=30000

sync

echo $(date) "mem_reclaim.sh running ... ..." >> /mnt/rcst_log/status_monitor.txt

if [ "$(free | grep Mem: | awk '{print $3}')" -ge "$mem_used_max" ]; then
	echo $(date) "memory out of range reset" >> /mnt/rcst_log/status_monitor.txt
	sync
	echo 3 > /proc/sys/vm/drop_caches
fi

if [ "$(free | grep Mem: | awk '{print $4}')" -le "$mem_free_max" ]; then
	echo $(date) "memory free out of range reset" >> /mnt/rcst_log/status_monitor.txt
	sync
	echo 3 > /proc/sys/vm/drop_caches
fi

if [ "$(ls -al /mnt/rcst_log/messages.0 | awk '{print $ 5}')" -ge "$messages0_max_size" ]; then
	rm -rf /mnt/rcst_log/messages.0
	echo $(date) "message.0 file size > 52428800 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi

if [ "$(ls -al /mnt/rcst_log/operation.txt | awk '{print $ 5}')" -ge "$messages0_max_size" ]; then
	rm -rf /mnt/rcst_log/operation.txt
	echo $(date) "operation.txt file size > 52428800 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi

if [ "$(ls -al /mnt/rcst_log/status_monitor.txt | awk '{print $ 5}')" -ge "$status_monitor_max_size" ]; then
	rm -rf /mnt/rcst_log/status_monitor.txt
	echo $(date) "status_monitor.txt file size > 20971520 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi


if [ "$(ls -al /mnt/rcst_log/snmp_status_monitor.txt | awk '{print $ 5}')" -ge "$status_monitor_max_size" ]; then
	rm -rf /mnt/rcst_log/snmp_status_monitor.txt
	echo $(date) "/mnt/rcst_log/snmp_status_monitor.txt file size > 20971520 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi

if [ "$(ls -al /mnt/rcst_log/sync_status_monitor.txt | awk '{print $ 5}')" -ge "$status_monitor_max_size" ]; then
	rm -rf /mnt/rcst_log/sync_status_monitor.txt
	echo $(date) "/mnt/rcst_log/sync_status_monitor.txt file size > 20971520 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi

if [ "$(ls -al /mnt/rcst_log/wifi_status_monitor.txt | awk '{print $ 5}')" -ge "$status_monitor_max_size" ]; then
	rm -rf /mnt/rcst_log/wifi_status_monitor.txt
	echo $(date) "/mnt/rcst_log/wifi_status_monitor.txt file size > 20971520 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi


if [ "$(ls -al /mnt/rcst_log/log/nginx/error.log | awk '{print $ 5}')" -ge "$status_monitor_max_size" ]; then
	echo 0 > /mnt/rcst_log/log/nginx/error.log
	echo $(date) "/mnt/rcst_log/wifi_status_monitor.txt file size > 20971520 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi

if [ "$(ls -al /mnt/rcst_log/log/openvswitch/ovs-vswitchd.log | awk '{print $ 5}')" -ge "$status_monitor_max_size" ]; then
	echo 0 > /mnt/rcst_log/log/openvswitch/ovs-vswitchd.log
	echo $(date) "/mnt/rcst_log/log/openvswitch/ovs-vswitchd.log file size > 20971520 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi

if [ "$(ls -al /mnt/rcst_log/log/openvswitch/ovsdb-server.log | awk '{print $ 5}')" -ge "$status_monitor_max_size" ]; then
	echo 0 > /mnt/rcst_log/log/openvswitch/ovsdb-server.log
	echo $(date) "/mnt/rcst_log/log/openvswitch/ovsdb-server.log file size > 20971520 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi
if [ "$(ls -al /mnt/rcst_log/acu_info.txt | awk '{print $ 5}')" -ge "$status_monitor_max_size" ]; then
	echo 0 > /mnt/rcst_log/acu_info.txt
	echo $(date) "/rcst_log/acu_info.txt size > 20971520 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi

if [ "$(ls -al /mnt/rcst_log/acu_offline.txt | awk '{print $ 5}')" -ge "$status_monitor_max_size" ]; then
	echo 0 > /mnt/rcst_log/acu_offline.txt
	echo $(date) "/mnt/rcst_log/acu_offline.txt file size > 20971520 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi
if [ "$(ls -al /mnt/rcst_log/acu_alarm.txt | awk '{print $ 5}')" -ge "$status_monitor_max_size" ]; then
	echo 0 > /mnt/rcst_log/acu_alarm.txt
	echo $(date) "/rcst_log/acu_alarm.txt size > 20971520 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi

if [ "$(ls -al /mnt/alarm_log | awk '{print $ 5}')" -ge "$status_monitor_max_size" ]; then
	echo 0 > /mnt/alarm_log
	echo $(date) "/mnt/alarm_log file size > 20971520 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi

if [ "$(ls -al /mnt/rcst_log/STiD135_Freq.txt | awk '{print $ 5}')" -ge "$messages0_max_size" ]; then
	echo 0 > /mnt/rcst_log/STiD135_Freq.txt 
	rm /mnt/rcst_log/STiD135_Freq_old.txt
	echo $(date) "/mnt/rcst_log/STiD135_Freq.txt > 2M, mv /mnt/rcst_log/STiD135_Freq.txt /mnt/rcst_log/STiD135_Freq_old.txt!" >> /mnt/rcst_log/status_monitor.txt
fi
if [ "$(ls -al /mnt/rcst_log/acu_w.txt | awk '{print $ 5}')" -ge "$status_monitor_max_size" ]; then
	echo 0 > /mnt/rcst_log/acu_w.txt
	echo $(date) "/mnt/rcst_log/acu_w.txt file size > 20971520 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi
if [ "$(ls -al /mnt/rcst_log/abridged_log.txt | awk '{print $ 5}')" -ge "$status_monitor_max_size" ]; then
	echo 0 > /mnt/rcst_log/abridged_log.txt
	echo $(date) "/mnt/rcst_log/abridged_log.txt file size > 20971520 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi
if [ "$(ls -al /mnt/rcst_log/abridged_log.txt.0 | awk '{print $ 5}')" -ge "$status_monitor_max_size" ]; then
	echo 0 > /mnt/rcst_log/abridged_log.txt.0
	echo $(date) "/mnt/rcst_log/abridged_log.txt.0 file size > 20971520 Bytes, delete!" >> /mnt/rcst_log/status_monitor.txt
fi
