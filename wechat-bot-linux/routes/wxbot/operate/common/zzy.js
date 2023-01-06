const http = require('http');
const host = "lease.smart-ideas.com.cn";
const axios = require('axios');

// 获取上下午预约报数
function getYYInfoByTime(room){
	let swList = '2c9141f484a761f60184e1cc194269b7,2c9141f484a761f60184e1ccf6af69b9,2c9141f484a761f60184e1cdbd9269bb,2c9141f484a761f60184e1ce7d4b69bd,2c9141f484a761f60184e1cf304169bf,2c9141f484a761f60184e1cfeda669c1,2c9141f484a761f60184e1d0c15469c8';
	let zwList = '2c9141f48537e5be0185525bd9c83d15,2c9141f48537e5be0185525e29973d75,2c9141f48537e5be018552623f3a3df6,2c9141f48537e5be01855267e54a3e92,2c9141f48537e5be01855269c3853eb7,2c9141f48537e5be0185526badbb3ed5,2c9141f48537e5be0185526570c73e58';
	let xwList = '2c9141f48537e5be0185525cacaf3d45,2c9141f48537e5be0185526622eb3e6e,2c9141f48537e5be0185526314623e18,2c9141f48537e5be018552688be53e9a,2c9141f48537e5be0185526a5b6b3ebc,2c9141f48537e5be0185526c50553ee6,2c9141f48537e5be0185525f28293d87';
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
	axios.get('https://boss.smart-ideas.com.cn/ticketApi/robotCollection/appoint/get?enterpriseCode=TgsEpcBxyyz&ticketGroupNum=TGN20221205175851713&startTime='+ searchSdate +'&endTime='+ searchEdate +'&ticketInfoId=' + swList)
		.then(function(res){
			let checkList = res.data.data;
			var botString = '*****紫竹院冰场预约报数*****\n日期:'+botDate+'\n';
			checkList.forEach(function(value, key){
				let yyItem = {};
				yyItem.sw = value.appointQuantity;
				yyList.push(yyItem)
			})
			axios.get('https://boss.smart-ideas.com.cn/ticketApi/robotCollection/appoint/get?enterpriseCode=TgsEpcBxyyz&ticketGroupNum=TGN20221205175851713&startTime='+ searchSdate +'&endTime='+ searchEdate +'&ticketInfoId=' + zwList)
				.then(function(res){
					let checkList = res.data.data;
					checkList.forEach(function(value, key){
						yyList[key].zw = value.appointQuantity;
					})
					axios.get('https://boss.smart-ideas.com.cn/ticketApi/robotCollection/appoint/get?enterpriseCode=TgsEpcBxyyz&ticketGroupNum=TGN20221205175851713&startTime='+ searchSdate +'&endTime='+ searchEdate +'&ticketInfoId=' + xwList)
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
	axios.post('http://rent.smart-ideas.com.cn/zyypark/leaseOrder/robot/refund', {orderCode: orderCode, refundMoney: refundMoney})
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
	axios.get('http://rent.smart-ideas.com.cn/zyypark/leaseOrder/robot/collection?startDate='+sDate+'&endDate='+eDate)
		.then(function(res){
			console.log(res);
			let botString = '*****紫竹院租赁报数*****\n日期:'+eDate;
			let botList = '';
			let totalMoney = 0;
			res.data.data.forEach(function(value, key){
				if(value.name.indexOf('雪圈') == -1){
					botList += '\n' + value.name + '：' + value.money + '元';
					totalMoney += parseInt(value.money);
				}
			})
			botString += '\n总金额：' + totalMoney + '元';
			botString += '\n***************';
			botString += botList;
			room.say(botString);
		})
		.catch(function(err){
			console.log(err);
		})
}

function getTimeCheckInfo(room){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var hour = nowDate.getHours();
	hour = hour>9?hour:'0'+hour;
	var lastHour = parseInt(hour) - 1;
	lastHour = lastHour>9?lastHour:'0'+lastHour;
	var minutes = nowDate.getMinutes();
	minutes = minutes>9?minutes:'0'+minutes;
	var seconds = nowDate.getSeconds();
	seconds = seconds>9?seconds:'0'+seconds;
	var sDate = year + '-' + month + '-' + day + ' 00:00:00';
	var eDate = year + '-' + month + '-' + day + ' ' + hour + ':00:00';
	var lastEDate = year + '-' + month + '-' + day + ' ' + lastHour + ':00:00';
	var searchSdate = encodeURI(sDate);
	var searchEdate = encodeURI(eDate);
	var lastSearchEdate = encodeURI(lastEDate);
	axios.get('http://boss.smart-ideas.com.cn/ticketApi/robotCollection/check/name/get?enterpriseCode=TgsEpcBxyyz&ticketGroupNum=TGN20221205175851713&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate + '&ticketSalesChannelsNum=TC')
		.then(function(res){
			let nowTotal = 0;
			let lastTotal = 0;
			res.data.data.forEach(function(value, key){
				nowTotal += parseInt(value.checkQuantity);
			})
			axios.get('http://boss.smart-ideas.com.cn/ticketApi/robotCollection/check/name/get?enterpriseCode=TgsEpcBxyyz&ticketGroupNum=TGN20221205175851713&checkStartTime=' + searchSdate + '&checkEndTime=' + lastSearchEdate + '&ticketSalesChannelsNum=TC')
				.then(function(res){
					res.data.data.forEach(function(value, key){
						lastTotal += parseInt(value.checkQuantity);
					})
					let timeTotal = nowTotal - lastTotal;
					let botString = '***紫竹院冰场分时报数***\n时间：' + lastEDate + '至' + eDate + '\n';
					botString += '本时段验票人数：' + timeTotal;
					botString += '\n本日验票总人数：' + nowTotal;
					room.say(botString);
				})
				.catch(function(err){
					console.log(err);
				})
		})
		.catch(function(err){
			console.log(err);
		})
}

function getCheckTicketInfo(enterpriseCode, ticketGroupNum, room, ticketSalesChannelsNum){
	var parkName = '紫竹院';
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
			if(checkList.length > 0){
				checkList.forEach(function(value, key){
					var money = parseFloat(value.checkMoney);
					var number = parseInt(value.checkQuantity);
					var ticketName = value.name;
					totalMoney += money;
					totalNumber += number;
					ListString += ticketName + '：' + number + '张   ' + money.toFixed(2) + '元\n';
				})
			}
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
	getTimeCheckInfo,
	getYYInfoByTime
}