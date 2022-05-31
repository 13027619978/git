var wechat = require('../mybot.js');
const https = require('https');
const host = "iot.smart-ideas.com.cn";

async function xhgRoomDeal(msg){
	const content = msg.text();
	const contact = msg.talker();
	const room = msg.room();
	const fromRoomAlias = await room.alias(contact);
	var fromName;
	if(fromRoomAlias){
		fromName = fromRoomAlias;
	}else{
		fromName = contact.name();
	}
	if(msg.type() == wechat.bot.Message.Type.Text){
		
		//使用方法
		if(content == '使用方法'){
			room.say("鲜花港机器人使用方法:\n----------\n1)小程序门票收入\n2)POS收入\n3)二维码收入\n4)设备租赁收入\n5)入园人数\n----------")
		}
		
		// 小程序门票收入
		if(content == '小程序门票收入'){
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth() + 1;
			month = month>9?month:"0"+month;
			var hour = nowDate.getHours();
			hour = hour>9?hour:"0"+hour;
			var minute = nowDate.getMinutes();
			minute = minute>9?minute:"0"+minute;
			var eday = nowDate.getDate()>9?nowDate.getDate():"0"+nowDate.getDate();
			var edate = year+'-'+month+'-'+eday+' ' + hour + ':' + minute;
			var nowDateString = nowDate.getTime() - 60 * 60 * 24 * 1000;
			var sdateString = new Date(nowDateString);
			var sYear = sdateString.getFullYear();
			var sMonth = sdateString.getMonth() + 1;
			sMonth = sMonth>9?sMonth:'0'+sMonth;
			var sDay = sdateString.getDate();
			var sdate = sYear + '-' + sMonth + '-' + sDay + ' 16:30';
			var searchSdate = encodeURI(sdate);
			var searchEdate = encodeURI(edate);
			const options = {
				hostname: host,
				path: '/iotsmart/ticketsRobot/getH5TicketsIncome?sdate='+ searchSdate +'&edate=' + searchEdate,
				method: 'GET'
			};
			
			const req = https.request(options, (res) => {
			  res.on('data', (d) => {
			    var res = JSON.parse(d.toString());
			    console.log(res);
			    if(res.code == "SUCCESS"){
			    	var totalMoney;
			    	if(res.data.total){
			    		totalMoney = parseFloat(res.data.total).toFixed(2);
			    	}else{
			    		totalMoney = 0;
			    	}
			    	room.say('[玫瑰]小程序门票收入[玫瑰]\n日期：'+ edate +'\n收入：'+ totalMoney +'元');
			    }
			  });
			});
			
			req.on('error', (e) => {
			  console.error(`problem with request: ${e.message}`);
			});
			
			req.end();
		}
		
		// POS收入
		if(content == 'POS收入'){
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth() + 1;
			month = month>9?month:"0"+month;
			var hour = nowDate.getHours();
			hour = hour>9?hour:"0"+hour;
			var minute = nowDate.getMinutes();
			minute = minute>9?minute:"0"+minute;
			var eday = nowDate.getDate()>9?nowDate.getDate():"0"+nowDate.getDate();
			var edate = year+'-'+month+'-'+eday+' ' + hour + ':' + minute;
			var nowDateString = nowDate.getTime() - 60 * 60 * 24 * 1000;
			var sdateString = new Date(nowDateString);
			var sYear = sdateString.getFullYear();
			var sMonth = sdateString.getMonth() + 1;
			sMonth = sMonth>9?sMonth:'0'+sMonth;
			var sDay = sdateString.getDate();
			var sdate = sYear + '-' + sMonth + '-' + sDay + ' 16:30';
			var searchSdate = encodeURI(sdate);
			var searchEdate = encodeURI(edate);
			getPosIncome(searchSdate, searchEdate, room, sdate, edate);
		}
		
		// 二维码收入
		if(content == '二维码收入'){
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth() + 1;
			month = month>9?month:"0"+month;
			var hour = nowDate.getHours();
			hour = hour>9?hour:"0"+hour;
			var minute = nowDate.getMinutes();
			minute = minute>9?minute:"0"+minute;
			var eday = nowDate.getDate()>9?nowDate.getDate():"0"+nowDate.getDate();
			var edate = year+'-'+month+'-'+eday+' ' + hour + ':' + minute;
			var nowDateString = nowDate.getTime() - 60 * 60 * 24 * 1000;
			var sdateString = new Date(nowDateString);
			var sYear = sdateString.getFullYear();
			var sMonth = sdateString.getMonth() + 1;
			sMonth = sMonth>9?sMonth:'0'+sMonth;
			var sDay = sdateString.getDate();
			var sdate = sYear + '-' + sMonth + '-' + sDay + ' 16:30';
			var searchSdate = encodeURI(sdate);
			var searchEdate = encodeURI(edate);
			getQrIncome(searchSdate, searchEdate, room, sdate, edate);
		}
		
		// 设备租赁收入
		if(content == '设备租赁收入'){
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth() + 1;
			month = month>9?month:"0"+month;
			var hour = nowDate.getHours();
			hour = hour>9?hour:"0"+hour;
			var minute = nowDate.getMinutes();
			minute = minute>9?minute:"0"+minute;
			var eday = nowDate.getDate()>9?nowDate.getDate():"0"+nowDate.getDate();
			var edate = year+'-'+month+'-'+eday+' ' + hour + ':' + minute;
			var nowDateString = nowDate.getTime() - 60 * 60 * 24 * 1000;
			var sdateString = new Date(nowDateString);
			var sYear = sdateString.getFullYear();
			var sMonth = sdateString.getMonth() + 1;
			sMonth = sMonth>9?sMonth:'0'+sMonth;
			var sDay = sdateString.getDate();
			sDay = sDay>9?sDay:'0'+sDay;
			var sdate = sYear + '-' + sMonth + '-' + sDay + ' 16:30';
			var searchSdate = encodeURI(sdate);
			var searchEdate = encodeURI(edate);
			getDeviceIncome(searchSdate, searchEdate, room, sdate, edate);
		}
		
		// 入园人数
		if(content == '入园人数'){
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth() + 1;
			month = month>9?month:"0"+month;
			var eday = nowDate.getDate()>9?nowDate.getDate():"0"+nowDate.getDate();
			var hour = nowDate.getHours();
			hour = hour>9?hour:"0"+hour;
			var minute = nowDate.getMinutes();
			minute = minute>9?minute:"0"+minute;
			var eday = nowDate.getDate()>9?nowDate.getDate():"0"+nowDate.getDate();
			var edate = year+'-'+month+'-'+eday+' ' + hour + ':' + minute;
			const options = {
				hostname: host,
				path: '/iotsmart/deviceRobot/getLedEnterNumber?scenicId=1a5803bc57214a4eb16151c17d86f411',
				method: 'GET'
			};
			
			const req = https.request(options, (res) => {
			  res.on('data', (d) => {
			    var res = JSON.parse(d.toString());
			    if(res.code == "SUCCESS"){
			    	var peopleNumber = res.data;
			    	if(!peopleNumber){
			    		peopleNumber = 0;
			    	}
			    	
			    	room.say('[玫瑰]客流量简报[玫瑰]\n日期：' + edate + '\n入园：' + peopleNumber);
			    }
			  });
			});
			
			req.on('error', (e) => {
			  console.error(`problem with request: ${e.message}`);
			});
			
			req.end();
		}


	}
}

