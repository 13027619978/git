const http = require('https');
const host = "boss.smart-ideas.com.cn";

// 渠道票种核销报数
function getTicketInfo(enterpriseCode, ticketGroupNum, ticketSalesChannelsNum, room){
	var parkName = getParkName(enterpriseCode, ticketGroupNum);
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
	
	let options = {
		hostname: host,
		path: '/ticketApi/robotCollection/check/salesChannel/get?ticketSalesChannelsNum='+ticketSalesChannelsNum+'&enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
		method: 'GET'
	};
	
	if(!ticketSalesChannelsNum){
		options = {
			hostname: host,
			path: '/ticketApi/robotCollection/check/salesChannel/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
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
			}else if(ticketSalesChannelsNum == 'TC'){
				botString = '*****'+ parkName +'同城核销报数*****\n日期:'+eDate +'\n';
			}else{
				botString = '*****'+ parkName +'核销报数*****\n日期:'+eDate +'\n';
			}
			var ListString = '';
			var totalMoney = 0;
			var totalNumber = 0;
			checkList.forEach(function(value, key){
				var money = parseFloat(value.checkMoney);
				var number = parseInt(value.checkQuantity);
				var ticketName = value.name;
				if(enterpriseCode == 'TgsEpcYmy'){
					// 圆明园
					if(ticketName != '套票' && ticketName != '活动票' && ticketName != '儿童票' && ticketName != '年票'){
						totalMoney += money;
						totalNumber += number;
						ListString += ticketName + '：' + number + '张   ' + money.toFixed(2) + '元\n';
					}
				}else if(enterpriseCode == 'TgsEpcSch1'){
					// 什刹海
					if(ticketName == '成人票'){
						totalMoney += money;
						totalNumber += number;
						ListString += ticketName + '：' + number + '张   ' + money.toFixed(2) + '元\n';
					}
				}else if(enterpriseCode == 'TgsEpcFhl'){
					// 凤凰岭
					if(ticketName != '年票' && ticketName != '儿童票'){
						totalMoney += money;
						totalNumber += number;
						ListString += ticketName + '：' + number + '张   ' + money.toFixed(2) + '元\n';
					}
				}else if(enterpriseCode == 'TgsEpcXhg' && ticketGroupNum == 'TGN20210629121602397'){
					// 鲜花港蝶馆
					if(ticketName != '套票'){
						totalMoney += money;
						totalNumber += number;
						ListString += ticketName + '：' + number + '张   ' + money.toFixed(2) + '元\n';
					}
				}else{
					totalMoney += money;
					totalNumber += number;
					ListString += ticketName + '：' + number + '张   ' + money.toFixed(2) + '元\n';
				}
				
			})
			botString += '总检票：' + totalNumber + '张\n';
			botString += '总检票金额：' + parseFloat(totalMoney).toFixed(2) + '元\n';
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
}

// 渠道核销报数
function getBossInfo(enterpriseCode, ticketGroupNum, room, state){
	var parkName = getParkName(enterpriseCode, ticketGroupNum);
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
	// var state = 0;
	// if(enterpriseCode == 'TgsEpcXhg' && ticketGroupNum == 'TGN20210629121602397'){
	// 	state = 1;
	// }
	if(!state){
		state = 0;
	}
	const options = {
		hostname: host,
		path: '/ticketApi/robotCollection/check/get?state='+ state +'&enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
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
				// 鲜花港蝶馆报数
				if(ticketGroupNum == 'TGN20210629121602397'){
					if(value.name != 'web端'){
						var money = parseFloat(value.checkMoney);
						var number = parseInt(value.checkQuantity);
						var ticketName = value.name;
						totalMoney += money;
						totalNumber += number;
						ListString += ticketName + '已检票：' + number + '张\n';
						ListString += ticketName + '已检票金额：' + money.toFixed(2) + '元\n';
					}
				}else{
					var money = parseFloat(value.checkMoney);
					var number = parseInt(value.checkQuantity);
					var ticketName = value.name;
					if(ticketName == 'web端'){
						ticketName = '微信端';
					}
					totalMoney += money;
					totalNumber += number;
					ListString += ticketName + '已检票：' + number + '张\n';
					ListString += ticketName + '已检票金额：' + money.toFixed(2) + '元\n';
				}
				
			})
			botString += '总检票：' + totalNumber + '张\n';
			botString += '总检票金额：' + parseFloat(totalMoney).toFixed(2) + '元\n';
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
}

