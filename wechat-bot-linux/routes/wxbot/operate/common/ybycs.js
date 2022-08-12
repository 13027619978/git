const http = require('https');
const host = "boss.smart-ideas.com.cn";

// 核销票名数量报数
function getCheckTicketNumberInfo(room){
	var parkName = '园博园创森';
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
	options = {
		hostname: host,
		path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
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
				var number = parseInt(value.checkQuantity);
				var ticketName = value.name;
				if(ticketName == '北京园博园惠民优惠票'){
					totalNumber += number;
				}
			})
			botString += '总检票：' + totalNumber + '张\n';
			
			room.say(botString);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function getYYInfo(room){
	options = {
		hostname: host,
		path: '/ticketApi/orderView/getAppointment?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945&ticketInfoIds=2c9141f4824450b20182484a387922a9&ticketInfoIds=2c9141f481fcbf7e0182426503051325',
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var checkList = res;
			var botString = '*****园博园创森预约报数*****\n';
			checkList.forEach(function(value, key){
				if(key % 2 == 0){
					botString += value.x + '：' + value.y + '人\n';
				}
			})
			room.say(botString);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

module.exports = {
	getCheckTicketNumberInfo,
	getYYInfo
};