var setup_failed;
var sig_text1;
var sig_text2;
var outofrange;

var validate_blank;
var validate_number;
var validate_integer;
var validate_less;
var validate_greater;
var validate_ip;

var switch_ing;
function trans_en() {
	$('#lang').val('en');
	$('#administrator').html("Administrator");
	$('#terminal_b').html("Terminal Status");
	$('#odu_b').html("RF");
	$('#network_b').html("Network");
	$('#diagnostics_b').html("Debug Mode");
	$('#installation_b').html("Installation");
	$('#quit').html("Quit");
	$('#upgrade').html("System");
	$('#system').html("System");
	$('#upload').html("Upload Key");
	$('#lang').html("简体中文");
	$('#debug_b').html("Debug");

	$('.RCSTStatus').html("RCSTStatus");
	$('.ACUStatus').html("ACU Status");
	$('.Network').html("Network");
	$('.RF').html("RF");
	$('.ViewLog').html("ViewLog");
	$('.ProcessMonitoring').html("ProcessMonitoring");
	$('.Mesh').html("Mesh");

	$('.debugCommand').html("Debug Command");
	$('.inputCommand').html("Input Command");
	$('.starSwitch').html("Star Switch");
	$('.starMode').html("Star Mode");
	$('.seekstarMode').html("Seek Star Mode");
	$('.Beacon').html("Beacon");
	$('.Carrier').html("Carrier");
	$('.AnyBeam').html("AnyBeam");
	$('.upperComputer').html("Upper Computer Switch");
	$('.snrThreshold').html("Snr Threshold");
	$('.beamsearchNum').html("Beam Search Num	");
	$('.beamsearchSwitch').html("Beam Search Switch");
	$('.BeamDecision').html("Beam Decision");
	$('.BeamDecisionSwitch').html("Beam Decision Switch");
	$('.ACUIPPacketFilter').html("ACUIP Packet Filter");
	$('.ACUIPPacketFilterSwitch').html("ACUIP Packet Filter Switch");
	$('.IFFixed').html("IF Fixed");
	$('.IFFixedselect').html("IF Fixed select");
	$('.IFFixednum').html("IF Fixed num");
	$('.NOIFFixed').html("NO IF Fixed");
	$('.IFFixed').html("IF Fixed");
	$('.Submit').html("Submit");
	$('.Antenna_Test').html("Antenna Test");
	$('.ResetSwitch').html("No Reset Switch");
	$('.MainbackSwitch').html("No Mainback Switch");
	$('.Auth_Test').html("Authentication");
	$('.Auth_Switch').html("Authentication Switch");

	$('.time_control').html("Time Control");
	$('.locktime_short').html("No Lock Short Time Control");
	$('.locktime').html("No Lock Time Control");
	$('.synctime').html("No Sync Time Control");
	$('.mainbacktime').html("No Mainback Time Control");
	$('.NetwokModeinterfaceconfig').html("NetwokModeinterfaceconfig");
	$('.networkinterfaceacu').html("networkinterface acu ip");
	$('.networkinterfaceveh').html("networkinterface Upper ip");
	$('.networkinterfaceeth1enable').html("networkinterface eth1 enable");
	$('.yes').html("YES");
	$('.no').html("NO");
	$('.eth0').html("eth0");
	$('.eth1').html("eth1");


	switch_ing = "Configuring,please wait";
	switch_open = "Open Success";
	switch_close = "Close Success";
	switch_error = "False!Please try again";
	alert_title = "Prompt Message";
	setup_succ = "Setup success";
	setup_failed = "Setup failed";
	sig_text1 = "Notice: RF transmiting will be stopped automatically after";
	sig_text2 = "seconds";
	outofrange = "Out Of Range";

	validate_blank = "can not be blank";
	validate_number = "must be number";
	validate_integer = "must be integer";
	validate_less = "must be not less than ";
	validate_greater = "must be not greater than ";
	validate_ip = "consist of 4 munbers between 0 to 255, separate the numbers with .";

	$('#rcst').html("RCST");
	$('#space').html("Space Star Technology Co.,Ltd");
}
function trans_zh() {
	$('#lang').val('zh');
	$('#hometitle').html("主界面");
	$('#odutitle').html("室外单元");
	$('#administrator').html("管理员");
	$('#terminal_b').html("终端状态");
	$('#odu_b').html("射频");
	$('#network_b').html("网络");
	$('#diagnostics_b').html("调试模式");
	$('#installation_b').html("初始安装");
	$('#quit').html("退出");
	$('#upgrade').html("系统");
	$('#system').html("系统");
	$('#upload').html("上传证书");
	$('#lang').html("English");
	$('#debug_b').html("调试");

	$('.RCSTStatus').html("终端状态");
	$('.ACUStatus').html("ACU状态");
	$('.Network').html("网络");
	$('.RF').html("射频");
	$('.ViewLog').html("日志查看");
	$('.ProcessMonitoring').html("进程监控");
	$('.Mesh').html("网状网");

	$('.debugCommand').html("调试命令");
	$('.inputCommand').html("输入命令");
	$('.starMode').html("输入命令");
	$('.starSwitch').html("上星开关");
	$('.starMode').html("上星模式");
	$('.seekstarMode').html("天线搜星模式");
	$('.Beacon').html("信标");
	$('.Carrier').html("载波");
	$('.AnyBeam').html("随遇波束");
	$('.BeamDecision').html("波束决策");
	$('.BeamDecisionSwitch').html("波束决策开关");
	$('.ACUIPPacketFilter').html("ACUIP过滤");
	$('.ACUIPPacketFilterSwitch').html("ACUIP过滤开关");
	$('.IFFixed').html("发射中频固定");
	$('.IFFixedselect').html("发射中频模式");
	$('.IFFixednum').html("发射中频固定值");
	$('.NOIFFixed').html("不固定中频");
	$('.IFFixed').html("固定中频");
	$('.upperComputer').html("上位机开关");
	$('.snrThreshold').html("SNR 阈值");
	$('.beamsearchNum').html("地图查询次数");
	$('.beamsearchSwitch').html("地图查询开关");
	$('.Submit').html("提交");
	$('.Antenna_Test').html("天线测试");
	$('.ResetSwitch').html("禁止复位开关");
	$('.MainbackSwitch').html("禁止主备开关");
	$('.Auth_Test').html("认证测试");
	$('.Auth_Switch').html("认证开关");

	$('.time_control').html("时间控制");
	$('.locktime_short').html("最短失锁控制时间");
	$('.locktime').html("最长失锁控制时间");
	$('.synctime').html("失步控制时间");
	$('.mainbacktime').html("禁止主备控制时间");
	$('.NetwokModeinterfaceconfig').html("管理口网络配置");
	$('.networkinterfaceacu').html("acu通信ip管理口设置");
	$('.networkinterfaceveh').html("上位机通信ip管理口设置");
	$('.networkinterfaceeth1enable').html("eth1是否配置业务ip");
	$('.yes').html("YES");
	$('.no').html("NO");
	$('.eth0').html("eth0");
	$('.eth1').html("eth1");

	switch_ing = "配置中，请稍后";
	switch_error = "失败！请重试";
	switch_close = "关闭成功";
	switch_open = "打开成功";
	setup_succ = "设置成功";
	setup_failed = "设置失败";
	sig_text1 = "注意：单载波发射将在";
	sig_text2 = "秒后自动停止";
	outofrange = "超出范围";
	alert_title = "提示信息";

	validate_blank = "不能为空";
	validate_number = "必须为数字";
	validate_integer = "必须为整数";
	validate_less = "必须大于等于";
	validate_greater = "必须小于等于";
	validate_ip = "由4个 0~255 之间的数字组成，数字之间用点区隔";

	$('.note1').html("注：关闭该开关时，终端在波束重叠区下线时，将根据当前位置信息轮询重叠区各波束，比较信噪比高低，选择最优波束上线;");
	$('.note2').html("打该开关时，将根据当前位置，计算与重叠区各波束中心点距离远近，选择最优波束上线。（计算与波束中心点距离功能需要主站提供的波束地图中带有各波束中心点坐标）");

	$('#rcst').html("卫星通信终端站");
	$('#space').html("航天恒星科技有限公司(503所)");
}
function trans_zh_HK() {
	$('#lang').val('zhHK');
	$('#hometitle').html("主界面");
	$('#odutitle').html("室外單元");
	$('#administrator').html("管理員");
	$('#terminal_b').html("終端狀態");
	$('#odu_b').html("射頻");
	$('#network_b').html("網絡");
	$('#diagnostics_b').html("調試模式");
	$('#installation_b').html("初始安裝");
	$('#quit').html("退出");
	$('#upgrade').html("系統");
	$('#system').html("系統");
	$('#upload').html("上傳證書");
	$('#lang').html("English");
	$('#debug_b').html("調試");

	$('.RCSTStatus').html("終端狀態");
	$('.ACUStatus').html("ACU狀態");
	$('.Network').html("網絡");
	$('.RF').html("射頻");
	$('.ViewLog').html("日誌查看");
	$('.ProcessMonitoring').html("進程監控");
	$('.Mesh').html("網狀網");

	$('.debugCommand').html("調試命令");
	$('.inputCommand').html("輸入命令");
	$('.starMode').html("輸入命令");
	$('.starSwitch').html("上星開關");
	$('.starMode').html("上星模式");
	$('.seekstarMode').html("天線搜星模式");
	$('.Beacon').html("信標");
	$('.Carrier').html("載波");
	$('.AnyBeam').html("隨遇波束");
	$('.BeamDecision').html("波束決策");
	$('.BeamDecisionSwitch').html("波束決策開關");
	$('.ACUIPPacketFilter').html("ACUIP過濾");
	$('.ACUIPPacketFilterSwitch').html("ACUIP過濾开关");
	$('.IFFixed').html("發射中頻固定");
	$('.IFFixedselect').html("發射中頻模式");
	$('.IFFixednum').html("發射中頻固定值");
	$('.NOIFFixed').html("不固定中頻");
	$('.IFFixed').html("固定中頻");
	$('.upperComputer').html("上位機開關");
	$('.snrThreshold').html("SNR 閾值");
	$('.beamsearchNum').html("地圖查詢次數");
	$('.beamsearchSwitch').html("地圖查詢開關");
	$('.Submit').html("提交");
	$('.Antenna_Test').html("天線測試");
	$('.ResetSwitch').html("禁止重定開關");
	$('.MainbackSwitch').html("禁止主備開關");
	$('.Auth_Test').html("認證測試");
	$('.Auth_Switch').html("認證開關");

	$('.time_control').html("時間控制");
	$('.locktime_short').html("最短失鎖控制時間");
	$('.locktime').html("最長失鎖控制時間");
	$('.synctime').html("失步控制時間");
	$('.mainbacktime').html("禁止主備控制時間");
	$('.NetwokModeinterfaceconfig').html("管理口網絡配置");
	$('.networkinterfaceacu').html("acu通信ip管理口設置");
	$('.networkinterfaceveh').html("上位機通信ip管理口設置");
	$('.networkinterfaceeth1enable').html("eth1是否配置業務ip");
	$('.yes').html("YES");
	$('.no').html("NO");
	$('.eth0').html("eth0");
	$('.eth1').html("eth1");

	switch_ing = "配置中，請稍後";
	switch_error = "失敗！請重試";
	switch_close = "關閉成功";
	switch_open = "打開成功";
	setup_succ = "設置成功";
	setup_failed = "設置失敗";
	sig_text1 = "注意：單載波發射將在";
	sig_text2 = "秒後自動停止";
	outofrange = "超出範圍";
	alert_title = "提示資訊";

	validate_blank = "不能為空";
	validate_number = "必須為數位";
	validate_integer = "必須為整數";
	validate_less = "必須大於等於";
	validate_greater = "必須小於等於";
	validate_ip = "由4個 0~255 之間的數位組成，數位之間用點區隔";

	$('.note1').html("注：關閉該開關時，終端在波束重疊區下線時，將根據當前位置資訊輪詢重疊區各波束，比較信噪比高低，選擇最優波束上線;");
	$('.note2').html("打該開關時，將根據當前位置，計算與重疊區各波束中心點距離遠近，選擇最優波束上線。（計算與波束中心點距離功能需要主站提供的波束地圖中帶有各波束中心點座標）");

	$('#rcst').html("衛星通信終端站");
	$('#space').html("航天恆星科技有限公司(503所)");
}

