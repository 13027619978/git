var express=require('express');
var router = express.Router();
const axios = require('axios');

router.post('/getPeopleInfo', async function(req, res){
	let body = req.body
//   	console.log(body);
  	res.status(200).send({msg:'成功'})
})


module.exports = router;