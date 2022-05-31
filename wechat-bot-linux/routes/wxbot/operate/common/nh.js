var util = require('util');
const https = require('https');
const host = "lease.smart-ideas.com.cn";

function getIncome(room, deviceType){
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
		hostname: host,
		path: '/nhpark/operation/getDeviceIncome?startDate=' + startDate + '&endDate=' + endDate,
		method: 'GET'
	};
	
	const req = https.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var bikeIncome = parseFloat(res[0].bikeIncome).toFixed(2);
			var batteryIncome = parseFloat(res[0].batteryIncome).toFixed(2);
			var shipIncome = parseFloat(res[0].shipIncome).toFixed(2);
			var ferryIncome = parseFloat(res[0].ferryIncome).toFixed(2);
			var botString = '';
			if(deviceType == 'bike'){
				botString += '*****自行车报数*****\n';
				botString += '时间：' + nowTime + '\n';
				botString += '自行车收入：' + bikeIncome;
			}else if(deviceType == 'battery'){
				botString += '*****电瓶车报数*****\n';
				botString += '时间：' + nowTime + '\n';
				botString += '电瓶车收入：' + batteryIncome;
			}else{
				botString += '*****游船报数*****\n';
				botString += '时间：' + nowTime + '\n';
				botString += '自驾船收入：' + shipIncome + '\n';
				botString += '摆渡船收入：' + ferryIncome;
			}
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

module.exports = {getIncome};