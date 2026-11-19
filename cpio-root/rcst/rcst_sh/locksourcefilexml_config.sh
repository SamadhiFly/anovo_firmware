#!/bin/bash
syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info locksourcefilexml_config"[$(ps | grep locksourcefilexml_config.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}
localfile_name=$1
shell_name="locksourcefilexml_config"
#terminal_locksource="terminal_locksource.tar.gz"
terminal_odu_conffile_name=$(ls -l /tmp | grep "terminal_odu_conf_" | awk '{print $9}' | wc -l)
odufile_name="odu_conf.tar.gz"
terminal_locksource_odu_flag=0

if [ "$terminal_odu_conffile_name" != 0 ];then
	terminal_locksource_odu_flag=2
	file_name=$(ls -l /tmp | grep "terminal_odu_conf_" | awk '{print $9}')
	syslog_sh "file_name:$file_name"
fi
if [  -s "/tmp/$localfile_name" ];then
	terminal_locksource_odu_flag=1
	file_name=$localfile_name
	syslog_sh "file_name:$file_name"
fi
	

syslog_sh "$shell_name:$file_name start config xml terminal_locksource_odu_flag(1:locallocksource 2:nmslocksource):$terminal_locksource_odu_flag..."
uci set anybeam_config.anybeam_config.locksourcefile_update=0;uci commit anybeam_config
cd /tmp/
if [ -f $file_name ] ; then

	#网管生成文件
	if [ "$terminal_locksource_odu_flag" == 2 ];then
		rm /tmp/$odufile_name
		rm /tmp/antenna.xml*
		rm /tmp/buc.xml*
		rm /tmp/lnb.xml*
		rm /tmp/odu.xml*
		rm -rf /tmp/*system_conf*
		unzip -o /tmp/$file_name > /dev/null
		
		system_conf_name=$(ls -l /tmp | grep "system_conf_" | awk '{print $9}')
		
		if [ -f $odufile_name ] && [ -f $system_conf_name ]; then
			syslog_sh "$shell_name:unzip $file_name success..."
			#将上传的地图文件版本号写入
			system_conf_name_version=$(ls -l /tmp | grep "system_conf_" | awk -F[_] '{print $3}' | awk -F[.] '{print $1}')
			uci set beamaccsss_config.beamaccsss_config.mapaccess_version="$system_conf_name_version"
			uci commit beamaccsss_config
			syslog_sh "$shell_name:$file_name write mapaccess_version:$system_conf_name_version success..."
			#解析odu配置
			unzip -o /tmp/$odufile_name > /dev/null
			if [  -f "/tmp/antenna.xml" ] && [  -f "/tmp/antenna.xml.md5" ] && [  -f "/tmp/buc.xml" ] && [  -f "/tmp/buc.xml.md5" ] && [  -f "/tmp/lnb.xml" ] && [  -f "/tmp/lnb.xml.md5" ] && [  -f "/tmp/odu.xml" ] && [  -f "/tmp/odu.xml.md5" ]; then
			
				antenna_xml_md5=$(md5sum /tmp/antenna.xml | awk '{print $1}')
				antenna_file_md5=$(cat /tmp/antenna.xml.md5 | tr A-Z a-z)
				buc_xml_md5=$(md5sum /tmp/buc.xml | awk '{print $1}')
				buc_file_md5=$(cat /tmp/buc.xml.md5 | tr A-Z a-z)
				lnb_xml_md5=$(md5sum /tmp/lnb.xml | awk '{print $1}')
				lnb_file_md5=$(cat /tmp/lnb.xml.md5 | tr A-Z a-z)		
				odu_xml_md5=$(md5sum /tmp/odu.xml | awk '{print $1}')
				odu_file_md5=$(cat /tmp/odu.xml.md5 | tr A-Z a-z)						
				if [ $antenna_xml_md5 = $antenna_file_md5 ] && [ "$antenna_file_md5" ] && [ $buc_xml_md5 = $buc_file_md5 ] && [ "$buc_file_md5" ] && [ $lnb_xml_md5 = $lnb_file_md5 ] && [ "$lnb_file_md5" ]  && [ $odu_xml_md5 = $odu_file_md5 ] && [ "$odu_file_md5" ]; then
				
					syslog_sh "$shell_name:$file_name unzip $odufile_name success... start write ANT_RF_config and odu"
					if [ ! -f "/etc/config/ANT_RF_config" ]; then
						touch /etc/config/ANT_RF_config

						uci set ANT_RF_config.ANT=ANT_RF_resource
						uci commit ANT_RF_config
					else
						if [ $(uci show ANT_RF_config  | grep "ANT_RF_config.ANT=ANT_RF_resource" | wc -l) == "0" ]; then
							uci set ANT_RF_config.ANT=ANT_RF_resource
							uci commit ANT_RF_config
						fi	
					fi
					uci set ANT_RF_config.ANT.seekstar='1'
					uci commit ANT_RF_config

					antennaxml_file="antenna.xml"		
					antenna_type=$(awk '/<\/*antenna_type\/*>/{gsub(/[[:space:]]*<\/*antenna_type\/*>/,"");print $0}' /tmp/$antennaxml_file)
					if  [  $antenna_type == "fixed" ]; then
						uci set ANT_RF_config.ANT.antenna_type="fix"
						uci set satellite_config.satellite_antenna.antenna_type="fix"
					elif [ $antenna_type == "static" ];then
						uci set ANT_RF_config.ANT.antenna_type="static"
						uci set satellite_config.satellite_antenna.antenna_type="static"
					elif [ $antenna_type == "move" ];then				
						uci set ANT_RF_config.ANT.antenna_type="move"
						uci set satellite_config.satellite_antenna.antenna_type="move"
					fi

					
					antenna_manufacturer=$(awk '/<\/*antenna_manufacturer\/*>/{gsub(/[[:space:]]*<\/*antenna_manufacturer\/*>/,"");print $0}' /tmp/$antennaxml_file)
					uci set ANT_RF_config.ANT.antenna_manufacture="$antenna_manufacturer"
					
					modem_ip=$(awk '/<\/*modem_ip\/*>/{gsub(/[[:space:]]*<\/*modem_ip\/*>/,"");print $0}' /tmp/$antennaxml_file)
					uci set ANT_RF_config.ANT.src_ip="$modem_ip"

					acu_ip=$(awk '/<\/*acu_ip\/*>/{gsub(/[[:space:]]*<\/*acu_ip\/*>/,"");print $0}' /tmp/$antennaxml_file)
					uci set ANT_RF_config.ANT.dst_ip="$acu_ip"

					acu_port=$(awk '/<\/*acu_port\/*>/{gsub(/[[:space:]]*<\/*acu_port\/*>/,"");print $0}' /tmp/$antennaxml_file)
					uci set ANT_RF_config.ANT.port="$acu_port"
					
					antenna_roll_off=$(awk '/<\/*antenna_roll_off\/*>/{gsub(/[[:space:]]*<\/*antenna_roll_off\/*>/,"");print $0}' /tmp/$antennaxml_file)
					if  [  $antenna_roll_off == "no" ]; then
						uci set satellite_config.satellite.rolloff="100"
					elif [ $antenna_roll_off == "0.05" ];then
						uci set satellite_config.satellite.rolloff="105"
					elif [ $antenna_roll_off == "0.1" ];then
						uci set satellite_config.satellite.rolloff="110"
					elif [ $antenna_roll_off == "0.15" ];then
						uci set satellite_config.satellite.rolloff="115"
					elif [ $antenna_roll_off == "0.2" ];then
						uci set satellite_config.satellite.rolloff="120"
					elif [ $antenna_roll_off == "0.25" ];then
						uci set satellite_config.satellite.rolloff="125"
					elif [ $antenna_roll_off == "0.35" ];then
						uci set satellite_config.satellite.rolloff="135"
					fi
				

					
					lnbxml_file="lnb.xml"							
					lnb_24V_switch=$(awk '/<\/*lnb_24V_switch\/*>/{gsub(/[[:space:]]*<\/*lnb_24V_switch\/*>/,"");print $0}' /tmp/$lnbxml_file)
					if  [  $lnb_24V_switch == "true" ]; then
						uci set odu.switch.lnb_en="1"
						uci commit odu
					elif [ $lnb_24V_switch == "false" ];then
						uci set odu.switch.lnb_en="0"
						uci commit odu
					fi
					lnb_10MHz_switch=$(awk '/<\/*lnb_10MHz_switch\/*>/{gsub(/[[:space:]]*<\/*lnb_10MHz_switch\/*>/,"");print $0}' /tmp/$lnbxml_file)
					if  [  $lnb_10MHz_switch == "true" ]; then
						uci set odu.switch.odu_10m_en="1"
						uci commit odu
					elif [ $lnb_10MHz_switch == "false" ];then
						uci set odu.switch.odu_10m_en="0"
						uci commit odu
					fi
					lnb_loop_count=$(awk '/<\/*lnb_loop_count\/*>/{gsub(/[[:space:]]*<\/*lnb_loop_count\/*>/,"");print $0}' /tmp/$lnbxml_file)
					if  [  $lnb_loop_count == "1" ]; then
						uci set ANT_RF_config.ANT.LNB_type='1'
						uci set ANT_RF_config.ANT.LNB_count='1'
					elif [ $lnb_loop_count == "2" ];then
						uci set ANT_RF_config.ANT.LNB_type='2'
						uci set ANT_RF_config.ANT.LNB_count='2'
					elif [ $lnb_loop_count == "4" ];then
						uci set ANT_RF_config.ANT.LNB_type='4'
						uci set ANT_RF_config.ANT.LNB_count='4'
					fi

					lnb_loop_count_i=0
					while [[ "$lnb_loop_count_i" -lt "$lnb_loop_count" ]]
					do 
						let "lnb_loop_count_i+=1"

						lnb_LO_temp=$(awk '/<\/*lnb_L.O.\/*>/{gsub(/[[:space:]]*<\/*lnb_L.O.\/*>/,"");print $0}' /tmp/$lnbxml_file | sed -n "$lnb_loop_count_i"p)
						lnb_LO=$(echo "$lnb_LO_temp 1000" | awk '{printf("%d\n",$1*$2)}')
						uci set ANT_RF_config.ANT.LNB_freq"$lnb_loop_count_i"="$lnb_LO"

						lnb_startFreq_temp=$(awk '/<\/*lnb_startFreq\/*>/{gsub(/[[:space:]]*<\/*lnb_startFreq\/*>/,"");print $0}' /tmp/$lnbxml_file | sed -n "$lnb_loop_count_i"p)
						lnb_startFreq=$(echo "$lnb_startFreq_temp 1000" | awk '{printf("%d\n",$1*$2)}')
						uci set ANT_RF_config.ANT.LNB_start"$lnb_loop_count_i"="$lnb_startFreq"

						lnb_endFreq_temp=$(awk '/<\/*lnb_endFreq\/*>/{gsub(/[[:space:]]*<\/*lnb_endFreq\/*>/,"");print $0}' /tmp/$lnbxml_file | sed -n "$lnb_loop_count_i"p)
						lnb_endFreq=$(echo "$lnb_endFreq_temp 1000" | awk '{printf("%d\n",$1*$2)}')
						uci set ANT_RF_config.ANT.LNB_end"$lnb_loop_count_i"="$lnb_endFreq"

						#1:13V-open/22k-close 2:13V-open/22k-open 3:18V-open/22k-close 4:18V-open/22k-open
						mode=$(awk '/<\/*mode\/*>/{gsub(/[[:space:]]*<\/*mode\/*>/,"");print $0}' /tmp/$lnbxml_file | sed -n "$lnb_loop_count_i"p)
						if [  $mode == "no" ]; then
							uci set ANT_RF_config.ANT.LNB_13V18V_flag"$lnb_loop_count_i"='0'
						elif  [  $mode == "13V-ON/22K-OFF" ]; then
							uci set ANT_RF_config.ANT.LNB_13V18V_flag"$lnb_loop_count_i"='1'
						elif [  $mode == "13V-ON/22K-ON" ]; then
							uci set ANT_RF_config.ANT.LNB_13V18V_flag"$lnb_loop_count_i"='2'
						elif [  $mode == "18V-ON/22K-OFF" ]; then
							uci set ANT_RF_config.ANT.LNB_13V18V_flag"$lnb_loop_count_i"='3'
						elif [  $mode == "18V-ON/22K-ON" ]; then
							uci set ANT_RF_config.ANT.LNB_13V18V_flag"$lnb_loop_count_i"='4'
						fi

					done				

					bucxml_file="buc.xml"
								
					buc_24V_switch=$(awk '/<\/*buc_24V_switch\/*>/{gsub(/[[:space:]]*<\/*buc_24V_switch\/*>/,"");print $0}' /tmp/$bucxml_file)
					if  [  $buc_24V_switch == "true" ]; then
					uci set odu.switch.buc_en="1"
					uci commit odu
					elif [ $buc_24V_switch == "false" ];then
					uci set odu.switch.buc_en="0"
					uci commit odu
					fi
					buc_loop_count=$(awk '/<\/*buc_loop_count\/*>/{gsub(/[[:space:]]*<\/*buc_loop_count\/*>/,"");print $0}' /tmp/$bucxml_file)
					if  [  $buc_loop_count == "1" ]; then
						uci set ANT_RF_config.ANT.BUC_type='1'
						uci set ANT_RF_config.ANT.BUC_count='1'
					elif [ $lnb_loop_count == "2" ];then
						uci set ANT_RF_config.ANT.BUC_type='2'
						uci set ANT_RF_config.ANT.BUC_count='2'
					elif [ $lnb_loop_count == "4" ];then
						uci set ANT_RF_config.ANT.BUC_type='4'
						uci set ANT_RF_config.ANT.BUC_count='4'
					fi
					buc_loop_count_i=0
					while [[ "$buc_loop_count_i" -lt "$buc_loop_count" ]]
					do 
						let "buc_loop_count_i+=1"
						buc_LO_temp=$(awk '/<\/*buc_L.O.\/*>/{gsub(/[[:space:]]*<\/*buc_L.O.\/*>/,"");print $0}' /tmp/$bucxml_file | sed -n "$buc_loop_count_i"p)
						buc_LO=$(echo "$buc_LO_temp 1000" | awk '{printf("%d\n",$1*$2)}')
						uci set ANT_RF_config.ANT.BUC_freq"$buc_loop_count_i"="$buc_LO"
						
						buc_startFreq_temp=$(awk '/<\/*buc_startFreq\/*>/{gsub(/[[:space:]]*<\/*buc_startFreq\/*>/,"");print $0}' /tmp/$bucxml_file | sed -n "$buc_loop_count_i"p)
						buc_startFreq=$(echo "$buc_startFreq_temp 1000" | awk '{printf("%d\n",$1*$2)}')
						uci set ANT_RF_config.ANT.BUC_start"$buc_loop_count_i"="$buc_startFreq"
						
						buc_endFreq_temp=$(awk '/<\/*buc_endFreq\/*>/{gsub(/[[:space:]]*<\/*buc_endFreq\/*>/,"");print $0}' /tmp/$bucxml_file | sed -n "$buc_loop_count_i"p)
						buc_endFreq=$(echo "$buc_endFreq_temp 1000" | awk '{printf("%d\n",$1*$2)}')
						uci set ANT_RF_config.ANT.BUC_end"$buc_loop_count_i"="$buc_endFreq"
					done			
					
					uci set satellite_config.satellite.port="$acu_port"				
					uci set satellite_config.satellite.dst_ip="$acu_ip"
					uci set satellite_config.satellite.src_ip="$modem_ip"
					uci set satellite_config.satellite_antenna.antenna_manufacture="$antenna_manufacturer"
					uci set satellite_config.satellite_antenna.antenna_name='ANT'
					uci commit satellite_config					
					uci commit ANT_RF_config
					
					oduxml_file="odu.xml"
					init_transmit_power=$(awk '/<\/*init_transmit_power\/*>/{gsub(/[[:space:]]*<\/*init_transmit_power\/*>/,"");print $0}' /tmp/$oduxml_file)
					uci set rf_tx.rf_tx_config.tx_power="$init_transmit_power"

					max_transmit_power=$(awk '/<\/*max_transmit_power\/*>/{gsub(/[[:space:]]*<\/*max_transmit_power\/*>/,"");print $0}' /tmp/$oduxml_file)
					uci set rf_tx.rf_tx_config.tx_max_power="$max_transmit_power"
					uci commit rf_tx
					
				else
					uci set anybeam_config.anybeam_config.locksourcefile_update=1;uci commit anybeam_config
					syslog_sh "$shell_name:$odufile_name antenna.xml or buc.xml  or lnb.xml md5 check faild ..."	
				
				fi
						
			
			else
				uci set anybeam_config.anybeam_config.locksourcefile_update=1;uci commit anybeam_config
				syslog_sh "$shell_name:$odufile_name antenna.xml buc.xml lnb.xml not exist ..."
			
			fi
			
			sh /rcst/rcst_sh/beammapaccess_update.sh > /dev/null
			uci set anybeam_config.anybeam_config.locksourcefile_update=2;uci commit anybeam_config
			syslog_sh "$shell_name:$system_conf_name or $odufile_name conf success please wait reset..."
			uci set anybeam_config.anybeam_config.config_reset_flag=1
			uci commit anybeam_config
			rm /tmp/$file_name
		
		else
			uci set anybeam_config.anybeam_config.locksourcefile_update=1;uci commit anybeam_config
			syslog_sh "$shell_name:$system_conf_name or $odufile_name not exist ..."
		fi
	elif [ "$terminal_locksource_odu_flag" == 1 ];then #本地生成文件
		rm /mnt/*access_carrier_config.xml*
		rm /mnt/*beam_map.xml*	
		rm /mnt/*_beam		
		rm /mnt/access_carrier_config.xml
		rm /mnt/beam_map.xml
		rm /mnt/beam	
		rm /etc/config/anybeam_info*	
		rm /tmp/*access_carrier_config.xml*
		rm /tmp/*beam_map.xml*	
		if [ "$file_name" == "terminal_locksource.tar.gz" ];then 
			tar -zxvf  /tmp/$file_name > /dev/null
		else
			unzip -o /tmp/$file_name > /dev/null
		fi
		
		cp -rf /tmp/*access_carrier_config.xml* /mnt
		cp -rf /tmp/*beam_map.xml* /mnt
		
		cp -rf /tmp/ANT_RF_config  /etc/config/
		cp -rf /tmp/backup_lockfreq /etc/config/
		cp -rf /tmp/odu  /etc/config/
		cp -rf /tmp/rf_rx  /etc/config/
		cp -rf /tmp/rf_tx /etc/config/
		cp -rf /tmp/satellite_config /etc/config/
		
		cp -rf /tmp/ft_brlanip_config /etc/config/
		
		uci set /etc/config/update.update.vehicular_type=$(uci get /tmp/update.update.vehicular_type)
		uci set /etc/config/update.update.vehicular_nms_ip=$(uci get /tmp/update.update.vehicular_nms_ip)
		uci set /etc/config/update.update.vehicular_port=$(uci get /tmp/update.update.vehicular_port)
		uci commit /etc/config/update
		uci set /etc/config/anybeam_config.anybeam_config.twolnb_change_type=$(uci get /tmp/anybeam_config.anybeam_config.twolnb_change_type)
		if [ "$(uci get /tmp/anybeam_config.anybeam_config.openorclose_22k13v18v_flag | wc -l)" != "0" ]; then #lixch@20190411 默认为三层
			uci set /etc/config/anybeam_config.anybeam_config.openorclose_22k13v18v_flag=$(uci get /tmp/anybeam_config.anybeam_config.openorclose_22k13v18v_flag)
			uci commit /etc/config/anybeam_config
		fi	

		uci set beamaccsss_config.beamaccsss_config.beammapaccess_flag=1;uci commit beamaccsss_config
		uci set anybeam_config.anybeam_config.locksourcefile_update=2;uci commit anybeam_config
		syslog_sh "$shell_name:$file_name conf success please wait reset..."
		uci set anybeam_config.anybeam_config.config_reset_flag=1
		uci commit anybeam_config
		rm /tmp/$file_name
	else
		uci set anybeam_config.anybeam_config.locksourcefile_update=1;uci commit anybeam_config
		syslog_sh "$shell_name:$file_name not exist ..."
	fi
else
	uci set anybeam_config.anybeam_config.locksourcefile_update=1;uci commit anybeam_config
	syslog_sh "$shell_name:$file_name not exist ..."
fi