// 核销人数
function getBossPeoPleInfo(enterpriseCode, ticketGroupNum, room){
	var parkName = getParkName(enterpriseCode, ticketGroupNum);
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
		path: '/ticketApi/robotCollection/check/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
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
				if(ticketName == 'web端'){
					ticketName = '微信端';
				}
				totalMoney += money;
				totalNumber += number;
				ListString += ticketName + '已检票：' + number + '人\n';
			})
			botString += '总检票：' + totalNumber + '人\n';
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
}

// 预约报数
function getBossYYInfo(enterpriseCode, ticketGroupNum, room){
	var parkName = getParkName(enterpriseCode, ticketGroupNum);
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
		hostname: host,
		path: '/ticketApi/robotCollection/appoint/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&startTime=' + searchSdate + '&endTime=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var checkList = res.data;
			var botString = '*****'+ parkName +'预约报数*****\n日期:'+botDate +'\n';
			var totalMoney = 0;
			var totalNumber = 0;
			checkList.forEach(function(value, key){
				if(enterpriseCode == 'TgsEpcSh'){
					if(new Date(value.appointDate) <= new Date('2022-02-03')){
						botString += value.appointDate + '：' + value.appointQuantity + '人\n';
					}
				}else{
					botString += value.appointDate + '：' + value.appointQuantity + '人\n';
				}
			})
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

// 闸机报数
function getBrakeData(enterpriseCode, ticketGroupNum, room){
	var parkName = getParkName(enterpriseCode, ticketGroupNum);
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
	var searchSdate = encodeURI(sDate);
	var eDate = year + '-' + month + '-' + day + ' 23:59:59';
	var searchEdate = encodeURI(eDate);
	var botDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds; 
	const options = {
		hostname: 'boss.smart-ideas.com.cn',
		path: '/ticketApi/robotCollection/brakeData/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&startTime=' + searchSdate + '&endTime=' + searchEdate,
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
			console.log(res);
			// console.log(d);
			// var res = JSON.parse(d.toString());
			var brakeList = res.data;
			if(enterpriseCode == 'TgsEpcYby'){
				// getTeamTicketNumber(function(h5TeamTotal){
					let h5TeamTotal = 0;
					getCheckTicketNumber(enterpriseCode, ticketGroupNum, function(checkTotalNumber){
						// getYbyOtaInfo(function(dzTotal){
							let dzTotal = 0;
							var totalInPeople = parseInt(h5TeamTotal) + parseInt(checkTotalNumber) + parseInt(dzTotal);
							var totalOutPeople = 0;
							var brakeString = '';
							var erIn = 0;
							var erOut = 0;
							var sanIn = 0;
							var sanOut = 0;
							var siIn = 0;
							var siOut = 0;
							var wuIn = 0;
							var wuOut = 0;
							var liuIn = 0;
							var liuOut = 0;
							var sanOut = 0;
							// 出园系数
							var outNumber = 1.6;
							brakeList.forEach(function(value, key){
								var inTotal = parseInt(value.inTotal);
								if(value.categoryName.indexOf('二号门') != -1){
									erIn += inTotal;
									erOut += parseInt(value.outTotal * outNumber);
								}else if(value.categoryName.indexOf('四号门') != -1){
									siIn += inTotal;
									siOut += parseInt(value.outTotal * outNumber);
								}else if(value.categoryName.indexOf('三号门') != -1){
									sanOut += parseInt(value.outTotal * outNumber);
								}else if(value.categoryName.indexOf('五号门') != -1){
									wuIn += inTotal;
									wuOut += parseInt(value.outTotal * outNumber);
								}else if(value.categoryName.indexOf('六号门') != -1){
									liuIn += inTotal;
									liuOut += parseInt(value.outTotal * outNumber);
								}else if(value.categoryName.indexOf('一号门') != -1){
									erOut += parseInt(value.outTotal * outNumber);
								}
								totalOutPeople += parseInt(value.outTotal * outNumber);
							})
							var sanIn = totalInPeople - parseInt(erIn) - parseInt(siIn) - parseInt(wuIn) - parseInt(liuIn);
							sanIn = sanIn>0?sanIn:'0';
							brakeString += '二号门闸机入园：' + erIn + '人\n';
							brakeString += '二号门闸机出园：' + erOut + '人\n';
							brakeString += '三号门闸机入园：' + sanIn + '人\n';
							brakeString += '三号门闸机出园：' + sanOut + '人\n';
							brakeString += '四号门闸机入园：' + siIn + '人\n';
							brakeString += '四号门闸机出园：' + siOut + '人\n';
							brakeString += '五号门闸机入园：' + wuIn + '人\n';
							brakeString += '五号门闸机出园：' + wuOut + '人\n';
							brakeString += '六号门闸机入园：' + liuIn + '人\n';
							brakeString += '六号门闸机出园：' + liuOut + '人\n';
							var nowInPeople = totalInPeople - totalOutPeople;
							nowInPeople = nowInPeople>0?nowInPeople:0;
							var botString = '*****'+ parkName +'闸机报数*****\n日期:'+botDate +'\n总入园人数:' + totalInPeople + '人\n在园人数:' + nowInPeople + '人\n------------------\n';
							botString += brakeString;
							try{
								room.say(botString);
							}catch(e){
								
							}
						// })
					})
					
				// })
			}else{
				var totalInPeople = 0;
				var totalOutPeople = 0;
				var brakeString = '';
				brakeList.forEach(function(value, key){
					brakeString += value.categoryName + '入园：' + value.inTotal + '人\n';
					brakeString += value.categoryName + '出园：' + value.outTotal + '人\n';
					totalInPeople += parseInt(value.inTotal);
					totalOutPeople += parseInt(value.outTotal);
				})
				var nowInPeople = totalInPeople - totalOutPeople;
				nowInPeople = nowInPeople>0?nowInPeople:0;
				var botString = '*****'+ parkName +'闸机报数*****\n日期:'+botDate +'\n总入园人数:' + totalInPeople + '人\n在园人数:' + nowInPeople + '人\n------------------\n';
				botString += brakeString;
				try{
					room.say(botString);
				}catch(e){
					
				}
			}
		})
	});
	
	// const req = http.request(options, (res) => {
	// 	res.on('data', (d) => {
			
	// 	});
	// });
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

