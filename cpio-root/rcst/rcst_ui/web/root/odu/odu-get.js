langget();
rcstTypeGet();

function jump() {
	if (beamaccsss_map_isnot_dbs_flag == '0') {
		window.location.href = "/root/odu/beam.htm" + "?timestamp=" + new Date().getTime();
	} else {
		window.location.href = "/root/odu/mbeam.htm" + "?timestamp=" + new Date().getTime();
	}
}

if (rcstType == 0) {
	$('#vsat_odu_divide').show();//普通终端开关配置
	$('#txpower_unit').html('(-47～0dBm)');
	$('#maxtxpower_unit').html('(-47～0dBm)');
} else if (rcstType == 1) {
	$('#scpc_tx_config').show();
	$('#txpower_unit').html('(-47～0dBm)');
	$('#maxtxpower_unit').html('(-47～0dBm)');
	$('#rf_tx_type').val(txType);
	if (txType == 1) {
		if (zd_version == 4) {
			$('#tx_type').show();//点对点界面
		} else {
			$('#rf_tx_type .PointtoPoint').remove();
			$('#tx_type').hide();//点对点界面
		}
	}
} else if (rcstType == 2) {
} else { }

oduSwitchGet();//开关状态数据	
oduDivideGet();//收发分立数据
satelliteNameGet();
ANTNameGet();
oduTransmitGet();//发射配置数据
vehicularGet();//发射配置数据

//发射配置数据
function vehicularGet() {
	$.ajax({
		url: '/action/vehicularGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			veh_src_now = rsp.veh_src;
			veh_dst_now = rsp.veh_dst;
			veh_port_now = rsp.veh_port;
			$('input[name="veh_src"]').val(veh_src_now);
			$('input[name="veh_dst"]').val(veh_dst_now);
			$('input[name="veh_port"]').val(veh_port_now);
		},
		error: function () {
			console.log("vehicularGet error");
		}
	});
}
//位置信息
$('#location_linkdelay').show();
oduLocationGet();//位置信息数据


//开关状态
function oduSwitchGet() {
	$.ajax({
		url: '/action/oduSwitchGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			// if (rsp.code == 0) {
			if (1) {
				if (1 == rsp.lnb_en) {
					$('#lnb_en')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#lnb_en')[0].className = 'btn-switch btn-switch-off';
				}
				if (1 == rsp.buc_en) {
					$('#buc_en')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#buc_en')[0].className = 'btn-switch btn-switch-off';
				}
				if (1 == rsp.odu_10m_en) {
					$('#odu_10m_en')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#odu_10m_en')[0].className = 'btn-switch btn-switch-off';
				}
				if (1 == rsp.spectral_reversal_en) {
					$('#spectral_reversal_en')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#spectral_reversal_en')[0].className = 'btn-switch btn-switch-off';
				}
				if (1 == rsp.odu_22k_switch) {
					$('#odu_22k_status').html(on);
				} else {
					$('#odu_22k_status').html(off);
				}
				if (1 == rsp.lnb_13V_en) {
					$('#lnb_13v_status').html(on);
				} else {
					$('#lnb_13v_status').html(off);
				}
				if (1 == rsp.lnb_18V_en) {
					$('#lnb_18v_status').html(on);
				} else {
					$('#lnb_18v_status').html(off);
				}
				if ('2' == anovo_sys) {
					$(".searchBeam").hide();
					$("#searchBeam").hide();
				} else {
					$(".searchBeam").show();
					$("#searchBeam").show();
				}
        
				if (2 == rsp.hardwareVersion) {
					$('#tr22k13v18v').show();
					$('#switch22k13v18v').val(rsp.switch22k13v18v);
				} else {
					$('#tr22k13v18v').hide();
					$('#switch22k13v18v').val(rsp.switch22k13v18v);
				}
			} else { }
		},
		error: function () {
			console.log("oduSwitchGet error");
		}
	});
}


