var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const ssgy = require('../common/ssgy.js');


async function ssgyxsjbszRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)雪圈报数\n2)水上公园雪世界报数\n3)水上公园雪世界核销报数\n----------");
		}
		
		if(content == '雪圈报数'){
			ssgy.getIncome(room);
		}
		
		if(content == '水上公园雪世界报数'){
			ssgy.getXsjSzIncome(room);
		}
		
		if(content == '水上公园雪世界核销报数'){
			boss.getCheckTicketInfo('TgsEpcSsgy', 'TGN20211201163921241', room);
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


module.exports = {ssgyxsjbszRoomDeal}
