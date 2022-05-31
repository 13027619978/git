var wechat = require('./mybot.js');
var events = require('events');
var eventEmitter = new events.EventEmitter()

eventEmitter.setMaxListeners(76);

/**************************************************/
/****************** 家长群代码 **********************/
/**************************************************/
var onSchoolRoomEven = require('./room/schoolRoom');
async function onSchoolRoom(msg){
	onSchoolRoomEven.schoolRoomDeal(msg);

}
																
/*********************************/								
/*		恐龙群代码				*/
/*********************************/	
var dinosaurRoomEven = require('./room/dinosaurRoom');
async function goldRoom(msg){
	dinosaurRoomEven.dinosaurRoomDeal(msg);
}

async function sliverRoom(msg){
	dinosaurRoomEven.dinosaurRoomDeal(msg);
}

async function copperRoom(msg){
	dinosaurRoomEven.dinosaurRoomDeal(msg);
}

async function ironRoom(msg){
	dinosaurRoomEven.dinosaurRoomDeal(msg);
}

async function blackRoom(msg){
	dinosaurRoomEven.dinosaurRoomDeal(msg);
}

async function newRoom(msg){
	dinosaurRoomEven.dinosaurRoomDeal(msg);
}


/******************** 园博园机器人 *********************/
var ybyRoomEven = require('./room/ybyRoom');
async function ybyRoom(msg){
	ybyRoomEven.ybyRoomDeal(msg);
}

var ybyzmzRoomEven = require('./room/ybyzmzRoom');
async function ybyzmzRoom(msg){
	ybyzmzRoomEven.ybyzmzRoomDeal(msg);
}


/******************** 测试群代码 ***********************/
var testRoomEven = require('./room/testRoom');
async function testRoom(msg){
	testRoomEven.testRoomDeal(msg);
}

/******************** 核心群代码 ************************/
var coreRoomEven = require('./room/coreRoom');
async function coreRoom(msg){
	coreRoomEven.coreRoomDeal(msg);
}

/******************** 上线组 ************************/
var sxzRoomEven = require('./room/sxzRoom');
async function sxzRoom(msg){
	sxzRoomEven.sxzRoomDeal(msg);
}

/******************** 水上公园运营 ************************/
var ssgyRoomEven = require('./room/ssgyRoom');
async function ssgyRoom(msg){
	ssgyRoomEven.ssgyRoomDeal(msg);
}

/******************** 水上公园报数 *************************/
var ssgybsRoomEven = require('./room/ssgybsRoom');
async function ssgybsRoom(msg){
	ssgybsRoomEven.ssgybsRoomDeal(msg);
}

/******************** 水上公园预约组 *************************/
var asyyyyRoomEven = require('./room/ssgyyyRoom');
async function ssgyyyRoom(msg){
	asyyyyRoomEven.ssgyyyRoomDeal(msg);
}

/******************** 水上公园新票务报数组 *************************/
var ssgybszRoomEven = require('./room/ssgybszRoom');
async function ssgybszRoom(msg){
	ssgybszRoomEven.ssgybszRoomDeal(msg);
}

/******************** 水上公园雪世界报数组 *************************/
var ssgyxsjbszRoomEven = require('./room/ssgyxsjbszRoom');
async function ssgyxsjbszRoom(msg){
	ssgyxsjbszRoomEven.ssgyxsjbszRoomDeal(msg);
}

/******************** 骑思妙享落地组 *************************/
var ldzRoomEven = require('./room/ldzRoom');
async function ldzRoom(msg){
	ldzRoomEven.ldzRoomDeal(msg);
}

/******************** 奥森运营组 *************************/
var asyyRoomEven = require('./room/asyyRoom');
async function asyyRoom(msg){
	asyyRoomEven.asyyRoomDeal(msg);
}

/******************** 鲜花港运营数据组代码 ************************/
var xhgRoomEven = require('./room/xhgRoom');
async function xhgRoom(msg){
	xhgRoomEven.xhgRoomDeal(msg);
}

/******************** 鲜花港OTA报数组 ************************/
var xhgOTARoomEven = require('./room/xhgOTARoom');
async function xhgOTARoom(msg){
	xhgOTARoomEven.xhgOTARoomDeal(msg);
}

