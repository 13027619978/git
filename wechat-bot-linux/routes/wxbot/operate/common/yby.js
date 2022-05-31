const https = require('https');
const http = require('http');
const fs = require('fs');

// 园博园自行车及入园人数报数
function getBikePeopleInfo(room){
	var startDate = getBikeTime().startDate;
	var endDate = getBikeTime().endDate;
	var botString = '******园博园报数******\n时间段：' + decodeURI(startDate) + '至' + decodeURI(endDate);
	
	const options = {
		hostname: 'iot.smart-ideas.com.cn',
		path: '/ybypark/ticketsCollection/getPassengerFlowCollection?startDate=' + startDate + '&endDate=' + endDate,
		method: 'GET'
	};
	const req = https.request(options, (res) => {
	    res.on('data', (d) => {
			var jsonData = JSON.parse(d.toString());
			var peopleInfo = jsonData.data;
			var total = peopleInfo.total;
			total = total?total:'0';
			const options2 = {
				hostname: 'api.joybike.com.cn',
				path: '/ccsmart/settle/web/getCurrentIncome1?startDate=' + startDate.split('%20')[0] + '&endDate=' + startDate.split('%20')[0] + '&id=34',
				method: 'GET'
			};
			const req2 = https.request(options2, (res2) => {
			    res2.on('data', (d2) => {
					var jsonData2 = JSON.parse(d2.toString());
					var totalIncome = parseFloat(jsonData2.rows.totalIncome)/2;
					const options3 = {
						hostname: 'api.joybike.com.cn',
						path: '/ccsmart/settle/web/getCurrentIncome1?startDate=' + endDate.split('%20')[0] + '&endDate=' + endDate.split('%20')[0] + '&id=34',
						method: 'GET'
					};
					const req3 = https.request(options3, (res3) => {
					    res3.on('data', (d3) => {
							var jsonData3 = JSON.parse(d3.toString());
							totalIncome += parseFloat(jsonData3.rows.totalIncome);
							const options1 = {
								hostname: '47.94.82.166',
								port: '3001',
								path: '/datav/yby/bot/readPosInfo',
								method: 'GET'
							};
							const req1 = http.request(options1, (res1) => {
								let d1s = '';
							    res1.on('data', (d1) => {
									d1s += d1;
							    });
								
								res1.on('end', () => {
									var jsonData1 = JSON.parse(d1s.toString());
									var posNumber = jsonData1.number;
									var totalNumber = parseInt(total) + parseInt(posNumber);
									botString += '\n入园总人数：' + totalNumber;
									botString += '\n自行车收入：' + totalIncome;
									try{
										room.say(botString);
									}catch(e){
										
									}
								})
							});
							
							req1.on('error', (e) => {
							  console.error(`problem with request: ${e.message}`);
							});
							
							req1.end();
					    });
					});
					
					req3.on('error', (e) => {
					  console.error(`problem with request: ${e.message}`);
					});
					
					req3.end();
			    });
			});
			
			req2.on('error', (e) => {
			  console.error(`problem with request: ${e.message}`);
			});
			
			req2.end();
	    });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

// 获取自行车报数时间
function getBikeTime(){
	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var yDate = new Date(new Date().getTime() - (1000*60*60*24));
	var yYear = yDate.getFullYear();
	var yMonth = yDate.getMonth() + 1;
	yMonth = yMonth>9?yMonth:'0'+yMonth;
	var yDay = yDate.getDate();
	yDay = yDay>9?yDay:'0'+yDay;
	
	var endDate = nowYear + '-' + nowMonth + '-' + nowDay + ' 13:00:00';
	var startDate = yYear + '-' + yMonth + '-' + yDay + ' 13:00:00';
	
	return {
		startDate: encodeURI(startDate),
		endDate: encodeURI(endDate)
	}
}

// 获取门票及瞬时承载量收入
function getTicketsIncome(room){
	var startDate = getTicketsTime().startDate;
	var endDate = getTicketsTime().endDate;
	var enterpriseCode = 'TgsEpcYby';
	var ticketGroupNum = 'TGN20201210095942945';
	const options = {
		hostname: 'boss.smart-ideas.com.cn',
		path: '/ticketApi/robotCollection/check/salesChannel/get?ticketSalesChannelsNum=WEB&enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + startDate + '&checkEndTime=' + endDate,
		method: 'GET'
	};
	const req = https.request(options, (res) => {
	    res.on('data', (d) => {
			var jsonData = JSON.parse(d.toString());
			var checkList = jsonData.data;
			var totalMoney = 0;
			var totalNumber = 0;
			checkList.forEach(function(value, key){
				var money = parseFloat(value.checkMoney);
				var number = parseInt(value.checkQuantity);
				totalMoney += money;
				totalNumber += number;
			})
			
			var botString = '******园博园报数******\n时间段：\n' + decodeURI(startDate) + '\n至\n' + decodeURI(endDate);
			botString += '\n门票收入：' + totalMoney + '元';
			botString += '\n购票张数：' + totalNumber;
			
			const options1 = {
				hostname: 'boss.smart-ideas.com.cn',
				path: '/ticketApi/robotCollection/brakeData/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&startTime=' + startDate + '&endTime=' + endDate,
				method: 'GET'
			};
			const req1 = https.request(options1, (res1) => {
			    res1.on('data', (d1) => {
					var res1 = JSON.parse(d1.toString());
					var brakeList = res1.data;
					var totalInPeople = 0;
					brakeList.forEach(function(value, key){
						totalInPeople += parseInt(value.inTotal);
					})
					botString += '\n总入园人数：' + totalInPeople;
					botString += '\n瞬时最大承载：' + parseInt(parseInt(totalInPeople) * 0.7);
					try{
						room.say(botString);
					}catch(e){
						
					}
			    });
			});
			
			req1.on('error', (e) => {
			  console.error(`problem with request: ${e.message}`);
			});
			
			req1.end();
	    });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

// 获取门票报数时间
function getTicketsTime(){
	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var nowHour = nowDate.getHours();
	nowHour = nowHour>9?nowHour:'0'+nowHour;
	var nowMinute = nowDate.getMinutes();
	nowMinute = nowMinute>9?nowMinute:'0'+nowMinute;
	var nowSeconds = nowDate.getSeconds();
	nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
	var yDate = new Date(new Date().getTime() - (1000*60*60*24));
	var yYear = yDate.getFullYear();
	var yMonth = yDate.getMonth() + 1;
	yMonth = yMonth>9?yMonth:'0'+yMonth;
	var yDay = yDate.getDate();
	yDay = yDay>9?yDay:'0'+yDay;
	
	var endDate = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinute + ':' + nowSeconds;
	var startDate = yYear + '-' + yMonth + '-' + yDay + ' ' + nowHour + ':' + nowMinute + ':' + nowSeconds;
	
	return {
		startDate: encodeURI(startDate),
		endDate: encodeURI(endDate)
	}
}

// 获取pos人数
function getPosInfo(){
	const options1 = {
		hostname: '47.94.82.166',
		port: '3001',
		path: '/datav/yby/bot/readPosInfo',
		method: 'GET'
	};
	let d1s = '';
	const req1 = http.request(options1, (res1) => {
	    res1.on('data', (d1) => {
			// console.log(d1.toString());
			// var jsonData1;
			// if(d1.toString().indexOf('number') != -1){
			// 	jsonData1 = JSON.parse(d1.toString() + '}');
			// 	var posNumber = jsonData1.data.number;
			// 	var totalNumber = parseInt(total) + parseInt(posNumber);
			// 	botString += '\n入园总人数：' + totalNumber;
			// 	botString += '\n自行车收入：' + totalIncome;
			// 	room.say(botString);
			// }
			d1s += d1;
			
	    });
		
		res1.on('end', function(){
			
		})
	});
	
	req1.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req1.end();
}


// 记录总登记人数
function writeTotalPeople(){
	let path = require('path');
	const options = {
		hostname: 'iot.smart-ideas.com.cn',
		path: '/fighting/communityDataV/getCurrentTotal?communityId=72EB8426EB52439FA51D79490C14C72E',
		method: 'GET'
	};
	const req = https.request(options, (res) => {
	    res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var registrationNumber = res[0].value;
			var jsonData = {
				"totalPeople": registrationNumber
			};
			fs.writeFile(path.resolve(__dirname, '../jsonData/ybyTotalPeople.json'), JSON.stringify(jsonData),function(err){
				if(err){
					console.error(err);
					return;
				}
			})
	    });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

// 电子票报数
function getYbyOtaInfo(room){
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
		hostname: 'iot.smart-ideas.com.cn',
		path: '/ybypark/ticketsCollection/getPassengerFlowCollection?startDate=' + searchSdate + '&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req1 = https.request(options, (res1) => {
	    res1.on('data', (d1) => {
			var res1 = JSON.parse(d1.toString());
			console.log(res1);
			var elecFullTotal = res1.data.elecFullTotal;
			elecFullTotal = elecFullTotal?elecFullTotal:0;
			var elecHalfTotal = res1.data.elecHalfTotal;
			elecHalfTotal = elecHalfTotal?elecHalfTotal:0;
			var botString = '*****园博园OTA报数*****\n日期:'+eDate +'\n';
			botString += '电子票全价票：' + elecFullTotal + '\n';
			botString += '电子票半价票：' + elecHalfTotal;
			try{
				room.say(botString);
			}catch(e){
				
			}
	    });
	});
	
	req1.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req1.end();
	
}


// 园博园核销票名报数
function getCheckTicketInfo(enterpriseCode, ticketGroupNum, room){
	var parkName = '北京园博园';
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
	let ticketList = [
		{
			name: '政策性免票',
			checkMoney: 0,
			checkQuantity: 0
		},
		{
			name: '普通年票',
			checkMoney: 0,
			checkQuantity: 0
		},
		{
			name: '权益年票',
			checkMoney: 0,
			checkQuantity: 0
		},
		{
			name: '全价票',
			checkMoney: 0,
			checkQuantity: 0
		},
		{
			name: '半价票',
			checkMoney: 0,
			checkQuantity: 0
		},
		{
			name: '工会票',
			checkMoney: 0,
			checkQuantity: 0
		},
		{
			name: '园博园全价票（同程）',
			checkMoney: 0,
			checkQuantity: 0
		},
		{
			name: '园博园半价票（同程）',
			checkMoney: 0,
			checkQuantity: 0
		},
		{
			name: '园博园成人门票(美团)-上午票',
			checkMoney: 0,
			checkQuantity: 0
		},
		{
			name: '园博园成人门票(美团)-下午票',
			checkMoney: 0,
			checkQuantity: 0
		},
		{
			name: '园博园学生门票(美团）-上午票',
			checkMoney: 0,
			checkQuantity: 0
		},
		{
			name: '园博园学生门票(美团）-下午票',
			checkMoney: 0,
			checkQuantity: 0
		}
	]
	let options = {
		hostname: 'boss.smart-ideas.com.cn',
		path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
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
			var checkList = res.data;
			var totalMoney = 0;
			var totalNumber = 0;
			checkList.forEach(function(value, key){
				var money = parseFloat(value.checkMoney);
				var number = parseInt(value.checkQuantity);
				var ticketName = value.name;
				totalMoney += money;
				totalNumber += number;
				if(ticketName == '政策性免票'){
					ticketList[0].checkMoney = money;
					ticketList[0].checkQuantity = number;
				}else if(ticketName == '普通年票'){
					ticketList[1].checkMoney = money;
					ticketList[1].checkQuantity = number;
				}else if(ticketName == '权益年票'){
					ticketList[2].checkMoney = money;
					ticketList[2].checkQuantity = number;
				}else if(ticketName == '全价票'){
					ticketList[3].checkMoney = money;
					ticketList[3].checkQuantity = number;
				}else if(ticketName == '半价票'){
					ticketList[4].checkMoney = money;
					ticketList[4].checkQuantity = number;
				}else if(ticketName == '工会票'){
					ticketList[5].checkMoney = money;
					ticketList[5].checkQuantity = number;
				}else if(ticketName == '园博园全价票（同程）'){
					ticketList[6].checkMoney = money;
					ticketList[6].checkQuantity = number;
				}else if(ticketName == '园博园半价票（同程）'){
					ticketList[7].checkMoney = money;
					ticketList[7].checkQuantity = number;
				}else if(ticketName == '园博园成人门票(美团)-上午票'){
					ticketList[8].checkMoney = money;
					ticketList[8].checkQuantity = number;
				}else if(ticketName == '园博园成人门票(美团)-下午票'){
					ticketList[9].checkMoney = money;
					ticketList[9].checkQuantity = number;
				}else if(ticketName == '园博园学生门票(美团）-上午票'){
					ticketList[10].checkMoney = money;
					ticketList[10].checkQuantity = number;
				}else if(ticketName == '园博园学生门票(美团）-下午票'){
					ticketList[11].checkMoney = money;
					ticketList[11].checkQuantity = number;
				}else{
					ticketList.push({
						name: ticketName,
						checkMoney: money,
						checkQuantity: number
					})
				}
			})
			var botString = '*****园博园核销报数*****\n日期:'+eDate +'\n';
			botString += '总检票：' + totalNumber + '张\n';
			botString += '总检票金额：' + parseFloat(totalMoney).toFixed(2) + '元\n';
			ticketList.forEach(function(value, key){
				botString += value.name + '：' + value.checkQuantity + '张 ' + value.checkMoney + '元\n';
			})
			room.say(botString);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

module.exports = {getBikePeopleInfo, getTicketsIncome, getPosInfo, writeTotalPeople, getYbyOtaInfo, getCheckTicketInfo};