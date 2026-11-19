rcstTypeGet();
langget();
// dialog confirm
(function ($) {
	$.alert = function (content, ok) {
		ok = ok || function () { };
		return $.dialog({
			width: 390,
			padding: '25px 30px',
			title: Proset,
			content: content,
			ok: ok,
			cancel: false
		});
	}
})(jQuery);
//等待弹窗
function wait() {
	dlgwait = $.dialog({
		width: 390,
		padding: '25px 30px',
		lock: true,
		title: Proset,
		content: $('#tmplWait').html(),
	});
}

prosetInfoGet();
function prosetInfoGet() {
	wait();
	$('#state1').html(state1_swtich);
	$.ajax({
		url: '/action/prosetInfoGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			console.log("rcstType=" + rcstType + " txType=" + txType);
			if (rcstType == 1 && txType == 1) {
				$('#tcpP2p').show();
				$('#tcpNormal').hide();
				$('#tcp_version').html(rsp.tcp_version);

				if (rsp.tcpStatus == 1) {
					$('#tcp_status_p2p')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#tcp_status_p2p')[0].className = 'btn-switch btn-switch-off';
				}
				//NAT、防火墙、路由和GRE
				$('#nat_switch').hide();
				$('#firewall_switch').hide();
				$('#Firewalldiv').hide();
				$('#GREdiv').hide();
				$('#Routesdiv').hide();
				//~ DNS
				$('#dnsNormal').hide();
				$('#dnsTrunk').hide();
				$('#dnsP2p').show();
				if (Number(rsp.dnsSwitch) == 0) {
					$('#dns_switch_p2p')[0].className = 'btn-switch btn-switch-off';
					$('#dns_make_switch_p2p').hide();
					$('.dns_ip_p2p').hide();
					$('#dns_submit_part').hide();
				} else {
					$('#dns_switch_p2p')[0].className = 'btn-switch btn-switch-on';
					$('#dns_make_switch_p2p').show();
					if (Number(rsp.dnsMake) == 1) {
						$('#dns_make_p2p')[0].className = 'btn-switch btn-switch-on';
						$('.dns_ip_p2p').show();
						$('#dns_submit_part').show();
						$('input[name=dns_main_p2p]').val(rsp.dnsMain);
						$('input[name=dns_back_p2p]').val(rsp.dnsBack);
					} else {
						$('#dns_make_p2p')[0].className = 'btn-switch btn-switch-off';
						$('.dns_ip_p2p').hide();
						$('#dns_submit_part').hide();
					}
				}
			}
			else {
				//2+3 or 3 ->all
				//2 ->firewall,tcp
				$('#tcpP2p').hide();
				$('#tcpNormal').show();
				$('#tcp_version').html(rsp.tcp_version);
				$('#tcp_version').css("color", "#8E8E8E");
				if (Number(rsp.tcpStatus) == 1) {
					$('#tcp_status').html(ON);
					$('#tcp_status').css("color", "#2673bf");
				} else {
					$('#tcp_status').html(OFF);
					$('#tcp_status').css("color", "#8E8E8E");
				}
				if (Number(rsp.g5g4Switch) == 1) {
					$('#g5g4Switch').html(ON);
					$('#g5g4Switch').css("color", "#2673bf");
				} else {
					$('#g5g4Switch').html(OFF);
					$('#g5g4Switch').css("color", "#8E8E8E");
				}
				if (Number(rsp.SDDPupdateswitch) == 0) {
					$('#multicastUpgradeStatus').html(ON);
					$('#multicastUpgradeStatus').css("color", "#2673bf");
				} else {
					$('#multicastUpgradeStatus').html(OFF);
					$('#multicastUpgradeStatus').css("color", "#8E8E8E");
				}

				$('#Firewalldiv').show();


				if (rsp.count3layer > 0) {
					$('#dnsNormal').hide();
					$('#dnsP2p').hide();
					$('#dnsTrunk').show();
					$('#redirectset').show();
					$('#Routesdiv').show();
				} else {
					$('#dnsNormal').hide();
					$('#dnsP2p').hide();
					$('#dnsTrunk').hide();
					$('#redirectset').hide();
					$('#Routesdiv').hide();
				}
			}
			dlgwait.close();
		},
		error: function () {
			console.log("prosetInfoGet error2");
		}
	});
}

/*点击NAT查看*/
$('#nat_view').on('click', function (e) {
	e.preventDefault();
	var contentTmpl;
	contentTmpl = $('#nat_content').html();
	selfaddDialog = $.dialog({
		title: NATList,
		content: contentTmpl,
		lock: true,
		padding: 0,
		width: 500
	});

	$('.Switch').html(Switch);
	natInfoVRFGet();
});

/*NAT列表获取*/
function natInfoVRFGet() {
	$.ajax({
		url: '/action/firewallNatVRFGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				var info = rsp.info;
				var trarr = [];
				var tpl = $('#nat_list_tr').html();
				$('#natlist_dialoglist').html(trarr.join(''));
				if ($.isArray(info) && info.length > 0) {
					for (var i = 0, len = info.length; i < len; i++) {
						if ("1" == info[i].nat_switch) {
							info[i].nat_switch = ON;
						}
						else {
							info[i].nat_switch = OFF;
						}
						var tr = StringH.tmpl(tpl, {
							vlanid: info[i].p_name,
							nat_switch: info[i].nat_switch,
						});
						trarr.push(tr);
					}
					$('#natlist_dialoglist').html(trarr.join(''));
				} else {
					$('#natlist_dialoglist').html('<tr><td class="center" colspan="2">' + no_content + '</td></tr>');
				}
			} else {
				$('#natlist_dialoglist').html('<tr><td class="center" colspan="2">' + no_content + '</td></tr>');
			}
		},
		error: function () {
			console.log("prosetInfoGet error2");
		}
	});
}


