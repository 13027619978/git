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

// 免输入游客信息ticketInfoId
var ticketInfoIdList = [
	'2c9141f47bf8e6f6017c3b3023df6b48',
	'2c9141f47bf8e6f6017c3b32bb926b9c',
	'2c9141f47d92ff50017d99c745651820',
	'2c9141f47d92ff50017d99c8de991827',
	'2c9141f47e247aa3017e47066ba36ef0', // 冰上碰碰车
	'2c9141f47e247aa3017e470837c26f14', // 畅玩冰车
	'2c9141f47e247aa3017e470d1cf16f5e', // 东方红
	'2c9141f47e247aa3017e4704e2276ed5', // 狗拉雪橇
	'2c9141f47e247aa3017e47183b6e7008', // 机器人拉车
	'2c9141f47e247aa3017e47171b746fec', // 雪地铲车
	'2c9141f47e247aa3017e47115d596f9e', // 雪地大摩托
	'2c9141f47e247aa3017e470a2bbf6f26', // 雪地儿童摩托
	'2c9141f47e247aa3017e4712d8086fad', // 雪地卡丁车
	'2c9141f47e247aa3017e4715aff66fdd', // 雪地龙舟
	'2c9141f47e247aa3017e470b0fa16f34', // 雪地坦克
	'2c9141f47e247aa3017e470fe0cb6f89', // 雪地旋转飞碟
	'2c9141f47e247aa3017e470e85176f71', // 雪地悠波球
	'2c9141f47e247aa3017e471415966fc2', // 雪地战车
	'2c9141f47e8b8ff2017e8baaca8b00d1',  //什刹海糖葫芦 
	 '2c9141f47e8b8ff2017eb415db4f386c' // 水上公园差价
]

// 园博园婚纱组
var ybyHsTickets = [
	'2c9141f47c62a5d8017c6318148e08c1',
	'2c9141f47fc7b72d017fd4d0a1da38db',
	'2c9141f47fefbc0d017ffd76175c4e93',
	'2c9141f47fefbc0d01800d0c1a7d2573',
	'2c9141f47fefbc0d01800d0e24d82700',
	'2c9141f47fefbc0d01800d0d1b672637',
	'2c9141f47fefbc0d01800d0f74b027ed',
	'2c9141f47fefbc0d01800d104b1d2890'
];

// 园博园活动票分时段
var ybyActiveTimeTickets = [
	'2c9141f4801cbec8018021aa2fc644ec',
	'2c9141f4801cbec8018021abc4324512',
	'2c9141f47f3e9acf017f9048a063030a',
	'2c9141f4801cbec8018021852d344119',
	'2c9141f48028c6f70180453d834714b9',
	'2c9141f48028c6f7018045422f60153e'
]

