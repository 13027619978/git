var ticketsType;
var lineId;
var siteId = 12;
var singlePrice;
var checkNumber;
$(function(){
	app.getAjax('battery/getLine', {}, function(res){
		$('.lineSelect').html('');
		var lineList = res.data;
		var htmlString = '';
		lineId = lineList[0].id;
		lineList.forEach(function(value, key){
			if(value.lineName == '湖东线'){
				htmlString += '<option value="'+ value.id +'">'+ value.lineName +'</option>';
			}
		})
		$('.lineSelect').html(htmlString);
		app.getAjax('battery/getLineTicket?lineId=' + lineId, {}, function(res){
			$('.priceSelect').html('');
			var priceList = res.data;
			var htmlString = '';
			priceList.forEach(function(value, key){
				if(value.ticketName == '20元票'){
					ticketsType = value.id;
					singlePrice = value.price;
					checkNumber = value.number;
				}
			})
			priceList.forEach(function(value, key){
				var ticketName;
				if(value.ticketName == '当日畅游车票'){
					ticketName = '10元/人/不限次畅游票(限时特价)';
					htmlString += '<option value="'+ value.id + ',10,' + value.number + '">'+ ticketName +'</option>';
				}else if(value.ticketName == '20元票'){
					ticketName = '20元/人/2次';
					htmlString += '<option selected="selected" value="'+ value.id + ',' + value.price + ',' + value.number + '">'+ ticketName +'</option>';
				}
			})
			$('.priceSelect').html(htmlString);
			$('.num').val(1);
			getTotalPrice(1);
		})
	})
})

function lineChange(that){
	$('.num').val(1);
	getTotalPrice(1);
	lineId = $(that).val();
	app.getAjax('battery/getLineTicket?lineId=' + lineId, {}, function(res){
		$('.priceSelect').html('');
		var priceList = res.data;
		var htmlString = '';
		priceList.forEach(function(value, key){
			if(value.ticketName == '20元票'){
				ticketsType = value.id;
				singlePrice = value.price;
				checkNumber = value.number;
			}
		})
		priceList.forEach(function(value, key){
			var ticketName;
			if(value.ticketName == '当日畅游车票'){
				ticketName = '10元/人/不限次畅游票(限时特价)';
				htmlString += '<option value="'+ value.id + ',10,' + value.number + '">'+ ticketName +'</option>';
			}else if(value.ticketName == '20元票'){
				ticketName = '20元/人/2次';
				htmlString += '<option selected="selected" value="'+ value.id + ',' + value.price + ',' + value.number + '">'+ ticketName +'</option>';
			}
		})
		$('.priceSelect').html(htmlString);
	})
	if(lineId == '1'){
		siteId = 12
	}else{
		siteId = 107
	}
}

function ticketTypeChange(that){
	ticketsType = $(that).val().split(',')[0];
	singlePrice = $(that).val().split(',')[1];
	checkNumber = $(that).val().split(',')[2];
	$('.num').val(0);
	getTotalPrice(0);
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
	var totalPrice = ticketsNumber * singlePrice;
	$('.totalPrice').text(totalPrice.toFixed(2));
	return totalPrice;
}

function buyClick(that){
	var ticketsNumber = $('.num').val();
	var totalMoney = getTotalPrice(ticketsNumber);
	var openid = app.getCookie('openid');
	var totalCheckNumber = checkNumber * ticketsNumber;
	console.log(checkNumber);
	var source = 2;
	if(ticketsNumber == 0){
		layer.alert('请先选择购票数量');
		return;
	}
	var detail = {};
	var details = [];
	for(var i = 0; i < ticketsNumber; i++){
		detail = {
			lineId: lineId,
			siteId: siteId,
			lineTicketId: ticketsType,
			totalMoney: singlePrice,
			number: checkNumber
		}
		details.push(detail);
	}
	var params = {
		openId: openid,
		totalMoney: totalMoney,
		source: source,
		details: details
	}
	$(that).attr('onclick', '');
	app.postAjax('batteryOrder/web/pay', params, function(res){
		if(res.code == 'SUCCESS'){
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
						window.location.replace("carTicketsOrder.html");
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