var wechat = require('../mybot.js');
const http = require('http');
const host = "rent.smart-ideas.com.cn";
const xtyby = require('../common/xtyby.js');

/********************/
/***** 邢台园博园自行车 *******/
/********************/
async function testRoomDeal(msg){
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
			botString += '1)车号xxx开锁\n';
			botString += '2)车号xxx关锁\n';
			botString += '3)手机号xxx按时间退款\n';
			botString += '4)手机号xxx全额退款\n';
			botString += '5)手机号xxx退款xxx\n';
			botString += '6)车号xxx按时间退款\n';
			botString += '7)车号xxx全额退款\n';
			botString += '8)车号xxx退款xxx\n';
			botString += '9)车号xxx报修\n';
			botString += '10)车号xxx启用\n';
			botString += '11)车号xxx查手机\n';
			botString += '12)车号xxx已结订单退款xxx\n';
			botString += '13)手机号xxx已结订单退款xxx\n';
			botString += '14)手机号XXX按照优惠活动退款';
			room.say(botString);
		}
		
		
		
		if(content.indexOf('车号') != -1 && content.indexOf('开锁') != -1){
			var code = content.split('车号')[1].split('开锁')[0];
			if(isNumber(code)){
				sendCommand('open', host, room, code, contact);
			}
		}
		
		if(content.indexOf('车号') != -1 && content.indexOf('关锁') != -1){
			var code = content.split('车号')[1].split('关锁')[0];
			if(isNumber(code)){
				sendCommand('close', host, room, code, contact);
			}
		}
		
		if(content.indexOf('手机号') != -1 && content.indexOf('按时间退款') != -1){
			var phone = content.split('手机号')[1].split('按时间退款')[0];
			if(isNumber(phone)){
				refund(host, room, 1, phone, 1, 0, contact);
			}
		}
		
		if(content.indexOf('手机号') != -1 && content.indexOf('全额退款') != -1){
			var phone = content.split('手机号')[1].split('全额退款')[0];
			if(isNumber(phone)){
				refund(host, room, 1, phone, 2, 0, contact);
			}
		}
		
		if(content.indexOf('手机号') != -1 && content.indexOf('按照优惠活动退款') != -1){
			var phone = content.split('手机号')[1].split('按照优惠活动退款')[0];
			if(isNumber(phone)){
				refund(host, room, 1, phone, 5, 0, contact);
			}
		}
		
		if(content.indexOf('手机号') != -1 && content.indexOf('退款') != -1 && content.indexOf('按时间') == -1 && content.indexOf('全额') == -1){
			var phone = content.split('手机号')[1].split('退款')[0];
			var money = content.split('退款')[1];
			if(isNumber(phone) && isNumber(money)){
				refund(host, room, 1, phone, 3, money, contact);
			}
		}
		
		if(content.indexOf('车号') != -1 && content.indexOf('按时间退款') != -1){
			var code = content.split('车号')[1].split('按时间退款')[0];
			if(isNumber(code)){
				refund(host, room, 2, code, 1, 0, contact);
			}
		}
		
		if(content.indexOf('车号') != -1 && content.indexOf('全额退款') != -1){
			var code = content.split('车号')[1].split('全额退款')[0];
			if(isNumber(code)){
				refund(host, room, 2, code, 2, 0, contact);
			}
		}
		
		if(content.indexOf('车号') != -1 && content.indexOf('退款') != -1 && content.indexOf('按时间') == -1 && content.indexOf('全额') == -1){
			var code = content.split('车号')[1].split('退款')[0];
			var money = content.split('退款')[1];
			if(isNumber(code) && isNumber(money)){
				refund(host, room, 2, code, 3, money, contact);
			}
		}
		
		if(content.indexOf('车号') != -1 && content.indexOf('报修') != -1){
			var code = content.split('车号')[1].split('报修')[0];
			if(isNumber(code)){
				updateStatus(2, host, room, code, contact);
			}
		}
		
		if(content.indexOf('车号') != -1 && content.indexOf('启用') != -1){
			var code = content.split('车号')[1].split('启用')[0];
			if(isNumber(code)){
				updateStatus(0, host, room, code, contact);
			}
		}
		
		if(content.indexOf('车号') != -1 && content.indexOf('查手机') != -1){
			var code = content.split('车号')[1].split('查手机')[0];
			if(isNumber(code)){
				getLastedPhone(host, room, code, contact);
			}
		}	
		
		if(content.indexOf('车号') != -1 && content.indexOf('已结订单退款') != -1){
			var code = content.split('车号')[1].split('已结订单退款')[0];
			var money = content.split('已结订单退款')[1];
			if(isNumber(code) && isNumber(money)){
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
		
		if(content.indexOf('车号') != -1 && content.indexOf('救援完成') != -1){
			var code = content.split('车号')[1].split('救援完成')[0];
			if(isNumber(code)){
				completeRescue(host, room, code, contact);
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
function completeRescue(host, room, code, contact){
	const options = {
		hostname: host,
		path: '/xtybypark/deviceRobot/removeRescue?deviceSn='+ code,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	    res.on('data', (d) => {
			console.log(d);
			var res = JSON.parse(d.toString());
			room.say('\n车号:' + code + '\n' + res.msg);
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
function sendCommand(type, host, room, code, contact){
	const options = {
		hostname: host,
		path: '/xtybypark/deviceRobot/sendShipCommand?deviceSn='+ code +'&type=' + type,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	    res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			room.say('\n车号:' + code + '\n' + res.msg);
	    });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

// 电瓶船|自行车报修或者启用
function updateStatus(status, host, room, code, contact){
	const options = {
		hostname: host,
		path: '/xtybypark/deviceRobot/updateStatus?deviceSn='+ code +'&status=' + status,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	  	console.log(d);
	    var res = JSON.parse(d.toString());
	    room.say('\n车号:' + code + '\n' + res.msg);
	  });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

// 电瓶船|自行车查询手机号
function getLastedPhone(host, room, code, contact){
	const options = {
		hostname: host,
		path: '/xtybypark/deviceRefundRobot/getLastedPhone?deviceSn='+ code,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	  	console.log(d);
	    var res = JSON.parse(d.toString());
	    room.say('\n' + res.msg + '\n车号：' + code + '\n最后订单手机号：' + res.data);
	  });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

// 电瓶船|自行车租赁退款
function refund(host, room, refundType, refundValue, refundWall, refundMoney, contact){
	var data;
	if(refundWall == '1' || refundWall == '2' || refundWall == '5'){
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
		path: '/xtybypark/deviceRefundRobot/refund',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
		room.say(res.msg);
	  });
	});
	
	req.write(JSON.stringify(data));
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	req.end();
}


module.exports = {testRoomDeal};
