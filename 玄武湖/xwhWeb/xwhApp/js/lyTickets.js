let singleTicket;
let ticketType;
let ticketList = [];
let ticketNumber = 1;
let checkNumber = 0;
$(function(){
	app.getAjax('collectionSet/get', {}, function(res){
		ticketList = res.data;
		res.data.forEach(function(value, key){
			if(value.price > 0){
				$('.ticketType').append(
					'<option value="'+ value.id +'">游乐项目'+ value.name +'</option>'
				)
			}
		})
		
		getSinglePrice();
	})
})

function ticketTypeChange(){
	ticketNumber = 1;
	$('.num').val(1);
	getSinglePrice();
}

function getSinglePrice(){
	ticketType = $('.ticketType').val();
	ticketList.forEach(function(value, key){
		if(value.id == ticketType){
			singleTicket = value.price;
			checkNumber = value.quantity;
		}
	})
	$('.singlePrice').text(singleTicket + '元/张');
	$('.totalPrice').text(parseFloat(singleTicket*ticketNumber).toFixed(2));
}

function add(that){
	ticketNumber += 1;
	$('.num').val(ticketNumber);
	getSinglePrice();
}

function sub(that){
	if(ticketNumber > 1){
		ticketNumber -= 1;
		$('.num').val(ticketNumber);
		getSinglePrice();
	}
}

function buyClick(that){
	var buyQuantity = ticketNumber;
	var totalMoney = singleTicket*ticketNumber;
	var openid = app.getCookie('openid');
	var collectionSetId = $('.ticketType').val();
	var checkQuantity = checkNumber*ticketNumber;
	$(that).attr('onclick', '');
	app.postAjax('collectionItemsOrder/web/pay', {
		collectionSetId: collectionSetId,
		openId: openid,
		buyQuantity: buyQuantity,
		checkQuantity: checkQuantity,
		totalMoney: totalMoney
	}, function(res){
		var orderId = res.data.order.id;
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
						$(that).attr('onclick', 'buyClick(this)');
						window.location.replace("lyTicketsDetail.html?orderId=" + orderId);
					}else{
						//取消禁用购买按钮
			      		$(that).attr('onclick', 'buyClick(this)');
					}
				}
			);
		}
	})
}