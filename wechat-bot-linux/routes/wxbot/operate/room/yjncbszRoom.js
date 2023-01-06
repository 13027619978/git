var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const yjnc = require('../common/yjnc.js');

async function yjncbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)紫竹院核销报数\n2)圆明园核销报数\n3)颐和园核销报数\n4)南海子核销报数\n5)陶然亭核销报数\n6)温榆河核销报数\n7)什刹海核销报数\n8)北海核销报数\n9)冰场总核销报数\n----------");
		}
		
		if(content == '紫竹院核销报数'){
			yjnc.getCheckTicketInfo('TGN20221206141339019', room);
		}
		
		if(content == '圆明园核销报数'){
			yjnc.getCheckTicketInfo('TGN20221222182722856', room);
			yjnc.getCheckTicketInfo('TGN20221227164943714', room);
		}
		
		if(content == '颐和园核销报数'){
			yjnc.getCheckTicketInfo('TGN20221222134157340', room);
		}
		
		if(content == '南海子核销报数'){
			yjnc.getCheckTicketInfo('TGN20221220202852819', room);
		}
		
		if(content == '陶然亭核销报数'){
			yjnc.getCheckTicketInfo('TGN20221220141937408', room);
		}
		
		if(content == '温榆河核销报数'){
			yjnc.getCheckTicketInfo('TGN20221214110015292', room);
		}
		
		if(content == '什刹海核销报数'){
			yjnc.getCheckTicketInfo('TGN20221219133406523', room);
		}
		
		if(content == '北海核销报数'){
			yjnc.getCheckTicketInfo('TGN20221220120201909', room);
		}
		
		if(content == '冰场总核销报数'){
			yjnc.getCheckTotal(room);
		}
	}
};

module.exports = {yjncbszRoomDeal};