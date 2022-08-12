const schedule = require('node-schedule');
var wechat = require('./mybot.js');
const https = require('https');
const host = 'api.joybike.com.cn';
const wechatyStatus = require('./wechaty.js');
const host1 = 'iot.smart-ideas.com.cn';
const exec = require('child_process').exec; 
const fs = require('fs');
const http = require('http');
// 雁栖湖
const yqh = require('./common/yqh.js');
// 蝶恋花馆
const xhgdlh = require('./common/xhgdlh.js');
// 鲜花港
const xhg = require('./common/xhg.js');
// 北海
const bh = require('./common/bhgy.js');
// 野鸭湖
const yyh = require('./common/yyh.js');
// 园博园
const yby = require('./common/yby.js');
// 玄武湖
const xwh = require('./common/xwh.js');
// 新票务
const boss = require('./common/boss.js');
// 南湖
const nh = require('./common/nh.js');
// 云龙湖
const ylh = require('./common/ylh.js')
// 南北湖
const nbh = require('./common/nbh.js')
// 凤凰岭
const fhl = require('./common/fhl.js')
// 水上公园
const ssgy = require('./common/ssgy.js');
// 什刹海
const sch = require('./common/sch.js');
// 邢台园博园
const xtyby = require('./common/xtyby.js');
// 园博园创森
const ybycs = require('./common/ybycs.js');

// 运营预警
var warningString = '';
// 运营预喜
var happyString = '';
// 运营新店
var newStoreString = '';
// 运营大数据数组
var storeData = [];


const dinosaurRoomTopics = [
        wechat.qsmxRoomTopic.QSMX_DINOSAUR_GOLD_BOT_ROOM_TOPIC,
        wechat.qsmxRoomTopic.QSMX_DINOSAUR_SILVER_BOT_ROOM_TOPIC,
        wechat.qsmxRoomTopic.QSMX_DINOSAUR_COPPER_BOT_ROOM_TOPIC,
        wechat.qsmxRoomTopic.QSMX_DINOSAUR_IRON_BOT_ROOM_TOPIC,
        wechat.qsmxRoomTopic.QSMX_DINOSAUR_BLACK_BOT_ROOM_TOPIC,
        wechat.qsmxRoomTopic.QSMX_DINOSAUR_NEW_BOT_ROOM_TOPIC
];
	
var scheduleJobStart = false;
var scheduleJob09_00;
var scheduleJob09_50;
var scheduleJob10_00;
var scheduleJob15_00;
// var scheduleJob11_50;
var scheduleJob17_00;
var scheduleJob18_00;
var scheduleJob19_00;
var scheduleJob21_00;
var scheduleJob21_30;
var scheduleJob21_31;
var scheduleJob21_33;
var scheduleJob21_40;
var scheduleJob22_00;
var scheduleJob13_00;
var scheduleJob13_01;
var scheduleJob13_03;
var scheduleJob13_05;
var scheduleJob16_00;
var scheduleJob16_01;
var scheduleJob16_03;
var scheduleJob16_05;
var scheduleJob16_45;
var scheduleJob18_01;
var scheduleJob18_03;
var scheduleJob18_05;
var scheduleJob18_30;
var scheduleJob20_00;
var scheduleJob20_01;
var scheduleJob20_03;
var scheduleJob20_05;
var scheduleJob23_59;
var scheduleJob_hour;
var scheduleJob_halfHour;
var scheduleJob_45;
//var scheduleJob17_15;

var morningList = [
	"宝贝儿，小龙都想你啦",
	"宝贝儿，来找小猫猫玩啦",
	"我要努力记住宝宝的名字，见面喊他名",
	"我对宝贝儿们热情喜爱，他们更爱我",
	"经常夸赞宝贝儿你真棒",
	"这车怎么玩：很简单哒。您坐稳扶好，踩好油门握好把",
	"宝贝儿，让爸爸妈妈来扫码就可以骑小龙啦",
	"宝贝儿，我们来开小车车，长大开汽车载爸爸妈妈出去玩",
	"办卡更优惠，全国通用",
	"您放心，就一个手机号，啥信息都没有",
	"您不想注册可以给我20现金，我帮您开",
	"我只能收20开单次哦，不能帮办卡，优惠还得您自己扫码才有哈",
	"早打卡，晚打卡，考勤要记牢，忘记没有钱",
	"打卡地址要有商场名否则不算",
	"全部车辆都要试骑才合格",
	"试骑完成后才刷电量，否则不准",
	"努力每一天，今天要挣钱才行啊",
	"小程序需要实时刷新看数据",
	"订单模块20分钟必须刷新看",
	"订单开锁需要2分钟内",
	"特殊情况先垫付开锁统一找主管报销",
	"试骑为了测试设备、揽客宣传、查看电量顺便歇会",
	"当好一天和尚撞好一天钟，当天达标当天有提成",
	"商场数据20:00更新",
	"每天记录好销售额和奖励月底自己汇总",
	"充值到钱包，成交更快",
	"顾客您和我都看到的消费明细是一样的",
	"扫码提示不在营业时间内联系主管来解决",
	"实际有销售但是没显示，刷新来解决",
	"定位不准需要我开启手机GPS和网络",
	"每次10分钟，第二次需要再扫码",
	"10点前群内早会接龙要完成",
	"10点前群内目标要接龙完成",
	"10-11点充电同时开视频早会",
	"今天完成全部车辆四轮清洁",
	"车头全部对外向顾客摆放整齐",
	"今日目标按表填写",
	"早会必须要参加，特殊情况提前报，否则罚款50起",
	"找人替班工作要求同自己，该报都得报",
	"未经批准的替班算旷工",
	"注意商业保密，泄露罚500",
	"绩效要达标，钱都是自己挣的，别人给不了",
	"车辆不充电查处罚款50每次",
	"营业期间关机每次罚款200",
	"小程序多用多看，业绩明白全靠他",
	"车辆归位很重要，被通报罚款50",
	"我要盯紧车子不丢失，不然罚我赔",
	"找车和悦问顾客，找到群内告知",
	"每天早上清洁皮肤和把手",
	"常见故障来学习，不等不靠出业绩"
];

var afternoonList = [
	"零蛋丢死人，我得开单好报数",
	"灯亮是开机的标志",
	"轻拿轻放充电器，安全又长久",
	"充电器闪烁为充电，满电全格。刚充就满有问题",
	"车辆报修说现象和检测经过，不下结论",
	"微信扫码登录付款，挂挡前进脚踏踩好",
	"车速慢因为没电、超重、杂物、驱动轮松",
	"【前方有障碍物】是雷达报警",
	"【前方有危险哦】是落空预警",
	"发票每月逢5日都去赶紧领",
	"不前进时，先测试后退判断把手线连接",
	"清理脚踏缝隙防卡住",
	"商场经理楼管换人了，我得摸清情况要到电话发给公司",
	"放倒检查螺丝紧固",
	"付款后，灯亮音乐都慢，得推一把",
	"每天晚上发三图：业绩+试骑+水印店面",
	"时走时停，脚踏没一直踩踏",
	"后轮吱吱响，是轴承坏了或螺丝松了",
	"脚踏不回弹，异物卡中间",
	"充不上电先看总电源，再开机器",
	"充不上电换个充电器测试问题",
	"皮肤坏了我得赶紧修，漂亮才有人来爱",
	"充电不离人，离人不充电",
	"充电离人会出事，设备和充电器也爱坏",
	"最大努力做业绩，多挣钱",
	"业绩只算本金，办卡鼓励顾客赶紧骑",
	"顾客不花钱不让骑不让坐，我要说明白",
	"多办卡多攒老客户，业绩差不了",
	"见过不放过，喊宾不白喊",
	"餐饭有事离岗群内要留言",
	"商场竞品每周固定报",
	"骑出去要马上找回来，坏了要人赔",
	"叮嘱顾客避开人物建筑柜台，撞坏要索赔",
	"见到楼管都问候，礼多人不怪",
	"迟到早退每次扣50",
	"脱岗旷工每次罚500",
	"调班每月不超2次，超过每次罚50",
	"每周日晚上水洗坐垫晾干好挣钱",
	"群内会内只执行，建议意见私信提",
	"不坐柜不依柜，顾客见我不皱眉",
	"除了工作不玩手机，遵守规定少麻烦",
	"私信需要尽快回，语音视频都得接",
	"二维码板上写手机号，方便顾客少客诉",
	"远程开锁文字发，新开车号加手机号和原因",
	"费用先申请，准许才给报",
	"商场传达第一时间转告主管不误事",
	"领导交办要给进度和结果回复，有始有终",
	"仪容整洁，服装得体，干净大方",
	"着工装、戴工牌，精神饱满人人爱",
	"顾客恶意破损要制止并要求赔偿，车子是我挣钱的命根子"
];

