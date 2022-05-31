var wechat = require('../mybot.js');

/********************/
/***** 学生群代码 *******/
/********************/

const schoolRoomMemberName = {
	SCHOOL_ROOM_TEACHER : '张海媛老师',
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

async function schoolRoomDeal(msg){
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
							await room.say(`报告老师，一共${nums}名学生家长，已经全部收到。`,contact);
						}else{
							const notSignNames = getNotSign(roomMemberMap);
							await room.say(`报告老师，一共${nums}名学生家长，还差${notSignNames.length}名学生家长没有接龙回复，他们分别是：`+notSignNames,contact);
						}
					}else{
						await room.say('老师您还没有发通知呢！',contact);
					}		
				}else{
					await room.say('对不起！老师，我不知道您在说什么。',contact);
				}
			}else{
				await room.say('对不起！我只听老师的。',contact);
			}
		}else{
			if(fromName == schoolRoomMemberName.SCHOOL_ROOM_TEACHER){
				if(content.indexOf('通知') != -1 && content.indexOf('接龙回复') != -1){
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
					await room.say('老师发通知了，请各位家长按要求接龙回复。');				
				}
			}else{
				if(content.indexOf('通知') != -1 && content.indexOf('接龙回复') != -1){
					if(roomMemberMap[fromName] == 0){
						lastMsgNum = getMsgNumbers(lastMsg);
						preMsgNum = getMsgNumbers(content);
						if(lastMsgNum != 0){			
							if(preMsgNum != 0){			
								if(lastMsgNum + 1 == preMsgNum){						
									var retContent = checkMsgNumber(content); 
									if(retContent){
										lastMsg = insertMsgNumber(lastMsg,content);
										await room.say(lastMsg);
									}else{
										lastMsg = content;
									}
								}else{
									lastMsg = insertMsgNumber(lastMsg,content);
									await room.say(lastMsg);	
								}
								roomMemberMap[fromName] = 1;
							}else{
								await room.say('格式不对请重新接龙。',contact);
							}
						}else{
							if(preMsgNum == 1){
								roomMemberMap[fromName] = 1;
								lastMsg = content;
							}else{
								await room.say('请从1号开始接龙。',contact);
							}			
						}
						if(checkFinish(roomMemberMap) == 1){
							const contactTeacher = await room.memberAll({roomAlias: schoolRoomMemberName.SCHOOL_ROOM_TEACHER});
							const nums = Object.getOwnPropertyNames(roomMemberMap).length;
							roomMemberMap = {};
							lastMsg = null;
							await room.say(`报告老师，一共${nums}名学生家长，已经全部接龙回复完毕。`,contactTeacher);
						}
						
					}else{
						await room.say('您已经接龙回复过了。',contact);
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

module.exports = {schoolRoomDeal};
