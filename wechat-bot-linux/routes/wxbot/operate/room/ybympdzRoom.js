var wechat = require('../mybot.js');
const https = require('https');
const host = "iot.smart-ideas.com.cn";
const boss = require('../common/boss.js');

async function ybympdzRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)园博园报数\n2)园博园预约报数\n----------");
		}
		
		if(content == '园博园报数'){
			var enterpriseCode = 'TgsEpcYby';
			var ticketGroupNum = 'TGN20201210095942945';
			boss.getCheckTicketInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '园博园预约报数'){
			var enterpriseCode = 'TgsEpcYby';
			var ticketGroupNum = 'TGN20201210095942945';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
	}
};

module.exports = {ybympdzRoomDeal};