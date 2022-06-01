var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');

router.get('/weatherInfo',(req,res,next)=>{
	var idCard = req.query.idCard;
	var name = req.query.name;
	console.log(req.query);
	if(idCard.length != 18){
		res.json({
		  status:'n',
		  msg:'身份证格式不正确'
		})
		return;
	}
    fs.readFile(`./data/idCard.txt`,(err,data)=>{
		if(err){
		    console.log(err);
		    res.json({
			  status:'n',
			  msg:'服务器繁忙，请稍后再试'
		    })
		}else{
			var idCards = data.toString();
			if(idCards.indexOf(idCard) > -1 && idCards.indexOf(name) > -1){
				res.json({
				   status: 'y',
				   code: 'SUCCESS',
				   msg: '获取数据成功',
				   data: req.query
				})
			}else{
				res.json({
				  status: 'y',
				  code: 'FAIL',
				  msg: '获取数据失败',
				  data: req.query
				});
			}
		    
		}
    })
})

router.post('/appointment',(req,res)=>{
	var name = req.body.name;
	var idCard = req.body.idCard;
	var enterDate = req.body.enterDate;
	var createData = '\n' + name + ',' + idCard + ',' + enterDate;
	fs.readFile(`./data/enterData.txt`,(err,data)=>{
		if(err){
		    console.log(err);
		    res.json({
			  status:'n',
			  msg:'服务器繁忙，请稍后再试'
		    })
		}else{
			var idCards = data.toString();
			if(idCards.indexOf(createData) > -1){
				res.json({
				   status: 'y',
				   code: 'FAIL',
				   msg: '已预约当日入园门票，请勿重复预约',
				   data: req.body
				})
			}else{
				fs.appendFile('./data/enterData.txt',createData,'utf8',function(err, ret) {
			        if(err){
						console.log(err);
			            res.json({
						  status:'n',
						  code: 'FAIL',
						  msg:'服务器繁忙，请稍后再试'
						})
			        }else{
						res.json({
						  status:'y',
						  code: 'SUCCESS',
						  msg:'插入数据成功',
						  data:req.body
						})
					}
				})
			}
		    
		}
	})
})

router.get('/downloadall', (req,res,next)=>{
	res.setHeader('Content-type', 'application/octet-stream');
	res.setHeader('Content-Disposition', 'attachment;filename=enterData.txt');
	var fileStream = fs.createReadStream('./data/enterData.txt'); 
	fileStream.on('data', function (data) {
	    res.write(data, 'binary');
	});
	fileStream.on('end', function () {
	    res.end();
	    console.log('The file has been downloaded successfully!');
	});
})

router.get('/download/:date',(req,res,next)=>{
	var date = req.params.date;
	console.log(date);
	if(date.length == 8){
		var year = date.substr(0, 4);
		var month = date.substr(4, 2);
		var day = date.substr(6, 2);
		var enterDate = year + '-' + month + '-' + day;
		fs.readFile(`./data/enterData.txt`,(err,data)=>{
			if(err){
			    res.json({
				  status:'n',
				  msg:'服务器繁忙，请稍后再试'
			    })
			}else{
				fs.writeFile('./data/'+ enterDate +'.txt',enterDate+'预约人员','utf8',function(error){
				    if(error){
				        console.log(error);
				    }else{
						var idCards = data.toString();
						var idCardList = idCards.split('\n');
						console.log(idCardList);
						if(idCards.indexOf(enterDate) < 0){
							res.json({
							  status:'y',
							  msg: enterDate + '无预约人员'
							})
							return;
						}
						if(idCardList.length > 1){
							idCardList.forEach(function(value, key){
								if(value.indexOf(enterDate) > -1){
									fs.appendFile('./data/'+ enterDate +'.txt','\n'+value,'utf8',function(err, ret) {
								        if(err){
											console.log(err);
								        }
									})
								}
							})
							res.setHeader('Content-type', 'application/octet-stream');
							res.setHeader('Content-Disposition', 'attachment;filename='+enterDate+'.txt');
							var fileStream = fs.createReadStream('./data/'+enterDate+'.txt'); 
							fileStream.on('data', function (data) {
							    res.write(data, 'binary');
							});
							fileStream.on('end', function () {
							    res.end();
							    console.log('The file has been downloaded successfully!');
							});
						}
					}
				})
			}
		})
	}else{
		res.json({
		  status:'n',
		  msg:'时间格式错误，请输入例如20200202'
		})
	}
})

module.exports = router;