rcstTypeGet();
langget();
var wan_type;
var dlgwait;
var static_ip_now;
var static_mask_now;
var wan_mac_now;
var pppoe_ip_now;
var pppoe_mask_now;
var pppoe_user_now;
var pppoe_pass_now;
var dialog;
var pppoe_flag;//是否获取到PPPOE ip地址标志位
//var timer = null;	
var pppoe_status = 0;//是PPPOE状态
var subcount;
if (networkMode == 2){
	$('#wan_type').show();
	if (itemType == 4){ //B星
		$( '#endis_pppoe' ).attr("disabled", true);//B星下PPPOE不可点选
	}
	wanInfoGet();
	if(wan_type == "static"){
		if (rcstType == 1 && txType == 1)//SCPC点对点下wan口静态ip，掩码可配
		{
			$('#static_ip').attr("disabled", false);
			$('#static_mask').attr("disabled", false);
			$('#static_submit').show();
		}else{
			$('#static_ip').attr("disabled", true);
			$('#static_mask').attr("disabled", true);
		}		
	}
	
}
//等待弹窗
function wait(){
	dlgwait = $.dialog({
		width: 390,
		padding: '25px 30px',
		lock: true,
		title : dialog_title,
		content : $('#tmplTsetSet').html(),
	});
}
function wanInfoGet()
{
	$.ajax({
		url: '/action/wanInfoGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if (rsp.code == 0){
				wan_type = rsp.wanType;
				wan_mac_now = rsp.wanMac;
				if(wan_type == "static"){
					$('#wantype1').prop('checked', true);
					$('#wantype2').prop('checked', false);
					$('#static_type').show();
					static_ip_now = rsp.wanIp;
					static_mask_now = rsp.wanMask;
					$('input[name="static_ip"]').val(static_ip_now);	
					$('input[name="static_mask"]').val(static_mask_now);
					$('.rcst_mac').html(wan_mac_now);		
				}else if(wan_type == "pppoe"){
					$('#wantype1').prop('checked', false);
					$('#wantype2').prop('checked', true);
					 if(Number(rsp.pppoeType) == 1){
						pppoe_flag = Number(rsp.pppoeFlag);
						if (pppoe_flag == 1){
						$('#pppoe_type_get').show();
						setTimeout(function(){
							dlgwait.close();
						}, 1500);
							pppoe_ip_now = rsp.wanIp;
							pppoe_mask_now = rsp.wanMask;
							$('#pppoe_name').html(rsp.pppoeUser);
							$('#pppoe_ip').html(pppoe_ip_now);
							$('#pppoe_mask').html(pppoe_mask_now);
							$('.rcst_mac').html(wan_mac_now);

						}else{
								$('#pppoe_type_set').show();
						        $('#pppoe_type_get').hide();
					            $('input[name="pppoe_user"]').val(rsp.pppoeUser);	
					            $('input[name="pppoe_pass"]').val(rsp.pppoePass);
								$('.rcst_mac').html(wan_mac_now);
						}
					}else{
						$('#pppoe_type_set').show();
						$('#pppoe_type_get').hide();
						$('input[name="pppoe_user"]').val(rsp.pppoeUser);	
						$('input[name="pppoe_pass"]').val(rsp.pppoePass);
						$('.rcst_mac').html(wan_mac_now);
					}					
				}else{
					console.log("wan_type error");
				}				
			}else{
				console.log("wanInfoGet error1");
			}
		},
		error:function(){
				console.log("wanInfoGet error2");
		}
	});	
}

