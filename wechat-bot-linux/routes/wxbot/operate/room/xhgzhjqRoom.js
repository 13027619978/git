var wechat = require('../mybot.js');
const https = require('https');
const host = "iot.smart-ideas.com.cn";

async function xhgzhjqRoomDeal(msg){
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
			room.say("鲜花港机器人使用方法:\n----------\n1)车辆号xxxxxx按时间退款\n2)手机号xxxxxxxxxxx按时间退款\n3)车辆号xxxxxx全额退款\n4)手机号xxxxxxxxxxx全额退款\n5)车辆号xxxxxx报修原因xxxxxxx\n6)车辆号xxxxxx启动\n7)车辆号xxxxxx开锁\n8)车辆号xxxxxx通电\n9)车辆号xxxxxx断电\n----------", contact)
		}
		
		// 车辆号按时间退款
		if(content.indexOf('车辆号') != -1 && content.indexOf('按时间退款') != -1){
			var bikeNumber = content.split('车辆号')[1].split('按时间退款')[0];
			if(bikeNumber.length != 6 || !isNumber(bikeNumber)){
				room.say("格式错误！\n正确格式:\n车辆号xxxxxx按时间退款");
			}else{
				const options = {
					hostname: host,
					path: '/iotsmart/deviceRobot/refund?number=' + bikeNumber + '&flag=1&status=1',
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
		
		// 手机号按时间退款
		if(content.indexOf('手机号') != -1 && content.indexOf('按时间退款') != -1){
			var bikeNumber = content.split('手机号')[1].split('按时间退款')[0];
			if(bikeNumber.length != 11 || !isNumber(bikeNumber)){
				room.say("格式错误！\n正确格式:\n手机号xxxxxxxxx按时间退款");
			}else{
				const options = {
					hostname: host,
					path: '/iotsmart/deviceRobot/refund?number=' + bikeNumber + '&flag=2&status=1',
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
			if(bikeNumber.length != 6 || !isNumber(bikeNumber)){
				room.say("格式错误！\n正确格式:\n车辆号xxxxxx全额退款");
			}else{
				const options = {
					hostname: host,
					path: '/iotsmart/deviceRobot/refund?number=' + bikeNumber + '&flag=1&status=2',
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
			if(bikeNumber.length != 11 || !isNumber(bikeNumber)){
				room.say("格式错误！\n正确格式:\n手机号xxxxxx全额退款");
			}else{
				const options = {
					hostname: host,
					path: '/iotsmart/deviceRobot/refund?number=' + bikeNumber + '&flag=2&status=2',
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
		
		// 鲜花港手机号xxxxxxxxxxxx退款xxx
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
					path: '/iotsmart/deviceRobot/refund?number=' + phoneNumber + '&flag=2&status=3&refundMoney=' + money,
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
		
		//车辆号报修原因
		if(content.indexOf('车辆号') != -1 && content.indexOf('报修原因') != -1){
			var bikeNumber = content.split('车辆号')[1].split('报修原因')[0];
			var reason = content.split('报修原因')[1];
			if(bikeNumber.length != 6 || !isNumber(bikeNumber)){
				room.say("格式错误！\n正确格式:\n车辆号xxxxxx报修原因xxxxxxx");
			}else{
				const options = {
					hostname: host,
					path: '/iotsmart/deviceRobot/repairOrEnable?number=' + bikeNumber + '&status=1&mark=' + reason,
					method: 'GET'
				};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    console.log(res);
				    if(res.code == "SUCCESS"){
				    	room.say('\n车辆号：'+ bikeNumber + '\n报修原因：'+ reason +'\n报修成功' );
				    }else{
				    	room.say("\n报修失败!\n车辆号："+ bikeNumber +"\n" + res.msg);
				    }
				  });
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
				
			}
		}
		
		//车辆号启动
		if(content.indexOf('车辆号') != -1 && content.indexOf('启动') != -1){
			var bikeNumber = content.split('车辆号')[1].split('启动')[0];
			if(bikeNumber.length != 6 || !isNumber(bikeNumber)){
				room.say("格式错误！\n正确格式:\n车辆号xxxxxx启动");
			}else{
				const options = {
					hostname: host,
					path: '/iotsmart/deviceRobot/repairOrEnable?number=' + bikeNumber + '&status=2',
					method: 'GET'
				};
				
				const req = https.request(options, (res) => {
				  res.on('data', (d) => {
				    var res = JSON.parse(d.toString());
				    console.log(res);
				    if(res.code == "SUCCESS"){
				    	room.say('\n车辆号：'+ bikeNumber + '\n启动成功' );
				    }else{
				    	room.say("\n启动失败!\n车辆号："+ bikeNumber +"\n" + res.msg);
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
			if(bikeNumber.length != 9 && bikeNumber.length != 6){
				room.say("格式错误！\n正确格式:\n车辆号xxxxxx开锁");
			}else{
				const options = {
					hostname: host,
					path: '/iotsmart/commond/sendSimCommandByQrcode',
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
			var bikeNumber = content.split('车辆号')[1].split('通电')[0];
			if(bikeNumber.length != 6 || !isNumber(bikeNumber)){
				room.say("格式错误！\n正确格式:\n车辆号xxxxxx通电");
			}else{
				const options = {
					hostname: host,
					path: '/iotsmart/commond/sendSimCommandByQrcode',
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
			var bikeNumber = content.split('车辆号')[1].split('断电')[0];
			if(bikeNumber.length != 6 || !isNumber(bikeNumber)){
				room.say("格式错误！\n正确格式:\n车辆号xxxxxx断电");
			}else{
				const options = {
					hostname: host,
					path: '/iotsmart/commond/sendSimCommandByQrcode',
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


module.exports = {xhgzhjqRoomDeal};