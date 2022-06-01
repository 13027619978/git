function getUserId(){
	var phone = $('.phone').val();
	if(phone.length != 11){
		layer.msg('请输入正确的手机号');
	}else{
		app.getAjax('pub/lcd/userInfoByPhone', {
			userPhone: phone
		},function(res){
			console.log(res.data);
			if(res.success){
				window.location.href = 'https://smart-ideas.com.cn/wisdomWeb/share/?userId=' + res.data.userId + '&faceUrl=' + res.data.faceUrl;
			}else{
				if(res.message == '人脸用户不存在'){
					layer.confirm('是否先前往注册您的个人信息？', {
					  btn: ['注册','取消'] //按钮
					}, function(){
					  window.location.href = 'https://smart-ideas.com.cn/wisdomWeb/regist/'
					});
				}else{
					layer.alert(res.message);
				}
			}
			
		})
	}
	
	
}