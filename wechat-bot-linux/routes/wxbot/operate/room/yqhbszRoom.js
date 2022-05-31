var wechat = require('../mybot.js');
const yqh = require('../common/yqh.js');
const host = "api.smart-ideas.com.cn";

async function yqhbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)雁栖湖报数\n----------");
		}
		
		if(content == '雁栖湖报数'){
			yqh.getyqhInfo(host, room);
		}
	}
};



module.exports = {yqhbszRoomDeal};