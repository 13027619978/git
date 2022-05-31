var util = require('util');
const http = require('http');
const host = "iot.smart-ideas.com.cn";

function getIncome(room){
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
	var nowTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	var startDate = encodeURI(year + '-' + month + '-' + day + ' 00:00:00');
	var endDate = encodeURI(nowTime);
	const options = {
		hostname: host,
		path: '/ssgy/snowCircleOrder/getIncome?startDate=' + startDate + '&endDate=' + endDate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var hincome = parseFloat(res.data.hincome).toFixed(2);
			var eincome = parseFloat(res.data.eincome).toFixed(2);
			var totalIncome = parseFloat(hincome) + parseFloat(eincome);
			totalIncome = totalIncome.toFixed(2);
			var botString = '';
			botString += '*****雪圈报数*****\n';
			botString += '时间：' + nowTime + '\n';
			botString += '总金额：' + totalIncome + '\n';
			botString += '100元票：' + hincome + '\n';
			botString += '80元票：' + eincome;
			try{
				room.say(botString);
			}catch(e){
				
			}
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});

	req.end();
}

// 微信核销报数
function getVxIncome(room){
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
	var nowTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	var startDate = encodeURI(year + '-' + month + '-' + day + ' 00:00:00');
	var endDate = encodeURI(nowTime);
	let options = {
		hostname: 'boss.smart-ideas.com.cn',
		path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=TgsEpcSlfz&ticketGroupNum=TGN20200907203336045&checkStartTime=' + startDate + '&checkEndTime=' + endDate + '&ticketSalesChannelsNum=WEB',
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var checkList = res.data;
			var ListString = '';
			var totalMoney = 0;
			var totalNumber = 0;
			checkList.forEach(function(value, key){
				var money = parseFloat(value.checkMoney);
				var number = parseInt(value.checkQuantity);
				var ticketName = value.name;
				if(ticketName == '顺奥冰世界' || ticketName == '水奥雪世界'){
					totalMoney += money;
					totalNumber += number;
					ListString += ticketName + '：' + number + '张   ' + money.toFixed(2) + '元\n';
				}
			})
			if(ListString.indexOf('顺奥冰世界') == -1 && ListString.indexOf('水奥雪世界') == -1){
				ListString = '顺奥冰世界：0张 0元\n';
			}else{
				if(ListString.indexOf('顺奥冰世界') == -1){
					ListString += '顺奥冰世界：0张 0元';
				}
			}
			getXsjIncome(ListString,totalNumber,totalMoney,room);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function getXsjIncome(ListString,totalNumber,totalMoney,room){
	var nowDate = new Date();
	var nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var nowHour = nowDate.getHours();
	nowHour = nowHour>9?nowHour:'0'+nowHour;
	var nowMinutes = nowDate.getMinutes();
	nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
	var nowSeconds = nowDate.getSeconds();
	nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
	var startTime = nowDate.getFullYear() + '-' + nowMonth + '-' + nowDay + ' 00:00:00';
	startTime = encodeURI(startTime);
	var endTime = nowDate.getFullYear() + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	var eDate = nowDate.getFullYear() + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;;
	endTime = encodeURI(endTime);
	var botDate = nowDate.getFullYear() + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	const options = {
		hostname: 'boss.smart-ideas.com.cn',
		path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=TgsEpcSsgy&ticketGroupNum=TGN20211201163921241&checkStartTime=' + startTime + '&checkEndTime=' + endTime,
		method: 'GET'
	};
	
	var buffers = [];
	var nread = 0;
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			buffers.push(d);
			nread += d.length;
		});
		res.on('end', () => {
			var buffer = null;
			switch(buffers.length) {
				case 0: buffer = new Buffer(0);
					break;
				case 1: buffer = buffers[0];
					break;
				default:
					buffer = new Buffer(nread);
					for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
						var chunk = buffers[i];
						chunk.copy(buffer, pos);
						pos += chunk.length;
					}
				break;
			}
			var res = JSON.parse(buffer.toString());
			var nameList = ListString;
			var botString = '*****水上公园微信核销报数*****\n日期:'+eDate +'\n';
			var xsjTotal = 0;
			var xsjTotalMoney = 0;
			res.data.forEach(function(value, key){
				if(value.name.indexOf('雪地悠波球') == -1 && value.name.indexOf('雪地转转') == -1){
					totalNumber += parseInt(value.checkQuantity);
					totalMoney += parseFloat(value.checkMoney);
					xsjTotal += parseInt(value.checkQuantity);
					xsjTotalMoney += parseFloat(value.checkMoney);
				}
			})
			nameList += '水上公园雪世界：' + xsjTotal + '张 '+ xsjTotalMoney +'元\n'; 
			botString += '总检票：' + totalNumber + '\n总金额：' + totalMoney + '元\n------------------\n';
			botString += nameList;
			try{
				room.say(botString);
			}catch(e){
				
			}
		})
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

