#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info remote_upgrade"[$(ps | grep remote_upgrade.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /rcst_log/messages
}

shell_name="snmp remote_upgrade"
syslog_sh "$shell_name: begin ..."

uci set upgrade_info.upgrade_info.process=9
uci commit upgrade_info

username=$(uci get modem.upgrade_info.user_name)
passwd=$(uci get upgrade_info.upgrade_info.passwd)
ip_addr=$(uci get upgrade_info.upgrade_info.dst_ip)
#~ file_name=$4
#~ upgrade_type=$5
#~ version=$6

echo username:$username
echo passwd:$passwd
echo ip_addr:$ip_addr
#~ echo file_name:$file_name
#~ echo upgrade_type:$upgrade_type
#~ echo version:$version

terminal_type=$(cat /mnt/rcst_type)

#~ if [ "$terminal_type" = "0" ]; then
	firmware_tar_filename="vsat_mod_firmware.tar.gz"

		echo 'firmware upgeade'
		upgrade_pach=/terminal/terminalUpgradeFile/mode/
		file_upgrade=firmware_upgrade.tar.gz
		file_md5sum=firmware_md5sum
		sh_upgrade=firmware_upgrade.sh
		file_name=$firmware_tar_filename

	syslog_sh "Terminal Type: VSAT terminal!"
	
#~ elif [ "$terminal_type" = "1" ]; then
	#~ firmware_tar_filename="scpc_firmware.tar.gz"
#~ 
		#~ echo 'firmware upgeade'
		#~ upgrade_pach=/scpcTerminal/scpcTerminalUpgradeFile/$version/kernel/
		#~ file_upgrade=firmware_upgrade.tar.gz
		#~ file_md5sum=firmware_md5sum
		#~ sh_upgrade=firmware_upgrade.sh
		#~ file_name=$firmware_tar_filename
#~ 
	#~ syslog_sh "Terminal Type: SCPC terminal!"
	#~ 
#~ elif [ "$terminal_type" = "2" ]; then
	#~ firmware_tar_filename="mesh_firmware.tar.gz"
	#~ dsp_tar_filename="mesh_dsp.tar.gz"
#~ 
	#~ if [ "$upgrade_type" = "1" ]; then
		#~ echo 'firmware upgeade'
		#~ upgrade_pach=/meshTerminal/meshTerminalUpgradeFile/$version/kernel/
		#~ file_upgrade=firmware_upgrade.tar.gz
		#~ file_md5sum=firmware_md5sum
		#~ sh_upgrade=firmware_upgrade.sh
		#~ file_name=$firmware_tar_filename
	#~ elif [ "$upgrade_type" = "4" ]; then
		#~ echo 'hardware upgrade'
		#~ upgrade_pach=/meshTerminal/meshTerminalUpgradeFile/$version/dsp/
		#~ file_upgrade=dsp_upgrade.tar.gz
		#~ file_md5sum=dsp_md5sum
		#~ sh_upgrade=dsp_upgrade.sh
		#~ file_name=$dsp_tar_filename
	#~ else
		#~ syslog_sh "$shell_name: upgrade_type error, exit..."
		#~ uci set upgrade_info.upgrade_info.process=1
		#~ uci commit upgrade_info
		#~ exit 0
	#~ fi
	#~ syslog_sh "Terminal Type: MESH terminal!"
#~ else
	#~ syslog_sh "$shell_name: terminal_type error, exit..."
	#~ uci set upgrade_info.upgrade_info.process=1
	#~ uci commit upgrade_info
	#~ exit 0
#~ fi

echo -e "\n"

#网络测试
syslog_sh "$shell_name: check network ..."
net_check=$(ping $ip_addr -c 2 | sed -n 6p  | awk '{print $4}')
if [ "$net_check" = "2" ]; then
	syslog_sh "$shell_name: network reachable, download upgrade file ..."
	#文件下载
	rm -rf /tmp/*firmware*
	sleep 1
	/usr/bin/wget ftp://$username:$passwd@$ip_addr$upgrade_pach$file_name -O /tmp/$file_name 
	
	#ftp测试用 
	#~ upgrade_pach=/pub/V1.09.011/kernel/
	#~ echo "$($username@$ip_addr$upgrade_pach$file_name -O /tmp/$file_name)"
	#~ wget ftp://$username@$ip_addr$upgrade_pach$file_name -O /tmp/$file_name

	#判断文件是否存在
	cd /tmp/
	if [ -f "$file_name" ] ; then 
		syslog_sh "$shell_name: upgrade file download success, check file md5sum ..."
		tar -zxvf $file_name > /dev/null
		#校验
		var1=$(md5sum $file_upgrade | awk '{print $1}')
		var2=$(cat $file_md5sum | awk '{print $1}')
		
		echo $var1
		echo $var2

		if [ $var1 = $var2 ] && [ "$var2" ] ; then
			echo 'md5sum check equal!'
			syslog_sh "$shell_name: md5sum check sucess ..."
			tar -zxvf $file_upgrade > /dev/null
			
			#调用升级脚本
			#sh ./$sh_upgrade

			if [ "$terminal_type" = "0" ]; then	

					syslog_sh "$shell_name:upgrade type:$sh_upgrade, direct upgrade!!!"	
					sh ./$sh_upgrade	#调用升级脚本

			else
           			sh ./$sh_upgrade	#调用升级脚本
       		fi

			uci set upgrade_info.upgrade_info.process=8
			uci commit upgrade_info
			
			#~ uci set sys_monitor.sys_reboot.sys_nms_reboot_flag=1
			#~ uci commit sys_monitor
			sync

			sleep 3		

		
					
			#20s后重启
			syslog_sh "$shell_name: upgrade success, rebooting..."
			reboot -f 2 &  > /dev/null
		else
			syslog_sh "$shell_name: md5sum check failed ..."
			uci set upgrade_info.upgrade_info.process=3
			uci commit upgrade_info
		fi

	else
		syslog_sh "$shell_name: upgrade file download failed ..."
		uci set upgrade_info.upgrade_info.process=4
		uci commit upgrade_info
	fi

else
	syslog_sh "$shell_name: check network unreachable ..."
	uci set upgrade_info.upgrade_info.process=5
	uci commit upgrade_info
fi
