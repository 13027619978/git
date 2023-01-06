const http = require('http');
const host = "lease.smart-ideas.com.cn";
const axios = require('axios');

// 获取上下午预约报数
function getYYInfoByTime(room){
	let swList = '';
	let zwList = '';
	let xwList = '';
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
	var sDate = year + '-' + month + '-' + day;
	var searchSdate = encodeURI(sDate);
	var endDate = new Date(new Date(sDate + ' 00:00:00').getTime() + (1000*60*60*24*7));
	var eYear = endDate.getFullYear();
	var eMonth = endDate.getMonth() + 1;
	eMonth = eMonth>9?eMonth:'0'+eMonth;
	var eDay = endDate.getDate();
	eDay = eDay>9?eDay:'0'+eDay;
	var eDate = eYear + '-' + eMonth + '-' + eDay;
	var searchEdate = encodeURI(eDate);
	var botDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	let yyList = [];
	axios.get('https://boss.smart-ideas.com.cn/ticketApi/robotCollection/appoint/get?enterpriseCode=TgsEpcBxyyz&ticketGroupNum=TGN20221212130359909&startTime='+ searchSdate +'&endTime='+ searchEdate +'&ticketInfoId=' + swList)
		.then(function(res){
			let checkList = res.data.data;
			var botString = '*****颐和园冰场预约报数*****\n日期:'+botDate+'\n';
			checkList.forEach(function(value, key){
				let yyItem = {};
				yyItem.sw = value.appointQuantity;
				yyList.push(yyItem)
			})
			axios.get('https://boss.smart-ideas.com.cn/ticketApi/robotCollection/appoint/get?enterpriseCode=TgsEpcBxyyz&ticketGroupNum=TGN20221212130359909&startTime='+ searchSdate +'&endTime='+ searchEdate +'&ticketInfoId=' + zwList)
				.then(function(res){
					let checkList = res.data.data;
					checkList.forEach(function(value, key){
						yyList[key].zw = value.appointQuantity;
					})
					axios.get('https://boss.smart-ideas.com.cn/ticketApi/robotCollection/appoint/get?enterpriseCode=TgsEpcBxyyz&ticketGroupNum=TGN20221212130359909&startTime='+ searchSdate +'&endTime='+ searchEdate +'&ticketInfoId=' + xwList)
						.then(function(res){
							let checkList = res.data.data;
							let timeList = [];
							checkList.forEach(function(value, key){
								yyList[key].xw = value.appointQuantity;
								timeList.push(value.appointDate);
							})
							yyList.forEach(function(value, key){
								botString += timeList[key] + '上午：' + value.sw + '人\n';
								botString += timeList[key] + '中午：' + value.zw + '人\n';
								botString += timeList[key] + '下午：' + value.xw + '人\n';
							})
							room.say(botString);
						})
						.catch(function(err){
							console.log(err);
						})
				})
				.catch(function(err){
					console.log(err);
				})
			
		})
		.catch(function(err){
			console.log(err);
		})
}

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
			let botString = '*****颐和园租赁报数*****\n日期:'+eDate;
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
	var parkName = '颐和园冰场';
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
		path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=TgsEpcBxyyz&ticketGroupNum=TGN20221212130359909&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate + '&ticketSalesChannelsNum=TC',
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
	refundByOrder,
	getYYInfoByTime
}