var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const bhgy = require('../common/bhgy.js');

async function bhbcbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)北海冰场核销报数\n2)北海冰场预约报数\n----------");
		}
		
		if(content == '北海冰场核销报数'){
			bhgy.getCheckTicketInfo('TgsEpcYqy', 'TGN20221220115005693', room, 'TC');
		}

		if(content == '北海冰场预约报数'){
			bhgy.getYYInfoByTime(room);
		}
	}
};

module.exports = {bhbcbszRoomDeal};