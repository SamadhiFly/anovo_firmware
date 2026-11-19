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

rcstTypeGet();
langget();

var tmp_tr;
var network_type_trans = ["0", Twolayer, Threelayer, Mix];

console.log("rcstType=" + rcstType);
console.log("txType=" + txType);
if (rcstType == 1 && txType == 1) //SCPC P2P2
{
	$("#sppart").show();
	lanSCPCP2PInfoGet();
	wanNovrfInfoGet();
}
else {
	$("#mppart").show();
	managerNetworkGet();
	networkInfoGet();
}


/*管理口信息获取*/
function managerNetworkGet() {
	$.ajax({
		url: "/action/managerNetworkGet",
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			//~ if (rsp.code == 0) 
			if (1) {
				// $("#managerIP").html(rsp.managerIP);
				// $("#managerNetmask").html(rsp.managerNetmask);
				$("#rcstMac").html(rsp.rcstMac);
			}
			else {
				console.log("managerNetworkGet error1");
			}
		},
		error: function () {
			console.log("managerNetworkGet error2");
		}
	});
}

/*业务口信息获取*/
function networkInfoGet() {
	$.ajax({
		url: "/action/networkInfoGet",
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				networkInfoProcess(rsp);
			}
			else {
				$("#sateinfo_list").html("<tr><td class='center' colspan='8'>" + "无配置信息" + "</td></tr>");
			}
		},
		error: function () {
			console.log("satelliteGet error2");
		}
	});
}


function networkInfoProcess(rsp) {
	var info = rsp.info;
	var trarr = [];
	var tpl = $("#show_tr").html();
	$("#networkinfo_list").html(trarr.join(""));
	if ($.isArray(info) && info.length > 0) {
		for (var i = 0, len = info.length; i < len; i++) {
			var network_type = Number(info[i].network_type);

			if ("0" == info[i].tag) {
				info[i].tag = "Trunk";
			}
			else {
				info[i].tag = "ACCESS";
			}

			var tr = StringH.tmpl(tpl, {
				network_interface: info[i].network_interface,
				network_type: network_type_trans[network_type],
				tag: info[i].tag,
				vid: info[i].vid,
				// wanvrfip:info[i].wanvrfip,
				// wanvrfnetmask:info[i].wanvrfnetmask,
				lanvrfip: info[i].lanvrfip,
				lanvrfnetmask: info[i].lanvrfnetmask,
				dhcp_start_ip: info[i].dhcp_start_ip,
				dhcp_end_ip: info[i].dhcp_end_ip,
			});
			trarr.push(tr);
		}
		$("#networkinfo_list").html(trarr.join(""));
	}
	else {
		$("#sateinfo_list").html("<tr><td class='center' colspan='8'>" + "无配置信息" + "</td></tr>");
	}
}

/*SCPCP2P*/
function lanSCPCP2PInfoGet() {
	console.log(lanSCPCP2PInfoGet);
	$.ajax({
		url: '/action/lanNovrfInfoGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			lan_ip_now = rsp.lanIp;
			lan_mask_now = rsp.lanMask;
			lan_mtu_now = rsp.lanMtu;
			$('input[name="lan_ip_scpcp2p"]').val(lan_ip_now);
			$('input[name="lan_mask_scpcp2p"]').val(lan_mask_now);
			$('input[name="lan_mtu_scpcp2p"]').val(lan_mtu_now);
		},
		error: function () {
			console.log("lanNovrfInfoGet error");
		}
	});
}

function wanNovrfInfoGet() {
	console.log(wanNovrfInfoGet);
	$.ajax({
		url: '/action/wanNovrfInfoGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			//~ if (rsp.code == 0){
			if (1) {
				wan_type = rsp.wanType;
				wanMac = rsp.wanMac;
				static_ip_now = rsp.wanIp;
				static_mask_now = rsp.wanMask;
				$('input[name="static_ip"]').val(static_ip_now);
				$('input[name="static_mask"]').val(static_mask_now);
				$('.rcst_mac').html(wanMac);
			} else {
				console.log("wanInfoGet error1");
			}
		},
		error: function () {
			console.log("wanInfoGet error2");
		}
	});
}


function wanStaticSet() {
	$('input[title=static_ip]').trigger('blur');
	$('input[title=static_mask]').trigger('blur');
	if (ip_status == 0 || mask_status == 0) {
		return;
	}
	var static_ip = $('input[name=static_ip]').val();
	var static_mask = $('input[name=static_mask]').val();
	var requestData = {
		wan_type: "static",
		static_ip: static_ip,
		static_mask: static_mask
	};

	$("#wan_btn_sub").html(Processing)
	$.ajax({
		url: '/action/wanInfoSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_suc);
				wanNovrfInfoGet();
			} else {
				$.alert(setup_failed);
			}
		},
		error: function () {
			console.log("wanInfoSet error");
		}
	});
	$("#wan_btn_sub").html(Submit)
}

function lanSCPCP2P2InfoSet() {
	$('input[name=lan_ip_scpcp2p]').trigger('blur');
	$('input[name=lan_mask_scpcp2p]').trigger('blur');
	$('input[name=lan_mtu_scpcp2p]').trigger('blur');

	if (ip_scpcp2p_status == 0 || mask_status_scpcp2p == 0 || mtu_status_scpcp2p == 0) {
		return;
	}
	var lan_ip = $('input[name=lan_ip_scpcp2p]').val();
	var lan_mask = $('input[name=lan_mask_scpcp2p]').val();
	var lan_mtu = $('input[name=lan_mtu_scpcp2p]').val();
	var requestData = {
		lan_ip: lan_ip,
		lan_mask: lan_mask,
		lan_mtu: lan_mtu
	};

	$("#lan_btn_sub").html(Processing)
	$.ajax({
		url: '/action/lanSCPCP2P2InfoSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_suc);
				lanSCPCP2PInfoGet();
			} else {
				$.alert(setup_failed);
			}
		},
		error: function () {
			console.log("lanSCPCP2P2InfoSet error");
		}
	});
	$("#lan_btn_sub").html(Submit)
}