/*点击端口转发查看*/
$('#natrule_view').on('click', function (e) {
	e.preventDefault();
	var contentTmpl;
	if (rcstType == 1 && txType == 1) {
		contentTmpl = $('#natport_p2p_content').html();
		selfaddDialog = $.dialog({
			title: dialog_natport,
			content: contentTmpl,
			lock: true,
			padding: 0,
			width: 800
		});
	} else {
		contentTmpl = $('#natport_content_trunk').html();
		selfaddDialog = $.dialog({
			title: dialog_natport,
			content: contentTmpl,
			lock: true,
			padding: 0,
			width: 800
		});
	}

	$('.Switch').html(Switch);
	$('.Protocol').html(Protocol);
	$('.TargetIP').html(TargetIP);
	$('.StartPort').html(StartPort);
	$('.EndPort').html(EndPort);
	$('.Description').html(Description);
	$('.Interface').html(Interface);
	$('.Option').html(Option);
	natportInfoGet();
});

var num = 0;
var oldname = {};
var old_start_port = {};
var old_end_port = {};
var old_redirect_proto = {};

/*端口转发列表获取*/
function natportInfoGet() {
	$.ajax({
		url: '/action/natportInfoVRFGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (rcstType == 1 && txType == 1) {
					var info = rsp.info;
					var trarr = [];
					var tpl;
					tpl = $('#natport_p2p_list').html();
					$('.addbtn').fadeIn();
					$('.submitbtn').hide();
					$('#redirect_dialogtestlist').html(trarr.join(''));
					if ($.isArray(info) && info.length > 0) {
						for (var i = 0, len = info.length; i < len; i++) {
							var tr = StringH.tmpl(tpl, {
								redirect_proto: info[i].redirect_proto,
								inside_ip: info[i].inside_ip,
								start_port: info[i].start_port,
								end_port: info[i].end_port,
								discribe: info[i].discribe,
							});
							trarr.push(tr);
							oldname[i] = info[i].discribe;
							old_start_port[i] = info[i].start_port;
							old_end_port[i] = info[i].end_port;
							old_redirect_proto[i] = info[i].redirect_proto;

						}
						num = i;
						$('#redirect_dialogtestlist').html(trarr.join(''));
					} else {
						$('#redirect_dialogtestlist').html('<tr><td class="center" colspan="6">' + no_content + '</td></tr>');
					}
				} else {
					var info = rsp.info;
					var trarr = [];
					var tpl;
					tpl = $('#natport_list_trunk').html();
					$('#natport_dialoglist_trunk').html(trarr.join(''));
					//TRUNK
					if ($.isArray(info) && info.length > 0) {
						for (var i = 0, len = info.length; i < len; i++) {
							if (info[i].vlanid_nat_switch == 1) {
								nat_switch = ON;
							} else {
								nat_switch = OFF;
							}
							var vlan_id_tmp = info[i].vlan_id.split("vlannat_trunk_")
							var tr = StringH.tmpl(tpl, {
								vlan_id: vlan_id_tmp[1],
								nat_switch: nat_switch,
								redirect_proto: info[i].redirect_proto,
								inside_ip: info[i].inside_ip,
								start_port: info[i].start_port,
								end_port: info[i].end_port,
								discribe: info[i].discribe,
							});
							trarr.push(tr);
						}
						num = i;
						$('#natport_dialoglist_trunk').html(trarr.join(''));
					} else {
						$('#natport_dialoglist_trunk').html('<tr><td class="center" colspan="6">' + no_content + '</td></tr>');
					}
				}
			} else {
				if (rcstType == 1 && txType == 1) {
					$('#redirect_dialogtestlist').html('<tr><td class="center" colspan="6">' + no_content + '</td></tr>');
				} else {
					$('#natport_dialoglist_trunk').html('<tr><td class="center" colspan="6">' + no_content + '</td></tr>');
				}
			}
		},
		error: function () {
			console.log("prosetInfoGet error2");
		}
	});
}




/*点击防火墙查看*/
$('#firewall_view').on('click', function (e) {
	e.preventDefault();
	var contentTmpl;
	contentTmpl = $('#firewall_content').html();
	selfaddDialog = $.dialog({
		title: FirewallList,
		content: contentTmpl,
		lock: true,
		padding: 0,
		width: 500
	});

	$('.Switch').html(Switch);
	firewallInfoVRFGet();
});

/*防火墙列表获取*/
function firewallInfoVRFGet() {
	$.ajax({
		url: '/action/firewallNatVRFGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				var info = rsp.info;
				var trarr = [];
				var tpl = $('#firewall_list_tr').html();
				$('#firewalllist_dialoglist').html(trarr.join(''));
				if ($.isArray(info) && info.length > 0) {
					for (var i = 0, len = info.length; i < len; i++) {
						if ("1" == info[i].firewall_switch) {
							info[i].firewall_switch = ON;
						}
						else {
							info[i].firewall_switch = OFF;
						}
						var tr = StringH.tmpl(tpl, {
							vlanid: info[i].p_name,
							firewall_switch: info[i].firewall_switch,
						});
						trarr.push(tr);
					}
					$('#firewalllist_dialoglist').html(trarr.join(''));
				} else {
					$('#firewalllist_dialoglist').html('<tr><td class="center" colspan="2">' + no_content + '</td></tr>');
				}
			} else {
				$('#firewalllist_dialoglist').html('<tr><td class="center" colspan="2">' + no_content + '</td></tr>');
			}
		},
		error: function () {
			console.log("firewallNatVRFGet error2");
		}
	});
}


