// dialog alert
(function ($) {
	$.alert = function (content, ok) {
		ok = ok || function () { };
		return $.dialog({
			width: 390,
			padding: '25px 30px',
			title: ant_title,
			content: content,
			ok: ok,
			cancel: false
		});
	}
})(jQuery);

// dialog confirm
(function ($) {
	$.confirm = function (content, ok) {
		ok = ok || function () { };
		return $.dialog({
			width: 390,
			padding: '25px 30px',
			title: ant_title,
			okValue: OK,
			cancelValue: Cancel,
			content: content,
			ok: ok,
			cancel: function () { }
		});
	}
})(jQuery);

/*删除列表按钮*/
$('body').delegate('#redirect_submit_dellist', 'click', function (e) {
	console.log("redirect_submit_dellist");
	var that = this,
		$this = $(that),
		discribe = $this.attr('redirect_target_del'),
		ok = function () {
			//redirect_unbind_route.call( that, e, discribe);
			requestURL = '/action/ANT_del',
				requestData = {
					discribe: discribe
				};
			$.getJSON(requestURL, requestData, function (rsp) {
				if (rsp.code == 0) {
					$.alert(delete_success, function () {
						location.reload(true);
					}).lock();
				}
				else if (rsp.code == -1) {
					$.alert(antcannot_deleted);
					$('.addbtn').fadeIn();
					$('.submitbtn').hide();
				} else if (rsp.code == -2) {
					$.alert(delete_failed, function () {
						location.reload(true);
					}).lock();
				}
			});
		},
		cancel = function () { };
	$.confirm(remove_confirm, ok);
});

var LNB_count = 0;
var BUC_count = 0;
var add_flag = 0;

