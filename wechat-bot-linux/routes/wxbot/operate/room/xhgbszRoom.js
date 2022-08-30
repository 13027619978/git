var wechat = require('../mybot.js');
const boss = require('../common/boss.js');
const xhg = require('../common/xhg.js');


async function xhgbszRoomDeal(msg){
	const content = msg.text();
	const contact = msg.from();
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
			room.say("机器人使用方法:\n----------\n1)鲜花港报数\n2)鲜花港入园报数\n----------");
		}
		
		if(content == '鲜花港报数'){
			var enterpriseCode = 'TgsEpcSlfz';
			var ticketGroupNum = 'TGN20200907203306267';
			boss.getBossInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		if(content == '鲜花港入园报数'){
			var enterpriseCode = 'TgsEpcSlfz';
			var ticketGroupNum = 'TGN20200907203306267';
			xhg.getPeopleInfo(enterpriseCode, ticketGroupNum, room);
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


module.exports = {xhgbszRoomDeal}
