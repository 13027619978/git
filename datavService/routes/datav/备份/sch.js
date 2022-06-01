var express=require('express');
var router = express.Router();
var https = require('https');
var host = 'boss.smart-ideas.com.cn';
const fs = require('fs');
let path = require('path');

router.get('/getSchJson',async function(req,res){
	fs.readFile(path.resolve(__dirname, './jsonData/sch.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		res.send(data);
	})
});

router.get('/setSchJson',async function(req,res){
	var inNumber = req.query.inNumber;
	var inType = req.query.inType;
	var inTotalNumber = req.query.inTotalNumber;
	var inTotalType = req.query.inTotalType;
	var inTotalPercent = req.query.inTotalPercent;
	inTotalPercent = inTotalPercent?inTotalPercent:100;
	var inPercent = req.query.inPercent;
	inPercent = inPercent?inPercent:100;
	fs.readFile(path.resolve(__dirname, './jsonData/sch.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		data.inType = inType;
		data.inTotalType = inTotalType;
		data.inPercent = inPercent;
		data.inTotalPercent = inTotalPercent;
		if(inType == '1'){
			data.inNumber = inNumber;
		}else{
			data.inNumber = 0;
		}
		if(inTotalType == '1'){
			data.inTotalNumber = inTotalNumber;
		}else{
			data.inTotalNumber = 0;
		}
		fs.writeFile(path.resolve(__dirname, './jsonData/sch.json'), JSON.stringify(data),function(err){
			if(err){
				res.send({
					"code": "FAIL",
					"message": "修改失败，请稍后再试"
				});
				return;
			}
			res.send({
				"code": "SUCCESS",
				"message": "设置成功"
			});
		})
	});
});

router.get('/getInTotalNumber',async function(req,res){
	fs.readFile(path.resolve(__dirname, './jsonData/sch.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		var schJson = data;
		var inTotalPercent = data.inTotalPercent;
		if(data.inTotalType == '1'){
			res.send([
				{
					"value": parseInt(parseInt(data.inTotalNumber) * parseInt(inTotalPercent) / 100)
				}
			]);
		}else{
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth()+1;
			month = month>9?month:'0'+month;
			var day = nowDate.getDate();
			day = day>9?day:'0'+day;
			var hour = nowDate.getHours();
			hour = hour>9?hour:'0'+hour;
			var minutes = nowDate.getMinutes();
			minutes = minutes>9?minutes:'0'+minutes;
			var seconds = nowDate.getSeconds();
			seconds = seconds>9?seconds:'0'+seconds;
			var sDate = year + '-' + month + '-' + day + ' 00:00:00';
			var eDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
			var searchSdate = encodeURI(sDate);
			var searchEdate = encodeURI(eDate);
			const options = {
				hostname: host,
				path: '/ticketApi/robotCollection/check/get?enterpriseCode=TgsEpcSch&ticketGroupNum=TGN20201214115631115' + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
				method: 'GET'
			};
			
			const req = https.request(options, (res1) => {
				res1.on('data', (d) => {
					var res1 = JSON.parse(d.toString());
					var totalNumber = parseInt(res1.data[0].checkQuantity) + parseInt(res1.data[1].checkQuantity);
					const options1 = {
						hostname: host,
						path: '/ticketApi/robotCollection/check/get?enterpriseCode=TgsEpcSch&ticketGroupNum=TGN20201214175748615' + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
						method: 'GET'
					};
					
					const req1 = https.request(options1, (res2) => {
						res2.on('data', (d) => {
							var res2 = JSON.parse(d.toString());
							totalNumber += parseInt(res2.data[0].checkQuantity) + parseInt(res2.data[1].checkQuantity);
							res.send([
								{
									"value": parseInt(totalNumber * parseInt(inTotalPercent) / 100)
								}
							]);
							schJson.inTotalNumber = totalNumber;
							fs.writeFile(path.resolve(__dirname, './jsonData/sch.json'), JSON.stringify(schJson),function(err){
								if(err){
									return;
								}
							})
						});
					});
					req1.end();
				});
			});
			
			req.end();
		}
	})
});


