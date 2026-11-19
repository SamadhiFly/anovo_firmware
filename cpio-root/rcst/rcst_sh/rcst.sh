#!/bin/bash

if [ ! -f "/mnt/zd_version" ]; then
	echo 4 > /mnt/zd_version
fi

if [ -z  "$(cat /mnt/rcst_type)" ]; then
	echo 0 > /mnt/rcst_type
fi

if [ ! -f "/mnt/rcst_type_new" ]; then
	cp /mnt/rcst_type /mnt/rcst_type_new
	sync
fi

if [ -z  "$(cat /mnt/zd_version)" ]; then
	mainback_flag=$(uci get backup_lockfreq.backuplockfreq.mainback_flag)
	if [ "$mainback_flag" = "2" ]; then
		satellite_name=$(uci get backup_lockfreq.backuplockfreq.satellite_name)
	else
		satellite_name=$(uci get satellite_config.satellite_antenna.satellite_name)
	fi
	system_23_temp=$(uci get satellite_config.$satellite_name.system_23)
	echo $system_23_temp > /mnt/zd_version
fi

echo 30000 > /proc/sys/net/core/netdev_max_backlog
echo 1 > /mnt/space0_or_weitong1
if [ ! -f  "/mnt/space0_or_weitong1" ]; then
	echo 1 > /mnt/space0_or_weitong1
else
	if [ -z  "$(cat /mnt/space0_or_weitong1)" ]; then
		echo 1 > /mnt/space0_or_weitong1
	fi
fi

#读取PCA9543寄存器确定是否为断电重启
/rcst/rcst_app/zidu_config_app  0  -r  

#MAC 校验 有问题时重新配置MAC 再重启
sh /rcst/rcst_sh/mac_check.sh

#if [ "$(cat /mnt/space0_or_weitong1)" = "2" ]; then
#	cp /rcst/rcst_sh/auth_jh.txt /tmp/auth.txt
#else 
#	cp /rcst/rcst_sh/auth_ct4000.txt /tmp/auth.txt
#fi
#cp /rcst/rcst_app/gopass /tmp
sync

#启动时 开启ZYNQ看门狗
watch_dog_switch=$(uci get update.update.watch_dog_switch)
if [ "$watch_dog_switch" = "1" ]; then
	watchdog -t 5 -T 30 /dev/watchdog0
fi

#启动时 复位STiD135硬件
/rcst/rcst_app/zidu_config_app  1  1  0  0
syslog_sh "########STiD135 restart########"
syslog_sh "########STiD135 restart########"
/rcst/rcst_app/zidu_config_app  1  1  0  1

sleep 1
#配置eth0 led灯模式
/rcst/rcst_app/mdio eth0 0x1f 0x0d04
/rcst/rcst_app/mdio eth0 0x10 0x7fff


#执行一次终端批产测试  //wjx 20171120
zd_version=$(cat /mnt/zd_version)
if [ "$zd_version" = "2" ]; then
	sh /rcst/rcst_sh/rcst_2.sh
elif [ "$zd_version" = "3" ]; then
	sh /rcst/rcst_sh/rcst_3.sh
elif [ "$zd_version" = "4" ]; then
	sh /rcst/rcst_sh/rcst_4.sh	
fi



#sh /rcst/rcst_sh/rootfs_ro_process.sh
