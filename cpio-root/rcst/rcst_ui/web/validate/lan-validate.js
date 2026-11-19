var ip_status = 0;
var mask_status = 0;
var mtu_status = 0;
var wlan_ip_status = 0;
var user_status = 0;
var passwd_status = 0;
var ip_scpcp2p_status = 0;
var mask_scpcp2p_status = 0;
var mtu_scpcp2p_status = 0;

var traceroutevlan_status = 0;
var ping_status = 0;
var acuip_status = 0;
var acuIP_status = 0;

re = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/;
re1 = /^-?[0-9]+\.[0-9]+ *$/;
re2 = /^-?[0-9]+ *$/;
re3 = /^ *$/;
re4 = /^\w+$/;
$('input[title=lan_ip]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		ip_status = 0;
	} else if (!re.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_ip + '</span>');
		ip_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		ip_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[title=lan_mask]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if ($(this).is('#mask')) {
		if (re3.test(this.value)) {
			$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
			mask_status = 0;
		} else if (!re.test(this.value)) {
			$parent.append('<span class= "formips onEror" >' + validate_ip + '</span>');
			mask_status = 0;
		} else {
			$parent.append('<span class= "formips onSuccess" ></span>');
			mask_status = 1;
		}
	} else { }
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[title=lan_mtu]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		mtu_status = 0;
	} else if (!re2.test(this.value) && !re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_number + '</span>');
		mtu_status = 0;
	} else if (!re2.test(this.value) && re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_integer + '</span>');
		mtu_status = 0;
	} else if (Number(this.value) < Number(574)) {
		$parent.append('<span class= "formips onEror" >' + validate_less + ' 574' + '</span>');
		mtu_status = 0;
	} else if (1500 < Number(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_greater + ' 1500' + '</span>');
		mtu_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		mtu_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[title=trunk_mtu]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		mtu_status = 0;
	} else if (!re2.test(this.value) && !re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_number + '</span>');
		mtu_status = 0;
	} else if (!re2.test(this.value) && re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_integer + '</span>');
		mtu_status = 0;
	} else if (Number(this.value) < Number(574)) {
		$parent.append('<span class= "formips onEror" >' + validate_less + ' 574' + '</span>');
		mtu_status = 0;
	} else if (1500 < Number(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_greater + ' 1500' + '</span>');
		mtu_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		mtu_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[title=wifi_ipaddr]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		wlan_ip_status = 0;
	} else if (!re.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_ip + '</span>');
		wlan_ip_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		wlan_ip_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[title=wifi_user]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		user_status = 0;
	} else if (!re4.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_input + '</span>');
		user_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		user_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[title=wifi_pass]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	var leng = this.value
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		passwd_status = 0;
	} else if (!re4.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_input + '</span>');
		passwd_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		passwd_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});


$('input[name=lan_ip_scpcp2p]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		ip_scpcp2p_status = 0;
	} else if (!re.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_ip + '</span>');
		ip_scpcp2p_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		ip_scpcp2p_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[name=lan_mask_scpcp2p]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		mask_status_scpcp2p = 0;
	} else if (!re.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_ip + '</span>');
		mask_status_scpcp2p = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		mask_status_scpcp2p = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[name=lan_mtu_scpcp2p]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		mtu_status_scpcp2p = 0;
	} else if (!re2.test(this.value) && !re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_number + '</span>');
		mtu_status_scpcp2p = 0;
	} else if (!re2.test(this.value) && re1.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_integer + '</span>');
		mtu_status_scpcp2p = 0;
	} else if (Number(this.value) < Number(574)) {
		$parent.append('<span class= "formips onEror" >' + validate_less + ' 574' + '</span>');
		mtu_status_scpcp2p = 0;
	} else if (1500 < Number(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_greater + ' 1500' + '</span>');
		mtu_status_scpcp2p = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		mtu_status_scpcp2p = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});






$('input[name=ping]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		ping_status = 0;
	} else if (!re.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_ip + '</span>');
		ping_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		ping_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[name=defaultgwip]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		defaultgwip_status = 0;
	} else if (!re.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_ip + '</span>');
		defaultgwip_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		defaultgwip_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[name=acuip]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		acuip_status = 0;
	} else if (!re.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_ip + '</span>');
		acuip_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		acuip_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

$('input[name=traceroutevlan]').blur(function () {
	var $parent = $(this).parent();
	$parent.find(".formips").remove();
	if (re3.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_blank + '</span>');
		traceroutevlan_status = 0;
	} else if (!re.test(this.value)) {
		$parent.append('<span class= "formips onEror" >' + validate_ip + '</span>');
		traceroutevlan_status = 0;
	} else {
		$parent.append('<span class= "formips onSuccess" ></span>');
		traceroutevlan_status = 1;
	}
}).keyup(function () {
	$(this).triggerHandler("blur");
}).focus(function () {
	$(this).triggerHandler("blur");
});

