var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const sch = require('../common/sch.js');

async function schbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)什刹海三海核销报数\n2)什刹海三海预约报数\n3)什刹海点位报数\n4)什刹海租赁报数\n----------");
			// room.say("机器人使用方法:\n----------\n1)什刹海点位报数\n----------");
		}
		
		if(content == '什刹海三海核销报数'){
			var enterpriseCode = 'TgsEpcSh';
			var ticketGroupNum = 'TGN20211223142734998';
			sch.getCheckTicketInfo(enterpriseCode, ticketGroupNum, room);
		}

		if(content == '什刹海三海预约报数'){
			var enterpriseCode = 'TgsEpcSh';
			var ticketGroupNum = 'TGN20211223142734998';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '什刹海点位报数'){
			sch.getPosIncome(room);
		}
		
		if(content == '什刹海租赁报数'){
			sch.getLeaseInfo(room);
		}
	}
};

module.exports = {schbszRoomDeal};