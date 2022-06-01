var express=require('express');
var router = express.Router();
const fs = require('fs');

// 上传计数
router.get('/uploadCount',async function(req,res){
	var id = req.query.id;
	var date = req.query.date;
	var ticket = req.query.ticket;
	if(!id || !date || !ticket){
		res.send({
			'code': 'FAIL',
			'message': '参数错误'
		})
		return;
	}
	
	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	
	var fileName = 'yhg-' + nowYear + nowMonth + nowDay + '.txt';
	
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './yhgTxt/' + fileName), 'utf8', function(err, data){
		if(err){
			var dataString = id + ' ' + date + ' ' + ticket + '\n';
			fs.writeFile(path.resolve(__dirname, './yhgTxt/' + fileName), dataString,function(err){
				if(err){
					console.error(err);
					res.send({
						"code": "FAIL",
						"message": "录入失败"
					});
					return;
				}
				res.send({
					"code": "SUCCESS",
					"message": "录入成功"
				});
			})
	        return console.error(err);
		}
		data += id + ' ' + date + ' ' + ticket + '\n';
		fs.writeFile(path.resolve(__dirname, './yhgTxt/' + fileName), data,function(err){
			if(err){
				console.error(err);
				res.send({
					"code": "FAIL",
					"message": "录入失败"
				});
				return;
			}
			res.send({
				"code": "SUCCESS",
				"message": "录入成功"
			});
		})
	})
});

router.get('/downloadCount', function(req, res){
	var fileName = req.query.fileName;
	console.log(req.query.fileName);
	if(!fileName){
		res.send({
			"code": "FAIL",
			"message": "参数错误"
		});
	}
	let path = require('path');
	fs.exists(path.resolve(__dirname, './yhgTxt/' + fileName + '.txt'),function(exists){
		if(exists){
			console.log("该文件存在！");
			res.setHeader('Content-type', 'application/octet-stream');
			res.setHeader('Content-Disposition', 'attachment;filename='+ fileName +'.txt');    // 'aaa.txt' can be customized.
			var fileStream = fs.createReadStream('/home/ftpd/datavService/routes/datav/yhgTxt/'+ fileName +'.txt');  //写死了, 就下载这个问题
			fileStream.on('data', function (data) {
			    res.write(data, 'binary');
			});
			fileStream.on('end', function () {
			    res.end();
			    console.log('The file has been downloaded successfully!');
			});
		}
		else{
			res.send({
				"code": "FAIL",
				"message": "文件不存在"
			})
			console.log("该文件不存在！");
		}
	});
	
})


module.exports = router;