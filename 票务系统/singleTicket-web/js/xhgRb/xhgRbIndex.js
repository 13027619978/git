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

$(function(){
	// 初始化购票张数
	$('.numberInput').val(2);
	$('.subBtn').hide();
	$('.addBtn').hide();
	layer.load(2);
	var enterpriseCode = app.getCookie('enterpriseCode');
	var ticketGroupNum = app.getCookie('ticketGroupNum');
	ticketInfoId = app.getCookie('ticketId');
	app.wxUserInfo(function(){
		layer.load(2);
		getSaleInfo(enterpriseCode, ticketGroupNum, ticketInfoId);
	});
})

// 获取web产品售卖详情
function getSaleInfo(enterpriseCode, ticketGroupNum, ticketInfoId){
	app.getAjax('ticketInfo/get', {
		ticketInfoId: ticketInfoId
	}, function(res){
		if(res.code == '10000'){
			layer.closeAll();
			
			var ticketInfo = res.data.ticketInfo;
			var ticketInfoBuyRules = res.data.ticketInfoBuyRules;
			var ticketInfoCheckRules = res.data.ticketInfoCheckRules;
			$('.ticketNameTxt').html(ticketInfo.ticketName);
			$('.ticketDesc').html(ticketInfo.description);
			$('.checkTime').text('检票时间：'+ticketInfoBuyRules.checkStartTime+'-'+ticketInfoBuyRules.checkEndTime);
			$('.ticketPrice').text('￥' + ticketInfo.settlePrice);
			if(ticketInfo.settlePrice == '0'){
				$('.payBtn').text('在线领取');
			}
			
			// 判断是否单独售票
			var single = ticketInfo.singleSale;
			// 判断是否禁用
			var status = ticketInfo.status;
			if(single == '1' || status == '1'){
				$('.payBtn').text('暂不售票').attr('onclick', '').addClass('disabled');
			}else{
				// 是否在售卖时间内
				if(new Date().getTime() < new Date(ticketInfoBuyRules.salesStartDate.replace(/-/,"/").replace(/-/,"/") + ' 00:00:00').getTime() || new Date().getTime() > new Date(ticketInfoBuyRules.salesEndDate.replace(/-/,"/").replace(/-/,"/") + ' 23:59:59').getTime()){
					$('.payBtn').text('暂不售票').attr('onclick', '').addClass('disabled');
				}
			}
			
			// 判断身份证必填
			visitorInfo = '<div class="visitorItem">' +
				'<div class="itemInfo">' +
					'<p>姓名：</p>' +
					'<input class="name" type="text" placeholder="请输入姓名">' +
				'</div>' +
				'<div class="itemInfo">' +
					'<p>手机号：</p>' +
					'<input class="phone" type="text" placeholder="请输入手机号">' +
				'</div>' +
				'<div class="itemInfo">' +
					'<p>身份证：</p>' +
					'<input class="idCard" type="text" placeholder="请输入身份证">' +
				'</div>';
			
			visitorInfo += '</div>';
							
			$('.noticeText').append('<p>1.有效日期：'+ ticketInfo.effectStartDate +'至'+ ticketInfo.effectEndDate +'</p>');
			$('.noticeText').append('<p>2.售卖日期：'+ ticketInfoBuyRules.salesStartDate +'至'+ ticketInfoBuyRules.salesEndDate +'</p>');
			
			// 票价
			settlePrice = ticketInfo.settlePrice;
			
			// 身份证限制
			idCardRequired = ticketInfoBuyRules.idCardRequired;
			
			// 可买最远时间限制
			buyCycleType = ticketInfoBuyRules.buyCycleType;
			buyCycleDays = parseInt(ticketInfoBuyRules.buyCycleDays);
			effectStartDate = ticketInfo.effectStartDate;
			effectEndDate = ticketInfo.effectEndDate;
			salesEndDate = ticketInfoBuyRules.salesEndDate;
			// 最远购票日期
			var layMax;
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
			console.log(startSaleTime);
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
				showBottom: false,
				value: new Date(new Date().getTime() + (60 * 60 * 24 * 1000 * startSaleTime)),
				done: function(value, date, endDate){
					$('.timeInput').val(value);
				}
			})
			$('.timeInput').val($('.timeSelectBtn').text());
			
			// 年龄限制
			ageRequired = ticketInfoBuyRules.ageRequired;
			ageMax = ticketInfoBuyRules.ageMax;
			ageMin = ticketInfoBuyRules.ageMin;
			if(ageRequired == '1'){
				var noticeIndex = $('.noticeText p').length + 1;
				$('.noticeText').append('<p>'+noticeIndex+'.购票年龄限制：'+ageMin+'至'+ageMax+'周岁</p>');
			}
			
			// 购买地区限制
			regionRequired = ticketInfoBuyRules.regionRequired;
			regionValue = ticketInfoBuyRules.regionValue;
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
			sexType = ticketInfoBuyRules.sexType;
			if(sexType == '1' || sexType == '2'){
				var noticeIndex = $('.noticeText p').length + 1;
				if(sexType == '1'){
					$('.noticeText').append('<p>'+noticeIndex+'.仅限男性购票</p>');
				}else{
					$('.noticeText').append('<p>'+noticeIndex+'.仅限女性购票</p>');
				}
			}
		}else{
			layer.msg(res.msg);
		}
	})
}

