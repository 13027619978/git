// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 首页点击
  homeClick: function(){
    wx.reLaunch({
      url: '../index/index',
    })
  },

  // 点击订单
  orderClick: function(e){
    let ticketId = e.currentTarget.dataset.ticketid;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?ticketId=' + ticketId,
    })
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
    let openId = wx.getStorageSync('openId');
    let that = this;
    wx.request({
      url: app.globalData.url + 'order/getDetailListByOpenId',
      data: {
        openId: openId,
        enterpriseCode: app.globalData.enterpriseCode,
        ticketGroupNum: app.globalData.ticketGroupNum
      },
      success: function (res){
        if(res.data.success){
          let orderList = res.data.data;
          that.setData({
            orderList: orderList
          })
        }else{
          that.setData({
            orderList: []
          })
          wx.showModal({
            content: res.data.message
          })
        }
      }
    })
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