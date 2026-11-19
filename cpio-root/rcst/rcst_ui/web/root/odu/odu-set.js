// dialog alert
(function ($) {
	$.alert = function (content, ok) {
		ok = ok || function () { };
		return $.dialog({
			width: 390,
			padding: '25px 30px',
			title: alert_title,
			content: content,
			ok: ok,
			cancel: false
		});
	}
})(jQuery);

//级化方式改变(左/右)
function polarizationTypeChange() {
	var polarization_type = $('#polarization_type').val();
	var requestData = {
		polarization_type: polarization_type
	};
	$.ajax({
		url: '/action/polTypeChange',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_suc);
				$('#polarization_type').val(polarization_type);
			} else {
				$.alert(setup_failed);
				if (polarization_type == 2) {
					$('#polarization_type').val(1);
				} else {
					$('#polarization_type').val(2);
				}
			}
		},
		error: function () {
			console.log("polarization_type error");
		}
	});
}
//22k
$('#odu_22k_switch_readonly').on('click', function (e) {
	var odu22kSwitch = $('#odu_22k_switch').hasClass('btn-switch-on') ? 0 : 1;
	var dlgwait = $.dialog({
		width: 390,
		padding: 25,
		lock: true,
		title: odu_title,
		content: $('#tmplWait').html()
	});
	var requestData = {
		odu22kSwitch: odu22kSwitch
	};
	e.preventDefault();
	$.ajax({
		url: '/action/odu22kSwitch',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (odu22kSwitch == 1) {
					$('#state1').html(switch_open);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#odu_22k_switch')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#state1').html(switch_close);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#odu_22k_switch')[0].className = 'btn-switch btn-switch-off';
				}
			} else {
				$('#state1').html(switch_error);
			}
		},
		error: function () {
			console.log("22k_switch error");
		}
	});
});
//lnb_en
$('#lnb_en').on('click', function (e) {
	if (0 == $("#switch22k13v18v").val()) {
		$.alert(offLNB);
		return;
	}
	//$( '#state1' ).html(switch_status);
	var lnb_en = $('#lnb_en').hasClass('btn-switch-on') ? 0 : 1;
	var dlgwait = $.dialog({
		width: 390,
		padding: 25,
		lock: true,
		title: odu_title,
		content: $('#tmplWait').html()
	});
	var requestData = {
		lnb_en: lnb_en
	};
	e.preventDefault();
	$.ajax({
		url: '/action/odulnbSwitch',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (lnb_en == 1) {
					$('#state1').html(switch_open);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#lnb_en')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#state1').html(switch_close);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#lnb_en')[0].className = 'btn-switch btn-switch-off';
				}
			} else if (rsp.code == -2) {
				$('#state1').html(switch_error1318);
			} else {
				$('#state1').html(switch_error);
			}
		},
		error: function () {
			console.log("lnb_en error");
		}
	});
});
//buc_en
$('#buc_en').on('click', function (e) {
	//$( '#state1' ).html(switch_status);
	var buc_en = $('#buc_en').hasClass('btn-switch-on') ? 0 : 1;
	var dlgwait = $.dialog({
		width: 390,
		padding: 25,
		lock: true,
		title: odu_title,
		content: $('#tmplWait').html()
	});
	var requestData = {
		buc_en: buc_en
	};
	e.preventDefault();
	$.ajax({
		url: '/action/odubucSwitch',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (buc_en == 1) {
					$('#state1').html(switch_open);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#buc_en')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#state1').html(switch_close);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#buc_en')[0].className = 'btn-switch btn-switch-off';
				}
			} else {
				$('#state1').html(switch_error);
			}
		},
		error: function () {
			console.log("buc_en error");
		}
	});
});
//odu_10m_en
$('#odu_10m_en').on('click', function (e) {
	//$( '#state1' ).html(switch_status);
	var odu_10m_en = $('#odu_10m_en').hasClass('btn-switch-on') ? 0 : 1;
	var dlgwait = $.dialog({
		width: 390,
		padding: 25,
		lock: true,
		title: odu_title,
		content: $('#tmplWait').html()
	});
	var requestData = {
		odu_10m_en: odu_10m_en
	};
	e.preventDefault();
	$.ajax({
		url: '/action/odu10MSwitch',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (odu_10m_en == 1) {
					$('#state1').html(switch_open);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#odu_10m_en')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#state1').html(switch_close);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#odu_10m_en')[0].className = 'btn-switch btn-switch-off';
				}
			} else {
				$('#state1').html(switch_error);
			}
		},
		error: function () {
			console.log("odu_10m_en error");
		}
	});
});


