var wechat = require('../mybot.js');
const http = require('https');
const fs = require('fs');
const zzy = require('../common/zzy.js');
const { FileBox } = require('file-box');
const bh = require('../common/bhgy.js');

async function testRoomDeal(msg){
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
		if(content == '北海预约报数'){
			bh.getYYInfoByTime(room);
		}
		
		if(content == '紫竹院预约报数'){
			zzy.getYYInfoByTime(room);
		}
	}else if(msg.type() == wechat.bot.Message.Type.Video){
		console.log('~~~~~~~~~~视频消息~~~~~~~~~');

	}else if(msg.type() == wechat.bot.Message.Type.Audio){
		console.log('~~~~~~~~~~语音消息~~~~~~~~~');

	}else if(msg.type() == wechat.bot.Message.Type.Image){
		console.log('~~~~~~~~~~图片消息~~~~~~~~~');

	}else{
		console.log('~~~~~~~~其它类型消息~~~~~~~');
	}
}

module.exports = {testRoomDeal};
