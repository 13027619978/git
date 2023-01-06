const http = require('http');
const host = "lease.smart-ideas.com.cn";
const axios = require('axios');

function refundByOrder(orderCode, refundMoney, room){
	axios.post('http://rent.smart-ideas.com.cn/yhypark/leaseOrder/robot/refund', {orderCode: orderCode, refundMoney: refundMoney})
		.then(function(res){
			room.say(res.data.msg);
		})
		.catch(function(err){
			console.log(err);
		})
}

function getLeaseInfo(room){
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
	axios.get('http://rent.smart-ideas.com.cn/yhypark/leaseOrder/robot/collection?startDate='+sDate+'&endDate='+eDate)
		.then(function(res){
			console.log(res);
			let botString = '*****陶然亭租赁报数*****\n日期:'+eDate;
			res.data.data.forEach(function(value, key){
				botString += '\n' + value.name + '：' + value.money + '元';
			})
			room.say(botString);
		})
		.catch(function(err){
			console.log(err);
		})
}

function getCheckTicketInfo(room){
	var parkName = '陶然亭冰场';
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
	let options;
	options = {
		hostname: 'boss.smart-ideas.com.cn',
		path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=TgsEpcHlldga&ticketGroupNum=TGN20221220141005129&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate + '&ticketSalesChannelsNum=TC',
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var checkList = res.data;
			var botString = '*****'+ parkName +'核销报数*****\n日期:'+eDate +'\n';
			var ListString = '';
			var totalMoney = 0;
			var totalNumber = 0;
			checkList.forEach(function(value, key){
				var money = parseFloat(value.checkMoney);
				var number = parseInt(value.checkQuantity);
				var ticketName = value.name;
				totalMoney += money;
				totalNumber += number;
				ListString += ticketName + '：' + number + '张   ' + money.toFixed(2) + '元\n';
			})
			botString += '总检票：' + totalNumber + '张\n';
			botString += '总检票金额：' + parseFloat(totalMoney).toFixed(2) + '元\n';
			botString += '--------------------\n';
			botString += ListString;
			room.say(botString);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

module.exports = {
	getCheckTicketInfo,
	getLeaseInfo,
	refundByOrder
}