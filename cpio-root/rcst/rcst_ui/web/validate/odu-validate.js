var power_status = 0;
var max_power_status = 0;
var mesh_power_status = 0;
var tx_freq_status = 0;
var tx_symbol_status = 0;
var link_delay_status = 0;
var longitude_status = 0;
var latitude_status = 0;
var rx_local_status = 0;
var tx_local_status = 0;
var rl_freq_status = 0;
var divide_freq_status = 0;
var divide_symbol_status = 0;
var boda_gain_status=0;
var boda_freq_status = 0;
var boda_symbol_status = 0;
var src_ip_status = 0;
var dst_ip_status = 0;
var port_status = 0;
var veh_src_status = 0;
var veh_dst_status = 0;
var veh_port_status = 0;

re1 = /^-*[0-9]+\.[0-9]+ *$/;
re2 = /^-?[0-9]+ *$/;
re3 = /^ *$/;
re4 = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/;
re5 =/^\-0/;
//divide接收频率
$('input[title=rf_rx_freq_divide]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if(re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		divide_freq_status = 0;	
	}else if (!re1.test(this.value) && !re2.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
		divide_freq_status = 0;	
	}else if (Number(this.value) > 20.2){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 20.2'+'</span>');
		divide_freq_status = 0;		
	}else if (Number(this.value) < 17.8){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+' 17.8'+'</span>');
		divide_freq_status = 0;		
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		divide_freq_status = 1;
	}						
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});
//divide符号速率
$('input[title=rf_rx_symbol_divide]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		divide_symbol_status = 0;
	}else if (!re2.test(this.value) && !re1.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
		divide_symbol_status = 0;
	}else if ( !re2.test(this.value) && re1.test(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_integer+'</span>');
		divide_symbol_status = 0;
	}else if( Number(this.value) < 300 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+' 300'+'</span>');
		divide_symbol_status = 0;
	}else if( 500000 < Number(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 500000'+'</span>');
		divide_symbol_status = 0;
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		//'+'<img src="<%=resource/icons/ico_duigou.png" />'+'
		divide_symbol_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});	



//boda增益
$('input[title=gain_switch]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		boda_gain_status = 0;
		 console.log("gain_switch blank");
	}else if (!re1.test(this.value) && !re2.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
		boda_gain_status = 0;
		console.log("gain_switch number");
	}else if( Number(this.value) < 37 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+' 18.3'+'</span>');
		boda_gain_status = 0;
		console.log("gain_switch less");
	}else if( 57 < Number(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 20.2'+'</span>');
		boda_gain_status = 0;
		console.log("gain_switch greater");
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		boda_gain_status = 1;
		console.log(boda_gain_status);
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});
//boda接收频率
$('input[title=rf_rx_freq_boda]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		boda_freq_status = 0;
	}else if (!re1.test(this.value) && !re2.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
		boda_freq_status = 0;
	}else if( Number(this.value) < 18.3 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+' 18.3'+'</span>');
		boda_freq_status = 0;
	}else if( 20.2 < Number(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 20.2'+'</span>');
		boda_freq_status = 0;
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		boda_freq_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});
//boda符号速率
$('input[title=rf_rx_symbol_boda]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		boda_symbol_status = 0;
	}else if (!re2.test(this.value) && !re1.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
		boda_symbol_status = 0;
	}else if ( !re2.test(this.value) && re1.test(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_integer+'</span>');
		boda_symbol_status = 0;
	}else if( Number(this.value) < 300 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+' 300'+'</span>');
		boda_symbol_status = 0;
	}else if( 500000 < Number(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 500000'+'</span>');
		boda_symbol_status = 0;
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		//'+'<img src="<%=resource/icons/ico_duigou.png" />'+'
		boda_symbol_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});	

