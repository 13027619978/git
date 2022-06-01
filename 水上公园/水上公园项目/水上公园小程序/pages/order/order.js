// pages/order/order.js
const Page = require('../../utils/ald-stat.js').Page;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 订单点击事件
   */
  orderClick (e) {
    console.log(e);
    switch (e.currentTarget.dataset.ordertype){
      case "0":
        wx.navigateTo({
          url: '../tickets-order/tickets-order',
        })
      break;

      case "1":
        wx.navigateTo({
          url: '../batteryCar-order/batteryCar-order',
        })
        break;

      case "2":
        wx.navigateTo({
          url: '../bike-order/bike-order',
        })
        break;

      case "3":
        wx.navigateTo({
          url: '../boat-order/boat-order',
        })
        break;

      case "4":
        wx.navigateTo({
          url: '../loopCar-order/loopCar-order',
        })
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})