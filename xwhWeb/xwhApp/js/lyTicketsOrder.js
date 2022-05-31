$(function(){
	var openid = app.getCookie('openid');
	app.getAjax('collectionItemsOrder/getByOpenId', {
		openId: openid
	}, function(res){
		console.log(res);
		if(res.code == 'SUCCESS'){
			var orderList = res.data;
			if(orderList.length > 0){
				orderList.forEach(function(value, key){
					$('.orderList').append(
						'<li class="orderItem">'+
							'<a href="javascript:;" onclick="orderClick(\''+value.id+'\')">'+
								'<p>支付金额：<font class="depositTxt">'+value.totalMoney+'元</font></p>'+
								'<p>购票数量：<font class="numbers">'+value.buyQuantity+'</font></p>'+
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
	window.location.href = "lyTicketsDetail.html?orderId=" + orderId;
}