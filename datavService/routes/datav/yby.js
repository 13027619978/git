var express=require('express');
var myhttp = require('../../myUtils/myhttp.js');
var settings = require('../../config/settings.js');
var myCache = require('../../myUtils/mycache.js').cache;
var router = express.Router();
var https = require('https');
var http = require('http');
const fs = require('fs');
let path = require('path');
const host = 'iot.smart-ideas.com.cn';
const bossHost = 'boss.smart-ideas.com.cn';

//Object.keys(map).length 获取map长度 
function getDateStartTime(data){
	return new Date(new Date(data.toLocaleDateString()).getTime());
}

function getDateEndTime(data){
	return new Date(new Date(data.toLocaleDateString()).getTime()+24*60*60*1000-1);
}


//判断当日是否是某天 时间格式'2019-10-01'
function isTodayDate(time){
	var t = new Date().Format("yyyy-MM-dd");
	return t === time;
}

const visitorComeFrom1 = [
	{"name": "河北省","lat": 38.045474,"lng": 114.502461,"value": 983,"from": "114.502461,38.045474","to": "116.407387,39.904179"},
	{"name": "河南省","lat": 34.757975,"lng": 113.665412,"value": 322,"from": "113.665412,34.757975","to": "116.407387,39.904179"},
	{"name": "山东省","lat": 36.671199,"lng": 117.019973,"value": 236,"from": "117.019973,36.671199","to": "116.407387,39.904179"},
	{"name": "天津市","lat": 39.085294,"lng": 117.201538,"value": 208,"from": "117.201538,39.085294","to": "116.407387,39.904179"},
	{"name": "黑龙江省","lat": 45.756967,"lng": 126.642464,"value": 172,"from": "126.642464,45.756967","to": "116.407387,39.904179"},
	{"name": "山西省","lat": 37.857014,"lng": 112.549248,"value": 159,"from": "112.549248,37.857014","to": "116.407387,39.904179"},
	{"name": "辽宁省","lat": 41.677287,"lng": 123.465009,"value": 135,"from": "123.465009,41.677287","to": "116.407387,39.904179"},
	{"name": "湖北省","lat": 30.584355,"lng": 114.298572,"value": 107,"from": "114.298572,30.584355","to": "116.407387,39.904179"},
	{"name": "安徽省","lat": 31.86119,"lng": 117.283042,"value": 104,"from": "117.283042,31.86119","to": "116.407387,39.904179"},
	{"name": "内蒙古自治区","lat": 40.818311,"lng": 111.670801,"value": 90,"from": "111.670801,40.818311","to": "116.407387,39.904179"},
	{"name": "吉林省","lat": 43.817001,"lng": 125.323628,"value": 75,"from": "125.323628,43.817001","to": "116.407387,39.904179"},
	{"name": "四川省","lat": 30.659462,"lng": 104.065735,"value": 71,"from": "104.065735,30.659462","to": "116.407387,39.904179"},
	{"name": "陕西省","lat": 34.263161,"lng": 108.948024,"value": 66,"from": "108.948024,34.263161","to": "116.407387,39.904179"},
	{"name": "江西省","lat": 28.676493,"lng": 115.892151,"value": 65,"from": "115.892151,28.676493","to": "116.407387,39.904179"},
	{"name": "江苏省","lat": 32.041544,"lng": 118.767413,"value": 53,"from": "118.767413,32.041544","to": "116.407387,39.904179"},
	{"name": "湖南省","lat": 28.19409,"lng": 112.982279,"value": 52,"from": "112.982279,28.19409","to": "116.407387,39.904179"},
	{"name": "甘肃省","lat": 39.891345,"lng": 116.445294,"value": 44,"from": "116.445294,39.891345","to": "116.407387,39.904179"},
	{"name": "广东省","lat": 23.125178,"lng": 113.280637,"value": 35,"from": "113.280637,23.125178","to": "116.407387,39.904179"},
	{"name": "重庆市","lat": 29.563761,"lng": 106.550464,"value": 27,"from": "106.550464,29.563761","to": "116.407387,39.904179"},
	{"name": "福建省","lat": 26.075302,"lng": 119.306239,"value": 25,"from": "119.306239,26.075302","to": "116.407387,39.904179"},
	{"name": "贵州省","lat": 26.578343,"lng": 106.713478,"value": 24,"from": "106.713478,26.578343","to": "116.407387,39.904179"},
	{"name": "云南省","lat": 25.040609,"lng": 102.712251,"value": 21,"from": "102.712251,25.040609","to": "116.407387,39.904179"},
	{"name": "上海市","lat": 31.230378,"lng": 121.473658,"value": 16,"from": "121.473658,31.230378","to": "116.407387,39.904179"},
	{"name": "浙江省","lat": 30.287459,"lng": 120.153576,"value": 14,"from": "120.153576,30.287459","to": "116.407387,39.904179"},
	{"name": "广西壮族自治区","lat": 22.82402,"lng": 108.320004,"value": 14,"from": "108.320004,22.82402","to": "116.407387,39.904179"},
	{"name": "宁夏回族自治区","lat": 38.46637,"lng": 106.278179,"value": 14,"from": "106.278179,38.46637","to": "116.407387,39.904179"},
	{"name": "新疆维吾尔自治区","lat": 43.792818,"lng": 87.617733,"value": 14,"from": "87.617733,43.792818","to": "116.407387,39.904179"},
	{"name": "青海省","lat": 36.623178,"lng": 101.778916,"value": 10,"from": "101.778916,36.623178","to": "116.407387,39.904179"},
	{"name": "海南省","lat": 20.031971,"lng": 110.33119,"value": 5,"from": "110.33119,20.031971","to": "116.407387,39.904179"}
];

const visitorComeFrom2 = [
	{"name": "河北省","lat": 38.045474,"lng": 114.502461,"value": 902,"from": "114.502461,38.045474","to": "116.407387,39.904179"},
	{"name": "河南省","lat": 34.757975,"lng": 113.665412,"value": 293,"from": "113.665412,34.757975","to": "116.407387,39.904179"},
	{"name": "山东省","lat": 36.671199,"lng": 117.019973,"value": 225,"from": "117.019973,36.671199","to": "116.407387,39.904179"},
	{"name": "天津市","lat": 39.085294,"lng": 117.201538,"value": 172,"from": "117.201538,39.085294","to": "116.407387,39.904179"},
	{"name": "山西省","lat": 37.857014,"lng": 112.549248,"value": 162,"from": "112.549248,37.857014","to": "116.407387,39.904179"},
	{"name": "黑龙江省","lat": 45.756967,"lng": 126.642464,"value": 156,"from": "126.642464,45.756967","to": "116.407387,39.904179"},
	{"name": "辽宁省","lat": 41.677287,"lng": 123.465009,"value": 144,"from": "123.465009,41.677287","to": "116.407387,39.904179"},
	{"name": "四川省","lat": 30.659462,"lng": 104.065735,"value": 86,"from": "104.065735,30.659462","to": "116.407387,39.904179"},
	{"name": "安徽省","lat": 31.86119,"lng": 117.283042,"value": 84,"from": "117.283042,31.86119","to": "116.407387,39.904179"},
	{"name": "湖北省","lat": 30.584355,"lng": 114.298572,"value": 82,"from": "114.298572,30.584355","to": "116.407387,39.904179"},
	{"name": "内蒙古自治区","lat": 40.818311,"lng": 111.670801,"value": 81,"from": "111.670801,40.818311","to": "116.407387,39.904179"},
	{"name": "陕西省","lat": 34.263161,"lng": 108.948024,"value": 72,"from": "108.948024,34.263161","to": "116.407387,39.904179"},
	{"name": "吉林省","lat": 43.817001,"lng": 125.323628,"value": 67,"from": "125.323628,43.817001","to": "116.407387,39.904179"},
	{"name": "江苏省","lat": 32.041544,"lng": 118.767413,"value": 64,"from": "118.767413,32.041544","to": "116.407387,39.904179"},
	{"name": "湖南省","lat": 28.19409,"lng": 112.982279,"value": 59,"from": "112.982279,28.19409","to": "116.407387,39.904179"},
	{"name": "江西省","lat": 28.676493,"lng": 115.892151,"value": 40,"from": "115.892151,28.676493","to": "116.407387,39.904179"},
	{"name": "甘肃省","lat": 39.891345,"lng": 116.445294,"value": 39,"from": "116.445294,39.891345","to": "116.407387,39.904179"},
	{"name": "浙江省","lat": 30.287459,"lng": 120.153576,"value": 36,"from": "120.153576,30.287459","to": "116.407387,39.904179"},
	{"name": "重庆市","lat": 29.563761,"lng": 106.550464,"value": 34,"from": "106.550464,29.563761","to": "116.407387,39.904179"},
	{"name": "广东省","lat": 23.125178,"lng": 113.280637,"value": 31,"from": "113.280637,23.125178","to": "116.407387,39.904179"},
	{"name": "福建省","lat": 26.075302,"lng": 119.306239,"value": 29,"from": "119.306239,26.075302","to": "116.407387,39.904179"},
	{"name": "上海市","lat": 31.230378,"lng": 121.473658,"value": 18,"from": "121.473658,31.230378","to": "116.407387,39.904179"},
	{"name": "广西壮族自治区","lat": 22.82402,"lng": 108.320004,"value": 11,"from": "108.320004,22.82402","to": "116.407387,39.904179"},
	{"name": "青海省","lat": 36.623178,"lng": 101.778916,"value": 11,"from": "101.778916,36.623178","to": "116.407387,39.904179"},
	{"name": "贵州省","lat": 26.578343,"lng": 106.713478,"value": 5,"from": "106.713478,26.578343","to": "116.407387,39.904179"},
	{"name": "海南省","lat": 20.031971,"lng": 110.33119,"value": 5,"from": "110.33119,20.031971","to": "116.407387,39.904179"},
	{"name": "云南省","lat": 25.040609,"lng": 102.712251,"value": 4,"from": "102.712251,25.040609","to": "116.407387,39.904179"},
	{"name": "宁夏回族自治区","lat": 38.46637,"lng": 106.278179,"value": 3,"from": "106.278179,38.46637","to": "116.407387,39.904179"},
	{"name": "西藏自治区","lat": 29.660361,"lng": 91.132212,"value": 1,"from": "91.132212,29.660361","to": "116.407387,39.904179"}
];

