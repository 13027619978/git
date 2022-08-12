let currentDateList = [];
let dateList = [];
let currentDate;
let swId = [];
let xwId = [];
let currentId;
let buyCycleType;
let buyCycleDays;
let effectStartDate;
let effectEndDate;
let salesEndDate;
let layMax;
let timeList = [
	'8:00--8:30',
	'8:30--9:00',
	'9:00--9:30',
	'9:30--10:00',
	'10:00--10:30',
	'10:30--11:00',
	'13:30--14:00',
	'14:00--14:30',
	'14:30--15:00',
	'15:00--15:30',
	'15:30--16:00',
	'16:00--16:30'
]
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
	$('.ticketTimeView').css({
		'display': 'flex'
	});
	
	// 最远购票日期
	var nowYear = new Date().getFullYear();
	var nowMonth = new Date().getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = new Date().getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var salesEndDateTime = new Date(salesEndDate.split('-')[0] + '/' + salesEndDate.split('-')[1] + '/' + salesEndDate.split('-')[2] + ' 00:00:00').getTime();
	var nowTime = new Date(nowYear + '/' + nowMonth + '/' + nowDay + ' 00:00:00');
	// 距离购票结束日期剩余天数
	var restDay = (salesEndDateTime - nowTime) / (60 * 60 * 24 * 1000);
	// 距离有效期开始时间
	var startSaleTime = (new Date(effectStartDate.replace(/-/, '/').replace(/-/, '/') + ' 00:00:00') - nowTime) / (60 * 60 * 24 * 1000);
	if(startSaleTime < 0){
		startSaleTime = 0;
	}
	if(buyCycleType == 1){
		if(restDay >= buyCycleDays){
			layMax = parseInt(buyCycleDays) - 1;
		}else{
			layMax = parseInt(restDay);
		}
	}else{
		layMax = parseInt(restDay);
	}
	// 初始化时间插件
	laydate.render({
		elem: '.timeSelectBtn' ,//指定元素
		min: startSaleTime,
		max: layMax,
		value: new Date(new Date().getTime() + (60 * 60 * 24 * 1000 * startSaleTime)),
		done: function(value, date, endDate){
			getTicketList(value, type);
		}
	})
	getTicketList($('.timeSelectBtn').val(), type);
}

function getTicketList(date, type){
	$('.ticketTimeList').html("");
	let swList = '';
	let xwList = '';
	var enterpriseCode = app.getCookie('enterpriseCode');
	var ticketGroupNum = app.getCookie('ticketGroupNum');
	app.getAjax('orderView/getTicketAppoint', {
		enterpriseCode: enterpriseCode,
		ticketGroupNum: ticketGroupNum,
		today: date,
		isCache: 'N'
	}, function(res){
		timeList.forEach(function(value, key){
			let yyTotal;
			res.forEach(function(item, itemKey){
				if(item.ticketName.indexOf(value) != -1){
					yyTotal = item.total;
				}
			})
			if(key < 6){
				if(yyTotal > 0){
					swList += '<div class="ticketTimeItem disabled" onclick="">场次：'+ value +'<p>已预定</p></div>';
				}else{
					swList += '<div class="ticketTimeItem" onclick="ticketTimeSelect(this, /'+ swId[key] +'/)">场次：'+ value +'<p>未预定</p></div>';
				}
			}else{
				if(yyTotal > 0){
					xwList += '<div class="ticketTimeItem disabled" onclick="">场次：'+ value +'<p>已预定</p></div>';
				}else{
					xwList += '<div class="ticketTimeItem" onclick="ticketTimeSelect(this, /'+ swId[key] +'/)">场次：'+ value +'<p>未预定</p></div>';
				}
			}
		})
		
		if(type == 1){
			$('.ticketTimeList').append(swList);
		}else{
			$('.ticketTimeList').append(xwList);
		}
	})
	
}

function cancelClick(){
	$('.ticketTimeView').hide();
	currentId = '';
}

function sureClick(){
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
				if(key == 0){
					// 可买最远时间限制
					buyCycleType = value.buyRules.buyCycleType;
					buyCycleDays = parseInt(value.buyRules.buyCycleDays);
					effectStartDate = value.effectStartDate;
					effectEndDate = value.effectEndDate;
					salesEndDate = value.buyRules.salesEndDate;
				}
				
				if(key < 6){
					swId.push(value.ticketInfoId);
					// swList += '<div class="ticketTimeItem" onclick="ticketTimeSelect(this, /'+ value.ticketInfoId +'/)">'+ value.ticketName +'</div>';
				}else{
					xwId.push(value.ticketInfoId);
					// xwList += '<div class="ticketTimeItem" onclick="ticketTimeSelect(this, /'+ value.ticketInfoId +'/)">'+ value.ticketName +'</div>';
				}
				if(key == 0){
					var nowDate = new Date().getTime();
					var salesStartDate = value.buyRules.salesStartDate;
					salesStartDate = salesStartDate.replace(/-/, '/').replace(/-/, '/');
					salesStartDate = new Date(salesStartDate + ' 00:00:00').getTime();
					var ticketItem = '<div class="ticketItem">' +
					'<div class="itemLeft">' +
					'<p class="ticketName">无名英雄纪念广场团体上午场预约<font class="ticketType">团体票</font></p>' +
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
					$('.ticketDesc').eq(key).html('无名英雄纪念广场团体上午场预约');
				}else if(key == 1){
					var nowDate = new Date().getTime();
					var salesStartDate = value.buyRules.salesStartDate;
					salesStartDate = salesStartDate.replace(/-/, '/').replace(/-/, '/');
					salesStartDate = new Date(salesStartDate + ' 00:00:00').getTime();
					var ticketItem = '<div class="ticketItem">' +
					'<div class="itemLeft">' +
					'<p class="ticketName">无名英雄纪念广场团体下午场预约<font class="ticketType">团体票</font></p>' +
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
					$('.ticketDesc').eq(key).html('无名英雄纪念广场团体下午场预约');
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
	app.setCookie('visitDate', $('.timeSelectBtn').val());
	// 森林公园购票页
	window.location.href = 'xsslgyTicket.html?ticketInfoId=' + ticketInfoId;
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
