langget();
rcstTypeGet();
String.format = function()
{
	if (!arguments || arguments.length < 1 || !RegExp)
		return;

	var html_esc = [/&/g, '&#38;', /"/g, '&#34;', /'/g, '&#39;', /</g, '&#60;', />/g, '&#62;'];
	var quot_esc = [/"/g, '&#34;', /'/g, '&#39;'];

	function esc(s, r) {
		for( var i = 0; i < r.length; i += 2 )
			s = s.replace(r[i], r[i+1]);
		return s;
	}

	var str = arguments[0];
	var out = '';
	var re = /^(([^%]*)%('.|0|\x20)?(-)?(\d+)?(\.\d+)?(%|b|c|d|u|f|o|s|x|X|q|h|j|t|m))/;
	var a = b = [], numSubstitutions = 0, numMatches = 0;

	while( a = re.exec(str) )
	{
		var m = a[1];
		var leftpart = a[2], pPad = a[3], pJustify = a[4], pMinLength = a[5];
		var pPrecision = a[6], pType = a[7];

		numMatches++;

		if (pType == '%')
		{
			subst = '%';
		}
		else
		{
			if (numSubstitutions++ < arguments.length)
			{
				var param = arguments[numSubstitutions];

				var pad = '';
				if (pPad && pPad.substr(0,1) == "'")
					pad = leftpart.substr(1,1);
				else if (pPad)
					pad = pPad;

				var justifyRight = true;
				if (pJustify && pJustify === "-")
					justifyRight = false;

				var minLength = -1;
				if (pMinLength)
					minLength = parseInt(pMinLength);

				var precision = -1;
				if (pPrecision && pType == 'f')
					precision = parseInt(pPrecision.substring(1));

				var subst = param;

				switch(pType)
				{
					case 'b':
						subst = (parseInt(param) || 0).toString(2);
						break;

					case 'c':
						subst = String.fromCharCode(parseInt(param) || 0);
						break;

					case 'd':
						subst = (parseInt(param) || 0);
						break;

					case 'u':
						subst = Math.abs(parseInt(param) || 0);
						break;

					case 'f':
						subst = (precision > -1)
							? ((parseFloat(param) || 0.0)).toFixed(precision)
							: (parseFloat(param) || 0.0);
						break;

					case 'o':
						subst = (parseInt(param) || 0).toString(8);
						break;

					case 's':
						subst = param;
						break;

					case 'x':
						subst = ('' + (parseInt(param) || 0).toString(16)).toLowerCase();
						break;

					case 'X':
						subst = ('' + (parseInt(param) || 0).toString(16)).toUpperCase();
						break;

					case 'h':
						subst = esc(param, html_esc);
						break;

					case 'q':
						subst = esc(param, quot_esc);
						break;

					case 'j':
						subst = String.serialize(param);
						break;

					case 't':
						var td = 0;
						var th = 0;
						var tm = 0;
						var ts = (param || 0);

						if (ts > 60) {
							tm = Math.floor(ts / 60);
							ts = (ts % 60);
						}

						if (tm > 60) {
							th = Math.floor(tm / 60);
							tm = (tm % 60);
						}

						if (th > 24) {
							td = Math.floor(th / 24);
							th = (th % 24);
						}

						subst = (td > 0)
							? String.format('%dd %dh %dm %ds', td, th, tm, ts)
							: String.format('%dh %dm %ds', th, tm, ts);

						break;

					case 'm':
						var mf = pMinLength ? parseInt(pMinLength) : 1000;
						var pr = pPrecision ? Math.floor(10*parseFloat('0'+pPrecision)) : 2;

						var i = 0;
						var val = parseFloat(param || 0);
						var units = [ '', 'K', 'M', 'G', 'T', 'P', 'E' ];

						for (i = 0; (i < units.length) && (val > mf); i++)
							val /= mf;

						subst = val.toFixed(pr) + ' ' + units[i];
						break;
				}
			}
		}

		out += leftpart + subst;
		str = str.substr(m.length);
	}

	return out + str;
}

	var rsp_current_status = 0;
if( anovo_sys=='2' || anovo_sys=='3' ){
	$('#sys_23').show();
	$('#sys_4').hide();
	if (rcstType == 1){
			$('#Scpc_Status').show();
			fwdStatusGet();
			scpcStatusGet();
			setInterval(function (){
				fwdStatusGet();
				scpcStatusGet();
			}, 1000); 	
		}else{
			$('#Vsat_Status').show();
			fwdStatusGet();
			vsatStatusGet();
			setInterval(function (){
				fwdStatusGet();
				vsatStatusGet();
			}, 1000);	
		}
}else{
	$('#sys_23').hide();
	$('#sys_4').show();
	if (rcstType == 1){
		$('#Scpc_Status_new').show();
		fwdStatusGet();
		scpcStatusGet_new();
		setInterval(function (){
			fwdStatusGet();
			scpcStatusGet_new();
		}, 1000); 	
	}else{
		$('#Vsat_Status_new').show();
		fwdStatusGet();
		vsatStatusGet_new();
		setInterval(function (){
			fwdStatusGet();
			vsatStatusGet_new();
		}, 1000);	
	}	
}


function currentStatus(){
	if (rsp_current_status == 0){
		rcst_current_status = HOLD_STANDBY;
	}else if (rsp_current_status == 1){
		rcst_current_status = OFF_STANDBY;
	}else if (rsp_current_status == 2){
		rcst_current_status = READY_LOGON;
	}else if (rsp_current_status == 3){
    if (rcstType == 1){
      	rcst_current_status = READY_FDMA_SYNC;
    }else{
      rcst_current_status = READY_TDMA_SYNC;
    }
		
	}else if (rsp_current_status == 4){
	  if (rcstType == 1){
      	rcst_current_status = FDMA_SYNC;
    }else{
      rcst_current_status = TDMA_SYNC;
    }
	}else if (rsp_current_status == 5){
		rcst_current_status = NCR_RECOVERY;
	}else if (rsp_current_status == -1){
		rcst_current_status = STATUS_OFF;
	}else{
		rcst_current_status = STATUS_OFF;
	}
	$('.rcst_current_status').html(rcst_current_status);	
	
}


function upRate(u32_up_rate){
	console.log("upRate u32_up_rate="+u32_up_rate);
	if (u32_up_rate == 0){
		up_rate = "0 Ksps";
	}else if (u32_up_rate == 1){
		up_rate = "0 Ksps";
	}else if (u32_up_rate == 2){
		up_rate = "128 Ksps";
	}else if (u32_up_rate == 3){
		up_rate = "256 Ksps";
	}else if (u32_up_rate == 4){
		up_rate = "512 Ksps";
	}else if (u32_up_rate == 7){
		up_rate = "128 Ksps";
	}else if (u32_up_rate == 8){
		up_rate = "256 Ksps";
	}else if (u32_up_rate == 9){
		up_rate = "512 Ksps";
	}else if (u32_up_rate >= 200 && u32_up_rate <= 217){
		up_rate = "512 Ksps";
	}else if (u32_up_rate >= 150 && u32_up_rate <= 157){
		up_rate = "128 Ksps";
	}else if (u32_up_rate >= 140 && u32_up_rate <= 147){
		up_rate = "128 Ksps";
	}else if (u32_up_rate >= 130 && u32_up_rate <= 137){
		up_rate = "256 Ksps";
	}else if (u32_up_rate >= 120 && u32_up_rate <= 127){
		up_rate = "256 Ksps";
	}else if (u32_up_rate >= 100 && u32_up_rate <= 117){
		up_rate = "1 Msps";
	}else if (u32_up_rate >= 20 && u32_up_rate <= 37){
		up_rate = "2 Msps";
	}else if (u32_up_rate >= 40 && u32_up_rate <= 57){
		up_rate = "4 Msps";
	}else if (u32_up_rate >= 80 && u32_up_rate <= 97){
		up_rate = "8 Msps";
	}else{
		up_rate = "0";
	}								
	return up_rate;
}

function upRate16QAM(u32_up_rate){
		console.log("upRate16QAM u32_up_rate="+u32_up_rate);
	if (u32_up_rate == 1 ||  u32_up_rate == 2 || u32_up_rate == 13 ||  u32_up_rate == 14){
		up_rate = "62.5 Ksps";
	}else if (u32_up_rate == 3 ||  u32_up_rate == 4 || u32_up_rate == 15 ||  u32_up_rate == 16){
		up_rate = "125 Ksps";
	}else if (u32_up_rate == 5 ||  u32_up_rate == 6 || u32_up_rate == 17 ||  u32_up_rate == 18){
		up_rate = "250 Ksps";
	}else if (u32_up_rate == 7 ||  u32_up_rate == 8 || u32_up_rate == 19 ||  u32_up_rate == 20){
		up_rate = "500 Ksps";
	}else if (u32_up_rate == 9 ||  u32_up_rate == 10 || u32_up_rate == 21 ||  u32_up_rate == 22){
		up_rate = "1 Msps";
	}else if (u32_up_rate == 11 ||  u32_up_rate == 12 || u32_up_rate == 23 ||  u32_up_rate == 24){
		up_rate = "2 Msps";
	}else if (u32_up_rate >= 257 && u32_up_rate <= 267){
		up_rate = "62.5 Ksps";
	}else if (u32_up_rate >= 513 && u32_up_rate <= 523){
		up_rate = "125 Ksps";
	}else if (u32_up_rate >= 769 && u32_up_rate <= 779){
		up_rate = "250 Ksps";
	}else if (u32_up_rate >= 1025 && u32_up_rate <= 1035){
		up_rate = "375 Ksps";
	}else if (u32_up_rate >= 1281 && u32_up_rate <= 1291){
		up_rate = "500 Ksps";
	}else if (u32_up_rate >= 1537 && u32_up_rate <= 1547){
		up_rate = "625 Ksps";
	}else if (u32_up_rate >= 1793 && u32_up_rate <= 1803){
		up_rate = "750 Ksps";
	}else if (u32_up_rate >= 2049 && u32_up_rate <= 2059){
		up_rate = "875 Ksps";
	}else if (u32_up_rate >= 2305 && u32_up_rate <= 2315){
		up_rate = "1 Msps";
	}else if (u32_up_rate >= 2561 && u32_up_rate <= 2571){
		up_rate = "1.5 Msps";
	}else if (u32_up_rate >= 2817 && u32_up_rate <= 2827){
		up_rate = "2 Msps";
	}else if (u32_up_rate >= 3073 && u32_up_rate <= 3083){
		up_rate = "2.5 Msps";
	}else if (u32_up_rate >= 3329 && u32_up_rate <= 3339){
		up_rate = "3 Msps";
	}else if (u32_up_rate >= 3583 && u32_up_rate <= 3593){
		up_rate = "3.5 Msps";
	}else if (u32_up_rate >= 3841 && u32_up_rate <= 3851){
		up_rate = "4 Msps";
	}else if (u32_up_rate >= 4097 && u32_up_rate <= 4107){
		up_rate = "4.5 Msps";
	}else if (u32_up_rate >= 4353 && u32_up_rate <= 4363){
		up_rate = "5 Msps";
	}else if (u32_up_rate >= 4609 && u32_up_rate <= 4619){
		up_rate = "5.5 Msps";
	}else if (u32_up_rate >= 4865 && u32_up_rate <= 4875){
		up_rate = "6 Msps";
	}else if (u32_up_rate >= 5121 && u32_up_rate <= 5131){
		up_rate = "6.5 Msps";
	}else if (u32_up_rate >= 5377 && u32_up_rate <= 5387){
		up_rate = "7 Msps";
	}else if (u32_up_rate >= 5633 && u32_up_rate <= 5643){
		up_rate = "7.5 Msps";
	}else if (u32_up_rate >= 5889 && u32_up_rate <= 5899){
		up_rate = "8 Msps";
	}else if (u32_up_rate >= 6145 && u32_up_rate <= 6155){
		up_rate = "8.5 Msps";
	}else if (u32_up_rate >= 6401 && u32_up_rate <= 6411){
		up_rate = "9 Msps";
	}else if (u32_up_rate >= 6657 && u32_up_rate <= 6667){
		up_rate = "9.5 Msps";
	}else if (u32_up_rate >= 6913 && u32_up_rate <= 6923){
		up_rate = "10 Msps";
	}else if (u32_up_rate >= 7169 && u32_up_rate <= 7179){
		up_rate = "10.5 Msps";
	}else if (u32_up_rate >= 7425 && u32_up_rate <= 7435){
		up_rate = "11 Msps";
	}else if (u32_up_rate >= 7681 && u32_up_rate <= 7691){
		up_rate = "11.5 Msps";
	}else if (u32_up_rate >= 7937 && u32_up_rate <= 7947){
		up_rate = "12 Msps";
	}else if (u32_up_rate >= 8193 && u32_up_rate <= 8203){
		up_rate = "12.5 Msps";
	}else{
		up_rate = u32_up_rate;
	}								
	return up_rate;
}

function scpc_rl_modulationType(scpc_rl_modulation_type){
	var modulation_type;
	if (scpc_rl_modulation_type == 1){
		modulation_type = "QPSK1/4";
	}else if (scpc_rl_modulation_type == 2){
		modulation_type = "QPSK1/3";
	}else if (scpc_rl_modulation_type == 3){
		modulation_type = "QPSK2/5";
	}else if (scpc_rl_modulation_type == 4){
		modulation_type = "QPSK1/2";			
	}else if (scpc_rl_modulation_type == 5){
		modulation_type = "QPSK3/5";
	}else if (scpc_rl_modulation_type == 6){
		modulation_type = "QPSK2/3";
	}else if (scpc_rl_modulation_type == 7){
		modulation_type = "QPSK3/4";
	}else if (scpc_rl_modulation_type == 8){
		modulation_type = "QPSK4/5";
	}else if (scpc_rl_modulation_type == 9){
		modulation_type = "QPSK5/6";
	}else if (scpc_rl_modulation_type == 10){
		modulation_type = "QPSK8/9";
	}else if (scpc_rl_modulation_type == 11){
		modulation_type = "QPSK9/10";
	}else if (scpc_rl_modulation_type == 12){
		modulation_type = "8PSK3/5";			
	}else if (scpc_rl_modulation_type == 13){
		modulation_type = "8PSK2/3";
	}else if (scpc_rl_modulation_type == 14){
		modulation_type = "8PSK3/4";
	}else if (scpc_rl_modulation_type == 15){
		modulation_type = "8PSK5/6";
	}else if (scpc_rl_modulation_type == 16){
		modulation_type = "8PSK8/9";																
	}else if (scpc_rl_modulation_type == 17){
		modulation_type = "8PSK9/10";	
	}else if (scpc_rl_modulation_type == 18){
		modulation_type = " 16APSK2/3";	
	}else if (scpc_rl_modulation_type == 19){
		modulation_type = "16APSK3/4";	
	}else if (scpc_rl_modulation_type == 20){
		modulation_type = "16APSK4/5";	
	}else if (scpc_rl_modulation_type == 21){
		modulation_type = "16APSK5/6";	
	}else if (scpc_rl_modulation_type == 22){
		modulation_type = "16APSK8/9";	
	}else if (scpc_rl_modulation_type == 23){
		modulation_type = "16APSK9/10";	
	}else if (scpc_rl_modulation_type == 24){
		modulation_type = "32APSK3/4";	
	}else if (scpc_rl_modulation_type == 25){
		modulation_type = "32APSK4/5";	
	}else if (scpc_rl_modulation_type == 26){
		modulation_type = "32APSK5/6";	
	}else if (scpc_rl_modulation_type == 27){
		modulation_type = "32APSK8/9";	
	}else if (scpc_rl_modulation_type == 28){
		modulation_type = "32APSK9/10";	
	}else{
		modulation_type = scpc_rl_modulation_type;
	}						
	return modulation_type;
}

function vsat_rl_modulationType(vsat_rl_modulation_type){
	console.log("vsat_rl_modcode="+vsat_rl_modulation_type);
	var modulation_type;
	if (vsat_rl_modulation_type == 1){
		modulation_type = "QPSK1/3";
	}else if (vsat_rl_modulation_type == 2){
		modulation_type = "QPSK1/3";
	}else if (vsat_rl_modulation_type == 3){
		modulation_type = "QPSK1/3";
	}else if (vsat_rl_modulation_type == 4){
		modulation_type = "QPSK1/2";			
	}else if (vsat_rl_modulation_type == 5){
		modulation_type = "QPSK2/3";
	}else if (vsat_rl_modulation_type == 6){
		modulation_type = "QPSK3/4";
	}else if (vsat_rl_modulation_type == 7){
		modulation_type = "QPSK5/6";
	}else if (vsat_rl_modulation_type == 8){
		modulation_type = "8QPSK2/3";
	}else if (vsat_rl_modulation_type == 9){
		modulation_type = "8QPSK3/4";
	}else if (vsat_rl_modulation_type == 10){
		modulation_type = "8QPSK5/6";			
	}else if (vsat_rl_modulation_type == 11){
		modulation_type = "16QPSK3/4";
	}else if (vsat_rl_modulation_type == 12){
		modulation_type = "16PSK5/6";
	}else if (vsat_rl_modulation_type == 13){
		modulation_type = "QPSK1/3";
	}else if (vsat_rl_modulation_type == 14){
		modulation_type = "QPSK1/2";																
	}else if (vsat_rl_modulation_type == 15){
		modulation_type = "QPSK2/3";	
	}else if (vsat_rl_modulation_type == 16){
		modulation_type = "QPSK3/4";	
	}else if (vsat_rl_modulation_type == 17){
		modulation_type = "QPSK5/6";	
	}else if (vsat_rl_modulation_type == 18){
		modulation_type = "8PSK2/3";	
	}else if (vsat_rl_modulation_type == 19){
		modulation_type = "8PSK3/4";	
	}else if (vsat_rl_modulation_type == 20){
		modulation_type = "8PSK5/6";	
	}else if (vsat_rl_modulation_type == 21){
		modulation_type = "16QAM3/4";	
	}else if (vsat_rl_modulation_type == 22){
		modulation_type = "16QAM5/6";	
	}else{
		modulation_type ="-";
	}									
	return modulation_type;
}
function transmitPower(e){
	var transmit_power = e;
	if (rcstType == 1 || rcstType == 2){
		transmit_power = Number(transmit_power)+3;		
	}
	if (rcstType == 0 && transceiverType == "boda"){
		transmit_power = Number(transmit_power)+6;			
	}	
	transmit_power = transmit_power + ' dBm';
	return transmit_power;	
}

function transmitPower_new(e){
	var transmit_power = e;
	//~ if (rcstType == 1 || rcstType == 2){
		//~ transmit_power = Number(transmit_power)+3;		
	//~ }
	//~ if (rcstType == 0 && transceiverType == "boda"){
		//~ transmit_power = Number(transmit_power)+6;			
	//~ }	
	transmit_power = transmit_power + ' dBm';	
	return transmit_power;	
}
//普通终端回传、fpga、reset
function fwdStatusGet(){
	$.ajax({
		url: '/action/fwdStatusGet',
		type: "GET",
		dataType: "json",
		async: true,
		success : function(rsp){
			
				var uptime = String.format('%t', rsp.uptime);
				$('#rcst_current_time').html(uptime);
				if (rsp.u8_fwd_is_lock == 1){
					rf_rx_is_locked = Locked;
				}else{
					rf_rx_is_locked = Unlocked;
				}
				tx_snr=rsp.tx_snr;
				if(tx_snr>30){
					tx_snr=30;
				}else if(tx_snr<-3){
					tx_snr=-3;
				}
				$('.tx_snr').html(tx_snr+" dB");
				$('.rf_rx_is_locked').html(rf_rx_is_locked);
				var u32_current_srate=rsp.u32_current_srate/1000000;
				u32_current_srate=u32_current_srate.toFixed(3);
				$('.rf_rx_symbol').html(u32_current_srate+" Msps");
				$('.rf_rx_ss').html(rsp.s32_current_power/1000+" dBm");
				$('.rf_rx_seachargo').html("DVB-S2/S2X");

				if (rsp.u8_fwd_modcode ==0 ){
					rf_rx_modulation = "DUMMY";
				}else if (rsp.u8_fwd_modcode == 1){
					rf_rx_modulation = "QPSK 1/4";
				}else if (rsp.u8_fwd_modcode == 2){
					rf_rx_modulation = "QPSK 1/3";
				}else if (rsp.u8_fwd_modcode == 3){
					rf_rx_modulation = "QPSK 2/5";
				}else if (rsp.u8_fwd_modcode == 4){
					rf_rx_modulation = "QPSK 1/2";			
				}else if (rsp.u8_fwd_modcode == 5){
					rf_rx_modulation = "QPSK 3/5";
				}else if (rsp.u8_fwd_modcode == 6){
					rf_rx_modulation = "QPSK 2/3";
				}else if (rsp.u8_fwd_modcode == 7){
					rf_rx_modulation = "QPSK 3/4";
				}else if (rsp.u8_fwd_modcode == 8){
					rf_rx_modulation = "QPSK 4/5";
				}else if (rsp.u8_fwd_modcode == 9){
					rf_rx_modulation = "QPSK 5/6";
				}else if (rsp.u8_fwd_modcode == 10){
					rf_rx_modulation = "QPSK 8/9";				
				}else if (rsp.u8_fwd_modcode == 11){
					rf_rx_modulation = "QPSK 9/10";
				}else if (rsp.u8_fwd_modcode == 12){
					rf_rx_modulation = "8PSK 3/5";
				}else if (rsp.u8_fwd_modcode == 13){
					rf_rx_modulation = "8PSK 2/3";
				}else if (rsp.u8_fwd_modcode == 14){
					rf_rx_modulation = "8PSK 3/4";																
				}else if (rsp.u8_fwd_modcode == 15){
					rf_rx_modulation = "8PSK 5/6";	
				}else if (rsp.u8_fwd_modcode == 16){
					rf_rx_modulation = "8PSK 8/9";	
				}else if (rsp.u8_fwd_modcode == 17){
					rf_rx_modulation = "8PSK 9/10";	
				}else if (rsp.u8_fwd_modcode == 18){
					rf_rx_modulation = "16APSK 2/3";	
				}else if (rsp.u8_fwd_modcode == 19){
					rf_rx_modulation = "16APSK 3/4";	
				}else if (rsp.u8_fwd_modcode == 20){
					rf_rx_modulation = "16APSK 4/5";	
				}else if (rsp.u8_fwd_modcode == 21){
					rf_rx_modulation = "16APSK 5/6";	
				}else if (rsp.u8_fwd_modcode == 22){
					rf_rx_modulation = "16APSK 8/9";	
				}else if (rsp.u8_fwd_modcode == 23){
					rf_rx_modulation = "16APSK 9/10";	
				}else if (rsp.u8_fwd_modcode == 24){
					rf_rx_modulation = "32APSK 3/4";	
				}else if (rsp.u8_fwd_modcode == 25){
					rf_rx_modulation = "32APSK 4/5";	
				}else if (rsp.u8_fwd_modcode == 26){
					rf_rx_modulation = "32APSK 5/6";	
				}else if (rsp.u8_fwd_modcode == 27){
					rf_rx_modulation = "32APSK 8/9";																																					
				}else if (rsp.u8_fwd_modcode == 28){
					rf_rx_modulation = "32APSK 9/10";
				}else if (rsp.u8_fwd_modcode == 29 ){
					rf_rx_modulation = "MODCODE_UNKNOWN"+rsp.u8_fwd_modcode;
				}else if (rsp.u8_fwd_modcode == 30 ){
					rf_rx_modulation = "MODCODE_UNKNOWN"+rsp.u8_fwd_modcode;
				}else if (rsp.u8_fwd_modcode == 31 ){
					rf_rx_modulation = "MODCODE_UNKNOWN"+rsp.u8_fwd_modcode;
				}else if (rsp.u8_fwd_modcode == 32 ){
					rf_rx_modulation = "QPSK 1/2";
				}else if (rsp.u8_fwd_modcode == 33 ){
					rf_rx_modulation = "QPSK 2/3";
				}else if (rsp.u8_fwd_modcode == 34 ){
					rf_rx_modulation = "QPSK 3/4";
				}else if (rsp.u8_fwd_modcode == 35 ){
					rf_rx_modulation = "QPSK 5/6";
				}else if (rsp.u8_fwd_modcode == 36 ){
					rf_rx_modulation = "QPSK 6/7";
				}else if (rsp.u8_fwd_modcode == 37 ){
					rf_rx_modulation = "QPSK 7/8";
				}else if (rsp.u8_fwd_modcode == 64 ){
					rf_rx_modulation = "VLSNR1";
				}else if (rsp.u8_fwd_modcode == 65 ){
					rf_rx_modulation = "VLSNR2";
				}else if (rsp.u8_fwd_modcode == 66 ){
					rf_rx_modulation = "QPSK 13/45";
				}else if (rsp.u8_fwd_modcode == 67 ){
					rf_rx_modulation = "QPSK 9/20";
				}else if (rsp.u8_fwd_modcode == 68 ){
					rf_rx_modulation = "QPSK 11/20";
				}else if (rsp.u8_fwd_modcode == 69 ){
					rf_rx_modulation = "8APSK 5/9";
				}else if (rsp.u8_fwd_modcode == 70 ){
					rf_rx_modulation = "8APSK 26/45";
				}else if (rsp.u8_fwd_modcode == 71 ){
					rf_rx_modulation = "8PSK 23/36";
				}else if (rsp.u8_fwd_modcode == 72 ){
					rf_rx_modulation = "8PSK 25/36";
				}else if (rsp.u8_fwd_modcode == 73 ){
					rf_rx_modulation = "8PSK 13/18";
				}else if (rsp.u8_fwd_modcode == 74 ){
					rf_rx_modulation = "16APSK 1/2";
				}else if (rsp.u8_fwd_modcode == 75 ){
					rf_rx_modulation = "16APSK 8/15";
				}else if (rsp.u8_fwd_modcode == 76 ){
					rf_rx_modulation = "16APSK 5/9";
				}else if (rsp.u8_fwd_modcode == 77 ){
					rf_rx_modulation = "16APSK 26/45";
				}else if (rsp.u8_fwd_modcode == 78 ){
					rf_rx_modulation = "16APSK 3/5";
				}else if (rsp.u8_fwd_modcode == 79 ){
					rf_rx_modulation = "16APSK 3/5";
				}else if (rsp.u8_fwd_modcode == 80 ){
					rf_rx_modulation = "16APSK 28/45";
				}else if (rsp.u8_fwd_modcode == 81 ){
					rf_rx_modulation = "16APSK 23/36";
				}else if (rsp.u8_fwd_modcode == 82 ){
					rf_rx_modulation = "16APSK 2/3";
				}else if (rsp.u8_fwd_modcode == 83 ){
					rf_rx_modulation = "16APSK 25/36";
				}else if (rsp.u8_fwd_modcode == 84 ){
					rf_rx_modulation = "16APSK 13/18";
				}else if (rsp.u8_fwd_modcode == 85 ){
					rf_rx_modulation = "16APSK 7/9";
				}else if (rsp.u8_fwd_modcode == 86 ){
					rf_rx_modulation = "16APSK 77/90";
				}else if (rsp.u8_fwd_modcode == 87 ){
					rf_rx_modulation = "32APSK 2/3";
				}else if (rsp.u8_fwd_modcode == 88 ){
					rf_rx_modulation = "32APSK_R_58";
				}else if (rsp.u8_fwd_modcode == 89 ){
					rf_rx_modulation = "32APSK 32/45";
				}else if (rsp.u8_fwd_modcode == 90 ){
					rf_rx_modulation = "32APSK 11/15";
				}else if (rsp.u8_fwd_modcode == 91 ){
					rf_rx_modulation = "32APSK 7/9";
				}else if (rsp.u8_fwd_modcode == 92 ){
					rf_rx_modulation = "64APSK 32/45";
				}else if (rsp.u8_fwd_modcode == 93 ){
					rf_rx_modulation = "64APSK 11/15";
				}else if (rsp.u8_fwd_modcode == 94 ){
					rf_rx_modulation = "64APSK_R_5E";
				}else if (rsp.u8_fwd_modcode == 95 ){
					rf_rx_modulation = "64APSK 7/9";
				}else if (rsp.u8_fwd_modcode == 96 ){
					rf_rx_modulation = "64APSK_R_60 ";
				}else if (rsp.u8_fwd_modcode == 97 ){
					rf_rx_modulation = "64APSK 4/5";
				}else if (rsp.u8_fwd_modcode == 98 ){
					rf_rx_modulation = "64APSK_R_62";
				}else if (rsp.u8_fwd_modcode == 99 ){
					rf_rx_modulation = "64APSK 5/6";
				}else if (rsp.u8_fwd_modcode == 100 ){
					rf_rx_modulation = "128APSK 3/4";
				}else if (rsp.u8_fwd_modcode == 101 ){
					rf_rx_modulation = "128APSK 7/9";
				}else if (rsp.u8_fwd_modcode == 102 ){
					rf_rx_modulation = "256APSK 29/45";
				}else if (rsp.u8_fwd_modcode == 103 ){
					rf_rx_modulation = "256APSK 2/3";
				}else if (rsp.u8_fwd_modcode == 104 ){
					rf_rx_modulation = "256APSK 31/45";
				}else if (rsp.u8_fwd_modcode == 105 ){
					rf_rx_modulation = "256APSK 32/45";
				}else if (rsp.u8_fwd_modcode == 106 ){
					rf_rx_modulation = "256APSK 11/15";
				}else if (rsp.u8_fwd_modcode == 107 ){
					rf_rx_modulation = "256APSK 3/4";
				}else if (rsp.u8_fwd_modcode == 108 ){
					rf_rx_modulation = "QPSK 11/45";
				}else if (rsp.u8_fwd_modcode == 109 ){
					rf_rx_modulation = "QPSK 4/15";
				}else if (rsp.u8_fwd_modcode == 110 ){
					rf_rx_modulation = "QPSK 14/45";
				}else if (rsp.u8_fwd_modcode == 111 ){
					rf_rx_modulation = "QPSK 7/15";
				}else if (rsp.u8_fwd_modcode == 112 ){
					rf_rx_modulation = "QPSK 8/15";
				}else if (rsp.u8_fwd_modcode == 113 ){
					rf_rx_modulation = "QPSK 32/45";
				}else if (rsp.u8_fwd_modcode == 114 ){
					rf_rx_modulation = "8PSK 7/15";
				}else if (rsp.u8_fwd_modcode == 115 ){
					rf_rx_modulation = "8PSK 8/15";
				}else if (rsp.u8_fwd_modcode == 116 ){
					rf_rx_modulation = "8PSK 26/45";
				}else if (rsp.u8_fwd_modcode == 117 ){
					rf_rx_modulation = "8PSK 32/45";
				}else if (rsp.u8_fwd_modcode == 118 ){
					rf_rx_modulation = "16APSK 7/15";
				}else if (rsp.u8_fwd_modcode == 119 ){
					rf_rx_modulation = "16APSK 8/15";
				}else if (rsp.u8_fwd_modcode == 120 ){
					rf_rx_modulation = "16APSK 26/45";
				}else if (rsp.u8_fwd_modcode == 121 ){
					rf_rx_modulation = "16APSK 3/5";
				}else if (rsp.u8_fwd_modcode == 122 ){
					rf_rx_modulation = "16APSK 32/45";
				}else if (rsp.u8_fwd_modcode == 123 ){
					rf_rx_modulation = "32APSK 2/3";
				}else if (rsp.u8_fwd_modcode == 124 ){
					rf_rx_modulation = "32APSK 32/45";
				}else if (rsp.u8_fwd_modcode == 125 ){
					rf_rx_modulation = "8PSK ";
				}else if (rsp.u8_fwd_modcode == 126 ){
					rf_rx_modulation = "32APSK ";
				}else if (rsp.u8_fwd_modcode == 127 ){
					rf_rx_modulation = "256APSK ";
				}else if (rsp.u8_fwd_modcode == 128 ){
					rf_rx_modulation = "16APSK ";
				}else if (rsp.u8_fwd_modcode == 129 ){
					rf_rx_modulation = "64APSK ";
				}else if (rsp.u8_fwd_modcode == 130 ){
					rf_rx_modulation = "1024APSK ";
				}else {
					rf_rx_modulation = "MODCODE_UNKNOWN_"+rsp.u8_fwd_modcode;
				}				
				$('.rf_rx_modulation').html(rf_rx_modulation);
				$('.rf_rx_Signalquality').html(rsp.s32_fwd_snr/10+" dB");
				$('.rf_rx_freq').html(formatNum(Number(rsp.u32_current_freq))+" KHz");
				$('.rf_rx_Signalberl').html(rsp.u32_current_ber);				
				$('.beamid_now').html(rsp.beamid_now);
				$('.satellite_name_now').html(rsp.satellite_name_now);				
		},
		error:function(){
			console.log("fwdStatusGet error");
		}
	});
} 



//普通终端回传、fpga、reset
function vsatStatusGet_new(){
	$.ajax({
		url: '/action/vsatStatusGetNew',
		type: "GET",
		dataType: "json",
		async: true,
		success : function(rsp){	
			console.log("rcst_current_status="+rsp.rcst_current_status );
			console.log("x509_auth_status="+rsp.x509_auth_status );	
			console.log("zd_version="+rsp.zd_version );	
			if(rsp.zd_version=='4'){
				console.log("11111111111111" );	
				if (Number(rsp.x509_auth_status == 2)){
					$('.x509_auth_status_tr').hide();
				}else{		
					$('.x509_auth_status_tr').show();
					if(rsp.rcst_current_status== 4){		
						 if (Number(rsp.x509_auth_status == 1)){
								x509_auth_status  = auth_success;
						}else{	
								x509_auth_status =auth_failed;
						}	
					}else{
						x509_auth_status  =auth_failed;
					}
					$('.x509_auth_status').html(x509_auth_status);		
				}				
			}else{	
				console.log("222222222" );	
				$('.x509_auth_status_tr').hide();
			}								

			console.log("rsp.u32_up_sig_rate="+rsp.u32_up_sig_rate);
			console.log("rsp.u32_up_trf_rate="+rsp.u32_up_trf_rate);
			if(rsp.zd_version=='4'){
				if((rsp.rcst_version_type=='0')|| (rsp.rcst_version_type=='1')){
					rsp.u32_up_sig_rate=upRate(rsp.u32_up_sig_rate);
					rsp.u32_up_trf_rate=upRate(rsp.u32_up_trf_rate);
			  }else{
					rsp.u32_up_sig_rate=upRate16QAM(rsp.u32_up_sig_rate);
					rsp.u32_up_trf_rate=upRate16QAM(rsp.u32_up_trf_rate);
			  } 
			}else{
					rsp.u32_up_sig_rate=upRate(rsp.u32_up_sig_rate);
					rsp.u32_up_trf_rate=upRate(rsp.u32_up_trf_rate);
			}
			console.log("rsp.u32_up_sig_rate="+rsp.u32_up_sig_rate);
			console.log("rsp.u32_up_trf_rate="+rsp.u32_up_trf_rate);
						
			rsp.u32_up_sig_power=transmitPower_new(rsp.u32_up_sig_power);
			rsp.u32_up_trf_power=transmitPower_new(rsp.u32_up_trf_power);
			
			/*downlink statistics*/
			$('.u32_timu_count').html(rsp.u32_timu_count); //单播信令
			$('.u32_timb_count').html(rsp.u32_timb_count); //广播信令
			$('.u32_down_unicast_ip_count').html(rsp.u32_down_unicast_ip_count); //接收单播IP
			$('.u32_down_mulcast_ip_count').html(rsp.u32_down_mulcast_ip_count); //接收广播IP
			$('.u32_down_losskey_count').html(rsp.u32_down_losskey_count); //接收失步统计
			$('.u32_down_fpga_sync_loss').html(rsp.u32_down_fpga_sync_loss); //接收失步统计
			$('.u32_fpga_gse_count').html(rsp.u32_fpga_gse_count); //前向FPGA GSE总计
			$('.u32_fpga_bbframe_count').html(rsp.u32_fpga_bbframe_count); //前向FPGA BBFRAM总计

			/*ul statistics*/
			$('.u32_up_sig_rate').html(rsp.u32_up_sig_rate); // 发送信令速率
			$('.u32_up_trf_rate').html(rsp.u32_up_trf_rate); // 发送业务速率
			$('.u32_up_sig_power').html(rsp.u32_up_sig_power); //发送信令功率
			$('.u32_up_trf_power').html(rsp.u32_up_trf_power); //发送业务功率
			rsp.u32_up_sig_modcod=vsat_rl_modulationType(rsp.u32_up_sig_modcod);
			rsp.u32_up_trf_modcod=vsat_rl_modulationType(rsp.u32_up_trf_modcod);
			$('.u32_up_sig_modcod').html(rsp.u32_up_sig_modcod); //发送信令调制方式
			$('.u32_up_trf_modcod').html(rsp.u32_up_trf_modcod); //发送业务调制方式
			$('.u8_up_sig_snr').html(Number(rsp.u8_up_sig_snr-120)/5+" dB"); //发送信令信噪比
			$('.u8_up_trf_snr').html(Number(rsp.u8_up_trf_snr-120)/5+" dB"); //发送业务信噪比

			$('.u32_lb_send_count').html(rsp.u32_lb_send_count); //登陆信令
			$('.u32_cb_send_count').html(rsp.u32_cb_send_count); //同步信令
			$('.u32_trf_send_count').html(rsp.u32_trf_send_count); //业务发送
			$('.u32_total_remained_packet_count').html(rsp.u32_total_remained_packet_count); // 回传压包
			$('.u32_fpga_receive_packet').html(rsp.u32_fpga_receive_packet);  //FPGA发送包
			$('.u32_fpga_send_packet').html(rsp.u32_fpga_send_packet);  //FPGA接收包
			
			rsp_current_status = rsp.rcst_current_status;
			currentStatus();
		},
		error:function(){
			console.log("vsatStatusGet error");
		}
	});
} 
//高级终端回传、fpga、reset
function scpcStatusGet_new(){
	$.ajax({
		url: '/action/scpcStatusGetNew',
		type: "GET",
		dataType: "json",
		async: true,
		success : function(rsp){							
			console.log("rcst_current_status="+rsp.rcst_current_status );
			console.log("x509_auth_status="+rsp.x509_auth_status );
      console.log("zd_version="+rsp.zd_version );
			if(rsp.zd_version=='4'){
				console.log("11111111111111" );	
				if (Number(rsp.x509_auth_status == 2)){
					$('.x509_auth_status_tr').hide();
				}else{		
					$('.x509_auth_status_tr').show();
					if(rsp.rcst_current_status== 4){		
						 if (Number(rsp.x509_auth_status == 1)){
								x509_auth_status  = auth_success;
						}else{	
								x509_auth_status =auth_failed;
						}	
					}else{
						x509_auth_status  =auth_failed;
					}
					$('.x509_auth_status').html(x509_auth_status);		
				}				
			}else{	
				console.log("222222222" );	
				$('.x509_auth_status_tr').hide();
			}
			
			rsp.u32_up_sig_power=transmitPower_new(rsp.u32_up_sig_power);
			rsp.u32_up_trf_power=transmitPower_new(rsp.u32_up_trf_power);
			
			/*downlink statistics*/
			$('.u32_timu_count').html(rsp.u32_timu_count); //单播信令
			$('.u32_timb_count').html(rsp.u32_timb_count); //广播信令
			$('.u32_down_unicast_ip_count').html(rsp.u32_down_unicast_ip_count); //接收单播IP
			$('.u32_down_mulcast_ip_count').html(rsp.u32_down_mulcast_ip_count); //接收广播IP
			$('.u32_down_losskey_count').html(rsp.u32_down_losskey_count); //接收失步统计
			$('.u32_down_fpga_sync_loss').html(rsp.u32_down_fpga_sync_loss); //接收失步统计
			$('.u32_fpga_gse_count').html(rsp.u32_fpga_gse_count); //前向FPGA GSE总计
			$('.u32_fpga_bbframe_count').html(rsp.u32_fpga_bbframe_count); //前向FPGA BBFRAM总计

			/*ul statistics*/
			$('.u32_up_sig_rate').html(formatNum(rsp.u32_up_sig_rate)+" sps"); // 发送信令速率
			$('.u32_up_trf_rate').html(formatNum(rsp.u32_up_trf_rate)+" sps"); // 发送业务速率
			$('.u32_up_sig_power').html(rsp.u32_up_sig_power); //发送信令功率
			$('.u32_up_trf_power').html(rsp.u32_up_trf_power); //发送业务功率
			rsp.u32_up_sig_modcod=scpc_rl_modulationType(rsp.u32_up_sig_modcod);
			rsp.u32_up_trf_modcod=scpc_rl_modulationType(rsp.u32_up_trf_modcod);			
			$('.u32_up_sig_modcod').html(rsp.u32_up_sig_modcod); //发送信令调制方式
			$('.u32_up_trf_modcod').html(rsp.u32_up_trf_modcod); //发送业务调制方式
			$('.u8_up_sig_snr').html(Number(rsp.u8_up_sig_snr-120)/5+" dB"); //发送信令信噪比
			$('.u8_up_trf_snr').html(Number(rsp.u8_up_trf_snr-120)/5+" dB"); //发送业务信噪比

			$('.u32_lb_send_count').html(rsp.u32_lb_send_count); //登陆信令
			$('.u32_cb_send_count').html(rsp.u32_cb_send_count); //同步信令
			$('.u32_trf_send_count').html(rsp.u32_trf_send_count); //业务发送
			$('.u32_total_remained_packet_count').html(rsp.u32_total_remained_packet_count); // 回传压包
			$('.u32_fpga_receive_packet').html(rsp.u32_fpga_receive_packet);  //FPGA发送包
			$('.u32_fpga_send_packet').html(rsp.u32_fpga_send_packet);  //FPGA接收包
			
			rsp_current_status = rsp.rcst_current_status;
			currentStatus();						
		},
		error:function(){
			console.log("scpcStatusGet error");
		}
	});
}


//普通终端回传、fpga、reset
function vsatStatusGet(){
	$.ajax({
		url: '/action/vsatStatusGet',
		type: "GET",
		dataType: "json",
		async: true,
		success : function(rsp){	
			console.log("rcst_current_status="+rsp.rcst_current_status );
			console.log("x509_auth_status="+rsp.x509_auth_status );	
			console.log("zd_version="+rsp.zd_version );	
			if(rsp.zd_version=='4'){
				console.log("11111111111111" );	
				if (Number(rsp.x509_auth_status == 2)){
					$('.x509_auth_status_tr').hide();
				}else{		
					$('.x509_auth_status_tr').show();
					if(rsp.rcst_current_status== 4){		
						 if (Number(rsp.x509_auth_status == 1)){
								x509_auth_status  = auth_success;
						}else{	
								x509_auth_status =auth_failed;
						}	
					}else{
						x509_auth_status  =auth_failed;
					}
					$('.x509_auth_status').html(x509_auth_status);		
				}				
			}else{	
				console.log("222222222" );	
				$('.x509_auth_status_tr').hide();
			}								
			$('.timu').html(rsp.timu_count);
			$('.timb').html(rsp.timb_count);
			$('.tbtp').html(rsp.u32_tbtp2_count);
			$('.local_tbtp').html(rsp.u32_local_tbtp_count);
			$('.unassign_tbtp').html(rsp.u32_unassign_tbtp_count);
			
			$('.lb_slot').html(rsp.u32_lb_slot_count);
			$('.cb_slot').html(rsp.u32_cb_slot_count);
			$('.trf_slot').html(rsp.u32_trf_slot_count);
			
			$('.down_gse').html(rsp.u32_down_gse_count);
			$('.down_ts').html(rsp.u32_down_ts_count);
			$('.down_bbframe').html(rsp.u16_down_bbframe_count);
			$('.down_ts_uncontinous').html(rsp.u32_down_ts_uncontinous_count);
			$('.pdu_crc_error').html(rsp.u32_pdu_crc_count);
			$('.down_timu_ip').html(rsp.u32_down_timu_ip);
			$('.down_timb_ip').html(rsp.u32_down_timb_ip);
			
			$('.down_irq1ms').html(rsp.u32_down_irq1ms_count);
			$('.down_losskey').html(rsp.u32_down_losskey_count);
			
			rsp_current_status = rsp.rcst_current_status;
			currentStatus();
			
      if(rsp.zd_version=='4'){
			  if((rsp.rcst_version_type=='0')|| (rsp.rcst_version_type=='1')){
					rsp.u32_up_rate=upRate(rsp.u32_up_rate);
			  }else{
					rsp.u32_up_rate=upRate16QAM(rsp.u32_up_rate);
			  } 
			}else{
				rsp.u32_up_rate=upRate(rsp.u32_up_rate);
			}
			$('.up_rate').html(rsp.u32_up_rate);

			rsp.u32_transmit_power=transmitPower(rsp.u32_transmit_power);
			$('.transmit_power').html(rsp.u32_transmit_power);

			rsp.modulation_type=vsat_rl_modulationType(rsp.modulation_type);						
			$('.modulation_type').html(rsp.modulation_type);

			$('.lb_send').html(rsp.u32_lb_send_count);
			$('.cb_send').html(rsp.u32_cb_send_count);
			$('.trf_send').html(rsp.u32_trf_send_count);
			$('.up_ip').html(rsp.u32_up_ip_count);
			$('.trf_apply_totallen').html(rsp.u32_trf_apply_totallen);

			$('.up_trf_uncontinous').html(rsp.u32_up_trf_uncontinous_count);
			$('.up_irq40ms').html(rsp.u32_up_irq40ms_count);
			//~ $('.up_irq40ms_loss').html(rsp.u32_up_irq40ms_losscount);
			$('.ts_pcr_timeout').html(rsp.u32_ts_pcr_timeout);
			$('.ts_crc_wrong').html(rsp.u32_ts_crc_wrong);							
			
			$('.fpga_bbframe_count').html(rsp.u16_fpga_bbframe_count); //FLBBFrame
			$('.fpga_gse_count').html(rsp.u32_fpga_gse_count); //FLRXGSE
			$('.fpga_total_ts').html(rsp.u16_fpga_total_ts); //FLTXGSE
			$('.fpga_receive_packet').html(rsp.u16_fpga_receive_packet); //RLFPGARX
			$('.fpga_send_packet').html(rsp.u16_fpga_send_packet); //RLFPGATX
			$('.unassign_tbtp_count').html(rsp.u32_unassign_tbtp_count); //RLMFPGARX
			$('.up_irq40ms_losscount').html(rsp.u32_up_irq40ms_losscount); //RLMFPGATX

			$('.hardware_reset').html(rsp.u32_hardware_reset);
			$('.software_reset').html(rsp.u32_software_reset);									
		},
		error:function(){
			console.log("vsatStatusGet error");
		}
	});
} 
//高级终端回传、fpga、reset
function scpcStatusGet(){
	$.ajax({
		url: '/action/scpcStatusGet',
		type: "GET",
		dataType: "json",
		async: true,
		success : function(rsp){							
			console.log("rcst_current_status="+rsp.rcst_current_status );
			console.log("x509_auth_status="+rsp.x509_auth_status );
      console.log("zd_version="+rsp.zd_version );
			if(rsp.zd_version=='4'){
				console.log("11111111111111" );	
				if (Number(rsp.x509_auth_status == 2)){
					$('.x509_auth_status_tr').hide();
				}else{		
					$('.x509_auth_status_tr').show();
					if(rsp.rcst_current_status== 4){		
						 if (Number(rsp.x509_auth_status == 1)){
								x509_auth_status  = auth_success;
						}else{	
								x509_auth_status =auth_failed;
						}	
					}else{
						x509_auth_status  =auth_failed;
					}
					$('.x509_auth_status').html(x509_auth_status);		
				}				
			}else{	
				console.log("222222222" );	
				$('.x509_auth_status_tr').hide();
			}

			$('#scpc_timu').html(rsp.u32_timu_count);
			$('#scpc_timb').html(rsp.u32_timb_count);
			$('#scpc_tbtp1').html(rsp.u32_total_tbtp1_count);
			$('#scpc_f_tbtp1').html(rsp.u32_f_tbtp1_count);
			$('#scpc_local_tbtp1').html(rsp.u32_tbtp1_count);
			
			$('.scpc_down_ts').html(rsp.u32_down_ts_count);
			$('.scpc_down_bbframe').html(rsp.u32_down_bbframe_count);
			$('.scpc_down_gse').html(rsp.u32_down_gse_count);
			$('.scpc_down_ts_uncon').html(rsp.u32_down_ts_uncontinous_count);
			$('.scpc_down_crc_error').html(rsp.u32_down_crc_error_count);
			$('.scpc_down_unicast_ip').html(rsp.u32_down_unicast_ip_count);
			$('.scpc_down_mulcast_ip').html(rsp.u32_down_mulcast_ip_count);
			
			$('.scpc_down_irq1ms').html(rsp.u32_down_irq1ms_count);
			$('.scpc_down_losskey').html(rsp.u32_unlock_count);

			rsp_current_status = rsp.rcst_current_status;
			currentStatus();
			
			$('.up_rate').html(rsp.u32_up_rate+" sps");
			
			u32_transmit_power = rsp.u32_transmit_power;
			transmitPower();
				
			rsp.modulation_type=scpc_rl_modulationType(rsp.modulation_type);						
			$('.modulation_type').html(rsp.modulation_type);			
							
			$('.scpc_lb_send').html(rsp.u32_lb_send_count);
			$('.scpc_cb_send').html(rsp.u32_cb_send_count);
			$('.scpc_trf_send').html(rsp.u32_trf_send_count);
			$('.scpc_up_ip').html(rsp.u32_up_ip_count);
			$('.scpc_up_bbframe_len').html(rsp.u32_up_bbframe_totallen);
			$('.scpc_up_trf_totallen').html(rsp.u32_up_trf_totallen);
			
			$('.scpc_up_ts').html(rsp.u32_up_ts_count);
			$('.scpc_up_bbframe').html(rsp.u32_up_bbframe_count);
			$('.scpc_up_bb_efficiency').html(rsp.u8_up_bb_efficiency);
			$('.scpc_up_irq40ms_cnt').html(rsp.u32_up_irq40ms_count);
			$('.scpc_up_skb_list_cnt').html(rsp.u32_up_skb_list_count);							

			$('.scpc_fpga_dl_ts_count').html(rsp.u32_fpga_down_ts_count);
			$('.scpc_fpga_dl_bb_count').html(rsp.u32_fpga_down_bb_count);
			$('.scpc_fpga_dl_gse_count').html(rsp.u32_fpga_down_gse_count);
			$('.scpc_fpga_ul_ts_cnt').html(rsp.u32_fpga_up_ts_count);
			$('.scpc_fpga_ul_loss_ts_cnt').html(rsp.u32_fpga_up_loss_ts_count);
			$('.scpc_fpga_ul_bb_cnt').html(rsp.u32_fpga_up_bb_count);			
							
			$('.scpc_hardware_reset').html(rsp.u32_hardware_reset);
			$('.scpc_software_reset').html(rsp.u32_software_reset);									
		},
		error:function(){
			console.log("scpcStatusGet error");
		}
	});
}


function formatNum(number){
	var str=number.toString();
	var newStr="";
	var count=0;
	if(str.indexOf(".") == -1){
		for (var i=str.length-1;i>=0;i--){
			if(count%3==0 && count !=0 && str.charAt(i)!='-'){
				newStr=str.charAt(i)+","+newStr;
			}else{
				newStr=str.charAt(i)+newStr;
			}
			count++;
		}
	}
	return newStr;
}
