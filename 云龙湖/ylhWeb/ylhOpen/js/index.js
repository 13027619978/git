$(function(){
	//防止页面后退
	history.pushState(null, null, document.URL);
	window.addEventListener('popstate', function () {
		wx.closeWindow();
	});
	app.wxUserInfo(function(){
		// layer.load(2);
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

function scanClick(){
	wx.scanQRCode({
	  needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
	  scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
	  success: function (res) {
	    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
		var qrCode = result.split('code=')[1];
		if(qrCode.indexOf('&type=') != -1){
			qrCode = qrCode.split('&type=')[0];
		}
		$('.code').val(qrCode);
	  }
	});
}

function openClick(){
	var code = $('.code').val();
	if(!code){
		layer.alert('请扫码获取编号');
		return;
	}
	app.getAjax('deviceRobot/sendShipCommand', {
		deviceSn: code,
		type: 'open'
	}, function(res){
		layer.alert(res.msg);
	})
}

function closeClick(){
	var code = $('.code').val();
	if(!code){
		layer.alert('请扫码获取编号');
		return;
	}
	app.getAjax('deviceRobot/sendShipCommand', {
		deviceSn: code,
		type: 'close'
	}, function(res){
		layer.alert(res.msg);
	})
}
