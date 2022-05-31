var wechat = require('../mybot.js');
const https = require('https');
const host = "api.joybike.com.cn";

async function coreRoomDeal(msg){
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
	
	if(fromRoomAlias){
		fromName = fromRoomAlias;
	}else{
		fromName = contact.name();
	}
	if(msg.type() == wechat.bot.Message.Type.Text){
		// 每日恐龙简报
		if(content == '每日恐龙简报'){
			var totalMoney = 0;
		 	var weekTotalMoney = 0;
		 	var toWeekTotalMoney = 0;
		 	var nowDate = new Date().getTime();
		 	var weekDate = nowDate - 86400000 * 7;
		 	var towWeekDate = nowDate - 86400000 * 14;
		 	var nowSDate = getDateString(nowDate).sdate;
		 	var nowEDate = getDateString(nowDate).edate;
		 	var weekSDate = getDateString(weekDate).sdate;
		 	var weekEDate = getDateString(weekDate).edate;
		 	var towWeekSDate = getDateString(towWeekDate).sdate;
		 	var towWeekEDate = getDateString(towWeekDate).edate;
		 	getWeekTotalMoney(nowSDate, nowEDate, weekSDate,  weekEDate, towWeekSDate, towWeekEDate, 1, room);
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


// 每日恐龙简报
var sayString = '';
function getWeekTotalMoney(nowSDate, nowEDate, weekSDate,  weekEDate, towWeekSDate, towWeekEDate, type, room){
	var nowdate = nowEDate;
	nowSDate = encodeURI(nowSDate);
	nowEDate = encodeURI(nowEDate);
	weekSDate = encodeURI(weekSDate);
	weekEDate = encodeURI(weekEDate);
	towWeekSDate = encodeURI(towWeekSDate);
	towWeekEDate = encodeURI(towWeekEDate);
	var totalMoney = 0;
	var upTotalMoney = 0;
	let options = {};
	if(type == 1){
    	options = {
		  hostname: host,
		  path: '/ccsmart/managerIncome/web/getManagerConsumeStatistical?sdate='+ nowSDate +'&edate='+ nowEDate +'&upsDate='+ weekSDate +'&upeDate='+ weekEDate +'&userId=8',
		  method: 'GET'
		};
    }else if(type == 2){
    	options = {
		  hostname: host,
		  path: '/ccsmart/managerIncome/web/getManagerConsumeStatistical?sdate='+ nowSDate +'&edate='+ nowEDate +'&upsDate='+ towWeekSDate +'&upeDate='+ towWeekEDate +'&userId=8',
		  method: 'GET'
		};
    }
	var buffers = [];
	var nread = 0;
	const req = https.request(options, (res) => {
		res.on('data', (d) => {
		  	buffers.push(d);
			nread += d.length;
		});
		
		res.on('end', () => {
			var buffer = null;
		    switch(buffers.length) {
		        case 0: buffer = new Buffer(0);
		            break;
		        case 1: buffer = buffers[0];
		            break;
		        default:
		            buffer = new Buffer(nread);
		            for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
		                var chunk = buffers[i];
		                chunk.copy(buffer, pos);
		                pos += chunk.length;
		            }
		        break;
		    }
		    var res = JSON.parse(buffer.toString());
		    res.rows.forEach(function(value, key){
				if(value.curConsume){
					var curConsume = parseFloat(value.curConsume);
					totalMoney += curConsume;
				}
				if(value.upConsume){
					var upConsume = parseFloat(value.upConsume);
					upTotalMoney += upConsume;
				}
		  	})
		    var percent = parseInt((totalMoney - upTotalMoney) / totalMoney * 100);
		    if(!percent){
		    	percent = 0;
		    }
		    if(type == 1){
		    	nowSDate = decodeURI(nowSDate);
		    	nowEDate = decodeURI(nowEDate);
		    	weekSDate = decodeURI(weekSDate);
		    	weekEDate = decodeURI(weekEDate);
		    	towWeekSDate = decodeURI(towWeekSDate);
		    	towWeekEDate = decodeURI(towWeekEDate);
		    	getWeekTotalMoney(nowSDate, nowEDate, weekSDate,  weekEDate, towWeekSDate, towWeekEDate, 2, room);
		    	sayString = '***每日恐龙简报***\n日期:' + nowdate + '\n总收入:'+ totalMoney +'\n07天同比:'+ percent +'%';
		    }else if(type == 2){
		    	sayString += '\n14天同比:'+ percent +'%\n***每日恐龙简报***';
		    	room.say(sayString);
		    	return;
		    }
		})
	})
	
	req.on('error', function (e) { 
	    console.log('problem with request: ' + e.message);
	}); 
	   
	req.end();
}

// 时间戳转时间
function getDateString(dateTime){
	var dateTime = new Date(dateTime);
	var year = dateTime.getFullYear();
	var month = dateTime.getMonth() + 1;
	if(month < 10){
		month = '0' + month;
	}
	var day = dateTime.getDate();
	if(day < 10){
		day = '0' + day;
	}
	var hour = dateTime.getHours();
	if(hour < 10){
		hour = '0' + hour;
	}
	var minites = dateTime.getMinutes();
	if(minites < 10){
		minites = '0' + minites;
	}
	var seconds = dateTime.getSeconds();
	if(seconds < 10){
		seconds = '0' + seconds;
	}
	var sdate = year + '-' + month + '-' + day + ' 00:00:00';
	var edate = year + '-' + month + '-' + day + ' ' + hour + ':' + minites + ':' + seconds;
	return {
		sdate: sdate,
		edate: edate
	};
}

module.exports = {coreRoomDeal};