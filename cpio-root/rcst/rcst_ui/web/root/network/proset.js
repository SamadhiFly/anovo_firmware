rcstTypeGet();
langget();
// dialog confirm
(function ($) {
	$.alert = function (content, ok) {
		ok = ok || function () { };
		return $.dialog({
			width: 390,
			padding: '25px 30px',
			title: 'DNS',
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
		title: '',
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
			if (1) {
				if (rcstType == 1 && txType == 1) {
					$('#tcpP2p').show();
					$('#tcpNormal').hide();
					$('#tcp_version').html(rsp.tcp_version);
					$('#tcp_version').css("color", "#8E8E8E");
					if (Number(rsp.tcpStatus) == 1) {
						$('#tcp_status_p2p')[0].className = 'btn-switch btn-switch-on';
					} else {
						$('#tcp_status_p2p')[0].className = 'btn-switch btn-switch-off';
					}

					$('#httpP2p').show();
					$('#httpNormal').hide();
					if (Number(rsp.httpStatus) == 1) {
						$('#http_status_p2p')[0].className = 'btn-switch btn-switch-on';
					} else {
						$('#http_status_p2p')[0].className = 'btn-switch btn-switch-off';
					}

					$('#dnsNormal').hide();
					$('#dnsP2p').show();

					if (Number(rsp.dnsSwitch) == 1) {
						$('#dns_switch_p2p')[0].className = 'btn-switch btn-switch-on';
						$('#dns_make_switch_p2p').show();
						if (Number(rsp.dnsMake) == 1) {
							$('#dns_make_p2p')[0].className = 'btn-switch btn-switch-on';
							$('#dns_make_switch_p2p').show();
							$('.dns_ip_p2p').show();
							$('#dns_submit_part').show();
							$('input[name=dns_main_p2p]').val(rsp.dnsMain);
							$('input[name=dns_back_p2p]').val(rsp.dnsBack);
						} else {
							$('#dns_make_p2p')[0].className = 'btn-switch btn-switch-off';
							$('#dns_make_switch_p2p').show();
							$('.dns_ip_p2p').hide();
							$('#dns_submit_part').hide();
						}
					} else {
						$('#dns_switch_p2p')[0].className = 'btn-switch btn-switch-off';
						$('#dns_make_switch_p2p').hide();
						$('.dns_ip_p2p').hide();
						$('#dns_submit_part').hide();
					}

				} else {
					$('#tcp_version').html(rsp.tcp_version);
					$('#tcp_version').css("color", "#8E8E8E");
					$('#tcpP2p').hide();
					$('#tcpNormal').show();
					$('#httpP2p').hide();
					$('#httpNormal').show();
					$('#firewall_switch').show();
					if (Number(rsp.tcpStatus) == 1) {
						$('#tcp_status').html('ON');
						$('#tcp_status').css("color", "#2673bf");
					} else {
						$('#tcp_status').html('OFF');
						$('#tcp_status').css("color", "#8E8E8E");
					}

					if (Number(rsp.httpStatus) == 1) {
						$('#http_status').html('ON');
						$('#http_status').css("color", "#2673bf");
					} else {
						$('#http_status').html('OFF');
						$('#http_status').css("color", "#8E8E8E");
					}

					if (Number(rsp.firewallStatus) == 1) {
						$('#firewall_status').html('ON');
						$('#firewall_status').css("color", "#2673bf");
						$('#Firewalldiv').show();
					} else {
						$('#firewall_status').html('OFF');
						$('#firewall_status').css("color", "#8E8E8E");
						$('#Firewalldiv').hide();
					}
					$('#dnsNormal').show();
					$('#dnsP2p').hide();
					if (Number(rsp.dnsSwitch) == 1) {
						$('#dns_switch').html('ON');
						$('#dns_switch').css("color", "#2673bf");
						$('#dns_make_switch').show();
						if (Number(rsp.dnsMake) == 1) {
							$('#dns_make').html('ON');
							$('#dns_make').css("color", "#2673bf");
							$('.dns_ip').show();
							$('#dns_main').html(rsp.dnsMain);
							$('#dns_back').html(rsp.dnsBack);
						} else {
							$('#dns_make').html('OFF');
							$('#dns_make').css("color", "#8E8E8E");
						}
					} else {
						$('#dns_switch').html('OFF');
						$('#dns_switch').css("color", "#8E8E8E");
					}
				}

				if (networkMode == 2) {
					$('#nat_switch').show();
					if (Number(rsp.natStatus) == 1) {
						$('#nat_status').html('ON');
						$('#nat_status').css("color", "#2673bf");
						$('#redirectset').show();
					} else {
						$('#nat_status').html('OFF');
						$('#nat_status').css("color", "#8E8E8E");
						$('#redirectset').hide();
					}
				} else {
					$('#nat_switch').hide();
					$('#redirectset').hide();
				}
				if (networkMode == 2) {
					if (rcstType == 1 && txType == 1) {
						$('#nat_switchP2p').show();
						$('#nat_switch').hide();
						if (Number(rsp.natStatus) == 1) {
							$('#nat_status_p2p')[0].className = 'btn-switch btn-switch-on';
							$('#redirectset').show();
						} else {
							$('#nat_status_p2p')[0].className = 'btn-switch btn-switch-off';
							$('#redirectset').hide();
						}
					}
					else {
						if (Number(rsp.natStatus) == 1) {
							$('#nat_status').html('ON');
							$('#nat_status').css("color", "#2673bf");
							$('#redirectset').show();
						} else {
							$('#nat_status').html('OFF');
							$('#nat_status').css("color", "#8E8E8E");
							$('#redirectset').hide();
						}
					}
				} else {
					$('#nat_switch').hide();
					$('#redirectset').hide();
				}
				dlgwait.close();
			} else {
				console.log("prosetInfoGet error1");
			}
		},
		error: function () {
			console.log("prosetInfoGet error2");
		}
	});
}
var num = 0;
var oldname = {};
var old_start_port = {};
var old_end_port = {};
var old_redirect_proto = {};
/*端口转发查看列表*/
$('#natport_view').on('click', function (e) {
	e.preventDefault();
	var contentTmpl;
	if (rcstType == 1 && txType == 1) {
		contentTmpl = $('#natport_p2p_content').html();
	} else {
		contentTmpl = $('#natport_content').html();
	}
	selfaddDialog = $.dialog({
		title: dialog_natport,
		content: contentTmpl,
		lock: true,
		padding: 0,
		width: 940
	});
	$('.Num').html(Num);
	$('.Protocol').html(Protocol);
	$('.TargetIP').html(TargetIP);
	$('.StartPort').html(StartPort);
	$('.EndPort').html(EndPort);
	$('.Description').html(Description);
	$('.Interface').html(Interface);
	$('.Option').html(Option);
	natportInfoGet();
});
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
/*端口转发获取列表函数*/
function natportInfoGet() {
	$.ajax({
		url: '/action/natportInfoGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				var info = rsp.info;
				var trarr = [];
				var tpl;
				if (rcstType == 1 && txType == 1) {
					tpl = $('#natport_p2p_list').html();
					$('.addbtn').fadeIn();
					$('.submitbtn').hide();
					$('#redirect_dialogtestlist').html(trarr.join(''));
				} else {
					tpl = $('#natport_list').html();
					$('#natport_dialoglist').html(trarr.join(''));
				}

				if ($.isArray(info) && info.length > 0) {
					for (var i = 0, len = info.length; i < len; i++) {
						var tr = StringH.tmpl(tpl, {
							list: i + 1,
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
					$('#natport_dialoglist').html(trarr.join(''));
					if (rcstType == 1 && txType == 1) {
						$('#redirect_dialogtestlist').html(trarr.join(''));
					} else {
						$('#natport_dialoglist').html(trarr.join(''));
					}
				} else {
					$('#natport_dialoglist').html('<tr><td class="center" colspan="6">' + no_content + '</td></tr>');
				}

			} else {
				if (rcstType == 1 && txType == 1) {
					$('#redirect_dialogtestlist').html('<tr><td class="center" colspan="6">' + no_content + '</td></tr>');
				} else {
					$('#natport_dialoglist').html('<tr><td class="center" colspan="6">' + no_content + '</td></tr>');
				}
			}
		},
		error: function () {
			console.log("prosetInfoGet error2");
		}
	});
}
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
				alert("Delete sucess");
				natportInfoGet();
				$('.addbtn').fadeIn();
				$('.submitbtn').hide();

			}
			else {
				alert("Delete failed");
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

	//if ( isEmpty ) 
	//{
	ok();
	//} 
	//~ else 
	//~ {
	//~ $.confirm( '<%:Really canecl the added data?%>', ok );
	//~ }
	$('.addbtn').fadeIn();
});

