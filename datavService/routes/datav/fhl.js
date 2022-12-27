var express=require('express');
var router = express.Router();
var https = require('https');
const fs = require('fs');
var http = require('http');
let path = require('path');

function randomPassword(){
    var str = "",
        range = 6,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
	return str;
}

router.get('/getFhlVip', async function(req, res){
	fs.readFile(path.resolve(__dirname, './jsonData/fhlVipList.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		var ticketList = JSON.parse(data);
		res.send(ticketList);
	})
})

router.post('/fhlPrking', async function(req, res){
	let dataInfo = JSON.parse(req.body.data);
	console.log(dataInfo);
	res.send({
		"service": dataInfo.service,
		"result_code":0 ,
		"message": "上传成功"
	})
})

router.get('/checkFhlVip', async function(req, res){
	let code = req.query.code;
	if(!code){
		res.send({
			"code": "fail",
			"message": "缺少参数，请检查链接是否正确"
		});
	}
	
	fs.readFile(path.resolve(__dirname, './jsonData/fhlVipList.json'), 'utf8', function(err, data){
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
				fs.writeFile(path.resolve(__dirname, './jsonData/fhlVipList.json'), JSON.stringify(jsonData),function(err){
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
				"message": "序列号错误"
			});
		}
	});
})

router.get('/addFhlVip', async function(req, res){
	fs.readFile(path.resolve(__dirname, './jsonData/fhlVipList.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		var ticketList = data;
		for(var i = 0; i < 200; i++){
			var ticketItem = {};
			ticketItem.code = randomPassword();
			ticketList.push(ticketItem);
		}
		
		var jsonData = ticketList;
		
		fs.writeFile(path.resolve(__dirname, './jsonData/fhlVipList.json'), JSON.stringify(jsonData),function(err){
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

router.get('/sendUserInfo', async function(req, res){
	let cardNumber = req.query.cardNumber;
	let brakeNumber = req.query.brakeNumber;
	let nowDate = new Date();
	let nowYear = nowDate.getFullYear();
	let nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	let nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	let nowHour = nowDate.getHours();
	nowHour = nowHour>9?nowHour:'0'+nowHour;
	let nowMinutes = nowDate.getMinutes();
	nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
	let nowSeconds = nowDate.getSeconds();
	nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
	let currDate = nowYear + '-' + nowMonth + '-' + nowDay;
	let useTime = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	if(!cardNumber){
		res.send({
			success: "fail",
			msg: "添加失败, 年卡卡号不能为空"
		});
		return;
	}
	if(!brakeNumber){
		res.send({
			success: "fail",
			msg: "添加失败, 闸机编号不能为空"
		});
		return;
	}
	fs.readFile(path.resolve(__dirname, './jsonData/fhljjj.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		if(data.length == 0 || data[data.length - 1].time != currDate){
			let userItem = {
				time: currDate,
				useList: [
					{
						cardNumber: cardNumber,
						useTime: useTime,
						brakeNumber: brakeNumber
					}
				]
			}
			data.push(userItem);
		}else{
			let useItem = {
				cardNumber: cardNumber,
				useTime: useTime,
				brakeNumber: brakeNumber
			}
			data[data.length - 1].useList.push(useItem);
		}
		fs.writeFile(path.resolve(__dirname, './jsonData/fhljjj.json'), JSON.stringify(data),function(err){
			if(err){
				console.error(err);
				res.send({
					success: "fail",
					msg: "添加失败"
				});
				return;
			}
			res.send({
				success: 'true',
				msg: '添加次数成功',
				data: {
					cardNumber: cardNumber,
					useTime: useTime,
					brakeNumber: brakeNumber
				}
			})
		})
	})
})

router.get('/getUserInfo', async function(req, res){
	fs.readFile(path.resolve(__dirname, './jsonData/fhljjj.json'), 'utf8', function(err, data){
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

module.exports = router;