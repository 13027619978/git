var wechat = require('../mybot.js');
const https = require('https');
const host = "iot.smart-ideas.com.cn";

async function xhgzsbsRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)鲜花港报数\n2)鲜花港核销报数\n3)鲜花港微信上账统计\n4)xxxx-xx-xx鲜花港核销报数\n----------")
		}
		
		// 报数
		if(content == '鲜花港报数'){
			getXhgInfo(host, room);
		}
		
		// 鲜花港核销报数
		if(content == '鲜花港核销报数'){
			getXhghxInfo(host, room);
		}
		
		// 鲜花港微信上账统计
		if(content == '鲜花港微信上账统计'){
			getWxInfo('iotsmart',host, room);
		}
		
		// 鲜花港核销报数
		if(content.indexOf('鲜花港核销报数') != -1 && content.indexOf('-') != -1){
			var dateString = content.split('鲜花港核销报数')[0];
			var year = dateString.split('-')[0];
			var month = dateString.split('-')[1];
			month = parseInt(month);
			month = month>9?month:'0'+month;
			var day = dateString.split('-')[2];
			day = parseInt(day);
			day = day>9?day:'0'+day;
			dateString = year + '-' + month + '-' + day;
			getXhgInfoByDate(host, room, dateString);
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
				// if(parseInt(totalPeople) > 2800){
				// 	totalPeople = randomNum(2500,2800);
				// }
				botString += '\n当日总核销数量：' + totalCheckNumber;
				botString += '\n在园人数：' + totalPeople + '人';
				botString += '\n全价票核销：' + fullCheckNumber + '人';
				botString += '\n半价票核销：' + halfCheckNumber + '人';
				botString += '\n免费票核销：' + freeCheckNumber + '人';
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

// 微信上账
function getWxInfo(parkName, host, room){
	var nowDate = new Date();
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
		path: '/'+parkName+'/ticketsRobot/getTicketsAppointCollection?startDate='+ sDate + '&endDate='+ eDate,
		method: 'GET'
	};
	
	const req = https.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
		var botString;
		if(parkName == 'iotsmart'){
			botString = '*****鲜花港微信上账统计*****\n时间：' + dateString;
		}else{
			botString = '*****水上公园微信上账统计*****\n时间：' + dateString;
		}
	    if(res.code == 'SUCCESS'){
			// 全价票收款人数
	    	var fullTotal = res.data.fullTotal;
			fullTotal = fullTotal?fullTotal:0;
			// 全价票收款总额
			var fullTotalMoney = res.data.fullTotalMoney;
			fullTotalMoney = fullTotalMoney?fullTotalMoney:0;
			fullTotalMoney = parseFloat(fullTotalMoney).toFixed(2);
			// 全价票退款人数
			var fullRefundTotal = res.data.fullRefundTotal;
			fullRefundTotal = fullRefundTotal?fullRefundTotal:0;
			// 全价票退款总额
			var fullRefundTotalMoney = res.data.fullRefundTotalMoney;
			fullRefundTotalMoney = fullRefundTotalMoney?fullRefundTotalMoney:0;
			fullRefundTotalMoney = parseFloat(fullRefundTotalMoney).toFixed(2);
			// 半价票收款人数
			var halfTotal = res.data.halfTotal;
			halfTotal = halfTotal?halfTotal:0;
			// 半价票收款总额
			var halfTotalMoney = res.data.halfTotalMoney;
			halfTotalMoney = halfTotalMoney?halfTotalMoney:0;
			halfTotalMoney = parseFloat(halfTotalMoney).toFixed(2);
			// 半价票退款人数
			var halfRefundTotal = res.data.halfRefundTotal;
			halfRefundTotal = halfRefundTotal?halfRefundTotal:0;
			// 半价票退款总额
			var halfRefundTotalMoney = res.data.halfRefundTotalMoney;
			halfRefundTotalMoney = halfRefundTotalMoney?halfRefundTotalMoney:0;
			halfRefundTotalMoney = parseFloat(halfRefundTotalMoney).toFixed(2);
			// 微信上账总额
			var resultMoney = parseFloat(fullTotalMoney) + parseFloat(halfTotalMoney) - parseFloat(fullRefundTotalMoney) - parseFloat(halfRefundTotalMoney);
			resultMoney = parseFloat(resultMoney).toFixed(2);
			botString += '\n微信上账总额：' + resultMoney + '元';
			botString += '\n全价票收款：' + fullTotal + '人 ' + fullTotalMoney + '元';
			botString += '\n半价票收款：' + halfTotal + '人 ' + halfTotalMoney + '元';
			botString += '\n全价票退票：' + fullRefundTotal + '人 ' + fullRefundTotalMoney + '元';
			botString += '\n半价票退款：' + halfRefundTotal + '人 ' + halfRefundTotalMoney + '元';
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

// 鲜花港核销报数
function getXhghxInfo(host, room){
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
			var botString = '*****鲜花港核销报数*****\n时间：' + dateString;
			if(res.code == "SUCCESS"){
				var totalCheckNumber = res.data.totalCheckNumber;
				totalCheckNumber = totalCheckNumber?totalCheckNumber:0;
				var totalPeople = res.data.totalPeople;
				totalPeople = totalPeople?totalPeople:0;
				var fullCheckNumber = res.data.fullCheckNumber;
				fullCheckNumber = fullCheckNumber?fullCheckNumber:0;
				var fullCheckMoney = res.data.fullCheckMoney;
				fullCheckMoney = fullCheckMoney?fullCheckMoney:0;
				fullCheckMoney = parseFloat(fullCheckMoney).toFixed(2);
				var halfCheckNumber = res.data.halfCheckNumber;
				halfCheckNumber = halfCheckNumber?halfCheckNumber:0;
				var halfCheckMoney = res.data.halfCheckMoney;
				halfCheckMoney = halfCheckMoney?halfCheckMoney:0;
				halfCheckMoney = parseFloat(halfCheckMoney).toFixed(2);
				var freeCheckNumber = res.data.freeCheckNumber;
				freeCheckNumber = freeCheckNumber?freeCheckNumber:0;
				var cardCheckNumber = res.data.cardCheckNumber;
				cardCheckNumber = cardCheckNumber?cardCheckNumber:0;
				var mtCheckNumber = res.data.mtCheckNumber;
				mtCheckNumber = mtCheckNumber?mtCheckNumber:0;
				var mtCheckMoney = res.data.mtCheckMoney;
				mtCheckMoney = mtCheckMoney?mtCheckMoney:0;
				mtCheckMoney = parseFloat(mtCheckMoney).toFixed(2);
				var xcCheckNumber = res.data.xcCheckNumber;
				xcCheckNumber = xcCheckNumber?xcCheckNumber:0;
				var xcCheckMoney = res.data.xcCheckMoney;
				xcCheckMoney = xcCheckMoney?xcCheckMoney:0;
				xcCheckMoney = parseFloat(xcCheckMoney).toFixed(2);
				var windowCheckNumber = res.data.windowCheckNumber;
				windowCheckNumber = windowCheckNumber?windowCheckNumber:0;
				var windowCheckMoney = res.data.windowCheckMoney;
				windowCheckMoney = windowCheckMoney?windowCheckMoney:0;
				windowCheckMoney = parseFloat(windowCheckMoney).toFixed(2);
				
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
				// botString += '\n当日总核销数量：' + totalCheckNumber;
				// botString += '\n在园人数：' + totalPeople + '人';
				botString += '\n鲜花港全价票核销：' + fullCheckNumber + '人 ' + fullCheckMoney + '元';
				botString += '\n鲜花港半价票核销：' + halfCheckNumber + '人 ' + halfCheckMoney + '元';
				botString += '\n鲜花港免费票核销：' + freeCheckNumber + '人 ';
				botString += '\n鲜花港+蝶·恋花馆成人票核销：' + xhgDlhCheckNumber + '人 ' + xhgDlhCheckMoney + '元';
				botString += '\n各类卡核销：' + cardCheckNumber + '人 ';
				botString += '\n美团核销：' + mtCheckNumber + '人 ' + mtCheckMoney + '元';
				botString += '\n携程核销：' + xcCheckNumber + '人 ' + xcCheckMoney + '元';
				botString += '\n窗口核销：' + windowCheckNumber + '人 ' + windowCheckMoney + '元';
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

function getXhgInfoByDate(host, room, date){
	var sDate = date + ' 00:00:00';
	sDate = encodeURI(sDate);
	var eDate = date + ' 23:59:59';
	eDate = encodeURI(eDate);
	const options = {
		hostname: host,
		path: '/iotsmart/ticketsRobot/getTicketsCheckCollectionByDate?startDate=' + sDate + '&endDate=' + eDate,
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
			var dateString = date;
			var botString = '*****鲜花港核销报数*****\n时间：' + dateString;
			if(res.code == "SUCCESS"){
				var totalCheckNumber = res.data.totalCheckNumber;
				totalCheckNumber = totalCheckNumber?totalCheckNumber:0;
				var totalPeople = res.data.totalPeople;
				totalPeople = totalPeople?totalPeople:0;
				var fullCheckNumber = res.data.fullCheckNumber;
				fullCheckNumber = fullCheckNumber?fullCheckNumber:0;
				var fullCheckMoney = res.data.fullCheckMoney;
				fullCheckMoney = fullCheckMoney?fullCheckMoney:0;
				fullCheckMoney = parseFloat(fullCheckMoney).toFixed(2);
				var halfCheckNumber = res.data.halfCheckNumber;
				halfCheckNumber = halfCheckNumber?halfCheckNumber:0;
				var halfCheckMoney = res.data.halfCheckMoney;
				halfCheckMoney = halfCheckMoney?halfCheckMoney:0;
				halfCheckMoney = parseFloat(halfCheckMoney).toFixed(2);
				var freeCheckNumber = res.data.freeCheckNumber;
				freeCheckNumber = freeCheckNumber?freeCheckNumber:0;
				var cardCheckNumber = res.data.cardCheckNumber;
				cardCheckNumber = cardCheckNumber?cardCheckNumber:0;
				var mtCheckNumber = res.data.mtCheckNumber;
				mtCheckNumber = mtCheckNumber?mtCheckNumber:0;
				var mtCheckMoney = res.data.mtCheckMoney;
				mtCheckMoney = mtCheckMoney?mtCheckMoney:0;
				mtCheckMoney = parseFloat(mtCheckMoney).toFixed(2);
				var xcCheckNumber = res.data.xcCheckNumber;
				xcCheckNumber = xcCheckNumber?xcCheckNumber:0;
				var xcCheckMoney = res.data.xcCheckMoney;
				xcCheckMoney = xcCheckMoney?xcCheckMoney:0;
				xcCheckMoney = parseFloat(xcCheckMoney).toFixed(2);
				var windowCheckNumber = res.data.windowCheckNumber;
				windowCheckNumber = windowCheckNumber?windowCheckNumber:0;
				var windowCheckMoney = res.data.windowCheckMoney;
				windowCheckMoney = windowCheckMoney?windowCheckMoney:0;
				windowCheckMoney = parseFloat(windowCheckMoney).toFixed(2);
				// botString += '\n当日总核销数量：' + totalCheckNumber;
				// botString += '\n在园人数：' + totalPeople + '人';
				botString += '\n全价票核销：' + fullCheckNumber + '人 ' + fullCheckMoney + '元';
				botString += '\n半价票核销：' + halfCheckNumber + '人 ' + halfCheckMoney + '元';
				botString += '\n免费票核销：' + freeCheckNumber + '人 ';
				botString += '\n各类卡核销：' + cardCheckNumber + '人 ';
				botString += '\n美团核销：' + mtCheckNumber + '人 ' + mtCheckMoney + '元';
				botString += '\n携程核销：' + xcCheckNumber + '人 ' + xcCheckMoney + '元';
				botString += '\n窗口核销：' + windowCheckNumber + '人 ' + windowCheckMoney + '元';
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

module.exports = {xhgzsbsRoomDeal};