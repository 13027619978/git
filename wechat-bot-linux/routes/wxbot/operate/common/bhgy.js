const http = require('http');
const host = "api.smart-ideas.com.cn";
const fs = require('fs');
const axios = require('axios');

// 获取上下午预约报数
function getYYInfoByTime(room){
	let swList = '2c9141f4852d444a01852dab8cac0342';
	let xwList = '2c9141f4852d444a01852ddc4a3d04d5';
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
	axios.get('https://boss.smart-ideas.com.cn/ticketApi/robotCollection/appoint/get?enterpriseCode=TgsEpcYqy&ticketGroupNum=TGN20221220115005693&startTime='+ searchSdate +'&endTime='+ searchEdate +'&ticketInfoId=' + swList)
		.then(function(res){
			let checkList = res.data.data;
			var botString = '*****北海冰场预约报数*****\n日期:'+botDate+'\n';
			checkList.forEach(function(value, key){
				let yyItem = {};
				yyItem.sw = value.appointQuantity;
				yyList.push(yyItem)
			})
			axios.get('https://boss.smart-ideas.com.cn/ticketApi/robotCollection/appoint/get?enterpriseCode=TgsEpcYqy&ticketGroupNum=TGN20221220115005693&startTime='+ searchSdate +'&endTime='+ searchEdate +'&ticketInfoId=' + xwList)
				.then(function(res){
					let checkList = res.data.data;
					let timeList = [];
					checkList.forEach(function(value, key){
						yyList[key].xw = value.appointQuantity;
						timeList.push(value.appointDate);
					})
					yyList.forEach(function(value, key){
						botString += timeList[key] + '上午：' + value.sw + '人\n';
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
}

function getbhInfo(host, room){
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
		path: '/bhpark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			var driveShipIncome = res.data.driveShipIncome;
			driveShipIncome = driveShipIncome?parseFloat(driveShipIncome).toFixed(2):'0.00';
			var loopShipIncome = res.data.loopShipIncome;
	    	var botString = '*****北海荷花船报数*****\n日期:'+eDate +'\n';
			botString += '荷花船收入：' + driveShipIncome + '元\n';
			try{
				room.say(botString);
			}catch(e){
				
			}
	    }
	  });
	});
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	req.end();
}

// 获取开锁次数
function getOpenNumber(host,room){
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
		path: '/bhpark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			var driveShipIncome = res.data.driveShipIncome;
			driveShipIncome = driveShipIncome?parseFloat(driveShipIncome).toFixed(2):'0.00';
			var loopShipIncome = res.data.loopShipIncome;
			var botString = '*****北海荷花船报数*****\n日期:'+eDate +'\n';
			botString += '荷花船收入：' + driveShipIncome + '元\n';
			let path = require('path');
			fs.readFile(path.resolve(__dirname, '../jsonData/bhOpen.json'), 'utf8', function(err, data){
				if(err){
					return console.error(err);
				}
				data = JSON.parse(data);
				var openNumber = parseInt(data.openNumber);
				botString += "今日手动开锁次数：" + openNumber;
				var yqhData = {
					"openNumber": 0
				}
				if(hour >= 19){
					fs.writeFile(path.resolve(__dirname, '../jsonData/bhOpen.json'), JSON.stringify(yqhData),function(err){
						if(err){
							console.error(err);
							return;
						}
					})
				}
				try{
					room.say(botString);
				}catch(e){
					
				}
			})
	    }
	  });
	});
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	req.end();
}

function getCheckTicketInfo(enterpriseCode, ticketGroupNum, room, ticketSalesChannelsNum){
	var parkName = '北海公园';
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


module.exports = {getbhInfo, getOpenNumber, getCheckTicketInfo, getYYInfoByTime};