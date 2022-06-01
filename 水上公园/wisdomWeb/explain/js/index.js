$(function(){
	resetFontSize();
})

function resetFontSize() {
	var baseFontSize = 100;
	var designWidth = 750;
	var width = window.innerWidth;
	var currentFontSize = (width / designWidth) * baseFontSize;
	document.getElementsByTagName('html')[0].style.fontSize = currentFontSize + 'px';
}
window.onresize = function () {
	resetFontSize();
	getChartInfo();
};

function btnClick(id){
	$('.myAudio').attr('src', './audio/' + id + '.mp3');
	$('#myAudio')[0].play();
}