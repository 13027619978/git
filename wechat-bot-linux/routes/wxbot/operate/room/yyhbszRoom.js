var wechat = require('../mybot.js');
const yyh = require('../common/yyh.js');
const host = "lease.smart-ideas.com.cn";

async function yyhbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)野鸭湖报数\n----------");
		}
		
		if(content == '野鸭湖报数'){
			yyh.getyyhInfo(host, room);
		}
	}
};



module.exports = {yyhbszRoomDeal};