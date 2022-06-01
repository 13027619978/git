var account;
var password;
var promotionnumber;
$(function(){
	var ticketId = app.getQueryString('ticketId').split('/')[1];
	var openid = app.getCookie('openid');
	account = app.getCookie('account');
	password = app.getCookie('password');

	app.getAjax('order/getDetailsById', {
		ticketOrderId: ticketId
	}, function(res){
		console.log(res);
		if(res.success){
			var orderInfo = res.data;
			$('.price').text('￥' + orderInfo.totalPrice);
			$('.checkQuantity').text(orderInfo.checkQuantity);
			$('.visitDate').text(orderInfo.visitDate);
			
			// 是否显示退款按钮
			var checkQuantity = orderInfo.checkQuantity;
			var restCheckQuantity = orderInfo.restCheckQuantity;
			if(orderInfo.payStatus == '1'){
				if(new Date(orderInfo.visitDate.replace(/-/, '/').replace(/-/, '/') + ' 23:59:59').getTime() >= new Date().getTime()){
					if(checkQuantity == restCheckQuantity){
						$('.refundBtn').attr('onclick', 'refundClick('+ orderInfo.totalPrice +')');
					}else if(restCheckQuantity > 0 && checkQuantity != restCheckQuantity){
						$('.refundBtn').attr('onclick', '');
						$('.refundBtn').text('已部分核销');
					}else{
						$('.refundBtn').attr('onclick', '');
						$('.refundBtn').text('已核销');
					}
				}else{
					if(checkQuantity == restCheckQuantity){
						$('.refundBtn').attr('onclick', 'refundClick('+ orderInfo.totalPrice +')');
					}else if(restCheckQuantity > 0 && checkQuantity != restCheckQuantity){
						$('.refundBtn').attr('onclick', '');
						$('.refundBtn').text('已部分核销');
					}else{
						$('.refundBtn').attr('onclick', '');
						$('.refundBtn').text('已核销');
					}
				}
			}else{
				$('.refundBtn').attr('onclick', '');
				$('.refundBtn').text('退票成功');
				$('.refundBtn').addClass('red');
			}
			
			var ticketList = orderInfo.details;
			var showQrcode = true;
			ticketList.forEach(function(value, key){
				var descIndex = key + 1;
				var certDesc = '';
				if(value.checkType == '0'){
					certDesc = '凭二维码参观';
				}else if(value.checkType == '1'){
					certDesc = '凭身份证参观';
				}else{
					certDesc = '凭二维码或身份证参观';
				}
				var ticketName;
				if(orderInfo.ticketName == '人保预约票'){
					ticketName = '鲜花港人保专用票';
				}else{
					ticketName = orderInfo.ticketName;
				}
				var ticketView = '<div class="ticket">' +
					'<p class="ticketName">'+ ticketName +'</p>' +
					'<div class="ticketInfo">' +
						'<p class="desc">检票次数：</p>' +
						'<p>'+ value.checkQuantity +'</p>' +
					'</div>' +
					'<div class="ticketInfo">' +
						'<p class="desc">剩余次数：</p>' +
						'<p>'+ value.restCheckQuantity +'</p>' +
					'</div>' +
					'<div class="ticketInfo">' +
						'<p class="desc">检票时间：</p>' +
						'<p>'+ value.checkStartTime + '至' + value.checkEndTime +'</p>' +
					'</div>' +
				'</div>';
				
				$('.ticketList').append(ticketView);
			})
			
			$('.ticketList').hide();
			$('.qrcode').qrcode({
				text: orderInfo.checkCode,
				background: '#fff',
				foreground: '#000',
				width: 150,
				height: 150
			});
			
			
		}else{
			layer.alert(res.message);
		}
	});
	
	app.getAjax('orderVisitors/getOrderVisitors', {
		ticketOrderId: ticketId
	}, function(res){
		if(res.success){
			var visitorList = res.data;
			visitorList.forEach(function(value, key){
				var userName = value.userName;
				if(value.userName.indexOf(',') != -1){
					userName = value.userName.split(',')[0];
					promotionnumber = value.userName.split(',')[1];
				}else{
					promotionnumber = app.getCookie('promotionnumber');
				}
				if(value.certNumber){
					$('.visitorList').append(
						'<div class="visitor">' +
							'<div class="visitorInfo">' +
								'<p class="desc">姓名：</p>' +
								'<p>'+ userName +'</p>' +
							'</div>' +
							'<div class="visitorInfo">' +
								'<p class="desc">手机号：</p>' +
								'<p>'+ value.phone +'</p>' +
							'</div>' +
							'<div class="visitorInfo">' +
								'<p class="desc">身份证：</p>' +
								'<p>'+ value.certNumber +'</p>' +
							'</div>' +
						'</div>'
					)
				}else{
					$('.visitorList').append(
						'<div class="visitor">' +
							'<div class="visitorInfo">' +
								'<p class="desc">姓名：</p>' +
								'<p>'+ userName +'</p>' +
							'</div>' +
							'<div class="visitorInfo">' +
								'<p class="desc">手机号：</p>' +
								'<p>'+ value.phone +'</p>' +
							'</div>' +
						'</div>'
					)
				}
			})
			$('.visitorList').hide();
		}else{
			layer.alert(res.message);
		}
	})
	
	app.getAjax('orderCheck/getCheckList', {
		ticketOrderId: ticketId
	}, function(res){
		if(res.success){
			var checkList = res.data;
			if(checkList.length > 0){
				checkList.forEach(function(value, key){
					var checkType;
					if(value.checkWay == 'brake'){
						checkType = '闸机检票';
					}else if(value.checkWay == 'pos'){
						checkType = 'POS检票';
					}else{
						checkType = '管理员检票';
					}
					$('.checkList').append(
						'<div class="check">' +
							'<div class="checkInfo">' +
								'<p class="desc">检票方式：</p>' +
								'<p>'+ checkType +'</p>' +
							'</div>' +
							'<div class="checkInfo">' +
								'<p class="desc">检票次数：</p>' +
								'<p>'+ value.checkQuantity +'</p>' +
							'</div>' +
							'<div class="checkInfo">' +
								'<p class="desc">检票时间：</p>' +
								'<p>'+ value.checkTime +'</p>' +
							'</div>' +
						'</div>'
					)
				})
			}else{
				$('.noData').show();
				$('.checkList').hide();
			}
			
		}else{
			layer.alert(res.message);
		}
	})
})

