const http = require('http');
const https = require('https');
const host = "rent.smart-ideas.com.cn";
const fs = require('fs');


function getnbhInfo(room){
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
		path: '/nbhpark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			var shipTotalIncome = res.data.shipTotalIncome;
			shipTotalIncome = shipTotalIncome?parseFloat(shipTotalIncome).toFixed(2):'0.00';
			
			var canoeDJIncome = res.data.canoeDJIncome;
			canoeDJIncome = canoeDJIncome?parseFloat(canoeDJIncome).toFixed(2):'0.00';
			
			var canoeTJIncome = res.data.canoeTJIncome;
			canoeTJIncome = canoeTJIncome?parseFloat(canoeTJIncome).toFixed(2):'0.00';
			
			var botString = '*****南北湖自驾船报数*****\n日期:'+eDate +'\n';
			botString += '自驾船收入：' + shipTotalIncome + '元\n';
			botString += '单人桨板票票收入：' + canoeDJIncome + '元\n';
			botString += '团体桨板票收入：' + canoeTJIncome + '元';
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

function getnbhPhtInfo(room){
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
		path: '/nbhpark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			var canoeIncome = res.data.canoeIncome;
			canoeIncome = canoeIncome?parseFloat(canoeIncome).toFixed(2):'0.00';
			
			var canoeDIncome = res.data.canoeDIncome;
			canoeDIncome = canoeDIncome?parseFloat(canoeDIncome).toFixed(2):'0.00';
			
			var canoeTIncome = res.data.canoeTIncome;
			canoeTIncome = canoeTIncome?parseFloat(canoeTIncome).toFixed(2):'0.00';
			
			var canoeBIncome = res.data.canoeBIncome;
			canoeBIncome = canoeBIncome?parseFloat(canoeBIncome).toFixed(2):'0.00';
			
			var canoeDJIncome = res.data.canoeDJIncome;
			canoeDJIncome = canoeDJIncome?parseFloat(canoeDJIncome).toFixed(2):'0.00';
			
			var canoeTJIncome = res.data.canoeTJIncome;
			canoeTJIncome = canoeTJIncome?parseFloat(canoeTJIncome).toFixed(2):'0.00';
			
			var botString = '*****南北湖皮划艇报数*****\n日期:'+eDate +'\n';
			botString += '总收入：' + canoeIncome + '元\n';
			botString += '皮划艇单人票收入：' + canoeDIncome + '元\n';
			botString += '皮划艇半价票收入：' + canoeBIncome + '元\n';
			botString += '皮划艇团体票收入：' + canoeTIncome + '元\n';
			botString += '单人桨板票票收入：' + canoeDJIncome + '元\n';
			botString += '团体桨板票收入：' + canoeTJIncome + '元';
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

// 获取电瓶车报数
function getnbhDpcInfo(room){
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
		path: '/nbhpark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			var dpcIncome = res.data.canoeIncome;
			dpcIncome = dpcIncome?parseFloat(dpcIncome).toFixed(2):'0.00';
			
			var botString = '*****南北湖电瓶车报数*****\n日期:'+eDate +'\n';
			botString += '总收入：' + dpcIncome + '元\n';
			botString += '----------------------\n';
			botString += '10元票收入：' + dpcIncome + '元\n';
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
	getnbhInfo,
	getnbhPhtInfo,
	getnbhDpcInfo
}