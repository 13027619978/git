var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const zzy = require('../common/zzy.js');

async function zzybszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)紫竹院核销报数\n2)紫竹院租赁报数\n----------");
		}
		
		if(content == '紫竹院核销报数'){
			zzy.getCheckTicketInfo('TgsEpcBxyyz', 'TGN20221205175851713', room, 'TC');
			
		}
		
		if(content == '紫竹院租赁报数'){
			zzy.getLeaseInfo(room);
		}

		// if(content == '紫竹院预约报数'){
		// 	var enterpriseCode = 'TgsEpcBxyyz';
		// 	var ticketGroupNum = 'TGN20221205175851713';
		// 	boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
			
		// }
		
		
	}
};

module.exports = {zzybszRoomDeal};