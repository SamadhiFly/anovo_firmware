var timer_show = null;
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

function timeControlSet() {
	$('input[title=locktime_short]').trigger('blur');
	$('input[title=locktime]').trigger('blur');
	$('input[title=synctime]').trigger('blur');
	$('input[title=mainbacktime]').trigger('blur');
	if (0 == locktime_short_status || 0 == locktime_status ||
		0 == synctime_status || 0 == mainbacktime_status) {
		return;
	}

	var locktime_short = $('input[name=locktime_short]').val();
	var locktime = $('input[name=locktime]').val();
	var synctime = $('input[name=synctime]').val();
	var mainbacktime = $('input[name=mainbacktime]').val();

	var requestData = {
		locktime_short: locktime_short,
		locktime: locktime,
		synctime: synctime,
		mainbacktime: mainbacktime
	};
	$.ajax({
		url: '/action/timeControlSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_succ);
			} else {
				$.alert(setup_failed);
			}
		},
		error: function () {
			console.log("timeControlSet error");
		}
	});
}

function seekstarModeSet() {
	$('input[title=snrThreshold]').trigger('blur');
	$('input[title=beamsearchNum]').trigger('blur');
	if (0 == snrThreshold_status || 0 == beamsearchNum_status) {
		return;
	}

	var snrThreshold = $('input[name=snrThreshold]').val();
	var beamsearchNum = $('input[name=beamsearchNum]').val();

	var requestData = {
		snrThreshold: snrThreshold,
		beamsearchNum: beamsearchNum
	};
	$.ajax({
		url: '/action/seekstarModeSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_succ);
			} else {
				$.alert(setup_failed);
			}
		},
		error: function () {
			console.log("seekstarModeSet error");
		}
	});
}

$('#starswitch').on('click', function (e) {
	var starswitch = $('#starswitch').hasClass('btn-switch-on') ? 0 : 1;
	var dlgwait = $.dialog({
		width: 390,
		padding: 25,
		lock: true,
		title: alert_title,
		content: $('#tmplWait').html()
	});
	var requestData = {
		starswitch: starswitch
	};
	e.preventDefault();
	$.ajax({
		url: '/action/starSwitch',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (starswitch == 1) {
					$('#state1').html(switch_open);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#starswitch')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#state1').html(switch_close);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#starswitch')[0].className = 'btn-switch btn-switch-off';
				}
			} else {
				$('#state1').html(switch_error);
			}
		},
		error: function () {
			console.log("starswitch error");
		}
	});
});

$('#beamsearchSwitch').on('click', function (e) {
	var beamsearchSwitch = $('#beamsearchSwitch').hasClass('btn-switch-on') ? 0 : 1;
	var dlgwait = $.dialog({
		width: 390,
		padding: 25,
		lock: true,
		title: alert_title,
		content: $('#tmplWait').html()
	});
	var requestData = {
		beamsearchSwitch: beamsearchSwitch
	};
	e.preventDefault();
	$.ajax({
		url: '/action/beamsearchSwitch',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (beamsearchSwitch == 1) {
					$('#state1').html(switch_open);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#beamsearchSwitch')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#state1').html(switch_close);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#beamsearchSwitch')[0].className = 'btn-switch btn-switch-off';
				}
			} else {
				$('#state1').html(switch_error);
			}
		},
		error: function () {
			console.log("beamsearchSwitch error");
		}
	});
});

function change_seek_mode() {
	var seek_star_mode = $('#seekstarMode').val();

	var requestData = {
		seek_star_mode: seek_star_mode
	};
	$.ajax({
		url: '/action/seekModeChange',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_succ);
				$('#seekstarMode').val(seek_star_mode);
			} else {
				$.alert(setup_failed);
				if (seek_star_mode == 0) {
					$('#seekstarMode').val(1);
				} else {
					$('#seekstarMode').val(0);
				}
			}
		},
		error: function () {
			console.log("seekstarMode error");
		}
	});
}

function networkinterfaceconfig() {

	var network_interfaceacu = $('#networkinterfaceacu').val();
	var network_interfaceveh = $('#networkinterfaceveh').val();
	var network_interfaceeth1enable = $('#networkinterfaceeth1enable').val();


	var requestData = {
		network_interfaceacu: network_interfaceacu,
		network_interfaceveh: network_interfaceveh,
		network_interfaceeth1enable: network_interfaceeth1enable
	};

	$.ajax({
		url: '/action/networkinterfaceconfig',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_succ);
			} else {
				$.alert(setup_failed);
			}
		},
		error: function () {
			console.log("networkinterfaceconfig error");
		}
	});
}

function IFFixnumSet() {

	var IFFixedselect = $('#IFFixedselect').val();
	var IFFixednum = $('#IFFixednum').val();
	if (0 == IFFixednum_status) {
		return;
	}
	var requestData = {
		IFFixedselect: IFFixedselect,
		IFFixednum: IFFixednum
	};

	$.ajax({
		url: '/action/IFFixnumSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_succ);
			} else {
				$.alert(setup_failed);
			}
		},
		error: function () {
			console.log("IFFixnumSet error");
		}
	});
}



