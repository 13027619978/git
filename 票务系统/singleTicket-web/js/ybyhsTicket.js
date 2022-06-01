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
	console.log('123');
	// 初始化购票张数
	$('.numberInput').val(1);
	$('.subBtn').hide();
	$('.addBtn').hide();
	layer.load(2);
	var enterpriseCode = app.getCookie('enterpriseCode');
	var ticketGroupNum = app.getCookie('ticketGroupNum');
	ticketInfoId = app.getCookie('ticketId');
	if(enterpriseCode == 'TgsEpcFhl' && ticketGroupNum == 'TGN20201228152933458'){
		$('.fhlNoticeView').show();
		$('.fhlTime').show();
		$('.payBtn').text('在线预约');
		$('.fhlTitle').text('预约须知');
		$('.numberText').text('预约数量：');
	}
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
			if(enterpriseCode == 'TgsEpcSlfz' && ticketGroupNum == 'TGN20200907203306267'){
				layer.alert('您好，欢迎您光临北京国际鲜花港，请您主动保持1.5米距离，标准佩戴口罩，禁止随地吐痰，遵守北京健康宝扫码登记、测温等相关管控措施，自觉维护游园秩序。入园游客需持7日内核酸检测阴性证明且无往来中高风险地区行程者方可入园，谢谢您的配合，祝您游园愉快！', {
					btn: ['我已知悉, 前往购票'],
					closeBtn: 0,
					title: '特别提醒'
				});
			}
			
			var ticketInfo = res.data.ticketInfo;
			var ticketInfoBuyRules = res.data.ticketInfoBuyRules;
			var ticketInfoCheckRules = res.data.ticketInfoCheckRules;
			$('.ticketNameTxt').html(ticketInfo.ticketName);
			$('.ticketDesc').html(ticketInfo.description);
			$('.checkTime').text('检票时间：'+ticketInfoBuyRules.checkStartTime+'-'+ticketInfoBuyRules.checkEndTime);
			$('.ticketPrice').text('￥' + ticketInfo.settlePrice);
			// 判断是否单独售票
			var single = ticketInfo.singleSale;
			if(single == '0'){
				$('.priceRight').show();
				$('.noSale').hide();
			}else{
				$('.priceRight').hide();
				$('.noSale').show();
			}
			// 判断身份证必填
			visitorInfo = '<div class="visitorItem">' +
				'<div class="itemInfo">' +
					'<p>影楼（工作室）名称：</p>' +
					'<input class="officeName" type="text" placeholder="请输入影楼名称">' +
				'</div>' +
				'<div class="itemInfo">' +
					'<p>预约人姓名：</p>' +
					'<input class="name" type="text" placeholder="请输入姓名">' +
				'</div>' +
				'<div class="itemInfo">' +
					'<p>预约人手机号：</p>' +
					'<input class="phone" type="text" placeholder="请输入手机号">' +
				'</div>' +
				// '<div class="itemInfo">' +
				// 	'<p>预约人身份证：</p>' +
				// 	'<input class="idCard" type="text" placeholder="请输入身份证">' +
				// '</div>' +
				'<div class="itemInfo">' +
					'<p>全员健康码是否正常：</p>' +
					'<div class="radioView">' +
						'<label for="jkm1"><input type="radio" id="jkm1" name="jkm" value="0">是</label>' +
						'<label for="jkm2"><input type="radio" id="jkm2" name="jkm" value="1">否</label>' +
					'</div>' +
				'</div>' + 
				'<div class="itemInfo">' +
					'<p>来园人数：</p>' +
					'<input class="peopleNumber" type="text" placeholder="请输入人数">' +
				'</div>' + 
				// '<div class="itemInfo">' +
				// 	'<p>拍摄日期：</p>' +
				// 	'<input class="psDate" type="text" readonly="readonly">' +
				// '</div>' + 
				'<div class="itemInfo">' +
					'<p>预计到达园博园时间：</p>' +
					'<input class="ddDate" type="text" placeholder="如:9点">' +
				'</div>' + 
				'<div class="itemInfo">' +
					'<p>拍摄展园：</p>' +
					'<div class="rightView">' +
						'<div class="radioView">' +
							'<label for="zq1"><input type="checkbox" id="zq1" name="zq0" value="0" >欧洲园</label>' +
							'<label for="zq2"><input type="checkbox" id="zq2" name="zq1" value="1" >江苏园</label>' +
							'<label for="zq3"><input type="checkbox" id="zq3" name="zq2" value="2" >北京园</label>' +
							'<label for="zq4"><input type="checkbox" id="zq4" name="zq3" value="3" onchange="zqChange(this)">其他</label>' +
						'</div>' +
						'<input class="zqText" type="text" placeholder="请输入拍摄展区">' +
					'</div>' +
				'</div>' + 
			'</div>';
			
			addVisitor(visitorInfo);
							
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
				value: new Date(new Date().getTime() + (60 * 60 * 24 * 1000 * startSaleTime)),
				done: function(value, date, endDate){
					$('.timeInput').val(value);
				}
			})
			
			$('.timeInput').val($('.timeSelectBtn').text());
			
			// 购买张数限制
			buyNumberType = ticketInfoBuyRules.buyNumberType;
			buyNumber = ticketInfoBuyRules.buyNumber;
			if(buyNumberType == '1'){
				var noticeIndex = $('.noticeText p').length + 1;
				$('.noticeText').append('<p>'+noticeIndex+'.单次最多购买'+buyNumber+'张门票</p>');
			}
			
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
	$('.numberInput').val(ticketNumber);
	$('.priceText').text(settlePrice * ticketNumber + '元');
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
	$('.numberInput').val(ticketNumber);
	$('.priceText').text(settlePrice * ticketNumber + '元');
	$('.visitorItem').eq(-1).remove();
}

