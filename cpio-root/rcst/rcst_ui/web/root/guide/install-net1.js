langget();
rcstTypeGet();
//~ if (rcstType == 0){
	//~ $( '#vsat_odu_divide' ).show();
//~ }
//~ if (rcstType == 1){
	//~ $( '.scpc_odu_divide' ).show();
//~ }
//~ if (rcstType == 2){
	//~ $( '.scpc_odu_divide' ).show();
	//~ $( '#mesh_odu_divide' ).show();
//~ }
oduLocationGet();
oduDivideGet();
oduSwitchGet();
installNetGet();
//位置信息
function oduLocationGet(){
	$.ajax({
		url: '/action/oduLocationGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			long_value_now = Number(rsp.long_value);
			lat_value_now = Number(rsp.lat_value);
			if (long_value_now >= 0 && long_value_now <= 180)
			{
				$('#long_type').html("E");
				$('#long_value').html(long_value_now);
			}
			if (long_value_now >= -180 && long_value_now <= 0)
			{
				$('#long_type').html("W");
				$('#long_value').html(-long_value_now);				
			}
			if (lat_value_now >= 0 && lat_value_now <= 90)
			{
				$('#lat_type').html("N");
				$('#lat_value').html(lat_value_now);				
			}
			if (lat_value_now >= -90 && lat_value_now <= 0)
			{
				$('#lat_type').html("S");
				$('#lat_value').html(-lat_value_now);				
			}						
		},
		error:function(){
				console.log("oduLocationGet error");
		}
	});	
}
function oduDivideGet(){
	$.ajax({
		url: '/action/oduDivideGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			var tx_freq_now;
			var rx_freq_now;
			var rx_symbol_now;
			var lock_freq_now;
			if ( rsp.code == 0){
				if(rsp.mainback_flag==1){
					tx_freq_now=rsp.tx_freq_main/1000;//单位GHz
					rx_freq_now=rsp.rx_freq_main/1000//单位GHz;
					rx_symbol_now=rsp.rx_symbol_main;
					lock_freq_now=rsp.lock_freq_main/1000;//单位MHz;				
				}else{
					tx_freq_now=rsp.tx_freq_back/1000;//单位GHz
					rx_freq_now=rsp.rx_freq_back/1000//单位GHz;
					rx_symbol_now=rsp.rx_symbol_back;
					lock_freq_now=rsp.lock_freq_back/1000;//单位MHz;							
				}
				$('#lock_frequency').html(lock_freq_now);
				$('#symbol_rate').html(rx_symbol_now);													
			}else{}							
		},
		error:function(){
				console.log("oduDivideGet error");
		}
	});
}	
//开关状态
function oduSwitchGet(){
	$.ajax({
		url: '/action/oduSwitchGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if ( rsp.code == 0){
				if (1 == rsp.odu_lnb_switch){
					$('#odu_power_switch_divide').html(open);
					$('#buc_24V_switch_divide').html(open);
				}else{
					$('#odu_power_switch_divide').html(close);
					$('#buc_24V_switch_divide').html(close);
				}
				if (1 == rsp.odu_buc_switch){
					$('#odu_reference_switch_divide').html(open);
					$('#buc_10M_switch_divide').html(open);
				}else{
					$('#odu_reference_switch_divide').html(close);
					$('#buc_10M_switch_divide').html(close);
				}
				if (1 == rsp.lnb18V_switch){
					$('#lnb_18V_switch_divide').html(open);
				}else{
					$('#lnb_18V_switch_divide').html(close);
				}
				if (1 == rsp.lnb10M_switch){
					$('#lnb_10M_switch_divide').html(open);
				}else{
					$('#lnb_10M_switch_divide').html(close);
				}
				if (1 == rsp.spectral_switch){
					$('#spectral_switch_divide').html(open);
				}else{
					$('#spectral_switch_divide').html(close);
				}																	
			}else{}							
		},
		error:function(){
				console.log("oduSwitchGet error");
		}
	});
}
function installNetGet(){
	$.ajax({
		url: '/action/installNetGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if ( rsp.code == 0){
				var spt = rsp.spt_ret;
				var mode = rsp.mode_ret;
				var update = rsp.update_ret;
				
				$('#state2').html('<img src="/icons/ready_suc.png" />');
				if ( spt == -1 ){
					$('#characters1').html('Link delay configuration failed!');
				}else if ( spt == 0 ){
					$('#characters1').html('Location information loading!');
				}else if ( spt == 1 ){
					$('#characters1').html('Link delay configuration sucess!');
				}else {
					$('#characters1').html('spt_config return error!');
				}
				
				if(rsp.rcst_current_status == 4){
					$('#state2').html('<img src="/icons/suc.png" />');
					$('#characters2').html('TDMA_SYNC');
				}else{
					$('#state2').html('<img src="/icons/loading.gif" />');
					if (rsp.rcst_current_status == 0)
						$('#characters2').html('HOLD_STANDBY');
					else if (rsp.rcst_current_status == 1)
						$('#characters2').html('OFF_STANDBY');
					else if (rsp.rcst_current_status == 2)
						$('#characters2').html('READY_LOGON');
					else if (rsp.rcst_current_status == 3)
						$('#characters2').html('READY_TDMA_SYNC');
					else if (rsp.rcst_current_status == 5)
						$('#characters2').html('NCR_RECOVERY');
					else if (rsp.rcst_current_status == -1)
						$('#characters2').html('STATUS_OFF');
					else
						$('#characters2').html(rsp.rcst_current_status);
				
					$('#state2').onclick = function error() {
						window.location.href="/root/guide/install-star.htm"+"?timestamp="+new Date().getTime() ;
					};
				}
				
				if ( update == -1 ){
					$('#characters4').html('Upgarde failed!');
				}else if ( update == 0 ){
					$('#characters4').html('No upgarde!');
				}else if ( update == 1 ){
					$('#characters4').html('Upgarding!');
				}else if ( update == 2 ){
					$('#characters4').html('Upgarded!');
				}else {
					$('#characters4').html('data_update return error!');
				}
				$('#beam_id').html(rsp.beam_id);
				$('#sfs_id').html(rsp.sfs_id);
				$('#logon_mode').html(rsp.mode_ret);						
				$('#link_delay').html(rsp.link_delay);						
			}else{}							
		},
		error:function(){
				console.log("oduSwitchGet error");
		}
	});
}
//跳转初始安装类型界面
function back(){
	window.location.href="/root/guide/install-star.htm"+"?timestamp="+new Date().getTime() ;
}
function next(){
	window.location.href="/root/guide/install-net2.htm"+"?timestamp="+new Date().getTime() ;
}