re1 = /^-*[0-9]+\.[0-9]+ *$/;
re2 = /^-?[0-9]+ *$/;
re3 = /^ *$/;
re4 = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/;
re5 = /^\w+$/;
re6 = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
var check_status = function () {
	console.log("check_status");
	//名称	
	$('input[title=ANT_discribe]').blur(function () {
		var $parent = $(this).parent();
		$parent.find(".formips").remove();
		if (re3.test($('#ANT_discribe').val())) {
			$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
			discribe_status = 3;
		} else if (!re5.test($('#ANT_discribe').val())) {
			$parent.append('<span class= "formips onEror" >' + validate_input + '</span>');
			discribe_status = 2;
		} else if ($('#ANT_discribe').val().length > 29) {
			$parent.append('<span class= "formips onEror" >' + Discribe + validate_length + '30' + '</span>');
			discribe_status = 4;
		} else {
			//~ $parent.append('<span class= "formips onSuccess" ></span>');
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	// 天线厂商 	
	$('input[title=antenna_manufacture]').blur(function () {
		var $parent = $(this).parent();
		$parent.find(".formips").remove();
		if (re3.test($('#antenna_manufacture').val())) {
			$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
			antenna_manufacture_status = 3;
		} else if (!re6.test($('#antenna_manufacture').val())) {
			$parent.append('<span class= "formips onEror" >' + validate_input_antenna + '</span>');
			antenna_manufacture_status = 2;
		} else {
			//~ $parent.append('<span class= "formips onSuccess" ></span>');
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	//ip地址
	$('input[title=src_ip]').blur(function () {
		var $parent = $(this).parent();
		$parent.find('span[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<span title="formips" class= "onEror" >' + validate_blank + '</span>');
		} else if (!re4.test(this.value)) {
			$parent.append('<span title="formips" class= "onEror" >' + validate_ip + '</span>');
		} else {
			//~ $parent.append('<span title="formips" class= "onSuccess" ></span>');
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	$('input[title=dst_ip]').blur(function () {
		var $parent = $(this).parent();
		$parent.find('span[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<span title="formips" class= "onEror" >' + validate_blank + '</span>');
		} else if (!re4.test(this.value)) {
			$parent.append('<span title="formips" class= "onEror" >' + validate_ip + '</span>');
		} else {
			//~ $parent.append('<span title="formips" class= "onSuccess" ></span>');
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	$('input[title=port]').blur(function () {
		var $parent = $(this).parent();
		$parent.find('span[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<span title="formips" class= "onEror" >' + validate_blank + '</span>');
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<span title="formips" class= "onEror" >' + validate_number + '</span>');
		} else if (!re2.test(this.value) && re1.test(this.value)) {
			$parent.append('<span title="formips" class= "onEror" >' + validate_integer + '</span>');
		} else if (Number(this.value) > 65536) {
			$parent.append('<span title="formips" class= "onEror" >' + validate_greater + ' 65536' + '</span>');
		} else if (Number(this.value) < 0) {
			$parent.append('<span title="formips" class= "onEror" >' + validate_less + ' 0' + '</span>');
		} else {
			//~ $parent.append('<span title="formips" class= "onSuccess" ></span>');;
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});


	//LNB1
	var LNB_freq1_status = 0;
	$('#LNB_freq1').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
			LNB_freq1_status = 0;
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
			LNB_freq1_status = 0;
		} else if (Number(this.value) > 43) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 43' + '</td>');
			LNB_freq1_status = 0;
		} else if (Number(this.value) < 3) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 3' + '</td>');
			LNB_freq1_status = 0;
		} else {
			LNB_freq1_status = 1;
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
		//1:c;0:kaku
		if (1 == Number(spectral_enable)) {
			if (LNB_freq1_status == 1) {
				var freqnow = Number($('#LNB_freq1').val());
				var freqstart = freqnow * 10000 - 21500;
				var freqend = freqnow * 10000 - 9500;
				$("#LNB_start1").val(freqstart / 10000);
				$("#LNB_end1").val(freqend / 10000);
				$("#LNB_start1").parent().find('td[title=formips]').remove();
				$("#LNB_end1").parent().find('td[title=formips]').remove();
			}
		} else {
			if (LNB_freq1_status == 1) {
				var freqnow = Number($('#LNB_freq1').val());
				var freqstart = freqnow * 10000 + 9500;
				var freqend = freqnow * 10000 + 21500;
				$("#LNB_start1").val(freqstart / 10000);
				$("#LNB_end1").val(freqend / 10000);
				$("#LNB_start1").parent().find('td[title=formips]').remove();
				$("#LNB_end1").parent().find('td[title=formips]').remove();
			}
		}
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	//LNB2
	var LNB_freq2_status = 0;
	$('#LNB_freq2').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
			LNB_freq2_status = 0;
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
			LNB_freq2_status = 0;
		} else if (Number(this.value) > 43) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 43' + '</td>');
			LNB_freq2_status = 0;
		} else if (Number(this.value) < 3) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 3' + '</td>');
			LNB_freq2_status = 0;
		} else {
			LNB_freq2_status = 1;
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
		//1:c;0:kaku
		if (1 == Number(spectral_enable)) {
			if (LNB_freq2_status == 1) {
				var freqnow = Number($('#LNB_freq2').val());
				var freqstart = freqnow * 10000 - 21500;
				var freqend = freqnow * 10000 - 9500;
				$("#LNB_start2").val(freqstart / 10000);
				$("#LNB_end2").val(freqend / 10000);
				$("#LNB_start2").parent().find('td[title=formips]').remove();
				$("#LNB_end2").parent().find('td[title=formips]').remove();
			}
		} else {
			if (LNB_freq2_status == 1) {
				var freqnow = Number($('#LNB_freq2').val());
				var freqstart = freqnow * 10000 + 9500;
				var freqend = freqnow * 10000 + 21500;
				$("#LNB_start2").val(freqstart / 10000);
				$("#LNB_end2").val(freqend / 10000);
				$("#LNB_start2").parent().find('td[title=formips]').remove();
				$("#LNB_end2").parent().find('td[title=formips]').remove();
			}
		}
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	//LNB3
	var LNB_freq3_status = 0;
	$('#LNB_freq3').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
			LNB_freq2_status = 0;
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
			LNB_freq3_status = 0;
		} else if (Number(this.value) > 43) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 43' + '</td>');
			LNB_freq3_status = 0;
		} else if (Number(this.value) < 3) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 3' + '</td>');
			LNB_freq3_status = 0;
		} else {
			LNB_freq3_status = 1;
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
		//1:c;0:kaku
		if (1 == Number(spectral_enable)) {
			if (LNB_freq3_status == 1) {
				var freqnow = Number($('#LNB_freq3').val());
				var freqstart = freqnow * 10000 - 21500;
				var freqend = freqnow * 10000 - 9500;
				$("#LNB_start3").val(freqstart / 10000);
				$("#LNB_end3").val(freqend / 10000);
				$("#LNB_start3").parent().find('td[title=formips]').remove();
				$("#LNB_end3").parent().find('td[title=formips]').remove();
			}
		} else {
			if (LNB_freq3_status == 1) {
				var freqnow = Number($('#LNB_freq3').val());
				var freqstart = freqnow * 10000 + 9500;
				var freqend = freqnow * 10000 + 21500;
				$("#LNB_start3").val(freqstart / 10000);
				$("#LNB_end3").val(freqend / 10000);
				$("#LNB_start3").parent().find('td[title=formips]').remove();
				$("#LNB_end3").parent().find('td[title=formips]').remove();
			}
		}

	}).focus(function () {
		$(this).triggerHandler("blur");
	});


	//LNB4
	var LNB_freq4_status = 0;
	$('#LNB_freq4').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
			LNB_freq4_status = 0;
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
			LNB_freq4_status = 0;
		} else if (Number(this.value) > 43) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 43' + '</td>');
			LNB_freq4_status = 0;
		} else if (Number(this.value) < 3) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 3' + '</td>');
			LNB_freq4_status = 0;
		} else {
			LNB_freq4_status = 1;
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
		//1:c;0:kaku
		if (1 == Number(spectral_enable)) {
			if (LNB_freq4_status == 1) {
				var freqnow = Number($('#LNB_freq4').val());
				var freqstart = freqnow * 10000 - 21500;
				var freqend = freqnow * 10000 - 9500;
				$("#LNB_start4").val(freqstart / 10000);
				$("#LNB_end4").val(freqend / 10000);
				$("#LNB_start4").parent().find('td[title=formips]').remove();
				$("#LNB_end4").parent().find('td[title=formips]').remove();
			}
		} else {
			if (LNB_freq4_status == 1) {
				var freqnow = Number($('#LNB_freq4').val());
				var freqstart = freqnow * 10000 + 9500;
				var freqend = freqnow * 10000 + 21500;
				$("#LNB_start4").val(freqstart / 10000);
				$("#LNB_end4").val(freqend / 10000);
				$("#LNB_start4").parent().find('td[title=formips]').remove();
				$("#LNB_end4").parent().find('td[title=formips]').remove();
			}
		}
	}).focus(function () {
		$(this).triggerHandler("blur");
	});


	//BUC1
	var BUC_freq1_status = 0;
	$('#BUC_freq1').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
			BUC_freq1_status = 0;
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
			BUC_freq1_status = 0;
		} else if (Number(this.value) > 31) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 31' + '</td>');
			BUC_freq1_status = 0;
		} else if (Number(this.value) < 3) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 3' + '</td>');
			BUC_freq1_status = 0;
		} else {
			BUC_freq1_status = 1;
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
		if (1 == BUC_freq1_status)
			var freqnow = (Number(this.value));
		var freqstart = freqnow * 10000 + 9500;
		var freqend = freqnow * 10000 + 24000;
		$("#BUC_start1").val(freqstart / 10000);
		$("#BUC_end1").val(freqend / 10000);
		$("#BUC_start1").parent().find('td[title=formips]').remove();
		$("#BUC_end1").parent().find('td[title=formips]').remove(); {
		}
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	//LNB start
	$('#LNB_start1').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
		} else if (Number(this.value) > 40.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 40.15' + '</td>');
		} else if (Number(this.value) < 0.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 0.15' + '</td>');
		} else {
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	$('#LNB_start2').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
		} else if (Number(this.value) > 40.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 40.15' + '</td>');
		} else if (Number(this.value) < 0.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 0.15' + '</td>');
		} else {
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});
	$('#LNB_start3').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
		} else if (Number(this.value) > 40.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 40.15' + '</td>');
		} else if (Number(this.value) < 0.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 0.15' + '</td>');
		} else {
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	$('#LNB_start4').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
		} else if (Number(this.value) > 40.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 40.15' + '</td>');
		} else if (Number(this.value) < 0.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 0.15' + '</td>');
		} else {
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});
	//LNB end
	$('#LNB_end1').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
		} else if (Number(this.value) > 40.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 40.15' + '</td>');
		} else if (Number(this.value) < 0.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 0.15' + '</td>');
		} else {
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	$('#LNB_end2').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
		} else if (Number(this.value) > 40.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 40.15' + '</td>');
		} else if (Number(this.value) < 0.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 0.15' + '</td>');
		} else {
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	$('#LNB_end3').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
		} else if (Number(this.value) > 40.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 40.15' + '</td>');
		} else if (Number(this.value) < 0.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 0.15' + '</td>');
		} else {
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	$('#LNB_end4').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
		} else if (Number(this.value) > 40.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 40.15' + '</td>');
		} else if (Number(this.value) < 0.15) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 0.15' + '</td>');
		} else {
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	//BUC start
	$('#BUC_start1').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
		} else if (Number(this.value) > 33.4) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 33.4' + '</td>');
		} else if (Number(this.value) < 3.95) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 3.95' + '</td>');
		} else {
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});

	//BUC end
	$('#BUC_end1').blur(function () {
		var $parent = $(this).parent();
		$parent.find('td[title=formips]').remove();
		if (re3.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_blank + '</td>');
		} else if (!re2.test(this.value) && !re1.test(this.value)) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_number + '</td>');
		} else if (Number(this.value) > 33.4) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_greater + ' 33.4' + '</td>');
		} else if (Number(this.value) < 3.95) {
			$parent.append('<td title="formips" class= "onEror" >' + validate_less + ' 3.95' + '</td>');
		} else {
		}
	}).keyup(function () {
		$(this).triggerHandler("blur");
	}).focus(function () {
		$(this).triggerHandler("blur");
	});
}


