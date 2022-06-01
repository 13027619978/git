$(function(){
	resetFontSize();
	
	getRankInfo('getRunningTimeRank', 'week');
	$('.title').text('周时长排行榜');
	var requestNumber = 1;
	setInterval(function(){
		requestNumber += 1;
		if(requestNumber == 1){
			getRankInfo('getRunningTimeRank', 'week');
			$('.title').text('周时长排行榜');
		}else if(requestNumber == 2){
			getRankInfo('getRunningTimeRank', 'month');
			$('.title').text('月时长排行榜');
		}else if(requestNumber == 3){
			getRankInfo('getRunningFarRank', 'week');
			$('.title').text('周里程排行榜');
		}else if(requestNumber == 4){
			requestNumber = 0;
			getRankInfo('getRunningFarRank', 'month');
			$('.title').text('月里程排行榜');
		}
		getRankInfo();
	}, 15000);
})

function getRankInfo(urlName, type){
	$('.rankList').html("");
	app.getAjax(urlName, {type: type}, function(res){
		console.log(res);
		var rankList = res.data;
		if(rankList.length > 0){
			rankList.forEach(function(value, key){
				var rankValue;
				if(urlName == 'getRunningTimeRank'){
					rankValue = value.totalTime;
					if(rankValue != '0'){
						var totalMinutes = parseInt(rankValue / 60);
						var totalSeconds = rankValue % 60;
						rankValue = totalMinutes + '\'' + totalSeconds + '\"';
					}else{
						rankValue = "0'0\"";
					}
				}else{
					rankValue = value.totalFar;
					if(rankValue != '0'){
						rankValue = parseFloat(rankValue / 1000).toFixed(2) + 'km';
					}else{
						rankValue = "0km";
					}
				}
				
				var faceUrl = 'http://' + value.faceUrl.split('https://')[1];
				
				$('.rankList').append(
					'<div class="rankItem">' +
						'<p class="rankNumber">'+value.rank+'</p>' +
						'<div class="imgView">' +
							'<img src="'+ faceUrl +'" >' +
						'</div>' +
						'<p class="time">'+ rankValue +'</p>' +
					'</div>'
				);
				if(key < 3){
					$('.rankItem').eq(key).addClass('top');
				}
			})
		}
	})
}



function resetFontSize() {
	var baseFontSize = 100;
	var designWidth = 750;
	var width = window.innerWidth;
	var currentFontSize = (width / designWidth) * baseFontSize;
	document.getElementsByTagName('html')[0].style.fontSize = currentFontSize + 'px';
	console.log('123');
}
window.onresize = function () {
	resetFontSize();
};