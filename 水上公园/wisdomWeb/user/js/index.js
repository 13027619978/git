$(function(){
	resetFontSize();
	var baseUrl = "ws://localhost:12345";
	var socket = new WebSocket(baseUrl);
	socket.onclose = function() {
		console.error("web channel closed");
	};
	socket.onerror = function(error) {
		console.error("web channel error: " + error);
	};
	socket.onopen = function() {
		new QWebChannel(socket, function(channel) {
			// make core object accessible globally
			window.core = channel.objects.core;
			//连接C++信号与javascript函数
			core.sendText.connect(function(message) {
				var userId = '用户ID';
				app.setCookie('userId', message);
			});
			core.receiveText("Client connected, ready to send/receive messages!");
		});
	}
	var myInter = setInterval(function(){
		var userId = app.getCookie('userId');
		if(userId){
			app.clearCookie('userId');
			var weekParams = {
				type: 'week',
				userId: userId
			};
			var monthParams = {
				type: 'month',
				userId: userId
			};
			var dayParams = {
				type: 'day',
				userId: userId
			};
			app.getAjax('getRunningData', dayParams, function(res){
				if(res.data){
					var todayTime = res.data.totalTime;
					var todayMinutes = parseInt(todayTime / 60);
					var todaySeconds = todayTime % 60;
					var chicken = parseFloat(res.data.totalCalories / 172.5).toFixed(1);
					var speed = res.data.avgSpeed.toFixed(2);
					var totalHour = parseFloat(3500 / speed / 1000).toFixed(2);
					$('.todayTime').html(todayMinutes + '\'' + todaySeconds + '\"');
					$('.todayFar').html(res.data.totalFar/1000 + '<font>km</font>');
					$('.todayCal').html(res.data.totalCalories + '<font>kcal</font>');
					$('.todaySpeed').html(speed + '<font>km/h</font>');
					$('.chicken').text(chicken);
					$('.hour').text('跑完水上公园需要'+ totalHour +'小时');
				}else{
					$('.todayTime').html(0 + '\'' + 0 + '\"');
					$('.todayFar').html(0 + '<font>km</font>');
					$('.todayCal').html(0 + '<font>kcal</font>');
					$('.todaySpeed').html(0 + '<font>km/h</font>');
					$('.hour').text('跑完水上公园需要0小时');
					$('.chicken').text(0);
				}
				app.getAjax('getRunningData', weekParams, function(res){
					console.log(res);
					if(res.data){
						var totalTime = parseFloat(res.data.totalTime/60).toFixed(2);
						var speed = parseFloat(res.data.avgSpeed).toFixed(2);
						var habit;
						if(speed <= 4){
							habit = '散步';
						}else if(4 < speed <= 8){
							habit = '快走';
						}else if(8 < speed <= 11){
							habit = '慢跑';
						}else{
							habit = '快跑';
						}
						$('.weekHabit').text(habit);
						$('.weekTime').html(totalTime + '<font>h</font>');
						$('.weekFar').html(res.data.totalFar/1000 + '<font>km</font>');
						$('.weekCal').html(res.data.totalCalories + '<font>kcal</font>');
					}else{
						$('.weekHabit').text('暂无');
						$('.weekTime').html(0 + '<font>h</font>');
						$('.weekFar').html(0 + '<font>km</font>');
						$('.weekCal').html(0 + '<font>kcal</font>');
					}
					app.getAjax('getRunningData', monthParams, function(res){
						console.log(res);
						if(res.data){
							var totalTime = parseFloat(res.data.totalTime/60).toFixed(2);
							var speed = parseFloat(res.data.avgSpeed);
							var habit;
							if(speed <= 4){
								habit = '散步';
							}else if(4 < speed <= 8){
								habit = '快走';
							}else if(8 < speed <= 11){
								habit = '慢跑';
							}else{
								habit = '快跑';
							}
							$('.weekHabit').text(habit);
							$('.monthTime').html(totalTime + '<font>h</font>');
							$('.monthFar').html(res.data.totalFar/1000 + '<font>km</font>');
							$('.monthCal').html(res.data.totalCalories + '<font>kcal</font>');
						}else{
							$('.weekHabit').text('暂无');
							$('.monthTime').html(0 + '<font>h</font>');
							$('.monthFar').html(0 + '<font>km</font>');
							$('.monthCal').html(0 + '<font>kcal</font>');
						}
						app.getAjax('getRunningCurve', weekParams, function(res){
							var myChart1 = echarts.init(document.getElementById('chart1'));
							var myChart2 = echarts.init(document.getElementById('chart2'));
							var dateList = [];
							var farList = [];
							var timeList = [];
							res.data.forEach(function(value, key){
								dateList.push(value.date.split('-')[1] + '-' + value.date.split('-')[2]);
								timeList.push(parseInt(value.totalTime/60));
								farList.push(parseInt(value.totalFar/1000));
								
							})
							var options1 = getOptions(dateList, farList);
							var options2 = getOptions(dateList, timeList);
							myChart1.setOption(options1);
							myChart2.setOption(options2);
							app.getAjax('getRunningCurve', monthParams, function(res){
								console.log(res);
								var myChart3 = echarts.init(document.getElementById('chart3'));
								var myChart4 = echarts.init(document.getElementById('chart4'));
								var dateList = [];
								var farList = [];
								var timeList = [];
								res.data.forEach(function(value, key){
									dateList.push(value.date.split('-')[1] + '-' + value.date.split('-')[2]);
									timeList.push(parseInt(value.totalTime/60));
									farList.push(parseInt(value.totalFar/1000));
									
								})
								var options3 = getOptions(dateList, farList);
								var options4 = getOptions(dateList, timeList);
								myChart3.setOption(options3);
								myChart4.setOption(options4);
							})
						})
						
					})
				})
			})
		}
	}, 1000)
})


