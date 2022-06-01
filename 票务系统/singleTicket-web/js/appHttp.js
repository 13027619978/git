app = {
	root:"http://boss.smart-ideas.com.cn/ticketApi/",
	
	wxUserInfo:function(success){
		var enterpriseCode = app.getQueryString('enterpriseCode');
		var ticketGroupNum = app.getQueryString('ticketGroupNum');
		var ticketId = app.getQueryString('ticketId');
		var account = app.getQueryString('account');
		var password = app.getQueryString('password');
		var token = app.getQueryString('token');
		
		if(enterpriseCode && ticketGroupNum){
			app.setCookie('enterpriseCode', enterpriseCode);
			app.setCookie('ticketGroupNum', ticketGroupNum);
			app.setCookie('ticketId', ticketId);
		}

		var indexhref = window.location.href.split('?')[0];
		if(this.getQueryString('openid')!=null && this.getQueryString('openid')!=undefined){
		 	this.setCookie('openid',this.getQueryString('openid'),{expires:24*7});
			success();
		}
		if(this.getQueryString('openid') == '' || this.getQueryString('openid') == null || this.getQueryString('openid') == 'null') {
			$.ajax({
				url: app.root + 'wxAuth/authorize',
				type: 'GET',
				data: {
					url: window.location.href.split('?')[0],
					enterpriseCode: app.getQueryString('enterpriseCode'),
					ticketGroupNum: app.getQueryString('ticketGroupNum')
				},
				success: function(res){
					layer.alert(res.message);
					app.clearAllCookie();
					return;
				}
			}).fail(function(err){
				if(!token || !password || !account){
					layer.alert('获取用户信息失败！');
					return;
				}else{
					$.ajax({
					    url:'http://node.smart-ideas.com.cn:3001/datav/xhg/checkToken',
					    type:"GET",
					    data:{
							token: token
						},
						success: function(res){
							if(res.code == 'success'){
								// 判断帐密有效性
								app.getAjax('', {
									
								}, function(res){
									if(){
										// 有效帐号
										app.setCookie('account', account);
										app.setCookie('password', password);
										window.location.replace(app.root+'wxAuth/authorize?url='+indexhref + '&enterpriseCode='+app.getCookie('enterpriseCode')+'&ticketGroupNum='+ app.getCookie('ticketGroupNum'));
									}else{
										// 无效帐号
										layer.alert(res.msg);
									}
								})
								
							}else{
								layer.alert('无效的token!');
							}
						}
					})
				}
			});
			return;
		}
	},
	
	getQueryString:function(value){
		var reg = new RegExp("(^|&)" + value + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return encodeURI(encodeURI(r[2]));
		} else {
			return null;
		}
	},
	
	setCookie:function(key, value, options){
		options = $.extend({}, {domain: '',path: '/'}, options);
	    //删除cookie操作处理
	    if (value === null) {
	        options.expires = -1;
	    }
	    //设置过期时间
	    if (typeof options.expires === 'number') {
	        var seconds = options.expires,
	        t = options.expires = new Date();
	        t.setTime(t.getTime() + seconds * 1000 * 60 * 60);
	    }
	    //强制转换为字符串格式
	    value = '' + value;
	    //设置cookie信息
	    return (document.cookie = [
	        key, '=',
	        options.raw ? value : value,
	        options.expires ? '; expires=' + options.expires.toUTCString() : '',
	        options.path ? '; path=' + options.path : '',
	        options.domain ? '; domain=' + options.domain : '',
	        options.secure ? '; secure' : ''
	    ].join(''));
	},
	
	getCookie:function(key,options){
		options = options || {};
	    var result, decode = options.raw ? function(s) {
	        return s;
	    } : decodeURIComponent;
	    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
	},
	clearAllCookie:function(){
		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
		var d = new Date();
        d.setTime(d.getTime() + (-1*24*60*60*1000));
        if(keys) {  
            for(var i = keys.length; i--;){
            	this.setCookie(keys[i], "", {expires:-1});  
            }
        } 
	},
	clearCookie:function (name) {  
	    this.setCookie(name, "", {expires:-1});  
	},
	postAjax:function(u,params,callback){
		$.ajax({
	        url:this.root + u,
	        type:"POST",
	        dataType:"json",
	        contentType:"application/json",
	        data:JSON.stringify(params),
	        success:function(data){
	        	callback(data);
	        }
	    });
	},
	filePostAjax:function(u,params,callback){
		$.ajax({
	        url:this.root + u,
	        type:"POST",
	        contentType:false,
			processData: false,
	        data:params,
	        success:function(data){
	        	callback(data);
	        }
	    });
	},
	getAjax:function(u,params,callback){
		$.ajax({
	        url:this.root + u,
	        type:"GET",
	        data:params,
	        success:function(data){
	        	callback(data);
	        }
	    });
	},
}