$("#satellite_name").click(function () {
	$("#satellite_name option[value='blank']").remove();
});
function satelliteNameGet() {
	$.ajax({
		url: '/action/satelliteNameGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				var info = rsp.info;
				var optionname;
				for (var i = 0; i < info.length; i++) {
					optionname = info[i].satellite_name;
					$("#satellite_name").append('<option value=' + optionname + '>' + optionname + '</option>');
				}
				if (rsp.return_flag == 1) {
					$('#satellite_name').val(rsp.satellite_name_now);
				} else {
					optionname = choose_again;
					$("#satellite_name").append('<option value="blank">' + optionname + '</option>');
					$("#satellite_name").val("blank");
				}
			} else { }
		},
		error: function () {
			console.log("satelliteNameGet error");
		}
	});
}


$("#ANT_name").click(function () {
	$("#ANT_name option[value='blank']").remove();
});
function ANTNameGet() {
	$.ajax({
		url: '/action/ANTNameGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				var info = rsp.info;
				var optionname;
				for (var i = 0; i < info.length; i++) {
					optionname = info[i].ANT_name;
					$("#ANT_name").append('<option value=' + optionname + '>' + optionname + '</option>');
				}
				if (rsp.return_flag == 1) {
					$('#ANT_name').val(rsp.ANT_name_now);
				} else {
					optionname = choose_again;
					$("#ANT_name").append('<option value="blank">' + optionname + '</option>');
					$("#ANT_name").val("blank");
				}
			} else { }
		},
		error: function () {
			console.log("ANTNameGet error");
		}
	});
}

//收发分立数据
function oduDivideGet() {
	$.ajax({
		url: '/action/oduDivideGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				var rx_freq_main = rsp.rx_freq_main / 1000; //单位GHz
				var rx_freq_back = rsp.rx_freq_back / 1000; //单位GHz
				var tx_freq_main = rsp.tx_freq_main / 1000; //单位GHz
				var tx_freq_back = rsp.tx_freq_back / 1000; //单位GHz
				mainback_switch = rsp.mainback_switch;
				if (mainback_switch == '1') {
					console.log("mainback_switch == 1");
					$('#mainback').show();
				}
				else {
					console.log("mainback_switch == 0");
					$('#mainback').hide();
				}
				if (rsp.mainback_flag == '1') {
					$('input[name="rx_freq"]').val(rx_freq_main);
					$('input[name="tx_freq"]').val(tx_freq_main);
					$('#mainback_flag1').prop('checked', true);
					$('.SatelliteResource').html(SatelliteResource);
					$('.ANTResource').html(ANTResource);
					$('.TXLocalOscillator').html(TXLocalOscillator);
					$('.RXLocalOscillator').html(RXLocalOscillator);
				} else {
					$('input[name="rx_freq"]').val(rx_freq_back);
					$('input[name="tx_freq"]').val(tx_freq_back);
					$('#mainback_flag2').prop('checked', true);
					$('.SatelliteResource').html(BackupSatelliteResource);
					$('.ANTResource').html(BackupANTResource);
					$('.TXLocalOscillator').html(BackupTXLocalOscillator);
					$('.RXLocalOscillator').html(BackupRXLocalOscillator);
				}
			} else { }
		},
		error: function () {
			console.log("oduDivideGet error");
		}
	});
}

