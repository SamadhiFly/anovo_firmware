var dialog_title;
var dialog_content_reboot;
var dialog_content_reset;
var ok;
var cancel;
var reset_wait ;
function trans_en() {
		$( '#lang' ).val( 'en' );
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
		
		$('#systemtitle').html("system");
		$('.Language').html("Language");
		$('.Submit').html("Submit");
		$('.LanguageType').html("LanguageType");
		$('.System').html("System");
		$('.Restart').html("Restart");
		$('.Reset').html("Reset");
		
		dialog_title = "Setup success";
		dialog_content_reboot = "Whether to restart system?";
		dialog_content_reset = "Whether to restart reset?";
		ok = "OK";
		cancel = "Cancel";
		reset_wait ="Reseting,network is disconnet, please visit web later";
}
function trans_zh() {
		$( '#lang' ).val('zh');	
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
		
		$('#systemtitle').html("系统");	
		$('.Language').html("语言");
		$('.Submit').html("提交");
		$('.LanguageType').html("语言类型");
		$('.System').html("系统");
		$('.Restart').html("重启");
		$('.Reset').html("复位");

		dialog_title = "设置成功";
		dialog_content_reboot = "是否重启系统?";
		dialog_content_reset = "是否复位？";
		ok = "确认";
		cancel = "取消";
		reset_wait ="复位中，网络连接断开，请稍后访问界面";
}
function trans_zh_HK() {
    $( '#lang' ).val('zhHK');   
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
    
    $('#systemtitle').html("系統");   
    $('.Language').html("語言");
    $('.Submit').html("提交");
    $('.LanguageType').html("語言類型");
    $('.System').html("系統");
    $('.Restart').html("重啟");
    $('.Reset').html("復位");

    dialog_title = "設置成功";
    dialog_content_reboot = "是否重啟系統?";
    dialog_content_reset = "是否復位？";
    ok = "確認";
    cancel = "取消";
    reset_wait ="重定中，網絡連接斷開，請稍後訪問介面";
}