// 核销票种报数
function getCheckTicketInfo(enterpriseCode, ticketGroupNum, room, ticketSalesChannelsNum){
	var parkName = getParkName(enterpriseCode, ticketGroupNum);
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
			hostname: host,
			path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate + '&ticketSalesChannelsNum=' + ticketSalesChannelsNum,
			method: 'GET'
		};
	}else{
		options = {
			hostname: host,
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
				if(enterpriseCode == 'TgsEpcSlfz' && ticketGroupNum == 'TGN20200907203336045'){
					if(ticketName == '顺奥冰世界' || ticketName == '水奥雪世界'){
						totalMoney += money;
						totalNumber += number;
						ListString += ticketName + '：' + number + '张   ' + money.toFixed(2) + '元\n';
					}
				}else{
					totalMoney += money;
					totalNumber += number;
					ListString += ticketName + '：' + number + '张   ' + money.toFixed(2) + '元\n';
				}
			})
			botString += '总检票：' + totalNumber + '张\n';
			botString += '总检票金额：' + parseFloat(totalMoney).toFixed(2) + '元\n';
			botString += '--------------------\n';
			if(enterpriseCode == 'TgsEpcSlfz' && ticketGroupNum == 'TGN20200907203336045'){
				if(ListString.indexOf('顺奥冰世界') == -1 && ListString.indexOf('水奥雪世界') == -1){
					ListString = '顺奥冰世界:0张 0元\n水奥雪世界:0张 0元';
				}else{
					if(ListString.indexOf('顺奥冰世界') == -1){
						ListString += '顺奥冰世界:0张 0元';
					}else if(ListString.indexOf('水奥雪世界') == -1){
						ListString += '水奥雪世界:0张 0元';
					}
				}
			}
			
			botString += ListString;
			room.say(botString);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

