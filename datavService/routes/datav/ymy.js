var express=require('express');
var router = express.Router();
var https = require('https');
const fs = require('fs');
var http = require('http');

// 获取交通船售票状态
router.get('/getBoatTicketsStatus',async function(req,res){
	// console.log(req.query);
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/ymyData.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);

		res.send(data);
	})
});

// 改变交通船售票状态
router.get('/changeBoatTicketsStatus', async function(req,res){
	var ticketsStatus = req.query.status;
	if(!ticketsStatus){
		res.send({
			"code": "FAIL",
			"message": "参数错误"
		});
	}
	let path = require('path');
	var ymyData = {
		"status": ticketsStatus
	};
	fs.writeFile(path.resolve(__dirname, './jsonData/ymyData.json'), JSON.stringify(ymyData),function(err){
		if(err){
			console.error(err);
			res.send({
				"code": "FAIL",
				"message": "修改失败，请稍后再试"
			});
			return;
		}
		var message;
		if(ticketsStatus == '0'){
			message = '交通船票已停运';
		}else{
			message = '交通船票已启用';
		}
		res.send({
			"code": "SUCCESS",
			"message": message
		});
	})
})

// 获取在园人数离园人数
router.get('/getPeopleInfo', async function(req1,res1){
	try{
		const options = {
			hostname: 'report.anjisheng.cn',
			path: '/ajax/Browse/GetShopData',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		
		const req = http.request(options, (res) => {
			res.on('data', (d) => {
				console.log(d);
				res1.send(d);
				// if(isJSON(d.toString())){
				// 	var res = JSON.parse(d.toString());
				// 	res1.send(res);
				// }else{
				// 	res1.send('err');
				// }
			});
		});
		
		req.write(JSON.stringify({
			id: 'bd05f440-176b-444d-92d4-e4f53586b216'
		}));
		req.end();
	}
	catch(e){
		res1.send({});
	}
})

// 获取datav客流曲线
router.get('/getPeopleCurve',async function(req1,res1){
	const options = {
		hostname: 'report.anjisheng.cn',
		path: '/ajax/Browse/GetShopData',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			if(isJSON(d.toString())){
				var res = JSON.parse(d.toString());
				var DataIn = res.Data.DataIn;
				var Time = res.Data.Time.split(':')[0] + ':00';
				let path = require('path');
				fs.readFile(path.resolve(__dirname, './jsonData/ymyPeopleData.json'), 'utf8', function(err, jsonData){
					if(err){
				        return console.error(err);
					}
					jsonData = JSON.parse(jsonData);
					var nowYear = new Date().getFullYear();
					var nowMonth = new Date().getMonth() + 1;
					nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
					var nowDay = new Date().getDate();
					nowDay = nowDay>9?nowDay:'0'+nowDay;
					var nowDate = nowYear + '-' + nowMonth + '-' + nowDay;
					if(nowDate == jsonData.date){
						if(7 < new Date().getHours() < 20){
							jsonData.peopleInfo[Time] = DataIn;
						}
					}else{
						jsonData = {
							date: nowDate,
							peopleInfo: {
								"08:00": 0,
								"09:00": 0,
								"10:00": 0,
								"11:00": 0,
								"12:00": 0,
								"13:00": 0,
								"14:00": 0,
								"15:00": 0,
								"16:00": 0,
								"17:00": 0,
								"18:00": 0,
								"19:00": 0
							}
						}
						if(7 < new Date().getHours() < 20){
							jsonData.peopleInfo[Time] = DataIn;
						}
					}
					fs.writeFile(path.resolve(__dirname, './jsonData/ymyPeopleData.json'), JSON.stringify(jsonData),function(err){
						if(err){
							console.error(err);
							return;
						}
						
						res1.send(jsonData);
					})
				})
			}
		});
	});
	
	req.write(JSON.stringify({
		id: 'bd05f440-176b-444d-92d4-e4f53586b216'
	}));
	req.end();
});


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