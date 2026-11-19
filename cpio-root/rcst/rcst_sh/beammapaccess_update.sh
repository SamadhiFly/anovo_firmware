#!/bin/bash
syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info beammapaccess_update"[$(ps | grep beammapaccess_update.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}
shell_name="beammapaccess_update" 
versionname=$(uci get beamaccsss_config.beamaccsss_config.mapaccess_version)
#file_name="system_conf_$versionname.tar.gz"
#rm /rcst/rcst_sh/access_carrier_config.xml
#rm /rcst/rcst_sh/beam_map.xml
#rm /rcst/rcst_sh/beam
file_name_sigsystem="system_conf.tar.gz"
file_name_duosystem="system_conf_$versionname.tar.gz"
beamaccsss_map_isnot_dbs=0
accesssourceupgrade_result=0
mapsourceupgrade_result=0

if [ "$( uci get beamaccsss_config.beamaccsss_config.data_office_hf  | wc -l)" -ne "0" ]; then
	data_office_hf=$(uci get beamaccsss_config.beamaccsss_config.data_office_hf)
	cd /rcst/rcst_app;./sm4_test $data_office_hf de
	smdata_office_hf=$(cat /tmp/sm_txt)
	rm /tmp/sm_txt
else
	syslog_sh "$shell_name:read beamaccsss_config.beamaccsss_config.data_office_hf error"
fi

if [  -s "/tmp/$file_name_sigsystem" ] || [  -s "/mnt/$file_name_sigsystem" ];then
	beamaccsss_map_isnot_dbs=0
	uci set beamaccsss_config.beamaccsss_config.beamaccsss_map_isnot_dbs_flag=0;uci commit beamaccsss_config
	file_name="$file_name_sigsystem"
	syslog_sh "file_name:$file_name_sigsystem"
fi
if [  -s "/tmp/$file_name_duosystem" ] || [  -s "/mnt/$file_name_duosystem" ];then
	beamaccsss_map_isnot_dbs=1
	uci set beamaccsss_config.beamaccsss_config.beamaccsss_map_isnot_dbs_flag=1;uci commit beamaccsss_config
	file_name="$file_name_duosystem"
	syslog_sh "file_name:file_name_duosystem"
else
	if [ "$(ls /mnt |grep  system_conf | wc -l)" != 0 ];then
		if [ "$(ls /mnt |grep  system_conf_ | wc -l)" != 0 ];then
			beamaccsss_map_isnot_dbs=1
			uci set beamaccsss_config.beamaccsss_config.beamaccsss_map_isnot_dbs_flag=1;uci commit beamaccsss_config
			uci set beamaccsss_config.beamaccsss_config.mapaccess_version=$(ls /mnt |grep  system_conf_ | sed -n 1p | awk -F[_.] '{print $3}');uci commit beamaccsss_config
			file_name="$(ls |grep  system_conf_ | sed -n 1p)"
		else
			beamaccsss_map_isnot_dbs=0
			uci set beamaccsss_config.beamaccsss_config.beamaccsss_map_isnot_dbs_flag=0;uci commit beamaccsss_config
			file_name="$file_name_sigsystem"
		fi
	syslog_sh "because file_name_duosystem not exit but system_conf exit so config"
	else
		file_name="$file_name_duosystem"
	fi
fi	

