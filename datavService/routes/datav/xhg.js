var express=require('express');
var router = express.Router();
var http = require('http');
var host = 'dev.meirenji.cn';
var querystring = require('querystring');
var util = require('util');
const fs = require('fs');
let path = require('path');


router.get('/getDayInPeople', async function(req1, res1){
	console.log(querystring.stringify({
		access_token: '6a3d1c3a-1738-42f2-9f57-f4ec70bedf72',
		appId: 'MRJ_ed1e658db20e40febf50bba423fdb057',
		start: '2021-04-02',
		end: '2021-04-02'
	}));
	const options = {
		hostname: host,
		path: '/api/v2/multipleInstance/traffic/day',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			res1.send(d);
		});
	});
	
	req.write(querystring.stringify({
		access_token: '6a3d1c3a-1738-42f2-9f57-f4ec70bedf72',
		appId: 'MRJ_ed1e658db20e40febf50bba423fdb057',
		start: '2021-04-02',
		end: '2021-04-02'
	}));
	req.end();
})

// 鲜花港3000二维码
router.get('/checkTicket', async function(req, res){
	let ticket = req.query.ticket;
	if(!ticket){
		res.send({
			"code": "fail",
			"message": "ticket不能为空"
		});
	}
	fs.readFile(path.resolve(__dirname, './jsonData/xhgUsedTicket.json'), 'utf8', function(err, data){
		if(err){
		    return console.error(err);
		}
		data = JSON.parse(data);
		let xhgUsedTicket = data.usedTicketList;
		let useState = 0;
		xhgUsedTicket.forEach(function(value, key){
			if(value.ticket == ticket){
				useState = 1;
			}
		})
		if(useState == 1){
			res.send({
				msg: '核销失败，该门票已经核销',
				code: 'fail',
				data: {
					"ticket": ticket
				}
			});
		}else{
			fs.readFile(path.resolve(__dirname, './jsonData/xhgTicket.json'), 'utf8', function(err, data){
				if(err){
			        return console.error(err);
				}
				data = JSON.parse(data);
				var ticketList = data.ticketList;
				if(ticketList.indexOf(ticket) != -1){
					ticketList.splice(ticketList.indexOf(ticket), 1);
					var jsonData = {
						ticketList: ticketList
					};
					fs.writeFile(path.resolve(__dirname, './jsonData/xhgTicket.json'), JSON.stringify(jsonData),function(err){
						if(err){
							console.error(err);
							res.send({
								"code": "fail",
								"message": "异常错误，核销失败"
							});
							return;
						}
						fs.readFile(path.resolve(__dirname, './jsonData/xhgUsedTicket.json'), 'utf8', function(err, data){
							if(err){
						        return console.error(err);
							}
							data = JSON.parse(data);
							var usedTicketList = data.usedTicketList;
							var nowDate = new Date();
							var nowYear = nowDate.getFullYear();
							var nowMonth = nowDate.getMonth() + 1;
							nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
							var nowDay = nowDate.getDate();
							nowDay = nowDay>9?nowDay:'0'+nowDay;
							var nowHour = nowDate.getHours();
							nowHour = nowHour>9?nowHour:'0'+nowHour;
							var nowMinute = nowDate.getMinutes();
							nowMinute = nowMinute>9?nowMinute:'0'+nowMinute;
							var nowSeconds = nowDate.getSeconds();
							nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
							var nowTime = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinute + ':' + nowSeconds;
							var usedItem = {
								time: nowTime,
								ticket: ticket
							};
							
							usedTicketList.push(usedItem);
							var usedJsonData = {
								usedTicketList: usedTicketList
							};
							fs.writeFile(path.resolve(__dirname, './jsonData/xhgUsedTicket.json'), JSON.stringify(usedJsonData),function(err){
								if(err){
									console.error(err);
									res.send({
										"code": "fail",
										"message": "异常错误，核销失败"
									});
									return;
								}
								res.send({
									msg: '核销成功',
									code: 'success',
									data: {
										"ticket": ticket
									}
								});
							})
						})
					})
				}else{
					res.send({
						msg: '核销失败，该门票已经核销',
						code: 'fail',
						data: {
							"ticket": ticket
						}
					});
				}
			});
		}
	})
})

router.get('/getCheckTicketInfo', async function(req, res){
	fs.readFile(path.resolve(__dirname, './jsonData/xhgUsedTicket.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		res.send(data);
	})
})

router.get('/addTicket', async function(req, res){
	fs.readFile(path.resolve(__dirname, './jsonData/xhgTicket.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		var ticketList = data.ticketList;
		if(ticketList.indexOf('bjgjxhg20213000') == -1){
			var ticketNumber = 20210000;
			for(var i = 1; i < 3001; i++){
				ticketNumber += 1;
				ticketList.push('bjgjxhg' + ticketNumber);
			}
			var jsonData = {
				ticketList: ticketList
			}
			fs.writeFile(path.resolve(__dirname, './jsonData/xhgTicket.json'), JSON.stringify(jsonData),function(err){
				if(err){
					console.error(err);
					res.send({
						"code": "fail",
						"message": "异常错误，核销失败"
					});
					return;
				}
				res.send({
					msg: '添加成功',
					code: 'success',
					data: {
						"ticket": jsonData
					}
				});
			})
		}else{
			res.send({
				msg: '已添加，请勿重复操作',
				code: 'success',
				data: {
					"ticket": jsonData
				}
			})
		}
	})
})

