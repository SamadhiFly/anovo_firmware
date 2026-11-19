langget();
rcstTypeGet();
antennaGet();


function jump(){
	if( beamaccsss_map_isnot_dbs_flag=='0'){
			window.location.href="/root/odu/beam.htm"+"?timestamp="+new Date().getTime() ;
	}else{
			window.location.href="/root/odu/mbeam.htm"+"?timestamp="+new Date().getTime() ;
	}
}

var	rf_rx_freq_divide_now;
var rf_rx_symbol_divide_now;
var rx_freq_now;
var src_ip
var dst_ip;
var port;
var seekstar;
var old_discribe ={};
var num=0;	    
function antennaGet(){
	$.ajax({
		url: '/action/get_antenna',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			spectral_enable=rsp.spectral_enable;
			console.log("spectral_enable="+spectral_enable);			
			if (rsp.code == 0) 
			{ 
				var info = rsp.info;             
				var trarr = [];
				var tpl = $('#redirect_tmplAddedTest').html(); 
				$('.addbtn').fadeIn();
				$('.submitbtn').hide();
				
				$('#redirect_dialogtestlist').html(trarr.join('')); ////tbody
				if ($.isArray(info) && info.length > 0) 
				{		
					for (var i = 0, len = info.length; i < len; i++) 
					{ 
						if(info[i].ANT_type=="fix"){
							info[i].ANT_type=fix;
						}else if(info[i].ANT_type=="move"){
							info[i].ANT_type=move;
						}else if(info[i].ANT_type=="static"){
							info[i].ANT_type=STATIC;
						}else if(info[i].ANT_type=="manual_portable"){
							info[i].ANT_type=manual_portable;
						}else if(info[i].ANT_type=="auto_portable"){
							info[i].ANT_type=auto_portable;
						}
						if(info[i].LNB_type=="1"){
							info[i].LNB_type=Single;
						}else if(info[i].LNB_type=="2"){
							info[i].LNB_type=Double;
						}else if(info[i].LNB_type=="4"){
							info[i].LNB_type=Four;
						}
						if(info[i].BUC_type=="1"){
							info[i].BUC_type=Single;
						}else if(info[i].BUC_type=="2"){
							info[i].BUC_type=Double;
						}else if(info[i].BUC_type=="4"){
							info[i].BUC_type=Four;
						}								
						var tr = StringH.tmpl(tpl, {
							 num: i+1,
							 discribe : info[i].discribe,
							 ANT_type: info[i].ANT_type,
							 LNB_type: info[i].LNB_type,   
							 BUC_type : info[i].BUC_type,  
						});
						trarr.push(tr);
						//old_discribe[i] = info[i].discribe;
					}
					//num =i;
					$('#redirect_dialogtestlist').html(trarr.join('')); 
				} 		
			}
			else
			{	
				$('#redirect_dialogtestlist').html('<tr><td class="center" colspan="5"><%:There is no setting informations%></td></tr>');	
			}				
		},
		error:function(){
				console.log("get_antenna error");
		}
	});
	
if($('#language_three').val()=="zh"){
	$('.Cancel').html("取消");
	$('.Edit').html("修改");
	$('.Save').html("保存");
	$('.Delete').html("删除");
	$('.Add').html("添加");

	Double="双本振";
	Single="单本振";
	Four="4本振";	
}else if($('#language_three').val()=="en"){
	$('.Cancel').html("Cancel");
	$('.Edit').html("Edit");
	$('.Save').html("Save");
	$('.Delete').html("Delete");
	$('.Add').html("Add");

	None="None";
	Double="Double";
	Single="Single";
	Four="Four";	
}else if($('#language_three').val()=="zh_HK"){
	$('.Cancel').html("取消");
	$('.Edit').html("修改");
	$('.Save').html("保存");
	$('.Delete').html("删除");
	$('.Add').html("添加");

	Double="雙本振";
	Single="單本振";
	Four="4本振";	
}
}	
