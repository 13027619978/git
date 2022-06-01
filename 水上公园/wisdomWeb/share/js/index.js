$(function(){
	var userId = app.getQueryString('userId');
	$('.headImg').attr('src', app.getQueryString('faceUrl'));
	app.getAjax('getRunningData', {
		type: 'day',
		userId: userId
	}, function(res){
		if(res.success){
			var totalFar = 0;
			var speed = 0;
			var totalTime = 0;
			if(res.data){
				var totalCal = parseInt(res.data.totalCalories);
				totalFar = parseInt(res.data.totalFar);
				totalTime = parseInt(res.data.totalTime);
				speed = parseFloat(res.data.avgSpeed).toFixed(2);
				$('.totalFar').text(totalFar/1000);
				$('.kcal').text(totalCal);
				var totalMinutes = parseInt(totalTime / 60);
				var totalSeconds = totalTime % 60;
				$('.speed').text(speed);
				$('.totalTime').text(totalMinutes + '\'' + totalSeconds + '\"');
			}else{
				layer.alert('您今日还没有开始运动哦~');
				$('.kcal').text('0');
				$('.totalFar').text('0');
				$('.farText').text('0%');
				$('.speed').text('0');
				$('.totalTime').text('0\'0\"');
				$('.timeText').text('0%');
				$('.farPercent').css({
					width: 0
				});
			}
			app.getAjax('getUserFarRank',{
				userId: userId
			}, function(res){
				if(res.success){
					if(res.data){
						$('.farText').text(parseFloat((parseInt(res.data.totalUser) - parseInt(res.data.rank)) / (parseInt(res.data.totalUser) - 1)).toFixed(2)*100 + '%');
						$('.farPercent').css({
							width: parseFloat((parseInt(res.data.totalUser) - parseInt(res.data.rank)) / (parseInt(res.data.totalUser) - 1)).toFixed(2)*100 + '%'
						});
					}else{
						totalFar = 0;
						
					}
					app.getAjax('getUserTimeRank', {
						userId: userId
					}, function(res){
						if(res.success){
							$('.labelItem>div').hide();
							if(res.data){
								$('.timeText').text(parseFloat((parseInt(res.data.totalUser) - parseInt(res.data.rank)) / (parseInt(res.data.totalUser) - 1)).toFixed(2)*100 + '%');
								$('.timePercent').css({
									width: parseFloat((parseInt(res.data.totalUser) - parseInt(res.data.rank)) / (parseInt(res.data.totalUser) - 1)).toFixed(2)*100 + '%'
								});
							}else{
								$('.timePercent').css({
									width: 0
								});
							}
						}else{
							layer.alert(res.message);
						}
					})
				}else{
					layer.alert(res.message);
				}
			})
			
			// 周运动数据
			app.getAjax('getRunningCurve', {
				type: 'week',
				userId: userId
			}, function(res){
				var myChart1 = echarts.init(document.getElementById('chart1'));
				var myChart3 = echarts.init(document.getElementById('chart3'));
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
				myChart3.setOption(options2);
			})
			
			// 月运动数据
			app.getAjax('getRunningCurve', {
				type: 'month',
				userId: userId
			}, function(res){
				var myChart2 = echarts.init(document.getElementById('chart2'));
				var myChart4 = echarts.init(document.getElementById('chart4'));
				var dateList = [];
				var farList = [];
				var timeList = [];
				res.data.forEach(function(value, key){
					dateList.push(value.date.split('-')[1] + '-' + value.date.split('-')[2]);
					timeList.push(parseInt(value.totalTime/60));
					farList.push(parseInt(value.totalFar/1000));
					
				})
				var options2 = getOptions(dateList, farList);
				var options4 = getOptions(dateList, timeList);
				myChart2.setOption(options2);
				myChart4.setOption(options4);
			})
			
			// 勋章
			app.getAjax('getMedalInfo', {userId: userId}, function(res){
				var totalFar = parseInt(res.data.totalFar);
				var days = parseInt(res.data.days);
				var step = parseInt(res.data.totalFar) / 0.6;
				var medalList = [];
				if(totalFar >= 5000){
					medalList.push('one_far');
				}
				if(totalFar >= 10000){
					medalList.push('two_far');
				}
				if(totalFar >= 21000){
					medalList.push('three_far');
				}
				if(totalFar >= 42000){
					medalList.push('four_far');
				}
				if(totalFar >= 100000){
					medalList.push('five_far');
				}
				if(step >= 10000){
					medalList.push('one_step');
				}
				if(step >= 100000){
					medalList.push('two_step');
				}
				if(step >= 300000){
					medalList.push('three_step');
				}
				if(step >= 1000000){
					medalList.push('four_step');
				}
				if(days >= 7){
					medalList.push('one_day');
				}
				if(days >= 21){
					medalList.push('two_day');
				}
				if(days >= 100){
					medalList.push('three_day');
				}
				$('.medalNumber').text('共'+medalList.length+'枚');
				if(medalList.length > 0){
					medalList.forEach(function(value, key){
						if(key < 6){
							$('.medalList').append(
								'<div class="medalItem">'+
									'<img src="img/'+value+'_up.png">'+
								'</div>'
							)
						}
					})
				}else{
					$('.medalList').hide();
				}
				
			})
		}else{
			layer.alert(res.message);
		}
	})
	
})

function labelClick(that){
	$(that).siblings().toggle();
	$(that).parent().siblings().find('.rankView').hide();
	$(that).parent().siblings().find('.centerView').hide();
}

function medalClick(){
	window.location.href = 'medal.html?userId=' + app.getQueryString('userId');
}

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
			left: "30px",
			right: "20px"
		}
	};
	
	return option;
}