langget();
rcstTypeGet();
// dialog alert
(function( $ ){
    $.alert = function( content, ok ){
        ok = ok || function(){};
        return $.dialog({
            width: 390,
            padding:'25px 30px',
            title: 'Prompt Message',
            content: content,
            ok: ok,
            cancel: false
        });
    }
})(jQuery);
//跳转初始安装类型界面
function back(){
	window.location.href="/root/guide/install-set1.htm"+"?timestamp="+new Date().getTime() ;
}

langget();
rcstTypeGet();
//只有普通终端下有收发一体
if (rcstType == 0){
	$( '#Trans_boda_type' ).show();
}
//$( '#Transceiver_type' ).val(transceiverType);
//$( '#polarization_type' ).val(polarizationType);  
oduSwitchGet();//开关状态数据
//收发odu配置&&发射参数配置
if (transceiverType == "divide"){
	$( '#divide_type' ).show();//频段选择
	if (rcstType == 0){
		$( '#vsat_odu_divide' ).show();//普通终端开关配置
		$( '#txpower_unit' ).html('(-47～0dBm)');
		$( '#maxtxpower_unit' ).html('(-47～0dBm)');
	}else if(rcstType == 1){
		$( '#scpc_odu_divide' ).show();//SCPC MESH开关配置
		$( '#scpc_tx_config' ).show();//SCPC终端发射配置
		$( '#txpower_unit' ).html('(-44～0dBm)');
		$( '#maxtxpower_unit' ).html('(-44～0dBm)');
		$( '#rf_tx_type' ).val(txType);		
		if(txType == 1){
			txTypeShow();//点对点界面
		}		
	}else if(rcstType == 2){
		$( '#scpc_odu_divide' ).show();//SCPC MESH开关配置
		$( '#mesh_odu_divide' ).show();//MESH终端开关配置
		$( '#mesh_tx_config' ).show();//MESH终端发射配置
		$( '#txpower_unit' ).html('(-44～0dBm)');
		$( '#maxtxpower_unit' ).html('(-44～0dBm)');	
	}else{}
	
	//~ $( '#rxfrequency_unit' ).html("(10-26.5GHz)");
	//~ $( '#rxsymbolrate_unit' ).html("(500-67500KSps)");
	//~ $( '#rxlocaloscillator_unit' ).html("(9-26.5GHz)");
	//~ $( '#txlocaloscillator_unit' ).html("(9-26.5GHz)");

	if (freqType == 1){//Ka频段参数配置
		$('#freqType1').prop('checked', true);
		$('#freqType2').prop('checked', false);
		$('#freqType3').prop('checked', false);
		$( '#rxfrequency_unit' ).html("(10-26.5GHz)");
		$( '#rxsymbolrate_unit' ).html("(500-67500KSps)");
		$( '#rxlocaloscillator_unit' ).html("(10-26.5GHz)");
		$( '#txlocaloscillator_unit' ).html("(26.5-40GHz)");
	}else if(freqType == 2){//Ku频段参数配置
		$('#freqType1').prop('checked', false);
		$('#freqType2').prop('checked', true);
		$('#freqType3').prop('checked', false);
		$( '#rxfrequency_unit' ).html("(10-26.5GHz)");
		$( '#rxsymbolrate_unit' ).html("(500-67500KSps)");
		$( '#rxlocaloscillator_unit' ).html("(9-26.5GHz)");
		$( '#txlocaloscillator_unit' ).html("(9-26.5GHz)");
	}else if(freqType == 3){//C频段参数配置
		$('#freqType1').prop('checked', false);
		$('#freqType2').prop('checked', false);
		$('#freqType3').prop('checked', true);
		$( '#rxfrequency_unit' ).html("(4-10GHz)");
		$( '#rxsymbolrate_unit' ).html("(500-67500KSps)");
		$( '#rxlocaloscillator_unit' ).html("(4-10GHz)");
		$( '#txlocaloscillator_unit' ).html("(4-10GHz)");
	}else{}

	oduDivideGet();//收发分立数据
}else{//收发一体下的odu配置
	$( '#boda_type' ).show();
	oduAlarmStatusGet();
	var timer;
	////////循环查询状态
		timer=setInterval(function () {
			//~ console.log('AlarmStatus    '+rsp.AlarmStatus );
			//~ console.log('odu_status_first    '+odu_status_first);
			console.log('timertimertimer');
			oduAlarmStatusGet();
	}, 30000); 
	if (rcstType == 0){
		$( '#vsat_tx_config' ).show();//普通终端发射配置
		$( '#txpower_unit' ).html('(-41～0dBm)');//普通终端发射配置
		$( '#maxtxpower_unit' ).html('(-41～0dBm)');
	}else if(rcstType == 1){
		$( '#scpc_tx_config' ).show();//SCPC终端发射配置
		$( '#txpower_unit' ).html('(-44～0dBm)');
		$( '#maxtxpower_unit' ).html('(-44～0dBm)');
		$( '#rf_tx_type' ).val(txType);
		if(txType == 1){
			txTypeShow();//点对点界面
		}					
	}else if(rcstType == 2){
		$( '#mesh_tx_config' ).show();//MESH终端发射配置
		$( '#txpower_unit' ).html('(-44～0dBm)');
		$( '#maxtxpower_unit' ).html('(-44～0dBm)');
	}else{}
				
}
oduTransmitGet();//发射配置数据

