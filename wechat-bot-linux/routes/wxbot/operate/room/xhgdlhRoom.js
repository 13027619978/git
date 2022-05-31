var wechat = require('../mybot.js');
const https = require('https');
const host = "iot.smart-ideas.com.cn";
const fs = require('fs');
const xhgdlh = require('../common/xhgdlh.js');

async function xhgdlhRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)蝶恋花报数\n----------");
		}
		
		if(content == '蝶恋花报数'){
			xhgdlh.getdlhInfo(host, room);
		}
	}
};

module.exports = {xhgdlhRoomDeal};