//spectral_reversal
$('#spectral_reversal_en').on('click', function (e) {
	//$( '#state1' ).html(switch_status);
	var spectral_reversal_en = $('#spectral_reversal_en').hasClass('btn-switch-on') ? 0 : 1;
	var dlgwait = $.dialog({
		width: 390,
		padding: 25,
		lock: true,
		title: odu_title,
		content: $('#tmplWait').html()
	});
	var requestData = {
		spectral_reversal_en: spectral_reversal_en
	};
	e.preventDefault();
	$.ajax({
		url: '/action/spectralReversalSwitch',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (spectral_reversal_en == 1) {
					$('#state1').html(switch_open);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#spectral_reversal_en')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#state1').html(switch_close);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#spectral_reversal_en')[0].className = 'btn-switch btn-switch-off';
				}
			} else {
				$('#state1').html(switch_error);
			}
		},
		error: function () {
			console.log("spectral_reversal_en error");
		}
	});
});

//ODU-divide参数配置
function oduDivideSet() {
	console.log("oduDivideSet 1111");
	if ($("#satellite_name").val() != "blank" && $("#ANT_name").val() != "blank") {
		var satellite_name;
		var tx_freq;
		var mainback_flag;
		var ANT_name;
		// var rolloff=$("#rolloff").val();
		// var system23=$("#system23").val();
		console.log("mainback_switch=" + mainback_switch);
		if ('0' == mainback_switch) {
			mainback_flag = 1;
		}
		else {
			if ($('#mainback_flag1').prop('checked')) {
				mainback_flag = 1;
			} else {
				mainback_flag = 2;
			}
		}
		console.log("mainback_flag=" + mainback_flag);
		satellite_name = $("#satellite_name").val();
		ANT_name = $("#ANT_name").val();
		var requestData = {
			ANT_name: ANT_name,
			satellite_name: satellite_name,
			mainback_flag: mainback_flag
			// rolloff:rolloff,
			// system23:system23		
		};
		$('#rfSubmit').html(Processing);
		$.ajax({
			url: '/action/oduDivideSet',
			data: requestData,
			type: "POST",
			dataType: "json",
			async: false,
			success: function (rsp) {
				if (rsp.code == 0) {
					$.alert(setup_suc);
					oduDivideGet();
					oduSwitchGet();
				} else if (rsp.code == -1) {
					$.alert(setup_failed1);
				} else if (rsp.code == -3) {
					$.alert(setup_failed3);
				} else if (rsp.code == -4) {
					$.alert(setup_failed4);
				} else if (rsp.code == -5) {
					$.alert(setup_failed5);
				} else if (rsp.code == -6) {
					$.alert(setup_failed6);
				} else if (rsp.code == -7) {
					$.alert(setup_failed7);
				} else if (rsp.code == -8) {
					$.alert(setup_failed8);
				} else if (rsp.code == -9) {
					$.alert(setup_failed9);
				} else {
					$.alert(setup_failed);
				}
				return rsp.code;
			},
			error: function () {
				console.log("oduDivideSet error");
			}
		});
		$('#rfSubmit').html(Submit);
	} else if ($("#satellite_name").val() == "blank") {
		$.alert(sate_choose_again);
	} else if ($("#ANT_name").val() == "blank") {
		$.alert(ant_choose_again);
	}
}
//更改SCPC发射类型(点对点:1;星状网:0)
function txTypeChange() {
	txType = $('#rf_tx_type').val();
	if (txType == 1) {
		$('#tx_type').show();
	}
	else {
		$('#tx_type').hide();
	}
}

//改变ACMCCM(ACM:1 CCM:0)
function ACMCCMChange() {
	ACM_or_CCM = $('#ACM_or_CCM').val();
	if (ACM_or_CCM == 0) {
		$('#Trans_CCM').show();
	} else {
		$('#Trans_CCM').hide();
	}
}

