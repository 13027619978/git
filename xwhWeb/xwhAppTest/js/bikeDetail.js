$(function(){
	var orderId = app.getQueryString('orderId');
	app.getAjax('deviceOrderApp/getById', {
		orderId: orderId
	}, function(res){
		console.log(res);
		if(res.code == 'SUCCESS'){
			$('.deposit').text(res.data.normalDeposit + '元');
			$('.price').text(res.data.actualConsumeMoney + '元');
			var createYear = res.data.createDate.split(' ')[0];
			var createHour = res.data.createDate.split(' ')[1];
			$('.year').text(createYear);
			$('.hour').text(createHour);
			$('.phone').text(res.data.phone);
			$('.time').text(res.data.createDate);
			var bikeType;
			if(res.data.deviceType == '0'){
				bikeType = "四人大白鹅";
			}else if(res.data.deviceType == '1'){
				bikeType = "六人大白鹅";
			}else if(res.data.deviceType == '2'){
				bikeType = "四人画舫船";
			}else if(res.data.deviceType == '3'){
				bikeType = "六人画舫船";
			}else if(res.data.deviceType == '4'){
				bikeType = "四人电瓶船";
			}else if(res.data.deviceType == '5'){
				bikeType = "六人电瓶船";
			}else if(res.data.deviceType == '6'){
				bikeType = "四人大黄鸭";
			}else if(res.data.deviceType == '7'){
				bikeType = "六人大黄鸭";
			}else if(res.data.deviceType == '8'){
				bikeType = "四人小丑船";
			}else if(res.data.deviceType == '9'){
				bikeType = "六人小丑船";
			}
			$('.deviceType').text(bikeType);
			switch(res.data.status){
				case "1":
					orderStatus = '支付成功';
				break;
				case "5":
					orderStatus = '结算成功';
				break;
				case "8":
					orderStatus = '申请退款成功';
				break;
				case "9":
					orderStatus = '退款失败';
				break;
			}
			$('.status').text(orderStatus);
		}else{
			layer.alert(res.msg);
		}
	})
})