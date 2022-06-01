var refundData;
var priceData;
var click = true;
var host = 'http://rent.smart-ideas.com.cn/';

$(function(){
	//防止页面后退
	history.pushState(null, null, document.URL);
	window.addEventListener('popstate', function () {
		wx.closeWindow();
	});
	
	app.wxUserInfo(function(){
		var scenicId = app.getCookie('scenicId');
		console.log(scenicId);
		var scenicName;
		if(scenicId == '14249a7ee96d4d3f95195a799a3709d2'){
		  scenicName = '杏花坞';
		}else if(scenicId == '2a96be8cf7744d9088986920e2f0d6d9'){
		  scenicName = '开元宾馆';
		}else if(scenicId == '47fca49def99492c80a58d8592400589'){
		  scenicName = '老子水居';
		}else if(scenicId == '4c74b97aaf5b4ff594d11841d4ec8de9'){
		  scenicName = '南湖一号';
		}else if(scenicId == '5acd3b7ae10544ec9632b41392c0e695'){
		  scenicName = '解忧桥';
		}else if(scenicId == '7911474d3e1b42e891bd91f6eaf55077'){
		  scenicName = '未定';
		}else if(scenicId == '8ea1d467f3af4d2aa46b09219d6273f6'){
		  scenicName = '断桥';
		}else if(scenicId == 'b3bb924f74ed4e8ebcad576a382e8791'){
		  scenicName = '沉水廊道';
		}else if(scenicId == 'cdabffaf5cb442da8f5ca9ac50f85efc'){
		  scenicName = '水族馆（沙月岛）';
		}else if(scenicId == 'ed28b43724f0477d9755de59b28160dd'){
		  scenicName = '音乐厅';
		}else if(scenicId == 'f769f573bc3e4df5986ec45993e94fbd'){
		  scenicName = '苏公塔';
		}else if(scenicId == 'e258ca79d5ca4e33b177794a6d815ad5'){
		  scenicName = '测试码头';
		}
		$('.name').text(scenicName);
		
		getRefundInfo(host)
	});
})

