// pages/batteryCar-order/batteryCar-order.js
const Page = require('../../utils/ald-stat.js').Page;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 订单详情点击事件
   */
  orderDetail(e) {
    let orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../loopCar-orderDetail/loopCar-orderDetail?siteId=' + orderId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'wxUserId',
      success: function (res) {
        let wxUserId = res.data;
        wx.request({
          url: app.globalData.url + 'iotsmart/orderApp/getOrderListByType',
          method: 'get',
          data: {
            type: 5,
            wxUserId: wxUserId,
            page: 1,
            limit: 20
          },
          success: function (res) {
            console.log(res);
            that.setData({
              orderList: res.data.data,
              wxUserId: wxUserId,
              page: 1
            })
          }
        })
      },
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
    let that = this;
    let wxUserId = that.data.wxUserId;
    let orderList = that.data.orderList;
    let page = that.data.page;
    page += 1;
    wx.request({
      url: app.globalData.url + 'iotsmart/orderApp/getOrderListByType',
      method: 'get',
      data: {
        type: 5,
        wxUserId: wxUserId,
        page: page,
        limit: 20
      },
      success: function (res) {
        if (res.data.data.length > 0) {
          let newOrderList = res.data.data;
          for (let i = 0; i < newOrderList.length; i++) {
            orderList.push(newOrderList[i]);
          }
          that.setData({
            orderList: orderList,
            page: page
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})