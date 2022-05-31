var express=require('express');
var mysql  = require('mysql'); 
var md5=require('md5-node');

var router = express.Router();
var bodyParser = require('body-parser');

var connection = mysql.createConnection({     
  host     : '47.94.82.166',       
  user     : 'root',              
  password : '12051230',       
  port: '3306',                   
  database: 'qsmx_wechat' 
}); 
function handleDisconnect(connection) {
  connection.on('error', function(err) {
    if (!err.fatal) {
      return;
    }
 
    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }
 
    console.log('Re-connecting lost connection: ' + err.stack);
 
    connection = mysql.createConnection(connection.config);
    handleDisconnect(connection);
    connection.connect();
  });
}
handleDisconnect(connection);

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.get('/',function(req,res){
    res.render('home/login');
})


router.post('/doLogin',function(req,res){
    if(req.body.username == null || req.body.password == null){
    	res.send("<script>alert('用户名和密码都不为空');location.href='/home/login'</script>");
    }else{	
    	var  sql = "SELECT * FROM userinfo WHERE name = '"+req.body.username+"'";
		connection.query(sql,function (err, result) {
	    	if(err){
	          console.log('[SELECT ERROR] - ',err.message);
	          return;
	        }
	        if(result.length == 1){
	        	var userPassword=md5(req.body.password);
		        if(result[0].password.toLowerCase() == userPassword.toLowerCase()){
			    	req.session.userinfo=req.body;
			    	res.redirect('/wxbot/operate');
		        }else{
		        	res.send("<script>alert('密码错误');location.href='/home/login'</script>");
		        }
	        }else{
	        	res.send("<script>alert('用户名不存在');location.href='/home/login'</script>");
	        }
		});
    }
     
})


module.exports = router;