const visitorComeFrom = [
	{"name": "河北省","lat": 38.045474,"lng": 114.502461,"value": 1885,"from": "114.502461,38.045474","to": "116.407387,39.904179"},
	{"name": "河南省","lat": 34.757975,"lng": 113.665412,"value": 615,"from": "113.665412,34.757975","to": "116.407387,39.904179"},
	{"name": "山东省","lat": 36.671199,"lng": 117.019973,"value": 461,"from": "117.019973,36.671199","to": "116.407387,39.904179"},
	{"name": "天津市","lat": 39.085294,"lng": 117.201538,"value": 380,"from": "117.201538,39.085294","to": "116.407387,39.904179"},
	{"name": "黑龙江省","lat": 45.756967,"lng": 126.642464,"value": 328,"from": "126.642464,45.756967","to": "116.407387,39.904179"},
	{"name": "山西省","lat": 37.857014,"lng": 112.549248,"value": 321,"from": "112.549248,37.857014","to": "116.407387,39.904179"},
	{"name": "辽宁省","lat": 41.677287,"lng": 123.465009,"value": 279,"from": "123.465009,41.677287","to": "116.407387,39.904179"},
	{"name": "湖北省","lat": 30.584355,"lng": 114.298572,"value": 189,"from": "114.298572,30.584355","to": "116.407387,39.904179"},
	{"name": "安徽省","lat": 31.86119,"lng": 117.283042,"value": 188,"from": "117.283042,31.86119","to": "116.407387,39.904179"},
	{"name": "内蒙古自治区","lat": 40.818311,"lng": 111.670801,"value": 171,"from": "111.670801,40.818311","to": "116.407387,39.904179"},
	{"name": "四川省","lat": 30.659462,"lng": 104.065735,"value": 157,"from": "104.065735,30.659462","to": "116.407387,39.904179"},
	{"name": "吉林省","lat": 43.817001,"lng": 125.323628,"value": 142,"from": "125.323628,43.817001","to": "116.407387,39.904179"},
	{"name": "陕西省","lat": 34.263161,"lng": 108.948024,"value": 138,"from": "108.948024,34.263161","to": "116.407387,39.904179"},
	{"name": "江苏省","lat": 32.041544,"lng": 118.767413,"value": 117,"from": "118.767413,32.041544","to": "116.407387,39.904179"},
	{"name": "湖南省","lat": 28.19409,"lng": 112.982279,"value": 111,"from": "112.982279,28.19409","to": "116.407387,39.904179"},
	{"name": "江西省","lat": 28.676493,"lng": 115.892151,"value": 105,"from": "115.892151,28.676493","to": "116.407387,39.904179"},
	{"name": "甘肃省","lat": 39.891345,"lng": 116.445294,"value": 83,"from": "116.445294,39.891345","to": "116.407387,39.904179"},
	{"name": "广东省","lat": 23.125178,"lng": 113.280637,"value": 66,"from": "113.280637,23.125178","to": "116.407387,39.904179"},
	{"name": "重庆市","lat": 29.563761,"lng": 106.550464,"value": 61,"from": "106.550464,29.563761","to": "116.407387,39.904179"},
	{"name": "福建省","lat": 26.075302,"lng": 119.306239,"value": 54,"from": "119.306239,26.075302","to": "116.407387,39.904179"},
	{"name": "浙江省","lat": 30.287459,"lng": 120.153576,"value": 50,"from": "120.153576,30.287459","to": "116.407387,39.904179"},
	{"name": "上海市","lat": 31.230378,"lng": 121.473658,"value": 34,"from": "121.473658,31.230378","to": "116.407387,39.904179"},
	{"name": "贵州省","lat": 26.578343,"lng": 106.713478,"value": 29,"from": "106.713478,26.578343","to": "116.407387,39.904179"},
	{"name": "广西壮族自治区","lat": 22.82402,"lng": 108.320004,"value": 25,"from": "108.320004,22.82402","to": "116.407387,39.904179"},
	{"name": "云南省","lat": 25.040609,"lng": 102.712251,"value": 25,"from": "102.712251,25.040609","to": "116.407387,39.904179"},
	{"name": "青海省","lat": 36.623178,"lng": 101.778916,"value": 21,"from": "101.778916,36.623178","to": "116.407387,39.904179"},
	{"name": "宁夏回族自治区","lat": 38.46637,"lng": 106.278179,"value": 17,"from": "106.278179,38.46637","to": "116.407387,39.904179"},
	{"name": "新疆维吾尔自治区","lat": 43.792818,"lng": 87.617733,"value": 14,"from": "87.617733,43.792818","to": "116.407387,39.904179"},
	{"name": "海南省","lat": 20.031971,"lng": 110.33119,"value": 10,"from": "110.33119,20.031971","to": "116.407387,39.904179"},
	{"name": "西藏自治区","lat": 29.660361,"lng": 91.132212,"value": 1,"from": "91.132212,29.660361","to": "116.407387,39.904179"}
];

//游客来源排行
router.get('/visitor/getComeFromRanking',function(req,res){
	
	var data = visitorComeFrom;

	if(isTodayDate('2019-10-01')){
		data = visitorComeFrom1;
	}else if(isTodayDate('2019-10-02')){
		data = visitorComeFrom2;
	}
	res.send(data);
});



