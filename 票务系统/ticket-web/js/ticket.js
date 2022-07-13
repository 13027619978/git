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
	if(enterpriseCode == 'TgsEpcTydrj'){
		$('.payBtn').text('领票');
		$('.visitorInfo').append('<p class="drjNotice">敬请领票，祝您参观愉快！</p>');
	}
	if(enterpriseCode == 'TgsEpcFhl'){
		$('.fhlTime').show();
		if(ticketInfoId == '2c9141f47cc6cdc4017cda59fc283bb8'){
			$('.fhlTime').hide();
			$('.subBtn').hide();
			$('.addBtn').hide();
			$('.payBtn').attr('onclick', 'checkSm()');
		}
		$('.cetTypeView').show();
		// 隐藏购票须知
		$('.noticeView').hide();
		$('.yqView').hide();
		$('.fhlSelect').append(
			'<option value ="0">7:00-10:00</option>' +
			'<option value ="0">10:00-12:00</option>' +
			'<option value ="0">12:00-14:00</option>' +
			'<option value ="0">14:00-17:00</option>'
		);
		if(ticketInfoId == '2c9141f476a897de0176a8cf57d6004a' || ticketInfoId == '2c9141f476a897de0176a8d1a5910051'){
			$('.fhlSelect').html('');
			$('.fhlSelect').append(
				'<option value ="0">上午场：09:00-12:00</option>' +
				'<option value ="0">下午场：12:00-16:30</option>' 
			);
		}
		if(ticketInfoId == '2c9141f478ea5c3a01791b5b0ac022a6'){
			$('.cetTypeView').hide();
			$('.visitorInfo').hide();
			$('.fhlSelect').hide();
		}
	}
	
	if(enterpriseCode == 'TgsEpcYby'){
		$('.sfyx').show();
		$('.szPayBtn').show();
		if(ticketInfoId != '2c9141f47d377f26017d50e432814c39' && ticketInfoId != '2c9141f47d377f26017d50e8fb664c68'){
			$('.fhlTime').show();
			var nowHour = new Date().getHours();
			if(nowHour < 12){
				$('.fhlSelect').append(
					'<option value ="上午票">上午票(06:30-12:00)</option>' +
					'<option value ="下午票">下午票(12:00-17:30)</option>'
				);
			}else{
				$('.fhlSelect').append(
					'<option value ="下午票">下午票(12:00-17:30)</option>'
				);
			}
		}
	}
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
					$('.ticketNameTxt').html(value.ticketName + '<font class="ticketType">'+ value.categoryName +'</font>');
					if(enterpriseCode == 'TgsEpcFhl' && value.ticketName.indexOf('全价+') != -1){
						$('.ticketNameTxt').html(value.ticketName + '<font class="ticketType">多人票</font>');
					}
					$('.ticketDesc').html(value.description);
					$('.checkTime').text('检票时间：'+value.checkRules.checkStartTime+'-'+value.checkRules.checkEndTime);
					$('.ticketPrice').text('￥' + value.settlePrice);
					$('.priceText').text(value.settlePrice + '元');
					if(parseFloat(value.settlePrice) == 0){
						$('.payBtn').text('在线预约');
					}
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
						'<div class="itemInfo idCardItem">' +
							'<p class="idCardTxt">身份证：</p>' +
							'<input class="idCard" type="text" placeholder="请输入身份证" oninput="onInput(this)">' +
						'</div>';
					if(value.categoryName == '年票'){
						visitorInfo += '<div class="itemInfo">' +
							'<p>个人照片：</p>' +
							'<div class="imgView">' +
								'<input class="selectImg" type="file" accept="image/*" onchange="selectImg(this)">' +
								'<p>请上传个人正面免冠照片</p>' +
								'<img src="img/user.png" >' +
							'</div>' +
						'</div>';
						if(enterpriseCode == 'TgsEpcFhl'){
							visitorInfo = '<div class="visitorItem">' +
								'<div class="itemInfo">' +
									'<p>姓名：</p>' +
									'<input class="name" type="text" placeholder="请输入姓名">' +
								'</div>' +
								'<div class="itemInfo idCardItem">' +
									'<p class="idCardTxt">身份证：</p>' +
									'<input class="idCard" type="text" placeholder="请输入身份证" oninput="onInput(this)">' +
								'</div>' +
								'<div class="itemInfo">' +
									'<p>个人照片：</p>' +
									'<div class="imgView">' +
										'<input class="selectImg" type="file" accept="image/*" onchange="selectImg(this)">' +
										'<p>请上传个人正面免冠照片</p>' +
										'<img src="img/user.png" >' +
									'</div>' +
								'</div>' +
								'<div class="itemInfo">' +
									'<p>手机号：</p>' +
									'<input class="phone" type="text" placeholder="请输入手机号">' +
								'</div>' +
								'<div class="itemInfo">' +
									'<input class="smCode" type="text" placeholder="请输入验证码" maxlength="6">' +
									'<a class="smBtn" href="javascript:;" onclick="getSm()">获取验证码</a>' +
								'</div>';
						}
					}
					
					if(value.ticketNum == 'PST20211214103154924' || value.ticketNum == 'PST20211214103031009'){
						visitorInfo = '<div class="visitorItem">' +
							'<div class="itemInfo">' +
								'<p>姓名：</p>' +
								'<input class="name" type="text" placeholder="请输入姓名">' +
							'</div>' +
							'<div class="itemInfo">' +
								'<p>手机号：</p>' +
								'<input class="phone" type="text" placeholder="请输入手机号">' +
							'</div>' +
							'<div class="itemInfo idCardItem">' +
								'<p class="idCardTxt">身份证：</p>' +
								'<input class="idCard" type="text" placeholder="请输入身份证" oninput="onInput(this)">' +
							'</div>'+
							'<div class="itemInfo idCardItem">' +
								'<p class="idCardTxt">卡号：</p>' +
								'<input type="text" placeholder="请输入卡号" oninput="onInput(this)">' +
							'</div>';
					}
					
					visitorInfo += '</div>';
					
					// 园博园隐藏提示
					if(enterpriseCode != 'TgsEpcYby' && enterpriseCode != 'TgsEpcFhl'){
						$('.noticeText').append('<p>1.有效日期：'+ value.effectStartDate +'至'+ value.effectEndDate +'</p>');
					}
					if(enterpriseCode == 'TgsEpcFhl'){
						if(value.ticketName == '凤凰岭春节免费游园预约'){
							$('.payBtn').text('在线预约');
							$('.fhlTitle').text('预约须知');
							$('.numberText').text('预约数量：');
							$('.fhlNoticeBtn').text('我已知悉，前往预定');
							$('.fhlSelect').html('');
							var nowHour = new Date().getHours();
							if(nowHour >= 12){
								$('.fhlSelect').append(
									'<option value ="0">下午</option>'
								)
							}else{
								$('.fhlSelect').append(
									'<option value ="0">上午</option>' +
									'<option value ="0">下午</option>'
								)
							}
							$('.fhlFreeNoticeView').show();
						}else{
							$('.fhlNoticeView').show();
							$('.fhlFreeNoticeView').hide();
							// $('.noticeText').append('<p>2.售卖日期：'+ value.buyRules.salesStartDate +'至'+ value.buyRules.salesEndDate +'</p>');	
						}
					}else{
						// 园博园隐藏提示
						if(enterpriseCode != 'TgsEpcYby'){
							$('.noticeText').append('<p>2.售卖日期：'+ value.buyRules.salesStartDate +'至'+ value.buyRules.salesEndDate +'</p>');	
						}
					}
					
					
					
					
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
					if(ticketName == '凤凰岭春节免费游园预约'){
						var nowHour = new Date().getHours();
						if(nowHour >= 17){
							if(startSaleTime == 0){
								startSaleTime = 1;
							}
						}
					}
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
							
							if(ticketName == '凤凰岭春节免费游园预约'){
								var nowYear = new Date().getFullYear();
								var nowMonth = new Date().getMonth()+1;
								nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
								var nowDay = new Date().getDate();
								nowDay = nowDay>9?nowDay:'0'+nowDay;
								$('.fhlSelect').html('');
								if(value == nowYear + '-' + nowMonth + '-' + nowDay){
									var nowHour = new Date().getHours();
									if(nowHour >= 12){
										$('.fhlSelect').append(
											'<option value ="0">下午</option>'
										)
									}else if(nowHour > 17){
										layer.alert('17点后不支持预定当日票');
									}else{
										$('.fhlSelect').append(
											'<option value ="0">上午</option>' +
											'<option value ="0">下午</option>'
										)
									}
								}else{
									$('.fhlSelect').append(
										'<option value ="0">上午</option>' +
										'<option value ="0">下午</option>'
									)
								}
							}
							
							if(enterpriseCode == 'TgsEpcYby'){
								if(ticketInfoId != '2c9141f47d377f26017d50e432814c39' && ticketInfoId != '2c9141f47d377f26017d50e8fb664c68'){
									$('.fhlSelect').html('');
									var visitDate = new Date(value.replace(/-/, '/').replace(/-/, '/') + ' 00:00:00').getTime();
									var nowDate = new Date().getTime();
									if(visitDate < nowDate){
										if(new Date().getHours() < 12){
											$('.fhlSelect').append(
												'<option value ="上午票">上午票(06:30-12:00)</option>' +
												'<option value ="下午票">下午票(12:00-17:30)</option>'
											);
										}else{
											$('.fhlSelect').append(
												'<option value ="下午票">下午票(12:00-17:30)</option>'
											);
										}
									}else{
										$('.fhlSelect').append(
											'<option value ="上午票">上午票(06:30-12:00)</option>' +
											'<option value ="下午票">下午票(12:00-17:30)</option>'
										);
									}
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
	if(app.getCookie('enterpriseCode') == 'TgsEpcFhl'){
		$('.visitorItem').hide();
		// 雪糕票隐藏游客信息
		if(ticketInfoId != '2c9141f478ea5c3a01791b5b0ac022a6'){
			$('.visitorItem').eq(0).show();
		}
	}
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
				if(app.getCookie('enterpriseCode') == 'TgsEpcFhl'){
					app.cdcPostAjax(fileData, function(res){
						if(res.success){
							app.filePostAjax('order/uploadHeadImg', fileData, function(res){
								if(res.success){
									headPicUrl = res.data;
									$('.imgView p').text('重新上传');
									$('.imgView img').attr('src', headPicUrl);
									$('.face-preview-img').attr('src', headPicUrl);
									$('.face-preview-modal').css({
										"display": "flex"
									});
									app.setCookie('headPicUrl', headPicUrl);
									layer.closeAll();
								}else{
									layer.closeAll();
									layer.msg(res.message);
								}
							})
						}else{
							layer.closeAll();
							layer.msg('请上传个人正面免冠照片');
						}
					})
				}else{
					app.filePostAjax('order/uploadHeadImg', fileData, function(res){
						if(res.success){
							headPicUrl = res.data;
							$('.imgView p').text('重新上传');
							$('.imgView img').attr('src', headPicUrl);
							$('.face-preview-img').attr('src', headPicUrl);
							$('.face-preview-modal').css({
								"display": "flex"
							});
							app.setCookie('headPicUrl', headPicUrl);
							layer.closeAll();
						}else{
							layer.closeAll();
							layer.msg(res.message);
						}
					})
				}
				
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
function payClick(payType){
	if(orderEndTime && ticketType != '年票'){
		var visitTime = new Date($('.timeSelectBtn').text().replace(/-/, '/').replace(/-/, '/') + ' ' + orderEndTime).getTime();
		if(new Date().getTime() > visitTime){
			layer.alert(orderEndTime + '后不支持购买当日票，请预约其他时间！');
			return;
		}
	}
	
	// 狄仁杰公园
	if(app.getCookie('enterpriseCode') == 'TgsEpcTydrj'){
		var visitWeek = new Date($('.timeSelectBtn').text().replace(/-/, '/').replace(/-/, '/')).getDay();
		if(visitWeek == 1){
			layer.alert('每周一闭馆，请选择其他预约时间!');
			return;
		}
		if(orderEndTime){
			var visitTime = new Date($('.timeSelectBtn').text().replace(/-/, '/').replace(/-/, '/') + ' ' + orderEndTime).getTime();
			if(new Date().getTime() > visitTime){
				layer.alert(orderEndTime + '后不支持购买当日票，请预约其他时间！');
				return;
			}
		}
	}
	
	// 园博园年卡
	if(app.getCookie('enterpriseCode') == 'TgsEpcYby' && ticketType != '年票'){
		if(orderEndTime){
			var visitTime = new Date($('.timeSelectBtn').text().replace(/-/, '/').replace(/-/, '/') + ' ' + orderEndTime).getTime();
			if(new Date().getTime() > visitTime){
				layer.alert(orderEndTime + '后不支持购买当日票，请预约其他时间！');
				return;
			}
		}
	}
	
	// 水上公园
	if(app.getCookie('enterpriseCode') == 'TgsEpcSlfz' && app.getCookie('ticketGroupNum') == 'TGN20200907203336045'){
		if(orderEndTime){
			var visitTime = new Date($('.timeSelectBtn').text().replace(/-/, '/').replace(/-/, '/') + ' ' + orderEndTime).getTime();
			if(new Date().getTime() > visitTime){
				layer.alert(orderEndTime + '后不支持购买当日票，请预约其他时间！');
				return;
			}
		}
	}
	
	// 鲜花港
	if(app.getCookie('enterpriseCode') == 'TgsEpcSlfz' && app.getCookie('ticketGroupNum') == 'TGN20200907203306267'){
		var visitDate = $('.timeSelectBtn').text();
		if(visitDate == '2021-05-29'){
			layer.alert('暂不支持预约05-29门票，请选择其他时间点预约');
			return;
		}
		if(orderEndTime){
			var visitTime = new Date($('.timeSelectBtn').text().replace(/-/, '/').replace(/-/, '/') + ' ' + orderEndTime).getTime();
			if(new Date().getTime() > visitTime){
				layer.alert(orderEndTime + '后不支持购买当日票，请预约其他时间！');
				return;
			}
		}
	}
	
	// 凤凰岭
	if(app.getCookie('enterpriseCode') == 'TgsEpcFhl'){
		if(!$('.timeSelectBtn').text()){
			layer.alert('此优惠票仅限在工作日使用, 请您选择其他日期');
			return;
		}
		if(orderEndTime){
			var visitTime = new Date($('.timeSelectBtn').text().replace(/-/, '/').replace(/-/, '/') + ' ' + orderEndTime).getTime();
			if(new Date().getTime() > visitTime){
				layer.alert(orderEndTime + '后不支持购买当日票，请预约其他时间！');
				return;
			}
		}
	}
	
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
		
		if(app.getCookie('enterpriseCode') == 'TgsEpcYby'){
			var sfyx =$('input[name="sfyx"]:checked').val();
			if(sfyx){
				if(sfyx == '0'){
					layer.alert('建议您向社区报到并进行相关隔离防护, 谢谢您的配合');
					return;
				}
			}else{
				layer.alert('请确认您是否存在中高风险地区旅行史和新冠检测阳性人员接触史');
				return;
			}
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
		if(app.getCookie('enterpriseCode') == 'TgsEpcFhl'){
			if(ticketInfoId == '2c9141f478ea5c3a01791b5b0ac022a6'){
				name = "杏花雪糕";
				phone = "13000000000";
			}else{
				idCard = $('.idCard').eq(0).val();
				name = $('.name').eq(0).val();
				phone = $('.phone').eq(0).val();
			}
		}
		if(idCardRequired == '1'){
			if(!idCard || !name || !phone){
				layer.alert('请先完善游客信息');
				// 启用支付按钮
				if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
					$('.payBtn').attr('onclick', 'checkSm()');
				}else{
					$('.payBtn').attr('onclick', 'payClick(0)');
				}
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
				if(app.getCookie('enterpriseCode') == 'TgsEpcFhl'){
					// 证件类型
					var certType = $('input[name="cetType"]:checked').val();
					if(certType == '0'){
						if(idCard.length != 18){
							layer.alert('请输入正确的身份证号');
							// 启用支付按钮
							if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
								$('.payBtn').attr('onclick', 'checkSm()');
							}else{
								$('.payBtn').attr('onclick', 'payClick(0)');
							}
							return;
						}
					}
				}else{
					if(idCard.length != 18){
						layer.alert('请输入正确的身份证号');
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
		}else{
			if(!name || !phone){
				layer.alert('请先完善游客信息');
				// 启用支付按钮
				if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
					$('.payBtn').attr('onclick', 'checkSm()');
				}else{
					$('.payBtn').attr('onclick', 'payClick(0)');
				}
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
	}
	
	if(app.getCookie('enterpriseCode') != 'TgsEpcFhl' && app.getCookie('enterpriseCode') != 'TgsEpcSh' && app.getCookie('enterpriseCode') != 'TgsEpcHty'){
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
	
	// 年票头像限制
	if(ticketType == '年票'){
		if(!headPicUrl){
			layer.alert('请先上传头像！');
			// 启用支付按钮
			if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
				$('.payBtn').attr('onclick', 'checkSm()');
			}else{
				$('.payBtn').attr('onclick', 'payClick(0)');
			}
			return;
		}
	}
	
	var visitors = [];
	
	for(var i = 0; i < ticketNumber; i++){
		var visitor= {};
		if(idCardRequired == '1'){
			if(app.getCookie('enterpriseCode') == 'TgsEpcFhl'){
				visitor = {
					userName: $('.name').eq(0).val(),
					phone: $('.phone').eq(0).val(),
					certType: 0,
					certNumber: $('.idCard').eq(0).val()
				}
			} else if(app.getCookie('enterpriseCode') == 'TgsEpcYby'){
				if($('.fhlSelect').val()){
					visitor = {
						userName: $('.name').eq(i).val() + '(' + $('.fhlSelect').val() + ')',
						phone: $('.phone').eq(i).val(),
						certType: 0,
						certNumber: $('.idCard').eq(i).val()
					}
				}else{
					visitor = {
						userName: $('.name').eq(i).val(),
						phone: $('.phone').eq(i).val(),
						certType: 0,
						certNumber: $('.idCard').eq(i).val()
					}
				}
			} else{
				visitor = {
					userName: $('.name').eq(i).val(),
					phone: $('.phone').eq(i).val(),
					certType: 0,
					certNumber: $('.idCard').eq(i).val()
				}
			}
		}else{
			if($('.idCard').eq(i).val()){
				if(app.getCookie('enterpriseCode') == 'TgsEpcFhl'){
					visitor = {
						userName: $('.name').eq(0).val(),
						phone: $('.phone').eq(0).val(),
						certType: 0,
						certNumber: $('.idCard').eq(0).val()
					}
				}else{
					visitor = {
						userName: $('.name').eq(i).val(),
						phone: $('.phone').eq(i).val(),
						certType: 0,
						certNumber: $('.idCard').eq(i).val()
					}
				}
			}else{
				if(app.getCookie('enterpriseCode') == 'TgsEpcFhl'){
					if(ticketInfoId == '2c9141f478ea5c3a01791b5b0ac022a6'){
						visitor = {
							userName: "杏花雪糕",
							phone: "13000000000"
						}
					}else{
						visitor = {
							userName: $('.name').eq(0).val(),
							phone: $('.phone').eq(0).val()
						}
					}
					
				}else{
					visitor = {
						userName: $('.name').eq(i).val(),
						phone: $('.phone').eq(i).val()
					}
				}
			}
		}
		visitors.push(visitor);
	}
	
	var healthCode = 0;
	visitors.forEach(function(value, key){
		// if(app.getCookie('enterpriseCode') == 'TgsEpcYby'){
		// 	app.getAjax('health/getCode', {
		// 		certNumber: value.certNumber
		// 	}, function(res){
		// 		if(res.data.indexOf('color') != -1){
		// 			var color = res.data.split('"color":"')[1].split('"')[0];
		// 			if(color != '0' && color != '10' && color != '20' && color != '30' && color != '11' && color != '21' && color != '31' && color != '41'){
		// 				layer.alert('请您核实身份信息并确保北京健康宝绿码');
		// 				// 启用支付按钮
		// 				$('.payBtn').attr('onclick', 'payClick(0)');
		// 				return;
		// 			}
		// 		}else{
		// 			if(res.data.indexOf('message') != -1){
		// 				var codeMsg = res.data.split('"message":"')[1].split('"')[0];
		// 				if(codeMsg != '使用量达到使用限额' && codeMsg != '大数据接口异常' && codeMsg != 'FORBIDDEN LIMIT_TOO_MANY_REQUESTS'){
		// 					layer.alert(codeMsg);
		// 					// 启用支付按钮
		// 					$('.payBtn').attr('onclick', 'payClick(0)');
		// 					return;
		// 				}
		// 				// 启用支付按钮
		// 				$('.payBtn').attr('onclick', 'payClick(0)');
		// 			}
		// 		}
		// 		healthCode += 1;
		// 	})
		// }else{
		// 	healthCode += 1;
		// }
		
		// 开启健康宝是删除
		healthCode += 1;
	})
	
	var myInter = setInterval(function(){
		if(healthCode == visitors.length){
			clearInterval(myInter);
			var params;
			if(payType == 0){
				params = {
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
			}else{
				params = {
					source: 'WEB',
					payWay: 'CCBPAY',
					ticketInfoId: ticketInfoId,
					openId: app.getCookie('openid'),
					totalPrice: parseFloat(settlePrice) * ticketNumber,
					unitPrice: settlePrice,
					visitDate: $('.timeSelectBtn').text(),
					buyQuantity: ticketNumber,
					visitors: visitors
				}
			}
			if(headPicUrl){
				if(payType == 0){
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
				}else{
					params = {
						source: 'WEB',
						payWay: 'CCBPAY',
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
			}
			console.log(params);
			layer.load(2);
			app.encryptPostAjax('order/encrypt/create', params, function(res){
				console.log(res);
				var orderInfo = res.data;
				if(res.success){
					// 需要支付
					if(res.data.payStatus == '0'){
						if(payType == '0'){
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
										if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
											$('.payBtn').attr('onclick', 'checkSm()');
											app.setCookie('headPicUrl', headPicUrl);
											window.location.href = 'fhlDetail.html?ticketId=/' + orderInfo.ticketOrderId + '/';
										}else{
											$('.payBtn').attr('onclick', 'payClick(0)');
											window.location.href = 'orderDetail.html?ticketId=/' + orderInfo.ticketOrderId + '/';
										}
									}else{
										// 启用支付按钮
										if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
											$('.payBtn').attr('onclick', 'checkSm()');
										}else{
											$('.payBtn').attr('onclick', 'payClick(0)');
										}
									}
								}
							);
						}else{
							window.location.href = res.data.payParams;
						}
					}else{
						// 0元票
						if(ticketBuyName == '已购票登记' && app.getCookie('enterpriseCode') == 'TgsEpcYby'){
							app.getAjax('/orderCheck/getCheckInfoByBrake?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945&checkWay=idcard&checkValue=' + visitors[0].certNumber, {}, function(res){
								app.postAjax('orderCheck/checkByBrake', {
									ticketOrderId: res.data.ticketOrderId,
									ticketOrderDetailsId: res.data.ticketOrderDetailsId,
									categoryCode: res.data.categoryCode,
									detailsType: res.data.detailsType,
									salesChannelsNum: res.data.salesChannelsNum,
									checkWay: 'brake'
								}, function(res){
									console.log(res);
									if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
										$('.payBtn').attr('onclick', 'checkSm()');
									}else{
										$('.payBtn').attr('onclick', 'payClick(0)');
									}
									layer.closeAll();
									if(res.success){
										window.location.href = 'orderDetail.html?ticketId=/' + orderInfo.ticketOrderId + '/';
									}else{
										layer.alert(res.message);
									}
								})
							})
						}else{
							setTimeout(function(){
								layer.closeAll();
								window.location.href = 'orderDetail.html?ticketId=/' + orderInfo.ticketOrderId + '/';
							}, 500);
							if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
								$('.payBtn').attr('onclick', 'checkSm()');
							}else{
								$('.payBtn').attr('onclick', 'payClick(0)');
							}
						}
					}
				}else{
					layer.closeAll();
					// 启用支付按钮
					if(app.getCookie('enterpriseCode') == 'TgsEpcFhl' && ticketType == '年票'){
						$('.payBtn').attr('onclick', 'checkSm()');
					}else{
						$('.payBtn').attr('onclick', 'payClick(0)');
					}
					layer.alert(res.message);
				}
			})
		}
	}, 100);
}

