rcstTypeGet();
var alert_title;
var OK;
var Cancel;
var setup_suc;
var setup_failed;
var pass_succ;
var resetPasswd_confirm;
var validate_pass;
var validate_blank;
var aaa;
var bbb;
function trans_en() {
	if (0 == space0_or_weitong1) {
		if (38 == rcst_xph_type) {
			$('#welcome').html("Welcome to use the SATBOX631 terminal configuration software");
		}
		else if (39 == rcst_xph_type) {
			$('#welcome').html("Welcome to use the SATBOX631-LI terminal configuration software");
		}
		else if (40 == rcst_xph_type) {
			$('#welcome').html("Welcome to use the SATBOX520-LI terminal configuration software");
		}
		else if (rcst_xph_type == 35) {
			$('#welcome').html("Welcome to use the SATBOX530 terminal configuration software");
		}
	} else if (1 == space0_or_weitong1) {
		if (38 == rcst_xph_type) {
			$('#welcome').html("Welcome to use the ChinaSat-HaoWang-X12 terminal configuration software");
		}
		else if (rcst_xph_type == 35) {
			$('#welcome').html("Welcome to use the ChinaSat-HaoWang-X11 terminal configuration software");
		}
	} else if (2 == space0_or_weitong1) {
		$('#welcome').html("Welcome to use the SCE-BBU terminal configuration software");
	} else if (3 == space0_or_weitong1) {
		$('#welcome').html("Welcome to use the G600T terminal configuration software");
	}

	$('.resetPasswd').html("Reset Passwd");
	$('#logintitle').html("Login");
	$('#login').html("Login");
	$('#error').html("Invalid username or password! Please try again.");

	Cancel = "Cancel";
	OK = "OK";
	alert_title = "Prompt Message";
	setup_failed = "Setup Failed";
	setup_suc = "Setup Success";
	pass_succ = "Setup Success. Please login again";
	resetPasswd_confirm = "Reset password will change the password. Really reset password ?";
	validate_pass = "Password must be consisit of numbers and letters and uderlines, and length is 12 to 17 bits, can not contain character: $ or ( or ) or &";
	validate_blank = "Password can not be blank";

	note1 = "Warm Reminder:";
	note2 = " To further implement relevant cybersecurity regulations and enhance your network security protection capabilities, the broadband satellite network operation center has performed ";
	note2 += "a version upgrade on the terminal. After this upgrade, the login interface of your terminal board will be optimized to ";
	note2 += "a site-specific strong password authentication system, and the original universal authentication method will become invalid.";
	note3 = "To ensure your information security, please contact your equipment supplier to apply for a new password from the broadband satellite network operation center. We will provide the ";
	note3 += "new password to your equipment supplier after conducting a security verification.";
	$(".test1").html(note1);
	$(".test2").html(note2);
	$(".test3").html(note3);
}
function trans_zh() {
	if (0 == space0_or_weitong1) {
		if (38 == rcst_xph_type) {
			$('#welcome').html("欢迎使用SATBOX631终端配置软件");
		}
		else if (39 == rcst_xph_type) {
			$('#welcome').html("欢迎使用SATBOX631-LI终端配置软件");
		}
		else if (40 == rcst_xph_type) {
			$('#welcome').html("欢迎使用SATBOX520-LI终端配置软件");
		}
		else if (35 == rcst_xph_type) {
			$('#welcome').html("欢迎使用SATBOX530终端配置软件");
		}
	} else if (1 == space0_or_weitong1) {
		if (38 == rcst_xph_type) {
			$('#welcome').html("欢迎使用中星昊网-X12终端配置软件");
		}
		else if (35 == rcst_xph_type) {
			$('#welcome').html("欢迎使用中星昊网-X11终端配置软件");
		}

	} else if (2 == space0_or_weitong1) {
		$('#welcome').html("欢迎使用SCE-BBU终端配置软件");
	} else if (3 == space0_or_weitong1) {
		$('#welcome').html("欢迎使用G600T终端配置软件");
	}

	$('.resetPasswd').html("重置密码");
	$('#logintitle').html("登录");
	$('#login').html("登录");
	$('#error').html("无效的用户名或密码！请重新输入");

	OK = "确定";
	Cancel = "取消";
	alert_title = "提示信息";
	setup_suc = "设置成功";
	setup_failed = "设置失败";
	pass_succ = "配置成功，请稍后重新登陆";
	resetPasswd_confirm = "重置密码会将密码恢复至初始状态，确定重置？";
	validate_pass = "密码需由12-17位数字和字母和特殊字符构成，且不能包含字符：$ 或 ( 或 ) 或 &";
	validate_blank = "密码不能为空";
	note1 = "温馨提示：";
	note2 = " 为加强落实网络安全有关规范，进一步巩固您的网络安全防护能力，宽带卫星网络运行平台对终端进行了版本升级。本次升级后，";
	note2 += "您的终端板卡登陆界面将优化为一站一策强口令认证，原有通用认证方式将失效。";
	note3 = " 为确保您的信息安全，请您联系您的设备供应商向宽带卫星网络运行平台申请获取新口令，我们在进行安全核实后，将新口令提供给您的设备供应商。";
	$(".test1").html(note1);
	$(".test2").html(note2);
	$(".test3").html(note3);
	$(".aaa").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
}
function trans_zh_HK() {
	if (0 == space0_or_weitong1) {
		if (38 == rcst_xph_type) {
			$('#welcome').html("歡迎使用SATBOX631終端配置軟件");
		}
		else if (39 == rcst_xph_type) {
			$('#welcome').html("歡迎使用SATBOX631-LI終端配置軟件");
		}
		else if (40 == rcst_xph_type) {
			$('#welcome').html("歡迎使用SATBOX520-LI終端配置軟件");
		}
		else if (35 == rcst_xph_type) {
			$('#welcome').html("歡迎使用SATBOX530終端配置軟件");
		}
	} else if (1 == space0_or_weitong1) {
		if (38 == rcst_xph_type) {
			$('#welcome').html("歡迎使用中星昊網-X12終端配置軟件");
		}
		else if (35 == rcst_xph_type) {
			$('#welcome').html("歡迎使用中星昊網-X11終端配置軟件");
		}

	} else if (2 == space0_or_weitong1) {
		$('#welcome').html("歡迎使用SCE-BBU終端配置軟件");
	} else if (3 == space0_or_weitong1) {
		$('#welcome').html("歡迎使用G600T終端配置軟件");
	}

	$('.resetPasswd').html("重置密码");
	$('#logintitle').html("登錄");
	$('#login').html("登錄");
	$('#error').html("無效的用戶名或密碼！請重新輸入");

	OK = "確定";
	Cancel = "取消";
	alert_title = "提示資訊";
	setup_suc = "设置成功";
	setup_failed = "设置失败";
	pass_succ = "配置成功，请稍后登陆";
	resetPasswd_confirm = "重置密码会将密码恢复至初始状态，确定重置？";
	validate_pass = "密码需由12-17位數字和字母和_搆成，且不能包含字符： $ 或 ( 或 ) 或 ";
	validate_blank = "不能為空";
	note1 = "溫馨提示：";
	note2 = "為加強落實網絡安全有關規范，進一步鞏固您的網絡安全防護能力，寬帶衛星網絡運行平台對終端進行了版本升級。本次升級后，";
	note2 += "您的終端板卡登陸界面將優化為一站一策強口令認證，原有通用認證方式將失效。";
	note3 = " 為確保您的信息安全，請您聯系您的設備供應商向寬帶衛星網絡運行平台申請獲取新口令，我們在進行安全核實后，將新口令提供給您的設備供應商。";
	$(".test1").html(note1);
	$(".test2").html(note2);
	$(".test3").html(note3);
	$(".aaa").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
}

