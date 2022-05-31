var wechat = require('../mybot.js');
const http = require('http');
const host = "rent.smart-ideas.com.cn";
const fs = require('fs');

/********************/
/***** 云龙湖自驾船群代码 *******/
/********************/
const xwhRoomWharfId = {
	JFM: 'f57419d544e741838fb789056f63ee80',
	LZ: '59800000eb4a4c4287652f86eaba848c',
	TLD: 'bcd98681896f48ed878486519bfdeacf',
	XWM: 'b4124ce0c8b244208de6d870ceb824a0',
	XWMB: '43a3c0756f854990ad7fd13f597cda3c',
	HHYY: 'a9f74e0b584945bea69985cd17f66a9d',
	HPM: '8698c2bb90d645b3912528473f5ce930',
	CZM: '41ab29656e5b405a9c94871488050ec3',
	YG: '283db1801eda4d0d9b542570b4506219',
	FQ: '3f288414620f42cba6a7634401f71bca',
	GPD: '9030c8e60fa34f37b674a30f3c890143',
	HZ: '696dc31a1125458fa5ba1696f6e445c7'
	
}

async function nbhzjcRoomDeal(msg) {
	const content = msg.text();
	const contact = msg.talker();
	const room = msg.room();
	const fromRoomAlias = await room.alias(contact);
	var fromName;
	if (fromRoomAlias) {
		fromName = fromRoomAlias;
	} else {
		fromName = contact.name();
	}
	if (msg.type() == wechat.bot.Message.Type.Text) {
		if (content == '使用方法') {
			const roomTopic = await room.topic();
			var botString = '机器人使用方法:\n----------\n';
			botString += '1)船号xxx开锁\n';
			botString += '2)船号xxx关锁\n';
			botString += '3)手机号xxx按时间退款\n';
			botString += '4)手机号xxx全额退款\n';
			botString += '5)手机号xxx退款xxx\n';
			botString += '6)船号xxx按时间退款\n';
			botString += '7)船号xxx全额退款\n';
			botString += '8)船号xxx退款xxx\n';
			botString += '9)船号xxx报修\n';
			botString += '10)船号xxx启用\n';
			botString += '11)船号xxx查手机\n';
			botString += '12)船号xxx已结订单退款xxx\n';
			botString += '13)手机号xxx已结订单退款xxx\n';
			botString += '14)船号xxx救援完成\n';
			botString += '15)船号xxx挪船';
			// botString += '16)船号xxx手机号xxx现金开锁';
			room.say(botString);
		}

		if (content.indexOf('船号') != -1 && content.indexOf('开锁') != -1) {
			var code = content.split('船号')[1].split('开锁')[0];
			if (isNumber(code)) {
				sendCommand('open', host, room, code, contact, true);
			}
		}

		if (content.indexOf('船号') != -1 && content.indexOf('关锁') != -1) {
			var code = content.split('船号')[1].split('关锁')[0];
			if (isNumber(code)) {
				sendCommand('close', host, room, code, contact, true);
			}
		}
		if (content.indexOf('船号') != -1 && content.indexOf('挪船') != -1) {
			var code = content.split('船号')[1].split('挪船')[0];
			if (isNumber(code)) {
				sendCommand('open', host, room, code, contact, false);
			}
		}
		if (content.indexOf('手机号') != -1 && content.indexOf('按时间退款') != -1) {
			var phone = content.split('手机号')[1].split('按时间退款')[0];
			if (isNumber(phone)) {
				refund(host, room, 1, phone, 1, 0, contact);
			}
		}

		if (content.indexOf('手机号') != -1 && content.indexOf('全额退款') != -1) {
			var phone = content.split('手机号')[1].split('全额退款')[0];
			if (isNumber(phone)) {
				refund(host, room, 1, phone, 2, 0, contact);
			}
		}

		if (content.indexOf('手机号') != -1 && content.indexOf('退款') != -1 && content.indexOf('按时间') == -1 && content.indexOf('全额') == -1) {
			var phone = content.split('手机号')[1].split('退款')[0];
			var money = content.split('退款')[1];
			if (isNumber(phone) && isNumber(money)) {
				refund(host, room, 1, phone, 3, money, contact);
			}
		}

		if (content.indexOf('船号') != -1 && content.indexOf('按时间退款') != -1) {
			var code = content.split('船号')[1].split('按时间退款')[0];
			if (isNumber(code)) {
				refund(host, room, 2, code, 1, 0, contact);
			}
		}

		if (content.indexOf('船号') != -1 && content.indexOf('全额退款') != -1) {
			var code = content.split('船号')[1].split('全额退款')[0];
			if (isNumber(code)) {
				refund(host, room, 2, code, 2, 0, contact);
			}
		}

		if (content.indexOf('船号') != -1 && content.indexOf('退款') != -1 && content.indexOf('按时间') == -1 && content.indexOf('全额') == -1) {
			var code = content.split('船号')[1].split('退款')[0];
			var money = content.split('退款')[1];
			if (isNumber(code) && isNumber(money)) {
				refund(host, room, 2, code, 3, money, contact);
			}
		}

		if (content.indexOf('船号') != -1 && content.indexOf('报修') != -1) {
			var code = content.split('船号')[1].split('报修')[0];
			if (isNumber(code)) {
				updateStatus(2, host, room, code, contact);
			}
		}

		if (content.indexOf('船号') != -1 && content.indexOf('启用') != -1) {
			var code = content.split('船号')[1].split('启用')[0];
			if (isNumber(code)) {
				updateStatus(0, host, room, code, contact);
			}
		}

		if (content.indexOf('船号') != -1 && content.indexOf('查手机') != -1) {
			var code = content.split('船号')[1].split('查手机')[0];
			if (isNumber(code)) {
				getLastedPhone(host, room, code, contact);
			}
		}

		if (content.indexOf('船号') != -1 && content.indexOf('已结订单退款') != -1) {
			var code = content.split('船号')[1].split('已结订单退款')[0];
			var money = content.split('已结订单退款')[1];
			if (isNumber(code) && isNumber(money)) {
				refund(host, room, 2, code, 4, money, contact);
			}
		}
		
		if (content.indexOf('手机号') != -1 && content.indexOf('已结订单退款') != -1) {
			var phone = content.split('手机号')[1].split('已结订单退款')[0];
			var money = content.split('已结订单退款')[1];
			if (isNumber(phone) && isNumber(money)) {
				refund(host, room, 1, phone, 4, money, contact);
			}
		}

		if (content.indexOf('船号') != -1 && content.indexOf('救援完成') != -1) {
			var code = content.split('船号')[1].split('救援完成')[0];
			if (isNumber(code)) {
				completeRescue(host, room, code, contact);
			}
		}
		
		// if (content.indexOf('船号') != -1 && content.indexOf('手机号') != -1 && content.indexOf('现金开锁') != -1) {
		// 	var code = content.split('船号')[1].split('手机号')[0];
		// 	var phone = content.split('手机号')[1].split('现金开锁')[0];
		// 	if (isNumber(code)) {
		// 		const options = {
		// 			hostname: host,
		// 			path: '/ylhpark/deviceLeaseApp/getDeviceInfo?openid=cash&deviceSn='+ code,
		// 			method: 'GET'
		// 		};
				
		// 		const req = http.request(options, (res) => {
		// 		  res.on('data', (d) => {
		// 		  	console.log(d);
		// 		    var res = JSON.parse(d.toString());
		// 			if(res.code == 'SUCCESS'){
		// 				var deposit = res.data.price.deposit;
		// 				var deviceId = res.data.device.id;
		// 				const options1 = {
		// 					hostname: host,
		// 					path: '/ylhpark/deviceLeaseApp/getPayInfo?openid=cash&deviceId='+ deviceId + '&phone=' + phone + '&deposit=' + deposit,
		// 					method: 'GET'
		// 				};
						
		// 				const req1 = http.request(options1, (res1) => {
		// 				  res1.on('data', (d) => {
		// 				    var res = JSON.parse(d.toString());
		// 					console.log(res);
		// 					if(res.code == 'SUCCESS'){
		// 						if(res.data.payStatus == '1'){
		// 							room.say('船号:' + code + '\n手机号:' + phone + '\n押金:' + deposit + '\n现金开锁成功');
		// 						}else{
		// 							room.say(res.msg);
		// 						}
		// 					}
		// 				  });
		// 				});
		// 				req1.end();
		// 			}else{
		// 				room.say(res.msg);
		// 			}
		// 		  });
		// 		});
		// 		req.end();
		// 	}
		// }
	} else if (msg.type() == wechat.bot.Message.Type.Video) {
		console.log('~~~~~~~~~~视频消息~~~~~~~~~');

	} else if (msg.type() == wechat.bot.Message.Type.Audio) {
		console.log('~~~~~~~~~~语音消息~~~~~~~~~');

	} else if (msg.type() == wechat.bot.Message.Type.Image) {
		console.log('~~~~~~~~~~图片消息~~~~~~~~~');

	} else {
		console.log('~~~~~~~~其它类型消息~~~~~~~');
	}
}

