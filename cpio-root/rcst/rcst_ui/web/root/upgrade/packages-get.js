rcstTypeGet();
langget();
var upgradetype;	//1:远程升级	2：本地升级
var remote_upgradetype;	//1:固件升级	4：DSP升级
var local_upgradetype;//1:固件升级	4：DSP升级

if (rcstType == 0) {
	firm_filename = 'vsat_firmware.tar.gz';
} else if (rcstType == 1) {
	firm_filename = 'scpc_firmware.tar.gz';
} else if (rcstType == 2) {
	$('#mesh_dsp').show();
	firm_filename = 'mesh_firmware.tar.gz';
	dsp_filename = 'mesh_dsp.tar.gz';
} else { }
/* 读当前版本号，终端类型*/
var firm_filename;
var soft_filename;
var hard_filename;
var dsp_filename;
var old_pass;
function version_show() {
	var type = ["Software", "Firmware", "Hardware", "DSP"];
	$.ajax({
		url: '/action/versionGet',
		type: "GET",
		dataType: "json",
		async: false,
		success: function (rsp) {
			var trarr = [];
			var tpl = $('#updategetversion').html();
			//~ for (var i = 0, len = rsp.length; i < len; i++) 
			//~ {		

			var image_a_md5 = rsp.image_a_md5;
			var image_b_md5 = rsp.image_b_md5;

			if (rcst_xph_type == 38) {
				//SATBOX631
				image_a_md5 = image_a_md5.split("mmc1");
				image_b_md5 = image_b_md5.split("mmc1");
			}
			else if (rcst_xph_type == 39) {
				//SATBOX631
				image_a_md5 = image_a_md5.split("mmc1");
				image_b_md5 = image_b_md5.split("mmc1");
			}
			else if (rcst_xph_type == 40) {
				//SATBOX631
				image_a_md5 = image_a_md5.split("mmc1");
				image_b_md5 = image_b_md5.split("mmc1");
			}
			else {
				//SATBOX530
				image_a_md5 = image_a_md5.split("mnt");
				image_b_md5 = image_b_md5.split("mnt");
			}


			if (image_a_md5[0] != image_b_md5[0]) {
				rsp.info[1].crt_version = rsp.info[1].crt_version + notsame;
			}

			if ('1' == space0_or_weitong1) {
				$("#system_23").append("<option value='4'>" + "3.0" + "</option>");
				$("#system_23").append("<option value='3'>" + "2.5" + "</option>");
				$("#system_23").append("<option value='2'>" + "2.0" + "</option>");

				if (35 == rcst_xph_type) {
					rsp.info[1].crt_version = rsp.info[1].crt_version.replace("SatBox530-20", "X11");
				} else if (38 == rcst_xph_type) {
					rsp.info[1].crt_version = rsp.info[1].crt_version.replace("SatBox631-20", "X12");
				}
			}
			else if ('2' == space0_or_weitong1) {
				rsp.info[1].crt_version = rsp.info[1].crt_version.replace("SatBox530", "SCE-BBU");
				$("#system_23").append("<option value='4'>" + "JHEIT3.0" + "</option>");
				$("#system_23").append("<option value='3'>" + "JHEIT2.5" + "</option>");
				$("#system_23").append("<option value='2'>" + "JHEIT2.0" + "</option>");
			}
			else if ('3' == space0_or_weitong1) {
				rsp.info[1].crt_version = rsp.info[1].crt_version.replace("SatBox631-20", "G600T");
				$("#system_23").append("<option value='4'>" + "Spacebroad3.0" + "</option>");
				$("#system_23").append("<option value='3'>" + "Spacebroad2.5" + "</option>");
				$("#system_23").append("<option value='2'>" + "Spacebroad2.0" + "</option>");
			}
			else {
				$("#system_23").append("<option value='4'>" + "Anovo3.0" + "</option>");
				$("#system_23").append("<option value='3'>" + "Anovo2.5" + "</option>");
				$("#system_23").append("<option value='2'>" + "Anovo2.0" + "</option>");
			}
			$("#system_23").val(anovo_sys);
			if (rcst_xph_type == 40) {
				rsp.info[1].crt_version = rsp.info[1].crt_version.replace("520-LI1", "520-LI");
			}
			var tr = StringH.tmpl(tpl, {
				num: 1,
				type: type[1],
				crt_version: rsp.info[1].crt_version
			});
			trarr.push(tr);
			//~ }
			$('#UpdateVersionList').html(trarr.join(''));

			upgradetype = Number(rsp.upgradetype);
			remote_upgradetype = Number(rsp.remote_upgradetype);
			local_upgradetype = Number(rsp.local_upgradetype);
			if (upgradetype == 1) {	//升级方式：远程升级
				$('#upgrade_type_remote').prop('checked', true);
				$('#upgrade_type_local').prop('checked', false);
				$('#upgrade_remote').show();
				if (remote_upgradetype == 4) {	//dsp升级
					$('#remote_upgradetype_firmware').prop('checked', false);
					$('#remote_upgradetype_dsp').prop('checked', true);
					$('#remote_dsp').show();
				} else {
					$('#remote_upgradetype_firmware').prop('checked', true);
					$('#remote_upgradetype_dsp').prop('checked', false);
					$('#remote_zImgae').show();
				}
			} else if (upgradetype == 2) {	//升级方式：本地升级
				$('#upgrade_type_remote').prop('checked', false);
				$('#upgrade_type_local').prop('checked', true);
				$('#upgrade_local').show();
				if (local_upgradetype == 4) {	//dsp升级
					$('#local_upgradetype_firmware').prop('checked', false);
					$('#local_upgradetype_dsp').prop('checked', true);
					$('#local_dsp').show();
				} else {
					$('#local_upgradetype_firmware').prop('checked', true);
					$('#local_upgradetype_dsp').prop('checked', false);
					$('#local_zImgae').show();
				}
			} else {
				console.log("versionGet1 error");
			}
			$('#zone_name_slect').val(rsp.zonename);
		},
		error: function () {
			console.log("versionGet2 error");
		}
	});
}

