#!/bin/bash
 echo $(date)":rcst system reboot mode judge"

#获取系统界面重启标识
var_sys_web_reboot_mode=$(uci get sys_monitor.sys_reboot.sys_web_reboot_flag)
echo $var_sys_web_reboot_mode

#获取终端界面系统升级重启标识
var_sys_upgrade_reboot_mode=$(uci get sys_monitor.sys_reboot.sys_upgrade_reboot_flag)
echo $var_sys_upgrade_reboot_mode

#获取网管远程升级重启标识
var_sys_nms_upgrade_reboot_flag=$(uci get sys_monitor.sys_reboot.sys_nms_upgrade_reboot_flag)
echo $var_sys_nms_upgrade_reboot_flag


#获取网管控制重启标识
var_sys_nms_reboot_mode=$(uci get sys_monitor.sys_reboot.sys_nms_reboot_flag)
echo $var_sys_nms_reboot_mode


#获取FPGA触发看门狗重启标识
var_sys_fpga_watchdog_reboot_mode=$(uci get sys_monitor.sys_reboot.sys_fpga_watchdog_reboot_flag)
echo $var_sys_nms_reboot_mode

#获取系统冷热启动模式
var_sys_start_mode=$(uci get sys_monitor.sys_reboot.sys_pca9543_flag)
echo $var_sys_start_mode

echo "TIME               |  TYPE  |  NOTICE" > /tmp/sys_start_mode
#综合所有标识，进行异常启动模式识别
#系统的冷热启动是主要因素，首先排除冷启动

if [ "$var_sys_start_mode" = "0" ]; then

	echo $(date)":[ 11 ]System boot from PowerOn " > /tmp/sys_start_mode
	
	# 启动结果诊断
	uci set sys_monitor.reboot_judge.sys_reboot_judge_flag=11
	uci set sys_monitor.reboot_judge.sys_reboot_judge_flag_web=11
	uci set sys_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)
	uci commit sys_monitor

	uci set telnet_monitor.reboot_judge.sys_reboot_judge_flag=11
	uci set telnet_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)
	uci commit telnet_monitor

	
elif [ "$var_sys_start_mode" = "1" ]; then

	if [ "$var_sys_fpga_watchdog_reboot_mode" = "1" ] ; then
	
		uci set sys_monitor.reboot_judge.sys_reboot_judge_flag=12
		uci set sys_monitor.reboot_judge.sys_reboot_judge_flag_web=12
		uci set sys_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)

		uci set telnet_monitor.reboot_judge.sys_reboot_judge_flag=12
		uci set telnet_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)
		echo $(date)"[ 12 ] System reboot from WatchDog with FPGA missing " > /tmp/sys_start_mode


	elif [ "$var_sys_web_reboot_mode" = "1" ] ; then
		
		uci set sys_monitor.reboot_judge.sys_reboot_judge_flag=13
		uci set sys_monitor.reboot_judge.sys_reboot_judge_flag_web=13	
		uci set sys_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)
	
		uci set telnet_monitor.reboot_judge.sys_reboot_judge_flag=13
		uci set telnet_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)	
		echo $(date)"[ 13 ] System reboot from WEB control" > /tmp/sys_start_mode

	elif [ "$var_sys_nms_reboot_mode" = "1" ] ; then
		
		uci set sys_monitor.reboot_judge.sys_reboot_judge_flag=14	
		uci set sys_monitor.reboot_judge.sys_reboot_judge_flag_web=14
		uci set sys_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)

		uci set telnet_monitor.reboot_judge.sys_reboot_judge_flag=14
		uci set telnet_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)	
		echo $(date)"[ 14 ] System reboot from NMS control  " > /tmp/sys_start_mode
	
	elif [ "$var_sys_upgrade_reboot_mode" = "1" ] ; then
		
		uci set sys_monitor.reboot_judge.sys_reboot_judge_flag=15
		uci set sys_monitor.reboot_judge.sys_reboot_judge_flag_web=15
		uci set sys_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)
	
	    uci set telnet_monitor.reboot_judge.sys_reboot_judge_flag=15
		uci set telnet_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)
		echo $(date)"[ 15 ] System reboot from Terminal WEB upgrade" > /tmp/sys_start_mode
		
	elif [ "$var_sys_nms_upgrade_reboot_flag" = "1" ] ; then
		
		uci set sys_monitor.reboot_judge.sys_reboot_judge_flag=16
		uci set sys_monitor.reboot_judge.sys_reboot_judge_flag_web=16
		uci set sys_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)
	
	    uci set telnet_monitor.reboot_judge.sys_reboot_judge_flag=16
		uci set telnet_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)
		echo $(date)"[ 16 ] System reboot from NMS upgrade" > /tmp/sys_start_mode
		
	else 
		uci set sys_monitor.reboot_judge.sys_reboot_judge_flag=19
		uci set sys_monitor.reboot_judge.sys_reboot_judge_flag_web=19
		uci set sys_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)
	
		uci set telnet_monitor.reboot_judge.sys_reboot_judge_flag=19
		uci set telnet_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)	
		echo $(date)"[ 19 ] System reboot from WatchDog with Kernel panic or HW reset key" > /tmp/sys_start_mode
	
	fi
else
		uci set sys_monitor.reboot_judge.sys_reboot_judge_flag=-1
		uci set sys_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)

		uci set telnet_monitor.reboot_judge.sys_reboot_judge_flag=-1		
		uci set telnet_monitor.reboot_judge.sys_reboot_judge_time=$(date +%s)
		echo $(date)":Error,there are some mistakes in the rcst_sys_start_judge.sh or configuration set error!"	

fi

#清除界面REBOOT标识

uci commit telnet_monitor

uci set sys_monitor.sys_reboot.sys_web_reboot_flag=0  
uci set sys_monitor.sys_reboot.sys_upgrade_reboot_flag=0 
uci set sys_monitor.sys_reboot.sys_nms_reboot_flag=0 
uci set sys_monitor.sys_reboot.sys_fpga_watchdog_reboot_flag=0
uci set sys_monitor.sys_reboot.sys_nms_upgrade_reboot_flag=0
uci commit sys_monitor