/*点击防火墙规则查看*/
$('#firewall_btnTestSet').on('click', function (e) {
	e.preventDefault();
	var contentTmpl;
	contentTmpl = $('#tmplTsetSet_firewall_trunk').html();
	selfaddDialog = $.dialog({
		title: FirewallList,
		content: contentTmpl,
		lock: true,
		padding: 0,
		width: 1350
	});

	getFirewallList();
	$('.Switch').html(Switch);
	$('.Name').html(Name);
	$('.Protocoltype').html(Protocoltype);
	$('.SourceMAC').html(SourceMAC);
	$('.SourceZone').html(SourceZone);
	$('.SourceIP').html(SourceIP);
	$('.SourceStartPort').html(SourceStartPort);
	$('.SourceEndPort').html(SourceEndPort);
	$('.DestinationZone').html(DestinationZone);
	$('.DescriptionIP').html(DescriptionIP);
	$('.DescriptionStratPort').html(DescriptionStratPort);
	$('.DescriptionEndPort').html(DescriptionEndPort);
	$('.Pollcy').html(Pollcy);
});

/*防火墙规则列表获取*/
function getFirewallList() {
	$.ajax({
		url: '/action/firewallVRFGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				//TRUNK
				var info = rsp.info;
				var trarr = [];
				$('#firewall_listAdd').html(trarr.join(''));
				if ($.isArray(info) && info.length > 0) {
					for (var i = 0, len = info.length; i < len; i++) {
						if (info[i].vlanid_firewall_switch == '0') {
							info[i].vlanid_firewall_switch = OFF;
						} else {
							info[i].vlanid_firewall_switch = ON;
						}
						var vlanid_tmp = info[i].vlanid.split("vlanfirewall_trunk_")
						var tpl = $('#firewall_tmplAddedTest_trunk').html();
						if ("" == info[i].name) { info[i].name = "-"; }
						if ("" == info[i].protocol_type) { info[i].protocol_type = "-"; }
						if ("" == info[i].source_MAC) { info[i].source_MAC = "-"; }
						if ("" == info[i].source_zone) { info[i].source_zone = "-"; }
						if ("" == info[i].source_ip) { info[i].source_ip = "-"; }
						if ("" == info[i].source_start_port) { info[i].source_start_port = "-"; }
						if ("" == info[i].source_end_port) { info[i].source_end_port = "-"; }
						if ("" == info[i].destination_zone) { info[i].destination_zone = "-"; }
						if ("" == info[i].dest_ip) { info[i].dest_ip = "-"; }
						if ("" == info[i].destination_start_port) { info[i].destination_start_port = "-"; }
						if ("" == info[i].destination_end_port) { info[i].destination_end_port = "-"; }
						if ("" == info[i].pollcy) { info[i].pollcy = "-"; }
						var tr = StringH.tmpl(tpl, {
							list: vlanid_tmp[1],
							vlanid_firewall_switch: info[i].vlanid_firewall_switch,
							name: info[i].name,
							protocol_type: info[i].protocol_type,
							source_MAC: info[i].source_MAC,
							source_zone: info[i].source_zone,
							sourceIP: info[i].source_ip,
							source_start_port: info[i].source_start_port,
							source_end_port: info[i].source_end_port,
							destination_zone: info[i].destination_zone,
							destinationIP: info[i].dest_ip,
							destination_start_port: info[i].destination_start_port,
							destination_end_port: info[i].destination_end_port,
							pollcy: info[i].pollcy
						});
						trarr.push(tr);
					}
					$('#firewall_listAdd').html(trarr.join(''));
				} else {
					$('#firewall_listAdd').html('<tr><td class="center" colspan="13">' + nofirewall + '</td></tr>');
				}
			}
			else {
				$('#firewall_listAdd').html('<tr><td class="center" colspan="13">' + error_content + '</td></tr>');
			}
		},
		error: function () {
			console.log("firewall_req error");
		}

	});
}

/*点击DNS查看*/
$('#DNS_view').on('click', function (e) {
	e.preventDefault();
	var contentTmpl;
	contentTmpl = $('#dns_content').html();
	selfaddDialog = $.dialog({
		title: 'DNS',
		content: contentTmpl,
		lock: true,
		padding: 0,
		width: 790
	});
	$('.VlanID').html('Vlan');
	$('.Switch').html(Switch);
	$('.DNSMake').html(DNSMake);
	$('.DNSMain').html(DNSMain);
	$('.DNSBack').html(DNSBack);
	dnsInfoGet();
})

