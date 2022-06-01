var request = require('request');

function httpGet(url){
	var promise =new Promise(function (resolve, rejecte) {
		request.get(url, function optionalCallback(error, response, body) {
		    if (!error && response.statusCode == 200) {
		        resolve(body);
		    }else{
		    	//console.log(response.statusCode)
		    	//console.log('http get error')
		    	//console.log(error)
		    	resolve();
		    }
	    });  
    }); 
    return promise;
}

var postUrl='http://test.joybike.com.cn/ccsmart/refundOrder/app/refund'
var postData={phone:13261566163}

function httpPost(url,data){
	var promise =new Promise(function (resolve, rejecte) {
	    request({
	        url: url,
	        method: "POST",
	        json: true,
	        headers: {
	            "content-type": "application/json",
	        },
	        body: data
	    }, function(error, response, body) {
	        if (!error && response.statusCode == 200) {
	            //console.log(body) // 请求成功的处理逻辑
	            resolve(body)
	        }else{
	        	//console.log('post error') 
	        	//console.log(response.statusCode) 
	        	resolve()
	        }
	    })
    }) 
    return promise
}


function myHttpGet(url){
	return httpGet(url);
}

function myHttpPost(url,data){
	return httpPost(url,data);
}

module.exports.myHttpGet =  myHttpGet;
module.exports.myHttpPost =  myHttpPost;
