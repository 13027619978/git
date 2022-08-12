$(function(){
	var ticketId = app.getQueryString('ticketId').split('/')[1];
	var openid = app.getCookie('openid');
	app.encryptGetAjax('order/encrypt/getDetailsById', {
		ticketOrderId: ticketId
	}, function(res){
		console.log(res);
		if(res.success){
			var orderInfo = res.data;
			$('.ticketNum').text('票号：' + orderInfo.checkCode);
			$('.useTime').text('票号：' + orderInfo.checkCode);
			$('.headImg').attr('src', app.getCookie('headPicUrl'));
			$('.qrcode').qrcode({
				text: orderInfo.checkCode + new Date().getTime(),
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




function homeClick(){
	window.location.replace('index.html?openid=' + app.getCookie('openid'));
}
