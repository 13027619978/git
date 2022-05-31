let singleTicket;
let ticketType;
$(function(){
	getSinglePrice();
	if(app.getQueryString('openid')){
		app.setCookie('openid', app.getQueryString('openid'));
	}
})

function ticketTypeChange(){
	getSinglePrice();
}

function orderClick(){
	$("#ticketType1").prop("checked",false);
	$("#ticketType2").prop("checked",false);
	window.location.href = 'chooseOrder.html';
}

function getSinglePrice(){
	ticketType = $("input[name='ticketType']:checked").val();
	if(ticketType == '1'){
		singleTicket = 100;
	}else if(ticketType == '2'){
		singleTicket = 180;
	}else{
		singleTicket = 0;
	}
	$('.singlePrice').text(singleTicket + '元/小时');
	$('.totalPrice').text(parseFloat(singleTicket).toFixed(2));
}

function buyClick(that){
	var ticketsNumber = 1;
	var totalMoney = singleTicket;
	var openid = app.getCookie('openid');
	var phone = $('.phone').val();
	if(phone.length != 11){
		layer.alert('请先输入正确的手机号');
		return;
	}
	if(!ticketType){
		layer.alert('请先选择购票类型');
		return;
	}
	$(that).attr('onclick', '');
	app.postAjax('canoeOrder/web/pay', {
		totalMoney: totalMoney,
		openId: openid,
		ticketId: ticketType,
		phone: phone,
		number: 1
	}, function(res){
		var orderId = res.data.canoeOrder.payId;
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
						$("#ticketType1").prop("checked",false);
						$("#ticketType2").prop("checked",false);
						$(that).attr('onclick', 'buyClick(this)');
						window.location.replace("canoeTicketsDetail.html?orderId=" + orderId);
					}else{
						//取消禁用购买按钮
			      		$(that).attr('onclick', 'buyClick(this)');
					}
				}
			);
		}
	})
}