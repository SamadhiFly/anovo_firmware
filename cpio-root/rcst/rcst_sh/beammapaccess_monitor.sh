#! /bin/bash
#echo $(date) "beammapaccess_monitor.sh running ... ..." >> /tmp/beammapaccess_status_monitor.txt
sync_status=4

re_sync_status=$(cat /proc/rcst_status/rcst_status_mode | awk '{print $1}')


if [ "$re_sync_status" -eq "$sync_status" ]; then
	beammapaccess_flag=$(uci get beamaccsss_config.beamaccsss_config.beammapaccess_flag)
	if [ "$beammapaccess_flag" == "2" ]; then
		beammapaccess_ps=$(ps | grep beammapaccess_ftpupdate.sh | grep -v grep | wc -l)
		if [ "$beammapaccess_ps" == "0" ]; then
			kill -9 $(ps | grep beammapaccess_ftpupdate.sh | grep -v grep | awk '{print $1}')
			sh /rcst/rcst_sh/beammapaccess_ftpupdate.sh > /dev/null &
		fi
		
	fi
fi

