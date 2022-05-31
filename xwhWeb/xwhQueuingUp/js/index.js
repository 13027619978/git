$(function(){
	//防止页面后退
	history.pushState(null, null, document.URL);
	window.addEventListener('popstate', function () {
		wx.closeWindow();
	});
	
	app.wxUserInfo(function(){
		app.getAjax('deviceOrderApp/queue', {
			openId: app.getCookie('openid'),
			scenicId: app.getCookie('scenicId')
		}, function(res){
			if(res.code == 'SUCCESS'){
				$('.numberText').text(res.data.queueNum + '号');
			}else{
				layer.alert(res.msg);
			}
		})
	});
	
	var scenicId = app.getCookie('scenicId');
	console.log(scenicId);
	if(scenicId == 'f57419d544e741838fb789056f63ee80'){
		$('.name').text('解放门码头');
	}else if(scenicId == 'bcd98681896f48ed878486519bfdeacf'){
		$('.name').text('苔陵堤码头');
	}else if(scenicId == 'b4124ce0c8b244208de6d870ceb824a0'){
		$('.name').text('玄武门南码头');
	}else if(scenicId == '59800000eb4a4c4287652f86eaba848c'){
		$('.name').text('菱州码头');
	}else if(scenicId == '43a3c0756f854990ad7fd13f597cda3c'){
		$('.name').text('玄武门北码头');
	}else if(scenicId == 'a9f74e0b584945bea69985cd17f66a9d'){
		$('.name').text('后湖印月码头');
	}else if(scenicId == '8698c2bb90d645b3912528473f5ce930'){
		$('.name').text('和平门码头');
	}else if(scenicId == '41ab29656e5b405a9c94871488050ec3'){
		$('.name').text('翠洲门码头');
	}else if(scenicId == '283db1801eda4d0d9b542570b4506219'){
		$('.name').text('阳光码头');
	}else if(scenicId == '3f288414620f42cba6a7634401f71bca'){
		$('.name').text('芳桥码头');
	}else if(scenicId == '9030c8e60fa34f37b674a30f3c890143'){
		$('.name').text('郭璞敦码头');
	}else if(scenicId == '696dc31a1125458fa5ba1696f6e445c7'){
		$('.name').text('环洲码头');
	}
})