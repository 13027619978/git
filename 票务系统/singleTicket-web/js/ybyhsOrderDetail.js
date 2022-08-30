$(function(){
	var ticketId = app.getQueryString('ticketId').split('/')[1];
	var openid = app.getCookie('openid');
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
				
				var ticketView = '<div class="ticket">' +
					'<p class="ticketName">'+ value.groupName +'('+orderInfo.categoryName +')</p>' +
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
				if(app.getCookie('enterpriseCode') == 'TgsEpcYby'){
					if(orderInfo.categoryName == '年票'){
						ticketView = '<div class="ticket">' +
							'<p class="ticketName">'+ value.groupName +'('+orderInfo.categoryName +')</p>'
							'<div class="ticketInfo">' +
								'<p class="desc">检票时间：</p>' +
								'<p>'+ value.checkStartTime + '至' + value.checkEndTime +'</p>' +
							'</div>' +
						'</div>';
						$('.refundBtn').hide();
					}
					
					if(orderInfo.ticketName == '已购票登记'){
						$('.ticketDetail').hide();
						$('.checkQuantity').addClass('red');
					}
				}
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
			if(app.getCookie('enterpriseCode') == 'TgsEpcYby'){
				if(orderInfo.categoryName == '年票'){
					$('.visitDate').text(orderInfo.visitDate + '至2022-01-31');
					$('.checkItem').hide();
					$('.headPic').show();
					
					$('.headImg').attr('src', app.getCookie('headPicUrl'));
					
				}
				if(orderInfo.payStatus == '1'){
					if(checkQuantity != restCheckQuantity){
						if(orderInfo.totalPrice != 0){
							$('.invoiceView').show();
							$('.invoiceDetail').qrcode({
								text:getInvoiceQrCode(orderInfo.payTime,orderInfo.totalPrice,orderInfo.ticketOrderId, orderInfo.buyQuantity),
								background: '#fff',
								foreground: '#000',
								width: 150,
								height: 150
							});
							var parent = document.getElementsByClassName('invoiceDetail')[0];
							$('.invoiceImg').attr('src', parent.getElementsByTagName('canvas')[0].toDataURL("image/png"));
						}
					}
					if(orderInfo.categoryName == '年票'){
						if(orderInfo.showQrUrl){
							$('.cardView').show();
							$('.cardImg').attr('src', orderInfo.showQrUrl);
						}
						
						if(orderInfo.totalPrice != 0){
							$('.invoiceView').show();
							$('.invoiceDetail').qrcode({
								text:getInvoiceQrCode(orderInfo.payTime,orderInfo.totalPrice,orderInfo.ticketOrderId, orderInfo.buyQuantity),
								background: '#fff',
								foreground: '#000',
								width: 150,
								height: 150
							});
							var parent = document.getElementsByClassName('invoiceDetail')[0];
							$('.invoiceImg').attr('src', parent.getElementsByTagName('canvas')[0].toDataURL("image/png"));
						}
					}
				}
			}
			
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
				$('.visitorList').append(
					'<div class="visitor">' +
						'<div class="visitorInfo">' +
							'<p class="desc">姓名：</p>' +
							'<p>'+ value.userName.split(',')[0] +'</p>' +
						'</div>' +
						'<div class="visitorInfo">' +
							'<p class="desc">手机号：</p>' +
							'<p>'+ value.phone +'</p>' +
						'</div>' +
						'<div class="visitorInfo">' +
							'<p class="desc">影楼：</p>' +
							'<p>'+ value.userName.split(',')[1] +'</p>' +
						'</div>' +
						'<div class="visitorInfo">' +
							'<p class="desc">健康码：</p>' +
							'<p>'+ value.userName.split(',')[2] +'</p>' +
						'</div>' +
						'<div class="visitorInfo">' +
							'<p class="desc">来园人数：</p>' +
							'<p>'+ value.userName.split(',')[3] +'</p>' +
						'</div>' +
						'<div class="visitorInfo">' +
							'<p class="desc">到达时间：</p>' +
							'<p>'+ value.userName.split(',')[4] +'</p>' +
						'</div>' +
						'<div class="visitorInfo">' +
							'<p class="desc">拍摄展园：</p>' +
							'<p>'+ value.userName.split(',')[5] +'</p>' +
						'</div>' +
					'</div>'
				);
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
			// 再次开锁
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
						window.location.replace('ybyhsOrder.html');
					}, 1000);
				}else{
					layer.closeAll();
					layer.alert(res.message);
				}
			})
		},
		btn2: function(){
			  layer.closeAll();
		}
	})
}

function getInvoiceQrCode(date, price, orderCode, number){
	var taxNumber = "911101065996792075";        //税号
	var commodityCode = "3070101";
	var taxRate = "0";         //税率
	var taxName = "门票";      //项目名称
	var aesKey = "UITN25DZFPC222IM";   //AES key
	var taxAddress = "http://ydkp.e-inv.cn/k/01?fpcode=";   //发票二维码地址
	var date = date;
	var price = price;
	var orderCode = orderCode;
	var result = taxNumber + '#' + orderCode + '##' + date + '!门票#' + commodityCode + '#' + taxRate + '#' + price + '#' + number + '#0';
	function encrypt(word){
		var key = CryptoJS.enc.Utf8.parse(aesKey);
		var srcs = CryptoJS.enc.Utf8.parse(word);
		var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
		return encrypted.toString();
	}
	var data2 = encrypt(result);
	var md5Result = hex_md5(data2);
	console.log(data2);
	var password = md5Result.substring(7, 8) + md5Result.substring(11, 12) + md5Result.substring(15, 16)
			+ md5Result.substring(19, 20) + md5Result.substring(23, 24) + md5Result.substring(27, 28);
	result += ("!" + password);
	console.log(result);
	result = taxAddress + new Base64().encode(result);
	return result;
}