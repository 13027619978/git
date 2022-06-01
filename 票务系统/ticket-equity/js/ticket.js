var headPicUrl;

$(function(){
	app.wxUserInfo(function(){
		app.getTicketInfo();
	})
})

// 选择头像
function selectImg(that){
	var imgSrc = window.URL.createObjectURL(document.getElementsByClassName('selectImg')[0].files[0]);
	$('.face-upload-img').attr('src', imgSrc);
	$('.face-upload-img').cropper({
	  aspectRatio: 1 / 1
	});
	$('.face-modal').hide();
	$('.face-upload-modal').css({
		'display': 'flex'
	});
}

// 个人照片预览
function previewSure(){
	$('.face-preview-modal').hide();
}

// 提交个人照片
function imgSubmit(){
	var i = 0;
	if(i == 0){
		layer.load('1');
		i += 1;
	}
	
	var myInter = setInterval(function(){
		if(i == 1){
			var result= $('.face-upload-img').cropper("getCroppedCanvas", {"width": 300, "height": 300});
			$('.container').append(result);
			var imgBase = document.getElementsByTagName('canvas')[0].toDataURL("image/png");
			var myForm = document.getElementById("myForm");
			var fileData = new FormData(myForm);
			fileData.append('file', base64ToFile(imgBase), base64ToFile(imgBase).name);
			console.log(fileData.get('file'));
			$(result).remove();
			$('.face-modal-input').val('');
			$('.face-upload-img').cropper('destroy');
			$('.face-upload-modal').hide(function(){
				app.cdcPostAjax(fileData, function(res){
					if(res.success){
						app.filePostAjax('order/uploadHeadImg', fileData, function(res){
							if(res.success){
								headPicUrl = res.data;
								$('.imgView p').text('重新上传');
								$('.imgView img').attr('src', headPicUrl);
								$('.face-preview-img').attr('src', headPicUrl);
								$('.face-preview-modal').css({
									"display": "flex"
								});
								app.setCookie('headPicUrl', headPicUrl);
								layer.closeAll();
							}else{
								layer.closeAll();
								layer.msg(res.message);
							}
						})
					}else{
						layer.closeAll();
						layer.msg('请上传个人正面免冠照片');
					}
				})
			});
			clearInterval(myInter);
		}
	}, 500)
}

function base64ToFile(dataurl){
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	while(n--){
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], 'a.png', {type:mime});
}

// 在线支付
function payClick(payType){
	var name = $('.name').val();
	var phone = $('.phone').val();
	var idCard = $('.idCard').val();
	if(name && phone && idCard && headPicUrl){
		if(phone.length != 11){
			layer.alert('请输入正确的手机号');
			return;
		}
		if(idCard.length != 18){
			layer.alert('请输入正确的身份证号');
			return;
		}
		app.postAjax('orderEquity/receive', {
			ticketOrderId: app.getCookie('ticketInfoId'),
			openId: app.getCookie('openid'),
			headPicUrl: headPicUrl,
			phone: phone,
			userName: name,
			certNumber: idCard
		}, function(res){
			if(res.success){
				window.location.href = 'nkDetail.html?ticketId=/' + app.getCookie('ticketInfoId') + '/';
			}else{
				layer.alert(res.message);
			}
		})
	}else{
		if(!name){
			layer.alert('请先输入姓名');
			return;
		}
		if(!phone){
			layer.alert('请先输入手机号');
			return;
		}
		if(!idCard){
			layer.alert('请先输入身份证号');
			return;
		}
		if(!headPicUrl){
			layer.alert('请先上传头像');
			return;
		}
	}
}

// 查看订单
function orderClick(){
	window.location.href = 'order.html';
}