// 获取POS收入
function getPosIncome(searchSdate, searchEdate, room, sdate, edate){
	posTickets = 0;
	posFlowers = 0;
	var status = 0;
	var posId = ['nmpt','xnmpt','bmpt','hhsm'];
	posId.forEach(function(value, key){
		const options = {
			hostname: host,
			path: '/iotsmart/ticketsRobot/getPosIncome?sdate='+ searchSdate +'&edate=' + searchEdate +'&posId=' + value,
			method: 'GET'
		};
		
		const req = https.request(options, (res) => {
		  res.on('data', (d) => {
		    var res = JSON.parse(d.toString());
		    if(res.code == "SUCCESS"){
		    	status += 1;
		    	if(res.data.total){
		    		if(key < 3){
		    			posTickets += parseFloat(res.data.total);
		    		}else{
		    			posFlowers = parseFloat(res.data.total);
		    		}
		    	}
		    }
		  });
		});
		
		req.on('error', (e) => {
		  console.error(`problem with request: ${e.message}`);
		});
		
		req.end();
	})
	
	var my = setInterval(function(){
		if(status == posId.length){
			room.say('[玫瑰]POS收入简报[玫瑰]\n日期：'+ edate +'\n门票售卖：'+ posTickets +'元\n花卉售卖：' + posFlowers + '元');
			clearInterval(my);
		}
	}, 1000);
}

