var setup_failed;
var sig_text1;
var sig_text2;
var outofrange;

var validate_blank;
var validate_number;
var validate_number_7;
var validate_integer;
var validate_less;
var validate_greater;
var validate_ip;
var alert_title;
var sigNote;
function trans_en() {
	$('#lang').val('en');
	$('#administrator').html("Administrator");
	$('#terminal_b').html("Terminal Status");
	$('#odu_b').html("RF");
	$('#network_b').html("Network");
	$('#diagnostics_b').html("Diagnostics");
	$('#installation_b').html("Installation");
	$('#quit').html("Quit");
	$('#upgrade').html("System");
	$('#system').html("System");
	$('#upload').html("Upload Key");
	$('#lang').html("简体中文");

	$('.RCSTStatus').html("RCSTStatus");
	$('.ACUStatus').html("ACU Status");
	$('.Network').html("Network");
	$('.RF').html("RF");
	$('.ViewLog').html("ViewLog");
	$('.ProcessMonitoring').html("ProcessMonitoring");
	$('.Mesh').html("Mesh");

	$('#rftitle').html("RF Diagnosis");
	$('.SingleCarrier').html("Single Carrier");
	$('.TXFrequency').html("TX Frequency");
	$('.TXPower').html("TX Power");
	$('.TXTime').html("TX Time");
	$('.Transmit').html("Transmit");
	$('.TXLocalOscillator').html("TX Local Oscillator");
	$('.Close').html("Close");
	setup_failed = "Setup failed";
	Processing = "Processing...";
	sig_text1 = "Notice: RF transmiting will be stopped automatically after";
	sig_text2 = "seconds";
	outofrange = "RL freq Out Of Range";
	fdsigle = "FD Mode can not use this funtion";

	validate_blank = "can not be blank";
	validate_number = "must be number";
	validate_number_7 = "must be number, up to 7 decimal places";
	validate_integer = "must be integer";
	validate_less = "must be not less than ";
	validate_greater = "must be not greater than ";
	validate_ip = "consist of 4 munbers between 0 to 255, separate the numbers with .";

	sigNote = "When transmiting single carrier, please do not disconnect network cable";
}
function trans_zh() {
	$('#lang').val('zh');
	$('#hometitle').html("主界面");
	$('#odutitle').html("室外单元");
	$('#administrator').html("管理员");
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

	$('.RCSTStatus').html("终端状态");
	$('.ACUStatus').html("ACU状态");
	$('.Network').html("网络");
	$('.RF').html("射频");
	$('.ViewLog').html("日志查看");
	$('.ProcessMonitoring').html("进程监控");
	$('.Mesh').html("网状网");

	$('#rftitle').html("射频诊断");
	$('.SingleCarrier').html("单载波设置");
	$('.TXFrequency').html("发射频点");
	$('.TXPower').html("发射功率");
	$('.TXTime').html("发射时长");
	$('.TXLocalOscillator').html("发射本振");
	$('.Transmit').html("发射");
	$('.Close').html("关闭");
	setup_failed = "设置失败";
	sig_text1 = "注意：单载波发射将在";
	sig_text2 = "秒后自动停止";
	outofrange = "中频超出范围";
	fdsigle = "FD模式不支持此功能";
	alert_title = "提示信息";
	validate_blank = "不能为空";
	validate_number = "必须为数字";
	validate_number_7 = "必须为数字，小数后最多7位";
	validate_integer = "必须为整数";
	validate_less = "必须大于等于";
	validate_greater = "必须小于等于";
	validate_ip = "由4个 0~255 之间的数字组成，数字之间用点区隔";
	sigNote = "发射单载波时，请勿断开网线连接";
}
function trans_zh_HK() {
	$('#lang').val('zhHK');
	$('#hometitle').html("主界面");
	$('#odutitle').html("室外單元");
	$('#administrator').html("管理員");
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

	$('.RCSTStatus').html("終端狀態");
	$('.ACUStatus').html("ACU狀態");
	$('.Network').html("網絡");
	$('.RF').html("射頻");
	$('.ViewLog').html("日誌查看");
	$('.ProcessMonitoring').html("進程監控");
	$('.Mesh').html("網狀網");

	$('#rftitle').html("射頻診斷");
	$('.SingleCarrier').html("單載波設置");
	$('.TXFrequency').html("發射頻點");
	$('.TXPower').html("發射功率");
	$('.TXTime').html("發射時長");
	$('.TXLocalOscillator').html("發射本振");
	$('.Transmit').html("發射");
	$('.Close').html("關閉");
	setup_failed = "設置失敗";
	sig_text1 = "注意：單載波發射將在";
	sig_text2 = "秒後自動停止";
	outofrange = "中頻超出範圍";
	fdsigle = "FD模式不支援此功能";
	alert_title = "提示資訊";
	validate_blank = "不能為空";
	validate_number = "必須為數位";
	validate_number_7 = "必須為數位，小數后最多7位";
	validate_integer = "必須為整數";
	validate_less = "必須大於等於";
	validate_greater = "必須小於等於";
	validate_ip = "由4個 0~255 之間的數位組成，數位之間用點區隔";
	sigNote = "發射單載波時，請勿斷開網線連接";
}