function scheduleStart(){
	scheduleJobStart = true;
	
	/*** 雪圈报数 ***/
	// c = schedule.scheduleJob({hour: 17, minute: 30}, async function(){
	// 	if(wechat.bot.logonoff()){
	// 		const room = await wechat.bot.Room.find({topic: "奥森运营组"});
	// 		var nowDate = new Date();
	// 		var nowYear = nowDate.getFullYear();
	// 		var nowMonth = nowDate.getMonth() + 1;
	// 		nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	// 		var nowDay = nowDate.getDate();
	// 		nowDay = nowDay>9?nowDay:'0'+nowDay;
	// 		var startDate = nowYear + '-' + nowMonth + '-' + nowDay + ' 00:00:00';
	// 		var searchStartDate = encodeURI(startDate);
	// 		var endDate = nowYear + '-' + nowMonth + '-' + nowDay + ' 17:30:00';
	// 		var searchEndDate = encodeURI(endDate);
	// 		const options = {
	// 			hostname: host1,
	// 			path: '/orson/clt/getClt?startDate=' + searchStartDate + '&endDate=' + searchEndDate,
	// 			method: 'GET'
	// 		};
			
	// 		const req = https.request(options, (res) => {
	// 		  res.on('data', (d) => {
			  	
	// 		    var res = JSON.parse(d.toString());
	// 		    console.log(res);
	// 		    var xueQTotal = res.data.otherOrderCltVo.xueQTotal;
	// 		    if(!xueQTotal){
	// 		    	xueQTotal = "0.00";
	// 		    }
	// 		    try{
	// 				room.say("\n时间："+ endDate +"\n当前营业额："+ xueQTotal +"元");
	// 			}catch(e){
					
	// 			}
	// 		  });
	// 		});
			
	// 		req.on('error', (e) => {
	// 		  console.error(`problem with request: ${e.message}`);
	// 		});
			
	// 		req.end();
	// 	}
	// });
	
	
	scheduleJob19_00 = schedule.scheduleJob({hour: 19, minute: 0}, async function(){
        if(wechat.bot.logonoff()){
        	var weekDay = new Date().getDay();
        	if(weekDay == 0 || weekDay == 6){
        		return;
        	}
		 	const room = await wechat.bot.Room.find({topic: "骑思妙享落地组"});
		 	var allMember = await room.memberAll();
			var allMemberName = [];
			let path = require('path');
			for(var i = 0; i < allMember.length; i++){
				allMemberName[i] = allMember[i].payload.name;
			};
			var noReportMember = [];
			fs.readFile(path.resolve(__dirname, './jsonData/work.json'), 'utf8', function(err, data){
				if(err){
		            return console.error(err);
		       	}
				var jsonData = data.toString();
				jsonData = JSON.parse(jsonData);
				var reportMember = jsonData.reportMember;
				var noReportMember = [];
				for(var i = 0; i < allMemberName.length; i++){
			  		if(reportMember.indexOf(allMemberName[i]) == -1){
			  			noReportMember.push(allMemberName[i]);
			  		}
			  	}
				var tellMember = [];
				for(var i = 0; i < allMember.length; i++){
					for(var j = 0; j < noReportMember.length; j++){
					if(noReportMember[j] == allMember[i].payload.name && noReportMember[j] != "技术支撑-小享" && noReportMember[j] != "运营实习生-小思"){
							var memberName = allMember[i].payload.name;
							tellMember.push(memberName);
						}
					}
				}
				if(tellMember.length != 0){
					var botString = '';
					tellMember.forEach(function(value, key){
						botString += value + '，';
					})
					room.say(botString + '请发送本日工作总结！');
				}else{
					room.say('本日工作报告已全部发送完成！');
				}
			})
    	}
    }); 
    
    scheduleJob22_00 = schedule.scheduleJob({hour: 22, minute: 0}, async function(){
    	 if(wechat.bot.logonoff()){
    	 	var weekDay = new Date().getDay();
        	if(weekDay == 0 || weekDay == 6){
        		return;
        	}
    	 	const room = await wechat.bot.Room.find({topic: "骑思妙享落地组"});
    	 	let path = require('path');
    	 	var year = new Date().getFullYear();
			var month = new Date().getMonth() + 1;
			month = month>9?month:'0'+month;
			var day = new Date().getDate();
			day = day>9?day:'0'+day;
			fs.readFile(path.resolve(__dirname, './jsonData/work.json'), 'utf8', function(err, data){
				if(err){
		            return console.error(err);
		       	}
				var jsonData = data.toString();
				jsonData = JSON.parse(jsonData);
				var memberList = jsonData.memberList;
				var reportMember = jsonData.reportMember;
				var botString = '*****今天的工作总结考勤*****\n日期：'+year+'-'+month+'-'+day+'\n工作总结考勤情况：\n已发：';
				for(var i = 0; i < reportMember.length; i++){
					botString = botString + reportMember[i] + ',';
				}
				botString += '\n未发：'
				for(var i = 0; i < memberList.length; i++){
					if(reportMember.indexOf(memberList[i].name) == -1){
						botString = botString + memberList[i].name + ',';
					}
				}
				room.say(botString);
				var initJsonData = {"reportMember":[], "memberList": memberList};
				fs.writeFile(path.resolve(__dirname, './jsonData/work.json'), JSON.stringify(initJsonData),function(err){
		            if(err){
		                console.error(err);
		            }
		        })
			})
    	 }
    })
	
	/********************************** 运营大数据部分 **********************************/
//	scheduleJob13_00 = schedule.scheduleJob({hour: 13, minute: 0}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	var nowDate = new Date().getTime();
//		 	var weekDate = nowDate - 86400000 * 7;
//		 	var towWeekDate = nowDate - 86400000 * 14;
//		 	nowDate = getDateString(nowDate);
//		 	weekDate = getDateString(weekDate);
//		 	towWeekDate = getDateString(towWeekDate);
//		 	var nowSDate = nowDate.sdate;
//		 	var nowEDate = nowDate.edate;
//		 	var weekSDate = weekDate.sdate;
//		 	var weekEDate = weekDate.edate;
//		 	var towWeekSDate = towWeekDate.sdate;
//		 	var towWeekEDate = towWeekDate.edate;
//		 	if(ceshiRoomBot){
//		 		getStoreData(nowSDate, nowEDate, weekSDate, weekEDate,  towWeekSDate, towWeekEDate, 1);
//		 	}
//  	}
//  }); 
    
    
    // 恐龙店面群通知
   //  scheduleJob09_00 = schedule.scheduleJob({hour: 9, minute: 0}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var nowDate = getNowDate();
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[0]});
   //          if(roomBot){
   //          	await roomBot.say("早会通知，当班参会接龙↓：\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日09:00-10:00完成早会接龙-----"); 
   //          }
   //  	}
   //  }); 
    
   //  scheduleJob09_01 = schedule.scheduleJob({hour: 9, minute: 1}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var nowDate = getNowDate();
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[1]});
   //          if(roomBot){
   //          	await roomBot.say("早会通知，当班参会接龙↓：\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日09:00-10:00完成早会接龙-----"); 
   //          }
   //  	}
   //  });
    
   //  scheduleJob09_02 = schedule.scheduleJob({hour: 9, minute: 2}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var nowDate = getNowDate();
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[2]});
   //          if(roomBot){
   //          	await roomBot.say("早会通知，当班参会接龙↓：\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日09:00-10:00完成早会接龙-----"); 
   //          }
   //  	}
   //  });
   //  scheduleJob09_03 = schedule.scheduleJob({hour: 9, minute: 3}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var nowDate = getNowDate();
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[3]});
   //          if(roomBot){
   //          	await roomBot.say("早会通知，当班参会接龙↓：\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日09:00-10:00完成早会接龙-----"); 
   //          }
   //  	}
   //  });
   //  scheduleJob09_04 = schedule.scheduleJob({hour: 9, minute: 4}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var nowDate = getNowDate();
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[4]});
   //          if(roomBot){
   //          	await roomBot.say("早会通知，当班参会接龙↓：\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日09:00-10:00完成早会接龙-----"); 
   //          }
   //  	}
   //  });
   //  scheduleJob09_05 = schedule.scheduleJob({hour: 9, minute: 5}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var nowDate = getNowDate();
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[5]});
   //          if(roomBot){
   //          	await roomBot.say("早会通知，当班参会接龙↓：\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日09:00-10:00完成早会接龙-----");
   //         	}
   //  	}
   //  });
    
    // 恐龙店面群试骑口号
   //  scheduleJob09_50 = schedule.scheduleJob({hour: 9, minute: 50}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var startDate = new Date('2019/10/26 00:00:00').getTime();
			// var nowDate = new Date().getTime();
			// var dayIndex = (Math.ceil((nowDate-startDate)/86400000) - 1)%50;
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[0]});
   //          if(roomBot){
   //          	await roomBot.say("🔔🔔今日试骑口号：\n15:00前👉“"+ morningList[dayIndex] +"”\n15:00后👉“"+ afternoonList[dayIndex] +"”"); 
   //          }
   //  	}
   //  }); 
   //  scheduleJob09_51 = schedule.scheduleJob({hour: 9, minute: 51}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var startDate = new Date('2019/10/26 00:00:00').getTime();
			// var nowDate = new Date().getTime();
			// var dayIndex = (Math.ceil((nowDate-startDate)/86400000) - 1)%50;
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[1]});
   //          if(roomBot){
   //          	await roomBot.say("🔔🔔今日试骑口号：\n15:00前👉“"+ morningList[dayIndex] +"”\n15:00后👉“"+ afternoonList[dayIndex] +"”"); 
   //          }
   //  	}
   //  }); 
   //  scheduleJob09_52 = schedule.scheduleJob({hour: 9, minute: 52}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var startDate = new Date('2019/10/26 00:00:00').getTime();
			// var nowDate = new Date().getTime();
			// var dayIndex = (Math.ceil((nowDate-startDate)/86400000) - 1)%50;
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[2]});
   //          if(roomBot){
   //          	await roomBot.say("🔔🔔今日试骑口号：\n15:00前👉“"+ morningList[dayIndex] +"”\n15:00后👉“"+ afternoonList[dayIndex] +"”"); 
   //          }
   //  	}
   //  }); 
   //  scheduleJob09_53 = schedule.scheduleJob({hour: 9, minute: 53}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var startDate = new Date('2019/10/26 00:00:00').getTime();
			// var nowDate = new Date().getTime();
			// var dayIndex = (Math.ceil((nowDate-startDate)/86400000) - 1)%50;
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[3]});
   //          if(roomBot){
   //          	await roomBot.say("🔔🔔今日试骑口号：\n15:00前👉“"+ morningList[dayIndex] +"”\n15:00后👉“"+ afternoonList[dayIndex] +"”"); 
   //          }
   //  	}
   //  }); 
   //  scheduleJob09_54 = schedule.scheduleJob({hour: 9, minute: 54}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var startDate = new Date('2019/10/26 00:00:00').getTime();
			// var nowDate = new Date().getTime();
			// var dayIndex = (Math.ceil((nowDate-startDate)/86400000) - 1)%50;
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[4]});
   //          if(roomBot){
   //          	await roomBot.say("🔔🔔今日试骑口号：\n15:00前👉“"+ morningList[dayIndex] +"”\n15:00后👉“"+ afternoonList[dayIndex] +"”"); 
   //          }
   //  	}
   //  }); 
   //  scheduleJob09_55 = schedule.scheduleJob({hour: 9, minute: 55}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var startDate = new Date('2019/10/26 00:00:00').getTime();
			// var nowDate = new Date().getTime();
			// var dayIndex = (Math.ceil((nowDate-startDate)/86400000) - 1)%50;
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[5]});
   //          if(roomBot){
   //          	await roomBot.say("🔔🔔今日试骑口号：\n15:00前👉“"+ morningList[dayIndex] +"”\n15:00后👉“"+ afternoonList[dayIndex] +"”"); 
   //          }
   //  	}
   //  }); 
    
   //  scheduleJob15_00 = schedule.scheduleJob({hour: 15, minute: 0}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var nowDate = getNowDate();
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[0]});
   //          if(roomBot){
   //          	await roomBot.say("（跟进）当日业绩目标进展：\n日期:" + nowDate + "\n例: 张三, 目标500, 已完成300, 还差200\n例: 李四, 目标400, 已完成400, 还差0\n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日15:00-15:30进行进展接龙-----"); 
   //          }
   //  	}
   //  }); 
   //  scheduleJob15_01 = schedule.scheduleJob({hour: 15, minute: 1}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var nowDate = getNowDate();
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[1]});
   //          if(roomBot){
   //          	await roomBot.say("（跟进）当日业绩目标进展：\n日期:" + nowDate + "\n例: 张三, 目标500, 已完成300, 还差200\n例: 李四, 目标400, 已完成400, 还差0\n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日15:00-15:30进行进展接龙-----"); 
   //          }
   //  	}
   //  }); 
   //  scheduleJob15_02 = schedule.scheduleJob({hour: 15, minute: 2}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var nowDate = getNowDate();
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[2]});
   //          if(roomBot){
   //          	await roomBot.say("（跟进）当日业绩目标进展：\n日期:" + nowDate + "\n例: 张三, 目标500, 已完成300, 还差200\n例: 李四, 目标400, 已完成400, 还差0\n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日15:00-15:30进行进展接龙-----"); 
   //          }
   //  	}
   //  }); 
   //  scheduleJob15_03 = schedule.scheduleJob({hour: 15, minute: 3}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var nowDate = getNowDate();
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[3]});
   //          if(roomBot){
   //          	await roomBot.say("（跟进）当日业绩目标进展：\n日期:" + nowDate + "\n例: 张三, 目标500, 已完成300, 还差200\n例: 李四, 目标400, 已完成400, 还差0\n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日15:00-15:30进行进展接龙-----"); 
   //          }
   //  	}
   //  }); 
   //  scheduleJob15_04 = schedule.scheduleJob({hour: 15, minute: 4}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var nowDate = getNowDate();
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[4]});
   //          if(roomBot){
   //          	await roomBot.say("（跟进）当日业绩目标进展：\n日期:" + nowDate + "\n例: 张三, 目标500, 已完成300, 还差200\n例: 李四, 目标400, 已完成400, 还差0\n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日15:00-15:30进行进展接龙-----"); 
   //          }
   //  	}
   //  }); 
   //  scheduleJob15_05 = schedule.scheduleJob({hour: 15, minute: 5}, async function(){
   //      if(wechat.bot.logonoff()){
		 // 	var nowDate = getNowDate();
			// const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[5]});
   //          if(roomBot){
   //          	await roomBot.say("（跟进）当日业绩目标进展：\n日期:" + nowDate + "\n例: 张三, 目标500, 已完成300, 还差200\n例: 李四, 目标400, 已完成400, 还差0\n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日15:00-15:30进行进展接龙-----"); 
   //          }
   //  	}
   //  }); 
    
  //   scheduleJob21_00 = schedule.scheduleJob({hour: 21, minute: 0}, async function(){
  //       if(wechat.bot.logonoff()){
		//  	var nowDate = getNowDate();
		// 	const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[0]});
		// 	var nowMonth = new Date().getMonth() + 1;
	 //        if(roomBot){
	 //        	await roomBot.say("（晚）当日业绩完成情况接龙：\n日期:" + nowDate + "\n例: 张三, 目标500, 实际550, 成功, 一切正常\n例: 李四, 目标400, 实际300, 失败, 原因\n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日21:00-21:30进行结果接龙-----"); 
	 //        }
		// }
  //   }); 
  //   scheduleJob21_01 = schedule.scheduleJob({hour: 21, minute: 1}, async function(){
  //       if(wechat.bot.logonoff()){
		//  	var nowDate = getNowDate();
		//  	var nowMonth = new Date().getMonth() + 1;
		// 	const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[1]});
	 //        if(roomBot){
	 //        	await roomBot.say("（晚）当日业绩完成情况接龙：\n日期:" + nowDate + "\n例: 张三, 目标500, 实际550, 成功, 一切正常\n例: 李四, 目标400, 实际300, 失败, 原因\n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日21:00-21:30进行结果接龙-----"); 
	 //        }
		// }
  //   });
  //   scheduleJob21_02 = schedule.scheduleJob({hour: 21, minute: 2}, async function(){
  //       if(wechat.bot.logonoff()){
		//  	var nowDate = getNowDate();
		//  	var nowMonth = new Date().getMonth() + 1;
		// 	const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[2]});
	 //        if(roomBot){
	 //        	await roomBot.say("（晚）当日业绩完成情况接龙：\n日期:" + nowDate + "\n例: 张三, 目标500, 实际550, 成功, 一切正常\n例: 李四, 目标400, 实际300, 失败, 原因\n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日21:00-21:30进行结果接龙-----"); 
	 //        }
		// }
  //   });
  //   scheduleJob21_03 = schedule.scheduleJob({hour: 21, minute: 3}, async function(){
  //       if(wechat.bot.logonoff()){
		//  	var nowDate = getNowDate();
		//  	var nowMonth = new Date().getMonth() + 1;
		// 	const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[3]});
	 //        if(roomBot){
	 //        	await roomBot.say("（晚）当日业绩完成情况接龙：\n日期:" + nowDate + "\n例: 张三, 目标500, 实际550, 成功, 一切正常\n例: 李四, 目标400, 实际300, 失败, 原因\n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日21:00-21:30进行结果接龙-----"); 
	 //        }
		// }
  //   });
  //   scheduleJob21_04 = schedule.scheduleJob({hour: 21, minute: 4}, async function(){
  //       if(wechat.bot.logonoff()){
		//  	var nowDate = getNowDate();
		//  	var nowMonth = new Date().getMonth() + 1;
		// 	const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[4]});
	 //        if(roomBot){
	 //        	await roomBot.say("（晚）当日业绩完成情况接龙：\n日期:" + nowDate + "\n例: 张三, 目标500, 实际550, 成功, 一切正常\n例: 李四, 目标400, 实际300, 失败, 原因\n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日21:00-21:30进行结果接龙-----"); 
	 //        }
		// }
  //   });
  //   scheduleJob21_05 = schedule.scheduleJob({hour: 21, minute: 5}, async function(){
  //       if(wechat.bot.logonoff()){
		//  	var nowDate = getNowDate();
		//  	var nowMonth = new Date().getMonth() + 1;
		// 	const roomBot = await wechat.bot.Room.find({topic: dinosaurRoomTopics[5]});
	 //        if(roomBot){
	 //        	await roomBot.say("（晚）当日业绩完成情况接龙：\n日期:" + nowDate + "\n例: 张三, 目标500, 实际550, 成功, 一切正常\n例: 李四, 目标400, 实际300, 失败, 原因\n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日21:00-21:30进行结果接龙-----"); 
	 //        }
		// }
  //   });
    
