var ip_status = 0;
var mask_status = 0;
var gateway_status = 0;
re = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/;
re1 = /^-?[0-9]+\.[0-9]+ *$/;
re2 = /^-?[0-9]+ *$/;
re3 = /^ *$/; 
   
$('input[title=target]').blur(function(){
	
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if( re3.test(this.value)){
		$parent.append('<span class= "formips onEror" >'+validate_blank+'</span>');
		ip_status = 0;
	}else if (!re.test(this.value)){
		$parent.append('<span class= "formips onEror" >'+validate_ip+'</span>');
		ip_status = 0;
	}else{
		$parent.append('<span class= "formips onSuccess" ></span>');
		ip_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});

$('input[title=netmask]').blur(function(){
	alert("netmask");
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if( $(this).is('#netmask') ){
		if( re3.test(this.value)){
			$parent.append('<span class= "formips onEror" >'+validate_blank+'</span>');
			mask_status = 0;
		}else if (!re.test(this.value)){
			$parent.append('<span class= "formips onEror" >'+validate_ip+'</span>');
			mask_status = 0;
		}else{
			$parent.append('<span class= "formips onSuccess" ></span>');
			mask_status = 1;
		}
	} else{}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});
$('input[title=gateway]').blur(function(){
	alert("gateway");
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if( $(this).is('#gateway') ){
		if( re3.test(this.value)){
			$parent.append('<span class= "formips onEror" >'+validate_blank+'</span>');
			gateway_status = 0;
		}else if (!re.test(this.value)){
			$parent.append('<span class= "formips onEror" >'+validate_ip+'</span>');
			gateway_status = 0;
		}else{
			$parent.append('<span class= "formips onSuccess" ></span>');
			gateway_status = 1;
		}
	} else{}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});
