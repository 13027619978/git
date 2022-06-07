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
			// $('.ridingTime').text(res.data.ridingStartTime);
			// // $('.sn').text(res.data.createDate);
			// var orderStatus;
			var deviceType;
			if(res.data.deviceType == 1){
				deviceType = "单排自行车";
			}else if(res.data.deviceType == 2){
				deviceType = "双排自行车";
			}
			$('.deviceType').text(deviceType);
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