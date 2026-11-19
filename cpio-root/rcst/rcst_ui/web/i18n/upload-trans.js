var alert_title;
var upload_error;
var upload_error1;
var upload_error2;
var upload_error3;
var upload_error11;
var upload_error12;
var upload_error13;
var upload_error14;
var upload_error15;
var upload_error16;
var upload_error17;
var upload_error18;
var upload_error3;
var upload_error3;
var upload_error3;
var upload_success;

function trans_en() {
		$( '#lang' ).val( 'en' );
		$('#terminal_b').html("Terminal Status");
		$('#odu_b').html("RF");
		$('#network_b').html("Network");
		$('#diagnostics_b').html("Diagnostics");
		$('#installation_b').html("Installation");
		$('#quit').html("Quit");
		$('#upgrade').html("System");
		$('#upload').html("Upload Key");
		$('.UploadKey').html("Upload Key");
		$('.Upload').html("Upload");
		$('#system').html("System");
		$('#lang').html("简体中文");

		alert_title = "Prompt Message";
		upload_error = "You did not select a file,Please choose again";
		upload_error1 = "File name error,Please choose again";
		upload_error2 = "Upload failed, file not exist";
		upload_error3 = "Analysis error, please try again";
		upload_success = "Upload Success! Terminal is reseting";
		
		upload_error11 = "PKCS12 file not exist";
		upload_error12 = "Private key file not exist";
		upload_error13 = "Public key file not exist";
		upload_error14 = "PKCS12 format error";
		upload_error15 = "PKCS12 password error";
		upload_error16 = "CA key file not exist";
		upload_error17 = "CA key upload error";
		upload_error18 = "CA context error";
		upload_error19 = "CA check error";
		upload_error20 = "Private key and Private key are not match";
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
		$('.UploadKey').html("上传证书");
		$('.Upload').html("上传");
		$('#lang').html("English");

		alert_title = "提示信息";
		upload_error = "没有选择文件，请重新选择";
		upload_error1 = "文件名错误，请重新选择";
		upload_error2 = "上传失败，文件不存在";
		upload_error3 = "解析错误，请重新尝试";
		upload_success = "上传成功！终端复位中...";

		upload_error11 = "PKCS12文件不存在";
		upload_error12 = "私钥证书不存在";
		upload_error13 = "公钥证书不存在";
		upload_error14 = "PKCS12格式错误";
		upload_error15 = "PKCS12密码错误";
		upload_error16 = "CA证书不存在";
		upload_error17 = "CA证书导入错误";
		upload_error18 = "CA上下文错误";
		upload_error19 = "CA校验错误";
		upload_error20 = "公私钥证书不匹配";
		
		$('#system').html("系统");
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
    $('.UploadKey').html("上傳證書");
    $('.Upload').html("上傳");
    $('#lang').html("English");

    alert_title = "提示資訊";
    upload_error = "沒有選擇文件，請重新選擇";
    upload_error1 = "文件案名錯誤，請重新選擇";
    upload_error2 = "上傳失敗，文件不存在";
    upload_error3 = "解析錯誤，請重新嘗試";
    upload_success = "上傳成功！終端重定中...";

    upload_error11 = "PKCS12文件不存在";
    upload_error12 = "私密金鑰證書不存在";
    upload_error13 = "公開金鑰證書不存在";
    upload_error14 = "PKCS12格式錯誤";
    upload_error15 = "PKCS12密碼錯誤";
    upload_error16 = "CA證書不存在";
    upload_error17 = "CA證書導入錯誤";
    upload_error18 = "CA上下文錯誤";
    upload_error19 = "CA校驗錯誤";
    upload_error20 = "公私密金鑰證書不匹配";
    
    $('#system').html("系統");
}
