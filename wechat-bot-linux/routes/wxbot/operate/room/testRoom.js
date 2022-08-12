var wechat = require('../mybot.js');
const http = require('http');
const host = "rent.smart-ideas.com.cn";
const ybycs = require('../common/ybycs.js');

/********************/
/***** 邢台园博园自行车 *******/
/********************/
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
		if(content == '使用方法'){
			var botString = '机器人使用方法:\n----------\n';
			botString += '1)园博园创森核销报数\n';
			botString += '2)园博园创森预约报数\n';
			room.say(botString);
		}
		
		if(content == '园博园创森核销报数'){
			ybycs.getCheckTicketNumberInfo(room);
		}
		
		if(content == '园博园创森预约报数'){
			ybycs.getYYInfo(room);
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
