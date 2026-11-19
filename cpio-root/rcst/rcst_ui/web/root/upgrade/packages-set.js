var timer = null;
var cfg_timer = null;
var cfg_count=0;
var firm_filename = "firmware.tar.gz";
var cfg_filename = "terminal_locksource.tar.gz";
var cfg_filename2 = "terminal_odu_conf_";
var mir_filename = "mir_config.tar.gz";
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
//升级方式
$('.upgrade_type').on('click', function (e){
	var val = $(this).val();
	if (val == 1){
		upgradetype = 1;
		$('#upgrade_type_remote').prop('checked', true);
		$('#upgrade_type_local').prop('checked', false);
		$('#upgrade_remote').show();
		$('#upgrade_local').hide();
		$('#local_zImgae').hide();
		$('#local_dsp').hide();		
		if (remote_upgradetype == 1){
			remote_upgradetype = 1;
			$('#remote_upgradetype_firmware').prop('checked', true);
			$('#remote_upgradetype_dsp').prop('checked', false);
			$('#remote_zImgae').show();
		}else if (rcstType == 2 && remote_upgradetype == 4){
			remote_upgradetype = 4;
			$('#remote_upgradetype_firmware').prop('checked', false);
			$('#remote_upgradetype_dsp').prop('checked', true);
			$('#remote_dsp').show();			
		}else{
			remote_upgradetype = 1;
			$('#remote_upgradetype_firmware').prop('checked', true);
			$('#remote_upgradetype_dsp').prop('checked', false);
			$('#remote_zImgae').show();
		}		
	}else if(val == 2){
		upgradetype = 2;
		$('#upgrade_type_remote').prop('checked', false);
		$('#upgrade_type_local').prop('checked', true);
		$('#upgrade_local').show();
		$('#upgrade_remote').hide();
		$('#remote_zImgae').hide();
		$('#remote_dsp').hide();
		if (local_upgradetype == 1){
			local_upgradetype = 1;
			$('#local_upgradetype_firmware').prop('checked', true);
			$('#local_upgradetype_dsp').prop('checked', false);
			$('#local_zImgae').show();
		}else if (rcstType == 2 && local_upgradetype == 4){
			local_upgradetype = 4;
			$('#local_upgradetype_firmware').prop('checked', false);
			$('#local_upgradetype_dsp').prop('checked', true);
			$('#local_dsp').show();
		}else{
			local_upgradetype = 1;
			$('#local_upgradetype_firmware').prop('checked', true);
			$('#local_upgradetype_dsp').prop('checked', false);
			$('#local_zImgae').show();
		}   
	}         
});

//远程升级类别
$('.remote_upgradetype').on('click', function (e) {
	var val = $(this).val();
	if (val == 1){
		remote_upgradetype = 1;
		$('#remote_zImgae').show();
		$('#remote_dsp').hide();
	}else if(val == 2){
		remote_upgradetype = 4;
		$('#remote_zImgae').hide();
		$('#remote_dsp').show();     
	}else{
		$.alert("404");
	}            
});		
	
//本地升级类别
$('.local_upgradetype').on('click', function (e) {
	var val = $(this).val();
	console.log(val);
	if (val == 1){
		local_upgradetype = 1;
		$('#local_zImgae').show();
		$('#local_dsp').hide();
	}else if(val == 2){
		local_upgradetype = 4;
		$('#local_zImgae').hide();
		$('#local_dsp').show();     
	}else{
		$.alert("404");
	}         
});		
/*ajax文件上传*/
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
/*固件文件上传函数*/
function firmware_location(){	
	var options = {
			type: 'post',
			dataType:"json",
			url: '/action/uploadFile',
			success: function(rsp) {
				if (rsp.code == 0) {
					upgrade_submit(5);
				}else{
					$.alert(upload_error2);
				}
			},
			error: function(){
				$.alert(upload_error3);
			}
		};
	$('#uploadForm1').ajaxUpload(options);
	//$.pub('uploadwait',{id:'#uploadFormBtn1'});
}

/*MIR上传函数*/
function mir_location(){	
	var options = {
			type: 'post',
			dataType:"json",
			url: '/action/uploadMirFile',
			success: function(rsp) {
				if (rsp.code == 0) {
					$.alert(importsuc);
				}else if(rsp.code == -1){
					$.alert(importerr1);
				}else if(rsp.code == -2){
					$.alert(importerr2);
				}else if(rsp.code == -3){
					$.alert(importerr3);
				}else{}				
			},
			error: function(){
				$.alert(upload_error3);
			}
		};
	$('#uploadForm10').ajaxUpload(options);
	//$.pub('uploadwait',{id:'#uploadFormBtn1'});
}

