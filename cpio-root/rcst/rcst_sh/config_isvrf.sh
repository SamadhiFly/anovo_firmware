#!/bin/bash

mainback_flag=$(uci get backup_lockfreq.backuplockfreq.mainback_flag)
anybeam_isvrf_flag=$(uci get anybeam_config.anybeam_config.config_isvrf_flag)

if [ "$anybeam_isvrf_flag" == "1" ]; then

	if [ "$mainback_flag" == "1" ]; then
		satellite_name=$(uci get satellite_config.satellite_antenna.satellite_name)
		uci set satellite_config.satellite.system_23=3		
		uci set satellite_config.$satellite_name.system_23=3	
		uci commit satellite_config
		
	elif 	 [ "$mainback_flag" == "2" ]; then
		satellite_name=$(uci get backup_lockfreq.backuplockfreq.satellite_name)
		uci set backup_lockfreq.backuplockfreq.system_23=3
		uci set satellite_config.$satellite_name.system_23=3	
		uci commit satellite_config
		uci commit backup_lockfreq
	fi
	sh /rcst/rcst_sh/reset_3.sh > /dev/null	&
elif 	 [ "$anybeam_isvrf_flag" == "2" ]; then

	if [ "$mainback_flag" == "1" ]; then
		satellite_name=$(uci get satellite_config.satellite_antenna.satellite_name)
		uci set satellite_config.satellite.system_23=4	
		uci set satellite_config.$satellite_name.system_23=4	
		uci commit satellite_config
		
	elif 	 [ "$mainback_flag" == "2" ]; then
		satellite_name=$(uci get backup_lockfreq.backuplockfreq.satellite_name)
		uci set backup_lockfreq.backuplockfreq.system_23=4
		uci set satellite_config.$satellite_name.system_23=4	
		uci commit satellite_config
		uci commit backup_lockfreq
	fi
	sh /rcst/rcst_sh/reset_4.sh > /dev/null	&

fi	

uci set  anybeam_config.anybeam_config.config_isvrf_flag=0;uci commit anybeam_config
