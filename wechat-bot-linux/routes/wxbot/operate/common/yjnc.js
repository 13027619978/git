const http = require('http');
const host = "lease.smart-ideas.com.cn";
const axios = require('axios');
const { group } = require('console');

function getCheckTotal(room){
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var hour = nowDate.getHours();
	hour = hour>9?hour:'0'+hour;
	var minutes = nowDate.getMinutes();
	minutes = minutes>9?minutes:'0'+minutes;
	var seconds = nowDate.getSeconds();
	seconds = seconds>9?seconds:'0'+seconds;
	var sDate = year + '-' + month + '-' + day + ' 00:00:00';
	var eDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	var searchSdate = encodeURI(sDate);
	var searchEdate = encodeURI(eDate);
	let groupList = [
		'TGN20221206141339019',
		'TGN20221222182722856',
		'TGN20221227164943714',
		'TGN20221222134157340',
		'TGN20221220202852819',
		'TGN20221220141937408',
		'TGN20221214110015292',
		'TGN20221219133406523',
		'TGN20221220120201909'
	]
	let reqNumber = 0;
	var botString = '*****冰场总核销报数*****\n日期:'+eDate +'\n';
	let botList = '';
	let totalNumber = 0;
	let totalMoney = 0;
	groupList.forEach(function(value, key){
		var parkName = '';
		if(value == 'TGN20221206141339019'){
			parkName = '紫竹院宇嘉'
		}else if(value == 'TGN20221222182722856'){
			parkName = '圆明园冰场宇嘉'
		}else if(value == 'TGN20221227164943714'){
			parkName = '圆明园雪场宇嘉'
		}else if(value == 'TGN20221222134157340'){
			parkName = '颐和园宇嘉'
		}else if(value == 'TGN20221220202852819'){
			parkName = '南海子宇嘉'
		}else if(value == 'TGN20221220141937408'){
			parkName = '陶然亭宇嘉'
		}else if(value == 'TGN20221214110015292'){
			parkName = '温榆河宇嘉'
		}else if(value == 'TGN20221219133406523'){
			parkName = '什刹海宇嘉'
		}else if(value == 'TGN20221220120201909'){
			parkName = '北海宇嘉'
		}
		axios.get('http://boss.smart-ideas.com.cn/ticketApi/robotCollection/check/name/get?enterpriseCode=TgsEpcYj&ticketGroupNum=' + value + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate + '&ticketSalesChannelsNum=TC')
			.then(function(res){
				let parkTotalNumber = 0;
				let parkTotalMoney = 0;
				res.data.data.forEach(function(ticket, ticketKey){
					totalNumber += parseInt(ticket.checkQuantity);
					totalMoney += parseInt(ticket.checkMoney);
					// 单景区
					parkTotalNumber += parseInt(ticket.checkQuantity);
					parkTotalMoney += parseInt(ticket.checkMoney);
				})
				botList += parkName + '：\n总张数' + parkTotalNumber + '张   总金额：' + parkTotalMoney + '元\n';
				reqNumber += 1;
			})
			.catch(function(err){
				console.log(err);
			})
	})
	
	let myInter = setInterval(function(){
		if(reqNumber == groupList.length){
			clearInterval(myInter);
			botString += '总检票：' + totalNumber + '张\n';
			botString += '总检票金额：' + parseFloat(totalMoney).toFixed(2) + '元\n';
			botString += '--------------------\n';
			botString += botList;
			room.say(botString);
		}
	}, 300)
}

function getCheckTicketInfo(ticketGroupNum, room){
	var parkName = '';
	if(ticketGroupNum == 'TGN20221206141339019'){
		parkName = '紫竹院宇嘉'
	}else if(ticketGroupNum == 'TGN20221222182722856'){
		parkName = '圆明园冰场宇嘉'
	}else if(ticketGroupNum == 'TGN20221227164943714'){
		parkName = '圆明园雪场宇嘉'
	}else if(ticketGroupNum == 'TGN20221222134157340'){
		parkName = '颐和园宇嘉'
	}else if(ticketGroupNum == 'TGN20221220202852819'){
		parkName = '南海子宇嘉'
	}else if(ticketGroupNum == 'TGN20221220141937408'){
		parkName = '陶然亭宇嘉'
	}else if(ticketGroupNum == 'TGN20221214110015292'){
		parkName = '温榆河宇嘉'
	}else if(ticketGroupNum == 'TGN20221219133406523'){
		parkName = '什刹海宇嘉'
	}else if(ticketGroupNum == 'TGN20221220120201909'){
		parkName = '北海宇嘉'
	}
	
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1;
	month = month>9?month:'0'+month;
	var day = nowDate.getDate();
	day = day>9?day:'0'+day;
	var hour = nowDate.getHours();
	hour = hour>9?hour:'0'+hour;
	var minutes = nowDate.getMinutes();
	minutes = minutes>9?minutes:'0'+minutes;
	var seconds = nowDate.getSeconds();
	seconds = seconds>9?seconds:'0'+seconds;
	var sDate = year + '-' + month + '-' + day + ' 00:00:00';
	var eDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	var searchSdate = encodeURI(sDate);
	var searchEdate = encodeURI(eDate);
	let options;
	options = {
		hostname: 'boss.smart-ideas.com.cn',
		path: '/ticketApi/robotCollection/check/name/get?enterpriseCode=TgsEpcYj&ticketGroupNum=' + ticketGroupNum + '&checkStartTime=' + searchSdate + '&checkEndTime=' + searchEdate + '&ticketSalesChannelsNum=TC',
		method: 'GET'
	};
	
	const req = http.request(options, (res) => {
		res.on('data', (d) => {
			var res = JSON.parse(d.toString());
			var checkList = res.data;
			var botString = '*****'+ parkName +'核销报数*****\n日期:'+eDate +'\n';
			var ListString = '';
			var totalMoney = 0;
			var totalNumber = 0;
			if(checkList.length > 0){
				checkList.forEach(function(value, key){
					var money = parseFloat(value.checkMoney);
					var number = parseInt(value.checkQuantity);
					var ticketName = value.name;
					totalMoney += money;
					totalNumber += number;
					ListString += ticketName + '：' + number + '张   ' + money.toFixed(2) + '元\n';
				})
			}
			botString += '总检票：' + totalNumber + '张\n';
			botString += '总检票金额：' + parseFloat(totalMoney).toFixed(2) + '元\n';
			botString += '--------------------\n';
			
			botString += ListString;
			room.say(botString);
		});
	});
	
	req.on('error', (e) => {
	  console.error(`problem with request: ${e.message}`);
	});
	
	req.end();
}

module.exports = {
	getCheckTicketInfo,
	getCheckTotal
}