//开关状态
function oduSwitchGet(){
	$.ajax({
		url: '/action/oduSwitchGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if ( rsp.code == 0){
				//$('#polarization_type').val(rsp.polarizationType); 
				//~ if (1 == rsp.buzzer_switch){
					//~ $('#buzzer_switch')[0].className = 'btn-switch btn-switch-on';
					//~ $('#buc_24V_switch_divide')[0].className = 'btn-switch btn-switch-on';
				//~ }else{
					//~ $('#buzzer_switch')[0].className = 'btn-switch btn-switch-off';
					//~ $('#buc_24V_switch_divide')[0].className = 'btn-switch btn-switch-off';
				//~ }
//zy	
				if (1 == rsp.odu_22k_switch){
					$('#odu_22k_switch')[0].className = 'btn-switch btn-switch-on';
				}else{
					$('#odu_22k_switch')[0].className = 'btn-switch btn-switch-off';
				}			
				if (1 == rsp.odu_lnb_switch){
					$('#odu_lnb_switch')[0].className = 'btn-switch btn-switch-on';
				}else{
					$('#odu_lnb_switch')[0].className = 'btn-switch btn-switch-off';
				}
				if (1 == rsp.odu_buc_switch){
					$('#odu_buc_switch')[0].className = 'btn-switch btn-switch-on';
				}else{
					$('#odu_buc_switch')[0].className = 'btn-switch btn-switch-off';
				}
				if (0 == rsp.buc_10M_switch){
					$('#buc_10M_switch')[0].className = 'btn-switch btn-switch-on';
				}else{
					$('#buc_10M_switch')[0].className = 'btn-switch btn-switch-off';
				}		
//zy								
				/*				
				if (1 == rsp.odu_buc_switch){
					$('#odu_buc_switch_boda')[0].className = 'btn-switch btn-switch-on';
					//$('#buc_10M_switch_divide')[0].className = 'btn-switch btn-switch-on';
				}else{
					$('#odu_buc_switch_boda')[0].className = 'btn-switch btn-switch-off';
					//$('#buc_10M_switch_divide')[0].className = 'btn-switch btn-switch-off';
				}

				if (1 == rsp.lnb18V_switch){
					$('#lnb_18V_switch_divide')[0].className = 'btn-switch btn-switch-on';
				}else{					
					$('#lnb_18V_switch_divide')[0].className = 'btn-switch btn-switch-off';
				}
				if (1 == rsp.lnb10M_switch){
					$('#lnb_10M_switch_divide')[0].className = 'btn-switch btn-switch-on';
				}else{
					$('#lnb_10M_switch_divide')[0].className = 'btn-switch btn-switch-off';
				}
				if (1 == rsp.spectral_switch){
					$('#spectral_switch_divide')[0].className = 'btn-switch btn-switch-on';
				}else{
					$('#spectral_switch_divide')[0].className = 'btn-switch btn-switch-off';
				}
				*/ 																		
			}else{}							
		},
		error:function(){
				console.log("oduSwitchGet error");
		}
	});
}

