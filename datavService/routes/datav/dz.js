var express=require('express');
var router = express.Router();
var http = require('http');
var https = require('https');
var querystring = require('querystring');
var util = require('util');


router.get('/getWarningInfo',function(req1,res1){
	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var startTime = nowYear + '-' + nowMonth + '-' + nowDay + ' 00:00:00';
	var endTime = nowYear + '-' + nowMonth + '-' + nowDay + ' 23:59:59';
	startTime = encodeURI(startTime);
	endTime = encodeURI(endTime);
	const options = {
		hostname: 'gm1.smartcores.cn',
		path: '/gm1/v1/MeasuredValues?appId=appTestId&appKey=appKey123456&sn=00741234&startTime='+startTime+'&endTime=' + endTime,
		method: 'GET'
	};
	
	var buffers = [];
	var nread = 0;
	const req = https.request(options, (res) => {
		res.on('data', (d) => {
			buffers.push(d);
			nread += d.length;
		});
		
		res.on('end', () => {
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
			var res = JSON.parse(buffer.toString());
			res1.send(res);
		})
	});
	req.end();
});

router.get('/getLocation',function(req1,res1){
    const options = {
    	hostname: 'gm1test.smartcores.cn',
    	path: '/gm1/v1/InstallLocation?appId=appTestId&appKey=appKey123456&sn=00741234',
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
			var res = JSON.parse(buffer.toString());
			res1.send(res);
		})
    });
    req.end();
});

router.get('/measuredValues', function(req1, res1){
	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var nowHour = nowDate.getHours();
	nowHour = nowHour>9?nowHour:'0'+nowHour;
	var nowMinutes = nowDate.getMinutes();
	nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
	var nowSeconds = nowDate.getSeconds();
	nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
	var startTime = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	startTime = encodeURI(startTime);
	var endDate = new Date(new Date().getTime() - (60 * 20 * 1000));
	var endYear = endDate.getFullYear();
	var endMonth = endDate.getMonth() + 1;
	endMonth = endMonth>9?endMonth:'0'+endMonth;
	var endDay = endDate.getDate();
	endDay = endDay>9?endDay:'0'+endDay;
	var endHour = endDate.getHours();
	endHour = endHour>9?endHour:'0'+endHour;
	var endMinutes = endDate.getMinutes();
	endMinutes = endMinutes>9?endMinutes:'0'+endMinutes;
	var endSeconds = endDate.getSeconds();
	endSeconds = endSeconds>9?endSeconds:'0'+endSeconds;
	var endTime = endYear + '-' + endMonth + '-' + endDay + ' ' + endHour + ':' + endMinutes + ':' + endSeconds;
	endTime = encodeURI(endTime);
	console.log(startTime);
	console.log(endTime);
	const options = {
		hostname: 'gm1.smartcores.cn',
		path: '/gm1/v1/MeasuredValues?appId=appTestId&appKey=appKey123456&sn=00741234&startTime='+endTime+'&endTime=' + startTime,
		method: 'GET'
	};
	
	var buffers = [];
	var nread = 0;
	const req = https.request(options, (res) => {
		res.on('data', (d) => {
			buffers.push(d);
			nread += d.length;
		});
		
		res.on('end', () => {
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
			var res = JSON.parse(buffer.toString());
			var dataList = res.data;
			if(dataList){
				dataList.forEach(function(value, key){
					var nowDate = new Date(value.time*1000);
					var nowYear = nowDate.getFullYear();
					var nowMonth = nowDate.getMonth() + 1;
					nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
					var nowDay = nowDate.getDate();
					nowDay = nowDay>9?nowDay:'0'+nowDay;
					var nowHour = nowDate.getHours();
					nowHour = nowHour>9?nowHour:'0'+nowHour;
					var nowMinutes = nowDate.getMinutes();
					nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
					var nowSeconds = nowDate.getSeconds();
					nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
					var startTime = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
					dataList[key].time = startTime;
				})
				res.data = dataList;
				res1.send(res);
			}else{
				res1.send([]);
			}
		})
	});
	req.end();
})

router.get('/measuredValues1', function(req1, res1){
	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var nowHour = nowDate.getHours();
	nowHour = nowHour>9?nowHour:'0'+nowHour;
	var nowMinutes = nowDate.getMinutes();
	nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
	var nowSeconds = nowDate.getSeconds();
	nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
	var startTime = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	startTime = encodeURI(startTime);
	var endDate = new Date(new Date().getTime() - (60 * 60 * 24 * 1000));
	var endYear = endDate.getFullYear();
	var endMonth = endDate.getMonth() + 1;
	endMonth = endMonth>9?endMonth:'0'+endMonth;
	var endDay = endDate.getDate();
	endDay = endDay>9?endDay:'0'+endDay;
	var endHour = endDate.getHours();
	endHour = endHour>9?endHour:'0'+endHour;
	var endMinutes = endDate.getMinutes();
	endMinutes = endMinutes>9?endMinutes:'0'+endMinutes;
	var endSeconds = endDate.getSeconds();
	endSeconds = endSeconds>9?endSeconds:'0'+endSeconds;
	var endTime = endYear + '-' + endMonth + '-' + endDay + ' ' + endHour + ':' + endMinutes + ':' + endSeconds;
	endTime = encodeURI(endTime);
	console.log(startTime);
	console.log(endTime);
	const options = {
		hostname: 'gm1.smartcores.cn',
		path: '/gm1/v1/MeasuredValues?appId=appTestId&appKey=appKey123456&sn=05733333&startTime='+endTime+'&endTime=' + startTime,
		method: 'GET'
	};
	
	var buffers = [];
	var nread = 0;
	const req = https.request(options, (res) => {
		res.on('data', (d) => {
			buffers.push(d);
			nread += d.length;
		});
		
		res.on('end', () => {
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
			var res = JSON.parse(buffer.toString());
			var dataList = res.data;
			if(dataList){
				dataList.forEach(function(value, key){
					var nowDate = new Date(value.time*1000);
					var nowYear = nowDate.getFullYear();
					var nowMonth = nowDate.getMonth() + 1;
					nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
					var nowDay = nowDate.getDate();
					nowDay = nowDay>9?nowDay:'0'+nowDay;
					var nowHour = nowDate.getHours();
					nowHour = nowHour>9?nowHour:'0'+nowHour;
					var nowMinutes = nowDate.getMinutes();
					nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
					var nowSeconds = nowDate.getSeconds();
					nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
					var startTime = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
					dataList[key].time = startTime;
				})
			}
			
			res.data = dataList;
			res1.send(res);
		})
	});
	req.end();
})

module.exports = router;