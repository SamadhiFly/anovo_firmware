var timer_show=null;
(function( $ ){
    $.alert = function( content, ok ){
        ok = ok || function(){};
        return $.dialog({
            width: 390,
            padding:'25px 30px',
            title: alert_title,
            content: content,
            ok: ok,
            cancel: false
        });
    }
})(jQuery);
//发射单载波
function sigTransmitSet()
{
	clearInterval(timer_show );
	$('input[title=sig_freq]').trigger('blur');
	$('input[title=sig_power]').trigger('blur');
	$('input[title=sig_time]').trigger('blur');
	if (sig_freq_status == 0 || power_status == 0 || time_status == 0){
		return;
	}
	var sig_freq = $('input[name=sig_freq]').val();
	var sig_power = $('input[name=sig_power]').val();
	var sig_time = $('input[name=sig_time]').val();
	var requestData = {
				sig_freq:sig_freq,			
				sig_power:sig_power,
				sig_time:sig_time,
				sig_enable:1		
			};
	$.ajax({
		url: '/action/sigTransmitSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if (rsp.code == 0){
				sigRfGet();
				$('#submit_rf_open').hide();
				$('#submit_rf_close').show();
				$('#sig_text').show();
				$('#sig_freq').attr("disabled", true);
				$('#sig_power').attr("disabled", true);
				$('#sig_time').attr("disabled", true);
				var count=$('input[name=sig_time]').val();
				$('#sig_text').html(sig_text1 +count+ sig_text2);
				timer_show=setInterval(
					function (){
						count=count-1;
						$('#sig_text').html(sig_text1 +count+ sig_text2);
						if (count<1){
							clearInterval(timer_show);
							sigRfStop();
					}
				}, 1000); 								
			}else if (rsp.code == 1){
				$.alert(outofrange);
			}else if (rsp.code == -2){
				$.alert(fdsigle);
			}else{
				$.alert(setup_failed);
			}										
		},
		error:function(){
			console.log("sigTransmitSet error");
		}
	});												
}
//关闭单载波
function sigCloseSet()
{
	clearInterval(timer_show);
	sigRfStop();	
}
