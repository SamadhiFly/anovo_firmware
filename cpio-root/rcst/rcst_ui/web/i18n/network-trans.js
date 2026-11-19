var alert_title;
var nothing;
var dialog_content;
var dialog_title;
var dialog_stop;
var setup_suc;
var setup_failed;
var state1;
var state1_swtich;
var ok;
var cancel;
var dialog_natport;
var no_content;
var error_content;
var Num;
var Protocol;
var TargetIP;
var StartPort;
var EndPort;
var Description;
var Interface;
var Option;
var Switch;
function trans_en() {
		$( '#lang' ).val( 'en' );
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
		if (networkMode == 1){
			$('.WAN').html("Manage Port");
			$('.LAN').html("Service Port");
			$('.WAN_h3').html("Manage Port");
		}else{
			$('.WAN').html("WAN");
			$('.LAN').html("LAN");
			$('.WAN_h3').html("WAN");
		}
		$('#lantitle').html("LAN");
		$('.IP').html("IP");
		$('.Netmask').html("Netmask");
		$('.UserName').html("User Name");
		$('.Password').html("Password");
		$('.VlanList').html("Vlan List");
		$('.View').html("View");
		
		$('#wantitle').html("WAN");
		$('.ConnectingType').html("Connecting Type");
		$('.Static').html("Static");
		$('.PPPoE').html("PPPoE");
		$('.IPGetting').html("IPGetting...");
		
		$('#prosettitle').html("Proset");
		$('.Advanced').html("Advanced");
		$('.TCPStatus').html("TCP Status");
		$('.NATStatus').html("NAT Status");
		$('.PortForwarding').html("Port Forwarding");
		$('.PortForwardingList').html("Port Forwarding List");
		$('.Routes').html("Routes");
		$('.RoutesList').html("Routes List");
		$('.DNSSwitch').html("DNS Switch:");
		$('.DNSMake').html("DNS Customization:");
		$('.DNSMain').html("DNS Main:");
		$('.DNSBack').html("DNS Back:");
		Num = "Num";
		Protocol = "Protocol";
		TargetIP = "Target IP";
		StartPort = "Start Port";
		EndPort = "End Port";
		Description = "Description";
		Interface = "Interface";
		Option = "Option";
		Netmask = "Netmask";
		Gateway = "Gateway";
		Switch = "Switch";
		
		$('.ARP').html("ARP");
		$('.Num').html("Num");
		$('.HWAddress').html("HW Address");
		$('.Device').html("Device");
		
		$('.Submit').html("Submit");
		
		nothing = "You have changed nothing to submit";
		dialog_content = "configurating, please wait...";
		alert_title = "Prompt Message";
		setup_suc = "Setup Success";
		setup_failed = "Setup Failed";
		dialog_title = "WAN Setting";		
		state1 = "Processing...";
		dialog_stop = "Whether to stop PPPoE?";
		ok = "OK";
		cancel = "Cancel";
		state1_swtich = "Swtich status getting, please wait...";
		dialog_natport = "Port Forwarding Set List";
		no_content = "There is no setting informations, if necessary,please clic add button";
		dialog_route = "Route Setting List";
		error_content = "I am Sorry!The setting informations read failure,please flash the page!";
}
function trans_zh() {
		$( '#lang' ).val('zh');
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
		if (networkMode == 1){
			$('.LAN').html("业务口");
			$('.WAN').html("管理口");
			$('.WAN_h3').html("管理口");
		}else{
			$('.LAN').html("LAN");
			$('.WAN').html("WAN");
			$('.WAN_h3').html("WAN");
		}
		$('#lantitle').html("LAN");
		$('.IP').html("IP地址");
		$('.Netmask').html("子网掩码");
		$('.UserName').html("用户名");
		$('.Password').html("密码");		
		$('.VlanList').html("Vlan列表");
		$('.View').html("查看");

		$('#wantitle').html("WAN");
		$('.ConnectingType').html("连接方式");
		$('.Static').html("静态配置");
		$('.PPPoE').html("PPPoE");
		$('.IPGetting').html("IP获取中...");
		
		$('#prosettitle').html("WAN");		
		$('.Advanced').html("高级");
		$('.TCPStatus').html("TCP状态");
		$('.NATStatus').html("NAT状态");
		$('.PortForwarding').html("端口映射");
		$('.PortForwardingList').html("端口映射列表");
		$('.Routes').html("路由");
		$('.RoutesList').html("路由设置列表");
		$('.DNSSwitch').html("DNS开关:");
		$('.DNSMake').html("DNS定制:");
		$('.DNSMain').html("DNS主:");
		$('.DNSBack').html("DNS备:");
		Num = "序号";
		Protocol = "协议";
		TargetIP = "目标IP地址";
		StartPort = "开始端口";
		EndPort = "结束端口";
		Description = "描述";
		Interface = "输出接口";
		Option = "操作";
		Netmask = "子网掩码";
		Gateway = "网关";
		Switch = "开关";
		
		$('.ARP').html("ARP");
		$('.Num').html("序号");
		$('.HWAddress').html("硬件地址");
		$('.Device').html("设备");
		
		$('.Submit').html("提交");
		
		nothing = "参数未更改";
		dialog_content = "设置中，请稍等";
		alert_title = "提示信息";
		setup_suc = "设置成功";
		setup_failed = "设置失败";		
		dialog_title = "WAN设置";	
		state1 = "处理中";
		dialog_stop = "是否断开PPPOE链接?";
		ok = "确定";
		cancel = "取消";
		state1_swtich = "开关状态获取中，请稍候...";
		dialog_natport = "端口映射设置表";
		no_content = "无配置信息，如果需要请点击添加按钮";
		dialog_route = "路由设置表";
		error_content = "抱歉，读取配置信息失败,请刷新页面！";
}
function trans_zh_HK() {
    $( '#lang' ).val('zhHK');
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
    if (networkMode == 1){
        $('.LAN').html("業務口");
        $('.WAN').html("管理口");
        $('.WAN_h3').html("管理口");
    }else{
        $('.LAN').html("LAN");
        $('.WAN').html("WAN");
        $('.WAN_h3').html("WAN");
    }
    $('#lantitle').html("LAN");
    $('.IP').html("IP地址");
    $('.Netmask').html("子網掩碼");
    $('.UserName').html("用戶名");
    $('.Password').html("密碼");      
    $('.VlanList').html("Vlan列表");
    $('.View').html("查看");

    $('#wantitle').html("WAN");
    $('.ConnectingType').html("連接方式");
    $('.Static').html("靜態配置");
    $('.PPPoE').html("PPPoE");
    $('.IPGetting').html("IP獲取中...");
    
    $('#prosettitle').html("WAN");      
    $('.Advanced').html("高級");
    $('.TCPStatus').html("TCP狀態");
    $('.NATStatus').html("NAT狀態");
    $('.PortForwarding').html("端口映射");
    $('.PortForwardingList').html("端口映射列表");
    $('.Routes').html("路由");
    $('.RoutesList').html("路由設置列表");
    $('.DNSSwitch').html("DNS開關:");
    $('.DNSMake').html("DNS定制:");
    $('.DNSMain').html("DNS主:");
    $('.DNSBack').html("DNS備:");
    Num = "序號";
    Protocol = "協議";
    TargetIP = "目標IP位址";
    StartPort = "開始端口";
    EndPort = "結束端口";
    Description = "描述";
    Interface = "輸出介面";
    Option = "操作";
    Netmask = "子網掩碼";
    Gateway = "閘道";
    Switch = "開關";
    
    $('.ARP').html("ARP");
    $('.Num').html("序號");
    $('.HWAddress').html("硬件地址");
    $('.Device').html("設備");
    
    $('.Submit').html("提交");
    
    nothing = "參數未更改";
    dialog_content = "設置中，請稍等";
    alert_title = "提示資訊";
    setup_suc = "設置成功";
    setup_failed = "設置失敗";      
    dialog_title = "WAN設置"; 
    state1 = "處理中";
    dialog_stop = "是否斷開PPPOE鏈接?";
    ok = "確定";
    cancel = "取消";
    state1_swtich = "開關狀態獲取中，請稍候...";
    dialog_natport = "端口映射設置表";
    no_content = "無配置資訊，如果需要請點擊添加按鈕";
    dialog_route = "路由設置表";
    error_content = "抱歉，讀取配置資訊失敗,請刷新頁面！";
}
