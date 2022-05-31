var wechat = require('../mybot.js');
const https = require('https');
const host = "api.joybike.com.cn";

/********************/
/***** 园博园群代码 *******/
/********************/
async function ybyRoomDeal(msg){
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
		// 园博园代码
		if(content == '使用方法'){
			const roomTopic = await room.topic();
			if(roomTopic == '汉石桥湿地公园智能化运营群'){
				room.say("机器人使用方法:\n----------\n1)车辆号xxxxxxxxx按时间退款\n2)车辆号xxxxxxxxx全额退款\n3)手机号xxxxxxxxxxx按时间退款\n4)手机号xxxxxxxxxxx全额退款\n5)车辆号xxxxxxxxx查手机\n6)车辆号xxxxxxxxx开锁\n7)车辆号xxxxxxxxx通电\n8)车辆号xxxxxxxxx断电\n9)手机号xxxxxxxxx查车辆号\n10)手机号xxxxxxxxxxx退款xxx\n11)车辆号xxxxxxxxx启用\n12)车辆号xxxxxxxxx报修\n----------")
			}else{
				room.say("机器人使用方法:\n----------\n1)车辆号xxxxxxxxx按时间退款\n2)车辆号xxxxxxxxx全额退款\n3)手机号xxxxxxxxxxx按时间退款\n4)手机号xxxxxxxxxxx全额退款\n5)车辆号xxxxxxxxx查手机\n6)车辆号xxxxxxxxx开锁\n7)手机号xxxxxxxxx查车辆号\n8)手机号xxxxxxxxxxx退款xxx\n9)车辆号xxxxxxxxx启用\n10)车辆号xxxxxxxxx报修\n----------")
			}
			
		}
		// 车辆编号按时间退款
		if(content.indexOf('车辆号') != -1 && content.indexOf('按时间退款') != -1){
			var bikeNumber = content.split('车辆号')[1].split('按时间退款')[0];
			if(bikeNumber.length == 9 || bikeNumber.length == 6){
				const options = {
					hostname: host,
					path: '/ccsmart/robotbikerefund/app/refundByTime',
					method: 'POST',
					headers: {
					  	'Content-Type': 'application/json'
				  	}
				};
				
				var data = {sn: bikeNumber};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    console.log(res);
				    if(res.success){
				    	var consume = res.rows.consume;
				    	if(!consume){
				    		consume = 0;
				    	}
				    	room.say("退款成功：\n车辆号:"+ bikeNumber + "\n收费:" + consume + '\n退款:' + res.rows.refund);
				    }else{
				    	room.say("退款失败：\n车辆号："+ bikeNumber +"无可退订单");
				    }
				  });
				});
				
				req.write(JSON.stringify(data));
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				req.end();
			}else{
				room.say("格式错误！\n正确格式:\n车辆号xxxxxxxxx按时间退款");
			}
		}
		
		// 手机号按时间退款
		if(content.indexOf('手机号') != -1 && content.indexOf('按时间退款') != -1){
			var phoneNumber = content.split('手机号')[1].split('按时间退款')[0];
			if(phoneNumber.length != 11){
				room.say("格式错误！\n正确格式:\n手机号xxxxxxxxxxx按时间退款");
			}else{
				const options = {
					hostname: host,
					path: '/ccsmart/robotbikerefund/app/refundByTime',
					method: 'POST',
					headers: {
					  	'Content-Type': 'application/json'
				  	}
				};
				
				var data = {phone: phoneNumber};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    if(res.success){
				    	var consume = res.rows.consume;
				    	if(!consume){
				    		consume = 0;
				    	}
				    	room.say("退款成功：\n手机号:"+ phoneNumber + "\n收费:" + consume + '\n退款:' + res.rows.refund);
				    }else{
				    	room.say("退款失败：\n手机号："+ phoneNumber +"无可退订单");
				    }
				  });
				});
				
				req.write(JSON.stringify(data));
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}
		}
		
		// 车辆编号全额退款
		if(content.indexOf('车辆号') != -1 && content.indexOf('全额退款') != -1){
			var bikeNumber = content.split('车辆号')[1].split('全额退款')[0];
			if(bikeNumber.length == 9 || bikeNumber.length == 6){
				const options = {
					hostname: host,
					path: '/ccsmart/robotbikerefund/app/refundAll',
					method: 'POST',
					headers: {
					  	'Content-Type': 'application/json'
				  	}
				};
				
				var data = {sn: bikeNumber};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    console.log(res);
				    if(res.success){
				    	var consume = res.rows.consume;
				    	if(!consume){
				    		consume = 0;
				    	}
				    	room.say("退款成功：\n车辆号:"+ bikeNumber + "\n收费:" + consume + '\n退款:' + res.rows.refund);
				    }else{
				    	room.say("退款失败：\n车辆号："+ bikeNumber +"无可退订单");
				    }
				  });
				});
				
				req.write(JSON.stringify(data));
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}else{
				room.say("格式错误！\n正确格式:\n车辆号xxxxxxxxx全额退款");
			}
		}
		
		// 手机号全额退款
		if(content.indexOf('手机号') != -1 && content.indexOf('全额退款') != -1){
			var phoneNumber = content.split('手机号')[1].split('全额退款')[0];
			if(phoneNumber.length != 11){
				room.say("格式错误！\n正确格式:\n手机号xxxxxxxxxxx全额退款");
			}else{
				const options = {
					hostname: host,
					path: '/ccsmart/robotbikerefund/app/refundAll',
					method: 'POST',
					headers: {
					  	'Content-Type': 'application/json'
				  	}
				};
				
				var data = {phone: phoneNumber};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    if(res.success){
				    	var consume = res.rows.consume;
				    	if(!consume){
				    		consume = 0;
				    	}
				    	room.say("退款成功：\n手机号:"+ phoneNumber + "\n收费:" + consume + '\n退款:' + res.rows.refund);
				    }else{
				    	room.say("退款失败：\n手机号："+ phoneNumber +"无可退订单");
				    }
				  });
				});
				
				req.write(JSON.stringify(data));
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}
		}
		
		// 车辆编号查手机号
		if(content.indexOf('车辆号') != -1 && content.indexOf('查手机') != -1){
			var bikeNumber = content.split('车辆号')[1].split('查手机')[0];
			if(bikeNumber.length == 9 || bikeNumber.length == 6){
				const options = {
					hostname: host,
					path: '/ccsmart/robotbikerefund/app/findPhone',
					method: 'POST',
					headers: {
					  	'Content-Type': 'application/json'
				  	}
				};
				
				var data = {sn: bikeNumber};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    if(res.rows){
				    	room.say("查询成功：\n车辆号:"+ bikeNumber +"\n最后订单手机号:" + res.rows);
				    }else{
				    	room.say("查询成功：\n车辆号"+ bikeNumber +"今天没有订单");
				    }
				  });
				});
				
				req.write(JSON.stringify(data));
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}else{
				room.say("格式错误！\n正确格式:\n车辆号xxx查手机");
			}
		}
		
		// 车辆号xxxxxxxxx报修
		if(content.indexOf('车辆号') != -1 && content.indexOf('报修') != -1){
			var bikeNumber = content.split('车辆号')[1].split('报修')[0];
			if(bikeNumber.length == 9 || bikeNumber.length == 6){
				const options = {
					hostname: host,
					path: '/ccsmart/bikeRobot/updateBikeStatus?bikeSn=' + bikeNumber + '&status=2',
					method: 'GET'
				};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    if(res.success){
				    	room.say('\n车辆号：'+ bikeNumber + '\n报修成功');
				    }else{
				    	room.say("\n报修失败!\n车辆号："+ bikeNumber +"\n" + res.msg);
				    }
				  });
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}else{
				room.say("格式错误！\n正确格式:\n车辆号xxx查手机");
			}
		}
		
		// 车辆号xxxxxxxxx启用
		if(content.indexOf('车辆号') != -1 && content.indexOf('启用') != -1){
			var bikeNumber = content.split('车辆号')[1].split('启用')[0];
			if(bikeNumber.length == 9 || bikeNumber.length == 6){
				const options = {
					hostname: host,
					path: '/ccsmart/bikeRobot/updateBikeStatus?bikeSn=' + bikeNumber + '&status=0',
					method: 'GET'
				};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    if(res.success){
				    	room.say('\n车辆号：'+ bikeNumber + '\n启用成功');
				    }else{
				    	room.say("\n启用失败!\n车辆号："+ bikeNumber +"\n" + res.msg);
				    }
				  });
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}else{
				room.say("格式错误！\n正确格式:\n车辆号xxx查手机");
			}
		}
		
		// 车辆号xxxxxxxxx开锁
		if(content.indexOf('车辆号') != -1 && content.indexOf('开锁') != -1){
			var bikeNumber = content.split('车辆号')[1].split('开锁')[0];
			// const roomTopic = await room.topic();
			// if(roomTopic == '汉石桥湿地公园智能化运营群'){
			// 	if(bikeNumber.substring(0,2) == '88'){
			// 		room.say('电瓶车停运中!');
			// 		return;
			// 	}
			// }
			if(bikeNumber.length == 9 || bikeNumber.length == 6){
				const options = {
					hostname: host,
					path: '/ccsmart/bikeRobot/sendCMD?bikeSn=' + bikeNumber + '&type=1',
					method: 'GET'
				};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    if(res.success){
				    	room.say('\n车辆号：'+ bikeNumber + '\n发送开锁指令成功！');
				    }else{
				    	room.say("\n开锁指令发送失败!\n车辆号："+ bikeNumber +"\n" + res.msg);
				    }
				  });
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}else{
				room.say("格式错误！\n正确格式:\n车辆号xxxxxxxxx开锁");
			}
		}
		
		// 车辆号xxxxxxxxx断电
		if(content.indexOf('车辆号') != -1 && content.indexOf('断电') != -1){
			// const roomTopic = await room.topic();
			// if(roomTopic == '汉石桥湿地公园智能化运营群'){
			// 	room.say('电瓶车停运中！');
			// 	return;
			// }
			var bikeNumber = content.split('车辆号')[1].split('断电')[0];
			console.log(bikeNumber);
			if(bikeNumber.length == 9 || bikeNumber.length == 6){
				const options = {
					hostname: host,
					path: '/ccsmart/bikeRobot/sendCMD?bikeSn=' + bikeNumber + '&type=2',
					method: 'GET'
				};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    if(res.success){
				    	room.say('\n车辆号：'+ bikeNumber + '\n发送断电指令成功！');
				    }else{
				    	room.say("\n断电指令发送失败!\n车辆号："+ bikeNumber +"\n" + res.msg);
				    }
				  });
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}else{
				room.say("格式错误！\n正确格式:\n车辆号xxxxxxxxx断电");
			}
		}
		
		// 车辆号xxxxxxxxx通电
		if(content.indexOf('车辆号') != -1 && content.indexOf('通电') != -1){
			// const roomTopic = await room.topic();
			// if(roomTopic == '汉石桥湿地公园智能化运营群'){
			// 	room.say('电瓶车停运中！');
			// 	return;
			// }
			var bikeNumber = content.split('车辆号')[1].split('通电')[0];
			
			if(bikeNumber.length == 9 || bikeNumber.length == 6){
				const options = {
					hostname: host,
					path: '/ccsmart/bikeRobot/sendCMD?bikeSn=' + bikeNumber + '&type=1',
					method: 'GET'
				};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    if(res.success){
				    	room.say('\n车辆号：'+ bikeNumber + '\n发送通电指令成功！');
				    }else{
				    	room.say("\n通电指令发送失败!\n车辆号："+ bikeNumber +"\n" + res.msg);
				    }
				  });
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}else{
				room.say("格式错误！\n正确格式:\n车辆号xxxxxxxxx通电");
			}
		}
		
		// 手机号xxxxxxxxxxx退款xxx
		if(content.indexOf('手机号') != -1 && content.indexOf('退款') != -1 && content.indexOf('按时间') == -1 && content.indexOf('全额') == -1){
			var phoneNumber = content.split('手机号')[1].split('退款')[0];
			var money = content.split('退款')[1];
			if(!isNumber(phoneNumber) || !isNumber(money)){
				room.say("格式错误！\n正确格式:\n手机号xxxxxxxxxxx退款xxx");
				return;
			}
			
			if(phoneNumber.length == 11){
				const options = {
					hostname: host,
					path: '/ccsmart/robotbikerefund/app/refundMoney',
					method: 'POST',
					headers: {
					  	'Content-Type': 'application/json'
				  	}
				};
				
				var data = {phone: phoneNumber, refundMoney: money};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    console.log(res);
				    if(res.success){
				    	room.say("手机号："+ phoneNumber +"退款成功！");
				    }else{
				    	room.say("手机号"+ phoneNumber +"退款失败！\n" + res.msg);
				    }
				  });
				});
				
				req.write(JSON.stringify(data));
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}else{
				room.say("格式错误！\n正确格式:\n手机号xxxxxxxxxxx退款xxx");
			}
			
		}
		
		// 手机号xxxxxxxxxxx查车辆号
		if(content.indexOf('手机号') != -1 && content.indexOf('查车辆号') != -1){
			var phoneNumber = content.split('手机号')[1].split('查车辆号')[0];
			if(isNumber(phoneNumber) && phoneNumber.length == 11){
				const options = {
					hostname: host,
					path: '/ccsmart/robotbikerefund/app/findSn',
					method: 'POST',
					headers: {
					  	'Content-Type': 'application/json'
				  	}
				};
				
				var data = {phone: phoneNumber};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    console.log(res);
				    if(res.success){
				    	room.say("查询成功：\n手机号:"+ phoneNumber +"\n最后订单车辆号:" + res.rows.bikeSn);
				    }else{
				    	room.say("查询成功：\n手机号"+ phoneNumber + res.msg);
				    }
				  });
				});
				
				req.write(JSON.stringify(data));
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}else{
				room.say("手机号格式错误！");
			}
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


module.exports = {ybyRoomDeal};
