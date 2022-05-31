var wechat = require('../mybot.js');
const ylh = require('../common/ylh.js');
const host = "rent.smart-ideas.com.cn";

async function ylhzjcbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)云龙湖报数\n----------");
		}
		
		if(content == '云龙湖报数'){
			ylh.getylhInfo(room);
		}
	}
};



module.exports = {ylhzjcbszRoomDeal};