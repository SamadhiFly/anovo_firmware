#! /bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info cop_speed_start_monitor"[$(ps | grep cop_speed_start_monitor.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

#间隔数
step=2
i=0

while [ "$i" -lt "60" ];do	#2s循环

	speed_cop=$(ps | grep speed_cop.sh | grep -v grep | awk '{print $1}')
	if [  ! -n "$speed_cop" ]; then
		sh /rcst/rcst_sh/speed_cop.sh &
	fi

	i=`expr $i + 2`
	sleep $step
done
