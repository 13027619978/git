var wechat = require('../mybot.js');
const http = require('http');
const host = "47.94.82.166";

async function ymyjtcRoomDeal(msg){
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
	if(msg.type() == wechat.bot.Message.Type.Text){
		//使用方法
		if(content == '使用方法'){
			room.say("机器人使用方法:\n----------\n1)交通船停运\n2)交通船启用\n3)查询交通船状态\n----------");
		}
		
		if(content == '交通船停运'){
			changeStatus(host, 0, room);
		}
		
		if(content == '交通船启用'){
			changeStatus(host, 1, room);
		}
		
		if(content == '查询交通船状态'){
			getStatus(host, room);
		}
	}
};

function changeStatus(host, status, room){
	const options = {
		hostname: host,
		port: 3001,
		path: '/datav/ymy/changeBoatTicketsStatus?status='+ status,
		method: 'GET'
	};
	
	var buffers = [];
	var nread = 0;
	const req = http.request(options, (res) => {
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
			console.log(res);
			room.say(res.message);
		})
	});
	 //  res.on('data', (d) => {
	 //    var res = JSON.parse(d.toString());
		// console.log(res);
	 //    if(res.code == "SUCCESS"){
		// 	console.log(res.msg);
		// 	room.say(res.msg);
	 //    }
	 //  });
	 
	 req.on('error', (e) => {
	   console.error(`problem with request: ${e.message}`);
	 });
	
	req.end();
}

function getStatus(host, room){
	const options = {
		hostname: host,
		port: 3001,
		path: '/datav/ymy/getBoatTicketsStatus',
		method: 'GET'
	};
	
	var buffers = [];
	var nread = 0;
	const req = http.request(options, (res) => {
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
			console.log(res);
			if(res.status == '0'){
				room.say('当前状态：已停运');
			}else{
				room.say('当前状态：已启用');
			}
		})
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

module.exports = {ymyjtcRoomDeal};