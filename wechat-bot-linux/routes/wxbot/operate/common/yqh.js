const http = require('http');
const host = "api.smart-ideas.com.cn";
const fs = require('fs');

function getyqhInfo(host, room){
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
		path: '/yqhpark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			var yqhTotalIncome = res.data[0].yqhTotalIncome;
			yqhTotalIncome = yqhTotalIncome?parseFloat(yqhTotalIncome).toFixed(2):'0.00';
			var rcdfTotalIncome = res.data[0].rcdfTotalIncome;
			rcdfTotalIncome = rcdfTotalIncome?parseFloat(rcdfTotalIncome).toFixed(2):'0.00';
			var ghxyTotalIncome = res.data[0].ghxyTotalIncome;
			ghxyTotalIncome = ghxyTotalIncome?parseFloat(ghxyTotalIncome).toFixed(2):'0.00';
	    	var botString = '*****雁栖湖报数*****\n日期:'+eDate +'\n';
			botString += '主码头自驾船收入：' + yqhTotalIncome + '元\n';
			botString += '日出东方自驾船收入：' + rcdfTotalIncome + '元\n';
			botString += '古槐溪语自驾船收入：' + ghxyTotalIncome + '元\n';
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
		path: '/yqhpark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			var yqhTotalIncome = res.data[0].yqhTotalIncome;
			yqhTotalIncome = yqhTotalIncome?parseFloat(yqhTotalIncome).toFixed(2):'0.00';
			var rcdfTotalIncome = res.data[0].rcdfTotalIncome;
			rcdfTotalIncome = rcdfTotalIncome?parseFloat(rcdfTotalIncome).toFixed(2):'0.00';
			var ghxyTotalIncome = res.data[0].ghxyTotalIncome;
			ghxyTotalIncome = ghxyTotalIncome?parseFloat(ghxyTotalIncome).toFixed(2):'0.00';
	    	var botString = '*****雁栖湖报数*****\n日期:'+eDate +'\n';
			botString += '主码头自驾船收入：' + yqhTotalIncome + '元\n';
			botString += '日出东方自驾船收入：' + rcdfTotalIncome + '元\n';
			botString += '古槐溪语自驾船收入：' + ghxyTotalIncome + '元\n';
			let path = require('path');
			fs.readFile(path.resolve(__dirname, '../jsonData/yqhOpen.json'), 'utf8', function(err, data){
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
					fs.writeFile(path.resolve(__dirname, '../jsonData/yqhOpen.json'), JSON.stringify(yqhData),function(err){
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


// 获取电瓶车收入
function getYqhdpcInfo(room){
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
	var startDate = year + '-' + month + '-' + day + ' 00:00:00';
	var endDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	var dateString = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	const options = {
		hostname: host,
		path: '/yqhpark/collection/deviceBattery/get?startDate=' + encodeURI(startDate) + '&endDate=' + encodeURI(endDate),
		method: 'GET'
	};
	const req = http.request(options, (res) => {
	    res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var totalMoney = parseFloat(res.data.totalMoney).toFixed(2);
			var ggdcMoney = parseFloat(res.data.ggdcMoney).toFixed(2);
			var ggtMoney = parseFloat(res.data.ggtMoney).toFixed(2);
			var ggdcfMoney = parseFloat(res.data.ggdcfMoney).toFixed(2);
			var ggtfMoney = parseFloat(res.data.ggtfMoney).toFixed(2);
			var xhcdcMoney = parseFloat(res.data.xhcdcMoney).toFixed(2);
			var xhcwfMoney = parseFloat(res.data.xhcwfMoney).toFixed(2);
			var xhcycMoney = parseFloat(res.data.xhcycMoney).toFixed(2);
			var xhcTotal = parseFloat(parseFloat(xhcdcMoney) + parseFloat(xhcwfMoney) + parseFloat(xhcycMoney)).toFixed(2);
			var ggTotal = parseFloat(parseFloat(ggdcMoney) + parseFloat(ggtMoney) + parseFloat(ggdcfMoney) + parseFloat(ggtfMoney)).toFixed(2);
			var botString = '*****雁栖湖电瓶车报数*****\n时间：' + dateString;
			botString += '\n总收入：' + totalMoney + '元';
			botString += '\n----------------------';
			botString += '\n小火车总收入：' + xhcTotal + '元';
			botString += '\n小火车20元票：' + xhcdcMoney + '元';
			botString += '\n小火车30元票：' + xhcwfMoney + '元';
			botString += '\n小火车夜间票：' + xhcycMoney + '元';
			botString += '\n----------------------';
			botString += '\n观光车总收入：' + ggTotal + '元';
			botString += '\n观光车上行10元票：' + ggdcMoney + '元';
			botString += '\n观光车上行30元票：' + ggtMoney + '元';
			botString += '\n观光车下行10元票：' + ggdcfMoney + '元';
			botString += '\n观光车下行30元票：' + ggtfMoney + '元';
			if(isNaN(parseInt(totalMoney))){
				getYqhdpcInfo(room);
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


module.exports = {
	getyqhInfo,
	getOpenNumber,
	getYqhdpcInfo
}