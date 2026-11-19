var loading;
var badaddr;
var setup_failed;
var sig_text1;
var sig_text2;
var outofrange;
var shownone;
var tcp_status1;
var tcp_status0;

function trans_en() {
		tcp_status1="Connect"
		tcp_status0="Disconnect"
					
		$( '#lang' ).val( 'en' );
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
		
		$('.TCPstatus').html("TCP status");
		$('.GPSPeriod').html("GPS Period");
		$('.FaultStatus').html("Fault Status");
		$('.WorkMode').html("Work Mode");
		$('.RunStatus').html("Run Status");
		$('.DeviceStatus').html("Device Status");
		$('.SatelliteLongitude').html("Satellite Longitude");
		$('.BeaconFrequency').html("Beacon Frequency");
		$('.PolarType').html("Polar Type");
		$('.Sitelongitude').html("Site Longitude");
		$('.SiteLatitude').html("Site Latitude");		
		$('.AntennaTemperature').html("Antenna Temperature");
		$('.ReceiverStatus').html("Receiver Status");
		$('.TheoryAzimuthAngle').html("Theory Azimuth Angle");
		$('.TheoryPitchAngle').html("Theory Pitch Angle");
		$('.TheoryPolagizingAngle').html("Theory Polagizing Angle");
		$('.TargetAzimuthAngle').html("Target Azimuth Angle");
		$('.TargetPitchAngle').html("Target Pitch Angle");
		$('.TargetPolagizingAngle').html("Target Polagizing Angle");
		$('.LoopLockingAGC').html("Loop Locking AGC");
		$('.QuickLockingAGC').html("Quick Locking AGC");
		$('.SatelliteLockingPattern').html("Satellite Locking Pattern");
		$('.AzimuthEncoderAngle').html("Azimuth Encoder Angle");
		$('.PitchEncoderAngle').html("PitchEncoderAngle");
		$('.PolarizeEncoderAngle').html("Polarize Encoder Angle");
		$('.RollEncoderAngle').html("Roll Encoder Angle");	
		$('.INSAzimuthAngle').html("INS Azimuth Angle");
		$('.INSPitchAngle').html("INS Pitch Angle");
		$('.INSRollAngle').html("INS Roll Angle");
		$('.LNBLOQuery').html("LNB LO Query");
		$('.CarrierAzimuthAngle').html("Carrier Azimuth Angle");
		$('.CarrierPitchAngle').html("Carrier Pitch Angle");
		$('.CarrierRollAngle').html("Carrier Roll Angle");
		$('.BUCManufacturer').html("BUC Manufacturer");
		$('.BUCVersion').html("BUC Version");
		$('.BUCStatus').html("BUC Status");
		$('.HardwareVersion').html("Hardware Version");
		$('.Temperature').html("Temperature");
		$('.FanSpeed').html("Fan Speed");
		$('.Voltage').html("Voltage");
		$('.Current').html("Current");		
		$('.Overload').html("Overload");
		$('.Gate').html("Gate");
		$('.HPA').html("HPA");
		$('.ForwardSNR').html("Forward SNR");
		$('.DiscreteStatus').html("Signal Status");
}
function trans_zh() {
		tcp_status0="未链接"
		tcp_status1="链接"
		
		$( '#lang' ).val('zh');
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


		$('.TCPstatus').html("TCP状态");
		$('.GPSPeriod').html("GPS周期");
		$('.FaultStatus').html("故障状态");
		$('.WorkMode').html("工作状态");
		$('.RunStatus').html("运行状态");
		$('.DeviceStatus').html("设备状态");
		$('.SatelliteLongitude').html("卫星经度");
		$('.BeaconFrequency').html("信标频率");
		$('.PolarType').html("极化方式");
		$('.Sitelongitude').html("站点经度");
		$('.SiteLatitude').html("站点纬度");		
		$('.AntennaTemperature').html("天线温度");
		$('.ReceiverStatus').html("接收机状态");
		$('.TheoryAzimuthAngle').html("理论方位角");
		$('.TheoryPitchAngle').html("理论俯仰角");
		$('.TheoryPolagizingAngle').html("理论极化角");
		$('.TargetAzimuthAngle').html("目标方位角");
		$('.TargetPitchAngle').html("目标俯仰角");
		$('.TargetPolagizingAngle').html("目标极化角");
		$('.LoopLockingAGC').html("环路锁定AGC值");
		$('.QuickLockingAGC').html("快速锁定AGC值");
		$('.SatelliteLockingPattern').html("卫星锁定方式");
		$('.AzimuthEncoderAngle').html("方位编码器角度");
		$('.PitchEncoderAngle').html("俯仰编码器角度");
		$('.PolarizeEncoderAngle').html("极化编码器角度");
		$('.RollEncoderAngle').html("横滚编码器角度");	
		$('.INSAzimuthAngle').html("惯导方位角度");
		$('.INSPitchAngle').html("惯导俯仰角度");
		$('.INSRollAngle').html("惯导横滚角度");
		$('.LNBLOQuery').html("LNB本振查询");
		$('.CarrierAzimuthAngle').html("载体航向角度");
		$('.CarrierPitchAngle').html("载体俯仰角度");
		$('.CarrierRollAngle').html("载体横滚角度");
		$('.BUCManufacturer').html("BUC厂商");
		$('.BUCVersion').html("BUC版本");
		$('.BUCStatus').html("BUC状态");
		$('.HardwareVersion').html("硬件版本");
		$('.Temperature').html("温度");
		$('.FanSpeed').html("风扇速度");
		$('.Voltage').html("电压");
		$('.Current').html("电流");		
		$('.Overload').html("过载");
		$('.Gate').html("门限");
		$('.HPA').html("HPA");
		$('.ForwardSNR').html("前向信噪比");
		$('.DiscreteStatus').html("信号状态");		
}
function trans_zh_HK() {
    tcp_status0="未鏈接"
    tcp_status1="鏈接"
    
    $( '#lang' ).val('zhHK');
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

    $('.TCPstatus').html("TCP狀態");
    $('.GPSPeriod').html("GPS週期");
    $('.FaultStatus').html("故障狀態");
    $('.WorkMode').html("工作狀態");
    $('.RunStatus').html("運行狀態");
    $('.DeviceStatus').html("設備狀態");
    $('.SatelliteLongitude').html("衛星經度");
    $('.BeaconFrequency').html("信標頻率");
    $('.PolarType').html("極化方式");
    $('.Sitelongitude').html("網站經度");
    $('.SiteLatitude').html("網站緯度");        
    $('.AntennaTemperature').html("天線溫度");
    $('.ReceiverStatus').html("接收機狀態");
    $('.TheoryAzimuthAngle').html("理論方位角");
    $('.TheoryPitchAngle').html("理論俯仰角");
    $('.TheoryPolagizingAngle').html("理論極化角");
    $('.TargetAzimuthAngle').html("目標方位角");
    $('.TargetPitchAngle').html("目標俯仰角");
    $('.TargetPolagizingAngle').html("目標極化角");
    $('.LoopLockingAGC').html("環路鎖定AGC值");
    $('.QuickLockingAGC').html("快速鎖定AGC值");
    $('.SatelliteLockingPattern').html("衛星鎖定方式");
    $('.AzimuthEncoderAngle').html("方位編碼器角度");
    $('.PitchEncoderAngle').html("俯仰編碼器角度");
    $('.PolarizeEncoderAngle').html("極化編碼器角度");
    $('.RollEncoderAngle').html("橫滾編碼器角度"); 
    $('.INSAzimuthAngle').html("慣導方位角度");
    $('.INSPitchAngle').html("慣導俯仰角度");
    $('.INSRollAngle').html("慣導橫滾角度");
    $('.LNBLOQuery').html("LNB本振查詢");
    $('.CarrierAzimuthAngle').html("載體航向角度");
    $('.CarrierPitchAngle').html("載體俯仰角度");
    $('.CarrierRollAngle').html("載體橫滾角度");
    $('.BUCManufacturer').html("BUC廠商");
    $('.BUCVersion').html("BUC版本");
    $('.BUCStatus').html("BUC狀態");
    $('.HardwareVersion').html("硬體版本");
    $('.Temperature').html("溫度");
    $('.FanSpeed').html("風扇速度");
    $('.Voltage').html("電壓");
    $('.Current').html("電流");       
    $('.Overload').html("超載");
    $('.Gate').html("門限");
    $('.HPA').html("HPA");
    $('.ForwardSNR').html("前向信噪比");
    $('.DiscreteStatus').html("信號狀態");      
}



