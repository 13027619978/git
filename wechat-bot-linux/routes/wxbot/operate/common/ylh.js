const http = require('http');
const https = require('https');
const host = "rent.smart-ideas.com.cn";
const fs = require('fs');


function getylhInfo(room){
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
		path: '/ylhpark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			var shipTotalIncome = res.data.shipTotalIncome;
			shipTotalIncome = shipTotalIncome?parseFloat(shipTotalIncome).toFixed(2):'0.00';
			var loopShipIncome = res.data.loopShipIncome;
			loopShipIncome = loopShipIncome?parseFloat(loopShipIncome).toFixed(2):'0.00';
			var ktIncome = res.data.ktIncome;
			ktIncome = ktIncome?parseFloat(ktIncome).toFixed(2):'0.00';
			var bdIncome = res.data.bdIncome;
			bdIncome = bdIncome?parseFloat(bdIncome).toFixed(2):'0.00';
			var xhwShipIncome = res.data.xhwShipIncome;
			xhwShipIncome = xhwShipIncome?parseFloat(xhwShipIncome).toFixed(2):'0.00';
			var kyShipIncome = res.data.kyShipIncome;
			kyShipIncome = kyShipIncome?parseFloat(kyShipIncome).toFixed(2):'0.00';
			var lzShipIncome = res.data.lzShipIncome;
			lzShipIncome = lzShipIncome?parseFloat(lzShipIncome).toFixed(2):'0.00';
			var nhShipIncome = res.data.nhShipIncome;
			nhShipIncome = nhShipIncome?parseFloat(nhShipIncome).toFixed(2):'0.00';
			var jyqShipIncome = res.data.jyqShipIncome;
			jyqShipIncome = jyqShipIncome?parseFloat(jyqShipIncome).toFixed(2):'0.00';
			var dqShipIncome = res.data.dqShipIncome;
			dqShipIncome = dqShipIncome?parseFloat(dqShipIncome).toFixed(2):'0.00';
			var csglShipIncome = res.data.csglShipIncome;
			csglShipIncome = csglShipIncome?parseFloat(csglShipIncome).toFixed(2):'0.00';
			var szgShipIncome = res.data.szgShipIncome;
			szgShipIncome = szgShipIncome?parseFloat(szgShipIncome).toFixed(2):'0.00';
			var yytShipIncome = res.data.yytShipIncome;
			yytShipIncome = yytShipIncome?parseFloat(yytShipIncome).toFixed(2):'0.00';
			var sgtShipIncome = res.data.sgtShipIncome;
			sgtShipIncome = sgtShipIncome?parseFloat(sgtShipIncome).toFixed(2):'0.00';
			var bdCashIncome = res.data.bdCashIncome;
			bdCashIncome = bdCashIncome?parseFloat(bdCashIncome).toFixed(2):'0.00';
			var ktCashIncome = res.data.ktCashIncome;
			ktCashIncome = ktCashIncome?parseFloat(ktCashIncome).toFixed(2):'0.00';
			var botString = '*****云龙湖自驾船报数*****\n日期:'+eDate +'\n';
			botString += '自驾船总收入：' + shipTotalIncome + '元\n';
			botString += '--------收入明细----------\n';
			botString += '杏花坞码头：' + xhwShipIncome + '元\n';
			botString += '开元宾馆码头：' + kyShipIncome + '元\n';
			botString += '老子水居码头：' + lzShipIncome + '元\n';
			botString += '南湖一号码头：' + nhShipIncome + '元\n';
			botString += '解忧桥码头：' + jyqShipIncome + '元\n';
			botString += '断桥码头：' + dqShipIncome + '元\n';
			botString += '沉水廊道码头：' + csglShipIncome + '元\n';
			botString += '水族馆（沙月岛）码头：' + szgShipIncome + '元\n';
			botString += '音乐厅码头：' + yytShipIncome + '元\n';
			botString += '苏公塔码头：' + sgtShipIncome + '元\n';
			
			let path = require('path');
			fs.readFile(path.resolve(__dirname, '../jsonData/ylhOpen.json'), 'utf8', function(err, data){
				if(err){
					return console.error(err);
				}
				data = JSON.parse(data);
				var xhw = data.xhw;
				var kybg = data.kybg;
				var lzsj = data.lzsj;
				var nhyh = data.nhyh;
				var jyq = data.jyq;
				var dq = data.dq;
				var csld = data.csld;
				var szg = data.szg;
				var yyt = data.yyt;
				var sgt = data.sgt;
				botString += '--------手动开船----------\n';
				botString += '杏花坞：' + xhw + '次\n';
				botString += '开元宾馆：' + kybg + '次\n';
				botString += '老子水居：' + lzsj + '次\n';
				botString += '南湖一号：' + nhyh + '次\n';
				botString += '解忧桥：' + jyq + '次\n';
				botString += '断桥：' + dq + '次\n';
				botString += '沉水廊道：' + csld + '次\n';
				botString += '水族馆：' + szg + '次\n';
				botString += '音乐厅：' + yyt + '次\n';
				botString += '苏公塔：' + sgt + '次\n';
				botString += '*****云龙湖摆渡船报数*****\n日期:'+eDate +'\n';
				botString += '船票总收入：' + loopShipIncome + '元\n';
				botString += '快艇收入：' + ktIncome + '元\n';
				botString += '摆渡船收入：' + bdIncome + '元\n';
				botString += '快艇现金收入：' + ktCashIncome + '元\n';
				botString += '摆渡现金收入：' + bdCashIncome + '元\n';
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

// 云龙湖电瓶车报数
function ylhdpcInfo(room){
	const options = {
		hostname: host,
		path: '/ylhpark/operationDataView/getCurrentCollection',
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
			  var botString = '*****云龙湖电瓶车报数*****\n日期:'+eDate +'\n';
			  botString += '电瓶车收入：' + dpcIncome + '元';
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



// 获取缺纸状态
function getPaperInfo(room){
	const options = {
		hostname: host,
		path: '/ylhpark/batteryDataView/getPrinterStatus',
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
		  if(isJSON(d.toString())){
			  var res = JSON.parse(d.toString());
			  var botString = '*****电瓶车打印机状态通知*****\n';
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
			  botString += '时间：' + nowTime + '\n';
			  var qzList = [];
			  res.forEach(function(value, key){
			  	if(value.status == '1' || value.status == '2' || value.status == '3' || value.status == '4'){
			  		qzList.push(value);
			  	}
			  })
			  if(qzList.length == 0){
			  	botString += '暂无缺纸情况';
			  }else{
			  	qzList.forEach(function(value,key){
			  		if(value.status == '1'){
			  			botString += value.siteName + value.printerName + '：缺纸\n';
			  		}else if(value.status == '2'){
			  			botString += value.siteName + value.printerName + '：纸将尽\n';
			  		}else if(value.status == '3'){
			  			botString += value.siteName + value.printerName + '：打开失败\n';
			  		}else if(value.status == '4'){
			  			botString += value.siteName + value.printerName + '：脱机\n';
			  		}
			  	})
			  }
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
	getylhInfo,
	ylhdpcInfo,
	getPaperInfo
}