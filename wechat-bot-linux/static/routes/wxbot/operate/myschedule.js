const schedule = require('node-schedule');
var wechat = require('./mybot.js');

const dinosaurRoomTopics = [
        wechat.qsmxRoomTopic.QSMX_DINOSAUR_BLACK_1_BOT_ROOM_TOPIC,
        wechat.qsmxRoomTopic.QSMX_DINOSAUR_BLACK_2_BOT_ROOM_TOPIC,
        wechat.qsmxRoomTopic.QSMX_DINOSAUR_GREEN_1_BOT_ROOM_TOPIC,
        wechat.qsmxRoomTopic.QSMX_DINOSAUR_GREEN_2_BOT_ROOM_TOPIC,
        wechat.qsmxRoomTopic.QSMX_DINOSAUR_RED_1_BOT_ROOM_TOPIC,
        wechat.qsmxRoomTopic.QSMX_DINOSAUR_RED_2_BOT_ROOM_TOPIC,
        wechat.qsmxRoomTopic.QSMX_DINOSAUR_GOLD_1_BOT_ROOM_TOPIC,
        wechat.qsmxRoomTopic.QSMX_DINOSAUR_DIAMOND_1_BOT_ROOM_TOPIC];

const msgBotTimer9_30=[
    "[拥抱][拥抱][拥抱]周末又来临，经历了昨天激情澎湃、忙忙碌碌的一天，宝宝们都辛苦拉，但是，可千万别掉以轻心哦，因为周日也是很忙碌的哦，也是大家继续辉煌的时间哦，宝宝们加油[转圈][转圈][转圈]",
    "[微笑][微笑][微笑]新的一周开始啦，宝宝们开始集中精神往前冲，努力成为咱们销售先锋[玫瑰][玫瑰][玫瑰]",
    "[鼓掌][鼓掌][鼓掌]周二，有压力、有匆忙，但宝宝们的拼搏精神从未消退，加油宝宝们[嘴唇][嘴唇][嘴唇]",
    "[奋斗][奋斗][奋斗]周三到了，我相信宝宝们都有三头六臂轻轻松松完成工作，为你们加油，爱你们哦[爱心][爱心][爱心]",
    "[跳跳][跳跳][跳跳]忙忙碌碌又到周四，宝宝们继续努力，迎接战斗的胜利，我相信我能看到大家喜悦的脸庞，加油加油加油[耶][耶][耶]",
    "[机智][机智][机智]转眼周五到，宝宝们准备好更加紧张、更加努力的冲刺了吗？让我们拭目以待，开始你们的辉煌表演[嘿哈][嘿哈][嘿哈]",
    "[拳头][拳头][拳头]把快乐拧进发条，可以开心分分秒秒，忙碌的周六到啦，相信宝宝们已经做好最充分的冲刺准备，王者表演即将到来，宝宝们加油[强][强][强]"];

const msgBotTimer14_00 = "[勾引][勾引][勾引]请大家向主管汇报店面动态[咖啡][咖啡][咖啡]";
const msgBotTimer15_00 = "[啤酒][啤酒][啤酒]大家停止向主管汇报店面动态[憨笑][憨笑][憨笑]";
const msgBotTimer17_00 = "[勾引][勾引][勾引]请大家向主管汇报店面动态[咖啡][咖啡][咖啡]";
const msgBotTimer18_00 = "[啤酒][啤酒][啤酒]大家停止向主管汇报店面动态[憨笑][憨笑][憨笑]";
const msgBotTimer21_30 = "\n早会通知，当班参会接龙：\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n---------------\n未点到名的关闭静音，发言时再点回来。\n";

