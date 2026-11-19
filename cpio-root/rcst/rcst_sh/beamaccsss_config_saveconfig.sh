#!/bin/bash


mapsource_num=$(uci get beamaccsss_config.beamaccsss_config.mapsource_num)

true > /tmp/beamaccsss_config_saveconfig_test.sh
true > /tmp/beamaccsss_config_saveconfig_num
i=0
while [[ "$i" -lt "$mapsource_num" ]]
do
	let "i+=1"
	enable=$(uci get beamaccsss_config.$i.enable)
	if [ $enable == 0 ];then
		mapsource_name=$(uci get beamaccsss_config.$i.mapsource_name)
		echo "uci set beamaccsss_config."$"(uci show beamaccsss_config | grep $mapsource_name | awk -F '[.]+' '{print "$"2}').enable=0;uci commit beamaccsss_config" >> /tmp/beamaccsss_config_saveconfig_test.sh
	fi

done
