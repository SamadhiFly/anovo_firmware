#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info beam_check"[$(ps | grep beam_check.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

	 if [ "$( uci get beamaccsss_config.beamaccsss_config.beamcheck_init  | wc -l)" -eq "0" ]; then
			 uci set beamaccsss_config.beamaccsss_config.beamcheck_init=256
			 uci commit beamaccsss_config
	fi
	beam_num=$(uci get beamaccsss_config.beamaccsss_config.beamcheck_init)

	i=0
	beam_idcheck_cnt=0
	beam_check_lng=0
	beam_check_lat=0


	 if [  -f "/mnt/b_info" ]; then
	 beam_strlen=$(cat /mnt/b_info | grep -v ',' |wc -l)
		if [  "$beam_strlen" -eq  "$beam_num" ]; then
			while [ "$i" -le "$beam_strlen" ];do
			i=`expr $i + 1`
			beam_check_lng=$(cat /mnt/b_info | grep -v ',' | sed -n "$i p" | awk -F '[,]+' '{print $1}')
			beam_check_lat=$(cat /mnt/b_info | grep -v ',' | sed -n "$i p" | awk -F '[,]+' '{print $2}')
				if [  -n "$beam_check_lng" ]  &&  [  -z "$beam_check_lat" ];  then
						if [  "$beam_idcheck_cnt" -le  "$beam_num" ]; then
							beam_idcheck_cnt=`expr $beam_idcheck_cnt + 1`
						fi

						if [  "$beam_check_lng" -ne  "$beam_idcheck_cnt" ]; then
							syslog_sh "param_config_app config beam_xml error beam_check_lng:$beam_check_lng != beam_idcheck_cnt:$beam_idcheck_cnt"
							rm /mnt/*_b_info
							rm /mnt/b_info
							break;
						fi
				elif [  -z "$beam_check_lng" ]  &&  [  -z "$beam_check_lat" ];  then
					if [  "$beam_idcheck_cnt" -lt  "$beam_num" ]; then
						syslog_sh "param_config_app config beam_xml error beam_idcheck_cnt:$beam_idcheck_cnt < beam_num:$beam_num"
						rm /mnt/*_b_info
						rm /mnt/b_info
					fi
					syslog_sh "param_config_app config beam_xml success"
					break;		
				fi
			done
		else
			syslog_sh "param_config_app config beam_xml error beam_strlen:$beam_strlen != beam_num:$beam_num"
			rm /mnt/*_b_info
			rm /mnt/b_info
		fi
	fi

