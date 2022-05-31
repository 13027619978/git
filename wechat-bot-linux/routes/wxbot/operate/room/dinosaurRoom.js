var wechat = require('../mybot.js');
const https = require('https');
const host = 'api.joybike.com.cn';
const fs = require('fs');

/********************/
/***** 恐龙群代码 *******/
/********************/
						
async function dinosaurRoomDeal(msg){
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
			room.say('机器人使用方法:\n----------\n1)手机号xxx开xxx');
		}
		
		// 手机号xxx开xxx
		if(content.indexOf('手机号') != -1 && content.indexOf('开') != -1){
			let phone = content.split('手机号')[1].split('开')[0];
			let bikeSn = content.split('开')[1];
			if(isNumber(phone) && isNumber(bikeSn)){
				const options = {
					hostname: host,
					path: '/ccsmart/bikeRobot/sendCMD?bikeSn=' + bikeSn + '&type=1',
					method: 'GET'
				};
				
				const req = https.request(options, (res) => {
				    res.on('data', (d) => {
						var res = JSON.parse(d.toString());
						if(res.success){
							room.say('\n车辆号：'+ bikeSn + '\n发送开锁指令成功！', contact);
						}else{
							room.say("\n开锁指令发送失败!\n车辆号："+ bikeSn +"\n" + res.msg, contact);
						}
				    });
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
			}
		}
	
		// 手机号xxx车辆号xxx优惠券xxx开锁
		// if(content.indexOf('手机号') != -1 && content.indexOf('优惠券') != -1 && content.indexOf('车辆号') != -1 &&  content.indexOf('开锁') != -1){
		// 	let phone = content.split('手机号')[1].split('车辆号')[0];
		// 	let bikeSn = content.split('车辆号')[1].split('优惠券')[0];
		// 	let coupons = content.split('优惠券')[1].split('开锁')[0];
		// 	if(isNumber(phone) && isNumber(bikeSn) && isNumber(coupons)){
		// 		if(coupons.length == 6 && 0 < parseInt(coupons) && parseInt(coupons) <= 999999){
					
		// 		}else{
		// 			room.say('\n优惠券格式不正确！', contact);
		// 			return;
		// 		}
		// 		let path = require('path');
		// 		fs.readFile(path.resolve(__dirname, './card.json'), 'utf8', function(err, data){
		// 			if(err){
		// 	            return console.error(err);
		// 	       }
		// 			var jsonData = data.toString();
		// 			jsonData = JSON.parse(jsonData);
		// 			var usedData = jsonData.usedId;
		// 			if(usedData.indexOf(coupons) == -1){
		// 				if(phone.length == 11){
		// 					const options = {
		// 						hostname: host,
		// 						path: '/ccsmart/robotbikerefund/app/findSn',
		// 						method: 'POST',
		// 						headers: {
		// 						  	'Content-Type': 'application/json'
		// 					  	}
		// 					};
							
		// 					var data = {phone: phone};
							
		// 					const req = https.request(options, (res) => {
		// 						res.on('data', (d) => {
		// 						    var res = JSON.parse(d.toString());
		// 						    if(res.success){
		// 						    	var orderDate = new Date(res.rows.createDate * 1000);
		// 						    	var nowDate = new Date();
		// 						    	var orderMonth = orderDate.getMonth();
		// 						    	var nowMonth = nowDate.getMonth();
		// 						    	var orderDay = orderDate.getDate();
		// 						    	var nowDay = nowDate.getDate();
		// 						    	if(orderMonth == nowMonth && orderDay == nowDay){
		// 						    		if(bikeSn.length == 9){
		// 										const options = {
		// 											hostname: host,
		// 											path: '/ccsmart/bikeRobot/sendCMD?bikeSn=' + bikeSn + '&type=1',
		// 											method: 'GET'
		// 										};
												
		// 										const req = https.request(options, (res) => {
		// 										  res.on('data', (d) => {
		// 										    var res = JSON.parse(d.toString());
		// 										    if(res.success){
		// 										    	room.say('\n车辆号：'+ bikeSn + '\n发送开锁指令成功！', contact);
		// 										    	jsonData.usedId.push(coupons);
		// 												jsonData = JSON.stringify(jsonData);
		// 												fs.writeFile(path.resolve(__dirname, './card.json'), jsonData,function(err){
		// 										            if(err){
		// 										                console.error(err);
		// 										            }
		// 										        })
		// 										    }else{
		// 										    	room.say("\n开锁指令发送失败!\n车辆号："+ bikeSn +"\n" + res.msg, contact);
		// 										    }
		// 										  });
		// 										});
												
		// 										req.end();
		// 									}else{
		// 										room.say("\n车辆编号格式错误！", contact);
		// 									}
		// 						    	}else{
		// 						    		room.say("\n手机号："+ phone + "今日无订单。", contact);
		// 						    	}
		// 						    }else{
		// 						    	room.say("\n手机号："+ phone + res.msg, contact);
		// 						    }
		// 						});
		// 					});
							
		// 					req.write(JSON.stringify(data));
							
		// 					req.on('error', (e) => {
		// 					  console.error(`problem with request: ${e.message}`);
		// 					});
							
		// 					req.end();
		// 				}else{
		// 					room.say("\n手机号格式错误！", contact);
		// 				}
		// 			}else{
		// 				room.say('\n此优惠券已使用，请重新输入。', contact);
		// 			}
		// 		})
		// 	}
		// }
		
		// 手机号xxx集赞18开xxx
		// if(content.indexOf('手机号') != -1 && content.indexOf('集赞18开') != -1){
		// 	var bikeSn = content.split('集赞18开')[1];
		// 	var phone = content.split('手机号')[1].split('集赞18开')[0];
		// 	let path = require('path');
		// 	if(phone.length == 11){
		// 		fs.readFile(path.resolve(__dirname, '../jsonData/phone.json'), 'utf8', function(err, data){
		// 			if(err){
		// 	            return console.error(err);
		// 	       	}
		// 			var jsonData = data.toString();
		// 			jsonData = JSON.parse(jsonData);
		// 			var usedPhone = jsonData.usedPhone;
		// 			if(usedPhone.indexOf(phone) != -1){
		// 				room.say('手机号：'+ phone + '\n本季度已使用，请下季度再来！');
		// 				return;
		// 			}
		// 			const options = {
		// 				hostname: host,
		// 				path: '/ccsmart/robotbikerefund/app/findSn',
		// 				method: 'POST',
		// 				headers: {
		// 				  	'Content-Type': 'application/json'
		// 			  	}
		// 			};
					
		// 			var data = {phone: phone};
					
		// 			const req = https.request(options, (res) => {
		// 				res.on('data', (d) => {
		// 				    var res = JSON.parse(d.toString());
		// 				    if(res.success){
		// 				    	var orderDate = new Date(res.rows.createDate * 1000);
		// 				    	var nowDate = new Date();
		// 				    	var orderMonth = orderDate.getMonth();
		// 				    	var nowMonth = nowDate.getMonth();
		// 				    	var orderDay = orderDate.getDate();
		// 				    	var nowDay = nowDate.getDate();
		// 				    	if(orderMonth == nowMonth && orderDay == nowDay){
		// 				    		if(bikeSn.length == 9){
		// 								const options = {
		// 									hostname: host,
		// 									path: '/ccsmart/bikeRobot/sendCMD?bikeSn=' + bikeSn + '&type=1',
		// 									method: 'GET'
		// 								};
										
		// 								const req1 = https.request(options, (res1) => {
		// 								  res.on('data', (d) => {
		// 								    var res1 = JSON.parse(d.toString());
		// 								    if(res1.success){
		// 								    	room.say('\n车辆号：'+ bikeSn + '\n发送开锁指令成功！', contact);
		// 								    	jsonData.usedPhone.push(phone);
		// 										jsonData = JSON.stringify(jsonData);
		// 										fs.writeFile(path.resolve(__dirname, '../jsonData/phone.json'), jsonData,function(err){
		// 								            if(err){
		// 								                console.error(err);
		// 								            }
		// 								        })
		// 								    }else{
		// 								    	room.say("\n开锁指令发送失败!\n车辆号："+ bikeSn +"\n" + res.msg, contact);
		// 								    }
		// 								  });
		// 								});
										
		// 								req1.on('error', (e) => {
		// 								  console.error(`problem with request: ${e.message}`);
		// 								});
										
		// 								req1.end();
		// 							}else{
		// 								room.say("\n车辆编号格式错误！", contact);
		// 							}
		// 				    	}else{
		// 				    		room.say("\n手机号："+ phone + "\n今日无订单，无法参与集18赞开锁活动！", contact);
		// 				    	}
		// 				    }else{
		// 				    	room.say("\n手机号："+ phone + '\n' + res.msg, contact);
		// 				    }
		// 				});
		// 			});
		// 			req.write(JSON.stringify(data));
					
		// 			req.on('error', (e) => {
		// 			  console.error(`problem with request: ${e.message}`);
		// 			});
					
		// 			req.end();
					
		// 		})
		// 	}else{
		// 		room.say('请输入正确的手机号！');
		// 	}
			
		// }
		
		// 手机号xxx集赞48开xxx
		// if(content.indexOf('手机号') != -1 && content.indexOf('集赞48开') != -1){
		// 	var bikeSn = content.split('集赞48开')[1];
		// 	var phone = content.split('手机号')[1].split('集赞48开')[0];
		// 	let path = require('path');
		// 	if(phone.length == 11){
		// 		fs.readFile(path.resolve(__dirname, '../jsonData/phone.json'), 'utf8', function(err, data){
		// 			if(err){
		// 	            return console.error(err);
		// 	       	}
		// 			var jsonData = data.toString();
		// 			jsonData = JSON.parse(jsonData);
		// 			var usedPhone = jsonData.usedPhone;
		// 			if(usedPhone.indexOf(phone) != -1){
		// 				room.say('手机号：'+ phone + '\n本季度已使用，请下季度再来！');
		// 				return;
		// 			}
		// 			if(bikeSn.length == 9){
		// 				const options = {
		// 					hostname: host,
		// 					path: '/ccsmart/bikeRobot/sendCMD?bikeSn=' + bikeSn + '&type=1',
		// 					method: 'GET'
		// 				};
						
		// 				const req = https.request(options, (res) => {
		// 				  res.on('data', (d) => {
		// 				    var res = JSON.parse(d.toString());
		// 				    if(res.success){
		// 				    	room.say('\n车辆号：'+ bikeSn + '\n发送开锁指令成功！', contact);
		// 				    	jsonData.usedPhone.push(phone);
		// 						jsonData = JSON.stringify(jsonData);
		// 						fs.writeFile(path.resolve(__dirname, '../jsonData/phone.json'), jsonData,function(err){
		// 				            if(err){
		// 				                console.error(err);
		// 				            }
			            			
		// 				        })
		// 				    }else{
		// 				    	room.say("\n开锁指令发送失败!\n车辆号："+ bikeSn +"\n" + res.msg, contact);
		// 				    }
		// 				  });
		// 				});
						
		// 				req.on('error', (e) => {
		// 				  console.error(`problem with request: ${e.message}`);
		// 				});
						
		// 				req.end();
		// 			}else{
		// 				room.say("\n车辆编号格式错误！", contact);
		// 			}
		// 		})
		// 	}else{
		// 		room.say('请输入正确的手机号！');
		// 	}
		// }
		
		
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
	if (regPos.test(val) || regNeg.test(val)) {
		return true;
	} else {
		return false;
	}
}

module.exports = {dinosaurRoomDeal}