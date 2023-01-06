var wechat = require('../mybot.js');
const dfz = require('../common/dfz.js');

async function dfzbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)胡同游什刹海报数\n2)胡同游温榆河报数\n3)胡同游南海子报数\n4)盛亚南海子报数\n----------");
		}
		
		if(content == '胡同游什刹海报数'){
			dfz.getCheckTicketInfo('TgsEpcHty','TGN20221219133840067',room,'TC');
		}
		
		if(content == '胡同游温榆河报数'){
			dfz.getCheckTicketInfo('TgsEpcHty','TGN20211223142858166',room,'TC');
		}
		
		if(content == '胡同游南海子报数'){
			dfz.getCheckTicketInfo('TgsEpcHty','TGN20221219114138804',room,'TC');
		}
		
		if(content == '盛亚南海子报数'){
			dfz.getCheckTicketInfo('TgsEpcSy','TGN20221219120936423',room,'TC');
		}
	}
}

module.exports = {dfzbszRoomDeal};