//$.sub( 'addEvent', function( evt, data ){


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
			$parent.append('<span class= "formips onEror" >' + 'IP Address can not be blank' + '</span>');
			ip_status = 0;
		} else if (!re.test(this.value)) {
			$parent.append('<span class= "formips onEror" >' + 'IP address is consist fo 4 munbers between 0 to 255, separate the numbers with .' + '</span>');
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
				$parent.append('<span class= "formips onEror" >' + 'Start Port can not be blank' + '</span>');
				start_port_status = 0;
			} else if (!re2.test(this.value) && !re1.test(this.value)) {
				$parent.append('<span class= "formips onEror" >' + 'Start Port must be number' + '</span>');
				start_port_status = 0;
			} else if (!re2.test(this.value) && re1.test(this.value)) {
				$parent.append('<span class= "formips onEror" >' + 'Start Port must be integer' + '</span>');
				start_port_status = 0;
			} else if (Number(this.value) > 65536) {
				$parent.append('<span class= "formips onEror" >' + 'Start Port must be not greater than 65536' + '</span>');
				start_port_status = 0;
			} else if (Number(this.value) < 0) {
				$parent.append('<span class= "formips onEror" >' + 'Start Port must be not less than 0' + '</span>');
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
				$parent.append('<span class= "formips onEror" >' + 'End Port can not be blank' + '</span>');
				end_port_status = 0;
			} else if (!re2.test(this.value) && !re1.test(this.value)) {
				$parent.append('<span class= "formips onEror" >' + 'End Port must be number' + '</span>');
				end_port_status = 0;
			} else if (!re2.test(this.value) && re1.test(this.value)) {
				$parent.append('<span class= "formips onEror" >' + 'End Port must be integer' + '</span>');
				end_port_status = 0;
			} else if (Number(this.value) > 65536) {
				$parent.append('<span class= "formips onEror" >' + 'End Port must be not greater than 65536' + '</span>');
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
				$parent.append('<span class= "formips onEror" >' + 'Discribe can not be blank' + '</span>');
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
				alert('Same Description Have Exist');
				return;
			}
		}
		if (eval(start_port) > eval(end_port)) {
			alert('Start Port Cannot Larger Then End Port');
			return;
		}
		else {
			for (var i = 0; i < num; i++) {
				if (!(redirect_proto.length == 3 && old_redirect_proto[i].length == 3 && redirect_proto != old_redirect_proto[i])) {
					if ((eval(start_port) == eval(old_start_port[i])) && (eval(end_port) == eval(old_end_port[i]))) {
						alert('Same Port Have Exist');
						return;
					}
					if ((eval(start_port) <= eval(old_start_port[i]) && eval(end_port) >= eval(old_start_port[i])) || (eval(start_port) >= eval(old_start_port[i]) && eval(start_port) <= eval(old_end_port[i]))) {
						alert('Port Range Conflict');
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
					alert("Set up sucess");
					natportInfoGet();
				}
				else {
					alert("Start_port can't larger Stop_port");
				}
			}
		});
	}
});
//~ //端口转发删除列表中的某行配置参数
$('body').delegate('#redirect_submit_dellist', 'click', function (e) {
	var that = this,
		$this = $(that),
		target_ip = $this.attr('redirect_target_del'),
		ok = function () {
			redirect_unbind_route.call(that, e, target_ip);
		};
	ok();
});
/*静态路由查看列表*/
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
/*静态路由获取列表函数*/
function routeInfoGet() {
	$.ajax({
		url: '/action/routeInfoGet',
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
						var tr = StringH.tmpl(tpl, {
							list: i + 1,
							target: info[i].route_ip,
							netmask: info[i].route_mask,
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
				}
			} else if (rsp.code == -2) {
				if (rcstType == 1 && txType == 1) {
					$('#route_p2p_dialoglist').html('<tr><td class="center" colspan="5">' + no_content + '</td></tr>');
				} else {
					$('#route_dialoglist').html('<tr><td class="center" colspan="5">' + no_content + '</td></tr>');
				}
			} else {
				if (rcstType == 1 && txType == 1) {
					$('#route_p2p_dialoglist').html('<tr><td class="center" colspan="5">' + error_content + '</td></tr>');
				} else {
					$('#route_dialoglist').html('<tr><td class="center" colspan="5">' + error_content + '</td></tr>');
				}
			}
		}
	});
}
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
				alert("Delete sucess");
				routeInfoGet();
				$('.addbtn').fadeIn();
				$('.submitbtn').hide();

			}
			else {
				alert("Delete failed");
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
			$parent.append('<span class= "formips onEror" >' + 'IP Address can not be blank' + '</span>');
			ip_status = 0;
		} else if (!re.test(this.value)) {
			$parent.append('<span class= "formips onEror" >' + 'IP address is consist fo 4 munbers between 0 to 255, separate the numbers with .' + '</span>');
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
			$parent.append('<span class= "formips onEror" >' + 'Netmask can not be blank' + '</span>');
			mask_status = 0;
		} else if (!re.test(this.value)) {
			$parent.append('<span class= "formips onEror" >' + 'Netmask is consist fo 4 munbers between 0 to 255, separate the numbers with .' + '</span>');
			mask_status = 0;
		} else {
			$parent.append('<span class= "formips onSuccess" ></span>');
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
			$parent.append('<span class= "formips onEror" >' + 'Gateway can not be blank' + '</span>');
			gateway_status = 0;
		} else if (!re.test(this.value)) {
			$parent.append('<span class= "formips onEror" >' + 'Gateway is consist fo 4 munbers between 0 to 255, separate the numbers with .' + '</span>');
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
		var form = e.target,
			formName = form.name,
			action = this.action,
			formels = $('input', form),
			rules,
			name,
			display,
			validator,
			formdata,
			validerules = [],
			interface = $('#interface').val(),
			target = $('input[name=target]').val(),
			netmask = $('input[name=netmask]').val(),
			gateway = $('#gateway').val();
		var requestData = {
			interface: interface,
			target: target,
			netmask: netmask,
			gateway: gateway
		};
		$.ajax({
			url: '/action/routeInfoSet',
			data: requestData,
			type: "POST",
			dataType: "json",
			async: false,
			success: function (rsp) {
				if (rsp.code == 0) {
					alert("Set up sucess");
					routeInfoGet();
				}
				else {
					alert("Set up faild, please check and enter again");
				}
			}
		});
	}
});

