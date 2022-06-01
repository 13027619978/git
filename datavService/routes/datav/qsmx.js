var express=require('express');
var router = express.Router();


router.get('/',function(req,res){
    res.send('datav/qsmx 目录');
});

router.get('/date',function(req,res){
	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0' + nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0' + nowDay;
    res.send(nowYear + '/' + nowMonth + '/' + nowDay);
});

router.get('/time',function(req,res){
    var nowDate = new Date();
    var nowHour = nowDate.getHours();
    nowHour = nowHour>9?nowHour:'0' + nowHour;
    var nowMinute = nowDate.getMinutes();
	nowMinute = nowMinute>9?nowMinute:'0' + nowMinute;
	var nowSeconds = nowDate.getSeconds();
	nowSeconds = nowSeconds>9?nowSeconds:'0' + nowSeconds;
    res.send(nowHour + ':' + nowMinute + ':' + nowSeconds);
});

module.exports = router;