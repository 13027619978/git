var express=require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring');
const fs = require('fs');
let path = require('path');

router.get('/getCount', async function(req, res){
	fs.readFile(path.resolve(__dirname, './jsonData/schOutCount.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		res.send(data);
	})
})

router.get('/writeCount', async function(req, res){
	let count = req.query.count;
	let hhcount = req.query.hhcount;
	if(count && hhcount){
		fs.readFile(path.resolve(__dirname, './jsonData/schOutCount.json'), 'utf8', function(err, data){
			if(err){
		        return console.error(err);
			}
			data = JSON.parse(data);
			data.count = count;
			data.hhcount = hhcount;
			fs.writeFile(path.resolve(__dirname, './jsonData/schOutCount.json'), JSON.stringify(data),function(err){
				if(err){
					console.error(err);
					res.send({
						"success": "fail",
						"msg": "修改失败"
					});
					return;
				}
				res.send({
					success: 'true',
					msg: '修改系数成功',
					data: data
				})
			})
		})
	}else{
		res.send({
			success: 'fail',
			msg: '修改失败'
		})
	}
})

router.get('/getOutPeopleInfo', async function(reqon, res){
	try{
		var nowDate = new Date();
		var year = nowDate.getFullYear();
		var month = nowDate.getMonth()+1;
		month = month>9?month:'0'+month;
		var day = nowDate.getDate();
		day = day>9?day:'0'+day;
		getToken(function(token){
			const options = {
				hostname: 'dev.meirenji.cn',
				path: '/api/v2/multipleInstance/traffic/day',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			};
			var buffers = [];
			var nread = 0;
			const req = http.request(options, (res1) => {
				res1.on('data', (d) => {
					buffers.push(d);
					nread += d.length;
				});
				
				res1.on('end', () => {
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
					var res1 = JSON.parse(buffer.toString());
					var qhIn = res1.content[1].out;
					var hhIn = res1.content[0].out;
					var qhOut = res1.content[1].in - qhIn;
					qhOut = qhOut>0?qhOut:0;
					var hhOut = res1.content[0].in - hhIn;
					hhOut = hhOut>0?hhOut:0;
					var qhsjOut = res1.content[1].in;
					var hhsjOut = res1.content[0].in;
					fs.readFile(path.resolve(__dirname, './jsonData/schOutCount.json'), 'utf8', function(err, data){
						if(err){
					        return console.error(err);
						}
						data = JSON.parse(data);
						var qhOut1 = qhOut * data.count;
						var hhOut1 = hhOut * data.hhcount;
						res.send({
							qhOut: parseInt(qhOut1),
							hhOut: parseInt(hhOut1),
							qhsjOut: qhsjOut,
							hhsjOut: hhsjOut,
							qhsjIn: qhIn,
							hhsjIn: hhIn
						})
					})
				})
			});
			
			req.write(querystring.stringify({
				access_token: token,
				appId: 'MRJ_ed1e658db20e40febf50bba423fdb057',
				start: year + '-' + month + '-' + day,
				end: year + '-' + month + '-' + day
			}));
			req.end();
		})
	}catch(e){
		console.log(e);
		res.send({
			qhOut: 0,
			hhOut: 0,
			qhsjOut: 0,
			hhsjOut: 0
		})
	}
})

function getToken(success){
	const options = {
		hostname: 'dev.meirenji.cn',
		path: '/oauth/token',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};
	var buffers = [];
	var nread = 0;
	const req = http.request(options, (res1) => {
		res1.on('data', (d) => {
			buffers.push(d);
			nread += d.length;
		});
		
		res1.on('end', () => {
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
			var res1 = JSON.parse(buffer.toString());
			success(res1.access_token);
		})
	});
	
	req.write(querystring.stringify({
		grant_type: 'client_credentials',
		client_id: 'MRJ_ed1e658db20e40febf50bba423fdb057',
		client_secret: 'de80beefd9164682bb86481caa6fd6ca'
	}));
	req.end();
}


