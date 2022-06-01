var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');
var host = 'hd.smart-ideas.com.cn';
const fs = require('fs');
let path = require('path');

router.get('/getDeviceShipLeaseInfo', async function(req, res) {
	var leaseArr = [];
	res.send(leaseArr);
});


router.get('/getDeviceShipRefundInfo', async function(req, res) {
	var leaseArr = [];
	getBoatRefundInfo('f57419d544e741838fb789056f63ee80', function(res1) {
		res1.forEach(function(value, key) {
			leaseArr.push(value);
		})
		getBoatRefundInfo('bcd98681896f48ed878486519bfdeacf', function(res2) {
			res2.forEach(function(value, key) {
				leaseArr.push(value);
			})
			getBoatRefundInfo('b4124ce0c8b244208de6d870ceb824a0', function(res3) {
				res3.forEach(function(value, key) {
					leaseArr.push(value);
				})
				getBoatRefundInfo('59800000eb4a4c4287652f86eaba848c', function(res4) {
					res4.forEach(function(value, key) {
						leaseArr.push(value);
					})
					res.send(leaseArr)
				});
			});
		});
	});
});

// 写入租赁详情
router.get('/writeLeaseList', async function(req, res1) {
	var mtName = req.query.name;
	var scenicId;
	if (mtName == 'jfm') {
		scenicId = 'f57419d544e741838fb789056f63ee80';
	} else if (mtName == 'lz') {
		scenicId = '59800000eb4a4c4287652f86eaba848c';
	} else if (mtName == 'tld') {
		scenicId = 'bcd98681896f48ed878486519bfdeacf';
	} else if (mtName == 'xwmn') {
		scenicId = 'b4124ce0c8b244208de6d870ceb824a0';
	} else if (mtName == 'xwmb') {
		scenicId = '43a3c0756f854990ad7fd13f597cda3c';
	} else if (mtName == 'hhyy') {
		scenicId = 'a9f74e0b584945bea69985cd17f66a9d';
	} else if (mtName == 'hpm') {
		scenicId = '8698c2bb90d645b3912528473f5ce930';
	} else if (mtName == 'czm') {
		scenicId = '41ab29656e5b405a9c94871488050ec3';
	} else if (mtName == 'yg') {
		scenicId = '283db1801eda4d0d9b542570b4506219';
	} else if (mtName == 'fq') {
		scenicId = '3f288414620f42cba6a7634401f71bca';
	} else if (mtName == 'gpd') {
		scenicId = '9030c8e60fa34f37b674a30f3c890143';
	} else if (mtName == 'hz') {
		scenicId = '696dc31a1125458fa5ba1696f6e445c7';
	}
	const options = {
		hostname: host,
		path: '/xwhpark/deviceDataView/getDeviceShipLeaseInfo?scenicId=' + scenicId,
		method: 'GET'
	};
	fs.readFile(path.resolve(__dirname, './jsonData/xwhLeaseList.json'), 'utf8', function(err, data) {
		if (err) {
			return console.error(err);
		}
		data = JSON.parse(data);
		const req = http.request(options, (res) => {
			res.on('data', (d) => {
				var res = JSON.parse(d.toString());
				data[mtName] = res;
				fs.writeFile(path.resolve(__dirname, './jsonData/xwhLeaseList.json'), JSON.stringify(data), function(err) {
					if (err) {
						console.error(err);
						return;
					}
					res1.send({
						code: 'success',
						msg: '增加成功'
					});
				})
			});
		});
		req.end();
	})
})

