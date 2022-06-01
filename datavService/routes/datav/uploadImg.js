var express=require('express');
var router = express.Router();
var https = require('https');
const fs = require('fs');
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
    // 指定文件路径
        cb(null, './public/img')
    },
    filename: function(req, file, cb) {
		// 指定文件名
		//文件名重复覆盖
		// 后缀名发生改变,如何解决？👇
		console.log('----',file)
		let exts=file.originalname.split('.') //拿到源文件的后缀名
		let ext=exts[exts.length-1]
		
		let tmpname=(new Date()).getTime()+parseInt(Math.random()*9999)  //为了避免重复，用时间戳表示
        cb(null, `${tmpname}.${ext}`);
    }
});
var upload = multer({
    storage: storage
});

//上传图片必须用post方法
router.post('/upload',upload.single('file'), async (req,res)=>{
  console.log(req.file)
  let {size,mimetype,path}=req.file
  let types=['jpg','jpeg','png','gif'] //允许上传的数据类型
  let tmpType=mimetype.split('/')[1]
  if(size>500000){
      return  res.send({success:false,msg:'尺寸过大'})
  }else if(types.indexOf(tmpType)==-1){
      return  res.send({success:false,msg:'媒体类型错误'})
  }else{
    let url=`http://node.smart-ideas.com.cn:3001/static/img/${req.file.filename}`
    let path = require('path');
    fs.readFile(path.resolve(__dirname, './jsonData/uploadImgData.json'), 'utf8', function(err, data){
    	if(err){
            return console.error(err);
    	}
    	data = JSON.parse(data);
    	data.push({
			uploadTIme: getCurrTime(),
			imgUrl: url
		})
    	fs.writeFile(path.resolve(__dirname, './jsonData/uploadImgData.json'), JSON.stringify(data),function(err){
    		if(err){
    			console.error(err);
    			res.send({
    				"success": "fail",
    				"msg": "添加失败"
    			});
    			return;
    		}
    		res.send({
    			success: 'true',
    			msg: '添加次数成功',
    			data: url
    		})
    	})
    })
  }
})

// 获取图片列表
router.get('/getImgList', async (req, res) => {
	let path = require('path');
	fs.readFile(path.resolve(__dirname, './jsonData/uploadImgData.json'), 'utf8', function(err, data){
		if(err){
	        return console.error(err);
		}
		data = JSON.parse(data);
		
		res.send({
			success: 'true',
			msg: '获取成功',
			data: data
		})
	})
})

function getCurrTime(){
	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth() + 1;
	nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
	var nowDay = nowDate.getDate();
	nowDay = nowDay>9?nowDay:'0'+nowDay;
	var nowHour = nowDate.getHours();
	nowHour = nowHour>9?nowHour:'0'+nowHour;
	var nowMinutes = nowDate.getMinutes();
	nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
	var nowSeconds = nowDate.getSeconds();
	nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
	return nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
}

module.exports = router;