//  // 运营大数据预警
//  scheduleJob13_01 = schedule.scheduleJob({hour: 13, minute: 1}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	if(ceshiRoomBot){
//		 		getWarningInfo(storeData, ceshiRoomBot, warningString);
//		 	}
//  	}
//  }); 
//  
//  // 运营大数据报喜
//  scheduleJob13_03 = schedule.scheduleJob({hour: 13, minute: 3}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	if(ceshiRoomBot){
//		 		getHappyInfo(storeData, ceshiRoomBot, happyString);
//		 	}
//  	}
//  }); 
//  
//  // 运营大数据新店
//  scheduleJob13_05 = schedule.scheduleJob({hour: 13, minute: 5}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	if(ceshiRoomBot){
//		 		getNewStoreInfo(storeData, ceshiRoomBot, newStoreString);
//		 	}
//  	}
//  }); 
//  
//  scheduleJob16_00 = schedule.scheduleJob({hour: 16, minute: 0}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	var nowDate = new Date().getTime();
//		 	var weekDate = nowDate - 86400000 * 7;
//		 	var towWeekDate = nowDate - 86400000 * 14;
//		 	nowDate = getDateString(nowDate);
//		 	weekDate = getDateString(weekDate);
//		 	towWeekDate = getDateString(towWeekDate);
//		 	var nowSDate = nowDate.sdate;
//		 	var nowEDate = nowDate.edate;
//		 	var weekSDate = weekDate.sdate;
//		 	var weekEDate = weekDate.edate;
//		 	var towWeekSDate = towWeekDate.sdate;
//		 	var towWeekEDate = towWeekDate.edate;
//		 	if(ceshiRoomBot){
//		 		getStoreData(nowSDate, nowEDate, weekSDate, weekEDate,  towWeekSDate, towWeekEDate, 1);
//		 	}
//  	}
//  });
//  
//  // 运营大数据预警
//  scheduleJob16_01 = schedule.scheduleJob({hour: 16, minute: 1}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	if(ceshiRoomBot){
//		 		getWarningInfo(storeData, ceshiRoomBot, warningString);
//		 	}
//  	}
//  }); 
//  
//  // 运营大数据报喜
//  scheduleJob16_03 = schedule.scheduleJob({hour: 16, minute: 3}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	if(ceshiRoomBot){
//		 		getHappyInfo(storeData, ceshiRoomBot, happyString);
//		 	}
//  	}
//  }); 
//  
//  // 运营大数据新店
//  scheduleJob16_05 = schedule.scheduleJob({hour: 16, minute: 5}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	if(ceshiRoomBot){
//		 		getNewStoreInfo(storeData, ceshiRoomBot, newStoreString);
//		 	}
//  	}
//  }); 
    
    // 湿地公园报数
    scheduleJob16_45 = schedule.scheduleJob({hour: 16, minute: 45}, async function(){
    	if(wechat.bot.logonoff()){
		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "汉石桥湿地公园智能化运营群"});
			var nowDate = new Date();
		 	var nowYear = nowDate.getFullYear();
		 	var nowMonth = nowDate.getMonth() + 1;
		 	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
		 	var nowDay = nowDate.getDate();
		 	nowDay = nowDay>9?nowDay:'0'+nowDay;
		 	
		 	var searchStartDate = encodeURI(nowYear + '-' + nowMonth + '-' + nowDay + ' 00:00:00');
		 	var searchEndDate = encodeURI(nowYear + '-' + nowMonth + '-' + nowDay + ' 16:45:00');
		 	if(ceshiRoomBot){
		 		const options = {
					hostname: host,
					path: '/ccsmart/scenicRobot/getScenicIncome?startDate=' + searchStartDate + '&endDate=' + searchEndDate + '&scenicId=119',
					method: 'GET'
				};
				
				var buffers = [];
				var nread = 0;
				const req = https.request(options, (res) => {
				  	res.on('data', (d) => {
					  	buffers.push(d);
						nread += d.length;
					});
					
					res.on('end', () => {
						var buffer = null;
					    switch(buffers.length) {
					        case 0: buffer = new Buffer(0);
					            break;
					        case 1: buffer = buffers[0];
					            break;
					        default:
					            buffer = new Buffer(nread);
					            for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
					                var chunk = buffers[i];
					                chunk.copy(buffer, pos);
					                pos += chunk.length;
					            }
					        break;
					    }
					    var res = JSON.parse(buffer.toString());
					    if(res.success){
					    	var doubleSmallBatteryBikeIncome = res.rows.doubleSmallBatteryBikeIncome;
							doubleSmallBatteryBikeIncome = doubleSmallBatteryBikeIncome?parseFloat(doubleSmallBatteryBikeIncome).toFixed(2):'0.00';
							var doubleBatteryBikeIncome = res.rows.doubleBatteryBikeIncome;
							doubleBatteryBikeIncome = doubleBatteryBikeIncome?parseFloat(doubleBatteryBikeIncome).toFixed(2):'0.00';
							var fourBatteryBikeIncome = res.rows.fourBatteryBikeIncome;
							fourBatteryBikeIncome = fourBatteryBikeIncome?parseFloat(fourBatteryBikeIncome).toFixed(2):'0.00';
							var doubleBatteryShipIncome = res.rows.doubleBatteryShipIncome;
							doubleBatteryShipIncome = doubleBatteryShipIncome?parseFloat(doubleBatteryShipIncome).toFixed(2):'0.00';
							var fourBatteryShipIncome = res.rows.fourBatteryShipIncome;
							fourBatteryShipIncome = fourBatteryShipIncome?parseFloat(fourBatteryShipIncome).toFixed(2):'0.00';
					    	ceshiRoomBot.say('******租赁收入******\n双人小自驾：' + doubleSmallBatteryBikeIncome + '元\n双人电瓶车：' + doubleBatteryBikeIncome + '元\n四人电瓶车：' + fourBatteryBikeIncome + '元\n双人电瓶船：' + doubleBatteryShipIncome + '元\n四人电瓶船：' + fourBatteryShipIncome + '元');
					    }
					})
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
		 	}
    	}
    });
    
