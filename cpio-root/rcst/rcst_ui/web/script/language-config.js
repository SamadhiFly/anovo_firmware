var type;
function langget() {
	$.ajax({
		url: '/action/langGetTest',
		type: "POST",
		dataType: "json",
		async: false,
		cache: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				type = rsp.langtype;
				$('#language_three').val(type);
				// if (rsp.langtype == "en"){
				// 		trans_en();
				// }else{
				// 		trans_zh();	
				// }
				if (rsp.langtype == "en") {
					trans_en();
				} else if (rsp.langtype == "zh") {
					trans_zh();
				} else if (rsp.langtype == "zh_HK") {
					trans_zh_HK();
				}
			}
		},
		error: function () {
			trans_en();
			console.log("error");
		}
	});
}
function langset() {
	var language_three = $('#language_three').val();
	if (language_three == "en") {
		type = "en";
		trans_en();
		$('#nav li').css("margin-right", "5px");
	} else if (language_three == "zh") {
		type = "zh";
		trans_zh();
		$('#nav li').css("margin-right", "35px");
	} else if (language_three == "zh_HK") {
		type = "zh_HK";
		trans_zh_HK();
		$('#nav li').css("margin-right", "35px");
	}
	// if (type == "zh"){
	// 		type = "en";
	// 		trans_en();
	// }else{
	// 		 type = "zh";
	// 		 trans_zh();
	// }
	$.ajax({
		url: '/action/langSetTest',
		data: { type: type },
		type: "POST",
		dataType: "json",
		async: true,
		success: function (rsp) {
			location.reload(true);
			//todo
		},
		error: function () {
			console.log("error2");
		}
	});
}	
