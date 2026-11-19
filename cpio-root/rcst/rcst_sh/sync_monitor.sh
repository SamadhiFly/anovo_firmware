#! /bin/bash
set_flag=$(uci get rf_tx.rf_tx_config.rf_tx_type)
data_receive_flag=$(uci get update.update.data_receive_flag)
if [ 1 == $set_flag ];then
	exit 0
fi
data_receive_status=0
#lock status
lock_status=4
re_lock_status=0
#sync status
sync_status=4
re_sync_status=0
reset_max_num=1
#star pointing
gd_star_status=1
re_gd_star_status=0
#cw config
cw_enable=0
ntpdate_flag=0
#mointor times
lock_sleep_time=10		#(set_date - 1)分钟
sync_sleep_time=30	#(set_date - 1)分钟
sync_null_time=30		#(set_date - 1)分钟
#monitor count
lock_sleep_count=0
sync_sleep_count=0
sync_null_count=0

cnt_file='/tmp/sync_cnt'
if [  -s  "$cnt_file"  ] ; then
	cnt_data=$(cat $cnt_file)
	lock_sleep_count=$(echo "$cnt_data" | awk '{print $1}')
	sync_sleep_count=$(echo "$cnt_data"  | awk '{print $2}')
	sync_null_count=$(echo "$cnt_data"  | awk '{print $3}')
else
	echo 0 0 0 > $cnt_file
	lock_sleep_count=0
	sync_sleep_count=0
	sync_null_count=0
fi

echo $(date) "60s print: shell sync_status monitor running is OK!" >> /tmp/sync_status_monitor.txt
sync
#lock status monitor
cd /rcst/rcst_app
re_lock_status=$(./stm_fe_config -g -p 1 | grep st_stid135_info.u32_stid135_locked | awk '{print $2}')


#if [ ! -n "$re_lock_status" ] ; then
#	echo $(date) "60s print: read re_lock_status is null!" >> /tmp/sync_status_monitor.txt
#else
#	if [ "$re_lock_status" -eq "$lock_status" ]; then
#		lock_sleep_count=0
#		echo $(date) "60s print: lock_status monitor is OK!" >> /tmp/sync_status_monitor.txt
#	else
#		sync_sleep_count=0
#		ntpdate_flag=0
#		echo $(date) "60s print: un_lock count++!" >> /tmp/sync_status_monitor.txt
#		let lock_sleep_count=lock_sleep_count+1
#		if [ "$lock_sleep_count" -ge "$lock_sleep_time" ]; then
#			re_gd_star_status=$(uci get guide.monitor.monitortype)
#			var_cw_enable=$(uci get rf_tx.rf_single.sig_power_enable)
#			if [ ! -n "$re_gd_star_status" ] || [ ! -n "$var_cw_enable" ] ; then
#				echo "4" >> /tmp/sync_status_monitor.txt
#				echo $(date) "60s print: read re_gd_star_status or cw_enable is null!" >> /tmp/sync_status_monitor.txt
#			else
#				if [ "$var_cw_enable" -eq "$cw_enable" ] && [ "$re_gd_star_status" -eq "$gd_star_status" ]; then
#					if [ "$(ps | grep reset.sh | grep -v grep | wc -l)" -ge "$reset_max_num" ]; then
#						kill -9 $(ps | grep reset.sh  | grep -v grep | awk '{print $1}')
#					fi
#					echo $(date) "600s print: unlock reset!" >> /tmp/sync_status_monitor.txt
#					sh /rcst/rcst_sh/reset.sh > /dev/null & 
#					lock_sleep_count=0
#				else
#					echo $(date) "600s print: unlock , but pointing or cw open, can not reset!" >> /tmp/sync_status_monitor.txt
#				fi
#			fi
#		fi
#	fi
#fi

#sync status mointor 
re_sync_status=$(cat /proc/rcst_status/rcst_status_mode)
re_lock_status=$(cat /proc/drv_proc/fwd_islock)
nosync_reset_switch=$(uci get TXCS_config.TXCS_config.nosync_reset_switch)
if [ ! -n "$re_lock_status" ] || [  ! -n "$re_sync_status"  ] ; then
	echo $(date) "60s print: read re_lock_status or re_sync_status is null!" >> /tmp/sync_status_monitor.txt
	if [ "$re_lock_status" -eq "$lock_status" ] ; then 
		echo $(date) "60s print: re_sync_status is null count++!" >> /tmp/sync_status_monitor.txt
		sync_sleep_count=0
		let sync_null_count=sync_null_count+1
		if [ "$sync_null_count" -ge "$sync_null_time"  ] && [ "$data_receive_flag" -eq "$data_receive_status" ]; then
			echo $(date) "720 print: read sync null monitor reset!" >> /tmp/sync_status_monitor.txt
			sync_null_count=0
			if [ "$(ps | grep reset_2.sh | grep -v grep | wc -l)" -ge "$reset_max_num" ]; then
				kill -9 $(ps | grep reset_2.sh  | grep -v grep | awk '{print $1}')
			fi
			if [ "$nosync_reset_switch" -eq "0" ]; then
				sh /rcst/rcst_sh/reset_2.sh > /dev/null &
			fi
		fi
	fi
else
	sync_null_count=0
	if [ "$re_lock_status" -eq "$lock_status" ] ; then 
		if [ "$re_sync_status" -eq "$sync_status"  ] ; then
			sync_sleep_count=0
			echo $(date) "60s print: sync_status monitor is OK!" >> /tmp/sync_status_monitor.txt
			
			#sync and ntpdate start
			#~ if [ "$ntpdate_flag" -eq "0" ] ; then
				#~ echo $(date) "sync ntp restart !" >> /tmp/sync_status_monitor.txt
				#~ ntpdate $(uci get system.ntp.server | awk '{print $1}') &
				#~ ntpdate $(uci get system.ntp.server | awk '{print $2}') &
				#~ ntpdate_flag=1
			#~ fi
		else
			echo $(date) "60s print: un_sync count++!" >> /tmp/sync_status_monitor.txt
			let sync_sleep_count=sync_sleep_count+1
			ntpdate_flag=0				
			if [ "$sync_sleep_count" -ge "$sync_sleep_time" ] ;then					
				re_gd_star_status=$(uci get guide.monitor.monitortype)
				var_cw_enable=$(uci get rf_tx.rf_single.sig_power_enable)
				if [ ! -n "$re_gd_star_status" ] || [ ! -n "$var_cw_enable" ] ; then
					echo $(date) "60s print: read re_gd_star_status or cw_enable is null!" >> /tmp/sync_status_monitor.txt
				else
					if [ "$var_cw_enable" -eq "0" ] && [ "$re_gd_star_status" -eq "$gd_star_status" ] && [ "$data_receive_flag" -eq "$data_receive_status" ]; then
						echo $(date) "720s print: un_sync monitor reset!" >> /tmp/sync_status_monitor.txt
						sync_sleep_count=0
						if [ "$(ps | grep reset | grep -v grep | wc -l)" -ge "$reset_max_num" ]; then
							kill -9 $(ps | grep reset_2.sh  | grep -v grep | awk '{print $1}')
						fi
						if [ "$nosync_reset_switch" -eq "0" ]; then
							sh /rcst/rcst_sh/reset_2.sh > /dev/null &
						fi
					else
						echo $(date) "720s print: un_sync , but pointing or cw open, can not reset!" >> /tmp/sync_status_monitor.txt
					fi
				fi
			fi
		fi
	fi
fi
echo $lock_sleep_count $sync_sleep_count $sync_null_count > $cnt_file