// 核销票名数量报数
function getCheckTicketNumberInfo(enterpriseCode, ticketGroupNum, room, ticketSalesChannelsNum){
	var parkName = getParkName(enterpriseCode, ticketGroupNum);
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
			hostname: host,
			path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate + '&ticketSalesChannelsNum=' + ticketSalesChannelsNum,
			method: 'GET'
		};
	}else{
		options = {
			hostname: host,
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
				var number = parseInt(value.checkQuantity);
				var ticketName = value.name;
				if(enterpriseCode == 'TgsEpcSlfz' && ticketGroupNum == 'TGN20200907203336045'){
					if(ticketName == '顺奥冰世界' || ticketName == '水奥雪世界'){
						totalNumber += number;
						ListString += ticketName + '：' + number + '张\n';
					}
				}else{
					totalNumber += number;
					ListString += ticketName + '：' + number + '张\n';
				}
				
			})
			botString += '总检票：' + totalNumber + '张\n';
			botString += '--------------------\n';
			if(enterpriseCode == 'TgsEpcSlfz' && ticketGroupNum == 'TGN20200907203336045'){
				if(ListString.indexOf('顺奥冰世界') == -1 && ListString.indexOf('水奥雪世界') == -1){
					ListString = '顺奥冰世界:0张\n水奥雪世界:0张';
				}else{
					if(ListString.indexOf('顺奥冰世界') == -1){
						ListString += '顺奥冰世界:0张';
					}else if(ListString.indexOf('水奥雪世界') == -1){
						ListString += '水奥雪世界:0张';
					}
				}
			}
			
			botString += ListString;
			if(enterpriseCode == 'TgsEpcYby'){
				getTeamTicketInfo(ListString, totalNumber, totalMoney, room);
			}else{
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

// 园博园获取团体票
function getTeamTicketInfo(ListString, totalNumber, totalMoney, room){
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
	var searchSdate = encodeURI(sDate);
	var endDate = new Date();
	var eYear = endDate.getFullYear();
	var eMonth = endDate.getMonth() + 1;
	eMonth = eMonth>9?eMonth:'0'+eMonth;
	var eDay = endDate.getDate();
	eDay = eDay>9?eDay:'0'+eDay;
	var eDate = eYear + '-' + eMonth + '-' + eDay + ' ' + hour + ':' + minutes + ':' + seconds;
	var searchEdate = encodeURI(eDate);
	var botDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds; 
	const options = {
		hostname: 'iot.smart-ideas.com.cn',
		path: '/ybypark/ticketsCollection/getTicketsCollection?startDate=' + searchSdate + '&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var h5TeamTotalMoney = res.data.ticketsInnerCollection.h5TeamTotalMoney;
			h5TeamTotalMoney = h5TeamTotalMoney?parseFloat(h5TeamTotalMoney).toFixed(2):0;
			var h5TeamTotal = res.data.ticketsInnerCollection.h5TeamTotal;
			h5TeamTotal = h5TeamTotal?parseInt(h5TeamTotal):0;
			totalNumber += h5TeamTotal;
			var botString = '*****园博园核销报数*****\n日期:'+eDate +'\n';
			botString += '总检票：' + totalNumber + '张\n';
			botString += '总检票金额：' + parseFloat(totalMoney).toFixed(2) + '元\n';
			botString += ListString;
			botString += '团体票：' + h5TeamTotal + '张 ' + h5TeamTotalMoney + '元';
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

// 园博园获取团体票入园信息
function getTeamTicketNumber(success){
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
	var searchSdate = encodeURI(sDate);
	var eDate = year + '-' + month + '-' + day + ' 23:59:59';
	var searchEdate = encodeURI(eDate);
	var botDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds; 
	const options = {
		hostname: 'iot.smart-ideas.com.cn',
		path: '/ybypark/ticketsCollection/getTicketsCollection?startDate=' + searchSdate + '&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			console.log(d);
			var res = JSON.parse(d.toString());
			var h5TeamTotal = res.data.ticketsInnerCollection.h5TeamTotal;
			h5TeamTotal = h5TeamTotal?parseInt(h5TeamTotal):0;
			success(h5TeamTotal);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`2problem with request: ${e.message}`);
	});
	
	req.end();
}

// 核销总人数
function getCheckTicketNumber(enterpriseCode, ticketGroupNum, success){
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
	let options = {
		hostname: host,
		path: '/ticketApi/robotCollection/check/name/get?&enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
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
				totalNumber += number;
			})
			success(totalNumber);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`3problem with request: ${e.message}`);
	});
	
	req.end();
}

