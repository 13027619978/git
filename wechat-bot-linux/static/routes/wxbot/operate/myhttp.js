var request = require('request')

var getUrl='https://test.joybike.com.cn/ccsmart/bikeOrder/web/getOtherByBikeSn'
var getData={bikeSn:710000266}

function genGetUrl(url,data){
	var urlTmp = url
	if(data){
		var jsonLen = 0
		for(var key in data){  
			if(jsonLen == 0){
				urlTmp = urlTmp+'?'+key+'='+data[key]
			}
			else{
				urlTmp = urlTmp+'&'+key+'='+data[key]
			}
			jsonLen++
    	}
	}
	return urlTmp	
}
function httpGet(url){
	var promise =new Promise(function (resolve, rejecte) {
		request.get(url, function optionalCallback(error, response, body) {
		    if (!error && response.statusCode == 200) {
		        resolve(body)
		    }else{
		    	//console.log(response.statusCode)
		    	//console.log('http get error')
		    	//console.log(error)
		    	resolve()
		    }
	    })  
    }) 
    return promise
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

function httpGoEasy(channel,content){
	var formPublish = {
			appkey : 'BC-a7e2fd085cfb457888e772e4c9fe100e',
			channel : channel,
			content : content
		}
	console.log(formPublish)
	var promise =new Promise(function (resolve, rejecte) {	
		request.post('http://rest-hangzhou.goeasy.io/publish', {form:formPublish},function(error, response, body){
	        if (!error && response.statusCode == 200) {
	            console.log(body) // 请求成功的处理逻辑
	            resolve(body)
	        }else{
	        	console.log('post error') 
	        	console.log(response.statusCode) 
	        	resolve()
	        }
		})
	})
	return promise
}

function myHttpGet(url,data){
	return httpGet(genGetUrl(url,data))
}

function myHttpPost(url,data){
	return httpPost(url,data)
}

function myHttpGoEasy(channel,content){
	return httpGoEasy(channel,content)
}

console.log('myhttp.js已准备好')
module.exports.myHttpGet =  myHttpGet
module.exports.myHttpPost =  myHttpPost
module.exports.myHttpGoEasy =  myHttpGoEasy