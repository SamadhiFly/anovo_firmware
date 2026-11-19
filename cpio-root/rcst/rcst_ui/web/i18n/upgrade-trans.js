var alert_title;
var change_success;
var cannot_change;
var cannot_change2;
var setup_suc;
var setup_failed;
var upload_error;
var upload_error1;
var upload_error2;
var upload_error3;
var upload_success;
var upgrade_status;
var upgrade_status1;
var upgrade_status2;
var upgrade_status3;
var upgrade_status4;
var upgrade_status5;
var upgrade_status6;
var upgrade_status7;
var ok;
var cancel;
var dialog_content_reboot;
var dialog_content_reset;
var reset_again;
var upgrade_diff;
var Export;
var Exporting;
var import_success;
var importsuc;
var importerr1;
var importerr2;
var importerr3;
var timeout;
var uploading;
var uploadfailed;
var uploadsuccess;
var notsame;
var changesys_success;
var reset_success;
var exportAlertTitle;
var exportAlertError;
var passs_same;
var old_pass_err;
var validate_blank;
var validate_length;
var validate_input;
var validate_pass;
var validate_pass_17;
var pass_succ;
$('.Submit').html("提交");
function trans_en() {
	$('#lang').val('en');
	$('#terminal_b').html("Terminal Status");
	$('#odu_b').html("RF");
	$('#network_b').html("Network");
	$('#diagnostics_b').html("Diagnostics");
	$('#installation_b').html("Installation");
	$('#quit').html("Quit");
	$('#upgrade').html("System");
	$('#upload').html("Upload Key");
	$('#system').html("System");
	$('#lang').html("简体中文");

	$('.System').html("System");
	$('.Restart').html("Restart");
	$('.Reset').html("Reset");

	$('.Version').html("Version");
	$('.VersionType').html("VersionType");
	$('.CurrentVersion').html("CurrentVersion");
	$('.UpgradeWay').html("UpgradeWay");
	$('.Upgrade').html("System");
	$('.Upgrade1').html("Upgrade");
	$('.terminalmode').html("Terminalmode");
	$('.SystemMode').html("System Mode");
	$('.RemoteUpgrade').html("RemoteUpgrade");
	$('.LocalUpgrade').html("LocalUpgrade");
	$('.UpgradeType').html("UpgradeType");
	$('.Firmware').html("Firmware");
	$('.UploadUpgrade').html("Upload & Upgrade");
	$('.notice').html("Notice: Please keep the RF cable and power connecting while upgrading!");
	$('.Submit').html("Submit");
	$('#LocalTime').html("Local Time");
	$('.TimeZone').html("Time Zone");
	$('.ExportLog').html("Export Log");
	$('.Export').html("Export");
	$('#Upload').html("Upload");
	$('.ExportCfg').html("Export");
	$('.uploaddownload').html("Upload&Export");
	$('.MIRImport').html("MIR Import");
	$('.FileImport').html("Import");
	$('.resetPasswd').html("Reset Passwd");
	$('.passwdChange').html("Password Manger");
	$('.passwdOld').html("Old Passwd");
	$('.passwdNew').html("New Password");
	$('.passwdAgain').html("New Password Aagin");
	importsuc = "Mir file import success"
	importerr1 = "Mir file error, Please choose again"
	importerr2 = "Mir file not in range of 0~100Mbps"
	importerr3 = "Mir file md5 not match"
	Export = "Export";
	Exporting = "Exporting";
	import_success = "Import Success";

	alert_title = "Prompt Message";
	upload_error = "You did not select a file,Please choose again";
	upload_error1 = "File name error,Please choose again";
	exportAlertError = "File name should consist of 1-20 digits or letters,either - or _";
	upload_error2 = "Upload failed, file not exist";
	upload_error3 = "Syetem error, please try again";
	upload_success = "Upload Success! Are you sure to upgrade？";

	upgrade_status = "Upgrading";
	upgrade_status1 = "Upgrade Success";
	upgrade_status2 = "Restarting，please refresh the page manually in a few minutes!"
	upgrade_status3 = "Upgrade failed";
	upgrade_status4 = "Upgrade failed, file not exist, upload failed or error!";
	upgrade_status5 = "Upgrade failed, file check failed!";
	upgrade_status6 = "Upgrade failed, file download failed!";
	upgrade_status7 = "Upgrade failed, network is unreachable, please check the network connection!";

	upgrade_diff = "Terminal types are different, can not upgrade, please choose again";
	dialog_content_reboot = "Whether to restart system?";
	dialog_content_reset = "Whether to restart reset?";
	OK = "OK";
	Cancel = "Cancel";

	upgrade = "System";
	reset_again = "Reseting, please try later...";
	change_success = "Setup success! Terminal is reseting...";
	cannot_change = "Setup Failed! Only system 3.0 can change to FDMA";
	cannot_change2 = "Setup Failed! FDMA mode only support system 3.0";
	setup_failed = "Setup Failed";
	setup_suc = "Setup Success";

	timeout = "Time out";
	uploading = "Processing";
	uploadfailed = "Process Failed";
	uploadsuccess = "Process success, please wait for reset";
	notsame = " (Upgrade file in main and backup are not same)";

	changesys_success = "Setup Success. Terminal is reseting. Network is disconect, please visit web later.";
	reset_success = "Setup Success. Terminal is reseting. Network is disconect, please visit web later.";
	passs_same = "please enter same password!"
	old_pass_err = "Old password is error";
	validate_blank = "can not be blank";
	validate_length = "length must be not bigger than";
	validate_input = "must be consisit of numbers or letters or uderlines";
	validate_pass = "must be consisit of numbers and letters and uderlines, and length is 12 to 15 bits, can not contain character: $ or ( or ) or &";
	validate_pass_17 = "must be consisit of numbers and letters and uderlines, and length is 12 to 17 bits, can not contain character: $ or ( or ) or &";
	pass_succ = "Setup Success. Please login again";

	exportAlertTitle = "Enter the name of the export file";

	Processing = "Processing...";
	Submit = "Submit";
}
function trans_zh() {
	$('#lang').val('zh');
	$('#terminal_b').html("终端状态");
	$('#odu_b').html("射频");
	$('#network_b').html("网络");
	$('#diagnostics_b').html("诊断");
	$('#installation_b').html("初始安装");
	$('#quit').html("退出");
	$('#upgrade').html("系统");
	$('#system').html("系统");
	$('#upload').html("上传证书");
	$('#lang').html("English");

	$('.System').html("系统");
	$('.Upgrade1').html("升级");
	$('.terminalmode').html("终端模式");
	$('.SystemMode').html("系统模式");
	$('.Restart').html("重启");
	$('.Reset').html("复位");

	$('#upgradetitle').html("系统");
	$('.Version').html("版本");
	$('.VersionType').html("版本类型");
	$('.CurrentVersion').html("当前版本");
	$('.UpgradeWay').html("升级方式");
	$('.Upgrade').html("系统");
	$('.RemoteUpgrade').html("远程升级");
	$('.LocalUpgrade').html("本地升级");
	$('.UpgradeType').html("升级类型");
	$('.Firmware').html("固件");
	$('.UploadUpgrade').html("上传&升级");
	$('.notice').html("注意：升级过程中请保持射频线缆和供电电源连接！");
	$('.Submit').html("提交");
	$('#LocalTime').html("本地时间");
	$('.TimeZone').html("时区");
	$('.ExportLog').html("日志导出");
	$('.uploaddownload').html("配置导入导出");
	$('.Export').html("导出");
	$('#Upload').html("导入");
	$('.ExportCfg').html("导出");
	Export = "导出";
	Exporting = "导出中";
	import_success = "导入成功";
	$('.MIRImport').html("MIR导入");
	$('.FileImport').html("导入");
	$('.resetPasswd').html("重置密码");
	$('.passwdChange').html("密码管理");
	$('.passwdOld').html("原密码");
	$('.passwdNew').html("新密码");
	$('.passwdAgain').html("再次输入新密码");
	importsuc = "Mir文件导入成功"
	importerr1 = "Mir文件错误，请重新上传"
	importerr2 = "Mir参数超出0~100Mkbps范围"
	importerr3 = "Mir文件md5校验失败"

	alert_title = "提示信息";
	upload_error = "没有选择文件，请重新选择";
	upload_error1 = "文件名错误，请重新选择";
	exportAlertError = "文件名应由1-20位字母数字,-或_构成";
	upload_error2 = "上传失败，文件不存在";
	upload_error3 = "系统错误，请重新尝试";
	upload_success = "上传成功！是否升级？";

	upgrade_status = "升级中";
	upgrade_status1 = "升级成功";
	upgrade_status2 = "重启中，请几分钟后刷新页面"
	upgrade_status3 = "升级失败";
	upgrade_status4 = "升级失败，文件不存在，文件上传错误或者上传失败！";
	upgrade_status5 = "升级失败，文件校验错误！";
	upgrade_status6 = "升级失败，文件下载失败！";
	upgrade_status7 = "升级失败，网络不可达，请检查网络连接！";

	upgrade_diff = "型谱号不同，不可升级，请重新选择"
	dialog_content_reboot = "是否重启系统?";
	dialog_content_reset = "是否复位？";
	change_success = "设置成功! 终端复位中...";
	cannot_change = "设置失败! 只有3.0系统时，可以切换致FDMA模式";
	cannot_change2 = "设置失败! FDMA模式仅支3.0系统";
	OK = "确认";
	Cancel = "取消";
	upgrade = "系统";
	reset_again = "复位中，请稍后尝试";
	setup_suc = "设置成功";
	setup_failed = "设置失败";

	timeout = "超时";
	uploading = "处理中";
	uploadfailed = "文件解析失败";
	uploadsuccess = "文件解析成功，请等候复位生效";

	notsame = " (主备分区升级文件不一致)";
	$('#system').html("系统");

	changesys_success = "设置成功! 复位中... 网络连接断开，请稍后访问界面";
	reset_success = "终端复位中... 网络连接断开，请稍后访问界面";
	exportAlertTitle = "输入导出文件名称";
	passs_same = "两次输入密码不一致";
	old_pass_err = "原密码错误";
	validate_length = "长度必须小于等于";
	validate_input = "需由数字或字母或下划线组成";
	validate_pass = "需由12-15位数字和字母和特殊字符构成，且不能包含字符：$ 或 ( 或 ) 或 &";
	validate_pass_17 = "需由12-17位数字和字母和特殊字符构成，且不能包含字符：$ 或 ( 或 ) 或 &";
	validate_blank = "不能为空";
	pass_succ = "配置成功，请重新登陆";

	Processing = "处理中...";
	Submit = "提交";
}
function trans_zh_HK() {
	$('#lang').val('zhHK');
	$('#terminal_b').html("終端狀態");
	$('#odu_b').html("射頻");
	$('#network_b').html("網絡");
	$('#diagnostics_b').html("診斷");
	$('#installation_b').html("初始安裝");
	$('#quit').html("退出");
	$('#upgrade').html("系統");
	$('#system').html("系統");
	$('#upload').html("上傳證書");
	$('#lang').html("English");

	$('.System').html("系統");
	$('.Upgrade1').html("升級");
	$('.terminalmode').html("終端模式");
	$('.SystemMode').html("系統模式");
	$('.Restart').html("重啟");
	$('.Reset').html("復位");

	$('#upgradetitle').html("系統");
	$('.Version').html("版本");
	$('.VersionType').html("版本類型");
	$('.CurrentVersion').html("當前版本");
	$('.UpgradeWay').html("升級方式");
	$('.Upgrade').html("系統");
	$('.RemoteUpgrade').html("遠程升級");
	$('.LocalUpgrade').html("本地升級");
	$('.UpgradeType').html("升級類型");
	$('.Firmware').html("固件");
	$('.UploadUpgrade').html("上傳&升級");
	$('.notice').html("注意：升級過程中請保持射頻線纜和供電電源連接！");
	$('.Submit').html("提交");
	$('#LocalTime').html("本地時間");
	$('.TimeZone').html("時區");
	$('.ExportLog').html("日誌匯出");
	$('.uploaddownload').html("配置導入匯出");
	$('.Export').html("匯出");
	$('#Upload').html("導入");
	$('.ExportCfg').html("匯出");
	Export = "匯出";
	Exporting = "匯出中";
	import_success = "導入成功";
	$('.MIRImport').html("MIR導入");
	$('.FileImport').html("導入");

	$('.resetPasswd').html("重置密码");
	$('.passwdChange').html("密碼管理");
	$('.passwdOld').html("原密碼");
	$('.passwdNew').html("新密碼");
	$('.passwdAgain').html("再次輸入新密碼");

	importsuc = "Mir文件導入成功"
	importerr1 = "Mir文件錯誤,請重新上傳"
	importerr2 = "Mir參數超出0~100Mkbps範圍"
	importerr3 = "Mir文件md5校驗失敗"

	alert_title = "提示資訊";
	upload_error = "沒有選擇文件，請重新選擇";
	upload_error1 = "文件案名錯誤，請重新選擇";
	exportAlertError = "文件名應由1-20位字母數字,-或_搆成";
	upload_error2 = "上傳失敗，文件不存在";
	upload_error3 = "系統錯誤，請重新嘗試";
	upload_success = "上傳成功！是否升級？";

	upgrade_status = "升級中";
	upgrade_status1 = "升級成功";
	upgrade_status2 = "重啟中，請幾分鐘後刷新頁面"
	upgrade_status3 = "升級失敗";
	upgrade_status4 = "升級失敗，文件不存在，文件上傳錯誤或者上傳失敗！";
	upgrade_status5 = "升級失敗，文件校驗錯誤！";
	upgrade_status6 = "升級失敗，文件下載失敗！";
	upgrade_status7 = "升級失敗，網絡不可達，請檢查網絡連接！";

	upgrade_diff = "型譜號不同，不可升級，請重新選擇"
	dialog_content_reboot = "是否重啟系統?";
	dialog_content_reset = "是否復位？";
	change_success = "設置成功! 終端重定中...";
	cannot_change = "設置失敗! 只有3.0系統時,可以切換致FDMA模式";
	cannot_change2 = "設置失敗! FDMA模式僅支3.0系統";
	OK = "確認";
	Cancel = "取消";
	upgrade = "系統";
	reset_again = "復位中，請稍後嘗試";
	setup_suc = "設置成功";
	setup_failed = "設置失敗";

	timeout = "超時";
	uploading = "處理中";
	uploadfailed = "文件解析失敗";
	uploadsuccess = "文件解析成功，請等候復位生效";

	notsame = " (主備分區升級文件不一致)";
	$('#system').html("系統");

	changesys_success = "設置成功! 復位中... 網絡連接斷開，請稍後訪問介面";
	reset_success = "終端重定中... 網絡連接斷開，請稍後訪問介面";
	exportAlertTitle = "輸入匯出文件名稱";
	passs_same = "兩次輸入密碼不一致";
	old_pass_err = "原密碼錯誤";
	validate_blank = "不能為空";
	validate_length = "長度必須小於等於";
	validate_pass = "需由12-15位數字和字母和_搆成，且不能包含字符： $ 或 ( 或 ) 或 &";
	validate_pass_17 = "需由12-17位數字和字母和_搆成，且不能包含字符： $ 或 ( 或 ) 或 &";
	validate_input = "需由數字或字母或下划線組成";
	pass_succ = "配置成功，請重新登陸";
	Submit = "提交";
	Processing = "處理中...";
}