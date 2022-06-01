var express=require('express');
var router = express.Router();
var https = require('https');
const fs = require('fs');
var http = require('http');

// 添加下载次数
router.get('/createDownload', async function(req, res){
	let userId = req.query.id;
	let downloadNumber = 0;
	let userName;
	if(userId){
		let path = require('path');
		fs.readFile(path.resolve(__dirname, './jsonData/fzpData.json'), 'utf8', function(err, data){
			if(err){
		        return console.error(err);
			}
			data = JSON.parse(data);
			data.forEach(function(value, key){
				if(value.userId == userId){
					downloadNumber = value.downloadNumber;
					downloadNumber += 1;
					userName = value.name;
					data[key].downloadNumber = downloadNumber;
				}
			})
			fs.writeFile(path.resolve(__dirname, './jsonData/fzpData.json'), JSON.stringify(data),function(err){
				if(err){
					console.error(err);
					res.send({
						"success": "fail",
						"msg": "添加失败"
					});
					return;
				}
				res.send({
					success: 'true',
					msg: '添加次数成功',
					data: {
						downloadNumber: downloadNumber,
						userName: userName
					}
				})
			})
			
		})
	}else{
		res.send({
			success: 'fail',
			msg: '添加失败'
		})
	}
})

// 获取下载次数
router.get('/getDownload', async function(req, res){
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/fzpData.json'), 'utf8', function(err, data){
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