var src_ip_old = " ";
var dst_ip_old = " ";
/*edit按钮*/
$('body').delegate('#editItem', 'click', function (e) {
	console.log("editItem");
	add_flag = 0;
	var that = this,
		$this = $(that);
	discribe_old = $this.attr('editItem_discribe');
	console.log("discribe_old=" + discribe_old);
	e.preventDefault();
	var contentTmpl;
	contentTmpl = $('#ANT_content').html();
	selfaddDialog = $.dialog({
		title: ant_title,
		content: contentTmpl,
		lock: true,
		padding: 0,
		width: 950
	});

	e.preventDefault();
	var requestData = {
		discribe: discribe_old
	};
	$.ajax({
		url: '/action/get_antenna_rf',
		type: "POST",
		data: requestData,
		dataType: "json",
		async: false,
		success: function (rsp) {
			// spectral_enable=rsp.spectral_enable;
			// console.log("spectral_enable="+spectral_enable);
			if (rsp.code == 0) {
				if (rsp.ANT_now == discribe_old) {
					$.alert(ant_config_again);
				}
				if (e = document.getElementById('acu_tx_status'))
					e.innerHTML = rsp.acu_tx_status;
				$('input[name=ANT_discribe]').val(discribe_old);
				$('#antenna_type').val(rsp.antenna_type);
				$('input[name=port]').val(rsp.port);
				var antenna_manufacture_val = rsp.antenna_manufacture;
				var antenna_manufacture_val = (rsp.antenna_manufacture).split("_");
				var length = antenna_manufacture_val.length;
				var antenna_manufacture = String.fromCharCode(antenna_manufacture_val[0]);
				for (i = 1; i < length; i++) {
					var antenna_manufacture_en = String.fromCharCode(antenna_manufacture_val[i]);
					antenna_manufacture = antenna_manufacture + antenna_manufacture_en;
				}

				$('input[name=antenna_manufacture]').val(antenna_manufacture);
				//20231020
				$('#rolloff').val(rsp.rolloff);
				if (rsp.antenna_type == "fix") {
					$('#seekstartr').hide();
					$('#nofixip1').hide();
					$('#nofixip2').hide();
				} else if (rsp.antenna_type == "static") {
					$('#tx_status').show();
					$('#nofixip1').show();
					$('#nofixip2').show();
					$('#seekstartr').show();
					$('#seekstar').val(rsp.seekstar);
					$('input[name=src_ip]').val(rsp.src_ip);
					$('input[name=dst_ip]').val(rsp.dst_ip);
				} else if (rsp.antenna_type == "move") {
					$('#nofixip1').show();
					$('#nofixip2').show();
					$('#seekstartr').hide();
					$('input[name=src_ip]').val(rsp.src_ip);
					$('input[name=dst_ip]').val(rsp.dst_ip);
				} else if (rsp.antenna_type == "manual_portable") {
					$('#tx_status').hide();
					$('#seekstartr').hide();
					$('#nofixip1').hide();
					$('#nofixip2').hide();
				} else if (rsp.antenna_type == "auto_portable") {
					$('#tx_status').show();
					$('#seekstartr').show();
					$('#nofixip1').show();
					$('#nofixip2').show();
					$('#seekstar').val(rsp.seekstar);
					$('input[name=src_ip]').val(rsp.src_ip);
					$('input[name=dst_ip]').val(rsp.dst_ip);
				}
				src_ip_old = rsp.src_ip;
				dst_ip_old = rsp.dst_ip;
				//~ LNB
				$('#lnbtype ').val(rsp.LNB_type);
				LNB_count = Number(rsp.LNB_count);
				console.log("req LNB_count=" + LNB_count);
				var LNB_freq = (rsp.LNB_freq).split("+");
				var LNB_start = (rsp.LNB_start).split("+");
				var LNB_end = (rsp.LNB_end).split("+");
				$("#LNB_freq1").val(Number(LNB_freq[1]) / 1000);
				$("#LNB_start1").val(Number(LNB_start[1]) / 1000);
				$("#LNB_end1").val(Number(LNB_end[1]) / 1000);

				if (rsp.LNB_type == "2") {
					$("#hlswitch_tr").show();
					if (rsp.twolnb_change_type == "0") {
						$('#hlswitch1').prop('checked', true);
						$('#hlswitch2').prop('checked', false);
						$('#hlswitch3').prop('checked', false);
					} else if (rsp.twolnb_change_type == "1") {
						$('#hlswitch1').prop('checked', false);
						$('#hlswitch2').prop('checked', true);
						$('#hlswitch3').prop('checked', false);
					}
					else {
						$('#hlswitch1').prop('checked', false);
						$('#hlswitch2').prop('checked', false);
						$('#hlswitch3').prop('checked', true);
					}
					$("#lnb_tr2").show();
					$("#LNB_freq2").val(Number(LNB_freq[2]) / 1000);
					$("#LNB_start2").val(Number(LNB_start[2]) / 1000);
					$("#LNB_end2").val(Number(LNB_end[2]) / 1000);
				} else if (rsp.LNB_type == "4") {
					$("#lnb_tr2").show();
					$("#lnb_tr3").show();
					$("#lnb_tr4").show();
					$(".LNB_1318_flag").show();
					$("#LNB_freq2").val(Number(LNB_freq[2]) / 1000);
					$("#LNB_start2").val(Number(LNB_start[2]) / 1000);
					$("#LNB_end2").val(Number(LNB_end[2]) / 1000);
					$("#LNB_freq3").val(Number(LNB_freq[3]) / 1000);
					$("#LNB_start3").val(Number(LNB_start[3]) / 1000);
					$("#LNB_end3").val(Number(LNB_end[3]) / 1000);
					$("#LNB_freq4").val(Number(LNB_freq[4]) / 1000);
					$("#LNB_start4").val(Number(LNB_start[4]) / 1000);
					$("#LNB_end4").val(Number(LNB_end[4]) / 1000);
					$("#LNB_13V18V_flag1").val(rsp.LNB_13V18V_flag1);
					$("#LNB_13V18V_flag2").val(rsp.LNB_13V18V_flag2);
					$("#LNB_13V18V_flag3").val(rsp.LNB_13V18V_flag3);
					$("#LNB_13V18V_flag4").val(rsp.LNB_13V18V_flag4);
				}

				//~ BUC
				$('#buctype ').val(rsp.BUC_type);
				BUC_count = Number(rsp.BUC_count);
				console.log("req BUC_count=" + BUC_count);
				var BUC_freq = (rsp.BUC_freq).split("+");
				var BUC_start = (rsp.BUC_start).split("+");
				var BUC_end = (rsp.BUC_end).split("+");
				$("#BUC_freq1").val(Number(BUC_freq[1]) / 1000);
				$("#BUC_start1").val(Number(BUC_start[1]) / 1000);
				$("#BUC_end1").val(Number(BUC_end[1]) / 1000);

				if (rsp.BUC_type == "2") {
					$("#buc_tr2").show();
					$("#BUC_freq2").val(Number(BUC_freq[2]) / 1000);
					$("#BUC_start2").val(Number(BUC_start[2]) / 1000);
					$("#BUC_end2").val(Number(BUC_end[2]) / 1000);
				} else if (rsp.BUC_type == "4") {
					$("#buc_tr2").show();
					$("#buc_tr3").show();
					$("#buc_tr4").show();
					$(".BUC_1318_flag").show();
					$("#BUC_freq2").val(Number(BUC_freq[2]) / 1000);
					$("#BUC_start2").val(Number(BUC_start[2]) / 1000);
					$("#BUC_end2").val(Number(BUC_end[2]) / 1000);
					$("#BUC_freq3").val(Number(BUC_freq[3]) / 1000);
					$("#BUC_start3").val(Number(BUC_start[3]) / 1000);
					$("#BUC_end3").val(Number(BUC_end[3]) / 1000);
					$("#BUC_freq4").val(Number(BUC_freq[4]) / 1000);
					$("#BUC_start4").val(Number(BUC_start[4]) / 1000);
					$("#BUC_end4").val(Number(BUC_end[4]) / 1000);
				}

			} else {
				console.log("get_antenna_rf error");
			}
		},
		error: function () {
			console.log("get_antenna_rf error");
		}
	});

	check_status();

	if ($('#language_three').val() == "zh") {
		$('.Submit').html("提交");
		$('.Discribe').html("描述");
		$('.AntennaType').html("天线类型");
		$('.FIX').html("固定式");
		$('.MOVE').html("动中通");
		$('.STATIC').html("静中通");
		$('.manual_portable').html("手动便携站");
		$('.auto_portable').html("自动便携站");
		$('.StarPointStatus').html("对星状态");
		$('.AntennaManufacturer').html("天线厂商");
		$('.SeekSatelliteType').html("寻星方式");
		$('.Carrier').html("载波");
		$('.Beacon').html("信标");
		$('.ModemIP').html("Modem IP");
		$('.ACUIP').html("ACU IP");
		$('.ACUPort').html("ACU端口");
		$('.Antenna').html("天线");
		//~ $('.antenna_manufacture_option1').html("通用");
		//~ $('.antenna_manufacture_option2').html("恒星");
		$('#LNB_type').html("LNB类型");
		$('#BUC_type').html("BUC类型");
		$('#AntennaType').html("天线类型");
		$('.LNBFreqType').html("LNB类型");
		$('.Multiple').html("多本振");
		$('.Double').html("双本振");
		$('.Single').html("单本振");
		$('.Four').html("4本振");
		$('.LNBFreq').html("LNB本振");
		$('.BUCFreqType').html("BUC类型");
		$('.BUCFreq').html("BUC本振");
		$('.hlElectricalLevel').html("高低电平");
		$('.Add').html("添加");
		$('.Delete').html("删除");
		$('.None').html("无");
		$('.Rolloff').html("滚降");
	} else if ($('#language_three').val() == "en") {
		$('.Submit').html("Submit");
		$('.Discribe').html("Discribe");
		$('.AntennaType').html("Antenna Type");
		$('.FIX').html("Fix");
		$('.MOVE').html("COTM");
		$('.STATIC').html("COTP");
		$('.manual_portable').html("Manual Portable");
		$('.auto_portable').html("Auto Portable");
		$('.StarPointStatus').html("Star Point Status");
		$('.AntennaManufacturer').html("Antenna Manufacturer");
		$('.SeekSatelliteType').html("Seek Satellite Type");
		$('.Carrier').html("Carrier");
		$('.Beacon').html("Beacon");
		$('.ModemIP').html("Modem IP");
		$('.ACUIP').html("ACU IP");
		$('.ACUPort').html("ACU Port");
		$('.Antenna').html("Antenna");
		//~ $('.antenna_manufacture_option1').html("Common");
		//~ $('.antenna_manufacture_option2').html("SpaceStar");
		$('#BUC_type').html("BUC Type");
		$('#AntennaType').html("Antenna Type");
		$('.LNBFreqType').html("LNB Freq Type");
		$('.Multiple').html("Multiple");
		$('.Double').html("Double");
		$('.Single').html("Single");
		$('.Four').html("Four");
		$('.LNBFreq').html("LNB Freq");
		$('.BUCFreqType').html("BUC Freq Type");
		$('.BUCFreq').html("BUC Freq");
		$('.hlElectricalLevel').html("HL ElectricalLevel");
		$('.Add').html("Add");
		$('.Delete').html("Delete");
		$('.None').html("None");
		$('.Rolloff').html("Rolloff");
	} else if ($('#language_three').val() == "zh_HK") {
		$('.Submit').html("提交");
		$('.Discribe').html("描述");
		$('.AntennaType').html("天線類型");
		$('.FIX').html("固定式");
		$('.MOVE').html("動中通");
		$('.STATIC').html("靜中通");
		$('.manual_portable').html("手動便攜站");
		$('.auto_portable').html("自動便攜站");
		$('.StarPointStatus').html("對星狀態");
		$('.AntennaManufacturer').html("天線廠商");
		$('.SeekSatelliteType').html("尋星方式");
		$('.Carrier').html("載波");
		$('.Beacon').html("信標");
		$('.ModemIP').html("Modem IP");
		$('.ACUIP').html("ACU IP");
		$('.ACUPort').html("ACU端口");
		$('.Antenna').html("天線");
		//~ $('.antenna_manufacture_option1').html("通用");
		//~ $('.antenna_manufacture_option2').html("恒星");
		$('#LNB_type').html("LNB類型");
		$('#BUC_type').html("BUC類型");
		$('#AntennaType').html("天線類型");
		$('.LNBFreqType').html("LNB類型");
		$('.Multiple').html("多本振");
		$('.Double').html("雙本振");
		$('.Single').html("單本振");
		$('.Four').html("4本振");
		$('.LNBFreq').html("LNB本振");
		$('.BUCFreqType').html("BUC類型");
		$('.BUCFreq').html("BUC本振");
		$('.hlElectricalLevel').html("高低電平");
		$('.Add').html("添加");
		$('.Delete').html("刪除");
		$('.None').html("無");
		$('.Rolloff').html("滾降");


	}
	helpNote();
});