// 获取电子票核销人数
// function getYbyOtaInfo(success){
// 	var nowDate = new Date();
// 	var year = nowDate.getFullYear();
// 	var month = nowDate.getMonth()+1;
// 	month = month>9?month:'0'+month;
// 	var day = nowDate.getDate();
// 	day = day>9?day:'0'+day;
// 	var hour = nowDate.getHours();
// 	hour = hour>9?hour:'0'+hour;
// 	var minutes = nowDate.getMinutes();
// 	minutes = minutes>9?minutes:'0'+minutes;
// 	var seconds = nowDate.getSeconds();
// 	seconds = seconds>9?seconds:'0'+seconds;
// 	var sDate = year + '-' + month + '-' + day + ' 00:00:00';
// 	var eDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
// 	var searchSdate = encodeURI(sDate);
// 	var searchEdate = encodeURI(eDate);
// 	const options = {
// 		hostname: 'iot.smart-ideas.com.cn',
// 		path: '/ybypark/ticketsCollection/getPassengerFlowCollection?startDate=' + searchSdate + '&endDate=' + searchEdate,
// 		method: 'GET'
// 	};
	
// 	const req1 = http.request(options, (res1) => {
// 	    res1.on('data', (d1) => {
// 			var res1 = JSON.parse(d1.toString());
// 			var elecFullTotal = res1.data.elecFullTotal;
// 			elecFullTotal = elecFullTotal?elecFullTotal:0;
// 			var elecHalfTotal = res1.data.elecHalfTotal;
// 			elecHalfTotal = elecHalfTotal?elecHalfTotal:0;
// 			var dzTotal = parseInt(elecFullTotal) + parseInt(elecHalfTotal);
// 			success(dzTotal);
// 	    });
// 	});
	
// 	req1.on('error', (e) => {
// 	  console.error(`4problem with request: ${e.message}`);
// 	});
	
// 	req1.end();
	
// }

// 获取单票种购票总数
function getTicketBuyInfo(enterpriseCode, ticketGroupNum, categoryCode, room){
	var parkName = getParkName(enterpriseCode, ticketGroupNum);
	var ticketCategry;
	if(categoryCode == '0'){
		ticketCategry = '成人票';
	}else if(categoryCode == '1'){
		ticketCategry = '儿童票';
	}else if(categoryCode == '2'){
		ticketCategry = '优惠票';
	}else if(categoryCode == '3'){
		ticketCategry = '套票';
	}else if(categoryCode == '4'){
		ticketCategry = '活动票';
	}else if(categoryCode == '5'){
		ticketCategry = '政策性免票';
	}else if(categoryCode == '6'){
		ticketCategry = '年票';
	}else if(categoryCode == '7'){
		ticketCategry = '团体票';
	}
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
	var botDate = nowDate.getFullYear() + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	var startTime = encodeURI('2019-01-01 00:00:00');
	var endTime = encodeURI(botDate);
	const options = {
		hostname: host,
		// path: '/ticketApi/robotCollection/category/sale/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&categoryCode=' + categoryCode,
		path: '/ticketApi/robotCollection/category/sale/get?enterpriseCode='+ enterpriseCode +'&ticketGroupNum='+ ticketGroupNum +'&categoryCode=' + categoryCode + '&startTime=' + startTime + '&endTime=' + endTime,
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
			var botString = '*****'+ parkName + "已售" + ticketCategry + '报数*****\n截止到:'+botDate +'\n------------------\n';
			res.data.forEach(function(value, key){
				if(value.totalQuantity != '0'){
					botString += value.ticketName + '：' + value.totalQuantity + '\n'; 
				}
			})
			if(ticketGroupNum == 'TGN20210924083128003'){
				getYbySgTicketBuyInfo(room, botString);
			}else{
				try{
					room.say(botString);
				}catch(e){
					
				}
			}
		})
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function getYbySgTicketBuyInfo(room, botString){
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
	var botDate = nowDate.getFullYear() + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	var startTime = encodeURI('2019-01-01 00:00:00');
	var endTime = encodeURI(botDate);
	const options = {
		hostname: host,
		path: '/ticketApi/robotCollection/category/sale/get?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945&categoryCode=3&startTime=' + startTime + '&endTime=' + endTime,
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
				if(value.ticketName == '丰园书馆下午票'){
					botString += value.ticketName + '：' + value.totalQuantity + '\n'; 
				}
			})
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