//终端最大发送功率	
$('input[title=tx_max_power]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if((rcstType == 0) && (transceiverType=="divide")){
		//max_power_value = this.value;
		if( re3.test(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
				max_power_status = 0;
			}else if (!re2.test(this.value) && !re1.test(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
				max_power_status = 0;
			}else if ( !re2.test(this.value) && re1.test(this.value) ){
				$parent.append('<span title="formips" class= "onEror" >'+validate_integer+'</span>');
				max_power_status = 0;
			}else if( Number(this.value) < Number(-47)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_less+' -47'+'</span>');
				max_power_status = 0;
			}else if( 0 < Number(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 0'+'</span>');
				max_power_status = 0;
			}else{
				$parent.append('<span title="formips" class= "onSuccess" ></span>');
				max_power_status = 1;
			}
	} else if((rcstType == 0)  && transceiverType=="boda"){
		//max_power_value = this.value;
		if( re3.test(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
				max_power_status = 0;
			}else if (!re2.test(this.value) && !re1.test(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
				max_power_status = 0;
			}else if ( !re2.test(this.value) && re1.test(this.value) ){
				$parent.append('<span title="formips" class= "onEror" >'+validate_integer+'</span>');
				max_power_status = 0;
			}else if( Number(this.value) < Number(-41)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_less+' -41'+'</span>');
				max_power_status = 0;
			}else if( 0 < Number(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 0'+'</span>');
				max_power_status = 0;
			}else{
				$parent.append('<span title="formips" class= "onSuccess" ></span>');
				max_power_status = 1;
			}
	}else if((rcstType == 1) || (rcstType == 2)){
		//max_power_value = this.value;
		if( re3.test(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
				max_power_status = 0;
			}else if (!re2.test(this.value) && !re1.test(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
				max_power_status = 0;
			}else if ( !re2.test(this.value) && re1.test(this.value) ){
				$parent.append('<span title="formips" class= "onEror" >'+validate_integer+'</span>');
				max_power_status = 0;
			}else if( Number(this.value) < Number(-47)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_less+' -47'+'</span>');
				max_power_status = 0;
			}else if( 0 < Number(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 0'+'</span>');
				max_power_status = 0;
			}else{
				$parent.append('<span title="formips" class= "onSuccess" ></span>');
				max_power_status = 1;
			}			
	}else{}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});

//终端发送功率
$('input[title=tx_power]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if((rcstType == 0) && (transceiverType=="divide")){
		if( re3.test(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
				power_status = 0;
			}else if (!re2.test(this.value) && !re1.test(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
				power_status = 0;
			}else if (!re2.test(this.value) && re1.test(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_integer+'</span>');
				power_status = 0;
			}else if( Number(this.value) < Number(-47)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_less+' -47'+'</span>');
				power_status = 0;
			}else if( 0 < Number(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 0'+'</span>');
				power_status = 0;
			}else{
				$parent.append('<span title="formips" class= "onSuccess" ></span>');
				power_status = 1;
			}
	} else if((rcstType == 0) && transceiverType=="boda" ){
		if( re3.test(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
				power_status = 0;
			}else if (!re2.test(this.value) && !re1.test(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
				power_status = 0;
			}else if ( !re2.test(this.value) && re1.test(this.value) ){
				$parent.append('<span title="formips" class= "onEror" >'+validate_integer+'</span>');
				power_status = 0;
			}else if( Number(this.value) < Number(-41)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_less+' -41'+'</span>');
				power_status = 0;
			}else if( 0 < Number(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 0'+'</span>');
				power_status = 0;
			}else{
				$parent.append('<span title="formips" class= "onSuccess" ></span>');
				power_status = 1;
			} 
	}else if((rcstType == 1) || (rcstType == 2)){
		if( re3.test(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
				power_status = 0;
			}else if (!re2.test(this.value) && !re1.test(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
				power_status = 0;
			}else if ( !re2.test(this.value) && re1.test(this.value) ){
				$parent.append('<span title="formips" class= "onEror" >'+validate_integer+'</span>');
				power_status = 0;
			}else if( Number(this.value) < Number(-47)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_less+' -47'+'</span>');
				power_status = 0;
			}else if( 0 < Number(this.value)){
				$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 0'+'</span>');
				power_status = 0;
			}else{
				$parent.append('<span title="formips" class= "onSuccess" ></span>');
				power_status = 1;
			} 			
	}else{}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});
		
//网状网功率
$('input[title=tx_power_mesh]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
			$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
			mesh_power_status = 0;
		}else if (!re2.test(this.value) && !re1.test(this.value)){
			$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
			mesh_power_status = 0;
		}else if ( !re2.test(this.value) && re1.test(this.value) ){
			$parent.append('<span title="formips" class= "onEror" >'+validate_integer+'</span>');
			mesh_power_status = 0;
		}else if( Number(this.value) < Number(-44) ){
			$parent.append('<span title="formips" class= "onEror" >'+validate_less+' -44'+'</span>');
			mesh_power_status = 0;
		}else if( 0 < Number(this.value) ){
			$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 0'+'</span>');
			mesh_power_status = 0;
		}else{
			$parent.append('<span title="formips" class= "onSuccess" ></span>');
			mesh_power_status = 1;
		} 
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});		

//高级终端发送频率
$('input[title = tx_p2p_freq]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		tx_freq_status = 0;
	}else if (!re2.test(this.value) && !re1.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
		tx_freq_status = 0;
	}else if( Number(this.value) < 0 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+' 0'+'</span>');
		tx_freq_status = 0;
	}else if( 30 < Number(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 30'+'</span>');
		tx_freq_status = 0;
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		//'+'<img src="<%=resource/icons/ico_duigou.png" />'+'
		tx_freq_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});			
//高级终端发送符号速率
$('input[title = tx_p2p_symbol]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		tx_symbol_status = 0;
	}else if (!re2.test(this.value) && !re1.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
		tx_symbol_status = 0;
	}else if ( !re2.test(this.value) && re1.test(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_integer+'</span>');
		tx_symbol_status = 0;
	}else if( Number(this.value) < 500 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+' 500'+'</span>');
		tx_symbol_status = 0;
	}else if( 41501 < Number(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 41500'+'</span>');
		tx_symbol_status = 0;
	}
	//else if(Number (this.value%350)!=0 ){
	//	$parent.append('<span title="formips" class= "onEror" >'+validate_350+'</span>');
	//	tx_symbol_status = 0;
	//}
	else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		//'+'<img src="<%=resource/icons/ico_duigou.png" />'+'
		tx_symbol_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});		

//链路延时
$('input[title = link_delay]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if (rcstType == 2){ 
		if( re3.test(this.value)){
			$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
			link_delay_status = 0;
		}else if (!re2.test(this.value) && !re1.test(this.value)){
			$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
			link_delay_status = 0;
		}else if ( !re2.test(this.value) && re1.test(this.value) ){
			$parent.append('<span title="formips" class= "onEror" >'+validate_integer+'</span>');
			link_delay_status = 0;
		}else if( Number(this.value) < 200000 && Number(this.value) != 0){
			$parent.append('<span title="formips" class= "onEror" >'+validate_less+' 200000'+'</span>');
			link_delay_status = 0;
		}else if( 350000 < Number(this.value) ){
			$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 350000'+'</span>');
			link_delay_status = 0;
		}else if( 0 == Number(this.value) ){
			link_delay_status = 1;
		}else{
			$parent.append('<span title="formips" class= "onSuccess" ></span>');
			//'+'<img src="<%=resource/icons/ico_duigou.png" />'+'
			link_delay_status = 1;
		}
	}else{
		if( re3.test(this.value)){
			$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
			link_delay_status = 0;
		}else if (!re2.test(this.value) && !re1.test(this.value)){
			$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
			link_delay_status = 0;
		}else if ( !re2.test(this.value) && re1.test(this.value) ){
			$parent.append('<span title="formips" class= "onEror" >'+validate_integer+'</span>');
			link_delay_status = 0;
		}else if( Number(this.value) < 400000 && Number(this.value) != 0){
			$parent.append('<span title="formips" class= "onEror" >'+validate_less+'400000'+'</span>');
			link_delay_status = 0;
		}else if( 600000 < Number(this.value) ){
			$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 600000'+'</span>');
			link_delay_status = 0;
		}else if( 0 == Number(this.value) ){
			link_delay_status = 1;
		}else{
			$parent.append('<span title="formips" class= "onSuccess" ></span>');
			//'+'<img src="<%=resource/icons/ico_duigou.png" />'+'
			link_delay_status = 1;
		}		
	}	
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});	
	
