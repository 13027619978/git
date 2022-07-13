var wechat = require('../mybot.js');
const xwh = require('../common/xwh.js');
const host = "hd.smart-ideas.com.cn";
const http = require('http');

async function xwhlzRoomDeal(msg){
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
		// 使用方法
		if(content == '使用方法'){
			room.say("机器人使用方法:\n----------\n1)设备号xxx开锁\n2)设备号xxx关锁\n----------");
		}
		
		if(content.indexOf('设备号') != -1 && content.indexOf('开锁') != -1){
			let deviceSn = content.split('设备号')[1].split('开锁')[0];
			const options = {
				hostname: host,
				path: '/xwhpark/deviceRobot/sendShipCommand?deviceSn=' + deviceSn + '&type=open',
				method: 'GET'
			};
			
			const req = http.request(options, (res) => {
				res.on('data', (d) => {
					console.log(d);
					var res = JSON.parse(d.toString());
					room.say('设备号:' + deviceSn + '\n' + res.msg);
				});
			});
			req.end();
		}
		
		if(content.indexOf('设备号') != -1 && content.indexOf('关锁') != -1){
			let deviceSn = content.split('设备号')[1].split('关锁')[0];
			const options = {
				hostname: host,
				path: '/xwhpark/deviceRobot/sendShipCommand?deviceSn=' + deviceSn + '&type=close',
				method: 'GET'
			};
			
			const req = http.request(options, (res) => {
				res.on('data', (d) => {
					console.log(d);
					var res = JSON.parse(d.toString());
					room.say('设备号:' + deviceSn + '\n' + res.msg);
				});
			});
			req.end();
		}
	}
};



module.exports = {xwhlzRoomDeal};