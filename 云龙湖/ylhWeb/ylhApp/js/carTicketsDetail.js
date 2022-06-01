$(function(){
	var orderId = app.getQueryString('orderId');
	getOrderInfo(orderId);
	$('.qrcodeView').hide();
})

function getOrderInfo(orderId){
	var openid = app.getCookie('openid');
	app.getAjax('batteryOrder/getOrderListByOpenId', {
		openId: openid
	}, function(res){
		console.log(res);
		if(res.code == 'SUCCESS'){
			var orderList = res.data;
			if(orderList.length > 0){
				orderList.forEach(function(value, key){
					if(value.id == orderId){
						$('.price').text(value.money + '元');
						$('.payTime').text(value.createDate);
						$('.number').text(value.buyQuantity);
						$('.restCheck').text(value.restCheckQuantity);
						var orderStatus;
						switch(value.payStatus){
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
						var ticketType;
						if(value.source == '2'){
							ticketType = '公众号购票';
						}else{
							ticketType = '大屏幕购票';
						}
						$('.status').text(orderStatus);
						$('.ticketType').text(ticketType);
						$('.qrcode').eq($('.qrcode').length - 1).qrcode({
							text: value.orderCode,
							background: '#fff',
							foreground: '#000',
							width: 180,
							height: 180
						});
					}
				})
			}
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
