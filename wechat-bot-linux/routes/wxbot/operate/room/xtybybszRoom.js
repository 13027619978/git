var wechat = require('../mybot.js');
const xtyby = require('../common/xtyby.js');
const host = 'rent.smart-ideas.com.cn';

async function xtybybszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)邢台园博园报数\n2)观光车报数\n----------");
		}
		
		if(content == '邢台园博园报数'){
			xtyby.getxtybyInfo(host, room);
		}
		
		if(content == '观光车报数'){
			xtyby.xtybydpcInfo(room);
		}
	}
};



module.exports = {xtybybszRoomDeal};