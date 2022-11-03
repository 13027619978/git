var http = require('http');
var querystring = require('querystring');
var util = require('util');
const https = require('https');
const host1 = "boss.smart-ideas.com.cn";
const host2 = "dev.meirenji.cn";

function getPeopleInfo(enterpriseCode, ticketGroupNum, room){
	getYYInfo(enterpriseCode, ticketGroupNum, function(yyPeopleNumber){
		getOutPeopleInfo(function(peopleInfo){
			getActiveTicketsInfo(function(activeList){
				var outPeopleNumber = peopleInfo.content[2].out;
				var parkName = '北京国际鲜花港';
				if(ticketGroupNum == 'TGN20210629121602397'){
					parkName = '蝴蝶大世界'
				}
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
					hostname: host1,
					path: '/ticketApi/robotCollection/check/salesChannel/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
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
							if(ticketName != '活动票' && ticketName != '年票'){
								totalMoney += money;
								totalNumber += number;
								if(ticketName == '成人票'){
									totalNumber -= activeList[2].checkQuantity;
									number -= activeList[2].checkQuantity;
									totalNumber -= activeList[3].checkQuantity;
									number -= activeList[3].checkQuantity;
									totalNumber -= activeList[4].checkQuantity;
									number -= activeList[4].checkQuantity;
									totalNumber -= activeList[5].checkQuantity;
									number -= activeList[5].checkQuantity;
									totalNumber -= activeList[6].checkQuantity;
									number -= activeList[6].checkQuantity;
								}
								ListString += ticketName + '：' + number + '人\n';	
							}
						})
						activeList.forEach(function(value, key){
							var money = parseFloat(value.checkMoney);
							var number = parseInt(value.checkQuantity);
							var ticketName = value.name;
							totalMoney += money;
							totalNumber += number;
							ListString += ticketName + '：' + number + '人\n';
						})
						var nowHour = nowDate.getHours();
						if(nowHour == 10){
							outPeopleNumber = parseInt(totalNumber * 0.18);
						}else if(nowHour == 11){
							outPeopleNumber = parseInt(totalNumber * 0.27);
						}else if(nowHour == 12){
							outPeopleNumber = parseInt(totalNumber * 0.39);
						}else if(nowHour == 13){
							outPeopleNumber = parseInt(totalNumber * 0.5);
						}else if(nowHour == 14){
							outPeopleNumber = parseInt(totalNumber * 0.58);
						}else if(nowHour == 15){
							outPeopleNumber = parseInt(totalNumber * 0.69);
						}else if(nowHour == 16){
							outPeopleNumber = parseInt(totalNumber * 0.77);
						}else if(nowHour == 17){
							outPeopleNumber = parseInt(totalNumber * 0.87);
						}else if(nowHour == 18){
							outPeopleNumber = parseInt(totalNumber * 0.94);
						}
						
						var inPeople = parseInt(totalNumber) - outPeopleNumber;
						inPeople = inPeople > 0?inPeople:0;
						var noInPeople;
						if(yyPeopleNumber > totalNumber){
							noInPeople = parseInt(yyPeopleNumber) - parseInt(totalNumber);
						}else{
							yyPeopleNumber = totalNumber;
							noInPeople = 0;
						}
						noInPeople = noInPeople > 0? noInPeople:0;
						botString += '总入园人数：' + totalNumber + '人\n';
						botString += '在园人数：' + inPeople + '人\n';
						botString += '出园人数：' + outPeopleNumber + '人\n';
						botString += '总预约数：' + yyPeopleNumber + '人\n';
						botString += '未入园：' + noInPeople + '人\n';
						botString += '--------------------\n';
						botString += ListString;
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
			})
		});
	})
}


