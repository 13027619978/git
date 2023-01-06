var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const trt = require('../common/trt.js');

async function trtbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)陶然亭冰场核销报数\n2)陶然亭冰场预约报数\n----------");
		}
		
		if(content == '陶然亭冰场核销报数'){
			trt.getCheckTicketInfo(room);
		}
		
		if(content == '陶然亭冰场预约报数'){
			boss.getBossYYInfo('TgsEpcHlldga', 'TGN20221220141005129', room);
		}
	}
};

module.exports = {trtbszRoomDeal};