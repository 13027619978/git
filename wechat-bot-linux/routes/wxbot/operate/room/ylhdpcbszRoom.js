var wechat = require('../mybot.js');
const https = require('https');
const host = 'hd.smart-ideas.com.cn';
let ylh = require('../common/ylh.js');

async function ylhdpcbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)电瓶车报数\n----------");
		}
		
		if(content == '电瓶车报数'){
			ylh.ylhdpcInfo(room);
		}
	}
};




module.exports = {ylhdpcbszRoomDeal};