rcstTypeGet();
langget();
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



var beam_on_discribe;
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
					//$("#beam_resource").hide();
				}else{
					//~ $('#auto_config_lockinfo')[0].className = 'btn-switch btn-switch-off';
					$(".BeamSwitchStatus").html(OFF);
					//$("#beam_resource").hide();
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
						//$("#beam_resource").hide();
					}else{
						$( '#state1' ).html(switch_close);
						setTimeout(function () {
							dlgwait.close();
						} ,  1000);
						$('#auto_config_lockinfo')[0].className = 'btn-switch btn-switch-off';
						//$("#beam_resource").hide();
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



var beam_discribe_enable ={},
		beam_on_num=0,
		now_beam_discribe;

//beamGetList();		
/*大beam列表展示函数*/		     
function beamGetList() {
	beam_on_num=0;	
	$.ajax({
		url: '/action/beamname_getList',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){																				
			beam_discribe_enable=rsp.info;   		
			var info = rsp.info;             
			var trarr = [];
			$('#redirect_dialogtestlist').html(trarr.join(''));        
			console.log( "info.length="+info.length);
			if ($.isArray(info) && info.length > 0) {		
				for (var i = 0; i < info.length; i++) {
					var tpl ="<tr >";	
							tpl +="	<td class=\"form-item\">&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"beam_mane_"+i+"\"></span></td>";
							tpl +="		<td  class=\"form-item left\">";
							tpl +="		<a  onclick=\"beamChange("+i+")\" id=\"beam_switch_"+i+"\"  class=\"btn-switch btn-switch-off\" ></a>";		
							tpl +="	</td>";
							tpl +="	<td class=\"form-item left\">";
							tpl +="		<select  id=\"priority_"+i+"\"  class=\"priority\" style=\"width:80px;height:30px;disabled:false;\" >";
							tpl +="		 </select>";
							tpl +="	</td>";
							tpl +="	<td ><button style=\"width:70px;height:30px;\"   id=\"submit_beam_"+i+"\"  onclick=\"beamSubmit("+i+")\"  disabled:false;>"+"<span class='Submit'></span></button></td>";
							tpl +="</tr>";						
					trarr.push(tpl);
				}
				$('#redirect_dialogtestlist').html(trarr.join('')); 
				for (var i =1; i<=10; i++){
					$(".priority").append('<option value='+i+'>'+ i+'</option>');	
				}
								
				for (var i = 0; i < info.length; i++){
					if(info[i].enable=='1'){	
						$('#beam_switch_'+i)[0].className = 'btn-switch btn-switch-on';
						document.getElementById('priority_'+i).disabled=false; 
						document.getElementById('submit_beam_'+i).disabled=false; 
						beam_on_num++;
					}else{
						$('#beam_switch_'+i)[0].className = 'btn-switch btn-switch-off';
						document.getElementById('priority_'+i).disabled="disabled"; 
						document.getElementById('submit_beam_'+i).disabled="disabled";
					}
					$('.beam_mane_'+i).html(info[i].beam_discribe);	
					$('#priority_'+i).val(info[i].priority);	
				}
				$('.Submit').html(Submit);
				console.log("beam_on_num="+beam_on_num);
				if(beam_on_num>0){
					$('#resource_div').show();
					beam_view_list();
				}else{
					$('#resource_div').hide();
				}
			}else{	
				$('#redirect_dialogtestlist').html('<tr><td class="center" colspan="4">'+no_info+'</td></tr>');	
			} 							
		},
		error:function(){
				console.log("beamname_getList error");
		}
	});
}

/*已经开启的大beam列表展示函数*/
function beam_view_list(){
	var trarr = [];
	$('#resource_list').html(trarr.join('')); 
	console.log(beam_discribe_enable.length);
	if (beam_on_num> 0) {		
		for (var i = 0; i <beam_discribe_enable.length; i++) {
			console.log("beam_discribe_enable[i].beam_discribe="+beam_discribe_enable[i].beam_discribe);
			console.log("beam_discribe_enable[i].enable="+beam_discribe_enable[i].enable);			
			if(beam_discribe_enable[i].enable=='1'){
				var tpl ="<tr >";	
						tpl +="	 <td style=\"width:250px;height:60px\">&nbsp;&nbsp;&nbsp;&nbsp;"+beam_discribe_enable[i].beam_discribe +"</td>;"
						tpl +="	 <td class=\"form-contral\">";
						tpl +="		<button type=\"submit\" id=\"redirect_submit_dellist\"  beam_on_discribe="+beam_discribe_enable[i].beam_discribe+"  class=\"btn_sub\" style=\"width:160px;height:35px\"><span class='View'></span></button>";
						tpl +="	</td>";
						tpl +="</tr>";						
				trarr.push(tpl);
			}
		}
		$('#resource_list').html(trarr.join('')); 
	}
	$('.View').html(View);	
}


