// pages/tickets-buy/tickets-buy.js
const Page = require('../../utils/ald-stat.js').Page;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticketMoney: app.globalData.tickets,
    ticketNumber: 0,
    totalMoney: 0,
    disabled: false
  },

  /**
   * 增加点击事件
   */
  addClick () {
    var ticketNumber = this.data.ticketNumber;
    var ticketMoney = this.data.ticketMoney;
    var totalMoney = this.data.totalMoney;
    if(ticketNumber < 100){
      ticketNumber += 1;
      totalMoney = ticketNumber * ticketMoney;
      this.setData({
        ticketNumber: ticketNumber,
        totalMoney: totalMoney
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '单次最多购买100张',
      })
    }
  },

  /**
   * 减少点击事件
   */
  subClick () {
    var ticketNumber = this.data.ticketNumber;
    var ticketMoney = this.data.ticketMoney;
    var totalMoney = this.data.totalMoney;
    if (ticketNumber > 0) {
      ticketNumber -= 1;
      totalMoney = ticketNumber * ticketMoney;
      this.setData({
        ticketNumber: ticketNumber,
        totalMoney: totalMoney
      })
    }
  },

  /**
   * 购买点击事件
   */
  buyClick () {
    let that = this;
    if (that.data.totalMoney > 0){
      that.setData({
        disabled: true
      })
      wx.getStorage({
        key: 'wxUserId',
        success: function(res) {
          let wxUserId = res.data;
          wx.request({
            url: app.globalData.url + 'iotsmart/ticketsOrderApp/buyTickets',
            method: 'post',
            header: {
              'content-type': 'application/json'
            },
            data: {
              wxUserId: wxUserId,
              scenicId: '1a5803bc57214a4eb16151c17d86f410',
              source: 0,
              type: 0,
              number: that.data.ticketNumber,
              totalPrice: that.data.totalMoney,
              total: that.data.ticketNumber
            },
            success: function(res){
              console.log(res);
              if(res.data.code == "ERROR"){
                wx.showModal({
                  title: '提示',
                  content: '系统错误，请稍后再试！',
                })
                that.setData({
                  disabled: false
                })
                return;
              }
              let payInfo = JSON.parse(res.data.data.res);
              let ticketsId = res.data.data.ticketsId;
              wx.requestPayment({
                timeStamp: payInfo.timeStamp,
                nonceStr: payInfo.nonceStr,
                package: payInfo.package,
                signType: payInfo.signType,
                paySign: payInfo.paySign,
                success: function(res){
                  wx.redirectTo({
                    url: '../tickets-orderDetail/tickets-orderDetail?ticketsId=' + ticketsId,
                  })
                },
                complete: function(){
                  that.setData({
                    disabled: false
                  })
                }
              })
            }
          })
        },
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请先选择购票数量',
      })
      that.setData({
        disabled: false
      })
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

  }
})