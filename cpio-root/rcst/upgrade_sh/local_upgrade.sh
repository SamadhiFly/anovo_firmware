#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info local_upgrade"[$(ps | grep local_upgrade.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

shell_name="local_upgrade"
syslog_sh "$shell_name: begin ..."

uci set update.update.process=0
uci commit update

cd /mmc2/

rcst_xph_type_now=38

var=-1

sh_upgrade=firmware_upgrade.sh

upgrade_name="firmware.tar.gz"
file_name="fou_firmware.tar.gz"
file_md5sum="fou_md5sum"

syslog_sh "Terminal Type: FOU terminal!"

#lixch@20190328 防止开加速升级时内存报错
tcp_set_switch=$(uci get proset.tcp_set.switch)
if [ "$tcp_set_switch" = "1" ]; then
	syslog_sh "------------before upgrade---------------tcp_set_switch 1 tcp_stop.sh--------------------------"	
	sh /rcst/http_sh/tcp_stop.sh > /dev/null
fi

echo -e "\n"

if [ -f "$upgrade_name" ] ; then
	tar -zxvf $upgrade_name > /dev/null
	rm  -rf  $upgrade_name
	tar -zxvf $file_name > /dev/null
	syslog_sh "$shell_name: upgrade file exist, check file md5sum ..."

	md5sum_1=$(md5sum $file_name | awk '{print $1}')
	md5sum_2=$(cat $file_md5sum | awk '{print $1}')
	rcst_xph_type=$(cat /mnt/rcst_xph_type) 
#<<<<<<< HEAD
	if [ $rcst_xph_type = $rcst_xph_type_now ] || [ $rcst_xph_type == 39 ] || [ $rcst_xph_type = 40 ]; then
	
		if [ "$md5sum_2" ] && [ $md5sum_1 = $md5sum_2 ] ; then
			syslog_sh "$shell_name:fou_firmware.tar.gz md5sum check sucess ..."
			rm  -rf  $file_name
			
			var_a="boot_a"
			var_b="boot_b"		
			boot_var=$(fw_printenv bootcmd | awk '{print $2}')
				
#=======
	if [ ! -f /mmc2/rcst_xph_version ]	; then	
		cp /mnt/rcst_xph_type /mmc2/rcst_xph_version
	fi
	rcst_xph_version=$(cat /mmc2/rcst_xph_version)
	if [ $rcst_xph_type = $rcst_xph_version ] || [ $rcst_xph_type = 39 ] || [ $rcst_xph_type = 40 ]; then
		syslog_sh "$shell_name:rcst_xph_type are same ..."
		if [ "$md5sum_2" ] && [ $md5sum_1 = $md5sum_2 ] ; then
			syslog_sh "$shell_name:fou_firmware.tar.gz md5sum check sucess ..."
			rm  -rf  $file_name
		
			var_a="boot_a"
			var_b="boot_b"		
			boot_var=$(fw_printenv bootcmd | awk '{print $2}')
			
#>>>>>>> 4613eb84fb4d7f765d2efe01eaf72110b10b1664
			if [ "$boot_var" ] && [ $boot_var = $var_a ] ; then

				syslog_sh "$shell_name: rootfs_a is running, begin upgrade rootfs_b..."
			
				#升级uboot
				#echo "FOU Version, ubiupdatevol u-boot_b to U-BOOT-SPARE..."
				#ubiupdatevol /dev/ubi0_1 u-boot_b
				#升级内核
				syslog_sh "FOU Version, ubiupdatevol fit_b.itb to KERNEL-SPARE..."
				#ubiupdatevol /dev/ubi0_3 /tmp/fit_a.itb
				#升级FPGA
				#echo "FOU Version, ubiupdatevol term_top_b.bin to FPGA-SPARE..."			
				#ubiupdatevol /dev/ubi0_5 term_top_b.bin
				#升级文件系统
				syslog_sh "FOU Version, ubiupdatevol rootfs_b.squashfs to ROOTFS-SPARE..."		
				#ubiupdatevol /dev/ubi0_7 /tmp/rootfs_a.squashfs

