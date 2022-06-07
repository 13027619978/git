$(function(){
	var orderId = app.getQueryString('orderId');
	app.getAjax('deviceLoopApp/getByDeviceLoopId', {
		deviceLoopId: orderId
	}, function(res){
		console.log(res);
		if(res.code == 'SUCCESS'){
			$('.price').text(res.data.totalMoney + '元');
			$('.time').text(res.data.createDate);
			$('.number').text(res.data.totalNumber);
			// $('.sn').text(res.data.createDate);
			var orderStatus;
			switch(res.data.payStatus){
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
			$('.qrcode').eq($('.qrcode').length - 1).qrcode({
				text: res.data.orderCode,
				background: '#fff',
				foreground: '#000',
				width: 180,
				height: 180
			});
		}else{
			layer.alert(res.msg);
		}
	})
	
})