$('.mainback_flag').on('click', function (e) {////////////////////////////////   主备切换
	$(".onEror").remove();
	var val = $(this).val();
	$.ajax({
		url: '/action/mainBackChange',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				var count_sat = 0;
				var count_ant = 0
				var rx_freq_main = rsp.rx_freq_main / 1000; //单位GHz
				var rx_freq_back = rsp.rx_freq_back / 1000; //单位GHz
				var tx_freq_main = rsp.tx_freq_main / 1000; //单位GHz
				var tx_freq_back = rsp.tx_freq_back / 1000; //单位GHz					
				if (val == '1') {
					$('#mainback_flag1').prop('checked', true);
					$('.SatelliteResource').html(SatelliteResource);
					$('.ANTResource').html(ANTResource);
					$('.TXLocalOscillator').html(TXLocalOscillator);
					$('.RXLocalOscillator').html(RXLocalOscillator);
					$('input[name="tx_freq"]').val(tx_freq_main);
					$('input[name="rx_freq"]').val(rx_freq_main);
					var info_sat = rsp.info_sat;
					var optionname;
					$("#satellite_name option").remove();
					for (var i = 0; i < info_sat.length; i++) {
						optionname = info_sat[i].satellite_name;
						$("#satellite_name").append('<option value=' + optionname + '>' + optionname + '</option>');
					}
					$("#satellite_name option").each(function (i) {
						if (rsp.satellite_name_main == this.value) {
							$('#satellite_name').val(rsp.satellite_name_main);
							count_sat = 1;
						}
					});
					if (count_sat == 0) {
						optionname = choose_again;
						$("#satellite_name").append('<option value="blank">' + optionname + '</option>');
						$("#satellite_name").val("blank");
					}

					var info_ant = rsp.info_ant;
					var optionname_ant;
					$("#ANT_name option").remove();
					for (var i = 0; i < info_ant.length; i++) {
						optionname_ant = info_ant[i].ANT_name;
						$("#ANT_name").append('<option value=' + optionname_ant + '>' + optionname_ant + '</option>');
					}
					$("#ANT_name option").each(function (i) {
						if (rsp.antenna_name_main == this.value) {
							$('#ANT_name').val(rsp.antenna_name_main);
							count_ant = 1;
						}
					});
					if (count_ant == 0) {
						optionname = choose_again;
						$("#ANT_name").append('<option value="blank">' + optionname + '</option>');
						$("#ANT_name").val("blank");
					}
				} else {
					$('#mainback_flag2').prop('checked', true);
					$('.SatelliteResource').html(BackupSatelliteResource);
					$('.ANTResource').html(BackupANTResource);
					$('.TXLocalOscillator').html(BackupTXLocalOscillator);
					$('.RXLocalOscillator').html(BackupRXLocalOscillator);
					$('input[name="rx_freq"]').val(rx_freq_back);
					$('input[name="tx_freq"]').val(tx_freq_back);
					var info_sat = rsp.info_sat;
					var optionname;
					$("#satellite_name option").remove();
					for (var i = 0; i < info_sat.length; i++) {
						optionname = info_sat[i].satellite_name;
						$("#satellite_name").append('<option value=' + optionname + '>' + optionname + '</option>');
					}
					$("#satellite_name option").each(function (i) {
						if (rsp.satellite_name_back == this.value) {
							$('#satellite_name').val(rsp.satellite_name_back);
							count_sat = 1;
						}
					});
					if (count_sat == 0) {
						optionname = choose_again;
						$("#satellite_name").append('<option value="blank">' + optionname + '</option>');
						$("#satellite_name").val("blank");
					}

					var info_ant = rsp.info_ant;
					var optionname_ant;
					$("#ANT_name option").remove();
					for (var i = 0; i < info_ant.length; i++) {
						optionname_ant = info_ant[i].ANT_name;
						$("#ANT_name").append('<option value=' + optionname_ant + '>' + optionname_ant + '</option>');
					}
					$("#ANT_name option").each(function (i) {
						if (rsp.antenna_name_back == this.value) {
							$('#ANT_name').val(rsp.antenna_name_back);
							count_ant = 1;
						}
					});
					if (count_ant == 0) {
						optionname = choose_again;
						$("#ANT_name").append('<option value="blank">' + optionname + '</option>');
						$("#ANT_name").val("blank");
					}
				}
			} else { }
		},
		error: function () {
			console.log("oduDivideGet error");
		}
	});
});