// 完成救援
function completeRescue(host, room, code, contact) {
	const options = {
		hostname: host,
		path: '/nbhpark/deviceRobot/removeRescue?deviceSn=' + code,
		method: 'GET'
	};

	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			console.log(d);
			var res = JSON.parse(d.toString());
			room.say('\n船号:' + code + '\n' + res.msg);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});

	req.end();
}

function isNumber(val) {
	var regPos = /^\d+(\.\d+)?$/; //非负浮点数
	var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
	if (regPos.test(val) || regNeg.test(val)) {
		return true;
	} else {
		return false;
	}
}

// 电瓶船&自行车开关锁
function sendCommand(type, host, room, code, contact, flag) {
	const options = {
		hostname: host,
		path: '/nbhpark/deviceRobot/sendShipCommand?deviceSn=' + code + '&type=' + type,
		method: 'GET'
	};

	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			console.log(d);
			var res = JSON.parse(d.toString());

			if (flag == true) {
				room.say('\n船号:' + code + '\n' + res.msg);
				// if (type == 'open') {
				// 	var nowDate = new Date();
				// 	var nowYear = nowDate.getFullYear();
				// 	var nowMonth = nowDate.getMonth() + 1;
				// 	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
				// 	var nowDay = nowDate.getDate();
				// 	nowDay = nowDay>9?nowDay:'0'+nowDay;
				// 	var nowHour = nowDate.getHours();
				// 	nowHour = nowHour>9?nowHour:'0'+nowHour;
				// 	var nowMinutes = nowDate.getMinutes();
				// 	nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
				// 	var nowSeconds = nowDate.getSeconds();
				// 	nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
				// 	var openDate = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
				// 	openDate = encodeURI(openDate);
				// 	const options = {
				// 		hostname: '47.94.82.166',
				// 		port: 3001,
				// 		path: '/datav/xwh/writeBoatOpenInfo?scenicId=' + res.data + '&openDate=' + openDate + '&code=' + code,
				// 		method: 'GET'
				// 	};
				// 	const req = http.request(options, (res1) => {
				// 		res1.on('data', (d) => {
							
				// 		});
				// 	});
				// 	req.end();
				// }
				
				// if(type == 'close'){
				// 	const options = {
				// 		hostname: '47.94.82.166',
				// 		port: 3001,
				// 		path: '/datav/xwh/deleteBoatOpenInfo?scenicId=' + res.data + '&code=' + code,
				// 		method: 'GET'
				// 	};
				// 	const req = http.request(options, (res1) => {
				// 		res1.on('data', (d) => {
							
				// 		});
				// 	});
				// 	req.end();
				// }
				
			} else {
				if (type == 'open') {
					room.say('\n船号:' + code + '\n' + res.msg);
					if (res.msg.indexOf('发送指令成功') != -1) {
						(function (host, room, code, contact) {

							setTimeout(() => {
								sendCommand('close', host, room, code, contact, false);
							}, 1000 * 60 * 2);

						})(host, room, code, contact);
					}
				} else {
					room.say('船号:' + code + '\n' + "自动断电成功");
				}
			}

			if(type == 'open'){
				let path = require('path');
				
				// fs.readFile(path.resolve(__dirname, '../jsonData/xwhOpen.json'), 'utf8', function(err, data){
				// 	if(err){
				// 		return console.error(err);
				// 	}
				// 	data = JSON.parse(data);
				// 	var jfmOpen = parseInt(data.jfm);
				// 	var lzOpen = parseInt(data.lz);
				// 	var tldOpen = parseInt(data.tld);
				// 	var xwmOpen = parseInt(data.xwm);
				// 	var xwmbOpen = parseInt(data.xwmb);
				// 	var hhyyOpen = parseInt(data.hhyy);
				// 	var hpmOpen = parseInt(data.hpm);
				// 	var czmOpen = parseInt(data.czm);
				// 	var ygOpen = parseInt(data.yg);
				// 	var fqOpen = parseInt(data.fq);
				// 	var gpdOpen = parseInt(data.gpd);
				// 	var hzOpen = parseInt(data.hz);
				// 	if(res.data == xwhRoomWharfId.JFM){
				// 		jfmOpen += 1;
				// 	}else if(res.data == xwhRoomWharfId.LZ){
				// 		lzOpen += 1;
				// 	}else if(res.data == xwhRoomWharfId.TLD){
				// 		tldOpen += 1;
				// 	}else if(res.data == xwhRoomWharfId.XWM){
				// 		xwmOpen += 1;
				// 	}else if(res.data == xwhRoomWharfId.XWMB){
				// 		xwmbOpen += 1;
				// 	}else if(res.data == xwhRoomWharfId.HHYY){
				// 		hhyyOpen += 1;
				// 	}else if(res.data == xwhRoomWharfId.HPM){
				// 		hpmOpen += 1;
				// 	}else if(res.data == xwhRoomWharfId.CZM){
				// 		czmOpen += 1;
				// 	}else if(res.data == xwhRoomWharfId.YG){
				// 		ygOpen += 1;
				// 	}else if(res.data == xwhRoomWharfId.FQ){
				// 		fqOpen += 1;
				// 	}else if(res.data == xwhRoomWharfId.GPD){
				// 		gpdOpen += 1;
				// 	}else if(res.data == xwhRoomWharfId.HZ){
				// 		hzOpen += 1;
				// 	}
				// 	var xwhData = {
				// 		"jfm": jfmOpen,
				// 		"lz": lzOpen,
				// 		"tld": tldOpen,
				// 		"xwm": xwmOpen,
				// 		"xwmb": xwmbOpen,
				// 		"hhyy": hhyyOpen,
				// 		"hpm": hpmOpen,
				// 		"czm": czmOpen,
				// 		"yg": ygOpen,
				// 		"fq": fqOpen,
				// 		"gpd": gpdOpen,
				// 		"hz": hzOpen
				// 	};
				// 	fs.writeFile(path.resolve(__dirname, '../jsonData/xwhOpen.json'), JSON.stringify(xwhData),function(err){
				// 		if(err){
				// 			console.error(err);
				// 			return;
				// 		}
				// 	})
				// })
			}
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

// 电瓶船|自行车报修或者启用
function updateStatus(status, host, room, code, contact) {
	const options = {
		hostname: host,
		path: '/nbhpark/deviceRobot/updateStatus?deviceSn=' + code + '&status=' + status,
		method: 'GET'
	};

	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			console.log(d);
			var res = JSON.parse(d.toString());
			room.say('\n船号:' + code + '\n' + res.msg);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

// 电瓶船|自行车查询手机号
function getLastedPhone(host, room, code, contact) {
	const options = {
		hostname: host,
		path: '/nbhpark/deviceRefundRobot/getLastedPhone?deviceSn=' + code,
		method: 'GET'
	};

	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			console.log(d);
			var res = JSON.parse(d.toString());
			room.say('\n' + res.msg + '\n船号：' + code + '\n最后订单手机号：' + res.data);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

// 电瓶船|自行车租赁退款
function refund(host, room, refundType, refundValue, refundWall, refundMoney, contact) {
	var data;
	if (refundWall == '1' || refundWall == '2') {
		data = {
			refundType: refundType,
			refundValue: refundValue,
			refundWall: refundWall
		}
	} else {
		data = {
			refundType: refundType,
			refundValue: refundValue,
			refundWall: refundWall,
			refundMoney: refundMoney
		}
	}

	console.log(JSON.stringify(data));

	const options = {
		hostname: host,
		path: '/nbhpark/deviceRefundRobot/refund',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			console.log(res);
			if(res.data){
				if(res.data['normalDeposit']){
					room.say('退款金额：' + res.data.normalDeposit + '\n' + res.msg);
				}else{
					room.say(res.msg);
				}
			}else{
				room.say(res.msg);
			}
		});
	});

	req.write(JSON.stringify(data));
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}


module.exports = { nbhzjcRoomDeal };
