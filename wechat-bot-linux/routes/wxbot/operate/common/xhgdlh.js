const https = require('https');
const host = "iot.smart-ideas.com.cn";
const fs = require('fs');

function getdlhInfo(host, room){
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
		path: '/iotsmart/ticketsRobot/getDy?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = https.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			var checkTotal = res.data.checkTotal;
			checkTotal = checkTotal?checkTotal:'0';
			
			var inTotal = res.data.inTotal;
			inTotal = inTotal?inTotal:'0';
			
			var packageCheckTotal = res.data.packageCheckTotal;
			packageCheckTotal = packageCheckTotal?packageCheckTotal:'0';
			var packageCheckMoney = res.data.packageCheckMoney;
			packageCheckMoney = packageCheckMoney?packageCheckMoney:'0.00';
			packageCheckMoney = parseFloat(packageCheckMoney).toFixed(2);
			
			var singleCheckTotal = res.data.singleCheckTotal;
			singleCheckTotal = singleCheckTotal?singleCheckTotal:'0';
			var singleCheckMoney = res.data.singleCheckMoney;
			singleCheckMoney = singleCheckMoney?singleCheckMoney:'0.00';
			singleCheckMoney = parseFloat(singleCheckMoney).toFixed(2);
			
			var mtCheckTotal = res.data.mtCheckTotal;
			mtCheckTotal = mtCheckTotal?mtCheckTotal:'0';
			var mtCheckMoney = res.data.mtCheckMoney;
			mtCheckMoney = mtCheckMoney?mtCheckMoney:'0.00';
			mtCheckMoney = parseFloat(mtCheckMoney).toFixed(2);
			
			var xcCheckTotal = res.data.xcCheckTotal;
			xcCheckTotal = xcCheckTotal?xcCheckTotal:'0';
			var xcCheckMoney = res.data.xcCheckMoney;
			xcCheckMoney = xcCheckMoney?xcCheckMoney:'0.00';
			xcCheckMoney = parseFloat(xcCheckMoney).toFixed(2);
			
			var freeCheckTotal = res.data.freeCheckTotal;
			freeCheckTotal = freeCheckTotal?freeCheckTotal:'0';
			
			var windowCheckTotal = res.data.windowCheckTotal;
			windowCheckTotal = windowCheckTotal?windowCheckTotal:'0';
			
			var window50CheckTotal = res.data.window50CheckTotal;
			window50CheckTotal = window50CheckTotal?window50CheckTotal:'0';
			var window50CheckTotalMoney = res.data.window50CheckTotalMoney;
			window50CheckTotalMoney = window50CheckTotalMoney?window50CheckTotalMoney:'0.00';
			window50CheckTotalMoney = parseFloat(window50CheckTotalMoney).toFixed(2);
			
			var window70CheckTotal = res.data.window70CheckTotal;
			window70CheckTotal = window70CheckTotal?window70CheckTotal:'0';
			var window70CheckTotalMoney = res.data.window70CheckTotalMoney;
			window70CheckTotalMoney = window70CheckTotalMoney?window70CheckTotalMoney:'0.00';
			window70CheckTotalMoney = parseFloat(window70CheckTotalMoney).toFixed(2);
			
	    	var botString = '*****蝶馆每日报数*****\n日期:'+eDate +'\n';
			botString += '当日总核销：' + checkTotal + '人\n';
			botString += '在馆人数：' + inTotal + '人\n';
			botString += '非窗口套票核销：' + packageCheckTotal + '张 ' + packageCheckMoney + '元\n';
			botString += '非窗口单票核销：' + singleCheckTotal + '张 ' + singleCheckMoney + '元\n';
			botString += '窗口套票核销：' + window70CheckTotal + '张 ' + window70CheckTotalMoney + '元\n';
			botString += '窗口单票核销：' + window50CheckTotal + '张 ' + window50CheckTotalMoney + '元\n';
			botString += '蝶恋花政策性免票核销：' + freeCheckTotal + '张\n';
			
			botString += '-------------------------\n';
			botString += '美团核销：' + mtCheckTotal + '张 ' + mtCheckMoney + '元\n';
			botString += '携程核销：' + xcCheckTotal + '张 ' + xcCheckMoney + '元\n';
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

module.exports = {getdlhInfo};