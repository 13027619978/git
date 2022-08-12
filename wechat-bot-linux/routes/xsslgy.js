var express=require('express');
var router = express.Router();
var wechat = require('./wxbot/operate/mybot.js');
router.get('/sendMsg', async function(req,res){
	var name = req.query.name;
	var phone = req.query.phone;
	var dwName = req.query.dwName;
	var fjName = req.query.fjName;
	var peopleNumber = req.query.peopleNumber;
	var visitDate = req.query.visitDate;
	var rq = visitDate.split(' ')[0];
	var cc = visitDate.split(' ')[1];
	
	let botMsg = '单位名称：' + dwName + '\n' + '联系人：' + name + '\n' + '手机号：' + phone + '\n' + '参观日期：' + rq + '\n' + '场次：' + cc + '\n' + '预计人数：' + peopleNumber + '\n' + '附加服务：' + fjName;
	
	if(phone == 0){
		botMsg = '日期：' + rq + '\n' + '场次：' + cc + '\n' + '已锁定';
	}
	
    if(!wechat.bot.logonoff()){   
        res.send({
            code: 1002,
            success: false,
            msg: '机器人离线'
        });
        return;
    }
    const room = await wechat.bot.Room.find({topic: '西山森林公园预约组'});
    if(room == null){
        res.send({
            code: 1003,
            success: false,
            msg: '微信群不存在'
        });
        return;      
    }
    room.say(botMsg);
    res.send({
		code: 1,
		success: true,
		msg: '消息发送成功'
	});
})

module.exports = router;