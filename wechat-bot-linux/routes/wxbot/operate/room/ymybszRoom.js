var wechat = require('../mybot.js');
const http = require('http');
const host = "api.smart-ideas.com.cn";
const boss = require('../common/boss.js');

async function ymybszRoomDeal(msg){
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
		//使用方法
		if(content == '使用方法'){
			room.say("机器人使用方法:\n----------\n1)圆明园报数\n2)正觉寺入园票报数\n3)正觉寺入园票预约报数\n4)正觉寺核销渠道报数\n----------");
		}
		
		if(content == '圆明园报数'){
			getymyInfo(host, room);
		}
		
		if(content == '正觉寺入园票报数'){
			var enterpriseCode = 'TgsEpcYmy';
			var ticketGroupNum = 'TGN20201125101904070';
			boss.getTicketInfo(enterpriseCode, ticketGroupNum, 'MINI', room);
		}
		
		if(content == '正觉寺核销渠道报数'){
			var enterpriseCode = 'TgsEpcYmy';
			var ticketGroupNum = 'TGN20201125101904070';
			boss.getBossInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '正觉寺入园票预约报数'){
			var enterpriseCode = 'TgsEpcYmy';
			var ticketGroupNum = 'TGN20201125101904070';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
	}
};

function getymyInfo(host, room){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var hour = nowDate.getHours();
	hour = hour>9?hour:'0'+hour;
	var minutes = nowDate.getMinutes();
	minutes = minutes>9?minutes:'0'+minutes;
	var seconds = nowDate.getSeconds();
	seconds = seconds>9?seconds:'0'+seconds;
	var sDate = year + '-' + month + '-' + day + ' 00:00:00';
	var eDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	var searchSdate = encodeURI(sDate);
	var searchEdate = encodeURI(eDate);
	const options = {
		hostname: host,
		path: '/ymypark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
		console.log(res);
	    if(res.code == "SUCCESS"){
			var bicycleIncome = res.data.bicycleIncome;
			bicycleIncome = bicycleIncome?parseFloat(bicycleIncome).toFixed(2):'0.00';
			var driveShipIncome = res.data.driveShipIncome;
			driveShipIncome = driveShipIncome?parseFloat(driveShipIncome).toFixed(2):'0.00';
			var loopShipIncome = res.data.loopShipIncome;
			loopShipIncome = loopShipIncome?parseFloat(loopShipIncome).toFixed(2):'0.00';
			var batteryCarIncome = res.data.batteryCarIncome;
			batteryCarIncome = batteryCarIncome?parseFloat(batteryCarIncome).toFixed(2):'0.00';
	    	var botString = '*****圆明园报数*****\n日期:'+eDate +'\n';
			botString += '自行车收入：' + bicycleIncome + '元\n';
			botString += '自驾船收入：' + driveShipIncome + '元\n';
			botString += '交通船收入：' + loopShipIncome + '元\n';
			botString += '电瓶车收入：' + batteryCarIncome + '元';
			room.say(botString);
	    }
	  });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

module.exports = {ymybszRoomDeal};