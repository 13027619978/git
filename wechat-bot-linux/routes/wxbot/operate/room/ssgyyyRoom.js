var wechat = require('../mybot.js');
const https = require('https');
const boss = require('../common/boss.js');

async function ssgyyyRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)水上公园预约报数\n2)水上公园报数\n----------")		
		}
		
		// 预约报数
		if(content == '水上公园预约报数'){
			var enterpriseCode = 'TgsEpcSlfz';
			var ticketGroupNum = 'TGN20200907203336045';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		// 报数
		if(content == '水上公园报数'){
			var enterpriseCode = 'TgsEpcSlfz';
			var ticketGroupNum = 'TGN20200907203336045';
			boss.getBossPeoPleInfo(enterpriseCode, ticketGroupNum, room);
		}
	}
};

// 水上公园核销报数
function getSsgyInfo(host, room){
	const options = {
		hostname: host,
		path: '/iotsmart/ticketsRobot/getSsgyOtaCheckCollection',
		method: 'GET'
	};
	const req = https.request(options, (res) => {
	    res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			console.log(res);
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
			var dateString = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
			var botString = '*****水上公园报数*****\n时间：' + dateString;
			if(res.code == "SUCCESS"){
				var mtCheckNumber = res.data.mtCheckNumber;
				mtCheckNumber = mtCheckNumber?mtCheckNumber:0;
				var xcCheckNumber = res.data.xcCheckNumber;
				xcCheckNumber = xcCheckNumber?xcCheckNumber:0;
				const options1 = {
					hostname: host,
					path: '/ssgy/ticketsRobot/getTicketsCheckCollection',
					method: 'GET'
				};
				
				const req1 = https.request(options1, (resp) => {
					resp.on('data', (d1) => {
						var res1 = JSON.parse(d1.toString());
						console.log(res1);
						if(res1.code == "SUCCESS"){
							var totalCheckNumber = res1.data.totalCheckNumber;
							totalCheckNumber = totalCheckNumber?totalCheckNumber:0;
							var fullCheckNumber = res1.data.fullCheckNumber;
							fullCheckNumber = fullCheckNumber?fullCheckNumber:0;
							var halfCheckNumber = res1.data.halfCheckNumber;
							halfCheckNumber = halfCheckNumber?halfCheckNumber:0;
							var freeCheckNumber = res1.data.freeCheckNumber;
							freeCheckNumber = freeCheckNumber?freeCheckNumber:0;
							var cardCheckNumber = res1.data.cardCheckNumber;
							cardCheckNumber = cardCheckNumber?cardCheckNumber:0;
							var windowCheckNumber = res1.data.windowCheckNumber;
							windowCheckNumber = windowCheckNumber?windowCheckNumber:0;
							totalCheckNumber = parseInt(totalCheckNumber) + parseInt(mtCheckNumber) + parseInt(xcCheckNumber);
							botString += '\n当日总核销数量：' + totalCheckNumber;
							botString += '\n全价票核销：' + fullCheckNumber + '人';
							botString += '\n半价票核销：' + halfCheckNumber + '人';
							botString += '\n免费票核销：' + freeCheckNumber + '人';
							botString += '\n各类卡核销：' + cardCheckNumber + '人';
							botString += '\n美团核销：' + mtCheckNumber + '人';
							botString += '\n携程核销：' + xcCheckNumber + '人';
							botString += '\n窗口核销：' + windowCheckNumber + '人';
							room.say(botString);
						}else{
							room.say(res.msg);
						}
					})
				})
				
				req1.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req1.end();
			}
	    });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

module.exports = {ssgyyyRoomDeal};