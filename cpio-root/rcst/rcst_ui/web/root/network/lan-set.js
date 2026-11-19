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
//lan信息设置
function lanInfoSet()
{
	if (rcstType == 1 && txType == 1){
		$('input[title=lan_ip]').trigger('blur');
		$('input[title=lan_mask]').trigger('blur');
		if (ip_status == 0 || mask_status == 0){
			return;
		}
		var lan_ip = $('input[name=lan_ip]').val();
		var lan_mask = $('input[name=lan_mask]').val();
		var requestData = {			
					lan_ip: lan_ip,
					lan_mask: lan_mask			
				};									
	}else{
		$('input[title = lan_mtu]').trigger('blur');
		if (mtu_status == 0){
			return;
		}
		var lan_mtu = $('input[name=lan_mtu]').val();
		if (lan_mtu_now == lan_mtu)
		{
			$.alert(nothing);
			return;
		}
		var requestData = {					
					lan_mtu:lan_mtu					
				};			
	}
	dlgwait=$.dialog({
		width: 390,
		padding: '25px 30px',
		lock: true,
		title : 'LAN',
		content : dialog_content
	  });			
	$.ajax({
		url: '/action/lanInfoSet',
		data:requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if ( rsp.code == 0){
				$.alert(setup_suc);
				lanInfoGet();
			}else{
				$.alert(setup_failed);				
			}
			dlgwait.close();					
		},
		error:function(){
			console.log("lanInfoSet error");
		}
	});
	//~ if (rcstType == 1 && txType == 1){
		//~ //ip改变，网页自动跳转？
		//~ setInterval( function(){
			//~ $.ajax({
				//~ url: '/action/online',//待实现
				//~ data:requestData,
				//~ type: "POST",
				//~ dataType: "json",
				//~ async: false,
				//~ success : function(rsp){
					//~ if ( rsp.code == 0){
						//~ window.top.location.href= "/root/network/lan.htm";
					//~ }			
				//~ },
				//~ error:function(){
					//~ console.log("lanInfoSet error");
				//~ }
			//~ });
		//~ }, 500 );
	//~ }
}

//wifi信息设置
function wifiInfoSet()
{
	$('input[title=wifi_user]').trigger('blur');
	$('input[title=wifi_pass]').trigger('blur');
	$('input[title=wifi_ipaddr]').trigger('blur');
	if (wlan_ip_status == 0 || user_status == 0 || passwd_status == 0){
		return;
	}
	var wifi_ip = $('input[name=wifi_ipaddr]').val();
	var wifi_user = $('input[name=wifi_user]').val();
	var wifi_pass = $('input[name=wifi_pass]').val();			
	if (wifi_ip_now == wifi_ip && wifi_user_now == wifi_user && wifi_pass_now == wifi_pass)
	{
		$.alert(nothing);
		return;
	}
	var requestData = {				
				wifi_ip: wifi_ip,
				wifi_user: wifi_user,
				wifi_pass : wifi_pass						
			};
	dlgwait=$.dialog({
		width: 390,
		padding: '25px 30px',
		lock: true,
		title : 'WIFI',
		content : dialog_content
	});								
	$.ajax({
		url: '/action/wifiInfoSet',
		data:requestData,
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if ( rsp.code == 0){
				$.alert(setup_suc);
				wifiInfoGet();
			}else{
				$.alert(setup_failed);				
			}
			dlgwait.close();			
		},
		error:function(){
			console.log("wifiInfoSet error");
		}
	});	
}

//二层mtu信息设置
function MtuSubmit()
{
	$('input[title=lan_mtu]').trigger('blur');
	if (mtu_status == 0){
		return;
	}
	var vlan_mtu = $('input[name=lan_mtu]').val();
	var requestData = {
				vlan_mtu : vlan_mtu					
			};

	$.dialog({
			width: 390,
			padding: '25px 30px',
			title: 'MTU',
			lock: true,
			content: mtu_reset,
			okValue: ok,
			cancelValue: cancel,
			ok: function(){
					$.ajax({
						url: '/action/MtuSubmit',
						data: requestData,
						type: "POST",
						dataType: "json",
						async: false,
						success : function(rsp){
							if (rsp.code == 0){
							}else{
								$.alert(setup_failed);
							}			
						},
						error:function(){
							console.log("MtuSubmit error");
						}
					});	
				this.close();
			},
			cancel: function(){}
	});				
}

function TrunkMtuSubmit()
{
	$('input[title=trunk_mtu]').trigger('blur');
	if (mtu_status == 0){
		return;
	}
	var vlan_mtu = $('input[name=trunk_mtu]').val();
	var requestData = {
				vlan_mtu : vlan_mtu					
			};

	$.dialog({
			width: 390,
			padding: '25px 30px',
			title: 'MTU',
			lock: true,
			content: mtu_reset,
			okValue: ok,
			cancelValue: cancel,
			ok: function(){
					$.ajax({
						url: '/action/MtuSubmit',
						data: requestData,
						type: "POST",
						dataType: "json",
						async: false,
						success : function(rsp){
							if (rsp.code == 0){
							}else{
								$.alert(setup_failed);
							}			
						},
						error:function(){
							console.log("MtuSubmit error");
						}
					});	
				this.close();
			},
			cancel: function(){}
	});				
}
