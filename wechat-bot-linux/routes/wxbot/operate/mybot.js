const {Wechaty,log} = require('wechaty')
var eventsParse = require('./myparse.js')
var eventsWechaty = require('./wechaty.js')
const { PuppetPadlocal } = require('wechaty-puppet-padlocal');

log.level('silly')

const qsmxRoomTopic = {
	QSMX_YBY_BOT_ROOM_TOPIC: '园博园客服群',
	QSMX_SCHOOL_BOT_ROOM_TOPIC: '第一实验小学2018级一年级15班',
	QSMX_DINOSAUR_GOLD_BOT_ROOM_TOPIC:"①金级店一组",
	QSMX_DINOSAUR_SILVER_BOT_ROOM_TOPIC:"②银级店⚪️一组",
	QSMX_DINOSAUR_COPPER_BOT_ROOM_TOPIC: '③铜级店🔴一组',
	QSMX_DINOSAUR_IRON_BOT_ROOM_TOPIC:"④铁级店🔵一组",
	QSMX_DINOSAUR_BLACK_BOT_ROOM_TOPIC:"⑤黑级店⚫️一组",
	QSMX_DINOSAUR_NEW_BOT_ROOM_TOPIC:"⑥新人考察组👁‍🗨一组",
	QSMX_ZHUANYONG_ROOM: "骑思妙享-测试",
	QSMX_CORE_ROOM: "骑思妙享恐龙组",
	QSMX_XHG_ROOM: "鲜花港运营数据组",
	QSMX_XHGOTA_ROOM: "财务统计群",
	QSMX_XHGZHJQ_ROOM: "鲜花港智慧景区一期问题沟通群",
	QSMX_XHGYY_ROOM: "鲜花港预约报数",
	QSMX_XHGZSBS_ROOM: "鲜花港真实报数",
	QSMX_XHGCWZ_ROOM: "鲜花港财务组",
	QSMX_XHGDLHZ_ROOM: "蝶恋花馆报数群",
	QSMX_XHGBSZ_ROOM: "鲜花港新票务报数组",
	QSMX_XHGDGBSZ_ROOM: "鲜花港蝶馆新票务报数组",
	QSMX_XHGZXCCYYZ_ROOM: "鲜花港自行车+船运营组",
  	QSMX_XHGDPCYYZ_ROOM: "鲜花港电瓶车运营组",
  	QSMX_XHGZZYYZ_ROOM: "鲜花港随便开",
	QSMX_XHGZYPWBSZ_ROOM: "鲜花港自营票务报数组",
	QSMX_XHGPWDXQ_ROOM: "鲜花港票务对象群",
	QSMX_XHGDXZ_ROOM: "鲜花港地下工作群",
	QSMX_NHS_ROOM: "朝阳鸟化石观光自行车",
	QSMX_SXZ_ROOM: "内部测试",
	QSMX_SDGY_ROOM: "汉石桥湿地公园智能化运营群",
	QSMX_LDZ_ROOM: "骑思妙享落地组",
	QSMX_AS_ROOM: "奥森运营组",
	QSMX_SSGY_ROOM: "水上公园运营组",
	QSMX_SSGYBS_ROOM: "水上公园报数组",
	QSMX_SSGYYY_ROOM: "水上公园预约报数",
	QSMX_SSGYGBSZ_ROOM: "水上公园新票务报数组",
	QSMX_SSGYXSJBSZ_ROOM: "水上公园雪世界报数组",
	QSMX_YBYBS_ROOM: "园博园游客服务部门区报数群",
	QSMX_YBYMPDZ_ROOM: "园博园门票对账组",
	QSMX_YBYSJTYZ_ROOM: "北京园博园数据通用群（预约数）",
	QSMX_YBYZMZ_ROOM: "园博周末",
	QSMX_FHLBSZ_ROOM: "凤凰岭报数组",
	QSMX_YMYZJC_ROOM: "圆明园自驾船客服组",
	QSMX_YMYZXC_ROOM: "圆明园自行车客服组",
	QSMX_YMYBSZ_ROOM: "圆明园报数组",
	QSMX_YMYJTC_ROOM: "圆明园交通船组",
	QSMX_ZJSBSZ_ROOM: "正觉寺报数组",
	QSMX_YQHZJC_ROOM: "雁栖湖自驾船客服组",
	QSMX_YQHBSZ_ROOM: "雁栖湖报数组",
	QSMX_YQHDPCBSZ_ROOM: "雁栖湖电瓶车报数组",
	QSMX_BHZJC_ROOM: "北海自驾船客服组",
	QSMX_BHBSZ_ROOM: "北海报数组",
	QSMX_YYHZXC_ROOM: "野鸭湖自驾车客服组",
	QSMX_YYHZJC_ROOM: "野鸭湖自驾船客服组",
	QSMX_YYHBSZ_ROOM: "野鸭湖自行车报数组",
	QSMX_XWHZJC_ROOM: "玄武湖自驾船客服组",
	QSMX_XWHBSZ_ROOM: "玄武湖报数组",
	QSMX_XWHLZBSZ_ROOM: "玄武湖喷泉服务组",
	QSMX_XWHDPCBSZ_ROOM: "玄武湖电瓶车报数组",
	QSMX_DRJGY_ROOM: "狄仁杰文化园预约服务组",
	QSMX_SCHBSZ_ROOM: "三海运营报数组",
	QSMX_SCHOTA_ROOM: "三海游船商品",
	QSMX_NHZXC_ROOM: "唐山南湖自行车客服组",
	QSMX_NHZJC_ROOM: "唐山南湖自驾船客服组",
	QSMX_NHZJCBSZ_ROOM: "唐山南湖游船报数组",
	QSMX_NHZXCBSZ_ROOM: "唐山南湖自行车报数组",
	QSMX_NHDPCBSZ_ROOM: "唐山南湖电瓶车报数组",
	QSMX_YLHZJC_ROOM: "云龙湖自驾船客服组",
	QSMX_YLHZJCBSZ_ROOM: "云龙湖游船运营报数组",
	QSMX_YLHDPCBSZ_ROOM: "云龙湖电瓶车报数组",
	QSMX_NBHZJC_ROOM: "南北湖自驾船客服组",
	QSMX_NBHZJCBSZ_ROOM: "南北湖游船运营报数组",
	QSMX_NBHPHTBSZ_ROOM: "南北湖皮划艇运营报数组",
	QSMX_NBHDPCBSZ_ROOM: "南北湖电瓶车运营报数组",
	QSMX_TGYJDCSBSZ_ROOM: "天宫院街道城市管理平台",
	QSMX_TGYWGYBSZ_ROOM: "天宫院网格员小组001",
	QSMX_XTYBYZXC_ROOM: "邢台园博园自行车客服组",
	QSMX_XTYBYBSZ_ROOM: "邢台园博园智慧交通报数组"
};