#				flashcp -v /rcst/rcst_drv/BOOT.bin /dev/mtd0

				rm -rf /mmc1/image_b.ub
				cp  /mmc2/image.ub  /mmc1/image_b.ub
				sync
				rm -rf /mmc2/image.ub
				rm -rf /mmc2/fou_md5sum
				rm -rf /mmc2/upgrade_check.sh
				sync
			
				var=0
				#sh /usr/lcmb_t120_scrpit/setup_boot.sh back		
			
			elif [ "$boot_var" ] && [ $boot_var = $var_b ] ; then


				syslog_sh "$shell_name: rootfs_b is running, begin upgrade rootfs_a..."
				
				#升级uboot
				#echo "FOU Version, ubiupdatevol u-boot_a to U-BOOT..."
				#ubiupdatevol /dev/ubi0_0 u-boot_a
				#升级内核
				syslog_sh "FOU Version, ubiupdatevol fit_a.itb to KERNEL..."
				#ubiupdatevol /dev/ubi0_2 /tmp/fit_a.itb
				#升级FPGA
				#echo "FOU Version, ubiupdatevol term_top_a.bin to FPGA..."			
				#ubiupdatevol /dev/ubi0_4 term_top_a.bin
				#升级文件系统
				syslog_sh "FOU Version, ubiupdatevol rootfs_a.squashfs to ROOTFS..."		
				#ubiupdatevol /dev/ubi0_6 /tmp/rootfs_a.squashfs

				
#				flashcp -v /rcst/rcst_drv/BOOT.bin /dev/mtd0

				rm -rf /mmc1/image_a.ub
				cp  /mmc2/image.ub  /mmc1/image_a.ub

				sync
				rm -rf /mmc2/image.ub	
				rm -rf /mmc2/fou_md5sum
				rm -rf /mmc2/upgrade_check.sh					
				var=0
				#sh /usr/lcmb_t120_scrpit/setup_boot.sh main								
				
			else	
				syslog_sh "$shell_name: fw_printenv bootcmd error ..."
				uci set update.update.process=-3
				uci commit update			
			fi

			fw_setenv kernel_boot_succ "no"
					
			sync

			if [ "$var = 0" ]; then
				echo 0 > /mnt/first_install
	#			sh /tmp/upgrade_check.sh

				sync

				uci set update.update.process=1
				uci commit update
					
				uci set sys_monitor.sys_reboot.sys_upgrade_reboot_flag=1
				uci commit sys_monitor
				uci delete network.lan.type
				uci commit network
				syslog_sh "$shell_name: upgrade success, rebooting..."
				uci set dropbear.@dropbear[0].RootPasswordAuth='on'
				uci set dropbear.@dropbear[0].PasswordAuth='on'
				uci commit dropbear
				reboot -d 10 & > /dev/null
				syslog_sh "$shell_name: upgrade success, reboot -d 10"
			fi
		
			syslog_sh "upgrade end ..."
				
#<<<<<<< HEAD
			else
				syslog_sh "$shell_name: upgrade failed, md5sum check failed ..."
				uci set update.update.process=-4
					uci commit update
			fi
			else	
				syslog_sh "$shell_name: rcst_xph_type are different, can not upgrade..."
				uci set update.update.process=-6
				uci commit update
			fi
#=======
		else
			syslog_sh "$shell_name: upgrade failed, md5sum check failed ..."
			uci set update.update.process=-4
			uci commit update
		fi
		rm /mmc2/rcst_xph_version
	else	
	syslog_sh "$shell_name: rcst_xph_type are different, can not upgrade..."
	uci set update.update.process=-6
	uci commit update			
	fi	
#>>>>>>> 4613eb84fb4d7f765d2efe01eaf72110b10b1664
else	
	syslog_sh "$shell_name: upgrade failed, upgrade file download failed ..."
	uci set update.update.process=-3
	uci commit update			
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

#~ rm -rf /tmp/*firmware* > /dev/null
