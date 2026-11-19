rcstTypeGet();
langget();
if (rcstType == 2){
	$('#mesh_status').show();
}

	$( '.TXFrequency_unit' ).html('(3~40GHz)');
	$( '.TXPower_unit' ).html('(-37～10dBm)');

$('.sigNote').html(sigNote);
//单载波信息
var sig_freq_now;
var sig_power_now;
var sig_time_now;
var sig_enable_now;
sigRfGet();

if (sig_enable_now == 1){
	sigRfStop();		
}else{  
	$( '#submit_rf_open' ).show();
	$( '#submit_rf_close' ).hide();
	$( '#sig_text' ).hide();
	$( '#sig_freq' ).attr("disabled", false);
	$( '#sig_power' ).attr("disabled", false);
	$( '#sig_time' ).attr("disabled", false);			 
}

function sigRfGet(){	
	$.ajax({
		url: '/action/sigRfGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if ( rsp.code == 0){
				sig_freq_now = Number(rsp.sig_freq);
				sig_power_now = Number(rsp.sig_power);
				tx_freq_now = Number(rsp.tx_freq);
				sig_time_now = Number(rsp.sig_time);
				$( 'input[name="sig_freq"]' ).val(sig_freq_now/10000000);//界面显示GHz
				$( 'input[name="sig_power"]' ).val(sig_power_now);
				$( 'input[name="sig_time"]' ).val(sig_time_now);
				$( 'input[name="tx_freq"]' ).val(tx_freq_now/1000);
				sig_enable_now = rsp.sig_enable;
			}else{
				console.log("sigRfGet code error");
			}	
		},
		error:function(){
				console.log("sigRfGet error");
		}
	});	
}

// stop
function sigRfStop()
{
	var sig_freq = $('input[name=sig_freq]').val();
	var sig_power = $('input[name=sig_power]').val();
	var sig_time = $('input[name=sig_time]').val();
	var requestData = {
				sig_freq:sig_freq,			
				sig_power:sig_power,
				sig_time:sig_time,
				sig_enable:0			
			};	
	$.ajax({
		url: '/action/sigTransmitSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if (rsp.code == 0){
				$('#submit_rf_open').show();
				$('#submit_rf_close').hide();
				$('#sig_text').hide();
				$('#sig_freq').attr("disabled", false);
				$('#sig_power').attr("disabled", false);
				$('#sig_time').attr("disabled", false);					
			}else{
				alert(setup_failed);
			}
		}
	});		
}

function siRfInit(){
		$.ajax({
		url: '/action/sigRfGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if ( rsp.code == 0){
				if(rsp.sig_enable=='1'){
					sigRfStop();
				}
			}else{
				console.log("sigRfGet code error");
			}	
		},
		error:function(){
				console.log("sigRfGet error");
		}
	});
};
