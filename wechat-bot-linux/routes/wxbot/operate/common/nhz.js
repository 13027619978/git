const http = require('http');
const axios = require('axios');


function getCheckTicketInfo(enterpriseCode, ticketGroupNum, room, ticketSalesChannelsNum){
	var parkName = '南海子';
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
	if(ticketSalesChannelsNum){
		options = {
			hostname: 'boss.smart-ideas.com.cn',
			path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate + '&ticketSalesChannelsNum=' + ticketSalesChannelsNum,
			method: 'GET'
		};
	}else{
		options = {
			hostname: 'boss.smart-ideas.com.cn',
			path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
			method: 'GET'
		};
	}
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var checkList = res.data;
			var botString = '*****'+ parkName +'核销报数*****\n日期:'+eDate +'\n';
			if(ticketSalesChannelsNum == 'WEB'){
				botString = '*****'+ parkName +'微信核销报数*****\n日期:'+eDate +'\n';
			}else if(ticketSalesChannelsNum == 'XC'){
				botString = '*****'+ parkName +'携程核销报数*****\n日期:'+eDate +'\n';
			}else if(ticketSalesChannelsNum == 'MT'){
				botString = '*****'+ parkName +'美团核销报数*****\n日期:'+eDate +'\n';
			}
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
	getCheckTicketInfo
}