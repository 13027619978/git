var wechat = require('../mybot.js');
const https = require('https');
const host = "iot.smart-ideas.com.cn";

async function ssgybsRoomDeal(msg){
	const content = msg.text();
	const contact = msg.talker();
	const room = msg.room();
	const fromRoomAlias = await room.alias(contact);
	var fromName;
	if(fromRoomAlias){
		fromName = fromRoomAlias;
	}else{
		fromName = contact.name();
	}
	if(msg.type() == wechat.bot.Message.Type.Text){
		if(content == '水上公园报数'){
			var ssgyBotString = '';
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth() + 1;
			month = month>9?month:"0"+month;
			var eday = nowDate.getDate()>9?nowDate.getDate():"0"+nowDate.getDate();
			var hour = nowDate.getHours();
			var minutes = nowDate.getMinutes()>9?nowDate.getMinutes():"0"+nowDate.getMinutes();
			var seconds = nowDate.getSeconds()>9?nowDate.getSeconds():'0'+nowDate.getSeconds();
			hour = hour>9?hour:"0"+hour;
			var edate = year+'-'+month+'-'+eday+' '+hour+':'+minutes+':'+seconds;
			var sdate = year+'-'+month+'-'+eday+' 00:00:00';
			var searchSDate = encodeURI(sdate);
			var searchEDate = encodeURI(edate);
			
			// 驴妈妈
			var lvZjTotalNum; // 正价票数量
			var lvZjTotalMoney; // 正价消费总计
			var lvTp120TotalNum; // 套票120数量
			var lvTp120TotalMoney; // 120总计
			var lvTp160TotalNum; // 套票160数量
			var lvTp160TotalMoney; // 160总计
			
			// 携程
			var ctripZjTotalNum; // 正价票数量
			var ctripZjTotalMoney; // 正价消费总计
			var ctripTp120TotalNum; // 套票120数量
			var ctripTp120TotalMoney; // 120总计
			var ctripTp160TotalNum; // 套票160数量
			var ctripTp160TotalMoney; // 160总计
			
			// 去哪儿
			var qnZjTotalNum; // 正价票数量
			var qnZjTotalMoney; // 正价消费总计
			var qnTp120TotalNum; // 套票120数量
			var qnTp120TotalMoney; // 120总计
			var qnTp160TotalNum; // 套票160数量
			var qnTp160TotalMoney; // 160总计
			
			// 正价票
			var zjTotalNum;
			var zjTotalMoney;
			
			// 半价票
			var bjTotalNum;
			var bjTotalMoney;
			
			// 单次票
			var dcTotalNum;
			var dcTotalMoney;
			
			// 季票
			var jTotalNum;
			var jTotalMoney;
			
			// 赠票
			var zTotalNum;
			
			// 网络票
			var wlTotalNum;
			
			// 正价票-啤酒节
			var zjPjjTotalNum;
			var zjPjjTotalMoney;
			
			// 半价票-啤酒节
			var bjPjjTotalNum;
			var bjPjjTotalMoney;
			
			// 套票120
			var tp120TotalNum;
			var tp120TotalMoney;
			
			// 套票160
			var tp160TotalNum;
			var tp160TotalMoney;
			
			// 套票120 兑换
			var tp120dTotalNum;
			
			// 套票160 兑换
			var tp160dTotalNum;
			
			// 门口二维码购票
			var xcxTotalNum;
			var xcxTotalMoney;
			var h5TotalNum;
			var h5TotalMoney;
			
			// 收入总和
			var totalMoney;
			var xcxConsumeNum; // 小程序购票
			
			const options = {
				hostname: host,
				path: '/ssgy/cltRobot/getClt?startDate=' + searchSDate + '&endDate=' + searchEDate,
				method: 'GET'
			};
			
			var buffers = [];
			var nread = 0;
			const req = https.request(options, (res) => {
			  	res.on('data', (d) => {
				  	buffers.push(d);
					nread += d.length;
				});
				
				res.on('end', () => {
					var buffer = null;
				    switch(buffers.length) {
				        case 0: buffer = new Buffer(0);
				            break;
				        case 1: buffer = buffers[0];
				            break;
				        default:
				            buffer = new Buffer(nread);
				            for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
				                var chunk = buffers[i];
				                chunk.copy(buffer, pos);
				                pos += chunk.length;
				            }
				        break;
				    }
				    var res = JSON.parse(buffer.toString());
					var ticketsCltVo = res.data.ticketsCltVo;
				    // 驴妈妈
					lvZjTotalNum = ticketsCltVo.lvZjTotalNum?ticketsCltVo.lvZjTotalNum:0; 
					lvZjTotalMoney = ticketsCltVo.lvZjTotalMoney?ticketsCltVo.lvZjTotalMoney:0;
					lvTp120TotalNum = ticketsCltVo.lvTp120TotalNum?ticketsCltVo.lvTp120TotalNum:0;
					lvTp120TotalMoney = ticketsCltVo.lvTp120TotalMoney?ticketsCltVo.lvTp120TotalMoney:0; 
					lvTp160TotalNum = ticketsCltVo.lvTp160TotalNum?ticketsCltVo.lvTp160TotalNum:0;
					lvTp160TotalMoney = ticketsCltVo.lvTp160TotalMoney?ticketsCltVo.lvTp160TotalMoney:0; 
					
					// 携程
					ctripZjTotalNum =  ticketsCltVo.ctripZjTotalNum?ticketsCltVo.ctripZjTotalNum:0;
					ctripZjTotalMoney = ticketsCltVo.ctripZjTotalMoney?ticketsCltVo.ctripZjTotalMoney:0;
					ctripTp120TotalNum = ticketsCltVo.ctripTp120TotalNum?ticketsCltVo.ctripTp120TotalNum:0;
					ctripTp120TotalMoney = ticketsCltVo.ctripTp120TotalMoney?ticketsCltVo.ctripTp120TotalMoney:0;
					ctripTp160TotalNum = ticketsCltVo.ctripTp160TotalNum?ticketsCltVo.ctripTp160TotalNum:0;
					ctripTp160TotalMoney = ticketsCltVo.ctripTp160TotalMoney?ticketsCltVo.ctripTp160TotalMoney:0;
					
					// 去哪儿
					qnZjTotalNum = ticketsCltVo.qnZjTotalNum?ticketsCltVo.qnZjTotalNum:0;
					qnZjTotalMoney = ticketsCltVo.qnZjTotalMoney?ticketsCltVo.qnZjTotalMoney:0; 
					qnTp120TotalNum = ticketsCltVo.qnTp120TotalNum?ticketsCltVo.qnTp120TotalNum:0;
					qnTp120TotalMoney = ticketsCltVo.qnTp120TotalMoney?ticketsCltVo.qnTp120TotalMoney:0;
					qnTp160TotalNum = ticketsCltVo.qnTp160TotalNum?ticketsCltVo.qnTp160TotalNum:0;
					qnTp160TotalMoney = ticketsCltVo.qnTp160TotalMoney?ticketsCltVo.qnTp160TotalMoney:0;
					
					// 正价票
					zjTotalNum = ticketsCltVo.zjTotalNum?ticketsCltVo.zjTotalNum:0;
					zjTotalMoney = ticketsCltVo.zjTotalMoney?ticketsCltVo.zjTotalMoney:0;
					
					// 半价票
					bjTotalNum = ticketsCltVo.bjTotalNum?ticketsCltVo.bjTotalNum:0;
					bjTotalMoney = ticketsCltVo.bjTotalMoney?ticketsCltVo.bjTotalMoney:0;
					
					// 单次票
					dcTotalNum = ticketsCltVo.dcTotalNum?ticketsCltVo.dcTotalNum:0;
					dcTotalMoney = ticketsCltVo.dcTotalMoney?ticketsCltVo.dcTotalMoney:0;
					
					// 季票
					jTotalNum = ticketsCltVo.jTotalNum?ticketsCltVo.jTotalNum:0;
					jTotalMoney = ticketsCltVo.jTotalMoney?ticketsCltVo.jTotalMoney:0;
					
					// 赠票
					zTotalNum = ticketsCltVo.ztotalNum?ticketsCltVo.ztotalNum:0;
					
					// 网络票
					wlTotalNum = ticketsCltVo.wlTotalNum?ticketsCltVo.wlTotalNum:0;
					
					// 正价票-啤酒节
					zjPjjTotalNum = ticketsCltVo.zjPjjTotalNum?ticketsCltVo.zjPjjTotalNum:0;
					zjPjjTotalMoney = ticketsCltVo.zjPjjTotalMoney?ticketsCltVo.zjPjjTotalMoney:0;
					
					// 半价票-啤酒节
					bjPjjTotalNum = ticketsCltVo.bjPjjTotalNum?ticketsCltVo.bjPjjTotalNum:0;
					bjPjjTotalMoney = ticketsCltVo.bjPjjTotalMoney?ticketsCltVo.bjPjjTotalMoney:0;
					
					// 套票120
					tp120TotalNum = ticketsCltVo.tp120TotalNum?ticketsCltVo.tp120TotalNum:0;
					tp120TotalMoney = ticketsCltVo.tp120TotalMoney?ticketsCltVo.tp120TotalMoney:0;
					
					// 套票160
					tp160TotalNum = ticketsCltVo.tp160TotalNum?ticketsCltVo.tp160TotalNum:0;
					tp160TotalMoney = ticketsCltVo.tp160TotalMoney?ticketsCltVo.tp160TotalMoney:0;
					
					// 套票120 兑换
					tp120dTotalNum = ticketsCltVo.tp120dTotalNum?ticketsCltVo.tp120dTotalNum:0;
					
					// 套票160 兑换
					tp160dTotalNum = ticketsCltVo.tp160dTotalNum?ticketsCltVo.tp160dTotalNum:0;
					
					// 门口二维码购票
					xcxTotalNum = ticketsCltVo.xcxTotalNum?ticketsCltVo.xcxTotalNum:0;
					xcxTotalMoney = ticketsCltVo.xcxTotalMoney?ticketsCltVo.xcxTotalMoney:0;
					h5TotalNum = ticketsCltVo.h5TotalNum?ticketsCltVo.h5TotalNum:0;
					h5TotalMoney = ticketsCltVo.h5TotalMoney?ticketsCltVo.h5TotalMoney:0;
					
					
					
					// 收入总和
					totalMoney = ticketsCltVo.totalMoney?ticketsCltVo.totalMoney:0;
					xcxConsumeNum = ticketsCltVo.xcxConsumeNum?ticketsCltVo.xcxConsumeNum:0; // 小程序购票
					
					// 正价二维码票
					var qrCodeTicketsNumber = parseInt(xcxTotalNum) + parseInt(h5TotalNum);
					
					// 总票数
					var buyTicketsTotalNumber = parseInt(qrCodeTicketsNumber)
					+ parseInt(zjTotalNum)
					+ parseInt(bjTotalNum)
					+ parseInt(dcTotalNum)
					+ parseInt(zTotalNum);
					// 正价二维码总收入
					var qrCodeTicketsMoney = parseFloat(xcxTotalMoney) + parseFloat(h5TotalMoney);
					qrCodeTicketsMoney = qrCodeTicketsMoney.toFixed(2);
					ssgyBotString = '[玫瑰]水上公园运营[玫瑰]\n日期：'+ edate + 
										'\n总张数：' + buyTicketsTotalNumber + 
										'张\n正价二维码票: ' + qrCodeTicketsNumber + '张/' + qrCodeTicketsMoney + 
										'元\n全价票：' + zjTotalNum + 
										'张\n半价票：' + bjTotalNum + 
										'张\n水世界：' + dcTotalNum + 
										'张\n消夏季票：' + zTotalNum +'张';
					room.say(ssgyBotString);
				})
			});
			
			req.on('error', (e) => {
			  console.error(`problem with request: ${e.message}`);
			});
			
			req.end();
		}
	}	
}

module.exports = {ssgybsRoomDeal};