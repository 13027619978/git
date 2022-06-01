// pages/batteryCar-orderDetail/batteryCar-orderDetail.js
const Page = require('../../utils/ald-stat.js').Page;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderId = options.orderId;
    let that = this;
    wx.request({
      url: app.globalData.url + 'deviceOrderApp/getDeviceOrder',
      method: 'get',
      data: {
        deviceOrderId: orderId
      },
      success: function(res){
        console.log(res);
        let orderInfo = res.data.data;
        switch (orderInfo.status){
          case "0":
            orderInfo.status = '未支付';
          break;
          case "1":
            orderInfo.status = '支付成功';
            break;
          case "5":
            orderInfo.status = '退款成功';
            break;
          case "8":
            orderInfo.status = '申请退款中';
            break;
          case "9":
            orderInfo.status = '退款失败';
            break;
        }
        that.setData({
          orderInfo: res.data.data
        })
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})