/*Mir触发*/
$('#uploadFormBtn10').click(function(){
	var result = 0;
	var image = $('#image10');
	var err = $('#uploadForm10 .t');
	var item = $('#uploadForm10 .item').eq(0);

	if (image.val() == ''){
		alert(111);
			err.html(upload_error).show();
			item.addClass('item-err');
			return false;
	}
	var val = image.val();
	var ext = val.substring(val.lastIndexOf('\\') + 1);
	ext = $.trim(ext);
	if (ext != mir_filename){
			err.html(upload_error1).show();
			item.addClass('item-err');
			return false;
	}
	err.hide();
	item.removeClass('item-err');
	mir_location();
});

/*固件升级-触发*/
$('#uploadFormBtn1').click(function(){
	var result = 0;
	var image = $('#image1');
	var err = $('#uploadForm1 .t');
	var item = $('#uploadForm1 .item').eq(0);
	if (image.val() == ''){
			err.html(upload_error).show();
			item.addClass('item-err');
			return false;
	}
	var val = image.val();
	var ext = val.substring(val.lastIndexOf('\\') + 1);
	ext = $.trim(ext);
	if (ext != firm_filename){
			err.html(upload_error1).show();
			item.addClass('item-err');
			return false;
	}
	err.hide();
	item.removeClass('item-err');	
	firmware_location();
});
/*DSP文件上传函数*/
function dsp_location(){
	var options = {
		type: 'post',
		dataType:"json",
		url: '/action/uploadFile',
		success: function(rsp){
			if (rsp.code == 0){
				upgrade_submit(7);
			}else{
				$.alert(upload_error2);
			}
		},
		error: function(){
			$.alert(upload_error3);
		}
	};
	$('#uploadForm4').ajaxUpload(options);
	//$.pub('uploadwait',{id:'#uploadFormBtn4'});
}
/*dsp本地升级-触发*/
$('#uploadFormBtn4').click(function(){ 
	var image = $('#image4');
	var err = $('#uploadForm4 .t');
	var item = $('#uploadForm4 .item').eq(0);
	if (image.val() == ''){
		err.html(upload_error).show();
		item.addClass('item-err');
		return false;
	}
	var val = image.val();
	var ext = val.substring(val.lastIndexOf('\\') + 1);
	ext = $.trim(ext);
	if (ext !=dsp_filename){
		err.html(upload_error1).show();
		item.addClass('item-err');
		return false;
	}
	err.hide();
	item.removeClass('item-err');
	dsp_location();  
});
/*固件远程升级-触发*/
$('#submit_zImage_upgrade').on('click', function (e){
	e.preventDefault();	
	upgrade_submit(1);
});	
/*dsp远程升级-触发*/	
$('#submit_dsp_upgrade').on('click', function (e){
	e.preventDefault();	
	upgrade_submit(3);
});

function upgrade_submit(upgrade_type){
	if(upgrade_type == 1 || upgrade_type == 3 || upgrade_type == 5 || upgrade_type == 7){
		ok = function(){
					selfaddDialog = $.dialog({
						title: alert_title,
						content: $('#tmplTsetSet').html(),
						lock: true,
						padding: 50,
						width: 500
					});
					upgrade(upgrade_type);
				};
		cancel = function(){};
		$.confirm(upload_success, ok ,cancel);
	}else{
		$.alert("405");
	}
};
function upgrade(upgrade_type){			 	   
	clearInterval(timer);
	$( '#state1' ).html('<img src="/icons/loading.gif" />');	
	$( '#state3' ).html(upgrade_status);
	$.ajax({
		url: '/action/upgrade',
		type: "GET",
		dataType: "json",
		async: false,
		data: {upgrade_type:upgrade_type,
					upgradetype:upgradetype,
					remote_upgradetype:remote_upgradetype,
					local_upgradetype:local_upgradetype},
		success : function(rsp){
			if (rsp.code == -1)
			{
				$.alert(upgrade_error);
			}
		},
		error: function(){
			$.alert(upgrade_error);
		}
	});
	 timer= setInterval(function (){
			show(upgrade_type);
	}, 3000);
};
//返回升级状态
function show(upgrade_type){	
	$.ajax({
		url: '/action/upgradeStatus',
		type: "GET",
		dataType: "json",
		async: false,
		success : function(rsp){
		   switch(Number(rsp.code)){
				case 0:	//初始值
				{
					$( '#state1' ).html('<img src="/icons/loading.gif" />');	
					$( '#state3' ).html(upgrade_status);
					break;
				}	
				case 1: //成功
				{
					clearInterval(timer);
					$( '#state1' ).html('<img src="/icons/suc.png" />');	
					$( '#state3' ).html(upgrade_status1);
					$( '#state2' ).html('<img src="/icons/loading.gif" />');	
					$( '#state4' ).html(upgrade_status2);
					//~ $.ajax({
						//~ url: '/action/upgradeReboot',
						//~ type: "GET",
						//~ dataType: "json",
						//~ async: false,
						//~ success : function(rsp){},
						//~ error: function(){
							//~ $.alert(upgrade_error1);
						//~ }
					//~ });							
					window.setInterval( function(){
						$.ajax({
							url: '/action/upgradeOnline',
							type: "GET",
							dataType: "json",
							async: false,
							success : function(rsp){
								if(rsp.code == 1){
									window.top.location.href= "/root/upgrade/packages.htm";												
								}
							},
							error: function(){
								$.alert(upgrade_error2);
							}
						});						
					}, 1000 * 15 );
					break;
				}
				case -1:	//失败
				{
					$( '#state1' ).html('<img src="/icons/wrong.png" />');	
					$( '#state3' ).html(upgrade_error3);					
					clearInterval(timer);
					break;
				}	
				case -2:
				{
					$( '#state1' ).html('<img src="/icons/wrong.png" />');	
					$( '#state3' ).html(upgrade_error4);	
					clearInterval(timer);
					break;
				}
				case -3:
				{
					$( '#state1' ).html('<img src="/icons/wrong.png" />');	
					$( '#state3' ).html(upgrade_error5);
          clearInterval(timer);
					break;
				}
				case -4:
				{
					$( '#state1' ).html('<img src="/icons/wrong.png" />');	
					$( '#state3' ).html(upgrade_error6);
					clearInterval(timer);
					break;
				}
				case -5:
				{
					$( '#state1' ).html('<img src="/icons/wrong.png" />');	
					$( '#state3' ).html(upgrade_error7);
					clearInterval(timer);
					break;
				}
				case -6:
				{
					$( '#state1' ).html('<img src="/icons/wrong.png" />');	
					$( '#state3' ).html(upgrade_diff);
					clearInterval(timer);
					break;
				}
				default:
				{
					$( '#state1' ).html('<img src="/icons/wrong.png" />');	
					$( '#state3' ).html(upgrade_error3);
					clearInterval(timer);
					break;
				}
			}
		},
		error: function(){
			$.alert(upgrade_error);
		}
	});
};

