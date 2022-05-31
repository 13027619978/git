var scale =  window.innerHeight / ($('.fullScreen').height() + 20);
$('.fullScreen').css({
	'transform': 'scaleY(.96)'
})
// 当前站点
var siteId = app.getQueryString('siteId');
siteId = siteId?siteId:'0';

switch(siteId){
	case '1':
		$('.siteNameTitle').text('当前站点：假山瀑布站')
	break;
	
	case '2':
		$('.siteNameTitle').text('当前站点：月季园站')
	break;
	
	case '3':
		$('.siteNameTitle').text('当前站点：菱州站')
	break;
	
	case '4':
		$('.siteNameTitle').text('当前站点：樱州站')
	break;
	
	case '5':
		$('.siteNameTitle').text('当前站点：蒲仙岛站')
	break;
	
	case '6':
		$('.siteNameTitle').text('当前站点：梁州渡口码头站')
	break;
	
	case '7':
		$('.siteNameTitle').text('当前站点：白苑站')
	break;
	
	case '8':
		$('.siteNameTitle').text('当前站点：莲花广场站')
	break;
}

// 创建地图实例
var map = new AMap.Map("container", {
    zoom: 14.5,
    center: [118.800223, 32.072163],
    resizeEnable: false,
	zoomEnable:false,
	dragEnable: false
});
initMap(map);


$('.weatherTxt').text('123445');
// 获取天气信息
$.ajax({
	url:'https://restapi.amap.com/v3/weather/weatherInfo?key=773c4e4c196eb78e21f220e7e14160d2&extensions=all&city=320100',
	type:"GET",
	success:function(data){
		console.log(data);
		$('.weatherTxt').text('今日 ' + data.forecasts[0].casts[0].dayweather  + ' ' + data.forecasts[0].casts[0].nighttemp + '~' + data.forecasts[0].casts[0].daytemp + '℃')
	}
});

// 初始化时间
setInterval(function(){
	var year = new Date().getFullYear();
	var month = new Date().getMonth() + 1;
	month = month<10?'0'+month:month;
	var day = new Date().getDate();
	day = day<10?'0'+day:day;
	var hour = new Date().getHours();
	hour = hour<10?'0'+hour:hour;
	var minutes = new Date().getMinutes();
	minutes = minutes<10?'0'+minutes:minutes;
	var seconds = new Date().getSeconds();
	seconds = seconds<10?'0'+seconds:seconds;
	$('.dateTxt').text(year+'/'+month+'/'+day+' '+hour+':'+minutes+':'+seconds);
}, 1000);


// // 获取线路站点信息
app.getAjax('/battery/name/get', {
	lineNum: 'LINE20210324110102667'
}, function(res){
	if(res.code == 'SUCCESS'){
		var siteList = res.data;
		var siteIdList = [];
		siteList.forEach(function(value, key){
			siteIdList.push(value.id);
			$('.siteList').eq(0).append(
				'<div class="siteItem">'+
					'<div class="site">'+
						'<img src="img/site-unSelect.png" >'+
						'<p class="siteName">'+ value.siteName +'</p>' +
						// '<p class="carInfo">xx分钟 xx空位</p>'+
					'</div>'+
				'</div>'
			)
		})
		
		setInterval(function(){
			initMap(map);
			app.getAjax('/battery/last/get', {
				siteId: siteId
			}, function(res){
				console.log(res);
				$('.nextCar p').eq(0).text('下班车：预计'+ res.data.time +'分钟'+ res.data.restNumber +'空位');
			})
		}, 10000);
	}
})


function initMap(map){
	app.getAjax('/batteryDataView/getLocation', {}, function(res){
		var resLength = 0;
		resLength += res.length;
		var markers = [];
		if(res.length > 0){
			res.forEach(function(value, key){
				var lnglat = value.location;
				var icon = new AMap.Icon({
				    size: new AMap.Size(15, 45),    // 图标尺寸
				    image: './img/dpcIcon.png',  // Icon的图像
				    imageOffset: new AMap.Pixel(0, 25),  // 图像相对展示区域的偏移量，适于雪碧图等
				    imageSize: new AMap.Size(15, 15)   // 根据所设置的大小拉伸或压缩图片
				});
				// 创建点实例
				var lng = lnglat.split(',')[0];
				var lat = lnglat.split(',')[1];
				var gps = [lng, lat];
				new AMap.convertFrom(gps, 'gps', function (status, result) {
				  if (result.info === 'ok') {
				    var lnglats = result.locations;
					var marker = new AMap.Marker({
					    position: new AMap.LngLat(lnglats[0].lng, lnglats[0].lat),
					    icon: icon
					});
					markers.push(marker);
				  }
				});
			})
			var myInter = setInterval(function(){
				if(markers.length == resLength){
					map.clearMap();
					// 创建覆盖物群组，并将 marker 传给 OverlayGroup
					overlayGroups = new AMap.OverlayGroup(markers);
					map.add(overlayGroups);
					clearInterval(myInter);
				}
			}, 100);
		}
	})
}