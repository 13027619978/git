var deviceId;
var deposit;
$(function(){
	var openid = app.getCookie('openid');
	// var str = '<div style="padding: 10px;">';
	// str += '<div style="margin-top: 5px;display:flex;">租车前请您仔细阅读游客须知，承租后则视为已知悉本须知内容，并能遵守以下规定：</div> ';
	// str += '<div style="margin-top: 5px;display:flex;">1. 自觉遵守公共秩序，保持环境卫生；</div>';
	// str += '<div style="margin-top: 5px;display:flex;">2. 请游客与工作人员确认车辆物品并保持租赁车辆及随身物品的完好；</div>';
	// str += '<div style="margin-top: 5px;display:flex;">3. 未满12周岁的儿童及70周岁以上的老人禁止租赁和驾驶车辆，须在监护人陪同下乘坐车辆；</div>';
	// str += '<div style="margin-top: 5px;display:flex;">4. 按租赁车辆核定人数乘车，不得超载； </div>';
	// str += '<div style="margin-top: 5px;display:flex;">5. 使用中不得追逐比赛，请按规定线路骑行或驾驶，严禁闯入设有禁止标志的道路或区域；</div>';
	// str += '<div style="margin-top: 5px;display:flex;">6. 禁止酒后或身体不佳者租赁使用车辆；</div>';
	// str += '<div style="margin-top: 5px;display:flex;">7. 工作人员有权劝阻租车人的危险行为，如租车人拒绝劝阻，工作人员可回收出租车辆，停止计时并退回所剩余额；</div>';
	// str += '<div style="margin-top: 5px;display:flex;">8. 遵守交通规则，礼让行人，右侧行驶，行车遇到坡道及桥梁请慢行或下车推行；</div>';
	// str += '<div style="margin-top: 5px;display:flex;">9. 使用车辆时，非车辆自身原因或违反须知造成骑车人，他人及财务损失等后果由租用人自负，车辆人为损坏及丢失，则按照车辆的采购价格照价赔偿。</div></div>';
	// layer.open({	
	// 	title: '车辆安全使用须知',
	// 	content: str,
	// 	btn: ['我已知悉']
	// });
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