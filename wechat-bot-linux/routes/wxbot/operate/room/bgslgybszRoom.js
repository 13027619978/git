var wechat = require('../mybot.js');
const boss = require('../common/boss.js');


async function bgslgybszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)北宫森林公园报数\n2)北宫森林公园预约报数\n----------");
		}
		
		if(content == '北宫森林公园报数'){
			var enterpriseCode = 'TgsEpcBgslgy';
			var ticketGroupNum = 'TGN20220727162132879';
			boss.getBossInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '北宫森林公园预约报数'){
			var enterpriseCode = 'TgsEpcBgslgy';
			var ticketGroupNum = 'TGN20220727162132879';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
		
	}else if(msg.type() == wechat.bot.Message.Type.Video){
		console.log('~~~~~~~~~~视频消息~~~~~~~~~');

	}else if(msg.type() == wechat.bot.Message.Type.Audio){
		console.log('~~~~~~~~~~语音消息~~~~~~~~~');

	}else if(msg.type() == wechat.bot.Message.Type.Image){
		console.log('~~~~~~~~~~图片消息~~~~~~~~~');
		const file = await msg.toFileBox();
		room.say(file);
		
	}else{
		console.log('~~~~~~~~其它类型消息~~~~~~~');
	}
}


module.exports = {bgslgybszRoomDeal}