// 增加游客信息
function addVisitor(){
	$('.visitorList').append(visitorInfo);
	// 初始化时间插件
	// laydate.render({
	// 	elem: '.psDate' ,//指定元素
	// 	value: new Date(),
	// 	done: function(value, date, endDate){
	// 		// $('.timeInput').val(value);
	// 	}
	// })
	
	// 初始化时间插件
	// laydate.render({
	// 	elem: '.ddDate' ,//指定元素
	// 	type: 'time',
	// 	format: 'H点'
	// })
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
	// $('.payBtn').attr('onclick', '');
	
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
		var officeName = $('.officeName').eq(i).val();
		var jkm =$('input[name="jkm"]:checked').val();
		var zq = '';
		var zq0 =$('input[name="zq0"]:checked').val();
		var zq1 =$('input[name="zq1"]:checked').val();
		var zq2 =$('input[name="zq2"]:checked').val();
		var zq3 =$('input[name="zq3"]:checked').val();
		if(zq0 == '0'){
			zq += '欧洲园 ';
		}
		if(zq1 == '1'){
		 	zq += '江苏园 ';
		}
		if(zq2 == '2'){
			zq += '北京园 ';
		}
		if(zq3 == '3'){
			zq += $('.zqText').val();
		}
		var peopleNumber = $('.peopleNumber').val();
		// var psDate = $('.psDate').val();
		var ddDate = $('.ddDate').val();
		if(idCardRequired == '1'){
			if(!idCard || !name || !phone || !officeName || !jkm || !zq || !peopleNumber || !ddDate){
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
				
				if(zq3 == '3'){
					if(!$('.zqText').val()){
						layer.alert('请先完善游客信息');
						// 启用支付按钮
						$('.payBtn').attr('onclick', 'payClick()');
						return;
					};
				}
				
				if(jkm == '1'){
					layer.alert('建议您向社区报到并进行相关隔离防护, 谢谢您的配合');
					// 启用支付按钮
					$('.payBtn').attr('onclick', 'payClick()');
					return;
				}
			}
		}else{
			if(!name || !phone || !officeName || !jkm || !zq || !peopleNumber || !ddDate){
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
				if(zq3 == '3'){
					if(!$('.zqText').val()){
						layer.alert('请先完善游客信息');
						// 启用支付按钮
						$('.payBtn').attr('onclick', 'payClick()');
						return;
					};
				}
				
				if(jkm == '1'){
					layer.alert('建议您向社区报到并进行相关隔离防护, 谢谢您的配合');
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
		var idCard = $('.idCard').eq(i).val();
		var name = $('.name').eq(i).val();
		var phone = $('.phone').eq(i).val();
		var officeName = $('.officeName').eq(i).val();
		var jkm =$('input[name="jkm"]:checked').val();
		jkm = jkm>0?'否':'是';
		
		var userName = name + ',' + officeName + ',' + jkm + ',' + peopleNumber + ',' + ddDate + ',' + zq;
		var peopleNumber = $('.peopleNumber').val();
		var psDate = $('.psDate').val();
		var ddDate = $('.ddDate').val();
		if(idCardRequired == '1'){
			visitor = {
				userName: userName,
				phone: $('.phone').eq(i).val(),
				certType: 0,
				certNumber: $('.idCard').eq(i).val()
			}
		}else{
			if($('.idCard').eq(i).val()){
				visitor = {
					userName: userName,
					phone: $('.phone').eq(i).val(),
					certType: 0,
					certNumber: $('.idCard').eq(i).val()
				}
			}else{
				visitor = {
					userName: userName,
					phone: $('.phone').eq(i).val()
				}
			}
		}
		visitors.push(visitor);
	}
	
	var healthCode = 0;
	visitors.forEach(function(value, key){
		if(app.getCookie('enterpriseCode') == 'TgsEpcYby'){
			if(idCardRequired == '1'){
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
						if(codeMsg != '使用量达到使用限额'){
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
									window.location.href = 'ybyhsOrderDetail.html?ticketId=/' + orderInfo.ticketOrderId + '/';
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
							window.location.href = 'ybyhsOrderDetail.html?ticketId=/' + orderInfo.ticketOrderId + '/';
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
					if(codeMsg != '使用量达到使用限额'){
						layer.alert(codeMsg);
					}
				}
				
			})
		}
	}
}

function zqChange(that){
	var zq = $('input[name="zq3"]:checked').val();
	console.log(zq);
	
	if(zq == 3){
		$('.zqText').show();
	}else{
		$('.zqText').hide();
	}
}