// 获取二维码收入
function getQrIncome(searchSdate, searchEdate, room, sdate, edate){
	var qrCodeCltId = ['1', '2', '3', '4', '5'];
	var qrCodeIncome = '';
	var status = 0;
	qrCodeCltId.forEach(function(value, key){
		const options = {
			hostname: host,
			path: '/iotsmart/ticketsRobot/getQrCodeIncome?sdate='+ searchSdate +'&edate=' + searchEdate +'&qrCodeCltId=' + value,
			method: 'GET'
		};
		
		const req = https.request(options, (res) => {
		  res.on('data', (d) => {
		    var res = JSON.parse(d.toString());
		    if(res.code == "SUCCESS"){
		    	status += 1;
		    	var totalMoney = parseFloat(res.data[0].total);
		    	if(!totalMoney){
		    		totalMoney = 0;
		    	}
		    	qrCodeIncome = qrCodeIncome + res.data[0].qrCodeCltName +'：' + totalMoney + '元\n';
		    }
		  });
		});
		
		req.on('error', (e) => {
		  console.error(`problem with request: ${e.message}`);
		});
		
		req.end();
	})
	
	var my = setInterval(function(){
		if(status == qrCodeCltId.length){
			room.say('[玫瑰]二维码收入简报[玫瑰]\n日期：'+ edate + '\n'+ qrCodeIncome);
			clearInterval(my);
		}
	}, 1000);
}

// 设备租赁收入
function getDeviceIncome(searchSdate, searchEdate, room, sdate, edate){
	var deviceType = ['0', '1', '2', '3', '4', '5', '6'];
	var deviceIncome = '';
	var status = 0;
	deviceType.forEach(function(value, key){
		const options = {
			hostname: host,
			path: '/iotsmart/ticketsRobot/getDeviceIncome?sdate='+ searchSdate +'&edate=' + searchEdate +'&deviceType=' + value,
			method: 'GET'
		};
		
		const req = https.request(options, (res) => {
		  res.on('data', (d) => {
		  	console.log(d);
		    var res = JSON.parse(d.toString());
		    if(res.code == "SUCCESS"){
		    	status += 1;
		    	var totalMoney = parseFloat(res.data.total);
		    	if(!totalMoney){
		    		totalMoney = 0;
		    	}
		    	switch(value){
		    		case '0':
		    			deviceIncome = deviceIncome +'双人电瓶车：' + totalMoney + '元\n';
		    		break;
		    		
		    		case '1':
		    			deviceIncome = deviceIncome +'四人电瓶车：' + totalMoney + '元\n';
		    		break;
		    		
		    		case '2':
		    			deviceIncome = deviceIncome +'14人电瓶车：' + totalMoney + '元\n';
		    		break;
		    		
		    		case '3':
		    			deviceIncome = deviceIncome +'23人电瓶车：' + totalMoney + '元\n';
		    		break;
		    		
		    		case '4':
		    			deviceIncome = deviceIncome +'双人自行车：' + totalMoney + '元\n';
		    		break;
		    		
		    		case '5':
		    			deviceIncome = deviceIncome +'四人自行车：' + totalMoney + '元\n';
		    		break;
		    		
		    		case '6':
		    			deviceIncome = deviceIncome +'电瓶船：' + totalMoney + '元\n';
		    		break;
		    	}
		    }
		  });
		});
		
		req.on('error', (e) => {
		  console.error(`problem with request: ${e.message}`);
		});
		
		req.end();
	})
	
	var my = setInterval(function(){
		if(status == deviceType.length){
			room.say('[玫瑰]设备租赁简报[玫瑰]\n日期：'+ edate + '\n'+ deviceIncome);
			clearInterval(my);
		}
	}, 1000);
}


module.exports = {xhgRoomDeal};