#! /bin/bash
echo $(date) "SDDP_monitor.sh running ... ..." >> /mnt/rcst_log/status_monitor.txt
SDDP_ps=$(ps | grep SDDP_upgrade | grep -v grep | awk '{print $1}')
if [ ! -n "$SDDP_ps" ]; then
	echo $(date) "SDDP_upgrade stoped!!" >> /mnt/rcst_log/status_monitor.txt
	kill -9 $(ps | grep SDDP_upgrade | grep -v grep | awk '{print $1}')
	cd /rcst/rcst_app/
	./SDDP_upgrade &
fi

modem_to_acu_client_ps=$(ps | grep modem_to_acu_client  | grep -v grep | awk '{print $1}')
if [ ! -n "$modem_to_acu_client_ps" ]; then
	echo $(date) "modem_to_acu_client_ps stoped!!" >> /mnt/rcst_log/status_monitor.txt
	kill -9 $(ps | grep modem_to_acu_client | grep -v grep | awk '{print $1}')
	cd /rcst/rcst_app
	./modem_to_acu_client &
fi