var	rf_rx_freq_divide_now;
var rf_rx_symbol_divide_now;
var rx_freq_now;
var tx_freq_now;
//收发分立数据
function oduDivideGet(){
	$.ajax({
		url: '/action/oduDivideGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if ( rsp.code == 0){
				rf_rx_freq_divide_now = rsp.rf_rx_freq/1000000;//单位GHz
				rf_rx_symbol_divide_now = rsp.rf_rx_symbol;//单位GHz
				rx_freq_now = rsp.rx_freq/1000;//单位GHz
				tx_freq_now = rsp.tx_freq/1000;//单位GHz
				$( 'input[name="rf_rx_freq_divide"]' ).val(rf_rx_freq_divide_now);
				$( 'input[name="rf_rx_symbol_divide"]' ).val(rf_rx_symbol_divide_now);
				$( 'input[name="rx_freq"]' ).val(rx_freq_now);
				$( 'input[name="tx_freq"]' ).val(tx_freq_now);																	
			}else{}							
		},
		error:function(){
				console.log("oduDivideGet error");
		}
	});
}	
var tx_power_now;
var tx_max_power_now;
var tx_p2p_freq_now;
var tx_p2p_symbol_now;
var tx_p2p_modulation_now;
var tx_p2p_frame_now;
var tx_power_mesh_now;
//发射配置数据

//boda
//boda通信状态
function oduAlarmStatusGet(){	
	console.log("oduAlarmStatusGet ");
	$.ajax({
		url: '/action/get_AlarmStatus_boda', /////////待添加
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			var oduAlarmStatus='NORMAL';
			if (oduAlarmStatus=='NORMAL') ////////通信正常
			{
				$( '#AlarmStatus' ).attr("class", "bodaNormal");
				$( '#AlarmStatus' ).html("NORMAL");////////显示
				$( '#boda_normal').show();  ////正常配置+正常查询
				$( '#boda_abnormal_set').hide();////异常配置
				$( '#boda_uncommunication_set').hide();////未通信配置
				$( '#boda_abnormal_query').hide();////异常和未通信查询
				bodaAllGet(); //////更新所有参数
			}
			else if (oduAlarmStatus=='ABNORMAL')  ////////通信异常
			{
				$( '#AlarmStatus' ).attr("class", "bodaAbnormal");////////格式
				$( '#AlarmStatus' ).html("ABNORMAL");////////显示
				$( '#boda_normal').hide();  ////正常配置+正常查询
				$( '#boda_abnormal_set').show(); ////异常配置
				$( '#boda_uncommunication_set').hide();////未通信配置
				$( '#boda_abnormal_query').show();////异常和未通信查询
				$('input[name=gain_switch]').val(" ");  
				$('input[name=rf_rx_freq_boda]').val(" ");
				$('input[name=rf_rx_symbol_boda]').val(" ");
				$('input[name=rf_freq_boda]').val(" ");
				bodaAbnoramlGet(); //////更新可配置参数(始能和10M钟和ODU开关)
			}
			else if (oduAlarmStatus=='NO COMMUNICATION')  ////////未通信
			{
				$( '#AlarmStatus' ).attr("class", "bodaUncommunication");////////格式
				$( '#AlarmStatus' ).html("NO COMMUNICATION");////////显示
				$( '#boda_normal').hide();   ////正常配置+正常查询
				$( '#boda_abnormal_set').hide();////异常配置
				$( '#boda_uncommunication_set').show();////未通信配置
				$( '#boda_abnormal_query').show();////异常和未通信查询
				$('input[name=gain_switch]').val(" ");
				bodaUncommunicationGet(); //////更新可配置参数(始能和10M钟和ODU开关和接收符号速率和接收频率和中频和接收本振)
			}
		},
		error:function(){
				console.log("oduAlarmStatusGet error");
		}
	});	
}

