app = {
	root:"http://rent.smart-ideas.com.cn/ylhpark/",
	
	getQueryString:function(value){
		var reg = new RegExp("(^|&)" + value + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return encodeURI(encodeURI(r[2]));
		} else {
			return null;
		}
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
