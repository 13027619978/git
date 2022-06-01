var express = require('express');
var myhttp = require('../../../myUtils/myhttp.js');
var mydate = require('../../../myUtils/mydate.js');
var settings = require('../../../config/settings.js');
var router = express.Router();

const weatherPicObj = {
		"晴": "b0.png", "多云": "b1.png",
		"少云": "b1.png", "晴间多云": "b1.png",
		"阴": "b2.png","小雨": "b7.png",
		"中雨": "b8.png","大雨": "b9.png",
		"暴雨": "b10.png","雷阵雨": "b4.png",
		"阵雨": "b3.png","其他":"b2.png",
		"雨夹雪": "b6.png","小雪": "b11.png",
		"大雪": "b11.png", "暴雪": "b11.png",
		"中雪": "b11.png"
};

function WeatherInfo() {
    this.date;
    this.picUrl;
    this.weather;
    this.temperature;
};

function getWeatherInfoPicUrl(dayweather){
	var picUrl;
	if(dayweather != null && dayweather != ''){
		// picUrl = settings.weatherConfig.weatherPicUrl + weatherPicObj[dayweather];
		if(dayweather != '晴' && dayweather != '少云' && dayweather != '阴' && dayweather != '中雨' && dayweather != '暴雨' && dayweather != '阵雨' && dayweather != '多云' && dayweather != '晴间多云' && dayweather != '小雨' && dayweather != '大雨' && dayweather != '雷阵雨' && dayweather != '小雪' && dayweather != '中雪' && dayweather != '大雪' && dayweather != '暴雪' && dayweather != '雨夹雪'){
			picUrl = 'http://smart-ideas.com.cn/ico2/' + weatherPicObj['其他'];
		}else{
			picUrl = 'http://smart-ideas.com.cn/ico2/' + weatherPicObj[dayweather];
		}
	}else{
		picUrl = '';
	}
	return picUrl;
}

function getDataVWeatherJson(jsonBody){
	console.log(jsonBody);
	var weatherInfos = new Array();
	for (var i = 0; i < 4; i++) {
		var weatherInfo = new WeatherInfo();  	
  		weatherInfo.date = (i === 0) ? "今日" : new Date(jsonBody.forecasts[0].casts[i].date.replace(/-/,"/")).Format('MM月dd日');
  		weatherInfo.picUrl = getWeatherInfoPicUrl(jsonBody.forecasts[0].casts[i].dayweather);
  		weatherInfo.weather = jsonBody.forecasts[0].casts[i].dayweather;
  		weatherInfo.temperature = jsonBody.forecasts[0].casts[i].nighttemp + '~'+ jsonBody.forecasts[0].casts[i].daytemp + '℃';
		weatherInfo.wind = jsonBody.forecasts[0].casts[i].daywind;
		weatherInfo.windpower = jsonBody.forecasts[0].casts[i].daypower;
		weatherInfos[i] = weatherInfo;
	}
	return weatherInfos;
}


router.get('/v1/weatherInfo', async function(req, res, next) {
  if(req.query.city != null && req.query.city != ''){
  	var body =  await myhttp.myHttpGet(settings.weatherConfig.gaodeWeatherUrl+req.query.city);
	// console.log(settings.weatherConfig.gaodeWeatherUrl);
  	var dataVWeatherJson = getDataVWeatherJson(JSON.parse(body));
  	res.send(dataVWeatherJson);
  }else{
  	console.log('err');
  	res.send('err');
  }
});

module.exports = router;