uci set beamaccsss_config.beamaccsss_config.beammapaccess_flag=3;uci commit beamaccsss_config

	#rm -rf /mnt/*system_conf*
	#rm /mnt/$file_name
	rm -rf /mnt/system_conf*.tar.gz
	cp /tmp/$file_name /mnt
	if [ ! -d "/mnt/xml_back" ]; then
		mkdir -p /mnt/xml_back
	fi	
	cd /mnt/
	if [ -f $file_name ] ; then 
	if [ "$beamaccsss_map_isnot_dbs" == 1 ];then
		rm /mnt/*access_carrier_config.xml*
		rm /mnt/*beam_map.xml*
		chmod 750 /mnt/$file_name
		unzip -P $smdata_office_hf /mnt/$file_name > /dev/null
		rm -rf /tmp/*system_conf*
		
		mapsource_num=$(ls /mnt | grep "beam_map.xml.md5" | wc -l)
		accesssource_num=$(ls /mnt | grep "access_carrier_config.xml.md5" | wc -l)
		if [ $mapsource_num = "0" ] && [ $accesssource_num = "0" ]; then

		
			uci set beamaccsss_config.beamaccsss_config.beammapaccess_flag=2;uci commit beamaccsss_config
		
			rm /mnt/*access_carrier_config.xml*
			rm /mnt/*beam_map.xml*	
			syslog_sh "$shell_name:$file_name tar failed or ftp failed"
		
		else                            

				i=0                                                                                                                 
				while [[ "$i" -lt "$accesssource_num" ]]                                                                                
				do
					let "i=i+1"	                                                                                                                  
					access_carrier_config_name=$(ls /mnt | grep "access_carrier_config.xml" | grep -v md5 | sed -n "$i p")
					access_carrier_config_md5_name="$access_carrier_config_name.md5"
					
					if  [  -f "/mnt/$access_carrier_config_md5_name" ]; then
						access_carrier_xml_md5=$(md5sum /mnt/$access_carrier_config_name | awk '{print $1}')
						access_carrier_file_md5=$(cat /mnt/$access_carrier_config_md5_name | tr A-Z a-z)
						if [ $access_carrier_xml_md5 = $access_carrier_file_md5 ] ; then							
							accesssourceupgrade_result=0
						else
							accesssourceupgrade_result=1
							syslog_sh "$shell_name: access_carrier_config $access_carrier_config_name md5sum check failed ..."
						fi	
						rm -rf /mnt/*access_carrier_config.xml.md5											
					fi				
					if  [ $accesssourceupgrade_result = "1" ]; then
						syslog_sh "$shell_name: beam md5sum check failed ..."
						break;
						fi																																																		 
				done   
				
				i=0                                                                                                                 
				while [[ "$i" -lt "$mapsource_num" ]]                                                                                
				do
					let "i=i+1"	                                                                                                                  			
					beam_name=$(ls /mnt | grep "beam_map.xml" | grep -v md5 | sed -n "$i p")
					beam_md5_name="$beam_name.md5"
					if  [  -f "/mnt/$beam_md5_name" ]; then
						beammap_xml_md5=$(md5sum /mnt/$beam_name | awk '{print $1}')
						beammap_file_md5=$(cat /mnt/$beam_md5_name | tr A-Z a-z)
						if [ $beammap_xml_md5 = $beammap_file_md5 ] ; then
							mapsourceupgrade_result=0
						else
							mapsourceupgrade_result=1
							syslog_sh "$shell_name: beam $beam_name md5sum check failed ..."
						fi	
						rm -rf /mnt/*beam_map.xml.md5											
					fi	
					if  [ $mapsourceupgrade_result = "1" ]; then
						syslog_sh "$shell_name: access_carrier_config md5sum check failed ..."
						break;
					fi																																																		 
				done  
				if  [ $accesssourceupgrade_result = "0" ] && [  $mapsourceupgrade_result = "0" ] ; then
					
					#rm /mnt/*access_carrier_config.xml*
					#rm /mnt/*beam_map.xml*	
					rm /mnt/*_beam
					rm /mnt/beam
					rm /mnt/*ab_info*		
					#rm /mnt/access_carrier_config.xml
					#rm /mnt/beam_map.xml
					rm /mnt/*b_info*	
					
					rm /mnt/xml_back/*
					cp /mnt/$file_name /mnt/xml_back/
					
					uci set beamaccsss_config.beamaccsss_config.beammapaccess_flag=1;uci commit beamaccsss_config
										
				else
					
					uci set beamaccsss_config.beamaccsss_config.beammapaccess_flag=2;uci commit beamaccsss_config
					
					syslog_sh "$shell_name: access_carrier_config or beam md5sum check failed ..."
				fi	


				chmod 755 /mnt/*b_info*	
				chmod 755 /mnt/*ab_info*	
				chmod 755 /mnt/xml_back/*							
		fi
	
	else

			rm /mnt/*access_carrier_config.xml*
			rm /mnt/*beam_map.xml*
		
			unzip /mnt/$file_name > /dev/null
			#rm -rf /tmp/*system_conf*
			if [ ! -f "/mnt/access_carrier_config.xml" ] && [ ! -f "/mnt/beam_map.xml" ] && [ ! -f "/mnt/access_carrier_config.xml.md5" ] && [ ! -f "/mnt/beam_map.xml.md5" ]; then
			
				uci set beamaccsss_config.beamaccsss_config.beammapaccess_flag=2;uci commit beamaccsss_config
				
				syslog_sh "$shell_name:$file_name tar failed ..."

		else
			syslog_sh "$shell_name: upgrade file download success, check file md5sum ..."
			

			
			if  [  -f "/mnt/access_carrier_config.xml" ]; then
				access_carrier_xml_md5=$(md5sum /mnt/access_carrier_config.xml | awk '{print $1}')
				access_carrier_file_md5=$(cat /mnt/access_carrier_config.xml.md5 | tr A-Z a-z)
				if [ $access_carrier_xml_md5 = $access_carrier_file_md5 ] && [ "$access_carrier_file_md5" ] ; then
					echo 'md5sum check equal!'
					syslog_sh "$shell_name: md5sum check sucess ..."
					#调用升级脚本
					if [ ! -f "/mnt/access_carrier_config.xml" ]; then
						rm /mnt/access_carrier_config.xml
					fi
					accesssourceupgrade_result=0
				else
					accesssourceupgrade_result=1

					syslog_sh "$shell_name: access_carrier_config md5sum check failed ..."
				fi
				rm -rf /mnt/*access_carrier_config.xml.md5	
			fi
			
			if  [  -f "/mnt/beam_map.xml" ]; then
				beammap_xml_md5=$(md5sum /mnt/beam_map.xml | awk '{print $1}')
				beammap_file_md5=$(cat /mnt/beam_map.xml.md5 | tr A-Z a-z)

				if [ $beammap_xml_md5 = $beammap_file_md5 ] && [ "$beammap_file_md5" ] ; then
					echo 'md5sum check equal!'
					syslog_sh "$shell_name: md5sum check sucess ..."
					#调用升级脚本
					if [ ! -f "/mnt/beam_map.xml" ]; then
						rm /mnt/beam_map.xml
					fi
					mapsourceupgrade_result=0
				else
					mapsourceupgrade_result=1
					syslog_sh "$shell_name: beam_map md5sum check failed ..."
				fi
				rm -rf /mnt/*beam_map.xml.md5	
			fi
	
				if  [ $accesssourceupgrade_result = "0" ] && [  $mapsourceupgrade_result = "0" ] ; then
					
					#rm /mnt/*access_carrier_config.xml*
					#rm /mnt/*beam_map.xml*	
					rm /mnt/*_beam
					rm /mnt/beam
					rm /mnt/*ad_info*		
					#rm /mnt/access_carrier_config.xml
					#rm /mnt/beam_map.xml
					rm /mnt/*b_info*	
					
					rm /mnt/xml_back/*
					cp /mnt/$file_name /mnt/xml_back/
					
					uci set beamaccsss_config.beamaccsss_config.beammapaccess_flag=1;uci commit beamaccsss_config	
							
				else
					
					uci set beamaccsss_config.beamaccsss_config.beammapaccess_flag=2;uci commit beamaccsss_config
					
					syslog_sh "$shell_name: access_carrier_config or beam md5sum check failed ..."
				fi	
				chmod 755 /mnt/*b_info*	
				chmod 755 /mnt/*ab_info*	
				chmod 755 /mnt/xml_back/*
		fi
	fi
		#校验
	
	
else
	
	uci set beamaccsss_config.beamaccsss_config.beammapaccess_flag=2;uci commit beamaccsss_config
	
	syslog_sh "$shell_name:$file_name not exist ..."
fi
