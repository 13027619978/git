var ticketsType = 18;
var singlePrice = 120;
let timeValue;
let satTime;
let sunTime;
$(function(){
	var nowWeek = new Date().getDay();
	nowWeek = nowWeek==0?7:nowWeek;
	var nowHour = new Date().getHours();
	var nowMinutes = new Date().getMinutes();
	if(nowWeek == 6 && nowHour >= 16){
		$('.timeBtn').eq(0).attr('onclick', 'closeClick()').addClass('disabled');
	}
	if(nowWeek == 7 && nowHour >= 16){
		$('.timeBtn').attr('onclick', 'closeClick()').addClass('disabled');
	}
	var nowDateNum = new Date().getTime();
	var satDateNum = (6 - nowWeek) * 60 * 60 * 24 * 1000 + nowDateNum;
	var sunDateNum = (7 - nowWeek) * 60 * 60 * 24 * 1000 + nowDateNum;
	var satDate = new Date(satDateNum);
	var sunDate = new Date(sunDateNum);
	satTime = getDateString(satDate);
	sunTime = getDateString(sunDate);
	app.getAjax('deviceLoopApp/getTicketStock', {
		date1: satDate,
		date2: sunDate
	}, function(res){
		let satLast = res.data[satDate].total - res.data[satDate].sell;
		let sunLast = res.data[sunDate].total - res.data[sunDate].sell;
		$('.timeBtn').eq(0).text(satTime +' 16:00-17:30 库存：' + satLast)
		$('.timeBtn').eq(1).text(sunTime +' 16:00-17:30 库存：' + sunLast)
	})
	
	if(app.getQueryString('openid')){
		app.setCookie('openid', app.getQueryString('openid'));
		
	}
	$('.num').val(1);
	getTotalPrice(1)
})

// 获取日期
function getDateString(time){
	let dateString = new Date(time);
	let yearString = dateString.getFullYear();
	let monthString = dateString.getMonth() + 1;
	monthString = monthString > 9 ? monthString : '0' + monthString;
	let dayString = dateString.getDate();
	dayString = dayString > 9 ? dayString : '0' + dayString;
	return yearString + '-' + monthString + '-' + dayString;
}

function closeClick(){
	layer.alert('无法选择当前场次');
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

function selectTime(that, timeId){
	$(that).addClass('active').siblings().removeClass('active');
	timeValue = timeId;
}

function getTotalPrice(ticketsNumber){
	var totalPrice = ticketsNumber * singlePrice;
	$('.totalPrice').text(totalPrice.toFixed(2));
	return totalPrice;
}

function buyClick(that){
	var ticketsNumber = $('.num').val();
	var price = getTotalPrice(ticketsNumber);
	var openid = app.getCookie('openid');
	var userName = $('.userName').val();
	var phone = $('.phone').val();
	var visitDate;
	if(ticketsNumber == 0){
		layer.alert('请先选择购票数量');
		return;
	}
	if(!phone){
		layer.alert('请先输入手机号');
		return;
	}
	if(!userName){
		layer.alert('请先输入联系人姓名');
		return;
	}
	if(!timeValue){
		layer.alert('请先选择场次时间');
		return;
	}
	$(that).attr('onclick', '');
	if(timeValue == '1'){
		visitDate = satTime;
	}
	if(timeValue == '2'){
		visitDate = sunTime;
	}
	var params = {
		openId: openid,
		totalNumber: ticketsNumber,
		totalMoney: price,
		type: ticketsType,
		userName: userName,
		phone: phone,
		sessionId: timeValue,
		visitDate: visitDate
	};
	console.log(params);
	// 微信支付
	wxPay(params, that);
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
							window.location.replace("lzxTicketsOrderDetail.html?orderId=" + orderId);
						}else{
							//取消禁用购买按钮
				      		$(that).attr('onclick', 'buyClick(this)');
						}
					}
				);
			}else{
				$(that).attr('onclick', 'buyClick()');
				window.location.replace("lzxTicketsOrderDetail.html?orderId=" + orderId);
			}
		}else{
			layer.alert(res.msg);
			//取消禁用购买按钮
			$(that).attr('onclick', 'buyClick(this)');
		}
	})
}