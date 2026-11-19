var main_status = 0;
var back_status = 0;
re = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/;
re1 = /^-?[0-9]+\.[0-9]+ *$/;
re2 = /^-?[0-9]+ *$/;
re3 = /^ *$/;      
$('input[title=dns_main_p2p]').blur(function(){
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if( re3.test(this.value)){
		$parent.append('<span class= "formips onEror" >'+validate_blank+'</span>');
		main_status = 0;
	}else if (!re.test(this.value)){
		$parent.append('<span class= "formips onEror" >'+validate_ip+'</span>');
		main_status = 0;
	}else{
		$parent.append('<span class= "formips onSuccess" ></span>');
		main_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});

$('input[title=dns_back_p2p]').blur(function(){
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if( re3.test(this.value)){
		$parent.append('<span class= "formips onEror" >'+validate_blank+'</span>');
		back_status = 0;
	}else if (!re.test(this.value)){
		$parent.append('<span class= "formips onEror" >'+validate_ip+'</span>');
		back_status = 0;
	}else{
		$parent.append('<span class= "formips onSuccess" ></span>');
		back_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});



