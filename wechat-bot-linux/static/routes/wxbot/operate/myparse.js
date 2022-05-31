var wechat = require('./mybot.js');
var http = require('./myhttp.js')
var fs = require('fs-extra')
var events = require('events')
var qr = require('qr-image');
const {FileBox} = require('file-box');
var eventEmitter = new events.EventEmitter()

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

async function onStart(room,contact,content,msgValid){
	console.log('onStart')
	eventEmitter.emit('roomSync',room,contact,content,msgValid)
}

//功能：群同步  
//信息关键字： “同步”
//回复：@发信人 “好的，已经同步！”
async function onRoomSync(room,contact,content,msgValid){
	console.log('onRoomSync')
	var valid = false 
	if(content.indexOf('同步') != -1){
		await room.sync()
		await room.say('好的，已经同步！',contact)
		valid = true
	}
	if(content.indexOf('发个表情') != -1){
		await room.say('[强]',contact)
		valid = true
	}	
	valid = valid || msgValid
	eventEmitter.emit('askOnLine',room,contact,content,valid)
}

//功能：询问机器人是否在线  
//信息关键字： “在吗”、“在？”、“在不”、“在么”
//回复：@发信人 “在呢！有什么可以帮助您？”
async function onAskOnLine(room,contact,content,msgValid){
	console.log('onAskOnLine')
	var valid = false 
	if(content.indexOf('在吗') != -1 || content.indexOf('在？') != -1 || content.indexOf('在不') != -1 || content.indexOf('在么') != -1){
		await room.say('在呢！有什么可以帮助您？',contact)
		valid = true
	}
	valid = valid || msgValid
	eventEmitter.emit('askBotName',room,contact,content,valid)
}

//功能：询问机器人叫什么  
//信息关键字： “你叫什么”、“你是谁”、“你是？”
//回复：@发信人 “你就叫我“机器人”吧！”
async function onAskBotName(room,contact,content,msgValid){
	console.log('onAskBotName')
	var valid = false 
	if(content.indexOf('你叫什么') != -1 || content.indexOf('你是谁') != -1 || content.indexOf('你是？') != -1){
		await room.say('你就叫我“机器人”吧！',contact)
		valid = true
	}
	valid = valid || msgValid
	eventEmitter.emit('query',room,contact,content,valid)
}

//功能：查询  
//信息关键字： “查询”
//回复：@发信人 “XX结果XX”
async function onQuery(room,contact,content,msgValid){
	console.log('onQuery')
	var valid = false 
	if(content.indexOf('查询') != -1){
		if(content.indexOf('车辆状态查询') != -1){
			var sn = content.replace(/[^0-9]/ig,"")
			if(sn.toString().length != 9){
				await room.say('车辆sn长度不等于9',contact)
			}else{
				var getUrl='https://test.joybike.com.cn/ccsmart/bikeOrder/web/getOtherByBikeSn'
				var getData={bikeSn:sn}
				var ret = await http.myHttpGet(getUrl,getData)
				if(ret){
					console.log(ret)
					var jsonRet = JSON.parse(ret)
					if(jsonRet.rows){
						var retStatus
						if(jsonRet.rows.status == 1){
							retStatus = '使用中'
						}else{
							retStatus = '空闲'
						}
						var str = `\r\n用户电话:${jsonRet.rows.phone}\r\n订单时间:${jsonRet.rows.date.split('.')[0]}\r\n当前状态:${retStatus}`
						await room.say(str,contact)
					}else{
						await room.say('车辆 '+sn+' 无订单信息',contact)
					}

				}						
			}
		}else{
			await room.say('您要查询什么？',contact)
		}
		valid = true
	}
	valid = valid || msgValid
	eventEmitter.emit('removeRoom',room,contact,content,valid)
}