function getPeopleMoneyInfo(enterpriseCode, ticketGroupNum, room){
	getYYInfo(enterpriseCode, ticketGroupNum, function(yyPeopleNumber){
		getOutPeopleInfo(function(peopleInfo){
			getActiveTicketsInfo(function(activeList){
				var outPeopleNumber = peopleInfo.content[2].out;
				var parkName = '北京国际鲜花港';
				if(ticketGroupNum == 'TGN20210629121602397'){
					parkName = '蝴蝶大世界'
				}
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
					hostname: host1,
					path: '/ticketApi/robotCollection/check/salesChannel/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
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
							var money = parseFloat(value.checkMoney).toFixed(2);
							var number = parseInt(value.checkQuantity);
							var ticketName = value.name;
							totalMoney = parseFloat(totalMoney*1 + money*1).toFixed(2);
							if(ticketName != '活动票' && ticketName != '年票'){
								totalNumber += number;
								if(ticketName == '成人票'){
									totalNumber -= activeList[2].checkQuantity;
									number -= activeList[2].checkQuantity;
									money -= activeList[2].checkMoney;
									totalNumber -= activeList[3].checkQuantity;
									number -= activeList[3].checkQuantity;
									money -= activeList[3].checkMoney;
									totalNumber -= activeList[4].checkQuantity;
									number -= activeList[4].checkQuantity;
									money -= activeList[4].checkMoney;
									totalNumber -= activeList[5].checkQuantity;
									number -= activeList[5].checkQuantity;
									money -= activeList[5].checkMoney;
									totalNumber -= activeList[6].checkQuantity;
									number -= activeList[6].checkQuantity;
									money -= activeList[6].checkMoney;
								}
								ListString += ticketName + '：' + number + '人 ' + parseFloat(money).toFixed(2) +'元\n';	
							}
						})
						activeList.forEach(function(value, key){
							var money = parseFloat(value.checkMoney);
							var number = parseInt(value.checkQuantity);
							var ticketName = value.name;
							totalNumber += number;
							ListString += ticketName + '：' + number + '人 ' + money +'元\n';
						})
						
						var nowHour = nowDate.getHours();
						if(nowHour == 10){
							outPeopleNumber = parseInt(totalNumber * 0.18);
						}else if(nowHour == 11){
							outPeopleNumber = parseInt(totalNumber * 0.27);
						}else if(nowHour == 12){
							outPeopleNumber = parseInt(totalNumber * 0.39);
						}else if(nowHour == 13){
							outPeopleNumber = parseInt(totalNumber * 0.5);
						}else if(nowHour == 14){
							outPeopleNumber = parseInt(totalNumber * 0.58);
						}else if(nowHour == 15){
							outPeopleNumber = parseInt(totalNumber * 0.69);
						}else if(nowHour == 16){
							outPeopleNumber = parseInt(totalNumber * 0.77);
						}else if(nowHour == 17){
							outPeopleNumber = parseInt(totalNumber * 0.87);
						}else if(nowHour == 18){
							outPeopleNumber = parseInt(totalNumber * 0.94);
						}
						
						var inPeople = parseInt(totalNumber) - outPeopleNumber;
						inPeople = inPeople > 0?inPeople:0;
						var noInPeople;
						if(yyPeopleNumber > totalNumber){
							noInPeople = parseInt(yyPeopleNumber) - parseInt(totalNumber);
						}else{
							yyPeopleNumber = totalNumber;
							noInPeople = 0;
						}
						noInPeople = noInPeople > 0? noInPeople:0;
						botString += '总入园人数：' + totalNumber + '人\n';
						botString += '在园人数：' + inPeople + '人\n';
						botString += '出园人数：' + outPeopleNumber + '人\n';
						botString += '总预约数：' + yyPeopleNumber + '人\n';
						botString += '未入园：' + noInPeople + '人\n';
						botString += '总金额：' + totalMoney + '元\n';
						botString += '--------------------\n';
						botString += ListString;
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
			})
		});
	})
}

