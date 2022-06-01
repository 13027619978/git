var innerAudioContext = wx.createInnerAudioContext();
// 2019节日
let holiday = [
  "20190405",
  "20190406",
  "20190407",
  "20190501",
  "20190502",
  "20190503",
  "20190504",
  "20190607",
  "20190608",
  "20190609",
  "20190913",
  "20190914",
  "20190915",
  "20191001",
  "20191002",
  "20191003",
  "20191004",
  "20191005",
  "20191006",
  "20191007"
];

// 2019补班
let workDays = [
  "20190428",
  "20190505",
  "20190929"
]

// 扫码处理事件
function scanResult(qrCode, type, app){
  let wxUserId;
  let openId = wx.getStorageSync('openId');
  wx.request({
    url: app.globalData.url + 'iotsmart/wxUserApp/verifyWxUser',
    method: 'get',
    data: {
      openId: openId
    },
    success: function (res) {
      console.log(res.data.data.id);
      if (res.data.code == 'SUCCESS') {
        wxUserId = res.data.data.id;
        if (type == "entrance-ticket") {
          // 门票
          console.log('123');
          wx.hideLoading();
          wx.navigateTo({
            url: '../tickets-buy/tickets-buy',
          })
        } else if (type == "car-ticket") {
          // 环线电瓶车
          let nowDate = new Date();
          let weekDay = nowDate.getDay();
          let nowYear = nowDate.getFullYear();
          let nowMonth = nowDate.getMonth() + 1;
          let nowDay = nowDate.getDate();
          if (nowMonth < 10) {
            nowMonth = '0' + nowMonth;
          }
          if (nowDay < 10) {
            nowDay = '0' + nowDay;
          }
          let nowDateString = nowYear + nowMonth + nowDay;
          // if (weekDay != 0 && weekDay != 6) {
          //   if (holiday.indexOf(nowDateString) == -1) {
          //     wx.showModal({
          //       title: '温馨提示',
          //       content: '请前往南门和西南门扫码租赁自驾电瓶车',
          //     })
          //     return;
          //   }
          // } else {
          //   if (workDays.indexOf(nowDateString) != -1) {
          //     wx.showModal({
          //       title: '温馨提示',
          //       content: '请前往南门和西南门扫码租赁自驾电瓶车',
          //     })
          //     return;
          //   }
          // }
          wx.request({
            url: app.globalData.url + 'iotsmart/siteOrderApp/getSiteOrderInfo',
            method: 'get',
            data: {
              wxUserId: wxUserId
            },
            success: function (res) {
              wx.hideLoading();
              if (res.data.code == 'SUCCESS') {
                wx.showModal({
                  title: '提示',
                  content: '是否检票上车？',
                  confirmText: '检票',
                  success: function (res) {
                    if (res.confirm) {
                      wx.request({
                        url: app.globalData.url + 'iotsmart/siteOrderApp/checkSites',
                        method: 'get',
                        data: {
                          wxUserId: wxUserId
                        },
                        success: function (res) {
                          console.log(res);
                          // 检票
                          if (res.data.code == 'SUCCESS') {
                            wx.showModal({
                              title: '提示',
                              content: '剩余次数' + res.data.data + '次',
                            })
                            innerAudioContext.src = '/image/success.wav';
                            innerAudioContext.play();
                          } else {
                            // 购票
                            wx.navigateTo({
                              url: '../loopCar-buy/loopCar-buy',
                            })
                          }
                        }
                      })
                    }
                  }
                })
              } else {
                // 购票
                wx.navigateTo({
                  url: '../loopCar-buy/loopCar-buy',
                })
              }
            }
          })
        } else if (type == "station") {
          // 叫车
          wx.request({
            url: app.globalData.url + 'iotsmart/siteOrderApp/callCar',
            method: 'get',
            data: {
              wxUserId: wxUserId,
              cmd: qrCode
            },
            success: function (res) {
              wx.hideLoading();
              if (res.data.data == "buy") {
                wx.showModal({
                  title: '提示',
                  content: '次数消耗完毕，是否重新购买？',
                  confirmText: '是',
                  cancelText: '否',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '../loopCar-buy/loopCar-buy',
                      })
                    }
                  }
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                })
                innerAudioContext.src = 'https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=叫车成功，请耐心等待';
                innerAudioContext.play();
              }
            }
          })
        } else if (type == "flowers") {
          // 花树木
          wx.navigateTo({
            url: '../explain/explain?qrCode=' + qrCode,
          })
          wx.hideLoading();
        } else if (type == "device") {
          // wx.showModal({
          //   content: '不在租赁时间！'
          // });
          // return;
          wx.request({
            url: app.globalData.url + 'iotsmart/deviceOrderApp/getDevicePayInfo',
            method: 'post',
            header: {
              'content-type': 'application/json'
            },
            data: {
              deviceSn: qrCode,
              openId: openId,
              wxUserId: wxUserId
            },
            success: function (res) {
              wx.hideLoading();
              let orderInfo = res.data;
              if (orderInfo.code == "SUCCESS") {
                if (orderInfo.data == "openLock") {
                  wx.showModal({
                    title: '提示',
                    content: orderInfo.msg,
                  })
                } else if (orderInfo.count == 1) {
                  // 电瓶车通断电
                  let phone = orderInfo.data;
                  let flag;
                  wx.showModal({
                    title: '提示',
                    content: '电瓶车通电或断电？',
                    confirmText: '通电',
                    cancelText: '断电',
                    success: function (res) {
                      if (res.confirm) {
                        // 通电
                        flag = 2;
                      } else {
                        // 断电
                        flag = 7;
                      }
                      wx.request({
                        url: app.globalData.url + 'iotsmart/commond/sendSimCommand',
                        method: 'post',
                        header: {
                          'content-type': 'application/json'
                        },
                        data: {
                          flag: flag,
                          phone: phone
                        },
                        success: function (res) {
                          if (res.data.code == 'SUCCESS') {
                            let msg;
                            if (flag == 2) {
                              msg = '通电成功'
                            } else {
                              msg = '断电成功'
                            }
                            wx.showToast({
                              title: msg,
                            })
                          } else {
                            wx.showModal({
                              title: '提示',
                              content: res.data.msg,
                            })
                          }
                        }
                      })
                    }
                  })
                } else if (orderInfo.count == 0 && orderInfo.data && orderInfo.data != "openLock") {
                  wx.hideLoading();
                  let payInfo = JSON.parse(orderInfo.data.res);
                  let bikeType = orderInfo.data.device.deviceType;
                  wx.setStorage({
                    key: 'payInfo',
                    data: payInfo,
                    success: function (res) {
                      if (bikeType == "0" || bikeType == "1" || bikeType == "2" || bikeType == "3") {
                        wx.request({
                          url: app.globalData.url + 'iotsmart/orderApp/getOrderListByType',
                          method: 'get',
                          data: {
                            type: 3,
                            wxUserId: wxUserId,
                            page: 1,
                            limit: 20
                          },
                          success: function (res) {
                            var orderList = res.data.data;
                            var status;
                            if (orderList.length > 0) {
                              status = orderList[0].status;
                            }
                            if (status == '0' || status == '5' || orderList.length == 0){
                              // 自驾电瓶车
                              wx.navigateTo({
                                url: '../batteryCar-buy/batteryCar-buy?price=' + orderInfo.data.scenicDevicePrice.price + '&deposit=' + orderInfo.data.scenicDevicePrice.deposit + '&orderId=' + orderInfo.data.orderId,
                              })
                            }else{
                              wx.showModal({
                                title: '提示',
                                content: '有未结算的自行车订单，请结算后在试！',
                              })
                            }
                          }
                        })
                        
                      } else if (bikeType == "4" || bikeType == "5") {
                        wx.request({
                          url: app.globalData.url + 'iotsmart/orderApp/getOrderListByType',
                          method: 'get',
                          data: {
                            type: 2,
                            wxUserId: wxUserId,
                            page: 1,
                            limit: 20
                          },
                          success: function (res) {
                            var orderList = res.data.data;
                            var status;
                            if (orderList.length > 0){
                              status = orderList[0].status;
                            }
                            if (status == '0' || status == '5' || orderList.length == 0) {
                              // 自行车
                              wx.navigateTo({
                                url: '../bike-buy/bike-buy?price=' + orderInfo.data.scenicDevicePrice.price + '&deposit=' + orderInfo.data.scenicDevicePrice.deposit + '&orderId=' + orderInfo.data.orderId,
                              })
                            } else {
                              wx.showModal({
                                title: '提示',
                                content: '有未结算的电瓶车订单，请结算后在试！',
                              })
                            }
                          }
                        })
                        
                      } else if (bikeType == "6") {
                        // 游船
                        wx.navigateTo({
                          url: '../boat-buy/boat-buy?price=' + orderInfo.data.scenicDevicePrice.price + '&deposit=' + orderInfo.data.scenicDevicePrice.deposit + '&orderId=' + orderInfo.data.orderId,
                        })
                      }
                    }
                  })
                }
              } else {
                wx.showModal({
                  title: '提示',
                  content: orderInfo.msg,
                  showCancel: false
                })
              }
            }
          })
        }
      }else{
        wx.reLaunch({
          url: '../regist/regist',
        })
      }
    }
  })
  
}

function Rad(d) {
  return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}
function getDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var b = Rad(lng1) - Rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  s = s.toFixed(2);
  return s;
}

module.exports = {
  scanResult: scanResult,
  getDistance: getDistance
}
