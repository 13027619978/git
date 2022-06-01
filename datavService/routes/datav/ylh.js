var express=require('express');
var router = express.Router();
var http = require('http');
var https = require('https');
var host = 'rent.smart-ideas.com.cn';
const fs = require('fs');
let path = require('path');

// // 获取开船信息
// router.get('/getBoatOpenInfo',async function(req,res){
// 	fs.readFile(path.resolve(__dirname, './jsonData/xwhOpen.json'), 'utf8', function(err, data){
// 		if(err){
// 			return console.error(err);
// 		}
// 		data = JSON.parse(data);
// 		res.send({
// 			code: 'success',
// 			msg: '查询成功',
// 			data: data
// 		});
// 	})
// })

// // 写入开船信息
// router.get('/writeBoatOpenInfo',async function(req,res){
// 	var scenicId = req.query.scenicId;
// 	var openDate = req.query.openDate;
// 	var code = req.query.code;
// 	var mt;
// 	const xwhRoomWharfId = {
// 		XHW: '14249a7ee96d4d3f95195a799a3709d2',
// 		KYBG: '2a96be8cf7744d9088986920e2f0d6d9',
// 		LZSJ: '47fca49def99492c80a58d8592400589',
// 		NHYH: '4c74b97aaf5b4ff594d11841d4ec8de9',
// 		JYQ: '5acd3b7ae10544ec9632b41392c0e695',
// 		DQ: '8ea1d467f3af4d2aa46b09219d6273f6',
// 		CSLD: 'b3bb924f74ed4e8ebcad576a382e8791',
// 		SZG: 'cdabffaf5cb442da8f5ca9ac50f85efc',
// 		YYT: 'ed28b43724f0477d9755de59b28160dd',
// 		SGT: 'f769f573bc3e4df5986ec45993e94fbd'
		
// 	};
// 	if(scenicId == xwhRoomWharfId.XHW){
// 		mt = '杏花坞';
// 	}else if(scenicId == xwhRoomWharfId.KYBG){
// 		mt = '开元宾馆';
// 	}else if(scenicId == xwhRoomWharfId.LZSJ){
// 		mt = '老子水居';
// 	}else if(scenicId == xwhRoomWharfId.NHYH){
// 		mt = '南湖一号';
// 	}else if(scenicId == xwhRoomWharfId.JYQ){
// 		mt = '解忧桥';
// 	}else if(scenicId == xwhRoomWharfId.DQ){
// 		mt = '断桥';
// 	}else if(scenicId == xwhRoomWharfId.CSLD){
// 		mt = '沉水廊道';
// 	}else if(scenicId == xwhRoomWharfId.SZG){
// 		mt = '水族馆';
// 	}else if(scenicId == xwhRoomWharfId.YYT){
// 		mt = '音乐厅';
// 	}else if(scenicId == xwhRoomWharfId.SGT){
// 		mt = '苏公塔';
// 	}
// 	fs.readFile(path.resolve(__dirname, './jsonData/ylhOpen.json'), 'utf8', function(err, data){
// 		if(err){
// 			return console.error(err);
// 		}
// 		data = JSON.parse(data);
// 		var openInfo = data.openInfo;
// 		openInfo.forEach(function(value, key){
// 			if(value.mt == mt){
// 				openInfo[key].openTotal += 1;
// 				openInfo[key].openList.push({
// 					code: code,
// 					openDate: openDate
// 				})
// 			}
// 		})
// 		data.openInfo = openInfo;
// 		fs.writeFile(path.resolve(__dirname, './jsonData/ylhOpen.json'), JSON.stringify(data),function(err){
// 			if(err){
// 				console.error(err);
// 				return;
// 			}
// 			res.send({
// 				code: 'success',
// 				msg: '写入成功',
// 				data: data
// 			});
// 		})
// 	})
// })

