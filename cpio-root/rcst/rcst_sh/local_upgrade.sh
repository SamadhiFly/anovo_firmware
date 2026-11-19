#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info local_upgrade"[$(ps | grep local_upgrade.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

shell_name="local_upgrade"
syslog_sh "$shell_name: begin ..."

uci set update.update.process=0
uci commit update

cd /tmp/

var=-1

sh_upgrade=firmware_upgrade.sh

file_name="fou_firmware.tar.gz"
file_md5sum="fou_md5sum"

syslog_sh "Terminal Type: FOU terminal!"
	
echo -e "\n"

if [ -f "$file_name" ] ; then 
	syslog_sh "$shell_name: upgrade file exist, check file md5sum ..."
	tar -zxvf $file_name > /dev/null
	
	var_a="root=/dev/ubiblock0_6"
	var_b="root=/dev/ubiblock0_7"		
	boot_var=$(fw_printenv bootargs | awk '{print $5}')
		
	if [ "$boot_var" ] && [ $boot_var = $var_a ] ; then

		syslog_sh "$shell_name: rootfs_a is running, begin upgrade rootfs_b..."
		
		#升级uboot
		#echo "FOU Version, ubiupdatevol u-boot_b to U-BOOT-SPARE..."
		#ubiupdatevol /dev/ubi0_1 u-boot_b
		#升级内核
		#echo "FOU Version, ubiupdatevol fit_b.itb to KERNEL-SPARE..."
		#ubiupdatevol /dev/ubi0_3 fit_b.itb
		#升级FPGA
		#echo "FOU Version, ubiupdatevol term_top_b.bin to FPGA-SPARE..."			
		#ubiupdatevol /dev/ubi0_5 term_top_b.bin
		#升级文件系统
		syslog_sh "FOU Version, ubiupdatevol rootfs_b.squashfs to ROOTFS-SPARE..."		
		ubiupdatevol /dev/ubi0_7 /tmp/rootfs_b.squashfs
		
		sync
		
		var=0
		sh /usr/lcmb_t120_scrpit/setup_boot.sh back		
		
	elif [ "$boot_var" ] && [ $boot_var = $var_b ] ; then


		syslog_sh "$shell_name: rootfs_b is running, begin upgrade rootfs_a..."
			
		#升级uboot
		#echo "FOU Version, ubiupdatevol u-boot_a to U-BOOT..."
		#ubiupdatevol /dev/ubi0_0 u-boot_a
		#升级内核
		#echo "FOU Version, ubiupdatevol fit_a.itb to KERNEL..."
		#ubiupdatevol /dev/ubi0_2 fit_a.itb
		#升级FPGA
		#echo "FOU Version, ubiupdatevol term_top_a.bin to FPGA..."			
		#ubiupdatevol /dev/ubi0_4 term_top_a.bin
		#升级文件系统
		syslog_sh "FOU Version, ubiupdatevol rootfs_a.squashfs to ROOTFS..."		
		ubiupdatevol /dev/ubi0_6 /tmp/rootfs_a.squashfs
		
		sync
					
		var=0
		sh /usr/lcmb_t120_scrpit/setup_boot.sh main								
			
	else	
		syslog_sh "$shell_name: fw_printenv bootcmd error ..."
		uci set update.update.process=-3
		uci commit update			
	fi
else	
	syslog_sh "$shell_name: upgrade file download failed ..."
	uci set update.update.process=-3
	uci commit update			
fi
		

if [ "$var = 0" ]; then

	uci set update.update.process=1
	uci commit update
			
	uci set sys_monitor.sys_reboot.sys_upgrade_reboot_flag=1
	uci commit sys_monitor

	syslog_sh "$shell_name: upgrade success, rebooting..."
	
fi
		
#~ syslog_sh "copy rcst folder ..."
#~ #mkdir /rcst_upgrade
#~ rm -rf /rcst_upgrade/*
#~ cp -rf /tmp/rcst/* /rcst_upgrade
#~ sync 
#~ echo 1 > /rcst_upgrade/file_upgrade/update_flag
#~ syslog_sh "copy rcst folder success..."
#~ 
#~ syslog_sh "open software install shell ..."
#~ sh /rcst_upgrade/file_upgrade/update_check.sh
 
#~ uci set network.lan.mtu=1500
#~ uci set network.wan.mtu=1500
#~ uci commit network
#~ cp /etc/config/network /rcst_back/

uci set update.update.image_crtvsn=V1.00.007
uci set update.update.image_newvsn=V1.00.007
uci commit update

syslog_sh "upgrade end ..."

#~ rm -rf /tmp/*firmware* > /dev/null
