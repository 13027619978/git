var express=require('express');
var weather=require('./common/weather.js');
var router = express.Router(); 

router.use('/weather',weather);

module.exports = router;