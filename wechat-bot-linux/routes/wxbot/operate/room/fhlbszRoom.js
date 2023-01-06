var wechat = require('../mybot.js');
const http = require('http');
const host = "api.smart-ideas.com.cn";
const fhl = require('../common/fhl.js');
const boss = require('../common/boss.js');

async function fhlbszRoomDeal(msg){
	const content = msg.text();
	const contact = msg.talker();
	const room = msg.room();
	const fromRoomAlias = await room.alias(contact);
	var fromName;
	if(fromRoomAlias){
		fromName = fromRoomAlias;
	}else{
		fromName = contact.name();
	}
	if(msg.type() == wechat.bot.Message.Type.Text){
		if(content == '使用方法'){
			var botString = '机器人使用方法:\n----------';
			botString += '\n1)新系统微信报数';
			botString += '\n2)新系统携程报数';
			botString += '\n3)新系统美团报数';
			botString += '\n4)新系统预约报数';
			botString += '\n5)新系统核销渠道报数';
			botString += '\n6)新系统微信核销报数';
			botString += '\n7)凤凰岭上账统计';
			botString += '\n8)凤凰岭京津冀核销报数';
			botString += '\n9)凤凰岭冰雪票预约报数';
			botString += '\n----------';
			
			room.say(botString);
		}
		
		if(content == '凤凰岭冰雪票预约报数'){
			fhl.getBxYYInfo(room);
		}
		
		if(content == '凤凰岭冰雪票核销报数'){
			var enterpriseCode = 'TgsEpcFhl';
			var ticketGroupNum = 'TGN20201228175937887';
			boss.getCheckTicketInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '凤凰岭京津冀核销报数'){
			fhl.getJJJInfo(room);
		}
		
		if(content == '新系统微信报数'){
			var enterpriseCode = 'TgsEpcFhl';
			var ticketGroupNum = 'TGN20201228152933458';
			fhl.getCheckTicketInfo(enterpriseCode, ticketGroupNum, room, 'WEB');
		}
		
		if(content == '新系统携程报数'){
			var enterpriseCode = 'TgsEpcFhl';
			var ticketGroupNum = 'TGN20201228152933458';
			boss.getCheckTicketInfo(enterpriseCode, ticketGroupNum, room, 'XC');
		}
		
		if(content == '新系统美团报数'){
			var enterpriseCode = 'TgsEpcFhl';
			var ticketGroupNum = 'TGN20201228152933458';
			boss.getCheckTicketInfo(enterpriseCode, ticketGroupNum, room, 'MT');
		}
		
		if(content == '新系统预约报数'){
			var enterpriseCode = 'TgsEpcFhl';
			var ticketGroupNum = 'TGN20201228152933458';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '新系统核销渠道报数'){
			var enterpriseCode = 'TgsEpcFhl';
			var ticketGroupNum = 'TGN20201228152933458';
			fhl.getBossInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '新系统微信核销报数'){
			var enterpriseCode = 'TgsEpcFhl';
			var ticketGroupNum = 'TGN20201228152933458';
			fhl.getCheckTicketInfo(enterpriseCode, ticketGroupNum, room, 'WEB');
		}
		
		if(content == '凤凰岭上账统计'){
			var enterpriseCode = 'TgsEpcFhl';
			var ticketGroupNum = 'TGN20201228152933458';
			boss.getAllTicketsBuyInfo(enterpriseCode, ticketGroupNum, room);
		}
	}
};

