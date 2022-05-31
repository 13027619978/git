var wechat = require('../mybot.js');

async function tgyjdcsbszRoomDeal(msg){
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
			var botString = '***天宫院街道城市管理平台***';
			botString += '\n1. 当日违停案件数量';
			botString += '\n2. 当日违规晾晒数量';
			botString += '\n3. 当日非机动违规数量';
			botString += '\n4. 突发事件处理情况';
			botString += '\n5. 群众反馈事件数量';
			botString += '\n**************************';
			
			room.say(botString);
		}
	}
};

module.exports = {tgyjdcsbszRoomDeal};