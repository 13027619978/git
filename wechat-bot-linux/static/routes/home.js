var express=require('express');
var login=require('./home/login.js');
var router = express.Router();
router.get('/',function(req,res){
    res.send('home根页面');
})
router.use('/login',login);
module.exports = router;