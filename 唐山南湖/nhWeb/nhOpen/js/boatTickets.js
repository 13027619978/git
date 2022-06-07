var ticketsType;
$(function(){
	ticketsType = app.getQueryString('type');
	if(ticketsType == '0'){
		ticketsType = 2;
		$('.singlePrice').text('25元/张');
	}else{
		ticketsType = 1;
		$('.singlePrice').text('15元/张');
	}
})

function add(that){
	var ticketsNumber = parseInt($(that).parent().find('input').val());
	if(ticketsNumber > 5){
		layer.alert('单次最多购买6张');
		return;
	}
	ticketsNumber += 1;
	$(that).parent().find('input').val(ticketsNumber);
	getTotalPrice(ticketsNumber);
}

function sub(that){
	var ticketsNumber = parseInt($(that).parent().find('input').val());
	if(ticketsNumber > 0){
		ticketsNumber -= 1;
		$(that).parent().find('input').val(ticketsNumber);
	}
	getTotalPrice(ticketsNumber);
}

function getTotalPrice(ticketsNumber){
	var singlePrice;
	if(ticketsType == '2'){
		singlePrice = 25;
	}else{
		singlePrice = 15;
	}
	var totalPrice = ticketsNumber * singlePrice;
	$('.totalPrice').text(totalPrice.toFixed(2));
	return totalPrice;
}

function buyClick(that){
	layer.alert('暂不支持扫码支付');
	return;
	$(that).attr('onclick', '');
	var ticketsNumber = $('.num').val();
	var price = getTotalPrice(ticketsNumber);
	var openid = app.getCookie('openid');
	app.getAjax('deviceLoopApp/getWebPayInfo', {
		openId: openid,
		totalNumber: ticketsNumber,
		totalMoney: price,
		type: ticketsType
	}, function(res){
		if(res.code == 'SUCCESS'){
			var res_o = JSON.parse(res.data.res);
			var orderId = res.data.orderId;
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest', {
			       "appId":res_o.appId,     //公众号名称，由商户传入
			       "timeStamp":res_o.timeStamp,  //时间戳，自1970年以来的秒数
			       "nonceStr":res_o.nonceStr, //随机串
			       "package":res_o.package,
			       "signType":res_o.signType,//微信签名方式：
			       "paySign":res_o.paySign //微信签名
				},
				function(res){
					if(res.err_msg == "get_brand_wcpay_request:ok" ) {
						$(that).attr('onclick', 'buyClick()');
						window.location.replace("boatTicketsDetail.html?orderId=" + orderId);
					}else{
						//取消禁用购买按钮
			      		$(that).attr('onclick', 'buyClick(this)');
					}
				}
			);
		}else{
			layer.alert(res.msg);
			//取消禁用购买按钮
			$(that).attr('onclick', 'buyClick(this)');
		}
	})
}