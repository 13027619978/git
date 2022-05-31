var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const xhg = require('../common/xhg.js');


async function xhgdxzRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)鲜花港预约报数\n2)鲜花港核销报数\n3)蝶馆预约报数\n4)蝶馆核销报数\n----------");
		}
		
		if(content == '鲜花港预约报数'){
			var enterpriseCode = 'TgsEpcXhg';
			var ticketGroupNum = 'TGN20210628140233051';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '鲜花港核销报数'){
			var enterpriseCode = 'TgsEpcXhg';
			var ticketGroupNum = 'TGN20210628140233051';
			xhg.getPeopleInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '蝶馆预约报数'){
			var enterpriseCode = 'TgsEpcXhg';
			var ticketGroupNum = 'TGN20210629121602397';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '蝶馆核销报数'){
			var enterpriseCode = 'TgsEpcXhg';
			var ticketGroupNum = 'TGN20210629121602397';
			xhg.getPeopleInfo(enterpriseCode, ticketGroupNum, room);
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


module.exports = {xhgdxzRoomDeal}
