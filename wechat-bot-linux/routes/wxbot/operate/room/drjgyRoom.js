var wechat = require('../mybot.js');
const https = require('https');
const boss = require('../common/boss.js');

async function drjgyRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)狄公公祠报数\n2)狄公故居报数\n3)狄公公祠预约报数\n4)狄公故居预约报数\n----------");
		}
		
		if(content == '狄公公祠报数'){
			var enterpriseCode = 'TgsEpcTydrj';
			var ticketGroupNum = 'TGN20201125191927875';
			boss.getBossPeoPleInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '狄公故居报数'){
			var enterpriseCode = 'TgsEpcTydrj';
			var ticketGroupNum = 'TGN20201125191936690';
			boss.getBossPeoPleInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '狄公公祠预约报数'){
			var enterpriseCode = 'TgsEpcTydrj';
			var ticketGroupNum = 'TGN20201125191927875';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '狄公故居预约报数'){
			var enterpriseCode = 'TgsEpcTydrj';
			var ticketGroupNum = 'TGN20201125191936690';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
	}
};

module.exports = {drjgyRoomDeal};