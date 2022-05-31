var wechat = require('../mybot.js');
const bhgy = require('../common/bhgy.js');
const host = "api.smart-ideas.com.cn";

async function bhbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)北海报数\n----------");
		}
		
		if(content == '北海报数'){
			bhgy.getbhInfo(host, room);
		}
	}
};



module.exports = {bhbszRoomDeal};