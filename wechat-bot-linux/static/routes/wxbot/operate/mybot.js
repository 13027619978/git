const {Wechaty,log} = require('wechaty')
var eventsParse = require('./myparse.js')
var eventsWechaty = require('./wechaty.js')
log.level('warn')
const qsmxRoomTopic = {
	QSMX_YBY_BOT_ROOM_TOPIC : '智能客服-智慧园博-测试',
	QSMX_SCHOOL_BOT_ROOM_TOPIC : '15班家长群',
	QSMX_DINOSAUR_BLACK_1_BOT_ROOM_TOPIC :"④黑级店⚫️一组",
	QSMX_DINOSAUR_BLACK_2_BOT_ROOM_TOPIC :"④黑级店⚫️二组",
	QSMX_DINOSAUR_GREEN_1_BOT_ROOM_TOPIC :"③绿级店💚一组",
	QSMX_DINOSAUR_GREEN_2_BOT_ROOM_TOPIC :"③绿级店💚二组",
	QSMX_DINOSAUR_RED_1_BOT_ROOM_TOPIC :"②红级店️一组",
	QSMX_DINOSAUR_RED_2_BOT_ROOM_TOPIC :"②红级店️二组",
	QSMX_DINOSAUR_GOLD_1_BOT_ROOM_TOPIC :"①金级店💛一组",
	QSMX_DINOSAUR_DIAMOND_1_BOT_ROOM_TOPIC :"No.1💎钻石店💎"
};

function onScan (qrcode, status) {
	
  require('qrcode-terminal').generate(qrcode, { small: true })  // show qrcode on console

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  //console.log(qrcodeImageUrl)
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
		console.log('self message!!!');
		return;
	}	
	const content = msg.text();
	const contact = msg.from();
	const room = msg.room();
	if(room){
		//console.log(`Message in room:Contact:${contact.name()},alias:${await room.alias(contact)},Room:${await room.topic()}`)
		const roomTopic = await room.topic();
		console.log(`Message in room:${roomTopic}`);
		if(roomTopic == qsmxRoomTopic.QSMX_SCHOOL_BOT_ROOM_TOPIC){
			eventsParse.eventEmitter.emit('schoolRoom',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DINOSAUR_BLACK_1_BOT_ROOM_TOPIC){
			eventsParse.eventEmitter.emit('blackRoom1',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DINOSAUR_BLACK_2_BOT_ROOM_TOPIC){
			eventsParse.eventEmitter.emit('blackRoom2',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DINOSAUR_GREEN_1_BOT_ROOM_TOPIC){
			eventsParse.eventEmitter.emit('greenRoom1',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DINOSAUR_GREEN_2_BOT_ROOM_TOPIC){
			eventsParse.eventEmitter.emit('greenRoom2',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DINOSAUR_RED_1_BOT_ROOM_TOPIC){
			eventsParse.eventEmitter.emit('redRoom1',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DINOSAUR_RED_2_BOT_ROOM_TOPIC){
			eventsParse.eventEmitter.emit('redRoom2',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DINOSAUR_GOLD_1_BOT_ROOM_TOPIC){
			eventsParse.eventEmitter.emit('goldRoom1',msg);
		}else if(roomTopic == qsmxRoomTopic.QSMX_DINOSAUR_DIAMOND_1_BOT_ROOM_TOPIC){
			eventsParse.eventEmitter.emit('diamondRoom1',msg);
		}
	}else{
		console.log(`Message not in room:Content:${content},Contact:${contact.name()}`)
	}

}

async function onRoomJoin (room, inviteeList, inviter) {
	console.log( 'Bot', 'EVENT: room-join - Room "%s" got new member "%s", invited by "%s"',
						await room.topic(),
						inviteeList.map(c => c.name()).join(','),
						inviter.name(),
					);
	console.log('bot room-join room id:', room.id);
	const topic = await room.topic();
	var welcomeStr = null;
	if(topic == qsmxRoomTopic.QSMX_YBY_BOT_ROOM_TOPIC){
		welcomeStr = `欢迎加入【骑思妙享】- "${topic}"群\r\n`+`\r\n机器人功能：\r\n\r\n☀按时间退款\r\n☀全额退款\r\n☀使用状态查询\r\n☀订单明细查询\r\n\r\n使用方法：\r\n\r\n1️⃣@机器人\r\n2️⃣输入想要执行的命令\r\n3️⃣等待机器人回复\r\n\r\n 注：在该群里不要发和本群无关的信息，否则机器人会把你移除该群哦！`;
	}else if(topic == qsmxRoomTopic.QSMX_KL_BOT_ROOM_TOPIC){
		welcomeStr = '123';
	}
	if(welcomeStr){
		await room.say(welcomeStr, inviteeList[0]);
	}
  
}

async function onRoomLeave (room, leaverList) {
  console.log('Bot', 'EVENT: room-leave - Room "%s" lost member "%s"',
                  await room.topic(),
                  leaverList.map(c => c.name()).join(','),
              )
  const topic = await room.topic()
  const name  = leaverList[0] ? leaverList[0].name() : 'no contact!'
  await room.say(`通报：已将群成员 "${name}" 从 "${topic}" 移除！` )
}

async function onRoomTopic (room, topic, oldTopic, changer) {
	
    console.log(`通报：群名称从"${oldTopic}"修改成"${topic}"修改人"${changer.name()}"`)
    await room.say(`通报：群名称从"${oldTopic}"修改成"${topic}"修改人"${changer.name()}"`)
}

async function onReady() {
		console.log('loading Contact and room completed!')
		const contactList = await bot.Contact.findAll() 
		for(var i = 0; i < contactList.length; i++){
			console.log(`${i+1} name=${contactList[i].payload.name} alias=${contactList[i].payload.alias}`)
		} 
		const roomList = await bot.Room.findAll()
		for(var i = 0; i < roomList.length; i++){
			console.log(`${i+1} roomTopic=${roomList[i].payload.topic}`)
		}
}

function onError(e) {
    console.error('Bot error:', e)
}
const puppet = 'wechaty-puppet-padchat';
const WECHATY_PUPPET_PADCHAT_TOKEN = 'puppet_padchat_1ff2eb76dbe45b68';
const puppetOptions = {
  token: WECHATY_PUPPET_PADCHAT_TOKEN,
};
const bot = new Wechaty({
  name: 'bot-qsmx',
  puppet,
  puppetOptions,
});

bot.on('scan',    onScan);
bot.on('login',   onLogin);
bot.on('logout',  onLogout);
bot.on('message', onMessage);
bot.on('room-join', onRoomJoin);
bot.on('room-leave', onRoomLeave);
bot.on('room-topic', onRoomTopic);
bot.on('ready', onReady);
bot.on('error', onError);
console.log('mybot.js已准备好');
exports.bot = bot;
exports.qsmxRoomTopic = qsmxRoomTopic;



