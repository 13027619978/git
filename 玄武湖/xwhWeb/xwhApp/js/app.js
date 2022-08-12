app = {
	root:"http://hd.smart-ideas.com.cn/xwhpark/",
	
	wxUserInfo:function(success){
		var indexhref = window.location.href.split('?')[0];
		if(this.getQueryString('openid')!=null && this.getQueryString('openid')!=undefined){
			if(this.getQueryString('openid') != sessionStorage.getItem('openid')){
				this.setCookie('firstEnter', true);
			}
			sessionStorage.setItem('openid', this.getQueryString('openid'));
		 	this.setCookie('openid',this.getQueryString('openid'),{expires:24*7});
			success();
		}
		if(this.getQueryString('openid') == '' || this.getQueryString('openid') == null || this.getQueryString('openid') == 'null') {
			var deviceType = app.getQueryString('type');
			if(deviceType){
				app.setCookie('deviceType', deviceType);
				sessionStorage.setItem('deviceType', deviceType);
			}else{
				app.clearCookie('deviceType');
				sessionStorage.removeItem('deviceType');
			}
			var qrCode = app.getQueryString('code');
			if(qrCode){
				app.setCookie('qrCode', qrCode);
				sessionStorage.setItem('qrCode', qrCode);
			}else{
				app.clearCookie('qrCode');
				sessionStorage.removeItem('qrCode');
			}
			window.location.replace(this.root+'wxAuthH5/snsApiBase?url='+indexhref);
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
	    }).fail(function(err){
			layer.alert('数据请求失败，请联系管理员')
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
	    }).fail(function(err){
			layer.alert('数据请求失败，请联系管理员')
		});
	},
	getCardAjax:function(u,params,callback, failback){
		$.ajax({
		    url:"http://xwhykt.smart-ideas.com.cn" + u,
		    type:"GET",
		    data:params,
		    success:function(data){
		    	callback(data);
		    }
		}).fail(function(err){
			failback();
		});
	},
}
