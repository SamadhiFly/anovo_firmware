rcstTypeGet();
langget();
if (rcstType == 2){
	$('#mesh_status').show();
}
rslinkInfoGet();
/*获取列表函数*/
function rslinkInfoGet(){
	$.ajax({
		url: '/action/rslinkInfoGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if (rsp.code == 0){
				var mesh_modulationtype;
				var mesh_uprate;
				var info = rsp.info;             
				var trarr = [];
				var tpl = $('#rslink_list').html();
				$('#rslink_dialoglist').html(trarr.join(''));
				if ($.isArray(info) && info.length > 0){		
					for (var i = 0, len = info.length; i < len; i++){
						mesh_modulationtype = Number(info[i].mesh_modulationtype);
						if (mesh_modulationtype == 1){
							mesh_modulationtype = "QPSK1/3";
						}else if(mesh_modulationtype == 2){
							mesh_modulationtype = "QPSK1/3";
						}else if(mesh_modulationtype == 3){
							mesh_modulationtype = "QPSK1/3";
						}else if(mesh_modulationtype == 4){
							mesh_modulationtype = "QPSK1/2";
						}else if(mesh_modulationtype == 5){
							mesh_modulationtype = "QPSK2/3";
						}else if(mesh_modulationtype == 6){
							mesh_modulationtype = "QPSK3/4";
						}else if(mesh_modulationtype == 7){
							mesh_modulationtype = "QPSK5/6";
						}else if(mesh_modulationtype == 8){
							mesh_modulationtype = "8QPSK2/3";
						}else if(mesh_modulationtype == 9){
							mesh_modulationtype = "8QPSK3/4";
						}else if(mesh_modulationtype == 10){
							mesh_modulationtype = "8QPSK5/6";
						}else if(mesh_modulationtype == 11){
							mesh_modulationtype = "16QPSK3/4";
						}else if(mesh_modulationtype == 12){
							mesh_modulationtype = "16PSK5/6";
						}else if(mesh_modulationtype == 13){
							mesh_modulationtype = "QPSK1/3";
						}else if(mesh_modulationtype == 14){
							mesh_modulationtype = "QPSK1/2";
						}else if(mesh_modulationtype == 15){
							mesh_modulationtype = "QPSK2/3";
						}else if(mesh_modulationtype == 16){
							mesh_modulationtype = "QPSK3/4";
						}else if(mesh_modulationtype == 17){
							mesh_modulationtype = "QPSK5/6";
						}else if(mesh_modulationtype == 18){
							mesh_modulationtype = "8PSK2/3";
						}else if(mesh_modulationtype == 19){
							mesh_modulationtype = "8PSK3/4";
						}else if(mesh_modulationtype == 20){
							mesh_modulationtype = "8PSK5/6";
						}else if(mesh_modulationtype == 21){
							mesh_modulationtype = "16QAM3/4";
						}else if(mesh_modulationtype == 22){
							mesh_modulationtype = "16QAM5/6";
						}else{}
						  
						mesh_uprate = Number(info[i].mesh_uprate);
						if (mesh_uprate == 0){
							mesh_uprate = "0 KSps";
						}else if(mesh_uprate == 2){
							mesh_uprate = "125 KSps";
						}else if(mesh_uprate == 3){
							mesh_uprate = "250 KSps";
						}else if(mesh_uprate == 4){
							mesh_uprate = "500 KSps";
						}else if(mesh_uprate == 7){
							mesh_uprate = "125 KSps";
						}else if(mesh_uprate == 8){
							mesh_uprate = "250 KSps";
						}else if(mesh_uprate == 9){
							mesh_uprate = "500 KSps";
						}else if(mesh_uprate >= 200 && mesh_uprate <=217){
							mesh_uprate = "500 KSps";
						}else if(mesh_uprate >= 150 && mesh_uprate <=157){
							mesh_uprate = "125 KSps";
						}else if(mesh_uprate >= 140 && mesh_uprate <=147){
							mesh_uprate = "125 KSps";
						}else if(mesh_uprate >= 130 && mesh_uprate <=137){
							mesh_uprate = "250 KSps";
						}else if(mesh_uprate >= 120 && mesh_uprate <=127){
							mesh_uprate = "250 KSps";
						}else if(mesh_uprate >= 100 && mesh_uprate <=117){
							mesh_uprate = "1 MSps";
						}else if(mesh_uprate >= 20 && mesh_uprate <=37){
							mesh_uprate = "2 MSps";
						}else if(mesh_uprate >= 40 && mesh_uprate <=57){
							mesh_uprate = "4 MSps";
						}else if(mesh_uprate >= 80 && mesh_uprate <=97){
							mesh_uprate = "8 MSps";
						}else{}													 
						  					
						var tr = StringH.tmpl(tpl, {
							list: i+1,
							lan: info[i].mesh_srcip,
							wan: info[i].mesh_srcip,
							power: info[i].mesh_snr,
							rate: mesh_uprate,
							adm: mesh_modulationtype     
						});
						trarr.push(tr);
					}
					$('#rslink_dialoglist').html(trarr.join('')); 
				}	
			}else{	
				$('#rslink_dialoglist').html('<tr><td class="center" colspan="6">'+shownone+'</td></tr>');	
			}
		},
		error:function(){
				console.log("rslinkInfoGet error2");
		}
	});				
}
