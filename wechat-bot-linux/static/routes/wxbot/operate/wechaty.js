var express=require('express');
var events = require('events');
var wechat = require('./mybot.js');
var http = require('./myhttp.js');
var schedule = require('./myschedule.js');
var router = express.Router();

var eventEmitter = new events.EventEmitter();
var wechatState = false;
var botState = false;
var botName = null;
var botQrcode = null;

function onServerLogin(name){
	console.log('onServerLogin');
	console.log('botName='+name.payload.name);
	botState = true;
	botName = name.payload.name;
	botQrcode = null;
	http.myHttpGoEasy('bot_login_channel',botName);
	schedule.scheduleStart();
}

function onServerLogout(){
	console.log('onServerLogout');
	botState = false;
	botName = null;
	botQrcode = null;
	http.myHttpGoEasy('bot_logout_channel','bot logout');
	schedule.scheduleStop();
}

function onServerScan(qrcode){
	console.log('onServerScan');
	console.log('botQrcode='+qrcode);
	botQrcode = qrcode;
	http.myHttpGoEasy('qrcode_channel',botQrcode);
}

eventEmitter.on('serverLogin', onServerLogin);
eventEmitter.on('serverLogout', onServerLogout);
eventEmitter.on('serverScan', onServerScan);


router.post('/start',function(req,res){
	if(wechatState != true){
		wechatState = true
	    wechat.bot.start().catch(async e => {
        	console.error('Bot start() fail:', e)
        	wechat.bot.stop()
        	wechatState = false
    	})	
	}
    res.status(200).send(wechatState)
})

router.post('/stop',function(req,res){
	if(wechatState == true){
		wechatState = false
		botState = false
		botName = null
		botQrcode = null		
    	wechat.bot.stop()	
	}
    res.status(200).send(wechatState)
})

router.post('/restart',async function(req,res){
	await wechat.bot.stop()
	botState = false
	botName = null
	botQrcode = null	
	wechatState = true	
    wechat.bot.start().catch(async e => {
    	console.error('Bot start() fail:', e)
    	wechat.bot.stop()
    	wechatState = false
	})		
    res.status(200).send(wechatState)
})

router.post('/state',function(req,res){
	var ret = {'wechatState' : wechatState,'botState' : botState,'botName':botName,'botQrcode':botQrcode}
    res.status(200).send(ret)
})


router.get('/',function(req,res){
    res.send('wechaty根页面');
})


module.exports = router;   /*暴露这个 router模块*/
exports.eventEmitter = eventEmitter