const visitorBeijing1 = [
	{"lng": 116.287149,"lat": 39.858427,"info": "丰台区5825人"},
	{"lng": 116.298056,"lat": 39.959912,"info": "海淀区2081人"},
	{"lng": 116.416357,"lat": 39.928353,"info": "东城区1571人"},
	{"lng": 116.443108,"lat": 39.92147,"info": "朝阳区1208人"},
	{"lng": 116.222982,"lat": 39.906611,"info": "石景山区1008人"},
	{"lng": 116.365868,"lat": 39.912289,"info": "西城区946人"},
	{"lng": 116.143267,"lat": 39.749144,"info": "房山区935人"},
	{"lng": 116.341395,"lat": 39.726929,"info": "大兴区792人"},
	{"lng": 116.102009,"lat": 39.940646,"info": "门头沟区410人"},
	{"lng": 116.231204,"lat": 40.22066,"info": "昌平区386人"},
	{"lng": 116.656435,"lat": 39.909946,"info": "通州区300人"},
	{"lng": 116.843177,"lat": 40.376834,"info": "密云区114人"},
	{"lng": 116.654561,"lat": 40.130347,"info": "顺义区82人"},
	{"lng": 115.974519,"lat": 40.457009,"info": "延庆区53人"},
	{"lng": 116.642349,"lat": 40.315704,"info": "怀柔区18人"},
	{"lng": 117.121383,"lat": 40.140701,"info": "平谷区11人"}
];
const visitorBeijing2 = [
	{"lng": 116.287149,"lat": 39.858427,"info": "丰台区5574人"},
	{"lng": 116.298056,"lat": 39.959912,"info": "海淀区2351人"},
	{"lng": 116.416357,"lat": 39.928353,"info": "东城区1735人"},
	{"lng": 116.443108,"lat": 39.92147,"info": "朝阳区1377人"},
	{"lng": 116.222982,"lat": 39.906611,"info": "石景山区1118人"},
	{"lng": 116.365868,"lat": 39.912289,"info": "西城区951人"},
	{"lng": 116.143267,"lat": 39.749144,"info": "房山区692人"},
	{"lng": 116.341395,"lat": 39.726929,"info": "大兴区605人"},
	{"lng": 116.231204,"lat": 40.22066,"info": "昌平区531人"},
	{"lng": 116.656435,"lat": 39.909946,"info": "通州区326人"},
	{"lng": 116.102009,"lat": 39.940646,"info": "门头沟区315人"},
	{"lng": 116.654561,"lat": 40.130347,"info": "顺义区93人"},
	{"lng": 116.843177,"lat": 40.376834,"info": "密云区76人"},
	{"lng": 115.974519,"lat": 40.457009,"info": "延庆区38人"},
	{"lng": 116.642349,"lat": 40.315704,"info": "怀柔区11人"},
	{"lng": 117.121383,"lat": 40.140701,"info": "平谷区9人"}
];

const visitorBeijing = [
	{"lng": 116.287149,"lat": 39.858427,"info": "丰台区11399人"},
	{"lng": 116.298056,"lat": 39.959912,"info": "海淀区4432人"},
	{"lng": 116.416357,"lat": 39.928353,"info": "东城区3306人"},
	{"lng": 116.443108,"lat": 39.92147,"info": "朝阳区2585人"},
	{"lng": 116.222982,"lat": 39.906611,"info": "石景山区2126人"},
	{"lng": 116.365868,"lat": 39.912289,"info": "西城区1897人"},
	{"lng": 116.143267,"lat": 39.749144,"info": "房山区1627人"},
	{"lng": 116.341395,"lat": 39.726929,"info": "大兴区1397人"},
	{"lng": 116.231204,"lat": 40.22066,"info": "昌平区917人"},
	{"lng": 116.102009,"lat": 39.940646,"info": "门头沟区725人"},
	{"lng": 116.656435,"lat": 39.909946,"info": "通州区626人"},
	{"lng": 116.843177,"lat": 40.376834,"info": "密云区190人"},
	{"lng": 116.654561,"lat": 40.130347,"info": "顺义区175人"},
	{"lng": 115.974519,"lat": 40.457009,"info": "延庆区91人"},
	{"lng": 116.642349,"lat": 40.315704,"info": "怀柔区29人"},
	{"lng": 117.121383,"lat": 40.140701,"info": "平谷区20人"}
];

// 获取自行车使用率
router.get('/getBikeUseInfo',function(req1,res1){
	const options = {
		hostname: 'api.joybike.com.cn',
		path: '/ccsmart/dataV/getYbyDevicePercent',
		method: 'GET'
	};
	const req = https.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			res1.send(res);
		});
	});
	req.end();
});

//游客来源排行（北京各辖区）
router.get('/visitor/getComeFromRankingBeijing',function(req,res){
	
	var data = visitorBeijing;

	if(isTodayDate('2019-10-01')){
		data = visitorBeijing1;
	}else if(isTodayDate('2019-10-02')){
		data = visitorBeijing2;
	}
	res.send(data);
});


const sexRatio1 = [{"x": "男","y": 8521},{"x": "女","y": 10457}];
const sexRatio2 = [{"x": "男","y": 8305},{"x": "女","y": 10583}];
const sexRatio = [{"x": "男","y": 16826},{"x": "女","y": 21040}];
//游客男女比例
router.get('/visitor/getSexRatio',function(req,res){
	
	var data = sexRatio;

	if(isTodayDate('2019-10-01')){
		data = sexRatio1;
	}else if(isTodayDate('2019-10-02')){
		data = sexRatio2;
	}
	res.send(data);
});
const ageRatio1 = [{"type": "20岁以下","value": 2758},{"type": "20岁-30岁","value": 2329},
		{"type": "30岁-40岁","value": 5048},{"type": "40岁-50岁","value": 3387},
		{"type": "50岁-60岁","value": 2941},{"type": "60岁-70岁","value": 1967},
		{"type": "70岁以上","value": 548}];
const ageRatio2 = [{"type": "20岁以下","value": 2697},{"type": "20岁-30岁","value": 2111},
		{"type": "30岁-40岁","value": 4937},{"type": "40岁-50岁","value": 3268},
		{"type": "50岁-60岁","value": 3275},{"type": "60岁-70岁","value": 1994},
		{"type": "70岁以上","value": 606}];
const ageRatio = [{"type": "20岁以下","value": 5455},{"type": "20岁-30岁","value": 4440},
		{"type": "30岁-40岁","value": 9985},{"type": "40岁-50岁","value": 6655},
		{"type": "50岁-60岁","value": 6216},{"type": "60岁-70岁","value": 3961},
		{"type": "70岁以上","value": 1154}];		
//游客年龄比例
router.get('/visitor/getAgeRatio',function(req,res){
	
	var data = ageRatio;

	if(isTodayDate('2019-10-01')){
		data = ageRatio1;
	}else if(isTodayDate('2019-10-02')){
		data = ageRatio2;
	}
	res.send(data);
});

//当日门票收入汇总 qr和pos
router.get('/sales/tickets/getIncomeToday',async function(req,res){

	var data = {};
	var cache=myCache.getCache(settings.ybyApiConfig.getTicketsIncomeTodayCacheKey);
	if(cache){
		data = cache;
	}else{
		var url = settings.ybyApiConfig.getTicketsIncomeTodayUrl 
		+ '&startDate='+getDateStartTime(new Date()).Format("yyyy-MM-dd HH:mm:ss")
		+ '&endDate='+getDateEndTime(new Date()).Format("yyyy-MM-dd HH:mm:ss");

		var body =  await myhttp.myHttpGet(url);
		var jsonBody = JSON.parse(body);
		data.halfQrTickets = (jsonBody.rows.qrcodeHalfQuantity)?jsonBody.rows.qrcodeHalfQuantity*1:0;//半价票数量-二维码
		data.fullQrTickets = (jsonBody.rows.qrcodeAdultQuantity)?jsonBody.rows.qrcodeAdultQuantity*1:0;//全价票数量-二维码
		data.TotalWaterQr = (jsonBody.rows.qrcodeTotal)?jsonBody.rows.qrcodeTotal*1:0;//门票总流水-二维码
		data.TotalWaterPos = (jsonBody.rows.posTotal)?jsonBody.rows.posTotal*1:0;//POS总流水
		data.ghPosTickets = (jsonBody.rows.posGhQuantity)?jsonBody.rows.posGhQuantity*1:0;//工会票数量-POS
		data.halfPosTickets = (jsonBody.rows.posHalfQuantity)?jsonBody.rows.posHalfQuantity*1:0;//半价票数量-POS
		data.fullPosTickets = (jsonBody.rows.posAdultQuantity)?jsonBody.rows.posAdultQuantity*1:0;//全价票数量-POS
		myCache.addCache(settings.ybyApiConfig.getTicketsIncomeTodayCacheKey,data,60*1000);
	}
    res.send(data);
});

