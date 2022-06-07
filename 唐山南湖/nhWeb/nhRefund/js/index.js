var refundData;
var click = true;
var host = 'http://lease.smart-ideas.com.cn/nhpark/';
var scenicId = 'ba075c5f54db4a338a22867f017f85b2 ';
$(function(){
	//防止页面后退
	history.pushState(null, null, document.URL);
	window.addEventListener('popstate', function () {
		wx.closeWindow();
	});
	
	app.wxUserInfo(function(){
		console.log(scenicId);
		// if(scenicId == 'f57419d544e741838fb789056f63ee80'){
		// 	$('.name').text('解放门码头');
		// }else if(scenicId == 'bcd98681896f48ed878486519bfdeacf'){
		// 	$('.name').text('苔陵堤码头');
		// }else if(scenicId == 'b4124ce0c8b244208de6d870ceb824a0'){
		// 	$('.name').text('玄武门南码头');
		// }else if(scenicId == '59800000eb4a4c4287652f86eaba848c'){
		// 	$('.name').text('菱州码头');
		// }else if(scenicId == '43a3c0756f854990ad7fd13f597cda3c'){
		// 	$('.name').text('玄武门北码头');
		// }else if(scenicId == 'a9f74e0b584945bea69985cd17f66a9d'){
		// 	$('.name').text('后湖印月码头');
		// }else if(scenicId == '8698c2bb90d645b3912528473f5ce930'){
		// 	$('.name').text('和平门码头');
		// }else if(scenicId == '41ab29656e5b405a9c94871488050ec3'){
		// 	$('.name').text('翠洲门码头');
		// }else if(scenicId == '283db1801eda4d0d9b542570b4506219'){
		// 	$('.name').text('阳光码头');
		// }else if(scenicId == '3f288414620f42cba6a7634401f71bca'){
		// 	$('.name').text('芳桥码头');
		// }else if(scenicId == '9030c8e60fa34f37b674a30f3c890143'){
		// 	$('.name').text('郭璞敦码头');
		// }else if(scenicId == '696dc31a1125458fa5ba1696f6e445c7'){
		// 	$('.name').text('环洲码头');
		// }
		getRefundInfo(host)
	});
})

function getRefundInfo(host){
	$.ajax({
		type:"get",
		url:host + "devicePosLeaseApp/getWebRefundInfo?openId=" + app.getCookie('openid') + '&scenicId=' + scenicId,
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
				if(order.deviceType == 1){
					bikeType = "单排自行车";
				}else if(order.deviceType == 2){
					bikeType = "双排自行车";
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
				var str = '<p class="notice">' + data.msg + '</p>';
				$('.searchView').append(str);
				$('.search-btn').hide();
				return;
			}
		}
	});
}


function searchClick(){
	if(click){
		click = false;
		layer.msg('退款中，请稍后...', {
		  icon: 16,
		  shade: 0.01,
		  time: false
		});
		$.ajax({
			type:"post",
			url:host + 'devicePosLeaseApp/webRefund',
			contentType:"application/json",
			data: JSON.stringify(refundData),
			success: function(data){
				click = true;
				layer.alert(data.msg);
				setTimeout(function(){
					getRefundInfo(host);
				}, 2000);
			}
		});
	}
}