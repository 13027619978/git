var refundData;
var click = true;
var host = 'http://hd.smart-ideas.com.cn/';

$(function(){
	//防止页面后退
	history.pushState(null, null, document.URL);
	window.addEventListener('popstate', function () {
		wx.closeWindow();
	});
	
	app.wxUserInfo(function(){
		var scenicId = app.getCookie('scenicId');
		console.log(scenicId);
		if(scenicId == 'f57419d544e741838fb789056f63ee80'){
			$('.name').text('解放门码头');
		}else if(scenicId == 'bcd98681896f48ed878486519bfdeacf'){
			$('.name').text('台菱堤码头');
		}else if(scenicId == 'b4124ce0c8b244208de6d870ceb824a0'){
			$('.name').text('玄武门南码头');
		}else if(scenicId == '59800000eb4a4c4287652f86eaba848c'){
			$('.name').text('菱州码头');
		}else if(scenicId == '43a3c0756f854990ad7fd13f597cda3c'){
			$('.name').text('玄武门北码头');
		}else if(scenicId == 'a9f74e0b584945bea69985cd17f66a9d'){
			$('.name').text('后湖印月码头');
		}else if(scenicId == '8698c2bb90d645b3912528473f5ce930'){
			$('.name').text('和平门码头');
		}else if(scenicId == '41ab29656e5b405a9c94871488050ec3'){
			$('.name').text('翠洲门码头');
		}else if(scenicId == '283db1801eda4d0d9b542570b4506219'){
			$('.name').text('阳光码头');
		}else if(scenicId == '3f288414620f42cba6a7634401f71bca'){
			$('.name').text('芳桥码头');
		}else if(scenicId == '9030c8e60fa34f37b674a30f3c890143'){
			$('.name').text('郭璞敦码头');
		}else if(scenicId == '696dc31a1125458fa5ba1696f6e445c7'){
			$('.name').text('环洲码头');
		}else if(scenicId == 'dc8735edaa1b48c3ba8f948b6bb561a4'){
			$('.name').text('测试码头');
		}
		getRefundInfo(host);
	});
})

function getRefundInfo(host){
	$.ajax({
		type:"get",
		url:host + "xwhpark/devicePosLeaseApp/getWebRefundInfo?openId=" + app.getCookie('openid') + '&scenicId=' + app.getCookie('scenicId'),
		async:true,
		success: function(data){
			console.log(data);
			layer.closeAll();
			$('.searchView').html("");
			if(data.code == "SUCCESS"){
				var user = data.data;
				var order = data.data;
				refundData = data.data;
				console.log()
				var bikeType = "";
				if(order.deviceType == 0){
					bikeType = "四人大白鹅";
				}else if(order.deviceType == 1){
					bikeType = "六人大白鹅";
				}else if(order.deviceType == 2){
					bikeType = "四人画舫船";
				}else if(order.deviceType == 3){
					bikeType = "六人画舫船";
				}else if(order.deviceType == 4){
					bikeType = "四人电瓶船";
				}else if(order.deviceType == 5){
					bikeType = "六人电瓶船";
				}else if(order.deviceType == 6){
					bikeType = "四人大黄鸭";
				}else if(order.deviceType == 7){
					bikeType = "六人大黄鸭";
				}else if(order.deviceType == 8){
					bikeType = "四人小丑船";
				}else if(order.deviceType == 9){
					bikeType = "六人小丑船";
				}
				var de = order.normalDeposit;
				var ac = order.actualConsumeMoney;
				var re = "";
				if(de*1 <= ac*1){
					ac = de;
					re = 0;
				}else{
					re = (de*1 - ac*1).toFixed(2);
				}
				var str = '<div style="padding: 10px;">';
				if(user.phone){
					str += '<div style="margin-top: 5px;">手机号：'+user.phone+'</div> ';
				}
				str += '<div style="margin-top: 5px;">车型：'+bikeType+'</div>';
				str += '<div style="margin-top: 5px;">开始时间：'+order.ridingStartTime+'</div>';
				str += '<div style="margin-top: 5px;">结束时间：'+order.ridingEndTime+'</div>';
				str += '<div style="margin-top: 5px;">押金：'+de+'元</div>';
				str += '<div style="margin-top: 5px;">消费：'+ac+'元</div>';
				str += '<div style="margin-top: 5px;">剩余退款：'+re+'元</div> </div>';
				$('.searchView').append(str);
				$('.search-btn').show();
			}else{
				var dataMsg = data.msg;
				if(dataMsg == '您的手机号没有可退款的订单'){
					dataMsg = '<p style="color:red;font-weight:bold;">1、如果您已点击过"申请退款", 您的押金扣除消费后将原路退回<br></p>2、如果您使用微信支付请查询<font style="color:blue;">"微信支付记录"</font>; 如果您使用一卡通支付, 请查询<a style="color:blue;text-decoration: underline;font-weight:bold;" href="http://hd.smart-ideas.com.cn/xwhWeb/xwhCard/">"一卡通余额"</a><br>3、您的微信号暂时没有可退订单';
				}
				var str = '<div class="notice">' + dataMsg + '</div>';
				$('.searchView').append(str);
				$('.search-btn').hide();
				return;
			}
		}
	});
}


function searchClick(){
	var openDate = parseInt(app.getCookie('openDate'));
	var nowDate = new Date().getTime();
	if(openDate){
		var overdue = nowDate - openDate;
		if(overdue > 60*3*1000){
			layer.alert('二维码已失效，请您重新扫码');
			return;
		}
	}
	if(click){
		click = false;
		layer.msg('退款中，请稍后...', {
		  icon: 16,
		  shade: 0.01,
		  time: false
		});
		$.ajax({
			type:"post",
			url:host + 'xwhpark/devicePosLeaseApp/webRefund',
			contentType:"application/json",
			data: JSON.stringify(refundData),
			success: function(data){
				layer.alert(data.msg);
				setTimeout(function(){
					getRefundInfo(host);
				}, 2000);
			}
		});
	}
}