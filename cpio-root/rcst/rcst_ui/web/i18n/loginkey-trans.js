var mess;
var alert_title;
function trans_en() {
		$('#welcomekey').html("Please verify username and password before upload Key");		
		$('#logintitle').html("login");
		$('#login').html("login");
		$('#error').html("Invalid username or password! Please try again.");
		mess="Auth failed";
		alert_title = "Prompt Message";
}
function trans_zh() {
		$('#welcomekey').html("上传证书前，请验证用户名和密码");		
		$('#logintitle').html("登录");
		$('#login').html("登录");
		$('#error').html("无效的用户名或密码！请重新输入");
		mess="认证失败";
		alert_title = "提示信息";
}
function trans_zh_HK() {
    $('#welcomekey').html("上傳證書前，請驗證用戶名和密碼");       
    $('#logintitle').html("登錄");
    $('#login').html("登錄");
    $('#error').html("無效的用戶名或密碼！請重新輸入");
    mess="認證失敗";
    alert_title = "提示資訊";
}
