$(function(){
	var startTime = decodeURI(decodeURI(decodeURI(app.getQueryString('startTime'))));
	var endTime = decodeURI(decodeURI(decodeURI(app.getQueryString('endTime'))));
	var despoit = app.getQueryString('despoit');
	var consume = app.getQueryString('consume');
	var refund = app.getQueryString('refund');
	
	$('.startTime').text(startTime);
	$('.endTime').text(endTime);
	$('.despoit').text(despoit);
	$('.consume').text(consume);
	$('.refund').text(refund);
})
