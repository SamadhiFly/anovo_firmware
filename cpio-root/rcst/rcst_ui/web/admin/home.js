rcstTypeGet();
langget();
lockedSet();
function lockedSet(){		
	$.ajax({
		url: '/action/lockedSet',
		data: {locked:0},
		type: "GET",
		dataType: "json",
		async: true,
		success : function(rsp){
		},
		error:function(){
			console.log("homestatus error");
		}
	});
}

$('#rcstMac').html(rcstMac);
if (space0_or_weitong1 != 2) {
	document.getElementById("btnr1c").src = '/icons/r1c.png';
	document.getElementById("btninternet").src = '/icons/internet.png';

}else if(space0_or_weitong1 == 2){
	document.getElementById("btnr1c").src = '/icons/r1c_jh.png';
	document.getElementById("btninternet").src = '/icons/internet_jh.png';
}

if(zd_version==4){
	$('.vrfpart').show();
}else{	
	$('.vrfpart').hide();
}

$('.con_ul li .title').click(function(){
	data_usage();
	$(this).toggleClass('act');
	$(this).next().slideToggle();
	})
	
status_show();
var i = 0;
setInterval(function (){
		status_show();
		i = i+1;
		if (i == 15)
		{
			data_usage();
			i = 0;			
		}
}, 2000); 
function number(bytes, br)
{
	var kbi = (bytes / 1024);
	if (kbi >= 1024)
	{
		kbi = kbi / 1024;
	}
	return kbi.toFixed(2);
};	
function unit(bytes, br)
{	
	var ubi = 'KB/s';
	var kbi = (bytes / 1024);
	if (kbi >= 1024)
	{
		ubi = 'MB/s';
	}
	return ubi;
}
var num_string;
function status_show(){
		$.ajax({
				url: '/action/sysTrafficGet',
				type: "GET",
				dataType: "json",
				async: true,
				success : function(rsp){
					if(rsp.code==0){
						num_string = rsp.sysTraffic.split(" ");
					}else{
						num_string = [0,0,0,0];
					}
						$('#rx_lan_avg').html(number(num_string[0], true));	
						$('#rx_lan_unit').html(unit(num_string[0], true));	
						$('#tx_lan_avg').html(number(num_string[1], true));
						$('#tx_lan_unit').html(unit(num_string[1], true));		
						$('#rx_bw_avg').html(number(num_string[2], true));	
						$('#rx_unit').html(unit(num_string[2], true));	
						$('#tx_bw_avg').html(number(num_string[3], true));	
						$('#tx_unit').html(unit(num_string[3], true));						
				},
				error:function(){
							console.log("sysTrafficGet error");
				}
		});
		$.ajax({
				url: '/action/homestatus',
				type: "GET",
				dataType: "json",
				async: true,
				success : function(rsp){
							var rcst_current_status = rsp.rcst_current_status;
							console.log(zd_version);
							if(rsp.zd_version=='4'){
								if (rcst_current_status == 4){
									 if (Number(rsp.x509_auth_status == 2)){
										$('#curstate').html('<img src="/icons/suc.png" />');
									}else{
										if (Number(rsp.x509_auth_status == 1)){
											$('#curstate').html('<img src="/icons/suc.png" />');
										}else{
											$('#curstate').html('<img src="/icons/ready_suc.png" />');
										}
									}
								}else{
										$('#curstate').html('<img src="/icons/wrong.png" />');
								}
							}else{
								if (rcst_current_status == 4){
									$('#curstate').html('<img src="/icons/suc.png" />');
								}else{
									$('#curstate').html('<img src="/icons/wrong.png" />');
								}								
							}

							

							var rf_rx_is_locked = rsp.rf_rx_is_locked;
							if (rf_rx_is_locked == 1){
									$('#locked').html('<img src="/icons/suc.png" />');
							}else{
									$('#locked').html('<img src="/icons/wrong.png" />');
							}
																
							var rf_rx_snr = rsp.rf_rx_snr/10;
							if (rf_rx_snr <= 0){
									$('#rf_rx_snr_signal').html('<img src="/icons/signal-0.png" />');
							}else if (rf_rx_snr < 4){
									$('#rf_rx_snr_signal').html('<img src="/icons/signal-0-20.png" />');
							}else if (rf_rx_snr < 8){
									$('#rf_rx_snr_signal').html('<img src="/icons/signal-20-40.png" />');
							}else if (rf_rx_snr < 11){
									$('#rf_rx_snr_signal').html('<img src="/icons/signal-40-60.png" />');
							}else if (rf_rx_snr < 14){
									$('#rf_rx_snr_signal').html('<img src="/icons/signal-60-80.png" />');
							}else{
									$('#rf_rx_snr_signal').html('<img src="/icons/signal-80-100.png" />');
							}									
							$('#rf_rx_snr').html(rsp.rf_rx_snr/10);	

							var rf_tx_snr = rsp.rf_tx_snr;
							if (rf_tx_snr <= 0){
									$('#rf_tx_snr_signal').html('<img src="/icons/signal-0.png" />');
							}else if (rf_tx_snr < 4){
									$('#rf_tx_snr_signal').html('<img src="/icons/signal-0-20.png" />');
							}else if (rf_tx_snr < 8){
									$('#rf_tx_snr_signal').html('<img src="/icons/signal-20-40.png" />');
							}else if (rf_tx_snr < 11){
									$('#rf_tx_snr_signal').html('<img src="/icons/signal-40-60.png" />');
							}else if (rf_tx_snr < 14){
									$('#rf_tx_snr_signal').html('<img src="/icons/signal-60-80.png" />');
							}else{
									$('#rf_tx_snr_signal').html('<img src="/icons/signal-80-100.png" />');
							}					
							$('#rf_tx_snr').html(rsp.rf_tx_snr);
				},
				error:function(){
							console.log("homestatus error");
				}
		});
}	