/******************** 鲜花港智慧景区一期问题沟通群 ************************/
var xhgzhjqRoomEven = require('./room/xhgzhjqRoom');
async function xhgzhjqRoom(msg){
	xhgzhjqRoomEven.xhgzhjqRoomDeal(msg);
}

/******************** 鲜花港蝶恋花报数组 ************************/
var xhgdlhRoomEven = require('./room/xhgdlhRoom');
async function xhgdlhRoom(msg){
	xhgdlhRoomEven.xhgdlhRoomDeal(msg);
}

/******************** 鲜花港预约组 *************************/
var xhgyyRoomEven = require('./room/xhgyyRoom');
async function xhgyyRoom(msg){
	xhgyyRoomEven.xhgyyRoomDeal(msg);
}

/******************** 鲜花港真实报数组 *************************/
var xhgzsbsRoomEven = require('./room/xhgzsbsRoom');
async function xhgzsbsRoom(msg){
	xhgzsbsRoomEven.xhgzsbsRoomDeal(msg);
}

/******************** 鲜花港财务组 *************************/
var xhgcwzRoomEven = require('./room/xhgcwzRoom');
async function xhgcwzRoom(msg){
	xhgcwzRoomEven.xhgcwzRoomDeal(msg);
}

/******************** 鲜花港新票务报数组 *************************/
var xhgbszRoomEven = require('./room/xhgbszRoom');
async function xhgbszRoom(msg){
	xhgbszRoomEven.xhgbszRoomDeal(msg);
}

/******************** 鲜花港蝶馆新票务报数组 *************************/
var xhgdgbszRoomEven = require('./room/xhgdgbszRoom');
async function xhgdgbszRoom(msg){
	xhgdgbszRoomEven.xhgdgbszRoomDeal(msg);
}

/******************** 鲜花港自营票务报数组 *************************/
var xhgzypwbszRoomEven = require('./room/xhgzypwbszRoom');
async function xhgzypwbszRoom(msg){
	xhgzypwbszRoomEven.xhgzypwbszRoomDeal(msg);
}

/******************** 鲜花港票务对象群 *************************/
var xhgpwdxqRoomEven = require('./room/xhgpwdxqRoom');
async function xhgpwdxqRoom(msg){
	xhgpwdxqRoomEven.xhgpwdxqRoomDeal(msg);
}

/******************** 鲜花港地下工作群 *************************/
var xhgdxzRoomEven = require('./room/xhgdxzRoom.js');
async function xhgdxzRoom(msg){
	xhgdxzRoomEven.xhgdxzRoomDeal(msg);
}

/******************** 园博园报数组 *************************/
var ybybsRoomEven = require('./room/ybybsRoom');
async function ybybsRoom(msg){
	ybybsRoomEven.ybybsRoomDeal(msg);
}

/******************** 园博园报数组 *************************/
var ybympdzRoomEven = require('./room/ybympdzRoom');
async function ybympdzRoom(msg){
	ybympdzRoomEven.ybympdzRoomDeal(msg);
}

/******************** 园博园数据通用群 *************************/
var ybysjtyRoomEven = require('./room/ybysjtyRoom');
async function ybysjtyRoom(msg){
	ybysjtyRoomEven.ybysjtyRoomDeal(msg);
}

/******************** 凤凰岭报数组 *************************/
var fhlbszRoomEven = require('./room/fhlbszRoom');
async function fhlbszRoom(msg){
	fhlbszRoomEven.fhlbszRoomDeal(msg);
}

/******************** 圆明园自驾船客服组 *************************/
var ymyzjcRoomEven = require('./room/ymyzjcRoom');
async function ymyzjcRoom(msg){
	ymyzjcRoomEven.ymyzjcRoomDeal(msg);
}

/******************** 圆明园自行车客服组 *************************/
var ymyzxcRoomEven = require('./room/ymyzxcRoom');
async function ymyzxcRoom(msg){
	ymyzxcRoomEven.ymyzxcRoomDeal(msg);
}

/******************** 圆明园报数组 *************************/
var ymybszRoomEven = require('./room/ymybszRoom');
async function ymybszRoom(msg){
	ymybszRoomEven.ymybszRoomDeal(msg);
}

