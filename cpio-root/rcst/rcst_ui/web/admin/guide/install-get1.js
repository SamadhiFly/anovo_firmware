rcstTypeGet();
langget();
// dialog alert
(function( $ ){
    $.alert = function( content, ok ){
        ok = ok || function(){};
        return $.dialog({
            width: 390,
            padding:'25px 30px',
            title: 'Prompt Message',
            content: content,
            ok: ok,
            cancel: false
        });
    }
})(jQuery);

//~ //动中通项目下有ACU
//~ if (itemType == 1){
	//~ $( '#item_ACU' ).show();
	//~ oduACUGet();//ACU数据
//~ }
oduLocationGet();//位置信息数据

installLocationidGet();

function installLocationidGet(){
	$.ajax({
		url: '/action/installLocationidGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			if(rsp.code == 0 ){
				if (installType == 0){
					$('#importinstall').show();
					var obj=document.getElementById("location_ID"); 
					for (var i =0; i<rsp.locationid_info.length; i++){
						obj.add(new Option(rsp.locationid_info[i].location_id ,  rsp.locationid_info[i].location_id))
					}
					$( '#location_ID' ).val(rsp.location_ID);						
				}else{
					$('#custominstall').show();
					if (rsp.locationid_info == "blank"){
						$( 'input[name="location_ID"]' ).val("");
					}else{
						$( 'input[name="location_ID"]' ).val(rsp.locationid_info);
					}					
				}
			}else if( rsp.code == -2 ){
				$.alert("There is no XML file!");
			}else{
				$.alert("Error!Please try again");
			}					
		},
		error:function(){
				console.log("locationIdGet error");
		}
	});	
}	
//位置信息
function oduLocationGet(){
	$.ajax({
		url: '/action/oduLocationGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			long_value_now = Number(rsp.long_value);
			lat_value_now = Number(rsp.lat_value);			
			$( '#ANT_longitude_EW' ).val(rsp.long_type);
			$( 'input[name="ANT_longitude"]' ).val(long_value_now);
			$( '#ANT_latitude_NS' ).val(rsp.lat_type);
			$( 'input[name="ANT_latitude"]' ).val(lat_value_now);			

			if (long_value_now >= 0 && long_value_now <= 180)
			{
				$( '#ANT_longitude_EW' ).val("E");
				$( 'input[name="ANT_longitude"]' ).val(long_value_now);
			}
			if (long_value_now >= -180 && long_value_now <= 0)
			{
				$( '#ANT_longitude_EW' ).val("W");
				$( 'input[name="ANT_longitude"]' ).val(-long_value_now);
			}
			if (lat_value_now >= 0 && lat_value_now <= 90)
			{
				$( '#ANT_latitude_NS' ).val("N");
				$( 'input[name="ANT_latitude"]' ).val(lat_value_now);
			}
			if (lat_value_now >= -90 && lat_value_now <= 0)
			{
				$( '#ANT_latitude_NS' ).val("S");
				$( 'input[name="ANT_latitude"]' ).val(-lat_value_now);
			}						
		},
		error:function(){
				console.log("oduLocationGet error");
		}
	});	
}

var set_flag_now;
//ACU
function oduACUGet(){	
	$.ajax({
		url: '/action/oduACUGet',
		type: "POST",
		dataType: "json",
		async: false,
		success : function(rsp){
			set_flag_now = rsp.set_flag;
			$( 'input[name="src_ip"]' ).val(rsp.src_ip);
			$( 'input[name="dst_ip"]' ).val(rsp.dst_ip);
			$( 'input[name="port"]' ).val(rsp.port);
			if (set_flag_now == 1){
				$( '#src_ip' ).attr("disabled", true);
				$( '#dst_ip' ).attr("disabled", true);
				$( '#port' ).attr("disabled", true);
				$( '#acu_status' ).html("close");	
			}else{
				$( '#src_ip' ).attr("disabled", false);
				$( '#dst_ip' ).attr("disabled", false);
				$( '#port' ).attr("disabled", false);				
				$( '#acu_status' ).html("open");
			}					
		},
		error:function(){
				console.log("oduACUGet error");
		}
	});	
}
