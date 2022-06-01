function orderClick(deviceType){
	if(deviceType == '1' || deviceType == '2'){
		window.location.href = 'order.html?deviceType=' + deviceType;
	}else if(deviceType == '3'){
		window.location.href = 'boatTicketsOrder.html';
	}else if(deviceType == '4'){
		window.location.href = 'canoeTicketsOrder.html';
	}else if(deviceType == '5'){
		window.location.href = 'lyTicketsOrder.html';
	}else if(deviceType == '6'){
		window.location.href = 'lzxTicketsOrder.html';
	}else if(deviceType == '7'){
		window.location.href = 'lzTicketsOrder.html';
	}
};