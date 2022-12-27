// 游客信息
var visitorInfo;
// 性别限制
var sexType;
// 年龄限制
var ageRequired;
// 最小年龄
var ageMin;
// 最大年龄
var ageMax;
// 地区限制
var regionRequired;
// 限制地区参照
var regionValue;
// 可够最远周期
var buyCycleType;
// 可够最近天数
var buyCycleDays;
// 有效开始日期
var effectStartDate;
// 有效结束日期
var effectEndDate;
// 购买张数限制
var buyNumberType;
// 购买张数
var buyNumber;
// 票价
var settlePrice;
// 产品ID
var ticketInfoId;
// 身份证限制
var idCardRequired;
// 头像路径
var headPicUrl;
// 票种
var ticketType;
// 是否限制最大购票
var idCardNumberType;
// 最大购票数
var idCardNumber;
// 门票名称
var ticketBuyName;
// 当日购票开始时间
var orderStartTime;
// 当日购票结束时间
var orderEndTime;

$(function(){
	// 初始化购票张数
	$('.numberInput').val(1);
	app.clearCookie('ybyNp60');
	app.clearCookie('ybyNp120');
	layer.load(2);
	var enterpriseCode = app.getCookie('enterpriseCode');
	var ticketGroupNum = app.getCookie('ticketGroupNum');
	ticketInfoId = app.getQueryString('ticketInfoId').split('/')[1];
	getSaleInfo(enterpriseCode, ticketGroupNum, ticketInfoId);
	$('.timeInput').val(app.getCookie('visitDate'));
})

// 证件类型切换
function certTypeChange(that){
	console.log($(that).val())
	var certType = $(that).val();
	if(certType == '0'){
		$('.idCardTxt').text('身份证：');
		$('.idCard').attr('placeholder', '请输入身份证');
	}else{
		$('.idCardTxt').text('护照：');
		$('.idCard').attr('placeholder', '请输入护照');
	}
}