router.get('/getInNumber',async function(req,res){
	fs.readFile(path.resolve(__dirname, './jsonData/sch.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		var inPercent = data.inPercent;
		if(data.inType == '1'){
			res.send([
				{
					"value": parseInt(parseInt(data.inNumber) * parseInt(inPercent) / 100)
				}
			]);
		}else{
			fs.readFile(path.resolve(__dirname, './jsonData/schInPercent.json'), 'utf8', function(err, data1){
				if(err){
			        return console.error(err);
				}
				data1 = JSON.parse(data1);
				var nowHour = new Date().getHours();
				var inNumber;
				nowHour = nowHour>9?nowHour+':00':'0'+nowHour+':00';
				data1.percentList.forEach(function(value, key){
					if(value.date == nowHour){
						inNumber = parseInt(data.inTotalNumber * (value.percent.split('%')[0]/100) * parseInt(inPercent) / 100);
					}
				})
				res.send([
					{
						value: inNumber
					}
				]);
			})
		}
		
	})
});

router.get('/getTotalNumberByTime',async function(reqon,res){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var hour = nowDate.getHours();
	hour = hour>9?hour:'0'+hour;
	var minutes = nowDate.getMinutes();
	minutes = minutes>9?minutes:'0'+minutes;
	var seconds = nowDate.getSeconds();
	seconds = seconds>9?seconds:'0'+seconds;
	var sDate = year + '-' + month + '-' + day + ' 00:00:00';
	var eDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	var searchSdate = encodeURI(sDate);
	var searchEdate = encodeURI(eDate);
	const options = {
		hostname: host,
		path: '/ticketApi/robotCollection/check/get?enterpriseCode=TgsEpcSch&ticketGroupNum=TGN20201214115631115&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
		method: 'GET'
	};
	
	const req = https.request(options, (res1) => {
		res1.on('data', (d) => {
			var res1 = JSON.parse(d.toString());
			var totalNumber = parseInt(res1.data[0].checkQuantity) + parseInt(res1.data[1].checkQuantity);
			const options1 = {
				hostname: host,
				path: '/ticketApi/robotCollection/check/get?enterpriseCode=TgsEpcSch&ticketGroupNum=TGN20201214175748615&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate,
				method: 'GET'
			};
			
			const req1 = https.request(options1, (res2) => {
				res2.on('data', (d) => {
					var res2 = JSON.parse(d.toString());
					totalNumber += parseInt(res2.data[0].checkQuantity) + parseInt(res2.data[1].checkQuantity);
					console.log(totalNumber);
					fs.readFile(path.resolve(__dirname, './jsonData/schTimeJson.json'), 'utf8', function(err, jsonData){
						if(err){
					        return console.error(err);
						}
						jsonData = JSON.parse(jsonData);
						var nowHourIndex;
						var timeList = jsonData.timeList;
						var nowHour = new Date().getHours();
						if(nowHour<9){
							nowHourIndex = -1;
						}
						var inNumber;
						nowHour = nowHour>9?nowHour+':00':'0'+nowHour+':00';
						timeList.forEach(function(value, key){
							if(nowHourIndex && key > nowHourIndex){
								timeList[key].y = 0;
							}
							if(value.x == nowHour){
								nowHourIndex = key;
								value.y = totalNumber;
							}
						})
						jsonData.timeList = timeList;
						fs.writeFile(path.resolve(__dirname, './jsonData/schTimeJson.json'), JSON.stringify(jsonData),function(err){
							if(err){
								return;
							}
							res.send(timeList);
						})
					})
				});
			});
			req1.end();
		});
	});
	req.end();
});

