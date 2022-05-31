var express=require('express');
var wechaty=require('./operate/wechaty.js');
var router = express.Router();
router.get('/',function(req,res){
	res.render('wxbot/operate');
})
router.use('/wechaty',wechaty);
module.exports = router;