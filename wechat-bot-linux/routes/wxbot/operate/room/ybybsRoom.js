var wechat = require('../mybot.js');
const https = require('https');
const host = "iot.smart-ideas.com.cn";
const fs = require('fs');
const yby = require('../common/yby.js');
const boss = require('../common/boss.js');

async function ybybsRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)园博园闸机报数\n2)园博园核销报数\n3)承载量报数\n4)园博园预约报数\n----------")
		}
		
		// 预约报数
		if(content == '园博园闸机报数'){
			var enterpriseCode = 'TgsEpcYby';
			var ticketGroupNum = 'TGN20201210095942945';
			boss.getBrakeData(enterpriseCode, ticketGroupNum, room);
		}
		
		// 预约报数
		if(content == '园博园核销报数'){
			var enterpriseCode = 'TgsEpcYby';
			var ticketGroupNum = 'TGN20201210095942945';
			yby.getCheckTicketInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		
		if(content == '承载量报数'){
			var enterpriseCode = 'TgsEpcYby';
			var ticketGroupNum = 'TGN20201210095942945';
			yby.getTicketsIncome(room);
		}
		
		// 园博园预约报数
		if(content == '园博园预约报数'){
			var enterpriseCode = 'TgsEpcYby';
			var ticketGroupNum = 'TGN20201210095942945';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
	}
};


module.exports = {ybybsRoomDeal};