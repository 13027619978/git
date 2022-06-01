// pages/bike-buy/bike-buy.js
const Page = require('../../utils/ald-stat.js').Page;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false
  },

  /**
   * 开锁点击事件
   */
  buyClick() {
    let that = this;
    that.setData({
      disabled: true
    })
    wx.getStorage({
      key: 'payInfo',
      success: function (res) {
        let payInfo = res.data;
        wx.requestPayment({
          timeStamp: payInfo.timeStamp,
          nonceStr: payInfo.nonceStr,
          package: payInfo.package,
          signType: payInfo.signType,
          paySign: payInfo.paySign,
          success: function (res) {
            wx.redirectTo({
              url: '../boat-orderDetail/boat-orderDetail?orderId=' + that.data.orderId,
            })
          },
          complete: function () {
            that.setData({
              disabled: false
            })
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      price: options.price,
      deposit: options.deposit,
      orderId: options.orderId,
      phone: wx.getStorageSync('phone')
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