/******************** 正觉寺报数组 *************************/
var zjsbszRoomEven = require('./room/zjsbszRoom');
async function zjsbszRoom(msg){
	zjsbszRoomEven.zjsbszRoomDeal(msg);
}

/******************** 圆明园交通船组 *************************/
var ymyjtcRoomEven = require('./room/ymyjtcRoom');
async function ymyjtcRoom(msg){
	ymyjtcRoomEven.ymyjtcRoomDeal(msg);
}

/******************** 雁栖湖自驾船客服 *************************/
var yqhzjcRoomEven = require('./room/yqhzjcRoom');
async function yqhzjcRoom(msg){
	yqhzjcRoomEven.yqhzjcRoomDeal(msg);
}

/******************** 雁栖湖报数组 *************************/
var yqhbszRoomEven = require('./room/yqhbszRoom');
async function yqhbszRoom(msg){
	yqhbszRoomEven.yqhbszRoomDeal(msg);
}

/******************** 雁栖湖电瓶车报数组 *************************/
var yqhdpcbszRoomEven = require('./room/yqhdpcbszRoom');
async function yqhdpcbszRoom(msg){
	yqhdpcbszRoomEven.yqhdpcbszRoomDeal(msg);
}

/******************** 北海自驾船客服 *************************/
var bhzjcRoomEven = require('./room/bhzjcRoom');
async function bhzjcRoom(msg){
	bhzjcRoomEven.bhzjcRoomDeal(msg);
}

/******************** 北海报数组 *************************/
var bhbszRoomEven = require('./room/bhbszRoom');
async function bhbszRoom(msg){
	bhbszRoomEven.bhbszRoomDeal(msg);
}



/******************** 野鸭湖自驾车客服 *************************/
var yyhzxcRoomEven = require('./room/yyhzxcRoom');
async function yyhzxcRoom(msg){
	yyhzxcRoomEven.yyhzxcRoomDeal(msg);
}

/******************** 野鸭湖自驾车客服 *************************/
var yyhzjcRoomEven = require('./room/yyhzjcRoom');
async function yyhzjcRoom(msg){
	yyhzjcRoomEven.yyhzjcRoomDeal(msg);
}

/******************** 野鸭湖报数组 *************************/
var yyhbszRoomEven = require('./room/yyhbszRoom');
async function yyhbszRoom(msg){
	yyhbszRoomEven.yyhbszRoomDeal(msg);
}



/******************** 玄武湖自驾船 *************************/
var xwhzjcRoomEven = require('./room/xwhzjcRoom');
async function xwhzjcRoom(msg){
	xwhzjcRoomEven.xwhzjcRoomDeal(msg);
}

/******************** 玄武湖报数组 *************************/
var xwhbszRoomEven = require('./room/xwhbszRoom');
async function xwhbszRoom(msg){
	xwhbszRoomEven.xwhbszRoomDeal(msg);
}

/******************** 玄武湖电瓶车报数组 *************************/
var xwhdpcbszRoomEven = require('./room/xwhdpcbszRoom');
async function xwhdpcbszRoom(msg){
	xwhdpcbszRoomEven.xwhdpcbszRoomDeal(msg);
}

/******************** 狄仁杰文化公园报数组 *************************/
var drjgyRoomEven = require('./room/drjgyRoom');
async function drjgyRoom(msg){
	drjgyRoomEven.drjgyRoomDeal(msg);
}

/******************** 什刹海报数组 *************************/
var schbszRoomEven = require('./room/schbszRoom');
async function schbszRoom(msg){
	schbszRoomEven.schbszRoomDeal(msg);
}

/******************** 什刹海OTA组 *************************/
var schotaRoomEven = require('./room/schotaRoom');
async function schotaRoom(msg){
	schotaRoomEven.schotaRoomDeal(msg);
}

