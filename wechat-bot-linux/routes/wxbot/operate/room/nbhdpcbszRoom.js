var wechat = require('../mybot.js');
const nbh = require('../common/nbh.js');

async function nbhdpcbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)南北湖报数\n----------");
		}
		
		if(content == '南北湖报数'){
			nbh.getnbhDpcInfo(room);
		}
	}
};



module.exports = {nbhdpcbszRoomDeal};