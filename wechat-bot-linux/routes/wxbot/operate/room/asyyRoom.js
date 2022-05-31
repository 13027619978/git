var wechat = require('../mybot.js');
const https = require('https');
const host = 'iot.smart-ideas.com.cn';

async function asyyRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)手机号xxxxxxxxxxx退款xxx\n2)统计报数\n----------");
		}
		
		
		if(content.indexOf('手机号') != -1 && content.indexOf('退款') != -1){
			var phoneNumber = content.split('手机号')[1].split('退款')[0];
			var money = content.split('退款')[1];
			
			if(!isNumber(phoneNumber) || !isNumber(money)){
				room.say("格式错误！\n正确格式:\n手机号xxxxxxxxxxx退款xxx");
				return;
			}
			
			if(phoneNumber.length == 11){
				const options = {
					hostname: host,
					path: '/orson/otherOrder/refundMoney?phone=' + phoneNumber + '&money=' + money,
					method: 'GET'
				};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    if(res.code == "SUCCESS"){
				    	room.say("\n手机号："+ phoneNumber +"\n退款成功！");
				    }else{
				    	room.say("退款失败!\n手机号："+ phoneNumber +"\n" + res.msg);
				    }
				  });
				});
				
				req.end();
			}else{
				room.say("格式错误！\n正确格式:\n鲜花港手机号xxxxxxxxxxx退款xxx");
			}
		}
		
		if(content == '统计报数'){
			var nowDate = new Date();
			var nowYear = nowDate.getFullYear();
			var nowMonth = nowDate.getMonth() + 1;
			nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
			var nowDay = nowDate.getDate();
			nowDay = nowDay>9?nowDay:'0'+nowDay;
			var nowHour = nowDate.getHours();
			nowHour = nowHour>9?nowHour:'0'+nowHour;
			var nowMinutes = nowDate.getMinutes();
			nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
			var nowSeconds = nowDate.getSeconds();
			nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
			var startDate = nowYear + '-' + nowMonth + '-' + nowDay + ' 00:00:00';
			var searchStartDate = encodeURI(startDate);
			var endDate = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
			var searchEndDate = encodeURI(endDate);
			const options = {
				hostname: host,
				path: '/orson/clt/getClt?startDate=' + searchStartDate + '&endDate=' + searchEndDate,
				method: 'GET'
			};
			
			const req = https.request(options, (res) => {
			  res.on('data', (d) => {
			  	
			    var res = JSON.parse(d.toString());
			    console.log(res);
			    var xueQTotal = res.data.otherOrderCltVo.xueQTotal;
			    if(!xueQTotal){
			    	xueQTotal = "0.00";
			    }
			    room.say("\n查询时间："+ endDate +"\n当前营业额："+ xueQTotal +"元");
			  });
			});
			
			req.on('error', (e) => {
			  console.error(`problem with request: ${e.message}`);
			});
			
			req.end();
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

function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)) {
    	return true;
    } else {
    	return false;
    }
}

module.exports = {asyyRoomDeal}