//ODU-发射参数配置
function oduTransmitSet() {
	$('input[title=tx_power]').trigger('blur');
	$('input[title=tx_max_power]').trigger('blur');
	if (0 == rcstType) {
		if (power_status == 0 || max_power_status == 0) {
			return;
		}
		var tx_power = $('input[name=tx_power]').val();
		var tx_max_power = $('input[name=tx_max_power]').val();
		if (transceiverType == "boda") {
			tx_power = tx_power - 6;
			tx_max_power = tx_max_power - 6;
		} else {
			tx_power = tx_power;
			tx_max_power = tx_max_power;
		}
		if (tx_power_now == tx_power && tx_max_power_now == tx_max_power) {
			$.alert(submit_nochange);
			return;
		}
		if (Number(tx_power) > Number(tx_max_power)) {
			$.alert(txpower_match);
			return;
		}
		var requestData = {
			tx_power: tx_power,
			tx_max_power: tx_max_power
		};
	} else if (1 == rcstType) {
		if (1 == txType) { //点对点:1;星网:0
			$('input[title=tx_p2p_freq]').trigger('blur');
			$('input[title=tx_p2p_symbol]').trigger('blur');
			if (power_status == 0 || max_power_status == 0 || tx_freq_status == 0 || tx_symbol_status == 0) {
				return;
			}
			var tx_power = $('input[name=tx_power]').val();
			tx_power = tx_power;
			var tx_max_power = $('input[name=tx_max_power]').val();
			tx_max_power = tx_max_power;
			//~ var tx_freq = $('input[name=tx_freq]').val();
			//~ tx_freq = Number(tx_freq)*10000000;// 前台单位参数GHz, 后台参数单位100Hz
			var tx_p2p_freq = $('input[name=tx_p2p_freq]').val();
			tx_p2p_freq = Number(tx_p2p_freq) * 10000000;// 前台单位参数GHz, 后台参数单位100Hz
			var tx_p2p_symbol = $('input[name=tx_p2p_symbol]').val();
			tx_p2p_symbol = Number(tx_p2p_symbol) * 100;//前台单位参数Ksps, 后台参数单位10sps
			var tx_p2p_modulation = $('#tx_p2p_modulation').val();
			//var tx_p2p_frame = $('#tx_p2p_frame').val();
			var tx_p2p_frame = Number(0);
			var p2p_network_type = $('#p2p_network_type').val();
			var ACM_or_CCM = $('#ACM_or_CCM').val();
			if (Number(tx_power) > Number(tx_max_power)) {
				$.alert(txpower_match);
				return;
			}

			var requestData = {
				tx_power: tx_power,
				tx_max_power: tx_max_power,
				tx_ptp_type: txType,
				tx_ptp_freq: tx_p2p_freq,
				tx_ptp_symbol: tx_p2p_symbol,
				tx_ptp_modulation: tx_p2p_modulation,
				tx_ptp_frame: tx_p2p_frame,
				p2p_network_type: p2p_network_type,
				ACM_or_CCM: ACM_or_CCM
			};
		} else {
			if (power_status == 0 || max_power_status == 0) {
				return;
			}
			var tx_power = $('input[name=tx_power]').val();
			tx_power = tx_power;
			var tx_max_power = $('input[name=tx_max_power]').val();
			tx_max_power = tx_max_power;
			if (Number(tx_power) > Number(tx_max_power)) {
				$.alert(txpower_match);
				return;
			}
			var requestData = {
				tx_ptp_type: txType,
				tx_power: tx_power,
				tx_max_power: tx_max_power
			};
		}
	} else if (2 == rcstType) {
		$('input[title=tx_power_mesh]').trigger('blur');
		if (power_status == 0 || max_power_status == 0 || mesh_power_status == 0) {
			return;
		}
		var tx_power = $('input[name=tx_power]').val();
		tx_power = tx_power - 3;
		var tx_max_power = $('input[name=tx_max_power]').val();
		tx_max_power = tx_max_power - 3;
		var tx_power_mesh = $('input[name=tx_power_mesh]').val();
		tx_power_mesh = tx_power_mesh - 3;
		if (tx_power_now == tx_power && tx_max_power_now == tx_max_power && tx_power_mesh_now == tx_power_mesh) {
			$.alert(submit_nochange);
			return;
		}
		if (Number(tx_power_mesh) > Number(tx_max_power) && Number(tx_power) > Number(tx_max_power)) {
			$.alert(all_txpower_match);
			return;
		} else if (Number(tx_power) > Number(tx_max_power)) {
			$.alert(txpower_match);
			return;
		} else if (Number(tx_power_mesh) > Number(tx_max_power)) {
			$.alert(mesh_txpower_match);
			return;
		}
		var requestData = {
			tx_power: tx_power,
			tx_max_power: tx_max_power,
			tx_power_mesh: tx_power_mesh
		};
	}
	else {
		return;
	}
	$('#rftxSubmit').html(Processing);
	$.ajax({
		url: '/action/oduTransmitSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_suc);
				oduTransmitGet();
			} else if (rsp.code == -2) {
				$.alert(out_of_range);
			}
			else {
				$.alert(setup_failed);
			}
		},
		error: function () {
			console.log("oduTransmitSet error");
		}
	});
	$('#rftxSubmit').html(Submit);
}

