var wechat = require('../mybot.js');
const http = require('http');
// const host = "test.joybike.com.cn";
const host = "api.smart-ideas.com.cn";
const fs = require('fs');

/********************/
/***** 北海自驾船代码 *******/
/********************/
async function bhzjcRoomDeal(msg){
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
		if(content == '使用方法'){
			const roomTopic = await room.topic();
			var botString = '机器人使用方法:\n----------\n';
			botString += '1)船号xxx开锁\n';
			botString += '2)船号xxx关锁\n';
			botString += '3)手机号xxx按时间退款\n';
			botString += '4)手机号xxx全额退款\n';
			botString += '5)手机号xxx退款xxx\n';
			botString += '6)手机号xxx已结订单退款xxx\n';
			botString += '7)船号xxx按时间退款\n';
			botString += '8)船号xxx全额退款\n';
			botString += '9)船号xxx退款xxx\n';
			botString += '10)船号xxx报修\n';
			botString += '11)船号xxx启用\n';
			botString += '12)船号xxx查手机\n';
			botString += '13)船号xxx已结订单退款xxx\n';
			botString += '14)船号xxx救援完成\n';
			room.say(botString);
		}
		
		if(content.indexOf('船号') != -1 && content.indexOf('开锁') != -1){
			var code = content.split('船号')[1].split('开锁')[0];
			if(isNumber(code)){
				sendCommand('open', host, room, code);
			}
		}
		
		if(content.indexOf('船号') != -1 && content.indexOf('关锁') != -1){
			var code = content.split('船号')[1].split('关锁')[0];
			if(isNumber(code)){
				sendCommand('close', host, room, code);
			}
		}
		
		if(content.indexOf('手机号') != -1 && content.indexOf('按时间退款') != -1){
			var phone = content.split('手机号')[1].split('按时间退款')[0];
			if(isNumber(phone)){
				refund(host, room, 1, phone, 1, 0);
			}
		}
		
		if(content.indexOf('手机号') != -1 && content.indexOf('全额退款') != -1){
			var phone = content.split('手机号')[1].split('全额退款')[0];
			if(isNumber(phone)){
				refund(host, room, 1, phone, 2, 0);
			}
		}
		
		if(content.indexOf('手机号') != -1 && content.indexOf('退款') != -1 && content.indexOf('按时间') == -1 && content.indexOf('全额') == -1){
			var phone = content.split('手机号')[1].split('退款')[0];
			var money = content.split('退款')[1];
			if(isNumber(phone) && isNumber(money)){
				refund(host, room, 1, phone, 3, money);
			}
		}
		
		if(content.indexOf('船号') != -1 && content.indexOf('按时间退款') != -1){
			var code = content.split('船号')[1].split('按时间退款')[0];
			if(isNumber(code)){
				refund(host, room, 2, code, 1, 0);
			}
		}
		
		if(content.indexOf('船号') != -1 && content.indexOf('全额退款') != -1){
			var code = content.split('船号')[1].split('全额退款')[0];
			if(isNumber(code)){
				refund(host, room, 2, code, 2, 0);
			}
		}
		
		if(content.indexOf('船号') != -1 && content.indexOf('退款') != -1 && content.indexOf('按时间') == -1 && content.indexOf('全额') == -1){
			var code = content.split('船号')[1].split('退款')[0];
			var money = content.split('退款')[1];
			if(isNumber(code) && isNumber(money)){
				refund(host, room, 2, code, 3, money);
			}
		}
		
		if(content.indexOf('船号') != -1 && content.indexOf('报修') != -1){
			var code = content.split('船号')[1].split('报修')[0];
			if(isNumber(code)){
				updateStatus(2, host, room, code);
			}
		}
		
		if(content.indexOf('船号') != -1 && content.indexOf('启用') != -1){
			var code = content.split('船号')[1].split('启用')[0];
			if(isNumber(code)){
				updateStatus(0, host, room, code);
			}
		}
		
		if(content.indexOf('船号') != -1 && content.indexOf('查手机') != -1){
			var code = content.split('船号')[1].split('查手机')[0];
			if(isNumber(code)){
				getLastedPhone(host, room, code);
			}
		}	
		
		if(content.indexOf('船号') != -1 && content.indexOf('已结订单退款') != -1){
			var code = content.split('船号')[1].split('已结订单退款')[0];
			var money = content.split('已结订单退款')[1];
			if(isNumber(code) && isNumber(money)){
				refund(host, room, 2, code, 4, money);
			}
		}	
		
		if(content.indexOf('手机号') != -1 && content.indexOf('已结订单退款') != -1){
			var phone = content.split('手机号')[1].split('已结订单退款')[0];
			var money = content.split('已结订单退款')[1];
			if(isNumber(phone) && isNumber(money)){
				refund(host, room, 1, phone, 4, money);
			}
		}	
		
		if(content.indexOf('船号') != -1 && content.indexOf('救援完成') != -1){
			var code = content.split('船号')[1].split('救援完成')[0];
			if(isNumber(code)){
				completeRescue(host, room, code);
			}
		}	
	}else if(msg.type() == wechat.bot.Message.Type.Video){
		console.log('~~~~~~~~~~视频消息~~~~~~~~~');

	}else if(msg.type() == wechat.bot.Message.Type.Audio){
		console.log('~~~~~~~~~~语音消息~~~~~~~~~');

	}else if(msg.type() == wechat.bot.Message.Type.Image){
		console.log('~~~~~~~~~~图片消息~~~~~~~~~');

	}else{
		console.log('~~~~~~~~其它类型消息~~~~~~~');
	}
}

// 完成救援
function completeRescue(host, room, code){
	const options = {
		hostname: host,
		path: '/bhpark/deviceRobot/removeRescue?deviceSn='+ code,
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
    if(regPos.test(val) || regNeg.test(val)) {
    	return true;
    } else {
    	return false;
    }
}

// 电瓶船&自行车开关锁
function sendCommand(type, host, room, code){
	const options = {
		hostname: host,
		path: '/bhpark/deviceRobot/sendCommand?deviceSn='+ code +'&type=' + type,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	    res.on('data', (d) => {
			console.log(d);
			var res = JSON.parse(d.toString());
			room.say('\n船号:' + code + '\n' + res.msg);
			if(type == 'open'){
				let path = require('path');
				fs.readFile(path.resolve(__dirname, '../jsonData/bhOpen.json'), 'utf8', function(err, data){
					if(err){
						return console.error(err);
					}
					data = JSON.parse(data);
					var openNumber = parseInt(data.openNumber);
					openNumber += 1;
					var bhData = {
						"openNumber": openNumber
					};
					fs.writeFile(path.resolve(__dirname, '../jsonData/bhOpen.json'), JSON.stringify(bhData),function(err){
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
function updateStatus(status, host, room, code){
	const options = {
		hostname: host,
		path: '/bhpark/deviceRobot/updateStatus?deviceSn='+ code +'&status=' + status,
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
function getLastedPhone(host, room, code){
	const options = {
		hostname: host,
		path: '/bhpark/deviceRefundRobot/getLastedPhone?deviceSn='+ code,
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
function refund(host, room, refundType, refundValue, refundWall, refundMoney){
	var data;
	if(refundWall == '1' || refundWall == '2'){
		data = {
			refundType: refundType,
			refundValue: refundValue,
			refundWall: refundWall
		}
	}else{
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
		path: '/bhpark/deviceRefundRobot/refund',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
		console.log(res);
		room.say(res.msg);
	  });
	});
	
	req.write(JSON.stringify(data));
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}


module.exports = {bhzjcRoomDeal};