// 获取单票种购票总数
function getTicketBuyInfoByTime(enterpriseCode, ticketGroupNum, categoryCode, room, startDate){
	var parkName = getParkName(enterpriseCode, ticketGroupNum);
	var ticketCategry;
	if(categoryCode == '0'){
		ticketCategry = '成人票';
	}else if(categoryCode == '1'){
		ticketCategry = '儿童票';
	}else if(categoryCode == '2'){
		ticketCategry = '优惠票';
	}else if(categoryCode == '3'){
		ticketCategry = '套票';
	}else if(categoryCode == '4'){
		ticketCategry = '活动票';
	}else if(categoryCode == '5'){
		ticketCategry = '政策性免票';
	}else if(categoryCode == '6'){
		ticketCategry = '年票';
	}else if(categoryCode == '7'){
		ticketCategry = '团体票';
	}
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
	var botDate = nowDate.getFullYear() + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	var startTime = encodeURI(startDate + ' 00:00:00');
	var endTime = encodeURI(botDate);
	const options = {
		hostname: host,
		// path: '/ticketApi/robotCollection/category/sale/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&categoryCode=' + categoryCode,
		path: '/ticketApi/robotCollection/category/sale/get?enterpriseCode='+ enterpriseCode +'&ticketGroupNum='+ ticketGroupNum +'&categoryCode=' + categoryCode + '&startTime=' + startTime + '&endTime=' + endTime,
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
			var botString = '*****'+ parkName + "已售" + ticketCategry + '报数*****\n'+startDate+' 00:00:00\n至:\n'+botDate +'\n------------------\n';
			res.data.forEach(function(value, key){
				if(value.totalQuantity != '0'){
					botString += value.ticketName + '：' + value.totalQuantity + '\n'; 
				}
			})
			if(ticketGroupNum == 'TGN20210924083128003'){
				getYbySgTicketBuyInfoByTime(room, botString, startTime);
			}else{
				try{
					room.say(botString);
				}catch(e){
					
				}
			}
		})
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}


function getYbySgTicketBuyInfoByTime(room, botString, startDate){
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
	var botDate = nowDate.getFullYear() + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	var startTime = startDate;
	var endTime = encodeURI(botDate);
	const options = {
		hostname: host,
		path: '/ticketApi/robotCollection/category/sale/get?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945&categoryCode=3&startTime=' + startTime + '&endTime=' + endTime,
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
				if(value.ticketName == '丰园书馆下午票'){
					botString += value.ticketName + '：' + value.totalQuantity + '\n'; 
				}
			})
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