//boda所有参数
function bodaAllGet(){
	console.log("bodaAllGet");
	$.ajax({
		url: '/action/bodaAllGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if ( rsp.code == 0){
					var  odu_enable =1;
					var  powerswitch_boda =1;
					var  referenceswitch_boda =1;
					var  Mute_Status_switch =1;
					var  Buzze_Period_switch =1;
					var  Rx_Band_switch ='H';
					var gain_switch = 123;
					var rf_rx_freq_boda = 456;
					var rf_rx_symbol_boda = 789;
					var rl_freq = 410;
					var TxLOFrequency=111,
					 Temperature =222,
					 Tx_Power_boda =333,
					 Input_Voltager =444,
					 Firmware_Version ='V1.1',
					 Manufacture_Date ='20180516';
					 $('input[name=gain_switch]').val(gain_switch);
					  $('.Gain_show').html(gain_switch);
					 $('input[name=rf_rx_freq_boda]').val(rf_rx_freq_boda);
					 $('input[name=rf_rx_symbol_boda]').val(rf_rx_symbol_boda);
					 $('input[name=rf_freq_boda]').val(rl_freq);
					  $('.RL_freq').html(rl_freq+'MHz');
					 if (Rx_Band_switch =='H' ){
						 $('.Rx_Band_switch').html("High");
						 $('.Rx_Band').html("High");
					}else if (Rx_Band_switch =='L' ){
						$('.Rx_Band_switch').html("Low");
						$('.Rx_Band').html("Low");
					}else{
						$('.Rx_Band_switch').html("--");
						$('.Rx_Band').html("--");
					}
					$('.TxLOFrequency').html(TxLOFrequency);
					$('.Temperature').html(Temperature);
					$('.Tx_Power_boda').html(Tx_Power_boda);
					$('.Input_Voltager').html(Input_Voltager);
					$('.Firmware_Version').html(Firmware_Version);
					$('.Manufacture_Date').html(Manufacture_Date);
					if (1 ==  odu_enable){
						$('#odu_enable')[0].className = 'btn-switch btn-switch-on';
					}else{
						$('#odu_enable')[0].className = 'btn-switch btn-switch-off';
					}
					if (1 ==  powerswitch_boda){
						$('#powerswitch_boda')[0].className = 'btn-switch btn-switch-on';
					}else{
						$('#powerswitch_boda')[0].className = 'btn-switch btn-switch-off';
					}
					if (1 ==  referenceswitch_boda){
						$('#referenceswitch_boda')[0].className = 'btn-switch btn-switch-on';
					}else{
						$('#referenceswitch_boda')[0].className = 'btn-switch btn-switch-off';
					}
					if (1 ==  Mute_Status_switch){
						$('#Mute_Status_switch')[0].className = 'btn-switch btn-switch-on';
						$('.Mute_Status').html("On");
					}else{
						$('#Mute_Status_switch')[0].className = 'btn-switch btn-switch-off';
						$('.Mute_Status').html("Off");
					}
					if (1 ==  Buzze_Period_switch){
						$('#Buzze_Period_switch')[0].className = 'btn-switch btn-switch-on';
						$('.Buzze_Period').html("On")
					}else{
						$('#Buzze_Period_switch')[0].className = 'btn-switch btn-switch-off';
					}																		
			}else{}							
		},
		error:function(){
				console.log("oduSwitchGet error");
		}
	});
}

var gain_switch_now;
var rf_rx_freq_boda_now ;
var rf_rx_symbol_boda_now;
//boda配置参数
function oduBodaGet(){	
	console.log("oduBodaGet");
		$.ajax({
			url: '/action/get_boda_para',
			type: "POST",
			dataType: "json",
			async: false,
			success : function(rsp){
			   var Rx_Band_switch='H',
				gain_switch_now = 123,
				rf_rx_freq_boda_now = 456,
				rf_rx_symbol_boda_now = 789;
				rl_freq=410;
				$('input[name=gain_switch]').val(gain_switch_now);
				$('.Gain_show').html(gain_switch_now);
				 $('input[name=rf_rx_freq_boda]').val(rf_rx_freq_boda_now);
				 $('input[name=rf_rx_symbol_boda]').val(rf_rx_symbol_boda_now);
				 $('input[name=rf_freq_boda]').val(rl_freq);
				 $('.RL_freq').html(rl_freq+'MHz');
				 if (Rx_Band_switch =='H' ){
					 $('.Rx_Band_switch').html("High");
				}else if (Rx_Band_switch =='L' ){
					$('.Rx_Band_switch').html("Low");
				}else{
					$('.Rx_Band_switch').html("--");				
				}
			},
			error:function(){
					console.log("oduBodaGet error");
			}
		});	
}

//boda-异常-更新可配置参数(始能和10M钟和ODU开关)
function bodaAbnoramlGet(){
	console.log("bodaAbnoramlGet");
		$.ajax({
		url: '/action/bodaAbnoramlGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if ( rsp.code == 0){
						var  odu_enable =1;
						var  powerswitch_boda =1;
						var  referenceswitch_boda =1;
												 
						if (1 ==  odu_enable){
							$('#odu_enable')[0].className = 'btn-switch btn-switch-on';
						}else{
							$('#odu_enable')[0].className = 'btn-switch btn-switch-off';
						}
						if (1 ==  powerswitch_boda){
							$('#powerswitch_boda')[0].className = 'btn-switch btn-switch-on';
						}else{
							$('#powerswitch_boda')[0].className = 'btn-switch btn-switch-off';
						}
						if (1 ==  referenceswitch_boda){
							$('#referenceswitch_boda')[0].className = 'btn-switch btn-switch-on';
						}else{
							$('#referenceswitch_boda')[0].className = 'btn-switch btn-switch-off';
						}
					}																						
			},
			error:function(){
					console.log("oduSwitchGet error");
			}
		});
	}