/******************** 南湖自行车报数组 *************************/
var nhzxcRoomEven = require('./room/nhzxcRoom');
async function nhzxcRoom(msg){
	nhzxcRoomEven.nhzxcRoomDeal(msg);
}
var nhzjcRoomEven = require('./room/nhzjcRoom');
async function nhzjcRoom(msg){
	nhzjcRoomEven.nhzjcRoomDeal(msg);
}
var nhzjcbszRoomEven = require('./room/nhzjcbszRoom');
async function nhzjcbszRoom(msg){
	nhzjcbszRoomEven.nhzjcbszRoomDeal(msg);
}
var nhdpcbszRoomEven = require('./room/nhdpcbszRoom');
async function nhdpcbszRoom(msg){
	nhdpcbszRoomEven.nhdpcbszRoomDeal(msg);
}
var nhzxcbszRoomEven = require('./room/nhzxcbszRoom');
async function nhzxcbszRoom(msg){
	nhzxcbszRoomEven.nhzxcbszRoomDeal(msg);
}

/******************** 云龙湖 *************************/
var ylhzjcRoomEven = require('./room/ylhzjcRoom');
async function ylhzjcRoom(msg){
	ylhzjcRoomEven.ylhzjcRoomDeal(msg);
}

var ylhzjcbszRoomEven = require('./room/ylhzjcbszRoom');
async function ylhzjcbszRoom(msg){
	ylhzjcbszRoomEven.ylhzjcbszRoomDeal(msg);
}

var ylhdpcbszRoomEven = require('./room/ylhdpcbszRoom');
async function ylhdpcbszRoom(msg){
	ylhdpcbszRoomEven.ylhdpcbszRoomDeal(msg);
}

/******************** 南北湖 *************************/
var nbhzjcRoomEven = require('./room/nbhzjcRoom');
async function nbhzjcRoom(msg){
	nbhzjcRoomEven.nbhzjcRoomDeal(msg);
}

var nbhzjcbszRoomEven = require('./room/nbhzjcbszRoom');
async function nbhzjcbszRoom(msg){
	nbhzjcbszRoomEven.nbhzjcbszRoomDeal(msg);
}

var nbhphtbszRoomEven = require('./room/nbhphtbszRoom');
async function nbhphtbszRoom(msg){
	nbhphtbszRoomEven.nbhphtbszRoomDeal(msg);
}

// var nbhdpcbszRoomEven = require('./room/nbhdpcbszRoom');
// async function nbhdpcbszRoom(msg){
// 	nbhdpcbszRoomEven.nbhdpcbszRoomDeal(msg);
// }

/******************** 天宫院 *************************/
var tgyjdcsbszRoomEven = require('./room/tgyjdcsbszRoom');
async function tgyjdcsbszRoom(msg){
	tgyjdcsbszRoomEven.tgyjdcsbszRoomDeal(msg);
}

var tgywgybszRoomEven = require('./room/tgywgybszRoom');
async function tgywgybszRoom(msg){
	tgywgybszRoomEven.tgywgybszRoomDeal(msg);
}

/******************** 邢台园博园 *************************/
var xtybyzxcRoomEven = require('./room/xtybyzxcRoom');
async function xtybyzxcRoom(msg){
	xtybyzxcRoomEven.xtybyzxcRoomDeal(msg);
}

var xtybybszRoomEven = require('./room/xtybybszRoom');
async function xtybybszRoom(msg){
	xtybybszRoomEven.xtybybszRoomDeal(msg);
}


eventEmitter.on('schoolRoom', onSchoolRoom);
eventEmitter.on('goldRoom', goldRoom);
eventEmitter.on('sliverRoom', sliverRoom);
eventEmitter.on('copperRoom', copperRoom);
eventEmitter.on('ironRoom', ironRoom);
eventEmitter.on('blackRoom', blackRoom);
eventEmitter.on('newRoom', newRoom);
eventEmitter.on('ybyRoom', ybyRoom);
eventEmitter.on('testRoom', testRoom);
eventEmitter.on('coreRoom', coreRoom);
eventEmitter.on('sxzRoom', sxzRoom);

eventEmitter.on('ssgyRoom', ssgyRoom);
eventEmitter.on('ssgyyyRoom', ssgyyyRoom);
eventEmitter.on('ssgybsRoom', ssgybsRoom);
eventEmitter.on('asyyRoom', asyyRoom);
eventEmitter.on('ssgybszRoom', ssgybszRoom);
eventEmitter.on('ssgyxsjbszRoom', ssgyxsjbszRoom);