/*submit配置文件并生效*/
$('body').delegate('#submit_antenna', 'click', function (e) {
	console.log("submit_antenna");

	var antenna_type = $('#antenna_type').val();
	if ((antenna_type == "move") || (antenna_type == "static") || (antenna_type == "auto_portable")) {
		$('input[title=src_ip]').trigger('blur');
		$('input[title=dst_ip]').trigger('blur');
	}
	$('input[title=ANT_discribe]').trigger('blur');
	$('input[title=antenna_manufacture]').trigger('blur');
	$('input[title=port]').trigger('blur');
	for (var i = 1; i <= LNB_count; i++) {
		$('#LNB_freq' + i).trigger('blur');
		$('#LNB_start' + i).trigger('blur');
		$('#LNB_end' + i).trigger('blur');
	}
	for (var i = 1; i <= BUC_count; i++) {
		$('#BUC_freq' + i).trigger('blur');
		$('#BUC_start' + i).trigger('blur');
		$('#BUC_end' + i).trigger('blur');
	}
	console.log("submit_antenna");
	e.preventDefault();
	var form = e.target,
		formName = form.name,
		action = this.action;
	var discribe = $('input[name=ANT_discribe]').val();
	var antenna_manufacture_val = $('input[name=antenna_manufacture]').val();
	var length = antenna_manufacture_val.length;
	var antenna_manufacture = antenna_manufacture_val.charCodeAt(0);
	for (i = 1; i < length; i++) {
		var antenna_manufacture_i = antenna_manufacture_val.charCodeAt(i);
		antenna_manufacture = antenna_manufacture + "_" + antenna_manufacture_i;
	}

	if (add_flag == 1) {
		for (var i = 0; i < $('#redirect_dialogtestlist td[name=discribe]').length; i++) {
			console.log("discribe=" + discribe);
			//~ alert($('#redirect_dialogtestlist td[name=discribe]').eq(i).attr('antdiscribe'));
			if (discribe == $('#redirect_dialogtestlist td[name=discribe]').eq(i).attr('antdiscribe')) {
				$.alert(same_description);
				return;
			}
		}
	}

	if ($(".onEror").length == 0) {
		var antenna_type = $('#antenna_type').val();
		var src_ip;
		var dst_ip;
		if ((antenna_type == "fix") || ((antenna_type == "manual_portable"))) {
			if (" " == src_ip_old) {
				src_ip_old = "10.107.1.1";
			}
			if (" " == dst_ip_old) {
				dst_ip_old = "10.107.1.2";
			}

			src_ip = src_ip_old;
			dst_ip = dst_ip_old;
		} else {
			src_ip = $('input[name=src_ip]').val();
			dst_ip = $('input[name=dst_ip]').val();
		}
		var port = $('input[name=port]').val();
		var seekstar = $('#seekstar').val();
		//20231020
		var rolloff = $('#rolloff').val();
		//~ LNB
		var LNB_type = $('#lnbtype ').val();
		var LNB_freq = '';
		var LNB_start = '';
		var LNB_end = '';
		var LNB_13V18V_flag1 = 0;
		var LNB_13V18V_flag2 = 0;
		var LNB_13V18V_flag3 = 0;
		var LNB_13V18V_flag4 = 0;
		var twolnb_change_type = 0;
		if (LNB_type != "1") {
			var lnbfreqname;
			var lnbfreqname_start;
			var lnbfreqname_end;
			LNB_count = LNB_type;
			console.log("submit LNB_count=" + LNB_count);
			for (var i = 1; i <= LNB_count; i++) {
				lnbfreqname = "LNB_freq" + i;
				lnbfreqname_start = "LNB_start" + i;
				lnbfreqname_end = "LNB_end" + i;
				LNB_freq = LNB_freq + "+" + Number($("#" + lnbfreqname).val()) * 1000;
				LNB_start = LNB_start + "+" + Number($("#" + lnbfreqname_start).val()) * 1000;
				LNB_end = LNB_end + "+" + Number($("#" + lnbfreqname_end).val()) * 1000;
			}
			if (LNB_type == '4') {
				LNB_13V18V_flag1 = $("#LNB_13V18V_flag1").val();
				LNB_13V18V_flag2 = $("#LNB_13V18V_flag2").val();
				LNB_13V18V_flag3 = $("#LNB_13V18V_flag3").val();
				LNB_13V18V_flag4 = $("#LNB_13V18V_flag4").val();
			}
			if (LNB_type == '2') {
				if ($('#hlswitch1').prop('checked')) {
					twolnb_change_type = 0;
				} else if ($('#hlswitch2').prop('checked')) {
					twolnb_change_type = 1;
				} else if ($('#hlswitch3').prop('checked')) {
					twolnb_change_type = 2;
				}
			}
		} else {
			LNB_count = 1;
			console.log("submit LNB_count=" + LNB_count);
			LNB_freq = Number($("#LNB_freq1").val()) * 1000;
			LNB_start = Number($("#LNB_start1").val()) * 1000;
			LNB_end = Number($("#LNB_end1").val()) * 1000;
		}

		//~ BUC
		var BUC_type = $('#buctype ').val();
		var BUC_freq = '';
		var BUC_start = '';
		var BUC_end = '';
		if (BUC_type == "2") {
			var bucfreqname;
			var bucfreqname_start;
			var bucfreqname_end;
			BUC_count = 2 + $("#buclist tr").length;
			console.log("submit BUC_count=" + BUC_count);
			for (var i = 1; i <= BUC_count; i++) {
				bucfreqname = "BUC_freq" + i;
				bucfreqname_start = "BUC_start" + i;
				bucfreqname_end = "BUC_end" + i;
				BUC_freq = BUC_freq + "+" + Number($("#" + bucfreqname).val()) * 1000;
				BUC_start = BUC_start + "+" + Number($("#" + bucfreqname_start).val()) * 1000;
				BUC_end = BUC_end + "+" + Number($("#" + bucfreqname_end).val()) * 1000;
			}
		} else {
			BUC_count = 1;
			console.log("submit BUC_count=" + BUC_count);
			BUC_freq = Number($("#BUC_freq1").val()) * 1000;
			BUC_start = Number($("#BUC_start1").val()) * 1000;
			BUC_end = Number($("#BUC_end1").val()) * 1000;
			console.log('BUC_start=' + BUC_start);
			console.log('BUC_end=' + BUC_end);
		}
		console.log(666);
		if (LNB_type == '4') {
			if (('5' != LNB_13V18V_flag1) && ((LNB_13V18V_flag1 == LNB_13V18V_flag2) ||
				(LNB_13V18V_flag1 == LNB_13V18V_flag3) || (LNB_13V18V_flag1 == LNB_13V18V_flag4))) {
				$.alert(same1318);
				return;
			}

			if (('5' != LNB_13V18V_flag2) && ((LNB_13V18V_flag2 == LNB_13V18V_flag1) ||
				(LNB_13V18V_flag2 == LNB_13V18V_flag3) || (LNB_13V18V_flag2 == LNB_13V18V_flag4))) {
				$.alert(same1318);
				return;
			}

			if (('5' != LNB_13V18V_flag3) && ((LNB_13V18V_flag3 == LNB_13V18V_flag1) ||
				(LNB_13V18V_flag3 == LNB_13V18V_flag2) || (LNB_13V18V_flag3 == LNB_13V18V_flag4))) {
				$.alert(same1318);
				return;
			}

			if (('5' != LNB_13V18V_flag4) && ((LNB_13V18V_flag4 == LNB_13V18V_flag1) ||
				(LNB_13V18V_flag4 == LNB_13V18V_flag2) || (LNB_13V18V_flag4 == LNB_13V18V_flag3))) {
				$.alert(same1318);
				return;
			}
		}

		var requestData,
			requestURL = '/action/ANTRFSet';
		requestData = {
			discribe_old: discribe_old,
			discribe: discribe,
			antenna_type: antenna_type,
			seekstar: seekstar,
			antenna_manufacture: antenna_manufacture,
			src_ip: src_ip,
			dst_ip: dst_ip,
			port: port,
			rolloff: rolloff,
			LNB_type: LNB_type,
			LNB_freq: LNB_freq,
			LNB_start: LNB_start,
			LNB_end: LNB_end,
			LNB_count: LNB_count,
			LNB_13V18V_flag1: LNB_13V18V_flag1,
			LNB_13V18V_flag2: LNB_13V18V_flag2,
			LNB_13V18V_flag3: LNB_13V18V_flag3,
			LNB_13V18V_flag4: LNB_13V18V_flag4,
			twolnb_change_type: twolnb_change_type,
			BUC_type: BUC_type,
			BUC_freq: BUC_freq,
			BUC_start: BUC_start,
			BUC_end: BUC_end,
			BUC_count: BUC_count
		};
		$.getJSON(requestURL, requestData, function (rsp) {
			if (rsp.code == 0) {
				$.alert(setup_suc, function () {
					location.reload(true);
				}).lock();
			} else {
				$.alert(setup_failed).lock();
			}
		});
	} else {
		console.log(".onEror length=" + $(".onEror").length);
	}
	console.log(777);
});	/*submit配置文件并生效*/