//功能：要求机器人把自己移除群  
//信息关键字： “把我移出群”、“把我移除群”、“将我移除群”、“将我移出群”
//回复：@发信人 “好的，成全你！”
async function onRemoveRoom(room,contact,content,msgValid){
	console.log('onRemoveRoom')
	var valid = false 
	if(content.indexOf('把我移出群') != -1 || content.indexOf('把我移除群') != -1||content.indexOf('将我移除群') != -1||content.indexOf('将我移出群') != -1){
		await room.say('好的，成全你！',contact)
		try{
			await room.del(contact)
		}catch(e){
			console.log(e)
			await room.say('哎呀！我没有权限呀！哈哈！！',contact)
		}
		
		valid = true
	}	
	valid = valid || msgValid
	eventEmitter.emit('readFile',room,contact,content,valid)
}

//功能：读文件 
//信息关键字： “读文件”
//回复：“XXX”
async function onReadFile(room,contact,content,msgValid){
	console.log('onReadFile')
	var valid = false 
	if(content.indexOf('读文件') != -1){
		var filePath = process.cwd() + '/log/123.txt'
		var data = await fs.readFile(filePath, 'utf8')
		var list = data.toString().split("\r\n");
		for (var i = 0; i < list.length; i++) {
			console.log(list[i])
			await room.say(list[i])
			await sleep(1000)
		}
		valid = true
	}	
	valid = valid || msgValid
	eventEmitter.emit('genQrcode',room,contact,content,valid)
}

async function onGenQrcode(room,contact,content,msgValid){
	console.log('onGenQrcode')
	var valid = false 
	if(content.indexOf('二维码') != -1){
		var qrcodeInfos = content.match(/\[[^\]]+\]/g);
		if(qrcodeInfos.length == 0){
			await room.say('对不起，我没有找到二维码信息！',contact);
		}else if(qrcodeInfos.length == 1){
			var qrcodeStr = qrcodeInfos[0].replace('[','').replace(']','');
			var img = qr.image(qrcodeStr, { type: 'png', size:5, margin:1 });
			var fileBox1 = FileBox.fromStream(img,'123456.png');
			await room.say(fileBox1);

		}else{
			await room.say('对不起，二维码信息格式有问题！',contact);
		}
		valid = true
	}	
	valid = valid || msgValid
	eventEmitter.emit('end',room,contact,content,valid)
}



async function onEnd(room,contact,content,msgValid){
	console.log('onEnd')
	if(msgValid == false){
		await room.say('对不起！我听不懂您在说什么！',contact)
	}
}

const schoolRoomMemberName = {
	SCHOOL_ROOM_TEACHER : '张老师',
	SCHOOL_ROOM_BOT : '客服'
};
var roomMemberMap = {};
var lastMsg = null;

function checkFinish(map){
	var ret = 1;
	for(var data in map){
	    if(map.hasOwnProperty(data)){
	        //console.log('key is ' + data +' and value is' + map[data]);
	        ret = ret & map[data];
	    }
	}
	return ret;
}

function getNotSign(map){
	ret = [];
	for(var data in map){
	    if(map.hasOwnProperty(data)){
	        //console.log('key is ' + data +' and value is' + map[data]);
	        if(map[data] == 0){
	        	ret.push(data);
	        }
	    }
	}
	return ret;	
}

function checkMsgNumber(msgStr){
    var retMsgStr;
    var re1 = /\d+\..+家长收到/g;
    var re2 = /\d+/g;
    var buffer = msgStr.match(re1);
    console.log(buffer);
    for(var i = 0; i < buffer.length; i++){
        var num = parseInt(buffer[i]);
        if(num != i+1){
            var replaceStr = buffer[i].replace(re2,i+1);
            msgStr = msgStr.replace(buffer[i],replaceStr);
            retMsgStr = msgStr;
        }
    }
    return retMsgStr;
}

function getMsgNumbers(msgStr){
    var nums = 0;
    var re1 = /\d+\..+家长收到/g;
    if(msgStr){
        var buffer = msgStr.match(re1);
        if(buffer){
            nums = buffer.length;
        }        
    }
    return nums;
}

