var express = require('express');
var request = require('request');
var connection = require('../myUtils/mysql.js');
var myhttp = require('../myUtils/myhttp.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

	var  sql = "SELECT * FROM user where id = 1";
	var status = 0;
	console.log("start time " + new Date().Format("yyyy-MM-dd HH:mm:ss:ll"));
	for (var i = 0; i < 100; i++) {
		console.log("---"+i+" time "+new Date().Format("yyyy-MM-dd HH:mm:ss:ll"));
		connection.query(sql,function (err, result) {
	    	if(err){
	          	console.log('[SELECT ERROR] - ',err.message);
	          	res.send('respond with a resource error');
	        }else{
	        	//console.log(new Date().Format("yyyy-MM-dd HH:mm:ss:ll"));
	        	//res.send(result);
	        	status ++;
	        	console.log("***"+" time "+new Date().Format("yyyy-MM-dd HH:mm:ss:ll"));
	        }
		});			
	}
	var my = setInterval(function(){
		if(status == 100){
			console.log("end time " + new Date().Format("yyyy-MM-dd HH:mm:ss:ll"));
			clearInterval(my);
			res.send("ok");
		}
	}, 10);
  	
});

router.get('/add', function(req, res, next) {

	var  sql = "insert into user (id,name) values ('3','wangyang1') ON DUPLICATE KEY UPDATE name = 'wangyang1'";
	connection.query(sql,function (err, result) {
    	if(err){
          	console.log('[SELECT ERROR] - ',err.message);
          	res.send('respond with a resource error');
        }else{
        	console.log(result);
        	res.send('respond with a resource ok');
        }
	});	
  	
});

router.get('/http', function(req, res, next) {

	var  url = "http://restapi.amap.com/v3/weather/weatherInfo?key=773c4e4c196eb78e21f220e7e14160d2&extensions=all&city=110106";
	var status = 0;
	console.log("start time " + new Date().Format("yyyy-MM-dd HH:mm:ss:ll"));
/*	var array = [1,2,3,4,5,6,7,8,9,10];
	array.forEach(function(item,index){
		var num = item;
		console.log("---"+num+" time "+new Date().Format("yyyy-MM-dd HH:mm:ss:ll"));
		request.get(url, function optionalCallback(error, response, body) {
		    if (!error && response.statusCode == 200) {
		        status++;
		        console.log("http ok " + num);
		    }else{
		    	res.send('respond with a resource error');
		    }
	    });  		
	});*/
	for (var i = 0; i < 10; i++) {
		console.log("---"+i+" time "+new Date().Format("yyyy-MM-dd HH:mm:ss:ll"));
		(function(i){
			request.get(url, function optionalCallback(error, response, body) {
			    if (!error && response.statusCode == 200) {
			        status++;
			        console.log("http ok " + i);
			    }else{
			    	res.send('respond with a resource error');
			    }
		    }); 
		})(i);
		
	}

	var my = setInterval(function(){
		if(status == 10){
			console.log("end time " + new Date().Format("yyyy-MM-dd HH:mm:ss:ll"));
			clearInterval(my);
			res.send("ok");
		}
	}, 10);
  	
});

router.get('/httpa', async function(req, res, next) {

	var  url = "http://restapi.amap.com/v3/weather/weatherInfo?key=773c4e4c196eb78e21f220e7e14160d2&extensions=all&city=110106";
	console.log("start time " + new Date().Format("yyyy-MM-dd HH:mm:ss:ll"));
	for (var i = 0; i < 100; i++) {
		console.log("---"+i+" time "+new Date().Format("yyyy-MM-dd HH:mm:ss:ll"));
		var body =  await myhttp.myHttpGet(url);
		console.log("***"+i+" time "+new Date().Format("yyyy-MM-dd HH:mm:ss:ll"));	
	}
	console.log("end time " + new Date().Format("yyyy-MM-dd HH:mm:ss:ll"));
  	res.send("ok");
});

module.exports = router;
