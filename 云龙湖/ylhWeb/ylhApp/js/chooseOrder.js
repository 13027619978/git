function orderClick(deviceType){
	if(deviceType == '1'){
		window.location.href = 'order.html?deviceType=1';
	}else if(deviceType == '2'){
		window.location.href = 'carTicketsOrder.html';
	}else{
		window.location.href = 'boatTicketsOrder.html';
	}
};