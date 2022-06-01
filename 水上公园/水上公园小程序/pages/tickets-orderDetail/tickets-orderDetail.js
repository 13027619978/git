// pages/tickets-success/tickets-success.js
const Page = require('../../utils/ald-stat.js').Page;
const QRCode = require('../../utils/weapp-qrcode.js');
const app = getApp();

var qrcode;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 刷新二维码点击事件
   */
  uploadClick () {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.url + 'ticketsOrderApp/getTicketsOrder',
      method: 'get',
      data: {
        ticketsId: that.data.ticketsId
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 'SUCCESS') {
          wx.hideLoading();
          if (!res.data.data.orderCode) {
            wx.showModal({
              title: '提示',
              content: '未获取订单编号，请点击刷新按钮',
            })
          }
          qrcode = new QRCode('canvas', {
            // usingIn: this,
            text: res.data.data.orderCode,
            width: 130,
            height: 130,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ticketsId = options.ticketsId;
    let that = this;
    that.setData({
      ticketsId: ticketsId
    });
    wx.request({
      url: app.globalData.url + 'ticketsOrderApp/getTicketsOrder',
      method: 'get',
      data: {
        ticketsId: ticketsId
      },
      success: function(res){
        console.log(res);
        if(res.data.code == 'SUCCESS'){
          let orderInfo = res.data.data;
          switch (orderInfo.payStatus){
            case "0":
              orderInfo.payStatus = "未支付";
            break;

            case "1":
              orderInfo.payStatus = "支付成功";
            break;

            case "2":
              orderInfo.payStatus = "已退款";
            break;
          }
          that.setData({
            number: res.data.data.number,
            createDate: res.data.data.createDate,
            endDate: res.data.data.endDate,
            status: orderInfo.payStatus,
            orderCode: res.data.data.orderCode
          })
          if (!res.data.data.orderCode){
            wx.showModal({
              title: '提示',
              content: '未获取订单编号，请点击刷新按钮',
            })
          }
          qrcode = new QRCode('canvas', {
            // usingIn: this,
            text: res.data.data.orderCode,
            width: 130,
            height: 130,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
          });
        }
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