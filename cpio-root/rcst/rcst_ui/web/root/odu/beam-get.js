rcstTypeGet();
langget();
var flag;
// dialog confirm
(function( $ ){
    $.alert = function( content, ok ){
        ok = ok || function(){};
        return $.dialog({
            width: 390,
            padding:'25px 30px',
            title: 'Beam',
            content: content,
            ok: ok,
            cancel: false
        });
    }
})(jQuery);

// dialog confirm
(function( $ ){
    $.confirm = function( content, ok ){
        ok = ok || function(){};
        return $.dialog({
            width: 390,
            padding:'25px 30px',
            title: 'Beam',
            content: content,
        		okValue: OK,
        		cancelValue: Cancel,
            ok: ok,
            cancel: function(){}
        });
    }
})(jQuery);


function jump(){
	if( beamaccsss_map_isnot_dbs_flag=='0'){
			window.location.href="/root/odu/beam.htm"+"?timestamp="+new Date().getTime() ;
	}else{
			window.location.href="/root/odu/mbeam.htm"+"?timestamp="+new Date().getTime() ;
	}
}

(function(){
	document.onkeydown = keyf5;
	
});	
function	keyf5(e){
	if(e.keyCode == 116)
	{
		e.preventDefault();
		jump();
	}
}



var total_page=0;
beamSwitchGet();
function beamSwitchGet(){
	$.ajax({
		url: '/action/beamSwitchGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if ( rsp.code == 0){
				if (1 == rsp.auto_config_lockinfo){
					//~ $('#auto_config_lockinfo')[0].className = 'btn-switch btn-switch-on';
					$(".BeamSwitchStatus").html(ON);
					$("#beam_resource").show();
					getBeam(1);
				}else{
					//~ $('#auto_config_lockinfo')[0].className = 'btn-switch btn-switch-off';
					$(".BeamSwitchStatus").html(OFF);
					$("#beam_resource").hide();
				}																					
			}else{}							
		},
		error:function(){
				console.log("beamSwitchGet error");
		}
	});
}



 $('#auto_config_lockinfo').on('click', function (e) {
	var auto_config_lockinfo = $('#auto_config_lockinfo').hasClass('btn-switch-on') ? 0 : 1;
	var dlgwait = $.dialog({
			width: 390,
			padding:25,
			lock: true,
			title : 'Beam',
			content : $('#tmplWait').html()
		});
	var requestData = {
				auto_config_lockinfo:auto_config_lockinfo
			};						
	e.preventDefault(); 
	$.ajax({
			url: '/action/beamSwitchSet',
			data:requestData,
			type: "POST",
			dataType: "json",
			async: false,
			success : function(rsp){
				if ( rsp.code == 0){
					if (auto_config_lockinfo == 1) {
						$( '#state1' ).html(switch_open);
						setTimeout(function () {
							dlgwait.close();
						} ,  1000);
						$('#auto_config_lockinfo')[0].className = 'btn-switch btn-switch-on';
						getBeam(1);
						$("#beam_resource").show();
					}else{
						$( '#state1' ).html(switch_close);
						setTimeout(function () {
							dlgwait.close();
						} ,  1000);
						$('#auto_config_lockinfo')[0].className = 'btn-switch btn-switch-off';
						$("#beam_resource").hide();
					}					
				}else{
					$( '#state1' ).html(switch_error);
				}							
			},
			error:function(){
				console.log("auto_config_lockinfo error");
			}
		});	
});


