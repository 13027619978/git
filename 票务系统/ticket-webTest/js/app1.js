app = {
	root:"https://boss.smart-ideas.com.cn/ticketApi/",
	
	wxUserInfo:function(success){
		var enterpriseCode = app.getQueryString('enterpriseCode');
		var ticketGroupNum = app.getQueryString('ticketGroupNum');
		var fhlNp = app.getQueryString('fhlNp');
		var fhl = app.getQueryString('fhl');
		if(enterpriseCode && ticketGroupNum){
			app.setCookie('enterpriseCode', enterpriseCode);
			app.setCookie('ticketGroupNum', ticketGroupNum);
		}
		
		if(enterpriseCode == 'TgsEpcFhl'){
			if(!fhl){
				if(fhlNp){
					window.location.href = 'fhlIndex.html?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&fhlNp=' + fhlNp + '&fhl=1';
				}else{
					window.location.href = 'fhlIndex.html?enterpriseCode=' + enterpriseCode + '&ticketGroupNum=' + ticketGroupNum + '&fhl=1';
				}
			}
		}
		
		// 什刹海门号
		var door = app.getQueryString('door');
		if(door){
			app.setCookie('door', door);
		}
		
		var ybyHdp = app.getQueryString('ybyHdp');
		if(ybyHdp){
			sessionStorage.setItem('ybyHdp', ybyHdp);
		}
		
		var indexhref = window.location.href.split('?')[0];
		if(this.getQueryString('openid')!=null && this.getQueryString('openid')!=undefined){
			if(app.getCookie('gzh')){
				this.setCookie('openid',this.getQueryString('openid'),{expires:24*7});
				success();
			}else{
				if(app.getQueryString('openid') == 'oQFGJjvoMf1c6S3dUSLhfGh_wSEk'){
					window.location.href = 'https://boss.smart-ideas.com.cn/ticket-web/?enterpriseCode=TgsEpcFhl&ticketGroupNum=TGN20201228152933458&fhlNp=1&gzh=1';
				}else{
					this.setCookie('openid',this.getQueryString('openid'),{expires:24*7});
					success();
				}
			}
			
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
				if(fhlNp){
					app.setCookie('fhlNp', fhlNp);
				}else{
					app.clearCookie('fhlNp');
				}
				if(app.getQueryString('gzh')){
					app.setCookie('gzh', app.getQueryString('gzh'));
				}else{
					app.clearCookie('gzh');
				}
				window.location.replace(app.root+'wxAuth/authorize?url='+indexhref + '&enterpriseCode='+app.getCookie('enterpriseCode')+'&ticketGroupNum='+ app.getCookie('ticketGroupNum'));
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
	cdcPostAjax: function(params,callback){
		$.ajax({
		    url:'https://cdcsys.smart-ideas.com.cn/zhbd/register/face/upload',
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
