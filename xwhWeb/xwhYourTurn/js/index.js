$(function(){
	
})

function scenicChange(that){
	var scenicId = $(that).val();
	if(scenicId != 0){
		layer.load(1);
		app.getAjax('datav/xwh/getQueueNumber?scenicId=' + scenicId, {}, function(res){
			layer.closeAll();
			if(res.code == 'success'){
				$('.queueNumber').text(res.data.queueNumber);
			}else{
				layer.alert(res.msg);
			}
		})
	}
}

function addClick(){
	var scenicId = $('.scenicId').val();
	if(scenicId == '0'){
		layer.alert('请先选择码头!');
		return;
	}
	$('.addBtn').attr('onclick', '');
	app.getAjax('datav/xwh/addQueueNumber?scenicId=' + scenicId, {}, function(res){
		console.log(res);
		if(res.code == 'success'){
			$('.queueNumber').text(res.data.queueNumber);
			$('.addBtn').attr('onclick', 'addClick()');
		}else{
			layer.alert(res.msg);
			$('.addBtn').attr('onclick', 'addClick()');
		}
	});
	
}