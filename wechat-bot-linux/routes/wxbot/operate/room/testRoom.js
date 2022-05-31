var wechat = require('../mybot.js');
const https = require('https');
let host = 'iot.smart-ideas.com.cn';
const { FileBox } = require('file-box');
const fs = require('fs');
const { UrlLink } = require('wechaty');
const request = require('request');
const apiHost = 'api.smart-ideas.com.cn';
const http = require('http');
const yqh = require('../common/yqh.js');
const yby = require('../common/yby.js');
const boss = require('../common/boss.js');
const xwh = require('../common/xwh.js');
const xhg = require('../common/xhg.js');
const nh = require('../common/nh.js');
const fhl = require('../common/fhl.js');
const ssgy = require('../common/ssgy.js');
const sch = require('../common/sch.js');
const xtyby = require('../common/xtyby.js');
const test = require('../common/test.js');

var express=require('express');
var router = express.Router();

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
		
		if (content == '使用方法') {
			var botString = '机器人使用方法:\n----------\n';
			// botString += '1)邢台园博园报数\n';
			room.say(botString);
		}
		
		if(content == '玄武湖自驾船报数'){
			test.getxwhInfo('hd.smart-ideas.com.cn', room);
		}
		
		if(content == '玄武湖电瓶车报数'){
			test.getXwhdpcInfo(room);
		}
		
	}else if(msg.type() == wechat.bot.Message.Type.Video){
		console.log('~~~~~~~~~~视频消息~~~~~~~~~');

	}else if(msg.type() == wechat.bot.Message.Type.Audio){
		console.log('~~~~~~~~~~语音消息~~~~~~~~~');

	}else if(msg.type() == wechat.bot.Message.Type.Image){
		console.log('~~~~~~~~~~图片消息~~~~~~~~~');
		const file = await msg.toFileBox();
		room.say(file);
		
	}else{
		console.log('~~~~~~~~其它类型消息~~~~~~~');
	}
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

// 电瓶船&自行车开关锁
function sendCommand(type, host, room, code){
	const options = {
		hostname: host,
		path: '/ymypark/deviceRobot/sendCommand?deviceSn='+ code +'&type=' + type,
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
		path: '/ymypark/deviceRefundRobot/refund',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			console.log(d);
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

module.exports = {testRoomDeal};