function fhlNoticeClick(){
	$('.fhlNoticeView').hide();
}

// 获取验证码
function getSm(){
	var phone = $('.phone').val();
	if(phone && phone.length == 11){
		$('.smBtn').attr('onclick', '').addClass('disabled');
		app.getAjax('validate/sendSimCode', {
			phone: phone,
			type: 'order'
		},function(res){
			if(res.success){
				var seconds = 60;
				var myInter = setInterval(function(){
					seconds -= 1;
					if(seconds >= 0){
						$('.smBtn').text('重新获取（'+ seconds +'s）');
					}else{
						$('.smBtn').text('获取验证码').removeClass('disabled').attr('onclick', 'getSm()');
						clearInterval(myInter);
					}
				}, 1000)
			}else{
				layer.alert(res.message);
			}
		})
		
	}else{
		layer.alert('请先输入正确的手机号');
	}
}

// 验证手机验证码
function checkSm(){
	var phone = $('.phone').val();
	var smCode = $('.smCode').val();
	if(phone && smCode){
		app.getAjax('validate/check', {
			phone: phone,
			type: 'order',
			code: smCode
		},function(res){
			if(res.success){
				payClick(0);
			}else{
				layer.alert(res.message);
			}
		})
	}else{
		layer.alert('请先输入正确的手机号或验证码');
	}
}


function onInput(that){
	// if(app.getCookie('enterpriseCode') == 'TgsEpcYby'){
	// 	var idCard = $(that).val();
	// 	console.log(idCard);
	// 	if(idCard.length == 18){
	// 		app.getAjax('health/getCode', {
	// 			certNumber: idCard
	// 		}, function(res){
	// 			if(res.data.indexOf('color') != -1){
	// 				var color = res.data.split('"color":"')[1].split('"')[0];
	// 				if(color != '0' && color != '10' && color != '20' && color != '30'){
	// 					layer.alert('请您核实身份信息并确保北京健康宝绿码');
	// 				}
	// 			}else{
	// 				var codeMsg = res.data.split('"message":"')[1].split('"')[0];
	// 				if(codeMsg != '使用量达到使用限额' && codeMsg != '大数据接口异常' && codeMsg != 'FORBIDDEN LIMIT_TOO_MANY_REQUESTS'){
	// 					layer.alert(codeMsg);
	// 				}
	// 			}
				
	// 		})
	// 	}
	// }
}
