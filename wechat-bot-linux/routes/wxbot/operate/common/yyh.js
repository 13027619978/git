const http = require('http');
const host = "lease.smart-ideas.com.cn";
const fs = require('fs');

function getyyhInfo(host, room){
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
		path: '/yyhpark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			var bicycleIncome = res.data.bicycleIncome;
			bicycleIncome = bicycleIncome?parseFloat(bicycleIncome).toFixed(2):'0.00';
			var driveShipIncome = res.data.driveShipIncome;
			driveShipIncome = driveShipIncome?parseFloat(driveShipIncome).toFixed(2):'0.00';
			var shipIncome = res.data.shipIncome;
			shipIncome = shipIncome?parseFloat(shipIncome).toFixed(2):'0.00';
	    	var botString = '*****野鸭湖报数*****\n日期:'+eDate +'\n';
			botString += '自行车收入：' + bicycleIncome + '元\n';
			botString += '电瓶车收入：' + driveShipIncome + '元\n';
			botString += '电瓶船收入：' + shipIncome + '元\n';
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
		path: '/yyhpark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			var bicycleIncome = res.data[0].bicycleIncome;
			bicycleIncome = bicycleIncome?parseFloat(bicycleIncome).toFixed(2):'0.00';
			var botString = '*****野鸭湖报数*****\n日期:'+eDate +'\n';
			botString += '自行车收入：' + bicycleIncome + '元\n';
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

module.exports = {
	getyyhInfo
}