//天线经度
$('input[title = ANT_longitude]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		longitude_status = 0;
	}else if (!re2.test(this.value) && !re1.test(this.value) ||  re5.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
		longitude_status = 0;
	}else if( Number(this.value) < 0 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+' 0'+'</span>');
		longitude_status = 0;
	}else if( 180 < Number(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 180'+'</span>');
		longitude_status = 0;
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		//'+'<img src="<%=resource/icons/ico_duigou.png" />'+'
		longitude_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});	

//天线纬度
$('input[title = ANT_latitude]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		latitude_status = 0;
		}else if (!re2.test(this.value) && !re1.test(this.value) ||  re5.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
		latitude_status = 0;
	}else if( Number(this.value) < 0 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+' 0'+'</span>');
		latitude_status = 0;
	}else if( 90 < Number(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 90'+'</span>');
		latitude_status = 0;
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		//'+'<img src="<%=resource/icons/ico_duigou.png" />'+'
		latitude_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});		
	
//ip地址
$('input[title=src_ip]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		src_ip_status = 0;
	}else if (!re4.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_ip+'</span>');
		src_ip_status = 0;
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		src_ip_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});	

$('input[title=dst_ip]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		dst_ip_status = 0;
	}else if (!re4.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_ip+'</span>');
		dst_ip_status = 0;
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		dst_ip_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});

$('input[title=port]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		start_port_status = 0;
	}else if (!re2.test(this.value) && !re1.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
		start_port_status = 0;
	}else if ( !re2.test(this.value) && re1.test(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_integer+'</span>');
		start_port_status = 0;
	}else if ( Number(this.value) > 65536 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 65536'+'</span>');
		start_port_status = 0;
	}else if ( Number(this.value) < 0 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+' 0'+'</span>');
		start_port_status = 0;
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		port_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});	   

$('input[title=veh_src]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		veh_src_status = 0;
	}else if (!re4.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_ip+'</span>');
		veh_src_status = 0;
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		veh_src_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});


$('input[title=veh_dst]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		veh_dst_status = 0;
	}else if (!re4.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_ip+'</span>');
		veh_dst_status = 0;
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		veh_dst_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});

$('input[title=veh_port]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		veh_port_status = 0;
	}else if (!re2.test(this.value) && !re1.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
		veh_port_status = 0;
	}else if ( !re2.test(this.value) && re1.test(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_integer+'</span>');
		veh_port_status = 0;
	}else if ( Number(this.value) > 65536 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 65536'+'</span>');
		veh_port_status = 0;
	}else if ( Number(this.value) < 0 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+' 0'+'</span>');
		veh_port_status = 0;
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		veh_port_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});
