var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const nhz = require('../common/nhz.js');

async function nhzbszRoomDeal(msg){
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
			// room.say("机器人使用方法:\n----------\n1)南海子核销报数\n2)南海子预约报数\n----------");
			room.say("机器人使用方法:\n----------\n1)南海子核销报数\n----------");
		}
		
		if(content == '南海子核销报数'){
			nhz.getCheckTicketInfo('TgsEpcSy', 'TGN20221219120936423', room, 'TC');
		}

		// if(content == '南海子预约报数'){
		// 	boss.getBossYYInfo('TgsEpcSy', 'TGN20221219120936423', room);
		// }
	}
};

module.exports = {nhzbszRoomDeal};