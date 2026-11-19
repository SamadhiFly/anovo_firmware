rcstTypeGet();
langget();

debugGet();
function debugGet() {
	$.ajax({
		url: '/action/debugGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				if (rsp.zl_sx == 1) {
					$('#starswitch')[0].className = 'btn-switch btn-switch-off';
				}
				else if (rsp.zl_sx == 2) {
					$('#starswitch')[0].className = 'btn-switch btn-switch-on';
				}
				else { }

				if (rsp.lock_switch == 1) {
					$('#beamsearchSwitch')[0].className = 'btn-switch btn-switch-on';
				}
				else {
					$('#beamsearchSwitch')[0].className = 'btn-switch btn-switch-off';
				}

				if (rsp.u8_resetswitch == 1) {
					$('#resetswitch')[0].className = 'btn-switch btn-switch-on';
				}
				else {
					$('#resetswitch')[0].className = 'btn-switch btn-switch-off';
				}

				if (rsp.u8_mainbackswitch == 1) {
					$('#mainbackswitch')[0].className = 'btn-switch btn-switch-on';
				}
				else {
					$('#mainbackswitch')[0].className = 'btn-switch btn-switch-off';
				}

				if (rsp.u8_authswitch == 2) {
					$('#authswitch')[0].className = 'btn-switch btn-switch-off';
				}
				else {
					$('#authswitch')[0].className = 'btn-switch btn-switch-on';
				}

				if (rsp.query_beamcenter_switch == 1) {
					$('#queryBeamcenterSwitch')[0].className = 'btn-switch btn-switch-on';
				}
				else {
					$('#queryBeamcenterSwitch')[0].className = 'btn-switch btn-switch-off';
				}

				if (rsp.ACUPacketFilterSwitch == 1) {
					$('#ACUPacketFilterSwitch')[0].className = 'btn-switch btn-switch-on';
				}
				else {
					$('#ACUPacketFilterSwitch')[0].className = 'btn-switch btn-switch-off';
				}

				if (rsp.vehicular_type == 1) {
					$('#upperComputerSwitch')[0].className = 'btn-switch btn-switch-on';
				}
				else {
					$('#upperComputerSwitch')[0].className = 'btn-switch btn-switch-off';
				}
				$('#seekstarMode').val(rsp.seekstar);
				$('input[name="snrThreshold"]').val(rsp.any_snr_threshold);
				$('input[name="beamsearchNum"]').val(rsp.any_search_num);
				$('input[name="locktime_short"]').val(rsp.u32_locktime_short);
				$('input[name="locktime"]').val(rsp.u32_locktime);
				$('input[name="synctime"]').val(rsp.u32_synctime);
				$('input[name="mainbacktime"]').val(rsp.u32_mainbacktime);
				$('#networkinterfaceacu').val(rsp.network_acubrlaneth);
				$('#networkinterfaceveh').val(rsp.network_vehbrlaneth);
				$('#networkinterfaceeth1enable').val(rsp.network_eth1_config);
				$('#IFFixedselect').val(rsp.IFFixedselect);
				$('input[name="IFFixednum"]').val(rsp.IFFixednum);
			} else {
				console.log("debugGet code error");
			}
		},
		error: function () {
			console.log("debugGet error");
		}
	});
}




$(".queryBeamcenterSwitchHelp").mouseover(function (e) {
	var not = '关闭该开关时，终端在波束重叠区下线时，将根据当前位置信息轮询重叠区各波束，比较信噪比高低，选择最优波束上线;打该开关时，将根据当前位置，计算与重叠区各波束中心点距离远近，选择最优波束上线。（计算与波束中心点距离功能需要主站提供的波束地图中带有各波束中心点坐标）';
	console.log(111);
	$("body").append('<div id="tooltip">' + not + '</div>');
	$('#tooltip').css({
		position: "absolute",
		top: $(this).offset().top,
		left: $(this).offset().left + 30,
		color: "#55555",
		background: "#fff",
		border: "1px solid #3399FF",
		"border-radius": "3px",
		width: "400px",
		"font-size": "13px",
		padding: "4px 2px 4px 2px"
	}).show();
	console.log($(this).offset().top);
}).mouseout(function () {
	console.log(222);
	$('#tooltip').remove();
});



$(".ACUPacketFilterSwitchSwitchHelp").mouseover(function (e) {
	var not = '和ACU通信的数据为终端本地管理数据，禁止发送信关站;部分用户ACU IP为业务IP，此开关关闭';
	console.log(111);
	$("body").append('<div id="tooltip">' + not + '</div>');
	$('#tooltip').css({
		position: "absolute",
		top: $(this).offset().top,
		left: $(this).offset().left + 30,
		color: "#55555",
		background: "#fff",
		border: "1px solid #3399FF",
		"border-radius": "3px",
		width: "400px",
		"font-size": "13px",
		padding: "4px 2px 4px 2px"
	}).show();
	console.log($(this).offset().top);
}).mouseout(function () {
	console.log(222);
	$('#tooltip').remove();
});