// 增加点击事件
function addClick(that){
	var ticketNumber = parseInt($('.numberInput').val());
	ticketNumber += 1;
	console.log(idCardNumber);
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
	$('.numberInput').val(ticketNumber);
	$('.priceText').text(settlePrice * ticketNumber + '元');
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
	$('.numberInput').val(ticketNumber);
	$('.priceText').text(settlePrice * ticketNumber + '元');
	$('.visitorItem').eq(-1).remove();
}

// 增加游客信息
function addVisitor(){
	$('.visitorList').append(visitorInfo)
}

// 选择头像
function selectImg(that){
	var imgSrc = window.URL.createObjectURL(document.getElementsByClassName('selectImg')[0].files[0]);
	$('.face-upload-img').attr('src', imgSrc);
	$('.face-upload-img').cropper({
	  aspectRatio: 1 / 1
	});
	$('.face-modal').hide();
	$('.face-upload-modal').css({
		'display': 'flex'
	});
}

// 个人照片预览
function previewSure(){
	$('.face-preview-modal').hide();
}

// 提交个人照片
function imgSubmit(){
	var i = 0;
	if(i == 0){
		layer.load('1');
		i += 1;
	}
	
	var myInter = setInterval(function(){
		if(i == 1){
			var result= $('.face-upload-img').cropper("getCroppedCanvas", {"width": 300, "height": 300});
			$('.container').append(result);
			var imgBase = document.getElementsByTagName('canvas')[0].toDataURL("image/png");
			var myForm = document.getElementById("myForm");
			var fileData = new FormData(myForm);
			fileData.append('file', base64ToFile(imgBase), base64ToFile(imgBase).name);
			console.log(fileData.get('file'));
			$(result).remove();
			$('.face-modal-input').val('');
			$('.face-upload-img').cropper('destroy');
			$('.face-upload-modal').hide(function(){
				app.filePostAjax('order/uploadHeadImg', fileData, function(res){
					if(res.success){
						headPicUrl = res.data;
						$('.imgView p').text('重新上传');
						$('.imgView img').attr('src', headPicUrl);
						$('.face-preview-img').attr('src', headPicUrl);
						$('.face-preview-modal').css({
							"display": "flex"
						});
						layer.closeAll();
					}else{
						layer.closeAll();
						layer.msg(res.message);
					}
				})
			});
			clearInterval(myInter);
		}
	}, 500)
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
function payClick(){
	var token = sessionStorage.getItem('token');
	if(!token){
		layer.alert('无效链接');
		return;
	}
	// 疫情防控
	// var lxs =$('input[name="lxs"]:checked').val();
	// var jcs =$('input[name="jcs"]:checked').val();
	
	// if(lxs && jcs){
	// 	if(lxs == '0' || jcs == '0'){
	// 		layer.alert('建议您向社区报到并进行相关隔离防护, 谢谢您的配合');
	// 		return;
	// 	}
	// }else{
	// 	layer.alert('请确认您是否存在中高风险地区旅行史和新冠检测阳性人员接触史');
	// 	return;
	// }
	
	// 禁用支付按钮
	$('.payBtn').attr('onclick', '');
	
	// 购票张数
	var ticketNumber = parseInt($('.numberInput').val());
	// 信息验证
	for(var i = 0; i < ticketNumber; i++){
		var idCard = $('.idCard').eq(i).val();
		var name = $('.name').eq(i).val();
		var phone = $('.phone').eq(i).val();
		
		if(idCardRequired == '1'){
			if(!idCard || !name || !phone){
				layer.alert('请先完善游客信息');
				// 启用支付按钮
				$('.payBtn').attr('onclick', 'payClick()');
				return;
			}else{
				if(phone.length != 11){
					layer.alert('请输入正确的手机号');
					// 启用支付按钮
					$('.payBtn').attr('onclick', 'payClick()');
					return;
				}
				
				if(idCard.length != 18){
					layer.alert('请输入正确的身份证号');
					// 启用支付按钮
					$('.payBtn').attr('onclick', 'payClick()');
					return;
				}
				
				
			}
		}else{
			if(!name || !phone){
				layer.alert('请先完善游客信息');
				// 启用支付按钮
				$('.payBtn').attr('onclick', 'payClick()');
				return;
			}else{
				if(phone.length != 11){
					layer.alert('请输入正确的手机号');
					// 启用支付按钮
					$('.payBtn').attr('onclick', 'payClick()');
					return;
				}
				
			}
		}
	}
	
	// 判断身份证是否重复
	let idcardList = [];
	for(var i = 0; i < ticketNumber; i++){
		var idCard = $('.idCard').eq(i).val();
		 idcardList.push(idCard);
	}
	if(idCardRequired == '1'){
		if(new Set(idcardList).size != idcardList.length){
		  layer.alert('请勿输入重复的身份证号！');
		  // 启用支付按钮
		  $('.payBtn').attr('onclick', 'payClick()');
		  return;
		}
	}
	
	var visitors = [];
	for(var i = 0; i < ticketNumber; i++){
		var visitor= {};
		if(idCardRequired == '1'){
			visitor = {
				userName: $('.name').eq(i).val() + ',' + app.getCookie('promotionnumber'),
				phone: $('.phone').eq(i).val(),
				certType: 0,
				certNumber: $('.idCard').eq(i).val()
			}
		}else{
			if($('.idCard').eq(i).val()){
				visitor = {
					userName: $('.name').eq(i).val() + ',' + app.getCookie('promotionnumber'),
					phone: $('.phone').eq(i).val(),
					certType: 0,
					certNumber: $('.idCard').eq(i).val()
				}
			}else{
				visitor = {
					userName: $('.name').eq(i).val() + ',' + app.getCookie('promotionnumber'),
					phone: $('.phone').eq(i).val()
				}
			}
		}
		visitors.push(visitor);
	}
	
	var healthCode = 0;
	visitors.forEach(function(value, key){
		// 开启健康宝时删除
		healthCode += 1;
	})
	
	var myInter = setInterval(function(){
		if(healthCode == visitors.length){
			clearInterval(myInter);
			app.postAjax('renbao/sync', {
				promotionnumber: app.getCookie('promotionnumber'),
				status: 0
			}, function(res){
				if(res.success){
					if(res.data.responseCode == '1'){
						var params = {
							source: 'WEB',
							payWay: 'WXPAY',
							ticketInfoId: ticketInfoId,
							openId: app.getCookie('openid'),
							totalPrice: parseFloat(settlePrice) * ticketNumber,
							unitPrice: settlePrice,
							visitDate: $('.timeSelectBtn').text(),
							buyQuantity: ticketNumber,
							visitors: visitors
						}
						layer.load(2);
						app.postAjax('order/create', params, function(res){
							console.log(res);
							var orderInfo = res.data;
							if(res.success){
								layer.closeAll();
								// 启用支付按钮
								$('.payBtn').attr('onclick', 'payClick()');
								window.location.href = 'xhgRbOrderDetail.html?ticketId=/' + orderInfo.ticketOrderId + '/';
							}else{
								layer.closeAll();
								// 启用支付按钮
								$('.payBtn').attr('onclick', 'payClick()');
								layer.alert(res.message);
							}
						})
					}else{
						layer.alert(res.data.responseMessage);
						// 启用支付按钮
						$('.payBtn').attr('onclick', 'payClick()');
					}
				}else{
					console.log('123');
					layer.alert(res.message);
					// 启用支付按钮
					$('.payBtn').attr('onclick', 'payClick()');
				}
			})
		}
	}, 100);
	
	
}

