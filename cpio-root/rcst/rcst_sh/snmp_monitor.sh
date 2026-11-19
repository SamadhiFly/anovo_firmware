#! /bin/bash

source /etc/profile

#上线状态
snmp_unsync_count=0
sync_status=4
echo $(date) "60s print: shell snmp_status monitor running is OK!" >> /tmp/snmp_status_monitor.txt
#判断snmp运行状态
#~ nmi_resetflag=$(uci get proset.nmi_set.nmi_resetflag)
#~ if [ $nmi_resetflag != 2 ];then
	re_sync_status=$(cat /proc/rcst_status/rcst_status_mode)
	if [ ! -n "$re_sync_status" ] ; then
		echo $(date) "60s print: read sync_status is null!" >> /tmp/snmp_status_monitor.txt
	else
		if [ "$re_sync_status" -eq "$sync_status" ]; then
			snmp_ps=$(ps | grep nmi_app | grep -v fh_nmi_app | grep -v grep | awk '{print $1}')
			if [  ! -n "$snmp_ps" ]; then
				#waiting 10 sec, read snmp_ps again!
				sleep 10
				snmp_ps=$(ps | grep nmi_app | grep -v fh_nmi_app | grep -v grep | awk '{print $1}')
				if [  ! -n "$snmp_ps" ]; then
					echo $(date) "60s print: nmi_app abnormal stoped phenomena!" >> /tmp/snmp_status_monitor.txt
					kill -9 $(netstat -anup | grep 161 | grep -v nmi_app | grep -v fh_nmi_app | grep -v cop_app | awk '{print $6}'| awk -F '[/]+' '{print $1}')
					kill -9 $(ps | grep snmp_restart_2.sh | grep -v grep | awk '{print $1}')
					kill -9 $(ps | grep nmi_app | grep -v fh_nmi_app | grep -v grep | awk '{print $1}')
					#~ uci set proset.nmi_set=proset
					#~ uci set proset.nmi_set.nmi_resetflag=1
					#~ uci commit proset
					sh /rcst/rcst_sh/snmp_restart_2.sh > /dev/null &

				fi
			fi
		fi
	fi
#~ fi
