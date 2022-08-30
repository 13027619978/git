var wechat = require('../mybot.js');
const http = require('http');
const host = "hd.smart-ideas.com.cn";

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
			var botString = '机器人使用方法:\n----------\n';
			botString += '1)查询设备通信通道\n';
			botString += '2)切换sim\n';
			botString += '3)切换mqtt';
			room.say(botString);
		}
		
		if(content == '查询设备通信通道'){
			const options = {
				hostname: host,
				path: '/xwhpark/command/getSwitch',
				method: 'GET'
			};
			
			const req = http.request(options, (res) => {
				res.on('data', (d) => {
					var res = JSON.parse(d.toString());
					room.say('当前设备通信通道:' + res.data + '\n' + res.msg);
				});
			});
			
			req.on('error', (e) => {
			  console.error(`problem with request: ${e.message}`);
			});
			
			req.end();
		}
		
		if(content == '切换sim'){
			const options = {
				hostname: host,
				path: '/xwhpark/command/switch?type=sim',
				method: 'GET'
			};
			
			const req = http.request(options, (res) => {
				res.on('data', (d) => {
					console.log(d);
					var res = JSON.parse(d.toString());
					room.say(res.msg);
				});
			});
			
			req.on('error', (e) => {
			  console.error(`problem with request: ${e.message}`);
			});
			
			req.end();
		}
		
		if(content == '切换mqtt'){
			const options = {
				hostname: host,
				path: '/xwhpark/command/switch?type=mqtt',
				method: 'GET'
			};
			
			const req = http.request(options, (res) => {
				res.on('data', (d) => {
					console.log(d);
					var res = JSON.parse(d.toString());
					room.say(res.msg);
				});
			});
			
			req.on('error', (e) => {
			  console.error(`problem with request: ${e.message}`);
			});
			
			req.end();
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

module.exports = {testRoomDeal};
