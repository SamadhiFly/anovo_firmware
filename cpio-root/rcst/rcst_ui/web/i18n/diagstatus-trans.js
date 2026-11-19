rcstTypeGet();
var loading;
var badaddr;
var setup_failed;
var sig_text1;
var sig_text2;
var outofrange;
var shownone;
var Alarmmessage;
var message32;
var message38;
var message39;
var message42;
var message10005;
var message10009;
var message10011;
var message10013;
var message10015;
var message102;
var message103;
var message104;
var message105;
var message106;
var auth_success;
var auth_failed;
var no_auth;

var Locked;
var Unlocked;
var HOLD_STANDBY;
var OFF_STANDBY;
var READY_LOGON;
var READY_TDMA_SYNC;
var READY_FDMA_SYNC;
var TDMA_SYNC;
var FDMA_SYNC;
var NCR_ROCOVERY;
var STATUS_OFF;
var READY_FOR_SCPC_SYNC;
var SCPC_SYNC;
var NCR_ROCOVERY;
function trans_en() {
	$('#lang').val('en');
	$('#administrator').html("Administrator");
	$('#terminal_b').html("Terminal Status");
	$('#odu_b').html("RF");
	$('#network_b').html("Network");
	$('#diagnostics_b').html("Diagnostics");
	$('#installation_b').html("Installation");
	$('#quit').html("Quit");
	$('#upgrade').html("System");
	$('#system').html("System");
	$('#upload').html("Upload Key");
	$('#lang').html("简体中文");

	$('.RCSTStatus').html("RCSTStatus");
	$('.ACUStatus').html("ACU Status");
	$('.Network').html("Network");
	$('.RF').html("RF");
	$('.ViewLog').html("ViewLog");
	$('.ProcessMonitoring').html("ProcessMonitoring");
	$('.Mesh').html("Mesh");

	if (0 == space0_or_weitong1) {
		if (38 == rcst_xph_type) {
			$('.rcst_type').html('SATBOX631');
		}
		else if (39 == rcst_xph_type) {
			$('.rcst_type').html('SATBOX631-LI');
		}
		else if (40 == rcst_xph_type) {
			$('.rcst_type').html('SATBOX520-LI');
		}
		else if (35 == rcst_xph_type) {
			$('.rcst_type').html('SATBOX530');
		}
	}
	else if (1 == space0_or_weitong1) {
		if (38 == rcst_xph_type) {
			$('.rcst_type').html('ChinaSat-HaoWang-X12');
		}
		else if (35 == rcst_xph_type) {
			$('.rcst_type').html('ChinaSat-HaoWang-X11');
		}
	}
	else if (2 == space0_or_weitong1) {
		$('.rcst_type').html('SCE-BBU');
	}
	else if (space0_or_weitong1 == 3) {
		$('.rcst_type').html('G600T');
	}

	$('#diagnosticstitle').html("diagnostics");
	$('.TerminalType').html("Terminal Type");
	$('.FLRunning').html("FL Running Status Parameter");
	$('.LockedStatus').html("Locked Status");
	$('.SymbolRate').html("Symbol Rate");
	$('.SignalStrength').html("Signal Strength");
	$('.RXMode').html("RX Mode");
	$('.ModulationType').html("Modulation Type");
	$('.SNR').html("SNR");
	$('.LockedFrequency').html("Locked Frequency");
	$('.BER').html("BER");
	if (rcstType == 0) {
		$('.FLBBFrame').html("FL BBFrame");
		$('.FLMBBFrame').html("FL M BBFrame");
		$('.FLRXGSE').html("FL RX GSE");
		$('.FLTXGSE').html("FL TX GSE");
		$('.RLFPGARX').html("RL Plaintext FPGA RX");
		$('.RLFPGATX').html("RL Plaintext FPGA TX");
		$('.RLMFPGARX').html("RL M Ciphertext FPGA RX");
		$('.RLMFPGATX').html("RL M Ciphertext FPGA TX");
	} else if (rcstType == 1) {
		$('.FLMBBFrame').html("FL M BBFrame");
		$('.FLBBFrame').html("FL BBFrame");
		$('.FLGSE').html("FL GSE");
		$('.RLFPGARX').html("RL Plaintext FPGA RX");
		$('.RLFPGATX').html("RL Plaintext FPGA TX");
		$('.RLMFPGARX').html("RL Ciphertext FPGA RX");
		$('.RLMFPGATX').html("RL Ciphertext FPGA TX");
		$('.TotalRXTBTP1').html("Total RX TBTP1");
		$('.FreeTBTP1').html("Free TBTP1");
		$('.LocalTBTP1').html("Local TBTP1");
		$('.FLTS').html("FL TS");
		$('.FLTSUncontinus').html("FL TS Uncontinus");
		$('.FLCRCError').html("FL CRC Error");
		$('.RLBBFrameLen').html("RL BBFrame Len");
		$('.RLTRFTotalLen').html("RL TRF Total Len");
		$('.RLTS').html("RL TS");
		$('.RLBBFrame').html("RL BBFrame");
		$('.RLBBFrameEfficiency').html("RL BBFrame Efficiency");
		$('.RL40msCount').html("RL 40ms Count");
		$('.RLSKBListCount').html("RL SKB List Count");
		$('.RLLossTS').html("RL Loss TS");
	} else if (rcstType == 2) {
		$('.rcst_type').html('MESH');
		$('.MeshRunning').html("Mesh Running Status Parameter");
		$('.TBTP3_CNT').html("TBTP3_CNT");
		$('.TS_CNT').html("TS_CNT");
		$('.LocalTBTP3').html("Local TBTP3");
		$('.TSAllocTAB').html("TS Alloc TAB");
		$('.Unassign TBTP3').html("Unassign TBTP3");
		$('.ActiveRoute').html("Active Route");
		$('.SendLinkNum').html("Send Link Num");
		$('.RecvLinkNum').html("Recv Link Num");
	} else {

	}
	$('.UnicastTIM').html("Unicast Sig");
	$('.BroadcastTIM').html("Broadcast Sig");
	$('.TotalRXTBTP').html("Total RXTBTP");
	$('.LocalTBTP').html("Local TBTP");
	$('.NoDistributionTBTP').html("No Distribution TBTP");
	$('.AcquiredLBSlot').html("Acquired LB Slot");
	$('.AcquiredCBSlot').html("Acquired CB Slot");
	$('.AcquiredTRFSlot').html("Acquired TRF Slot");
	$('.FLGSE').html("FL GSE");
	$('.TotalFLTS').html("Total FLTS");
	$('.FLBBFrame').html("FL BB Frame");
	$('.FLTSDiscontinuity').html("FL TS Discontinuity");
	$('.FLPDUCRCError').html("FL PDU CRC Error");
	$('.FLUnicastIP').html("FL Unicast IP");
	$('.FLBroadcastIP').html("FL Broadcast IP");
	$('.FLInterruptOfFL1ms').html("FL Interrupt Of FL 1ms");
	$('.FLTotalUnlocked').html("FL Total Unlocked");

	$('.RLRunning').html("RL Running Status Parameter");
	$('.RunningStatus').html("Running Status");
	$('.AuthStatus').html("Auth Status");
	$('.RLRate').html("RL Rate");
	$('.TXPower').html("TX Power");
	$('.ModulationType').html("Modulation Type");
	$('.SentLB').html("Login Sig");
	$('.SentCB').html("SYNC Sig");
	$('.SentTRF').html("Sent TRF");
	$('.RLIPPackage').html("RL IP Package");
	$('.TotalTrafficRequest').html("Total Traffic Request");
	$('.RLIPPackageBacklog').html("RL IP Package Backlog");
	$('.RL40msInterruptLost').html("RL 40ms Interrupt Lost");
	$('.RLpcrOverdued').html("RL pcr Overdued");
	$('.RLBurstCNT').html("RL Burst CNT");
	$('.RLBursttoFPGACNT').html("RL Burst to FPGA CNT");

	$('.FPGA').html("FPGA Parameter Statistical");
	$('.GSE_CNT').html("GSE_CNT");
	$('.TotalFLTS').html("Total FLTS");
	$('.FLBBFrame').html("FL BBFrame");
	$('.RLFPGARCVPacket').html("RL FPGA RCV Packet");
	$('.RLFPGATXPacket').html("RL FPGA TX Packet");

	$('.TerminalReset').html("Terminal Reset Statistical");
	$('.HardwareReset').html("Hardware Reset");
	$('.SoftwareReset').html("Software Reset");

	$('.CurrentSatellite').html("Current Satellite Resource");
	$('.CurrentBeamID').html("Current Beam ID");

	$('.UnicastTIM').html("Unicast Sig");
	$('.BroadcastTIM').html("Broadcast Sig");
	$('.RXUnicastIP').html("RX Unicast IP");
	$('.RXBroadcastIP').html("RX Broadcast IP");
	$('.RXUnlockTotal').html("RX Unlock Total");
	$('.RXUnSYNCTotal').html("RX UnSYNC Total");
	$('.FPGAGSE').html("FPGA GSE");
	$('.FPGABBFrame').html("FPGA BBFrame");

	$('.TXRate').html("TX Rate");
	$('.SigRate').html("Sig Rate");
	$('.TrfRate').html("Trf Rate");
	$('.SigPower').html("Sig Power");
	$('.TrfPower').html("Trf Power");
	$('.SigModcod').html("Sig Modcod");
	$('.TrfModcod').html("Trf Modcod");
	$('.TXSNR').html("TX SNR");
	$('.SigSNR').html("Sig SNR");
	$('.TrfSNR').html("Trf SNR");

	$('.LoginSig').html("Login Sig");
	$('.SYNCSig').html("SYNC Sig");
	$('.TrfTX').html("Trf TX");
	$('.RLIPPackageBacklog').html("RL Package Backlog");
	$('.FPGARXPackage').html("FPGA RX Package");
	$('.FPGATXPackage').html("FPGA TX Package");

	auth_success = "Auth success";
	auth_failed = "Auth failed";
	no_auth = "No Auth";
	Alarmmessage = "Alarm message";
	message32 = "Terminal FL is abnormal. It is recommended to debug as the following order:" + "<br/>" +
		"(1) Confirm the weather;" + "<br/>" +
		"(2) Confirm whether the FL carrier has interference;" + "<br/>" +
		"(3) Confirm LNB status;" + "<br/>" +
		"(4) Confirm whether the modulation transmission is nomal." + "<br/>";
	message38 = "<%:Terminal logoff due to NCC send FAILURE event." + "<br/>";
	message39 = "<%:Terminal logoff due to NCC send LOGOFF event." + "<br/>";
	message42 = "<%:Terminal logoff due to NCC send TX_DISABLE event." + "<br/>";
	message10005 = "<%:Terminal FL is abnormal. It is recommended to debug as the following order:" + "<br/>" +
		"<%:(1) Confirm the weather;" + "<br/>" +
		"<%:(2) Confirm whether the FL carrier has interference;" + "<br/>" +
		"<%:(3) Confirm LNB status;" + "<br/>" +
		"<%:(4) Confirm whether the modulation transmission is nomal." + "<br/>";
	message10009 = "<%:ACU connection is failed. It is reconmmeded to confirm the network connection of ACU or check the running status of ACU." + "<br/>";
	message10010 = "<%:ACU is unlocked, and FL is unlocked." + "<br/>" +
		"<%:Terminal FL is abnormal. It is recommended to debug as the following order:" + "<br/>" +
		"<%:(1) Confirm the weather;" + "<br/>" +
		"<%:(2) Confirm whether the FL carrier has interference;" + "<br/>" +
		"<%:(3) Confirm LNB status;" + "<br/>" +
		"<%:(4) Confirm whether the satellite parameters are correct." + "<br/>";
	message10011 = "<%:Send beam change lock info to ACU failed. It is reconmmeded to confirm the network connection of ACU or check the running status of ACU." + "<br/>";


	message10013 = "<%:Location information has not been updated for a long time. It is reconmmeded to confirm the network connection of ACU or check the running status of ACU." + "<br/>";

	message10015 = "<%:ACU lock info not received for a long time. It is reconmmeded to confirm the network connection of ACU or check the running status of ACU." + "<br/>";

	message102 = "<%:ACU is locked, and FL is unlocked. Terminal FL is abnormal. PLease contact the administrator." + "<br/>";

	message103 = "<%:FL receive is abnormal. It is recommended to debug as the following order:" + "<br/>" +
		"<%:(1) Confirm whether the lock info is transmit form Anovo system;" + "<br/>" +
		"<%:(2) Check NMS, confirm whether the modulation channel send date normally." + "<br/>";
	message104 = "<%:Terminal can not move to SYNC for a long time. It is recommended to debug as the following order:" + "<br/>" +
		"<%:(1) RL frequency may be over range. Please check whether the RX Local Oscillator configuration is correct." + "<br/>";

	message105 = "<%:Terminal can not move to SYNC for a long time. It is recommended to debug as the following order:" + "<br/>" +
		"<%:(1) Set link delay to manual. Please confirm the calculation is correct." + "<br/>" +
		"<%:(2) Set link delay to auto:" + "<br/>" +
		"<%:(2.1) Please confirm the longitude and latitude in RF page are correct;" + "<br/>" +
		"<%:(2.2) Please confirm the satellite longitude and NCC latitude in NMS are correct. Note: if update, please reboot the NCC;" + "<br/>" +
		"<%:(3) Please confirm whether terminal RF transmit is normal. It is recommended to send single carrier and confirm whether the single is distorted nad deviated;" + "<br/>" +
		"<%:(4) Please confirm terminal MAC is correct and updated;" + "<br/>" +
		"<%:(5) Please adjust transmit power." + "<br/>";

	message106 = "<%:Terminal can not move to SYNC for a long time. It is recommended to debug as the following order:" + "<br/>" +
		"<%:(1) Set link delay to manual. Please confirm the calculation is correct." + "<br/>" +
		"<%:(2) Set link delay to auto:" + "<br/>" +
		"<%:(2.1) Please confirm the longitude and latitude in RF page are correct;" + "<br/>" +
		"<%:(2.2) Please confirm the satellite longitude and NCC latitude in NMS are correct. Note: if update, please reboot the NCC;" + "<br/>" +
		"<%:(3) Please confirm whether terminal RF transmit is normal. It is recommended to send single carrier and confirm whether the single is distorted nad deviated;" + "<br/>";


	Locked = "Locked";
	Unlocked = "Unlocked";
	HOLD_STANDBY = "HOLD_STANDBY";
	OFF_STANDBY = "OFF_STANDBY";
	READY_LOGON = "READY_LOGON";
	READY_TDMA_SYNC = "READY_TDMA_SYNC";
	READY_FDMA_SYNC = "READY_FDMA_SYNC";
	TDMA_SYNC = "TDMA_SYNC";
	FDMA_SYNC = "FDMA_SYNC";
	NCR_ROCOVERY = "NCR_ROCOVERY";
	STATUS_OFF = "STATUS_OFF";
	READY_FOR_SCPC_SYNC = "READY_FOR_SCPC_SYNC";
	SCPC_SYNC = "SCPC_SYNC";
	NCR_ROCOVERY = "NCR_ROCOVERY";

}
function trans_zh() {
	$('#lang').val('zh');
	$('#hometitle').html("主界面");
	$('#odutitle').html("室外单元");
	$('#administrator').html("管理员");
	$('#terminal_b').html("终端状态");
	$('#odu_b').html("射频");
	$('#network_b').html("网络");
	$('#diagnostics_b').html("诊断");
	$('#installation_b').html("初始安装");
	$('#quit').html("退出");
	$('#upgrade').html("系统");
	$('#system').html("系统");
	$('#upload').html("上传证书");
	$('#lang').html("English");

	$('.RCSTStatus').html("终端状态");
	$('.ACUStatus').html("ACU状态");
	$('.Network').html("网络");
	$('.RF').html("射频");
	$('.ViewLog').html("日志查看");
	$('.ProcessMonitoring').html("进程监控");
	$('.Mesh').html("网状网");

	if (0 == space0_or_weitong1) {
		if (38 == rcst_xph_type) {
			$('.rcst_type').html('SATBOX631');
		}
		else if (39 == rcst_xph_type) {
			$('.rcst_type').html('SATBOX631-LI');
		}
		else if (40 == rcst_xph_type) {
			$('.rcst_type').html('SATBOX520-LI');
		}
		else if (35 == rcst_xph_type) {
			$('.rcst_type').html('SATBOX530');
		}
	}
	else if (1 == space0_or_weitong1) {
		if (38 == rcst_xph_type) {
			$('.rcst_type').html('中星昊网-X12');
		}
		else if (35 == rcst_xph_type) {
			$('.rcst_type').html('中星昊网-X11');
		}
	}
	else if (2 == space0_or_weitong1) {
		$('.rcst_type').html('SCE-BBU');
	}
	else if (space0_or_weitong1 == 3) {
		$('.rcst_type').html('G600T');
	}

	$('#diagnosticstitle').html("诊断状态");
	$('.TerminalType').html("终端类型：");
	$('.FLRunning').html("前向链路运行参数");
	$('.LockedStatus').html("锁定状态");
	$('.SymbolRate').html("符号速率");
	$('.SignalStrength').html("信号强度");
	$('.RXMode').html("接收模式");
	$('.ModulationType').html("调制方式");
	$('.SNR').html("信噪比");
	$('.LockedFrequency').html("锁定频率");
	$('.BER').html("误码率");
	if (rcstType == 0) {
		$('.FLMBBFrame').html("前向密文BBFrame");
		$('.FLBBFrame').html("前向BBFrame");
		$('.FLRXGSE').html("前向接收GSE");
		$('.FLTXGSE').html("前向发送GSE");
		$('.RLFPGARX').html("回传明文FPGA接收包");
		$('.RLFPGATX').html("回传明文FPGA发送包");
		$('.RLMFPGARX').html("回传密文FPGA接收包");
		$('.RLMFPGATX').html("回传密文FPGA发送包");
	} else if (rcstType == 1) {
		$('.FLMBBFrame').html("前向密文BBFrame");
		$('.FLBBFrame').html("前向BBFrame");
		$('.FLGSE').html("前向GSE");
		$('.RLFPGARX').html("回传明文FPGA接收包");
		$('.RLFPGATX').html("回传明文FPGA发送包");
		$('.RLMFPGARX').html("回传密文FPGA接收包");
		$('.RLMFPGATX').html("回传密文FPGA发送包");

		$('.TotalRXTBTP1').html("接收TBTP1总计");
		$('.FreeTBTP1').html("空闲TBTP1");
		$('.LocalTBTP1').html("本地TBTP1");
		$('.FLTS').html("前向TS");
		$('.FLTSUncontinus').html("前向TS不连续");
		$('.FLCRCError').html("前向CRC错误");
		$('.RLBBFrameLen').html("回传BBFrame长度");
		$('.RLTRFTotalLen').html("回传TRF总长度");
		$('.RLTS').html("回传TS");
		$('.RLBBFrame').html("回传BBFrame");
		$('.RLBBFrameEfficiency').html("回传BBFrame效率");
		$('.RL40msCount').html("40ms中断计数");
		$('.RLSKBListCount').html("回传业务包数");
		$('.RLLossTS').html("回传TS丢失");
	} else if (rcstType == 2) {
		$('.rcst_type').html('网状网终端');
		$('.MeshRunning').html("网状网运行参数");
		$('.TBTP3_CNT').html("接收TBTP3总计");
		$('.TS_CNT').html("网状网TS总计");
		$('.LocalTBTP3').html("属于本小站TBTP3");
		$('.TSAllocTAB').html("时隙分配表");
		$('.Unassign TBTP3').html("未分配TBTP3");
		$('.ActiveRoute').html("有效路由");
		$('.SendLinkNum').html("发射链路数");
		$('.RecvLinkNum').html("接收链路数");
	} else {
	}

	$('.UnicastTIM').html("单播信令");
	$('.BroadcastTIM').html("广播信令");
	$('.TotalRXTBTP').html("接收TBTP总计");
	$('.LocalTBTP').html("属于本小站TBTP");
	$('.NoDistributionTBTP').html("TBTP无分配");
	$('.AcquiredLBSlot').html("获得LB时隙");
	$('.AcquiredCBSlot').html("获得CB时隙");
	$('.AcquiredTRFSlot').html("获得TRF时隙");
	$('.FLGSE').html("前向GSE");
	$('.TotalFLTS').html("前向TS总计");
	$('.FLBBFrame').html("前向BBFrame");
	$('.FLTSDiscontinuity').html("前向TS不连续");
	$('.FLPDUCRCError').html("前向CRC错误");
	$('.FLUnicastIP').html("前向单播IP");
	$('.FLBroadcastIP').html("前向组播IP");
	$('.FLInterruptOfFL1ms').html("前向1ms中断");
	$('.FLTotalUnlocked').html("前向失锁统计");

	$('.RLRunning').html("回传链路运行参数");
	$('.RunningStatus').html("运行状态");
	$('.AuthStatus').html("认证状态");
	$('.RLRate').html("回传速率");
	$('.TXPower').html("发送功率");
	$('.ModulationType').html("调制方式");
	$('.SentLB').html("登陆信令");
	$('.SentCB').html("同步信令");
	$('.SentTRF').html("TRF发射");
	$('.RLIPPackage').html("回传IP包");
	$('.TotalTrafficRequest').html("业务申请总和");
	$('.RLIPPackageBacklog').html("回传压包");
	$('.RL40msInterruptLost').html("回传40ms中断丢失");
	$('.RLpcrOverdued').html("回传pcr过期");
	$('.RLBurstCNT').html("回传突发");
	$('.RLBursttoFPGACNT').html("FPGA回传突发");

	$('.FPGA').html("FPGA参数统计");
	$('.GSE_CNT').html("前向GSE");
	$('.TotalFLTS').html("前向TS总计");
	$('.FLBBFrame').html("前向BBFrame");
	$('.RLFPGARCVPacket').html("回传FPGA接收包");
	$('.RLFPGATXPacket').html("回传FPGA发射包");

	$('.TerminalReset').html("终端复位统计");
	$('.HardwareReset').html("硬件复位统计");
	$('.SoftwareReset').html("软件复位统计");


	$('.CurrentSatellite').html("当前卫星资源");
	$('.CurrentBeamID').html("当前波束ID");

	$('.UnicastTIM').html("单播信令");
	$('.BroadcastTIM').html("广播信令");
	$('.RXUnicastIP').html("接收单播IP");
	$('.RXBroadcastIP').html("接收组播IP");
	$('.RXUnlockTotal').html("接收失锁统计");
	$('.RXUnSYNCTotal').html("接收失步统计");
	$('.FPGAGSE').html("FPGA GSE");
	$('.FPGABBFrame').html("FPGA BBFrame");

	$('.TXRate').html("发送速率");
	$('.SigRate').html("信令速率");
	$('.TrfRate').html("业务速率");
	$('.SigPower').html("信令功率");
	$('.TrfPower').html("业务功率");
	$('.SigModcod').html("信令调制方式");
	$('.TrfModcod').html("业务调制方式");
	$('.TXSNR').html("发送信噪比");
	$('.SigSNR').html("信令信噪比");
	$('.TrfSNR').html("业务信噪比");

	$('.LoginSig').html("登陆信令");
	$('.SYNCSig').html("同步信令");
	$('.TrfTX').html("业务发送");
	$('.RLIPPackageBacklog').html("回传压包");
	$('.FPGARXPackage').html("FPGA发送包");
	$('.FPGATXPackage').html("FPGA接收包");

	auth_success = "认证成功";
	auth_failed = "认证失败";
	no_auth = "不认证";
	Alarmmessage = "告警信息";
	message32 = "终端前向异常，建议按照如下顺序排查：" + "<br/>" +
		"(1) 确认天气情况;" + "<br/>" +
		"(2) 确认前向载波是否有干扰;" + "<br/>" +
		"(3) 确认LNB状态;" + "<br/>" +
		"(4) 确认调制发送是否正常" + "<br/>";
	message38 = "网控下发FAILURE事件下线" + "<br/>";
	message39 = "网控下发LOGOFF事件下线" + "<br/>";
	message42 = "网控下发TX_DISABLE事件下线" + "<br/>";
	message10005 = "端前向异常，建议按照如下顺序排查：" + "<br/>" +
		"(1) 确认天气情况;" + "<br/>" +
		"(2) 确认前向载波是否有干扰;" + "<br/>" +
		"(3) 确认LNB状态;" + "<br/>" +
		"(4) 确认调制发送是否正常" + "<br/>";
	message10009 = "ACU连接失败，建议确认ACU网络连接或查看ACU运行状态是否正常" + "<br/>";
	message10010 = "ACU未锁定，前向未锁定" + "<br/>" +
		"终端前向异常，建议按照如下顺序排查:" + "<br/>" +
		"(1) 确认天气情况;" + "<br/>" +
		"(2) 确认前向载波是否有干扰;" + "<br/>" +
		"(3) 确认LNB状态;" + "<br/>" +
		"(4) 确认调制发送是否正常" + "<br/>";
	message10011 = "波束切换锁定信息下发ACU失败，建议确认ACU网络连接或查看ACU运行状态是否正常" + "<br/>";


	message10013 = "位置长时间没有更新，建议确认ACU网络连接或查看ACU运行状态是否正常" + "<br/>";

	message10015 = "长时间未收到ACU锁定信息，建议确认ACU网络连接或查看ACU运行状态是否正常" + "<br/>";

	message102 = "ACU锁定，前向未锁。终端前向异常，请联系管理员" + "<br/>";

	message103 = "前向接收异常，建议按照如下顺序排查:" + "<br/>" +
		"(1)确认前向锁定信息是否是Anovo系统发送;" + "<br/>" +
		"(2) 查看网管，确认对应调制通道是否正常发送数据" + "<br/>";
	message104 = "终端长时间不能上线，建议按照如下顺序排查:" + "<br/>" +
		"(1) 链路延时配置为手动，请确认计算无误;" + "<br/>";

	message105 = "终端长时间不能上线，建议按照如下顺序排查:" + "<br/>" +
		"(1) 链路延时配置为手动，请确认计算无误" + "<br/>" +
		"(2) 链路延时配置为自动:" + "<br/>" +
		"(2.1) 请确认终端射频界面经纬度输入正确;" + "<br/>" +
		"(2.2) 请确认网管配置卫星经度和网控经纬度正确，提示：如有更新，请重启网控；" + "<br/>" +
		"(3) 确认终端射频发送正常，建议发送单载波，确认单载波形是否畸变和偏移;" + "<br/>" +
		"(4) 终端MAC确认是否输入有误或忘记更新；" + "<br/>" +
		"(5) 调整发送功率，调大或调小" + "<br/>";

	message106 = "终端长时间不能上线，建议按照如下顺序排查:" + "<br/>" +
		"(1) 链路延时配置为手动，请确认计算无误" + "<br/>" +
		"(2) 路延时配置为自动:" + "<br/>" +
		"(2.1) 确认终端射频界面经纬度输入正确;" + "<br/>" +
		"(2.2)请确认网管配置卫星经度和网控经纬度正确，提示：如有更新，请重启网控；" + "<br/>" +
		"(3) 确认终端射频发送正常，建议发送单载波，确认单载波形是否畸变和偏移" + "<br/>";


	Locked = "锁定";
	Unlocked = "未锁定";
	HOLD_STANDBY = "保持待机";
	OFF_STANDBY = "离线";
	READY_LOGON = "准备登录";
	READY_TDMA_SYNC = "准备同步";
	READY_FDMA_SYNC = "准备同步";
	TDMA_SYNC = "已同步";
	FDMA_SYNC = "已同步";
	NCR_ROCOVERY = "NCR修复";
	STATUS_OFF = "未知";
	READY_FOR_SCPC_SYNC = "准备同步";
	SCPC_SYNC = "已同步";
	NCR_ROCOVERY = "NCR修复";
}
function trans_zh_HK() {
    $('#lang').val('zhHK');
    $('#hometitle').html("主界面");
    $('#odutitle').html("室外單元");
    $('#administrator').html("管理員");
    $('#terminal_b').html("終端狀態");
    $('#odu_b').html("射頻");
    $('#network_b').html("網絡");
    $('#diagnostics_b').html("診斷");
    $('#installation_b').html("初始安裝");
    $('#quit').html("退出");
    $('#upgrade').html("系統");
    $('#system').html("系統");
    $('#upload').html("上傳證書");
    $('#lang').html("English");

    $('.RCSTStatus').html("終端狀態");
    $('.ACUStatus').html("ACU狀態");
    $('.Network').html("網絡");
    $('.RF').html("射頻");
    $('.ViewLog').html("日誌查看");
    $('.ProcessMonitoring').html("進程監控");
    $('.Mesh').html("網狀網");

    if (0 == space0_or_weitong1) {
        if (38 == rcst_xph_type) {
            $('.rcst_type').html('SATBOX631');
        }
        else if (39 == rcst_xph_type) {
            $('.rcst_type').html('SATBOX631-LI');
        }
        else if (40 == rcst_xph_type) {
            $('.rcst_type').html('SATBOX520-LI');
        }
        else if (35 == rcst_xph_type) {
            $('.rcst_type').html('SATBOX530');
        }
    }
    else if (1 == space0_or_weitong1) {
        if (38 == rcst_xph_type) {
            $('.rcst_type').html('中星昊網-X12');
        }
        else if (35 == rcst_xph_type) {
            $('.rcst_type').html('中星昊網-X11');
        }
    }
    else if (2 == space0_or_weitong1) {
        $('.rcst_type').html('SCE-BBU');
    }
    else if (space0_or_weitong1 == 3) {
        $('.rcst_type').html('G600T');
    }

    $('#diagnosticstitle').html("診斷狀態");
    $('.TerminalType').html("終端類型：");
    $('.FLRunning').html("前向鏈路運行參數");
    $('.LockedStatus').html("鎖定狀態");
    $('.SymbolRate').html("符號速率");
    $('.SignalStrength').html("信號強度");
    $('.RXMode').html("接收模式");
    $('.ModulationType').html("調製方式");
    $('.SNR').html("信噪比");
    $('.LockedFrequency').html("鎖定頻率");
    $('.BER').html("誤碼率");
    if (rcstType == 0) {
        $('.FLMBBFrame').html("前向密文BBFrame");
        $('.FLBBFrame').html("前向BBFrame");
        $('.FLRXGSE').html("前向接收GSE");
        $('.FLTXGSE').html("前向發送GSE");
        $('.RLFPGARX').html("回傳明文FPGA接收包");
        $('.RLFPGATX').html("回傳明文FPGA發送包");
        $('.RLMFPGARX').html("回傳密文FPGA接收包");
        $('.RLMFPGATX').html("回傳密文FPGA發送包");
    } else if (rcstType == 1) {
        $('.FLMBBFrame').html("前向密文BBFrame");
        $('.FLBBFrame').html("前向BBFrame");
        $('.FLGSE').html("前向GSE");
        $('.RLFPGARX').html("回傳明文FPGA接收包");
        $('.RLFPGATX').html("回傳明文FPGA發送包");
        $('.RLMFPGARX').html("回傳密文FPGA接收包");
        $('.RLMFPGATX').html("回傳密文FPGA發送包");

        $('.TotalRXTBTP1').html("接收TBTP1總計");
        $('.FreeTBTP1').html("空閒TBTP1");
        $('.LocalTBTP1').html("本地TBTP1");
        $('.FLTS').html("前向TS");
        $('.FLTSUncontinus').html("前向TS不連續");
        $('.FLCRCError').html("前向CRC錯誤");
        $('.RLBBFrameLen').html("回傳BBFrame長度");
        $('.RLTRFTotalLen').html("回傳TRF總長度");
        $('.RLTS').html("回傳TS");
        $('.RLBBFrame').html("回傳BBFrame");
        $('.RLBBFrameEfficiency').html("回傳BBFrame效率");
        $('.RL40msCount').html("40ms中斷計數");
        $('.RLSKBListCount').html("回傳業務包數");
        $('.RLLossTS').html("回傳TS丟失");
    } else if (rcstType == 2) {
        $('.rcst_type').html('網狀網終端');
        $('.MeshRunning').html("網狀網運行參數");
        $('.TBTP3_CNT').html("接收TBTP3總計");
        $('.TS_CNT').html("網狀網TS總計");
        $('.LocalTBTP3').html("屬於本小站TBTP3");
        $('.TSAllocTAB').html("時隙分配表");
        $('.Unassign TBTP3').html("未分配TBTP3");
        $('.ActiveRoute').html("有效路由");
        $('.SendLinkNum').html("發射鏈路數");
        $('.RecvLinkNum').html("接收鏈路數");
    } else {
    }

    $('.UnicastTIM').html("單播信令");
    $('.BroadcastTIM').html("廣播信令");
    $('.TotalRXTBTP').html("接收TBTP總計");
    $('.LocalTBTP').html("屬於本小站TBTP");
    $('.NoDistributionTBTP').html("TBTP無分配");
    $('.AcquiredLBSlot').html("獲得LB時隙");
    $('.AcquiredCBSlot').html("獲得CB時隙");
    $('.AcquiredTRFSlot').html("獲得TRF時隙");
    $('.FLGSE').html("前向GSE");
    $('.TotalFLTS').html("前向TS總計");
    $('.FLBBFrame').html("前向BBFrame");
    $('.FLTSDiscontinuity').html("前向TS不連續");
    $('.FLPDUCRCError').html("前向CRC錯誤");
    $('.FLUnicastIP').html("前向單播IP");
    $('.FLBroadcastIP').html("前向組播IP");
    $('.FLInterruptOfFL1ms').html("前向1ms中斷");
    $('.FLTotalUnlocked').html("前向失鎖統計");

    $('.RLRunning').html("回傳鏈路運行參數");
    $('.RunningStatus').html("運行狀態");
    $('.AuthStatus').html("認證狀態");
    $('.RLRate').html("回傳速率");
    $('.TXPower').html("發送功率");
    $('.ModulationType').html("調製方式");
    $('.SentLB').html("登陸信令");
    $('.SentCB').html("同步信令");
    $('.SentTRF').html("TRF發射");
    $('.RLIPPackage').html("回傳IP包");
    $('.TotalTrafficRequest').html("業務申請總和");
    $('.RLIPPackageBacklog').html("回傳壓包");
    $('.RL40msInterruptLost').html("回傳40ms中斷丟失");
    $('.RLpcrOverdued').html("回傳pcr過期");
    $('.RLBurstCNT').html("回傳突發");
    $('.RLBursttoFPGACNT').html("FPGA回傳突發");

    $('.FPGA').html("FPGA參數統計");
    $('.GSE_CNT').html("前向GSE");
    $('.TotalFLTS').html("前向TS總計");
    $('.FLBBFrame').html("前向BBFrame");
    $('.RLFPGARCVPacket').html("回傳FPGA接收包");
    $('.RLFPGATXPacket').html("回傳FPGA發射包");

    $('.TerminalReset').html("終端重定統計");
    $('.HardwareReset').html("硬體重定統計");
    $('.SoftwareReset').html("軟件重定統計");

    $('.CurrentSatellite').html("當前衛星資源");
    $('.CurrentBeamID').html("當前波束ID");

    $('.UnicastTIM').html("單播信令");
    $('.BroadcastTIM').html("廣播信令");
    $('.RXUnicastIP').html("接收單播IP");
    $('.RXBroadcastIP').html("接收組播IP");
    $('.RXUnlockTotal').html("接收失鎖統計");
    $('.RXUnSYNCTotal').html("接收失步統計");
    $('.FPGAGSE').html("FPGA GSE");
    $('.FPGABBFrame').html("FPGA BBFrame");

    $('.TXRate').html("發送速率");
    $('.SigRate').html("信令速率");
    $('.TrfRate').html("業務速率");
    $('.SigPower').html("信令功率");
    $('.TrfPower').html("業務功率");
    $('.SigModcod').html("信令調製方式");
    $('.TrfModcod').html("業務調製方式");
    $('.TXSNR').html("發送信噪比");
    $('.SigSNR').html("信令信噪比");
    $('.TrfSNR').html("業務信噪比");

    $('.LoginSig').html("登陸信令");
    $('.SYNCSig').html("同步信令");
    $('.TrfTX').html("業務發送");
    $('.RLIPPackageBacklog').html("回傳壓包");
    $('.FPGARXPackage').html("FPGA發送包");
    $('.FPGATXPackage').html("FPGA接收包");

    auth_success = "認證成功";
    auth_failed = "認證失敗";
    no_auth = "不認證";
    Alarmmessage = "告警信息";
    message32 = "終端前向異常，建議按照如下順序排查：" + "<br/>" +
        "(1) 確認天氣情況;" + "<br/>" +
        "(2) 確認前向載波是否有干擾;" + "<br/>" +
        "(3) 確認LNB狀態;" + "<br/>" +
        "(4) 確認調製發送是否正常" + "<br/>";
    message38 = "網控下發FAILURE事件下線" + "<br/>";
    message39 = "網控下發LOGOFF事件下線" + "<br/>";
    message42 = "網控下發TX_DISABLE事件下線" + "<br/>";
    message10005 = "端前向異常，建議按照如下順序排查：" + "<br/>" +
        "(1) 確認天氣情況;" + "<br/>" +
        "(2) 確認前向載波是否有干擾;" + "<br/>" +
        "(3) 確認LNB狀態;" + "<br/>" +
        "(4) 確認調製發送是否正常" + "<br/>";
    message10009 = "ACU連接失敗,建議確認ACU網絡連接或查看ACU運行狀態是否正常" + "<br/>";
    message10010 = "ACU未鎖定,前向未鎖定" + "<br/>" +
        "終端前向異常，建議按照如下順序排查:" + "<br/>" +
        "(1) 確認天氣情況;" + "<br/>" +
        "(2) 確認前向載波是否有干擾;" + "<br/>" +
        "(3) 確認LNB狀態;" + "<br/>" +
        "(4) 確認調製發送是否正常" + "<br/>";
    message10011 = "波束切換鎖定資訊下發ACU失敗,建議確認ACU網絡連接或查看ACU運行狀態是否正常" + "<br/>";

    message10013 = "位置長時間沒有更新,建議確認ACU網絡連接或查看ACU運行狀態是否正常" + "<br/>";

    message10015 = "長時間未收到ACU鎖定資訊,建議確認ACU網絡連接或查看ACU運行狀態是否正常" + "<br/>";

    message102 = "ACU鎖定,前向未鎖。終端前向異常，請聯繫管理員" + "<br/>";

    message103 = "前向接收異常，建議按照如下順序排查:" + "<br/>" +
        "(1)確認前向鎖定資訊是否是Anovo系統發送;" + "<br/>" +
        "(2) 查看網管，確認對應調製通道是否正常發送資料" + "<br/>";
    message104 = "終端長時間不能上線，建議按照如下順序排查:" + "<br/>" +
        "(1) 鏈路延時配置為手動，請確認計算無誤;" + "<br/>";

    message105 = "終端長時間不能上線，建議按照如下順序排查:" + "<br/>" +
        "(1) 鏈路延時配置為手動，請確認計算無誤" + "<br/>" +
        "(2) 鏈路延時配置為自動:" + "<br/>" +
        "(2.1) 請確認終端射頻介面經緯度輸入正確;" + "<br/>" +
        "(2.2) 請確認網管配置衛星經度和網控經緯度正確，提示：如有更新，請重啟網控；" + "<br/>" +
        "(3) 確認終端射頻發送正常，建議發送單載波，確認單載波形是否畸變和偏移;" + "<br/>" +
        "(4) 終端MAC確認是否輸入有誤或忘記更新;" + "<br/>" +
        "(5) 調整發送功率，調大或調小" + "<br/>";

    message106 = "終端長時間不能上線，建議按照如下順序排查:" + "<br/>" +
        "(1) 鏈路延時配置為手動，請確認計算無誤" + "<br/>" +
        "(2) 路延時配置為自動:" + "<br/>" +
        "(2.1) 確認終端射頻介面經緯度輸入正確;" + "<br/>" +
        "(2.2)請確認網管配置衛星經度和網控經緯度正確，提示：如有更新，請重啟網控；" + "<br/>" +
        "(3) 確認終端射頻發送正常，建議發送單載波，確認單載波形是否畸變和偏移" + "<br/>";

    Locked = "鎖定";
    Unlocked = "未鎖定";
    HOLD_STANDBY = "保持待機";
    OFF_STANDBY = "離線";
    READY_LOGON = "準備登錄";
    READY_TDMA_SYNC = "準備同步";
    READY_FDMA_SYNC = "準備同步";
    TDMA_SYNC = "已同步";
    FDMA_SYNC = "已同步";
    NCR_ROCOVERY = "NCR修復";
    STATUS_OFF = "未知";
    READY_FOR_SCPC_SYNC = "準備同步";
    SCPC_SYNC = "已同步";
    NCR_ROCOVERY = "NCR修復";
}