/*dns列表获取*/
function dnsInfoGet() {
	$.ajax({
		url: '/action/dnsInfoVRFGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				var info = rsp.info;
				var trarr = [];
				$('#dns_dialoglist').html();
				if ($.isArray(info) && info.length > 0) {
					for (var i = 0, len = info.length; i < len; i++) {
						if (info[i].dns_switch == 0) {
							info[i].dns_switch = OFF;
						} else {
							info[i].dns_switch = ON;
						}
						if (info[i].dns_make == 0) {
							info[i].dns_make = OFF;
						} else {
							info[i].dns_make = ON;
						}
						var tpl = $('#dns_list').html();
						var vlanid_tmp = info[i].vlanid.split("vlan");
						var tr = StringH.tmpl(tpl, {
							vlanid: vlanid_tmp[1],
							dns_switch: info[i].dns_switch,
							dns_make: info[i].dns_make,
							dns_main: info[i].dns_main,
							dns_back: info[i].dns_back
						});
						trarr.push(tr);
					}
					$('#dns_dialoglist').html(trarr.join(''));
				} else {
					$('#dns_dialoglist').html('<tr><td class="center" colspan="5">' + no_content + '</td></tr>');
				}
			} else if (rsp.code == -2) {
				$('#dns_dialoglist').html('<tr><td class="center" colspan="5">' + no_content + '</td></tr>');
			} else {
				$('#dns_dialoglist').html('<tr><td class="center" colspan="5">' + error_content + '</td></tr>');
			}
		}
	});
}


/*点击GRE查看*/
$('#gre_view').on('click', function (e) {
	e.preventDefault();
	var contentTmpl;
	contentTmpl = $('#gre_content').html();
	selfaddDialog = $.dialog({
		title: 'GRE',
		content: contentTmpl,
		lock: true,
		padding: 0,
		width: 770
	});
	$('.Num').html('Vlan');
	$('.tunid').html(tunid);
	$('.tunvlanid').html(tunvlanid);
	$('.tunname').html(tunname);
	$('.tunremotewanip').html(tunremotewanip);
	$('.tunlocalwanip').html(tunlocalwanip);
	$('.tunlocallanip').html(tunlocallanip);
	greInfoGet();
})

/*GRE列表获取*/
function greInfoGet() {
	$.ajax({
		url: '/action/greInfoGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				var info = rsp.info;
				var trarr = [];
				$('#gre_dialoglist').html();
				if ($.isArray(info) && info.length > 0) {
					for (var i = 0, len = info.length; i < len; i++) {
						var tpl = $('#gre_list').html();
						var tr = StringH.tmpl(tpl, {
							tunvlanid: info[i].tunvlanid,
							tunid: info[i].tunid,
							tunname: info[i].tunname,
							tunremotewanip: info[i].tunremotewanip,
							tunlocalwanip: info[i].tunlocalwanip,
							tunlocallanip: info[i].tunlocallanip
						});
						trarr.push(tr);
					}
					$('#gre_dialoglist').html(trarr.join(''));
				} else {
					$('#gre_dialoglist').html('<tr><td class="center" colspan="6">' + no_content + '</td></tr>');
				}
			} else if (rsp.code == -2) {
				$('#gre_dialoglist').html('<tr><td class="center" colspan="6">' + no_content + '</td></tr>');
			} else {
				$('#gre_dialoglist').html('<tr><td class="center" colspan="6">' + error_content + '</td></tr>');
			}
		}
	});
}

/*点击静态路由查看*/
$('#route_view').on('click', function (e) {
	e.preventDefault();
	var contentTmpl;
	if (rcstType == 1 && txType == 1) {
		contentTmpl = $('#route_p2p_content').html();
	} else {
		contentTmpl = $('#route_content').html();
	}
	selfaddDialog = $.dialog({
		title: dialog_route,
		content: contentTmpl,
		lock: true,
		padding: 0,
		width: 770
	});
	$('.Num').html(Num);
	$('.TargetIP').html(TargetIP);
	$('.Netmask').html(Netmask);
	$('.Gateway').html(Gateway);
	$('.Interface').html(Interface);
	$('.Option').html(Option);
	routeInfoGet();
})


/*静态路由列表获取*/
function routeInfoGet() {
	$.ajax({
		url: '/action/routeInfoVRFGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				var info = rsp.info;
				var trarr = [];
				var tpl;
				if (rcstType == 1 && txType == 1) {
					$('.addbtn').fadeIn();
					$('.submitbtn').hide();
					tpl = $('#route_p2p_list').html();
					$('#route_p2p_dialoglist').html(trarr.join(''));
				} else {
					tpl = $('#route_list').html();
					$('#route_dialoglist').html(trarr.join(''));
				}
				if ($.isArray(info) && info.length > 0) {
					for (var i = 0, len = info.length; i < len; i++) {
						var targetmask = info[i].route_ip;
						var strs = targetmask.split("/");
						var tr = StringH.tmpl(tpl, {
							list: i + 1,
							target: strs[0],
							netmask: strs[1],
							gateway: info[i].route_gateway,
							iface: info[i].route_iface
						});
						trarr.push(tr);
					}
					if (rcstType == 1 && txType == 1) {
						$('#route_p2p_dialoglist').html(trarr.join(''));
					} else {
						$('#route_dialoglist').html(trarr.join(''));
					}
				} else {
					$('#route_dialoglist').html('<tr><td class="center" colspan="5">' + no_content + '</td></tr>');
				}
			} else {
				if (rcstType == 1 && txType == 1) {
					$('#route_p2p_dialoglist').html('<tr><td class="center" colspan="5">' + no_content + '</td></tr>');
				} else {
					$('#route_dialoglist').html('<tr><td class="center" colspan="4">' + no_content + '</td></tr>');
				}
			}
		}
	});
}




