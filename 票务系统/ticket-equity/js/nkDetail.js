$(function(){
	var ticketId = app.getQueryString('ticketId').split('/')[1];
	app.getAjax('order/getDetailsById', {
		ticketOrderId: ticketId
	}, function(res){
		console.log(res);
		if(res.success){
			var orderInfo = res.data;
			$('.ticketNum').text('票号：' + orderInfo.checkCode);
			$('.headImg').attr('src', app.getCookie('headPicUrl'));
			$('.qrcode').qrcode({
				text: orderInfo.checkCode,
				background: '#fff',
				foreground: '#000',
				width: 148,
				height: 148
			});
		}else{
			layer.alert(res.message);
		}
	});
	
})