//  scheduleJob18_00 = schedule.scheduleJob({hour: 18, minute: 0}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	var nowDate = new Date().getTime();
//		 	var weekDate = nowDate - 86400000 * 7;
//		 	var towWeekDate = nowDate - 86400000 * 14;
//		 	nowDate = getDateString(nowDate);
//		 	weekDate = getDateString(weekDate);
//		 	towWeekDate = getDateString(towWeekDate);
//		 	var nowSDate = nowDate.sdate;
//		 	var nowEDate = nowDate.edate;
//		 	var weekSDate = weekDate.sdate;
//		 	var weekEDate = weekDate.edate;
//		 	var towWeekSDate = towWeekDate.sdate;
//		 	var towWeekEDate = towWeekDate.edate;
//		 	if(ceshiRoomBot){
//		 		getStoreData(nowSDate, nowEDate, weekSDate, weekEDate,  towWeekSDate, towWeekEDate, 1);
//		 	}
//  	}
//  });
//  
//  // 运营大数据预警
//  scheduleJob18_01 = schedule.scheduleJob({hour: 18, minute: 1}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	if(ceshiRoomBot){
//		 		getWarningInfo(storeData, ceshiRoomBot, warningString);
//		 	}
//  	}
//  }); 
//  
//  // 运营大数据报喜
//  scheduleJob18_03 = schedule.scheduleJob({hour: 18, minute: 3}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	if(ceshiRoomBot){
//		 		getHappyInfo(storeData, ceshiRoomBot, happyString);
//		 	}
//  	}
//  }); 
//  
//  // 运营大数据新店
//  scheduleJob18_05 = schedule.scheduleJob({hour: 18, minute: 5}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	if(ceshiRoomBot){
//		 		getNewStoreInfo(storeData, ceshiRoomBot, newStoreString);
//		 	}
//  	}
//  }); 
//  
//  
//  scheduleJob20_00 = schedule.scheduleJob({hour: 20, minute: 0}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	var nowDate = new Date().getTime();
//		 	var weekDate = nowDate - 86400000 * 7;
//		 	var towWeekDate = nowDate - 86400000 * 14;
//		 	nowDate = getDateString(nowDate);
//		 	weekDate = getDateString(weekDate);
//		 	towWeekDate = getDateString(towWeekDate);
//		 	var nowSDate = nowDate.sdate;
//		 	var nowEDate = nowDate.edate;
//		 	var weekSDate = weekDate.sdate;
//		 	var weekEDate = weekDate.edate;
//		 	var towWeekSDate = towWeekDate.sdate;
//		 	var towWeekEDate = towWeekDate.edate;
//		 	if(ceshiRoomBot){
//		 		getStoreData(nowSDate, nowEDate, weekSDate, weekEDate,  towWeekSDate, towWeekEDate, 1);
//		 	}
//  	}
//  });
//  
//  // 运营大数据预警
//  scheduleJob20_01 = schedule.scheduleJob({hour: 20, minute: 1}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	if(ceshiRoomBot){
//		 		getWarningInfo(storeData, ceshiRoomBot, warningString);
//		 	}
//  	}
//  }); 
//  
//  // 运营大数据报喜
//  scheduleJob20_03 = schedule.scheduleJob({hour: 20, minute: 3}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	if(ceshiRoomBot){
//		 		getHappyInfo(storeData, ceshiRoomBot, happyString);
//		 	}
//  	}
//  }); 
//  
//  // 运营大数据新店
//  scheduleJob20_05 = schedule.scheduleJob({hour: 20, minute: 5}, async function(){
//      if(wechat.bot.logonoff()){
//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
//		 	if(ceshiRoomBot){
//		 		getNewStoreInfo(storeData, ceshiRoomBot, newStoreString);
//		 	}
//  	}
//  }); 
	
	
	/********************************** 运营大数据部分 **********************************/
	 
    
    scheduleJob10_00 = schedule.scheduleJob({hour: 10, minute: 0}, async function(){
        if(wechat.bot.logonoff()){ 
//			const roomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
			// var day = new Date().getDate();
			// var weekDay = new Date().getDay();
			// var nowDate = getNowDate();
			// const dinosaurRoom = await wechat.bot.Room.find({topic: dinosaurRoomTopics[0]});
            // if(dinosaurRoom){
            // 	await dinosaurRoom.say("（早）当日业绩目标接龙：\n日期:" + nowDate + "\n例: 张三, 目标500, \n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日10:00-10:30进行目标接龙-----"); 
            // }
//			if(roomBot){
//				// 每月一日核心组信息汇报
//				if(day == 1){
////					await roomBot.say("一月恐龙销售汇总, 比上周增加/减少xxx元,增长/减少 xx%; 前10名名称和业绩, 后5名名称和业绩; 单店比上月增长前10名和业绩和增长比例; 单店比上月下降后5名喝业绩和退后比例");
//					var param = getMonthSearchInfo();
//					const options = {
//						hostname: host,
//						path: '/ccsmart/managerIncome/web/getManagerConsumeStatistical?sdate=' + param.sDate + '&edate=' + param.eDate + '&upsDate=' + param.upSDate + '&upeDate=' + param.upEDate + '&userId=8',
//						method: 'GET'
//					};
//					var buffers = [];
//					var nread = 0;
//					const req = https.request(options, function(res){
//					  res.on('data', function(chunk){
//					  	buffers.push(chunk);
//		    			nread += chunk.length;
//					  });
//					  res.on('end', function(){
//					  	var buffer = null;
//					    switch(buffers.length) {
//					        case 0: buffer = new Buffer(0);
//					            break;
//					        case 1: buffer = buffers[0];
//					            break;
//					        default:
//					            buffer = new Buffer(nread);
//					            for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
//					                var chunk = buffers[i];
//					                chunk.copy(buffer, pos);
//					                pos += chunk.length;
//					            }
//					        break;
//					    }
//					    var resp = JSON.parse(buffer.toString());
//					    var shopList = res.rows;
//					    var totalMoney = 0;
//						var upTotalMoney = 0;
//						var shopContrast;
//						var shopContrastPercent;
//						resp.rows.forEach(function(value, key){
//							if(value.curConsume){
//								var curConsume = parseFloat(value.curConsume);
//								totalMoney += curConsume;
//							}
//							if(value.upConsume){
//								var upConsume = parseFloat(value.upConsume);
//								upTotalMoney += upConsume;
//							}
//					  	});
//					  	
//					  	var contrastMoney = totalMoney - upTotalMoney;
//					  	contrastMoney = parseFloat(contrastMoney).toFixed(2);
//					  	
//					  	// 业绩排序
//						var newShopList = consumeSort(resp);
//			        	var contrastMoneyList = arrSort(newShopList, "contrastMoney");
//			        	contrastMoneyList = contrastMoneyList.filter(function(item, index, array){
//			        		return (item.contrastPercent != 0 && item.curConsume != 0)
//			        	})
//			        	var curConsumeList = arrSort(newShopList, "curConsume");
//			        	curConsumeList = curConsumeList.filter(function(item, index, array){
//			        		return (item.curConsume != 0)
//			        	})
//			        	
//			        	// 业绩前十名名称及业绩
//			        	var topTenString = '===============\n业绩前10名名称和业绩\n===============\n';
//			        	for(var i = 0; i < curConsumeList.length; i++){
//			        		if(i < 10){
//			        			var rankNumber = i + 1;
//			        			topTenString += rankNumber + "." + curConsumeList[i].scenicName + "\n 	上月业绩：" + curConsumeList[i].curConsume + "\n\n"
//			        		}
//			        	}
//			        	
//			        	// 业绩后五名名称及业绩
//			        	var bottomFiveString = '===============\n业绩后5名名称和业绩\n===============\n'; 
//						for(var i = 0; i < curConsumeList.length; i++){
//			        		if(i > curConsumeList.length - 6){
//			        			var rankNumber = i - curConsumeList.length + 6;
//			        			bottomFiveString += rankNumber + "." + curConsumeList[i].scenicName + "\n 	上月业绩：" + curConsumeList[i].curConsume + "\n\n"
//			        		}
//			        	}
//						
//						// 业绩增长前十名名称及业绩
//						var topTenPercentString = '===============\n业绩增长前10名名称和业绩\n===============\n';
//						for(var i = 0; i < contrastMoneyList.length; i++){
//			        		if(i < 10){
//			        			var rankNumber = i + 1;
//			        			topTenPercentString += rankNumber + "." + contrastMoneyList[i].scenicName + "\n 	上月业绩：" + contrastMoneyList[i].curConsume + "\n" + " 	增长比例：" + contrastMoneyList[i].contrastPercent + "%\n\n"
//			        		}
//			        	}
//						
//						// 业绩增长后五名名称及业绩
//						var bottomFivePercentString = '===============\n业绩增长后5名名称和业绩\n===============\n'; 
//						for(var i = 0; i < contrastMoneyList.length; i++){
//			        		if(i > contrastMoneyList.length - 6){
//			        			var rankNumber = i - contrastMoneyList.length + 6;
//			        			bottomFivePercentString += rankNumber + "." + contrastMoneyList[i].scenicName + "\n 	上月业绩：" + contrastMoneyList[i].curConsume + "\n" + " 	增长比例：" + contrastMoneyList[i].contrastPercent + "%\n\n"
//			        		}
//			        	}
//						
//						totalMoney = parseFloat(totalMoney).toFixed(2);
//					  	if(contrastMoney > 0){
//					  		var contrastPercent = parseFloat(contrastMoney / totalMoney).toFixed(2) * 100;
//					  		roomBot.say("月恐龙销售汇总：\n===============\n本月销售额:"+ totalMoney + "元\n比上月增加:" + contrastMoney + "元\n增长百分比:" + contrastPercent + "%\n" + topTenString + bottomFiveString + topTenPercentString + bottomFivePercentString);
//					  	}else if(contrastMoney < 0){
//					  		var contrastPercent = parseFloat(contrastMoney / upTotalMoney).toFixed(2) * 100;
//					  		roomBot.say("月恐龙销售汇总：\n===============\n本月销售额:"+ totalMoney + "元\n比上月减少:" + contrastMoney + "元\n减少百分比:" + contrastPercent + "%\n" + topTenString + bottomFiveString + topTenPercentString + bottomFivePercentString);
//					  	}else{
//					  		roomBot.say("月恐龙销售汇总：\n===============\n本月销售额:"+ totalMoney + "元\n比上月增加:0元\n增加百分比:0%\n" + topTenString + bottomFiveString + topTenPercentString + bottomFivePercentString);
//					  	}
//					  })
//					});
//					
//					req.on('error', function (e) { 
//					    console.log('problem with request: ' + e.message); 
//					}); 
//					   
//					req.end();
//				}
//				
//				// 每周一核心组信息汇报
//				if(weekDay == 1){
//					var param = getWeekSearchInfo();
//					const options = {
//					  	hostname: host,
//					  	path: '/ccsmart/managerIncome/web/getManagerConsumeStatistical?sdate=' + param.sDate + '&edate=' + param.eDate + '&upsDate=' + param.upSDate + '&upeDate=' + param.upEDate + '&userId=8',
//					  	method: 'GET'
//					};
//					var buffers = [];
//					var nread = 0;
//					const req = https.request(options, function(res){
//					  res.on('data', function(chunk){
//					  	buffers.push(chunk);
//		    			nread += chunk.length;
//					  });
//					  res.on('end', function(){
//					  	var buffer = null;
//					    switch(buffers.length) {
//					        case 0: buffer = new Buffer(0);
//					            break;
//					        case 1: buffer = buffers[0];
//					            break;
//					        default:
//					            buffer = new Buffer(nread);
//					            for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
//					                var chunk = buffers[i];
//					                chunk.copy(buffer, pos);
//					                pos += chunk.length;
//					            }
//					        break;
//					    }
//					    var resp = JSON.parse(buffer.toString());
//					    var totalMoney = 0;
//						var upTotalMoney = 0;
//						var shopContrast;
//						var shopContrastPercent;
//						resp.rows.forEach(function(value, key){
//							if(value.curConsume){
//								var curConsume = parseFloat(value.curConsume);
//								totalMoney += curConsume;
//							}
//							if(value.upConsume){
//								var upConsume = parseFloat(value.upConsume);
//								upTotalMoney += upConsume;
//							}
//					  	});
//					  	
//					  	var contrastMoney = totalMoney - upTotalMoney;
//					  	contrastMoney = parseFloat(contrastMoney).toFixed(2);
//						
//						// 业绩排序
//						var newShopList = consumeSort(resp);
//			        	var contrastMoneyList = arrSort(newShopList, "contrastMoney");
//			        	contrastMoneyList = contrastMoneyList.filter(function(item, index, array){
//			        		return (item.contrastPercent != 0 && item.curConsume != 0)
//			        	})
//			        	var curConsumeList = arrSort(newShopList, "curConsume");
//			        	curConsumeList = curConsumeList.filter(function(item, index, array){
//			        		return (item.curConsume != 0)
//			        	})
//			        	
//			        	// 业绩前十名名称及业绩
//			        	var topTenString = '===============\n业绩前10名名称和业绩\n===============\n';
//			        	for(var i = 0; i < curConsumeList.length; i++){
//			        		if(i < 10){
//			        			var rankNumber = i + 1;
//			        			topTenString += rankNumber + "." + curConsumeList[i].scenicName + "\n 	上周业绩：" + curConsumeList[i].curConsume + "\n\n"
//			        		}
//			        	}
//			        	
//			        	// 业绩后五名名称及业绩
//			        	var bottomFiveString = '===============\n业绩后5名名称和业绩\n===============\n'; 
//						for(var i = 0; i < curConsumeList.length; i++){
//			        		if(i > curConsumeList.length - 6){
//			        			var rankNumber = i - curConsumeList.length + 6;
//			        			bottomFiveString += rankNumber + "." + curConsumeList[i].scenicName + "\n 	上周业绩：" + curConsumeList[i].curConsume + "\n\n"
//			        		}
//			        	}
//						
//						// 业绩增长前十名名称及业绩
//						var topTenPercentString = '===============\n业绩增长前10名名称和业绩\n===============\n';
//						for(var i = 0; i < contrastMoneyList.length; i++){
//			        		if(i < 10){
//			        			var rankNumber = i + 1;
//			        			topTenPercentString += rankNumber + "." + contrastMoneyList[i].scenicName + "\n 	上周业绩：" + contrastMoneyList[i].curConsume + "\n" + " 	增长比例：" + contrastMoneyList[i].contrastPercent + "%\n\n"
//			        		}
//			        	}
//						
//						// 业绩增长后五名名称及业绩
//						var bottomFivePercentString = '===============\n业绩增长后5名名称和业绩\n===============\n'; 
//						for(var i = 0; i < contrastMoneyList.length; i++){
//			        		if(i > contrastMoneyList.length - 6){
//			        			var rankNumber = i - curConsumeList.length + 6;
//			        			bottomFivePercentString += rankNumber + "." + contrastMoneyList[i].scenicName + "\n 	上周业绩：" + contrastMoneyList[i].curConsume + "\n" + " 	增长比例：" + contrastMoneyList[i].contrastPercent + "%\n\n"
//			        		}
//			        	}
//						
//						totalMoney = parseFloat(totalMoney).toFixed(2);
//					  	if(contrastMoney > 0){
//					  		var contrastPercent = parseInt(parseFloat(contrastMoney / totalMoney).toFixed(2) * 100);
//					  		roomBot.say("周恐龙销售汇总：\n===============\n本周销售额:"+ totalMoney + "元\n比上周增加:" + contrastMoney + "元\n增长百分比:" + contrastPercent + "%\n" + topTenString + bottomFiveString + topTenPercentString + bottomFivePercentString);
//					  	}else if(contrastMoney < 0){
//					  		var contrastPercent = parseInt(parseFloat(contrastMoney / upTotalMoney).toFixed(2) * 100);
//					  		roomBot.say("周恐龙销售汇总：\n===============\n本周销售额:"+ totalMoney + "元\n比上周减少:" + contrastMoney + "元\n减少百分比:" + contrastPercent + "%\n" + topTenString + bottomFiveString + topTenPercentString + bottomFivePercentString);
//					  	}else{
//					  		roomBot.say("周恐龙销售汇总：\n===============\n本周销售额:"+ totalMoney + "元\n比上周增加:0元\n增加百分比:0%\n" + topTenString + bottomFiveString + topTenPercentString + bottomFivePercentString);
//					  	}
//					  })
//					});
//					
//					req.on('error', function (e) { 
//					    console.log('problem with request: ' + e.message); 
//					}); 
//					   
//					req.end();
//				}
//			}
        }
    }); 
    
    scheduleJob10_01 = schedule.scheduleJob({hour: 10, minute: 1}, async function(){
   //      if(wechat.bot.logonoff()){
   //      	var nowDate = getNowDate();
			// const dinosaurRoom = await wechat.bot.Room.find({topic: dinosaurRoomTopics[1]});
   //          if(dinosaurRoom){
   //          	await dinosaurRoom.say("（早）当日业绩目标接龙：\n日期:" + nowDate + "\n例: 张三, 目标500, \n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日10:00-10:30进行目标接龙-----"); 
   //          }
   //  	}
    });
    scheduleJob10_02 = schedule.scheduleJob({hour: 10, minute: 2}, async function(){
   //      if(wechat.bot.logonoff()){
   //      	var nowDate = getNowDate();
			// const dinosaurRoom = await wechat.bot.Room.find({topic: dinosaurRoomTopics[2]});
   //          if(dinosaurRoom){
   //          	await dinosaurRoom.say("（早）当日业绩目标接龙：\n日期:" + nowDate + "\n例: 张三, 目标500, \n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日10:00-10:30进行目标接龙-----"); 
   //          }
   //  	}
    });
    scheduleJob10_03 = schedule.scheduleJob({hour: 10, minute: 3}, async function(){
   //      if(wechat.bot.logonoff()){
   //      	var nowDate = getNowDate();
			// const dinosaurRoom = await wechat.bot.Room.find({topic: dinosaurRoomTopics[3]});
   //          if(dinosaurRoom){
   //          	await dinosaurRoom.say("（早）当日业绩目标接龙：\n日期:" + nowDate + "\n例: 张三, 目标500, \n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日10:00-10:30进行目标接龙-----"); 
   //          }
   //  	}
    });
    scheduleJob10_04 = schedule.scheduleJob({hour: 10, minute: 4}, async function(){
   //      if(wechat.bot.logonoff()){
   //      	var nowDate = getNowDate();
			// const dinosaurRoom = await wechat.bot.Room.find({topic: dinosaurRoomTopics[4]});
   //          if(dinosaurRoom){
   //          	await dinosaurRoom.say("（早）当日业绩目标接龙：\n日期:" + nowDate + "\n例: 张三, 目标500, \n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日10:00-10:30进行目标接龙-----"); 
   //          }
   //  	}
    });
    scheduleJob10_05 = schedule.scheduleJob({hour: 10, minute: 5}, async function(){
   //      if(wechat.bot.logonoff()){
   //      	var nowDate = getNowDate();
			// const dinosaurRoom = await wechat.bot.Room.find({topic: dinosaurRoomTopics[5]});
   //          if(dinosaurRoom){
   //          	await dinosaurRoom.say("（早）当日业绩目标接龙：\n日期:" + nowDate + "\n例: 张三, 目标500, \n接龙：↓\n1)\n2)\n3)\n4)\n5)\n6)\n7)\n8)\n-----当班人员每日10:00-10:30进行目标接龙-----"); 
   //          }
   //  	}
    });
	
	// scheduleJob11_50 = schedule.scheduleJob({hour: 11, minute: 50}, async function(){
	//     if(wechat.bot.logonoff()){
	    	
	// 	}
	// });
    

 
    scheduleJob21_40 = schedule.scheduleJob({hour: 21, minute: 40}, async function(){
    	// 核心群每日恐龙简报
    	if(wechat.bot.logonoff()){
		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享-测试"});
		 	var totalMoney = 0;
		 	var weekTotalMoney = 0;
		 	var toWeekTotalMoney = 0;
		 	var nowDate = new Date().getTime();
		 	var weekDate = nowDate - 86400000 * 7;
		 	var towWeekDate = nowDate - 86400000 * 14;
		 	var nowSDate = getDateString(nowDate).sdate;
		 	var nowEDate = getDateString(nowDate).edate;
		 	var weekSDate = getDateString(weekDate).sdate;
		 	var weekEDate = getDateString(weekDate).edate;
		 	var towWeekSDate = getDateString(towWeekDate).sdate;
		 	var towWeekEDate = getDateString(towWeekDate).edate;
		 	if(ceshiRoomBot){
	 			getWeekTotalMoney(nowSDate, nowEDate, weekSDate,  weekEDate, towWeekSDate, towWeekEDate, 1, ceshiRoomBot);
		 	}
    	}
    });
    
    scheduleJob_55 = schedule.scheduleJob('0 55 * * * *', async function(){
    	if(wechat.bot.logonoff()){
				
    	}
    });
	
	scheduleJob_One = schedule.scheduleJob('0 1 * * * *', async function(){
		var nowDate = new Date();
		var year = nowDate.getFullYear();
		var month = nowDate.getMonth() + 1;
		month = month>9?month:"0"+month;
		var eday = nowDate.getDate()>9?nowDate.getDate():"0"+nowDate.getDate();
		var hour = nowDate.getHours();
		hour = hour>9?hour:"0"+hour;
		var edate = year+'-'+month+'-'+eday+' '+hour+':00';
		var sdate = year+'-'+month+'-'+eday+' 00:00:00';
		var searchSDate = encodeURI(sdate);
		var searchEDate = encodeURI(edate);
		if(parseInt(hour) == 17){
			const fhlbszRoom = await wechat.bot.Room.find({topic: "凤凰岭报数组"});
			fhl.getCheckTicketInfo('TgsEpcFhl', 'TGN20201228152933458', fhlbszRoom, 'WEB');
			boss.getCheckTicketInfo('TgsEpcFhl', 'TGN20201228152933458', fhlbszRoom, 'XC');
		}
		
		if(parseInt(hour) >= 9 && parseInt(hour) <= 17){
			const xwhdpcRoom = await wechat.bot.Room.find({topic: "玄武湖电瓶车服务组"});
			xwh.getPaperInfo(xwhdpcRoom);
		}
	});
	
	schedule.scheduleJob('2 1 * * * *', async function(){
		var nowDate = new Date();
		var hour = nowDate.getHours();
		if(parseInt(hour) == 17){
			const fhlbszRoom = await wechat.bot.Room.find({topic: "凤凰岭报数组"});
			boss.getBossYYInfo('TgsEpcFhl', 'TGN20201228152933458', fhlbszRoom);
			fhl.getBossInfo('TgsEpcFhl', 'TGN20201228152933458', fhlbszRoom);
			boss.getAllTicketsBuyInfo('TgsEpcFhl', 'TGN20201228152933458', fhlbszRoom);
		}
	});
	
	scheduleJob_Two = schedule.scheduleJob('0 2 * * * *', async function(){
		var nowDate = new Date();
		var year = nowDate.getFullYear();
		var month = nowDate.getMonth() + 1;
		month = month>9?month:"0"+month;
		var eday = nowDate.getDate()>9?nowDate.getDate():"0"+nowDate.getDate();
		var hour = nowDate.getHours();
		hour = hour>9?hour:"0"+hour;
		var edate = year+'-'+month+'-'+eday+' '+hour+':00';
		var sdate = year+'-'+month+'-'+eday+' 00:00:00';
		var searchSDate = encodeURI(sdate);
		var searchEDate = encodeURI(edate);
		if(parseInt(hour) >= 9 && parseInt(hour) <= 17){
			
		}
	});
	
	scheduleJob_Five = schedule.scheduleJob('0 5 * * * *', async function(){
		var nowDate = new Date();
		var hour = nowDate.getHours();
		if(parseInt(hour) == 21){
			const xwhdpcbszRoom = await wechat.bot.Room.find({topic: "玄武湖电瓶车报数组"});
			xwh.getXwhdpcInfo(xwhdpcbszRoom);
		}
	});
	
    scheduleJob_hour = schedule.scheduleJob('0 0 * * * *', async function(){
    	if(wechat.bot.logonoff()){
	    	var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth() + 1;
			month = month>9?month:"0"+month;
			var eday = nowDate.getDate()>9?nowDate.getDate():"0"+nowDate.getDate();
			var hour = nowDate.getHours();
			hour = hour>9?hour:"0"+hour;
			var edate = year+'-'+month+'-'+eday+' '+hour+':00';
			var sdate = year+'-'+month+'-'+eday+' 00:00:00';
			var searchSDate = encodeURI(sdate);
			var searchEDate = encodeURI(edate);
		
			// 园博园报数群
			if(parseInt(hour) >= 7 && parseInt(hour) < 20){
				const ybybsRoom = await wechat.bot.Room.find({topic: "园博园游客服务部门区报数群"});
				boss.getBrakeData('TgsEpcYby', 'TGN20201210095942945', ybybsRoom);
				yby.getCheckTicketInfo('TgsEpcYby', 'TGN20201210095942945', ybybsRoom);
				boss.getBossYYInfo('TgsEpcYby', 'TGN20201210095942945', ybybsRoom);
				// yby.getYbyOtaInfo(ybybsRoom);
				if(parseInt(hour) == 11){
					yby.getTicketsIncome(ybybsRoom);
				}
				
				const bgslgyRoom = await wechat.bot.Room.find({topic: "北宫森林公园报数组"});
				boss.getBossInfo('TgsEpcBgslgy', 'TGN20220727162132879', bgslgyRoom);
				boss.getBossYYInfo('TgsEpcBgslgy', 'TGN20220727162132879', bgslgyRoom);
				
				const ybycsRoom = await wechat.bot.Room.find({topic: "园博园创森报数组"});
				ybycs.getCheckTicketNumberInfo(ybycsRoom);
				ybycs.getYYInfo(ybycsRoom);
			}
			
			// 园博园记录总入园人数
			if(parseInt(hour) == 19 || parseInt(hour) == 20 || parseInt(hour) == 21 || parseInt(hour) == 22){
				yby.writeTotalPeople();
			}
			

			//23点清零玄武湖机器人开锁次数
			if(parseInt(hour) == 23){
				// 玄武湖
				var xwhData = {"jfm":0,"lz":0,"tld":0,"xwm":0,"xwmb":0,"hhyy":0,"hpm":0,"czm":0,"yg":0,"fq":0,"gpd":0,"hz":0,"tldx":0};
				let path = require('path');
				fs.writeFile(path.resolve(__dirname, './jsonData/xwhOpen.json'), JSON.stringify(xwhData),function(err){
					if(err){
						console.error(err);
						return;
					}
				})
				var ymyData = {"boatOpen": 0,"bikeOpen": 0};
				fs.writeFile(path.resolve(__dirname, './jsonData/ymyOpen.json'), JSON.stringify(ymyData),function(err){
					if(err){
						console.error(err);
						return;
					}
				})
				const options = {
					hostname: '47.94.82.166',
					port: 3001,
					path: '/datav/xwh/clearBoatOpenInfo',
					method: 'GET'
				};
				const req = http.request(options, (res) => {
					res.on('data', (d) => {
						
					});
				});
				
				req.on('error', (e) => {
				  console.error(`problem with request: ${e.message}`);
				});
				
				req.end();
				
				// 云龙湖
				var ylhData = {"xhw": 0,"kybg": 0,"lzsj": 0,"nhyh": 0,"jyq": 0,"dq": 0,"csld": 0,"szg": 0,"yyt": 0,"sgt": 0};
				fs.writeFile(path.resolve(__dirname, './jsonData/ylhOpen.json'), JSON.stringify(ylhData),function(err){
					if(err){
						console.error(err);
						return;
					}
				})	
			}
		
			// 什刹海报数
			// if(parseInt(hour) == 12 || parseInt(hour) == 17 || parseInt(hour) == 19 || parseInt(hour) == 21){
			// 	const schbszRoom = await wechat.bot.Room.find({topic: "什刹海报数组"});
			// 	// boss.getTicketInfo('TgsEpcSch', 'TGN20201214115631115', 'WEB', schbszRoom);
			// 	// boss.getTicketInfo('TgsEpcSch', 'TGN20201214175748615', 'WEB', schbszRoom);
			// 	boss.getBossInfo('TgsEpcSch', 'TGN20201214115631115', schbszRoom);
			// 	boss.getBossInfo('TgsEpcSch', 'TGN20201214175748615', schbszRoom);
			// }
		}
    });
	
	// 鲜花港水上公园预约报数
	schedule.scheduleJob('2 0 * * * *', async function(){
		var hour = new Date().getHours();
		// 鲜花港水上公园预约报数
		if(parseInt(hour) >= 9 && parseInt(hour) <= 17){
			// 鲜花港自营票务
			const xhgzypwbszRoom = await wechat.bot.Room.find({topic: "鲜花港自营票务报数组"});
			xhg.getPeopleInfo('TgsEpcXhg', 'TGN20210628140233051', xhgzypwbszRoom);
			boss.getBossYYInfo('TgsEpcXhg', 'TGN20210628140233051', xhgzypwbszRoom);
			boss.getBossYYInfo('TgsEpcXhg', 'TGN20210629121602397', xhgzypwbszRoom);
		}
		if(parseInt(hour) >= 9 && parseInt(hour) <= 18){
			// 鲜花港票务对象群
			const xhgpwdxqRoom = await wechat.bot.Room.find({topic: "鲜花港票务对象群"});
			boss.getBossInfo('TgsEpcXhg', 'TGN20210628140233051', xhgpwdxqRoom);
			boss.getTicketInfo('TgsEpcXhg', 'TGN20210628140233051', 'WEB', xhgpwdxqRoom);
			// boss.getBossInfo('TgsEpcXhg', 'TGN20210629121602397', xhgpwdxqRoom, 1);
			boss.getTicketInfo('TgsEpcXhg', 'TGN20210629121602397', 'WEB', xhgpwdxqRoom);
			xhg.getBxjnhInfo(xhgpwdxqRoom);
			// xhg.getXqIncome(xhgpwdxqRoom);
			// boss.getBossInfo('TgsEpcXhg', 'TGN20211210160317254', xhgpwdxqRoom, 1);
			// xhg.getBsxmIncome(xhgpwdxqRoom);
		}
	})
	
	// 狄仁杰、云龙湖、南北湖
	schedule.scheduleJob('4 0 * * * *', async function(){
		var hour = new Date().getHours();
		
		if(parseInt(hour) >= 9 && parseInt(hour) <= 18){
			const drjgyRoom = await wechat.bot.Room.find({topic: "狄仁杰文化园预约服务组"});
			// 狄公故居
			boss.getBossYYInfo('TgsEpcTydrj', 'TGN20201125191936690', drjgyRoom);
			boss.getBossPeoPleInfo('TgsEpcTydrj', 'TGN20201125191936690', drjgyRoom);
			// 狄公公祠
			boss.getBossYYInfo('TgsEpcTydrj', 'TGN20201125191927875', drjgyRoom);
			boss.getBossPeoPleInfo('TgsEpcTydrj', 'TGN20201125191927875', drjgyRoom);
		}
		
		if(parseInt(hour) >= 9 && parseInt(hour) <= 19){
			// 云龙湖游船报数组
			const ylhzjcbszRoom = await wechat.bot.Room.find({topic: "云龙湖游船运营报数组"});
			ylh.getylhInfo(ylhzjcbszRoom);
			
			// 云龙湖电瓶车报数组
			const ylhdpcbszRoom = await wechat.bot.Room.find({topic: "云龙湖电瓶车报数组"});
			ylh.ylhdpcInfo(ylhdpcbszRoom);
		}
	})
	
	// 南湖、圆明园
	schedule.scheduleJob('6 0 * * * *', async function(){
		var hour = new Date().getHours();
		
		// 圆明园
		if(parseInt(hour) == 12 || parseInt(hour) == 16){
			const zjsbszRoom = await wechat.bot.Room.find({topic: "正觉寺报数组"});
			boss.getTicketInfo('TgsEpcYmy', 'TGN20201125101904070', 'MINI', zjsbszRoom);
			boss.getBossYYInfo('TgsEpcYmy', 'TGN20201125101904070', zjsbszRoom);
		}
	})
	
	// 野鸭湖、玄武湖、雁栖湖
	schedule.scheduleJob('8 0 * * * *', async function(){
		var hour = new Date().getHours();
		if(parseInt(hour) == 13 || parseInt(hour) == 16 || parseInt(hour) == 17){
			const xwhbszRoom = await wechat.bot.Room.find({topic: "玄武湖报数组"});
			xwh.getxwhInfo('hd.smart-ideas.com.cn', xwhbszRoom);
		}
		
		if(parseInt(hour) == 13 || parseInt(hour) == 16){
			const yyhbszRoom = await wechat.bot.Room.find({topic: "野鸭湖自行车报数组"});
			yyh.getyyhInfo('lease.smart-ideas.com.cn',yyhbszRoom);
		}
		
		
		if(parseInt(hour) >= 9 && parseInt(hour) < 21){
			const xwhdpcbszRoom = await wechat.bot.Room.find({topic: "玄武湖电瓶车报数组"});
			xwh.getXwhdpcInfo(xwhdpcbszRoom);
			// const yqhdpcbszRoom = await wechat.bot.Room.find({topic: "雁栖湖电瓶车报数组"});
			// yqh.getYqhdpcInfo(yqhdpcbszRoom);
		}
	})
	
	schedule.scheduleJob('10 0 * * * *', async function(){
		var hour = new Date().getHours();
		// 园博园预约报数
		if(parseInt(hour) == 17){
			// const ybympdzRoom = await wechat.bot.Room.find({topic: "园博园门票对账组"});
			// boss.getCheckTicketInfo('TgsEpcYby', 'TGN20201210095942945', ybympdzRoom);
			// boss.getBossYYInfo('TgsEpcYby', 'TGN20201210095942945', ybympdzRoom);
		}
	})
	
	schedule.scheduleJob('12 0 * * * *', async function(){
		var hour = new Date().getHours();
		// 南湖
		if(parseInt(hour) == 12 || parseInt(hour) == 17){
			const nhzxcbszRoom = await wechat.bot.Room.find({topic: "唐山南湖自行车报数组"});
			nh.getIncome(nhzxcbszRoom, 'bike');
		}
	})
	
	schedule.scheduleJob('14 0 * * * *', async function(){
		var hour = new Date().getHours();
		// 南湖
		if(parseInt(hour) == 12 || parseInt(hour) == 17){
			// const nhzjcbszRoom = await wechat.bot.Room.find({topic: "唐山南湖游船报数组"});
			// nh.getIncome(nhzjcbszRoom, 'ship');
		}
	})
	
	schedule.scheduleJob('16 0 * * * *', async function(){
		var hour = new Date().getHours();
		// 南湖
		if(parseInt(hour) == 12 || parseInt(hour) == 17){
			const nhdpcbszRoom = await wechat.bot.Room.find({topic: "唐山南湖电瓶车报数组"});
			nh.getIncome(nhdpcbszRoom, 'battery');
		}
	})
	
	schedule.scheduleJob('18 0 * * * *', async function(){
		var hour = new Date().getHours();
		if(parseInt(hour) == 12){
			const ymybszRoom = await wechat.bot.Room.find({topic: "圆明园报数组"});
			getymyInfo('api.smart-ideas.com.cn', ymybszRoom);
			boss.getTicketInfo('TgsEpcYmy', 'TGN20201125101904070', 'MINI', ymybszRoom);
			boss.getBossYYInfo('TgsEpcYmy', 'TGN20201125101904070', ymybszRoom);
		}
	})
	
	schedule.scheduleJob('20 0 * * * *', async function(){
		var hour = new Date().getHours();
		if(parseInt(hour) >= 9 && parseInt(hour) <= 19){
			// 南北湖运营报数组
			const nbhyybszRoom = await wechat.bot.Room.find({topic: "南北湖游船运营报数组"});
			nbh.getnbhInfo(nbhyybszRoom);
		}
		if(parseInt(hour) == 16){
			const nbhphtbszRoom = await wechat.bot.Room.find({topic: "南北湖皮划艇运营报数组"});
			nbh.getnbhPhtInfo(nbhphtbszRoom);		
				
			const nbhdpcbszRoom = await wechat.bot.Room.find({topic: "南北湖电瓶车运营报数组"});
			nbh.getnbhDpcInfo(nbhdpcbszRoom);	
		}
	})
	
	schedule.scheduleJob('22 0 * * * *', async function(){
		var hour = new Date().getHours();
		if(parseInt(hour) >= 7 && parseInt(hour) < 20){
			const ybytyRoom = await wechat.bot.Room.find({topic: "北京园博园数据通用群（预约数）"});
			yby.getCheckTicketInfo('TgsEpcYby', 'TGN20201210095942945', ybytyRoom);
			boss.getBossYYInfo('TgsEpcYby', 'TGN20201210095942945', ybytyRoom);
		}
		
		// 水上公园雪世界报数组
		// if(parseInt(hour) >= 9 && parseInt(hour) < 19){
		// 	const ssgyxsjRoom = await wechat.bot.Room.find({topic: '水上公园雪世界报数组'});
		// 	ssgy.getIncome(ssgyxsjRoom);
		// 	ssgy.getXsjSzIncome(ssgyxsjRoom);
		// 	boss.getCheckTicketInfo('TgsEpcSsgy', 'TGN20211201163921241', ssgyxsjRoom);
		// }
	})
	
	schedule.scheduleJob('24 0 * * * *', async function(){
		var hour = new Date().getHours();
		// 鲜花港水上公园预约报数
		if(parseInt(hour) >= 9 && parseInt(hour) <= 17){
			const ssgybszRoom = await wechat.bot.Room.find({topic: "水上公园新票务报数组"});
			boss.getBossPeoPleInfo('TgsEpcSlfz', 'TGN20200907203336045', ssgybszRoom);
			boss.getBossYYInfo('TgsEpcSlfz', 'TGN20200907203336045', ssgybszRoom);
			ssgy.getVxIncome(ssgybszRoom);
			boss.getTicketInfo('TgsEpcSlfz', 'TGN20200907203336045', '', ssgybszRoom);
		}
		
		if(parseInt(hour) == 12 || parseInt(hour) == 17 || parseInt(hour) == 21){
			const xtybybszRoom = await wechat.bot.Room.find({topic: "邢台园博园智慧交通报数组"});
			xtyby.getxtybyInfo('rent.smart-ideas.com.cn', xtybybszRoom);
			xtyby.xtybydpcInfo(xtybybszRoom);
		}
		
		if(parseInt(hour) == 18){
			const yqhbszRoom = await wechat.bot.Room.find({topic: "雁栖湖报数组"});
			yqh.getOpenNumber('api.smart-ideas.com.cn',yqhbszRoom);
		}
	})
	
	schedule.scheduleJob('*/5 * * * * *', async function(){
		if(wechat.bot.logonoff()){
			var nowSeconds = new Date().getSeconds();
			if(nowSeconds == '0'){
				xwh.writeOutlineInfo('jfm');
			}else if(nowSeconds == '5'){
				xwh.writeOutlineInfo('lz');
			}else if(nowSeconds == '10'){
				xwh.writeOutlineInfo('xwmn');
			}else if(nowSeconds == '15'){
				xwh.writeOutlineInfo('xwmb');
			}else if(nowSeconds == '20'){
				xwh.writeOutlineInfo('tld');
			}else if(nowSeconds == '25'){
				xwh.writeOutlineInfo('hhyy');
			}else if(nowSeconds == '30'){
				xwh.writeOutlineInfo('hpm');
			}else if(nowSeconds == '35'){
				xwh.writeOutlineInfo('czm');
			}else if(nowSeconds == '40'){
				xwh.writeOutlineInfo('yg');
			}else if(nowSeconds == '45'){
				xwh.writeOutlineInfo('fq');
			}else if(nowSeconds == '50'){
				xwh.writeOutlineInfo('gpd');
			}else if(nowSeconds == '55'){
				xwh.writeOutlineInfo('hz');
			}
		}
	});
    
    scheduleJob_halfHour = schedule.scheduleJob('0 30 * * * *', async function(){
    	if(wechat.bot.logonoff()){
    		var nowDate = new Date();
			var hour = nowDate.getHours()>9?nowDate.getHours():"0"+nowDate.getHours();
			if(parseInt(hour) >= 7 && parseInt(hour) < 20){
				const ybybsRoom = await wechat.bot.Room.find({topic: "园博园游客服务部门区报数群"});
				boss.getBrakeData('TgsEpcYby', 'TGN20201210095942945', ybybsRoom);
				yby.getCheckTicketInfo('TgsEpcYby', 'TGN20201210095942945', ybybsRoom);
				boss.getBossYYInfo('TgsEpcYby', 'TGN20201210095942945', ybybsRoom);
				// yby.getYbyOtaInfo(ybybsRoom);
				if(parseInt(hour) == 11){
					yby.getTicketsIncome(ybybsRoom);
				}
			}
    	}
    });
	
	schedule.scheduleJob('2 30 * * * *', async function(){
		var hour = new Date().getHours();
		if(parseInt(hour) == 8){
			const fhlbszRoom = await wechat.bot.Room.find({topic: "凤凰岭报数组"});
			// const xhgcwzRoom = await wechat.bot.Room.find({topic: "鲜花港财务组"});
			boss.getBossYYInfo('TgsEpcFhl', 'TGN20201228152933458', fhlbszRoom);
			fhl.getBossInfo('TgsEpcFhl', 'TGN20201228152933458', fhlbszRoom);
			boss.getCheckTicketInfo('TgsEpcFhl', 'TGN20201228152933458', fhlbszRoom);
			boss.getAllTicketsBuyInfo('TgsEpcFhl', 'TGN20201228152933458', fhlbszRoom);
		}
	})
	
	schedule.scheduleJob('4 30 * * * *', async function(){
		var hour = new Date().getHours();
		if(parseInt(hour) == 17 || parseInt(hour) == 19){
			const bhbszRoom = await wechat.bot.Room.find({topic: "北海报数组"});
			const xwhbszRoom = await wechat.bot.Room.find({topic: "玄武湖报数组"});
			bh.getOpenNumber('api.smart-ideas.com.cn',bhbszRoom);
			xwh.getxwhInfo('hd.smart-ideas.com.cn', xwhbszRoom);
		}
		
		if(parseInt(hour) == 20){
			const yyhbszRoom = await wechat.bot.Room.find({topic: "野鸭湖自行车报数组"});
			yyh.getyyhInfo('lease.smart-ideas.com.cn',yyhbszRoom);
		}
	})
	
	schedule.scheduleJob('6 30 * * * *', async function(){
		var hour = new Date().getHours();
		if(parseInt(hour) == 19){
			const nhzxcbszRoom = await wechat.bot.Room.find({topic: "唐山南湖自行车报数组"});
			nh.getIncome(nhzxcbszRoom, 'bike');
		}
	})
	
	schedule.scheduleJob('8 30 * * * *', async function(){
		var hour = new Date().getHours();
		if(parseInt(hour) == 17 || parseInt(hour) == 19){
			const ymybszRoom = await wechat.bot.Room.find({topic: "圆明园报数组"});
			getymyInfo('api.smart-ideas.com.cn', ymybszRoom);
			boss.getTicketInfo('TgsEpcYmy', 'TGN20201125101904070', 'MINI', ymybszRoom);
			boss.getBossYYInfo('TgsEpcYmy', 'TGN20201125101904070', ymybszRoom);
			if(parseInt(hour) == 19){
				const nhdpcbszRoom = await wechat.bot.Room.find({topic: "唐山南湖电瓶车报数组"});
				nh.getIncome(nhdpcbszRoom, 'battery');
			}
		}
		
		if(parseInt(hour) == 18 || parseInt(hour) == 17 || parseInt(hour) == 19){
			const yqhbszRoom = await wechat.bot.Room.find({topic: "雁栖湖报数组"});
			yqh.getOpenNumber('api.smart-ideas.com.cn',yqhbszRoom);
		}
	})
	
	schedule.scheduleJob('10 30 * * * *', async function(){
		var hour = new Date().getHours();
		if(parseInt(hour) >= 9 && parseInt(hour) <= 21){
			if(parseInt(hour) <= 17){
				const xwhdpcRoom = await wechat.bot.Room.find({topic: "玄武湖电瓶车服务组"});
				xwh.getPaperInfo(xwhdpcRoom);
			}
			const xwhdpcbszRoom = await wechat.bot.Room.find({topic: "玄武湖电瓶车报数组"});
			xwh.getXwhdpcInfo(xwhdpcbszRoom);
		}
		
		if(parseInt(hour) == 19){
			const nhzjcbszRoom = await wechat.bot.Room.find({topic: "唐山南湖游船报数组"});
			nh.getIncome(nhzjcbszRoom, 'ship');
		}
	})
	
	schedule.scheduleJob('12 30 * * * *', async function(){
		var hour = new Date().getHours();
		if(parseInt(hour) == 8 || parseInt(hour) == 15 || parseInt(hour) == 17){
			const room = await wechat.bot.Room.find({topic: "财务统计群"});
			boss.getBossInfo('TgsEpcSlfz', 'TGN20200907203306267', room);
			boss.getBossInfo('TgsEpcSlfz', 'TGN20200907203336045', room);
			if(parseInt(hour == 8)){
				getWxInfo('ssgy', host1, room);
				// getWxInfo('iotsmart', host1, xhgcwzRoom);
			}
		}
	})
	
	schedule.scheduleJob('14 30 * * * *', async function(){
		var hour = new Date().getHours();
		if(parseInt(hour) == 16){
			const xhgyyRoom = await wechat.bot.Room.find({topic: "鲜花港运营数据组"});
			// 门票简报
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth() + 1;
			month = month>9?month:"0"+month;
			var eday = nowDate.getDate()>9?nowDate.getDate():"0"+nowDate.getDate();
			var edate = year+'-'+month+'-'+eday+' 16:30';
			var nowDateString = nowDate.getTime() - 60 * 60 * 24 * 1000;
			var sdateString = new Date(nowDateString);
			var sYear = sdateString.getFullYear();
			var sMonth = sdateString.getMonth() + 1;
			sMonth = sMonth>9?sMonth:'0'+sMonth;
			var sDay = sdateString.getDate();
			sDay = sDay>9?sDay:'0'+sDay;
			var sdate = sYear + '-' + sMonth + '-' + sDay + ' 16:30';
			var searchSdate = encodeURI(sdate);
			var searchEdate = encodeURI(edate);
			// 小程序门票
			getWXTickets(searchSdate, searchEdate, xhgyyRoom, sdate, edate);
			// POS收入
			setTimeout(function(){
				getPosIncome(searchSdate, searchEdate, xhgyyRoom, sdate, edate);
			}, 1000);
			// 二维码收入
			setTimeout(function(){
				getQrIncome(searchSdate, searchEdate, xhgyyRoom, sdate, edate);
			}, 2000);
			// 设备租赁收入
			setTimeout(function(){
				getDeviceIncome(searchSdate, searchEdate, xhgyyRoom, sdate, edate);
			}, 3000);
		}
	})
	
	schedule.scheduleJob('16 30 * * * *', async function(){
		var hour = new Date().getHours();
		if(parseInt(hour) == 11 || parseInt(hour) == 16 || parseInt(hour) == 19){
			const schbszRoom = await wechat.bot.Room.find({topic: "三海运营报数组"});
			var enterpriseCode = 'TgsEpcSh';
			var ticketGroupNum = 'TGN20211223142734998';
			// sch.getCheckTicketInfo(enterpriseCode, ticketGroupNum, schbszRoom);
			// boss.getBossYYInfo(enterpriseCode, ticketGroupNum, schbszRoom);
			sch.getPosIncome(schbszRoom);
			// sch.getLeaseInfo(schbszRoom);
		}
	})
	
	schedule.scheduleJob('0 31 * * * *', async function(){
		var hour = new Date().getHours();
		if(parseInt(hour) == 8){
			// const ybympdzRoom = await wechat.bot.Room.find({topic: "园博园门票对账组"});
			// boss.getCheckTicketInfo('TgsEpcYby', 'TGN20201210095942945', ybympdzRoom);
			// boss.getBossYYInfo('TgsEpcYby', 'TGN20201210095942945', ybympdzRoom);
		}
	})
	
	schedule.scheduleJob('40 * * * * *', async function(){
		// 什刹海记录峰值
		// let hour = new Date().getHours();
		// let minutes = new Date().getMinutes();
		// if(hour >= 11 && hour < 16){
		// 	if(hour == 15 && minutes > 30){
				
		// 	}else{
		// 		if(minutes % 5 == 0){
		// 			const options = {
		// 				hostname: 'node.smart-ideas.com.cn',
		// 				port: '3001',
		// 				path: '/datav/sch/writeIcePeople',
		// 				method: 'GET'
		// 			};
					
		// 			const req = http.request(options, (res1) => {
		// 				res1.on('data', (d) => {
							
		// 				});
		// 			});
					
		// 			req.end();
		// 		}
		// 	}
		// }
	})
	
	//  scheduleJob21_31 = schedule.scheduleJob({hour: 21, minute: 31}, async function(){
	//  	// 核心群每日恐龙简报
	//  	if(wechat.bot.logonoff()){
	//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
	//		 	var totalMoney = 0;
	//		 	var weekTotalMoney = 0;
	//		 	var toWeekTotalMoney = 0;
	//		 	var nowDate = new Date().getTime();
	//		 	var weekDate = nowDate - 86400000 * 7;
	//		 	var towWeekDate = nowDate - 86400000 * 14;
	//		 	var nowSDate = getDateString(nowDate).sdate;
	//		 	var nowEDate = getDateString(nowDate).edate;
	//		 	var weekSDate = getDateString(weekDate).sdate;
	//		 	var weekEDate = getDateString(weekDate).edate;
	//		 	var towWeekSDate = getDateString(towWeekDate).sdate;
	//		 	var towWeekEDate = getDateString(towWeekDate).edate;
	//		 	if(ceshiRoomBot){
	//	 			getWeekTotalMoney(nowSDate, nowEDate, weekSDate,  weekEDate, towWeekSDate, towWeekEDate, 1, ceshiRoomBot);
	//		 	}
	//  	}
	//  });
	//  scheduleJob21_33 = schedule.scheduleJob({hour: 21, minute: 33}, async function(){
	//  	// 核心群每日恐龙简报
	//  	if(wechat.bot.logonoff()){
	//		 	const ceshiRoomBot = await wechat.bot.Room.find({topic: "骑思妙享恐龙组"});
	//          // 核心群当日恐龙销售汇总, 前10名名称和业绩, 后5名名称和业绩
	//          if(ceshiRoomBot){
	//          	const options = {
	//				  hostname: host,
	//				  path: '/ccsmart/robotbatteryrefund/app/findRankScenicName',
	//				  method: 'GET'
	//				};
	//				var buffers = [];
	//				var nread = 0;
	//				const req = https.request(options, (res) => {
	//					res.on('data', (d) => {
	//					  	buffers.push(d);
	//	    				nread += d.length;
	//					});
	//					
	//					res.on('end', function(){
	//						var buffer = null;
	//					    switch(buffers.length) {
	//					        case 0: buffer = new Buffer(0);
	//					            break;
	//					        case 1: buffer = buffers[0];
	//					            break;
	//					        default:
	//					            buffer = new Buffer(nread);
	//					            for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
	//					                var chunk = buffers[i];
	//					                chunk.copy(buffer, pos);
	//					                pos += chunk.length;
	//					            }
	//					        break;
	//					    }
	//					    var res = JSON.parse(buffer.toString());
	//					    var shopList = res.rows;
	//					  	var salesString = "当日恐龙销售汇总:";
	//				  		var topString = '\n====================\n前10名商场和业绩:\n====================';
	//				  		var bottomString = '\n====================\n后5名商场和业绩:\n====================\n';
	//				  		var validStore = [];
	//				  		shopList.forEach(function(value, key){
	//				  			if(value.consume){
	//				  				validStore.push(value);
	//				  			}
	//				  		})
	//				  		var length = validStore.length;
	//					  	for(var i = 0; i < length; i++){
	//					  		var rank = parseInt(i) + 1;
	//					  		if(i < 10){
	//					  			var consume = validStore[i].consume;
	//					  			if(consume){
	//					  				consume = parseFloat(consume).toFixed(2);
	//					  				topString += "\n" + rank + "." + validStore[i].scenicName + "\n		今日业绩:" + consume;
	//					  			}else{
	//					  				topString += "\n" + rank + "." + validStore[i].scenicName + "\n		今日业绩:0.00";
	//					  			}
	//					  		}
	//					  		
	//					  		if(i > length - 6){
	//					  			var consume = shopList[i].consume;
	//					  			if(consume){
	//					  				consume = parseFloat(consume).toFixed(2);
	//					  				bottomString += rank - 4 + "." + validStore[i].scenicName + "\n		今日业绩:" + consume + "\n";
	//					  			}else{
	//					  				bottomString += rank - 4 + "." + validStore[i].scenicName + "\n		今日业绩:0.00\n";
	//					  			}
	//					  		}
	//					  	}
	//					  	salesString = salesString + topString + bottomString;
	//					  	ceshiRoomBot.say(salesString);
	//					})
	//				});
	//         
	//          	req.on('error', function (e) { 
	//				    console.log('problem with request: ' + e.message); 
	//				}); 
	//				   
	//				req.end();
	//          }
	//  	}
	//  });
}