$('#resetswitch').on('click', function (e) {
	var resetswitch = $('#resetswitch').hasClass('btn-switch-on') ? 0 : 1;
	var dlgwait = $.dialog({
		width: 390,
		padding: 25,
		lock: true,
		title: alert_title,
		content: $('#tmplWait').html()
	});
	var requestData = {
		resetswitch: resetswitch
	};
	e.preventDefault();
	$.ajax({
		url: '/action/resetSwitch',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (resetswitch == 1) {
					$('#state1').html(switch_open);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#resetswitch')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#state1').html(switch_close);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#resetswitch')[0].className = 'btn-switch btn-switch-off';
				}
			} else {
				$('#state1').html(switch_error);
			}
		},
		error: function () {
			console.log("resetswitch error");
		}
	});
});

$('#mainbackswitch').on('click', function (e) {
	var mainbackswitch = $('#mainbackswitch').hasClass('btn-switch-on') ? 0 : 1;
	var dlgwait = $.dialog({
		width: 390,
		padding: 25,
		lock: true,
		title: alert_title,
		content: $('#tmplWait').html()
	});
	var requestData = {
		mainbackswitch: mainbackswitch
	};
	$('#state1').html(switch_ing);
	e.preventDefault();
	$.ajax({
		url: '/action/mainbackSwitch',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (mainbackswitch == 1) {
					$('#state1').html(switch_open);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#mainbackswitch')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#state1').html(switch_close);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#mainbackswitch')[0].className = 'btn-switch btn-switch-off';
				}
			} else {
				$('#state1').html(switch_error);
			}
		},
		error: function () {
			console.log("mainbackswitch error");
		}
	});
});

$('#authswitch').on('click', function (e) {
	var authswitch = $('#authswitch').hasClass('btn-switch-on') ? 0 : 1;
	var dlgwait = $.dialog({
		width: 390,
		padding: 25,
		lock: true,
		title: alert_title,
		content: $('#tmplWait').html()
	});
	var requestData = {
		authswitch: authswitch
	};
	e.preventDefault();
	$.ajax({
		url: '/action/authSwitch',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (authswitch == 1) {
					$('#state1').html(switch_open);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#authswitch')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#state1').html(switch_close);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#authswitch')[0].className = 'btn-switch btn-switch-off';
				}
			} else {
				$('#state1').html(switch_error);
			}
		},
		error: function () {
			console.log("authswitch error");
		}
	});
});

$('#ACUPacketFilterSwitch').on('click', function (e) {
	var ACUPacketFilterSwitch = $('#ACUPacketFilterSwitch').hasClass('btn-switch-on') ? 0 : 1;
	console.log("ACUPacketFilterSwitch=" + ACUPacketFilterSwitch);
	var dlgwait = $.dialog({
		width: 390,
		padding: 25,
		lock: true,
		title: alert_title,
		content: $('#tmplWait').html()
	});
	var requestData = {
		ACUPacketFilterSwitch: ACUPacketFilterSwitch
	};
	e.preventDefault();
	$.ajax({
		url: '/action/ACUPacketFilterSwitch',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (ACUPacketFilterSwitch == 1) {
					$('#state1').html(switch_open);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#ACUPacketFilterSwitch')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#state1').html(switch_close);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#ACUPacketFilterSwitch')[0].className = 'btn-switch btn-switch-off';
				}
			} else {
				$('#state1').html(switch_error);
			}
		},
		error: function () {
			console.log("ACUPacketFilterSwitch error");
		}
	});
});

$('#queryBeamcenterSwitch').on('click', function (e) {
	var queryBeamcenterSwitch = $('#queryBeamcenterSwitch').hasClass('btn-switch-on') ? 0 : 1;
	console.log("queryBeamcenterSwitch=" + queryBeamcenterSwitch);
	var dlgwait = $.dialog({
		width: 390,
		padding: 25,
		lock: true,
		title: alert_title,
		content: $('#tmplWait').html()
	});
	var requestData = {
		queryBeamcenterSwitch: queryBeamcenterSwitch
	};
	e.preventDefault();
	$.ajax({
		url: '/action/queryBeamcenterSwitch',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (queryBeamcenterSwitch == 1) {
					$('#state1').html(switch_open);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#queryBeamcenterSwitch')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#state1').html(switch_close);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#queryBeamcenterSwitch')[0].className = 'btn-switch btn-switch-off';
				}
			} else {
				$('#state1').html(switch_error);
			}
		},
		error: function () {
			console.log("queryBeamcenterSwitch error");
		}
	});
});

$('#upperComputerSwitch').on('click', function (e) {
	var upperComputerSwitch = $('#upperComputerSwitch').hasClass('btn-switch-on') ? 0 : 1;
	var dlgwait = $.dialog({
		width: 390,
		padding: 25,
		lock: true,
		title: alert_title,
		content: $('#tmplWait').html()
	});
	var requestData = {
		upperComputerSwitch: upperComputerSwitch
	};
	e.preventDefault();
	$.ajax({
		url: '/action/upperComputerSwitch',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (upperComputerSwitch == 1) {
					$('#state1').html(switch_open);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#upperComputerSwitch')[0].className = 'btn-switch btn-switch-on';
				} else {
					$('#state1').html(switch_close);
					setTimeout(function () {
						dlgwait.close();
					}, 1000);
					$('#upperComputerSwitch')[0].className = 'btn-switch btn-switch-off';
				}
			} else {
				$('#state1').html(switch_error);
			}
		},
		error: function () {
			console.log("upperComputerSwitch error");
		}
	});
});