///////////////////////////////////////////////保留，但没用 start///////////////////////////////////////////
$('#nat_status_p2p').on('click', function (e) {
	var natSwitch = $('#nat_status_p2p').hasClass('btn-switch-on') ? 0 : 1;
	var dlgwait = $.dialog({
		width: 390,
		padding: 25,
		lock: true,
		title: 'NAT',
		content: $('#tmplWait').html()
	});
	var requestData = {
		natSwitch: natSwitch
	};
	e.preventDefault();
	$.ajax({
		url: '/action/natSwitchSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (natSwitch == 1) {
					$('#state1').html(switch_open);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#nat_status_p2p')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#state1').html(switch_close);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#nat_status_p2p')[0].className = 'btn-switch btn-switch-off';
				}
				prosetInfoGet();
			} else {
				$('#state1').html(switch_error);
			}
		},
		error: function () {
			console.log("nat_switch_set error");
		}
	});
});

//端口转发删除列表函数
var redirect_unbind_route = function (e, target_ip) {
	e.preventDefault();
	var that = this,
		$this = $(that);
	var target_ip = $this.attr('redirect_target_del');
	var requestData = {
		target_ip: target_ip
	};
	$.ajax({
		url: '/action/natportInfoDel',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_suc);
				natportInfoGet();
				$('.addbtn').fadeIn();
				$('.submitbtn').hide();

			}
			else {
				$.alert(setup_failed);
				$('.addbtn').fadeIn();
				$('.submitbtn').hide();
			}
		}
	});
	$('.addbtn').fadeIn();
};

//端口转发取消添加规则
$('body').delegate('#redirect_deloneitem', 'click', function (e) {
	e.preventDefault();
	var tar = e.target;
	var tr = $(tar).parents('tr');
	var form = $('#redirect_dialogtestlist');
	var btnSubmit = $('#redirect_submitbandlist');
	var isEmpty = (function () {
		var empty = true;
		tr.find('input').each(function () {
			if (this.value !== '') {
				empty = false;
				return false;
			}
		});
		return empty;
	}());
	var ok = function () {
		tr.remove();
		if (form.find('tr').length > 0) {
			$('.addbtn').fadeIn();
			$('.submitbtn').hide();
		}
		else {
			$('.submitbtn').hide();
		}
	};

	ok();
	$('.addbtn').fadeIn();
});


var check_ip;
var check_start_port;
var check_end_port;
var check_discribe;
var ip_status = 0;
var start_port_status = 0;
var end_port_status = 0;
var discribe_status = 0;
var discribe_status = 0;
re = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/;
re1 = /^-?[0-9]+\.[0-9]+ *$/;
re2 = /^-?[0-9]+ *$/;
re3 = /^ *$/;

