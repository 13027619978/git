var express=require('express');
var router = express.Router();
var http = require('http');

router.post('/addUser', async function(req1, res1){
	let name = req1.body.name;
	let phone = req1.body.phone;
	let idCard = req1.body.identifyNum;
	let type = req1.body.type;
	let imgUri = req1.body.imgUri;
	let header = req1.body.header;
	let autograph = req1.body.autograph;
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
	
	req.write(JSON.stringify({personList:[{name:name,phone:phone,identifyNum:idCard,type:type,imageUri:imgUri,autograph:autograph,groupList:groupList}]}));
	
	req.end();
})



module.exports = router;