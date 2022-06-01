$(function(){
	var enterpriseCode = app.getCookie('enterpriseCode');
	var ticketGroupNum = app.getCookie('ticketGroupNum');
	app.wxUserInfo(function(){
		layer.load(2);
		getSaleInfoList(enterpriseCode, ticketGroupNum);
		
		app.encryptGetAjax('order/encrypt/getDetailListByOpenId', {
			openId: app.getCookie('openid'),
			enterpriseCode: enterpriseCode,
			ticketGroupNum: ticketGroupNum
		}, function(res){
			res.data.forEach(function(value, key){
				var yearTicketList = [];
				if(value.categoryName == '年票'){
					yearTicketList.push(value);
				}
				yearTicketList.forEach(function(ticket, ticketKey){
					// 可检票次数
					var checkQuantity = parseInt(ticket.checkQuantity);
					// 剩余检票次数
					var restCheckQuantity = parseInt(ticket.restCheckQuantity);
					if(ticket.payStatus == '1' && restCheckQuantity > 0){
						$('.qrcode').qrcode({
							text: ticket.checkCode + '?time=' + new Date().getTime(),
							background: '#fff',
							foreground: '#000',
							width: 148,
							height: 148
						});
						$('.qrcodeImg img').attr('src', document.getElementsByClassName('qrcode')[0].getElementsByTagName('canvas')[0].toDataURL("image/png"));
						$('.qyImg img').attr('src', document.getElementsByClassName('qrcode')[0].getElementsByTagName('canvas')[0].toDataURL("image/png"));
						app.getAjax('orderEquity/query', {
							qr: ticket.checkCode,
							equityCode: 1
						}, function(res){
							console.log(res);
							if(res.success){
								if(res.data.useState == '0'){
									$('.hoverView').slideDown();
								}
							}
							return;
						})
					}
				})
			})
		})
	});
})

// 是否需要滑动
var scroll = false;

