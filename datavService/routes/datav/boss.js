var express=require('express');
var router = express.Router();
var https = require('https');
const fs = require('fs');
var http = require('http');

// 查询帐号密码使用情况
router.get('/readAccount', async function(req, res){
	let account = req.query.account;
	let password = req.query.password;
	let ticketNumber = 0;
	if(account && password){
		let path = require('path');
		fs.readFile(path.resolve(__dirname, './jsonData/xhgRbTickets.json'), 'utf8', function(err, data){
			if(err){
		        return console.error(err);
			}
			data = JSON.parse(data);
			data.forEach(function(value, key){
				if(value.account == account){
					ticketNumber = value.ticketNumber;
				}
			})
			res.send({
				success: 'true',
				msg: '获取成功',
				data: {
					ticketNumber: ticketNumber
				}
			})
		})
	}else{
		res.send({
			success: 'fail',
			msg: '获取失败',
			data: {}
		})
	}
})

// 获取所有预约账号密码
router.get('/getUsedInfo', async function(req, res){
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/xhgRbTickets.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		res.send({
			success: 'true',
			msg: '获取成功',
			data: data
		})
	})
})

// 查询帐号正确性
router.get('/getAccountInfo', async function(req, res){
	let account = req.query.account;
	let password = req.query.password;
	let accountState = 0;
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/xhgRbAccount.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		data.forEach(function(value, key){
			if(value.account == account){
				accountState = 1;
			}
		})
		res.send({
			success: 'true',
			msg: '获取成功',
			data: {
				accountState: accountState
			}
		})
	})
})

// 记录帐号密码使用情况
router.get('/writeAccount',async function(req, res){
	let account = req.query.account;
	let password = req.query.password;
	let ticketNumber = req.query.ticketNumber;
	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var nowHour = nowDate.getHours();
	nowHour = nowHour>9?nowHour:'0'+nowHour;
	var nowMinutes = nowDate.getMinutes();
	nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
	var nowSeconds = nowDate.getSeconds();
	nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
	if(account && password && ticketNumber){
		let path = require('path');
		fs.readFile(path.resolve(__dirname, './jsonData/xhgRbTickets.json'), 'utf8', function(err, data){
			if(err){
		        return console.error(err);
			}
			data = JSON.parse(data);
			let hasItem = 0;
			data.forEach(function(value, key){
				if(value.account == account && value.password == password){
					value.ticketNumber = parseInt(value.ticketNumber) + parseInt(ticketNumber);
					hasItem = 1;
				}
			})
			if(hasItem == '0'){
				data.push({
					account: account,
					password: password,
					ticketNumber: ticketNumber,
					payTime: nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds
				})
			}
			
			fs.writeFile(path.resolve(__dirname, './jsonData/xhgRbTickets.json'), JSON.stringify(data),function(err){
				if(err){
					console.error(err);
					res.send({
						"success": "fail",
						"msg": "添加失败"
					});
					return;
				}
				res.send({
					"success": "true",
					"msg": "添加成功"
				})
				
			})
		})
	}else{
		res.send({
			success: 'fail',
			msg: '帐号密码错误！',
			data: {}
		});
	}
});

// 获取门票概率信息
router.get('/getTicketInfo', async function(req, res){
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/ticketProbability.json'), 'utf8', function(err, data){
		if(err){
			console.error(err);
			res.send({
				"success": "fail",
				"msg": "查询失败"
			});
			return;
		}
		data = JSON.parse(data);
		var ybyTicket = data.ybyTicket;  // 同程
		var fhlTicket = data.fhlTicket;  // 测试
		var ymyTicket = data.ymyTicket;  // 暂无
		var yjTicket = data.yjTicket;  // 暂无
		var ticketArr = [
			{
				name: 'yby',
				ticket: ybyTicket
			},
			{
				name: 'ymy',
				ticket: ymyTicket
			},
			{
				name: 'fhl',
				ticket: fhlTicket
			},
			{
				name: 'yj',
				ticket: yjTicket
			}
		]
		var ticketNumber = Math.floor(Math.random() * (100 - 0)) + 0;
		var ticketItem = {};
		if(ticketNumber < parseInt(ticketArr[0].ticket)){
			ticketItem = ticketArr[0];
		}else if(parseInt(ticketArr[0].ticket) <= ticketNumber && ticketNumber < parseInt(ticketArr[0].ticket) + parseInt(ticketArr[1].ticket)){
			ticketItem = ticketArr[1];
		}else if(parseInt(ticketArr[0].ticket) + parseInt(ticketArr[1].ticket) <= ticketNumber && ticketNumber < parseInt(ticketArr[0].ticket) + parseInt(ticketArr[1].ticket) + parseInt(ticketArr[2].ticket)){
			ticketItem = ticketArr[2];
		}else if(parseInt(ticketArr[0].ticket) + parseInt(ticketArr[1].ticket) + parseInt(ticketArr[2].ticket) <= ticketNumber && ticketNumber < parseInt(ticketArr[0].ticket) + parseInt(ticketArr[1].ticket) + parseInt(ticketArr[2].ticket) + parseInt(ticketArr[3].ticket)){
			ticketItem = ticketArr[3];
		}
		let url = '';
		if(ticketItem.name == 'yby'){
			// 同程
			url = 'http://boss.smart-ideas.com.cn/xhgTicketProbability/tc.html';
		}else if(ticketItem.name == 'fhl'){
			// 测试
			url = 'https://boss.smart-ideas.com.cn/ticket-web?enterpriseCode=TgsEpcXhg&ticketGroupNum=TGN20210628140233051';
		}else if(ticketItem.name == 'ymy'){
			// 测试
			url = 'http://boss.smart-ideas.com.cn/xhgTicketProbability/yj.html';
		}
		
		res.redirect(url);
		// res.send({
		// 	"success": "true",
		// 	"msg": "查询成功",
		// 	"data": url
		// })
	})
})

// 获取门票概率信息
router.get('/getTicketProbability', async function(req, res){
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/ticketProbability.json'), 'utf8', function(err, data){
		if(err){
			console.error(err);
			res.send({
				"success": "fail",
				"msg": "查询失败"
			});
			return;
		}
		data = JSON.parse(data);
		res.send({
			"success": "true",
			"msg": "查询成功",
			"data": data
		})
	})
})

// 记录门票概率信息
router.get('/writeTicketProbability', async function(req, res){
	let ybyTicket = req.query.ybyTicket;
	let fhlTicket = req.query.fhlTicket;
	let ymyTicket = req.query.ymyTicket;
	let yjTicket = req.query.yjTicket;
	if(ybyTicket && fhlTicket && ymyTicket && yjTicket){
		let path = require('path');
		let jsonData = {
			ybyTicket: ybyTicket,
			fhlTicket: fhlTicket,
			ymyTicket: ymyTicket,
			yjTicket: yjTicket
		}
		fs.writeFile(path.resolve(__dirname, './jsonData/ticketProbability.json'), JSON.stringify(jsonData),function(err){
			if(err){
				console.error(err);
				res.send({
					"success": "fail",
					"msg": "添加失败"
				});
				return;
			}
			res.send({
				"success": "true",
				"msg": "添加成功"
			})
			
		})
	}else{
		res.send({
			success: 'fail',
			msg: '参数错误！',
			data: {}
		});
	}
})

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }

        } catch(e) {
            console.log('error：'+str+'!!!'+e);
            return false;
        }
    }
    console.log('It is not a string!')
}



module.exports = router;