// 圆明园报数
function getymyInfo(host, room){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var hour = nowDate.getHours();
	hour = hour>9?hour:'0'+hour;
	var minutes = nowDate.getMinutes();
	minutes = minutes>9?minutes:'0'+minutes;
	var seconds = nowDate.getSeconds();
	seconds = seconds>9?seconds:'0'+seconds;
	var sDate = year + '-' + month + '-' + day + ' 00:00:00';
	var eDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	var searchSdate = encodeURI(sDate);
	var searchEdate = encodeURI(eDate);
	const options = {
		hostname: host,
		path: '/ymypark/deviceIncomeRobot/getIncome?startDate='+ searchSdate +'&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
		console.log(res);
	    if(res.code == "SUCCESS"){
			var bicycleIncome = res.data.bicycleIncome;
			bicycleIncome = bicycleIncome?parseFloat(bicycleIncome).toFixed(2):'0.00';
			var driveShipIncome = res.data.driveShipIncome;
			driveShipIncome = driveShipIncome?parseFloat(driveShipIncome).toFixed(2):'0.00';
			var loopShipIncome = res.data.loopShipIncome;
			loopShipIncome = loopShipIncome?parseFloat(loopShipIncome).toFixed(2):'0.00';
			var batteryCarIncome = res.data.batteryCarIncome;
			batteryCarIncome = batteryCarIncome?parseFloat(batteryCarIncome).toFixed(2):'0.00';
			var botString = '*****圆明园报数*****\n日期:'+eDate +'\n';
			botString += '自行车收入：' + bicycleIncome + '元\n';
			botString += '自驾船收入：' + driveShipIncome + '元\n';
			botString += '交通船收入：' + loopShipIncome + '元\n';
			botString += '电瓶车收入：' + batteryCarIncome + '元\n';
			let path = require('path');
			fs.readFile(path.resolve(__dirname, './jsonData/ymyOpen.json'), 'utf8', function(err, data){
				if(err){
					return console.error(err);
				}
				data = JSON.parse(data);
				var boatOpen = parseInt(data.boatOpen);
				var bikeOpen = parseInt(data.bikeOpen);
				botString += "自驾船手动开锁次数：" + boatOpen;
				botString += "\n自行车手动开锁次数：" + bikeOpen;
				var ymyData = {
					"boatOpen": 0,
					"bikeOpen": 0
				}
				if(hour >= 19){
					fs.writeFile(path.resolve(__dirname, './jsonData/ymyOpen.json'), JSON.stringify(ymyData),function(err){
						if(err){
							console.error(err);
							return;
						}
					})
				}
				room.say(botString);
			})
	    }
	  });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}


