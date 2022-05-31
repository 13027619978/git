var wechat = require('../mybot.js');
const https = require('https');
const host = "iot.smart-ideas.com.cn";

async function ssgyRoomDeal(msg){
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
			room.say("机器人使用方法:\n----------\n1)车辆号xxxxxx按时间退款\n2)手机号xxxxxxxxxxx按时间退款\n3)车辆号xxxxxx全额退款\n4)手机号xxxxxxxxxxx全额退款\n5)车辆号xxxxxx开锁\n6)车辆号xxxxxx通电\n7)车辆号xxxxxx断电\n8)车辆号xxxxxx查手机号\n10)手机号xxxxxxxxxxxx退款xxx\n----------")
		}
		
		// 车辆号按时间退款
		if(content.indexOf('车辆号') != -1 && content.indexOf('按时间退款') != -1){
			var bikeNumber = content.split('车辆号')[1].split('按时间退款')[0];
			if(bikeNumber.length != 6){
				room.say("格式错误！\n正确格式:\n车辆号xxxxxx按时间退款");
			}else{
				const options = {
					hostname: host,
					path: '/ssgy/deviceRobot/refund?number=' + bikeNumber + '&flag=1&status=1',
					method: 'GET'
				};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    if(res.code == "SUCCESS"){
				    	room.say("\n车辆号："+ bikeNumber +"\n按时间退款成功!");
				    }else{
				    	room.say("退款失败!\n车辆号："+ bikeNumber +"\n" + res.msg);
				    }
				  });
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}
		}
		
		// 水上公园手机号xxxxxxxxxxxx退款xxx
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
					path: '/ssgy/deviceRobot/refund?number=' + phoneNumber + '&flag=2&status=3&refundMoney=' + money,
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
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}else{
				room.say("格式错误！\n正确格式:\n手机号xxxxxxxxxxx退款xxx");
			}
		}
		
		// 手机号按时间退款
		if(content.indexOf('手机号') != -1 && content.indexOf('按时间退款') != -1){
			var bikeNumber = content.split('手机号')[1].split('按时间退款')[0];
			if(bikeNumber.length != 11){
				room.say("格式错误！\n正确格式:\n手机号xxxxxxxxx按时间退款");
			}else{
				const options = {
					hostname: host,
					path: '/ssgy/deviceRobot/refund?number=' + bikeNumber + '&flag=2&status=1',
					method: 'GET'
				};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    if(res.code == "SUCCESS"){
				    	room.say("\n手机号："+ bikeNumber +"\n按时间退款成功!");
				    }else{
				    	room.say("退款失败!\n手机号："+ bikeNumber +"\n" + res.msg);
				    }
				  });
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}
		}
		
		// 车辆号全额退款
		if(content.indexOf('车辆号') != -1 && content.indexOf('全额退款') != -1){
			var bikeNumber = content.split('车辆号')[1].split('全额退款')[0];
			if(bikeNumber.length != 6){
				room.say("格式错误！\n正确格式:\n车辆号xxxxxx全额退款");
			}else{
				const options = {
					hostname: host,
					path: '/ssgy/deviceRobot/refund?number=' + bikeNumber + '&flag=1&status=2',
					method: 'GET'
				};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    if(res.code == "SUCCESS"){
				    	room.say("\n车辆号："+ bikeNumber +"\n全额退款成功！");
				    }else{
				    	room.say("退款失败!\n车辆号："+ bikeNumber +"\n" + res.msg);
				    }
				  });
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
				
			}
		}
		
		// 手机号全额退款
		if(content.indexOf('手机号') != -1 && content.indexOf('全额退款') != -1){
			var bikeNumber = content.split('手机号')[1].split('全额退款')[0];
			if(bikeNumber.length != 11){
				room.say("格式错误！\n正确格式:\n手机号xxxxxx全额退款");
			}else{
				const options = {
					hostname: host,
					path: '/ssgy/deviceRobot/refund?number=' + bikeNumber + '&flag=2&status=2',
					method: 'GET'
				};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    if(res.code == "SUCCESS"){
				    	room.say("\n手机号："+ bikeNumber +"\n全额退款成功！");
				    }else{
				    	room.say("退款失败!\n手机号："+ bikeNumber +"\n" + res.msg);
				    }
				  });
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}
		}

		
		if(content.indexOf('车辆号') != -1 && content.indexOf('开锁') != -1){
			var bikeNumber = content.split('车辆号')[1].split('开锁')[0];
//			if(bikeNumber.substring(0,3) == '192'){
//				room.say('电瓶车停运中!');
//				return;
//			}
			if(bikeNumber.length != 9 && bikeNumber.length != 6){
				room.say("格式错误！\n正确格式:\n车辆号xxxxxx开锁");
			}else{
				const options = {
					hostname: host,
					path: '/ssgy/commond/sendSimCommandByQrcode',
					method: 'POST',
					headers: {
					  	'Content-Type': 'application/json'
				  	}
				};
				
				var data = {deviceSn: bikeNumber, flag: 2};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    console.log(res);
				    if(res.code == "SUCCESS"){
				    	room.say("\n车辆编号：" + bikeNumber + '\n发送开锁指令成功！');
				    }else{
				    	room.say("\n车辆编号：" + bikeNumber + res.msg);
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
		
		if(content.indexOf('车辆号') != -1 && content.indexOf('通电') != -1){
//			room.say('电瓶车停运中!');
//			return;
			
			var bikeNumber = content.split('车辆号')[1].split('通电')[0];
			if(bikeNumber.length != 6){
				room.say("格式错误！\n正确格式:\n车辆号xxxxxx通电");
			}else{
				const options = {
					hostname: host,
					path: '/ssgy/commond/sendSimCommandByQrcode',
					method: 'POST',
					headers: {
					  	'Content-Type': 'application/json'
				  	}
				};
				
				var data = {deviceSn: bikeNumber, flag: 2};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    console.log(res);
				    if(res.code == "SUCCESS"){
				    	room.say("\n车辆编号：" + bikeNumber + '\n发送通电指令成功！');
				    }else{
				    	room.say("\n车辆编号：" + bikeNumber + res.msg);
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
		
		if(content.indexOf('车辆号') != -1 && content.indexOf('断电') != -1){
//			room.say('电瓶车停运中!');
//			return;
			
			var bikeNumber = content.split('车辆号')[1].split('断电')[0];
			if(bikeNumber.length != 6){
				room.say("格式错误！\n正确格式:\n车辆号xxxxxx断电");
			}else{
				const options = {
					hostname: host,
					path: '/ssgy/commond/sendSimCommandByQrcode',
					method: 'POST',
					headers: {
					  	'Content-Type': 'application/json'
				  	}
				};
				
				var data = {deviceSn: bikeNumber, flag: 7};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    console.log(res);
				    if(res.code == "SUCCESS"){
				    	room.say("\n车辆编号：" + bikeNumber + '\n发送断电指令成功！');
				    }else{
				    	room.say("\n车辆编号：" + bikeNumber + res.msg);
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
		
		if(content.indexOf('车辆号') != -1 && content.indexOf('查手机号') != -1){
			var bikeNumber = content.split('车辆号')[1].split('查手机号')[0];
			if(bikeNumber.length != 6){
				room.say("格式错误！\n正确格式:\n车辆号xxxxxx查手机号");
			}else{
				const options = {
					hostname: host,
					path: '/ssgy/deviceRobot/getLastWxUserPhoneByDeviceSn?deviceSn=' + bikeNumber,
					method: 'GET'
				};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    console.log(res);
				    if(res.code == "SUCCESS"){
				    	if(res.data){
				    		room.say("查询成功：\n车辆号:"+ bikeNumber +"\n最后订单手机号:" + res.data);
				    	}else{
				    		room.say("查询成功：\n车辆号"+ bikeNumber +"今天没有订单");
				    	}
				    }else{
				    	room.say("\n车辆编号：" + bikeNumber + '查询失败！');
				    }
				  });
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}
		}
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

module.exports = {ssgyRoomDeal};