// 鲜花港10000序列号
router.get('/getXhgNp', async function(req, res){
	fs.readFile(path.resolve(__dirname, './jsonData/xhgNpList.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		var ticketList = JSON.parse(data);
		res.send(ticketList);
	})
})

router.get('/checkXhgNp', async function(req, res){
	let code = req.query.code;
	let password = req.query.password;
	if(!password || !code){
		res.send({
			"code": "fail",
			"message": "数据不能为空"
		});
	}
	fs.readFile(path.resolve(__dirname, './jsonData/xhgNpList.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		var ticketList = JSON.parse(data);
		var codeItem = {};
		var codeKey;
		ticketList.forEach(function(value, key){
			if(value.code == code){
				codeItem = value;
				codeKey = key;
			}
		})
		
		if(codeItem.code){
			if(codeItem.password == password){
				if(codeItem.useTime){
					res.send({
						"code": "fail",
						"message": "序列号已使用"
					});
				}else{
					var nowDate = new Date();
					var nowYear = nowDate.getFullYear();
					var nowMonth = nowDate.getMonth() + 1;
					nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
					var nowDay = nowDate.getDate();
					nowDay = nowDay>9?nowDay:'0'+nowDay;
					var nowHour = nowDate.getHours();
					nowHour = nowHour>9?nowHour:'0'+nowHour;
					var nowMinute = nowDate.getMinutes();
					nowMinute = nowMinute>9?nowMinute:'0'+nowMinute;
					var nowSeconds = nowDate.getSeconds();
					nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
					var nowTime = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinute + ':' + nowSeconds;
					ticketList[codeKey].useTime = nowTime;
					var jsonData = ticketList;
					fs.writeFile(path.resolve(__dirname, './jsonData/xhgNpList.json'), JSON.stringify(jsonData),function(err){
						if(err){
							console.error(err);
							res.send({
								"code": "fail",
								"message": "异常错误，核销失败"
							});
							return;
						}
						res.send({
							code: "success",
							message: "验证成功"
						})
						return;
					})
				}
			}else{
				res.send({
					"code": "fail",
					"message": "序列号密码错误"
				});
			}
		}else{
			res.send({
				"code": "fail",
				"message": "序列号密码错误"
			});
		}
	});
})

// 数字补0
function padding2(num) {
    if((num + "").length >= 5) {
    	return num;
    }
    return padding2("0" + num)
}

router.get('/addXhgNp', async function(req, res){
	fs.readFile(path.resolve(__dirname, './jsonData/xhgNpList.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		var ticketList = data;
		for(var i = 0; i < 20000; i++){
			var ticketItem = {};
			ticketItem.code = padding2(i+1);
			ticketItem.password = randomPassword();
			ticketList.push(ticketItem);
		}
		
		var jsonData = ticketList;
		
		fs.writeFile(path.resolve(__dirname, './jsonData/xhgNpList.json'), JSON.stringify(jsonData),function(err){
			if(err){
				console.error(err);
				res.send({
					"code": "fail",
					"message": "异常错误，添加失败"
				});
				return;
			}
			res.send({
				msg: '添加成功',
				code: 'success'
			});
		})
	})
})

router.get('/getToken', async function(req, res){
	fs.readFile(path.resolve(__dirname, './jsonData/xhgToken.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		var tokenList = data.token;
		var token = randomWord(tokenList);
		tokenList.push(token);
		var jsonData = {
			token: tokenList
		}
		fs.writeFile(path.resolve(__dirname, './jsonData/xhgToken.json'), JSON.stringify(jsonData),function(err){
			if(err){
				console.error(err);
				res.send({
					"code": "fail",
					"data": "",
					"message": "获取失败"
				});
				return;
			}
			res.send({
				"code": "success",
				"data": {
					token: token
				},
				"message": "获取成功"
			});
		})
	})
})

router.get('/checkToken', async function(req, res){
	let token = req.query.token;
	console.log(token);
	fs.readFile(path.resolve(__dirname, './jsonData/xhgToken.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		var tokenList = data.token;
		console.log(tokenList);
		if(tokenList.indexOf(token) != -1){
			tokenList.splice(tokenList.indexOf(token), 1);
			var jsonData = {
				token: tokenList
			};
			fs.writeFile(path.resolve(__dirname, './jsonData/xhgToken.json'), JSON.stringify(jsonData),function(err){
				if(err){
					console.error(err);
					res.send({
						"code": "fail",
						"data": "",
						"message": "核销token失败，请稍后再试"
					});
					return;
				}
				res.send({
					"code": "success",
					"data": "",
					"message": "核销Token成功"
				});
			})
		}else{
			res.send({
				message: '无效Token',
				code: 'fail',
				data: ""
			});
		}
		
	})
})

function randomWord(tokenList){
    var str = "",
        range = 16,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
	if(tokenList.indexOf(str) == -1){
		return str;
	}else{
		randomWord(tokenList);
	}
}

function randomPassword(){
    var str = "",
        range = 6,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
 
    // 随机产生
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
	return str;
}

module.exports = router;