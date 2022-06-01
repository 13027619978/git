var faceUrl;
var heightValue;
var weightValue;
function selectImg(that){
	var imgSrc = window.URL.createObjectURL(document.getElementsByClassName('face-modal-input')[0].files[0]);
	$('.face-upload-img').attr('src', imgSrc);
	$('.face-upload-img').cropper({
	  aspectRatio: 1 / 1
	});
	$('.face-modal').hide();
	$('.face-upload-modal').css({
		'display': 'flex'
	});
}

function imgClick(){
	$('.face-modal').css({
		'display': 'flex'
	});
}

function closeClick(){
	$('.face-modal').hide();
}

// 获取短信验证码
function smscodeClick(){
	var phone = $('.phone').val();
	if(phone){
		if(phone.length != 11){
			layer.alert('请输入正确的手机号!');
		}else{
			app.getAjax('register/smscode', {
				telephone: phone
			}, function(res){
				console.log(res);
				layer.msg(res.message);
				if(res.success){
					$('.yzmBtn').attr('onclick', '').addClass('disabled').text('重新发送('+res.data.expires+'s)');
					var second = parseInt(res.data.expires);
					var myInter = setInterval(function(){
						second -= 1;
						$('.yzmBtn').text('重新发送('+second+'s)');
						if(second == 0){
							$('.yzmBtn').text('获取验证码');
							$('.yzmBtn').attr('onclick', 'smscodeClick()').removeClass('disabled');
							clearInterval(myInter);
						}
					},1000);
				}
			})
		}
	}else{
		layer.alert('请先输入手机号！');
	}
}


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
				app.filePostAjax('register/face/upload', fileData, function(res){
					layer.closeAll();
					if(res.success){
						faceUrl = res.data.url;
						$('.userImg').attr('src', faceUrl);
					}else{
						faceUrl = '';
						layer.msg(res.message);
						$('.userImg').attr('src', './img/user.png');
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

// 身高输入
function onHeightInput(that){
	console.log($(that).val())
	heightValue = $(that).val();
	if(weightValue){
		$('.userBmi').text('您的BMI:' + parseFloat(weightValue / (heightValue / 100 * heightValue / 100)).toFixed(1))
	}
}

// 体重输入
function onWeightInput(that){
	console.log($(that).val())
	weightValue = $(that).val();
	if(heightValue){
		$('.userBmi').text('您的BMI:' + parseFloat(weightValue / (heightValue / 100 * heightValue / 100)).toFixed(1))
	}else{
		
	}
}


function cancelClick(){
	$('.face-upload-modal').hide();
	$('.face-modal').hide();
	$('.face-modal-input').val('');
	$('.face-upload-img').cropper('destroy');
}

function submit(){
	$('.subBtn').attr('onclick', '');
	var userName = $('.userName').val();
	var userSex = $('.userSex').val();
	// var userAge = $('.userAge').val();
	// var userHeight = $('.userHeight').val();
	// var userWeight = $('.userWeight').val();
	var userPhone = $('.phone').val();
	var smsCode = $('.smsCode').val();
	if(userName && userSex && userPhone && smsCode && faceUrl){
		var bmiValue = parseFloat(weightValue / (heightValue / 100 * heightValue / 100)).toFixed(1);
		app.postAjax('register/face/apply',{
			userName: userName,
			userSex: userSex,
			userPhone: userPhone,
			faceUrl: faceUrl,
			smsCode: smsCode
		}, function(res){
			app.setCookie('faceUrl', faceUrl);
			if(res.success){
				app.getAjax('pub/lcd/userInfoByPhone', {
					userPhone: userPhone
				},function(res){
					$('.subBtn').attr('onclick', 'submit()');
					if(res.success){
						window.location.href = 'https://smart-ideas.com.cn/wisdomWeb/share/?userId=' + res.data.userId + '&faceUrl=' + res.data.faceUrl;
					}
				})
				// window.location.href = 'https://smart-ideas.com.cn/wisdomWeb/login/';
			}else{
				layer.alert(res.message);
			}
		})
	}else{
		$('.subBtn').attr('onclick', 'submit()');
		if(!userName){
			layer.alert('请先输入姓名！');
			return;
		}
		// if(!userAge){
		// 	layer.alert('请先输入年龄！');
		// 	return;
		// }
		// if(!userHeight){
		// 	layer.alert('请先输入身高！');
		// 	return;
		// }
		// if(!userWeight){
		// 	layer.alert('请先输入体重！');
		// 	return;
		// }
		if(!userPhone){
			layer.alert('请先输入手机号！');
			return;
		}
		if(!smsCode){
			layer.alert('请先输入验证码！');
			return;
		}
		if(!faceUrl){
			layer.alert('请先输入上传人脸照！');
			return;
		}
	}
}