// 增加叫号人数
router.get('/addQueueNumber', async function(req, res) {
	var scenicId = req.query.scenicId;
	if (!scenicId) {
		res.send({
			code: 'fail',
			msg: '未传参数'
		})
		return;
	} else {
		if (scenicId != '1' && scenicId != '2' && scenicId != '3' && scenicId != '4') {
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
	nowMonth = nowMonth > 9 ? nowMonth : '0' + nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay > 9 ? nowDay : '0' + nowDay;
	var nowTime = nowYear + '-' + nowMonth + '-' + nowDay;


	fs.readFile(path.resolve(__dirname, './jsonData/xwhQueue.json'), 'utf8', function(err, data) {
		if (err) {
			return console.error(err);
		}
		var newQueueData;
		data = JSON.parse(data);
		if (data.date == nowTime) {
			var queueNumber = 0;
			newQueueData = data;
		} else {
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
		if (scenicId == '1') {
			queueNumber = data.queueNumber.jfm;
			queueNumber = parseInt(queueNumber) + 1;
			newQueueData.queueNumber.jfm = queueNumber;
		} else if (scenicId == '2') {
			queueNumber = data.queueNumber.tld;
			queueNumber = parseInt(queueNumber) + 1;
			newQueueData.queueNumber.tld = queueNumber;
		} else if (scenicId == '3') {
			queueNumber = data.queueNumber.xwm;
			queueNumber = parseInt(queueNumber) + 1;
			newQueueData.queueNumber.xwm = queueNumber;
		} else if (scenicId == '4') {
			queueNumber = data.queueNumber.lz;
			queueNumber = parseInt(queueNumber) + 1;
			newQueueData.queueNumber.lz = queueNumber;
		}

		fs.writeFile(path.resolve(__dirname, './jsonData/xwhQueue.json'), JSON.stringify(newQueueData), function(err) {
			if (err) {
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
router.get('/getQueueNumber', async function(req, res) {
	var scenicId = req.query.scenicId;
	if (!scenicId) {
		res.send({
			code: 'fail',
			msg: '未传参数'
		})
		return;
	} else {
		if (scenicId != '1' && scenicId != '2' && scenicId != '3' && scenicId != '4') {
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
	nowMonth = nowMonth > 9 ? nowMonth : '0' + nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay > 9 ? nowDay : '0' + nowDay;
	var nowTime = nowYear + '-' + nowMonth + '-' + nowDay;

	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/xwhQueue.json'), 'utf8', function(err, data) {
		if (err) {
			return console.error(err);
		}
		data = JSON.parse(data);
		if (nowTime == data.date) {
			var queueNumber = 0;
			if (scenicId == '1') {
				queueNumber = data.queueNumber.jfm;
			} else if (scenicId == '2') {
				queueNumber = data.queueNumber.tld;
			} else if (scenicId == '3') {
				queueNumber = data.queueNumber.xwm;
			} else if (scenicId == '4') {
				queueNumber = data.queueNumber.lz;
			}
			res.send({
				code: 'success',
				msg: '查询成功',
				data: {
					queueNumber: queueNumber
				}
			});
		} else {
			var xwhQueueData = {
				"date": nowTime,
				"queueNumber": {
					"jfm": 0,
					"tld": 0,
					"xwm": 0,
					"lz": 0
				}
			};
			fs.writeFile(path.resolve(__dirname, './jsonData/xwhQueue.json'), JSON.stringify(xwhQueueData), function(err) {
				if (err) {
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
function getBoatRefundInfo(scenicId, success) {
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
function getBoatLeaseInfo(scenicId, success) {
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

// 获取开船信息
router.get('/getBoatOpenInfo', async function(req, res) {
	fs.readFile(path.resolve(__dirname, './jsonData/xwhOpen.json'), 'utf8', function(err, data) {
		if (err) {
			return console.error(err);
		}
		data = JSON.parse(data);
		res.send({
			code: 'success',
			msg: '查询成功',
			data: data
		});
	})
})

// 写入开船信息
router.get('/writeBoatOpenInfo', async function(req, res) {
	var scenicId = req.query.scenicId;
	var openDate = req.query.openDate;
	var code = req.query.code;
	var mt;
	const xwhRoomWharfId = {
		JFM: 'f57419d544e741838fb789056f63ee80',
		LZ: '59800000eb4a4c4287652f86eaba848c',
		TLD: 'bcd98681896f48ed878486519bfdeacf',
		XWM: 'b4124ce0c8b244208de6d870ceb824a0',
		XWMB: '43a3c0756f854990ad7fd13f597cda3c',
		HHYY: 'a9f74e0b584945bea69985cd17f66a9d',
		HPM: '8698c2bb90d645b3912528473f5ce930',
		CZM: '41ab29656e5b405a9c94871488050ec3',
		YG: '283db1801eda4d0d9b542570b4506219',
		FQ: '3f288414620f42cba6a7634401f71bca',
		GPD: '9030c8e60fa34f37b674a30f3c890143',
		HZ: '696dc31a1125458fa5ba1696f6e445c7',
		TLDX: '80b566bb372a47f7a4a24fda6ed0d476'
	};
	if (scenicId == xwhRoomWharfId.JFM) {
		mt = '解放门码头';
	} else if (scenicId == xwhRoomWharfId.LZ) {
		mt = '菱洲码头';
	} else if (scenicId == xwhRoomWharfId.TLD) {
		mt = '台菱堤码头';
	} else if (scenicId == xwhRoomWharfId.XWM) {
		mt = '玄武门南码头';
	} else if (scenicId == xwhRoomWharfId.XWMB) {
		mt = '玄武门北码头';
	} else if (scenicId == xwhRoomWharfId.HHYY) {
		mt = '后湖印月码头';
	} else if (scenicId == xwhRoomWharfId.HPM) {
		mt = '和平门码头';
	} else if (scenicId == xwhRoomWharfId.CZM) {
		mt = '翠洲门码头';
	} else if (scenicId == xwhRoomWharfId.YG) {
		mt = '阳光码头';
	} else if (scenicId == xwhRoomWharfId.FQ) {
		mt = '芳桥码头';
	} else if (scenicId == xwhRoomWharfId.GPD) {
		mt = '郭璞敦码头';
	} else if (scenicId == xwhRoomWharfId.HZ) {
		mt = '环洲码头';
	} else if (scenicId == xwhRoomWharfId.TLDX) {
		mt = '台菱堤西码头';
	}
	fs.readFile(path.resolve(__dirname, './jsonData/xwhOpen.json'), 'utf8', function(err, data) {
		if (err) {
			return console.error(err);
		}
		data = JSON.parse(data);
		var openInfo = data.openInfo;
		openInfo.forEach(function(value, key) {
			if (value.mt == mt) {
				openInfo[key].openTotal += 1;
				openInfo[key].openList.push({
					code: code,
					openDate: openDate
				})
			}
		})
		data.openInfo = openInfo;
		fs.writeFile(path.resolve(__dirname, './jsonData/xwhOpen.json'), JSON.stringify(data), function(err) {
			if (err) {
				console.error(err);
				return;
			}
			res.send({
				code: 'success',
				msg: '写入成功',
				data: data
			});
		})
	})
})

// 移除指定开锁数据
router.get('/deleteBoatOpenInfo', async function(req, res) {
	var scenicId = req.query.scenicId;
	var code = req.query.code;
	var mt;
	const xwhRoomWharfId = {
		JFM: 'f57419d544e741838fb789056f63ee80',
		LZ: '59800000eb4a4c4287652f86eaba848c',
		TLD: 'bcd98681896f48ed878486519bfdeacf',
		XWM: 'b4124ce0c8b244208de6d870ceb824a0',
		XWMB: '43a3c0756f854990ad7fd13f597cda3c',
		HHYY: 'a9f74e0b584945bea69985cd17f66a9d',
		HPM: '8698c2bb90d645b3912528473f5ce930',
		CZM: '41ab29656e5b405a9c94871488050ec3',
		YG: '283db1801eda4d0d9b542570b4506219',
		FQ: '3f288414620f42cba6a7634401f71bca',
		GPD: '9030c8e60fa34f37b674a30f3c890143',
		HZ: '696dc31a1125458fa5ba1696f6e445c7',
		TLDX: '80b566bb372a47f7a4a24fda6ed0d476'
	};
	if (scenicId == xwhRoomWharfId.JFM) {
		mt = '解放门码头';
	} else if (scenicId == xwhRoomWharfId.LZ) {
		mt = '菱洲码头';
	} else if (scenicId == xwhRoomWharfId.TLD) {
		mt = '台菱堤码头';
	} else if (scenicId == xwhRoomWharfId.XWM) {
		mt = '玄武门南码头';
	} else if (scenicId == xwhRoomWharfId.XWMB) {
		mt = '玄武门北码头';
	} else if (scenicId == xwhRoomWharfId.HHYY) {
		mt = '后湖印月码头';
	} else if (scenicId == xwhRoomWharfId.HPM) {
		mt = '和平门码头';
	} else if (scenicId == xwhRoomWharfId.CZM) {
		mt = '翠洲门码头';
	} else if (scenicId == xwhRoomWharfId.YG) {
		mt = '阳光码头';
	} else if (scenicId == xwhRoomWharfId.FQ) {
		mt = '芳桥码头';
	} else if (scenicId == xwhRoomWharfId.GPD) {
		mt = '郭璞敦码头';
	} else if (scenicId == xwhRoomWharfId.HZ) {
		mt = '环洲码头';
	} else if (scenicId == xwhRoomWharfId.TLDX) {
		mt = '台菱堤西码头';
	}
	fs.readFile(path.resolve(__dirname, './jsonData/xwhOpen.json'), 'utf8', function(err, data) {
		if (err) {
			return console.error(err);
		}
		data = JSON.parse(data);
		var openInfo = data.openInfo;
		openInfo.forEach(function(value, key) {
			if (value.mt == mt) {
				openInfo[key].openTotal -= 1;
				var openList = value.openList;
				var newOpenList = [];
				openList.forEach(function(item, itemKey) {
					if (item.code != code) {
						newOpenList.push(item);
					}
				})
				openInfo[key].openList = newOpenList;
			}
		})

		data.openInfo = openInfo;

		fs.writeFile(path.resolve(__dirname, './jsonData/xwhOpen.json'), JSON.stringify(data), function(err) {
			if (err) {
				console.error(err);
				return;
			}
			res.send({
				code: 'success',
				msg: '删除成功',
				data: data
			});
		})
	})
})

// 清空开船数据
router.get('/clearBoatOpenInfo', async function(req, res) {
	var data = {
		"openInfo": [{
				"mt": "解放门码头",
				"openTotal": 0,
				"openList": []
			},
			{
				"mt": "菱洲码头",
				"openTotal": 0,
				"openList": []
			},
			{
				"mt": "台菱堤码头",
				"openTotal": 0,
				"openList": []
			},
			{
				"mt": "玄武门南码头",
				"openTotal": 0,
				"openList": []
			},
			{
				"mt": "玄武门北码头",
				"openTotal": 0,
				"openList": []
			},
			{
				"mt": "后湖印月码头",
				"openTotal": 0,
				"openList": []
			},
			{
				"mt": "和平门码头",
				"openTotal": 0,
				"openList": []
			},
			{
				"mt": "翠洲门码头",
				"openTotal": 0,
				"openList": []
			},
			{
				"mt": "阳光码头",
				"openTotal": 0,
				"openList": []
			},
			{
				"mt": "芳桥码头",
				"openTotal": 0,
				"openList": []
			},
			{
				"mt": "郭璞敦码头",
				"openTotal": 0,
				"openList": []
			},
			{
				"mt": "环洲码头",
				"openTotal": 0,
				"openList": []
			},
			{
				"mt": "台菱堤西码头",
				"openTotal": 0,
				"openList": []
			}
		]
	};
	fs.writeFile(path.resolve(__dirname, './jsonData/xwhOpen.json'), JSON.stringify(data), function(err) {
		if (err) {
			console.error(err);
			return;
		}
		res.send({
			code: 'success',
			msg: '清空成功',
			data: data
		});
	})
})


// 获取游船gps
router.get('/getShipGps', async function(req, res1) {
	var gpsList = [];
	var scenicIdList = [
		'41ab29656e5b405a9c94871488050ec3',
		'3f288414620f42cba6a7634401f71bca',
		'9030c8e60fa34f37b674a30f3c890143',
		'a9f74e0b584945bea69985cd17f66a9d',
		'8698c2bb90d645b3912528473f5ce930',
		'696dc31a1125458fa5ba1696f6e445c7',
		'f57419d544e741838fb789056f63ee80',
		'59800000eb4a4c4287652f86eaba848c',
		'bcd98681896f48ed878486519bfdeacf',
		'43a3c0756f854990ad7fd13f597cda3c',
		'b4124ce0c8b244208de6d870ceb824a0',
		'283db1801eda4d0d9b542570b4506219'
	]
	getShipGps(scenicIdList[0], gpsList, function() {
		getShipGps(scenicIdList[1], gpsList, function() {
			getShipGps(scenicIdList[2], gpsList, function() {
				getShipGps(scenicIdList[3], gpsList, function() {
					getShipGps(scenicIdList[4], gpsList, function() {
						getShipGps(scenicIdList[5], gpsList, function() {
							getShipGps(scenicIdList[6], gpsList, function() {
								getShipGps(scenicIdList[7], gpsList, function() {
									getShipGps(scenicIdList[8], gpsList, function() {
										getShipGps(scenicIdList[9], gpsList, function() {
											getShipGps(scenicIdList[10], gpsList, function() {
												getShipGps(scenicIdList[11], gpsList, function() {
													getShipGps(scenicIdList[12], gpsList, function() {
														var newGpsList = [];
														var boatNumber = 0;
														gpsList.forEach(function(value, key) {
															const options = {
																hostname: 'restapi.amap.com',
																path: '/v3/assistant/coordinate/convert?locations=' + value.lng + ',' +
																	value.lat +
																	'&coordsys=gps&output=JSON&key=bfd08985951210db7c0221a82f3734cd',
																method: 'GET'
															};

															const req = https.request(options, (res) => {
																res.on('data', (d) => {
																	var res = JSON.parse(d.toString());
																	var lnglat = res.locations;
																	if (lnglat) {
																		var lng = lnglat.split(',')[0];
																		var lat = lnglat.split(',')[1];
																		var item = {
																			lng: lng,
																			lat: lat
																		};
																		boatNumber += 1;
																		newGpsList.push(item);
																	} else {
																		boatNumber += 1;
																	}

																	if (boatNumber == gpsList.length) {
																		fs.writeFile(path.resolve(__dirname,
																			'./jsonData/xwhOnlineBoat.json'), JSON.stringify({
																			codeList: newGpsList
																		}), function(err) {
																			if (err) {
																				console.error(err);
																				return;
																			}
																			res1.send({
																				message: '保存成功'
																			});
																		})
																	}
																});
															});
															req.end();
														})
													})
												})
											})
										})
									})
								})
							})
						})
					})
				})
			})
		})
	})
})

// 读取游船位置
router.get('/readBoatGps', async function(req, res) {
	fs.readFile(path.resolve(__dirname, './jsonData/xwhOnlineBoat.json'), 'utf8', function(err, data) {
		if (err) {
			return console.error(err);
		}
		data = JSON.parse(data);
		res.send(data.codeList);
	})
})

// 写入离线设备信息
router.get('/writeOutLineInfo', async function(req, res) {
	var mtName = req.query.name;
	var scenicId;
	if (mtName == 'jfm') {
		scenicId = 'f57419d544e741838fb789056f63ee80';
	} else if (mtName == 'lz') {
		scenicId = '59800000eb4a4c4287652f86eaba848c';
	} else if (mtName == 'tld') {
		scenicId = 'bcd98681896f48ed878486519bfdeacf';
	} else if (mtName == 'xwmn') {
		scenicId = 'b4124ce0c8b244208de6d870ceb824a0';
	} else if (mtName == 'xwmb') {
		scenicId = '43a3c0756f854990ad7fd13f597cda3c';
	} else if (mtName == 'hhyy') {
		scenicId = 'a9f74e0b584945bea69985cd17f66a9d';
	} else if (mtName == 'hpm') {
		scenicId = '8698c2bb90d645b3912528473f5ce930';
	} else if (mtName == 'czm') {
		scenicId = '41ab29656e5b405a9c94871488050ec3';
	} else if (mtName == 'yg') {
		scenicId = '283db1801eda4d0d9b542570b4506219';
	} else if (mtName == 'fq') {
		scenicId = '3f288414620f42cba6a7634401f71bca';
	} else if (mtName == 'gpd') {
		scenicId = '9030c8e60fa34f37b674a30f3c890143';
	} else if (mtName == 'hz') {
		scenicId = '696dc31a1125458fa5ba1696f6e445c7';
	} else if (mtName == 'tldx') {
		scenicId = '80b566bb372a47f7a4a24fda6ed0d476';
	}
	fs.readFile(path.resolve(__dirname, './jsonData/xwhOutlineBoat.json'), 'utf8', function(err, data) {
		if (err) {
			return console.error(err);
		}
		if (isJSON(data.toString())) {
			data = JSON.parse(data);
		} else {
			data = {
				"mtList": {
					"jfm": [{
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}],
					"lz": [{
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}],
					"tld": [{
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}],
					"xwmn": [{
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}],
					"xwmb": [{
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}],
					"hhyy": [{
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}],
					"hpm": [{
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}],
					"czm": [{
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}],
					"yg": [{
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}],
					"fq": [{
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}],
					"gpd": [{
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}],
					"hz": [{
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}],
					"tldx": [{
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}, {
						"total": 0,
						"codeList": []
					}]
				}
			};
		}

		var mtList = data.mtList;
		getBoatInfo(scenicId, data.mtList, function(mtItem) {
			if (mtList[mtName].length < 30) {
				mtList[mtName].push(mtItem);
			} else {
				mtList[mtName].push(mtItem);
				mtList[mtName].splice(0, 1);
			}
			data.mtList = mtList;
			fs.writeFile(path.resolve(__dirname, './jsonData/xwhOutlineBoat.json'), JSON.stringify(data), function(err) {
				if (err) {
					console.error(err);
					return;
				}
				res.send({
					code: 'success',
					msg: '增加成功'
				});
			})
		});
	})
})

// 获取30分钟最小离线数
router.get('/getMinOutline', async function(req, res) {
	fs.readFile(path.resolve(__dirname, './jsonData/xwhOutlineBoat.json'), 'utf8', function(err, data) {
		if (err) {
			return console.error(err);
		}
		data = JSON.parse(data);
		var jfm = data.mtList.jfm;
		var tld = data.mtList.tld;
		var xwmn = data.mtList.xwmn;
		var xwmb = data.mtList.xwmb;
		var lz = data.mtList.lz;
		var hhyy = data.mtList.hhyy;
		var hpm = data.mtList.hpm;
		var czm = data.mtList.czm;
		var yg = data.mtList.yg;
		var fq = data.mtList.fq;
		var gpd = data.mtList.gpd;
		var hz = data.mtList.hz;
		var tldx = data.mtList.tldx;
		jfm = getMinItem(jfm);
		tld = getMinItem(tld);
		xwmn = getMinItem(xwmn);
		xwmb = getMinItem(xwmb);
		lz = getMinItem(lz);
		hhyy = getMinItem(hhyy);
		hpm = getMinItem(hpm);
		czm = getMinItem(czm);
		yg = getMinItem(yg);
		fq = getMinItem(fq);
		gpd = getMinItem(gpd);
		hz = getMinItem(hz);
		tldx = getMinItem(tldx);
		res.send({
			jfm: jfm,
			tld: tld,
			xwmn: xwmn,
			xwmb: xwmb,
			lz: lz,
			hhyy: hhyy,
			hpm: hpm,
			czm: czm,
			yg: yg,
			fq: fq,
			gpd: gpd,
			hz: hz,
			tldx: tldx
		})
	})
})

// 获取数组中最小值
function getMinItem(mtList) {
	var minIndex = 0;
	var minItem = {
		total: 0,
		codeList: []
	};
	mtList.forEach(function(value, key) {
		if (key == 0) {
			minItem = value;
		} else {
			if (value.total < minItem.total) {
				minItem = value;
			}
		}
	});
	return minItem;
}

// 码头id获取设备状态
function getBoatInfo(scenicId, onlineBoat, success) {
	const options = {
		hostname: host,
		path: '/xwhpark/deviceDataView/getDeviceShipLocation?scenicId=' + scenicId,
		method: 'GET'
	};
	var buffers = [];
	var nread = 0;
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			buffers.push(d);
			nread += d.length;
		});

		res.on('end', () => {
			var buffer = null;
			switch (buffers.length) {
				case 0:
					buffer = new Buffer(0);
					break;
				case 1:
					buffer = buffers[0];
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
			var res = [];
			if (isJSON(buffer.toString())) {
				res = JSON.parse(buffer.toString());
				var totalOutline = 0;
				var codeList = [];
				if (res.length > 0) {
					res.forEach(function(value, key) {
						if (value.status == 'OFFLINE' && value.flag == 'Y') {
							totalOutline += 1;
							codeList.push(value.code);
						}
					})
				}
				var item = {
					total: totalOutline,
					codeList: codeList
				};
				success(item);
			}
		});
	});
	req.end();
}

// 获取GPS
function getShipGps(scenicId, gpsList, success) {
	const options = {
		hostname: host,
		path: '/xwhpark/deviceDataView/getDeviceShipLocation?scenicId=' + scenicId,
		method: 'GET'
	};
	var buffers = [];
	var nread = 0;
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			buffers.push(d);
			nread += d.length;
		});
		res.on('end', () => {
			var buffer = null;
			switch (buffers.length) {
				case 0:
					buffer = new Buffer(0);
					break;
				case 1:
					buffer = buffers[0];
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
			var res = JSON.parse(buffer.toString());
			res.forEach(function(value, key) {
				if (value.lat && value.lng && value.status == 'ONLINE') {
					var gpsItem = {
						lat: value.lat,
						lng: value.lng
					}
					gpsList.push(gpsItem);
				}
			})
			success();
		});
	});
	req.end();
}

function isJSON(str) {
	if (typeof str == 'string') {
		try {
			var obj = JSON.parse(str);
			if (typeof obj == 'object' && obj) {
				return true;
			} else {
				return false;
			}

		} catch (e) {
			console.log('error：' + str + '!!!' + e);
			return false;
		}
	}
	console.log('It is not a string!')
}


module.exports = router;