// 获取web产品售卖详情
function getSaleInfo(enterpriseCode, ticketGroupNum, ticketInfoId){
	app.encryptGetAjax('ticketInfo/encrypt/getSalesList', {
		enterpriseCode: enterpriseCode,
		ticketGroupNum: ticketGroupNum,
		ticketSalesChannelsNum: 'WEB'
	}, function(res){
		if(res.code == '10000'){
			layer.closeAll();
			var scenicData = res.data;
			$('.scenicName').text(scenicData.groupName);
			$('.scenicDesc').text(scenicData.mark);
			var saleInfoList = scenicData.ticketSalesInfoList;
			var saleInfo;
			saleInfoList.forEach(function(value, key){
				if(value.ticketInfoId == ticketInfoId){
					console.log(value);
					ticketBuyName = value.ticketName;
					orderStartTime = value.buyRules.orderStartTime;
					orderEndTime = value.buyRules.orderEndTime;
					$('.ticketNameTxt').html(value.ticketName);
					$('.ticketDesc').html(value.description);
					$('.checkTime').text('检票时间：'+value.checkRules.checkStartTime+'-'+value.checkRules.checkEndTime);
					$('.ticketPrice').text(value.ticketName.split('（')[1].split('）')[0]).split(')')[0];
					$('.priceText').text(value.settlePrice + '元');
					if(parseFloat(value.settlePrice) == 0){
						$('.payBtn').text('在线预约');
					}
					ticketType = value.categoryName;
					// 判断身份证必填
					visitorInfo = '<div class="visitorItem">' +
						'<div class="itemInfo">' +
							'<p>单位名称：</p>' +
							'<input class="dwName" type="text" placeholder="请输入单位名称">' +
						'</div>' +
						'<div class="itemInfo">' +
							'<p>联系人姓名：</p>' +
							'<input class="name" type="text" placeholder="请输入联系人姓名">' +
						'</div>' +
						'<div class="itemInfo">' +
							'<p>联系人手机号：</p>' +
							'<input class="phone" type="number" placeholder="请输入联系人手机号">' +
						'</div>'+
						'<div class="itemInfo">' +
							'<p>预计人数：</p>' +
							'<input class="peopleNumber" type="number" placeholder="请输入预计人数">' +
						'</div>' +
						'<div class="itemInfo fjItem">' +
							'<p>附加服务：</p>' +
							'<div class="fjList">' +
								'<div class="fjbox" onclick="fjClick(this)">门票10元/人</div>' +
								'<div class="fjbox" onclick="fjClick(this)">鲜花10元/枝</div>' +
								'<div class="fjbox" onclick="fjClick(this)">花篮600元/个</div>' +
								'<div class="fjbox" onclick="fjClick(this)">讲解500元/次</div>' +
								'<div style="width: 100%;" class="fjbox" onclick="fjClick(this)">书籍:寻找父亲38元/本</div>' +
								'<div style="width: 100%;" class="fjbox" onclick="fjClick(this)">书籍:吴石传45元/本</div>' +
							'</div>' +
						'</div>' +
					'</div>';
					
					// 票价
					settlePrice = value.settlePrice;
					
					// 身份证限制
					idCardRequired = value.buyRules.idCardRequired;
					
					// 购买张数限制
					buyNumberType = value.buyRules.buyNumberType;
					buyNumber = value.buyRules.buyNumber;
					if(buyNumberType == '1'){
						$('.numberInput').val(buyNumber);
						for(var i = 0; i < buyNumber; i++){
							addVisitor(visitorInfo);
						}
						$('.subBtn').hide();
						$('.priceText').text(settlePrice * buyNumber + '元');
					}else{
						if(ticketInfoId != '2c9141f478ea5c3a01791b5b0ac022a6'){
							addVisitor(visitorInfo);
						}
						$('.priceText').text(settlePrice + '元');
					}
					
					// 最大购票数
					idCardNumberType = value.buyRules.idCardNumberType;
					idCardNumber = value.buyRules.idCardNumber;
					if(idCardNumberType == '1'){
						var noticeIndex = $('.noticeText p').length + 1;
						$('.noticeText').append('<p>'+noticeIndex+'.单次最多购买'+idCardNumber+'张门票</p>');
						if($('.numberInput').val() == idCardNumber){
							$('.addBtn').hide();
						}
					}
					
					if(enterpriseCode == 'TgsEpcYby'){
						$('.noticeText').append('<p>2.请按预约时间段入园游览</p>');	
					}
					
					// 最大购票数是否为1
					if(idCardNumberType == '1'){
						if(idCardNumber == '1'){
							$('.subBtn').hide();
							$('.addBtn').hide();
						}
					}
					
					// 年龄限制
					ageRequired = value.buyRules.ageRequired;
					ageMax = value.buyRules.ageMax;
					ageMin = value.buyRules.ageMin;
					if(ageRequired == '1'){
						var noticeIndex = $('.noticeText p').length + 1;
						$('.noticeText').append('<p>'+noticeIndex+'.购票年龄限制：'+ageMin+'至'+ageMax+'周岁</p>');
					}
					
					// 购买地区限制
					regionRequired = value.buyRules.regionRequired;
					regionValue = value.buyRules.regionValue;
					var regionString = '';
					if(regionRequired == '1'){
						var noticeIndex = $('.noticeText p').length + 1;
						var regionValueList = regionValue.split(',');
						regionValueList.forEach(function(value, key){
							regionList.forEach(function(region, regionKey){
								if(value == region.key){
									regionString += region.value + '、';
								}
							})
						})
						regionString = regionString.substr(0, regionString.length - 1);
						$('.noticeText').append('<p>'+noticeIndex+'.暂不支持'+ regionString +'地区购票</p>');
					}
					
					// 性别限制
					sexType = value.buyRules.sexType;
					if(sexType == '1' || sexType == '2'){
						var noticeIndex = $('.noticeText p').length + 1;
						if(sexType == '1'){
							$('.noticeText').append('<p>'+noticeIndex+'.仅限男性购票</p>');
						}else{
							$('.noticeText').append('<p>'+noticeIndex+'.仅限女性购票</p>');
						}
					}
				}
			})
		}else{
			layer.msg(res.msg);
		}
	})
}
var fjNameList = "";

