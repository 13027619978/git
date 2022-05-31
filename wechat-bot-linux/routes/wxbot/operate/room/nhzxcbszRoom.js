var wechat = require('../mybot.js');
const nh = require('../common/nh.js');

/********************/
/***** 南湖自行车 *******/
/********************/
async function nhzxcbszRoomDeal(msg){
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
			const roomTopic = await room.topic();
			var botString = '机器人使用方法:\n----------\n';
			botString += '1)自行车报数';
			room.say(botString);
		}
		
		if(content == '自行车报数'){
			nh.getIncome(room, 'bike');
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


module.exports = {nhzxcbszRoomDeal};
