var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const wyh = require('../common/wyh.js');

async function wyhbszRoomDeal(msg){
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
			// room.say("机器人使用方法:\n----------\n1)温榆河核销报数\n2)温榆河预约报数\n----------");
			room.say("机器人使用方法:\n----------\n1)温榆河核销报数\n----------");
		}
		
		if(content == '温榆河核销报数'){
			wyh.getCheckTicketInfo('TgsEpcHty', 'TGN20211223142858166', room, 'TC');
		}

		// if(content == '温榆河预约报数'){
		// 	boss.getBossYYInfo('TgsEpcHty', 'TGN20211223142858166', room);
		// }
	}
};

module.exports = {wyhbszRoomDeal};