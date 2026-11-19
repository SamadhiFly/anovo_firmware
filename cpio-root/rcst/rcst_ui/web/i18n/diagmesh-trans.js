var shownone;
function trans_en() {
		$( '#lang' ).val( 'en' );
		$('#administrator').html("Administrator");
		$('#terminal_b').html("Terminal Status");
		$('#odu_b').html("RF");
		$('#network_b').html("Network");
		$('#diagnostics_b').html("Diagnostics");
		$('#installation_b').html("Installation");
		$('#quit').html("Quit");
		$('#upgrade').html("System");
		$('#system').html("System");
		$('#lang').html("简体中文");
		
		$('.RCSTStatus').html("RCSTStatus");
		$('.Network').html("Network");
		$('.RF').html("RF");
		$('.ViewLog').html("ViewLog");
		$('.ProcessMonitoring').html("ProcessMonitoring");
		$('.Mesh').html("Mesh");
		
		$('.FLStatus').html("FL Status");
		$('.RLStatus').html("RL Status");
		$('.SrcIP').html("SrcIP");
		$('.DestIP').html("DestIP");
		$('.MeshPower').html("Mesh Power");
		$('.Rate').html("Rate");
		
		shownone = "There is no setting informations";
}
function trans_zh() {
		$( '#lang' ).val('zh');
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
		$('#lang').html("English");		

		$('.RCSTStatus').html("终端状态");
		$('.Network').html("网络");
		$('.RF').html("射频");
		$('.ViewLog').html("日志查看");
		$('.ProcessMonitoring').html("进程监控");
		$('.Mesh').html("网状网");

		$('.FLStatus').html("前向状态");
		$('.RLStatus').html("回传状态");
		$('.SrcIP').html("源地址");
		$('.DestIP').html("目的地址");
		$('.MeshPower').html("网状网功率");
		$('.Rate').html("速率");		
		
		shownone = "没有配置信息！";
}
function trans_zh_HK() {
    $( '#lang' ).val('zhHK');
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
    $('#lang').html("English");     

    $('.RCSTStatus').html("終端狀態");
    $('.Network').html("網絡");
    $('.RF').html("射頻");
    $('.ViewLog').html("日誌查看");
    $('.ProcessMonitoring').html("進程監控");
    $('.Mesh').html("網狀網");

    $('.FLStatus').html("前向狀態");
    $('.RLStatus').html("回傳狀態");
    $('.SrcIP').html("源地址");
    $('.DestIP').html("目的地址");
    $('.MeshPower').html("網狀網功率");
    $('.Rate').html("速率");      
    
    shownone = "沒有配置資訊！";
}