// 获取微信上账统计
function getWxInfo(parkName, host, room){
	var nowDate = new Date().getTime() - (60*60*24*1000);
	nowDate = new Date(nowDate);
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var dateString = year + '-' + month + '-' + day;
	var sDate = year + '-' + month + '-' + day + ' 00:00:00';
	sDate = encodeURI(sDate);
	var eDate = year + '-' + month + '-' + day + ' 23:59:59';
	eDate = encodeURI(eDate);
	const options = {
		hostname: host,
		path: '/'+parkName+'/ticketsRobot/getTicketsAppointCollection?startDate='+ sDate + '&endDate='+ eDate,
		method: 'GET'
	};
	
	const req = https.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
		var botString;
		if(parkName == 'iotsmart'){
			botString = '*****鲜花港微信上账统计*****\n时间：' + dateString;
		}else{
			botString = '*****水上公园微信上账统计*****\n时间：' + dateString;
		}
	    if(res.code == 'SUCCESS'){
			// 全价票收款人数
	    	var fullTotal = res.data.fullTotal;
			fullTotal = fullTotal?fullTotal:0;
			// 全价票收款总额
			var fullTotalMoney = res.data.fullTotalMoney;
			fullTotalMoney = fullTotalMoney?fullTotalMoney:0;
			fullTotalMoney = parseFloat(fullTotalMoney).toFixed(2);
			// 全价票退款人数
			var fullRefundTotal = res.data.fullRefundTotal;
			fullRefundTotal = fullRefundTotal?fullRefundTotal:0;
			// 全价票退款总额
			var fullRefundTotalMoney = res.data.fullRefundTotalMoney;
			fullRefundTotalMoney = fullRefundTotalMoney?fullRefundTotalMoney:0;
			fullRefundTotalMoney = parseFloat(fullRefundTotalMoney).toFixed(2);
			// 半价票收款人数
			var halfTotal = res.data.halfTotal;
			halfTotal = halfTotal?halfTotal:0;
			// 半价票收款总额
			var halfTotalMoney = res.data.halfTotalMoney;
			halfTotalMoney = halfTotalMoney?halfTotalMoney:0;
			halfTotalMoney = parseFloat(halfTotalMoney).toFixed(2);
			// 半价票退款人数
			var halfRefundTotal = res.data.halfRefundTotal;
			halfRefundTotal = halfRefundTotal?halfRefundTotal:0;
			// 半价票退款总额
			var halfRefundTotalMoney = res.data.halfRefundTotalMoney;
			halfRefundTotalMoney = halfRefundTotalMoney?halfRefundTotalMoney:0;
			halfRefundTotalMoney = parseFloat(halfRefundTotalMoney).toFixed(2);
			// 微信上账总额
			var resultMoney = parseFloat(fullTotalMoney) + parseFloat(halfTotalMoney) - parseFloat(fullRefundTotalMoney) - parseFloat(halfRefundTotalMoney);
			resultMoney = parseFloat(resultMoney).toFixed(2);
			botString += '\n微信上账总额：' + resultMoney + '元';
			botString += '\n全价票收款：' + fullTotal + '人 ' + fullTotalMoney + '元';
			botString += '\n半价票收款：' + halfTotal + '人 ' + halfTotalMoney + '元';
			botString += '\n全价票退票：' + fullRefundTotal + '人 ' + fullRefundTotalMoney + '元';
			botString += '\n半价票退款：' + halfRefundTotal + '人 ' + halfRefundTotalMoney + '元';
			room.say(botString);
	    }else{
			room.say(res.msg);
		}
	  });
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}