// 附加服务点击事件
function fjClick(that){
	fjNameList = "";
	if($(that).hasClass('active')){
		$(that).removeClass('active');
	}else{
		$(that).addClass('active');
	}
	for(let i = 0; i < $('.fjbox').length; i++){
		if(fjNameList){
			if($('.fjbox').eq(i).hasClass('active')){
				fjNameList += ',' + $('.fjbox').eq(i).text();
			}
		}else{
			if($('.fjbox').eq(i).hasClass('active')){
				fjNameList += $('.fjbox').eq(i).text();
			}
		}
	}
}

// 增加点击事件
function addClick(that){
	var ticketNumber = parseInt($('.numberInput').val());
	ticketNumber += 1;
	$('.subBtn').show();
	if(idCardNumberType == '1'){
		if(ticketNumber == idCardNumber){
			$(that).hide();
		}
	}else{
		if(ticketNumber == 99){
			$(that).hide();
		}
	}
	var totalPrice = (settlePrice * 100) * (ticketNumber * 100) / 10000;
	$('.numberInput').val(ticketNumber);
	$('.priceText').text(totalPrice + '元');
	addVisitor();
}

// 减少点击事件
function subClick(that){
	var ticketNumber = parseInt($('.numberInput').val());
	ticketNumber -= 1;
	$('.addBtn').show();
	if(buyNumberType == '1'){
		if(ticketNumber == buyNumber){
			$(that).hide();
		}
	}else{
		if(ticketNumber == 0){
			$(that).hide();
		}
	}
	var totalPrice = (settlePrice * 100) * (ticketNumber * 100) / 10000;
	$('.numberInput').val(ticketNumber);
	$('.priceText').text(totalPrice + '元');
	$('.visitorItem').eq(-1).remove();
}

// 增加游客信息
function addVisitor(){
	$('.visitorList').append(visitorInfo);
}


function base64ToFile(dataurl){
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	while(n--){
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], 'a.png', {type:mime});
}

