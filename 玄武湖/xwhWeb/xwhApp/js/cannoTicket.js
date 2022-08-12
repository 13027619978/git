let singleTicket = 0;
let ticketType;
let timeValue;
$(function(){
	if(app.getQueryString('openid')){
		app.setCookie('openid', app.getQueryString('openid'));
	}
	
	var ticketType = app.getQueryString('ticketType');
	if(ticketType){
		$('.num').val(1);
	}
	if(ticketType == 5){
		$("#ticketType3").prop("checked",true);
		$('.timeView').show();
	}else if(ticketType == 4){
		$("#ticketType4").prop("checked",true);
	}else if(ticketType == 1){
		$("#ticketType1").prop("checked",true);
	}else if(ticketType == 2){
		$("#ticketType2").prop("checked",true);
	}else if(ticketType == 6){
		$("#ticketType5").prop("checked",true);
	}
	
	getTotalPrice();
	
	var str = '<div>';
	str += '<p style="font-size:16px;font-weight:bold;text-align:center;">免责声明</p>';
	str += '<p style="font-size:12px;text-indent:2em;">根据玄武湖水上运动基地相关规定，手机、耳机、车钥匙等贵重物品严禁携带上船，本基地对游客携带上述物品的遗失、损坏不承担赔偿责任。</p>';
	str += '<p style="font-size:12px;text-indent:2em;">本人已阅读以上声明，自愿携带。若发生遗失、损坏按以上规则处理，特此声明！</p>';
	str += '</div>'
	layer.open({
		content: str,
		closeBtn: false,
		btn: ['我已阅读']
	})
})

function ticketTypeChange(){
	$('.num').val('1');
	$('.timeBtn').removeClass('active');
	timeValue = '';
	getTotalPrice();
}

function orderClick(){
	$("#ticketType1").prop("checked",false);
	$("#ticketType2").prop("checked",false);
	$("#ticketType3").prop("checked",false);
	$("#ticketType4").prop("checked",false);
	window.location.href = 'chooseOrder.html';
}

function add(that){
	ticketType = $("input[name='ticketType']:checked").val();
	if(ticketType){
		var ticketsNumber = parseInt($(that).parent().find('input').val());
		if(ticketsNumber > 19){
			layer.alert('单次最多购买20张');
			return;
		}
		ticketsNumber += 1;
		$(that).parent().find('input').val(ticketsNumber);
		getTotalPrice(ticketsNumber);
	}else{
		layer.alert('请先选择购票种类')
	}
}

function sub(that){
	var ticketsNumber = parseInt($(that).parent().find('input').val());
	if(ticketsNumber > 1){
		ticketsNumber -= 1;
		$(that).parent().find('input').val(ticketsNumber);
	}
	getTotalPrice(ticketsNumber);
}

function selectTime(that){
	$(that).addClass('active').siblings().removeClass('active');
	timeValue = 1;
}

function getTotalPrice(){
	ticketType = $("input[name='ticketType']:checked").val();
	$('.timeView').hide();
	$('.ticketDesc').hide();
	if(ticketType == '1'){
		singleTicket = 100;
	}else if(ticketType == '2'){
		singleTicket = 180;
	}else if(ticketType == '4'){
		singleTicket = 150;
	}else if(ticketType == '5'){
		singleTicket = 65;
		$('.timeView').show();
	}else if(ticketType == '6'){
		singleTicket = 80;
		$('.ticketDesc').show();
	}
	$('.singlePrice').text(singleTicket + '元/小时');
	if(ticketType == '5'){
		$('.singlePrice').text(singleTicket + '元/人/小时(仅限周二至周日)');
	}

	var totalNumber = $('.num').val();
	$('.totalPrice').text(singleTicket*totalNumber);
}

function buyClick(that){
	var ticketsNumber = $('.num').val();
	var totalMoney = singleTicket*ticketsNumber;
	var openid = app.getCookie('openid');
	var phone = $('.phone').val();
	if(ticketType == 5){
		if(!timeValue){
			layer.alert('请先选择时间');
			return;
		}
	}
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
		number: ticketsNumber
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