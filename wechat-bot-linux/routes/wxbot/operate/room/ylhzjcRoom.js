var wechat = require('../mybot.js');
const http = require('http');
const host = "rent.smart-ideas.com.cn";
const fs = require('fs');

/********************/
/***** 云龙湖自驾船群代码 *******/
/********************/
const ylhRoomWharfId = {
	XHW: '14249a7ee96d4d3f95195a799a3709d2',
	KYBG: '2a96be8cf7744d9088986920e2f0d6d9',
	LZSJ: '47fca49def99492c80a58d8592400589',
	NHYH: '4c74b97aaf5b4ff594d11841d4ec8de9',
	JYQ: '5acd3b7ae10544ec9632b41392c0e695',
	DQ: '8ea1d467f3af4d2aa46b09219d6273f6',
	CSLD: 'b3bb924f74ed4e8ebcad576a382e8791',
	SZG: 'cdabffaf5cb442da8f5ca9ac50f85efc',
	YYT: 'ed28b43724f0477d9755de59b28160dd',
	SGT: 'f769f573bc3e4df5986ec45993e94fbd'
};

async function ylhzjcRoomDeal(msg) {
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
			botString += '15)船号xxx挪船\n';
			botString += '16)天时手机号xxx优惠券核销\n';
			botString += '17)微信手机号xxx优惠券核销';
			room.say(botString);
		}
		
		if(content.indexOf('天时手机号') != -1 && content.indexOf('优惠券核销') != -1){
			var phone = content.split('天时手机号')[1].split('优惠券核销')[0];
			if (isNumber(phone)) {
				useCoupons(room, phone, 'TS');
			}
		}
		
		if(content.indexOf('微信手机号') != -1 && content.indexOf('优惠券核销') != -1){
			var phone = content.split('微信手机号')[1].split('优惠券核销')[0];
			if (isNumber(phone)) {
				useCoupons(room, phone, 'WEB');
			}
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
		path: '/ylhpark/deviceRobot/removeRescue?deviceSn=' + code,
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
		path: '/ylhpark/deviceRobot/sendShipCommand?deviceSn=' + code + '&type=' + type,
		method: 'GET'
	};

	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			console.log(d);
			var res = JSON.parse(d.toString());
			if (flag == true) {
				room.say('\n船号:' + code + '\n' + res.msg);
			} else {
				if (type == 'open') {
					room.say('\n船号:' + code + '\n' + res.msg);
					if (res.msg.indexOf('发送指令成功') != -1) {
						(function (host, room, code, contact) {

							setTimeout(() => {
								sendCommand('close', host, room, code, contact, false);
							}, 1000 * 60 * 5);

						})(host, room, code, contact);
					}
				} else {
					room.say('船号:' + code + '\n' + "自动断电成功");
				}
			}

			if(type == 'open'){
				let path = require('path');
				
				fs.readFile(path.resolve(__dirname, '../jsonData/ylhOpen.json'), 'utf8', function(err, data){
					if(err){
						return console.error(err);
					}
					data = JSON.parse(data);
					var xhwOpen = parseInt(data.xhw);
					var kybgOpen = parseInt(data.kybg);
					var lzsjOpen = parseInt(data.lzsj);
					var nhyhOpen = parseInt(data.nhyh);
					var jyqOpen = parseInt(data.jyq);
					var dqOpen = parseInt(data.dq);
					var csldOpen = parseInt(data.csld);
					var szgOpen = parseInt(data.szg);
					var yytOpen = parseInt(data.yyt);
					var sgtOpen = parseInt(data.sgt);
					if(res.data == ylhRoomWharfId.XHW){
						xhwOpen += 1;
					}else if(res.data == ylhRoomWharfId.KYBG){
						kybgOpen += 1;
					}else if(res.data == ylhRoomWharfId.LZSJ){
						lzsjOpen += 1;
					}else if(res.data == ylhRoomWharfId.NHYH){
						nhyhOpen += 1;
					}else if(res.data == ylhRoomWharfId.JYQ){
						jyqOpen += 1;
					}else if(res.data == ylhRoomWharfId.DQ){
						dqOpen += 1;
					}else if(res.data == ylhRoomWharfId.CSLD){
						csldOpen += 1;
					}else if(res.data == ylhRoomWharfId.SZG){
						szgOpen += 1;
					}else if(res.data == ylhRoomWharfId.YYT){
						yytOpen += 1;
					}else if(res.data == ylhRoomWharfId.SGT){
						sgtOpen += 1;
					}
					var ylhData = {
						"xhw": xhwOpen,
						"kybg": kybgOpen,
						"lzsj": lzsjOpen,
						"nhyh": nhyhOpen,
						"jyq": jyqOpen,
						"dq": dqOpen,
						"csld": csldOpen,
						"szg": szgOpen,
						"yyt": yytOpen,
						"sgt": sgtOpen
					};
					fs.writeFile(path.resolve(__dirname, '../jsonData/ylhOpen.json'), JSON.stringify(ylhData),function(err){
						if(err){
							console.error(err);
							return;
						}
					})
				})
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
		path: '/ylhpark/deviceRobot/updateStatus?deviceSn=' + code + '&status=' + status,
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
		path: '/ylhpark/deviceRefundRobot/getLastedPhone?deviceSn=' + code,
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
		path: '/ylhpark/deviceRefundRobot/refund',
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

// 优惠券核销
function useCoupons(room, phone, source) {
	const options = {
		hostname: 'rent.smart-ideas.com.cn',
		path: '/ylhpark/couponsOrder/robot/use',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	var buffers = [];
	var nread = 0;
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			buffers.push(d);
			nread += d.length;
		});
		
		res.on('end', () => {
			var buffer = null;
			switch(buffers.length) {
				case 0: buffer = new Buffer(0);
					break;
				case 1: buffer = buffers[0];
					break;
				default:
					buffer = new Buffer(nread);
					for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
						var chunk = buffers[i];
						chunk.copy(buffer, pos);
						pos += chunk.length;
					}
				break;
			}
			var res = JSON.parse(buffer.toString());
			console.log(res);
			if(res.data){
				room.say('手机号：' + phone + '\n' + res.msg);
			}else{
				room.say(res.msg);
			}
		})
	});
	
	req.write(JSON.stringify({
		phone: phone,
		source: source
	}));
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}


module.exports = { ylhzjcRoomDeal };
