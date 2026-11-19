rcstTypeGet();
langget();
// dialog alert
(function( $ ){
    $.alert = function( content, ok ){
        ok = ok || function(){};
        return $.dialog({
            width: 390,
            padding:'25px 30px',
            title: Satellite,
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
            title: Satellite,
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
  
var old_discribe ={},
		old_satellite={},
		old_beacon={},
		old_satellite_polarization_mode_rx={},
		old_satellite_longitude={},
		old_rf_rx_freq_divide={},
		old_rf_rx_symbol_divide={},
		old_system_23={},
		old_rolloff={},
		num=0;	    
var tmp_tr;
var editItem_discribe;	
var satellite_name_now_main,satellite_name_now_back;
var total_page=0;

satellite_getTestList(1);

/*卫星资源获取列表函数OK*/
function satellite_getTestList(pagenum){
var 	requestData = {
		pagenum :pagenum
	}; 
	$.ajax({
		url: '/action/satelliteGet',
		type: "POST",
		dataType: "json",
		data: requestData,
		async: false,
		success : function(rsp){
				if (rsp.code == 0) 
				{ 
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
					$('.addbtn').fadeIn();
					$('.submitbtn').hide();
					
					$('#redirect_dialogtestlist').html(trarr.join('')); 
				var satellite_longitude_EW,
				satellite_longitude,
				satellite_longitude_EW_all,
				satellite_polarization_mode_rx,
				 system_23,
				rolloff;
				satellite_name_now_main=rsp.satellite_name_now_main;
				satellite_name_now_back=rsp.satellite_name_now_back;
				if ($.isArray(info) && info.length > 0) 
				{		
					
					for (var i = 0, len = info.length; i < len; i++) 
					{  
						if(info[i].satellite_longitude>0){
							satellite_longitude_EW= East;
							satellite_longitude=info[i].satellite_longitude;
						}else{
							satellite_longitude_EW= West;
							satellite_longitude=0-info[i].satellite_longitude;
						}
						satellite_longitude=satellite_longitude+" "+"°";
						satellite_longitude_EW_all=satellite_longitude_EW+satellite_longitude;
						if(info[i].satellite_polarization_mode_rx=="R"){
							satellite_polarization_mode_rx=Right;
						}else if(info[i].satellite_polarization_mode_rx=="L"){
							satellite_polarization_mode_rx= Left;
						}else if(info[i].satellite_polarization_mode_rx=="V"){
							satellite_polarization_mode_rx= Vertical;
						}else if(info[i].satellite_polarization_mode_rx=="H"){
							satellite_polarization_mode_rx= Horizontal;
						}							
						if ((info[i].satellite_longitude==87.5)&&(info[i].satellite_polarization_mode_rx=="H")){
							info[i].beacon='--';					
						}
						if(info[i].rolloff =='105'){
							info[i].rolloff='0.05'
						}else if(info[i].rolloff =='110'){
							info[i].rolloff='0.1'
						}else if(info[i].rolloff =='115'){
							info[i].rolloff='0.15'
						}else if(info[i].rolloff =='120'){
							info[i].rolloff='0.2'
						}else if(info[i].rolloff =='125'){
							info[i].rolloff='0.25'
						}else if(info[i].rolloff =='135'){
							info[i].rolloff='0.35'
						}else if(info[i].rolloff =='100'){
							info[i].rolloff=No
						}else{
							info[i].rolloff='0.05';
						}	
						if(info[i].system_23 =='2'){
							info[i].system_23='Anovo2.0'
						}else if(info[i].system_23 =='3'){
							info[i].system_23='Anovo3.0'
						}else if(info[i].system_23 =='4'){
							info[i].system_23='Anovo4.0';
						}							
						var tr = StringH.tmpl(tpl, {
							 num: i+10*(pagenum-1)+1,
							 discribe: info[i].discribe,
							 satellite_longitude_EW_all: satellite_longitude_EW_all,   
							 satellite_polarization_mode_rx : satellite_polarization_mode_rx,
							 beacon: info[i].beacon,      
							 rf_rx_freq_divide: info[i].rf_rx_freq_divide/1000000, 
							 rf_rx_symbol_divide: info[i].rf_rx_symbol_divide,      
							 system_23: info[i].system_23,  
							 rolloff: info[i].rolloff,  
						});
						trarr.push(tr);
					
						old_discribe[i] = info[i].discribe;
						old_satellite_longitude[i]= info[i].satellite_longitude;
						old_satellite_polarization_mode_rx[i]= info[i].satellite_polarization_mode_rx;
						old_beacon[i]= info[i].beacon;
						old_rf_rx_freq_divide[i]= info[i].rf_rx_freq_divide;
						old_rf_rx_symbol_divide[i]= info[i].rf_rx_symbol_divide;
						old_system_23[i]= info[i].old_system_23;
						old_rolloff[i]= info[i].old_rolloff;
						
					}
					num =i;
					$('#redirect_dialogtestlist').html(trarr.join('')); 
				} 		
			}
			else
			{	
				$('#redirect_dialogtestlist').html('<tr><td class="center" colspan="7">'+no_info+'</td></tr>');	
			}
		},
		error:function(){
				console.log("satelliteGet error2");
		}
	});				
	if($('#language_three').val()=="zh"){
		$('.Cancel').html("取消");
		$('.Edit').html("修改");
		$('.Save').html("保存");
		$('.Delete').html("删除");
		$('.Add').html("添加");
	}else if($('#language_three').val()=="en"){
		$('.Cancel').html("Cancel");
		$('.Edit').html("Edit");
		$('.Save').html("Save");
		$('.Delete').html("Delete");
		$('.Add').html("Add");
	}else if($('#language_three').val()=="zh_HK"){
		$('.Cancel').html("取消");
		$('.Edit').html("修改");
		$('.Save').html("保存");
		$('.Delete').html("删除");
		$('.Add').html("添加");
	}
}

/*删除卫星资源列表按钮*/
$('body').delegate( '#redirect_submit_dellist' ,'click', function( e ){

	var that = this,
		$this = $( that ),
		discribe = $this.attr('redirect_target_del'),
		ok = function(){
			//redirect_unbind_route.call( that, e, discribe);
							requestURL = '/action/satellite_del',
									requestData = {
										discribe: discribe
									};
								$.getJSON(requestURL, requestData, function (rsp) 
							{
								if (rsp.code == 0) 
								{
									$.alert(delete_success, function(){
										location.reload( true );
									}).lock();
								}
								else if (rsp.code == -1)
								{
									$.alert(cannot_deleted);
									$('.addbtn').fadeIn();
									$('.submitbtn').hide();
								}else if (rsp.code == -2){
									$.alert(delete_failed, function(){
										location.reload( true );
									}).lock();
								}
							});
		},
		cancel= function(){};
	$.confirm( remove_confirm, ok );
});
			
/*卫星资源列表取消添加规则*/
$( 'body' ).delegate( '#redirect_deloneitem', 'click', function( e ){
	e.preventDefault();
	var tar = e.target;
	var tr = $( tar ).parents( 'tr' );
	var form = $( '#redirect_dialogtestlist' );
	var btnSubmit = $( '#redirect_submitbandlist' );
	var ok = function(){
		tr.remove();
		if ( form.find( 'tr' ).length > 0 ) 
		{
			$('.addbtn').fadeIn();
			$('.submitbtn').hide();
		} 
		else 
		{
			$('.submitbtn').hide();	
		}
		$("button[name=editItem]").unbind();
		
	};
	ok();
});

$( 'body' ).delegate( '#cancel_edit', 'click', function( e ){
	e.preventDefault();	
	$("button[name=editItem]").unbind();
	$('.addbtn').show();
	$("#"+editItem_discribe).html(tmp_tr);	
});	

	  					
	var check_discribe;
	var check_longitude;
	var check_beacon;
	var check_rf_rx_symbol;
	var check_rf_rx_freq;
	var discribe_status = 0; 
	var longitude_status=0;
	var beacon_status=0;
	var rf_rx_symbol_status=0;
	var rf_rx_freq_status=0;
	var global_ignore= 0; 
	re = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/;
	re1 = /^-?[0-9]+\.[0-9]+ *$/;
	re2 = /^-?[0-9]+ *$/;
	re3 = /^ *$/; 
	re4=/^\w+$/;

	var check_status=function(){
		check_discribe = $('input[title=discribe]');
		check_longitude =  $('input[title=satellite_longitude]');
		check_beacon= $('input[title=beacon]');
		check_rf_rx_symbol= $('input[title=rf_rx_symbol_divide]');
		check_rf_rx_freq= $('input[title=rf_rx_freq_divide]');
		//名称	
		check_discribe.blur(function(){
			var $parent = $(this).parent();		
			$parent.find(".formips").remove();
			if( 1 ){	
				if( re3.test($('#discribe').val())){
					$parent.append('<span class= "formips onEror" >'+Discribe +validate_blank+'</span>');
					discribe_status = 3;
				}else if(!re4.test($('#discribe').val())){
					$parent.append('<span class= "formips onEror" >'+Discribe+validate_input+'</span>');
					discribe_status = 2;
				}else{
					//~ $parent.append('<span class= "formips onSuccess" ></span>');
					discribe_status = 1;
				}
			} else{discribe_status = 10;}
	
		}).keyup(function(){
			$(this).triggerHandler("blur");
		}).focus(function(){
			$(this).triggerHandler("blur");
		});			
		//经度
		check_longitude.blur(function(){
			var $parent = $(this).parent();		
			$parent.find(".formips").remove();
			if( $(this).is('#satellite_longitude') ){
				if( re3.test(this.value)){
					$parent.append('<span class= "formips onEror" >'+Longitude+validate_blank+'</span>');
					longitude_status = 0;
				}else if (!re2.test(this.value) && !re1.test(this.value)){
					$parent.append('<span class= "formips onEror" >'+Longitude+ validate_number+'</span>');
					longitude_status = 0;
				}else if ( Number(this.value) > 180 ){
					$parent.append('<span class= "formips onEror" >'+Longitude+validate_greater+'180'+'</span>');
					longitude_status = 0;
				}else if ( Number(this.value) < 0 ){
					$parent.append('<span class= "formips onEror" >'+Longitude+validate_less+'0'+'</span>');
					longitude_status = 0;
				}else{
					//~ $parent.append('<span class= "formips onSuccess" ></span>');
					longitude_status = 1;
				}
			} else{}
		}).keyup(function(){
		$(this).triggerHandler("blur");
		}).focus(function(){
		$(this).triggerHandler("blur");
		});
		
		//信标	
		check_beacon.blur(function(){
			var $parent = $(this).parent();		
			$parent.find(".formips").remove();
			if( $(this).is('#beacon') ){
				if($( '#redirect_dialogtestlist input:eq(1)' ).val()=='87.5' && $( '#redirect_dialogtestlist select:eq(0)' ).val()=='E' && $( '#redirect_dialogtestlist select:eq(1)' ).val()=='H'){
					beacon_status = 1;
				}else{
					if( re3.test(this.value)){
						$parent.append('<span class= "formips onEror" >'+Beacon+validate_blank+'</span>');
						beacon_status = 0;
					}else if (!re2.test(this.value) && !re1.test(this.value)){
						$parent.append('<span class= "formips onEror" >'+Beacon+validate_number+'</span>');
						beacon_status = 0;
					}else{
						//~ $parent.append('<span class= "formips onSuccess" ></span>');
						beacon_status = 1;
					}
				}
			} else{}
		}).keyup(function(){
			$(this).triggerHandler("blur");
		}).focus(function(){
			$(this).triggerHandler("blur");
		});	


		//符号速率
		check_rf_rx_symbol.blur(function(){	
			var $parent = $(this).parent();
			$parent.find(".formips").remove();
			if ($(this).is('#rf_rx_symbol_divide')){
				if( re3.test(this.value)){
					$parent.append('<span class= "formips onEror" >'+RXSymbolRate+validate_blank+'</span>');
					rf_rx_symbol_status = 0;
				}else if (!re2.test(this.value) && !re1.test(this.value)){
					$parent.append('<span class= "formips onEror" >'+RXSymbolRate+validate_number+'</span>');
					rf_rx_symbol_status = 0;
				}else if ( !re2.test(this.value) && re1.test(this.value) ){
					$parent.append('<span class= "formips onEror" >'+RXSymbolRate+validate_integer+'</span>');
					rf_rx_symbol_status = 0;
				}else if( Number(this.value) < 500 ){
					$parent.append('<span class= "formips onEror" >'+RXSymbolRate+validate_less+'500'+'</span>');
					rf_rx_symbol_status = 0;
				}else if( 500000 < Number(this.value) ){
					$parent.append('<span class= "formips onEror" >'+RXSymbolRate+validate_greater+'500000'+'</span>');
					rf_rx_symbol_status = 0;
				}else{
					//~ $parent.append('<span class= "formips onSuccess" ></span>');
					rf_rx_symbol_status = 1;
				}
			} else{}
		}).keyup(function(){
			$(this).triggerHandler("blur");
		}).focus(function(){
			$(this).triggerHandler("blur");
		});	

		//接收频率
		check_rf_rx_freq.blur(function(){
			var $parent = $(this).parent();
			$parent.find(".formips").remove();
			if ($(this).is('#rf_rx_freq_divide')){
				if( re3.test(this.value)){
					$parent.append('<span class= "formips onEror" >'+RXFrequency+validate_blank+'</span>');
					rf_rx_freq_status = 0;
				}else if (!re2.test(this.value) && !re1.test(this.value)){
					$parent.append('<span class= "formips onEror" >'+RXFrequency+validate_number+'</span>');
					rf_rx_freq_status = 0;
				}else if( Number(this.value) < 3 ){
					$parent.append('<span class= "formips onEror" >'+RXFrequency+validate_less+'3'+'</span>');
					rf_rx_freq_status = 0;
				}else if( 22 < Number(this.value) ){
					$parent.append('<span class= "formips onEror" >'+RXFrequency+validate_greater+'22'+'</span>');
					rf_rx_freq_status = 0;
				}else{
					//~ $parent.append('<span class= "formips onSuccess" ></span>');
					rf_rx_freq_status = 1;
				}
			} else{}
		}).keyup(function(){
			$(this).triggerHandler("blur");
		}).focus(function(){
			$(this).triggerHandler("blur");
		});		
};

	/*edit卫星按钮*/
	$( 'body' ).delegate( '#editItem', 'click', function( e ){
		$("button[name=editItem]").bind("click",function(){
			$.alert(only_one);
			return false;
		});
		$('.addbtn').hide();
		var trarr=[];
		var that = this,
			$this = $( that );
		var tpl = $( '#edit_item' ).html(),
			form = $( '#redirect_dialogtestlist' ),
			btnSubmit = $( '#redirect_submitbandlist1' );
		editItem_discribe = $this.attr('editItem_discribe');
		console.log('editItem_discribe'+editItem_discribe);
		if(editItem_discribe==satellite_name_now_main || editItem_discribe==satellite_name_now_back){
			$.alert(config_again);
		}	
		var editItem_satellite_longitude_EW_all = $this.attr('editItem_satellite_longitude_EW_all');
		var editItem_beacon = $this.attr('editItem_beacon');	
		var editItem_satellite_polarization_mode_rx = $this.attr('editItem_satellite_polarization_mode_rx');
		var editItem_rf_rx_symbol_divide = $this.attr('editItem_rf_rx_symbol_divide');
		var editItem_rf_rx_freq_divide = $this.attr('editItem_rf_rx_freq_divide');
		var editItem_system_23 = $this.attr('editItem_system_23');
		var editItem_rolloff = $this.attr('editItem_rolloff');
		if(editItem_system_23=='Anovo2.0'){
			editItem_system_23='2';
		}else if(editItem_system_23=='Anovo3.0'){
			editItem_system_23='3';
		}else if(editItem_system_23=='Anovo4.0'){
			editItem_system_23='4';
		}
		if(editItem_rolloff =='0.05'){
			editItem_rolloff='105'
		}else if(editItem_rolloff =='0.1'){
			editItem_rolloff='110'
		}else if(editItem_rolloff =='0.15'){
			editItem_rolloff='115'
		}else if(editItem_rolloff =='0.2'){
			editItem_rolloff='120'
		}else if(editItem_rolloff =='0.25'){
			editItem_rolloff='125'
		}else if(editItem_rolloff =='0.35'){
			editItem_rolloff='135'
		}else if((editItem_rolloff =='No') || (editItem_rolloff =='无')){
			editItem_rolloff='100'
		}else{
			editItem_rolloff='105';
		}	
		var editItem_satellite_longitude_EW;
		if(editItem_satellite_longitude_EW_all.search('West')>=0 || editItem_satellite_longitude_EW_all.search('西经')>=0)
		{
			editItem_satellite_longitude_EW='W';
		}
		else if(editItem_satellite_longitude_EW_all.search('East')>=0 || editItem_satellite_longitude_EW_all.search('东经')>=0)
		{
			editItem_satellite_longitude_EW='E';
		}
		var editItem_satellite_longitude=editItem_satellite_longitude_EW_all.match(/\d+(\.\d+)?/g);
		editItem_satellite_longitude=editItem_satellite_longitude[0];

		if(editItem_satellite_polarization_mode_rx.search('Right')>=0 || editItem_satellite_polarization_mode_rx.search('右旋')>=0)
		{
			editItem_satellite_polarization_mode_rx='R';
		}
		else if(editItem_satellite_polarization_mode_rx.search('Left')>=0 || editItem_satellite_polarization_mode_rx.search('左旋')>=0)
		{
			editItem_satellite_polarization_mode_rx='L';
		}
		else if(editItem_satellite_polarization_mode_rx.search('Horizontal')>=0 || editItem_satellite_polarization_mode_rx.search('水平')>=0)
		{
			editItem_satellite_polarization_mode_rx='H';
		}
		else if(editItem_satellite_polarization_mode_rx.search('Vertical')>=0 || editItem_satellite_polarization_mode_rx.search('垂直')>=0)
		{
			editItem_satellite_polarization_mode_rx='V';
		}		
		tmp_tr=	$("#"+editItem_discribe).html();	
		$("#"+editItem_discribe).html(tpl);	
			
		$( 'input[name=discribe]' ).val(editItem_discribe);	
		$( '#satellite_longitude_EW' ).val(editItem_satellite_longitude_EW);				
		$( 'input[name=satellite_longitude]' ).val(editItem_satellite_longitude);	
		$( '#satellite_polarization_mode_rx' ).val(editItem_satellite_polarization_mode_rx);	
		$( 'input[name=beacon]' ).val(editItem_beacon);	
		$( 'input[name=rf_rx_symbol_divide]' ).val(editItem_rf_rx_symbol_divide);
		$( 'input[name=rf_rx_freq_divide]' ).val(editItem_rf_rx_freq_divide);
		$( '#system_23' ).val(editItem_system_23);
		$( '#rolloff' ).val(editItem_rolloff);
		check_status();
		if($('#language_three').val()=="zh"){
			$('.Cancel').html("取消");
			$('.Edit').html("修改");
			$('.Save').html("保存");
			$('.Delete').html("删除");
			$('.Add').html("添加");
			$('.East').html("东经");
			$('.West').html("西经");
			$('.Right').html("右旋");
			$('.Left').html("左旋");
			$('.Vertical').html("垂直");
			$('.Horizontal').html("水平");
			$('.No').html("无");
		}else if($('#language_three').val()=="en"){
			$('.Cancel').html("Cancel");
			$('.Edit').html("Edit");
			$('.Save').html("Save");
			$('.Delete').html("Delete");
			$('.Add').html("Add");
			$('.East').html("East");
			$('.West').html("West");
			$('.Right').html("Right");
			$('.Left').html("Left");
			$('.Vertical').html("Vertical");
			$('.Horizontal').html("Horizontal");
			$('.No').html("None");
		}else if($('#language_three').val()=="zh_HK"){
			$('.Cancel').html("取消");
            $('.Edit').html("修改");
            $('.Save').html("保存");
            $('.Delete').html("刪除");
            $('.Add').html("添加");
            $('.East').html("東經");
            $('.West').html("西經");
            $('.Right').html("右旋");
            $('.Left').html("左旋");
            $('.Vertical').html("垂直");
            $('.Horizontal').html("水準");
            $('.No').html("無");
		}
	});//	$( 'body' ).delegate( '#editItem', 'click',

	
	/*edit卫星资源到配置文件并生效*/
	$( 'body' ).delegate( '#redirect_submitbandlist1', 'click', function( e ){
		check_discribe.trigger('blur');
		check_longitude.trigger('blur');
		check_beacon.trigger('blur');
		check_rf_rx_symbol.trigger('blur');
		check_rf_rx_freq.trigger('blur');			
		console.log(222);
		e.preventDefault();
		var form = e.target, 
			formName = form.name,
			action = this.action,
			discribe1 = $( 'input[name=discribe]' ).val(),	
			satellite_longitude_EW1 = $( '#satellite_longitude_EW' ).val(),				
			satellite_longitude1 = $( 'input[name=satellite_longitude]' ).val(),	
			satellite_polarization_mode_rx1 = $( '#satellite_polarization_mode_rx' ).val(),	
			beacon1 = $( 'input[name=beacon]' ).val();
			rf_rx_symbol_divide1 = $( 'input[name=rf_rx_symbol_divide]' ).val();
			rf_rx_freq_divide1 = ($( 'input[name=rf_rx_freq_divide]' ).val())*1000000;
			system_231 = $( '#system_23' ).val();	
			rolloff1 = $( '#rolloff' ).val();	
		if (satellite_longitude_EW1=='E'  && satellite_longitude1=='87.5' && satellite_polarization_mode_rx1=='H')	{
			beacon=0;
		}	
		if (satellite_longitude_EW1=='W'){
			satellite_longitude1=0-satellite_longitude1;
		}	
		console.log(discribe1);
		var requestData,
		requestURL = '/action/satelliteSet';
		requestData = {
			editItem_discribe:editItem_discribe,
			discribe:discribe1,
			satellite_longitude_EW: satellite_longitude_EW1,
			satellite_longitude: satellite_longitude1,
			satellite_polarization_mode_rx: satellite_polarization_mode_rx1,	
			beacon:beacon1,
			rf_rx_symbol_divide:rf_rx_symbol_divide1,
			rf_rx_freq_divide:rf_rx_freq_divide1,
			rolloff:rolloff1,
			system_23:system_231
		};
		console.log(555);
		if(satellite_longitude_EW1=='W'){satellite_longitude1=-satellite_longitude1}
		console.log(longitude_status);
		if ( discribe_status == 1 && longitude_status == 1  && beacon_status == 1 && rf_rx_symbol_status == 1 && rf_rx_freq_status == 1) {
			console.log(111);
			//重复检测
			for (var i = 0; i < num; i++) 
			{   
				if(discribe1 == old_discribe[i] && satellite_longitude1 ==old_satellite_longitude[i] && satellite_polarization_mode_rx1 ==old_satellite_polarization_mode_rx[i] 
					&& beacon1 ==old_beacon[i] && rf_rx_freq_divide1 ==old_rf_rx_freq_divide[i] && rf_rx_symbol_divide1 ==old_rf_rx_symbol_divide[i] && system_23 ==old_system_23[i]&& rolloff ==old_rolloff[i])
					{
					$.alert( same_satellite);
					return;
				}				
			}
			num=0;	    
			$.getJSON( requestURL, requestData, function( rsp ){
				if ( rsp.code == 0 ) {
					$.alert(setup_suc, function(){
					location.reload( true );
					}).lock();
				}else{
					$.alert(setup_failed).lock();
				}
				
			});//$.getJSON( requestURL, requestData, function( rsp ){
		}// if ( discribe_status == 1 && longitude_status == 1  ) 
	});	//$( 'body' ).delegate( '#redirect_listAdd', 'submit', function( e ){


	/*add卫星按钮*/
	$( 'body' ).delegate( '#redirect_addoneitem', 'click', function( e ){
		e.preventDefault();    			
		$("button[name=editItem]").bind("click",function(){
			$.alert(only_one);
			return false;
		});
		$('.addbtn').hide();
		$('.submitbtn').fadeIn();
		 var tpl = $( '#redirect_tpldevitem' ).html(),
			form = $( '#redirect_dialogtestlist' ),
			btnSubmit = $( '#redirect_submitbandlist' ),
			lastidx = (function(){
				if ( form.find('tr').length > 0 ) {
					return form.find('tr:last').attr( 'data-idx' );
				}
				return 0;
			}()),
			
			lastidx = parseInt( lastidx, 10 ),
			item = tpl.tmpl({
				idx: lastidx + 1
			  //  ipprefix:  lanipaddress
			});
		var  index = form.append( item );
		check_status();	
		if($('#language_three').val()=="zh"){
			$('.Cancel').html("取消");
			$('.Edit').html("修改");
			$('.Save').html("保存");
			$('.Delete').html("删除");
			$('.Add').html("添加");
			$('.East').html("东经");
			$('.West').html("西经");
			$('.Right').html("右旋");
			$('.Left').html("左旋");
			$('.Vertical').html("垂直");
			$('.Horizontal').html("水平");
			$('.No').html("无");
		}else if($('#language_three').val()=="en"){
			$('.Cancel').html("Cancel");
			$('.Edit').html("Edit");
			$('.Save').html("Save");
			$('.Delete').html("Delete");
			$('.Add').html("Add");
			$('.East').html("East");
			$('.West').html("West");
			$('.Right').html("Right");
			$('.Left').html("Left");
			$('.Vertical').html("Vertical");
			$('.Horizontal').html("Horizontal");
			$('.No').html("None");
		}else if($('#language_three').val()=="zh_HK"){
			$('.Cancel').html("取消");
            $('.Edit').html("修改");
            $('.Save').html("保存");
            $('.Delete').html("刪除");
            $('.Add').html("添加");
            $('.East').html("東經");
            $('.West').html("西經");
            $('.Right').html("右旋");
            $('.Left').html("左旋");
            $('.Vertical').html("垂直");
            $('.Horizontal').html("水準");
            $('.No').html("無");
		}
	});//	$( 'body' ).delegate( '#redirect_addoneitem', 'click', function

	/*add添加卫星资源到配置文件并生效*/
	$( 'body' ).delegate( '#redirect_listAdd', 'submit', function( e ){
	check_discribe.trigger('blur');
	check_longitude.trigger('blur');
	check_beacon.trigger('blur');
	check_rf_rx_symbol.trigger('blur');
	check_rf_rx_freq.trigger('blur');			
		e.preventDefault();
		var form = e.target, 
			formName = form.name,
			action = this.action,
			discribe = $( 'input[name=discribe]' ).val(),	
			satellite_longitude_EW = $( '#satellite_longitude_EW' ).val(),				
			satellite_longitude = $( 'input[name=satellite_longitude]' ).val(),	
			satellite_polarization_mode_rx = $( '#satellite_polarization_mode_rx' ).val(),	
			beacon = $( 'input[name=beacon]' ).val(),
			rf_rx_symbol_divide = $( 'input[name=rf_rx_symbol_divide]' ).val();
			system_23 = $( '#system_23' ).val();	
			rolloff = $( '#rolloff' ).val();	
			rf_rx_freq_divide = $( 'input[name=rf_rx_freq_divide]' ).val();
		if (satellite_longitude_EW=='E'  && satellite_longitude=='87.5' && satellite_polarization_mode_rx=='H')	{
			beacon=0;
		}	
		if (satellite_longitude_EW=='W'){
			satellite_longitude=0-satellite_longitude;
		}	
		var requestData,
			requestURL = '/action/satelliteSet';
			requestData = {
				editItem_discribe:'zytest',
				discribe:discribe,
				satellite_longitude_EW: satellite_longitude_EW,
				satellite_longitude: satellite_longitude,
				satellite_polarization_mode_rx: satellite_polarization_mode_rx,	
				beacon:beacon,
				rf_rx_symbol_divide:rf_rx_symbol_divide,
				rf_rx_freq_divide:rf_rx_freq_divide	*1000000,
				rolloff:rolloff,		
				system_23:system_23		
			};
		if ( discribe_status == 1 && longitude_status == 1  && beacon_status == 1 && rf_rx_symbol_status == 1 && rf_rx_freq_status == 1) {
			//重复检测			
			for (var i = 0; i < num; i++) 
			{   
				if ( discribe == old_discribe[i] ) {
						$.alert( same_description );
						return;
				}else{
					if (satellite_longitude ==old_satellite_longitude[i]  && satellite_polarization_mode_rx ==old_satellite_polarization_mode_rx[i] && beacon ==old_beacon[i] 
						&& rf_rx_freq_divide ==old_rf_rx_freq_divide[i] && rf_rx_symbol_divide ==old_rf_rx_symbol_divide[i] && system_23 ==old_system_23[i]&& rolloff ==old_rolloff[i])
					{
						$.alert(same_satellite);
						return;
						
					}
				}	
			}

			$.getJSON( requestURL, requestData, function( rsp ){
				if ( rsp.code == 0 ) {
					//$.pub( 'wait', {id: '#redirect_submitbandlist'} );
					$.alert(setup_suc, function(){
					location.reload( true );
					}).lock();
				}else{
					$.alert(setup_failed).lock();
				}
				
			});//$.getJSON( requestURL, requestData, function( rsp ){
		}// if ( discribe_status == 1 && longitude_status == 1  ) 
	});	//$( 'body' ).delegate( '#redirect_listAdd', 'submit', function( e ){	

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
		satellite_getTestList(next_page);
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
		satellite_getTestList(back_page);
	}
	else
	{
		$.alert(FirstPage);
	}						
});