//boda-未通信-更新可配置参数(始能和10M钟和ODU开关和接收符号速率和接收频率和中频和接收本振)
function bodaUncommunicationGet(){
	console.log("bodaUncommunicationGet");
		$.ajax({
			url: '/action/bodaUncommunicationGet',
			type: "POST",
			dataType: "json",
			async: false,
			success : function(rsp){
				if ( rsp.code == 0){			
				var  odu_enable =1;
				var  powerswitch_boda =1;
				var  referenceswitch_boda =1;
				var  Rx_Band_switch ='H';
				var gain_switch = 123;
				var rf_rx_freq_boda = 456;
				var rf_rx_symbol_boda = 789;
				var rf_freq = 410;
				 $('input[name=rf_rx_freq_boda]').val(rf_rx_freq_boda);
				 $('input[name=rf_rx_symbol_boda]').val(rf_rx_symbol_boda);
				 $('input[name=rf_freq]').val(rf_freq);
				 $('.RL_freq').html(rf_freq+'MHz');
				 if (Rx_Band_switch =='H' ){
					 $('.Rx_Band_switch').html("High");
				}else if (Rx_Band_switch =='L' ){
					$('.Rx_Band_switch').html("Low");
				}else{
					$('.Rx_Band_switch').html("--");
				}
				 
				if (1 ==  odu_enable){
					$('#odu_enable')[0].className = 'btn-switch btn-switch-on';
				}else{
					$('#odu_enable')[0].className = 'btn-switch btn-switch-off';
				}
				if (1 ==  powerswitch_boda){
					$('#powerswitch_boda')[0].className = 'btn-switch btn-switch-on';
				}else{
					$('#powerswitch_boda')[0].className = 'btn-switch btn-switch-off';
				}
				if (1 ==  referenceswitch_boda){
					$('#referenceswitch_boda')[0].className = 'btn-switch btn-switch-on';
				}else{
					$('#referenceswitch_boda')[0].className = 'btn-switch btn-switch-off';
				}																
			}else{}							
		},
		error:function(){
				console.log("oduSwitchGet error");
		}
	});
}
//查询按钮-可查询
 $('#queryNormal').click(function(){
	console.log("queryNormal");
	  //~ qurey_dlgwait = $.dialog({
		//~ width: 390,
		//~ padding:25,
		//~ lock: true,
		//~ title : '<%:ODU%>',
		//~ content : $('#tmplWait').html(),
	//~ });
	//~ state1 = document.getElementById('state1')
	//~ state1.innerHTML =  '<%:Querying, please wait...%>';
		bodaAllGet();
});
//查询按钮-不可查询
 $( '#queryAbnormal').click(function(){
		console.log("queryAbnormal");
		alert( 'Query failed, please make sure that ODU power is on or ODU connection is OK');
	});
// 局部刷新
$('#Mute_Status_refresh').on('click', function (e) {
	console.log("Mute_Status_refresh");
		$.ajax({
			url: '/action/get_Gain_boda',
			type: "POST",
			dataType: "json",
			async: false,
			success : function(rsp){
			if ( rsp.code == 0){	
				//~ var  Mute_Status_switch =0;
					if (1 ==  rsp.Mute_Status_switch){
						$('#Mute_Status_switch')[0].className = 'btn-switch btn-switch-on';
						$('.Mute_Status').html("On");
					}else{
						$('#Mute_Status_switch')[0].className = 'btn-switch btn-switch-off';
						$('.Mute_Status').html("Off");
					}													
				}else{}							
			},
			error:function(){
					console.log("oduSwitchGet error");
			}
		});
});

$('#Buzze_Period_refresh').on('click', function (e) {
	console.log("Buzze_Period_switch");
	$.ajax({
		url: '/action/get_Mute_boda',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if(rsp.Buzze_Period >= 0){
				if (rsp.Buzze_Period  > 0) {
						$('#Buzze_Period_switch')[0].className = 'btn-switch btn-switch-on';
						$('.Buzze_Period').html("On")
					}else{
						$('#Buzze_Period_switch')[0].className = 'btn-switch btn-switch-off';
						$('.Buzze_Period').html("Off")
				}																
			}else{}							
		},
		error:function(){
				console.log("Buzze_Period_refresh error");
		}
	});
});

