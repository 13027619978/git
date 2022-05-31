var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const xhg = require('../common/xhg.js');


async function xhgpwdxqRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)鲜花港渠道报数\n2)鲜花港微信端报数\n3)蝶馆渠道报数\n4)蝶馆微信端报数\n5)冰雪嘉年华微信端报数\n6)冰雪嘉年华渠道报数\n7)鲜花港雪圈报数\n8)鲜花港雪地项目报数\n----------");
		}
		
		if(content == '鲜花港渠道报数'){
			var enterpriseCode = 'TgsEpcXhg';
			var ticketGroupNum = 'TGN20210628140233051';
			boss.getBossInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '鲜花港微信端报数'){
			var enterpriseCode = 'TgsEpcXhg';
			var ticketGroupNum = 'TGN20210628140233051';
			boss.getTicketInfo(enterpriseCode, ticketGroupNum, 'WEB', room);
		}
		
		if(content == '蝶馆渠道报数'){
			var enterpriseCode = 'TgsEpcXhg';
			var ticketGroupNum = 'TGN20210629121602397';
			boss.getBossInfo(enterpriseCode, ticketGroupNum, room, 1);
		}
		
		if(content == '蝶馆微信端报数'){
			var enterpriseCode = 'TgsEpcXhg';
			var ticketGroupNum = 'TGN20210629121602397';
			boss.getTicketInfo(enterpriseCode, ticketGroupNum, 'WEB', room);
		}
		
		if(content == '微信端报数'){
			xhg.getBxjnhInfo(room);
		}
		
		if(content == '冰雪嘉年华渠道报数'){
			var enterpriseCode = 'TgsEpcXhg';
			var ticketGroupNum = 'TGN20211210160317254';
			boss.getBossInfo(enterpriseCode, ticketGroupNum, room, 1);
		}
		
		if(content == '鲜花港雪圈报数'){
			xhg.getXqIncome(room);
		}
		
		if(content == '鲜花港雪地项目报数'){
			xhg.getBsxmIncome(room);
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


module.exports = {xhgpwdxqRoomDeal}
