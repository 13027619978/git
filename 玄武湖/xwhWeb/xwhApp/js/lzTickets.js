var ticketsType;
$(function(){
	if(app.getQueryString('openid')){
		app.setCookie('openid', app.getQueryString('openid'));
	}
	$('.num').val(0);
	ticketsType = app.getQueryString('type');
	if(ticketsType == '0'){
		ticketsType = 1;
		$('.singlePrice').text('15元/张');
	}else if(ticketsType == '1'){
		ticketsType = 2;
		$('.singlePrice').text('20元/张');
	}else if(ticketsType == '2'){
		ticketsType = 4;
		$('.singlePrice').text('20元/张');
	}else if(ticketsType == '3'){
		ticketsType = 5;
		$('.singlePrice').text('15元/张');
	}else if(ticketsType == '4'){
		ticketsType = 3;
		$('.singlePrice').text('30元/张');
	}else if(ticketsType == '15'){
		ticketsType = 15;
		$('.singlePrice').text('98元/张');
	}else if(ticketsType == '16'){
		ticketsType = 16;
		$('.singlePrice').text('80元/张');
	}
})

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
	if(ticketsNumber > 0){
		ticketsNumber -= 1;
		$(that).parent().find('input').val(ticketsNumber);
	}
	getTotalPrice(ticketsNumber);
}

function getTotalPrice(ticketsNumber){
	var singlePrice;
	if(ticketsType == '1'){
		singlePrice = 15;
	}else if(ticketsType == '2'){
		singlePrice = 20;
	}else if(ticketsType == '4'){
		singlePrice = 20;
	}else if(ticketsType == '5'){
		singlePrice = 15;
	}else if(ticketsType == '3'){
		singlePrice = 30;
	}else if(ticketsType == '15'){
		singlePrice = 98;
	}else if(ticketsType == '16'){
		singlePrice = 80;
	}
	var totalPrice = ticketsNumber * singlePrice;
	$('.totalPrice').text(totalPrice.toFixed(2));
	return totalPrice;
}

function buyClick(that){
	var ticketsNumber = $('.num').val();
	var price = getTotalPrice(ticketsNumber);
	var openid = app.getCookie('openid');
	if(ticketsNumber == 0){
		layer.alert('请先选择购票数量');
		return;
	}
	$(that).attr('onclick', '');
	app.getCardAjax('/prod-api/api/h5/query/vipInfo', {
		openId: app.getCookie('openid') 
	}, function(res){
		if(res.code == '200'){
			var cashBalance = res.data.cashBalance;
			var giveBalance = res.data.giveBalance;
			var oldBalance = res.data.oldBalance;
			var totalBalance = cashBalance*1 + giveBalance*1 + oldBalance*1;
			if(totalBalance >= price){
				layer.confirm('您是玄武湖景区一卡通用户，请选择支付方式',{
					btn: ['一卡通支付', '微信支付'],
					skin: 'my=btnClass',
					cancel: function(){
						//取消禁用购买按钮
						$(that).attr('onclick', 'buyClick(this)');
					}
				}, function(){
					var params = {
						openId: 'card',
						itemSn: '2301',
						consumeOpenId: openid,
						totalNumber: ticketsNumber,
						totalMoney: price,
						type: ticketsType
					};
					wxPay(params, that);
				}, function(){
					var params = {
						openId: openid,
						totalNumber: ticketsNumber,
						totalMoney: price,
						type: ticketsType
					};
					wxPay(params, that);
				})
			}else{
				layer.confirm('一卡通余额不足，请使用微信支付？',{
					btn: ['前往支付'],
					cancel: function(){
						//取消禁用购买按钮
						$(that).attr('onclick', 'buyClick(this)');
					}
				}, function(){
					var params = {
						openId: openid,
						totalNumber: ticketsNumber,
						totalMoney: price,
						type: ticketsType
					};
					// 微信支付
					wxPay(params, that);
				})
			}
		}else{
			var params = {
				openId: openid,
				totalNumber: ticketsNumber,
				totalMoney: price,
				type: ticketsType
			};
			// 微信支付
			wxPay(params, that);
		}
	})
}

function wxPay(params, that){
	app.getAjax('deviceLoopApp/getWebPayInfo', params, function(res){
		if(res.code == 'SUCCESS'){
			var orderId = res.data.orderId;
			if(res.data.res){
				var res_o = JSON.parse(res.data.res);
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
				$(that).attr('onclick', 'buyClick()');
				if(parseInt(ticketsType) == 15){
					window.location.replace("lzxTicketsOrderDetail.html?orderId=" + orderId);
				}else if(parseInt(ticketsType) == 16){
					window.location.replace("lzTicketsOrderDetail.html?orderId=" + orderId);
				}else{
					window.location.replace("lzxTicketsOrderDetail.html?orderId=" + orderId);
				}
			}
		}else{
			layer.alert(res.msg);
			//取消禁用购买按钮
			$(that).attr('onclick', 'buyClick(this)');
		}
	})
}