$(function(){
	// 初始化购票张数
	$('.numberInput').val(1);
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
	
	// 园博园活动票分时段预约
	if(ybyActiveTimeTickets.indexOf(ticketInfoId) != -1){
		$('.fhlTime').show();
	}
	
	// 用户免输入信息
	if(ticketInfoIdList.indexOf(ticketInfoId) != -1){
		$('.visitorInfo').hide();
		$('.yqView').hide();
	}
	if(ticketInfoId == '2c9141f47c97c81a017ca0352e263343' || ticketInfoId == '2c9141f47c97c81a017ca1b552136270'){
		$('.noticeView').hide();
		$('.ticketTime').hide();
		$('.ticketNumber').hide();
		$('.visitorTitle').text('用户信息');
		$('.payBtn').text('在线注册');
	}
	
	// 鲜花港年票预约
	if(ticketInfoId == '2c9141f47f9ac6d1017fb9da5b361d95'){
		$('.payBtn').text('在线预约');
	}
	
	// 蒙娜丽莎1号
	if(ybyHsTickets.indexOf(ticketInfoId) != -1){
		$('title').text('在线出票');
		$('.numberText').text('出票数量：');
		$('.visitorTitle').text('出票人员');
		if(ticketInfoId == '2c9141f47fefbc0d017ffd76175c4e93'){
			$('.visitorTitle').text('预约信息');
		}
	}
	
	// 凤凰岭年票
	if(ticketInfoId == '2c9141f47cc6cdc4017cda59fc283bb8'){
		$('.fhlTime').hide();
		$('.subBtn').hide();
		$('.addBtn').hide();
	}
	
	app.wxUserInfo(function(){
		layer.load(2);
		if(enterpriseCode == 'TgsEpcYby' && ticketGroupNum == 'TGN20201210095942945' && ticketInfoId == '2c9141f4776c370d01777ac477af6852'){
			window.location.replace('ybyhsTicket.html?openid=' + app.getCookie('openid'));
		}
		if(ticketInfoId == '2c9141f47f9ac6d1017fb580c5806c47'){
			if(window.location.href.indexOf('https://') != -1){
				window.location.replace('http://' + window.location.href.split('https://')[1]);
			}
		}
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
			
			if(ticketInfoId == '2c9141f47d57b441017d752e52396ba1'){
				layer.alert('温馨提示:请您科学佩戴口罩，入园前配合测量体温，提前准备好您及同行人的北京健康宝扫码登记入园，谢谢配合。', {
					btn: ['我已知悉, 前往购票'],
					closeBtn: 0,
					title: '特别提醒'
				});
			}
			
			// 园博园提示
			if(enterpriseCode == 'TgsEpcYby'){
				// 去除园博园收费码
				if(ticketInfoIdList.indexOf(ticketInfoId) != -1){
					var noticeString = '<p style="height:300px;overflow-y:auto;">尊敬的游客朋友们：<br>';
					noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前仍处在疫情防控时期，为了您与他人的健康和游览安全，请您认真阅读以下内容：<br>';
					noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一、本人承诺：近期身体健康，无发热、咳嗽等异常情况；无流行病学接触史；无中高风险地区14天以内旅居史；无境外回国隔离不满21天的情况。<br>';
					noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二、请提前1天以上在 “北京园博园见证精彩”微信公众号（官方指定购票平台）进行预约购票，实名认证入园。入园门区为：2号门、3号门、6号门。<br>';
					noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三、入园时请配合测温验码，出示北京健康宝绿码。请随身携带、科学佩戴口罩，参观游览时请保持1米以上社交距离。遇限流游览时，请有序排队，配合工作人员管理。<br>';
					noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;四、谢绝持红码、黄码的游客入园，谢绝有14天内中高风险地区旅居使人员和入境未满21天人员入园。<br>';
					noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;五、请遵守公园各项管理规定，不携带除轮椅、婴儿手推车和儿童脚踏手推车之外的其他种类轮制器械、电动平衡车、电动玩具车、电动行李箱以及各种渔具、风筝和无人飞行器入园。<br>';
					noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;六、根据《北京市控制吸烟条例》要求，园博园全面禁烟，您在园内参观游览时请勿吸烟，并提醒他人不要吸烟。<br>';
					noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;七、请遵守《北京市生活垃圾管理条例》，分类投放生活垃圾。<br>';
					noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;八、请看护好随身携带的物品，谨防丢失或被盗。<br>';
					noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;九、咨询电话：63915561<br>';
					noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;感谢您的理解与配合。</p>';
					layer.open({
						content: noticeString,
						btn: ['我已阅读，前往购票'],
						closeBtn: 0,
						title: '温馨提示'
					});
					$('.layui-layer-title').css({
						'text-align': 'center',
						'padding': '0'
					});
				}
			}
			
			var ticketInfo = res.data.ticketInfo;
			var ticketInfoBuyRules = res.data.ticketInfoBuyRules;
			var ticketInfoCheckRules = res.data.ticketInfoCheckRules;
			$('.ticketNameTxt').html(ticketInfo.ticketName);
			$('.ticketDesc').html(ticketInfo.description);
			$('.checkTime').text('检票时间：'+ticketInfoBuyRules.checkStartTime+'-'+ticketInfoBuyRules.checkEndTime);
			$('.ticketPrice').text('￥' + ticketInfo.settlePrice);
			if(ticketInfo.settlePrice == '0'){
				$('.payBtn').text('在线领取');
				// 生物医药基地
				if(ticketInfoId == '2c9141f47c97c81a017ca0352e263343' || ticketInfoId == '2c9141f47c97c81a017ca1b552136270'){
					$('.payBtn').text('在线注册');
				}
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
				
			if(ticketInfoId == '2c9141f47bf8e6f6017c11a22fb90f06' || ticketInfoId == '2c9141f47bf8e6f6017c11a0d4e10f00'){
				visitorInfo = '<div class="visitorItem">' +
					'<div class="itemInfo">' +
						'<p>单位名称：</p>' +
						'<input class="name" type="text" placeholder="请输入单位名称">' +
					'</div>' +
					'<div class="itemInfo">' +
						'<p>手机号：</p>' +
						'<input class="phone" type="text" placeholder="请输入手机号">' +
					'</div>';
					
				$('.subBtn').hide();
				$('.addBtn').hide();
				$('.numberInput').attr('readonly', false);
			}
			
			if(ybyHsTickets.indexOf(ticketInfoId) != -1){
				visitorInfo = '<div class="itemInfo">' +
					'<p>姓名：</p>' +
					'<input class="name" type="text" placeholder="请输入出票人员姓名">' +
				'</div>' +
				'<div class="itemInfo">' +
					'<p>手机号：</p>' +
					'<input class="phone" type="text" placeholder="请输入手机号">' +
				'</div>';
			}
			
			// 园博园6次年票
			if(ticketInfoId == '2c9141f48028c6f701803a63b4797cbf'){
				$('.ticketTime').hide();
				$('.ticketNumber').hide();
				$('.noticeView').hide();
				$('.visitorTitle').text('员工信息');
				document.title = '企业园电子通行证';
				visitorInfo = '<div class="itemInfo">' +
					'<p>姓名：</p>' +
					'<input class="name" type="text" placeholder="请输入员工姓名">' +
				'</div>' +
				'<div class="itemInfo">' +
					'<p>企业名称：</p>' +
					'<input class="qy" type="text" placeholder="请输入企业名称">' +
				'</div>' +
				'<div class="itemInfo">' +
					'<p>手机号：</p>' +
					'<input class="phone" type="text" placeholder="请输入手机号">' +
				'</div>';
			}
				
			// 园博园京卡票
			if(ticketInfoId == '2c9141f47be9fa4c017bf12e619318dc'){
				visitorInfo += '<div class="itemInfo">' +
					'<p>京卡卡号：</p>' +
					'<input class="jkkh" type="text" placeholder="请输入京卡卡号">' +
				'</div>';
			}
			if(ticketInfo.ticketName.indexOf('特票') != -1 || ticketInfoId == '2c9141f47c97c81a017ca0352e263343' || ticketInfoId == '2c9141f47c97c81a017ca1b552136270' || ticketInfoId == '2c9141f47cc6cdc4017cda59fc283bb8' || ticketInfoId == '2c9141f48028c6f701803a63b4797cbf'){
				ticketType = '年票';
				visitorInfo += '<div class="itemInfo">' +
					'<p>个人照片：</p>' +
					'<div class="imgView">' +
						'<input class="selectImg" type="file" accept="image/*" onchange="selectImg(this)">' +
						'<p>点击上传个人照片</p>' +
						'<img src="img/user.png" >' +
					'</div>' +
				'</div>';
			}
			
			if(ticketInfoId == '2c9141f478ea5c3a0178f37409eb2b97'){
				ticketType = '年票';
				visitorInfo += '<div class="itemInfo">' +
					'<p>序列号：</p>' +
					'<input class="account" type="text" placeholder="序列号">' +
				'</div>' +
				'<div class="itemInfo">' +
					'<p>领取密钥：</p>' +
					'<input class="password" type="text" placeholder="请输入领取密钥">' +
				'</div>' +
				'<div class="itemInfo">' +
					'<p>个人照片：</p>' +
					'<div class="imgView">' +
						'<input class="selectImg" type="file" accept="image/*" onchange="selectImg(this)">' +
						'<p>点击上传个人照片</p>' +
						'<img src="img/user.png" >' +
					'</div>' +
				'</div>';
			}
			
			if(ticketInfoId == '2c9141f47f9ac6d1017fb580c5806c47'){
				visitorInfo += '<div class="itemInfo">' +
					'<p>序列号：</p>' +
					'<input class="account" type="text" placeholder="序列号">' +
				'</div>' +
				'<div class="itemInfo">' +
					'<p>领取密钥：</p>' +
					'<input class="password" type="text" placeholder="请输入领取密钥">' +
				'</div>';
				$('.timeTitle').text('游玩日期');
			}
			
			visitorInfo += '</div>';
							
			$('.noticeText').append('<p>1.有效日期：'+ ticketInfo.effectStartDate +'至'+ ticketInfo.effectEndDate +'</p>');
			if(enterpriseCode == 'TgsEpcFhl' && ticketGroupNum == 'TGN20201228152933458'){
				$('.noticeText').append('<p>2.预约日期：'+ ticketInfoBuyRules.salesStartDate +'至'+ ticketInfoBuyRules.salesEndDate +'</p>');	
			}else{
				if(ticketInfoId != '2c9141f47c62a5d8017c6318148e08c1' && ticketInfoId != '2c9141f47fefbc0d017ffd76175c4e93'){
					$('.noticeText').append('<p>2.售卖日期：'+ ticketInfoBuyRules.salesStartDate +'至'+ ticketInfoBuyRules.salesEndDate +'</p>');	
				}
			}
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
			if(enterpriseCode == 'TgsEpcYby' || enterpriseCode == 'TgsEpcSlfz'){
				salesEndDateTime = new Date(effectEndDate.split('-')[0] + '/' + effectEndDate.split('-')[1] + '/' + effectEndDate.split('-')[2] + ' 00:00:00').getTime();
			}
			var nowTime = new Date(nowYear + '/' + nowMonth + '/' + nowDay + ' 00:00:00');
			// 距离购票结束日期剩余天数
			var restDay = (salesEndDateTime - nowTime) / (60 * 60 * 24 * 1000);
			// 距离有效期开始时间
			// var startSaleTime = (new Date(ticketInfoBuyRules.salesStartDate.replace(/-/, '/').replace(/-/, '/') + ' 00:00:00') - nowTime) / (60 * 60 * 24 * 1000);
			
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
				showBottom: false,
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
				$('.numberInput').val(buyNumber);
				for(var i = 0; i < buyNumber; i++){
					addVisitor(visitorInfo);
				}
				$('.subBtn').hide();
				$('.priceText').text(settlePrice * buyNumber + '元');
			}else{
				addVisitor(visitorInfo);
				$('.priceText').text(settlePrice + '元');
			}
			
			
			// 设置最大购票数
			idCardNumberType = ticketInfoBuyRules.idCardNumberType;
			idCardNumber = ticketInfoBuyRules.idCardNumber;
			if(idCardNumberType == '1'){
				if(ybyHsTickets.indexOf(ticketInfoId) == -1){
					var noticeIndex = $('.noticeText p').length + 1;
					$('.noticeText').append('<p>'+noticeIndex+'.单次最多购买'+idCardNumber+'张门票</p>');
				}
				// 园博园婚纱
				if(ticketInfoId == '2c9141f47e8b8ff2017e8baaca8b00d1'){
					var noticeIndex = $('.noticeText p').length + 1;
					$('.noticeText').append('<p>'+noticeIndex+'.单次最多购买'+idCardNumber+'个</p>');
				}
				// 园博园婚纱
				if(ticketInfoId == '2c9141f47fefbc0d017ffd76175c4e93'){
					var noticeIndex = $('.noticeText p').length + 1;
					$('.noticeText').append('<p>'+noticeIndex+'.单次最多预约'+idCardNumber+'张</p>');
				}
			}
			
			// 最大购票数是否为1
			if(idCardNumberType == '1'){
				if(idCardNumber == '1'){
					$('.subBtn').hide();
					$('.addBtn').hide();
				}
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
	if(ticketInfoId != '2c9141f47bf8e6f6017c11a22fb90f06' && ticketInfoId != '2c9141f47bf8e6f6017c11a0d4e10f00' && ticketInfoId != '2c9141f47fefbc0d01800d104b1d2890'){
		addVisitor();
	}
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
		if(ticketInfoId == '2c9141f47bf8e6f6017c11a22fb90f06' || ticketInfoId == '2c9141f47bf8e6f6017c11a0d4e10f00' || ticketInfoId == '2c9141f47fefbc0d01800d104b1d2890'){
			if(ticketNumber == 1){
				$(that).hide();
			}
		}else{
			if(ticketNumber == 0){
				$(that).hide();
			}
		}
	}
	$('.numberInput').val(ticketNumber);
	$('.priceText').text(settlePrice * ticketNumber + '元');
	if(ticketInfoId != '2c9141f47bf8e6f6017c11a22fb90f06' && ticketInfoId != '2c9141f47bf8e6f6017c11a0d4e10f00' && ticketInfoId != '2c9141f47fefbc0d01800d104b1d2890'){
		$('.visitorItem').eq(-1).remove();
	}
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
								layer.closeAll();
							}else{
								layer.closeAll();
								layer.msg(res.message);
							}
						})
					}else{
						layer.closeAll();
						if(res.message == 'pic not has face'){
							layer.msg('请上传清晰的人脸照片');
						}else{
							layer.msg(res.message);
						}
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
		var visitTime = new Date($('.timeSelectBtn').text().replace(/-/, '/').replace(/-/, '/') + '  17:00:00').getTime();
		if(new Date().getTime() > visitTime){
			layer.alert('17:00后不支持购买当日票，请预约其他时间！');
			return;
		}
	}
	
	// 疫情防控
	var lxs =$('input[name="lxs"]:checked').val();
	var jcs =$('input[name="jcs"]:checked').val();
	
	// 用户免输入信息
	if(ticketInfoIdList.indexOf(ticketInfoId) != -1){
		lxs = '1';
		jcs = '1';
	}
	
	if(lxs && jcs){
		if(lxs == '0' || jcs == '0'){
			layer.alert('建议您向社区报到并进行相关隔离防护, 谢谢您的配合');
			return;
		}
	}else{
		layer.alert('请确认您是否存在中高风险地区旅行史和新冠检测阳性人员接触史');
		return;
	}
	
	// 上午场下午场
	var yyTime;
	if(ybyActiveTimeTickets.indexOf(ticketInfoId) != -1){
		yyTime = $('.yyTime').val();
		yyTime = yyTime=='0'?'上午场':yyTime=='1'?'下午场':'';
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
		if(ticketInfoId == '2c9141f47bf8e6f6017c11a22fb90f06' || ticketInfoId == '2c9141f47bf8e6f6017c11a0d4e10f00' || ticketInfoId == '2c9141f47fefbc0d01800d104b1d2890'){
			name = $('.name').val();
			phone = $('.phone').val();
			idCard = '';
		}
		// 园博园团队年票 || 鲜花港赏花卡
		if(ticketInfoId == '2c9141f478ea5c3a0178f37409eb2b97' || ticketInfoId == '2c9141f47f9ac6d1017fb580c5806c47'){
			var account = $('.account').eq(i).val();
			var password = $('.password').eq(i).val();
			if(!account || !password){
				layer.alert('请先输入序列号及领取密钥');
				// 启用支付按钮
				$('.payBtn').attr('onclick', 'payClick()');
				return;
			}
		}
		// 园博园京卡票
		if(ticketInfoId == '2c9141f47be9fa4c017bf12e619318dc'){
			var jkkh = $('.jkkh').eq(i).val();
			if(!jkkh){
				layer.alert('请先输入京卡卡号');
				// 启用支付按钮
				$('.payBtn').attr('onclick', 'payClick()');
				return;
			}
		}
		
		// 园博园6次年票
		if(ticketInfoId == '2c9141f48028c6f701803a63b4797cbf'){
			var qyName = $('.qy').eq(i).val();
			if(!qyName){
				layer.alert('请先输入企业名称');
				// 启用支付按钮
				$('.payBtn').attr('onclick', 'payClick()');
				return;
			}
		}
		// 园博园收费码
		console.log(ticketInfoIdList.indexOf(ticketInfoId));
		if(ticketInfoIdList.indexOf(ticketInfoId) != -1){
			if(ticketInfoId == '2c9141f47bf8e6f6017c3b3023df6b48'){
				name = '丰园书馆水费';
			}
			if(ticketInfoId == '2c9141f47bf8e6f6017c3b32bb926b9c'){
				name = '丰园书馆茶费';
			}
			if(ticketInfoId == '2c9141f47d92ff50017d99c745651820'){
				name = '雪地转转30元/次/人';
			}
			if(ticketInfoId == '2c9141f47d92ff50017d99c8de991827'){
				name = '雪地悠波球30元/10分钟/次/人'
			}
			if(ticketInfoId == '2c9141f47e247aa3017e47066ba36ef0'){
				name = '冰上碰碰车'
			}
			if(ticketInfoId == '2c9141f47e247aa3017e470837c26f14'){
				name = '畅玩冰车'
			}
			if(ticketInfoId == '2c9141f47e247aa3017e470d1cf16f5e'){
				name = '东方红'
			}
			if(ticketInfoId == '2c9141f47e247aa3017e4704e2276ed5'){
				name = '狗拉雪橇'
			}
			if(ticketInfoId == '2c9141f47e247aa3017e47183b6e7008'){
				name = '机器人拉车'
			}
			if(ticketInfoId == '2c9141f47e247aa3017e47171b746fec'){
				name = '雪地铲车'
			}
			if(ticketInfoId == '2c9141f47e247aa3017e47115d596f9e'){
				name = '雪地大摩托'
			}
			if(ticketInfoId == '2c9141f47e247aa3017e470a2bbf6f26'){
				name = '雪地儿童摩托'
			}
			if(ticketInfoId == '2c9141f47e247aa3017e4712d8086fad'){
				name = ' 雪地卡丁车'
			}
			if(ticketInfoId == '2c9141f47e247aa3017e4715aff66fdd'){
				name = '雪地龙舟'
			}
			if(ticketInfoId == '2c9141f47e247aa3017e470b0fa16f34'){
				name = '雪地坦克'
			}
			if(ticketInfoId == '2c9141f47e247aa3017e470fe0cb6f89'){
				name = '雪地旋转飞碟'
			}
			if(ticketInfoId == '2c9141f47e247aa3017e470e85176f71'){
				name = '雪地悠波球'
			}
			if(ticketInfoId == '2c9141f47e247aa3017e471415966fc2'){
				name = '雪地战车'
			}
			if(ticketInfoId == '2c9141f47e8b8ff2017e8baaca8b00d1'){
				name = '糖葫芦'
			}
			if(ticketInfoId == '2c9141f47e8b8ff2017eb415db4f386c'){
				name = '水上公园差价'
			}
			phone = '11111111111';
			idCard = '';
		}
		
		// 蒙娜丽莎1号
		if(ticketInfoId == '2c9141f47c62a5d8017c6318148e08c1'){
			idCard = '';
		}
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
		var nameTxt;
		if(yyTime){
			nameTxt = $('.name').eq(i).val() + '('+ yyTime +')';
		}else{
			nameTxt = $('.name').eq(i).val();
		}
		if(idCardRequired == '1'){
			if(ticketInfoId == '2c9141f47be9fa4c017bf12e619318dc'){
				// 京卡卡号
				visitor = {
					userName: nameTxt + ',' + $('.jkkh').eq(i).val(),
					phone: $('.phone').eq(i).val(),
					certType: 0,
					certNumber: $('.idCard').eq(i).val()
				}
			}else{
				visitor = {
					userName: nameTxt,
					phone: $('.phone').eq(i).val(),
					certType: 0,
					certNumber: $('.idCard').eq(i).val()
				}
			}
		}else{
			if(ticketInfoIdList.indexOf(ticketInfoId) != -1){
				visitor = {
					userName: name,
					phone: phone
				}
			}else{
				if($('.idCard').eq(i).val()){
					visitor = {
						userName: nameTxt,
						phone: $('.phone').eq(i).val(),
						certType: 0,
						certNumber: $('.idCard').eq(i).val()
					}
				}else{
					visitor = {
						userName: nameTxt,
						phone: $('.phone').eq(i).val()
					}
					// 团队票
					if(ticketInfoId == '2c9141f47bf8e6f6017c11a22fb90f06' || ticketInfoId == '2c9141f47bf8e6f6017c11a0d4e10f00' || ticketInfoId == '2c9141f47fefbc0d01800d104b1d2890'){
						visitor = {
							userName: $('.name').val(),
							phone: $('.phone').val()
						}
					}
					// 园博园6次年票
					if(ticketInfoId == '2c9141f48028c6f701803a63b4797cbf'){
						visitor = {
							userName: $('.name').val() + '（' + $('.qy').val() + '）',
							phone: $('.phone').val()
						}
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
		// 			if(color != '0' && color != '10' && color != '20' && color != '30'){
		// 				layer.alert('请您核实身份信息并确保北京健康宝绿码');
		// 				// 启用支付按钮
		// 				$('.payBtn').attr('onclick', 'payClick()');
		// 				return;
		// 			}
		// 			healthCode += 1;
		// 		}else{
		// 			var codeMsg = res.data.split('"message":"')[1].split('"')[0];
		// 			console.log(codeMsg);
		// 			if(codeMsg != '使用量达到使用限额' && codeMsg != '大数据接口异常' && codeMsg != 'FORBIDDEN LIMIT_TOO_MANY_REQUESTS'){
		// 				layer.alert(codeMsg);
		// 				// 启用支付按钮
		// 				$('.payBtn').attr('onclick', 'payClick()');
		// 				return;
		// 			}else{
		// 				healthCode += 1;
		// 			}
		// 		}
		// 	})
		// }else{
		// 	healthCode += 1;
		// }
		
		// 开启健康宝时删除
		healthCode += 1;
	})
	
	
	
	var myInter = setInterval(function(){
		if(healthCode == visitors.length){
			clearInterval(myInter);
			if(ticketInfoId == '2c9141f478ea5c3a0178f37409eb2b97'){
				// 园博园团队年票
				$.ajax({
				    url:'http://node.smart-ideas.com.cn:3001/datav/yby/boss/getCardInfo?account='+account+'&password='+password,
				    type:"GET",
				    success:function(data){
				    	console.log('123');
						if(data.code == 'FAIL'){
							layer.alert(data.msg);
							// 启用支付按钮
							$('.payBtn').attr('onclick', 'payClick()');
						}else{
							var params = {
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
							
							layer.load(2);
							app.postAjax('order/create', params, function(res){
								console.log(res);
								var orderInfo = res.data;
								if(res.success){
									if(res.data.payStatus != '0'){
										// 启用支付按钮
										$('.payBtn').attr('onclick', 'payClick()');
										$.ajax({
										    url:'http://node.smart-ideas.com.cn:3001/datav/yby/boss/removeCardInfo?account='+account+'&password='+password,
										    type:"GET",
										    success:function(data){
												app.setCookie('headPicUrl', headPicUrl);
												layer.closeAll();
												window.location.href = 'orderDetail.html?ticketId=/' + orderInfo.ticketOrderId + '/';
											}
										})
									}
								}else{
									layer.closeAll();
									// 启用支付按钮
									$('.payBtn').attr('onclick', 'payClick()');
									layer.alert(res.message);
								}
							})
						}
				    }
				});
			}else if(ticketInfoId == '2c9141f47f9ac6d1017fb580c5806c47'){
				layer.confirm('预约游玩日期：' + $('.timeSelectBtn').text() + '，请确认后预约。', {
				  btn: ['确认预约','取消'] 
				}, function(){
					// 预约入园
					// 鲜花港赏花卡
					$.ajax({
					    url:'http://node.smart-ideas.com.cn:3001/datav/xhg/checkXhgNp?code='+account+'&password='+password,
					    type:"GET",
					    success:function(data){
							if(data.code == 'fail'){
								layer.alert(data.message);
								// 启用支付按钮
								$('.payBtn').attr('onclick', 'payClick()');
							}else{
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
										if(res.data.payStatus != '0'){
											// 启用支付按钮
											$('.payBtn').attr('onclick', 'payClick()');
											app.setCookie('headPicUrl', headPicUrl);
											layer.closeAll();
											window.location.href = 'orderDetail.html?ticketId=/' + orderInfo.ticketOrderId + '/';
										}
									}else{
										layer.closeAll();
										// 启用支付按钮
										$('.payBtn').attr('onclick', 'payClick()');
										layer.alert(res.message);
									}
								})
							}
					    }
					});
				});
				
			}else{
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
				
				console.log(params);
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
					app.setCookie('headPicUrl', headPicUrl);
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
						if(ticketInfoId == '2c9141f47c62a5d8017c6318148e08c1'){
							// 蒙娜丽莎1号
							if(res.message == '当前时间段该门票已约满,请联系景区管理员'){
								layer.alert('该库存已使用完，请及时联系景区购票');
							}else{
								layer.alert(res.message);
							}
						}else{
							layer.alert(res.message);
						}
					}
				})
			}
			
		}
	}, 100);
}

function fhlNoticeClick(){
	$('.fhlNoticeView').hide();
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
