var express=require('express');
var router = express.Router();
const axios = require('axios');

router.get('/getCheckInfo', async function(req, res1){
	var nowYear = new Date().getFullYear();
	var nowMonth = new Date().getMonth() + 1;
	nowMonth = nowMonth > 9 ? nowMonth : '0' + nowMonth;
	var nowDay = new Date().getDate();
	nowDay = nowDay > 9 ? nowDay : '0' + nowDay;
	var nowHour = new Date().getHours();
	nowHour = nowHour > 9 ? nowHour : '0' + nowHour;
	var nowMinutes = new Date().getMinutes();
	nowMinutes = nowMinutes > 9 ? nowMinutes : '0' + nowMinutes;
	var nowSeconds = new Date().getSeconds();
	nowSeconds = nowSeconds > 9 ? nowSeconds : '0' + nowSeconds;
	var currDate = nowYear + '-' + nowMonth + '-' + nowDay;
	var startDate = encodeURI(nowYear + '-' + nowMonth + '-' + nowDay + ' 00:00:00');
	var endDate = encodeURI(nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds);
	
	var sDate = nowYear + '-' + nowMonth + '-' + nowDay;
	var searchSdate = encodeURI(sDate);
	var endDate = new Date(new Date(sDate + ' 00:00:00').getTime() + (1000*60*60*24*7));
	var eYear = endDate.getFullYear();
	var eMonth = endDate.getMonth() + 1;
	eMonth = eMonth>9?eMonth:'0'+eMonth;
	var eDay = endDate.getDate();
	eDay = eDay>9?eDay:'0'+eDay;
	var eDate = eYear + '-' + eMonth + '-' + eDay;
	var searchEdate = encodeURI(eDate);
	let swList = '2c9141f484a761f601850586ba2f40c8,2c9141f48537e5be0185385591d401ef,2c9141f48537e5be01853857011c01f3,2c9141f48537e5be01853856641101f1,2c9141f484a761f601850584332640c0,2c9141f484a761f601850585dd9840c5,2c9141f484a761f6018505851eed40c3';
	let zwList = '2c9141f48537e5be01854d8b87b41deb,2c9141f48537e5be01854d8003271d97,2c9141f48537e5be01854d7477b01d6c,2c9141f48537e5be01854d79f1ee1d7d,2c9141f48537e5be01854d827bdc1da8,2c9141f48537e5be01854d8927a51dde,2c9141f48537e5be01854d86c7bb1dc6';
	let xwList = '2c9141f48537e5be01854d8c38431df2,2c9141f48537e5be01854d80c9f41d99,2c9141f48537e5be01854d772c111d73,2c9141f48537e5be01854d7b4fed1d81,2c9141f48537e5be01854d8417051db5,2c9141f48537e5be01854d89ce411de0,2c9141f48537e5be01854d87b81d1dd3';
	let timeList = [];
	let dataList = [];
	let dataList1 = [];
	let dataList2 = [];
	axios.get('http://boss.smart-ideas.com.cn/ticketApi/robotCollection/appoint/get?enterpriseCode=TgsEpcBxyyz&ticketGroupNum=TGN20221212130359909' + '&ticketInfoId=' + swList + '&startTime='+ searchSdate +'&endTime='+ searchEdate)
		.then(function(res){
			res.data.data.forEach(function(value, key){
				timeList.push(value.appointDate);
				dataList.push(parseInt(value.appointQuantity));
			})
			axios.get('http://boss.smart-ideas.com.cn/ticketApi/robotCollection/appoint/get?enterpriseCode=TgsEpcBxyyz&ticketGroupNum=TGN20221212130359909' + '&ticketInfoId=' + zwList + '&startTime='+ searchSdate +'&endTime='+ searchEdate)
				.then(function(res){
					res.data.data.forEach(function(value, key){
						dataList1.push(parseInt(value.appointQuantity));
					})
					axios.get('http://boss.smart-ideas.com.cn/ticketApi/robotCollection/appoint/get?enterpriseCode=TgsEpcBxyyz&ticketGroupNum=TGN20221212130359909' + '&ticketInfoId=' + xwList + '&startTime='+ searchSdate +'&endTime='+ searchEdate)
						.then(function(res){
							res.data.data.forEach(function(value, key){
								dataList2.push(parseInt(value.appointQuantity));
							})
							
							res1.send({
								timeList: timeList,
								dataList: dataList,
								dataList1: dataList1,
								dataList2: dataList2
							})
						})
						.catch(function(err){
							
						})
				})
				.catch(function(err){
					
				})
		})
		.catch(function(err){
			
		})
})


module.exports = router;