var dialog_route;
var state1_swtich;
var dialog_natport;
var no_content;
var error_content;
var Num;
var NatSwitch;
var Protocol;
var TargetIP;
var StartPort;
var EndPort;
var Description;
var Interface;
var Option;
var DNSOpen;
var DNSClose;

var Name;
var Protocoltype;
var SourceMAC;
var SourceZone;
var SourceIP;
var SourceStartPort;
var SourceEndPort;
var DestinationZone;
var DescriptionIP;
var DescriptionStratPort;
var DescriptionEndPort;
var Pollcy;
var FirewallList;
var nofirewall;

var tunid;
var tunvlanid;
var tunname;
var tunremotewanip;
var tunlocallanip;
var tunlocalwanip;

var DNSSwitch;
var DNSMake;
var DNSMain;
var DNSBack;
var Switch;
var validate_ip;
var validate_blank;
var validate_greater;
var validate_less;
var validate_number;
var validate_integer;
var Proset;

var same_description;
var start_port;
var same_port;
var port_conflict;
var NATList;

var ON, OFF;
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


	$('.Network').html("Network");
	$('.Advanced').html("Advanced");
	$('.ARP').html("ARP");

	$('#prosettitle').html("Proset");
	$('.TCPStatus').html("TCP Status");
	$('.TCPVersion').html("TCP Version");
	$('.G5G4Switch').html("4G/5G Status");
	$('.NATStatus').html("NAT Status");
	$('.firewallStatus').html("Firewall Status");
	$('.NatList').html("NAT List");
	$('.PortForwarding').html("Port Forwarding");
	$('.PortForwardingList').html("Port Forwarding List");
	$('.Routes').html("Routes");
	$('.RoutesList').html("Routes List");
	$('.DNSList').html("DNS List");
	$('.greList').html("GRE List");
	$('.DNSSwitch').html("DNS Switch:");
	$('.DNSMake').html("DNS Customization:");
	$('.DNSMain').html("DNS Main:");
	$('.DNSBack').html("DNS Back:");
	$('.multicastUpgradeSwitch').html("Multicast Upgrade");


	Switch = "Switch";
	Num = "Vlan";
	Protocol = "Protocol";
	NatSwitch = "Nat Switch";
	TargetIP = "Target IP";
	StartPort = "Start Port";
	EndPort = "End Port";
	Description = "Description";
	Interface = "Interface";
	Option = "Option";
	Netmask = "Netmask";
	Gateway = "Gateway";
	Name = "Name";
	Protocoltype = "Protocol Type";
	SourceMAC = "Source MAC";
	SourceZone = "Source Zone";
	SourceIP = "Source IP";
	SourceStartPort = "Source Start Port";
	SourceEndPort = "Source End Port";
	DestinationZone = "Destination Zone";
	DescriptionIP = "Description IP";
	DescriptionStratPort = "Description Strat Port";
	DescriptionEndPort = "Description End Port";
	Pollcy = "Pollcy";
	FirewallList = "Firewall List";

	DNSSwitch = "DNS Switch";
	DNSMake = "DNS Make";
	DNSMain = "DNS Main";
	DNSBack = "DNS Back";

	$('.Submit').html("Submit");
	$('.View').html("View");
	$('.FirewallList').html("Firewall List");
	$('.FirewallRuleList').html("Firewall Rule List");
	$('.Firewall').html("Firewall");

	state1_swtich = "Swtich status getting, please wait...";
	dialog_natport = "Port Forwarding Set List";
	no_content = "There is no setting informations";
	dialog_route = "Route Setting List";
	error_content = "I am Sorry!The setting informations read failure,please flash the page!";
	DNSOpen = "Enabling DNS, please wait...";
	DNSClose = "Disnabling DNS, please wait...";
	DNSMakeOpen = "Enabling DNS Customization, please wait...";
	DNSMakeClsoe = "Disnabling DNS Customization, please wait.";
	TCPOpen = "Enabling TCP acceleration, please wait...";
	TCPClose = "Disnabling TCP acceleration, please wait...";
	setup_failed = "Setup failed";
	setup_suc = "Setup success";
	nofirewall = "There is no setting informations";

	tunid = "Tunnel ID";
	tunvlanid = "Vlan"
	tunname = "Description";
	tunremotewanip = "Tunle Remote Wan IP";
	tunlocallanip = "Local LAN IP";
	tunlocalwanip = "Local WAN IP";

	validate_blank = "can not be blank";
	validate_ip = "consist of 4 munbers between 0 to 255, separate the numbers with .";
	validate_greater = "must be not greater than ";
	validate_less = "must be not less than ";
	validate_number = "must be number";
	validate_integer = "must be integer";
	Proset = "Proset";

	start_port = "Start Port Cannot Larger Then End Port";
	same_port = "Same Port Have Exist";
	port_conflict = "Port Range Conflict";
	same_description = "Same Description Have Exist";
	NATList = "NAT List";
	ON = "ON";
	OFF = "OFF";
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

	$('#prosettitle').html("高级");
	$('.TCPStatus').html("TCP状态");
	$('.TCPVersion').html("TCP版本");
	$('.G5G4Switch').html("4G/5G状态");
	$('.NATStatus').html("NAT状态");
	$('.firewallStatus').html("防火墙状态");
	$('.NatList').html("NAT列表");
	$('.PortForwarding').html("端口映射");
	$('.PortForwardingList').html("端口映射列表");
	$('.Routes').html("路由");
	$('.RoutesList').html("路由设置列表");
	$('.DNSList').html("DNS列表");
	$('.greList').html("GRE列表");
	$('.DNSSwitch').html("DNS开关:");
	$('.DNSMake').html("DNS定制:");
	$('.DNSMain').html("DNS主:");
	$('.DNSBack').html("DNS备:");
	$('.multicastUpgradeSwitch').html("组播升级开关");

	Switch = "开关";
	Num = "序号";
	Protocol = "协议";
	NatSwitch = "NAT开关";
	TargetIP = "目标IP地址";
	StartPort = "开始端口";
	EndPort = "结束端口";
	Description = "描述";
	Interface = "输出接口";
	Option = "操作";
	Netmask = "子网掩码";
	Gateway = "网关";
	switch_open = "打开成功";
	switch_close = "关闭成功";
	switch_error = "失败！请重试";

	$('.Submit').html("提交");
	$('.View').html("查看");

	state1_swtich = "开关状态获取中，请稍候...";
	dialog_natport = "端口映射设置表";
	no_content = "无配置信息";
	dialog_route = "路由设置表";
	error_content = "抱歉，读取配置信息失败,请刷新页面！";
	DNSOpen = "DNS开启中，请稍候...";
	DNSClose = "DNS关闭中，请稍候...";
	DNSMakeOpen = "DNS定制开启中，请稍候...";
	DNSMakeClsoe = "DNS定制关闭中，请稍候...";
	TCPOpen = "TCP加速开启中，请稍候...";
	TCPClose = "TCP加速关闭中，请稍候...";
	setup_failed = "配置失败";
	setup_suc = "配置成功"


	Name = "名称";
	Protocoltype = "协议类型";
	SourceMAC = "入口MAC";
	SourceZone = "入口地址";
	SourceIP = "入口IP";
	SourceStartPort = "入口起始端口";
	SourceEndPort = "入口结束端口";
	DestinationZone = "目标地址";
	DescriptionIP = "出口IP";
	DescriptionStratPort = "出口起始端口";
	DescriptionEndPort = "出口结束端口";
	Pollcy = "策略";
	FirewallList = "防火墙列表";
	nofirewall = "无配置信息";

	tunid = "隧道ID";
	tunvlanid = "Vlan"
	tunname = "名称"
	tunremotewanip = "远端链路地址"
	tunlocallanip = "本地LAN IP";
	tunlocalwanip = "本地WAN IP";

	DNSSwitch = "DNS开关";
	DNSMake = "DNS定制";
	DNSMain = "DNS主";
	DNSBack = "DNS备";

	validate_blank = "不能为空";
	validate_ip = "由4个 0~255 之间的数字组成，数字之间用点区隔";
	validate_less = "必须大于等于";
	validate_greater = "必须小于等于";
	Proset = "高级";
	validate_number = "必须为数字";
	validate_integer = "必须为整数";
	start_port = "开始端口不能大于结束端口";
	same_port = "相同的端口已存在";
	port_conflict = "端口范围冲突";
	same_description = "相同的描述已存在";

	$('.FirewallList').html("防火墙列表");
	$('.Firewall').html("防火墙");
	$('.FirewallRuleList').html("防火墙规则列表");
	NATList = "NAT列表";
	ON = "开";
	OFF = "关";
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

	$('#prosettitle').html("高級");
	$('.TCPStatus').html("TCP狀態");
	$('.G5G4Switch').html("4G/5G狀態");
	$('.TCPVersion').html("TCP版本");
	$('.NATStatus').html("NAT狀態");
	$('.firewallStatus').html("防火牆狀態");
	$('.NatList').html("NAT列表");
	$('.PortForwarding').html("端口映射");
	$('.PortForwardingList').html("端口映射列表");
	$('.Routes').html("路由");
	$('.RoutesList').html("路由設置列表");
	$('.DNSList').html("DNS列表");
	$('.greList').html("GRE列表");
	$('.DNSSwitch').html("DNS開關:");
	$('.DNSMake').html("DNS定制:");
	$('.DNSMain').html("DNS主:");
	$('.DNSBack').html("DNS備:");
	$('.multicastUpgradeSwitch').html("組播升級開關");

	Switch = "開關";
	Num = "序號";
	Protocol = "協議";
	NatSwitch = "NAT開關";
	TargetIP = "目標IP位址";
	StartPort = "開始端口";
	EndPort = "結束端口";
	Description = "描述";
	Interface = "輸出介面";
	Option = "操作";
	Netmask = "子網掩碼";
	Gateway = "閘道";
	switch_open = "打開成功";
	switch_close = "關閉成功";
	switch_error = "失敗！請重試";

	$('.Submit').html("提交");
	$('.View').html("查看");

	state1_swtich = "開關狀態獲取中，請稍候...";
	dialog_natport = "端口映射設置表";
	no_content = "無配置資訊";
	dialog_route = "路由設置表";
	error_content = "抱歉，讀取配置資訊失敗,請刷新頁面！";
	DNSOpen = "DNS開啟中,請稍候...";
	DNSClose = "DNS關閉中,請稍候...";
	DNSMakeOpen = "DNS定制開啟中,請稍候...";
	DNSMakeClsoe = "DNS定制關閉中,請稍候...";
	TCPOpen = "TCP加速開啟中,請稍候...";
	TCPClose = "TCP加速關閉中,請稍候...";
	setup_failed = "配置失敗";
	setup_suc = "配置成功"

	Name = "名稱";
	Protocoltype = "協議類型";
	SourceMAC = "入口MAC";
	SourceZone = "入口地址";
	SourceIP = "入口IP";
	SourceStartPort = "入口起始端口";
	SourceEndPort = "入口結束端口";
	DestinationZone = "目標位址";
	DescriptionIP = "出口IP";
	DescriptionStratPort = "出口起始端口";
	DescriptionEndPort = "出口結束端口";
	Pollcy = "策略";
	FirewallList = "防火牆列表";
	nofirewall = "無配置資訊";

	tunid = "隧道ID";
	tunvlanid = "Vlan"
	tunname = "名稱"
	tunremotewanip = "遠端鏈路地址"
	tunlocallanip = "本地LAN IP";
	tunlocalwanip = "本地WAN IP";

	DNSSwitch = "DNS開關";
	DNSMake = "DNS定制";
	DNSMain = "DNS主";
	DNSBack = "DNS備";

	validate_blank = "不能為空";
	validate_ip = "由4個 0~255 之間的數位組成，數位之間用點區隔";
	validate_less = "必須大於等於";
	validate_greater = "必須小於等於";
	Proset = "高級";
	validate_number = "必須為數位";
	validate_integer = "必須為整數";
	start_port = "開始端口不能大於結束端口";
	same_port = "相同的端口已存在";
	port_conflict = "端口範圍衝突";
	same_description = "相同的描述已存在";

	$('.FirewallList').html("防火牆列表");
	$('.Firewall').html("防火牆");
	$('.FirewallRuleList').html("防火牆規則清單");
	NATList = "NAT列表";
	ON = "開";
	OFF = "關";
}