var tx_power_now;
var tx_max_power_now;
var tx_p2p_freq_now;
var tx_p2p_symbol_now;
var tx_p2p_modulation_now;
var tx_p2p_frame_now;
var p2p_network_type_now;
var tx_power_mesh_now;
//发射配置数据
function oduTransmitGet() {
	$.ajax({
		url: '/action/oduTransmitGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			tx_power_now = Number(rsp.tx_power);
			tx_max_power_now = Number(rsp.tx_max_power);
			tx_p2p_freq_now = rsp.tx_p2p_freq;
			tx_p2p_symbol_now = rsp.tx_p2p_symbol;
			tx_p2p_modulation_now = rsp.tx_p2p_modulation;
			tx_p2p_frame_now = rsp.tx_p2p_frame;
			p2p_network_type_now = rsp.p2p_network_type;
			tx_power_mesh_now = Number(rsp.tx_power_mesh);
			if (rcstType == 0) {
				if (transceiverType == "boda") {
					$('input[name="tx_power"]').val(tx_power_now + 6);
					$('input[name="tx_max_power"]').val(tx_max_power_now + 6);
				} else {
					$('input[name="tx_power"]').val(tx_power_now);
					$('input[name="tx_max_power"]').val(tx_max_power_now);
				}
			} else if (rcstType == 1) {
				$('input[name="tx_power"]').val(tx_power_now);
				$('input[name="tx_max_power"]').val(tx_max_power_now);
				$('#rf_tx_type').val(txType);
				$('input[name="tx_p2p_freq"]').val(tx_p2p_freq_now / 10000000);//界面单位GHz
				$('input[name="tx_p2p_symbol"]').val(tx_p2p_symbol_now / 100);//界面单位Msps					
				$('#ACM_or_CCM').val(ACM_or_CCM);
				if (ACM_or_CCM == 0) {
					$('#Trans_CCM').show();
				}
				$('#tx_p2p_modulation').val(tx_p2p_modulation_now);
				$('#tx_p2p_frame').val(tx_p2p_frame_now);
				$('#p2p_network_type').val(p2p_network_type_now);
				changeCodeLength('get');
			} else if (rcstType == 2) {
				$('input[name="tx_power"]').val(tx_power_now + 3);
				$('input[name="tx_max_power"]').val(tx_max_power_now + 3);
				$('input[name="tx_power_mesh"]').val(tx_power_mesh_now + 3);
			} else { }
		},
		error: function () {
			console.log("oduTransmitGet error");
		}
	});
}
var long_value_now;
var lat_value_now;
var long_EW_now;
var lat_NS_now;
//位置信息
function oduLocationGet() {
	$.ajax({
		url: '/action/oduLocationGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			long_value_now = Number(rsp.long_value);
			lat_value_now = Number(rsp.lat_value);
			if (long_value_now >= -180 && long_value_now <= 0) {
				long_value_now = -long_value_now;
			}
			if (lat_value_now >= -90 && lat_value_now <= 0) {
				lat_value_now = -lat_value_now;
			}
			$('#ANT_longitude_EW').val(rsp.long_type);
			$('input[name="ANT_longitude"]').val(long_value_now);
			$('#ANT_latitude_NS').val(rsp.lat_type);
			$('input[name="ANT_latitude"]').val(lat_value_now);
		},
		error: function () {
			console.log("oduLocationGet error");
		}
	});
}

$(".CandidateBeamHelp").mouseover(function (e) {
	console.log(111);
	$("body").append('<div id="tooltip">' + BeamHelp + '</div>');
	$('#tooltip').css({
		position: "absolute",
		top: $(this).offset().top,
		left: $(this).offset().left + 30,
		color: "#55555",
		background: "#fff",
		border: "1px solid #3399FF",
		"border-radius": "3px",
		width: "250px",
		"font-size": "13px",
		padding: "4px 2px 4px 2px"
	}).show();
	console.log($(this).offset().top);
}).mouseout(function () {
	console.log(222);
	$('#tooltip').remove();
});


function changeCodeLength(type) {
	var lenType = 0;
	if ('get' == type) {
		lenType = Number(tx_p2p_frame_now);
	} else {
		lenType = Number($("#tx_p2p_frame").val());
	}

	if (1 == Number(lenType)) {
		$(".longMod").hide()
	}
	else {
		$(".longMod").show()
	}
}