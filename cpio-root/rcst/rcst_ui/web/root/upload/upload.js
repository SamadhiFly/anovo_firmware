rcstTypeGet();
langget();

// dialog alert
(function( $ ){
    $.alert = function( content, ok ){
        ok = ok || function(){};
        return $.dialog({
            width: 390,
            padding:'25px 30px',
            title: alert_title,
            content: content,
            ok: ok,
            cancel: false
        });
    }
})(jQuery);
// dialog confirm
(function( $ ){
    $.confirm = function( content, ok, cancel ){
        var _cancel = cancel || function(){};
        return $.dialog({
            width: 390,
            padding:'25px 30px',
            title: alert_title,
            okValue: OK,
			      cancelValue: Cancel,
            content: content,
            ok: ok,
            cancel: _cancel,
            lock: true
        });
    }
})(jQuery);
	
/*ajax文件上传*/
var filename1="pfx";
var filename2="zip";
var filename3="terminal";
$.fn.ajaxUpload = function(options){
	var d = new Date().getTime(),
		iframeName = 'iframeUpload' + d,
		iframeContents,
		iframe = $('<iframe name="'+iframeName+'" id="'+iframeName+'" style="display: none" />');
	$("body").append(iframe);

	var form = $(this);
	form.attr("action", options.url);
	form.attr("method", "post");
	form.attr("enctype", "multipart/form-data");
	form.attr("encoding", "multipart/form-data");
	form.attr("target", iframeName);
	form.submit();
	$(document.getElementById(iframeName))
		.load(function () {
			iframeContents = document.getElementById(iframeName).contentWindow.document.body.innerHTML;
			var rsp = iframeContents.match(/^\{.*?\}/);
			rsp = $.parseJSON(rsp[0]);
			options.success(rsp);
			
		})
		.error(function(){
			options.error();
		});
	return false;
};
function uplodaAuthFile(url){	
	var options = {
			type: 'post',
			dataType:"json",
			url: url,
			success: function(rsp) {
			if (rsp.code == 0) {
					$.alert(upload_success, function(){
					  location.reload( true );
					}).lock();
				}else if (rsp.code == 1500) {
					  $.alert(upload_error2, function(){
					  location.reload( true );
					}).lock();
				}
				else if (rsp.code == 11) {
					  $.alert(upload_error3, function(){
					  location.reload( true );
					}).lock();
				}
				else if (rsp.code == 1) {
					  $.alert(upload_error11, function(){
					  location.reload( true );
					}).lock();
				}else if (rsp.code == 1) {
					  $.alert(upload_error11, function(){
					  location.reload( true );
					}).lock();
				}else if (rsp.code == 2) {
					   $.alert(upload_error12, function(){
					  location.reload( true );
					}).lock();
				}else if (rsp.code == 3) {
					  $.alert(upload_error13, function(){
					  location.reload( true );
					}).lock();
				}else if (rsp.code == 4) {
					  $.alert(upload_error14, function(){
					  location.reload( true );
					}).lock();
				}else if (rsp.code == 5) {
					 $.alert(upload_error15, function(){
					  location.reload( true );
					}).lock();
				}else if (rsp.code == 6) {
					  $.alert(upload_error16, function(){
					  location.reload( true );
					}).lock();
				}else if (rsp.code == 7) {
					 $.alert(upload_error17, function(){
					  location.reload( true );
					}).lock();
				}else if (rsp.code == 8) {
					 $.alert(upload_error18, function(){
					  location.reload( true );
					}).lock();
				}else if (rsp.code == 9) {
					  $.alert(upload_error19, function(){
					  location.reload( true );
					}).lock();
				}else if (rsp.code == 10) {
					 $.alert(upload_error20, function(){
					  location.reload( true );
					}).lock();
				}else if (rsp.code == 11) {
					  $.alert(upload_error3, function(){
					  location.reload( true );
					}).lock();
				}
			},
			error: function(){
				$.alert(upload_error3);
			}
		};
	$('#uploadForm1').ajaxUpload(options);
	//$.pub('uploadwait',{id:'#uploadFormBtn1'});
}
$('#uploadFormBtn1').click(function(){
	var checknew=0;
	var image = $('#image1');
	var err = $('#uploadForm1 .t');
	var item = $('#uploadForm1 .item').eq(0);
	if (image.val() == '') {
		err.html(upload_error).show();
		item.addClass('item-err');
		return false;
	}
	var val = image.val();
	var ext = val.substring(val.lastIndexOf('\\') + 1);
	ext=ext.split("\.");
	ext = $.trim(ext[1]);
	if (filename1==ext )
	{	
		console.log("pfx");
		checknew="pfx";
	}
	else if (filename2==ext )
	{
		console.log("zip");
		if(filename3 ==$("#image1").val().split('_')[0] && 7==$("#image1").val().split('_').length)
		{
			checknew="zip";	
		}
		
	}		
		
	console.log("checknew="+checknew);
	var ext = val.substring(val.lastIndexOf('\\') + 1);
	ext=ext.split("\.");
	ext = $.trim(ext[1]);
	if (checknew==0 ) {
		err.html(upload_error1).show();
		item.addClass('item-err');
		return false;
	}
	err.hide();
	item.removeClass('item-err');
	var url;
	if("pfx"==checknew){
		url='/action/uploadcrtFile';
	}else if("zip"==checknew){
		url='/action/uploadcrtFileNew';
	}	
	uplodaAuthFile(url);
});



	

