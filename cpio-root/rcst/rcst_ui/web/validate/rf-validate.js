var sig_freq_status = 0;
var power_status = 0;
var time_status = 0;
re1 = /^(\d+|\d*\.\d{1,7})$|^\.\d{1,7}$/;
re2 = /^-?[0-9]+ *$/;
re3 = /^ *$/;

$('input[title=sig_freq]').blur(function(){
var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if(re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		sig_freq_status = 0;	
	}else if (!re1.test(this.value) && !re2.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number_7+'</span>');
		sig_freq_status = 0;	
	}else if (Number(this.value) > 40){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+'40'+'</span>');
		sig_freq_status = 0;		
	}else if (Number(this.value) < 3){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+'3'+'</span>');
		sig_freq_status = 0;		
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		sig_freq_status = 1;					
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});

$('input[title=sig_power]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		power_status = 0;
	}else if (!re2.test(this.value) && !re1.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
		power_status = 0;
	}else if( Number(this.value) < -37 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+' -37'+'</span>');
		power_status = 0;
	}else if( 10 < Number(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 10'+'</span>');
		power_status = 0;
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
			power_status = 1;								
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});

$('input[title=sig_time]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		time_status = 0;
	}else if (!re2.test(this.value) && !re1.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
		time_status = 0;
	}else if( Number(this.value) < 1 ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+' 1'+'</span>');
		time_status = 0;
	}else if( 300 < Number(this.value) ){
		$parent.append('<span title="formips" class= "onEror" >'+validate_greater+' 300'+'</span>');
		time_status = 0;
	}else{
		$parent.append('<span title="formips" class= "onSuccess" ></span>');
		//'+'<img src="<%=resource/icons/ico_duigou.png" />'+'
		time_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});	