function randomNum(minNum,maxNum){ 
	switch(arguments.length){ 
		case 1: 
			return parseInt(Math.random()*minNum+1,10); 
		break; 
		case 2: 
			return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
		break; 
		default: 
			return 0; 
		break; 
	} 
} 


// 获取水上公园设备租赁收入
function getSsgyBikeInfo(sDate, eDate, ssgyBotString, room){
	const options1 = {
		hostname: host1,
		path: '/ssgy/deviceRobot/getDeviceClt?startDate='+ sDate + '&endDate='+ eDate,
		method: 'GET'
	};
	
	const req1 = https.request(options1, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    console.log(res);
	    if(res.code == 'SUCCESS'){
	    	var zxcTotal = res.data.zxcTotal?parseFloat(res.data.zxcTotal).toFixed(2):'0.00';
	    	var dpcTotal = res.data.dpcTotal?parseFloat(res.data.dpcTotal).toFixed(2):'0.00';
	    	var dcTotal = res.data.dcTotal?parseFloat(res.data.dcTotal).toFixed(2):'0.00';
	    	ssgyBotString = ssgyBotString + '\n自行车收入：' + zxcTotal + '元\n电瓶车收入：' + dcTotal + '元\n游船收入：' + dpcTotal + '元'
	    	room.say(ssgyBotString);
	    }
	  });
	});
	
	req1.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req1.end();
}

// 获取当前时间
function getNowDate(){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1;
	if(month < 10){
		month = '0' + month;
	}
	var day = nowDate.getDate();
	if(day < 10){
		day = '0' + day;
	}
	var hour = nowDate.getHours();
	if(hour < 10){
		hour = '0' + hour;
	}
	var minutes = nowDate.getMinutes();
	if(minutes < 10){
		minutes = '0' + minutes;
	}
	
	return year + '年' + month + '月' + day + '日 ' + hour + ':' + minutes;
}

// 运营大数据预警
function getWarningInfo(storeData, ceshiRoomBot, warningString){
	warningString = '***恐龙运营预警***';
	var num = 0;
	storeData.forEach(function(value, key){
		if(parseInt(value.twoUpConsume) < -40 || parseInt(value.weekConsume) < -40 ){
			num += 1;
			warningString += '\n' + num + '.' + value.name + '\n 1.今日销售额：' + value.consume + '\n 2.7天同比下降：' + value.weekConsume + '%\n 3.14天同比下降：' + value.twoUpConsume + '%\n--------------'
		}
	})
	
	if(num == 0){
		ceshiRoomBot.say('***恐龙运营预警***\n无');
	}else{
		ceshiRoomBot.say(warningString);
	}
}
// 运营大数据报喜
function getHappyInfo(storeData, ceshiRoomBot, happyString){
	happyString = '***恐龙运营预喜***';
	var num = 0;
	storeData.forEach(function(value, key){
		if(parseInt(value.twoUpConsume) > 40 || parseInt(value.weekConsume) > 40 ){
			num += 1;
			happyString += '\n' + num + '.' + value.name + '\n 1.今日销售额：' + value.consume + '\n 2.7天同比增加：' + value.weekConsume + '%\n 3.14天同比增加：' + value.twoUpConsume + '%\n--------------'
		}
	})
	if(num == 0){
		ceshiRoomBot.say('***恐龙运营预喜***\n无');
	}else{
		ceshiRoomBot.say(happyString);
	}
}
// 运营大数据新店
function getNewStoreInfo(storeData, ceshiRoomBot, newStoreString){
	newStoreString = '***恐龙新店运营***';
	var num = 0;
	storeData.forEach(function(value, key){
		if(parseInt(value.twoUpConsume) == 0 && parseInt(value.weekConsume) == 0 && parseInt(value.consume) != 0){
			num += 1;
			newStoreString += '\n' + num + '.' + value.name + '\n 今日销售额：' + value.consume + '\n--------------'
		}
	})
	if(num == 0){
		ceshiRoomBot.say('***恐龙新店运营***\n无');
	}else{
		ceshiRoomBot.say(newStoreString);
	}
}


// 运营机器人大数据
function getStoreData(nowSDate, nowEDate, weekSDate, weekEDate,  towWeekSDate, towWeekEDate, type){
	nowSDate = encodeURI(nowSDate);
	nowEDate = encodeURI(nowEDate);
	weekSDate = encodeURI(weekSDate);
	weekEDate = encodeURI(weekEDate);
	towWeekSDate = encodeURI(towWeekSDate);
	towWeekEDate = encodeURI(towWeekEDate);
	let options = {};
	if(type == 1){
    	options = {
		  hostname: host,
		  path: '/ccsmart/managerIncome/web/getManagerConsumeStatistical?sdate='+ nowSDate +'&edate='+ nowEDate +'&upsDate='+ weekSDate +'&upeDate='+ weekEDate +'&userId=8',
		  method: 'GET'
		};
    	
    }else if(type == 2){
    	options = {
		  hostname: host,
		  path: '/ccsmart/managerIncome/web/getManagerConsumeStatistical?sdate='+ nowSDate +'&edate='+ nowEDate +'&upsDate='+ towWeekSDate +'&upeDate='+ towWeekEDate +'&userId=8',
		  method: 'GET'
		};
    }
	var buffers = [];
	var nread = 0;
	const req = https.request(options, (res) => {
		res.on('data', (d) => {
		  	buffers.push(d);
			nread += d.length;
		});
		
		res.on('end', () => {
			var buffer = null;
		    switch(buffers.length) {
		        case 0: buffer = new Buffer(0);
		            break;
		        case 1: buffer = buffers[0];
		            break;
		        default:
		            buffer = new Buffer(nread);
		            for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
		                var chunk = buffers[i];
		                chunk.copy(buffer, pos);
		                pos += chunk.length;
		            }
		        break;
		    }
		    var res = JSON.parse(buffer.toString());
		    if(type == 1){
		    	getStoreData(nowSDate, nowEDate, weekSDate, weekEDate,  towWeekSDate, towWeekEDate, 2);
				res.rows.forEach(function(value, key){
					var weekConsume;
					var storeItem = {};
					if(value.curConsume){
						storeItem.consume = parseInt(value.curConsume);
						if(value.upConsume){
							weekConsume = (value.curConsume - value.upConsume) / value.upConsume * 100;
							weekConsume = parseInt(weekConsume);
						}else{
							weekConsume = 0;
						}
					}else{
						storeItem.consume = 0;
						if(value.upConsume){
							weekConsume = parseInt(value.upConsume) * -1;
							weekConsume = weekConsume;
						}else{
							weekConsume = 0;
						}
					}
					storeItem.weekConsume = weekConsume;
					storeItem.name = value.scenicName;
					storeData[key] = storeItem;
				})
		    }else if(type == 2){
		    	res.rows.forEach(function(value, key){
					if(value.curConsume){
						if(value.upConsume){
							storeData[key].twoUpConsume = (value.curConsume - value.upConsume) / value.upConsume * 100;
							storeData[key].twoUpConsume = parseInt(storeData[key].twoUpConsume);
						}else{
							storeData[key].twoUpConsume = 0;
						}
					}else{
						if(value.upConsume){
							storeData[key].twoUpConsume = parseInt(value.upConsume) * -1;
							storeData[key].twoUpConsume = storeData[key].twoUpConsume;
						}else{
							storeData[key].twoUpConsume = 0;
						}
					}
					
				})
		    	
		    	return;
		    }
		})
	})
	
	req.on('error', function (e) { 
	    console.log('problem with request: ' + e.message);
	}); 
	   
	req.end();
}