// 获取web产品售卖列表
function getSaleInfoList(enterpriseCode, ticketGroupNum){
	app.encryptGetAjax('ticketInfo/encrypt/getSalesList', {
		enterpriseCode: enterpriseCode,
		ticketGroupNum: ticketGroupNum,
		ticketSalesChannelsNum: 'WEB'
	}, function(res){
		console.log(res);
		if(res.code == '10000'){
			layer.closeAll();
			if(res.data.popStatus == '0'){
				layer.alert(res.data.popContent);
			}
			var scenicData = res.data;
			$('.scenicName').text(scenicData.groupName);
			$('.scenicDesc .descContent').html(scenicData.mark);
			if(!scenicData.mark){
				$('.scenicDesc').hide();
			}
			var saleInfoList = scenicData.ticketSalesInfoList;
			saleInfoList.forEach(function(value, key){
				var nowDate = new Date().getTime();
				var salesStartDate = value.buyRules.salesStartDate;
				salesStartDate = salesStartDate.replace(/-/, '/').replace(/-/, '/');
				salesStartDate = new Date(salesStartDate + ' 00:00:00').getTime();
				// 凤凰岭
				var categoryName = value.categoryName;
				if(app.getCookie('fhlNp')){
					if(categoryName == '年票'){
						var buyClick = 'ticketClick(/'+ value.ticketInfoId +'/)';
						if(salesStartDate > nowDate){
							buyClick = '';
						}
						var ticketItem = '<a href="javascript:;" class="ticketItem" onclick="'+ buyClick +'">' +
							'<div class="itemLeft">' + 
								'<img src="img/npImg.jpg" >' +
								'<div class="leftTxt">' +
									'<p class="ticketName"><font class="hot">热</font>'+ value.ticketName +'</p>' +
									'<div class="ticketDesc">' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="itemRight">' +
								'<p class="ticketPrice"><font>￥</font>'+ value.settlePrice +'</p>';
						// 判断开始售票时间
						if(salesStartDate <= nowDate){
							ticketItem += '<div class="buyBtn">立即预订</div>';
						}else{
							ticketItem += '<div class="buyBtn disabled">立即预定</div>';
						}		
						ticketItem += '</div></a>';
						$('.ticketList').append(ticketItem);
						$('.ticketDesc').eq(key).html('<p>即买即用，每日限本人使用一次</p><p>年票有效期至2022年12月31日</p><p>购买前请您仔细阅读使用说明</p><p class="icon">如已购买，请在右下角“我的”里面查找您所购买的年票</p>');
					}
				}else{
					if(categoryName == '年票'){
						var buyClick = 'ticketClick(/'+ value.ticketInfoId +'/)';
						if(salesStartDate > nowDate){
							buyClick = '';
						}
						var ticketItem = '<a href="javascript:;" class="ticketItem" onclick="'+ buyClick +'">' +
							'<div class="itemLeft">' + 
								'<img src="img/npImg.jpg" >' +
								'<div class="leftTxt">' +
									'<p class="ticketName"><font class="hot">热</font>'+ value.ticketName +'</p>' +
									'<div class="ticketDesc">' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="itemRight">' +
								'<p class="ticketPrice"><font>￥</font>'+ value.settlePrice +'</p>';
						// 判断开始售票时间
						if(salesStartDate <= nowDate){
							ticketItem += '<div class="buyBtn">立即预订</div>';
						}else{
							ticketItem += '<div class="buyBtn disabled">立即预定</div>';
						}		
						ticketItem += '</div></a>';
						$('.ticketList').append(ticketItem);
						$('.ticketDesc').eq(key).html('<p>即买即用，每日限本人使用一次</p><p>年票有效期至2022年12月31日</p><p>购买前请您仔细阅读使用说明</p><p class="icon">如已购买，请在右下角“我的”里面查找您所购买的年票</p>');
					}else if(categoryName == '优惠票'){
						var buyClick = 'ticketClick(/'+ value.ticketInfoId +'/)';
						if(salesStartDate > nowDate){
							buyClick = '';
						}
						var ticketItem = '<a href="javascript:;" class="ticketItem" onclick="'+ buyClick +'">' +
							'<div class="itemLeft">' + 
								'<div class="leftTxt">' +
									'<p class="ticketName ts">'+ value.ticketName +'<span class="tsIcon"></span></p>' +
									'<div class="ticketDesc">' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="itemRight">' +
								'<p class="ticketPrice"><font>￥</font>'+ value.settlePrice +'</p>';
						// 判断开始售票时间
						if(salesStartDate <= nowDate){
							ticketItem += '<div class="buyBtn">立即预订</div>';
						}else{
							ticketItem += '<div class="buyBtn disabled">立即预定</div>';
						}		
						ticketItem += '</div></div>';
						$('.ticketList').append(ticketItem);
						$('.ticketDesc').eq(key).html('<p>优惠票（须持学生证等相关证件购买）</p><a href="javascript:;" onclick="readClick(/'+ value.ticketInfoId +'/)">具体范围参照公示</a>');
						if(value.ticketInfoId == '2c9141f476a897de0176a8d1a5910051' || value.ticketInfoId == '2c9141f476a897de0176a8cf57d6004a'){
							$('.ticketDesc').eq(key).html('<p>1、1米以上儿童须购买全价票。</p><a href="javascript:;" onclick="readClick(/'+ value.ticketInfoId +'/)">具体范围参照公示</a>');
						}
					}else if(categoryName == '政策性免票'){
						var buyClick = 'ticketClick(/'+ value.ticketInfoId +'/)';
						if(salesStartDate > nowDate){
							buyClick = '';
						}
						var ticketItem = '<a href="javascript:;" class="ticketItem" onclick="'+ buyClick +'">' +
							'<div class="itemLeft">' + 
								'<div class="leftTxt">' +
									'<p class="ticketName ts">'+ value.ticketName +'<span class="tsIcon"></span></p>' +
									'<div class="ticketDesc">' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="itemRight">' +
								'<p class="ticketPrice"><font>￥</font>'+ value.settlePrice +'</p>';
						// 判断开始售票时间
						if(salesStartDate <= nowDate){
							ticketItem += '<div class="buyBtn">立即预订</div>';
						}else{
							ticketItem += '<div class="buyBtn disabled">立即预定</div>';
						}		
						ticketItem += '</div></div>';
						$('.ticketList').append(ticketItem);
						$('.ticketDesc').eq(key).html('<p>政策性免票（须持相关证件购买）</p><a href="javascript:;" onclick="readClick(/'+ value.ticketInfoId +'/)">具体范围参照公示</a>');
					}else if(categoryName == '活动票'){
						var ticketName = value.ticketName;
						var buyClick = 'ticketClick(/'+ value.ticketInfoId +'/)';
						if(salesStartDate > nowDate){
							buyClick = '';
						}
						var ticketItem = '<a href="javascript:;" class="ticketItem" onclick="'+ buyClick +'">' +
							'<div class="itemLeft">' + 
								'<div class="leftTxt">' +
									'<p class="ticketName">'+ value.ticketName +'<span class="tsIcon"></span></p>' +
									'<div class="ticketDesc">' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="itemRight">' +
								'<p class="ticketPrice"><font>￥</font>'+ value.settlePrice +'</p>';
						// 判断开始售票时间
						if(salesStartDate <= nowDate){
							ticketItem += '<div class="buyBtn" >立即预订</div>';
						}else{
							ticketItem += '<div class="buyBtn disabled">立即预定</div>';
						}		
						ticketItem += '</div></a>';
						$('.ticketList').append(ticketItem);
						if(ticketName.indexOf('全价+') != -1){
							$('.ticketDesc').eq(key).html('<p>多人票|须持相关证件购买优惠票</p>');
						}else{
							$('.ticketDesc').eq(key).html('<p>活动票|须持相关证件购买优惠票</p>');
						}
					}else{
						var buyClick = 'ticketClick(/'+ value.ticketInfoId +'/)';
						if(salesStartDate > nowDate){
							buyClick = '';
						}
						var ticketItem = '<a href="javascript:;" class="ticketItem" onclick="'+ buyClick +'">' +
							'<div class="itemLeft">' + 
								'<div class="leftTxt">' +
									'<p class="ticketName">'+ value.ticketName +'</p>' +
									'<div class="ticketDesc">' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="itemRight">' +
								'<p class="ticketPrice"><font>￥</font>'+ value.settlePrice +'</p>';
						// 判断开始售票时间
						if(salesStartDate <= nowDate){
							ticketItem += '<div class="buyBtn">立即预订</div>';
						}else{
							ticketItem += '<div class="buyBtn disabled">立即预定</div>';
						}		
						ticketItem += '</div></a>';
						$('.ticketList').append(ticketItem);
						$('.ticketDesc').eq(key).html('<p>成人票</p>');
						if(value.ticketInfoId == '2c9141f476a897de0176a8d1a5910051' || value.ticketInfoId == '2c9141f476a897de0176a8cf57d6004a'){
							$('.ticketDesc').eq(key).html('<p>1、1米以上儿童须购买全价票。</p><a href="javascript:;" onclick="readClick(/'+ value.ticketInfoId +'/)">具体范围参照公示</a>');
						}
					}
				}
			})

			if($('.container').height() + 61 > window.screen.height){
				scroll = true;
				$('.moreView').css({
					'display': 'flex'
				})
			}
		}else if(res.code == '40002'){
			layer.closeAll();
			var scenicData = res.data;
			$('.scenicDesc').removeClass('maxHeight').css({'padding-bottom': 0});
			$('.scenicName').text(scenicData.groupName);
			$('.scenicDesc').text(scenicData.tipContent);
			var saleInfoList = scenicData.ticketSalesInfoList;
			saleInfoList.forEach(function(value, key){
				var nowDate = new Date().getTime();
				var effectStartDate = value.effectStartDate;
				effectStartDate = effectStartDate.replace(/-/, '/').replace(/-/, '/');
				effectStartDate = new Date(effectStartDate + ' 00:00:00').getTime();
				var ticketItem = '<div class="ticketItem">' +
				'<div class="itemLeft">' +
				'<p class="ticketName">'+ value.ticketName +'<font class="ticketType">'+ value.categoryName +'</font></p>' +
				'<p class="ticketDesc">'+ value.description +'</p>' +
				'<p class="checkTime">检票时间：'+ value.checkRules.checkStartTime +'-'+ value.checkRules.checkEndTime +'</p>' +
				'<p class="effectTime">售票日期：'+ value.effectStartDate +'至'+ value.effectEndDate +'</p>' +
				'</div>' +
				'<div class="itemRight">' +
				'<p class="ticketPrice">'+ value.settlePrice +'元</p>';
				// 判断开始售票时间
				ticketItem += '<a class="buyBtn disabled" href="javascript:;">立即预定</a>';
				ticketItem += '</div></div>';
				$('.ticketList').append(ticketItem);
				$('.noticeText').html('<font class="ticketStatus">闭园</font>' + res.message);
				
			})
		}else{
			layer.closeAll();
			layer.msg(res.msg);
		}
	})
}