// 雪世界上账统计
function getXsjSzIncome(room){
	var nowDate = new Date();
	var nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var nowHour = nowDate.getHours();
	nowHour = nowHour>9?nowHour:'0'+nowHour;
	var nowMinutes = nowDate.getMinutes();
	nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
	var nowSeconds = nowDate.getSeconds();
	nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
	var startTime = nowDate.getFullYear() + '-' + nowMonth + '-' + nowDay + ' 00:00:00';
	startTime = encodeURI(startTime);
	var endTime = nowDate.getFullYear() + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	endTime = encodeURI(endTime);
	var botDate = nowDate.getFullYear() + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	const options = {
		hostname: 'boss.smart-ideas.com.cn',
		path: '/ticketApi/robotCollection/name/sale/get?enterpriseCode=TgsEpcSsgy&ticketGroupNum=TGN20211201163921241&startTime=' + startTime + '&endTime=' + endTime,
		method: 'GET'
	};
	
	var buffers = [];
	var nread = 0;
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			buffers.push(d);
			nread += d.length;
		});
		res.on('end', () => {
			var buffer = null;
			switch(buffers.length) {
				case 0: buffer = new Buffer(0);
					break;
				case 1: buffer = buffers[0];
					break;
				default:
					buffer = new Buffer(nread);
					for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
						var chunk = buffers[i];
						chunk.copy(buffer, pos);
						pos += chunk.length;
					}
				break;
			}
			var res = JSON.parse(buffer.toString());
			var botMpString = '*****水上公园雪世界门票上账报数*****\n时间:'+botDate +'\n------------------\n';
			var botXdString = '*****水上公园雪世界雪地项目上账报数*****\n时间:'+botDate +'\n------------------\n'
			var nameList = '';
			var mpNameList = '';
			var xdNameList = '';
			var totalNumber = 0;
			var totalMoney = 0;
			var mpTotalNumber = 0;
			var mpTotalMoney = 0;
			var xdTotalNumber = 0;
			var xdTotalMoney = 0;
			res.data.forEach(function(value, key){
				if(value.ticketName.indexOf('雪地悠波球') == -1 && value.ticketName.indexOf('雪地转转') == -1){
					mpTotalNumber += parseInt(value.totalQuantity);
					mpTotalMoney += parseFloat(value.totalMoney);
					mpNameList += value.ticketName + '：' + value.totalQuantity + '张 '+ value.totalMoney +'元\n'; 
				}else{
					xdTotalNumber += parseInt(value.totalQuantity);
					xdTotalMoney += parseFloat(value.totalMoney);
					xdNameList += value.ticketName + '：' + value.totalQuantity + '张 '+ value.totalMoney +'元\n'; 
				}
			})
			botMpString += '总数量：' + mpTotalNumber + '\n总金额：' + mpTotalMoney + '元\n------------------\n';
			botMpString += mpNameList;
			botXdString += '总数量：' + xdTotalNumber + '\n总金额：' + xdTotalMoney + '元\n------------------\n';
			botXdString += xdNameList;
			try{
				room.say(botMpString);
				room.say(botXdString);
			}catch(e){
				
			}
		})
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

module.exports = {getIncome, getVxIncome, getXsjSzIncome};