//PPPoE checkstatus
// 1:正在拨号
// 2:拨号成功
// 3:正在拨号 但返现拨号错误信息：691认证失败，678无法链接服务器
// 4:拨号关闭
function pppoeStatusGet(){
	$.ajax({
		url: '/action/pppoeStatusGet',
		type: "POST",
		dataType: "json",
		async: true,
		success : function(rsp){
			if(rsp.code == 0){
				pppoe_status = Number(rsp.pppoeStatus);
				errcode=Number(rsp.pppoeStatus.errcode);
				$('#state1').html("Dialing...");
				$('#state2').html("<img src=/icons/loading.gif />"); 
				switch (pppoe_status){	
					case 1 : //链接中
					{
						waitflag = "connecting";
						$('#state2').html("<img src=/icons/loading.gif />");
						
						if (subcount < 7){    //pppoe拨号状态查询次数
							setTimeout(function(){
								pppoeStatusGet();
							}, 1500);
							wanInfoGet();
							subcount ++;
						}else if (subcount  == 7){//pppoe拨号状态查询次数					
							//clearTimeout(timer);
							//wait();  
							$('#state1').html("Dial-up failed, unable connect to the server");
							$('#state2').html("<img src=/icons/wrong.png />");
							pppoe_status = 4;
							setTimeout(function(){
						    dlgwait.close();
						    }, 1500);
							wanInfoGet();	
						}	
						break;					
					}				
					case 2 :  //ok
					{
						//wait();
						//clearTimeout(timer);
						$('#state1').html("Dial-up Success");
						$('#state2').html("<img src=/icons/suc.png />");
						setTimeout(function(){
									dlgwait.close();
							    }, 1500);
						$('#pppoe_type_get').show();
						$('#pppoe_type_set').hide();
						wanInfoGet();
						break;
					}
					case 3:  
					{

						if ( subcount < 7) { ///////pppoe拨号状态查询次数
						   setTimeout(function(){
							pppoeStatusGet();
							}, 1000);
							wanInfoGet();
							 subcount ++;
						} else if (subcount  == 7){  ///////pppoe拨号状态查询次数
							//wait();
							$('#state1').html("Dial-up failed, unable connect to the server");
							$('#state2').html("<img src=/icons/wrong.png />");
							setTimeout(function(){
						    dlgwait.close();
						    }, 1500);
										wanInfoGet();	
										pppoeType ="ipfalse";//～不成功时候pppoeType赋其他值，切换选点的时候会用到
						            }	
						break; 					
					}				
					case 4:
					{
						$('#state1').html("Dial-up closed, please try again");
						$('#state2').html("<img src=/icons/wrong.png />");
						setTimeout(function(){
						dlgwait.close();
						}, 1500);
						wanInfoGet();
						pppoeType ="ipfalse";//～不成功时候pppoeType赋其他值，切换选点的时候会用到		 
						   break;			 
					}
					case 5:
					{
						$('#state1').html("Dial-up failed, incorrect user name and/or password");
						$('#state2').html("<img src=/icons/wrong.png />");							
						pppoeType ="ipfalse";//～不成功时候pppoeType赋其他值，切换选点的时候会用到
						setTimeout(function(){
						dlgwait.close();
						}, 1500);
						wanInfoGet();
							
					}							   
					default:
					{
						break;
					}
				}
			}else{
				dlgwait.close();
				console.log("pppoeStatusGet error");
			}
		}
	});
} 	
   function waitTimeout(){
	$.dialog({
		width: 390,
		padding: '25px 30px',
		title: dialog_title,
		lock: true,
		content:  'Connection timeout, please try again',
		okValue: 'OK',
		ok:function(){
			dlgwait.close();
						$('#pppoe_type_set').show();
						$('#pppoe_type_get').hide();
						$('#static_type').hide();
			wanInfoGet();	
			return pppoeType = "ipfalse";
			this.close();	
			 location.reload( true );
		}
	});           
 };	   
