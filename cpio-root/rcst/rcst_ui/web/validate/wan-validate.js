var ip_status = 0;
var mask_status = 0;
var user_status = 0;
var passwd_status = 0;
re = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/;
re1 = /^-?[0-9]+\.[0-9]+ *$/;
re2 = /^-?[0-9]+ *$/;
re3 = /^ *$/;
re4=/^\w+$/;  
$('input[title=static_ip]').blur(function(){
var $parent = $(this).parent();
$parent.find('span[title=formips]').remove();
if( re3.test(this.value)){
	$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
	ip_status = 0;
}else if (!re.test(this.value)){
	$parent.append('<span title="formips" class= "onEror" >'+validate_ip+'</span>');
	ip_status = 0;
}else{
	$parent.append('<span title="formips" class= "onSuccess" ></span>');
	ip_status = 1;
}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});

$('input[title=static_mask]').blur(function(){
var $parent = $(this).parent();
$parent.find('span[title=formips]').remove();
if( re3.test(this.value)){
	$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
	mask_status = 0;
}else if (!re.test(this.value)){
	$parent.append('<span title="formips" class= "onEror" >'+validate_ip+'</span>');
	mask_status = 0;
}else{
	$parent.append('<span title="formips" class= "onSuccess" ></span>');
	mask_status = 1;
}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});

$('input[title=pppoe_user]').blur(function(){
var $parent = $(this).parent();
$parent.find('span[title=formips]').remove();
if( re3.test(this.value)){
	$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
	user_status = 0;
}else if (!re4.test(this.value)){
	$parent.append('<span title="formips" class= "onEror" >'+validate_input+'</span>');
	user_status = 0;
}else{
	$parent.append('<span title="formips" class= "onSuccess" ></span>');
	user_status = 1;
}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});

$('input[title=pppoe_pass]').blur(function(){
var $parent = $(this).parent();
$parent.find('span[title=formips]').remove();
if( re3.test(this.value)){
	$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
	passwd_status = 0;
}else if (!re4.test(this.value)){
	$parent.append('<span title="formips" class= "onEror" >'+validate_input+'</span>');
	user_status = 0;
}else{
	$parent.append('<span title="formips" class= "onSuccess" ></span>');
	passwd_status = 1;
}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});