function onScan (qrcode, status) {
	  require('qrcode-terminal').generate(qrcode, { small: true })  // show qrcode on console
	  const qrcodeImageUrl = [
	    'https://api.qrserver.com/v1/create-qr-code/?data=',
	    encodeURIComponent(qrcode),
	  ].join('')
	  eventsWechaty.eventEmitter.emit('serverScan',qrcode)
}

async function onLogin (user) {
	console.log(`${user} login`)
	eventsWechaty.eventEmitter.emit('serverLogin',user)
}

function onLogout(user) {
  console.log(`${user} logout`)
  eventsWechaty.eventEmitter.emit('serverLogout')
}

async function onMessage (msg) {
	if(msg.self()){
		return;
	}	
	const content = msg.text();
	const contact = msg.talker();
	const room = msg.room();
	if(room){
		//console.log(`Message in room:Contact:${contact.name()},alias:${await room.alias(contact)},Room:${await room.topic()}`)
		const roomTopic = await room.topic();
		console.log(`Message in room:${roomTopic}`);
		// 学校机器人
		if(roomTopic == qsmxRoomTopic.QSMX_SCHOOL_BOT_ROOM_TOPIC){
			eventsParse.eventEmitter.emit('schoolRoom',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DINOSAUR_GOLD_BOT_ROOM_TOPIC){
			// 金店机器人
			eventsParse.eventEmitter.emit('goldRoom',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DINOSAUR_SILVER_BOT_ROOM_TOPIC){
			// 银店机器人
			eventsParse.eventEmitter.emit('sliverRoom',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DINOSAUR_COPPER_BOT_ROOM_TOPIC){
			// 铜店机器人
			eventsParse.eventEmitter.emit('copperRoom',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DINOSAUR_IRON_BOT_ROOM_TOPIC){
			// 铁店机器人
			eventsParse.eventEmitter.emit('ironRoom',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DINOSAUR_BLACK_BOT_ROOM_TOPIC){
			// 黑店机器人
			eventsParse.eventEmitter.emit('blackRoom',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DINOSAUR_NEW_BOT_ROOM_TOPIC){
			// 新人店机器人
			eventsParse.eventEmitter.emit('newRoom',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YBY_BOT_ROOM_TOPIC || roomTopic == qsmxRoomTopic.QSMX_NHS_ROOM || roomTopic == qsmxRoomTopic.QSMX_SDGY_ROOM){
			// 园博园机器人
			eventsParse.eventEmitter.emit('ybyRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_ZHUANYONG_ROOM){
			// 测试机器人
			eventsParse.eventEmitter.emit('testRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_CORE_ROOM){
			// 核心群机器人
			eventsParse.eventEmitter.emit('coreRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XHG_ROOM){
			// 鲜花港运营组机器人
			eventsParse.eventEmitter.emit('xhgRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XHGOTA_ROOM){
			// 鲜花港OTA报数组机器人
			eventsParse.eventEmitter.emit('xhgOTARoom', msg);
		} else if (roomTopic == qsmxRoomTopic.QSMX_XHGZHJQ_ROOM 
    		|| roomTopic == qsmxRoomTopic.QSMX_XHGZXCCYYZ_ROOM
    		|| roomTopic == qsmxRoomTopic.QSMX_XHGDPCYYZ_ROOM
    		|| roomTopic == qsmxRoomTopic.QSMX_XHGZZYYZ_ROOM) {
			// 鲜花港智慧景区报数组机器人
			eventsParse.eventEmitter.emit('xhgzhjqRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XHGDLHZ_ROOM){
			// 鲜花港蝶恋花馆报数组机器人
			eventsParse.eventEmitter.emit('xhgdlhRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XHGBSZ_ROOM){
			// 鲜花港新票务报数组
			eventsParse.eventEmitter.emit('xhgbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XHGDGBSZ_ROOM){
			// 鲜花港蝶馆新票务报数组
			eventsParse.eventEmitter.emit('xhgdgbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XHGZYPWBSZ_ROOM){
			// 鲜花港自营票务报数组
			eventsParse.eventEmitter.emit('xhgzypwbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XHGPWDXQ_ROOM){
			// 鲜花港票务对象群
			eventsParse.eventEmitter.emit('xhgpwdxqRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XHGDXZ_ROOM){
			// 鲜花港地下工作群
			eventsParse.eventEmitter.emit('xhgdxzRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_SXZ_ROOM){
			// 上线组
			eventsParse.eventEmitter.emit('sxzRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_SSGY_ROOM){
			// 水上公园运营机器人
			eventsParse.eventEmitter.emit('ssgyRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_SSGYBS_ROOM){
			// 水上公园报数机器人
			eventsParse.eventEmitter.emit('ssgybsRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_SSGYYY_ROOM){
			// 水上公园预约组
			eventsParse.eventEmitter.emit('ssgyyyRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_SSGYGBSZ_ROOM){
			// 水上公园新票务报数组
			eventsParse.eventEmitter.emit('ssgybszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_SSGYXSJBSZ_ROOM){
			// 水上公园雪世界报数组
			eventsParse.eventEmitter.emit('ssgyxsjbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_LDZ_ROOM){
			// 落地组机器人
			eventsParse.eventEmitter.emit('ldzRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_AS_ROOM){
			// 奥森运营组
			eventsParse.eventEmitter.emit('asyyRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XHGYY_ROOM){
			// 鲜花港预约组
			eventsParse.eventEmitter.emit('xhgyyRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XHGZSBS_ROOM){
			// 鲜花港真实报数组
			eventsParse.eventEmitter.emit('xhgzsbsRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XHGCWZ_ROOM){
			// 鲜花港财务组
			eventsParse.eventEmitter.emit('xhgcwzRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YBYBS_ROOM){
			// 园博园报数组
			eventsParse.eventEmitter.emit('ybybsRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YBYMPDZ_ROOM){
			// 园博园门票对账组
			eventsParse.eventEmitter.emit('ybympdzRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YBYSJTYZ_ROOM){
			// 园博园数据通用群
			eventsParse.eventEmitter.emit('ybysjtyRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YBYZMZ_ROOM){
			// 园博周末
			eventsParse.eventEmitter.emit('ybyzmzRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_FHLBSZ_ROOM){
			// 凤凰岭报数组
			eventsParse.eventEmitter.emit('fhlbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YMYZJC_ROOM){
			// 圆明园自驾船客服组
			eventsParse.eventEmitter.emit('ymyzjcRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YMYZXC_ROOM){
			// 圆明园自行车客服组
			eventsParse.eventEmitter.emit('ymyzxcRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YMYBSZ_ROOM){
			// 圆明园报数组
			eventsParse.eventEmitter.emit('ymybszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YMYJTC_ROOM){
			// 圆明园报数组
			eventsParse.eventEmitter.emit('ymyjtcRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_ZJSBSZ_ROOM){
			// 圆明园报数组
			eventsParse.eventEmitter.emit('zjsbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YQHZJC_ROOM){
			// 雁栖湖自驾船客服组
			eventsParse.eventEmitter.emit('yqhzjcRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YQHBSZ_ROOM){
			// 雁栖湖报数组
			eventsParse.eventEmitter.emit('yqhbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YQHDPCBSZ_ROOM){
			// 雁栖湖电瓶车报数组
			eventsParse.eventEmitter.emit('yqhdpcbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_BHZJC_ROOM){
			// 北海自驾船客服组
			eventsParse.eventEmitter.emit('bhzjcRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_BHBSZ_ROOM){
			// 北海报数组
			eventsParse.eventEmitter.emit('bhbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YYHZXC_ROOM){
			// 野鸭湖自驾车客服组
			eventsParse.eventEmitter.emit('yyhzxcRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YYHZJC_ROOM){
			// 野鸭湖自驾船客服组
			eventsParse.eventEmitter.emit('yyhzjcRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YYHBSZ_ROOM){
			// 野鸭湖报数组
			eventsParse.eventEmitter.emit('yyhbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XWHZJC_ROOM){
			// 玄武湖自驾船客服组
			eventsParse.eventEmitter.emit('xwhzjcRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XWHBSZ_ROOM){
			// 玄武湖报数组
			eventsParse.eventEmitter.emit('xwhbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XWHLZBSZ_ROOM){
			// 玄武湖龙舟报数组
			eventsParse.eventEmitter.emit('xwhlzRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XWHDPCBSZ_ROOM){
			// 玄武湖电瓶车报数组
			eventsParse.eventEmitter.emit('xwhdpcbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DRJGY_ROOM){
			// 狄仁杰文化公园报数组
			eventsParse.eventEmitter.emit('drjgyRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_SCHBSZ_ROOM){
			// 什刹海报数组
			eventsParse.eventEmitter.emit('schbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_SCHOTA_ROOM){
			// 2022年什刹海冰场OTA
			eventsParse.eventEmitter.emit('schotaRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_NHZXC_ROOM){
			// 南湖自行车客服
			eventsParse.eventEmitter.emit('nhzxcRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_NHZJC_ROOM){
			// 南湖游船客服
			eventsParse.eventEmitter.emit('nhzjcRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_NHZXCBSZ_ROOM){
			// 南湖自行车报数组
			eventsParse.eventEmitter.emit('nhzxcbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_NHZJCBSZ_ROOM){
			// 南湖游船报数组
			eventsParse.eventEmitter.emit('nhzjcbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_NHDPCBSZ_ROOM){
			// 南湖电瓶车报数组
			eventsParse.eventEmitter.emit('nhdpcbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YLHZJC_ROOM){
			// 云龙湖自驾船客服组
			eventsParse.eventEmitter.emit('ylhzjcRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YLHZJCBSZ_ROOM){
			// 云龙湖自驾船报数组
			eventsParse.eventEmitter.emit('ylhzjcbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_YLHDPCBSZ_ROOM){
			// 云龙湖电瓶车报数组
			eventsParse.eventEmitter.emit('ylhdpcbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_NBHZJC_ROOM){
			// 南北湖自驾船客服组
			eventsParse.eventEmitter.emit('nbhzjcRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_NBHZJCBSZ_ROOM){
			// 南北湖自驾船报数组
			eventsParse.eventEmitter.emit('nbhzjcbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_NBHPHTBSZ_ROOM){
			// 南北湖皮划艇报数组
			eventsParse.eventEmitter.emit('nbhphtbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_NBHDPCBSZ_ROOM){
			// 南北湖电瓶车报数组
			eventsParse.eventEmitter.emit('nbhdpcbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_TGYJDCSBSZ_ROOM){
			// 天宫院街道城市管理平台
			eventsParse.eventEmitter.emit('tgyjdcsbszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_TGYWGYBSZ_ROOM){
			// 天宫院网格员小组001
			eventsParse.eventEmitter.emit('tgywgybszRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XTYBYZXC_ROOM){
			// 邢台园博园自行车客服群
			eventsParse.eventEmitter.emit('xtybyzxcRoom', msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_XTYBYBSZ_ROOM){
			// 邢台园博园自行车客服群
			eventsParse.eventEmitter.emit('xtybybszRoom', msg);
		}
	}else{
		console.log(`Message not in room:Content:${content},Contact:${contact.name()}`)
	}
}

// const name = 'padplus-qsmx'

// const token = 'puppet_donut_181e4c8f436a8250';
// const bot = new Wechaty({
//   puppet: 'wechaty-puppet-service',
//   puppetOptions: {
//     token,
//   },
//   name: name
// });

const name = 'padplus-qsmx'

const puppet = new PuppetPadlocal({
	token: "a81c7625bb1447f7af6b956a6b2d5421"
})

const bot = new Wechaty({
    name: name,
    puppet,
})





bot.on('scan',    onScan);
bot.on('login',   onLogin);
bot.on('logout',  onLogout);
bot.on('message', onMessage);

console.log('mybot.js已准备好');
exports.bot = bot;
exports.qsmxRoomTopic = qsmxRoomTopic;



