function searchClick(){
	$('.tdView').html('');
	app.getAjax('/api/datav/device/recharge', {
		beginCreateTime: $('.startDate').val(),
		endCreateTime: $('.endDate').val()
	}, function(res){
		console.log(res);
		let rechargeInfo;
		res.data.forEach(function(value, key){
			if(value.deptName == '水上项目'){
				rechargeInfo = value.deviceCollectList;
			}
		})
		let rechargeOneTotal = 0;
		let rechargeTwoTotal = 0;
		let rechargeTotal = 0;
		rechargeInfo.forEach(function(value, key){
			if(value.deviceRemark != '吴东现场测试'){
				let totalMoney = value.itemCollectList[0].realCashRecharge*1 + value.itemCollectList[1].realCashRecharge*1;
				rechargeOneTotal += value.itemCollectList[0].countRecharge*1;
				rechargeTwoTotal += value.itemCollectList[1].countRecharge*1;
				rechargeTotal += value.itemCollectList[0].realCashRecharge;
				rechargeTotal += value.itemCollectList[1].realCashRecharge;
				$('.tdView').append(
					'<div class="tdItem">' +
						'<p>'+ value.deviceRemark +'</p>' +
						'<p>'+ value.itemCollectList[0].countRecharge +'</p>' +
						'<p>'+ value.itemCollectList[1].countRecharge +'</p>' +
						'<p class="dark">'+ totalMoney +'</p>' +
					'</div>'
				)
			}
		})
		$('.rechargeOne').text(rechargeOneTotal);
		$('.rechargeTwo').text(rechargeTwoTotal);
		$('.rechargeTotal').text(rechargeTotal);
	})
}