router.get('/getLastWeather', async function(req, res){
	fs.readFile(path.resolve(__dirname, './jsonData/lastWeather.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		let weatherList = data.weatherList;
		let nowMonth = new Date().getMonth() + 1;
		nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
		let nowDay = new Date().getDate();
		nowDay = nowDay>9?nowDay:'0'+nowDay;
		let nowDate = nowMonth + '-' + nowDay;
		if(weatherList[weatherList.length - 1].date != nowDate){
			getWeatherInfo(function(nowWeather){
				nowWeather = nowWeather[0];
				let weatherItem = {
					date: nowDate,
					picUrl: nowWeather.picUrl,
					temperature: nowWeather.temperature,
					weather: nowWeather.weather,
					wind: nowWeather.wind,
					windpower: nowWeather.windpower
				}
				if(weatherList.length == 0){
					weatherList.push(weatherItem);
				}else{
					if(weatherList.length < 8){
						weatherList.push(weatherItem);
					}else{
						weatherList.push(weatherItem);
						weatherList.splice(0, 1);
					}
				}
				fs.writeFile(path.resolve(__dirname, './jsonData/lastWeather.json'), JSON.stringify({
					weatherList: weatherList
				}),function(err){
					if(err){
						console.error(err);
						res.send({
							"success": "fail",
							"msg": "修改失败"
						});
						return;
					}
					res.send(weatherList);
				})
			});
		}else{
			getWeatherInfo(function(nowWeather){
				nowWeather = nowWeather[0];
				let weatherItem = {
					date: nowDate,
					picUrl: nowWeather.picUrl,
					temperature: nowWeather.temperature,
					weather: nowWeather.weather,
					wind: nowWeather.wind,
					windpower: nowWeather.windpower
				}
				if(weatherList[weatherList.length - 1].weather != weatherItem.weather){
					weatherList[weatherList.length - 1] = weatherItem;
					fs.writeFile(path.resolve(__dirname, './jsonData/lastWeather.json'), JSON.stringify({
						weatherList: weatherList
					}),function(err){
						if(err){
							console.error(err);
							res.send({
								"success": "fail",
								"msg": "修改失败"
							});
							return;
						}
						res.send(weatherList);
					})
				}else{
					res.send(weatherList);
				}
			});
		}
	})
})

function getWeatherInfo(success){
	const options = {
		hostname: 'node.smart-ideas.com.cn',
		port: '3001',
		path: '/datav/common/weather/v1/weatherInfo?city=110106',
		method: 'GET'
	};
	
	var buffers = [];
	var nread = 0;
	const req = http.request(options, (res1) => {
		res1.on('data', (d) => {
			buffers.push(d);
			nread += d.length;
		});
		
		res1.on('end', () => {
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
			var res1 = JSON.parse(buffer.toString());
			success(res1);
		})
	});
	
	req.end();
}

router.get('/getIcePeople', async function(req, res){
	fs.readFile(path.resolve(__dirname, './jsonData/schIcePeople.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		res.send({
			success: 'true',
			msg: '查询成功',
			data: data
		})
	})
})