// 优惠票参照公式
function readClick(bindTicketId){
	window.event? window.event.cancelBubble = true : e.stopPropagation();
	if(bindTicketId == '/2c9141f476a897de0176a8d1a5910051/' || bindTicketId == '/2c9141f476a897de0176a8cf57d6004a/'){
		var noticeString = '<p>1、1米以上儿童须购买全价票。<br>';
		noticeString += '2、购买此门票方可进入冰雪乐园。<br>';
		noticeString += '3、出冰雪乐园后再进园须重新购票。<br>';
		noticeString += '4、入园时间：9：00-16：30。<br>';
		noticeString += '5、请科学佩戴口罩，不扎堆不聚集，保持安全距离。<br>';
		noticeString += '6、老人、孕妇或高血压、心脏病等不宜参加冰雪运动者，谢绝入内。<br>';
		noticeString += '7、请遵守园内安全提示，听从工作人员指挥。<br>';
		noticeString += '8、场地内为冰雪地面，请注意防滑。<p>';
		layer.open({
			content: noticeString,
			btn: ['我已阅读，前往购票'],
			closeBtn: 0,
			title: '购票须知'
		});
	}else{
		var noticeString = '<p>北京凤凰岭景区门票优惠办法：<br>';
		noticeString += '1.6周岁（含6周岁）以下或身高1.2米（含1.2米）以下儿童免票。<br>';
		noticeString += '2.60-65周岁老年人凭老年证门票优惠；65周岁以上凭证免票；持本人北京市养老助残卡免票（节假日和景区举办大型活动期间无效）。<br>';
		noticeString += '3.全日制本科及以下学生凭学生证门票优惠。<br>';
		noticeString += '4.现役军人、武警官兵、消防救援人员、离休人员、残疾人凭相关证件免票；<p>';
		layer.open({
			content: noticeString,
			btn: ['我已阅读，前往购票'],
			closeBtn: 0,
			title: '优惠政策'
		});
	}
	
}

// 屏幕滑动
$(window).scroll(function(){
	if(scroll){
		$('.moreView').css({
			'display': 'none'
		})
	}
})

// 点击购票
function ticketClick(ticketInfoId){
	var enterpriseCode = app.getCookie('enterpriseCode');
	if(enterpriseCode == 'TgsEpcSch'){
		// 什刹海购票页
		window.location.href = 'schTicket.html?ticketInfoId=' + ticketInfoId;
	}else{
		window.location.href = 'ticket.html?ticketInfoId=' + ticketInfoId;
	}
}

// 展开全部
function showAll(that){
	$('.scenicDesc').toggleClass('maxHeight');
	if($('.scenicDesc').hasClass('maxHeight')){
		$(that).text('展开全部');
	}else{
		$(that).text('收起全部');
	}
	
}

// 权益弹窗关闭
function closeClick(){
	$('.hoverView').hide();
}

// 展开全部票种介绍
function showAllDesc(that){
	$(that).parent().find('.ticketDesc').toggleClass('maxHeight');
	$(that).toggleClass('close');
	if($(that).parent().find('.ticketDesc').hasClass('maxHeight')){
		$(that).html('<p>展开全部</p>');
	}else{
		$(that).html('<p>收起全部</p>');
	}
	
}
