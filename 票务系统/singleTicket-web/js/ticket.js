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

$(function(){
	// 初始化购票张数
	$('.numberInput').val(1);
	layer.load(2);
	var enterpriseCode = app.getCookie('enterpriseCode');
	var ticketGroupNum = app.getCookie('ticketGroupNum');
	ticketInfoId = app.getQueryString('ticketInfoId').split('/')[1];
	getSaleInfo(enterpriseCode, ticketGroupNum, ticketInfoId);
	if(enterpriseCode == 'TgsEpcTydrj'){
		$('.payBtn').text('领票');
		$('.visitorInfo').append('<p class="drjNotice">敬请领票，祝您参观愉快！</p>');
	}
	if(enterpriseCode == 'TgsEpcFhl'){
		$('.fhlNoticeView').show();
		$('.fhlTime').show();
		if(ticketInfoId == '2c9141f47cc6cdc4017cda59fc283bb8'){
			$('.fhlTime').hide();
			$('.subBtn').hide();
			$('.addBtn').hide();
		}
	}
})

// 获取web产品售卖详情
function getSaleInfo(enterpriseCode, ticketGroupNum, ticketInfoId){
	app.getAjax('ticketInfo/getSalesList', {
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
					$('.ticketNameTxt').html(value.ticketName + '<font class="ticketType">'+ value.categoryName +'</font>');
					$('.ticketDesc').html(value.description);
					$('.checkTime').text('检票时间：'+value.checkRules.checkStartTime+'-'+value.checkRules.checkEndTime);
					$('.ticketPrice').text('￥' + value.settlePrice);
					$('.priceText').text(value.settlePrice + '元');
					ticketType = value.categoryName;
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
							'<input class="idCard" type="text" placeholder="请输入身份证" oninput="onInput(this)">' +
						'</div>';
					if(value.categoryName == '年票'){
						visitorInfo += '<div class="itemInfo">' +
							'<p>个人照片：</p>' +
							'<div class="imgView">' +
								'<input class="selectImg" type="file" accept="image/*" onchange="selectImg(this)">' +
								'<p>点击上传个人照片</p>' +
								'<img src="img/user.png" >' +
							'</div>' +
						'</div>';
					}
					visitorInfo += '</div>';
					
					addVisitor(visitorInfo);
				
					$('.noticeText').append('<p>1.有效日期：'+ value.effectStartDate +'至'+ value.effectEndDate +'</p>');
					$('.noticeText').append('<p>2.售卖日期：'+ value.buyRules.salesStartDate +'至'+ value.buyRules.salesEndDate +'</p>');	
					// 票价
					settlePrice = value.settlePrice;
					
					// 身份证限制
					idCardRequired = value.buyRules.idCardRequired;
					
					// 可买最远时间限制
					buyCycleType = value.buyRules.buyCycleType;
					buyCycleDays = parseInt(value.buyRules.buyCycleDays);
					effectStartDate = value.effectStartDate;
					effectEndDate = value.effectEndDate;
					salesEndDate = value.buyRules.salesEndDate;
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
					
					var ticketName = value.ticketName;
					// 初始化时间插件
					laydate.render({
						elem: '.timeSelectBtn' ,//指定元素
						min: startSaleTime,
						max: layMax,
						value: new Date(new Date().getTime() + (60 * 60 * 24 * 1000 * startSaleTime)),
						done: function(value, date, endDate){
							$('.timeInput').val(value);
							if(app.getCookie('enterpriseCode') == 'TgsEpcTydrj'){
								var visitWeek = new Date(value.replace(/-/, '/').replace(/-/, '/')).getDay();
								if(visitWeek == 1){
									layer.alert('每周一闭馆，请选择其他预约时间!');
									$('.timeSelectBtn').text('');
								}
							}
							
							if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketName == '冰雪乐园门票（工作日限量特惠）'){
								var visitWeek = new Date(value.replace(/-/, '/').replace(/-/, '/')).getDay();
								if(visitWeek == 6 || visitWeek == 0){
									if(timeData.weekDay.indexOf(visitWeek) == -1){
										layer.alert('此优惠票仅限在工作日使用, 请您选择其他日期');
										$('.timeSelectBtn').text('');
									}
								}else if(timeData.holiday.indexOf(visitWeek) != -1){
									layer.alert('此优惠票仅限在工作日使用, 请您选择其他日期');
									$('.timeSelectBtn').text('');
								}
							}
						}
					})
					$('.timeInput').val($('.timeSelectBtn').text());
					
					// 购买张数限制
					buyNumberType = value.buyRules.buyNumberType;
					buyNumber = value.buyRules.buyNumber;
					if(buyNumberType == '1'){
						var noticeIndex = $('.noticeText p').length + 1;
						$('.noticeText').append('<p>'+noticeIndex+'.单次最多购买'+buyNumber+'张门票</p>');
						if($('.numberInput').val() == buyNumber){
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

// 增加点击事件
function addClick(that){
	var ticketNumber = parseInt($('.numberInput').val());
	ticketNumber += 1;
	$('.subBtn').show();
	if(buyNumberType == '1'){
		if(ticketNumber == buyNumber){
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
	if(ticketNumber == 0){
		$(that).hide();
	}
	var totalPrice = (settlePrice * 100) * (ticketNumber * 100) / 10000;
	$('.numberInput').val(ticketNumber);
	$('.priceText').text(totalPrice + '元');
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
	// var myForm = document.getElementById("myForm");
	// var fileData = new FormData(myForm);
	// fileData.append('file', document.getElementsByClassName('selectImg')[0].files[0])
	// // layer.alert(fileData.);
	// console.log(document.getElementsByClassName('selectImg')[0].files[0]);
	// layer.alert(document.getElementsByClassName('selectImg')[0].files[0].size);
	// app.filePostAjax('order/uploadHeadImg', fileData, function(res){
	// 	layer.alert(res.message);
	// 	if(res.success){
	// 		headPicUrl = res.data;
	// 		$('.imgView p').text('重新上传');
	// 		$('.imgView img').attr('src', headPicUrl);
	// 	}else{
	// 		layer.alert(res.message);
	// 	}
	// })
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
	if(app.getCookie('enterpriseCode') == 'TgsEpcTydrj'){
		var visitWeek = new Date($('.timeSelectBtn').text().replace(/-/, '/').replace(/-/, '/')).getDay();
		var visitTime = new Date($('.timeSelectBtn').text().replace(/-/, '/').replace(/-/, '/') + '  16:30:00').getTime();
		if(visitWeek == 1){
			layer.alert('每周一闭馆，请选择其他预约时间!');
			return;
		}
		if(new Date().getTime() > visitTime){
			layer.alert('16:30后不支持购买当日票，请预约其他时间！');
			return;
		}
	}
	
	if(app.getCookie('enterpriseCode') == 'TgsEpcFhl'){
		if(!$('.timeSelectBtn').text()){
			layer.alert('此优惠票仅限在工作日使用, 请您选择其他日期');
			return;
		}
	}
	
	// if(app.getCookie('enterpriseCode') == 'TgsEpcYby' && ticketInfoId == '2c9141f47811a9a70178868fe4156dd0'){
	// 	layer.alert('已经约满！');
	// 	return;
	// }
	
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
	
	// 禁用支付按钮
	$('.payBtn').attr('onclick', '');
	
	// 购票张数
	var ticketNumber = parseInt($('.numberInput').val());
	if(ticketNumber == 0){
		layer.alert('请先选择购票张数');
		// 启用支付按钮
		$('.payBtn').attr('onclick', 'payClick()');
		return;
	}
	
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
				$('.payBtn').attr('onclick', 'payClick()');
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
					$('.payBtn').attr('onclick', 'payClick()');
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
					$('.payBtn').attr('onclick', 'payClick()');
					layer.alert('仅限男性购票');
					return;
				}
			}else{
				if(sex % 2 > 0){
					// 启用支付按钮
					$('.payBtn').attr('onclick', 'payClick()');
					layer.alert('仅限女性购票');
					return;
				}
			}
		}
	}
	
	// 年票头像限制
	if(ticketType == '年票'){
		if(!headPicUrl){
			layer.alert('请先上传头像！');
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
				userName: $('.name').eq(i).val(),
				phone: $('.phone').eq(i).val(),
				certType: 0,
				certNumber: $('.idCard').eq(i).val()
			}
		}else{
			if($('.idCard').eq(i).val()){
				visitor = {
					userName: $('.name').eq(i).val(),
					phone: $('.phone').eq(i).val(),
					certType: 0,
					certNumber: $('.idCard').eq(i).val()
				}
			}else{
				visitor = {
					userName: $('.name').eq(i).val(),
					phone: $('.phone').eq(i).val()
				}
			}
		}
		visitors.push(visitor);
	}
	
	var healthCode = 0;
	visitors.forEach(function(value, key){
		if(app.getCookie('enterpriseCode') == 'TgsEpcYby'){
			app.getAjax('health/getCode', {
				certNumber: value.certNumber
			}, function(res){
				if(res.data.indexOf('color') != -1){
					var color = res.data.split('"color":"')[1].split('"')[0];
					if(color != '0' && color != '10' && color != '20' && color != '30'){
						layer.alert('请您核实身份信息并确保北京健康宝绿码');
						// 启用支付按钮
						$('.payBtn').attr('onclick', 'payClick()');
						return;
					}
				}else{
					var codeMsg = res.data.split('"message":"')[1].split('"')[0];
					if(codeMsg != '使用量达到使用限额' && codeMsg != '大数据接口异常' && codeMsg != 'FORBIDDEN LIMIT_TOO_MANY_REQUESTS'){
						layer.alert(codeMsg);
						// 启用支付按钮
						$('.payBtn').attr('onclick', 'payClick()');
						return;
					}else{
						healthCode += 1;
					}
				}
				healthCode += 1;
			})
		}else{
			healthCode += 1;
		}
	})
	
	var myInter = setInterval(function(){
		if(healthCode == visitors.length){
			clearInterval(myInter);
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
			if(headPicUrl){
				params = {
					source: 'WEB',
					payWay: 'WXPAY',
					ticketInfoId: ticketInfoId,
					openId: app.getCookie('openid'),
					totalPrice: parseFloat(settlePrice) * ticketNumber,
					unitPrice: settlePrice,
					visitDate: $('.timeSelectBtn').text(),
					buyQuantity: ticketNumber,
					headPicUrl: headPicUrl,
					visitors: visitors
				}
			}
			console.log(params);
			layer.load(2);
			app.postAjax('order/create', params, function(res){
				console.log(res);
				var orderInfo = res.data;
				if(res.success){
					if(res.data.payStatus == '0'){
						// 需要支付
						var res_o = JSON.parse(res.data.payParams);
						WeixinJSBridge.invoke(
							'getBrandWCPayRequest', {
						       "appId":res_o.appId,     //公众号名称，由商户传入
						       "timeStamp":res_o.timeStamp,  //时间戳，自1970年以来的秒数
						       "nonceStr":res_o.nonceStr, //随机串
						       "package":res_o.package,
						       "signType":res_o.signType,//微信签名方式：
						       "paySign":res_o.paySign //微信签名
							},
							function(res){
								layer.closeAll();
								if(res.err_msg == "get_brand_wcpay_request:ok" ) {
									// 启用支付按钮
									$('.payBtn').attr('onclick', 'payClick()');
									window.location.href = 'orderDetail.html?ticketId=/' + orderInfo.ticketOrderId + '/';
								}else{
									// 启用支付按钮
									$('.payBtn').attr('onclick', 'payClick()');
								}
							}
						);
					}else{
						// 启用支付按钮
						setTimeout(function(){
							layer.closeAll();
							window.location.href = 'orderDetail.html?ticketId=/' + orderInfo.ticketOrderId + '/';
						}, 500);
						$('.payBtn').attr('onclick', 'payClick()');
						
					}
				}else{
					layer.closeAll();
					// 启用支付按钮
					$('.payBtn').attr('onclick', 'payClick()');
					layer.alert(res.message);
				}
			})
		}
	}, 100);
}

function fhlNoticeClick(){
	$('.fhlNoticeView').hide();
}


function onInput(that){
	if(app.getCookie('enterpriseCode') == 'TgsEpcYby'){
		var idCard = $(that).val();
		console.log(idCard);
		if(idCard.length == 18){
			app.getAjax('health/getCode', {
				certNumber: idCard
			}, function(res){
				if(res.data.indexOf('color') != -1){
					var color = res.data.split('"color":"')[1].split('"')[0];
					if(color != '0' && color != '10' && color != '20' && color != '30'){
						layer.alert('请您核实身份信息并确保北京健康宝绿码');
					}
				}else{
					var codeMsg = res.data.split('"message":"')[1].split('"')[0];
					if(codeMsg != '使用量达到使用限额' && codeMsg != '大数据接口异常' && codeMsg != 'FORBIDDEN LIMIT_TOO_MANY_REQUESTS'){
						layer.alert(codeMsg);
					}
				}
				
			})
		}
	}
}
