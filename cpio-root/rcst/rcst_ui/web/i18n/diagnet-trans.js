var loading;
var badaddr;
var speedTest;
var diagnostics;

var validate_blank;
var validate_number;
var validate_integer;
var validate_less;
var validate_greater;
var validate_ip;

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

	$('#nettitle').html("Network Diagnosis");
	$('.SpeedTest').html("SpeedTest");
	$('.speedtest').html("Speed Test");

	$('.IP').html("IP");
	$('.defaultgwip').html("default gateway ip");
	$('.acuIP').html("acuIP");
	$('.customIP').html("customIP");

	$('.TraceRoute').html("Trace Route");
	$('.customTraceRouteIP').html("custom_TraceRoute");
	$('.defaultgwTraceRoute').html("defaul_tTraceRoute");
	loading = "loading...";
	badaddr = "Bad address specified!"

	speedMes = "Terminal is offline now, can not speed test";
	diagnostics = "Diagnostics";
	speedTest = "Speed Test"

	validate_blank = "can not be blank";
	validate_number = "must be number";
	validate_integer = "must be integer";
	validate_less = "must be not less than ";
	validate_greater = "must be not greater than ";
	validate_ip = "consist of 4 munbers between 0 to 255, separate the numbers with .";
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

	$('#nettitle').html("网络诊断");
	$('.speedtest').html("測速");
	$('.SpeedTest').html("测速");
	$('.IP').html("IP地址");
	$('.defaultgwip').html("默认网关");
	$('.acuIP').html("acuIP");
	$('.customIP').html("业务IP");
	$('.TraceRoute').html("跟踪路由");
	$('.customTraceRouteIP').html("业务跟踪路由");
	$('.defaultgwTraceRoute').html("默认网关跟踪路由");
	loading = "加载中...";
	badaddr = "指定了错误的地址！";
	speedMes = "终端不在线，无法测速";
	speedTest = "测速";

	validate_blank = "不能为空";
	validate_number = "必须为数字";
	validate_integer = "必须为整数";
	validate_less = "必须大于等于";
	validate_greater = "必须小于等于";
	validate_ip = "由4个 0~255 之间的数字组成，数字之间用点区隔";
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

	$('#nettitle').html("網絡診斷");
	$('.speedtest').html("測速");
	$('.SpeedTest').html("測速");
	$('.IP').html("IP地址");
	$('.defaultgwip').html("默認網關");
	$('.acuIP').html("acuIP");
	$('.customIP').html("業務IP");
	$('.TraceRoute').html("跟蹤路由");
	$('.customTraceRouteIP').html("業務跟蹤路由");
	$('.defaultgwTraceRoute').html("默認網關跟蹤路由");
	loading = "載入中...";
	badaddr = "指定了錯誤的地址！";
	speedMes = "終端不在線，無法測速";
	speedTest = "測速";

	validate_blank = "不能為空";
	validate_number = "必須為數位";
	validate_integer = "必須為整數";
	validate_less = "必須大於等於";
	validate_greater = "必須小於等於";
	validate_ip = "由4個 0~255 之間的數位組成，數位之間用點區隔";
}

