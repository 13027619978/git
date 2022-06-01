$(function(){
	//防止页面后退
	history.pushState(null, null, document.URL);
	window.addEventListener('popstate', function () {
		wx.closeWindow();
	});
	app.wxUserInfo(function(){
		layer.load(2);
		app.getAjax('wxAuthH5/getConfig', {
			url: window.location.href
		}, function(res){
			var das = res.data;
			wx.config({
				debug: false,
				appId: das.appid,
				timestamp: das.timestamp,
				nonceStr: das.nonceStr,
				signature: das.signature,
				jsApiList: [
					"scanQRCode"
				]
			});
		})
	});
})

wx.ready(function(){
	var deviceType = app.getCookie('deviceType');
	deviceType = sessionStorage.getItem('deviceType');
	var qrCode = app.getCookie('qrCode');
	qrCode = sessionStorage.getItem('qrCode');
	var openid = app.getCookie('openid');
	var firstEnter = app.getCookie('firstEnter'); 
	if(firstEnter == 'true'){
		app.setCookie('firstEnter', false);
		if(deviceType && qrCode && openid){
			getDeviceType(deviceType, openid, qrCode);
		}else{
			layer.closeAll();
		}
	}else{
		layer.closeAll();
	}
})

function scanClick(){
	var openid = app.getCookie('openid');
	wx.scanQRCode({
		needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
		scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
		success: function (res) {
			var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
			var qrCode = result.split('code=')[1];
			if(qrCode.indexOf('&type=') != -1){
				qrCode = qrCode.split('&type=')[0];
			}
			var deviceType = result.split('type=')[1].replace(/^\s+|\s+$/g,"");
			if(deviceType.indexOf('&code=') != -1){
				deviceType = deviceType.split('&code=')[0];
			}
			if(qrCode && deviceType){
				app.setCookie('qrCode', qrCode);
				app.setCookie('deviceType', deviceType);
				getDeviceType(deviceType, openid, qrCode);
			}
		}
	});
}

function getDeviceType(deviceType, openid, qrCode){
	switch (qrCode){
		case "1230030":
			qrCode = '1230021';
		break;
		
		case "1230021":
			qrCode = '1230022';
		break;
		
		case "1230022":
			qrCode = '1230023';
		break;
		
		case "1230023":
			qrCode = '1230024';
		break;
		
		case "1230024":
			qrCode = '1230025';
		break;
		
		// case "1230025":
		// 	qrCode = '1230026';
		// break;
		
		// case "1230026":
		// 	qrCode = '1230027';
		// break;
		
		case "1230027":
			qrCode = '1230028';
		break;
		
		case "1230028":
			qrCode = '1230029';
		break;
		
		case "1230029":
			qrCode = '1230030';
		break;
	}
	
	app.setCookie('qrCode', qrCode);
	
	console.log(qrCode);
	
	switch (deviceType){
		case "device":
			app.getAjax('deviceLeaseApp/getDeviceInfo',{
				deviceSn: qrCode,
				openId: openid
			}, function(res){
				console.log(res);
				layer.closeAll();
				if(res.code == 'SUCCESS'){
					if(res.count == '0'){
						if(res.data){
							var deviceType = res.data.device.deviceType;
							if(deviceType == '10'){
								window.location.href = 'fountain.html';
							}else{
								window.location.href = 'boat.html';
							}
						}else{
							if(res.msg){
								layer.alert(res.msg);
							}
						}
					}else if(res.count == '1'){
						var deviceId = res.data.deviceOrder.deviceId;
						var deviceOrderId = res.data.deviceOrder.id;
						var phone = res.data.deviceOrder.phone;
						layer.confirm('为您提供船只再次通电及紧急救援服务，请选择您要的服务。', {
						  btn: ['再次开锁','呼叫救援'] 
						}, function(){
							// 再次开锁
							app.getAjax('deviceApp/openLock',{deviceId: deviceId},function(res){
								layer.msg(res.msg, {
									time: 2000
								});
							});
						}, function(){
							// 呼叫救援
							// app.postAjax('deviceOrderApp/saveDeviceOrderRescue', {
							// 	deviceOrderId: deviceOrderId,
							// 	deviceId: deviceId,
							// 	phone: phone
							// }, function(res){
							// 	layer.msg(res.msg, {
							// 		time: 2000
							// 	});
							// });
							layer.alert('如需救援，请打船上救援电话');
						});
					}
				}else{
					layer.alert(res.msg);
				}
			})
		break;
		
		case "boatTickets":
			window.location.href = 'boatTickets.html?type=' + qrCode;
		break;
	}
}