//~ /*删除路由列表中的某行配置参数*/
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
				alert("Delete sucess");
				routeInfoGet();
				$('.addbtn').fadeIn();
				$('.submitbtn').hide();

			}
			else {
				alert("Delete failed");
				$('.addbtn').fadeIn();
				$('.submitbtn').hide();
			}
		}
	});
	$('.addbtn').fadeIn();
});

$('#btnTestSet').on('click', function (e) {
	e.preventDefault();
	var contentTmpl;
	if (rcst_type == 1 && rf_tx_type == 1) {
		contentTmpl = $('#tmplTsetSet').html();
	} else {
		contentTmpl = $('#tmplTsetSetNew').html();
	}
	selfaddDialog = $.dialog({
		title: '<%:Route Setting List%>',
		content: contentTmpl,
		lock: true,
		padding: 0,
		width: 770
	});
	getTestList();
	setTimeout(function () {
		$.formInit();
	}, 100);
});

function dns_get() {
	console.log("dns_get ");
	$.ajax({
		url: '/action/prosetInfoGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (Number(rsp.dnsSwitch) == 1) {
				$('#dns_switch_p2p')[0].className = 'btn-switch btn-switch-on';
				$('#dns_make_switch_p2p').show();
				if (Number(rsp.dnsMake) == 1) {
					$('#dns_make_p2p')[0].className = 'btn-switch btn-switch-on';
					$('#dns_make_switch_p2p').show();
					$('.dns_ip_p2p').show();
					$('#dns_submit_part').show();
					$('input[name=dns_main_p2p]').val(rsp.dnsMain);
					$('input[name=dns_back_p2p]').val(rsp.dnsBack);
				} else {
					$('#dns_make_p2p')[0].className = 'btn-switch btn-switch-off';
					$('#dns_make_switch_p2p').show();
					$('.dns_ip_p2p').hide();
					$('#dns_submit_part').hide();
				}
			} else {
				$('#dns_switch_p2p')[0].className = 'btn-switch btn-switch-off';
				$('#dns_make_switch_p2p').hide();
				$('.dns_ip_p2p').hide();
				$('#dns_submit_part').hide();
			}
		},
		error: function () {
			console.log("dns_get error");
		}
	});
}