const msgBotTimer22_00=[
    "一周的尾声周日结束了，宝宝们回家放好水，冲个暖暖的热水澡，洗去一天的疲惫，迎接新一周的到来，感谢宝宝们每一天的陪伴，爱你们哦，晚安[月亮][月亮][月亮]",
    "无论你是谁无论你正在经历什么坚持住你定会看见最坚强的自己。宝宝们辛苦了，晚安！[月亮][月亮][月亮]",
    "无论何时，不悔过去，不惧未来，不负当下，才是最好的生活状态。整理好心情迎接周三的到来，宝宝们，晚安[月亮][月亮][月亮]",
    "我们可以活得很简单，比如跟宝宝们说一声“晚安”，辛苦了宝宝们，晚安，好梦[月亮][月亮][月亮]",
    "遇到一群人，点燃你的激情，激起你的斗志昂扬，感谢宝宝们每天陪在我身边，感谢宝宝们的努力付出，周四结束，睡个好觉，梦里有你有我。晚安[月亮][月亮][月亮]",
    "无论何时，都要微笑，微笑面对生活，微笑对待他人，微笑对待工作。辛苦了宝宝们，睡个好觉，精力充沛备战周六。晚安[月亮][月亮][月亮]",
    "放下你忙碌的疲惫，感受夜的美妙，用真诚的微笑，换幸福的拥抱，忙碌的周六过去了，宝宝们辛苦了，晚安[月亮][月亮][月亮]"];

var scheduleJob9_30;
var scheduleJob14_00;
var scheduleJob15_00;
var scheduleJob17_00;
var scheduleJob18_00;
var scheduleJob21_30;
var scheduleJob22_00;

function scheduleStart(){

    scheduleJob9_30 = schedule.scheduleJob({hour: 9, minute: 30}, async function(){
        console.log('scheduleJob9_30' + new Date());
        if(wechat.bot.logonoff()){
            for(var i = 0; i < dinosaurRoomTopics.length; i++){
                const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[i]});
                if(roomBot){
                    await roomBot.say(msgBotTimer9_30[new Date().getDay()]);  
                }
            }          
        }
    });    

    scheduleJob14_00 = schedule.scheduleJob({hour: 14, minute: 0}, async function(){
        console.log('scheduleJob14_00' + new Date());
        if(wechat.bot.logonoff()){
            for(var i = 0; i < dinosaurRoomTopics.length; i++){
                const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[i]});
                if(roomBot){
                    await roomBot.say(msgBotTimer14_00);  
                }
            }          
        }
    }); 

    scheduleJob15_00 = schedule.scheduleJob({hour: 15, minute: 0}, async function(){
        console.log('scheduleJob15_00' + new Date());
        if(wechat.bot.logonoff()){
            for(var i = 0; i < dinosaurRoomTopics.length; i++){
                const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[i]});
                if(roomBot){
                    await roomBot.say(msgBotTimer15_00);  
                }
            }          
        }
    }); 

    scheduleJob17_00 = schedule.scheduleJob({hour: 17, minute: 0}, async function(){
        console.log('scheduleJob17_00' + new Date());
        if(wechat.bot.logonoff()){
            for(var i = 0; i < dinosaurRoomTopics.length; i++){
                const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[i]});
                if(roomBot){
                    await roomBot.say(msgBotTimer17_00);  
                }
            }          
        }
    }); 
 
    scheduleJob18_00 = schedule.scheduleJob({hour: 18, minute: 0}, async function(){
        console.log('scheduleJob18_00' + new Date());
        if(wechat.bot.logonoff()){
            for(var i = 0; i < dinosaurRoomTopics.length; i++){
                const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[i]});
                if(roomBot){
                    await roomBot.say(msgBotTimer18_00);  
                }
            }          
        }
    }); 

    scheduleJob21_30 = schedule.scheduleJob({hour: 21, minute: 30}, async function(){
        console.log('scheduleJob21_30' + new Date());
        if(wechat.bot.logonoff()){
            for(var i = 0; i < dinosaurRoomTopics.length; i++){
                const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[i]});
                if(roomBot){
                    await roomBot.say(msgBotTimer21_30);  
                }
            }          
        }
    });
    scheduleJob22_00 = schedule.scheduleJob({hour: 22, minute: 0}, async function(){
        console.log('scheduleJob22_00' + new Date());
        if(wechat.bot.logonoff()){
            for(var i = 0; i < dinosaurRoomTopics.length; i++){
                const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[i]});
                if(roomBot){
                    await roomBot.say(msgBotTimer22_00[new Date().getDay()]);  
                }
            }          
        }
    }); 

}

function scheduleStop(){

	scheduleJob9_30.cancel();
    scheduleJob14_00.cancel();  
    scheduleJob15_00.cancel();
    scheduleJob17_00.cancel();
    scheduleJob18_00.cancel();
    scheduleJob21_30.cancel();
    scheduleJob22_00.cancel();

}
console.log('myschedule.js已准备好')
module.exports.scheduleStart =  scheduleStart
module.exports.scheduleStop =  scheduleStop