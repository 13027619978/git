const http = require('http');
const host = "lease.smart-ideas.com.cn";


function getPosIncome(room){
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
		path: '/schpark/collectionOrder/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			var totalIncome = 0;
			var botString = '*****什刹海点位报数*****\n日期:'+eDate +'\n';
			var listString = '';
			res.data.forEach(function(value, key){
				totalIncome += parseFloat(value.money);
				listString += value.name + '：' + value.money + '元\n';
			})
			botString += '总金额：' + totalIncome + '元\n';
			botString += '--------------------\n';
			botString += listString;
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

function getCheckTicketInfo(enterpriseCode, ticketGroupNum, room, ticketSalesChannelsNum){
	var parkName = '什刹海三海';
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
			let qhTotal = 0;
			let hhTotal = 0;
			let shTotal = 0;
			checkList.forEach(function(value, key){
				var money = parseFloat(value.checkMoney);
				var number = parseInt(value.checkQuantity);
				var ticketName = value.name;
				totalMoney += money;
				totalNumber += number;
				ListString += ticketName + '：' + number + '张   ' + money.toFixed(2) + '元\n';
				
				// 统计门区核销
				if(ticketName.indexOf('前海') != -1){
					qhTotal += number;
				}
				if(ticketName.indexOf('后海') != -1){
					hhTotal += number;
				}
				if(ticketName.indexOf('速滑') != -1){
					shTotal += number;
				}
			})
			botString += '总检票：' + totalNumber + '张\n';
			botString += '总检票金额：' + parseFloat(totalMoney).toFixed(2) + '元\n';
			botString += '--------------------\n';	
			botString += ListString;
			botString += '--------------------\n';
			botString += '前海区验票: ' + qhTotal + '张\n';
			botString += '后海区验票: ' + hhTotal + '张\n';
			botString += '速滑区验票: ' + shTotal + '张';
			room.say(botString);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
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
	var searchSdate = encodeURI(sDate);
	var searchEdate = encodeURI(eDate);
	const options = {
		hostname: 'lease.smart-ideas.com.cn',
		path: '/schpark/collection/get?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
		var leaseInfo = res.data.leaseCollection;
		var totalMoney = leaseInfo.totalMoney;
		totalMoney = totalMoney?totalMoney:'0';
		var bxTotalMoney = leaseInfo.bxTotalMoney;
		bxTotalMoney = bxTotalMoney?bxTotalMoney:'0';
		var bxCashTotalMoney = leaseInfo.bxCashTotalMoney;
		bxCashTotalMoney = bxCashTotalMoney?bxCashTotalMoney:'0';
		var jlcTotalMoney = leaseInfo.jlcTotalMoney;
		jlcTotalMoney = jlcTotalMoney?jlcTotalMoney:'0';
		var jlcCashTotalMoney = leaseInfo.jlcCashTotalMoney;
		jlcCashTotalMoney = jlcCashTotalMoney?jlcCashTotalMoney:'0';
		
		var botString = '*****什刹海租赁报数*****\n日期:'+eDate +'\n';
		botString += '总金额：' + totalMoney + '元\n';
		botString += '----------------------\n';
		botString += '冰鞋微信收入: ' + bxTotalMoney + '元\n';
		botString += '冰鞋现金收入: ' + bxCashTotalMoney + '元\n';
		botString += '教练车微信收入: ' + jlcTotalMoney + '元\n';
		botString += '教练车现金收入: ' + jlcCashTotalMoney + '元\n';
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

function refund(orderCode, refundMoney, room){
	const options = {
		hostname: 'lease.smart-ideas.com.cn',
		path: '/schpark/leaseOrder/robot/refund',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			room.say(res.msg);
		});
	});
	
	req.write(JSON.stringify({orderCode: orderCode, refundMoney: refundMoney}));
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function posRefund(orderCode, refundMoney, room){
	const options = {
		hostname: 'lease.smart-ideas.com.cn',
		path: '/schpark/collectionOrder/robot/refund',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			room.say(res.msg);
		});
	});
	
	req.write(JSON.stringify({orderCode: orderCode, refundMoney: refundMoney}));
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }

        } catch(e) {
            console.log('error：'+str+'!!!'+e);
            return false;
        }
    }
    console.log('It is not a string!')
}


module.exports = {
	getPosIncome,
	getCheckTicketInfo,
	getLeaseInfo,
	refund,
	posRefund
}