function insertMsgNumber(lastMsg,preMsg){
    var retStr = null;
    var re1 = /\d+\..+家长收到/g;
    var buffer = preMsg.match(re1);
    var nums = buffer.length;
    if(nums > 0){
        retStr = lastMsg + '\n' + buffer[nums-1];
        retStr = checkMsgNumber(retStr);
    }
    return retStr;
}

async function onSchoolRoom(msg){
	const content = msg.text();
	const contact = msg.from();
	const room = msg.room();
	const fromRoomAlias = await room.alias(contact);	//获取群昵称
	var fromName;

	if(fromRoomAlias){
		fromName = fromRoomAlias;
	}else{
		fromName = contact.name();
	}

	console.log(`Message from name:${contact.name()},alias:${fromRoomAlias}`);

	if(msg.type() == wechat.bot.Message.Type.Text){
		console.log('~~~~~~~~~~文本消息~~~~~~~~~');
		console.log('text='+content);
		if (await msg.mentionSelf()) {
			console.log('fromName='+fromName);
			if(fromName == schoolRoomMemberName.SCHOOL_ROOM_TEACHER){
				if(content.indexOf('在吗') != -1){
					await room.say('在的，老师有什么指示？',contact);
				}else if(content.indexOf('谁没回复') != -1 || content.indexOf('谁没收到') != -1){
					const nums = Object.getOwnPropertyNames(roomMemberMap).length;
					if(nums > 0){
						if(checkFinish(roomMemberMap) == 1){
							await room.say(`汇报老师，一共${nums}名学生家长，已经全部收到。`,contact);
						}else{
							const notSignNames = getNotSign(roomMemberMap);
							await room.say(`汇报老师，一共${nums}名学生家长，还差${notSignNames.length}名学生家长没有接龙回复[惊讶]，他们分别是：`+notSignNames,contact);
						}
					}else{
						await room.say('老师您还没有发通知呢！[呲牙]',contact);
					}		
				}else{
					await room.say('对不起！老师，我不知道您在说什么。[尴尬]',contact);
				}
			}else{
				await room.say('对不起！我只听老师的。[偷笑]',contact);
			}
		}else{
			if(fromName == schoolRoomMemberName.SCHOOL_ROOM_TEACHER){
				if(content.indexOf('通知') != -1 || content.indexOf('接龙回复') != -1){
					roomMemberMap = {};
					lastMsg = null;
					var memberList = await room.memberAll();
					for(var i = 0; i < memberList.length; i++){
						var alias = await room.alias(memberList[i]);
						var memberName = (alias == null) ? memberList[i].payload.name : alias;
						if(memberName != schoolRoomMemberName.SCHOOL_ROOM_TEACHER && memberName != schoolRoomMemberName.SCHOOL_ROOM_BOT){
							roomMemberMap[memberName] = 0;
						}
					}
					console.log(roomMemberMap);
					await room.say('老师发通知了，请各位家长按要求接龙回复。');				
				}
			}else{
				if(content.indexOf('通知') != -1 || content.indexOf('接龙回复') != -1){
					if(roomMemberMap[fromName] == 0){
						lastMsgNum = getMsgNumbers(lastMsg);
						preMsgNum = getMsgNumbers(content);
						if(lastMsgNum != 0){			//上次消息中有有效消息
							if(preMsgNum != 0){			//当前消息中有有效信息
								if(lastMsgNum + 1 == preMsgNum){
									//序号正确						
									var retContent = checkMsgNumber(content); //判断排序是否正确	
									if(retContent){
										lastMsg = insertMsgNumber(lastMsg,content);
										await room.say(lastMsg);
									}else{
										lastMsg = content;
									}
								}else{
									//序号错误
									lastMsg = insertMsgNumber(lastMsg,content);
									await room.say(lastMsg);	
								}
								roomMemberMap[fromName] = 1;
							}else{
								await room.say('格式不对请重新接龙。[抠鼻]',contact);
							}
						}else{
							if(preMsgNum == 1){
								roomMemberMap[fromName] = 1;
								lastMsg = content;
							}else{
								await room.say('请从1号开始接龙。[抠鼻]',contact);
							}			
						}
						if(checkFinish(roomMemberMap) == 1){
							const contactTeacher = await room.memberAll({roomAlias: schoolRoomMemberName.SCHOOL_ROOM_TEACHER});
							const nums = Object.getOwnPropertyNames(roomMemberMap).length;
							roomMemberMap = {};
							lastMsg = null;
							await room.say(`汇报老师，一共${nums}名学生家长，已经全部接龙回复完毕。[鼓掌][鼓掌][鼓掌]`,contactTeacher);
						}
						
					}else{
						await room.say('您已经接龙回复过了。[抠鼻]',contact);
					}
				}
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

const msgBotRandomRes=[
    "加油![胜利][胜利][胜利]","新的一天, 拼搏吧![奋斗][奋斗][奋斗]","努力拿到今日奖励[爱心][爱心][爱心]",
    "全力以赴的一天开始了[玫瑰][玫瑰][玫瑰]","今天是个好日子啊, 一起努力吧[跳跳][跳跳][跳跳]"];

async function dinosaurRoomDeal(msg){

	const content = msg.text();
	const contact = msg.from();
	const room = msg.room();
	const fromRoomAlias = await room.alias(contact);	//获取群昵称
	var fromName;

	if(fromRoomAlias){
		fromName = fromRoomAlias;
	}else{
		fromName = contact.name();
	}

	console.log(`Message from name:${contact.name()},alias:${fromRoomAlias}`);
	if(msg.type() == wechat.bot.Message.Type.Text){
		console.log('~~~~~~~~~~文本消息~~~~~~~~~');
		console.log('text='+content);
		if(content.indexOf('已到岗') != -1){
			var randomNum = Math.floor(Math.random() * (msgBotRandomRes.length - 1));
			await room.say(msgBotRandomRes[randomNum],contact);
		}else if(content.indexOf('同步') != -1){
			await room.sync();
			await room.say('好的，已经同步！',contact);
		}
		if (await msg.mentionSelf()) {
			if(content.indexOf('谢谢') != -1 || content.indexOf('谢了') != -1 || content.indexOf('多谢') != -1 || content.indexOf('thanks') != -1){
				await room.say('不客气, 应该的[微笑]',contact);
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

async function onBlackRoom1(msg){
	dinosaurRoomDeal(msg);
}

async function onBlackRoom2(msg){
	dinosaurRoomDeal(msg);
}

async function onGreenRoom1(msg){
	dinosaurRoomDeal(msg);
}

async function onGreenRoom2(msg){
	dinosaurRoomDeal(msg);
}

async function onRedRoom1(msg){
	dinosaurRoomDeal(msg);
}

async function onRedRoom2(msg){
	dinosaurRoomDeal(msg);
}

async function onGoldRoom1(msg){
	dinosaurRoomDeal(msg);
}

async function onDiamondRoom1(msg){
	dinosaurRoomDeal(msg);
}

eventEmitter.on('schoolRoom', onSchoolRoom);
eventEmitter.on('blackRoom1', onBlackRoom1);
eventEmitter.on('blackRoom2', onBlackRoom2);
eventEmitter.on('greenRoom1', onGreenRoom1);
eventEmitter.on('greenRoom2', onGreenRoom2);
eventEmitter.on('redRoom1', onRedRoom1);
eventEmitter.on('redRoom2', onRedRoom2);
eventEmitter.on('goldRoom1', onGoldRoom1);
eventEmitter.on('diamondRoom1', onDiamondRoom1);

console.log('myenvents.js已准备好')

exports.eventEmitter = eventEmitter

