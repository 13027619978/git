$(function(){
	var enterpriseCode = app.getCookie('enterpriseCode');
	var ticketGroupNum = app.getCookie('ticketGroupNum');
	app.wxUserInfo(function(){
		layer.load(2);
		getSaleInfoList(enterpriseCode, ticketGroupNum);
	});
})

// 是否需要滑动
var scroll = false;

// 获取web产品售卖列表
function getSaleInfoList(enterpriseCode, ticketGroupNum){
	app.getAjax('ticketInfo/getSalesList', {
		enterpriseCode: enterpriseCode,
		ticketGroupNum: ticketGroupNum,
		ticketSalesChannelsNum: 'WEB'
	}, function(res){
		console.log(res);
		if(res.code == '10000'){
			layer.closeAll();
			// 鲜花港提示
			if(enterpriseCode == 'TgsEpcSlfz'){
				var noticeString = '<p>温馨提示：请您全程规范佩戴口罩，入园前配合测量体温，提前准备好您及同行人员北京健康宝查验和通信行程卡查验，谢谢配合。<br>';
				noticeString += '我承诺：<br>';
				noticeString += '1. 本人及同行人员无发热、干咳、咳痰、咽痛、乏力、腹泻、味觉异常、嗅觉异常等8类症状。<br>';
				noticeString += '2. 健康码显示“未见异常”。<br>';
				noticeString += '3. 14天内未途径有新增1例及以上本土新冠病毒感染者的县（市、区、旗）或直辖市、副省级城市的县、市、区旅居史。<br>';
				noticeString += '4. 入境满21天、完成7天健康监测且不是涉疫风险人员。<br>';
				noticeString += '5. 游园期间主动与他人保持1.5米以上安全距离、不扎堆、不聚集、全程规范佩戴口罩，遵守北京健康宝扫码登记、通信行程卡查验、测温等相关管控措施。</p>';
				layer.open({
					content: noticeString,
					btn: ['我已承诺，前往购票'],
					closeBtn: 0,
					title: '预约购票承诺书'
				});
				$('.layui-layer-title').addClass('layui-layer-title-red');
			}
			// 园博园提示
			if(enterpriseCode == 'TgsEpcYby'){
				var noticeString = '<p style="height:300px;overflow-y:auto;">尊敬的游客朋友们：<br>';
				noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前仍处在疫情防控时期，为了您与他人的健康和游览安全，请您认真阅读以下内容：<br>';
				noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一、本人承诺：近期身体健康，无发热、咳嗽等异常情况；无流行病学接触史；无中高风险地区14天以内旅居史；无境外回国隔离不满21天的情况。<br>';
				noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二、请提前1天以上在 “北京园博园见证精彩”微信公众号（官方指定购票平台）进行预约购票，实名认证入园。入园门区为：2号门、3号门、6号门。<br>';
				noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三、入园时请配合测温验码，出示北京健康宝绿码。请随身携带、科学佩戴口罩，参观游览时请保持1米以上社交距离。遇限流游览时，请有序排队，配合工作人员管理。<br>';
				noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;四、谢绝持红码、黄码的游客入园，谢绝有14天内中高风险地区旅居使人员和入境未满21天人员入园。<br>';
				noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;五、请遵守公园各项管理规定，不携带除轮椅、婴儿手推车和儿童脚踏手推车之外的其他种类轮制器械、电动平衡车、电动玩具车、电动行李箱以及各种渔具、风筝和无人飞行器入园。<br>';
				noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;六、根据《北京市控制吸烟条例》要求，园博园全面禁烟，您在园内参观游览时请勿吸烟，并提醒他人不要吸烟。<br>';
				noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;七、请遵守《北京市生活垃圾管理条例》，分类投放生活垃圾。<br>';
				noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;八、请看护好随身携带的物品，谨防丢失或被盗。<br>';
				noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;九、咨询电话：63915561<br>';
				noticeString += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;感谢您的理解与配合。</p>';
				layer.open({
					content: noticeString,
					btn: ['我已阅读，前往购票'],
					closeBtn: 0,
					title: '温馨提示'
				});
				$('.layui-layer-title').css({
					'text-align': 'center',
					'padding': '0'
				});
			}
			if(res.data.popStatus == '0'){
				layer.alert(res.data.popContent);
			}
			var scenicData = res.data;
			$('.scenicName').text(scenicData.groupName);
			$('.scenicDesc .descContent').html(scenicData.mark);
			if(!scenicData.mark){
				$('.scenicDesc').hide();
			}
			var saleInfoList = scenicData.ticketSalesInfoList;
			saleInfoList.forEach(function(value, key){
				var nowDate = new Date().getTime();
				var salesStartDate = value.buyRules.salesStartDate;
				salesStartDate = salesStartDate.replace(/-/, '/').replace(/-/, '/');
				salesStartDate = new Date(salesStartDate + ' 00:00:00').getTime();
				if(enterpriseCode == 'TgsEpcSch'){
					var nowHour = new Date().getHours();
					var nowMinutes = new Date().getMinutes();
					var ticketName = value.ticketName;
					var nowMonth = new Date().getMonth() + 1;
					var nowDay = new Date().getDate();
					var nowTime = nowMonth + '-' + nowDay;
					var holiday = [];
					var door = app.getCookie('door');
					if(holiday.indexOf(nowTime) != -1){
						if(ticketName.indexOf('节假日') != -1){
							var ticketItem = '<div class="ticketItem">' +
							'<div class="itemLeft">' +
							'<p class="ticketName">'+ value.ticketName +'<font class="ticketType">'+ value.categoryName +'</font></p>' +
							'<div class="ticketDesc">'+ value.description +'</div>' +
							'<p class="effectTime">售票日期：'+ value.buyRules.salesStartDate +'至'+ value.buyRules.salesEndDate +'</p>' +
							'</div>' +
							'<div class="itemRight">' +
							'<p class="ticketPrice">'+ value.settlePrice +'元</p>';
							// 判断开始售票时间
							if(salesStartDate <= nowDate){
								ticketItem += '<a class="buyBtn" href="javascript:;" onclick="ticketClick(/'+ value.ticketInfoId +'/)">立即预定</a>';
							}else{
								ticketItem += '<a class="buyBtn disabled" href="javascript:;">立即预定</a>';
							}
							ticketItem += '</div></div>';
							if(door == 1){
								if(value.ticketName.indexOf('一号') != -1){
									$('.ticketList').append(ticketItem);
								}
							}else if(door == 3){
								if(value.ticketName.indexOf('三号') != -1){
									$('.ticketList').append(ticketItem);
								}
							}else if(door == 6){
								if(value.ticketName.indexOf('六号') != -1){
									$('.ticketList').append(ticketItem);
								}
							}else if(door == 7){
								if(value.ticketName.indexOf('七号') != -1){
									$('.ticketList').append(ticketItem);
									console.log('123');
								}
							}else if(door == 8){
								if(value.ticketName.indexOf('八号') != -1){
									$('.ticketList').append(ticketItem);
								}
							}else if(door == 9){
								if(value.ticketName.indexOf('九号') != -1){
									$('.ticketList').append(ticketItem);
								}
							}
						}
					}else{
						if(nowHour < 17){
							if(ticketName.indexOf('日场') != -1){
								var ticketItem = '<div class="ticketItem">' +
								'<div class="itemLeft">' +
								'<p class="ticketName">'+ value.ticketName +'<font class="ticketType">'+ value.categoryName +'</font></p>' +
								'<p class="ticketDesc">'+ value.description +'</p>' +
								'<p class="effectTime">售票日期：'+ value.buyRules.salesStartDate +'至'+ value.buyRules.salesEndDate +'</p>' +
								'</div>' +
								'<div class="itemRight">' +
								'<p class="ticketPrice">'+ value.settlePrice +'元</p>';
								// 判断开始售票时间
								if(salesStartDate <= nowDate){
									ticketItem += '<a class="buyBtn" href="javascript:;" onclick="ticketClick(/'+ value.ticketInfoId +'/)">立即预定</a>';
								}else{
									ticketItem += '<a class="buyBtn disabled" href="javascript:;">立即预定</a>';
								}
								ticketItem += '</div></div>';
								if(door == 1){
									if(value.ticketName.indexOf('一号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}else if(door == 3){
									if(value.ticketName.indexOf('三号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}else if(door == 6){
									if(value.ticketName.indexOf('六号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}else if(door == 7){
									if(value.ticketName.indexOf('七号') != -1){
										$('.ticketList').append(ticketItem);
										console.log('123');
									}
								}else if(door == 8){
									if(value.ticketName.indexOf('八号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}else if(door == 9){
									if(value.ticketName.indexOf('九号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}
							}
						}else if(nowHour == 17 && nowMinutes < 30){
							if((ticketName.indexOf('六号口') != -1 || ticketName.indexOf('七号口') != -1 || ticketName.indexOf('八号口') != -1 || ticketName.indexOf('九号口') != -1) && ticketName.indexOf('日场') != -1){
								var ticketItem = '<div class="ticketItem">' +
								'<div class="itemLeft">' +
								'<p class="ticketName">'+ value.ticketName +'<font class="ticketType">'+ value.categoryName +'</font></p>' +
								'<p class="ticketDesc">'+ value.description +'</p>' +
								'<p class="effectTime">售票日期：'+ value.buyRules.salesStartDate +'至'+ value.buyRules.salesEndDate +'</p>' +
								'</div>' +
								'<div class="itemRight">' +
								'<p class="ticketPrice">'+ value.settlePrice +'元</p>';
								// 判断开始售票时间
								if(salesStartDate <= nowDate){
									ticketItem += '<a class="buyBtn" href="javascript:;" onclick="ticketClick(/'+ value.ticketInfoId +'/)">立即预定</a>';
								}else{
									ticketItem += '<a class="buyBtn disabled" href="javascript:;">立即预定</a>';
								}
								ticketItem += '</div></div>';
								if(door == 1){
									if(value.ticketName.indexOf('一号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}else if(door == 3){
									if(value.ticketName.indexOf('三号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}else if(door == 6){
									if(value.ticketName.indexOf('六号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}else if(door == 7){
									if(value.ticketName.indexOf('七号') != -1){
										$('.ticketList').append(ticketItem);
										console.log('123');
									}
								}else if(door == 8){
									if(value.ticketName.indexOf('八号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}else if(door == 9){
									if(value.ticketName.indexOf('九号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}
							}else{
								if(ticketName.indexOf('夜场') != -1){
									var ticketItem = '<div class="ticketItem">' +
									'<div class="itemLeft">' +
									'<p class="ticketName">'+ value.ticketName +'<font class="ticketType">'+ value.categoryName +'</font></p>' +
									'<p class="ticketDesc">'+ value.description +'</p>' +
									'<p class="effectTime">售票日期：'+ value.buyRules.salesStartDate +'至'+ value.buyRules.salesEndDate +'</p>' +
									'</div>' +
									'<div class="itemRight">' +
									'<p class="ticketPrice">'+ value.settlePrice +'元</p>';
									// 判断开始售票时间
									if(salesStartDate <= nowDate){
										ticketItem += '<a class="buyBtn" href="javascript:;" onclick="ticketClick(/'+ value.ticketInfoId +'/)">立即预定</a>';
									}else{
										ticketItem += '<a class="buyBtn disabled" href="javascript:;">立即预定</a>';
									}
									ticketItem += '</div></div>';
									if(door == 1){
										if(value.ticketName.indexOf('一号') != -1){
											$('.ticketList').append(ticketItem);
										}
									}else if(door == 3){
										if(value.ticketName.indexOf('三号') != -1){
											$('.ticketList').append(ticketItem);
										}
									}else if(door == 6){
										if(value.ticketName.indexOf('六号') != -1){
											$('.ticketList').append(ticketItem);
										}
									}else if(door == 7){
										if(value.ticketName.indexOf('七号') != -1){
											$('.ticketList').append(ticketItem);
										}
									}else if(door == 8){
										if(value.ticketName.indexOf('八号') != -1){
											$('.ticketList').append(ticketItem);
										}
									}else if(door == 9){
										if(value.ticketName.indexOf('九号') != -1){
											$('.ticketList').append(ticketItem);
										}
									}
								}
							}
						}else{
							if(ticketName.indexOf('夜场') != -1){
								var ticketItem = '<div class="ticketItem">' +
								'<div class="itemLeft">' +
								'<p class="ticketName">'+ value.ticketName +'<font class="ticketType">'+ value.categoryName +'</font></p>' +
								'<p class="ticketDesc">'+ value.description +'</p>' +
								'<p class="effectTime">售票日期：'+ value.buyRules.salesStartDate +'至'+ value.buyRules.salesEndDate +'</p>' +
								'</div>' +
								'<div class="itemRight">' +
								'<p class="ticketPrice">'+ value.settlePrice +'元</p>';
								// 判断开始售票时间
								if(salesStartDate <= nowDate){
									ticketItem += '<a class="buyBtn" href="javascript:;" onclick="ticketClick(/'+ value.ticketInfoId +'/)">立即预定</a>';
								}else{
									ticketItem += '<a class="buyBtn disabled" href="javascript:;">立即预定</a>';
								}
								ticketItem += '</div></div>';
								if(door == 1){
									if(value.ticketName.indexOf('一号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}else if(door == 3){
									if(value.ticketName.indexOf('三号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}else if(door == 6){
									if(value.ticketName.indexOf('六号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}else if(door == 7){
									if(value.ticketName.indexOf('七号') != -1){
										$('.ticketList').append(ticketItem);
										console.log('123');
									}
								}else if(door == 8){
									if(value.ticketName.indexOf('八号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}else if(door == 9){
									if(value.ticketName.indexOf('九号') != -1){
										$('.ticketList').append(ticketItem);
									}
								}
							}
						}
					}
				}else if(enterpriseCode == 'TgsEpcFhl'){
					// 凤凰岭
					var categoryName = value.categoryName;
					if(app.getCookie('fhlNp')){
						if(categoryName == '年票'){
							var ticketItem = '<div class="ticketItem">' +
							'<div class="itemLeft">' +
							'<p class="ticketName">'+ value.ticketName +'<font class="ticketType">'+ value.categoryName +'</font></p>' +
							'<div class="ticketDesc"></div>';
							ticketItem += '</div>' +
							'<div class="itemRight">' +
							'<p class="ticketPrice">'+ value.settlePrice +'元</p>';
							// 判断开始售票时间
							if(salesStartDate <= nowDate){
								ticketItem += '<a class="buyBtn" href="javascript:;" onclick="ticketClick(/'+ value.ticketInfoId +'/)">立即预定</a>';
							}else{
								ticketItem += '<a class="buyBtn disabled" href="javascript:;">立即预定</a>';
							}
							ticketItem += '</div></div>';
							$('.ticketList').append(ticketItem);
							$('.ticketDesc').eq(key).html('1. 年票即买即用，限本人使用，每日限使用一次。</br>2. 年票有效期至2022年12月31日。</br>3. 购买前请您仔细阅读使用说明。</br>4. 如已购买，请在右下角“我的”里面查找您所购买的年票。');
						}
					}else{
						var ticketItem = '<div class="ticketItem">' +
						'<div class="itemLeft">' +
						'<p class="ticketName">'+ value.ticketName +'<font class="ticketType">'+ value.categoryName +'</font></p>' +
						'<div class="ticketDesc"></div>';
						ticketItem += '</div>' +
						'<div class="itemRight">' +
						'<p class="ticketPrice">'+ value.settlePrice +'元</p>';
						// 判断开始售票时间
						if(salesStartDate <= nowDate){
							ticketItem += '<a class="buyBtn" href="javascript:;" onclick="ticketClick(/'+ value.ticketInfoId +'/)">立即预定</a>';
						}else{
							ticketItem += '<a class="buyBtn disabled" href="javascript:;">立即预定</a>';
						}
						ticketItem += '</div></div>';
						$('.ticketList').append(ticketItem);
						if(categoryName == '年票'){
							$('.ticketDesc').eq(key).html('1. 年票即买即用，限本人使用，每日限使用一次。</br>2. 年票有效期至2022年12月31日。</br>3. 购买前请您仔细阅读使用说明。</br>4. 如已购买，请在右下角“我的”里面查找您所购买的年票。');
						}
					}
				}else if(enterpriseCode == 'TgsEpcYby' && ticketGroupNum == 'TGN20201210095942945'){
					// 园博园活动票
					var ybyTicketName = value.ticketName;
					var ticketItem = '<div class="ticketItem">' +
					'<div class="itemLeft">' +
					'<p class="ticketName">'+ ybyTicketName +'<font class="ticketType">'+ value.categoryName +'</font></p>' +
					'<div class="ticketDesc">'+ value.description +'</div>' +
					'</div>' +
					'<div class="itemRight">' +
					'<p class="ticketPrice">'+ value.settlePrice +'元</p>';
					// 判断开始售票时间
					if(salesStartDate <= nowDate){
						ticketItem += '<a class="buyBtn" href="javascript:;" onclick="ticketClick(/'+ value.ticketInfoId +'/)">立即预定</a>';
					}else{
						ticketItem += '<a class="buyBtn disabled" href="javascript:;">立即预定</a>';
					}
					ticketItem += '</div></div>';
					
					$('.ticketList').append(ticketItem);
					// $('.ticketList').append(ticketItem);
					// $('.ticketDesc').eq(key).html(value.description);
				}else{
					var ticketItem = '<div class="ticketItem">' +
					'<div class="itemLeft">' +
					'<p class="ticketName">'+ value.ticketName +'<font class="ticketType">'+ value.categoryName +'</font></p>' +
					'<div class="ticketDesc"></div>';
					if(enterpriseCode == 'TgsEpcXhg'){
						ticketItem += '<a class="allBtn close" href="javascript:;" onclick="showAllDesc(this)"><p>展开全部</p></a>';
					}
					if(enterpriseCode != 'TgsEpcFhl'){
						ticketItem += '<p class="effectTime">售票日期：'+ value.buyRules.salesStartDate +'至'+ value.buyRules.salesEndDate +'</p>';
					}
					ticketItem += '</div>' +
					'<div class="itemRight">' +
					'<p class="ticketPrice">'+ value.settlePrice +'元</p>';
					// 判断开始售票时间
					if(salesStartDate <= nowDate){
						ticketItem += '<a class="buyBtn" href="javascript:;" onclick="ticketClick(/'+ value.ticketInfoId +'/)">立即预定</a>';
					}else{
						ticketItem += '<a class="buyBtn disabled" href="javascript:;">立即预定</a>';
					}
					ticketItem += '</div></div>';
					$('.ticketList').append(ticketItem);
					$('.ticketDesc').eq(key).html(value.description);
					if(enterpriseCode == 'TgsEpcXhg'){
						if($('.ticketDesc').eq(key).height() <= 30){
							$('.ticketDesc').eq(key).parent().find('.allBtn').hide();
						}else{
							$('.ticketDesc').eq(key).addClass('maxHeight');
						}
					}
				}
			})

			if($('.container').height() + 61 > window.screen.height){
				scroll = true;
				$('.moreView').css({
					'display': 'flex'
				})
			}
		}else if(res.code == '40002'){
			layer.closeAll();
			var scenicData = res.data;
			$('.scenicDesc').removeClass('maxHeight').css({'padding-bottom': 0});
			// if(scenicData.popStatus == '0'){
			// 	layer.alert(scenicData.popContent);
			// }
			$('.scenicName').text(scenicData.groupName);
			$('.scenicDesc').text(scenicData.tipContent);
			var saleInfoList = scenicData.ticketSalesInfoList;
			saleInfoList.forEach(function(value, key){
				var nowDate = new Date().getTime();
				var effectStartDate = value.effectStartDate;
				effectStartDate = effectStartDate.replace(/-/, '/').replace(/-/, '/');
				effectStartDate = new Date(effectStartDate + ' 00:00:00').getTime();
				var ticketItem = '<div class="ticketItem">' +
				'<div class="itemLeft">' +
				'<p class="ticketName">'+ value.ticketName +'<font class="ticketType">'+ value.categoryName +'</font></p>' +
				'<p class="ticketDesc">'+ value.description +'</p>' +
				'<p class="checkTime">检票时间：'+ value.checkRules.checkStartTime +'-'+ value.checkRules.checkEndTime +'</p>' +
				'<p class="effectTime">售票日期：'+ value.effectStartDate +'至'+ value.effectEndDate +'</p>' +
				'</div>' +
				'<div class="itemRight">' +
				'<p class="ticketPrice">'+ value.settlePrice +'元</p>';
				// 判断开始售票时间
				ticketItem += '<a class="buyBtn disabled" href="javascript:;">立即预定</a>';
				ticketItem += '</div></div>';
				$('.ticketList').append(ticketItem);
				$('.noticeText').html('<font class="ticketStatus">闭园</font>' + res.message);
				
			})
		}else{
			layer.closeAll();
			layer.msg(res.msg);
		}
	})
}

// 屏幕滑动
$(window).scroll(function(){
	if(scroll){
		$('.moreView').css({
			'display': 'none'
		})
	}
})

// 点击购票
function ticketClick(ticketInfoId){
	var enterpriseCode = app.getCookie('enterpriseCode');
	if(enterpriseCode == 'TgsEpcSch'){
		// 什刹海购票页
		window.location.href = 'schTicket.html?ticketInfoId=' + ticketInfoId;
	}else{
		window.location.href = 'ticket.html?ticketInfoId=' + ticketInfoId;
	}
}

// 展开全部
function showAll(that){
	$('.scenicDesc').toggleClass('maxHeight');
	if($('.scenicDesc').hasClass('maxHeight')){
		$(that).text('展开全部');
	}else{
		$(that).text('收起全部');
	}
	
}

// 展开全部票种介绍
function showAllDesc(that){
	$(that).parent().find('.ticketDesc').toggleClass('maxHeight');
	$(that).toggleClass('close');
	if($(that).parent().find('.ticketDesc').hasClass('maxHeight')){
		$(that).html('<p>展开全部</p>');
	}else{
		$(that).html('<p>收起全部</p>');
	}
	
}