eventEmitter.on('ldzRoom', ldzRoom);
eventEmitter.on('xhgRoom', xhgRoom);
eventEmitter.on('xhgOTARoom', xhgOTARoom);
eventEmitter.on('xhgzhjqRoom', xhgzhjqRoom);
eventEmitter.on('xhgdlhRoom', xhgdlhRoom);
eventEmitter.on('xhgzsbsRoom', xhgzsbsRoom);
eventEmitter.on('xhgyyRoom', xhgyyRoom);
eventEmitter.on('xhgcwzRoom', xhgcwzRoom);
eventEmitter.on('xhgbszRoom', xhgbszRoom);
eventEmitter.on('xhgdgbszRoom', xhgdgbszRoom);
eventEmitter.on('xhgzypwbszRoom', xhgzypwbszRoom);
eventEmitter.on('xhgpwdxqRoom', xhgpwdxqRoom);
eventEmitter.on('xhgdxzRoom', xhgdxzRoom);

eventEmitter.on('ybybsRoom', ybybsRoom);
eventEmitter.on('ybympdzRoom', ybympdzRoom);
eventEmitter.on('ybysjtyRoom', ybysjtyRoom);
eventEmitter.on('ybyzmzRoom', ybyzmzRoom);
eventEmitter.on('fhlbszRoom', fhlbszRoom);
eventEmitter.on('ymyzjcRoom', ymyzjcRoom);
eventEmitter.on('ymyzxcRoom', ymyzxcRoom);
eventEmitter.on('ymybszRoom', ymybszRoom);
eventEmitter.on('ymyjtcRoom', ymyjtcRoom);
eventEmitter.on('zjsbszRoom', zjsbszRoom);

eventEmitter.on('yqhzjcRoom', yqhzjcRoom);
eventEmitter.on('yqhbszRoom', yqhbszRoom);
eventEmitter.on('yqhdpcbszRoom', yqhdpcbszRoom);

eventEmitter.on('bhzjcRoom', bhzjcRoom);
eventEmitter.on('bhbszRoom', bhbszRoom);

eventEmitter.on('yyhzxcRoom', yyhzxcRoom);
eventEmitter.on('yyhzjcRoom', yyhzjcRoom);
eventEmitter.on('yyhbszRoom', yyhbszRoom);


eventEmitter.on('xwhzjcRoom', xwhzjcRoom);
eventEmitter.on('xwhbszRoom', xwhbszRoom);
eventEmitter.on('xwhdpcbszRoom', xwhdpcbszRoom);

eventEmitter.on('drjgyRoom', drjgyRoom);

eventEmitter.on('schbszRoom', schbszRoom);
eventEmitter.on('schotaRoom', schotaRoom);

eventEmitter.on('nhzxcRoom', nhzxcRoom);
eventEmitter.on('nhzjcRoom', nhzjcRoom);
eventEmitter.on('nhzjcbszRoom', nhzjcbszRoom);
eventEmitter.on('nhdpcbszRoom', nhdpcbszRoom);
eventEmitter.on('nhzxcbszRoom', nhzxcbszRoom);

eventEmitter.on('ylhzjcRoom', ylhzjcRoom);
eventEmitter.on('ylhzjcbszRoom', ylhzjcbszRoom);
eventEmitter.on('ylhdpcbszRoom', ylhdpcbszRoom);

eventEmitter.on('nbhzjcRoom', nbhzjcRoom);
eventEmitter.on('nbhzjcbszRoom', nbhzjcbszRoom);
eventEmitter.on('nbhphtbszRoom', nbhphtbszRoom);
// eventEmitter.on('nbhdpcbszRoom', nbhdpcbszRoom);

eventEmitter.on('tgyjdcsbszRoom', tgyjdcsbszRoom);
eventEmitter.on('tgywgybszRoom', tgywgybszRoom);

eventEmitter.on('xtybyzxcRoom', xtybyzxcRoom);
eventEmitter.on('xtybybszRoom', xtybybszRoom);

console.log('myenvents.js已准备好')

exports.eventEmitter = eventEmitter