/*add按钮*/
$('body').delegate('#redirect_addoneitem', 'click', function (e) {
	console.log("redirect_addoneitem");
	add_flag = 1;
	e.preventDefault();
	var contentTmpl;
	contentTmpl = $('#ANT_content').html();
	selfaddDialog = $.dialog({
		title: ant_title,
		content: contentTmpl,
		lock: true,
		padding: 0,
		width: 950
	});
	LNB_count = Number($('#lnbtype').val());
	console.log("LNB_count=" + LNB_count);
	BUC_count = Number($('#buctype').val());
	console.log("BUC_count=" + BUC_count);
	discribe_old = 'zyzyzyzyzy';

	check_status();
	if ($('#language_three').val() == "zh") {
		$('.Submit').html("提交");
		$('.Discribe').html("描述");
		$('.AntennaType').html("天线类型");
		$('.FIX').html("固定式");
		$('.MOVE').html("动中通");
		$('.STATIC').html("静中通");
		$('.manual_portable').html("手动便携站");
		$('.auto_portable').html("自动便携站");
		$('.StarPointStatus').html("对星状态");
		$('.AntennaManufacturer').html("天线厂商");
		$('.SeekSatelliteType').html("寻星方式");
		$('.Carrier').html("载波");
		$('.Beacon').html("信标");
		$('.ModemIP').html("Modem IP");
		$('.ACUIP').html("ACU IP");
		$('.ACUPort').html("ACU端口");
		$('.Antenna').html("天线");
		//~ $('.antenna_manufacture_option1').html("通用");
		//~ $('.antenna_manufacture_option2').html("恒星");
		$('#LNB_type').html("LNB类型");
		$('#BUC_type').html("BUC类型");
		$('#AntennaType').html("天线类型");
		$('.LNBFreqType').html("LNB类型");
		$('.Multiple').html("多本振");
		$('.Double').html("双本振");
		$('.Single').html("单本振");
		$('.Four').html("4本振");
		$('.LNBFreq').html("LNB本振");
		$('.BUCFreqType').html("BUC类型");
		$('.BUCFreq').html("BUC本振");
		$('.hlElectricalLevel').html("高低电平");
		$('.Rolloff').html("滚降");
		$('.None').html("无");
	} else if ($('#language_three').val() == "en") {
		$('.Submit').html("Submit");
		$('.Discribe').html("Discribe");
		$('.AntennaType').html("Antenna Type");
		$('.FIX').html("Fix");
		$('.MOVE').html("COTM");
		$('.STATIC').html("COTP");
		$('.manual_portable').html("Manual Portable");
		$('.auto_portable').html("Auto Portable");
		$('.StarPointStatus').html("Star Point Status");
		$('.AntennaManufacturer').html("Antenna Manufacturer");
		$('.SeekSatelliteType').html("Seek Satellite Type");
		$('.Carrier').html("Carrier");
		$('.Beacon').html("Beacon");
		$('.ModemIP').html("Modem IP");
		$('.ACUIP').html("ACU IP");
		$('.ACUPort').html("ACU Port");
		$('.Antenna').html("Antenna");
		//~ $('.antenna_manufacture_option1').html("Common");
		//~ $('.antenna_manufacture_option2').html("SpaceStar");
		$('#BUC_type').html("BUC Type");
		$('#AntennaType').html("Antenna Type");
		$('.LNBFreqType').html("LNB Freq Type");
		$('.Multiple').html("Multiple");
		$('.Double').html("Double");
		$('.Single').html("Single");
		$('.Four').html("Four");
		$('.LNBFreq').html("LNB Freq");
		$('.BUCFreqType').html("BUC Freq Type");
		$('.BUCFreq').html("BUC Freq");
		$('.hlElectricalLevel').html("HLElectricalLevel");
		$('.Rolloff').html("Rolloff");
		$('.None').html("None");
	} else if ($('#language_three').val() == "zh_HK") {
		$('.Submit').html("提交");
		$('.Discribe').html("描述");
		$('.AntennaType').html("天線類型");
		$('.FIX').html("固定式");
		$('.MOVE').html("動中通");
		$('.STATIC').html("靜中通");
		$('.manual_portable').html("手動便攜站");
		$('.auto_portable').html("自動便攜站");
		$('.StarPointStatus').html("對星狀態");
		$('.AntennaManufacturer').html("天線廠商");
		$('.SeekSatelliteType').html("尋星方式");
		$('.Carrier').html("載波");
		$('.Beacon').html("信標");
		$('.ModemIP').html("Modem IP");
		$('.ACUIP').html("ACU IP");
		$('.ACUPort').html("ACU端口");
		$('.Antenna').html("天線");
		//~ $('.antenna_manufacture_option1').html("通用");
		//~ $('.antenna_manufacture_option2').html("恒星");
		$('#LNB_type').html("LNB類型");
		$('#BUC_type').html("BUC類型");
		$('#AntennaType').html("天線類型");
		$('.LNBFreqType').html("LNB類型");
		$('.Multiple').html("多本振");
		$('.Double').html("雙本振");
		$('.Single').html("單本振");
		$('.Four').html("4本振");
		$('.LNBFreq').html("LNB本振");
		$('.BUCFreqType').html("BUC類型");
		$('.BUCFreq').html("BUC本振");
		$('.hlElectricalLevel').html("高低電平");
		$('.Rolloff').html("滾降");
		$('.None').html("無");


	}
	helpNote();
});

