app={
	getQueryString:function(value){
		var reg = new RegExp("(^|&)" + value + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return encodeURI(encodeURI(r[2]));
		} else {
			return null;
		}
	}
}