$('.wantype').on('click', function (e){
	var val = $(this).val();
		if (val == 1){
			$('#wantype1').prop('checked', true);
			$('#wantype2').prop('checked', false);
			$('#pppoe_type_set').hide();
			$('#pppoe_type_get').hide();
			wanTypeChange();
		}else if (val == 2){			
			$('#static_type').hide();
			$('#wantype1').prop('checked', false);
			$('#wantype2').prop('checked', true);
			if (wan_type == "static"){
				$('.rcst_mac').html("--");
				$('#pppoe_type_get').hide();
				$('#pppoe_type_set').show();
			}else{
				if (pppoe_flag == 1){
					$('#pppoe_ip').html(pppoe_ip_now);
					$('#pppoe_mask').html(pppoe_mask_now);
					$('.rcst_mac').html(wan_mac_now);
					$('#pppoe_type_set').hide();
					$('#pppoe_type_get').show();
				}else{
					$('#pppoe_user').html(pppoe_user_now);
					$('#pppoe_pass').html(pppoe_pass_now);
					$('.rcst_mac').html(wan_mac_now);
					$('#pppoe_type_get').hide();
					$('#pppoe_type_set').show();
				}
			} 			
		}
});
//PPPOE切换到静态
function wanTypeChange()
{
	dialogs=$.dialog({
		width: 390,
		padding: '25px 30px',
		lock: true,
		title : dialog_title,
		content : dialog_content
	});			
	$.ajax({
		url: '/action/wanTypeChange',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if (rsp.code == 0){
				location.reload(true);				
				dialogs.close();			
			}								
		},
		error:function(){
			console.log("wanTypeChange error");
		}
	});		
}
//配置静态IP
function wanStaticSet()
{
	$('input[title=static_ip]').trigger('blur');
	$('input[title=static_mask]').trigger('blur');
	if (ip_status == 0 || mask_status == 0){
		return;
	}
	var static_ip = $('input[name=static_ip]').val();
	var static_mask = $('input[name=static_mask]').val();
	if	(static_ip_now == static_ip && static_mask_now == static_mask){
		$.alert( 'You have changed nothing to submit' );
		return;
	}
	var requestData = {
				wan_type: "static",
				static_ip: static_ip,
				static_mask: static_mask
			};
	$.dialog({
		width: 390,
		padding: '25px 30px',
		lock: true,
		title : 'WAN Setting',
		content : 'IP configurating,please wait...'
	});
	$.ajax({
		url: '/action/wanInfoSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if (rsp.code == 0){
				wanInfoGet();			
			}else{
				$.alert( 'Setup failed' );
			}
			this.close();					
		},
		error:function(){
			console.log("wanStaticSet error");
		}
	});				
}
//配置PPPOE
function wanPPPOESet()
{
	$('input[title=pppoe_user]').trigger('blur');
	$('input[title=pppoe_pass]').trigger('blur');
	if (user_status == 0 || passwd_status == 0){
		return;
	}
	subcount = 0;
	var pppoe_user = $('input[name=pppoe_user]').val();
	var pppoe_pass = $('input[name=pppoe_pass]').val();
	var requestData = {
				wan_type: "pppoe",
				pppoe_user: pppoe_user,
				pppoe_pass: pppoe_pass
			};
	wait();
	$('#state1').html("Processing...");
	$('#state2').html("<img src=/icons/loading.gif />"); 								
	$.ajax({
		url: '/action/wanInfoSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if (rsp.code == 0){
				pppoeStatusGet();			
			}else{
				$.alert( 'Setup failed' );
			}
			//dlgwait.close();	
			$('#pppoe_type_get').hide();				
		},
		error:function(){
			console.log("wanPPPOESet error");
		}
	});	
}
//停止PPPOE服务
function pppoeStop()
{
	dialog=$.dialog({
		width: 390,
		padding: '25px 30px',
		title: 'WAN Settings',
		lock: true,
		content: 'Whether to stop PPPoE?',
		okValue: 'OK',
		cancelValue: 'Cancel',
		ok: function(){
			$.ajax({
				url: '/action/pppoeStop',
				type: "POST",
				dataType: "json",
				async: false,
				success : function(rsp){
					if (rsp.code == 0){					
						$('#pppoe_type_set').show();
						$('#pppoe_type_get').hide();
						wanInfoGet();
						dialog.close();				
					}				
				},
				error:function(){
					console.log("pppoeStop error");
				}
			});	
		},
		cancel: function(){
			return;
		}
	});                  
};
