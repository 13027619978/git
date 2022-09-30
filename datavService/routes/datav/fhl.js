var express=require('express');
var router = express.Router();
var https = require('https');
const fs = require('fs');
var http = require('http');
let path = require('path');

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