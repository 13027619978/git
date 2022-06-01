app = {
	root:"https://restapi.amap.com/",
	
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
	postAjax:function(root,u,params,callback){
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
	getAjax:function(url,params,callback){
		$.ajax({
	        url:url,
	        type:"GET",
	        data:params,
	        success:function(data){
	        	callback(data);
	        }
	    });
	},
}