//当日电瓶车票收入汇总
router.get('/sales/cards/getIncomeToday',async function(req,res){

	var data = {};
	var cache=myCache.getCache(settings.ybyApiConfig.getCardsIncomeTodayCacheKey);
	if(cache){
		data = cache;
	}else{
		var url = settings.ybyApiConfig.getCardsIncomeTodayUrl 
		+ '&startDate='+getDateStartTime(new Date()).Format("yyyy-MM-dd HH:mm:ss")
		+ '&endDate='+getDateEndTime(new Date()).Format("yyyy-MM-dd HH:mm:ss");

		var body =  await myhttp.myHttpGet(url);
		var jsonBody = JSON.parse(body);
		var totalWaterCards = 0;
		var ziweiyuanCards = 0;
		var taiwanyuanCards = 0;
		var erhaomenCards = 0;
		jsonBody.rows.forEach(element => {
			totalWaterCards += element.tQuantity;
			if(element.hQuantity.indexOf("CardTest1") > 0){
				ziweiyuanCards = element.adultQuantity;
			}else if(element.hQuantity.indexOf("CardTest2") > 0){
				taiwanyuanCards = element.adultQuantity;
			}else if(element.hQuantity.indexOf("CardTest3") > 0){
				erhaomenCards = element.adultQuantity;
			}
		});
		data.totalWaterCards = totalWaterCards;//电瓶车票 总流水
		data.ziweiyuanCards = ziweiyuanCards;//售卡数 紫薇园
		data.taiwanyuanCards = taiwanyuanCards;//售卡数 台湾园
		data.erhaomenCards = erhaomenCards;//售卡数 二号门 
		myCache.addCache(settings.ybyApiConfig.getCardsIncomeTodayCacheKey,data,60*1000);
	}
    res.send(data);
});

//当日自行车收入汇总
router.get('/sales/bike/getIncomeToday',async function(req,res){

	var data = {};
	var cache=myCache.getCache(settings.ybyApiConfig.getBikeIncomeTodayCacheKey);
	if(cache){
		data = cache;
	}else{
		var url = settings.ybyApiConfig.getBikeIncomeTodayUrl 
		+ '&startDate='+new Date().Format("yyyy-MM-dd")
		+ '&endDate='+new Date().Format("yyyy-MM-dd");

		var body =  await myhttp.myHttpGet(url);
		var jsonBody = JSON.parse(body);
		
		data.totalWaterBike = (jsonBody.rows.totalIncome) ? jsonBody.rows.totalIncome * 1: 0;
		data.doneOrdersBike = jsonBody.rows.nodoneNumber;
		myCache.addCache(settings.ybyApiConfig.getBikeIncomeTodayCacheKey,data,60*1000);
	}
    res.send(data);
});

//当日国庆节门票收入汇总
router.get('/sales/nationalDay/getIncomeToday',async function(req,res){

	var data = {};
	var cache=myCache.getCache(settings.ybyApiConfig.getNationalDayIncomeTodayCacheKey);
	if(cache){
		data = cache;
	}else{
		var url = settings.ybyApiConfig.getNationalDayIncomeTodayUrl 
		+ '&startDate='+getDateStartTime(new Date()).Format("yyyy-MM-dd HH:mm:ss")
		+ '&endDate='+getDateEndTime(new Date()).Format("yyyy-MM-dd HH:mm:ss");

		var body =  await myhttp.myHttpGet(url);
		var jsonBody = JSON.parse(body);
		
		data.appointTickets = jsonBody.rows.appointTicketsTotal * 1;
		data.fiveDayTickets = jsonBody.rows.fiveDayTicketsTotal * 1;
		data.twoDayTickets = jsonBody.rows.twoDayTicketsTotal * 1;
		data.giveTickets = jsonBody.rows.giveTicketsTotal * 1;
		data.xiYuanTickets = jsonBody.rows.xiYuanTicketsTotal * 1;
		data.totalWater = ((jsonBody.rows.twoDayTicketsIncome) ? jsonBody.rows.twoDayTicketsIncome * 1 : 0)+
			((jsonBody.rows.fiveDayTicketsIncome) ? jsonBody.rows.twoDayTicketsIncome * 1 : 0);
		myCache.addCache(settings.ybyApiConfig.getNationalDayIncomeTodayCacheKey,data,60*1000);
	}
    res.send(data);
});

// 获取入园总数
router.get('/visitor/getInTotal', function(req, res){
	var host = 'iot.smart-ideas.com.cn';
	var nowYear = new Date().getFullYear();
	var nowMonth = new Date().getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = new Date().getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var nowHour = new Date().getHours();
	nowHour = nowHour>9?nowHour:'0'+nowHour;
	var nowMinutes = new Date().getMinutes();
	nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
	var nowSeconds = new Date().getSeconds();
	nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
	var dateString = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	var startDate = nowYear + '-' + nowMonth + '-' + nowDay + ' 00:00:00';
	startDate = encodeURI(startDate);
	var endDate = nowYear + '-' + nowMonth + '-' + nowDay + ' 23:59:59';
	endDate = encodeURI(endDate);
	const options = {
		hostname: host,
		path: '/ybypark/ticketsCollection/getPassengerFlowCollection?startDate=' + startDate + '&endDate=' + endDate,
		method: 'GET'
	};
	const req1 = https.request(options, (resp) => {
	    resp.on('data', (d) => {
			var resp = JSON.parse(d.toString());
			if(resp.code == 'SUCCESS'){
				var peopleInfo = resp.data;
				var total = peopleInfo.total;
				total = total?total:'0';
				
				var inNumber = peopleInfo.inNumber;
				inNumber = inNumber?inNumber:'0';
				
				var fullTotal = peopleInfo.fullTotal;
				fullTotal = fullTotal?fullTotal:'0';
				
				var halfTotal = peopleInfo.halfTotal;
				halfTotal = halfTotal?halfTotal:'0';
				
				var yearTotal = peopleInfo.yearTotal;
				yearTotal = yearTotal?yearTotal:'0';
				
				var elecFullTotal = peopleInfo.elecFullTotal;
				elecFullTotal = elecFullTotal?elecFullTotal:'0';
				
				var elecHalfTotal = peopleInfo.elecHalfTotal;
				elecHalfTotal = elecHalfTotal?elecHalfTotal:'0';
				
				var freeTotal = peopleInfo.freeTotal;
				freeTotal = freeTotal?freeTotal:'0';
				
				var erInNumber = peopleInfo.erInNumber;
				erInNumber = erInNumber?erInNumber:'0';
				
				var erOutNumber = peopleInfo.erOutNumber;
				erOutNumber = erOutNumber?erOutNumber:'0';
				
				var sanInNumber = peopleInfo.sanInNumber;
				sanInNumber = sanInNumber?sanInNumber:'0';
				
				var sanOutNumber = peopleInfo.sanOutNumber;
				sanOutNumber = sanOutNumber?sanOutNumber:'0';
				
				var siInNumber = peopleInfo.siInNumber;
				siInNumber = siInNumber?siInNumber:'0';
				
				var siOutNumber = peopleInfo.siOutNumber;
				siOutNumber = siOutNumber?siOutNumber:'0';
				
				var wuInNumber = peopleInfo.wuInNumber;
				wuInNumber = wuInNumber?wuInNumber:'0';
				
				var wuOutNumber = peopleInfo.wuOutNumber;
				wuOutNumber = wuOutNumber?wuOutNumber:'0';
				
				var liuInNumber = peopleInfo.liuInNumber;
				liuInNumber = liuInNumber?liuInNumber:'0';
				
				var liuOutNumber = peopleInfo.liuOutNumber;
				liuOutNumber = liuOutNumber?liuOutNumber:'0';
				
				const options1 = {
					hostname: host,
					path: '/fighting/communityDataV/getCurrentTotal?communityId=72EB8426EB52439FA51D79490C14C72E',
					method: 'GET'
				};
				const req2 = https.request(options1, (resp) => {
				    resp.on('data', (d) => {
						var resp = JSON.parse(d.toString());
						var registrationNumber = resp[0].value;
						if(nowHour == 9){
							if(nowMinutes >= 15){
								erInNumber = erInNumber * registrationNumber / total;
								sanInNumber = sanInNumber * registrationNumber / total;
								siInNumber = siInNumber * registrationNumber / total;
								wuInNumber = wuInNumber * registrationNumber / total;
								liuInNumber = liuInNumber * registrationNumber / total;
								erOutNumber = erOutNumber * registrationNumber / total;
								sanOutNumber = sanOutNumber * registrationNumber / total;
								siOutNumber = siOutNumber * registrationNumber / total;
								wuOutNumber = wuOutNumber * registrationNumber / total;
								liuOutNumber = liuOutNumber * registrationNumber / total;
							}
						}else if(nowHour > 9){
							erInNumber = erInNumber * registrationNumber / total;
							sanInNumber = sanInNumber * registrationNumber / total;
							siInNumber = siInNumber * registrationNumber / total;
							wuInNumber = wuInNumber * registrationNumber / total;
							liuInNumber = liuInNumber * registrationNumber / total;
							erOutNumber = erOutNumber * registrationNumber / total;
							sanOutNumber = sanOutNumber * registrationNumber / total;
							siOutNumber = siOutNumber * registrationNumber / total;
							wuOutNumber = wuOutNumber * registrationNumber / total;
							liuOutNumber = liuOutNumber * registrationNumber / total;
						}
						inNumber = parseInt(registrationNumber) - parseInt(erOutNumber) - parseInt(sanOutNumber) - parseInt(siOutNumber) - parseInt(wuOutNumber) - parseInt(liuOutNumber);
						inNumber = inNumber>0?inNumber:0;
						
						if(nowHour >= 17){
							if(inNumber <= 0){
								var ybyData = {
									"total": registrationNumber,
									"inNumber": inNumber,
									"day": nowDay
								}
								let path = require('path');
								fs.readFile(path.resolve(__dirname, './jsonData/ybybsData.json'), 'utf8', function(err, data){
									if(err){
								        return console.error(err);
									}
									if(data){
										data = JSON.parse(data);
									}else{
										data = {day: 0};
									}
									
									if(nowDay == data.day){
										registrationNumber = data.total;
										inNumber = data.inNumber;
									}else{
										fs.writeFile(path.resolve(__dirname, './jsonData/ybybsData.json'), JSON.stringify(ybyData),function(err){
										    if(err){
										        console.error(err);
										    }
										})
									}
									res.send({
										"total": registrationNumber,
										"inNumber": inNumber
									});
								})
							}else{
								res.send({
									"total": registrationNumber,
									"inNumber": inNumber
								});
							}
						}else{
							if(nowHour < 7){
								registrationNumber = 0;
								inNumber = 0;
								fullTotal = 0;
								halfTotal = 0;
								freeTotal = 0;
								elecFullTotal = 0;
								elecHalfTotal = 0;
								erInNumber = 0;
								sanInNumber = 0;
								siInNumber = 0;
								wuInNumber = 0;
								liuInNumber = 0;
								erOutNumber = 0;
								sanOutNumber = 0;
								siOutNumber = 0;
								wuOutNumber = 0;
								liuOutNumber = 0;
							};
							if(nowHour >=7 && nowHour < 9){
								registrationNumber = total;
							};
							inNumber = parseInt(registrationNumber) - parseInt(erOutNumber) - parseInt(sanOutNumber) - parseInt(siOutNumber) - parseInt(wuOutNumber) - parseInt(liuOutNumber);
							inNumber = inNumber>0?inNumber:0;
							res.send({
								"total": registrationNumber,
								"inNumber": inNumber
							});
						}
				    });
				});
				req2.end();
			}
	    });
	});
	req1 .end();
})

