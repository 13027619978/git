var express=require('express');
var router = express.Router();
var https = require('https');
const fs = require('fs');
let path = require('path');
const FormData = require('form-data');
const axios = require('axios');

router.get('/getidCard', async function(req, res1){
	let idCard = req.query.idCard;
	let name = req.query.name;
	let forms = new FormData();
	forms.append('appId', '9268f2a0d44c4694adb8c43aec2aad09');
	forms.append('appKey', 'NjA3NDQ5NDA=');
	forms.append('personalName', name);
	forms.append('identityCardNo', idCard);
	axios({
		url: 'https://id2.hisign.com.cn:9001/hisp/dsic/identify',
		method: 'post',
		data: forms,
		headers: {
			'content-type':'application/x-www-form-urlencoded',
		}
	})
	.then(function(res){
		res1.send(res.data);
	})
	.catch(function(err){
		console.log(err);
	})
})



module.exports = router;