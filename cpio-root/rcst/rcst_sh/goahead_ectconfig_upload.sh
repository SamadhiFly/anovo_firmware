#!/bin/bash


syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info goahead_etcconfig_upload"[$(ps | grep goahead_etcconfig_upload.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

username=$(uci get modem_connect.modem_connect.user_name)
passwd=$(uci get modem_connect.modem_connect.passwd)
ip_addr=$(uci get modem_connect.modem_connect.cpu_ip)

echo username:$username
echo passwd:$passwd
echo ip_addr:$ip_addr

#~ messages0_max_size=5120000 #单位Bytes
sleep 1
syslog_sh "rcst_log goahead_etcconfig_upload.sh upload is OK!" >> /mnt/rcst_log/acu_status_monitor.txt

ftpput -u $username -p $passwd $ip_addr /home/ftp/config/proset /etc/config/proset


ftpput -u $username -p $passwd $ip_addr /home/ftp/config/rcst_mac /etc/config/rcst_mac
ftpput -u $username -p $passwd $ip_addr /home/ftp/config/rcst_type /mnt/rcst_type

echo 1 > /tmp/snmp_init_flag
ftpput -u $username -p $passwd $ip_addr /home/ftp/config/snmp_init_flag /tmp/snmp_init_flag
echo 0 > /tmp/snmp_init_flag

