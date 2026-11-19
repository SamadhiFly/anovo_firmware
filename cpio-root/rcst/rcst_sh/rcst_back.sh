#!/bin/bash

#open syslog
echo "########begin########"
klogd
syslogd -O /rcst_log/messages -l 6 -s 2048

sleep 1


#修改打印级别与内核转发
echo 1 > /proc/sys/kernel/printk
echo 1 > /proc/sys/net/ipv4/ip_forward

#crontab
echo "########crontab########"
crontab /rcst/rcst_sh/root
cron start

sleep 1

#LLA_STiD135
echo "########LLA_STiD135########"
#rf_rx_lock_freq=$(uci get rf_rx.rf_rx.rf_rx_lock_freq)
#rf_rx_symbol=$(uci get rf_rx.rf_rx.rf_rx_symbol)
#LLA_STiD135 BBFN $rf_rx_lock_freq $rf_rx_symbol &
insmod /rcst/rcst_drv/stm_fe_os_wrapper.ko
insmod /rcst/rcst_drv/stm_fe_util.ko
insmod /rcst/rcst_drv/stm_fe.ko
insmod /rcst/rcst_drv/stid135_lla.ko  lla_wrapper_debug=0 u32_set_gse_bbf_mode=1
insmod /rcst/rcst_drv/stm_fe_configure.ko

sleep 10


cat /rcst/rcst_drv/term_top.bin > /dev/xdevcfg 

sleep 1
#insmod ko
echo "########insmod ko########"
insmod /rcst/rcst_drv/cdma_driver.ko
insmod /rcst/rcst_drv/lcmb_lla_driver.ko
insmod /rcst/rcst_drv/gateway_fou.ko

sleep 1
#zl_or_not
echo "########zl_or_not########"
zl_or_not=$(uci get zl_or_not.zl_or_not.zl_or_not)
if [ "$zl_or_not" == 1 ];then
cd /;cd /proc/user_proc/;echo "a0" > zl_or_not
fi 

#fou_dev_tool
echo "########fou_dev_tool########"
fou_dev_tool -v 0
sleep 1
fou_dev_tool -s -r 4
sleep 1
fou_dev_tool -s -r 20

sleep 1
#param_config_app"
echo "########param_config_app########"
param_config_app &

sleep 1
#fou_tx_config_app"
echo "########fou_tx_config_app########"
fou_tx_config_app &

sleep 1
#nmi_app"
echo "########nmi_app########"
nmi_app &

sleep 1
#diagnostics"
echo "########diagnostics########"
diagnostics &

sleep 1
#buzzer_config_app"
syslog_sh "---------------------------buzzer_config_app-------------------------------"
buzzer_config_app &

sleep 1
#logoff_monitor_app"
syslog_sh "---------------------------logoff_monitor_app-------------------------------"
logoff_monitor_app &


sleep 1
#web
echo "########web########"
cd /rcst/rcst_app
./goahead -v /rcst/rcst_ui/web 8080 &

echo "########end########"
