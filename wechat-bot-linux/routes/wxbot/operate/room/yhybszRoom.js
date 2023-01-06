var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const yhy = require('../common/yhy.js');

async function yhybszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)颐和园冰场核销报数\n----------");
		}
		
		if(content == '颐和园冰场核销报数'){
			yhy.getCheckTicketInfo(room);
		}
	}
};

module.exports = {yhybszRoomDeal};