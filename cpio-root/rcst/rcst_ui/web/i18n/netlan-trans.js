var alert_title;
var nothing;
var dialog_content;
var setup_suc;
var setup_failed;

var validate_blank;
var validate_number;
var validate_integer;
var validate_less;
var validate_greater;
var validate_ip;
var validate_input;

var acu_dialog;
var acu_client;
var acu_server;

var Twolayer;
var Threelayer;
var Mix;

var Processing;
var Submit;
function trans_en() {
	$('#lang').val('en');
	$('#hometitle').html("home");
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

	$('.network_lan_wan').html("Network");
	$('.Network').html("Network");
	$('.Advanced').html("Advanced");
	$('.ARP').html("ARP");

	$('#lantitle').html("LAN");
	$('.IP').html("IP");
	$('.Netmask').html("Netmask");
	$('.UserName').html("User Name");
	$('.Password').html("Password");

	$('.ServicePort').html("Service Port");
	$('.ManagerPort').html("Manager Port");
	$('.ManagerIP').html("Manager IP");
	$('.ManagerNetmask').html("Manager Netmask");
	$('.NetworkMode').html("Network Mode");
	$('.NetworkTag').html("Network Tag");
	$('.LANNetmaks').html("LAN Netmaks");
	$('.WANNetmaks').html("WAN Netmaks");
	$('.DHCPStartIP').html("DHCP Start IP");
	$('.DHCPEndIP').html("DHCP End IP");
	$('.Interface').html("Interface");

	nothing = "You have changed nothing to submit";
	dialog_content = "configurating, please wait...";
	alert_title = "Prompt Message";
	setup_suc = "Setup Success";
	setup_failed = "Setup Failed";

	validate_blank = "can not be blank";
	validate_number = "must be number";
	validate_integer = "must be integer";
	validate_less = "must be not less than ";
	validate_greater = "must be not greater than ";
	validate_ip = "consist of 4 munbers between 0 to 255, separate the numbers with .";
	validate_input = "must be consisit of numbers or letters or uderlines";
	ok = "OK";
	cancel = "Cancel";
	mtu_reset = "Setup success, to be effective after reset";

	$('.Submit').html("Submit");

	Twolayer = "Twolayer";
	Threelayer = "Threelayer";
	Mix = "Mix";
	Submit = "Submit";
	Processing = "Processing...";
}
function trans_zh() {
	$('#lang').val('zh');
	$('#hometitle').html("主界面");
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

	$('.Network').html("网络");
	$('.Advanced').html("高级");
	$('.ARP').html("ARP");


	$('.Netmask').html("子网掩码");
	$('.UserName').html("用户名");
	$('.Password').html("密码");


	$('.network_lan_wan').html("网络");
	$('.ServicePort').html("业务口");
	$('.ManagerPort').html("管理口");
	$('.ManagerIP').html("管理口IP");
	$('.ManagerNetmask').html("管理口子网掩码");
	$('.NetworkMode').html("网络模式");
	$('.NetworkTag').html("网络标签");
	$('.LANNetmaks').html("LAN子网掩码");
	$('.WANNetmaks').html("WAN子网掩码");
	$('.DHCPStartIP').html("DHCP起始IP");
	$('.DHCPEndIP').html("DHCP截止IP");
	$('.Interface').html("网口");

	nothing = "参数未更改";
	dialog_content = "设置中，请稍等";
	alert_title = "提示信息";
	setup_suc = "设置成功";
	setup_failed = "设置失败";

	validate_blank = "不能为空";
	validate_number = "必须为数字";
	validate_integer = "必须为整数";
	validate_less = "必须大于等于";
	validate_greater = "必须小于等于";
	validate_ip = "由4个 0~255 之间的数字组成，数字之间用点区隔";
	validate_input = "需由数字或字母或下划线组成";
	ok = "确认";
	cancel = "取消";
	mtu_reset = "设置成功，需要复位后生效";

	$('.Submit').html("提交");
	Twolayer = " 二层";
	Threelayer = "三层";
	Mix = "混合";
	Submit = "提交";
	Processing = "处理中...";
}
function trans_zh_HK() {
	$('#lang').val('zhHK');
	$('#hometitle').html("主界面");
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

	$('.Network').html("網絡");
	$('.Advanced').html("高級");
	$('.ARP').html("ARP");


	$('.Netmask').html("子網掩碼");
	$('.UserName').html("用戶名");
	$('.Password').html("密碼");


	$('.network_lan_wan').html("網絡");
	$('.ServicePort').html("業務口");
	$('.ManagerPort').html("管理口");
	$('.ManagerIP').html("管理口IP");
	$('.ManagerNetmask').html("管理口子網掩碼");
	$('.NetworkMode').html("網絡模式");
	$('.NetworkTag').html("網絡標籤");
	$('.LANNetmaks').html("LAN子網掩碼");
	$('.WANNetmaks').html("WAN子網掩碼");
	$('.DHCPStartIP').html("DHCP起始IP");
	$('.DHCPEndIP').html("DHCP截止IP");
	$('.Interface').html("網口");

	nothing = "參數未更改";
	dialog_content = "設置中，請稍等";
	alert_title = "提示資訊";
	setup_suc = "設置成功";
	setup_failed = "設置失敗";

	validate_blank = "不能為空";
	validate_number = "必須為數位";
	validate_integer = "必須為整數";
	validate_less = "必須大於等於";
	validate_greater = "必須小於等於";
	validate_ip = "由4個 0~255 之間的數位組成，數位之間用點區隔";
	validate_input = "需由數位或字母或底線組成";
	ok = "確認";
	cancel = "取消";
	mtu_reset = "設置成功，需要重定後生效";

	$('.Submit').html("提交");
	Twolayer = " 二層";
	Threelayer = "三層";
	Mix = "混合";
	Submit = "提交";
	Processing = "處理中...";
}