// 获取活动票票名详情
function getActiveTicketsInfo(success){
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
		hostname: host1,
		path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=TgsEpcXhg&ticketGroupNum=TGN20210628140233051&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
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
			// var res = JSON.parse(d.toString());
			var activeTicketList = [
				{
					name: "年票",
					checkQuantity: 0,
					checkMoney: 0
				},
				{
					name: '368元露营套票',
					checkQuantity: 0,
					checkMoney: 0
				},
				{
					name: '298元露营套票',
					checkQuantity: 0,
					checkMoney: 0
				},
				{
					name: '598元露营套票',
					checkQuantity: 0,
					checkMoney: 0
				},
				{
					name: '668元露营套票',
					checkQuantity: 0,
					checkMoney: 0
				},
				{
					name: '1368元露营套票',
					checkQuantity: 0,
					checkMoney: 0
				},
				{
					name: '专享主题套票',
					checkQuantity: 0,
					checkMoney: 0
				},
				{
					name: '鲜花港赏花卡',
					checkQuantity: 0,
					checkMoney: 0
				}
			];
			
			let npNumber = 0;
			let npMoney = 0;
			res.data.forEach(function(value, key){
				if(value.name.indexOf('鲜花港赏花卡') != -1){
					activeTicketList[7].checkQuantity = value.checkQuantity;
					activeTicketList[7].checkMoney = value.checkMoney;
				}
				
				if(value.name == '乐活卡预约通道' || value.name == '畅享卡预约通道' || value.name.indexOf('京津冀一卡通') != -1 || value.name.indexOf('京津冀年票') != -1){
					npNumber += value.checkQuantity*1;
					npMoney += value.checkMoney*1;
				}
				
				if(value.name == '368元露营套票'){
					activeTicketList[1].checkQuantity += value.checkQuantity*1;
					activeTicketList[1].checkMoney = parseFloat(activeTicketList[1].checkMoney*1 + value.checkMoney*1).toFixed(2);
				}
				
				if(value.name.indexOf('298元露营套票') != -1){
					activeTicketList[2].checkQuantity += value.checkQuantity*1;
					activeTicketList[2].checkMoney = parseFloat(activeTicketList[2].checkMoney*1 + value.checkMoney*1).toFixed(2);
				}
				
				if(value.name.indexOf('598元露营套票') != -1){
					activeTicketList[3].checkQuantity += value.checkQuantity*1;
					activeTicketList[3].checkMoney = parseFloat(activeTicketList[3].checkMoney*1 + value.checkMoney*1).toFixed(2);
				}
				
				if(value.name.indexOf('668元露营套票') != -1){
					activeTicketList[4].checkQuantity += value.checkQuantity*1;
					activeTicketList[4].checkMoney = parseFloat(activeTicketList[4].checkMoney*1 + value.checkMoney*1).toFixed(2);
				}
				
				if(value.name.indexOf('1368元露营套票') != -1){
					activeTicketList[5].checkQuantity += value.checkQuantity*1;
					activeTicketList[5].checkMoney = parseFloat(activeTicketList[5].checkMoney*1 + value.checkMoney*1).toFixed(2);
				}
				
				if(value.name.indexOf('中秋') != -1 || value.name.indexOf('专享票') != -1){
					activeTicketList[6].checkQuantity += value.checkQuantity*1;
					activeTicketList[6].checkMoney = parseFloat(activeTicketList[6].checkMoney*1 + value.checkMoney*1).toFixed(2);
				}
			})
			// 年票
			activeTicketList[0].checkQuantity = npNumber;
			activeTicketList[0].checkMoney = npMoney;
			
			success(activeTicketList);
		})
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function getNewPeopleInfo(enterpriseCode, ticketGroupNum, room){
	try{
		getYYInfo(enterpriseCode, ticketGroupNum, function(yyPeopleNumber){
			getOutPeopleInfo(function(peopleInfo){
				var outPeopleNumber = peopleInfo.content[0].out;
				var parkName = '北京国际鲜花港';
				if(ticketGroupNum == 'TGN20210629121602397'){
					parkName = '蝴蝶大世界'
				}
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
					hostname: host1,
					path: '/ticketApi/robotCollection/check/salesChannel/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
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
							ListString +=  '鲜花港' + ticketName + '：' + number + '人\n';
						})
						getDieguanInfo(function(dieguanNumber){
							var inPeople = parseInt(totalNumber) - outPeopleNumber;
							inPeople = inPeople > 0?inPeople:0;
							var noInPeople;
							if(yyPeopleNumber > totalNumber){
								noInPeople = parseInt(yyPeopleNumber) - parseInt(totalNumber);
							}else{
								yyPeopleNumber = totalNumber;
								noInPeople = 0;
							}
							noInPeople = noInPeople > 0? noInPeople:0;
							botString += '总入园人数：' + totalNumber + '人\n';
							botString += '在园人数：' + inPeople + '人\n';
							botString += '出园人数：' + outPeopleNumber + '人\n';
							botString += '总预约数：' + yyPeopleNumber + '人\n';
							botString += '未入园：' + noInPeople + '人\n';
							botString += '--------------------\n';
							botString += ListString;
							botString += dieguanNumber;
							try{
								room.say(botString);
							}catch(e){
								
							}
						})
					});
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			});
		})
	}catch(e){
		//TODO handle the exception
	}
}