// 线上名称getDatav， 测试名称getDatavTest
// 日场包括夜场的数据
router.get('/getDatav',async function(reqon,res){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var hour = nowDate.getHours();
	var qhTicketTotal;
	var hhTicketTotal;
	var qhLastTicket;
	var hhLastTicket;
	
	var qhRealTotal = 0; //真是数据
	var hhRealTotal = 0;
			
	// 倍数设置
	var calcNumber = 1.5;
	// 前海日场限流
	var qhRCNumber = 3000;
	// 前海夜场限流
	var qhYCNumber = 500;
	// 后海日场限流
	var hhRCNumber = 4000;
	// 后海夜场限流
	var hhYCNumber = 0;
	// 控制是否包含夜场数据 1：包含 0：不包含
	var weatherYC = 0;
	if(hour < 17){
		qhTicketTotal = qhRCNumber;
		hhTicketTotal = hhRCNumber;
	}else if(17 <= hour){
		qhTicketTotal = qhYCNumber;
		hhTicketTotal = hhYCNumber;
	}
	const options = {
		hostname: host,
		path: '/ticketApi/order/getSalesByVisitDate?enterpriseCode=TgsEpcSch&ticketSalesChannelsNum=MT&visitDate=' + year + '-' + month + '-' + day,
		method: 'GET'
	};
	
	const req = https.request(options, (res1) => {
		res1.on('data', (d) => {
			var res1 = JSON.parse(d.toString());
			var salesList = res1.data;
			var qhTotalNumber = 0;
			var hhTotalNumber = 0;
			var qhTotal = 0;
			var hhTotal = 0;
			
			//先拉原始数据
			salesList.forEach(function(value, key){
				if(hour < 17){
					if(weatherYC == 1){
						if(value.ticketName.indexOf('前海') != -1){
							qhTotal += parseInt(value.saleTotal);
							qhRealTotal = qhTotal;
						}
					}else{
						if(value.ticketName.indexOf('前海') != -1 && value.ticketName.indexOf('夜场') == -1){
							qhTotal += parseInt(value.saleTotal);
							qhRealTotal = qhTotal;
						}
					}
					
				}else{
					if(value.ticketName.indexOf('前海') != -1 && value.ticketName.indexOf('夜场') != -1){
						qhTotal += parseInt(value.saleTotal);
						qhRealTotal = qhTotal;
					}
				}
				
				if(value.ticketName.indexOf('后海') != -1){
					hhTotal += parseInt(value.saleTotal);
					hhRealTotal = hhTotal;
				}
			})
			
			//console.log ("前海实际: %d", qhRealTotal);
			//console.log ("后海实际: %d", hhRealTotal);
			
			//前海日场, 分段处理, 越来越陡峭
			if(hour < 17){
				//前海日场
				if (qhRealTotal < 700)
				{
					qhTotal = qhRealTotal;
				}
				else if (qhRealTotal >= 700 && qhRealTotal < 2250) // 2250以下, 显示 700 - 1500
				{
					qhTotal = 700 + (qhRealTotal-700)/(2250-700)*(1500-700);
				}
				else if (qhRealTotal >= 2250 && qhRealTotal < 3500) // 显示 1500 - 2000
				{
					qhTotal = 1500 + (qhRealTotal-2250)/(3500-2250)*(2000-1500); 
				}
				else if (qhRealTotal >= 3500 && qhRealTotal < 4500) // 显示 2000 - 2500
				{
					qhTotal = 2000 + (qhRealTotal-3500)/(4500-3500)*(2500-2000); 
				}		
				else if (qhRealTotal >= 4500 && qhRealTotal < 5000) // 显示 2500 - 2700
				{
					qhTotal = 2700 + (qhRealTotal-4500)/(5000-4500)*(2700-2500); 
				}			
					else if (qhRealTotal >= 5000 && qhRealTotal < 5500) // 显示 2700 - 2850
				{
					qhTotal = 2850 + (qhRealTotal-5000)/(5500-5000)*(2850-2700); 
				}		
					else if (qhRealTotal >= 5500 && qhRealTotal < 6000) // 显示 2850 - 2950
				{
					qhTotal = 2950 + (qhRealTotal-5500)/(6000-5500)*(2950-2850); 
				}		
					else if (qhRealTotal >= 6000 && qhRealTotal < 6500) // 显示 2950 - 2990
				{
					qhTotal = 2950 + (qhRealTotal-6000)/(6500-6000)*(2990-2950); 
				}				
				else 
				{
						qhTotal = qhRCNumber; 
				}
				
			
			}else{
				//前海夜场
				//分步打折
				if (qhRealTotal < 100)
				{
					qhTotal = qhRealTotal;
				}
				else if (qhRealTotal >= 100 && qhRealTotal < 1000) // 1000以下, 显示 100 - 350
				{
					qhTotal = 100 + (qhRealTotal-100)/(1000-100)*(350-100);
				}
				else if (qhRealTotal >= 1000 && qhRealTotal < 2000) // 1000以下, 显示 350 - 480
				{
					qhTotal = 350 + (qhRealTotal-1000)/(2000-1000)*(480-350);
				}
				else //2000-2500 显示480-500
				{
					qhTotal = 480 + (qhRealTotal-2000)/(2500-2000)*(500-480);
					qhTotal = qhTotal>qhYCNumber?qhYCNumber:qhTotal;

				}
			}
			qhLastTicket = qhTicketTotal - qhTotal;
			qhLastTicket = qhLastTicket>0?qhLastTicket:0; //赵文旺
			//qhTotal = qhTotal - qhLastTicket; //赵文旺
			
			//后海日场, 分段处理, 越来越陡峭
			if (hhRealTotal < 4000) // 4000以下, 显示最多2666
			{
				hhTotal = (hhRealTotal/calcNumber)<hhRCNumber?(hhRealTotal/calcNumber):hhRCNumber;
			}
			else if (hhRealTotal >= 4000 && hhRealTotal < 6500) //显示 2666 - 3500
			{
				hhTotal = 2666 + (hhRealTotal-4000)/(6500-4000)*(3500-2666);
			}
			else if (hhRealTotal >= 6500 && hhRealTotal < 8500) //显示 3500 - 3950
			{
				hhTotal = 3500 + (hhRealTotal-6500)/(8500-6500)*(3950-3500);
			}
			else
			{ 
				hhTotal = hhRCNumber;
			}
			
			
			hhLastTicket = hhTicketTotal - hhTotal;
			hhLastTicket = hhLastTicket>0?hhLastTicket:0; //赵文旺
			
			console.log ("前海实际: %d, 显示: %d", qhRealTotal, qhTotal);
			console.log ("后海实际: %d, 显示: %d", hhRealTotal, hhTotal);
			
			res.send({
				qhTotalNumber: qhTotal,
				hhTotalNumber: hhTotal,
				qhLastTicket: qhLastTicket,
				hhLastTicket: hhLastTicket
			});
		});
	});
	
	req.end();
});

