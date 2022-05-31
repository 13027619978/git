const http = require('http');

function getxtybyInfo(host, room){
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
		path: '/xtybypark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			var bikeTotalIncome = res.data.bikeTotalIncome;
			bikeTotalIncome = bikeTotalIncome?parseFloat(bikeTotalIncome).toFixed(2):'0.00';
			var bikeTwoIncome = res.data.bikeTwoIncome;
			bikeTwoIncome = bikeTwoIncome?parseFloat(bikeTwoIncome).toFixed(2):'0.00';
			var bikeFourIncome = res.data.bikeFourIncome;
			bikeFourIncome = bikeFourIncome?parseFloat(bikeFourIncome).toFixed(2):'0.00';
			getBikeMonthIncome(bikeTotalIncome, bikeTwoIncome, bikeFourIncome, room);
	    }
	  });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function getBikeMonthIncome(totalIncome, bikeTwoIncome, bikeFourIncome, room){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var lastMonth = parseInt(month) - 1;
	lastMonth = lastMonth==0?12:lastMonth>9?lastMonth:'0'+lastMonth;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var hour = nowDate.getHours();
	hour = hour>9?hour:'0'+hour;
	var minutes = nowDate.getMinutes();
	minutes = minutes>9?minutes:'0'+minutes;
	var seconds = nowDate.getSeconds();
	seconds = seconds>9?seconds:'0'+seconds;
	var currDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	
	var sDate = year + '-' + lastMonth + '-26' + ' 00:00:00';
	var eDate = year + '-' + month + '-25' + ' 23:59:59';
	var searchSdate = encodeURI(sDate);
	var searchEdate = encodeURI(eDate);
	const options = {
		hostname: 'rent.smart-ideas.com.cn',
		path: '/xtybypark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			var bikeTotalIncome = res.data.bikeTotalIncome;
			bikeTotalIncome = bikeTotalIncome?parseFloat(bikeTotalIncome).toFixed(2):'0.00';
			getBikeTotalIncome(totalIncome, bikeTwoIncome, bikeFourIncome, bikeTotalIncome, room);
	    }
	  });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function getBikeTotalIncome(totalIncome, bikeTwoIncome, bikeFourIncome, bikeMonthIncome, room){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var lastMonth = parseInt(month) - 1;
	lastMonth = lastMonth==0?12:lastMonth>9?lastMonth:'0'+lastMonth;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var hour = nowDate.getHours();
	hour = hour>9?hour:'0'+hour;
	var minutes = nowDate.getMinutes();
	minutes = minutes>9?minutes:'0'+minutes;
	var seconds = nowDate.getSeconds();
	seconds = seconds>9?seconds:'0'+seconds;
	var eDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	
	var sDate = '2022-02-01 00:00:00';
	var searchSdate = encodeURI(sDate);
	var searchEdate = encodeURI(eDate);
	const options = {
		hostname: 'rent.smart-ideas.com.cn',
		path: '/xtybypark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
		console.log(res);
	    if(res.code == "SUCCESS"){
			var bikeTotalIncome = res.data.bikeTotalIncome;
			bikeTotalIncome = bikeTotalIncome?parseFloat(bikeTotalIncome).toFixed(2):'0.00';
	    	var botString = '*****邢台园博园报数*****\n日期:'+eDate +'\n';
			botString += '自行车今日收入：' + totalIncome + '元\n';
			botString += '双人自行车收入：' + bikeTwoIncome + '元\n';
			botString += '四人自行车收入：' + bikeFourIncome + '元\n';
			botString += '---------------------------\n';
			botString += '当月汇总收入：' + bikeMonthIncome + '元\n';
			botString += '---------------------------\n';
			botString += '累计总收入：' + bikeTotalIncome + '元';
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

// 电瓶车报数
function xtybydpcInfo(room){
	const options = {
		hostname: 'rent.smart-ideas.com.cn',
		path: '/xtybypark/operationDataView/getCurrentCollection',
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
		  if(isJSON(d.toString())){
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
			  var eDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
			  var res = JSON.parse(d.toString());
			  var incomeList = res;
			  var dpcIncome;
			  incomeList.forEach(function(value, key){
			    if(value.name == '电瓶车'){
			      dpcIncome = parseFloat(value.value).toFixed(2);
				  dpcIncome = dpcIncome?dpcIncome:'0.00';
			    }
			  })
			  var botString = '*****邢台园博园观光车报数*****\n日期：'+eDate +'\n';
			  botString += '观光车收入：' + dpcIncome + '元';
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
	getxtybyInfo,
	xtybydpcInfo
}