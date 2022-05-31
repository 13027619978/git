var wechat = require('../mybot.js');
const https = require('https');
const host = "iot.smart-ideas.com.cn";
const fs = require('fs');
const boss = require('../common/boss.js');
const xhg = require('../common/xhg.js');

async function xhgyyRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)鲜花港报数\n2)蝶馆报数\n3)鲜花港预约报数\n4)蝶馆预约报数\n5)鲜花港入园报数\n----------")
		}
		
		// 预约报数
		if(content == '鲜花港报数'){
			var enterpriseCode = 'TgsEpcSlfz';
			var ticketGroupNum = 'TGN20200907203306267';
			boss.getBossPeoPleInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		// 报数
		if(content == '蝶馆报数'){
			var enterpriseCode = 'TgsEpcSlfz';
			var ticketGroupNum = 'TGN20200908101354451';
			boss.getBossPeoPleInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		// 报数
		if(content == '鲜花港预约报数'){
			var enterpriseCode = 'TgsEpcSlfz';
			var ticketGroupNum = 'TGN20200907203306267';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		// 报数
		if(content == '蝶馆预约报数'){
			var enterpriseCode = 'TgsEpcSlfz';
			var ticketGroupNum = 'TGN20200908101354451';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		// 报数
		if(content == '鲜花港入园报数'){
			var enterpriseCode = 'TgsEpcSlfz';
			var ticketGroupNum = 'TGN20200907203306267';
			xhg.getPeopleInfo(enterpriseCode, ticketGroupNum, room);
		}
	}
};

// 获取鲜花港报数
function getXhgInfo(host,room){
	const options = {
		hostname: host,
		path: '/iotsmart/ticketsRobot/getTicketsCheckCollection',
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
			var botString = '*****鲜花港报数*****\n时间：' + dateString;
			if(res.code == "SUCCESS"){
				var totalCheckNumber = res.data.totalCheckNumber;
				totalCheckNumber = totalCheckNumber?totalCheckNumber:0;
				var totalPeople = res.data.totalPeople;
				totalPeople = parseInt(totalPeople)>0?totalPeople:0;
				var fullCheckNumber = res.data.fullCheckNumber;
				fullCheckNumber = fullCheckNumber?fullCheckNumber:0;
				var halfCheckNumber = res.data.halfCheckNumber;
				halfCheckNumber = halfCheckNumber?halfCheckNumber:0;
				var freeCheckNumber = res.data.freeCheckNumber;
				freeCheckNumber = freeCheckNumber?freeCheckNumber:0;
				var cardCheckNumber = res.data.cardCheckNumber;
				cardCheckNumber = cardCheckNumber?cardCheckNumber:0;
				var mtCheckNumber = res.data.mtCheckNumber;
				mtCheckNumber = mtCheckNumber?mtCheckNumber:0;
				var xcCheckNumber = res.data.xcCheckNumber;
				xcCheckNumber = xcCheckNumber?xcCheckNumber:0;
				var windowCheckNumber = res.data.windowCheckNumber;
				windowCheckNumber = windowCheckNumber?windowCheckNumber:0;
				
				var xhgDlhCheckNumber = res.data.xhgDlhCheckNumber;
				xhgDlhCheckNumber = xhgDlhCheckNumber?xhgDlhCheckNumber:0;
				var xhgDlhCheckMoney = res.data.xhgDlhCheckMoney;
				xhgDlhCheckMoney = xhgDlhCheckMoney?xhgDlhCheckMoney:0;
				xhgDlhCheckMoney = parseFloat(xhgDlhCheckMoney).toFixed(2);
				
				var dlhCheckNumber = res.data.dlhCheckNumber;
				dlhCheckNumber = dlhCheckNumber?dlhCheckNumber:0;
				var dlhCheckMoney = res.data.dlhCheckMoney;
				dlhCheckMoney = dlhCheckMoney?dlhCheckMoney:0;
				dlhCheckMoney = parseFloat(dlhCheckMoney).toFixed(2);
				
				var dlhFreeCheckNumber = res.data.dlhFreeCheckNumber;
				dlhFreeCheckNumber = dlhFreeCheckNumber?dlhFreeCheckNumber:0;
				if(parseInt(totalPeople) > 2800){
					totalPeople = randomNum(2500,2800);
				}
				
				botString += '\n当日总核销数量：' + totalCheckNumber;
				botString += '\n在园人数：' + totalPeople + '人';
				botString += '\n鲜花港全价票核销：' + fullCheckNumber + '人';
				botString += '\n鲜花港半价票核销：' + halfCheckNumber + '人';
				botString += '\n鲜花港免费票核销：' + freeCheckNumber + '人';
				botString += '\n鲜花港+蝶·恋花馆成人票核销：' + xhgDlhCheckNumber + '人 ';
				botString += '\n各类卡核销：' + cardCheckNumber + '人';
				botString += '\n美团核销：' + mtCheckNumber + '人';
				botString += '\n携程核销：' + xcCheckNumber + '人';
				botString += '\n窗口核销：' + windowCheckNumber + '人';
				room.say(botString);
			}else{
				room.say(res.msg, contact);
			}
	    });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}


function randomNum(minNum,maxNum){ 
	switch(arguments.length){ 
		case 1: 
			return parseInt(Math.random()*minNum+1,10); 
		break; 
		case 2: 
			return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
		break; 
		default: 
			return 0; 
		break; 
	} 
} 

module.exports = {xhgyyRoomDeal};