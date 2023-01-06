var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const ymy = require('../common/ymy.js');

async function ymybxbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)圆明园冰场核销报数\n2)圆明园雪场核销报数\n3)圆明园租赁报数\n----------");
		}
		
		if(content == '圆明园冰场核销报数'){
			ymy.getCheckTicketInfo('TgsEpcBxyyz', 'TGN20221222182428544', room, 'TC');
		}

		if(content == '圆明园雪场核销报数'){
			ymy.getCheckTicketInfo('TgsEpcBxyyz', 'TGN20221227164251217', room, 'TC');
		}
		
		if(content == '圆明园租赁报数'){
			ymy.getLeaseInfo(room);
		}
	}
};

module.exports = {ymybxbszRoomDeal};