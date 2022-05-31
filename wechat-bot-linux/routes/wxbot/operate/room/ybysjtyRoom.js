var wechat = require('../mybot.js');
const https = require('https');
const host = "iot.smart-ideas.com.cn";
const fs = require('fs');
const boss = require('../common/boss.js');

async function ybysjtyRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)园博园报数\n2)园博园闸机报数\n3)园博园预约报数\n----------")
		}
		
		// 园博园报数
		if(content == '园博园报数'){
			var enterpriseCode = 'TgsEpcYby';
			var ticketGroupNum = 'TGN20201210095942945';
			boss.getCheckTicketInfo(enterpriseCode, ticketGroupNum, room);
		}
		
		// 园博园门区检票报数
		if(content == '园博园闸机报数'){
			var enterpriseCode = 'TgsEpcYby';
			var ticketGroupNum = 'TGN20201210095942945';
			boss.getBrakeData(enterpriseCode, ticketGroupNum, room);
		}
		
		// 园博园门票报数
		if(content == '园博园预约报数'){
			var enterpriseCode = 'TgsEpcYby';
			var ticketGroupNum = 'TGN20201210095942945';
			boss.getBossYYInfo(enterpriseCode, ticketGroupNum, room);
		}
	}
};

module.exports = {ybysjtyRoomDeal};