// 获取所有票名购票总数
function getAllTicketsBuyInfo(enterpriseCode, ticketGroupNum, room){
	var parkName = getParkName(enterpriseCode, ticketGroupNum);
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
		hostname: host,
		path: '/ticketApi/robotCollection/name/sale/get?enterpriseCode='+ enterpriseCode +'&ticketGroupNum='+ ticketGroupNum +'&startTime=' + startTime + '&endTime=' + endTime,
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
			var botString = '*****'+ parkName + '上账统计报数*****\n时间:'+botDate +'\n------------------\n';
			// 鲜花港冰雪嘉年华
			if(enterpriseCode == 'TgsEpcXhg' && ticketGroupNum == 'TGN20211210160317254'){
				botString = '***鲜花港冰雪嘉年华***\n时间:'+botDate +'\n------------------\n';
			}
			if(enterpriseCode == 'TgsEpcSh'){
				botString = '*****'+ parkName + '核销报数*****\n时间:'+botDate +'\n------------------\n';
			}
			var nameList = '';
			var totalNumber = 0;
			var totalMoney = 0;
			res.data.forEach(function(value, key){
				if(enterpriseCode == 'TgsEpcSsgy' || enterpriseCode == 'TgsEpcXhg' || enterpriseCode == 'TgsEpcSh'){
					if(enterpriseCode == 'TgsEpcSsgy'){
						if(value.ticketName.indexOf('雪地悠波球') == -1 && value.ticketName.indexOf('雪地转转') == -1){
							totalNumber += parseInt(value.totalQuantity);
						}
					}else{
						totalNumber += parseInt(value.totalQuantity);
					}
					totalMoney += parseFloat(value.totalMoney);
					
					nameList += value.ticketName + '：' + value.totalQuantity + '张 '+ value.totalMoney +'元\n'; 
				}else{
					if(value.totalQuantity != '0'){
						totalNumber += parseInt(value.totalQuantity);
						totalMoney += parseFloat(value.totalMoney);
						nameList += value.ticketName + '：' + value.totalQuantity + '张 '+ value.totalMoney +'元\n'; 
					}
				}
			})
			botString += '总数量：' + totalNumber + '\n总金额：' + totalMoney + '元\n------------------\n';
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


// 根据编号获取景区名称
function getParkName(enterpriseCode, ticketGroupNum){
	var parkName;
	if(enterpriseCode == 'TgsEpcSlfz' && ticketGroupNum == 'TGN20200908101354451'){
		parkName = '蝶馆';
	}else if(enterpriseCode == 'TgsEpcSlfz' && ticketGroupNum == 'TGN20200907203306267'){
		parkName = '鲜花港';
	}else if(enterpriseCode == 'TgsEpcSlfz' && ticketGroupNum == 'TGN20200907203336045'){
		parkName = '水上公园';
	}else if(enterpriseCode == 'TgsEpcTydrj' && ticketGroupNum == 'TGN20201109171015189'){
		parkName = '狄仁杰文化公园';
	}else if(enterpriseCode == 'TgsEpcTydrj' && ticketGroupNum == 'TGN20201125191927875'){
		parkName = '狄公公祠';
	}else if(enterpriseCode == 'TgsEpcTydrj' && ticketGroupNum == 'TGN20201125191936690'){
		parkName = '狄公故居';
	}else if(enterpriseCode == 'TgsEpcYmy' && ticketGroupNum == 'TGN20201125101904070'){
		parkName = '正觉寺入园票';
	}else if(enterpriseCode == 'TgsEpcSch' && ticketGroupNum == 'TGN20211223142734998'){
		parkName = '什刹海冰场综合区通票';
	}else if(enterpriseCode == 'TgsEpcSch' && ticketGroupNum == 'TGN20201214175748615'){
		parkName = '什刹海冰鞋区门票';
	}else if(enterpriseCode == 'TgsEpcSh' && ticketGroupNum == 'TGN20211223142734998'){
		parkName = '什刹海三海';
	}else if(enterpriseCode == 'TgsEpcFhl' && ticketGroupNum == 'TGN20201228152933458'){
		parkName = '凤凰岭';
	}else if(enterpriseCode == 'TgsEpcYby' && ticketGroupNum == 'TGN20201210095942945'){
		parkName = '北京园博园';
	}else if(enterpriseCode == 'TgsEpcYby' && ticketGroupNum == 'TGN20210923092123006'){
		parkName = '北京园博园--十一特别活动';
	}else if(enterpriseCode == 'TgsEpcYby' && ticketGroupNum == 'TGN20210924083128003'){
		parkName = '园博园评书馆';
	}else if(enterpriseCode == 'TgsEpcXhg' && ticketGroupNum == 'TGN20210628140233051'){
		parkName = '北京国际鲜花港';
	}else if(enterpriseCode == 'TgsEpcXhg' && ticketGroupNum == 'TGN20210629121602397'){
		parkName = '蝴蝶大世界';
	}else if(enterpriseCode == 'TgsEpcXhg' && ticketGroupNum == 'TGN20211210160317254'){
		parkName = '冰雪嘉年华';
	}else if(enterpriseCode == 'TgsEpcSsgy' && ticketGroupNum == 'TGN20211201163921241'){
		parkName = '水上公园';
	}
	return parkName;
}



module.exports = {
	getBossInfo, 
	getBossPeoPleInfo, 
	getBossYYInfo, 
	getTicketInfo, 
	getBrakeData, 
	getCheckTicketInfo, 
	getTicketBuyInfo, 
	getAllTicketsBuyInfo,
	getCheckTicketNumberInfo,
	getTicketBuyInfoByTime
};