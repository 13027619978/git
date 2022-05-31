var wechat = require('../mybot.js');
const http = require('http');
const host = "api.smart-ideas.com.cn";
const boss = require('../common/boss.js');

async function zjsbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)正觉寺入园票报数\n2)正觉寺入园票预约报数\n----------");
		}
		
		if(content == '正觉寺入园票报数'){
			var enterpriseCode = 'TgsEpcYmy';
			var ticketGroupNum = 'TGN20201125101904070';
			boss.getTicketInfo(enterpriseCode, ticketGroupNum, 'MINI', room);
		}
		
		if(content == '正觉寺入园票预约报数'){
			var enterpriseCode = 'TgsEpcYmy';
			var ticketGroupNum = 'TGN20201125101904070';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
	}
};

module.exports = {zjsbszRoomDeal};