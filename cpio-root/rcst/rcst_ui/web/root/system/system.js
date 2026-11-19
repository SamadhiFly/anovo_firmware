//重启
function sysReboot(){
	$.dialog({
			width: 390,
			padding: '25px 30px',
			title: dialog_title,
			lock: true,
			content: dialog_content_reboot,
			okValue: ok,
			cancelValue: cancel,
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
}
//复位
function sysReset(){
	$.dialog({
			width: 390,
			padding: '25px 30px',
			title: dialog_title,
			lock: true,
			content: dialog_content_reset,
			okValue: ok,
			cancelValue: cancel,
			ok: function(){
					$.ajax({
						url: '/action/sysReset',
						data: {data:21},
						type: "POST",
						dataType: "json",
						async: false,
						success : function(rsp){
							if (rsp.code == 0){
								$.alert( reset_wait );
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
}