// 获取优惠券信息
router.get('/bike/getCoupons', function(req, res){
	var coupons = parseInt(req.query.coupons);
	if(!coupons){
		res.send({
			"code": "FAIL",
			"msg": "参数错误"
		});
	}
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/coupons.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		
		var couponsList = data.coupons;
		
		console.log(couponsList.indexOf(coupons));
		
		if(couponsList.indexOf(coupons) != -1){
			res.send({
				"code": "SUCCESS",
				"data": {
					"coupons": coupons
				},
				"msg": "有效优惠券"
			})
		}else{
			res.send({
				"code": "FAIL",
				"data": {
					"coupons": coupons
				},
				"msg": "无效优惠券"
			})
		}
	})
})

// 删除优惠券并退款一小时
router.get('/bike/removeCoupons', function(req, res){
	var coupons = parseInt(req.query.coupons);
	var removeDate = req.query.date;
	var phone = req.query.phone;
	var bikeType = req.query.bikeType;
	if(!coupons || !removeDate || !phone || !bikeType){
		res.send({
			"code": "FAIL",
			"msg": "参数错误"
		});
		return;
	}
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/coupons.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		var couponsList = data.coupons;
		var couponsIndex = couponsList.indexOf(coupons);
		if(couponsIndex == -1){
			res.send({
				"code": "FAIL",
				"message": "无效优惠券"
			});
			return;
		}
		couponsList.splice(couponsList.indexOf(coupons), 1);
		var couponsData = {
			"coupons": couponsList
		};
		fs.writeFile(path.resolve(__dirname, './jsonData/coupons.json'), JSON.stringify(couponsData),function(err){
			if(err){
				console.error(err);
				res.send({
					"code": "FAIL",
					"message": "核销优惠券失败"
				});
				return;
			}
			fs.readFile(path.resolve(__dirname, './jsonData/usedCoupons.json'), 'utf8', function(err, data){
				if(err){
			        return console.error(err);
				}
				data = JSON.parse(data);
				var usedList = data.usedCoupons;
				var usedItem = {
					"coupons": coupons,
					"date": removeDate,
					"phone": phone
				}
				usedList.push(usedItem);
				var usedData = {
					"usedCoupons": usedList
				};
				fs.writeFile(path.resolve(__dirname, './jsonData/usedCoupons.json'), JSON.stringify(usedData),function(err){
					if(err){
						console.error(err);
						res.send({
							"code": "FAIL",
							"message": "修改失败，请稍后再试"
						});
						return;
					}
					res.send({
						"code": "SUCCESS",
						"msg": "核销优惠券成功"
					})
					
				})
			})
		})
	})
})

// 查询使用过优惠券
router.get('/bike/usedCoupons', function(req, res){
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/usedCoupons.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		var usedCoupons = data.usedCoupons;
		res.send({
			"data": usedCoupons
		});
	})
})

// 获取年卡有效信息
router.get('/boss/getCardInfo', function(req, res){
	var account = req.query.account;
	var password = req.query.password;
	if(!account || !password){
		res.send({
			"code": "FAIL",
			"msg": "参数错误"
		});
	}
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/ybyYearCard.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		console.log();
		
		var cardList = data;
		
		if(JSON.stringify(cardList).indexOf(JSON.stringify({account: account,password: password})) != -1){
			res.send({
				"code": "SUCCESS",
				"data": {
					"cardItem": {account: account,password: password}
				},
				"msg": "有效序列号"
			})
		}else{
			res.send({
				"code": "FAIL",
				"data": {
					"cardItem": {account: account,password: password}
				},
				"msg": "无效序列号"
			})
		}
	})
})

// 删除已使用年卡
router.get('/boss/removeCardInfo', function(req, res){
	var account = req.query.account;
	var password = req.query.password;
	if(!account || !password){
		res.send({
			"code": "FAIL",
			"msg": "参数错误"
		});
		return;
	}
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/ybyYearCard.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		
		data = JSON.parse(data);
		var cardList = data;
		var newArr = [];
		
		if(JSON.stringify(cardList).indexOf(JSON.stringify({account: account,password: password})) == -1){
			res.send({
				"code": "FAIL",
				"data": {
					"cardItem": {account: account,password: password}
				},
				"msg": "无效序列号"
			})
			return;
		}
		
		cardList.forEach(function(value, key){
			if(value.account != account && value.password != password){
				newArr.push(value);
			}
		})
		
		
		fs.writeFile(path.resolve(__dirname, './jsonData/ybyYearCard.json'), JSON.stringify(newArr),function(err){
			if(err){
				console.error(err);
				res.send({
					"code": "FAIL",
					"message": "写入失败"
				});
				return;
			}
			fs.readFile(path.resolve(__dirname, './jsonData/ybyUsedYearCard.json'), 'utf8', function(err, data){
				if(err){
			        return console.error(err);
				}
				
				data = JSON.parse(data);
				var usedYearCard = data;
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
					account: account,
					password: password
				};
				usedYearCard.push(usedItem);
				fs.writeFile(path.resolve(__dirname, './jsonData/ybyUsedYearCard.json'), JSON.stringify(usedYearCard),function(err){
					if(err){
						console.error(err);
						res.send({
							"code": "FAIL",
							"message": "写入失败"
						});
						return;
					}
					res.send({
						"code": "SUCCESS",
						"msg": "删除序列号成功",
						"data": {
							"cardItem": {account: account,password: password}
						}
					});
				})
			})
		})
	})
})

// 查询使用过年卡
router.get('/boss/usedYearCard', function(req, res){
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/ybyUsedYearCard.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		var usedYearCard = data;
		res.send({
			"data": usedYearCard
		});
	})
})