function change_hlswitch(val) {
	if (val == 0) {
		$('#hlswitch1').prop('checked', true);
		$('#hlswitch2').prop('checked', false);
		$('#hlswitch3').prop('checked', false);
	} else if (val == 1) {
		$('#hlswitch1').prop('checked', false);
		$('#hlswitch2').prop('checked', true);
		$('#hlswitch3').prop('checked', false);
	} else if (val == 2) {
		$('#hlswitch1').prop('checked', false);
		$('#hlswitch2').prop('checked', false);
		$('#hlswitch3').prop('checked', true);
	}
}

function change_lnb_type() {
	if ($('#lnbtype').val() == "1") {
		$('#hlswitch_tr').hide();
		$('#lnb_tr2').hide();
		$('#lnb_tr3').hide();
		$('#lnb_tr4').hide();
		$(".LNB_1318_flag").hide();
		$(".onEror").remove();
	} else if ($('#lnbtype').val() == "2") {
		$('#hlswitch_tr').show();
		$('#lnb_tr2').show();
		$('#lnb_tr3').hide();
		$('#lnb_tr4').hide();
		$(".LNB_1318_flag").hide();
		$(".onEror").remove();
	} else if ($('#lnbtype').val() == "4") {
		$('#hlswitch_tr').hide();
		$('#lnb_tr2').show();
		$('#lnb_tr3').show();
		$('#lnb_tr4').show();
		$(".LNB_1318_flag").show();
		$(".onEror").remove();
	}
	console.log("change_lnb_type onEror length=" + $(".onEror").length);
	$(".onEror").remove();
	console.log("onEror length=" + $(".onEror").length);
	console.log("lnbtype=" + $("#lnbtype").val());
	for (var i = 1; i <= Number($("#lnbtype").val()); i++) {
		$('#LNB_freq' + i).trigger('blur');
		$('#LNB_start' + i).trigger('blur');
		$('#LNB_end' + i).trigger('blur');
	}
	if ($('#language_three').val() == "zh") {
		$('.Delete').html("删除");
		$('.Add').html("添加");
	} else if ($('#language_three').val() == "en") {
		$('.Delete').html("Delete");
		$('.Add').html("Add");
	} else if ($('#language_three').val() == "zh_HK") {
		$('.Delete').html("删除");
		$('.Add').html("添加");
	}
}

