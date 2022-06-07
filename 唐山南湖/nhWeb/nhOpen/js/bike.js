var deviceId;
var deposit;
$(function(){
	var openid = app.getCookie('openid');
	app.getAjax('deviceLeaseApp/getDeviceInfo',{
		deviceSn: app.getCookie('qrCode'),
		openId: openid
	}, function(res){
		console.log(res);
		if(res.code == 'SUCCESS'){
			var price = res.data.price;
			var device = res.data.device;
			$('.chargeTxt').text(price.price + '元/小时');
			$('.depositTxt').text(price.deposit + '元');
			deviceId = device.id;
			deposit = price.deposit;
		}else{
			layer.alert(res.msg);
		}
	})
})

function payClick(that){
	$(that).attr('onclick', '');
	$(that).addClass('disabled');
	var phone = $('.phone').val();
	if(phone){
		if(phone.length != 11){
			layer.msg('请输入正确的手机号！');
			//取消禁用购买按钮
			$(that).attr('onclick', 'payClick(this)');
			$(that).removeClass('disabled');
			return;
		}
		var openid = app.getCookie('openid');
		app.getAjax('deviceLeaseApp/getPayInfo', {
			deviceId: deviceId,
			openId: openid,
			phone: phone,
			deposit: deposit
		}, function(res){
			console.log(res);
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
							$(that).attr('onclick', 'payClick(this)');
				      		$(that).removeClass('disabled');
							window.location.replace("bikeDetail.html?orderId=" + orderId);
						}else{
							//取消禁用购买按钮
				      		$(that).attr('onclick', 'payClick(this)');
				      		$(that).removeClass('disabled');
						}
					}
				);
			}else{
				layer.alert(res.msg);
				//取消禁用购买按钮
				$(that).attr('onclick', 'payClick(this)');
				$(that).removeClass('disabled');
			}
		})
	}else{
		layer.msg('请输入手机号');
		//取消禁用购买按钮
		$(that).attr('onclick', 'payClick(this)');
		$(that).removeClass('disabled');
	}
}