$('#dns_switch_p2p').on('click', function (e) {
	console.log("dns_switch");
	var status = $('#dns_switch_p2p').hasClass('btn-switch-on') ? 0 : 1;
	var requestData = {
		status: status
	};
	wait();
	if (status == 1) {
		$('#dns_switch_p2p')[0].className = 'btn-switch btn-switch-on';
		$('#state1').html(DNSOpen);
	} else {
		$('#dns_switch_p2p')[0].className = 'btn-switch btn-switch-off';
		$('#state1').html(DNSClose);
	}
	$.ajax({
		url: '/action/set_dns_switch',
		type: "POST",
		dataType: "json",
		data: requestData,
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				dns_get();
				dlgwait.close();
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
	wait();
	if (status == 1) {
		$('#dns_make_p2p')[0].className = 'btn-switch btn-switch-on';
		$('#state1').html(DNSMakeOpen);
	} else {
		$('#dns_make_p2p')[0].className = 'btn-switch btn-switch-off';
		$('#state1').html(DNSMakeClsoe);
	}
	$.ajax({
		url: '/action/set_dns_make',
		type: "POST",
		dataType: "json",
		data: requestData,
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				dns_get();
				dlgwait.close();
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
	var dnsSwitch = 1;
	var dnsMake = 1;
	var dns_main = $('input[name=dns_main_p2p]').val();
	var dns_back = $('input[name=dns_back_p2p]').val();
	$('#dnsform input[name=dns_main_p2p]').trigger('blur');
	$('#dnsform input[name=dns_back_p2p]').trigger('blur');
	if (main_status == 1 && back_status == 1) {
		//~ // if ( ip === sta_ip && mask === oldMask && mtu==oldmtu) {
		//~ //	$.alert( '<%:You have changed nothing to submit%>' );
		//~ //		return;
		//~ //	}
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
					dns_get();
				} else {
					$.alert(setup_failed);
				}
			},
			error: function () {
				console.log("dnsSubmit error");
			}
		});
	}
});


