langget();
rcstTypeGet();
//跳转初始安装类型界面
var snr_tmp = -3;
var max_snr;
var play_count=0;
var player=$("#player")[0];
player.playbackRate=1.4;
player.loop=false;

var player_max=$("#player_max")[0];
player_max.loop=false;
player_max.playbackRate=1;

function playerPause(){
	player.pause();
	player_max.pause();
}

function back(){
	window.location.href="/admin/guide/install-set3.htm"+"?timestamp="+new Date().getTime() ;
}
function next(){
	window.location.href="/admin/guide/install-net2.htm"+"?timestamp="+new Date().getTime() ;
}
$(document).ready(function (){
	Highcharts.setOptions({
		global: {
			useUTC: false
		}
	});
	$('#container').highcharts({
		chart: {
			type: 'spline',
			animation: Highcharts.svg, // don't animate in old IE
			marginRight: 10,
			events: {
				load: function () {
					// set up the updating of the chart each second
					var series = this.series[0];
					var series1 = this.series[1];					
					setInterval(function (){
						$.ajax({
							url: '/action/fwdStatusGet',
							type: "POST",
							dataType: "json",
							async: true,
							success : function(rsp){
								if (rsp.code == 0){
									now_snr = rsp.s32_fwd_snr;
									max_snr = rsp.s32_fwd_snr_max;
									if (rsp.u8_fwd_is_lock == 1){
										$('#locked').html('<img src="/icons/suc.png" />');
										
										if(0==play_count%7)
										{	
											player.pause();
											player_max.pause();
											console.log("play_count="+play_count);
											var play_snr= parseInt(now_snr/10);
											if(play_snr<0)
											{
												play_snr=0;
											}
											else if(play_snr>=30)
											{
												play_snr=30;
											}
											var play_src="/audio/"+play_snr+".wav";
											$("#player").attr('src',play_src);	
											console.log("play_src="+play_src);
											player.load();
											player.play();
											if(Math.abs(max_snr-now_snr)<=10)
											{
												setTimeout(function () {
													player_max.play();
												} ,  300);
												
											}
										}
										play_count++;

									}else{
										player.pause();
										player_max.pause();
										$('#locked').html('<img src="/icons/wrong.png" />');
									}		
									var x = (new Date()).getTime();// current time							
									var y =now_snr/10;
									var y1 =max_snr/10;	
									series.addPoint([x, y], false, true);
									series1.addPoint([x, y1], true, true);
									$('#snr').html(y);
									$('#max_snr').html(y1);		
								}else{}
							}
						} );
					}, 200); 
				}
			}
		},
		title: {
			text: ''
		},
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150
		},
		yAxis: {
			title: {
				text: 'db'
			},
			min:0,
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
			}]
		},
		tooltip: {
			formatter: function () {
				return '<b>' + this.series.name + '</b><br/>' +
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
					Highcharts.numberFormat(this.y, 2);
			}
		},
		legend: {
			enabled: true
		},
		exporting: {
			enabled: false
		},
		credits:{
			enabled:false  
		},
		 //colors:['#90ed7d'],
		series: [{
			name: snr,
			data: (function () {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					i;
				for (i = -399; i <= 0; i += 1) {
					data.push({
						x: time + i * 200,
						y: null
					});
				}
				return data;
			}())
		},{
			name: max_snr,
			data: (function () {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					i;
				for (i = -399; i <= 0; i += 1) {
					data.push({
						x: time + i * 200,
						y: null
					});
				}
				return data;
			}())
		}]
	});
});
