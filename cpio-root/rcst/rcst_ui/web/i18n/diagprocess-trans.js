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
		$('#upload').html("Upload Key");
		$('#lang').html("简体中文");
		
		$('.RCSTStatus').html("RCSTStatus");
		$('.ACUStatus').html("ACU Status");
		$('.Network').html("Network");
		$('.RF').html("RF");
		$('.ViewLog').html("ViewLog");
		$('.ProcessMonitoring').html("ProcessMonitoring");
		$('.Mesh').html("Mesh");
		
		$('#processtitle').html("Process Monitoring");
		$('.Num').html("Num");
		$('.PID').html("PID");
		$('.Owner').html("Owner");
		$('.CPUUsage').html("CPU Usage");
		$('.MemoryUsage').html("Memory Usage");
		$('.Process').html("Process");
		
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
    $('#upload').html("上传证书");
		$('#lang').html("English");		

		$('.RCSTStatus').html("终端状态");
		$('.ACUStatus').html("ACU状态");
		$('.Network').html("网络");
		$('.RF').html("射频");
		$('.ViewLog').html("日志查看");
		$('.ProcessMonitoring').html("进程监控");
		$('.Mesh').html("网状网");

		
		$('#processtitle').html("进程监控");
		$('.Num').html("序号");
		$('.PID').html("进程号");
		$('.Owner').html("用户名");
		$('.CPUUsage').html("CPU占用率");
		$('.MemoryUsage').html("内存使用率");
		$('.Process').html("进程");		
		
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
$('#upload').html("上傳證書");
    $('#lang').html("English");     

    $('.RCSTStatus').html("終端狀態");
    $('.ACUStatus').html("ACU狀態");
    $('.Network').html("網絡");
    $('.RF').html("射頻");
    $('.ViewLog').html("日誌查看");
    $('.ProcessMonitoring').html("進程監控");
    $('.Mesh').html("網狀網");

    
    $('#processtitle').html("進程監控");
    $('.Num').html("序號");
    $('.PID').html("進程號");
    $('.Owner').html("用戶名");
    $('.CPUUsage').html("CPU佔用率");
    $('.MemoryUsage').html("內存使用率");
    $('.Process').html("進程");       
    
    shownone = "沒有配置資訊！";
}