// pos录入
router.get('/bot/posIncrease', function(req, res){
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/ybyPos.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		var posNumber = data.posNumber;
		var nowDate = new Date();
		var nowYear = nowDate.getFullYear();
		var nowMonth = nowDate.getMonth() + 1;
		nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
		var nowDay = nowDate.getDate();
		nowDay = nowDay>9?nowDay:'0'+nowDay;
		var nowTime = nowYear + '-' + nowMonth + '-' + nowDay;
		var currNumber;
		posNumber.forEach(function(value, key){
			if(value.date == nowTime){
				value.number = parseInt(value.number) + 1;
				currNumber = value.number;
			}
		})
		var jsonData = {};
		if(!currNumber){
			var numberItem = {
				date: nowTime,
				number: 0
			}
			posNumber.push(numberItem);
		}
		jsonData = {
			"posNumber": posNumber
		}
		fs.writeFile(path.resolve(__dirname, './jsonData/ybyPos.json'), JSON.stringify(jsonData),function(err){
			if(err){
				console.error(err);
				res.send({
					"code": "FAIL",
					"message": "修改失败，请稍后再试"
				});
				return;
			}
			res.send({
				"code": "SUCCESS",
				"msg": "录入成功"
			})
		})
	})
})

// pos读取
router.get('/bot/readPosInfo', async function(req, res){
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/ybyPos.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		var posNumber = data.posNumber;
		var nowDate = new Date();
		var nowYear = nowDate.getFullYear();
		var nowMonth = nowDate.getMonth() + 1;
		nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
		var nowDay = nowDate.getDate();
		nowDay = nowDay>9?nowDay:'0'+nowDay;
		var nowTime = nowYear + '-' + nowMonth + '-' + nowDay;
		var currNumber;
		posNumber.forEach(function(value, key){
			if(value.date == nowTime){
				value.number = parseInt(value.number) + 1;
				currNumber = value.number;
			}
		})
		if(!currNumber){
			currNumber = 0;
		}
		res.send(JSON.stringify({
			"number": currNumber
		}))
	})
})

// 园博园dataV获取各门区承载量
router.get('/getInPeopleInfo', async function(reqst, respons){
	const host = 'boss.smart-ideas.com.cn';
	var nowYear = new Date().getFullYear();
	var nowMonth = new Date().getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = new Date().getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var nowHour = new Date().getHours();
	nowHour = nowHour>9?nowHour:'0'+nowHour;
	var nowMinutes = new Date().getMinutes();
	nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
	var nowSeconds = new Date().getSeconds();
	nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
	var dateString = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	var startDate = nowYear + '-' + nowMonth + '-' + nowDay + ' 00:00:00';
	startDate = encodeURI(startDate);
	var endDate = nowYear + '-' + nowMonth + '-' + nowDay + ' 23:59:59';
	endDate = encodeURI(endDate);
	const options = {
		hostname: host,
		path: '/ticketApi/robotCollection/brakeData/get?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945&startTime=' + startDate + '&endTime=' + endDate,
		method: 'GET'
	};
	const req = https.request(options, (res) => {
	    res.on('data', (d) => {
			console.log(d.toString());
			var res = JSON.parse(d.toString());
			if(res.success){
				var erInNumber = res.data[0].inTotal;
				var erOutNumber = res.data[0].outTotal;
				var sanInNumber = res.data[1].inTotal;
				var sanOutNumber = res.data[1].outTotal;
				var siInNumber = res.data[4].inTotal;
				var siOutNumber = res.data[4].outTotal;
				var wuInNumber = res.data[2].inTotal;
				var wuOutNumber = res.data[2].outTotal;
				var liuInNumber = res.data[3].inTotal;
				var liuOutNumber = res.data[3].outTotal;
				respons.send({
					erInNumber: erInNumber,
					sanInNumber: sanInNumber,
					siInNumber: siInNumber,
					wuInNumber: wuInNumber,
					liuInNumber: liuInNumber,
					erOutNumber: erOutNumber,
					sanOutNumber: sanOutNumber,
					siOutNumber: siOutNumber,
					wuOutNumber: wuOutNumber,
					liuOutNumber: liuOutNumber
				})
			}
	    });
	});
	req.end();
	
	
})

// 园博园dataV获取各门区进出园
router.get('/getMunInPeopleInfo', async function(reqst, respons){
	var inType = reqst.query.inType;
	var munType = reqst.query.munType;
	const host = 'boss.smart-ideas.com.cn';
	var nowYear = new Date().getFullYear();
	var nowMonth = new Date().getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = new Date().getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var nowHour = new Date().getHours();
	nowHour = nowHour>9?nowHour:'0'+nowHour;
	var nowMinutes = new Date().getMinutes();
	nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
	var nowSeconds = new Date().getSeconds();
	nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
	var dateString = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	var startDate = nowYear + '-' + nowMonth + '-' + nowDay + ' 00:00:00';
	startDate = encodeURI(startDate);
	var endDate = nowYear + '-' + nowMonth + '-' + nowDay + ' 23:59:59';
	endDate = encodeURI(endDate);
	const options = {
		hostname: host,
		path: '/ticketApi/robotCollection/brakeData/get?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945&startTime=' + startDate + '&endTime=' + endDate,
		method: 'GET'
	};
	const req = https.request(options, (res) => {
	    res.on('data', (d) => {
			console.log(d.toString());
			var res = JSON.parse(d.toString());
			if(res.success){
				var erInNumber = res.data[0].inTotal;
				var erOutNumber = res.data[0].outTotal;
				var sanInNumber = res.data[1].inTotal;
				var sanOutNumber = res.data[1].outTotal;
				var siInNumber = res.data[4].inTotal;
				var siOutNumber = res.data[4].outTotal;
				var wuInNumber = res.data[2].inTotal;
				var wuOutNumber = res.data[2].outTotal;
				var liuInNumber = res.data[3].inTotal;
				var liuOutNumber = res.data[3].outTotal;
				var outValue;
				if(inType == '0'){
					if(munType == '2'){
						outValue = erInNumber;
					}else if(munType == '3'){
						outValue = sanInNumber;
					}else if(munType == '4'){
						outValue = siInNumber;
					}else if(munType == '5'){
						outValue = wuInNumber;
					}else if(munType == '6'){
						outValue = liuInNumber;
					}
				}else{
					if(munType == '2'){
						outValue = erOutNumber;
					}else if(munType == '3'){
						outValue = sanOutNumber;
					}else if(munType == '4'){
						outValue = siOutNumber;
					}else if(munType == '5'){
						outValue = wuOutNumber;
					}else if(munType == '6'){
						outValue = liuOutNumber;
					}
				}
				respons.send([
					{
						value: outValue
					}
				])
			}
	    });
	});
	req.end();
	
	
})

// 获取老年卡信息
router.post('/getUserInfo', async function(req, res) {
	getAESContent(req.body.data, function(name, idCard, deviceid){
		res.send({
			"code": "1",
			"msg": "获取信息成功"
		})
		buyTicket(name, idCard, function(ticketId){
			getOrderDetail(ticketId, function(qrcode){
				getCheckInfoByBrake(qrcode, function(ticketOrderId, ticketOrderDetailsId, categoryCode, detailsType, salesChannelsNum){
					checkByBrake(ticketOrderId, ticketOrderDetailsId, categoryCode, detailsType, salesChannelsNum, function(){
						upload(deviceid, qrcode);
					});
				})
			})
		})
	}, function(){
		res.send({
			"code": "0",
			"msg": "数据解密错误"
		})
	})
})

// aes解密
function getAESContent(userAes, success, fail){
	const options = {
		hostname: "iot.smart-ideas.com.cn",
		path: '/ybypark/ticketsRobot/getAESContent',
		method: 'POST',
		headers: {
		  	'Content-Type': 'application/json'
	  	}
	};
	// aes解密
	var data = {value: userAes};
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
			
			if(isJSON(buffer.toString())){
				var res = JSON.parse(buffer.toString());
				var userInfo = JSON.parse(res.data);
				
				if(res.code == 'SUCCESS' && res.data){
					console.log('姓名=============' + userInfo.xm);
					console.log('身份证=============' + userInfo.kh);
					console.log('设备号=============' + userInfo.deviceid)
					success(userInfo.xm, userInfo.kh, userInfo.deviceid);
				}else{
					fail();
				}
			}
		})
	});
	
	req.write(JSON.stringify(data));
	req.end();
}