// 每日恐龙简报
var sayString = '';
function getWeekTotalMoney(nowSDate, nowEDate, weekSDate,  weekEDate, towWeekSDate, towWeekEDate, type, room){
	var nowdate = nowEDate;
	nowSDate = encodeURI(nowSDate);
	nowEDate = encodeURI(nowEDate);
	weekSDate = encodeURI(weekSDate);
	weekEDate = encodeURI(weekEDate);
	towWeekSDate = encodeURI(towWeekSDate);
	towWeekEDate = encodeURI(towWeekEDate);
	var totalMoney = 0;
	var upTotalMoney = 0;
	let options = {};
	if(type == 1){
    	options = {
		  hostname: host,
		  path: '/ccsmart/managerIncome/web/getManagerConsumeStatistical?sdate='+ nowSDate +'&edate='+ nowEDate +'&upsDate='+ weekSDate +'&upeDate='+ weekEDate +'&userId=8',
		  method: 'GET'
		};
    }else if(type == 2){
    	options = {
		  hostname: host,
		  path: '/ccsmart/managerIncome/web/getManagerConsumeStatistical?sdate='+ nowSDate +'&edate='+ nowEDate +'&upsDate='+ towWeekSDate +'&upeDate='+ towWeekEDate +'&userId=8',
		  method: 'GET'
		};
    }
	var buffers = [];
	var nread = 0;
	const req = https.request(options, (res) => {
		res.on('data', (d) => {
		  	buffers.push(d);
			nread += d.length;
		});
		
		res.on('end', () => {
			var buffer = null;
		    switch(buffers.length) {
		        case 0: buffer = new Buffer(0);
		            break;
		        case 1: buffer = buffers[0];
		            break;
		        default:
		            buffer = new Buffer(nread);
		            for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
		                var chunk = buffers[i];
		                chunk.copy(buffer, pos);
		                pos += chunk.length;
		            }
		        break;
		    }
		    var res = JSON.parse(buffer.toString());
		    res.rows.forEach(function(value, key){
				if(value.curConsume){
					var curConsume = parseFloat(value.curConsume);
					totalMoney += curConsume;
				}
				if(value.upConsume){
					var upConsume = parseFloat(value.upConsume);
					upTotalMoney += upConsume;
				}
		  	})
		    var percent = parseInt((totalMoney - upTotalMoney) / totalMoney * 100);
		    if(!percent){
		    	percent = 0;
		    }
		    if(type == 1){
		    	nowSDate = decodeURI(nowSDate);
		    	nowEDate = decodeURI(nowEDate);
		    	weekSDate = decodeURI(weekSDate);
		    	weekEDate = decodeURI(weekEDate);
		    	towWeekSDate = decodeURI(towWeekSDate);
		    	towWeekEDate = decodeURI(towWeekEDate);
		    	getWeekTotalMoney(nowSDate, nowEDate, weekSDate,  weekEDate, towWeekSDate, towWeekEDate, 2, room);
		    	sayString = '***每日恐龙简报***\n日期:' + nowdate + '\n总收入:'+ totalMoney +'\n07天同比:'+ percent +'%';
		    }else if(type == 2){
		    	sayString += '\n14天同比:'+ percent +'%\n***每日恐龙简报***';
		    	room.say(sayString);
		    	return;
		    }
		})
	})
	
	req.on('error', function (e) { 
	    console.log('problem with request: ' + e.message);
	}); 
	   
	req.end();
}

// 获取周查询日期
function getWeekSearchInfo(){
	var now = new Date().getTime();
	var sDate = now - 86400000 * 7;
	sDate = getDateString(sDate);
	var eDate = now - 86400000;
	eDate = getDateString(eDate);
	var upSDate = now - 86400000 * 14;
	upSDate = getDateString(upSDate);
	var upEDate = now - 86400000 * 8;
	upEDate = getDateString(upEDate);
	
	return {
		sDate: sDate,
		eDate: eDate,
		upSDate: upSDate,
		upEDate: upEDate
	}
}

// 获取月查询日期
function getMonthSearchInfo(){
	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = now.getMonth() + 1;
	if(nowMonth < 10){
		nowMonth = '0' + nowMonth;
	}
	var nowDay = now.getDate();
	if(nowDay < 10){
		nowDay = '0' + nowDay;
	}
	now = nowYear + '-' + nowMonth + '-' + nowDay + ' 00:00:00';
	now = new Date(now).getTime();
	
	var eDate = now - 86400000;
	eDate = getDateString(eDate);
	var sDate = eDate.split('-')[0] + "-" + eDate.split('-')[1] + "-01";
	var upDate = new Date(sDate + ' 00:00:00').getTime();
	var upEDate = upDate - 86400000;
	upEDate = getDateString(upEDate);
	var upSDate = upEDate.split('-')[0] + "-" + upEDate.split('-')[1] + "-01";
	
	return {
		sDate: sDate,
		eDate: eDate,
		upSDate: upSDate,
		upEDate: upEDate
	}
}

// 时间戳转时间
function getDateString(dateTime){
	var dateTime = new Date(dateTime);
	var year = dateTime.getFullYear();
	var month = dateTime.getMonth() + 1;
	if(month < 10){
		month = '0' + month;
	}
	var day = dateTime.getDate();
	if(day < 10){
		day = '0' + day;
	}
	var hour = dateTime.getHours();
	if(hour < 10){
		hour = '0' + hour;
	}
	var minites = dateTime.getMinutes();
	if(minites < 10){
		minites = '0' + minites;
	}
	var seconds = dateTime.getSeconds();
	if(seconds < 10){
		seconds = '0' + seconds;
	}
	var sdate = year + '-' + month + '-' + day + ' 00:00:00';
	var edate = year + '-' + month + '-' + day + ' ' + hour + ':' + minites + ':' + seconds;
	return {
		sdate: sdate,
		edate: edate
	};
}

// 数组排序
function arrSort(shopList, type){
	var arr = [];
	var liArr = shopList;
	for(var i = 0; i < liArr.length; i++){
		arr[i] = liArr[i];
	}
	arr.sort(function(li1,li2){
		if(type == 'contrastMoney'){
			var n1 = li1.contrastPercent;
			var n2 = li2.contrastPercent;	
		}else{
			var n1 = li1.curConsume;
			var n2 = li2.curConsume;
		}
		return n2 - n1;
	})
	return arr;
}

// 业绩排序
function consumeSort(resp){
	var shopList = resp.rows;
	var newShopList = [];
	for(var i = 0; i < shopList.length; i++){
		var curConsume = shopList[i].curConsume;
		var upConsume = shopList[i].upConsume;
		if(curConsume){
			curConsume = parseFloat(curConsume).toFixed(2);
			if(upConsume){
				upConsume = parseFloat(shopList[i].upConsume).toFixed(2);
				newShopList[i] = {scenicName: shopList[i].scenicName, contrastMoney: parseFloat(curConsume - upConsume).toFixed(2), curConsume: curConsume};
				if(curConsume - upConsume  > 0){
        			if(curConsume == 0){
        				newShopList[i].contrastPercent = 100;
        			}else{
        				newShopList[i].contrastPercent = parseInt(parseFloat((curConsume - upConsume) / curConsume).toFixed(2) * 100);
        			}
        		}else if(curConsume - upConsume  < 0){
        			newShopList[i].contrastPercent = parseInt(parseFloat((curConsume - upConsume) / upConsume).toFixed(2) * 100);
        		}else{
        			newShopList[i].contrastPercent = 0;
        		}
			}else{
				upConsume = 0;
				newShopList[i] = {scenicName: shopList[i].scenicName, contrastMoney: parseFloat(curConsume - 0).toFixed(2), curConsume: curConsume};
				if(curConsume == 0){
					newShopList[i].contrastPercent = 0;
				}else{
					newShopList[i].contrastPercent = 100;
				}
			}
		}else{
			curConsume = 0;
			if(upConsume){
				upConsume = parseFloat(shopList[i].upConsume).toFixed(2);
				newShopList[i] = {scenicName: shopList[i].scenicName, contrastMoney: parseFloat(0 - upConsume).toFixed(2), curConsume: 0};
				if(upConsume > 0){
        			newShopList[i].contrastPercent = 100;
        		}else if(upConsume == 0){
        			newShopList[i].contrastPercent = 0;
        		}
			}else{
				upConsume = 0;
				newShopList[i] = {scenicName: shopList[i].scenicName, contrastMoney: 0, curConsume: 0};
				newShopList[i].contrastPercent = 0;
			}
		}
		
	}
	return newShopList;
}


// 获取小程序门票
function getWXTickets(searchSdate, searchEdate, room, sdate, edate){
	const options = {
		hostname: host1,
		path: '/iotsmart/ticketsRobot/getH5TicketsIncome?sdate='+ searchSdate +'&edate=' + searchEdate,
		method: 'GET'
	};
	
	const req = https.request(options, (res) => {
	  res.on('data', (d) => {
	    var res = JSON.parse(d.toString());
	    console.log(res);
	    if(res.code == "SUCCESS"){
	    	var totalMoney;
	    	if(res.data.total){
	    		totalMoney = parseFloat(res.data.total).toFixed(2);
	    	}else{
	    		totalMoney = 0;
	    	}
	    	room.say('[玫瑰]小程序门票收入[玫瑰]\n日期：'+ edate +'\n收入：'+ totalMoney +'元');
	    }
	  });
	});
	
	req.end();
}

// 获取POS收入
function getPosIncome(searchSdate, searchEdate, room, sdate, edate){
	posTickets = 0;
	posFlowers = 0;
	var status = 0;
	var posId = ['nmpt','xnmpt','bmpt','hhsm'];
	posId.forEach(function(value, key){
		const options = {
			hostname: host1,
			path: '/iotsmart/ticketsRobot/getPosIncome?sdate='+ searchSdate +'&edate=' + searchEdate +'&posId=' + value,
			method: 'GET'
		};
		
		const req = https.request(options, (res) => {
		  res.on('data', (d) => {
		    var res = JSON.parse(d.toString());
		    if(res.code == "SUCCESS"){
		    	status += 1;
		    	if(res.data.total){
		    		if(key < 3){
		    			posTickets += parseFloat(res.data.total);
		    		}else{
		    			posFlowers = parseFloat(res.data.total);
		    		}
		    	}
		    }
		  });
		});
		req.end();
	})
	
	var my = setInterval(function(){
		if(status == posId.length){
			room.say('[玫瑰]POS收入简报[玫瑰]\n日期：'+ edate +'\n门票售卖：'+ posTickets +'元\n花卉售卖：' + posFlowers + '元');
			clearInterval(my);
		}
	}, 1000);
}

// 获取二维码收入
function getQrIncome(searchSdate, searchEdate, room, sdate, edate){
	var qrCodeCltId = ['1', '2', '3', '4', '5'];
	var qrCodeIncome = '';
	var status = 0;
	qrCodeCltId.forEach(function(value, key){
		const options = {
			hostname: host1,
			path: '/iotsmart/ticketsRobot/getQrCodeIncome?sdate='+ searchSdate +'&edate=' + searchEdate +'&qrCodeCltId=' + value,
			method: 'GET'
		};
		
		const req = https.request(options, (res) => {
		  res.on('data', (d) => {
		    var res = JSON.parse(d.toString());
		    if(res.code == "SUCCESS"){
		    	status += 1;
		    	var totalMoney = parseFloat(res.data[0].total);
		    	if(!totalMoney){
		    		totalMoney = 0;
		    	}
		    	qrCodeIncome = qrCodeIncome + res.data[0].qrCodeCltName +'：' + totalMoney + '元\n';
		    }
		  });
		});
		req.end();
	})
	
	var my = setInterval(function(){
		if(status == qrCodeCltId.length){
			room.say('[玫瑰]二维码收入简报[玫瑰]\n日期：'+ edate + '\n'+ qrCodeIncome);
			clearInterval(my);
		}
	}, 1000);
}

// 设备租赁收入
function getDeviceIncome(searchSdate, searchEdate, room, sdate, edate){
	var deviceType = ['0', '1', '2', '3', '4', '5', '6'];
	var deviceIncome = '';
	var status = 0;
	deviceType.forEach(function(value, key){
		const options = {
			hostname: host1,
			path: '/iotsmart/ticketsRobot/getDeviceIncome?sdate='+ searchSdate +'&edate=' + searchEdate +'&deviceType=' + value,
			method: 'GET'
		};
		
		const req = https.request(options, (res) => {
		  res.on('data', (d) => {
		    var res = JSON.parse(d.toString());
		    if(res.code == "SUCCESS"){
		    	status += 1;
		    	var totalMoney = parseFloat(res.data.total);
		    	if(!totalMoney){
		    		totalMoney = 0;
		    	}
		    	switch(value){
		    		case '0':
		    			deviceIncome = deviceIncome +'双人电瓶车：' + totalMoney + '元\n';
		    		break;
		    		
		    		case '1':
		    			deviceIncome = deviceIncome +'四人电瓶车：' + totalMoney + '元\n';
		    		break;
		    		
		    		case '2':
		    			deviceIncome = deviceIncome +'14人电瓶车：' + totalMoney + '元\n';
		    		break;
		    		
		    		case '3':
		    			deviceIncome = deviceIncome +'23人电瓶车：' + totalMoney + '元\n';
		    		break;
		    		
		    		case '4':
		    			deviceIncome = deviceIncome +'双人自行车：' + totalMoney + '元\n';
		    		break;
		    		
		    		case '5':
		    			deviceIncome = deviceIncome +'四人自行车：' + totalMoney + '元\n';
		    		break;
		    		
		    		case '6':
		    			deviceIncome = deviceIncome +'电瓶船：' + totalMoney + '元\n';
		    		break;
		    	}
		    }
		  });
		});
		req.end();
	})
	
	var my = setInterval(function(){
		if(status == deviceType.length){
			room.say('[玫瑰]设备租赁简报[玫瑰]\n日期：'+ edate + '\n'+ deviceIncome);
			clearInterval(my);
		}
	}, 1000);
}


function isLastDayOfMonth() {
    var flag = false;
    var date = new Date();
 
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var today = date.getDate();
 
    var new_year = year; //取当前的年份
    var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
    if(month>12){//如果当前大于12月，则年份转到下一年
        new_month -=12; //月份减
        new_year++; //年份增
    }
    var new_date = new Date(new_year,new_month,1); //取当年当月中的第一天
 
    var month_last_day = (new Date(new_date.getTime()-1000*60*60*24)).getDate();
 
    if(today == month_last_day){
        flag = true;
    }
    return flag;
};

function scheduleStop(){
	scheduleJobStart = false;
	scheduleJob09_00.cancel();
	scheduleJob09_50.cancel();
	scheduleJob10_00.cancel();
    scheduleJob15_00.cancel();
    scheduleJob17_00.cancel();
    scheduleJob18_00.cancel();
    scheduleJob19_00.cancel();
    scheduleJob21_00.cancel();
    scheduleJob21_30.cancel();
    scheduleJob21_31.cancel();
    scheduleJob21_33.cancel();
    scheduleJob21_40.cancel();
    scheduleJob22_00.cancel();
	scheduleJob13_01.cancel();
	scheduleJob13_03.cancel();
	scheduleJob13_05.cancel();
	scheduleJob16_00.cancel();
	scheduleJob16_01.cancel();
	scheduleJob16_03.cancel();
	scheduleJob16_05.cancel();
	scheduleJob16_45.cancel();
	scheduleJob18_01.cancel();
	scheduleJob18_03.cancel();
	scheduleJob18_05.cancel();
	scheduleJob18_30.cancel();
	scheduleJob20_00.cancel();
	scheduleJob20_01.cancel();
	scheduleJob20_03.cancel();
	scheduleJob20_05.cancel();
	scheduleJob23_59.cancel();
	scheduleJob_hour.cancel();
	scheduleJob_halfHour.cancel();
	scheduleJob_45.cancel();
}
console.log('myschedule.js已准备好')
module.exports.scheduleStart =  scheduleStart
module.exports.scheduleStop =  scheduleStop
module.exports.scheduleJobStart =  scheduleJobStart