//重启
function sysReboot(){
	$.dialog({
			width: 390,
			padding: '25px 30px',
			title: alert_title,
			lock: true,
			content: dialog_content_reboot,
			okValue: OK,
			cancelValue: Cancel,
			ok: function(){
					$.ajax({
						url: '/action/sysReboot',
						data: {data:1},
						type: "POST",
						dataType: "json",
						async: false,
						success : function(rsp){
							if (rsp.code == 0){
							}else{
								$.alert( 'Setup failed' );
							}			
						},
						error:function(){
							console.log("sysReboot error");
						}
					});
				this.close();
			},
			cancel: function(){}
	});
};
//复位
function sysReset(){
	$.dialog({
			width: 390,
			padding: '25px 30px',
			title: alert_title,
			lock: true,
			content: dialog_content_reset,
			okValue: OK,
			cancelValue: Cancel,
			ok: function(){
					var timer = setTimeout(function(){
						$('#resetButton').prop( 'disabled' , false ).removeClass('btn_dis');
					}, 5000); 
					$('#resetButton').prop( 'disabled' , true ).addClass('btn_dis');
					$.ajax({
						url: '/action/sysReset',
						data: {data:21},
						type: "POST",
						dataType: "json",
						async: false,
						success : function(rsp){
							if (rsp.code == 0){
								$.alert( reset_success );
							}else if(rsp.code ==-2){
								$.alert( reset_again );
							}else{
								$.alert( 'Setup failed' );
							}			
						},
						error:function(){
							console.log("sysReset error");
						}
					});	
				this.close();
			},
			cancel: function(){}
	});  
};


//time配置
$( '#time_zone' ).submit(function( e ){
	e.preventDefault();
	var zone_name = $('#zone_name_slect').val();
	var timezone=$('#zone_name_slect option:selected').attr('name');
	var requestData = {
				zone_name: zone_name,
				timezone:timezone
			};						
	$.ajax({
		url: '/action/dateSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if ( rsp.code == 0){
				$.alert(setup_suc, function(){
					location.reload( true );
				}).lock();
			}else{
				$.alert(setup_failed);
			}			
		},
		error:function(){
			console.log("oduLocationSet error");
		}
	});			
});




//配置文件上传
function uploadCfg(){	
	var options = {
			type: 'post',
			dataType:"json",
			url: '/action/uploadCfg',
			success: function(rsp) {
				if (rsp.code == 0) {
					cfg_diag();
				}else{
					$.alert(upload_error2);
				}
			},
			error: function(){
				$.alert(upload_error3);
			}
		};
	$('#uploadFormCfg').ajaxUpload(options);
	//$.pub('uploadwait',{id:'#uploadFormBtn1'});
}