// 在线支付
function payClick(payType){
	if(app.getCookie('enterpriseCode') != 'TgsEpcFhl'){
		// 疫情防控
		var lxs =$('input[name="lxs"]:checked').val();
		var jcs =$('input[name="jcs"]:checked').val();
		
		if(lxs && jcs){
			if(lxs == '0' || jcs == '0'){
				layer.alert('建议您向社区报到并进行相关隔离防护, 谢谢您的配合');
				return;
			}
		}else{
			layer.alert('请确认您是否存在中高风险地区旅行史和新冠检测阳性人员接触史');
			return;
		}
	}
	
	// 禁用支付按钮
	$('.payBtn').attr('onclick', '');
	
	// 购票张数
	var ticketNumber = parseInt($('.numberInput').val());
	if(ticketNumber == 0){
		layer.alert('请先选择购票张数');
		// 启用支付按钮
		if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
			$('.payBtn').attr('onclick', 'checkSm()');
		}else{
			$('.payBtn').attr('onclick', 'payClick(0)');
		}
		return;
	}
	
	// 信息验证
	for(var i = 0; i < ticketNumber; i++){
		var idCard = $('.idCard').eq(i).val();
		var name = $('.name').eq(i).val();
		var phone = $('.phone').eq(i).val();
		var dwName = $('.dwName').eq(i).val();
		var peopleNumber = $('.peopleNumber').eq(i).val();

		if(!name || !phone || !dwName || !peopleNumber){
			layer.alert('请先完善游客信息');
			return;
		}else{
			if(phone.length != 11){
				layer.alert('请输入正确的手机号');
				// 启用支付按钮
				if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
					$('.payBtn').attr('onclick', 'checkSm()');
				}else{
					$('.payBtn').attr('onclick', 'payClick(0)');
				}
				return;
			}
		}
	}
	
	// 年龄限制
	if(ageRequired == '1'){
		for(var i = 0; i < ticketNumber; i++){
			var idCard = $('.idCard').eq(i).val();
			var year = parseInt(idCard.substr(6, 4));
			var nowYear = new Date().getFullYear();
			var age = nowYear - year;
			if(parseInt(ageMin) > age || age > parseInt(ageMax)){
				layer.alert('此门票仅限'+ ageMin +'至'+ ageMax +'周岁购买');
				// 启用支付按钮
				if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
					$('.payBtn').attr('onclick', 'checkSm()');
				}else{
					$('.payBtn').attr('onclick', 'payClick(0)');
				}
				return;
			}
		}
	}
	
	// 地区限制
	if(regionRequired == '1'){
		for(var i = 0; i < ticketNumber; i++){
			var idCard = $('.idCard').eq(i).val();
			var region = idCard.substr(0, 2);
			var regionValueList = regionValue.split(',');
			for(var j = 0; j < regionValueList.length; j++){
				if(regionValueList[j] == region){
					regionList.forEach(function(value, key){
						if(region == value.key){
							layer.alert('暂不支持' + value.value + '地区购票');
						}
					})
					// 启用支付按钮
					if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
						$('.payBtn').attr('onclick', 'checkSm()');
					}else{
						$('.payBtn').attr('onclick', 'payClick(0)');
					}
					return;
				}
			}
		}
	}
	
	// 性别限制
	if(sexType == '1' || sexType == '2'){
		for(var i = 0; i < ticketNumber; i++){
			var idCard = $('.idCard').eq(i).val();
			var sex = parseInt(idCard.substr(14, 3));
			if(sexType == '1'){
				if(sex % 2 == 0){
					// 启用支付按钮
					if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
						$('.payBtn').attr('onclick', 'checkSm()');
					}else{
						$('.payBtn').attr('onclick', 'payClick(0)');
					}
					layer.alert('仅限男性购票');
					return;
				}
			}else{
				if(sex % 2 > 0){
					// 启用支付按钮
					if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
						$('.payBtn').attr('onclick', 'checkSm()');
					}else{
						$('.payBtn').attr('onclick', 'payClick(0)');
					}
					layer.alert('仅限女性购票');
					return;
				}
			}
		}
	}
	
	var visitors = [];
	
	for(var i = 0; i < ticketNumber; i++){
		var visitor= {};
		var peopleNumber = $('.peopleNumber').eq(i).val();
		var remark = '预计人数：' + peopleNumber + ',附加服务：' + fjNameList;
		visitor = {
			userName: $('.name').eq(i).val(),
			phone: $('.phone').eq(i).val(),
			companyName: $('.dwName').eq(i).val(),
			remark: remark
		}
		visitors.push(visitor);
	}
	
	var healthCode = 0;
	visitors.forEach(function(value, key){
		// 开启健康宝是删除
		healthCode += 1;
	})
	
	var myInter = setInterval(function(){
		if(healthCode == visitors.length){
			clearInterval(myInter);
			var params;
			params = {
				source: 'WEB',
				payWay: 'WXPAY',
				ticketInfoId: ticketInfoId,
				openId: app.getCookie('openid'),
				totalPrice: parseFloat(settlePrice) * ticketNumber,
				unitPrice: settlePrice,
				visitDate: app.getCookie('visitDate'),
				buyQuantity: ticketNumber,
				visitors: visitors
			}
			console.log(params);
			layer.load(2);
			app.encryptPostAjax('order/encrypt/create', params, function(res){
				console.log(res);
				var orderInfo = res.data;
				if(res.success){
					var name = $('.name').val();
					var phone = $('.phone').val();
					var dwName = $('.dwName').val();
					var peopleNumber = $('.peopleNumber').val();
					var ticketTime = ticketBuyName.split('（')[1].split('）')[0];
					var visitDate = app.getCookie('visitDate') + ' ' + ticketTime;
					$.ajax({
					    url:'http://node.smart-ideas.com.cn:3000/xsslgy/sendMsg',
					    type:"GET",
					    data:{
							name: name,
							phone: phone,
							dwName: dwName,
							peopleNumber: peopleNumber,
							fjName: fjNameList,
							visitDate: visitDate
						},
					    success:function(data){
					    	console.log(data);
					    }
					});
					setTimeout(function(){
						layer.closeAll();
						window.location.href = 'orderDetail.html?ticketId=/' + orderInfo.ticketOrderId + '/';
					}, 500);
					$('.payBtn').attr('onclick', 'payClick(0)');
				}else{
					layer.closeAll();
					// 启用支付按钮
					$('.payBtn').attr('onclick', 'payClick(0)');
					layer.alert(res.message);
				}
			})
		}
	}, 100);
}



