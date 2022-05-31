var wechat = require('../mybot.js');
const sch = require('../common/sch.js');

async function schotaRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)订单号xxx退款xxx\n2)流水号xxx退款xxx\n3)pos流水号xxx退款xxx\n----------");
		}
		
		if(content.indexOf('订单号') != -1 && content.indexOf('退款') != -1){
			let orderCode = content.split('订单号')[1].split('退款')[0];
			let refundMoney = content.split('订单号')[1].split('退款')[1];
			if(isNumber(refundMoney)){
				sch.refund(orderCode, refundMoney, room);
			}
		}
		
		if(content.indexOf('流水号') != -1 && content.indexOf('退款') != -1 && content.indexOf('pos') == -1){
			let orderCode = content.split('流水号')[1].split('退款')[0];
			let refundMoney = content.split('流水号')[1].split('退款')[1];
			if(isNumber(refundMoney)){
				sch.refund(orderCode, refundMoney, room);
			}
		}
		
		if(content.indexOf('pos流水号') != -1 && content.indexOf('退款') != -1){
			let orderCode = content.split('pos流水号')[1].split('退款')[0];
			let refundMoney = content.split('pos流水号')[1].split('退款')[1];
			if(isNumber(refundMoney)){
				sch.posRefund(orderCode, refundMoney, room);
			}
		}
	}
};

function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)) {
    	return true;
    } else {
    	return false;
    }
}

module.exports = {schotaRoomDeal};