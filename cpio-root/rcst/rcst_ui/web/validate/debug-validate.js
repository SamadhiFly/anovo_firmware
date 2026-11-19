var snrThreshold_status = 0;
var beamsearchNum_status = 0;
var locktime_short_status = 0;
var locktime_status = 0;
var synctime_status = 0;
var mainbacktime_status = 0;
var IFFixednum_status = 0;

var pass_status = 0;
var pass1_status = 0;
var pass2_status = 0;
var passlogin_status = 0;

re = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/;
re1 = /^-?[0-9]+\.[0-9]+ *$/;
re2 = /^-?[0-9]+ *$/;
re3 = /^ *$/;
re4 = /^\w+$/;
re5 = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+-=\[\]{};':"\\]).{12,}$/;

$('input[title=snrThreshold]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		snrThreshold_status = 0;
	} else if (!re2.test(this.value) && !re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_number + '</span>');
		snrThreshold_status = 0;
	} else if (!re2.test(this.value) && re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_integer + '</span>');
		snrThreshold_status = 0;
	} else if (Number(this.value) < Number(0)) {
		$parent.append('<span class= "formips onEror" >' + validate_less + ' 0' + '</span>');
		snrThreshold_status = 0;
	} else if (10000 < Number(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_greater + ' 10000' + '</span>');
		snrThreshold_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		snrThreshold_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[title=beamsearchNum]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		beamsearchNum_status = 0;
	} else if (!re2.test(this.value) && !re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_number + '</span>');
		beamsearchNum_status = 0;
	} else if (!re2.test(this.value) && re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_integer + '</span>');
		beamsearchNum_status = 0;
	} else if (Number(this.value) < Number(0)) {
		$parent.append('<span class= "formips onEror" >' + validate_less + ' 0' + '</span>');
		beamsearchNum_status = 0;
	} else if (10000 < Number(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_greater + ' 10000' + '</span>');
		beamsearchNum_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		beamsearchNum_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[title=IFFixednum]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		IFFixednum_status = 0;
	} else if (!re2.test(this.value) && !re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_number + '</span>');
		IFFixednum_status = 0;
	} else if (!re2.test(this.value) && re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_integer + '</span>');
		IFFixednum_status = 0;
	} else if (Number(this.value) < 949999999) {
		$parent.append('<span class= "formips onEror" >' + validate_less + ' 950000000' + '</span>');
		IFFixednum_status = 0;
	} else if (2400000001 < Number(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_greater + ' 2400000000' + '</span>');
		IFFixednum_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		IFFixednum_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[title=locktime_short]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		locktime_short_status = 0;
	} else if (!re2.test(this.value) && !re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_number + '</span>');
		locktime_short_status = 0;
	} else if (!re2.test(this.value) && re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_integer + '</span>');
		locktime_short_status = 0;
	} else if (Number(this.value) < Number(0)) {
		$parent.append('<span class= "formips onEror" >' + validate_less + ' 0' + '</span>');
		locktime_short_status = 0;
	} else if (10000 < Number(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_greater + ' 10000' + '</span>');
		locktime_short_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		locktime_short_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[title=locktime]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		locktime_status = 0;
	} else if (!re2.test(this.value) && !re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_number + '</span>');
		locktime_status = 0;
	} else if (!re2.test(this.value) && re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_integer + '</span>');
		locktime_status = 0;
	} else if (Number(this.value) < Number(0)) {
		$parent.append('<span class= "formips onEror" >' + validate_less + ' 0' + '</span>');
		locktime_status = 0;
	} else if (10000 < Number(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_greater + ' 10000' + '</span>');
		locktime_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		locktime_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[title=synctime]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		synctime_status = 0;
	} else if (!re2.test(this.value) && !re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_number + '</span>');
		synctime_status = 0;
	} else if (!re2.test(this.value) && re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_integer + '</span>');
		synctime_status = 0;
	} else if (Number(this.value) < Number(0)) {
		$parent.append('<span class= "formips onEror" >' + validate_less + ' 0' + '</span>');
		synctime_status = 0;
	} else if (10000 < Number(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_greater + ' 10000' + '</span>');
		synctime_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		synctime_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[title=mainbacktime]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		mainbacktime_status = 0;
	} else if (!re2.test(this.value) && !re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_number + '</span>');
		mainbacktime_status = 0;
	} else if (!re2.test(this.value) && re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_integer + '</span>');
		mainbacktime_status = 0;
	} else if (Number(this.value) < Number(0)) {
		$parent.append('<span class= "formips onEror" >' + validate_less + ' 0' + '</span>');
		mainbacktime_status = 0;
	} else if (10000 < Number(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_greater + ' 10000' + '</span>');
		mainbacktime_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		mainbacktime_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});


$('#new_pass1').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	ret = checkPass(this.value);
	if (-1 == ret) {
		$parent.append('<span class= "formips onErorPass" >' + validate_blank + '</span>');
		pass1_status = 0;
	} else if (0 == ret) {
		$parent.append('<span class= "formips onErorPass" >' + validate_pass + '</span>');
		pass1_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		pass1_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('#new_pass2').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	ret = checkPass(this.value);
	if (-1 == ret) {
		$parent.append('<span class= "formips onErorPass" >' + validate_blank + '</span>');
		pass2_status = 0;
	} else if (0 == ret) {
		$parent.append('<span class= "formips onErorPass" >' + validate_pass + '</span>');
		pass2_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		pass2_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});


$('#old_pass').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if ("ct4000" == this.value || "12345678" == this.value) {
		pass_status = 1;
	}
	else {
		ret = checkPass17(this.value);
		if (-1 == ret) {
			$parent.append('<span class= "formips onErorPass" >' + validate_blank + '</span>');
			pass_status = 0;
		} else if (0 == ret) {
			$parent.append('<span class= "formips onErorPass" >' + validate_pass_17 + '</span>');
			pass_status = 0;
		} else {
			$parent.append('<span class= "formips onSuccess" ></span>');
			pass_status = 1;
		}
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[name=password]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	ret = checkPass17(this.value);
	console.log("ret=" + ret);
	if (-1 == ret) {
		passlogin_status = 2;
	} else if (0 == ret) {
		passlogin_status = 3;
	} else {
		passlogin_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});



function checkPass(str) {
	if ("" == str) {
		return -1;

	}
	if (str.length < 12) {
		return 0;
	}
	if (str.length > 15) {
		return 0;
	}

	const a = /\d/.test(str);
	const b = /[a-zA-Z]/.test(str);
	const c = /^(?=.*[~!@#$%^*_+])(?!.*[$&()]).*$/.test(str);
	return a & b & c;
}

function checkPass17(str) {
	if ("" == str) {
		return -1;

	}
	if (str.length < 12) {
		return 0;
	}
	if (str.length > 17) {
		return 0;
	}

	const a = /\d/.test(str);
	const b = /[a-zA-Z]/.test(str);
	const c = /^(?=.*[~!@#$%^*_+])(?!.*[$&()]).*$/.test(str);
	return a & b & c;
}