// 购票
function buyTicket(name, idCard, success){
	const options = {
		hostname: "boss.smart-ideas.com.cn",
		path: '/ticketApi/order/create',
		method: 'POST',
		headers: {
		  	'Content-Type': 'application/json'
	  	}
	};
	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var nowHour = nowDate.getHours();
	var nowMinute = nowDate.getMinutes();
	console.log('老年卡购票时间：' + nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinute);
	// 购票
	var data = {
		buyQuantity: 1,
		openId: "111111111111",
		payWay: "WXPAY",
		source: "WEB",
		ticketInfoId: "2c9141f47644fb2d01764a65080d1696",
		totalPrice: 0,
		unitPrice: 0,
		visitDate: nowYear + '-' + nowMonth + '-' + nowDay,
		visitors: [
			{
				certNumber: idCard,
				certType: 0,
				phone: "13512345678",
				userName: name
			}
		]
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
			var ticketId = res.data.ticketOrderId;
			if(res.success){
				success(ticketId);
			}
		})
	});
	
	req.write(JSON.stringify(data));
	req.end();
}

function getOrderDetail(ticketOrderId, success){
	const options = {
		hostname: "boss.smart-ideas.com.cn",
		path: '/ticketApi/order/getDetailsById?ticketOrderId=' + ticketOrderId,
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
			if(res.success){
				success(res.data.checkCode);
			}else{
				console.log('获取闸机检票详情失败')
			}
		})
	});
	req.end();
}

// 闸机获取检票详情
function getCheckInfoByBrake(qrcode, success){
	const options = {
		hostname: "boss.smart-ideas.com.cn",
		path: '/ticketApi/orderCheck/getCheckInfoByBrake?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945&checkWay=qr&checkValue=' + qrcode,
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
			if(res.success){
				success(res.data.ticketOrderId, res.data.ticketOrderDetailsId, res.data.categoryCode, res.data.detailsType, res.data.salesChannelsNum);
			}else{
				console.log('获取闸机检票详情失败')
			}
		})
	});
	req.end();
}

// 闸机验票
function checkByBrake(ticketOrderId, ticketOrderDetailsId, categoryCode, detailsType, salesChannelsNum, success){
	const options = {
		hostname: "boss.smart-ideas.com.cn",
		path: '/ticketApi/orderCheck/checkByBrake',
		method: 'POST',
		headers: {
		  	'Content-Type': 'application/json'
	  	}
	};
	var data = {
		ticketOrderId: ticketOrderId,
		ticketOrderDetailsId: ticketOrderDetailsId,
		categoryCode: categoryCode,
		detailsType: detailsType,
		salesChannelsNum: salesChannelsNum,
		checkWay: 'brake'
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
			if(res.success){
				success();
			}
		})
	});
	
	req.write(JSON.stringify(data));
	req.end();
}

// 闸机开关闸上传数据
function upload(deviceid, qrcode){
	 const options = {
	 	hostname: "boss.smart-ideas.com.cn",
	 	path: '/ticketApi/brakeData/upload',
	 	method: 'POST',
	 	headers: {
	 	  	'Content-Type': 'application/json'
	   	}
	 };
	 // 闸机编号
	 var brakeNum;
	 if(deviceid == '233'){
		 brakeNum = '20210601';
	 }else if(deviceid == '234'){
		 brakeNum = '20210602';
	 }else if(deviceid == '235'){
		 brakeNum = '20210201';
	 }else if(deviceid == '236'){
		 brakeNum = '20210202';
	 }else if(deviceid == '237'){
		 brakeNum = '20210301';
	 }else if(deviceid == '238'){
		 brakeNum = '20210302';
	 }else if(deviceid == '386'){
		 brakeNum = '20210203';
	 }else if(deviceid == '243'){
		 brakeNum = '20210303';
	 }
	 var data = {
	 	brakeNum: brakeNum,
	 	type: 'in',
	 	checkWay: 'qr',
	 	checkValue: qrcode,
	 	number: 1
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
			console.log('闸机上传数据====');
			console.log(res);
	 	})
	 });
	 
	 req.write(JSON.stringify(data));
	 req.end();
}
 

function getNewYbyPeopleInfo(host){
	var nowYear = new Date().getFullYear();
	var nowMonth = new Date().getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = new Date().getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var nowHour = new Date().getHours();
	nowHour = nowHour>9?nowHour:'0'+nowHour;
	var nowMinutes = new Date().getMinutes();
	nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
	var nowSeconds = new Date().getSeconds();
	nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
	var dateString = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
	var startDate = nowYear + '-' + nowMonth + '-' + nowDay + ' 00:00:00';
	startDate = encodeURI(startDate);
	var endDate = nowYear + '-' + nowMonth + '-' + nowDay + ' 23:59:59';
	endDate = encodeURI(endDate);
	const options = {
		hostname: host,
		path: '/ybypark/ticketsCollection/getPassengerFlowCollection?startDate=' + startDate + '&endDate=' + endDate,
		method: 'GET'
	};
	const req = https.request(options, (res) => {
	    res.on('data', (d) => {
			console.log(d.toString());
			var res = JSON.parse(d.toString());
			if(res.code == 'SUCCESS'){
				var peopleInfo = res.data;
				var total = peopleInfo.total;
				total = total?total:0;
				
				var inNumber = peopleInfo.inNumber;
				inNumber = inNumber?inNumber:0;
				
				var fullTotal = peopleInfo.fullTotal;
				fullTotal = fullTotal?fullTotal:0;
				
				var halfTotal = peopleInfo.halfTotal;
				halfTotal = halfTotal?halfTotal:0;
				
				var yearTotal = peopleInfo.yearTotal;
				yearTotal = yearTotal?yearTotal:0;
				
				var teamTotal = peopleInfo.teamTotal;
				teamTotal = teamTotal?teamTotal:0;
				
				var elecFullTotal = peopleInfo.elecFullTotal;
				elecFullTotal = elecFullTotal?elecFullTotal:0;
				
				var elecHalfTotal = peopleInfo.elecHalfTotal;
				elecHalfTotal = elecHalfTotal?elecHalfTotal:0;
				
				var freeTotal = peopleInfo.freeTotal;
				freeTotal = freeTotal?freeTotal:0;
				
				var erInNumber = peopleInfo.erInNumber;
				erInNumber = erInNumber?erInNumber:0;
				
				var erOutNumber = peopleInfo.erOutNumber;
				erOutNumber = erOutNumber?erOutNumber:0;
				
				var sanInNumber = peopleInfo.sanInNumber;
				sanInNumber = sanInNumber?sanInNumber:0;
				
				var sanOutNumber = peopleInfo.sanOutNumber;
				sanOutNumber = sanOutNumber?sanOutNumber:0;
				
				var siInNumber = peopleInfo.siInNumber;
				siInNumber = siInNumber?siInNumber:0;
				
				var siOutNumber = peopleInfo.siOutNumber;
				siOutNumber = siOutNumber?siOutNumber:0;
				
				var wuInNumber = peopleInfo.wuInNumber;
				wuInNumber = wuInNumber?wuInNumber:0;
				
				var wuOutNumber = peopleInfo.wuOutNumber;
				wuOutNumber = wuOutNumber?wuOutNumber:0;
				
				var liuInNumber = peopleInfo.liuInNumber;
				liuInNumber = liuInNumber?liuInNumber:0;
				
				var liuOutNumber = peopleInfo.liuOutNumber;
				liuOutNumber = liuOutNumber?liuOutNumber:0;
				
				var inTotal = parseInt(erInNumber) + parseInt(sanInNumber) + parseInt(siInNumber) + parseInt(wuInNumber) + parseInt(liuInNumber);
				console.log('=====================================' + inTotal);
				inNumber = parseInt(inTotal) - parseInt(erOutNumber) - parseInt(sanOutNumber) - parseInt(siOutNumber) - parseInt(wuOutNumber) - parseInt(liuOutNumber);
				return inTotal;
			}else{
				room.say(res.msg);
			}
	    });
	});
	req.end();
}

// 获取入园人数曲线图
router.get('/inPeopleLineInfo', async function(req, res){
	fs.readFile(path.resolve(__dirname, './jsonData/ybyInPeopleInfo.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		if(isJSON(data.toString())){
			data = JSON.parse(data);
			res.send(data);
		}else{
			res.send([]);
		}
	})
})

