$(function(){
	var enterpriseCode = app.getCookie('enterpriseCode');
	var ticketGroupNum = app.getCookie('ticketGroupNum');
	app.wxUserInfo(function(){
		layer.load(2);
		getSaleInfoList(enterpriseCode, ticketGroupNum);
	});
})

// 是否需要滑动
var scroll = false;

// 获取web产品售卖列表
function getSaleInfoList(enterpriseCode, ticketGroupNum){
	app.getAjax('ticketInfo/getSalesList', {
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
						$('.ticketDesc').eq(key).html('<p>优惠票（须持学生证等相关证件购买）</p><a href="javascript:;" onclick="readClick()">具体范围参照公示</a>');
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
						$('.ticketDesc').eq(key).html('<p>政策性免票（须持相关证件购买）</p><a href="javascript:;" onclick="readClick()">具体范围参照公示</a>');
					}else if(categoryName == '活动票'){
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
						$('.ticketDesc').eq(key).html('<p>活动票|需集合入园</p>');
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
function readClick(){
	window.event? window.event.cancelBubble = true : e.stopPropagation();
	var noticeString = '<p>北京凤凰岭景区门票优惠办法：<br>';
	noticeString += '1.6周岁（含6周岁）以下或身高1.2米（含1.2米）以下儿童免票。<br>';
	noticeString += '2.60-65周岁老年人凭老年证门票优惠；65周岁以上凭证免票；持本人北京市养老助残卡免票（国家法定节假日和景区举办大型活动期间无效）。<br>';
	noticeString += '3.全日制本科及以下学生凭学生证门票优惠。<br>';
	noticeString += '4.现役军人、武警官兵、消防救援人员、离休人员、残疾人凭相关证件免票；<p>';
	layer.open({
		content: noticeString,
		btn: ['我已阅读，前往购票'],
		closeBtn: 0,
		title: '优惠政策'
	});
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
