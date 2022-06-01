$(function(){
	var userId = app.getQueryString('userId');
	var one_far = false;
	var two_far = false;
	var three_far = false;
	var four_far = false;
	var five_far = false;
	var one_day = false;
	var two_day = false;
	var three_day = false;
	var one_step = false;
	var two_step = false;
	var three_step = false;
	var four_step = false;
	app.getAjax('getMedalInfo', {userId: userId}, function(res){
		var totalFar = parseInt(res.data.totalFar);
		var days = parseInt(res.data.days);
		var step = parseInt(res.data.totalFar) / 0.6;
		if(totalFar >= 5000){
			one_far = true;
		}
		if(totalFar >= 10000){
			two_far = true;
		}
		if(totalFar >= 21000){
			three_far = true;
		}
		if(totalFar >= 42000){
			four_far = true;
		}
		if(totalFar >= 100000){
			five_far = true;
		}
		if(step >= 10000){
			one_step = true;
		}
		if(step >= 100000){
			two_step = true;
		}
		if(step >= 300000){
			three_step = true;
		}
		if(step >= 1000000){
			four_step = true;
		}
		if(days >= 7){
			one_day = true;
		}
		if(days >= 21){
			two_day = true;
		}
		if(days >= 100){
			three_day = true;
		}
		console.log(two_far);
		
		getMedal(one_far, 'one_far');
		getMedal(two_far, 'two_far');
		getMedal(three_far, 'three_far');
		getMedal(four_far, 'four_far');
		getMedal(five_far, 'five_far');
		getMedal(one_day, 'one_day');
		getMedal(two_day, 'two_day');
		getMedal(three_day, 'three_day');
		getMedal(one_step, 'one_step');
		getMedal(two_step, 'two_step');
		getMedal(three_step, 'three_step');
		getMedal(four_step, 'four_step');
	})
})

function getMedal(medalType, medalName){
	if(medalType){
		$('.'+medalName + ' img').attr('src', 'img/' + medalName + '_up.png');
		$('.'+medalName + ' p').addClass('up');
	}else{
		$('.'+medalName + ' img').attr('src', 'img/' + medalName + '_not.png');
		$('.'+medalName + ' p').removeClass('up');
	}
}