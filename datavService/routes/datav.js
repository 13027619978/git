var express=require('express');
var yby=require('./datav/yby.js');
var ymy=require('./datav/ymy.js');
var qsmx=require('./datav/qsmx.js');
var common=require('./datav/common.js');
var yhg=require('./datav/yhg.js');
var xwh=require('./datav/xwh.js');
var sch=require('./datav/sch.js');
var xhg=require('./datav/xhg.js');
var dz=require('./datav/dz.js');
var boss = require('./datav/boss.js');
var fzp = require('./datav/fzp.js');
var ylh = require('./datav/ylh.js');
var uploadImg = require('./datav/uploadImg.js');
var hongtu = require('./datav/hongtu.js');
var xwhpark = require('./datav/xwhpark.js');
var fhl = require('./datav/fhl.js');
// 测试
var test = require('./datav/test.js');

// 身份证
var idCard = require('./datav/idCard.js');

// 紫竹院
var zzy = require('./datav/zzy.js');

// 颐和园
var yhy = require('./datav/yhy.js');
var router = express.Router(); 

router.use('/yhy',yhy);
router.use('/zzy',zzy);
router.use('/yby',yby);
router.use('/ymy',ymy);
router.use('/qsmx',qsmx);
router.use('/common',common);
router.use('/yhg',yhg);
router.use('/xwh',xwh);
router.use('/xhg',xhg);
router.use('/dz',dz);
router.use('/boss',boss);
router.use('/fzp',fzp);
router.use('/ylh',ylh);
router.use('/uploadImg',uploadImg);
router.use('/hongtu',hongtu);
router.use('/sch',sch);
router.use('/test',test);
router.use('/xwhpark',xwhpark);
router.use('/fhl',fhl);
router.use('/idCard',idCard);
module.exports = router;