function cfg_diag(){			 	   
	clearInterval(cfg_timer);
	selfaddDialog = $.dialog({
		title: alert_title,
		content: $('#tmplTsetSet').html(),
		lock: true,
		padding: 50,
		width: 500
	});

	$( '#state1' ).html('<img src="/icons/loading.gif" />');	
	$( '#state2' ).html('导入中');
	$( '#state3' ).html(' ');
	$( '#state4' ).html(' ');
	
	 cfg_timer= setInterval(function (){
			cfg_show();
	}, 5000);
};

function cfg_show(){
	cfg_count++;
	if(cfg_count>60){
		cfg_count=0;
		$( '#state1' ).html('<img src="/icons/wrong.png" />');	
		$( '#state2' ).html(timeout);					
		clearInterval(cfg_timer);		
		return;
	}	
	$.ajax({
		url: '/action/uploadCfgStatus',
		type: "GET",
		dataType: "json",
		async: false,
		success : function(rsp){
		   switch(Number(rsp.locksourcefile_update)){
				case 0:	//初始值
				{
					$( '#state1' ).html('<img src="/icons/loading.gif" />');	
					$( '#state2' ).html(uploading);
					break;
				}	
				case 2: //成功
				{
					clearInterval(timer);
					$( '#state1' ).html('<img src="/icons/suc.png" />');	
					$( '#state2' ).html(uploadsuccess);		
					clearInterval(cfg_timer);			
					break;
				}
				case 1:	//失败
				{
					$( '#state1' ).html('<img src="/icons/wrong.png" />');	
					$( '#state2' ).html(uploadfailed);					
					clearInterval(cfg_timer);
					break;
				}	
				default:
				{
					$( '#state1' ).html('<img src="/icons/wrong.png" />');	
					$( '#state2' ).html("default");
					clearInterval(cfg_timer);
					break;
				}
			}
		},
		error: function(){
			$.alert("error");
		}
	});
};

/*配置文件上传-触发*/
$('#uploadFormBtnCfg').click(function(){
	var result = 0;
	var image = $('#imageCfg');
	var err = $('#uploadFormCfg .t');
	var item = $('#uploadFormCfg .item').eq(0);
	if (image.val() == ''){
			err.html(upload_error).show();
			item.addClass('item-err');
			return false;
	}
	var val = image.val();
	var ext = val.substring(val.lastIndexOf('\\') + 1);
	ext = $.trim(ext);
	const regex = /-terminal\.zip$/;
	// if (!((ext == cfg_filename) || ($('#imageCfg').val().search(cfg_filename2)==0))){
	if (!((ext == cfg_filename) || (regex.test(ext)) || ($('#imageCfg').val().search(cfg_filename2)==0))){
			err.html(upload_error1).show();
			item.addClass('item-err');
			return false;
	}
	err.hide();
	item.removeClass('item-err');	
	uploadCfg();
});

//配置文件导出
function exportCfg()
{
	var exportCfgTitle = $('#exportAlertTitle').val();
	const regex = /^[a-zA-Z0-9_-]{1,20}$/;
	if(!regex.test(exportCfgTitle)){
		$('#exportAlertTitleError').html(exportAlertError);
	}else{
		$('#exportAlertTitleError').html('');

	$("#ExportCfg").html(Exporting);
	var requestData = {
		fileName:exportCfgTitle,
	};		
	selfaddDialog.close();
	
	$.ajax({	
		url: '/action/downloadCfg',
		data:requestData,
		type: "POST",
		dataType: "json",
		async: true,
		success : function(rsp){
			if ( rsp.code == 0){
				$("#ExportCfg").html(Export);
				console.log(rsp.filename);
				document.location =rsp.filename;
			}							
		},
		error:function(){
			//location.reload( true );
		}
	});
	}

		
}

function exportCfgTitle(){
	
	selfaddDialog = $.dialog({
		title: exportAlertTitle,
		content: $('#exportAlert').html(),
		lock: true,
		padding: 50,
		width: 400
	});
	if($('#language_three').val()=="zh"){
		$('.ExportCfg').html("导出");
	}else if($('#language_three').val()=="en"){
		$('.ExportCfg').html("Export");
	}else if($('#language_three').val()=="zh_HK"){
		$('.ExportCfg').html("匯出");
	}
	
	
}


//日志导出
function exportLog()
{
	$("#Export").html(Exporting);
	var requestData = {};		
	$.ajax({	
		url: '/action/downloadLog',
		data:requestData,
		type: "POST",
		dataType: "json",
		async: true,
		success : function(rsp){
			if ( rsp.code == 0){
				$("#Export").html(Export);
				document.location =rsp.filename;
			//~ }else if ( rsp.code == -1){
				//~ $.alert( exportFileNo );
				//~ $("#Export").html(Export);
			}							
		},
		error:function(){
			location.reload( true );
		}
	});	
}