function fhlGetWxInfo(host, room){
	var nowDate = new Date().getTime() - (60*60*24*1000);
	nowDate = new Date(nowDate);
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var dateString = year + '-' + month + '-' + day;
	var sDate = year + '-' + month + '-' + day + ' 00:00:00';
	sDate = encodeURI(sDate);
	var eDate = year + '-' + month + '-' + day + ' 23:59:59';
	eDate = encodeURI(eDate);
	const options = {
		hostname: host,
		path: '/phoenixpark/ticketsRobot/getTicketsAppointCollection?startDate='+ sDate + '&endDate='+ eDate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
		var botString;
		botString = '*****凤凰岭微信上账统计*****\n时间：' + dateString;
	    if(res.code == 'SUCCESS'){
			// 全价票收款人数
	    	var h5FullTotal = res.data.h5FullTotal;
			h5FullTotal = h5FullTotal?h5FullTotal:0;
			// 全价票收款总额
			var h5FullTotalMoney = res.data.h5FullTotalMoney;
			h5FullTotalMoney = h5FullTotalMoney?h5FullTotalMoney:0;
			h5FullTotalMoney = parseFloat(h5FullTotalMoney).toFixed(2);
			// 全价票退款人数
			var h5FullRefundTotal = res.data.h5FullRefundTotal;
			h5FullRefundTotal = h5FullRefundTotal?h5FullRefundTotal:0;
			// 全价票退款总额
			var h5FullRefundTotalMoney = res.data.h5FullRefundTotalMoney;
			h5FullRefundTotalMoney = h5FullRefundTotalMoney?h5FullRefundTotalMoney:0;
			h5FullRefundTotalMoney = parseFloat(h5FullRefundTotalMoney).toFixed(2);
			
			// 半价票收款人数
			var h5HalfTotal = res.data.h5HalfTotal;
			h5HalfTotal = h5HalfTotal?h5HalfTotal:0;
			// 半价票收款总额
			var h5HalfTotalMoney = res.data.h5HalfTotalMoney;
			h5HalfTotalMoney = h5HalfTotalMoney?h5HalfTotalMoney:0;
			h5HalfTotalMoney = parseFloat(h5HalfTotalMoney).toFixed(2);
			// 半价票退款人数
			var h5HalfRefundTotal = res.data.h5HalfRefundTotal;
			h5HalfRefundTotal = h5HalfRefundTotal?h5HalfRefundTotal:0;
			// 半价票退款总额
			var h5HalfRefundTotalMoney = res.data.h5HalfRefundTotalMoney;
			h5HalfRefundTotalMoney = h5HalfRefundTotalMoney?h5HalfRefundTotalMoney:0;
			h5HalfRefundTotalMoney = parseFloat(h5HalfRefundTotalMoney).toFixed(2);
			
			// 套票收款人数
			var h5PackageTotal = res.data.h5PackageTotal;
			h5PackageTotal = h5PackageTotal?h5PackageTotal:0;
			// 套票收款总额
			var h5PackageTotalMoney = res.data.h5PackageTotalMoney;
			h5PackageTotalMoney = h5PackageTotalMoney?h5PackageTotalMoney:0;
			h5PackageTotalMoney = parseFloat(h5PackageTotalMoney).toFixed(2);
			// 套票退款人数
			var h5PackageRefundTotal = res.data.h5PackageRefundTotal;
			h5PackageRefundTotal = h5PackageRefundTotal?h5PackageRefundTotal:0;
			// 套票退款总额
			var h5PackageRefundTotalMoney = res.data.h5PackageRefundTotalMoney;
			h5PackageRefundTotalMoney = h5PackageRefundTotalMoney?h5PackageRefundTotalMoney:0;
			h5PackageRefundTotalMoney = parseFloat(h5PackageRefundTotalMoney).toFixed(2);
				
			// 微信上账总额
			var resultMoney = parseFloat(h5FullTotalMoney) + parseFloat(h5HalfTotalMoney) + parseFloat(h5PackageTotalMoney) - parseFloat(h5PackageRefundTotalMoney) - parseFloat(h5FullRefundTotalMoney) - parseFloat(h5HalfRefundTotalMoney);
			resultMoney = parseFloat(resultMoney).toFixed(2);
			botString += '\n微信上账总额：' + resultMoney + '元';
			botString += '\nH5全价票收款：' + h5FullTotal + '人 ' + h5FullTotalMoney + '元';
			botString += '\nH5半价票收款：' + h5HalfTotal + '人 ' + h5HalfTotalMoney + '元';
			botString += '\nH5套票收款：' + h5PackageTotal + '人 ' + h5PackageTotalMoney + '元';
			botString += '\nH5全价票退款：' + h5FullRefundTotal + '人 ' + h5FullRefundTotalMoney + '元';
			botString += '\nH5半价票退款：' + h5HalfRefundTotal + '人 ' + h5HalfRefundTotalMoney + '元';
			botString += '\nH5套票退款：' + h5PackageRefundTotal + '人 ' + h5PackageRefundTotalMoney + '元';
			room.say(botString);
	    }else{
			room.say(res.msg);
		}
	  });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function fhlGetHxInfo(host, room){
	// var nowDate = new Date().getTime() - (60*60*24*1000);
	var nowDate = new Date();
	// nowDate = new Date(nowDate);
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var dateString = year + '-' + month + '-' + day;
	const options = {
		hostname: host,
		path: '/phoenixpark/ticketsRobot/getTicketsCheckCollection?date=' + dateString,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
		var botString;
		botString = '*****凤凰岭核销报数*****\n时间：' + dateString;
	    if(res.code == 'SUCCESS'){
			// 总核销数
	    	var checkTotal = res.data.checkTotal;
			checkTotal = checkTotal?checkTotal:0;
			
			// 携程核销金额
			var xcCheckMoney = res.data.xcCheckMoney;
			xcCheckMoney = xcCheckMoney?xcCheckMoney:0;
			xcCheckMoney = parseFloat(xcCheckMoney).toFixed(2);
			// 携程核销数
			var xcCheckTotal = res.data.xcCheckTotal;
			xcCheckTotal = xcCheckTotal?xcCheckTotal:0;
			
			// H5全价
			var h5FullCheckMoney = res.data.h5FullCheckMoney;
			h5FullCheckMoney = h5FullCheckMoney?h5FullCheckMoney:0;
			h5FullCheckMoney = parseFloat(h5FullCheckMoney).toFixed(2);
			// H5全价
			var h5FullCheckTotal = res.data.h5FullCheckTotal;
			h5FullCheckTotal = h5FullCheckTotal?h5FullCheckTotal:0;
			
			// H5半价
			var h5HalfCheckMoney = res.data.h5HalfCheckMoney;
			h5HalfCheckMoney = h5HalfCheckMoney?h5HalfCheckMoney:0;
			h5HalfCheckMoney = parseFloat(h5HalfCheckMoney).toFixed(2);
			// H5半价
			var h5HalfCheckTotal = res.data.h5HalfCheckTotal;
			h5HalfCheckTotal = h5HalfCheckTotal?h5HalfCheckTotal:0;
			
			// 套票
			var h5DiscountsCheckMoney = res.data.h5DiscountsCheckMoney;
			h5DiscountsCheckMoney = h5DiscountsCheckMoney?h5DiscountsCheckMoney:0;
			h5DiscountsCheckMoney = parseFloat(h5DiscountsCheckMoney).toFixed(2);
			var h5DiscountsCheckTotal = res.data.h5DiscountsCheckTotal;
			h5DiscountsCheckTotal = h5DiscountsCheckTotal?h5DiscountsCheckTotal:0;
				
			// 微信上账总额
			var resultMoney = parseFloat(xcCheckMoney) + parseFloat(h5FullCheckMoney) + parseFloat(h5HalfCheckMoney);
			resultMoney = parseFloat(resultMoney).toFixed(2);
			botString += '\n总核销数：' + checkTotal + '人';
			botString += '\n核销总额：' + resultMoney + '元';
			botString += '\n携程核销：' + xcCheckTotal + '人 ' + xcCheckMoney + '元';
			botString += '\nH5全价核销：' + h5FullCheckTotal + '人 ' + h5FullCheckMoney + '元';
			botString += '\nH5半价核销：' + h5HalfCheckTotal + '人 ' + h5HalfCheckMoney + '元';
			botString += '\nH5套票核销：' + h5DiscountsCheckTotal + '人 ' + h5DiscountsCheckMoney + '元';
			room.say(botString);
	    }else{
			room.say(res.msg);
		}
	  });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function fhlGetAppointmentInfo(host, room){
	const options = {
		hostname: host,
		path: '/phoenixpark/ticketsRobot/getTicketsAppoint',
		method: 'GET'
	};
	const req = http.request(options, (res) => {
	    res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			if(res.code == "SUCCESS"){
				var yearString = new Date().getFullYear();
				var monthString = new Date().getMonth()+1;
				monthString = monthString>9?monthString:'0'+monthString;
				var dayString = new Date().getDate();
				dayString = dayString>9?dayString:'0'+dayString;
				var hourString = new Date().getHours();
				hourString = hourString>9?hourString:'0'+hourString;
				var minutesString = new Date().getMinutes();
				minutesString = minutesString>9?minutesString:'0'+minutesString;
				var secondsString = new Date().getSeconds();
				secondsString = secondsString>9?secondsString:'0'+secondsString;
				var dateString = yearString + '-' + monthString + '-' + dayString + ' ' + hourString + ':' + minutesString + ':' + secondsString;
				var nowDate = new Date().getTime();
				var timeString = 60*60*24*1000;
				var botString = '*****凤凰岭预约报数*****\n日期:'+dateString +'\n';
				for(var i = 0; i < 7; i++){
					if(i > 0){
						nowDate += timeString;
					}
					var year = new Date(nowDate).getFullYear();
					var month = new Date(nowDate).getMonth()+1;
					month = month>9?month:'0'+month;
					var day = new Date(nowDate).getDate();
					day = day>9?day:'0'+day;
					var item = year + '-' + month + '-' + day;
					var totalNumber = res.data[item];
					var wxNumber = totalNumber.split(',')[0];
					wxNumber = wxNumber?wxNumber:0;
					var xcNumber = totalNumber.split(',')[1];
					xcNumber = xcNumber?xcNumber:0;
					botString = botString + item + ':微信' + wxNumber + '人，携程'+ xcNumber +'人\n';
				}
				room.say(botString);
			}else{
				room.say(res.msg);
			}
	    });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

module.exports = {fhlbszRoomDeal};