var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const zzy = require('../common/zzy.js');

async function zzyglcbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)紫竹院冰场预约报数\n2)紫竹院雪场预约报数\n----------");
		}

		if(content == '紫竹院冰场预约报数'){
			zzy.getYYInfoByTime(room);
		}
		
		if(content == '紫竹院雪场预约报数'){
			boss.getBossYYInfo('TgsEpcZzy', 'TGN20221219143307761', room);
		}
		
		if(content == '紫竹院冰场分时报数'){
			zzy.getTimeCheckInfo(room);
		}
	}
};

module.exports = {zzyglcbszRoomDeal};