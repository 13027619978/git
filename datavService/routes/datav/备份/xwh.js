var express=require('express');
var router = express.Router();
var http = require('http');
var host = 'hd.smart-ideas.com.cn';
const fs = require('fs');

router.get('/getDeviceShipLeaseInfo',async function(req,res){
	var leaseArr = [];
	getBoatLeaseInfo('f57419d544e741838fb789056f63ee80', function(res1){
		res1.forEach(function(value, key){
			leaseArr.push(value);
		})
		getBoatLeaseInfo('bcd98681896f48ed878486519bfdeacf', function(res2){
			res2.forEach(function(value, key){
				leaseArr.push(value);
			})
			getBoatLeaseInfo('b4124ce0c8b244208de6d870ceb824a0', function(res3){
				res3.forEach(function(value, key){
					leaseArr.push(value);
				})
				getBoatLeaseInfo('59800000eb4a4c4287652f86eaba848c', function(res4){
					res4.forEach(function(value, key){
						leaseArr.push(value);
					})
					res.send(leaseArr)
				});
			});
		});
	});
});

router.get('/getDeviceShipRefundInfo',async function(req,res){
	var leaseArr = [];
	getBoatRefundInfo('f57419d544e741838fb789056f63ee80', function(res1){
		res1.forEach(function(value, key){
			leaseArr.push(value);
		})
		getBoatRefundInfo('bcd98681896f48ed878486519bfdeacf', function(res2){
			res2.forEach(function(value, key){
				leaseArr.push(value);
			})
			getBoatRefundInfo('b4124ce0c8b244208de6d870ceb824a0', function(res3){
				res3.forEach(function(value, key){
					leaseArr.push(value);
				})
				getBoatRefundInfo('59800000eb4a4c4287652f86eaba848c', function(res4){
					res4.forEach(function(value, key){
						leaseArr.push(value);
					})
					res.send(leaseArr)
				});
			});
		});
	});
});

// 增加叫号人数
router.get('/addQueueNumber',async function(req,res){
	var scenicId = req.query.scenicId;
	if(!scenicId){
		res.send({
			code: 'fail',
			msg: '未传参数'
		})
		return;
	}else{
		if(scenicId != '1' && scenicId != '2' && scenicId != '3' && scenicId != '4'){
			res.send({
				code: 'fail',
				msg: '参数错误'
			})
			return;
		}
	}
	
	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var nowTime = nowYear + '-' + nowMonth + '-' + nowDay;
	
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/xwhQueue.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		var newQueueData;
		data = JSON.parse(data);
		if(data.date == nowTime){
			var queueNumber = 0;
			newQueueData = data;
		}else{
			newQueueData = {
				"date": nowTime,
				"queueNumber": {
					"jfm": 0,
					"tld": 0,
					"xwm": 0,
					"lz": 0
				}
			};
		}
		if(scenicId == '1'){
			queueNumber = data.queueNumber.jfm;
			queueNumber = parseInt(queueNumber) + 1;
			newQueueData.queueNumber.jfm = queueNumber; 
		}else if(scenicId == '2'){
			queueNumber = data.queueNumber.tld;
			queueNumber = parseInt(queueNumber) + 1;
			newQueueData.queueNumber.tld = queueNumber;
		}else if(scenicId == '3'){
			queueNumber = data.queueNumber.xwm;
			queueNumber = parseInt(queueNumber) + 1;
			newQueueData.queueNumber.xwm = queueNumber;
		}else if(scenicId == '4'){
			queueNumber = data.queueNumber.lz;
			queueNumber = parseInt(queueNumber) + 1;
			newQueueData.queueNumber.lz = queueNumber;
		}
		
		fs.writeFile(path.resolve(__dirname, './jsonData/xwhQueue.json'), JSON.stringify(newQueueData),function(err){
			if(err){
				console.error(err);
				res.send({
					"code": "fail",
					"message": "系统错误"
				});
				return;
			}
			res.send({
				code: 'success',
				msg: '查询成功',
				data: {
					queueNumber: queueNumber
				}
			});
		})
	})
})

// 获取当前排队人数
router.get('/getQueueNumber',async function(req,res){
	var scenicId = req.query.scenicId;
	if(!scenicId){
		res.send({
			code: 'fail',
			msg: '未传参数'
		})
		return;
	}else{
		if(scenicId != '1' && scenicId != '2' && scenicId != '3' && scenicId != '4'){
			res.send({
				code: 'fail',
				msg: '参数错误'
			})
			return;
		}
	}
	
	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var nowTime = nowYear + '-' + nowMonth + '-' + nowDay;
	
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/xwhQueue.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		if(nowTime == data.date){
			var queueNumber = 0;
			if(scenicId == '1'){
				queueNumber = data.queueNumber.jfm;
			}else if(scenicId == '2'){
				queueNumber = data.queueNumber.tld;
			}else if(scenicId == '3'){
				queueNumber = data.queueNumber.xwm;
			}else if(scenicId == '4'){
				queueNumber = data.queueNumber.lz;
			}
			res.send({
				code: 'success',
				msg: '查询成功',
				data: {
					queueNumber: queueNumber
				}
			});
		}else{
			var xwhQueueData = {
				"date": nowTime,
				"queueNumber": {
					"jfm": 0,
					"tld": 0,
					"xwm": 0,
					"lz": 0
				}
			};
			fs.writeFile(path.resolve(__dirname, './jsonData/xwhQueue.json'), JSON.stringify(xwhQueueData),function(err){
				if(err){
					console.error(err);
					res.send({
						"code": "fail",
						"message": "系统错误"
					});
					return;
				}
				res.send({
					code: 'success',
					msg: '查询成功',
					data: {
						queueNumber: 0
					}
				});
			})
		}
	})
})




// 获取退款详情
function getBoatRefundInfo(scenicId, success){
	const options = {
		hostname: host,
		path: '/xwhpark/deviceDataView/getDeviceShipRefundInfo?scenicId=' + scenicId,
		method: 'GET'
	};
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			success(res);
		});
	});
	req.end();
}

// 获取租赁详情
function getBoatLeaseInfo(scenicId, success){
	const options = {
		hostname: host,
		path: '/xwhpark/deviceDataView/getDeviceShipLeaseInfo?scenicId=' + scenicId,
		method: 'GET'
	};
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			success(res);
		});
	});
	req.end();
}

module.exports = router;