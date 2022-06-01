// pages/bike-buy/bike-buy.js
const Page = require('../../utils/ald-stat.js').Page;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false
  },

  writePhone(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },

  /**
   * 开锁点击事件
   */
  buyClick() {
    let that = this;
    that.setData({
      disabled: true
    });
    if (that.data.phone) {
      let openId = wx.getStorageSync('openId');
      let wxUserId = wx.getStorageSync('wxUserId');
      wx.request({
        url: app.globalData.url + 'deviceOrderApp/getDevicePayInfo',
        method: 'post',
        header: {
          'content-type': 'application/json'
        },
        data: {
          deviceSn: that.data.qrCode,
          openId: openId,
          wxUserId: wxUserId
        },
        success: function (res) {
          if (res.data.code == 'SUCCESS') {
            let payInfo = JSON.parse(res.data.data.res);
            let orderId = res.data.data.orderId;
            wx.requestPayment({
              timeStamp: payInfo.timeStamp,
              nonceStr: payInfo.nonceStr,
              package: payInfo.package,
              signType: payInfo.signType,
              paySign: payInfo.paySign,
              success: function (res) {
                wx.redirectTo({
                  url: '../boat-orderDetail/boat-orderDetail?orderId=' + orderId,
                })
              },
              complete: function () {
                that.setData({
                  disabled: false
                })
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
            })
            that.setData({
              disabled: false
            })
          }
        }
      })
    } else {
      let phoneNumber = that.data.phoneNumber;
      wx.getStorage({
        key: 'openId',
        success: function (res) {
          let openId = res.data;
          if ((/^1[23456789]\d{9}$/.test(phoneNumber))) {
            wx.request({
              url: app.globalData.url + 'wxUserApp/registerWxUser',
              method: 'post',
              header: {
                'content-type': 'application/json'
              },
              data: {
                phone: phoneNumber,
                openId: openId
              },
              success: function (res) {
                if (res.data.code == 'SUCCESS') {
                  wx.setStorage({
                    key: 'wxUserId',
                    data: res.data.data.id,
                    success: function () {
                      wx.setStorageSync('phone', res.data.data.phone);
                      that.setData({
                        phone: res.data.data.phone
                      });
                      wx.request({
                        url: app.globalData.url + 'deviceOrderApp/getDevicePayInfo',
                        method: 'post',
                        header: {
                          'content-type': 'application/json'
                        },
                        data: {
                          deviceSn: that.data.qrCode,
                          openId: openId,
                          wxUserId: res.data.data.id
                        },
                        success: function (res) {
                          if (res.data.code == 'SUCCESS') {
                            let payInfo = JSON.parse(res.data.data.res);
                            let orderId = res.data.data.orderId;
                            wx.requestPayment({
                              timeStamp: payInfo.timeStamp,
                              nonceStr: payInfo.nonceStr,
                              package: payInfo.package,
                              signType: payInfo.signType,
                              paySign: payInfo.paySign,
                              success: function (res) {
                                wx.redirectTo({
                                  url: '../batteryCar-orderDetail/batteryCar-orderDetail?orderId=' + orderId,
                                })
                              },
                              complete: function () {
                                that.setData({
                                  disabled: false
                                })
                              }
                            })
                          }else{
                            wx.showModal({
                              title: '提示',
                              content: res.data.msg,
                            })
                            that.setData({
                              disabled: false
                            })
                          }
                        }
                      })
                    }
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                  });
                  that.setData({
                    disabled: false
                  });
                }
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '请输入正确的手机号',
            });
            that.setData({
              disabled: false
            });
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options);
    that.setData({
      price: options.price,
      deposit: options.deposit,
      phone: wx.getStorageSync('phone'),
      bikeType: options.bikeType,
      qrCode: options.qrcode
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})