function getDieguanInfo(success){
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
		hostname: host1,
		path: '/ticketApi/robotCollection/check/salesChannel/get?enterpriseCode=TgsEpcXhg&ticketGroupNum=TGN20210629121602397&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var checkList = res.data;
			var totalMoney = 0;
			var totalNumber = 0;
			var dgString = '';
			checkList.forEach(function(value, key){
				if(value.name != '套票'){
					var money = parseFloat(value.checkMoney);
					var number = parseInt(value.checkQuantity);
					totalMoney += money;
					totalNumber += number;
					dgString += '蝴蝶馆' + value.name + '：' + number + '人\n';
				}
			})
			success(dgString);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function getOutPeopleInfo(success){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	getToken(function(token){
		const options = {
			hostname: host2,
			path: '/api/v2/multipleInstance/traffic/day',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
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
				success(res);
			})
		});
		
		req.write(querystring.stringify({
			access_token: token,
			appId: 'MRJ_ed1e658db20e40febf50bba423fdb057',
			start: year + '-' + month + '-' + day,
			end: year + '-' + month + '-' + day
		}));
		
		req.on('error', (e) => {
		  console.error(`problem with request: ${e.message}`);
		});
		
		req.end();
	})
}

function getToken(success){
	const options = {
		hostname: host2,
		path: '/oauth/token',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
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
			success(res.access_token);
		})
	});
	
	req.write(querystring.stringify({
		grant_type: 'client_credentials',
		client_id: 'MRJ_ed1e658db20e40febf50bba423fdb057',
		client_secret: 'de80beefd9164682bb86481caa6fd6ca'
	}));
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function getYYInfo(enterpriseCode, ticketGroupNum, success){
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
	const options = {
		hostname: host1,
		path: '/ticketApi/robotCollection/appoint/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&startTime=' + searchSdate + '&endTime=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var checkList = res.data;
			var yyNumber = checkList[0].appointQuantity;
			success(yyNumber);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}


function getBxjnhInfo(room){
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
	var nameList = [
		// {
		// 	name: '乐活卡预约通道',
		// 	total: 0,
		// 	money: 0
		// },
		// {
		// 	name: '畅享卡预约通道',
		// 	total: 0,
		// 	money: 0
		// },
		// {
		// 	name: '冰雪嘉年华门票--双人套票',
		// 	total: 0,
		// 	money: 0
		// },
		// {
		// 	name: '冰雪嘉年华门票--单人票',
		// 	total: 0,
		// 	money: 0
		// },
		// {
		// 	name: '北京国际鲜花港冰雪嘉年华入园双人套票（飞猪）',
		// 	total: 0,
		// 	money: 0
		// },
		// {
		// 	name: '北京国际鲜花港冰雪嘉年华入园门票（飞猪）',
		// 	total: 0,
		// 	money: 0
		// },
		{
			name: '京津冀名胜文化休闲旅游年卡预约通道',
			total: 0,
			money: 0
		},
		{
			name: '京津冀旅游一卡通预约通道',
			total: 0,
			money: 0
		}
	]
	const options = {
		hostname: host1,
		path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=TgsEpcXhg&ticketGroupNum=TGN20211210160317254&checkStartTime=' + startTime + '&checkEndTime=' + endTime,
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
			
			res.data.forEach(function(value, key){
				nameList.forEach(function(name, nameKey){
					if(name.name == value.name){
						name.total = value.checkQuantity;
						name.money = value.checkMoney;
					}
				})
				// nameList += value.name + '：' + value.checkQuantity + '张 '+ value.checkMoney +'元\n'; 
			})
			getOtherBxjnhTicket(nameList, room);
		})
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function getOtherBxjnhTicket(nameList, room){
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
		hostname: host1,
		path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=TgsEpcXhg&ticketGroupNum=TGN20210628140233051&checkStartTime=' + startTime + '&checkEndTime=' + endTime,
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
			var totalNumber = 0;
			var totalMoney = 0;
			res.data.forEach(function(value, key){
				if(value.name == '京津冀旅游一卡通预约通道' || value.name == '京津冀名胜文化休闲旅游年卡预约通道'){
					nameList.forEach(function(name, nameKey){
						if(name.name == value.name){
							name.total = value.checkQuantity;
							name.money = value.checkMoney;
						}
					})
					// nameList += value.name + '：' + value.checkQuantity + '张 '+ value.checkMoney +'元\n'; 
				}
			})
			var botList = '';
			nameList.forEach(function(value, key){
				botList += value.name + '：' + value.total + '张 '+ value.money +'元\n'; 
				totalNumber += parseInt(value.total);
				totalMoney += parseFloat(value.money);
			})
			var botString = '***鲜花港核销报数***\n时间:'+botDate +'\n------------------\n';
			botString += '总检票：' + totalNumber + '\n总金额：' + totalMoney + '元\n------------------\n';
			botString += botList;
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

// 获取雪圈收入
function getXqIncome(room){
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
		hostname: 'iot.smart-ideas.com.cn',
		path: '/iotsmart/otherOrder/getIncome?startDate=' + startDate + '&endDate=' + endDate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var hincome = parseFloat(res.data.income).toFixed(2);
			var botString = '';
			botString += '*****雪圈报数*****\n';
			botString += '时间：' + nowTime + '\n';
			botString += '100元票：' + hincome;
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


// 冰上项目上账统计
function getBsxmIncome(room){
	var ticketList = [
		'机器人拉车',
		'雪地铲车',
		'雪地龙舟',
		'雪地战车',
		'雪地卡丁车',
		'雪地大摩托',
		'雪地旋转飞碟',
		'雪地悠波球',
		'东方红',
		'雪地坦克',
		'雪地儿童摩托',
		'畅玩冰车',
		'冰上碰碰车',
		'狗拉雪橇'
	]
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
		path: '/ticketApi/robotCollection/name/sale/get?enterpriseCode=TgsEpcXhg&ticketGroupNum=TGN20211210160317254&startTime=' + startTime + '&endTime=' + endTime,
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
			var botXdString = '*****鲜花港冰上项目上账报数*****\n时间:'+botDate +'\n------------------\n'
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
				if(ticketList.indexOf(value.ticketName) != -1){
					xdTotalNumber += parseInt(value.totalQuantity);
					xdTotalMoney += parseFloat(value.totalMoney);
					xdNameList += value.ticketName + '：' + value.totalQuantity + '张 '+ value.totalMoney +'元\n'; 
				}
			})
			botXdString += '总数量：' + xdTotalNumber + '\n总金额：' + xdTotalMoney + '元\n------------------\n';
			botXdString += xdNameList;
			try{
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

module.exports = {
	getPeopleInfo, 
	getNewPeopleInfo, 
	getBxjnhInfo,
	getXqIncome,
	getBsxmIncome,
	getPeopleMoneyInfo
};