//端口转发添加规则
$('body').delegate('#redirect_addoneitem', 'click', function (e) {
	e.preventDefault();
	var lanipaddress,
		requestData = {},
		ipSplit = function (ip) {
			var ipSplit = [];
			var strs = ip.split(".");
			for (var i = 0; i < strs.length - 1; i++) {
				ipSplit.push(strs[i]);
			}
			return ipSplit.join('.') + '.';
		};
	var tpl = $('#redirect_tpldevitem').html(),
		form = $('#redirect_dialogtestlist'),
		btnSubmit = $('#redirect_submitbandlist'),
		lastidx = (function () {
			if (form.find('tr').length > 0) {
				return form.find('tr:last').attr('data-idx');
			}
			return 0;
		}()),

		lastidx = parseInt(lastidx, 10),
		item = tpl.tmpl({
			idx: lastidx + 1
		});
	var index = form.append(item);
	check_ip = index.find('input:first');
	check_start_port = index.find('input:eq(1)');
	check_end_port = index.find('input:eq(2)');
	check_discribe = index.find('input:eq(3)');
	//校验ip
	check_ip.blur(function () {
		var $parent = $(this).parent();
		$parent.find(".formips").remove();
		//if( $(this).is('#inside_ip') ){
		if (re3.test(this.value)) {
			$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
			ip_status = 0;
		} else if (!re.test(this.value)) {
			$parent.append('<span class= "formips onEror" >' + validate_ip + '</span>');
			ip_status = 0;
		} else {
			$parent.append('<span class= "formips onSuccess" ></span>');
			ip_status = 1;
		}
		//} else{}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});
	//起始端口
	check_start_port.blur(function () {
		var $parent = $(this).parent();
		$parent.find(".formips").remove();
		if ($(this).is('#start_port')) {
			if (re3.test(this.value)) {
				$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
				start_port_status = 0;
			} else if (!re2.test(this.value) && !re1.test(this.value)) {
				$parent.append('<span class= "formips onEror" >' + validate_number + '</span>');
				start_port_status = 0;
			} else if (!re2.test(this.value) && re1.test(this.value)) {
				$parent.append('<span class= "formips onEror" >' + validate_integer + '</span>');
				start_port_status = 0;
			} else if (Number(this.value) > 65536) {
				$parent.append('<span class= "formips onEror" >' + validate_greater + '65536' + '</span>');
				start_port_status = 0;
			} else if (Number(this.value) < 0) {
				$parent.append('<span class= "formips onEror" >' + validate_less + ' 0' + '</span>');
				start_port_status = 0;
			} else {
				$parent.append('<span class= "formips onSuccess" ></span>');
				start_port_status = 1;
			}
		} else { }
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});
	//结束端口
	check_end_port.blur(function () {
		var $parent = $(this).parent();
		$parent.find(".formips").remove();
		if ($(this).is('#end_port')) {
			if (re3.test(this.value)) {
				$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
				end_port_status = 0;
			} else if (!re2.test(this.value) && !re1.test(this.value)) {
				$parent.append('<span class= "formips onEror" >' + validate_number + '</span>');
				end_port_status = 0;
			} else if (!re2.test(this.value) && re1.test(this.value)) {
				$parent.append('<span class= "formips onEror" >' + validate_integer + '</span>');
				end_port_status = 0;
			} else if (Number(this.value) > 65536) {
				$parent.append('<span class= "formips onEror" >' + validate_greater + '65536' + '</span>');
				end_port_status = 0;
			} else if (Number(this.value) < 0) {
				$parent.append('<span class= "formips onEror" >' + validate_less + ' 0' + '</span>');
				end_port_status = 0;
			} else {
				$parent.append('<span class= "formips onSuccess" ></span>');
				end_port_status = 1;
			}
		} else { }
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});
	//名称	
	check_discribe.blur(function () {
		var $parent = $(this).parent();
		$parent.find(".formips").remove();
		if ($(this).is('#discribe')) {
			if (re3.test(this.value)) {
				$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
				discribe_status = 0;
			} else {
				$parent.append('<span class= "formips onSuccess" ></span>');
				discribe_status = 1;
			}
		} else { }
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	if (form.find('tr').length > 0) {
		$('.addbtn').hide();
		$('.submitbtn').fadeIn();
	}
	else {
		$('.submitbtn').hide();
	}
	$("#interface").append("<option value='wan6'><%:wan6%></option>");

});

//端口转发添加通信规则到配置文件并生效
$('body').delegate('#redirect_listAdd', 'submit', function (e) {
	e.preventDefault();
	var form = e.target,
		formName = form.name,
		action = this.action,

		formels = $('input', form),
		rules,
		name,
		display,
		validator,
		formdata,
		iplist = [],
		formdata,
		formdataojb,
		repeatIP,
		validerules = [],
		redirect_proto = $('#redirect_proto').val(),
		inside_ip = $('input[name=inside_ip]').val(),
		start_port = $('input[name=start_port]').val(),
		end_port = $('input[name=end_port]').val(),
		discribe = $('input[name=discribe]').val(),
		requestData;
	requestData = {
		redirect_proto: redirect_proto,
		inside_ip: inside_ip,
		start_port: start_port,
		end_port: end_port,
		discribe: discribe
	};

	check_ip.trigger('blur');
	check_start_port.trigger('blur');
	check_end_port.trigger('blur');
	check_discribe.trigger('blur');
	if (ip_status == 1 && start_port_status == 1 && end_port_status == 1 && discribe_status == 1) {
		for (var i = 0; i < num; i++) {
			if (discribe == oldname[i]) {
				alert(same_description);
				return;
			}
		}
		if (eval(start_port) > eval(end_port)) {
			alert(start_port);
			return;
		}
		else {
			for (var i = 0; i < num; i++) {
				if (!(redirect_proto.length == 3 && old_redirect_proto[i].length == 3 && redirect_proto != old_redirect_proto[i])) {
					if ((eval(start_port) == eval(old_start_port[i])) && (eval(end_port) == eval(old_end_port[i]))) {
						alert(same_port);
						return;
					}
					if ((eval(start_port) <= eval(old_start_port[i]) && eval(end_port) >= eval(old_start_port[i])) || (eval(start_port) >= eval(old_start_port[i]) && eval(start_port) <= eval(old_end_port[i]))) {
						alert(port_conflict);
						return;
					}
				}
			}
		}
		$.ajax({
			url: '/action/natportInfoSet',
			data: requestData,
			type: "POST",
			dataType: "json",
			async: false,
			success: function (rsp) {
				if (rsp.code == 0) {
					$.alert(setup_suc);
					natportInfoGet();
				}
				else {
					alert(start_port);
				}
			}
		});
	}
});

//端口转发删除列表中的某行配置参数
$('body').delegate('#redirect_submit_dellist', 'click', function (e) {
	var that = this,
		$this = $(that),
		target_ip = $this.attr('redirect_target_del'),
		ok = function () {
			redirect_unbind_route.call(that, e, target_ip);
		};
	ok();
});
///////////////////////////////////////////////保留，但没用 end///////////////////////////////////////////

///////////////////////////////////////////////保留，但没用 start///////////////////////////////////////////
/*删除路由列表函数*/
var unbind_route = function (e, target_ip, gateway_ip) {
	e.preventDefault();
	var that = this,
		$this = $(that),
		target_ip = $this.attr('target_del'),
		gateway_ip = $this.attr('gateway_del');
	var requestData = {
		target_ip: target_ip,
		gateway_ip: gateway_ip
	};
	$.ajax({
		url: '/action/routeInfoDel',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_suc);
				routeInfoGet();
				$('.addbtn').fadeIn();
				$('.submitbtn').hide();

			}
			else {
				$.alert(setup_failed);
				$('.addbtn').fadeIn();
				$('.submitbtn').hide();
			}
		}
	});
}

/*取消添加路由*/
$('body').delegate('#deloneitem', 'click', function (e) {
	e.preventDefault();

	var tar = e.target;
	var tr = $(tar).parents('tr');
	var form = $('#dialogtestlist');
	var btnSubmit = $('#submitbandlist');
	var isEmpty = (function () {
		var empty = true;
		tr.find('input').each(function () {
			if (this.value !== '') {
				empty = false;
				return false;
			}
		});
		return empty;
	}());
	var ok = function () {
		tr.remove();
		if (form.find('tr').length > 0) {
			$('.addbtn').fadeIn();
			$('.submitbtn').hide();
		}
		else {
			$('.submitbtn').hide();

		}
	};
	ok();
	$('.addbtn').fadeIn();
});


var ip_status = 0;
var mask_status = 0;
var gateway_status = 0;
re = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/;
re1 = /^-?[0-9]+\.[0-9]+ *$/;
re2 = /^-?[0-9]+ *$/;
re3 = /^ *$/;
/*添加路由*/
$('body').delegate('#addoneitem', 'click', function (e) {
	e.preventDefault();
	var tpl = $('#tpldevitem').html(),
		form = $('#route_p2p_dialoglist'),
		btnSubmit = $('#submitbandlist'),
		lastidx = (function () {
			if (form.find('tr').length > 0) {
				return form.find('tr:last').attr('data-idx');
			}
			return 0;
		}()),
		lastidx = parseInt(lastidx, 10),
		item = tpl.tmpl({
			idx: lastidx + 1
		});
	var index = form.append(item);
	check_ip = index.find('input:first');
	check_netmask = index.find('input:eq(1)');
	check_gateway = index.find('input:eq(2)');


	//校验ip
	check_ip.blur(function () {
		var $parent = $(this).parent();
		$parent.find(".formips").remove();
		if (re3.test(this.value)) {
			$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
			ip_status = 0;
		} else if (!re.test(this.value)) {
			$parent.append('<span class= "formips onEror" >' + validate_ip + '</span>');
			ip_status = 0;
		} else {
			$parent.append('<span class= "formips onSuccess" ></span>');
			ip_status = 1;
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	//校验netmask
	check_netmask.blur(function () {
		var $parent = $(this).parent();
		$parent.find(".formips").remove();
		if (re3.test(this.value)) {
			$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
			mask_status = 0;
		} else if (!re1.test(this.value) && !re2.test(this.value)) {
			$parent.append('<span title="formips" class= "onEror" >' + validate_number + '</span>');
			mask_status = 0;
		} else if (Number(this.value) > 32) {
			$parent.append('<span title="formips" class= "onEror" >' + validate_greater + '32' + '</span>');
			mask_status = 0;
		} else if (Number(this.value) < 8) {
			$parent.append('<span title="formips" class= "onEror" >' + validate_less + '8' + '</span>');
			mask_status = 0;
		} else {
			mask_status = 1;
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	//校验gateway
	check_gateway.blur(function () {
		var $parent = $(this).parent();
		$parent.find(".formips").remove();
		if (re3.test(this.value)) {
			$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
			gateway_status = 0;
		} else if (!re.test(this.value)) {
			$parent.append('<span class= "formips onEror" >' + validate_ip + '</span>');
			gateway_status = 0;
		} else {
			$parent.append('<span class= "formips onSuccess" ></span>');
			gateway_status = 1;
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	if (form.find('tr').length > 0) {
		$('.addbtn').hide();
		$('.submitbtn').fadeIn();
	}
	else {
		$('.submitbtn').hide();
	}
});

/*添加路由到配置文件并生效*/
$('body').delegate('#listAdd', 'submit', function (e) {
	e.preventDefault();
	check_ip.trigger('blur');
	check_netmask.trigger('blur');
	check_gateway.trigger('blur');
	if (ip_status == 1 && mask_status == 1 && gateway_status == 1) {
		var cmd,
			interface = $('#interface').val(),
			target = $('input[name=target]').val(),
			netmask = $('input[name=netmask]').val(),
			gateway = $('#gateway').val();
		if (interface == "lan") {
			interface = "br-lan";
		} else {
			interface = "sn0";
		}
		cmd = "route add -net " + target + "/" + netmask + " gateway " + gateway + " dev " + interface;
		//~ route add -net 10.6.36.0/24 gateway 10.6.20.3 dev br-lan
		var requestData = {
			cmd: cmd
		};
		$.ajax({
			url: '/action/routeInfoSet',
			data: requestData,
			type: "POST",
			dataType: "json",
			async: false,
			success: function (rsp) {
				if (rsp.code == 0) {
					$.alert(setup_suc);
					routeInfoGet();
				} else {
					alert(setup_failed);
				}
			}
		});
	}
});

/*删除路由列表中的某行配置参数*/
$('body').delegate('#submit_del_list', 'click', function (e) {
	e.preventDefault();
	var that = this,
		$this = $(that);
	var target = $this.attr('target_del'),
		gateway = $this.attr('gateway_del');
	var requestData = {
		target: target,
		gateway: gateway
	};
	$.ajax({
		url: '/action/routeInfoDel',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_suc);
				routeInfoGet();
				$('.addbtn').fadeIn();
				$('.submitbtn').hide();
			}
			else {
				$.alert(setup_failed);
				$('.addbtn').fadeIn();
				$('.submitbtn').hide();
			}
		}
	});
	$('.addbtn').fadeIn();
});
///////////////////////////////////////////////保留，但没用 end///////////////////////////////////////////

///////////////////////////////////////////////保留，但没用 start///////////////////////////////////////////	
//~ function dns_get(){
//~ console.log("dns_get ");
//~ $.ajax({
//~ url: '/action/prosetInfoGet',
//~ type: "POST",
//~ dataType: "json",
//~ async: false,
//~ success : function(rsp){
//~ if (Number(rsp.dnsSwitch) == 0){
//~ $('#dns_switch_p2p')[0].className = 'btn-switch btn-switch-off';
//~ $('#dns_make_switch_p2p').hide();
//~ $('.dns_ip_p2p').hide();
//~ $('#dns_submit_part').hide();
//~ }else{	
//~ if (Number(rsp.dnsMake) == 1){
//~ $('#dns_make_p2p')[0].className = 'btn-switch btn-switch-on';
//~ $('#dns_make_switch_p2p').show();
//~ $('.dns_ip_p2p').show();
//~ $('#dns_submit_part').show();
//~ $('input[name=dns_main_p2p]').val(rsp.dnsMain);
//~ $('input[name=dns_back_p2p]').val(rsp.dnsBack);
//~ }else{
//~ $('#dns_make_p2p')[0].className = 'btn-switch btn-switch-off';
//~ $('#dns_make_switch_p2p').show();
//~ $('.dns_ip_p2p').hide();
//~ $('#dns_submit_part').hide();
//~ }						
//~ }
//~ },
//~ error:function(){
//~ console.log("dns_get error");
//~ }
//~ });				
//~ }

$('#dns_switch_p2p').on('click', function (e) {
	console.log("dns_switch");
	var status = $('#dns_switch_p2p').hasClass('btn-switch-on') ? 0 : 1;
	var requestData = {
		status: status
	};
	$.ajax({
		url: '/action/set_dns_switch',
		type: "POST",
		dataType: "json",
		data: requestData,
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (status == 1) {
					$('#dns_switch_p2p')[0].className = 'btn-switch btn-switch-on';
					$('#dns_make_switch_p2p').show();
				} else {
					$('#dns_switch_p2p')[0].className = 'btn-switch btn-switch-off';
					$('#dns_make_switch_p2p').hide();
					$('.dns_ip_p2p').hide();
					$('#dns_submit_part').hide();
				}
			} else {
				location.reload(true);
			}
		},
		error: function () {
			console.log("dns_switch_set error");
		}
	});
});

$('#dns_make_p2p').on('click', function (e) {
	console.log("dns_make");
	var status = $('#dns_make_p2p').hasClass('btn-switch-on') ? 0 : 1;
	var requestData = {
		status: status
	};
	$.ajax({
		url: '/action/set_dns_make',
		type: "POST",
		dataType: "json",
		data: requestData,
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (status == 1) {
					$('#dns_make_p2p')[0].className = 'btn-switch btn-switch-on';
					$('.dns_ip_p2p').show();
					$('#dns_submit_part').show();
				} else {
					$('#dns_make_p2p')[0].className = 'btn-switch btn-switch-off';
					$('.dns_ip_p2p').hide();
					$('#dns_submit_part').hide();
				}
			} else {
				location.reload(true);
			}
		},
		error: function () {
			console.log("dns_make_set error");
		}
	});
});

$('#dnsform').on('submit', function (e) {
	console.log("dnsSubmit");
	var dnsSwitch = $('#dns_switch_p2p').hasClass('btn-switch-on') ? 1 : 0;
	var dnsMake, dns_main, dns_back;
	if (dnsSwitch == 0) {
		dnsMake = 0;
		dns_main = "0.0.0.0";
		dns_back = "0.0.0.0";
	} else {
		dnsMake = $('#dns_make_p2p').hasClass('btn-switch-on') ? 1 : 0;
		if (dnsMake == 0) {
			dns_main = "0.0.0.0";
			dns_back = "0.0.0.0";
		} else {
			dnsSwitch = dnsSwitch;
			dnsMake = dnsMake;
			dns_main = $('input[name=dns_main_p2p]').val();
			dns_back = $('input[name=dns_back_p2p]').val();
			$('input[title=dns_main]').trigger('blur');
			$('input[title=dns_back]').trigger('blur');
			if (main_status == 0 || back_status == 0) {
				return;
			}
		}
	}
	var requestData = {
		dns_Switch: dnsSwitch,
		dns_Make: dnsMake,
		dns_main: dns_main,
		dns_back: dns_back
	};
	$.ajax({
		url: '/action/dns_set',
		data: requestData,
		type: "POST",
		dataType: "json",
		data: requestData,
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_suc);
			} else {
				$.alert(setup_failed);
			}
		},
		error: function () {
			console.log("dnsSubmit error");
		}
	});
});


$('#tcp_status_p2p').on('click', function (e) {
	console.log("tcp_status_p2p");
	var status = $('#tcp_status_p2p').hasClass('btn-switch-on') ? 0 : 1;
	wait();
	if (status == 1) {
		$('#tcp_status_p2p')[0].className = 'btn-switch btn-switch-on';
		$('#state1').html(TCPOpen);
	} else {
		$('#tcp_status_p2p')[0].className = 'btn-switch btn-switch-off';
		$('#state1').html(TCPClose);
	}
	var requestData = {
		status: status
	};
	$.ajax({
		url: '/action/set_proset_tcp',
		type: "POST",
		dataType: "json",
		data: requestData,
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				dlgwait.close();
			} else {
				location.reload(true);
			}
		},
		error: function () {
			console.log("tcp_status_p2p error");
		}
	});
});
///////////////////////////////////////////////保留，但没用 end///////////////////////////////////////////
