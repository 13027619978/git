$(function(){
	var orderId = app.getQueryString('orderId');
	getOrderInfo(orderId);
	$('.qrcodeView').hide();
})

function getOrderInfo(orderId){
	$('.refundView').hide();
	app.getAjax('deviceLoopApp/getByDeviceLoopId', {
		deviceLoopId: orderId
	}, function(res){
		console.log(res);
		if(res.code == 'SUCCESS'){
			$('.price').text(res.data.totalMoney + '元');
			var createYear = res.data.createDate.split(' ')[0];
			var createHour = res.data.createDate.split(' ')[1];
			$('.year').text(createYear);
			$('.hour').text(createHour);
			$('.number').text(res.data.totalNumber);
			var orderStatus;
			switch(res.data.payStatus){
				case "0":
					orderStatus = '支付失败';
					$('.qrcodeView').hide();
				break;
				case "1":
					orderStatus = '支付成功';
					$('.qrcodeView').show();
				break;
				case "2":
					orderStatus = '退款成功';
					$('.qrcodeView').hide();
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
}

function refundClick(orderCode){
	orderCode = orderCode.toString().split('/')[1];
	app.getAjax('deviceLoopApp/refund', {
		orderCode: orderCode
	}, function(res){
		layer.alert(res.msg);
		var orderId = app.getQueryString('orderId');
		getOrderInfo(orderId);
	})
}

function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
		default: 
			return 0; 
		break; 
    } 
}