function getRefundInfo(host){
	$.ajax({
		type:"get",
		url:host + "ylhpark/devicePosLeaseApp/getWebRefundInfo?openId=" + app.getCookie('openid') + '&scenicId=' + app.getCookie('scenicId'),
		async:true,
		success: function(data){
			console.log(data);
			layer.closeAll();
			$('.searchView').html("");
			if(data.code == "SUCCESS"){
				var user = data.data.order;
				var order = data.data.order;
				refundData = data.data.order;
				priceData = data.data.scenicPrice;
				var bikeType = "";
				if(order.deviceType == '0'){
					bikeType = "四人船";
				}else if(order.deviceType == '1'){
					bikeType = "六人船";
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
				app.getAjax('couponsOrder/user/getUseList', {
					phone: user.phone
				}, function(res){
					if(res.code == 'SUCCESS'){
						if(res.data.length > 0){
							var singlePrice = priceData.price;
							var couponsCount = Math.ceil(ac / singlePrice);
							var couponsList = res.data;
							var useCoupons = 0;
							couponsList.forEach(function(value, key){
								var effectEndDate = value.effectEndDate;
								effectEndDate = effectEndDate.replace(/-/, "/").replace(/-/, "/");
								var effectStartDate = value.effectStartDate;
								effectStartDate = effectStartDate.replace(/-/, "/").replace(/-/, "/");
								var nowTime = new Date().getTime();
								var effectStartTime = new Date(effectStartDate + ' 00:00:00').getTime();
								var effectEndTime = new Date(effectEndDate + ' 23:59:59').getTime();
								console.log(effectStartTime);
								console.log(nowTime);
								console.log(effectEndTime);
								if(value.useStatus == '0' && effectStartTime <= nowTime && effectEndTime >= nowTime){
									if(useCoupons < couponsCount){
										useCoupons += 1;
									}
								}
								console.log(useCoupons);
							})
							var couponsMoney = useCoupons * singlePrice;
							couponsMoney = couponsMoney > ac ? ac : couponsMoney;
							var refundMoney = re*1 + couponsMoney*1;
							if(ac == 0){
								refundString();		
							}else if(couponsMoney == 0){
								refundString();	
							}else{
								var str = '<div style="padding: 10px;">';
								if(user.phone){
									str += '<div style="margin-top: 5px;">手机号：'+user.phone+'</div> ';
								}
								str += '<div style="margin-top: 5px;">船型：'+bikeType+'</div>';
								str += '<div style="margin-top: 5px;">开始时间：'+order.ridingStartTime+'</div>';
								str += '<div style="margin-top: 5px;">结束时间：'+order.ridingEndTime+'</div>';
								str += '<div style="margin-top: 5px;">押金：'+de+'元</div>';
								str += '<div style="margin-top: 5px;">消费：'+ac+'元</div>';
								str += '<div style="margin-top: 5px;">剩余退款：'+refundMoney+'元</div>';
								str += '<div style="margin-top: 5px;">(优惠券已抵扣消费'+couponsMoney+'元)</div> </div>';
								$('.searchView').append(str);
								$('.search-btn').show();
							}
						}else{
							refundString();						
						}
					}else{
						refundString();
					}
					
					function refundString(){
						var str = '<div style="padding: 10px;">';
						if(user.phone){
							str += '<div style="margin-top: 5px;">手机号：'+user.phone+'</div> ';
						}
						str += '<div style="margin-top: 5px;">船型：'+bikeType+'</div>';
						str += '<div style="margin-top: 5px;">开始时间：'+order.ridingStartTime+'</div>';
						str += '<div style="margin-top: 5px;">结束时间：'+order.ridingEndTime+'</div>';
						str += '<div style="margin-top: 5px;">押金：'+de+'元</div>';
						str += '<div style="margin-top: 5px;">消费：'+ac+'元</div>';
						str += '<div style="margin-top: 5px;">剩余退款：'+re+'元</div> </div>';
						$('.searchView').append(str);
						$('.search-btn').show();
					}
				})
				
			}else{
				$('.coupons').hide();
				var dataMsg = data.msg;
				if(dataMsg == '您的手机号没有可退款的订单'){
					dataMsg = '<font>1、如果您已点击过"申请退款", 您的押金扣除消费后将原路退回</font><br>2、您的微信号暂时没有可退订单';
				}
				var str = '<p class="notice">' + dataMsg + '</p>';
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
		var userPhone = refundData.phone;
		click = false;
		app.getAjax('couponsOrder/user/getUseList', {
			phone: userPhone
		}, function(res){
			// 消费金额
			var ac = refundData.actualConsumeMoney;
			// 押金
			var de = refundData.normalDeposit;
			var singlePrice = priceData.price;
			var couponsCount = Math.ceil(ac / singlePrice);
			var couponsList = res.data;
			var useCoupons = [];
			couponsList.forEach(function(value, key){
				var effectEndDate = value.effectEndDate;
				effectEndDate = effectEndDate.replace(/-/, "/").replace(/-/, "/");
				var effectStartDate = value.effectStartDate;
				effectStartDate = effectStartDate.replace(/-/, "/").replace(/-/, "/");
				var nowTime = new Date().getTime();
				var effectStartTime = new Date(effectStartDate + ' 00:00:00').getTime();
				var effectEndTime = new Date(effectEndDate + ' 23:59:59').getTime();
				
				// var useStartDate = new Date(new Date().toLocaleDateString() + ' 10:00:00').getTime();
				// var useEndDate = new Date(new Date().toLocaleDateString() + ' 11:00:00').getTime();
				
				if(value.useStatus == '0' && effectStartTime <= nowTime && effectEndTime >= nowTime){
					if(useCoupons.length < couponsCount){
						useCoupons.push({
							couponsId: value.id,
							orderId: refundData.id,
							useType: '1'
						});
					}
				}
			})
			if(useCoupons.length > 0){
				if(ac == 0){
					// 消费金额为0
					layer.msg('退款中，请稍后...', {
					  icon: 16,
					  shade: 0.01,
					  time: false
					});
					$.ajax({
						type:"post",
						url:host + 'ylhpark/devicePosLeaseApp/webRefund',
						contentType:"application/json",
						data: JSON.stringify(refundData),
						success: function(data){
							layer.alert(data.msg);
							setTimeout(function(){
								getRefundInfo(host);
							}, 2000);
						}
					});
				}else{
					layer.msg('退款中，请勿关闭页面...', {
					  icon: 16,
					  shade: 0.01,
					  time: false
					});
					$.ajax({
						type:"post",
						url:host + 'ylhpark/devicePosLeaseApp/webRefund',
						contentType:"application/json",
						data: JSON.stringify(refundData),
						success: function(data){
							if(data.msg == '退款成功'){
								var couponsNumber = useCoupons.length;
								var couponsMoney = singlePrice*couponsNumber;
								couponsMoney = couponsMoney > ac  ? ac : couponsMoney;
								app.postAjax('deviceOrderWeb/refundMoney', {
									orderId: data.data.order.id,
									refundMoney: couponsMoney
								}, function(res){
									app.postAjax('couponsOrder/use', {
										uses: useCoupons
									}, function(res){
										layer.alert(data.msg);
										setTimeout(function(){
											getRefundInfo(host);
										}, 2000);
									})
								})
							}else{
								layer.alert(data.msg);
							}
						}
					});
				}
			}else{
				layer.msg('退款中，请稍后...', {
				  icon: 16,
				  shade: 0.01,
				  time: false
				});
				$.ajax({
					type:"post",
					url:host + 'ylhpark/devicePosLeaseApp/webRefund',
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
		})
	}
}