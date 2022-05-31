var wechat = require('../mybot.js');
var boss = require('../common/boss.js');

async function ybyzmzRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)园博园已售活动票报数\n2)xxxx-xx-xx至今日已售活动票报数\n----------")
		}
		
		if(content == '园博园已售活动票报数'){
			boss.getTicketBuyInfo('TgsEpcYby', 'TGN20201210095942945', 4, room);
			boss.getTicketBuyInfo('TgsEpcYby', 'TGN20210923092123006', 4, room);
			boss.getTicketBuyInfo('TgsEpcYby', 'TGN20210924083128003', 4, room);
		}
		
		if(content.indexOf('至今日已售活动票报数') != -1){
			var startDate = content.split('至今日')[0];
			var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
			var regExp = new RegExp(reg);
			if(!regExp.test(startDate)){
			　　room.say("日期格式不正确，正确格式如：2020-01-01");
			　　return;
			}
			boss.getTicketBuyInfoByTime('TgsEpcYby', 'TGN20201210095942945', 4, room, startDate);
			boss.getTicketBuyInfoByTime('TgsEpcYby', 'TGN20210923092123006', 4, room, startDate);
			boss.getTicketBuyInfoByTime('TgsEpcYby', 'TGN20210924083128003', 4, room, startDate);
		}
	}
};


module.exports = {ybyzmzRoomDeal};