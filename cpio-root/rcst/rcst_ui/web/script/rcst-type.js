var transceiverType = 0;
var polarizationType = 0;
var rcstType = 0;
var networkMode = 0;
var itemType = 0;
var freqType = 0;
var txType = 0;
var ACM_or_CCM = 0;
var installType = 0;
var locked = 0;
var vlanmode = 0;
var zd_version = 0;
var beamaccsss_map_isnot_dbs_flag = 0;
var langtype;
var space0_or_weitong1;
var anovo_sys = 0;
var rcst_xph_type = 0;
var wanMacPass = "";
var rcstMac = "";
function rcstTypeGet() {
	$.ajax({
		url: '/action/RcstTypeGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			transceiverType = rsp.transceiverType;
			polarizationType = rsp.polarizationType;
			rcstType = rsp.rcst_type;
			networkMode = rsp.network_mode;
			itemType = rsp.item_type;
			freqType = rsp.freqType;
			txType = rsp.rf_tx_type;
			ACM_or_CCM = rsp.ACM_or_CCM;
			installType = rsp.installType;
			locked = rsp.locked;
			vlanmode = rsp.vlanmode;
			zd_version = rsp.zd_version;
			beamaccsss_map_isnot_dbs_flag = rsp.beamaccsss_map_isnot_dbs_flag;
			langtype = rsp.langtype;
			space0_or_weitong1 = rsp.space0_or_weitong1;
			anovo_sys = rsp.anovo_sys;
			wanMacPass = rsp.wanMacPass;
			rcst_xph_type = Number(rsp.rcst_xph_type);
			rcstMac = rsp.wanMac;
			if ('0' == rcstType) {
				$('#termode').html("TDMA");
			} else {
				$('#termode').html("FDMA");
			}

			console.log("anovo_sys=" + anovo_sys + ", rcst_xph_type=" + rcst_xph_type);
			if ("en" == langtype) {
				if ('0' == space0_or_weitong1) {
					$('#logoo').html('<img src="/icons/logo.png" />');
					$('.space').html("Space Star Technology Co.,Ltd");
				}
				else if ('1' == space0_or_weitong1) {
					$('#logoo').html('<img src="/icons/logo_weitong.png" />');
					$('.space').html("Satzone Technology Co.,Ltd");
				}
				else if ('2' == space0_or_weitong1) {
					$('#logoo').html('<img src="/icons/logo_weitong_jh.png" />');
					$('.space').html("JHEIT");
				}
				else if ('3' == space0_or_weitong1) {
					$('#logoo').html('<img src="/icons/logo_andy.png" />');
					$('.space').html("Spacebroad");
				}

				$('#nav li').css("margin-right", "5px");
				$('.WorkMode').html("Wrok Mode: ");
			} else if (rsp.langtype == "zh") {
				if ('0' == space0_or_weitong1) {
					$('#logoo').html('<img src="/icons/logo.png" />');
					$('.space').html("航天恒星科技有限公司(503所)");

				}
				else if ('1' == space0_or_weitong1) {
					$('#logoo').html('<img src="/icons/logo_weitong.png" />');
					$('.space').html("中国卫通集团股份有限公司");

				}
				else if ('2' == space0_or_weitong1) {
					$('#logoo').html('<img src="/icons/logo_weitong_jh.png" />');
					$('.space').html("JHEIT");

				}
				else if ('3' == space0_or_weitong1) {
					$('#logoo').html('<img src="/icons/logo_andy.png" />');
					$('.space').html("四川安迪科技实业有限公司");
				}

				$('#nav li').css("margin-right", "35px");
				$('.WorkMode').html("工作模式: ");
			} else if (rsp.langtype == "zh_HK") {
				if ('0' == space0_or_weitong1) {
					$('#logoo').html('<img src="/icons/logo.png" />');
					$('.space').html("航天恆星科技有限公司(503所)");

				}
				else if ('1' == space0_or_weitong1) {
					$('#logoo').html('<img src="/icons/logo_weitong.png" />');
					$('.space').html("中國衛通集團股份有限公司");

				}
				else if ('2' == space0_or_weitong1) {
					$('#logoo').html('<img src="/icons/logo_weitong_jh.png" />');
					$('.space').html("JHEIT");

				}
				else if ('3' == space0_or_weitong1) {
					$('#logoo').html('<img src="/icons/logo_andy.png" />');
					$('.space').html("四川安迪科技實業有限公司");
				}

				$('#nav li').css("margin-right", "35px");
				$('.WorkMode').html("工作模式: ");
			}
		},
		error: function () {
			console.log("error");
		}
	});
}
