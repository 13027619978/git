$(function(){
	var ticketId = app.getQueryString('ticketId').split('/')[1];
	var openid = app.getCookie('openid');
	app.encryptGetAjax('order/encrypt/getDetailsById', {
		ticketOrderId: ticketId
	}, function(res){
		console.log(res);
		if(res.success){
			var orderInfo = res.data;
			var nowDate = new Date(new Date().getTime() + 60000 * 10);
			var nowYear = nowDate.getFullYear();
			var nowMonth = nowDate.getMonth() + 1;
			nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
			var nowDay = nowDate.getDate();
			nowDay = nowDay>9?nowDay:'0'+nowDay;
			var nowHour = nowDate.getHours();
			nowHour = nowHour>9?nowHour:'0'+nowHour;
			var nowMinute = nowDate.getMinutes();
			nowMinute = nowMinute>9?nowMinute:'0'+nowMinute;
			var nowSeconds = nowDate.getSeconds();
			nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
			$('.ticketNum').text('票号：' + orderInfo.checkCode);
			$('.useTime').text('二维码有效时间：' + nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinute + ':' + nowSeconds);
			$('.headImg').attr('src', app.getCookie('headPicUrl'));
			$('.qrcode').qrcode({
				text: orderInfo.checkCode + '?time=' + new Date().getTime(),
				background: '#fff',
				foreground: '#000',
				width: 148,
				height: 148
			});
			$('.qrcodeImg img').attr('src', document.getElementsByClassName('qrcode')[0].getElementsByTagName('canvas')[0].toDataURL("image/png"));
			$('.qyImg img').attr('src', document.getElementsByClassName('qrcode')[0].getElementsByTagName('canvas')[0].toDataURL("image/png"));
			app.getAjax('orderEquity/query', {
				qr: orderInfo.checkCode,
				equityCode: 1
			}, function(res){
				console.log(res);
				if(res.success){
					if(res.data.useState == '0'){
						$('.qyBtn').show();
						if(!app.getCookie('hoverShow')){
							$('.hoverView').show();
						}
					}
				}
			})
		}else{
			layer.alert(res.message);
		}
	});
	
})

function closeClick(){
	$('.hoverView').hide();
	app.setCookie('hoverShow', true);
}

function showqy(){
	$('.hoverView').show();
}


function homeClick(){
	window.location.replace('index.html?openid=' + app.getCookie('openid'));
}
