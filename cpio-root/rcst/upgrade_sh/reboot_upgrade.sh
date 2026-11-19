#!/bin/bash
syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info reboot_upgrade"[$(ps | grep reboot_upgrade.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}
shell_name="SDDP_upgrade" 
filename=$(uci get update.update.upgradefilename)
if [ $(uci get update.update.method) = 1 ] ; then
	cd /mnt/
	if [ -f $filename ] ; then
    cp $filename /mmc2 
	cd /mmc2/
	if [ -f $filename ] ; then 
		syslog_sh "$shell_name: upgrade file download success, check file md5sum ..."
		tar -zxvf $filename > /dev/null
		if	 [ "$filename" = "mesh_dsp.tar.gz" ] ; then 
			#校验
			var1=$(md5sum dsp_upgrade.tar.gz | awk '{print $1}')
			var2=$(cat dsp_md5sum | awk '{print $1}')

			if [ $var1 = $var2 ] && [ "$var2" ] ; then
				echo 'md5sum check equal!'
				syslog_sh "$shell_name: md5sum check sucess ..."
				tar -zxvf dsp_upgrade.tar.gz > /dev/null
				
				#调用升级脚本
				sh ./dsp_upgrade.sh
				
				if [ -f /mmc2/dsp_upgrade_status ]	; then	
					DSP_STATUS=$(cat /mmc2/dsp_upgrade_status | awk '{print $1}')
					echo  DSP_STATUS= $DSP_STATUS						
					if [ "$DSP_STATUS" = "0" ] ; then
					  echo 'dsp upgrade success!'
						syslog_sh "dsp upgrade success!!!"						
						uci set update.update.process=1
						uci commit update
						#20s后重启
						#reboot -f -d 20 &
						uci set dropbear.@dropbear[0].RootPasswordAuth='on'
						uci set dropbear.@dropbear[0].PasswordAuth='on'
						uci commit dropbear
						reboot -f -d 10 & > /dev/null
						syslog_sh "$shell_name: upgrade success, rebooting..."
					else
						echo 'dsp upgrade fail!'
						syslog_sh "dsp upgrade fail!!"					
						uci set update.update.process=-1
						uci commit update
					fi
				else
					echo 'dsp_upgrade_status not exist!'
					syslog_sh "dsp_upgrade_status not exist!"			
					uci set update.update.process=-1
					uci commit update
				fi
				uci set sys_monitor.sys_reboot.sys_nms_reboot_flag=1
				uci commit sys_monitor					
				sync
				rm $1
				rm /mnt/$1 
				rm /mmc2/$1			
		
			else
				syslog_sh "$shell_name: md5sum check failed ..."
			fi
		else
			#校验
			var1=$(md5sum software_upgrade.tar.gz | awk '{print $1}')
			var2=$(cat software_md5sum | awk '{print $1}')

			if [ $var1 = $var2 ] && [ "$var2" ] ; then
				echo 'md5sum check equal!'
				syslog_sh "$shell_name: md5sum check sucess ..."
				tar -zxvf software_upgrade.tar.gz > /dev/null

				var_a="boot_a"
				var_b="boot_b"		
				boot_var=$(fw_printenv bootcmd | awk '{print $2}')
					
				if [ "$boot_var" ] && [ $boot_var = $var_a ] ; then

					syslog_sh "$shell_name: rootfs_a is running, begin upgrade rootfs_b..."
					
					#升级内核
					syslog_sh "FOU Version, ubiupdatevol fit_b.itb to KERNEL-SPARE..."
					#ubiupdatevol /dev/ubi0_3 /tmp/fit_b.itb

					#升级文件系统
					syslog_sh "FOU Version, ubiupdatevol rootfs_b.squashfs to ROOTFS-SPARE..."		
					#ubiupdatevol /dev/ubi0_7 /tmp/rootfs_a.squashfs
					rm -rf /mmc1/image_b.ub
					cp  /mmc2/image.ub  /mmc1/image_b.ub
					cp  /mmc2/image.ub  /mmc1/image_a.ub					
					sync
					sleep 1
					rm -rf /mmc2/image.ub
					rm -rf /mmc2/software_upgrade.tar.gz
					rm -rf /mmc2/software_md5sum	
					rm -rf /mmc2/fou_md5sum
					rm -rf /mmc2/upgrade_check.sh						
					sync						
					var=0
					#sh /usr/lcmb_t120_scrpit/setup_boot.sh back		
					
				elif [ "$boot_var" ] && [ $boot_var = $var_b ] ; then


					syslog_sh "$shell_name: rootfs_b is running, begin upgrade rootfs_a..."
						
					#升级内核
					syslog_sh "FOU Version, ubiupdatevol fit_a.itb to KERNEL..."
					#ubiupdatevol /dev/ubi0_2 /tmp/fit_a.itb

					#升级文件系统
					syslog_sh "FOU Version, ubiupdatevol rootfs_a.squashfs to ROOTFS..."		
					#ubiupdatevol /dev/ubi0_6 /tmp/rootfs_a.squashfs
					rm -rf /mmc1/image_a.ub
					cp  /mmc2/image.ub  /mmc1/image_a.ub
					cp  /mmc2/image.ub  /mmc1/image_b.ub
					sync
					sleep 1
					rm -rf /mmc2/image.ub
					rm -rf /mmc2/software_upgrade.tar.gz
					rm -rf /mmc2/software_md5sum	
					rm -rf /mmc2/fou_md5sum
					rm -rf /mmc2/upgrade_check.sh	
					sync						
								
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
#					sh /tmp/upgrade_check.sh
					uci set update.update.process=1
					uci commit update
					uci delete network.lan.type
					uci commit network		
					uci set sys_monitor.sys_reboot.sys_nms_upgrade_reboot_flag=1
					uci commit sys_monitor

					syslog_sh "$shell_name: upgrade success, rebooting..."
					rm -rf  $filename
					rm -rf /mnt/$filename
					rm -rf /mmc2/$filename
					sync
					uci set dropbear.@dropbear[0].RootPasswordAuth='on'
					uci set dropbear.@dropbear[0].PasswordAuth='on'
					uci commit dropbear					
					reboot -f -d 10 & > /dev/null
				fi
				
				syslog_sh "upgrade end ..."

			else
				syslog_sh "$shell_name: md5sum check failed ..."
			fi
		fi	
	else
		syslog_sh "$shell_name:$filename not exist ..."
	fi
else
	syslog_sh "$shell_name:$filename not exist ..."
fi
uci set update.update.method=0	
uci commit update
fi
#~ cd /mnt/
#~ SDDP_upgrade &	
