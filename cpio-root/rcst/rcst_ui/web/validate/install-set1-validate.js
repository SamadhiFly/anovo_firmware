var longitude_status = 0;
var latitude_status = 0;
var beamid_status = 0;
var src_ip_status = 0;
var dst_ip_status = 0;
var port_status = 0;
re1 = /^-*[0-9]+\.[0-9]+ *$/;
re2 = /^-?[0-9]+ *$/;
re3 = /^ *$/;
re4 = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/;
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
//天线经度
$('input[title=ANT_longitude]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		longitude_status = 0;
	}else if (!re2.test(this.value) && !re1.test(this.value)){
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
$('input[title=ANT_latitude]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_blank+'</span>');
		latitude_status = 0;
	}else if (!re2.test(this.value) && !re1.test(this.value)){
		$parent.append('<span title="formips" class= "onEror" >'+validate_number+'</span>');
		latitude_status = 0;
	}else if(Number(this.value) < 0){
		$parent.append('<span title="formips" class= "onEror" >'+validate_less+' 0'+'</span>');
		latitude_status = 0;
	}else if(90 < Number(this.value)){
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

//beamid
$('input[title=location_ID]').blur(function(){
	var $parent = $(this).parent();
	$parent.find('span[title=formips]').remove();
	if( re3.test(this.value)){
		$parent.append('<span title= "formips" class= "onEror">'+validate_blank+'</span>');
		beamid_status = 0;
	}else if (!re2.test(this.value) && !re1.test(this.value)){
		$parent.append('<span title= "formips" class= "onEror">'+validate_number+'</span>');
		beamid_status = 0;
	}else if ( !re2.test(this.value) && re1.test(this.value) ){
		$parent.append('<span title= "formips" class= "onEror">'+validate_integer+'</span>');
		beamid_status = 0;
	}else if(Number(this.value) < 0){
		$parent.append('<span title= "formips" class= "onEror">'+validate_less+' 0'+'</span>');
		beamid_status = 0;
	}else if(6 < Number(this.value)){
		$parent.append('<span title= "formips" class= "onEror">'+validate_greater+' 6'+'</span>');
		beamid_status = 0;
	}else{
		$parent.append('<span title= "formips" class= "onSuccess"></span>');
		//'+'<img src="<%=resource/icons/ico_duigou.png" />'+'
		beamid_status = 1;
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});
