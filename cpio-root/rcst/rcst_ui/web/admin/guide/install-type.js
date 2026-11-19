rcstTypeGet();
langget();
// dialog alert
(function( $ ){
    $.alert = function( content, ok ){
        ok = ok || function(){};
        return $.dialog({
            width: 390,
            padding:'25px 30px',
            title: 'Prompt Message',
            content: content,
            ok: ok,
            cancel: false
        });
    }
})(jQuery);
$('#installType').val(installType);
if (installType == 0){
	$('#importinstall').show();
}else{
	$('#custominstall').show();
}
function installTypeChange	(){
	installType = $('#installType').val();
	var requestData = {
				installType:installType
			};	
	$.ajax({
		url: '/action/installTypeChange',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if (rsp.code == 0){
				if (installType == 0){
					$('#custominstall').hide();
					$('#importinstall').show();
				}else{
					$('#custominstall').show();
					$('#importinstall').hide();
				}
			}else{
				$.alert( 'Setup failed' );
			}			
		},
		error:function(){
			console.log("oduTypeChange error");
		}
	});
}
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
$('#uploadFormBt').click(function(){
	var image = $('#image');
	var err = $('#uploadForm .t');
	var item = $('#uploadForm .item').eq(0);
	if (image.val() == '') {
		err.html('You did not select a file,Please choose again').show();
		item.addClass('item-err');
		return false;
	}
	var val = image.val();
	var ext = val.substring(val.lastIndexOf('.') + 1);
	ext = $.trim(ext);
	var validExt = ext == 'xml' || ext == 'XML';
	if (!validExt) {
		err.html('File format error,Please choose again').show();
		item.addClass('item-err');
		return false;
	}
	err.hide();
	item.removeClass('item-err');
	var options = {
		type: 'post',
		dataType:"json",
		url: '/action/uploadXMLFile',
		success: function(rsp) {
			if (rsp.code == 0){
				$.alert('Upload Success!', function(){
					next();
				})
			}else{
				$.alert('Upload failed, file not exist');
			}
		},
		error: function() {
			$.alert('Syetem error,please try again');
		}
	};
	$('#uploadForm').ajaxUpload(options);
	//$.pub('uploadwait',{id:'#uploadFormBt'});
});
//跳转初始安装参数配置界面1
function next(){
	window.location.href="/admin/guide/install-set1.htm"+"?timestamp="+new Date().getTime() ;
}