function resetFontSize() {
	var baseFontSize = 100;
	var designWidth = 750;
	var width = window.innerWidth;
	var currentFontSize = (width / designWidth) * baseFontSize;
	document.getElementsByTagName('html')[0].style.fontSize = currentFontSize + 'px';
}
window.onresize = function () {
	resetFontSize();
};

function getOptions(time, value){
	var option = {
		xAxis: {
			type: 'category',
			boundaryGap: false,
			axisLine:{
				lineStyle:{
					color:'#fff'
				}
			},
			data: time
		},
		yAxis: {
			type: 'value',
			axisLine:{
				lineStyle:{
					color:'#fff'
				}
			},
			splitLine:{show: false}
		},
		series: [{
			data: value,
			type: 'line',
			areaStyle: {color:'#0c6c9f'},
			lineStyle: {color: "#fff"}
		}],
		grid: {
			top: "10px",
			bottom: "20px",
			left: "50px",
			right: "20px"
		}
	};
	
	return option;
}

function getChartInfo(){
	// 基于准备好的dom，初始化echarts实例
	var myChart1 = echarts.init(document.getElementById('chart1'));
	var myChart2 = echarts.init(document.getElementById('chart2'));
	var myChart3 = echarts.init(document.getElementById('chart3'));
	var myChart4 = echarts.init(document.getElementById('chart4'));
			 
	// 指定图表的配置项和数据
	var option1 = {
		xAxis: {
			type: 'category',
			boundaryGap: false,
			axisLine:{
				lineStyle:{
					color:'#fff'
				}
			},
			data: ['12-4', '12-5', '12-6', '12-7', '12-8', '12-9', '12-10']
		},
		yAxis: {
			type: 'value',
			axisLine:{
				lineStyle:{
					color:'#fff'
				}
			},
			splitLine:{show: false}
		},
		series: [{
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line',
			areaStyle: {color:'#0c6c9f'},
			lineStyle: {color: "#fff"}
		}],
		grid: {
			top: "10px",
			bottom: "20px",
			left: "50px",
			right: "20px"
		}
	};
	
	// 指定图表的配置项和数据
	var option2 = {
		xAxis: {
			type: 'category',
			boundaryGap: false,
			axisLine:{
				lineStyle:{
					color:'#fff'
				}
			},
			data: ['12-4', '12-5', '12-6', '12-7', '12-8', '12-9', '12-10']
		},
		yAxis: {
			type: 'value',
			axisLine:{
				lineStyle:{
					color:'#fff'
				}
			},
			splitLine:{show: false}
		},
		series: [{
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line',
			areaStyle: {color:'#0c6c9f'},
			lineStyle: {color: "#fff"}
		}],
		grid: {
			top: "10px",
			bottom: "20px",
			left: "50px",
			right: "20px"
		}
	};
	
			 
	// 使用刚指定的配置项和数据显示图表。
	myChart1.setOption(option1);
	myChart2.setOption(option2);
	myChart3.setOption(option1);
	myChart4.setOption(option2);
}