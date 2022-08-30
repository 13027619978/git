var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const ssgy = require('../common/ssgy.js');


async function ssgybszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)水上公园报数\n2)水上公园预约报数\n3)水上公园微信报数\n4)水上公园核销报数\n----------");
		}
		
		if(content == '水上公园报数'){
			var enterpriseCode = 'TgsEpcSlfz';
			var ticketGroupNum = 'TGN20200907203336045';
			boss.getBossPeoPleInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '水上公园预约报数'){
			var enterpriseCode = 'TgsEpcSlfz';
			var ticketGroupNum = 'TGN20200907203336045';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '水上公园微信报数'){
			// var enterpriseCode = 'TgsEpcSlfz';
			// var ticketGroupNum = 'TGN20200907203336045';
			// boss.getCheckTicketInfo(enterpriseCode, ticketGroupNum, room);
			ssgy.getVxIncome(room);
		}
		
		if(content == '水上公园核销报数'){
			var enterpriseCode = 'TgsEpcSlfz';
			var ticketGroupNum = 'TGN20200907203336045';
			boss.getTicketInfo(enterpriseCode, ticketGroupNum, '', room);
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


module.exports = {ssgybszRoomDeal}