function tcp_get() {
	console.log("tcp_get ");
	$.ajax({
		url: '/action/get_proset_tcp',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			var status = 1;
			if (status == 1) {
				$('#tcp_status_p2p')[0].className = 'btn-switch btn-switch-on';
			} else {
				$('#tcp_status_p2p')[0].className = 'btn-switch btn-switch-off';
			}
		},
		error: function () {
			console.log("dnsSubmit error");
		}
	});
};


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

$('#http_status_p2p').on('click', function (e) {
	//console.log("http_status_p2p");
	var status = $('#http_status_p2p').hasClass('btn-switch-on') ? 0 : 1;
	wait();
	if (status == 1) {
		$('#http_status_p2p')[0].className = 'btn-switch btn-switch-on';
		$('#state1').html(TCPOpen);
	} else {
		$('#http_status_p2p')[0].className = 'btn-switch btn-switch-off';
		$('#state1').html(TCPClose);
	}
	var requestData = {
		status: status
	};
	$.ajax({
		url: '/action/set_proset_http',
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
			console.log("http_status_p2p error");
		}
	});
});

/*防火墙*/
$('#firewall_btnTestSet').on('click', function (e) {
	console.log("111111");
	e.preventDefault();
	var contentTmpl;
	contentTmpl = $('#tmplTsetSet_firewall').html();
	console.log("222");
	selfaddDialog = $.dialog({
		title: FirewallList,
		content: contentTmpl,
		lock: true,
		padding: 0,
		width: 1400
	});
	getFirewallList();
	setTimeout(function () {
		$.formInit();
	}, 100);
	$('.Num').html(Num);
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

function getFirewallList() {
	$.ajax({
		url: '/action/firewallGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				var info = rsp.info;
				var trarr = [];
				$('#firewall_listAdd').html(trarr.join(''));
				if ($.isArray(info) && info.length > 0) {
					for (var i = 0, len = info.length; i < len; i++) {
						var tpl = $('#firewall_tmplAddedTest').html();
						var tr = StringH.tmpl(tpl, {
							list: i + 1,
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