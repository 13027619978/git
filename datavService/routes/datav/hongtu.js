var express=require('express');
var router = express.Router();
var http = require('http');
const axios = require('axios');
const FormData = require('form-data');

router.post('/sendSms', async function(req1, res1){
	let dataInfo = JSON.parse(req1.body.data);
	let healthyStateDesc = dataInfo.healthyStateDesc;
	let xqName = dataInfo.deviceName;
	let autograph = dataInfo.autograph;
	let userName = dataInfo.personName;
	let smsContent = '【健康码异常】' + xqName + ',姓名：' + userName + ',' + autograph + ',健康码：' + healthyStateDesc;
	console.log(healthyStateDesc);
	if(healthyStateDesc == '黄码' || healthyStateDesc == '红码'){
		const form = new FormData();
		form.append('userid', 170);
		form.append('account', 'XZXC');
		form.append('password', '123456');
		form.append('mobile', '13027619978');
		form.append('content', smsContent);
		form.append('sendTime', '');
		form.append('action', 'send');
		form.append('extno', '');
		
		axios({
			url: 'http://47.95.121.34:8888/sms.aspx',
			method: 'post',
			data: form,
			headers: {
				'content-type':'application/x-www-form-urlencoded',
			}
		})
		.then(function(res){
			console.log(res);
			res1.send('发送成功');
		})
		.catch(function(err){
			console.log(err);
		})
	}	
})


function str2utf8(str){
	let encoder = new TextEncoder('utf8');
	return encoder.encode(str);
}

router.post('/addUser', async function(req1, res1){
	let name = req1.body.name;
	let phone = req1.body.phone;
	let idCard = req1.body.identifyNum;
	let type = req1.body.type;
	let imgUri = req1.body.imgUri;
	let header = req1.body.header;
	let ext = req1.body.ext;
	let groupList = req1.body.groupList;
	const options = {
		hostname: '211.103.164.198',
		path: '/v1/api/person/batchAdd',
		method: 'POST',
		headers: header
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
			res1.send(res);
		})
	});
	
	req.write(JSON.stringify({personList:[{name:name,phone:phone,identifyNum:idCard,type:type,imageUri:imgUri,ext:ext,groupList:groupList}]}));
	
	req.end();
})

router.post('/addUser/v1', async function(req1, res1){
	let name = req1.body.name;
	let phone = req1.body.phone;
	let idCard = req1.body.identifyNum;
	let type = req1.body.type;
	let imgUri = req1.body.imgUri;
	let header = req1.body.header;
	let ext = req1.body.ext;
	let groupList = req1.body.groupList;
	const options = {
		hostname: '223.71.29.67',
		port: '10080',
		path: '/v1/api/person/batchAdd',
		method: 'POST',
		headers: header
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
			res1.send(res);
		})
	});
	
	req.write(JSON.stringify({personList:[{name:name,phone:phone,identifyNum:idCard,type:type,imageUri:imgUri,ext:ext,groupList:groupList}]}));
	
	req.end();
})



module.exports = router;