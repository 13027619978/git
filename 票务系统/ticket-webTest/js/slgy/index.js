let currentDateList = [];
let dateList = [];
let currentDate;
let swList = "";
let xwList = "";
let currentId;
$(function(){
	var enterpriseCode = app.getCookie('enterpriseCode');
	var ticketGroupNum = app.getCookie('ticketGroupNum');
	// 西山森林公园
	let indexUrl = window.location.href;
	if(enterpriseCode == 'TgsEpcXsslgy' && indexUrl.indexOf('xsslgyIndex') == -1){
		window.location.replace('http://boss.smart-ideas.com.cn/ticket-webTest/xsslgyIndex.html?enterpriseCode=TgsEpcXsslgy&ticketGroupNum=TGN20220726105538295')
	}
	app.wxUserInfo(function(){
		layer.load(2);
		getSaleInfoList(enterpriseCode, ticketGroupNum);
	});
})


// 是否需要滑动
var scroll = false;

function isAgreeChange(){
	console.log()
	if($('.isAgree').prop("checked")){
		$('.layui-layer-btn0').removeClass('disabled');
	}else{
		$('.layui-layer-btn0').addClass('disabled');
	}
}

function chooseTime(type){
	if(type == 1){
		$('.ticketTimeList').append(swList);
	}else{
		$('.ticketTimeList').append(xwList);
	}
	$('.ticketTimeView').css({
		'display': 'flex'
	});
}

function cancelClick(){
	$('.ticketTimeList').html("");
	$('.ticketTimeView').hide();
	currentId = '';
}

function sureClick(){
	$('.ticketTimeList').html("");
	if(currentId){
		ticketClick(currentId);
		currentId = '';
		$('.ticketTimeView').hide();
	}else{
		layer.alert('请先选择预约时段');
	}
}

function ticketTimeSelect(that, ticketInfoId){
	currentId = ticketInfoId;
	$(that).addClass('active').siblings().removeClass('active');
}

// 获取web产品售卖列表
function getSaleInfoList(enterpriseCode, ticketGroupNum){
	app.encryptGetAjax('ticketInfo/encrypt/getSalesList', {
		enterpriseCode: enterpriseCode,
		ticketGroupNum: ticketGroupNum,
		ticketSalesChannelsNum: 'WEB'
	}, function(res){
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
				if(key < 6){
					swList += '<div class="ticketTimeItem" onclick="ticketTimeSelect(this, /'+ value.ticketInfoId +'/)">'+ value.ticketName +'</div>';
				}else{
					xwList += '<div class="ticketTimeItem" onclick="ticketTimeSelect(this, /'+ value.ticketInfoId +'/)">'+ value.ticketName +'</div>';
				}
				if(key == 0){
					var nowDate = new Date().getTime();
					var salesStartDate = value.buyRules.salesStartDate;
					salesStartDate = salesStartDate.replace(/-/, '/').replace(/-/, '/');
					salesStartDate = new Date(salesStartDate + ' 00:00:00').getTime();
					var ticketItem = '<div class="ticketItem">' +
					'<div class="itemLeft">' +
					'<p class="ticketName">无名英雄纪念广场团体上午票预约<font class="ticketType">团体票</font></p>' +
					'<div class="ticketDesc"></div>';
					ticketItem += '</div>' +
					'<div class="itemRight">';
					// 判断开始售票时间
					if(salesStartDate <= nowDate){
						ticketItem += '<a class="buyBtn" href="javascript:;" onclick="chooseTime(1)">立即预定</a>';
					}else{
						ticketItem += '<a class="buyBtn disabled" href="javascript:;">立即预定</a>';
					}
					ticketItem += '</div></div>';
					$('.ticketList').append(ticketItem);
					$('.ticketDesc').eq(key).html('无名英雄纪念广场团体上午票预约');
				}else if(key == 1){
					var nowDate = new Date().getTime();
					var salesStartDate = value.buyRules.salesStartDate;
					salesStartDate = salesStartDate.replace(/-/, '/').replace(/-/, '/');
					salesStartDate = new Date(salesStartDate + ' 00:00:00').getTime();
					var ticketItem = '<div class="ticketItem">' +
					'<div class="itemLeft">' +
					'<p class="ticketName">无名英雄纪念广场团体下午票预约<font class="ticketType">团体票</font></p>' +
					'<div class="ticketDesc"></div>';
					ticketItem += '</div>' +
					'<div class="itemRight">';
					// 判断开始售票时间
					if(salesStartDate <= nowDate){
						ticketItem += '<a class="buyBtn" href="javascript:;" onclick="chooseTime(2)">立即预定</a>';
					}else{
						ticketItem += '<a class="buyBtn disabled" href="javascript:;">立即预定</a>';
					}
					ticketItem += '</div></div>';
					$('.ticketList').append(ticketItem);
					$('.ticketDesc').eq(key).html('无名英雄纪念广场团体下午票预约');
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
			$('.noticeText').html('<font class="ticketStatus">闭园</font>' + res.message);
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
			})
		}else{
			layer.closeAll();
			layer.msg(res.msg);
		}
	})
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
	}else if(enterpriseCode == 'TgsEpcXsslgy'){
		// 森林公园购票页
		window.location.href = 'xsslgyTicket.html?ticketInfoId=' + ticketInfoId;
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
