var express=require('express');
var events = require('events');
var wechat = require('./mybot.js');
var schedule = require('./myschedule.js');
const {log} = require('wechaty');
var router = express.Router();

var eventEmitter = new events.EventEmitter();
var wechatState = false;
var botState = false;
var botName = null;
var botQrcode = null;
var botRestart = false;

function onServerLogin(name){
	setInterval(()=>{
		if(botState == true){
			global.botIsOnline = true;
		}
	},3100);
	botRestart = true;
	console.log('onServerLogin');
	console.log('botName='+name.payload.name);
	console.log(schedule["scheduleStop"])
	if(schedule.scheduleJobStart){
		schedule.scheduleStop();
	}
	console.log(schedule.scheduleJobStart);
	botState = true;
	botName = name.payload.name;
	botQrcode = null;
	schedule.scheduleStart();
	console.log(schedule.scheduleJobStart);
}

function onServerLogout(){
	botRestart = false;
	console.log('onServerLogout');
	setTimeout(()=>{
		console.log('botRestart=====' + botRestart);
		if(!botRestart){
			global.botIsOnline = false;
			botState = false;
			botName = null;
			botQrcode = null;
		}
	}, 5000)
	schedule.scheduleStop();
}

function onServerScan(qrcode){
	console.log('onServerScan');
	console.log('botQrcode='+qrcode);
	botQrcode = qrcode;
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
		global.botIsOnline = false
		botState = false
		botName = null
		botQrcode = null		
    	wechat.bot.stop()	
	}
    res.status(200).send(wechatState)
})

router.post('/restart',async function(req,res){
	await wechat.bot.stop()
	global.botIsOnline = false
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
router.post('/botstate',function(req,res){
	var ret = {'wechatState' : wechatState,'botState' : botState,'botName':botName}
    res.status(200).send(ret)
})

router.get('/',function(req,res){
    res.send('wechaty根页面');
})

botState = false;
botName = null;
botQrcode = null;
wechatState = true;
wechat.bot.start();	

module.exports = router;   /*暴露这个 router模块*/
exports.eventEmitter = eventEmitter