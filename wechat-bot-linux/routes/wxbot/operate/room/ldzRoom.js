var wechat = require('../mybot.js');
const { FileBox } = require('file-box');
const fs = require('fs');


async function ldzRoomDeal(msg){
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
		if(content.indexOf('每日工作汇报') != -1 && content.indexOf('*') != -1){
			let path = require('path');
			var allMember = await room.memberAll();
			fs.readFile(path.resolve(__dirname, '../jsonData/work.json'), 'utf8', function(err, data){
				if(err){
		            return console.error(err);
		       	}
				var jsonData = data.toString();
				jsonData = JSON.parse(jsonData);
				var reportMember = jsonData.reportMember;
				if(reportMember.length == 0){
					reportMember.push(contact.payload.name);
				}else{
					if(reportMember.indexOf(contact.payload.name) == -1){
						reportMember.push(contact.payload.name);
					}
				}
				var memberList = jsonData.memberList;
				var year = new Date().getFullYear();
				var month = new Date().getMonth();
				var day = new Date().getDate();
				if(memberList.length == 0){
					for(var i = 0; i < allMember.length; i++){
//						if(allMember[i].payload.name != '芝麻👼' && allMember[i].payload.name != '赵文旺' && allMember[i].payload.name != '客服'){
						if(allMember[i].payload.name != '技术支撑-小享'){
							var name = allMember[i].payload.name;
							var performanceNum;
							var createDate;
							if(name == contact.payload.name){
								performanceNum = 1;
								createDate = year + '-' + month + '-' + day; 
							}else{
								performanceNum = 0;
								createDate = '0';
							}
							var userPerformance = {
								name: name,
								performanceNum: performanceNum,
								createDate: createDate
							};
							memberList.push(userPerformance);
						}
					}
				}else{
					for(var i = 0; i < memberList.length; i++){
						if(memberList[i].name == contact.payload.name){
							var userPerformance = memberList[i];
							if(userPerformance.createDate != year + '-' + month + '-' + day){
								var performanceNum = userPerformance.performanceNum;
								performanceNum += 1;
								userPerformance.performanceNum = performanceNum;
								userPerformance.createDate = year + '-' + month + '-' + day;
								memberList[i] = userPerformance;
							}
						}
					}
				}
				var writeData = {"reportMember": reportMember, "memberList":memberList};
				writeData = JSON.stringify(writeData);
				console.log(writeData);
				fs.writeFile(path.resolve(__dirname, '../jsonData/work.json'), writeData,function(err){
		            if(err){
		                console.error(err);
		            }
		        })
			})		
		}
	}
}

module.exports = {ldzRoomDeal}