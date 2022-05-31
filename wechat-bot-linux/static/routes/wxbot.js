var express=require('express');
var operate=require('./wxbot/operate.js');
var router = express.Router(); 
router.use(function(req,res,next){

    if(req.url=='/login' || req.url=='/doLogin'){
        next();
    }else{

        if(req.session.userinfo&&req.session.userinfo.username!=''){   
            next();
        }else{
        	if(req.xhr){
        		console.log('ajax请求')
        		res.status(302)
        		res.set('REQUIRES_AUTH_URL','/home/login')
        		res.end()
        	}else{
        		console.log('页面请求')
        		res.redirect('/home/login')
        	}          
        }
    }
})
router.use('/operate',operate);
module.exports = router;


