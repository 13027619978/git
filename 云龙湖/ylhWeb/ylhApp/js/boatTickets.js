var ticketsType = 1;
$(function(){
	$('.num').val(1);
	getTotalPrice(1);
})


function ticketTypeChange(that){
	ticketsType = $(that).val();
	if(ticketsType == '1'){
		$('.singlePrice').text('60元/张');
	}else if(ticketsType == '2'){
		$('.singlePrice').text('60元/张');
	}else if(ticketsType == '3'){
		$('.singlePrice').text('60元/张');
	}else if(ticketsType == '4'){
		$('.singlePrice').text('120元/张');
	}else if(ticketsType == '5'){
		$('.singlePrice').text('60元/张');
	}else if(ticketsType == '11'){
		$('.singlePrice').text('80元/张');
	}
	$('.num').val(1);
	getTotalPrice(1);
}

function add(that){
	var ticketsNumber = parseInt($(that).parent().find('input').val());
	if(ticketsNumber > 19){
		layer.alert('单次最多购买20张');
		return;
	}
	ticketsNumber += 1;
	$(that).parent().find('input').val(ticketsNumber);
	getTotalPrice(ticketsNumber);
}

function sub(that){
	var ticketsNumber = parseInt($(that).parent().find('input').val());
	if(ticketsNumber > 1){
		ticketsNumber -= 1;
		$(that).parent().find('input').val(ticketsNumber);
	}
	getTotalPrice(ticketsNumber);
}

function getTotalPrice(ticketsNumber){
	var singlePrice;
	if(ticketsType == '1'){
		singlePrice = 60;
	}else if(ticketsType == '2'){
		singlePrice = 60;
	}else if(ticketsType == '3'){
		singlePrice = 60;
	}else if(ticketsType == '4'){
		singlePrice = 120;
	}else if(ticketsType == '5'){
		singlePrice = 60;
	}else if(ticketsType == '11'){
		singlePrice = 80;
	}
	var totalPrice = ticketsNumber * singlePrice;
	$('.totalPrice').text(totalPrice.toFixed(2));
	return totalPrice;
}

function getCheckNumber(ticketsType, ticketsNumber){
	var checkNumber = 0;
	if(ticketsType == '1'){
		checkNumber = 1;
	}else if(ticketsType == '2'){
		checkNumber = 1;
	}else if(ticketsType == '3'){
		checkNumber = 1;
	}else if(ticketsType == '4'){
		checkNumber = 2;
	}else if(ticketsType == '5'){
		checkNumber = 1;
	}else if(ticketsType == '11'){
		checkNumber = 1;
	}
	
	return checkNumber * ticketsNumber;
}

function buyClick(that){
	var ticketsNumber = $('.num').val();
	var totalMoney = getTotalPrice(ticketsNumber);
	var openid = app.getCookie('openid');
	var siteId = 100;
	var totalCheckNumber = getCheckNumber(ticketsType, ticketsNumber);
	if(ticketsNumber == 0){
		layer.alert('请先选择购票数量');
		return;
	}
	var params = {
		openId: openid,
		siteId: siteId,
		totalNumber: ticketsNumber,
		totalMoney: totalMoney,
		type: ticketsType,
		totalCheckNumber: totalCheckNumber
	}
	$(that).attr('onclick', '');
	app.getAjax('deviceLoopApp/getWebPayInfo', params, function(res){
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