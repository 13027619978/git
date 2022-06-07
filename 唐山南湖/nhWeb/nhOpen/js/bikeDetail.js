$(function(){
	var orderId = app.getQueryString('orderId');
	app.getAjax('deviceOrderApp/getById', {
		orderId: orderId
	}, function(res){
		console.log(res);
		if(res.code == 'SUCCESS'){
			$('.deposit').text(res.data.normalDeposit + '元');
			$('.price').text(res.data.actualConsumeMoney + '元');
			$('.time').text(res.data.createDate);
			$('.phone').text(res.data.phone);
			// $('.sn').text(res.data.createDate);
			var orderStatus;
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