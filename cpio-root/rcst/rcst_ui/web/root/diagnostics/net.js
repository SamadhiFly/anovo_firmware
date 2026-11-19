langget();
rcstTypeGet();
if (rcstType == 2) {
	$('#mesh_status').show();
}
// dialog confirm
(function ($) {
	$.alert = function (content, ok) {
		ok = ok || function () { };
		return $.dialog({
			width: 390,
			padding: '25px 30px',
			title: speedTest,
			content: content,
			ok: ok,
			cancel: false
		});
	}
})(jQuery);

if (zd_version == 4) {
	$('#SpeedTestpart').show();
} else {
	$('#SpeedTestpart').hide();
}
function speedtest() {
	$.ajax({
		url: '/action/speedStatusGet',
		type: "POST",
		dataType: "json",
		async: false,
		success: function (rsp) {
			if (rsp.code == 0) {
				var rcst_current_status = rsp.rcst_current_status;
				var destip = rsp.destip;
				var port = rsp.port;
				var lang = rsp.lang;
				console.log(destip + port);
				if (rcst_current_status == '4') {
					if (lang != 'en') {
						var url = "http://" + destip + ":" + port + "/" + "?lang=zh_cn";
						console.log(url);
						window.open(url);
					} else {
						var url = "http://" + destip + ":" + port + "/" + "?lang=en";
						console.log(url);
						window.open(url);
					}
				} else {
					$.alert(speedMes);
				}
			} else { }
		},
		error: function () {
			console.log("speedStatusGet error");
		}
	});
}