$('#Gain_refresh').on('click', function (e) {
	console.log("Gain_refresh");
	$.ajax({
		url: '/action/get_Gain_boda',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if(rsp.gain > 0){
					 $('input[name=gain_switch]').val(rsp.gain );
					  $('.Gain_show').html(rsp.gain );								
			}else{}							
		},
		error:function(){
				console.log("Gain_refresh error");
		}
	});
	
});

$('#RL_freq_refresh').on('click', function (e) {
	console.log("RL_freq_refresh");
	$.ajax({
		url: '/action/get_RL_freq_boda',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
		//	var RL_freq = 500;
				if(rsp.RL_freq > 0){
					 $('input[name=rf_freq_boda]').val(rsp.RL_freq);
					  $('.RL_freq').html(rl_freq+'MHz');					
			}else{}							
		},
		error:function(){
				console.log("RL_freq_refresh error");
		}
	});
});

$('#Rx_Band_refresh').on('click', function (e) {
	console.log("Rx_Band_refresh");
	$.ajax({
		url: '/action/get_Rx_Band_boda',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if(rsp.Rx_Band >= 0){
				if (rsp.Rx_Band == 0){
						$('.Rx_Band_switch').html("Low");
						$('.Rx_Band').html("Low");
				}else if (rsp.Rx_Band == 1){
						 $('.Rx_Band_switch').html("High");
						 $('.Rx_Band').html("High");
				}
			}else{
						$('.Rx_Band_switch').html("--");
						$('.Rx_Band').html("--");
					}												
		},
		error:function(){
				console.log("Rx_Band_refresh error");
		}
	});
});


$('#TxLOFrequency_refresh').on('click', function (e) {
	console.log("TxLOFrequency_refresh");
	$.ajax({
		url: '/action/get_TxLOFrequency_boda',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
		 if(rsp.TxLOFrequency > 0){
					 var freq = Number(rsp.TxLOFrequency)/1000000; 
					$('.TxLOFrequency').html(freq +' GHz');											
			}else{}							
		},
		error:function(){
				console.log("TxLOFrequency_refresh error");
		}
	});
});

$('#Temperature_refresh').on('click', function (e) {
	console.log("Temperature_refresh");
	$.ajax({
		url: '/action/get_Temperature_boda',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if ( rsp.code == 0){
					//var  Temperature =578;
					$('.Temperature').html(rsp.Temperature);															
			}else{}							
		},
		error:function(){
				console.log("Temperature_refresh error");
		}
	});
});

$('#Tx_Power_refresh').on('click', function (e) {
	console.log("Tx_Power_refresh");
	$.ajax({
		url: '/action/get_Input_Power_boda',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
					//var Tx_Power_boda =784;
					if(rsp.Input_Power > 0){
					$('.Tx_Power_boda').html(rsp.Input_Power + ' V');			
			}else{}							
		},
		error:function(){
				console.log("Tx_Power_refresh error");
		}
	});
});

$('#Input_Voltager_refresh').on('click', function (e) {
	console.log("Input_Voltager_refresh");
	$.ajax({
		url: '/action/get_Temperature_boda',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
				//~ //var rsp.Input_Voltager =164;
			if ( rsp.Input_Voltager > 0){
					$('.Input_Voltager').html(rsp.Input_Voltager+ ' Deg.C');
			}else{}							
		},
		error:function(){
				console.log("Input_Voltager_refresh error");
		}
	});
});

$('#Firmware_Version_refresh').on('click', function (e) {
	console.log("Firmware_Version_refresh");
	$.ajax({
		url: '/action/get_FirmwareVersion_boda',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if ( rsp.code == 0){
						//var   Firmware_Version ='V3.3';	
						$('.Firmware_Version').html(rsp.Firmware_Version);											
			}else{}							
		},
		error:function(){
				console.log("Firmware_Version_refresh error");
		}
	});
});
$('#Manufacture_Date_refresh').on('click', function (e) {
	console.log("Manufacture_Date_refresh");
	$.ajax({
		url: '/action/get_ManufactureDate_boda',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
		if ( rsp.code == 0){
					//~ var	 rsp.Manufacture_Date ='1234567';
					$('.Manufacture_Date').html(rsp.Manufacture_Date);												
		}else{}							
		},
		error:function(){
				console.log("get_ManufactureDate_boda error");
		}
	});
});
