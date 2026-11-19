var rx_local_status = 0;
var tx_local_status = 0;
var divide_freq_status = 0;
var divide_symbol_status = 0;
var boda_freq_status = 0;
var boda_symbol_status = 0;

re1 = /^-*[0-9]+\.[0-9]+ *$/;
re2 = /^-?[0-9]+ *$/;
re3 = /^ *$/;
re4 = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/;

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
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+'300'+'</span>');
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

//接收本振
$('input[title=rx_freq]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	switch (true) {
		case re3.test(this.value) :
			$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
			rx_local_status = 0;
			break;
		case !re1.test(this.value) && !re2.test(this.value) :
			$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
			rx_local_status = 0;
			break;
		case freqType == 1:
			if(Number(this.value) > 26.5){
				$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 26.5'+'</span>');
				rx_local_status = 0;
			}else if(Number(this.value) < 10){
				$parent.append('<span title="formips" class= "onEror" >'+validate_less+'10'+'</span>');
				rx_local_status = 0;
			}else{
				$parent.append('<span title="formips" class= "onSuccess" ></span>');
				rx_local_status = 1;
			}
			break;	
		case freqType == 2:
			if(Number(this.value) > 26.5){
				$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 26.5'+'</span>');
				rx_local_status = 0;
			}else if(Number(this.value) < 9){
				$parent.append('<span title="formips" class= "onEror" >'+validate_less+'9'+'</span>');
				rx_local_status = 0;
			}else{
				$parent.append('<span title="formips" class= "onSuccess" ></span>');
				rx_local_status = 1;
			}
			break;
		case freqType == 3:
			if(Number(this.value) > 10){
				$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 10'+'</span>');
				rx_local_status = 0;
			}else if(Number(this.value) < 4){
				$parent.append('<span title="formips" class= "onEror" >'+validate_less+'4'+'</span>');
				rx_local_status = 0;
			}else{
				$parent.append('<span title="formips" class= "onSuccess" ></span>');
				rx_local_status = 1;
			}
			break;	
		default: 
			$parent.append('<span title="formips" class= "onSuccess" ></span>');
			rx_local_status = 1;								
	}			
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});	

//发送本振
$('input[title=tx_freq]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	switch (true) {
		case re3.test(this.value) :
			$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
			tx_local_status = 0;
			break;
		case !re1.test(this.value) && !re2.test(this.value) :
			$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
			tx_local_status = 0;
			break;
		case freqType == 1:
			if(Number(this.value) > 40){
				$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 40'+'</span>');
				tx_local_status = 0;
			}else if(Number(this.value) < 26.5){
				$parent.append('<span title="formips" class= "onEror" >'+validate_less+'26.5'+'</span>');
				tx_local_status = 0;
			}else{
				$parent.append('<span title="formips" class= "onSuccess" ></span>');
				tx_local_status = 1;
			}
			break;	
		case freqType == 2:
			if(Number(this.value) > 26.5){
				$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 26.5'+'</span>');
				tx_local_status = 0;
			}else if(Number(this.value) < 9){
				$parent.append('<span title="formips" class= "onEror" >'+validate_less+'9'+'</span>');
				tx_local_status = 0;
			}else{
				$parent.append('<span title="formips" class= "onSuccess" ></span>');
				tx_local_status = 1;
			}
			break;
		case freqType == 3:
			if(Number(this.value) > 10){
				$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 10'+'</span>');
				tx_local_status = 0;
			}else if(Number(this.value) < 4){
				$parent.append('<span title="formips" class= "onEror" >'+validate_less+'4'+'</span>');
				tx_local_status = 0;
			}else{
				$parent.append('<span title="formips" class= "onSuccess" ></span>');
				tx_local_status = 1;
			}
			break;	
		default: 
			$parent.append('<span title="formips" class= "onSuccess" ></span>');
			tx_local_status = 1;								
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});	


var rl_freq_status = 0;
var boda_freq_status = 0;
var boda_symbol_status =0;

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
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+'18.3'+'</span>');
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
	}else if( Number(this.value) < 500 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+'500'+'</span>');
		boda_symbol_status = 0;
	}else if( 67500 < Number(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 67500'+'</span>');
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
