var wechat = require('../mybot.js');
const xwh = require('../common/xwh.js');
const host = "hd.smart-ideas.com.cn";

async function xwhlzRoomDeal(msg){
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
		// if(content == '使用方法'){
		// 	room.say("机器人使用方法:\n----------\n1)玄武湖龙舟报数\n----------");
		// }
		
		// if(content == '玄武湖龙舟报数'){
		// 	xwh.getlzInfo(room);
		// }
	}
};



module.exports = {xwhlzRoomDeal};