function change_buc_type() {
	if ($('#buctype').val() == "1") {
		$('#buc_tr2').hide();
		$('#buc_tr3').hide();
		$('#buc_tr4').hide();
		$(".BUC_1318_flag").hide();
		$(".onEror").remove();
	} else if ($('#buctype').val() == "2") {
		$('#buc_tr2').show();
		$('#buc_tr3').hide();
		$('#buc_tr4').hide();
		$(".BUC_1318_flag").hide();
		$(".onEror").remove();
	} else if ($('#buctype').val() == "4") {
		$('#buc_tr2').show();
		$('#buc_tr3').show();
		$('#buc_tr4').show();
		$(".BUC_1318_flag").show();
		$(".onEror").remove();
	}
}

function change_antenna_type() {
	if ($('#antenna_type').val() == "fix") {
		$('#tx_status').hide();
		$('#seekstartr').hide();
		$('#nofixip1').hide();
		$('#nofixip2').hide();
		$(".onEror").remove();
	} else if ($('#antenna_type').val() == "static") {
		$('#tx_status').show();
		$('#seekstartr').show();
		$('#nofixip1').show();
		$('#nofixip2').show();
		$('#seekstar').val(rsp.seekstar);
		$('input[name=src_ip]').val(rsp.src_ip);
		$('input[name=dst_ip]').val(rsp.dst_ip);
		$(".onEror").remove();
	} else if ($('#antenna_type').val() == "move") {
		$('#tx_status').hide();
		$('#seekstartr').hide();
		$('#nofixip1').show();
		$('#nofixip2').show();
		$('#seekstar').val(rsp.seekstar);
		$('input[name=src_ip]').val(rsp.src_ip);
		$('input[name=dst_ip]').val(rsp.dst_ip);
		$(".onEror").remove();
	} else if ($('#antenna_type').val() == "manual_portable") {
		$('#tx_status').hide();
		$('#seekstartr').hide();
		$('#nofixip1').hide();
		$('#nofixip2').hide();
		$(".onEror").remove();
	} else if ($('#antenna_type').val() == "auto_portable") {
		$('#tx_status').show();
		$('#seekstartr').show();
		$('#nofixip1').show();
		$('#nofixip2').show();
		$('#seekstar').val(rsp.seekstar);
		$('input[name=src_ip]').val(rsp.src_ip);
		$('input[name=dst_ip]').val(rsp.dst_ip);
		$(".onEror").remove();
	}
}




