var headPicUrl;
var orderList = [];
$(function(){
	var openid = app.getCookie('openid');
	if(openid){
		$('.homeBtn').attr('href', 'xtybyTicket.html?openid=' + openid);
	}
	app.getAjax('order/getDetailListByOpenId', {
		openId: openid,
		enterpriseCode: app.getCookie('enterpriseCode'),
		ticketGroupNum: app.getCookie('ticketGroupNum')
	}, function(res){
		console.log(res);
		if(res.success){
			orderList = res.data;
			if(orderList.length == 0){
				$('.noData').show();
				$('.orderList').hide();
			}else{
				orderList.forEach(function(value, key){
					// 可检票次数
					var checkQuantity = parseInt(value.checkQuantity);
					// 剩余检票次数
					var restCheckQuantity = parseInt(value.restCheckQuantity);
					var checkStatus;
					var className;
					if(value.payStatus == '1'){
						if(value.ticketName != '年票'){
							if(checkQuantity == restCheckQuantity){
								checkStatus = '未核销';
							}else if(restCheckQuantity > 0){
								checkStatus = '部分核销';
							}else{
								checkStatus = '已核销';
							}
							className = 'black';
						}else{
							if(checkQuantity == restCheckQuantity){
								checkStatus = '未核销';
							}else if(restCheckQuantity > 0){
								checkStatus = '部分核销';
							}else{
								checkStatus = '已核销';
							}
							className = 'black';
						}
					}else{
						checkStatus = '退票成功';
						className = 'red';
					}
					var orderItem = '<div class="orderItem" onclick="orderClick(/'+ value.ticketOrderId +'/)">' +
							'<div class="ticketName">' +
								'<p class="name">'+ value.ticketName + '</p>' +
							'</div>' +
							'<div class="timeView">' +
								'<p class="time">申请时间：'+ value.payTime +'</p>' +
							'</div>' +
						'</div>';
					$('.orderList').append(orderItem);
				})
			}
		}else{
			layer.alert(res.message);
			$('.nowData').show();
			$('.orderList').hide();
		}
	})
})

function orderClick(ticketId){
	orderList.forEach(function(value, key){
		console.log(ticketId.toString().split('/'));
		if(value.ticketOrderId == ticketId.toString().split('/')[1]){
			console.log(value.headPicUrl);
			headPicUrl = value.headPicUrl;
		}
	})
	app.setCookie('headPicUrl', headPicUrl);
	window.location.href = 'xtybyOrderDetail.html?ticketId=' + ticketId;
}