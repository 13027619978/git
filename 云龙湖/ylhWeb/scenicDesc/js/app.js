app = {
	root:"https://hd.smart-ideas.com.cn/xwhpark/",
	
	wxUserInfo:function(success){
		
		var enterpriseCode = app.getQueryString('enterpriseCode');
		var ticketGroupNum = app.getQueryString('ticketGroupNum');
		if(enterpriseCode && ticketGroupNum){
			app.setCookie('enterpriseCode', enterpriseCode);
			app.setCookie('ticketGroupNum', ticketGroupNum);
		}
		// 什刹海门号
		var door = app.getQueryString('door');
		if(door){
			app.setCookie('door', door);
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
	getAreaId: function(areaName){
		var areaId;
		if(areaName == '北京市'){
			areaId = 110000;
		}else if(areaName == '天津市'){
			areaId = 120000;
		}else if(areaName == '河北省'){
			areaId = 130000;
		}else if(areaName == '山西省'){
			areaId = 140000;
		}else if(areaName == '内蒙古自治区'){
			areaId = 150000;
		}else if(areaName == '辽宁省'){
			areaId = 210000;
		}else if(areaName == '吉林省'){
			areaId = 220000;
		}else if(areaName == '黑龙江省'){
			areaId = 230000;
		}else if(areaName == '上海市'){
			areaId = 310000;
		}else if(areaName == '江苏省'){
			areaId = 320000;
		}else if(areaName == '浙江省'){
			areaId = 330000;
		}else if(areaName == '安徽省'){
			areaId = 340000;
		}else if(areaName == '福建省'){
			areaId = 350000;
		}else if(areaName == '江西省'){
			areaId = 360000;
		}else if(areaName == '山东省'){
			areaId = 370000;
		}else if(areaName == '河南省'){
			areaId = 410000;
		}else if(areaName == '湖北省'){
			areaId = 420000;
		}else if(areaName == '湖南省'){
			areaId = 430000;
		}else if(areaName == '广东省'){
			areaId = 440000;
		}else if(areaName == '广西壮族自治区'){
			areaId = 450000;
		}else if(areaName == '海南省'){
			areaId = 460000;
		}else if(areaName == '四川省'){
			areaId = 510000;
		}else if(areaName == '贵州省'){
			areaId = 520000;
		}else if(areaName == '云南省'){
			areaId = 530000;
		}else if(areaName == '西藏自治区'){
			areaId = 540000;
		}else if(areaName == '重庆市'){
			areaId = 500000;
		}else if(areaName == '陕西省'){
			areaId = 610000;
		}else if(areaName == '甘肃省'){
			areaId = 620000;
		}else if(areaName == '青海省'){
			areaId = 630000;
		}else if(areaName == '宁夏回族自治区'){
			areaId = 640000;
		}else if(areaName == '新疆维吾尔自治区'){
			areaId = 650000;
		}else if(areaName == '香港特别行政区'){
			areaId = 810000;
		}else if(areaName == '东城区'){
			areaId = 110101;
		}else if(areaName == '西城区'){
			areaId = 110102;
		}else if(areaName == '崇文区'){
			areaId = 110103;
		}else if(areaName == '宣武区'){
			areaId = 110104;
		}else if(areaName == '朝阳区'){
			areaId = 110105;
		}else if(areaName == '丰台区'){
			areaId = 110106;
		}else if(areaName == '石景山区'){
			areaId = 110107;
		}else if(areaName == '海淀区'){
			areaId = 110108;
		}else if(areaName == '门头沟区'){
			areaId = 110109;
		}else if(areaName == '燕山区'){
			areaId = 110110;
		}else if(areaName == '房山区'){
			areaId = 110111;
		}else if(areaName == '通州区'){
			areaId = 110112;
		}else if(areaName == '顺义区'){
			areaId = 110113;
		}else{
			areaId = '未知';
		}
		
		return areaId;
	}
}
