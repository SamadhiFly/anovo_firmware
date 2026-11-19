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
var timer = null;	
var pppoe_status;//是PPPOE状态
var subcount=0;
var pppoe_set_flag;
if (networkMode == 1){ //二层
	$('#wan_type').hide();
	$('#twolayer_div').show();
	$('#static_type').hide();
	twolayerGet();
}else{ //三层
	$('#wan_type').show();
	$('#twolayer_div').hide();
	$('#static_type').show();
	if(zd_version == 4){
		wanInfoGet();
	}else{
		wanNovrfInfoGet();
	}
	if(wan_type == "static"){
		$('#static_ip').attr("disabled", true);
		$('#static_mask').attr("disabled", true);
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

function twolayerGet(){
	$.ajax({
		url: '/action/twolayerGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if (rsp.code == 0){
				$('.rcst_mac').html(rsp.wanMac);
				if(rsp.tag==1){
					$("#networkmode").html("Access");
				}else{
					$("#networkmode").html("Trunk");
				}
				$("#twolayip").html(rsp.wanIp);			
			}
		},
		error:function(){
				console.log("wanInfoGet error2");
		}
	});	
}

var wanMac;
function wanInfoGet()
{
	$.ajax({
		url: '/action/wanInfoGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if (rsp.code == 0){
				wanMac=rsp.wanMac;
				if(rsp.wanType == "static"){
					pppoe_set_flag=0;
					$('#wantype1').prop('checked', true);
					$('#wantype2').prop('checked', false);	
					if(rsp.tag=='1'){
						$("#Access_mode").show();
						$("#vid").html(rsp.vid);
						$("#manager_ipaddr").html(rsp.manager_ipaddr);
						$("#wanvrfip").html(rsp.wanvrfip);
						$('.rcst_mac').html(wanMac);		
					}else{
						$("#Trunk_mode").show();
						$("#manager_ipaddr1").html(rsp.manager_ipaddr);
						$('.rcst_mac').html(wanMac);		
						var info = rsp.info;             
						var trarr = [];
						var tpl = $('#turnk_list').html();
						$('#trunkList').html(trarr.join(''));
						if ($.isArray(info) && info.length > 0){		
							for (var i = 0, len = info.length; i < len; i++){ 				
								var tr = StringH.tmpl(tpl, {
									 list: i+1,
									vid: info[i].vid,
									wanvrfip: info[i].wanvrfip,
									wanvrfnetmask: info[i].wanvrfnetmask       
								});
								trarr.push(tr);
							}
							$('#trunkList').html(trarr.join('')); 
						}	
					}
				}else if(rsp.wanType == "pppoe"){
					pppoe_set_flag=1;
					$('#wantype1').prop('checked', false);
					$('#wantype2').prop('checked', true);
						pppoe_flag = Number(rsp.pppoeFlag);
						if (pppoe_flag==1){
							$('#pppoe_type_set').hide();
							$('#pppoe_type_get').show();
						//~ setTimeout(function(){
							//~ dlgwait.close();
						//~ }, 1500);
							pppoe_ip_now = rsp.wanIp;
							pppoe_mask_now = rsp.wanMask;
							$('#pppoe_name').html(rsp.pppoeUser);
							$('#pppoe_ip').html(pppoe_ip_now);
							$('#pppoe_mask').html(pppoe_mask_now);
							$('.rcst_mac').html(wanMac);


						}else{
							$('#pppoe_type_set').show();
							$('#pppoe_type_get').hide();
							$('input[name="pppoe_user"]').val(rsp.pppoeUser);	
							$('input[name="pppoe_pass"]').val(rsp.pppoePass);
							$('.rcst_mac').html(wanMac);
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

function wanNovrfInfoGet(){
	$.ajax({
		url: '/action/wanNovrfInfoGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if (rsp.code == 0){
				wan_type = rsp.wanType;
				wanMac=rsp.wanMac;
				if(wan_type == "static"){
					pppoe_set_flag=0;
					$('#wantype1').prop('checked', true);
					$('#wantype2').prop('checked', false);
					$('#novrf_mode').show();
					static_ip_now = rsp.wanIp;
					static_mask_now = rsp.wanMask;
					$('input[name="static_ip"]').val(static_ip_now);	
					$('input[name="static_mask"]').val(static_mask_now);
					$('.rcst_mac').html(wanMac);		
				}else if(wan_type == "pppoe"){
					pppoe_set_flag=1;
					$('#wantype1').prop('checked', false);
					$('#wantype2').prop('checked', true);
						pppoe_flag = Number(rsp.pppoeFlag);
						if (pppoe_flag==1){
							$('#pppoe_type_set').hide();
							$('#pppoe_type_get').show();
						//~ setTimeout(function(){
							//~ dlgwait.close();
						//~ }, 1500);
							pppoe_ip_now = rsp.wanIp;
							pppoe_mask_now = rsp.wanMask;
							$('#pppoe_name').html(rsp.pppoeUser);
							$('#pppoe_ip').html(pppoe_ip_now);
							$('#pppoe_mask').html(pppoe_mask_now);
							$('.rcst_mac').html(wanMac);		
						}else{
							$('#pppoe_type_set').show();
							$('#pppoe_type_get').hide();
							$('input[name="pppoe_user"]').val(rsp.pppoeUser);	
							$('input[name="pppoe_pass"]').val(rsp.pppoePass);
							$('.rcst_mac').html(wanMac);		
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
				$('#state1').html(dial_ing);
				$('#state2').html("<img src=/icons/loading.gif />"); 
				switch (pppoe_status){	
					case 0 : //没起来
					{
					
						if ( subcount < 8) { ///////pppoe拨号状态查询次数
						setTimeout(function(){
							pppoeStatusGet();
						}, 2000);
						subcount ++;
						} else if (subcount  == 8){  ///////pppoe拨号状态查询次数
							clearTimeout(timer);
							subcount =0;
							$.ajax({
								url: '/action/pppoeStop',
								type: "POST",
								dataType: "json",
								async: false,
								success : function(rsp){
										if (rsp.code == 0){					
										$('#pppoe_type_set').show();
										$('#pppoe_type_get').hide();
									}				
								},
								error:function(){
									console.log("pppoeStop error");
								}
							});	
							$('#state1').html(dial_error);
							$('#state2').html("<img src=/icons/wrong.png />");
							setTimeout(function(){
									dlgwait.close();
								}, 1500);
						}	
					break; 			
				}				
				case 1 :  //ok
				{
					clearTimeout(timer);
					$('#state1').html(dial_success);
					$('#state2').html("<img src=/icons/suc.png />");
					setTimeout(function(){
								dlgwait.close();
							}, 1500);
					$('#pppoe_type_get').show();
					$('#pppoe_type_set').hide();
					subcount =0;
					$('#pppoe_name').html(rsp.pppoeUser);
					$('#pppoe_ip').html(rsp.wanIp);
					$('#pppoe_mask').html(rsp.wanMask);
					$('.rcst_mac').html(rsp.wanMac);
					break;
				}
					//~ case 3:  
					//~ {
//~ 
						//~ if ( subcount < 7) { ///////pppoe拨号状态查询次数
						   //~ setTimeout(function(){
							//~ pppoeStatusGet();
							//~ }, 1000);
							//~ wanInfoGet();
							 //~ subcount ++;
						//~ } else if (subcount  == 7){  ///////pppoe拨号状态查询次数
							//~ //wait();
							//~ $('#state1').html("Dial-up failed, unable connect to the server");
							//~ $('#state2').html("<img src=/icons/wrong.png />");
							//~ setTimeout(function(){
						    //~ dlgwait.close();
						    //~ }, 1500);
										//~ wanInfoGet();	
										//~ pppoeType ="ipfalse";//～不成功时候pppoeType赋其他值，切换选点的时候会用到
						            //~ }	
						//~ break; 					
					//~ }				
					//~ case 4:
					//~ {
						//~ $('#state1').html("Dial-up closed, please try again");
						//~ $('#state2').html("<img src=/icons/wrong.png />");
						//~ setTimeout(function(){
						//~ dlgwait.close();
						//~ }, 1500);
						//~ wanInfoGet();
						//~ pppoeType ="ipfalse";//～不成功时候pppoeType赋其他值，切换选点的时候会用到		 
						   //~ break;			 
					//~ }
					//~ case 5:
					//~ {
						//~ $('#state1').html("Dial-up failed, incorrect user name and/or password");
						//~ $('#state2').html("<img src=/icons/wrong.png />");							
						//~ pppoeType ="ipfalse";//～不成功时候pppoeType赋其他值，切换选点的时候会用到
						//~ setTimeout(function(){
						//~ dlgwait.close();
						//~ }, 1500);
						//~ wanInfoGet();
							//~ 
					//~ }							   
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
		okValue: ok,
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
			if(pppoe_set_flag == 1){
				wanTypeChange();
			}else{
				$('#wantype1').prop('checked', true);
				$('#wantype2').prop('checked', false);
				$('#pppoe_type_set').hide();
				$('#pppoe_type_get').hide();
				$('#static_type').show();
				$('.rcst_mac').html(wanMac);
			}
		}else if (val == 2){			
			$('#static_type').hide();
			$('#wantype1').prop('checked', false);
			$('#wantype2').prop('checked', true);
			$('#pppoe_type_set').show();
			$('#pppoe_type_get').hide();
			$('#static_type').hide();
			$('.rcst_mac').html(wanMac);
		}
});
//PPPOE切换到静态
function wanTypeChange()
{
		dialog=$.dialog({
		width: 390,
		padding: '25px 30px',
		title: dialog_title,
		lock: true,
		content: dialog_change,
		okValue: ok,
		cancelValue: cancel,
		ok: function(){
			$('#wantype1').prop('checked', true);
			$('#wantype2').prop('checked', false);
			$('#pppoe_type_set').hide();
			$('#pppoe_type_get').hide();
			$('#static_type').show();
			$.ajax({
				url: '/action/wanTypeChange',
				type: "POST",
				dataType: "json",
				async: false,
				success : function(rsp){
					if (rsp.code == 0){					
						location.reload(true);				
				//~ dialogs.close();				
					}				
				},
				error:function(){
					console.log("wanTypeChange error");
				}
			});	
		},
		cancel: function(){
			$('#wantype1').prop('checked', false);
			return;
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
	pppoe_set_flag=1;
	$('input[title=pppoe_user]').trigger('blur');
	$('input[title=pppoe_pass]').trigger('blur');
	if (user_status == 0 || passwd_status == 0){
		return;
	}
	var pppoe_user = $('input[name=pppoe_user]').val();
	var pppoe_pass = $('input[name=pppoe_pass]').val();
	var requestData = {
				wan_type: "pppoe",
				pppoe_user: pppoe_user,
				pppoe_pass: pppoe_pass
			};
	wait();
	$('#state1').html(state1);
	$('#state2').html(" "); 								
	$.ajax({
		url: '/action/wanInfoSet',
		data: requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if (rsp.code == 0){
			  			setTimeout(function(){
								pppoeStatusGet();
							}, 5000);
			}else{
				$.alert( 'Setup failed' );
			}
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
		title: dialog_title,
		lock: true,
		content: dialog_stop,
		okValue: ok,
		cancelValue: cancel,
		ok: function(){			
				$('#pppoe_type_set').show();
				$('#pppoe_type_get').hide();
		},
		cancel: function(){
			return;
		}
	});                  
};
