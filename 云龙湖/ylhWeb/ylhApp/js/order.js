$(function(){
	var deviceType = app.getQueryString('deviceType');
	var openid = app.getCookie('openid');
	app.getAjax('deviceOrderApp/getByOpenId', {
		openId: openid,
		deviceType: deviceType
	}, function(res){
		console.log(res);
		if(res.code == 'SUCCESS'){
			var orderList = res.data;
			if(orderList.length > 0){
				orderList.forEach(function(value, key){
					$('.orderList').append(
						'<li class="orderItem">'+
							'<a href="javascript:;" onclick="orderClick(\''+value.id+'\')">'+
								'<p>押金金额：<font class="depositTxt">'+value.normalDeposit+'元</font></p>'+
								'<p>订单时间：<font class="dateTxt">'+value.createDate+'</font></p>'+
							'</a>'+
						'</li>'
					)
				})
			}else{
				$('.noData').show();
			}
		}else{
			layer.alert(res.msg);
		}
	})
})

function orderClick(orderId){
	window.location.href = "boatDetail.html?orderId=" + orderId;
}