function getBeam(pagenum){
	var 	requestData = {
				pagenum :pagenum
			}; 
	$.ajax({
		url: '/action/getBeam',
		type: "POST",
		dataType: "json",
		data: requestData,
		async: false,
		success : function(rsp){
			if(500==Number(rsp.s32_config_count))
			{
				$('#redirect_dialogtestlist').html('<tr><td class="center" colspan="9">'+MoreThan500+'</td></tr>');	
				return;
			}
			total_page=Math.ceil(Number(rsp.s32_config_count)/10);		
			$("#now_page").html(pagenum);
			$("#total_page").html(total_page);			
				var info = rsp.info;             
				var trarr = [];
				var tpl = $('#redirect_tmplAddedTest').html();
					$('#redirect_dialogtestlist').html(trarr.join('')); 
				if ($.isArray(info) && info.length > 0) 
				{
					$('#redirect_dialogtestlist').html(" ");
					flag=rsp.code;		
					for (var i = 0, len = info.length; i < len; i++) 
					{ 							
						var sate_longitude=info[i].sate_longitude;
						if(rsp.code==3){  //anybeam_info
							if(sate_longitude>0){
								sate_longitude=East+sate_longitude+" "+"°";
							}else{
								sate_longitude=West+(0-Number(sate_longitude))+" "+"°";
							}							
						}else{  //lockresource
							if(sate_longitude>100000){
								sate_longitude=sate_longitude-100000;
								sate_longitude=sate_longitude/100;
								sate_longitude=West+sate_longitude+" "+"°";
							}else if(sate_longitude==100000){
								sate_longitude=West+" 0°";
							}else{
								sate_longitude=East+sate_longitude/100+" "+"°";
							}							
						}

						if (rsp.code=='3'){
							info[i].frequency=Number(info[i].frequency)/1000;
						}else if (rsp.code=='4'){
							info[i].frequency=Number(info[i].frequency)/10000;
						}
						var downlinkPolarization=info[i].downlinkPolarization;
						if(info[i].downlinkPolarization=="1"){
							downlinkPolarization= Right;
						}else if(info[i].downlinkPolarization=="0"){
							downlinkPolarization=Left;
						}else if(info[i].downlinkPolarization=="2"){
							downlinkPolarization=Vertical;
						}else if(info[i].downlinkPolarization=="3"){
							downlinkPolarization= Horizontal;
						}	
						var tr = StringH.tmpl(tpl, {
							num: i+10*(pagenum-1)+1,
							 nsid: info[i].nsid,
							 beamid: info[i].beamid,
							 downlinkPolarization: downlinkPolarization,
							 lbLinkType: info[i].lbLinkType,
							 frequency: info[i].frequency,
							 symbol: info[i].symbol,
							 sate_longitude:sate_longitude,
						});
						trarr.push(tr);
					}
					num =i;
					$('#redirect_dialogtestlist').html(trarr.join('')); 
					for (var i = 0, len = info.length; i < len; i++) {
						if(info[i].enable=='1'){
							$("#"+info[i].nsid)[0].className = 'btn-switch btn-switch-on';
						}
					}
				} 		
				else
				{	
					$('#redirect_dialogtestlist').html('<tr><td class="center" colspan="9">'+no_info+'</td></tr>');	
				}
		},
		error:function(){
				console.log("satelliteGet error2");
		}
	});				
}


$( 'body' ).delegate( '#editItem', 'click', function( e ){
			var dlgwait = $.dialog({
			width: 390,
			padding:25,
			lock: true,
			title : 'Beam',
			content : $('#tmplWait').html(),
		});			

	var that = this,
		$this = $( that );
		var nsid =  $this.attr('nsid');	  
		var st = $("#"+nsid).hasClass('btn-switch-on') ? 0 : 1;		
		var requestData,
		requestURL = '/action/setBeamSwitch',
		requestData = {
			enable:st,
			nsid:nsid,
			flag:flag
		};
	   $.getJSON( requestURL, requestData, function( rsp ){
			if (rsp.code == 0) {
				if (st == 1) {
					var state1 = document.getElementById('state1');
					state1.innerHTML =  switch_open;
					setTimeout(function () {
						dlgwait.close();
					} ,  1000);
					$("#"+nsid)[0].className = 'btn-switch btn-switch-on';
					
				}else{
					var state1 = document.getElementById('state1');
					state1.innerHTML =  switch_close;
					setTimeout(function () {
						dlgwait.close();
					} ,  1000);
					$("#"+nsid)[0].className = 'btn-switch btn-switch-off';
				}
			}
		});	
});





// next按钮
$( 'body' ).delegate( '#go_next', 'click', function( e ){
	e.preventDefault();	
	console.log("click next");
	var now_page=Number($("#now_page").html());
	next_page=now_page+1;
	console.log("now_page="+now_page);
	console.log("next_page="+next_page);
	if(next_page<=total_page)
	{ 
		getBeam(next_page);
	}
	else
	{
		$.alert(LastPage);
	}				
});

// back按钮
$( 'body' ).delegate( '#go_back', 'click', function( e ){
	console.log("click back");
	var now_page=Number($("#now_page").html());
	back_page=now_page-1;
	console.log("now_page="+now_page);
	console.log("back_page="+back_page);
	if(back_page > 0	)
	{ 
		getBeam(back_page);
	}
	else
	{
		$.alert(FirstPage);
	}						
});