router.get('/writeIcePeople', async function (req, res){
	let nowYear = new Date().getFullYear();
	let nowMonth = new Date().getMonth() + 1;
	nowMonth = nowMonth > 9 ? nowMonth : '0' + nowMonth;
	let nowDay = new Date().getDate();
	nowDay = nowDay > 9 ? nowDay : '0' + nowDay;
	let nowHour = new Date().getHours();
	nowHour = nowHour > 9 ? nowHour : '0' + nowHour;
	let nowMinutes = new Date().getMinutes();
	nowMinutes = nowMinutes > 9 ? nowMinutes : '0' + nowMinutes;
	let nowSeconds = new Date().getSeconds();
	nowSeconds = nowSeconds > 9 ? nowSeconds : '0' + nowSeconds;
	let currDate = encodeURI(nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds);
	let dateString = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	try{
		getTotalPeopleInfo(function(totalIn){
			getTotalOutPeopleInfo(function(totalOut){
				let nowIcePeople = parseInt(totalIn) - parseInt(totalOut);
				console.log(nowIcePeople);
				nowIcePeople = nowIcePeople>0?nowIcePeople:0;
				fs.readFile(path.resolve(__dirname, './jsonData/schIcePeople.json'), 'utf8', function(err, data){
					if(err){
				        return console.error(err);
					}
					data = JSON.parse(data);
					let icePeople = data.value;
					let oldDate = data.date.split(' ')[0];
					let nowDateString = nowYear + '-' + nowMonth + '-' + nowDay;
					if(nowIcePeople > icePeople || oldDate != nowDateString){
						fs.writeFile(path.resolve(__dirname, './jsonData/schIcePeople.json'), JSON.stringify({
							value: nowIcePeople,
							date: dateString
						}),function(err){
							if(err){
								console.error(err);
								res.send({
									"success": "fail",
									"msg": "修改失败"
								});
								return;
							}
							res.send({
								success: 'true',
								msg: '修改成功',
								data: {
									value: nowIcePeople,
									date: dateString
								}
							})
						})
					}else{
						res.send({
							success: 'true',
							msg: '无需修改',
							data: data
						})
					}
				})
			})
		})
	}catch(e){
		
	}
})

function getTotalPeopleInfo(success){
	try{
		let nowYear = new Date().getFullYear();
		let nowMonth = new Date().getMonth() + 1;
		nowMonth = nowMonth > 9 ? nowMonth : '0' + nowMonth;
		let nowDay = new Date().getDate();
		nowDay = nowDay > 9 ? nowDay : '0' + nowDay;
		let nowHour = new Date().getHours();
		nowHour = nowHour > 9 ? nowHour : '0' + nowHour;
		let nowMinutes = new Date().getMinutes();
		nowMinutes = nowMinutes > 9 ? nowMinutes : '0' + nowMinutes;
		let nowSeconds = new Date().getSeconds();
		nowSeconds = nowSeconds > 9 ? nowSeconds : '0' + nowSeconds;
		let currDate = nowYear + '-' + nowMonth + '-' + nowDay;
		let startDate = encodeURI(nowYear + '-' + nowMonth + '-' + nowDay + ' 00:00:00');
		let endDate = encodeURI(nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds);
		const options = {
			hostname: 'boss.smart-ideas.com.cn',
			path: '/ticketApi/robotCollection/brakeData/get?enterpriseCode=TgsEpcSh&ticketGroupNum=TGN20211223142734998&startTime='+ startDate +'&endTime=' + endDate,
			method: 'GET'
		};
		
		const req = http.request(options, (res1) => {
			res1.on('data', (d) => {
				let res = JSON.parse(d.toString());
				console.log(res);
				let dataList = res.data;
				let totalNumber = 0;
				dataList.forEach(function(value, key){
					totalNumber += parseInt(value.inTotal);
				})
				success(totalNumber);
			});
		});
		
		req.end();
	}catch(e){
		
	}
}

function getTotalOutPeopleInfo(success){
	try{
		const options = {
			hostname: 'node.smart-ideas.com.cn',
			port: '3001',
			path: '/datav/sch/getOutPeopleInfo',
			method: 'GET'
		};
		
		var buffers = [];
		var nread = 0;
		
		const req = http.request(options, (res1) => {
			res1.on('data', (d) => {
				buffers.push(d);
				nread += d.length;
			});
			
			res1.on('end', () => {
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
				let res = JSON.parse(buffer.toString());
				let qhOut = res.qhOut?res.qhOut:0;
				let hhOut = res.hhOut?res.hhOut:0;
				let totalOutPeople = parseInt(qhOut) + parseInt(hhOut);
				success(totalOutPeople);
			})
		});
		
		req.end();
	}
	catch(e){
		
	}
}

module.exports = router;
