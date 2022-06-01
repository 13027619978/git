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
  console.log(type);
  // type = type.replace(/(^\s*)|(\s*$)/g, "");
  let wxUserId = wx.getStorageSync('wxUserId');
  let openId = wx.getStorageSync('openId');
  console.log(wxUserId);
  if (type == 'entrance-ticket') {
    // 门票
    wx.hideLoading();
    wx.navigateTo({
      url: '../registration/registration',
    })
  } else if (type == "ssly-ticket") {
    // 水上乐园门票
    wx.hideLoading();
    wx.navigateTo({
      url: '../sslyTickets-buy/sslyTickets-buy',
    })
  } else if (type == "flowers") {
    // 花树木
    wx.navigateTo({
      url: '../explain/explain?qrCode=' + qrCode,
    })
    wx.hideLoading();
  } else if (type == "map"){
    // 地图
    wx.navigateTo({
      url: '../map/map',
    })
    wx.hideLoading();
  } else if (type == "device") {
    
    if(wxUserId){
      console.log('123');
      wx.request({
        url: app.globalData.url + 'deviceOrderApp/getDevicePayInfo',
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
                    url: app.globalData.url + 'commond/sendSimCommand',
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
                    // 自驾电瓶车
                    wx.request({
                      url: app.globalData.url + 'orderApp/getOrderListByType',
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
                        if (status == '0' || status == '5' || status == '8' || orderList.length == 0) {
                          // 自驾电瓶车
                          wx.navigateTo({
                            url: '../batteryCar-buy/batteryCar-buy?price=' + orderInfo.data.scenicDevicePrice.price + '&deposit=' + orderInfo.data.scenicDevicePrice.deposit + '&qrcode=' + qrCode + '&bikeType=' + bikeType,
                          })
                        } else {
                          wx.showModal({
                            title: '提示',
                            content: '有未结算的自行车订单，请结算后在试！',
                          })
                        }
                      }
                    })
                  } else if (bikeType == "4" || bikeType == "5") {
                    // 自行车
                    wx.request({
                      url: app.globalData.url + 'orderApp/getOrderListByType',
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
                        if (orderList.length > 0) {
                          status = orderList[0].status;
                        }
                        if (status == '0' || status == '5' || status == '8' || orderList.length == 0) {
                          // 自行车
                          wx.navigateTo({
                            url: '../bike-buy/bike-buy?price=' + orderInfo.data.scenicDevicePrice.price + '&deposit=' + orderInfo.data.scenicDevicePrice.deposit + '&qrcode=' + qrCode,
                          })
                        } else {
                          wx.showModal({
                            title: '提示',
                            content: '有未结算的电瓶车订单，请结算后在试！',
                          })
                        }
                      }
                    })
                  } else if (bikeType == "8" || bikeType == '9') {
                    // 游船
                    wx.navigateTo({
                      url: '../boat-buy/boat-buy?price=' + orderInfo.data.scenicDevicePrice.price + '&deposit=' + orderInfo.data.scenicDevicePrice.deposit + '&qrcode=' + qrCode + '&bikeType=' + bikeType,
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
    }else{
      wx.request({
        url: app.globalData.url + 'device/getDeviceByDeviceSn/' + qrCode,
        method: 'get',
        success: function (res) {
          console.log(res);
          let bikeType = res.data.data.device.deviceType;
          let price = res.data.data.scenicPrice.price;
          let deposit = res.data.data.scenicPrice.deposit;
          console.log(bikeType);
          if (bikeType == "0" || bikeType == "1" || bikeType == "2" || bikeType == "3") {
            // 自驾电瓶车
            wx.navigateTo({
              url: '../batteryCar-buy/batteryCar-buy?price=' + price + '&deposit=' + deposit + '&qrcode=' + qrCode,
            })
          } else if (bikeType == "4" || bikeType == "5") {
            // 自行车
            wx.navigateTo({
              url: '../bike-buy/bike-buy?price=' + price + '&deposit=' + deposit + '&qrcode=' + qrCode,
            })
          } else if (bikeType == "8" || bikeType == '9') {
            // 游船
            wx.navigateTo({
              url: '../boat-buy/boat-buy?price=' + price + '&deposit=' + deposit + '&qrcode=' + qrCode + '&bikeType=' + bikeType,
            })
          }
        }
      })
    }
  }
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
