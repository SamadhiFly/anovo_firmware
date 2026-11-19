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
	window.location.href="/admin/guide/install-set1.htm"+"?timestamp="+new Date().getTime() ;
}
//只有普通终端下有收发一体
if (rcstType == 0){
	$( '#Trans_boda_type' ).show();
}
//$( '#Transceiver_type' ).val(transceiverType);
oduSwitchGet();//开关状态数据
//收发odu配置&&发射参数配置
if (transceiverType == "divide"){
	$( '#divide_type' ).show();//频段选择
	if (rcstType == 0){
		$( '#vsat_odu_divide' ).show();//普通终端开关配置
	}else if(rcstType == 1){
		$( '#scpc_odu_divide' ).show();//SCPC MESH开关配置
	}else if(rcstType == 2){
		$( '#scpc_odu_divide' ).show();//SCPC MESH开关配置
		$( '#mesh_odu_divide' ).show();//MESH终端开关配置
	}else{}	
	if (freqType == 1){//Ka频段参数配置
		$('#freqType1').prop('checked', true);
		$( '#rxfrequency_unit' ).html("(10-26.5GHz)");
		$( '#rxsymbolrate_unit' ).html("(500-67500KSps)");
		$( '#rxlocaloscillator_unit' ).html("(10-26.5GHz)");
		$( '#txlocaloscillator_unit' ).html("(26.5-40GHz)");
	}else if(freqType == 2){//Ku频段参数配置
		$('#freqType2').prop('checked', true);
		$( '#rxfrequency_unit' ).html("(10-26.5GHz)");
		$( '#rxsymbolrate_unit' ).html("(500-67500KSps)");
		$( '#rxlocaloscillator_unit' ).html("(9-26.5GHz)");
		$( '#txlocaloscillator_unit' ).html("(9-26.5GHz)");
	}else if(freqType == 3){//C频段参数配置
		$('#freqType3').prop('checked', true);
		$( '#rxfrequency_unit' ).html("(4-10GHz)");
		$( '#rxsymbolrate_unit' ).html("(500-67500KSps)");
		$( '#rxlocaloscillator_unit' ).html("(4-10GHz)");
		$( '#txlocaloscillator_unit' ).html("(4-10GHz)");
	}else{}
	oduDivideGet();//收发分立数据
}else{//收发一体下的odu配置
	$( '#boda_type' ).show();
	oduBodaGet();//收发一体数据				
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
				
				$('#polarization_type').val(rsp.polarizationType); 
				
				if (1 == rsp.buzzer_switch){
					//$('#buzzer_switch')[0].className = 'btn-switch btn-switch-on';
					//$('#buc_24V_switch_divide')[0].className = 'btn-switch btn-switch-on';
				}else{
					//$('#buzzer_switch')[0].className = 'btn-switch btn-switch-off';
					//$('#buc_24V_switch_divide')[0].className = 'btn-switch btn-switch-off';
				}
				
				/*
				if (1 == rsp.odu_lnb_switch){
					$('#odu_lnb_switch_boda')[0].className = 'btn-switch btn-switch-on';
					//$('#buc_24V_switch_divide')[0].className = 'btn-switch btn-switch-on';
				}else{
					$('#odu_lnb_switch_boda')[0].className = 'btn-switch btn-switch-off';
					//$('#buc_24V_switch_divide')[0].className = 'btn-switch btn-switch-off';
				}
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
//var tx_freq_now;
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
				//tx_freq_now = rsp.tx_freq/1000;//单位GHz
				$( 'input[name="rf_rx_freq_divide"]' ).val(rf_rx_freq_divide_now);
				$( 'input[name="rf_rx_symbol_divide"]' ).val(rf_rx_symbol_divide_now);
				$( 'input[name="rx_freq"]' ).val(rx_freq_now);
				//$( 'input[name="tx_freq"]' ).val(tx_freq_now);																	
			}else{}							
		},
		error:function(){
				console.log("oduDivideGet error");
		}
	});
}
//收发一体数据
function oduBodaGet(){	
	$.ajax({
		url: '/action/',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			
		},
		error:function(){
				console.log("oduBodaGet error");
		}
	});	
}