function detailClick(that){
	$(that).toggleClass('active');
	if($(that).hasClass('active')){
		$(that).find('p').text($(that).find('p').text().replace(/查看/, "收起"));
		$(that).parent().find('.list').show();
	}else{
		$(that).find('p').text($(that).find('p').text().replace(/收起/, "查看"));
		$(that).parent().find('.list').hide();
	}
}

function refundClick(totalPrice){
	var ticketOrderId = app.getQueryString('ticketId').split('/')[1];
	layer.load(2);
	layer.confirm('是否确认申请退票。', {
	    btn: ['确认','取消'],
	    yes: function(){
			layer.load(2);
			// 人保推送取消
			app.postAjax('renbao/sync', {
				promotionnumber: promotionnumber,
				status: 2
			}, function(res){
				if(res.data.responseCode == '1'){
					app.postAjax('orderRefund/refundByWeb', {
						refundWay: 'web',
						ticketOrderId: ticketOrderId,
						refundMoney: totalPrice,
						refundDescription: '微信用户手动退款'
					}, function(res){
						layer.msg(res.message);
						if(res.success){
							setTimeout(function(){
								layer.closeAll();
								window.location.replace('xhgRbOrder.html');
							}, 1000);
						}else{
							layer.closeAll();
							layer.alert(res.message);
						}
					})
				}else{
					layer.alert(res.data.responseMessage);
				}
			})
			
		},
		btn2: function(){
			  layer.closeAll();
		}
	})
}
