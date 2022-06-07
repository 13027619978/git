function orderClick(deviceType){
	if(deviceType == '1' || deviceType == '2'){
		window.location.href = 'order.html?deviceType=' + deviceType;
	}else{
		window.location.href = 'boatTicketsOrder.html';
	}
};