//ODU经纬度配置
function oduLocationSet() {
	$('input[title=ANT_longitude]').trigger('blur');
	$('input[title=ANT_latitude]').trigger('blur');
	if (longitude_status == 0 || latitude_status == 0) {
		return;
	}

	var long_ew = $('#ANT_longitude_EW').val();
	var long_value = $('input[name="ANT_longitude"]').val();
	var lat_ns = $('#ANT_latitude_NS').val();
	var lat_value = $('input[name="ANT_latitude"]').val();
	if (long_value_now == long_value && lat_value_now == lat_value && long_EW_now == long_ew && lat_NS_now == lat_ns) {
		$.alert(submit_nochange);
		return;
	}
	var requestData = {
		long_ew: long_ew,
		long_value: long_value,
		lat_ns: lat_ns,
		lat_value: lat_value
	};
	$.ajax({
		url: '/action/oduLocationSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_suc);
				oduLocationGet();
			} else {
				$.alert(submit_again);
			}
		},
		error: function () {
			console.log("oduLocationSet error");
		}
	});
}

//ODU经纬度配置
function submit_veh_config() {
	$('input[title=veh_src]').trigger('blur');
	$('input[title=veh_dst]').trigger('blur');
	$('input[title=veh_port]').trigger('blur');
	if (veh_src_status == 0 || veh_dst_status == 0 || veh_port_status == 0) {
		return;
	}

	var veh_src = $('input[name="veh_src"]').val();
	var veh_dst = $('input[name="veh_dst"]').val();
	var veh_port = $('input[name="veh_port"]').val();
	if (veh_src_now == veh_src && veh_dst_now == veh_dst && veh_port_now == veh_port) {
		$.alert(submit_nochange);
		return;
	}
	var requestData = {
		veh_src: veh_src,
		veh_dst: veh_dst,
		veh_port: veh_port
	};
	$.ajax({
		url: '/action/vehicularSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_suc);
				vehicularGet();
			} else {
				$.alert(submit_again);
			}
		},
		error: function () {
			console.log("submit_veh_config error");
		}
	});
}

//候选波束
var searchTimer = null;
var searchCount = 0;
var beamDlgWait = null;
var selfaddDialog = null;
$('#searchBeamBtn').on('click', function (e) {
	beamDlgWait = $.dialog({
		width: 500,
		padding: 25,
		lock: true,
		title: AvailableBeamSatelliteResource,
		content: $('#tmplWait').html()
	});
	$('#state1').html('<img src="/icons/loading.gif" />');
	$('#state2').html(Querying);
	$.ajax({
		url: '/action/searchBeamStartSet',
		data: {},
		type: "GET",
		dataType: "json",
		async: false,
		success: function (rsp) {
			clearInterval(searchTimer);
			searchCount = 0;
			searchTimer = setInterval(function () {
				getSearchBeamStatus();
			}, 1000);
		},
		error: function () {
			console.log("searchBeamStartSet error");
		}
	});
});

function getSearchBeamStatus() {
	console.log("getSearchBeamStatus searchCount=" + searchCount);
	if (searchCount > 180) {
		console.log("tiemout");
		clearInterval(searchTimer);
		searchInitSet();
		$('#state1').html('<img src="/icons/wrong.png" />');
		$('#state2').html(tiemout);
		return;
	}
	$.ajax({
		url: '/action/searchBeamStatusGet',
		data: {},
		type: "GET",
		dataType: "json",
		async: false,
		success: function (rsp) {
			console.log("rsp.code=" + rsp.code);
			switch (Number(rsp.code)) {
				case 0:
					{
						//in case of default
						break;
					}
				case 1:
					{
						$('#state1').html('<img src="/icons/loading.gif" />');
						$('#state2').html(Querying);
						break;
					}
				case 2:
					{
						$('#state1').html('<img src="/icons/suc.png" />');
						$('#state2').html(QuerySuccess);
						beamDlgWait.close();
						clearInterval(searchTimer);
						showBeamList();
						searchInitSet();
						break;
					}
				case 3:
					{
						$('#state1').html('<img src="/icons/wrong.png" />');
						$('#state2').html(NoBeamFile);
						clearInterval(searchTimer);
						searchInitSet();
						break;
					}
				case 4:
					{
						$('#state1').html('<img src="/icons/wrong.png" />');
						$('#state2').html(NoBeamCheck);
						clearInterval(searchTimer);
						searchInitSet();
						break;
					}
				case 5:
					{
						$('#state1').html('<img src="/icons/wrong.png" />');
						$('#state2').html(QueryFailed);
						clearInterval(searchTimer);
						searchInitSet();
						break;
					}
				default:
					{
						$('#state1').html('<img src="/icons/wrong.png" />');
						$('#state2').html(QueryFailed);
						clearInterval(searchTimer);
						searchInitSet();
						break;
					}
			}
		},
		error: function () {
			console.log("getSearchBeamStatus error");
		}
	});
	searchCount++;
}

