langget();
rcstTypeGet();
acuGet();
setInterval(function (){
acuGet();
}, 10000); 	

	function acuGet() {
		$.ajax({
			url: '/action/digaAcuGet',
			type: "GET",
			dataType: "json",
			async: true,
			success : function(rsp){
				if (rsp.code == 0){
					if(rsp.tcp_status==1){
						$('.tcp_status').html(tcp_status1);
					}else{
						$('.tcp_status').html(tcp_status0);
					}					
					

					if (rsp.fault_status == 1){
						$('.fault_status').html("Normal");
					}else{
						$('.fault_status').html("Fault");
					}

						
					if (!(rsp.gps_period == 0|| rsp.gps_period == 0.0))
					{
						$('.gps_period').html(rsp.gps_period+"s");
					}

					if (!(rsp.work_mode == 0 || rsp.work_mode == 0.0)){
						if (rsp.work_mode == "0x0" || rsp.work_mode == "0x00"){
							$('.work_mode').html("Auto Tracking");
						}else if(rsp.work_mode == "0x01" || rsp.work_mode == "0x1"){
							$('.work_mode').html("Standby");
						}else if(rsp.work_mode == "0x02" || rsp.work_mode == "0x2"){
							$('.work_mode').html("Auto Phase Correction");
						}else if(rsp.work_mode == "0x03" || rsp.work_mode == "0x3"){
							$('.work_mode').html("Self Checking");
						}else{
							$('.work_mode').html(rsp.work_mode);
						}
					}
					

					if (rsp.run_status == 0x01 || rsp.run_status  == 0x1){
						$('.run_status').html("Initialization");
					}else if(rsp.run_status  == 0x02 || rsp.run_status  == 0x2){
						$('.run_status').html("Satellite Searching");
					}else if(rsp.run_status  == 0x03 || rsp.run_status  == 0x3){
						$('.run_status').html("Tracking");
					}else if(rsp.run_status  == 0x04 || rsp.run_status  == 0x4){
						$('.run_status').html("Keeping");
					}else if(rsp.run_status  == 0x05 || rsp.run_status  == 0x5){
						$('.run_status').html("Recapture For Losing Satellite");
					}else if(rsp.run_status  == 0x06 || rsp.run_status  == 0x6){
						$('.run_status').html("Reference For Changing Satellite");
					}else if(rsp.run_status  == 0x07 || rsp.run_status  == 0x7){
						$('.run_status').html("Manual");
					}else if(rsp.run_status  == 0x08 || rsp.run_status  == 0x8){
						$('.run_status').html("Monopulse");
					}else if(rsp.run_status  == 0x09 || rsp.run_status  == 0x9){
						$('.run_status').html("Aging Test");
					}else if(rsp.run_status  == 0x0a || rsp.run_status  == 0xa){
						$('.run_status').html("Self Checking");
					}else if(rsp.run_status  == "0xff"){
						$('.run_status').html("Fault");
					}else{
						$('.run_status').html(rsp.run_status);
					}
						

					if (!(rsp.device_status == "0" || rsp.device_status == "0.0")){
						if (rsp.device_status == "0x000x00" || rsp.device_status == "0x00x0"){
							$('.device_status').html("Normal");					
						}else if (rsp.device_status == "0x000x01" || rsp.device_status == "0x00x1"){
							$('.device_status').html("Inertial Fualt");
						}else if(rsp.device_status == "0x000x02" || rsp.device_status == "0x00x2"){
							$('.device_status').html("Azimuth Motor Fault");
						}else if(rsp.device_status == "0x000x04" || rsp.device_status == "0x00x4"){
							$('.device_status').html("Pitching Motor Fault");
						}else if(rsp.device_status == "0x000x08" || rsp.device_status == "0x00x8"){
							$('.device_status').html("Roll Motor Fault");
						}else if(rsp.device_status == "0x000x10" || rsp.device_status == "0x0x10"){
							$('.device_status').html("Polarization Motor Fault");
						}else if(rsp.device_status == "0x000x20" || rsp.device_status == "0x0x20"){
							$('.device_status').html("Changing Receiver Motor Fault");
						}else if(rsp.device_status == "0x000x40" || rsp.device_status == "0x0x40"){
							$('.device_status').html("Azimuth Motor Limit");
						}else if(rsp.device_status == "0x000x80" || rsp.device_status == "0x0x80"){
							$('.device_status').html("Pitching Motor Limit");
						}else if(rsp.device_status == "0x010x00" || rsp.device_status == "0x10x0"){
							$('.device_status').html("Roll Motor Limit");
						}else if(rsp.device_status == "0x020x00" || rsp.device_status == "0x20x0"){
							$('.device_status').html("Polarization Motor Limit");
						}else if(rsp.device_status == "0x040x00" || rsp.device_status == "0x40x0"){
							$('.device_status').html("GNSS_Locked");
						}else{
							$('.device_status').html(rsp.device_status);
						}
					}	
					if (!(rsp.satellite_longitude == 0 || rsp.satellite_longitude == 0.0)){
						$('.satellite_longitude').html(rsp.satellite_longitude+"°");
					}
					if (!(rsp.beacon_freq == 0 || rsp.beacon_freq == 0.0)){
						$('.beacon_freq').html(rsp.beacon_freq+"KHz");
					}	

					if (!(rsp.polar_type == "0" || rsp.polar_type == "0.0")){
						if (rsp.polar_type== "0x00" || rsp.polar_type == "0x0"){
							$('.polar_type').html("Horizontal Liner Polarization");
						}else if(rsp.polar_type == "0x01" || rsp.polar_type == "0x1"){
							$('.polar_type').html("Vertical Liner Polarization");
						}else if(rsp.polar_type == "0x02" || rsp.polar_type == "0x2"){
							$('.polar_type').html("Left Lateral Circular Polarization");
						}else if(rsp.polar_type == "0x03" || rsp.polar_type == "0x3"){
							$('.polar_type').html("Right Lateral Circular Polarization");
						}else{
							$('.polar_type').html(rsp.polar_type);
						}
					}	

						if (!(rsp.site_longitude == "0" || rsp.site_longitude == "0.0")){	
							$('.site_longitude').html(rsp.site_longitude+"°");
						}
						
						if (!(rsp.site_latitude == "0" || rsp.site_latitude == "0.0")){
							$('.site_latitude').html(rsp.site_latitude+"°");
						}
						if (!(rsp.antenna_temp == "0" || rsp.antenna_temp == "0.0")){
							$('.antenna_temp').html(rsp.antenna_temp+"℃");
						}
						if (!(rsp.antenna_dity == "0" || rsp.antenna_dity == "0.0")){
							$('.antenna_dity').html(rsp.antenna_dity+"%");
						}
						if (!(rsp.rx_status == "0" || rsp.rx_status == "0.0")){
							if (rsp.rx_status == "0x01" || rsp.rx_status == "0x1"){
								$('.rx_status').html("Locked");
							}else{
								$('.rx_status').html("Unlocked");
							}	
						}		
						if (!(rsp.theory_azimuth_angle == "0" || rsp.theory_azimuth_angle == "0.0")){
							$('.theory_azimuth_angle').html(rsp.theory_azimuth_angle+"°");
						}
						if (!(rsp.theory_pitch_angle == "0" || rsp.theory_pitch_angle == "0.0")){
							$('.theory_pitch_angle').html(rsp.theory_pitch_angle+"°");
						}
						if (!(rsp.theory_polagizing_angle == "0" || rsp.theory_polagizing_angle == "0.0")){
							$('.theory_polagizing_angle').html(rsp.theory_polagizing_angle+"°");
						}
						if (!(rsp.target_azimuth_angle == "0" || rsp.target_azimuth_angle == "0.0")){	
							$('.target_azimuth_angle').html(rsp.target_azimuth_angle+"°");
						}
						if (!(rsp.target_pitch_angle == "0" || rsp.target_pitch_angle == "0.0")){
							$('.target_pitch_angle').html(rsp.target_pitch_angle+"°");
						}
						if (!(rsp.target_polagizing_angle == "0" || rsp.target_polagizing_angle == "0.0")){
							$('.target_polagizing_angle').html(rsp.target_polagizing_angle+"°");
						}
						
						if (!(rsp.loop_locking_AGC == "0" || rsp.loop_locking_AGC == "0.0")){					
							$('.loop_locking_AGC').html(rsp.loop_locking_AGC+"V");
						}
					
						if (!(rsp.quick_locking_AGC == "0" || rsp.quick_locking_AGC == "0.0")){
							$('.quick_locking_AGC').html(rsp.quick_locking_AGC+"V");
						}
						if (!(rsp.satellite_locking_pattern == "0" || rsp.satellite_locking_pattern == "0.0")){
						if (rsp.satellite_locking_pattern == "0x00" || rsp.satellite_locking_pattern == "0x0"){
								$('.satellite_locking_pattern').html("Locked Loop");
							}else if(rsp.satellite_locking_pattern == "0x02" || rsp.satellite_locking_pattern == "0x2"){
								$('.satellite_locking_pattern').html("Locked Broadband");
							}else{
								$('.satellite_locking_pattern').html(rsp.satellite_locking_pattern);
							}
						}
						if (!(rsp.azimuth_encoder_angle == "0" || rsp.azimuth_encoder_angle == "0.0")){
							$('.azimuth_encoder_angle').html(rsp.azimuth_encoder_angle+"°");
						}
						if (!(rsp.pitch_encoder_angle == "0" || rsp.pitch_encoder_angle == "0.0")){
							$('.pitch_encoder_angle').html(rsp.pitch_encoder_angle+"°");
						}
						if (!(rsp.polarize_encoder_angle == "0" || rsp.polarize_encoder_angle == "0.0")){
							$('.polarize_encoder_angle').html(rsp.polarize_encoder_angle+"°");
						}
						if (!(rsp.roll_encoder_angle == "0" || rsp.roll_encoder_angle == "0.0")){
							$('.roll_encoder_angle').html(rsp.roll_encoder_angle+"°");
						}
						if (!(rsp.ins_azimuth_angle == "0" || rsp.ins_azimuth_angle == "0.0")){
							$('.ins_azimuth_angle').html(rsp.ins_azimuth_angle+"°");
						}
						if (!(rsp.ins_pitch_angle == "0" || rsp.ins_pitch_angle == "0.0")){
							$('.ins_pitch_angle').html(rsp.ins_pitch_angle+"°");
						}
						if (!(rsp.ins_roll_angle == "0" || rsp.ins_roll_angle == "0.0")){
							$('.ins_roll_angle').html(rsp.ins_roll_angle+"°");
						}
						if (!(rsp.lnb_lo_query == "0" || rsp.lnb_lo_query == "0.0")){
							$('.lnb_lo_query').html(rsp.lnb_lo_query+"KHz");
						}
						if (!(rsp.carrier_azimuth_angle == "0" || rsp.carrier_azimuth_angle == "0.0")){
							$('.carrier_azimuth_angle').html(rsp.carrier_azimuth_angle+"°");
						}
						if (!(rsp.carrier_pitch_angle == "0" || rsp.carrier_pitch_angle == "0.0")){
							$('.carrier_pitch_angle').html(rsp.carrier_pitch_angle+"°");
						}
						if (!(rsp.carrier_roll_angle == "0" || rsp.carrier_roll_angle == "0.0")){
							$('.carrier_roll_angle').html(rsp.carrier_roll_angle+"°");
						}

						if (!(rsp.buc_version == "0" || rsp.buc_version == "0.0")){
							$('.buc_version').html(rsp.buc_version);
						}
						if (!(rsp.buc_temperature == "0" || rsp.buc_temperature == "0.0")){			
							$('.buc_temperature').html(rsp.buc_temperature+"℃");
						}
						if (!(rsp.fan_speed == "0" || rsp.fan_speed == "0.0")){
							if (rsp.fan_speed == "0x01" || rsp.fan_speed == "0x1"){
								$('.fan_speed').html("20%");
							}else if(rsp.fan_speed == "0x02" || rsp.fan_speed == "0x2"){
								$('.fan_speed').html("40%");
							}else if(rsp.fan_speed == "0x03" || rsp.fan_speed == "0x3"){
								$('.fan_speed').html("60%");
							}else if(rsp.fan_speed == "0x04" || rsp.fan_speed == "0x4"){
								$('.fan_speed').html("80%");
							}else if(rsp.fan_speed == "0x05" || rsp.fan_speed == "0x5"){
								$('.fan_speed').html("100%");																		
							}else{
								$('.fan_speed').html("close");
							}
						}	
						if (!(rsp.buc_power_gain == "0" || rsp.buc_power_gain == "0.0")){
							$('.buc_power_gain').html(rsp.buc_power_gain+"dB");
						}
						if (!(rsp.temperature_alarm == "0" || rsp.temperature_alarm == "0.0")){
							if (rsp.temperature_alarm == 1){
								$('.temperature_alarm').html("Alarm");
							}else if(rsp.temperature_alarm == 0){
								$('.temperature_alarm').html("No Alarm");
							}else{
								$('.temperature_alarm').html(rsp.temperature_alarm);
							}
						}			
						if (!(rsp.pll_unlock_alarm == "0" || rsp.pll_unlock_alarm == "0.0")){		
							if (rsp.pll_unlock_alarm  == 1){
								$('.pll_unlock_alarm').html("Alarm");
							}else if(rsp.pll_unlock_alarm == 0){
								$('.pll_unlock_alarm').html("No Alarm");
							}else{
								$('.pll_unlock_alarm').html(rsp.pll_unlock_alarm);
							}	
						}		
						if (!(rsp.fan_alarm == "0" || rsp.fan_alarm == "0.0")){
							if (rsp.fan_alarm == 1){
								$('.fan_alarm').html("Alarm");
							}else if(rsp.fan_alarm == 0){
								$('.fan_alarm').html("No Alarm");
							}else{
								$('.fan_alarm').html(rsp.fan_alarm);	
							}
						}
						if (!(rsp.hpa_alarm == "0" || rsp.hpa_alarm == "0.0")){			
							if (rsp.hpa_alarm == 1){
								$('.hpa_alarm').html("Alarm");
							}else if(rsp.hpa_alarm == 0){
								$('.hpa_alarm').html("No Alarm");
							}else{
								$('.hpa_alarm').html(rsp.hpa_alarm);
							}
						}	
						if (!(rsp.buc_tx_power == "0" || rsp.buc_tx_power == "0.0")){			
							$('.buc_tx_power').html(rsp.buc_tx_power+"dBm");		
						}												
				}else if (rsp.code == -2){
					$.alert( 'Please Open ACU Switch!' );
					clearInterval(timer_show);	
				}else{
				}																																	
			},
			error:function(){
				console.log("diag_acu_show error");
			}
		});			
	}