function helpNote() {
	$(".ModemIPHelp").mouseover(function (e) {
		console.log('ModemIPHelp in');
		$("body").append('<div id="tooltip">' + ANTIPHelp + '</div>');
		$('#tooltip').css({
			"z-index": "9999",
			position: "absolute",
			top: $(this).offset().top - 30,
			left: $(this).offset().left + 30,
			color: "#55555",
			background: "#fff",
			border: "1px solid #3399FF",
			"border-radius": "3px",
			width: "400px",
			"font-size": "13px",
			padding: "4px 2px 4px 2px"
		}).show();
	}).mouseout(function () {
		console.log('ModemIPHelp out');
		$('#tooltip').remove();
	});

	$(".acuIpHelp").mouseover(function (e) {
		console.log('acuIpHelp in');
		$("body").append('<div id="tooltip">' + ANTIPHelp + '</div>');
		$('#tooltip').css({
			"z-index": "9999",
			position: "absolute",
			top: $(this).offset().top,
			left: $(this).offset().left + 30,
			color: "#55555",
			background: "#fff",
			border: "1px solid #3399FF",
			"border-radius": "3px",
			width: "400px",
			"font-size": "13px",
			padding: "4px 2px 4px 2px"
		}).show();
	}).mouseout(function () {
		console.log('acuIpHelp out');
		$('#tooltip').remove();
	});
}
