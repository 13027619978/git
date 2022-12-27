const http = require('http');
const host = "api.smart-ideas.com.cn";
const fs = require('fs');

function getJJJInfo(room){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var dateString = year + '-' + month + '-' + day;
	const options = {
		hostname: 'node.smart-ideas.com.cn',
		path: '/datav/fhl/getUserInfo',
		port: 3001,
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
			if(res.success == 'true'){
				let useList = res.data;
				let currList = useList[useList.length - 1];
				let useNumber = currList.useList.length;
				var botString;
				botString = '*****凤凰岭京津冀年卡核销报数*****\n时间：' + dateString;
				botString += '\n京津冀年卡：' + useNumber + '张';
				room.say(botString);
			}else{
				room.say(res.msg);
			}
		})
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function fhlGetHxInfo(room){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var dateString = year + '-' + month + '-' + day;
	const options = {
		hostname: host,
		path: '/phoenixpark/ticketsRobot/getTicketsCheckCollection?date=' + dateString,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
		var botString;
		botString = '*****凤凰岭核销报数*****\n时间：' + dateString;
	    if(res.code == 'SUCCESS'){
			// 总核销数
	    	var checkTotal = res.data.checkTotal;
			checkTotal = checkTotal?checkTotal:0;
			
			// 携程核销金额
			var xcCheckMoney = res.data.xcCheckMoney;
			xcCheckMoney = xcCheckMoney?xcCheckMoney:0;
			xcCheckMoney = parseFloat(xcCheckMoney).toFixed(2);
			// 携程核销数
			var xcCheckTotal = res.data.xcCheckTotal;
			xcCheckTotal = xcCheckTotal?xcCheckTotal:0;
			
			// H5全价
			var h5FullCheckMoney = res.data.h5FullCheckMoney;
			h5FullCheckMoney = h5FullCheckMoney?h5FullCheckMoney:0;
			h5FullCheckMoney = parseFloat(h5FullCheckMoney).toFixed(2);
			// H5全价
			var h5FullCheckTotal = res.data.h5FullCheckTotal;
			h5FullCheckTotal = h5FullCheckTotal?h5FullCheckTotal:0;
			
			// H5半价
			var h5HalfCheckMoney = res.data.h5HalfCheckMoney;
			h5HalfCheckMoney = h5HalfCheckMoney?h5HalfCheckMoney:0;
			h5HalfCheckMoney = parseFloat(h5HalfCheckMoney).toFixed(2);
			// H5半价
			var h5HalfCheckTotal = res.data.h5HalfCheckTotal;
			h5HalfCheckTotal = h5HalfCheckTotal?h5HalfCheckTotal:0;
			
			// 套票
			var h5DiscountsCheckMoney = res.data.h5DiscountsCheckMoney;
			h5DiscountsCheckMoney = h5DiscountsCheckMoney?h5DiscountsCheckMoney:0;
			h5DiscountsCheckMoney = parseFloat(h5DiscountsCheckMoney).toFixed(2);
			var h5DiscountsCheckTotal = res.data.h5DiscountsCheckTotal;
			h5DiscountsCheckTotal = h5DiscountsCheckTotal?h5DiscountsCheckTotal:0;
				
			// 微信上账总额
			var resultMoney = parseFloat(xcCheckMoney) + parseFloat(h5FullCheckMoney) + parseFloat(h5HalfCheckMoney) + parseFloat(h5DiscountsCheckMoney);
			resultMoney = parseFloat(resultMoney).toFixed(2);
			botString += '\n总核销数：' + checkTotal + '人';
			botString += '\n核销总额：' + resultMoney + '元';
			botString += '\n携程核销：' + xcCheckTotal + '人 ' + xcCheckMoney + '元';
			botString += '\nH5全价核销：' + h5FullCheckTotal + '人 ' + h5FullCheckMoney + '元';
			botString += '\nH5半价核销：' + h5HalfCheckTotal + '人 ' + h5HalfCheckMoney + '元';
			botString += '\nH5套票核销：' + h5DiscountsCheckTotal + '张 ' + h5DiscountsCheckMoney + '元';
			try{
				room.say(botString);
			}catch(e){
				
			}
	    }else{
			try{
				room.say(res.msg);
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

// 核销票种报数
function getCheckTicketInfo(enterpriseCode, ticketGroupNum, room, ticketSalesChannelsNum){
	var parkName = '凤凰岭';
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
				totalNumber += number;
				if(ticketName.indexOf('年票') == -1){
					totalMoney += money;
					ListString += ticketName + '：' + number + '张   ' + money.toFixed(2) + '元\n';
				}else{
					ListString += ticketName + '：' + number + '张\n';
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
	var parkName = '凤凰岭';
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
	if(!state){
		state = 0;
	}
	const options = {
		hostname: 'boss.smart-ideas.com.cn',
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
			const options1 = {
				hostname: 'boss.smart-ideas.com.cn',
				path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
				method: 'GET'
			};
			
			const req1 = http.request(options1, (res) => {
				res.on('data', (d) => {
					var res = JSON.parse(d.toString());
					var checkList1 = res.data;
					// 年票总数
					var npTotal = 0;
					// 年票总金额
					var npTotalMoney = 0;
					checkList1.forEach(function(value, key){
						var money1 = parseFloat(value.checkMoney);
						var number1 = parseInt(value.checkQuantity);
						var ticketName = value.name;
						if(ticketName.indexOf('年票') != -1){
							npTotal += number1;
							npTotalMoney += money1;
						}
					})
					checkList.forEach(function(value, key){
						var money = parseFloat(value.checkMoney);
						var number = parseInt(value.checkQuantity);
						var ticketName = value.name;
						if(ticketName == 'web端'){
							ticketName = '微信端';
						}
						if(ticketName == '微信端'){
							number -= npTotal;
							money -= npTotalMoney;
						}
						totalMoney += money;
						totalNumber += number;
						ListString += ticketName + '已检票：' + number + '张\n';
						ListString += ticketName + '已检票金额：' + money.toFixed(2) + '元\n';
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

module.exports = {
	fhlGetHxInfo,
	getCheckTicketInfo,
	getBossInfo,
	getJJJInfo
}