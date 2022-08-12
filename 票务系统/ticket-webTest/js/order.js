var headPicUrl;
var orderList = [];
$(function(){
	getOrderList();
})

function getOrderList(){
	$('.orderList').html('');
	var openid = app.getCookie('openid');
	app.encryptGetAjax('order/encrypt/getDetailListByOpenId', {
		openId: openid,
		enterpriseCode: app.getCookie('enterpriseCode'),
		ticketGroupNum: app.getCookie('ticketGroupNum')
	}, function(res){
		console.log(res);
		if(res.success){
			orderList = res.data;
			if(orderList.length == 0){
				$('.noData').show();
				$('.orderList').hide();
			}else{
				orderList.forEach(function(value, key){
					// 可检票次数
					var checkQuantity = parseInt(value.checkQuantity);
					// 剩余检票次数
					var restCheckQuantity = parseInt(value.restCheckQuantity);
					var checkStatus;
					var className;
					var ywShow = 'block';
					if(value.payStatus == '1'){
						if(value.categoryName != '年票' && value.ticketName != '团体年票'){
							if(new Date(value.visitDate.replace(/-/, '/').replace(/-/, '/') + ' 23:59:59').getTime() >= new Date().getTime()){
								if(checkQuantity == restCheckQuantity){
									checkStatus = '未核销';
								}else if(restCheckQuantity > 0){
									checkStatus = '部分核销';
								}else{
									checkStatus = '已核销';
								}
								className = 'black';
							}else{
								checkStatus = '已过期';
								className = 'red';
							}
						}else{
							if(checkQuantity == restCheckQuantity){
								checkStatus = '未核销';
							}else if(restCheckQuantity > 0){
								checkStatus = '部分核销';
							}else{
								checkStatus = '已核销';
							}
							className = 'black';
							ywShow = 'none';
						}
					}else{
						checkStatus = '退票成功';
						className = 'red';
					}
					
					var categoryName = value.categoryName;
					
					if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && value.ticketName.indexOf('全价+') != -1){
						categoryName = '多人票';
					}
					
					var orderItem = '<div class="orderItem" onclick="orderClick(/'+ value.ticketOrderId +'/)">' +
							'<div class="ticketName">' +
								'<p class="name">'+ value.ticketName + '<font>'+ categoryName +'</font></p>' +
								'<p class="status '+className+'">'+ checkStatus +'</p>' +
							'</div>' +
							'<div class="timeView">' +
								'<p class="time">订单编号：'+ value.orderNum +'</p>' +
							'</div>' +
							'<div class="timeView">' +
								'<p class="time">购买张数：'+ value.buyQuantity +'</p>' +
							'</div>' +
							'<div class="timeView" style="display:'+ ywShow +';">' +
								'<p class="time">游玩时间：'+ value.visitDate +'</p>' +
							'</div>' +
							'<div class="timeView">' +
								'<p class="time">支付时间：'+ value.payTime +'</p>' +
								'<p class="price">合计<font>￥'+ value.totalPrice +'</font></p>' +
							'</div>' +
							'<div class="deleteView">' +
								'<a href="javascript:;" onclick="deleteClick(/'+ value.ticketOrderId +'/)">删除订单</a>' +
							'</div>' +
						'</div>';
						
					if(value.categoryName == '年票'){
						orderItem = '<div class="orderItem" onclick="orderClick(/'+ value.ticketOrderId +'/)">' +
								'<div class="ticketName">' +
									'<p class="name">'+ value.ticketName + '<font>'+ value.categoryName +'</font></p>' +
									'<p class="status '+className+'">'+ checkStatus +'</p>' +
								'</div>' +
								'<div class="timeView">' +
									'<p class="time">订单编号：'+ value.orderNum +'</p>' +
								'</div>' +
								'<div class="timeView">' +
									'<p class="time">购买张数：'+ value.buyQuantity +'</p>' +
								'</div>' +
								'<div class="timeView">' +
									'<p class="time">支付时间：'+ value.payTime +'</p>' +
									'<p class="price">合计<font>￥'+ value.totalPrice +'</font></p>' +
								'</div>' +
							'</div>';
					}
					$('.orderList').append(orderItem);
				})
			}
		}else{
			layer.alert(res.message);
			$('.nowData').show();
			$('.orderList').hide();
		}
	})
}

function deleteClick(ticketId){
	window.event? window.event.cancelBubble = true : e.stopPropagation();
	console.log(ticketId);
	layer.alert('确认删除此订单?', {
		btn: ['确定','取消'],
		yes: function(){
			layer.closeAll();
			layer.load('1');
			var ticketOrderId = ticketId.toString().split('/')[1];
			app.getAjax('order/visitor/del', {
				ticketOrderId: ticketOrderId
			}, function(res){
				console.log(res);
				if(res.success){
					layer.closeAll();
					layer.msg('删除成功');
				}
			})
		}
	})
}

function orderClick(ticketId){
	orderList.forEach(function(value, key){
		console.log(ticketId.toString().split('/'));
		if(value.ticketOrderId == ticketId.toString().split('/')[1]){
			console.log(value.headPicUrl);
			headPicUrl = value.headPicUrl;
		}
	})
	app.setCookie('headPicUrl', headPicUrl);
	if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && app.getCookie('headPicUrl')){
		window.location.href = 'fhlDetail.html?ticketId=' + ticketId;
	}else{
		window.location.href = 'orderDetail.html?ticketId=' + ticketId;
	}
}


function homeClick(){
	var fhlNp = app.getCookie('fhlNp');
	var enterpriseCode = app.getCookie('enterpriseCode');
	var ticketGroupNum = app.getCookie('ticketGroupNum');
	if(enterpriseCode == 'TgsEpcFhl'){
		if(fhlNp){
			window.location.replace('index.html?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&fhlNp=' + fhlNp);
		}else{
			window.location.replace('index.html?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum);
		}
	}else{
		window.location.replace('index.html?openid=' + app.getCookie('openid'));
	}
}