function terModeGet() {
	$.ajax({
		url: '/action/terModeGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			$('#termodeSel').val(rsp.termode);
			old_pass = rsp.passwd;
		},
		error: function () {
			console.log("terModeGet error");
		}
	});
}

function terModeSet() {
	var termode = $('#termodeSel').val();
	var requestData = {
		termode: termode
	};
	$.ajax({
		url: '/action/terModeSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(changesys_success);
			} else if (rsp.code == -2) {
				$.alert(cannot_change);
			} else {
				$.alert(setup_failed);
			}
		},
		error: function () {
			console.log("terModeSet error");
		}
	});
}



function systemModeSet() {
	var system_23 = $('#system_23').val();
	var requestData = {
		system_23: system_23
	};
	$.ajax({
		url: '/action/sysModeSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(changesys_success);
			} else if (rsp.code == -2) {
				$.alert(cannot_change2);
			} else {
				$.alert(setup_failed);
			}
		},
		error: function () {
			console.log("terModeSet error");
		}
	});
}


version_show();
terModeGet();
dateGet();
setInterval(function () {
	dateGet();
}, 1000);
function dateGet() {
	$.ajax({
		url: '/action/dateGet',
		type: "GET",
		dataType: "json",
		async: true,
		success: function (rsp) {
			$('#_systime-clock-status').html(rsp.date);
		},
		error: function () {
			console.log("dateGet error");
		}
	});
}


function fixPasswd() {
	$('#old_pass').trigger('blur');
	$('#new_pass1').trigger('blur');
	$('#new_pass2').trigger('blur');

	if (old_pass != sm4Encrypt($("#old_pass").val())) {
		$.alert(old_pass_err);
		return;
	}

	if (0 == pass1_status || 0 == pass2_status || 0 == pass_status) {
		return;
	}

	var new_pass1 = $("#new_pass1").val();
	var new_pass2 = $("#new_pass2").val();
	if (new_pass2 != new_pass1) {
		$.alert(passs_same);
		return;
	}

	$("#fixPasswdBtn").html(Processing);
	var requestData = {
		password: sm4Encrypt(new_pass1)
	};
	$.ajax({
		url: '/action/fixPasswd',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				$.alert(pass_succ, function () {
					window.location.href = '/action/logout';
				}).lock();
			} else {
				$.alert(setup_failed);
			}
			$("#fixPasswdBtn").html(Processing);
		},
		error: function () {
			console.log("fixPasswd error");
			$("#fixPasswdBtn").html(Processing);
		}
	});
}


