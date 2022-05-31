var deviceId;
var deposit;
var cardDeposit;
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
			app.getAjax('deviceLeaseApp/getDeviceInfo',{
				deviceSn: app.getCookie('qrCode'),
				openId: 'card',
				consumeOpenId: openid
			}, function(res1){
				if(res.code == 'SUCCESS'){
					var cardPrice = res1.data.price.price;
					cardDeposit = res1.data.price.deposit;
					$('.cardTxt').text('玄武湖一卡通用户押金'+ cardDeposit +'元，收费'+ cardPrice +'元/小时');
				}else{
					layer.alert(res.msg);
				}
			})
		}else{
			layer.alert(res.msg);
		}
	})
	
	
})

function payClick(that){
	$(that).attr('onclick', '');
	$(that).addClass('disabled');
	var phone = $('.phone').val();
	var sure = $('.sure').is(':checked');
	if(!sure){
		layer.alert('请先勾选我已知悉！');
		//取消禁用购买按钮
		$(that).attr('onclick', 'payClick(this)');
		$(that).removeClass('disabled');
		return;
	}
	$('.hoverView').hide();
	if(phone){
		if(phone.length != 11){
			layer.msg('请输入正确的手机号！');
			//取消禁用购买按钮
			$(that).attr('onclick', 'payClick(this)');
			$(that).removeClass('disabled');
			return;
		}
		var openid = app.getCookie('openid');
		app.getCardAjax('/prod-api/api/h5/query/vipInfo', {
			openId: openid
		}, function(res){
			if(res.code == '200'){
				var cashBalance = res.data.cashBalance;
				var giveBalance = res.data.giveBalance;
				var oldBalance = res.data.oldBalance;
				var totalBalance = cashBalance*1 + giveBalance*1 + oldBalance*1;
				if(totalBalance >= cardDeposit){
					layer.confirm('您是玄武湖景区一卡通用户，请选择支付方式',{
						btn: ['一卡通支付', '微信支付'],
						skin: 'my=btnClass',
						cancel: function(){
							//取消禁用购买按钮
							$(that).attr('onclick', 'payClick(this)');
						}
					}, function(){
						var params = {
							openId: 'card',
							consumeNo: '2201',
							consumeOpenId: openid,
							deviceId: deviceId,
							phone: phone,
							deposit: cardDeposit
						};
						wxPay(params, that);
					}, function(){
						var params = {
							deviceId: deviceId,
							openId: openid,
							phone: phone,
							deposit: deposit
						};
						wxPay(params, that);
					})
				}else{	
					var str = '<p style="display:flex;justify-content:flex-start;align-items: flex-start;flex-wrap:wrap;">您此微信绑定的一卡通<font style="color:#ff5500;font-weight:bold;">余额不足</font>，请使用<font style="color:#ff5500;font-weight:bold;">微信支付</font>或<font style="color:#ff5500;font-weight:bold;">前往一卡通充值</font></p>';
					layer.open({
						content: str,
						btn: ['前往微信支付', '前往一卡通充值'],
						cancel: function(){
							//取消禁用购买按钮
							$(that).attr('onclick', 'payClick(this)');
						},
						btn1: function(){
							var params = {
								deviceId: deviceId,
								openId: openid,
								phone: phone,
								deposit: deposit
							};
							// 微信支付
							wxPay(params, that);
						},
						btn2: function(){
							window.location.replace('http://hd.smart-ideas.com.cn/xwhWeb/xwhCard/')
						}
					})
				}
			}else{
				var params = {
					deviceId: deviceId,
					openId: openid,
					phone: phone,
					deposit: deposit
				};
				// 微信支付
				wxPay(params, that);
			}
		}, function(){
			var params = {
				deviceId: deviceId,
				openId: openid,
				phone: phone,
				deposit: deposit
			};
			// 微信支付
			wxPay(params, that);
		})
	}else{
		layer.msg('请输入手机号');
		//取消禁用购买按钮
		$(that).attr('onclick', 'payClick(this)');
		$(that).removeClass('disabled');
	}
}

function wxPay(params, that){
	app.getAjax('deviceLeaseApp/getPayInfo', params, function(res){
		console.log(res);
		if(res.code == 'SUCCESS'){
			if(res.data.res){
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
							window.location.replace("boatDetail.html?orderId=" + orderId);
						}else{
							//取消禁用购买按钮
				      		$(that).attr('onclick', 'payClick(this)');
				      		$(that).removeClass('disabled');
						}
					}
				);
			}else{
				var orderId = res.data.payId;
				$(that).attr('onclick', 'payClick(this)');
				window.location.replace("boatDetail.html?orderId=" + orderId);
			}
		}else{
			layer.alert(res.msg);
			//取消禁用购买按钮
			$(that).attr('onclick', 'payClick(this)');
			$(that).removeClass('disabled');
		}
	})
}


function hoverClick(that){
	var phone = $('.phone').val();
	if(phone){
		$(that).removeClass('disabled');
		if(phone.length != 11){
			layer.msg('请输入正确的手机号！');
			return;
		}
		$('.hoverView').css({
			'display': 'flex'
		})
	}else{
		layer.msg('请输入手机号');
	}
}