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

var validate_blank;
var validate_ip;
var validate_input;
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
		$('#wantitle').html("WAN");
		$('.ConnectingType').html("Connecting Type");
		$('.IP').html("IP");
		$('.Netmask').html("Netmask");
		$('.UserName').html("UserName");		
		$('.Password').html("Password");		
		$('.Static').html("Static");
		$('.PPPoE').html("PPPoE");
		$('.IPGetting').html("IPGetting...");
		
		$('#prosettitle').html("Proset");
		$('.Advanced').html("Advanced");
		$('.Routes').html("Routes");
		$('.ARP').html("ARP");

		$('.Submit').html("Submit");
		$('.StopPPPoE').html("Redial");
	
		$('.NetwrokMode').html("NetwrokMode");
		$('#Num_title').html("Num");
		$('#Netmask_title').html("Netmask");
		$('#ManagementIP').html("Management IP");
		$('#ManagementIP1').html("Management IP");
		$('#ServiceIP').html("Service IP");
				
		nothing = "You have changed nothing to submit";
		dialog_content = "configurating, please wait...";
		alert_title = "Prompt Message";
		setup_suc = "Setup Success";
		setup_failed = "Setup Failed";
		dialog_title = "WAN Setting";		
		dial_success = "Dial-up Success";
		dial_error = "Dial-up failed!";
		dial_ing="Dialing...";
		state1 = "Processing...";
		dialog_stop = "Whether to redial?";
		dialog_change = "Whether to change to static?";
		ok = "OK";
		cancel = "Cancel";
		state1_swtich = "Swtich status getting, please wait...";

		validate_blank = "can not be blank";
		validate_ip = "consist of 4 munbers between 0 to 255, separate the numbers with .";
		validate_input = "must be consisit of numbers or letters or uderlines";
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

		$('#wantitle').html("WAN");
		$('.ConnectingType').html("连接方式");
		$('.IP').html("IP地址");
		$('.Netmask').html("子网掩码");
		$('.UserName').html("用户名");		
		$('.Password').html("密码");				
		$('.Static').html("静态配置");
		$('.PPPoE').html("PPPoE");
		$('.IPGetting').html("IP获取中...");
		
		$('#prosettitle').html("WAN");		
		$('.Advanced').html("高级");
		$('.Routes').html("路由");
		$('.ARP').html("ARP");
		$('.Submit').html("提交");
		$('.StopPPPoE').html("重新拨号");

		$('.NetwrokMode').html("网络模式");
		$('#Num_title').html("序号");
		$('#Netmask_title').html("子网掩码");
		$('#ManagementIP').html("管理IP");
		$('#ManagementIP1').html("管理IP");
		$('#ServiceIP').html("业务IP");
				
		nothing = "参数未更改";
		dialog_content = "设置中，请稍等";
		alert_title = "提示信息";
		setup_suc = "设置成功";
		setup_failed = "设置失败";		
		dialog_title = "WAN设置";	
		state1 = "处理中";
		dial_success = "拨号成功";
		dial_error = "拨号失败！";
		dial_ing="拨号中...";
		dialog_stop = "是否重新拨号?";
		dialog_change = "是否切换至静态配置？";
		
		ok = "确定";
		cancel = "取消";
		state1_swtich = "开关状态获取中，请稍候...";

		validate_blank = "不能为空";
		validate_ip = "由4个 0~255 之间的数字组成，数字之间用点区隔";			
		validate_input = "需由数字或字母或下划线组成";		
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

    $('#wantitle').html("WAN");
    $('.ConnectingType').html("連接方式");
    $('.IP').html("IP地址");
    $('.Netmask').html("子網掩碼");
    $('.UserName').html("用戶名");     
    $('.Password').html("密碼");              
    $('.Static').html("靜態配置");
    $('.PPPoE').html("PPPoE");
    $('.IPGetting').html("IP獲取中...");
    
    $('#prosettitle').html("WAN");      
    $('.Advanced').html("高級");
    $('.Routes').html("路由");
    $('.ARP').html("ARP");
    $('.Submit').html("提交");
    $('.StopPPPoE').html("重新撥號");

    $('.NetwrokMode').html("網絡模式");
    $('#Num_title').html("序號");
    $('#Netmask_title').html("子網掩碼");
    $('#ManagementIP').html("管理IP");
    $('#ManagementIP1').html("管理IP");
    $('#ServiceIP').html("業務IP");
            
    nothing = "參數未更改";
    dialog_content = "設置中，請稍等";
    alert_title = "提示資訊";
    setup_suc = "設置成功";
    setup_failed = "設置失敗";      
    dialog_title = "WAN設置"; 
    state1 = "處理中";
    dial_success = "撥號成功";
    dial_error = "撥號失敗！";
    dial_ing="撥號中...";
    dialog_stop = "是否重新撥號?";
    dialog_change = "是否切換至靜態配置？";
    
    ok = "確定";
    cancel = "取消";
    state1_swtich = "開關狀態獲取中，請稍候...";

    validate_blank = "不能為空";
    validate_ip = "由4個 0~255 之間的數位組成，數位之間用點區隔";         
    validate_input = "需由數位或字母或底線組成";       
}
