langget();
$(document).ready(function () {
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
					var series2 = this.series[2];
					var series3 = this.series[3];
					$.ajax({
						url: '/action/chipVolGet',
						type: "POST",
						dataType: "json",
						async: true,
						success : function(rsp){
							var x = (new Date()).getTime();// current time
							if (rsp.code == 0){					
								var y = Number(rsp.chipVola);
								var y1 = Number(rsp.chipVolb);
								var y2 = Number(rsp.chipVolc);
								var y3 = Number(rsp.chipVold);							
							}else{
								var y = Number(0);
								var y1 = Number(0);
								var y2 = Number(0);
								var y3 = Number(0);	
							}
							series.addPoint([x, y], false, true);
							series1.addPoint([x, y1], false, true);
							series2.addPoint([x, y2], false, true);
							series3.addPoint([x, y3], true, true);								
						}
					} );							
					setInterval(function () {
						$.ajax({
							url: '/action/chipVolGet',
							type: "POST",
							dataType: "json",
							async: true,
							success : function(rsp){
								var x = (new Date()).getTime();// current time
								if (rsp.code == 0){					
									var y = Number(rsp.chipVola);
									var y1 = Number(rsp.chipVolb);
									var y2 = Number(rsp.chipVolc);
									var y3 = Number(rsp.chipVold);							
								}else{
									var y = Number(0);
									var y1 = Number(0);
									var y2 = Number(0);
									var y3 = Number(0);	
								}
								series.addPoint([x, y], false, true);
								series1.addPoint([x, y1], false, true);
								series2.addPoint([x, y2], false, true);
								series3.addPoint([x, y3], true, true);								
							}
						} );
					}, 2000); 
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
				text: unit_v
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
			name: testpoint1,
			data: (function () {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					i;
				for (i = -19; i <= 0; i += 1) {
					data.push({
						x: time + i * 1000,
						y: null
					});
				}
				return data;
			}())
		},{
			name: testpoint2,
			data: (function () {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					i;
				for (i = -19; i <= 0; i += 1) {
					data.push({
						x: time + i * 1000,
						y: null
					});
				}
				return data;
			}())
		},{
			name: testpoint3,
			data: (function () {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					i;
				for (i = -19; i <= 0; i += 1) {
					data.push({
						x: time + i * 1000,
						y: null
					});
				}
				return data;
			}())
		},{
			name: testpoint4,
			data: (function () {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					i;
				for (i = -19; i <= 0; i += 1) {
					data.push({
						x: time + i * 1000,
						y: null
					});
				}
				return data;
			}())
		}]
	});
});