// // 移除指定开锁数据
// router.get('/deleteBoatOpenInfo',async function(req,res){
// 	var scenicId = req.query.scenicId;
// 	var code = req.query.code;
// 	var mt;
// 	const xwhRoomWharfId = {
// 		XHW: '14249a7ee96d4d3f95195a799a3709d2',
// 		KYBG: '2a96be8cf7744d9088986920e2f0d6d9',
// 		LZSJ: '47fca49def99492c80a58d8592400589',
// 		NHYH: '4c74b97aaf5b4ff594d11841d4ec8de9',
// 		JYQ: '5acd3b7ae10544ec9632b41392c0e695',
// 		DQ: '8ea1d467f3af4d2aa46b09219d6273f6',
// 		CSLD: 'b3bb924f74ed4e8ebcad576a382e8791',
// 		SZG: 'cdabffaf5cb442da8f5ca9ac50f85efc',
// 		YYT: 'ed28b43724f0477d9755de59b28160dd',
// 		SGT: 'f769f573bc3e4df5986ec45993e94fbd'
		
// 	};
// 	if(scenicId == xwhRoomWharfId.XHW){
// 		mt = '杏花坞';
// 	}else if(scenicId == xwhRoomWharfId.KYBG){
// 		mt = '开元宾馆';
// 	}else if(scenicId == xwhRoomWharfId.LZSJ){
// 		mt = '老子水居';
// 	}else if(scenicId == xwhRoomWharfId.NHYH){
// 		mt = '南湖一号';
// 	}else if(scenicId == xwhRoomWharfId.JYQ){
// 		mt = '解忧桥';
// 	}else if(scenicId == xwhRoomWharfId.DQ){
// 		mt = '断桥';
// 	}else if(scenicId == xwhRoomWharfId.CSLD){
// 		mt = '沉水廊道';
// 	}else if(scenicId == xwhRoomWharfId.SZG){
// 		mt = '水族馆';
// 	}else if(scenicId == xwhRoomWharfId.YYT){
// 		mt = '音乐厅';
// 	}else if(scenicId == xwhRoomWharfId.SGT){
// 		mt = '苏公塔';
// 	}
// 	fs.readFile(path.resolve(__dirname, './jsonData/ylhOpen.json'), 'utf8', function(err, data){
// 		if(err){
// 			return console.error(err);
// 		}
// 		data = JSON.parse(data);
// 		var openInfo = data.openInfo;
// 		openInfo.forEach(function(value, key){
// 			if(value.mt == mt){
// 				openInfo[key].openTotal -= 1;
// 				var openList = value.openList;
// 				var newOpenList = [];
// 				openList.forEach(function(item, itemKey){
// 					if(item.code != code){
// 						newOpenList.push(item);
// 					}
// 				})
// 				openInfo[key].openList = newOpenList;
// 			}
// 		})
		
// 		data.openInfo = openInfo;
		
// 		fs.writeFile(path.resolve(__dirname, './jsonData/ylhOpen.json'), JSON.stringify(data),function(err){
// 			if(err){
// 				console.error(err);
// 				return;
// 			}
// 			res.send({
// 				code: 'success',
// 				msg: '删除成功',
// 				data: data
// 			});
// 		})
// 	})
// })

// // 清空开船数据
// router.get('/clearBoatOpenInfo',async function(req,res){
// 	var data = {
// 		"openInfo": [
// 			{
// 				"mt": "杏花坞",
// 				"openTotal": 0,
// 				"openList": []
// 			},
// 			{
// 				"mt": "开元宾馆",
// 				"openTotal": 0,
// 				"openList": []
// 			},
// 			{
// 				"mt": "老子水居",
// 				"openTotal": 0,
// 				"openList": []
// 			},
// 			{
// 				"mt": "南湖一号",
// 				"openTotal": 0,
// 				"openList": []
// 			},
// 			{
// 				"mt": "解忧桥",
// 				"openTotal": 0,
// 				"openList": []
// 			},
// 			{
// 				"mt": "断桥",
// 				"openTotal": 0,
// 				"openList": []
// 			},
// 			{
// 				"mt": "沉水廊道",
// 				"openTotal": 0,
// 				"openList": []
// 			},
// 			{
// 				"mt": "水族馆",
// 				"openTotal": 0,
// 				"openList": []
// 			},
// 			{
// 				"mt": "音乐厅",
// 				"openTotal": 0,
// 				"openList": []
// 			},
// 			{
// 				"mt": "苏公塔",
// 				"openTotal": 0,
// 				"openList": []
// 			}
// 		]
// 	};
// 	fs.writeFile(path.resolve(__dirname, './jsonData/ylhOpen.json'), JSON.stringify(data),function(err){
// 		if(err){
// 			console.error(err);
// 			return;
// 		}
// 		res.send({
// 			code: 'success',
// 			msg: '清空成功',
// 			data: data
// 		});
// 	})
// })

