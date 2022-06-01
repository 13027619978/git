var __cache={};

exports.cache=(function(){

    var o=new Object();

    o.addCache=function(cacheName,value,time){
        var t=time?time:60000;
        var name=cacheName;
        __cache[name]=value;
        setTimeout(function(){ 
            delete __cache[name];
        },t);
    }
    o.getCache=function(cacheName){
        return __cache[cacheName];
    }   

    o.delCache=function(cacheName){
        delete __cache[cacheName];
    }
    return o;
})();