function searchInitSet() {
	$.ajax({
		url: '/action/searchBeamInitSet',
		data: {},
		type: "GET",
		dataType: "json",
		async: false,
		success: function (rsp) {
			console.log("searchBeamInitSet ok");
		},
		error: function () {
			console.log("searchBeamInitSet error");
		}
	});
}


//候选波束弹窗
function showBeamList() {
	var contentTmpl;
	contentTmpl = $('#beamWindow').html();
	selfaddDialog = $.dialog({
		title: AvailableBeamSatelliteResource,
		content: contentTmpl,
		lock: true,
		padding: 0,
		width: 950
	});
	getBeam(1);
}

var beamList = {};
var beamSlecName = '';
var now_page = 1;
var total_page = 1;
var perpage_item = 5;
function getBeam(pageNum) {
	var requestData = { pageNum: pageNum };
	beamSlecName = '';
	$.ajax({
		url: '/action/searchBeamListGet',
		type: "POST",
		data: requestData,
		dataType: "json",
		async: false,
		success: function (rsp) {
			$('#Num').html(Num);
			$('#Polarization').html(Polarization);
			$('#LBLinkType').html(LBLinkType);
			$('#Frequency').html(Frequency);
			$('#Symbol').html(Symbol);
			$('#SatelliteLongitude').html(SatelliteLongitude);
			$('#Discribe').html(Discribe);
			$('#goNextBtn').val(NextPage);
			$('#goBackBtn').val(BackPage);
			$('.NO').html(NO);
			$('.Page').html(Page);
			$('#beamSlecSubmitBtn').html(SubmitWork);
			$('.Option').html(Option);

			total_page = Math.ceil(Number(rsp.beam_count) / perpage_item);
			$('#total_page').html(total_page);
			$('#now_page').html(now_page);
			console.log("total_page=" + total_page + ", now_page=" + now_page);
			var info = rsp.info;
			var trarr = [];
			var tpl = $('#redirect_tmplAddedTest').html();
			$('#redirect_dialogtestlist').html(trarr.join(''));
			if ($.isArray(info) && info.length > 0) {
				for (var i = 0, len = info.length; i < len; i++) {
					var sate_longitude = info[i].sate_longitude;
					if (sate_longitude > 0) {
						sate_longitude = East + sate_longitude + " " + "°";
					} else {
						sate_longitude = West + (0 - Number(sate_longitude)) + " " + "°";
					}
					info[i].frequency = Number(info[i].frequency) / 1000;
					var downlinkPolarization = info[i].downlinkPolarization;
					if (info[i].downlinkPolarization == "1") {
						downlinkPolarization = Right;
					} else if (info[i].downlinkPolarization == "0") {
						downlinkPolarization = Left;
					} else if (info[i].downlinkPolarization == "2") {
						downlinkPolarization = Vertical;
					} else if (info[i].downlinkPolarization == "3") {
						downlinkPolarization = Horizontal;
					}
					var tr = StringH.tmpl(tpl, {
						num: i + 1,
						discribe: info[i].discribe,
						nsid: info[i].nsid,
						beamid: info[i].beamid,
						downlinkPolarization: downlinkPolarization,
						lbLinkType: info[i].lbLinkType,
						frequency: info[i].frequency,
						symbol: info[i].symbol,
						sate_longitude: sate_longitude,
					});
					trarr.push(tr);
					num = i;
					beamList[i] = info[i].nsid;
				}
				$('#redirect_dialogtestlist').html(trarr.join(''));
			} else {
				$('#redirect_dialogtestlist').html('<tr><td class="center" colspan="9">no_info</td></tr>');
			}
		},
		error: function () {
			console.log("searchBeamListGet error");
		}
	});
}