function data_usage() {
	$.ajax({
			url: '/action/datausage',
			type: "GET",
			dataType: "json",
			async: true,
			success : function(rsp){
				
				if(rsp.Overageibswitch == 0)
				{
					$('#update_interval_val').html("--");
					$('#access_mode_val').html("--");
					$('#unused_data_action_val').html("--");
					$('#volume_usage_val').html("--");	
					$('#total_used_val').html("--");
					$('#total_remaining_val').html("--");
					$('#volume_usage_pe').html("--");
					$('#total_used_pe').html("--");
					$('#total_remaining_pe').html("--");
					$('#trigger_action_val').html("--");
					$('#mir_limited').hide();
					$('#trigger_action_val').html("--");
					$('#mir_limited').hide();
					$('#overage_ob_mir_val').html("--");
					$('#overage_ib_mir_val').html("--");	
				}
				else
				{
					$('#update_interval_val').html(rsp.UpdateInterval);
					if($('#language_three').val()=="zh"){
					
						if (Number(rsp.AccessMode) == 0){
							$('#access_mode_val').html("发射禁止");
						}else if(rsp.AccessMode == 1){
							$('#access_mode_val').html("限速");
						}else if(rsp.AccessMode == 2){
							$('#access_mode_val').html("允许");
						}
					
					}else if($('#language_three').val()=="en"){

						if (Number(rsp.AccessMode) == 0){
							$('#access_mode_val').html("Tx Disable");
						}else if(rsp.AccessMode == 1){
							$('#access_mode_val').html("MIR Limited");
						}else if(rsp.AccessMode == 2){
							$('#access_mode_val').html("Full Access");
						}
					
					}else if($('#language_three').val()=="zh_HK"){
						if (Number(rsp.AccessMode) == 0){
							$('#access_mode_val').html("發射禁止");
						}else if(rsp.AccessMode == 1){
							$('#access_mode_val').html("限速");
						}else if(rsp.AccessMode == 2){
							$('#access_mode_val').html("允許");
						}
					}
				

					if($('#language_three').val()=="zh"){

						if (rsp.UnusedDateAction == 0){
							$('#unused_data_action_val').html("流量清零");
						}else if(rsp.UnusedDateAction == 1){
							$('#unused_data_action_val').html("流量转结到下个周期");
						}
					
					}else if($('#language_three').val()=="en"){

						if (rsp.UnusedDateAction == 0){
							$('#unused_data_action_val').html("Clear Date");
						}else if(rsp.UnusedDateAction == 1){
							$('#unused_data_action_val').html("Accumlative to next iterva");
						}
					
					}else if($('#language_three').val()=="zh_HK"){

						if (rsp.UnusedDateAction == 0){
							$('#unused_data_action_val').html("流量清零");
						}else if(rsp.UnusedDateAction == 1){
							$('#unused_data_action_val').html("流量轉結到下個週期");
						}
					
					}

				
					var AllowVolumeUsage = rsp.AllowVolumeUsage; 
					$('#volume_usage_val').html((Number(rsp.AllowVolumeUsage)/10).toFixed(1));	
				
					var TotalUsed = rsp.TotalUsed;
					$('#total_used_val').html((Number(rsp.TotalUsed)/10).toFixed(1));
				
					var TotalRemaining = rsp.TotalRemaining;
					$('#total_remaining_val').html((Number(rsp.TotalRemaining)/10).toFixed(1));
				
					$('#volume_usage_pe').html(100.0);
				
			if (0 != Number(AllowVolumeUsage)) {
				$('#total_used_pe').html((Number(TotalUsed) / Number(AllowVolumeUsage) * 100).toFixed(1));
			} else {
				$('#total_used_pe').html(0);
			}


			if (0 != Number(AllowVolumeUsage)) {
				$('#total_remaining_pe').html((Number(TotalRemaining) / Number(AllowVolumeUsage) * 100).toFixed(1));
			} else {
				$('#total_remaining_pe').html(0);
			}

					if($('#language_three').val()=="zh"){
					
						if (Number(rsp.TriggerAction) == 0){
							$('#trigger_action_val').html("发射禁止");
							$('#mir_limited').hide();
						}else if(rsp.TriggerAction == 1){
							$('#trigger_action_val').html("限速");
							$('#mir_limited').show();
						}	
					
					}else if($('#language_three').val()=="en"){

						if (Number(rsp.TriggerAction) == 0){
							$('#trigger_action_val').html("Tx Disable");
							$('#mir_limited').hide();
						}else if(rsp.TriggerAction == 1){
							$('#trigger_action_val').html("MIR Limited");
							$('#mir_limited').show();
						}	
					
					}else if($('#language_three').val()=="zh_HK"){

						if (Number(rsp.TriggerAction) == 0){
							$('#trigger_action_val').html("發射禁止");
							$('#mir_limited').hide();
						}else if(rsp.TriggerAction == 1){
							$('#trigger_action_val').html("限速");
							$('#mir_limited').show();
						}	
					
					}				
					$('#overage_ob_mir_val').html(rsp.OverageObMir);
				
					$('#overage_ib_mir_val').html(rsp.OverageibMir);					
				}		
			},
			error:function(){
						console.log("datausage error");
			}
	});		
};