// 日场不包括夜场的数据
// 测试数据
router.get('/getDatavTest',async function(reqon,res){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var hour = nowDate.getHours();
	var qhTicketTotal;
	var hhTicketTotal;
	var qhLastTicket;
	var hhLastTicket;
	// 倍数设置
	var calcNumber = 1.5;
	// 前海日场限流
	var qhRCNumber = 3000;
	// 前海夜场限流
	var qhYCNumber = 500;
	// 后海日场限流
	var hhRCNumber = 4000;
	// 后海夜场限流
	var hhYCNumber = 0;
	if(hour < 17){
		qhTicketTotal = qhRCNumber;
		hhTicketTotal = hhRCNumber;
	}else if(17 <= hour){
		qhTicketTotal = qhYCNumber;
		hhTicketTotal = hhYCNumber;
	}
	const options = {
		hostname: host,
		path: '/ticketApi/order/getSalesByVisitDate?enterpriseCode=TgsEpcSch&ticketSalesChannelsNum=MT&visitDate=' + year + '-' + month + '-' + day,
		method: 'GET'
	};
	
	const req = https.request(options, (res1) => {
		res1.on('data', (d) => {
			var res1 = JSON.parse(d.toString());
			var salesList = res1.data;
			var qhTotalNumber = 0;
			var hhTotalNumber = 0;
			var qhTotal = 0;
			var hhTotal = 0;
			var qhRealTotal = 0;
			var hhRealTotal = 0;
			salesList.forEach(function(value, key){
				if(hour < 17){
					if(value.ticketName.indexOf('前海') != -1 && value.ticketName.indexOf('夜场') == -1){
						qhTotal += parseInt(value.saleTotal);
						qhRealTotal = qhTotal;
					}
				}else{
					if(value.ticketName.indexOf('前海') != -1 && value.ticketName.indexOf('夜场') != -1){
						qhTotal += parseInt(value.saleTotal);
						qhRealTotal = qhTotal;
					}
				}
				
				if(value.ticketName.indexOf('后海') != -1){
					hhTotal += parseInt(value.saleTotal);
					hhRealTotal = hhTotal;
				}
			})
			if(hour < 17){
				qhTotal = (qhTotal/calcNumber)<qhRCNumber?(qhTotal/calcNumber):qhRCNumber;
			}else{
				qhTotal = (qhTotal/calcNumber)<qhYCNumber?(qhTotal/calcNumber):qhYCNumber;
			}
			qhLastTicket = qhTicketTotal - qhTotal;
			qhLastTicket = qhLastTicket>0?qhLastTicket:0;
			
			
			hhTotal = (hhTotal/calcNumber)<hhRCNumber?(hhTotal/calcNumber):hhRCNumber;
			hhLastTicket = hhTicketTotal - hhTotal;
			hhLastTicket = hhLastTicket>0?hhLastTicket:0;
			res.send({
				qhTotalNumber: qhTotal,
				hhTotalNumber: hhTotal,
				qhLastTicket: qhLastTicket,
				hhLastTicket: hhLastTicket
			});
		});
	});
	
	req.end();
});

module.exports = router;
