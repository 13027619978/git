var wechat = require('../mybot.js');

async function tgywgybszRoomDeal(msg){
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
			var botString = '***天宫院网格小组001***';
			botString += '\n1. 当值网格员查询';
			botString += '\n2. 办结事件查询';
			botString += '\n3. 未结事件查询';
			botString += '\n**************************';
			
			room.say(botString);
		}
	}
};

module.exports = {tgywgybszRoomDeal};