// 获取园博园datav在园人数报数
router.get('/inPeopleInfo', async function(req, res){
	try{
		getBrakeData('TgsEpcYby', 'TGN20201210095942945', function(sendInfo){
			res.send(sendInfo);
			fs.readFile(path.resolve(__dirname, './jsonData/ybyInPeopleInfo.json'), 'utf8', function(err, data){
				if(err){
			        return console.error(err);
				}
				if(isJSON(data.toString())){
					data = JSON.parse(data);
					var nowHour = new Date().getHours();
					if(nowHour == '8'){
						data[0].y = sendInfo.totalInPeople;
						data[1].y = 0;
						data[2].y = 0;
						data[3].y = 0;
						data[4].y = 0;
						data[5].y = 0;
						data[6].y = 0;
						data[7].y = 0;
						data[8].y = 0;
						data[9].y = 0;
					}else if(nowHour == '9'){
						data[1].y = sendInfo.totalInPeople;
						data[2].y = 0;
						data[3].y = 0;
						data[4].y = 0;
						data[5].y = 0;
						data[6].y = 0;
						data[7].y = 0;
						data[8].y = 0;
						data[9].y = 0;
					}else if(nowHour == '10'){
						data[2].y = sendInfo.totalInPeople;
						data[3].y = 0;
						data[4].y = 0;
						data[5].y = 0;
						data[6].y = 0;
						data[7].y = 0;
						data[8].y = 0;
						data[9].y = 0;
					}else if(nowHour == '11'){
						data[3].y = sendInfo.totalInPeople;
						data[4].y = 0;
						data[5].y = 0;
						data[6].y = 0;
						data[7].y = 0;
						data[8].y = 0;
						data[9].y = 0;
					}else if(nowHour == '12'){
						data[4].y = sendInfo.totalInPeople;
						data[5].y = 0;
						data[6].y = 0;
						data[7].y = 0;
						data[8].y = 0;
						data[9].y = 0;
					}else if(nowHour == '13'){
						data[5].y = sendInfo.totalInPeople;
						data[6].y = 0;
						data[7].y = 0;
						data[8].y = 0;
						data[9].y = 0;
					}else if(nowHour == '14'){
						data[6].y = sendInfo.totalInPeople;
						data[7].y = 0;
						data[8].y = 0;
						data[9].y = 0;
					}else if(nowHour == '15'){
						data[7].y = sendInfo.totalInPeople;
						data[8].y = 0;
						data[9].y = 0;
					}else if(nowHour == '16'){
						data[8].y = sendInfo.totalInPeople;
						data[9].y = 0;
					}else if(nowHour == '17'){
						data[9].y = sendInfo.totalInPeople;
					}
					fs.writeFile(path.resolve(__dirname, './jsonData/ybyInPeopleInfo.json'), JSON.stringify(data),function(err){
						if(err){
							console.error(err);
							res.send({
								"code": "FAIL",
								"message": "修改失败，请稍后再试"
							});
							return;
						}
					})
				}
			})
		});
	}catch(e){
		//TODO handle the exception
	}
})

// 获取闸机报数
function getBrakeData(enterpriseCode, ticketGroupNum, success){
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
	var searchSdate = encodeURI(sDate);
	var eDate = year + '-' + month + '-' + day + ' 23:59:59';
	var searchEdate = encodeURI(eDate);
	var botDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds; 
	const options = {
		hostname: bossHost,
		path: '/ticketApi/robotCollection/brakeData/get?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&startTime=' + searchSdate + '&endTime=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			if(isJSON(d.toString())){
				var res = JSON.parse(d.toString());
				var brakeList = res.data;
				if(enterpriseCode == 'TgsEpcYby'){
					// getTeamTicketNumber(function(h5TeamTotal){
						let h5TeamTotal = 0;
						getCheckTicketNumber(enterpriseCode, ticketGroupNum, function(checkTotalNumber){
							// getYbyOtaInfo(function(dzTotal){
								let dzTotal = 0;
								var totalInPeople = parseInt(h5TeamTotal) + parseInt(checkTotalNumber) + parseInt(dzTotal);
								var totalOutPeople = 0;
								var brakeString = '';
								var erIn = 0;
								var erOut = 0;
								var sanIn = 0;
								var sanOut = 0;
								var siIn = 0;
								var siOut = 0;
								var wuIn = 0;
								var wuOut = 0;
								var liuIn = 0;
								var liuOut = 0;
								var sanOut = 0;
								// 出园系数
								var outNumber = 1.6;
								brakeList.forEach(function(value, key){
									var inTotal = parseInt(value.inTotal);
									if(value.categoryName.indexOf('二号门') != -1){
										erIn += inTotal;
										erOut += parseInt(value.outTotal * outNumber);
									}else if(value.categoryName.indexOf('四号门') != -1){
										siIn += inTotal;
										siOut += parseInt(value.outTotal * outNumber);
									}else if(value.categoryName.indexOf('三号门') != -1){
										sanOut += parseInt(value.outTotal * outNumber);
									}else if(value.categoryName.indexOf('五号门') != -1){
										wuIn += inTotal;
										wuOut += parseInt(value.outTotal * outNumber);
									}else if(value.categoryName.indexOf('六号门') != -1){
										liuIn += inTotal;
										liuOut += parseInt(value.outTotal * outNumber);
									}else if(value.categoryName.indexOf('一号门') != -1){
										erOut += parseInt(value.outTotal * outNumber);
									}
									totalOutPeople += parseInt(value.outTotal * outNumber);
								})
								var sanIn = totalInPeople - parseInt(erIn) - parseInt(siIn) - parseInt(wuIn) - parseInt(liuIn);
								sanIn = sanIn>0?sanIn:'0';
								var nowInPeople = totalInPeople - totalOutPeople;
								nowInPeople = nowInPeople>0?nowInPeople:0;
								var sendInfo = {
									totalInPeople: totalInPeople,
									nowInPeople: nowInPeople,
									erIn: erIn,
									erOut: erOut,
									siIn: siIn,
									siOut: siOut,
									sanIn: sanIn,
									sanOut: sanOut,
									wuIn: wuIn,
									wuOut: wuOut,
									liuIn: liuIn,
									liuOut: liuOut
								}
								success(sendInfo);
							})
						// })
						
					// })
				}
			}
		});
	});
	
	req.end();
}

// 园博园获取团体票入园信息
function getTeamTicketNumber(success){
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
	var searchSdate = encodeURI(sDate);
	var eDate = year + '-' + month + '-' + day + ' 23:59:59';
	var searchEdate = encodeURI(eDate);
	var botDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds; 
	const options = {
		hostname: 'iot.smart-ideas.com.cn',
		path: '/ybypark/ticketsCollection/getTicketsCollection?startDate=' + searchSdate + '&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var h5TeamTotal = res.data.ticketsInnerCollection.h5TeamTotal;
			h5TeamTotal = h5TeamTotal?parseInt(h5TeamTotal):0;
			success(h5TeamTotal);
		});
	});
	
	req.end();
}

// 核销总人数
function getCheckTicketNumber(enterpriseCode, ticketGroupNum, success){
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
	let options = {
		hostname: bossHost,
		path: '/ticketApi/orderView/getCheck?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945',
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			success(res[0].value);
		});
	});
	
	req.end();
}

// 获取电子票核销人数
function getYbyOtaInfo(success){
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
		hostname: 'iot.smart-ideas.com.cn',
		path: '/ybypark/ticketsCollection/getPassengerFlowCollection?startDate=' + searchSdate + '&endDate=' + searchEdate,
		method: 'GET'
	};
	
	const req1 = http.request(options, (res1) => {
	    res1.on('data', (d1) => {
			var res1 = JSON.parse(d1.toString());
			var elecFullTotal = res1.data.elecFullTotal;
			elecFullTotal = elecFullTotal?elecFullTotal:0;
			var elecHalfTotal = res1.data.elecHalfTotal;
			elecHalfTotal = elecHalfTotal?elecHalfTotal:0;
			var dzTotal = parseInt(elecFullTotal) + parseInt(elecHalfTotal);
			success(dzTotal);
	    });
	});
	req1.end();
	
}

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }

        } catch(e) {
            console.log('error：'+str+'!!!'+e);
            return false;
        }
    }
    console.log('It is not a string!')
}


module.exports = router;