/*大beam开关*/
function beamChange(i){
	var dlgwait = $.dialog({
			width: 390,
			padding:25,
			lock: true,
			title : 'Beam',
			content : $('#tmplWait').html(),
		});				
	var st = $("#beam_switch_"+i).hasClass('btn-switch-on') ? 0 : 1;
	var requestData = {
				beam_discribe: beam_discribe_enable[i].beam_discribe,
				enable: st
	}; 
	$.ajax({
		url: '/action/setNSSwitch',
		type: "POST",
		data: requestData,
		dataType: "json",
		async: false,
		success : function(rsp){
		   if (rsp.code == 0) {
				if (rsp.status == 1) {
					var state1 = document.getElementById('state1');
					state1.innerHTML = switch_open;
					beamGetList();
					setTimeout(function () {
						dlgwait.close();
					} ,  2000);
				}else{
					var state1 = document.getElementById('state1');
					state1.innerHTML =  switch_close;
					beamGetList();
					setTimeout(function () {
						dlgwait.close();
					} ,  2000);
				}
			}
		},
		error:function(){
				console.log("beamname_getList error");
		}			
	});		
}


/*大beam优先级配置*/	
function beamSubmit(i){
	var priority =$("#priority_"+i).val();
	var requestData = {
				beam_discribe: beam_discribe_enable[i].beam_discribe,
				priority: priority
	}; 
 
	$.ajax({
		url: '/action/setBeamPriority',
		type: "POST",
		data: requestData,
		dataType: "json",
		async: false,
		success : function(rsp){
		if ( rsp.code == 0 ) {
			$.alert( setup_suc, function(){
				} );			
			}else{
			$.alert(setup_failed, function(){
				} );			
			}
		},
		error:function(){
				console.log("setBeamPriority error");
		}		
	});	
}


/*小beam资源查看函数*/
var beam_getTestList =function (beam_on_discribe, pagenum) {
		var 	nsid_name;
		var 	requestData = {
						pagenum :pagenum,
						discribe: "anybeam_info_"+beam_on_discribe
					}; 				
	$.ajax({
		url: '/action/getBeamNew',
		type: "POST",
		data: requestData,
		dataType: "json",
		async: false,
		success : function(rsp){
			$('#Num').html(Num);	
			$('#Switch').html(Switch);	
			$('#Polarization').html(Polarization);	
			$('#LBLinkType').html(LBLinkType);	
			$('#Frequency').html(Frequency);	
			$('#Symbol').html(Symbol);	
			$('#SatelliteLongitude').html(SatelliteLongitude);		
			$('.BackPage').html(BackPage);		
			$('.NextPage').html(NextPage);		
			$('.NO').html(NO);		
			$('.Page').html(Page);		

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
			if ($.isArray(info) && info.length > 0){			
				for (var i = 0, len = info.length; i < len; i++){ 							
						var sate_longitude=info[i].sate_longitude;
						if(sate_longitude>0){
							sate_longitude=East+sate_longitude+" "+"°";
						}else{
							sate_longitude=West+(0-Number(sate_longitude))+" "+"°";
						}							
						info[i].frequency=Number(info[i].frequency)/1000;
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
						num =i;			
				}
				$('#redirect_dialogtestlist').html(trarr.join('')); 
				for (var i = 0, len = info.length; i < len; i++) {
					if(info[i].enable=='1'){
						$("#"+info[i].nsid)[0].className = 'btn-switch btn-switch-on';
					}
				}
			}else{	
				$('#redirect_dialogtestlist').html('<tr><td class="center" colspan="9"><%:There is no setting informations%></td></tr>');	
			}			
		},
		error:function(){
				console.log("beamname_getList error");
		}	
	});
}
	
/* 小beam资源查看按钮*/					
$('body').delegate( '#redirect_submit_dellist' ,'click', function( e ){
	var that = this,
	$this = $( that );
	beam_on_discribe = $this.attr('beam_on_discribe');
	console.log("click "+beam_on_discribe);
	now_beam_discribe=beam_on_discribe;
	var contentTmpl;
	contentTmpl = $('#tmplTsetSet_beam').html(); 
	selfaddDialog = $.dialog({
		title: 'Beam',
		content: contentTmpl,
		lock: true,
		padding: 0,
		width: 1000
	});
	beam_getTestList(beam_on_discribe, 1);
	setTimeout(function () {
		$.formInit();
	}, 100);	
});
		
/*小beam资源开关配置函数*/
$( 'body' ).delegate( '#editItem', 'click', function( e ){
	console.log("now_beam_discribe="+now_beam_discribe);
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
		var requestData = {
			beam_discribe:"anybeam_info_"+now_beam_discribe,
			enable:st,
			nsid:nsid
		};

		$.ajax({
			url: '/action/setBeamSwitchNew',
			type: "POST",
			data: requestData,
			dataType: "json",
			async: false,
			success : function(rsp){
				if (rsp.code == 0) {
					if (rsp.status == 1) {
						var state1 = document.getElementById('state1');
						state1.innerHTML =switch_open;
						setTimeout(function () {
							dlgwait.close();
						} ,  1000);
						$("#"+nsid)[0].className = 'btn-switch btn-switch-on';
						
					}else{
						var state1 = document.getElementById('state1');
						state1.innerHTML = switch_close;
						setTimeout(function () {
							dlgwait.close();
						} ,  1000);
						$("#"+nsid)[0].className = 'btn-switch btn-switch-off';
					}
				}
			},
			error:function(){
					console.log("beamname_getList error");
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
		beam_getTestList(beam_on_discribe, next_page);
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
		beam_getTestList(beam_on_discribe, back_page);
	}
	else
	{
		$.alert(FirstPage);
	}						
});
