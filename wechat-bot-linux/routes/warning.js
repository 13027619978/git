/**
 * 地灾监控机器人预警
 */

var express=require('express');
var router = express.Router();
var wechat = require('./wxbot/operate/mybot.js');
router.get('/sendMsg', async function(req,res){
	var roomTopic = req.query.roomTopic;
    var message = req.query.message;
    console.log("sendMsg-----------");
    console.log(roomTopic);
    console.log(message);
    if(typeof roomTopic === 'undefined' || typeof message === 'undefined'){
        res.send({
            code: 1001,
            success: false,
            msg: '参数错误'
        });
        return;
    }
    if(!wechat.bot.logonoff()){   
        res.send({
            code: 1002,
            success: false,
            msg: '机器人离线'
        });
        return;
    }
    const room = await wechat.bot.Room.find({topic: roomTopic});
    if(room == null){
        res.send({
            code: 1003,
            success: false,
            msg: '微信群不存在'
        });
        return;      
    }
    room.say(message);
    res.send({
		code: 1,
		success: true,
		msg: '消息发送成功'
	});
})

module.exports = router;