function beamOduSet(beamSlec) {
	if ('0' == mainback_switch) {
		mainback_flag = 1;
	}
	else {
		if ($('#mainback_flag1').prop('checked')) {
			mainback_flag = 1;
		} else {
			mainback_flag = 2;
		}
	}
	var ANT_name = $("#ANT_name").val();
	var requestData = {
		ANT_name: ANT_name,
		satellite_name: beamSlec,
		mainback_flag: mainback_flag
	};
	$('#beamSlecSubmitBtn').html(Processing);
	$.ajax({
		url: '/action/oduDivideSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				selfaddDialog.close();
				$.alert(setup_suc);
				satelliteNameGet();
				oduDivideGet();
				oduSwitchGet();
			} else if (rsp.code == -1) {
				selfaddDialog.close();
				$.alert(setup_failed1);
			} else if (rsp.code == -3) {
				selfaddDialog.close();
				$.alert(setup_failed3);
			} else if (rsp.code == -4) {
				selfaddDialog.close();
				$.alert(setup_failed4);
			} else if (rsp.code == -5) {
				selfaddDialog.close();
				$.alert(setup_failed5);
			} else if (rsp.code == -6) {
				selfaddDialog.close();
				$.alert(setup_failed6);
			} else if (rsp.code == -7) {
				selfaddDialog.close();
				$.alert(setup_failed7);
			} else if (rsp.code == -8) {
				selfaddDialog.close();
				$.alert(setup_failed8);
			} else if (rsp.code == -9) {
				selfaddDialog.close();
				$.alert(setup_failed9);
			} else {
				selfaddDialog.close();
				$.alert(setup_failed);
			}
		},
		error: function () {
			console.log("oduDivideSet error");
		}
	});
	$('#beamSlecSubmitBtn').html(SubmitWork);
}

$('body').delegate('.beamSlec', 'click', function (e) {
	for (var i = 0; i < 5; i++) {
		if ($('.beamSlec').eq(i).prop('checked')) {
			beamSlecName = beamList[i];
			console.log('~~click~~' + beamList[i]);
			break;
		}

	}
});

$('body').delegate('#beamSlecSubmitBtn', 'click', function (e) {
	if ('' == beamSlecName) {
		console.log('~~submit~~~beamSlecName=' + beamSlecName);
		$.alert(PleaseSelectBeam);
		return;
	}

	$.ajax({
		url: '/action/beamSelectSet',
		data: { discribe: beamSlecName },
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if ('0' == rsp.code) {
				beamOduSet(rsp.beamSlecName);
			}
			else {
				selfaddDialog.close();
				$.alert(addNewSatelliteResourceFaild);
			}
		},
		error: function () {
			console.log("beamSelectSet error");
		}
	});
});



$('body').delegate('#goNextBtn', 'click', function (e) {
	console.log("next, total_page=" + total_page + ", now_page=" + now_page);
	if (now_page + 1 > total_page) {
		$.alert(LastPage);
		return;
	}
	now_page = now_page + 1;
	getBeam(now_page);
});

$('body').delegate('#goBackBtn', 'click', function (e) {
	console.log("back ,total_page=" + total_page + ", now_page=" + now_page);
	if (now_page - 1 < 1) {
		$.alert(FirstPage);
		return;
	}
	now_page = now_page - 1;
	getBeam(now_page);
});




function change_22k13v18v() {
	var switch22k13v18v = $("#switch22k13v18v").val();
	var dlgwait;
	if ('1' == switch22k13v18v) {
		dlgwait = $.dialog({
			width: 390,
			padding: 25,
			lock: true,
			title: odu_title,
			content: $('#tmplWait').html()
		});
	}
	$('#state1').html(Processing);
	$.ajax({
		url: '/action/switch22k13v18vSet',
		data: { switch22k13v18v: switch22k13v18v },
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (0 == rsp.code) {
				if (1 == switch22k13v18v) {
					var ret = 1;
					ret = oduDivideSet();
					if (1 != ret) {
						dlgwait.close();
					}
				} else {
					oduSwitchGet();
					$.alert(setup_suc);
				}
			} else {
				$.alert(setup_failed);
			}
		},
		error: function () {
			console.log("switch22k13v18vSet error");
		}
	});


} 