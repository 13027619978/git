const http = require('http');
const https = require('https');
const host = "hd.smart-ideas.com.cn";
const fs = require('fs');


function getxwhInfo(host, room){
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
		path: '/xwhpark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    if(res.code == "SUCCESS"){
			// 摆渡船
			var loopShipIncome = res.data.loopShipIncome;
			loopShipIncome = loopShipIncome?parseInt(loopShipIncome):0;
			var hzLoopShipCardIncome = res.data.hzLoopShipCardIncome;
			hzLoopShipCardIncome = hzLoopShipCardIncome?parseInt(hzLoopShipCardIncome):0;
			var hzLoopShipIncome = res.data.hzLoopShipIncome;
			hzLoopShipIncome = hzLoopShipIncome?parseInt(hzLoopShipIncome):0;
			var dkLoopShipIncome = res.data.dkLoopShipIncome;
			dkLoopShipIncome = dkLoopShipIncome?parseInt(dkLoopShipIncome):0;
			var dkLoopShipCardIncome = res.data.dkLoopShipCardIncome;
			dkLoopShipCardIncome = dkLoopShipCardIncome?parseInt(dkLoopShipCardIncome):0;
			var hzLoopIncome = parseInt(hzLoopShipIncome + hzLoopShipCardIncome);
			var dkLoopIncome = parseInt(dkLoopShipIncome + dkLoopShipCardIncome);
			var loopCardTotal = parseInt(hzLoopShipCardIncome + dkLoopShipCardIncome);
			
			// 自驾船
			var shipTotalIncome = res.data.shipTotalIncome;
			shipTotalIncome = shipTotalIncome?parseInt(shipTotalIncome):0;
			var jfmShipIncome = res.data.jfmShipIncome;
			jfmShipIncome = jfmShipIncome?parseInt(jfmShipIncome):0;
			var tltShipIncome = res.data.tltShipIncome;
			tltShipIncome = tltShipIncome?parseInt(tltShipIncome):0;
			var xwmShipIncome = res.data.xwmShipIncome;
			xwmShipIncome = xwmShipIncome?parseInt(xwmShipIncome):0;
			var lzShipIncome = res.data.lzShipIncome;
			lzShipIncome = lzShipIncome?parseInt(lzShipIncome):0;
			var xwmbShipIncome = res.data.xwmbShipIncome;
			xwmbShipIncome = xwmbShipIncome?parseInt(xwmbShipIncome):0;
			var hhyShipIncome = res.data.hhyShipIncome;
			hhyShipIncome = hhyShipIncome?parseInt(hhyShipIncome):0;
			var hpmShipIncome = res.data.hpmShipIncome;
			hpmShipIncome = hpmShipIncome?parseInt(hpmShipIncome):0;
			var czmShipIncome = res.data.czmShipIncome;
			czmShipIncome = czmShipIncome?parseInt(czmShipIncome):0;
			var ygShipIncome = res.data.ygShipIncome;
			ygShipIncome = ygShipIncome?parseInt(ygShipIncome):0;
			var fqShipIncome = res.data.fqShipIncome;
			fqShipIncome = fqShipIncome?parseInt(fqShipIncome):0;
			var gpdShipIncome = res.data.gpdShipIncome;
			gpdShipIncome = gpdShipIncome?parseInt(gpdShipIncome):0;
			var hzShipIncome = res.data.hzShipIncome;
			hzShipIncome = hzShipIncome?parseInt(hzShipIncome):0;
			var tltxShipIncome = res.data.tltxShipIncome;
			tltxShipIncome = tltxShipIncome?parseInt(tltxShipIncome):0;
			
			var cardIncome = res.data.cardIncome;
			cardIncome = cardIncome?parseInt(cardIncome):0;
			var cashIncome = res.data.cashIncome;
			cashIncome = cashIncome?parseInt(cashIncome):0;
			var botString = '*****玄武湖自驾船报数*****\n日期:'+eDate +'\n';
			botString += '自驾船总收入：' + shipTotalIncome + '元\n';
			botString += '包含一卡通：' + cardIncome + '元\n';
			botString += '包含现金：' + cashIncome + '元\n';
			botString += '--------收入明细----------\n';
			botString += '解放门：' + jfmShipIncome + '元\n';
			botString += '台菱堤：' + tltShipIncome + '元\n';
			botString += '玄武门南：' + xwmShipIncome + '元\n';
			botString += '菱洲：' + lzShipIncome + '元\n';
			botString += '玄武门北：' + xwmbShipIncome + '元\n';
			botString += '后湖印月：' + hhyShipIncome + '元\n';
			botString += '和平门：' + hpmShipIncome + '元\n';
			botString += '翠洲门：' + czmShipIncome + '元\n';
			botString += '阳光：' + ygShipIncome + '元\n';
			botString += '芳桥：' + fqShipIncome + '元\n';
			botString += '郭璞敦：' + gpdShipIncome + '元\n';
			botString += '环洲：' + hzShipIncome + '元\n';
			botString += '台菱堤西：' + tltxShipIncome + '元\n';
			
			let path = require('path');
			fs.readFile(path.resolve(__dirname, '../jsonData/xwhOpen.json'), 'utf8', function(err, data){
				if(err){
					return console.error(err);
				}
				data = JSON.parse(data);
				var jfm = data.jfm;
				var lz = data.lz;
				var tld = data.tld;
				var xwm = data.xwm;
				var xwmb = data.xwmb;
				var hhyy = data.hhyy;
				var hpm = data.hpm;
				var czm = data.czm;
				var yg = data.yg;
				var fq = data.fq;
				var gpd = data.gpd;
				var hz = data.hz;
				var tldx = data.tldx;
				botString += '--------手动开船----------\n';
				botString += '玄武门南：' + xwm + '次\n';
				botString += '解放门：' + jfm + '次\n';
				botString += '台菱堤：' + tld + '次\n';
				botString += '菱洲：' + lz + '次\n';
				botString += '玄武门北：' + xwmb + '次\n';
				botString += '后湖印月：' + hhyy + '次\n';
				botString += '和平门：' + hpm + '次\n';
				botString += '翠洲门：' + czm + '次\n';
				botString += '阳光：' + yg + '次\n';
				botString += '芳桥：' + fq + '次\n';
				botString += '郭璞敦：' + gpd + '次\n';
				botString += '环洲：' + hz + '次\n';
				botString += '台菱堤西：' + tldx + '次\n';
				botString += '*****玄武湖摆渡船报数*****\n日期:'+eDate +'\n';
				botString += '摆渡船总收入：' + loopShipIncome + '元\n';
				botString += '包含一卡通：' + loopCardTotal + '元\n';
				botString += '环洲收入：' + hzLoopIncome + '元\n';
				botString += '渡口收入：' + dkLoopIncome + '元\n';
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

function getEveningInfo(allShipTotalIncome, allLoopShipIncome, allJfmShipIncome, allTltShipIncome, allXwmShipIncome, allLzShipIncome, room){
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
	var sDate = year + '-' + month + '-' + day + ' 17:00:00';
	var eDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	var searchSdate = encodeURI(sDate);
	var searchEdate = encodeURI(eDate);
	const options = {
		hostname: host,
		path: '/xwhpark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
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
			var jfmShipIncome = res.data.jfmShipIncome;
			jfmShipIncome = jfmShipIncome?parseFloat(jfmShipIncome).toFixed(2):'0.00';
			var tltShipIncome = res.data.tltShipIncome;
			tltShipIncome = tltShipIncome?parseFloat(tltShipIncome).toFixed(2):'0.00';
			var xwmShipIncome = res.data.xwmShipIncome;
			xwmShipIncome = xwmShipIncome?parseFloat(xwmShipIncome).toFixed(2):'0.00';
			var lzShipIncome = res.data.lzShipIncome;
			lzShipIncome = lzShipIncome?parseFloat(lzShipIncome).toFixed(2):'0.00';
			var xwmbShipIncome = res.data.xwmbShipIncome;
			xwmbShipIncome = xwmbShipIncome?parseFloat(xwmbShipIncome).toFixed(2):'0.00';
			var hhyShipIncome = res.data.hhyShipIncome;
			hhyShipIncome = hhyShipIncome?parseFloat(hhyShipIncome).toFixed(2):'0.00';
			var hpmShipIncome = res.data.hpmShipIncome;
			hpmShipIncome = hpmShipIncome?parseFloat(hpmShipIncome).toFixed(2):'0.00';
			var czmShipIncome = res.data.czmShipIncome;
			czmShipIncome = czmShipIncome?parseFloat(czmShipIncome).toFixed(2):'0.00';
			var ygShipIncome = res.data.ygShipIncome;
			ygShipIncome = ygShipIncome?parseFloat(ygShipIncome).toFixed(2):'0.00';
			var fqShipIncome = res.data.fqShipIncome;
			fqShipIncome = fqShipIncome?parseFloat(fqShipIncome).toFixed(2):'0.00';
			var gpdShipIncome = res.data.gpdShipIncome;
			gpdShipIncome = gpdShipIncome?parseFloat(gpdShipIncome).toFixed(2):'0.00';
			var hzShipIncome = res.data.hzShipIncome;
			hzShipIncome = hzShipIncome?parseFloat(hzShipIncome).toFixed(2):'0.00';
			var botString = '*****玄武湖自驾船报数*****\n日期:'+eDate +'\n';
			botString += '自驾船总收入：' + shipTotalIncome + '元\n';
			botString += '--------收入明细----------\n';
			botString += '解放门码头：' + jfmShipIncome + '元\n';
			botString += '台菱堤码头：' + tltShipIncome + '元\n';
			botString += '玄武门南码头：' + xwmShipIncome + '元\n';
			botString += '菱洲码头：' + lzShipIncome + '元\n';
			botString += '玄武门北码头：' + xwmbShipIncome + '元\n';
			botString += '后湖印月码头：' + hhyShipIncome + '元\n';
			botString += '和平门码头：' + hpmShipIncome + '元\n';
			botString += '翠洲门码头：' + czmShipIncome + '元\n';
			botString += '阳光码头：' + ygShipIncome + '元\n';
			botString += '芳桥码头：' + fqShipIncome + '元\n';
			botString += '郭璞敦码头：' + gpdShipIncome + '元\n';
			botString += '环洲码头：' + hzShipIncome + '元\n';
			
			let path = require('path');
			fs.readFile(path.resolve(__dirname, '../jsonData/xwhOpen.json'), 'utf8', function(err, data){
				if(err){
					return console.error(err);
				}
				data = JSON.parse(data);
				var jfm = data.jfm;
				var lz = data.lz;
				var tld = data.tld;
				var xwm = data.xwm;
				var xwmb = data.xwmb;
				var hhyy = data.hhyy;
				var hpm = data.hpm;
				var czm = data.czm;
				var yg = data.yg;
				var fq = data.fq;
				var gpd = data.gpd;
				var hz = data.hz;
				botString += '--------手动开船----------\n';
				botString += '玄武门南码头：' + xwm + '次\n';
				botString += '解放门码头：' + jfm + '次\n';
				botString += '台菱堤码头：' + tld + '次\n';
				botString += '菱洲码头：' + lz + '次\n\n';
				botString += '玄武门北码头：' + xwmb + '次\n';
				botString += '后湖印月码头：' + hhyy + '次\n';
				botString += '和平门码头：' + hpm + '次\n';
				botString += '翠洲门码头：' + czm + '次\n';
				botString += '阳光码头：' + yg + '次\n';
				botString += '芳桥码头：' + fq + '次\n';
				botString += '郭璞敦码头：' + gpt + '次\n';
				botString += '环洲码头：' + hz + '次\n';
				botString += '*****玄武湖摆渡船报数*****\n日期:'+eDate +'\n';
				botString += '摆渡船总收入：' + allLoopShipIncome + '元\n';
				botString += '------17:00后收入-----\n';
				botString += '摆渡船总收入：' + loopShipIncome + '元\n';
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

function getxwhInfoByTime(startDate, endDate, room){
	var searchSdate = encodeURI(startDate);
	var searchEdate = encodeURI(endDate);
	const options = {
		hostname: host,
		path: '/xwhpark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
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
			var jfmShipIncome = res.data.jfmShipIncome;
			jfmShipIncome = jfmShipIncome?parseFloat(jfmShipIncome).toFixed(2):'0.00';
			var tltShipIncome = res.data.tltShipIncome;
			tltShipIncome = tltShipIncome?parseFloat(tltShipIncome).toFixed(2):'0.00';
			var xwmShipIncome = res.data.xwmShipIncome;
			xwmShipIncome = xwmShipIncome?parseFloat(xwmShipIncome).toFixed(2):'0.00';
			var lzShipIncome = res.data.lzShipIncome;
			lzShipIncome = lzShipIncome?parseFloat(lzShipIncome).toFixed(2):'0.00';
			var xwmbShipIncome = res.data.xwmbShipIncome;
			xwmbShipIncome = xwmbShipIncome?parseFloat(xwmbShipIncome).toFixed(2):'0.00';
			var hhyShipIncome = res.data.hhyShipIncome;
			hhyShipIncome = hhyShipIncome?parseFloat(hhyShipIncome).toFixed(2):'0.00';
			var hpmShipIncome = res.data.hpmShipIncome;
			hpmShipIncome = hpmShipIncome?parseFloat(hpmShipIncome).toFixed(2):'0.00';
			var czmShipIncome = res.data.czmShipIncome;
			czmShipIncome = czmShipIncome?parseFloat(czmShipIncome).toFixed(2):'0.00';
			var ygShipIncome = res.data.ygShipIncome;
			ygShipIncome = ygShipIncome?parseFloat(ygShipIncome).toFixed(2):'0.00';
			var fqShipIncome = res.data.fqShipIncome;
			fqShipIncome = fqShipIncome?parseFloat(fqShipIncome).toFixed(2):'0.00';
			var gpdShipIncome = res.data.gpdShipIncome;
			gpdShipIncome = gpdShipIncome?parseFloat(gpdShipIncome).toFixed(2):'0.00';
			var hzShipIncome = res.data.hzShipIncome;
			hzShipIncome = hzShipIncome?parseFloat(hzShipIncome).toFixed(2):'0.00';
			var botString = '*****玄武湖自驾船报数*****\n日期:'+eDate +'\n';
			botString += '自驾船总收入：' + shipTotalIncome + '元\n';
			botString += '--------收入明细----------\n';
			botString += '解放门码头：' + jfmShipIncome + '元\n';
			botString += '台菱堤码头：' + tltShipIncome + '元\n';
			botString += '玄武门南码头：' + xwmShipIncome + '元\n';
			botString += '菱洲码头：' + lzShipIncome + '元\n';
			botString += '玄武门北码头：' + xwmbShipIncome + '元\n';
			botString += '后湖印月码头：' + hhyShipIncome + '元\n';
			botString += '和平门码头：' + hpmShipIncome + '元\n';
			botString += '翠洲门码头：' + czmShipIncome + '元\n';
			botString += '阳光码头：' + ygShipIncome + '元\n';
			botString += '芳桥码头：' + fqShipIncome + '元\n';
			botString += '郭璞敦码头：' + gpdShipIncome + '元\n';
			botString += '环洲码头：' + hzShipIncome + '元\n';
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

function writeOutlineInfo(mtName){
	const options = {
		hostname: 'node.smart-ideas.com.cn',
		port: 3001,
		path: '/datav/xwh/writeOutLineInfo?name=' + mtName,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
		
	  });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

function writeOnlineGps(){
	const options = {
		hostname: 'node.smart-ideas.com.cn',
		port: 3001,
		path: '/datav/xwh/getShipGps',
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
		
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
		path: '/xwhpark/batteryDataView/getPrinterStatus',
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
					var siteName = value.siteName;
					if(siteName == '长岸听风'){
						siteName = '水岸听风';
					}
					console.log(siteName);
			  		if(value.status == '1'){
			  			botString += siteName + value.printerName + '：缺纸\n';
			  		}else if(value.status == '2'){
			  			botString += siteName + value.printerName + '：纸将尽\n';
			  		}else if(value.status == '3'){
			  			botString += siteName + value.printerName + '：打开失败\n';
			  		}else if(value.status == '4'){
			  			botString += siteName + value.printerName + '：脱机\n';
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

// 获取电瓶车收入
function getXwhdpcInfo(room){
	const options = {
		hostname: host,
		path: '/xwhpark/batteryDataView/getIncome',
		method: 'GET'
	};
	const req = https.request(options, (res) => {
	    res.on('data', (d) => {
			var res = JSON.parse(d.toString());
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
			var dateString = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
			var totalMoney = parseInt(res[0].totalMoney);
			var nhTenMoney = parseInt(res[0].nhTenMoney);
			var nhFortyMoney = parseInt(res[0].nhFortyMoney);
			var xhcMoney = parseInt(res[0].xhcMoney);
			var jfmMoney = parseInt(res[0].jfmMoney);
			var xwmDayMoney = parseInt(res[0].xwmDayMoney);
			var xwmNightMoney = parseInt(res[0].xwmNightMoney);
			var lyzxMoney = parseInt(res[0].lyzxMoney);
			var syxMoney = parseInt(res[0].syxMoney);
			
			var nhTenCardMoney = parseInt(res[0].nhTenCardMoney);
			var nhFortyCardMoney = parseInt(res[0].nhFortyCardMoney);
			var xhcCardMoney = parseInt(res[0].xhcCardMoney);
			var jfmCardMoney = parseInt(res[0].jfmCardMoney);
			var xwmDayCardMoney = parseInt(res[0].xwmDayCardMoney);
			var xwmNightCardMoney = parseInt(res[0].xwmNightCardMoney);
			var lyzxCardMoney = parseInt(res[0].lyzxCardMoney);
			var syxCardMoney = parseInt(res[0].syxCardMoney);
			
			var nhTenTotal = parseInt(nhTenMoney*1 +  nhTenCardMoney*1);
			var nhFortyTotal = parseInt(nhFortyMoney*1 +  nhFortyCardMoney*1);
			var xhcTotal = parseInt(xhcMoney*1 +  xhcCardMoney*1);
			var jfmTotal = parseInt(jfmMoney*1 +  jfmCardMoney*1);
			var xwmDayTotal = parseInt(xwmDayMoney*1 +  xwmDayCardMoney*1);
			var xwmNightTotal = parseInt(xwmNightMoney*1 +  xwmNightCardMoney*1);
			var lyzxTotal = parseInt(lyzxMoney*1 +  lyzxCardMoney*1);
			var syxTotal = parseInt(syxMoney*1 +  syxCardMoney*1);
			var cardTotal = nhTenCardMoney*1+nhFortyCardMoney*1+syxCardMoney*1+xhcCardMoney*1+jfmCardMoney*1+xwmDayCardMoney*1+xwmNightCardMoney*1+lyzxCardMoney*1;
			var botString = '*****玄武湖电瓶车报数*****\n时间：' + dateString;
			botString += '\n电瓶车总收入：' + totalMoney + '元';
			botString += '\n包含一卡通：' + cardTotal + '元';
			botString += '\n--------收入明细----------';
			botString += '\n内环10元票：' + nhTenTotal + '元';
			botString += '\n内环40元票：' + nhFortyTotal + '元';
			botString += '\n外环玄武门日：' + xwmDayTotal + '元';
			botString += '\n外环玄武门夜：' + xwmNightTotal + '元';
			botString += '\n外环解放门票：' + jfmTotal + '元';
			botString += '\n观光小火车票：' + xhcTotal + '元';
			botString += '\n乐园专线：' + lyzxTotal + '元';
			botString += '\n赏樱游线：' + syxTotal + '元';
			
			if(isNaN(parseInt(totalMoney))){
				getXwhdpcInfo(room);
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
	getxwhInfo,
	getxwhInfoByTime,
	writeOutlineInfo,
	writeOnlineGps,
	getPaperInfo,
	getXwhdpcInfo
}