// function isJSON(str) {
//     if (typeof str == 'string') {
//         try {
//             var obj=JSON.parse(str);
//             if(typeof obj == 'object' && obj ){
//                 return true;
//             }else{
//                 return false;
//             }

//         } catch(e) {
//             console.log('error：'+str+'!!!'+e);
//             return false;
//         }
//     }
//     console.log('It is not a string!')
// }

// router.get('/addYlhCoupons', async function(req, res){
// 	fs.readFile(path.resolve(__dirname, './jsonData/ylhCoupons.json'), 'utf8', function(err, data){
// 		if(err){
// 	        return console.error(err);
// 		}
// 		data = JSON.parse(data);
// 		var ticketList = data;
// 		for(var i = 0; i < 1000; i++){
// 			var ticketItem = {};
// 			ticketItem.password = randomPassword();
// 			ticketList.push(ticketItem);
// 		}
		
// 		var jsonData = ticketList;
		
// 		fs.writeFile(path.resolve(__dirname, './jsonData/ylhCoupons.json'), JSON.stringify(jsonData),function(err){
// 			if(err){
// 				console.error(err);
// 				res.send({
// 					"code": "fail",
// 					"message": "异常错误，核销失败"
// 				});
// 				return;
// 			}
// 			res.send({
// 				msg: '添加成功',
// 				code: 'success'
// 			});
// 		})
// 	})
// })

// 核销优惠券码
router.get('/checkCoupons', async function(req, res){
	let coupons = req.query.coupons;
	if(!coupons){
		res.send({
			"code": "fail",
			"message": "优惠券码不能为空"
		});
	}
	fs.readFile(path.resolve(__dirname, './jsonData/ylhUsedCoupons.json'), 'utf8', function(err, data){
		if(err){
		    return console.error(err);
		}
		data = JSON.parse(data);
		let ylhUsedCoupons = data;
		let useState = 0;
		ylhUsedCoupons.forEach(function(value, key){
			if(value.password == coupons){
				useState = 1;
			}
		})
		if(useState == 1){
			res.send({
				msg: '领取失败，该优惠券码已经使用',
				code: 'fail',
				data: {
					"coupons": coupons
				}
			});
		}else{
			fs.readFile(path.resolve(__dirname, './jsonData/ylhCoupons.json'), 'utf8', function(err, data){
				if(err){
			        return console.error(err);
				}
				data = JSON.parse(data);
				var couponsList = data;
				var hasState = 0;
				couponsList.forEach(function(value, key){
					if(value.password == coupons){
						hasState = 1;
					}
				})
				if(hasState == 1){
					var usedTicketList = data.usedTicketList;
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
					var usedItem = {
						time: nowTime,
						password: coupons
					};
					
					ylhUsedCoupons.push(usedItem);
					var usedJsonData = ylhUsedCoupons;
					fs.writeFile(path.resolve(__dirname, './jsonData/ylhUsedCoupons.json'), JSON.stringify(usedJsonData),function(err){
						if(err){
							console.error(err);
							res.send({
								"code": "fail",
								"message": "异常错误，领取失败，请联系管理员"
							});
							return;
						}
						res.send({
							msg: '核销成功',
							code: 'success',
							data: {
								"coupons": coupons
							}
						});
					})
				}else{
					res.send({
						msg: '领取失败，优惠券码无效',
						code: 'fail',
						data: {
							"coupons": coupons
						}
					});
				}
			});
		}
	})
})

// 获取已使用优惠券码
router.get('/getUsedCoupons', async function(req, res){
	fs.readFile(path.resolve(__dirname, './jsonData/ylhUsedCoupons.json'), 'utf8', function(err, data){
		if(err){
		    return console.error(err);
		}
		data = JSON.parse(data);
		let ylhUsedCoupons = data;
		res.send({
			msg: '查询成功',
			code: 'success',
			data: ylhUsedCoupons
		});
	})
})

function randomPassword(){
    var str = "",
        range = 10,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
 
    // 随机产生
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
	return str;
}

module.exports = router;