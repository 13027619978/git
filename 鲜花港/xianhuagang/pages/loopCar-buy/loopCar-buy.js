// pages/loopCar-buy/loopCar-buy.js
const Page = require('../../utils/ald-stat.js').Page;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index: 0,
    price: app.globalData.loopCar,
    totalMoney: 0,
    disabled: false
  },

  /**
   * 选择器
   */
  bindPickerChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let that = this;
    let price = that.data.price;
    let totalMoney = that.data.totalMoney;
    totalMoney = price * e.detail.value;
    totalMoney = parseFloat(totalMoney).toFixed(2);
    this.setData({
      index: e.detail.value,
      totalMoney: totalMoney
    })
  },

  /**
   * 购票点击事件
   */
  buyClick () {
    let that = this;
    that.setData({
      disabled: true
    })
    let totalMoney = that.data.totalMoney;
    let number = that.data.index;
    if (number > 0){
      wx.getStorage({
        key: 'wxUserId',
        success: function(res) {
          let wxUserId = res.data;
          wx.request({
            url: app.globalData.url + 'iotsmart/siteOrderApp/buySiteTicket',
            method: 'post',
            header: {
              'content-type': 'application/json'
            },
            data: {
              wxUserId: wxUserId,
              scenicId: '1a5803bc57214a4eb16151c17d86f410',
              number: 5,
              totalPrice: totalMoney,
              peopleNumber: number
            },
            success: function(res){
              if(res.data.code == 'SUCCESS'){
                let payInfo = JSON.parse(res.data.data.res);
                let siteId = res.data.data.siteId;
                wx.requestPayment({
                  timeStamp: payInfo.timeStamp,
                  nonceStr: payInfo.nonceStr,
                  package: payInfo.package,
                  signType: payInfo.signType,
                  paySign: payInfo.paySign,
                  success: function(res){
                    wx.redirectTo({
                      url: '../loopCar-orderDetail/loopCar-orderDetail?siteId=' + siteId,
                    })
                  },
                  complete: function(){
                    that.setData({
                      disabled: false
                    })
                  }
                })
              }else{
                wx.showModal({
                  title: '提示',
                  content: '获取支付信息失败，请稍后再试！',
                })
                that.setData({
                  disabled: false
                })
              }
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
    let arr = [];
    for(let i = 0; i < 100; i++){
      arr.push(i);
    }
    this.setData({
      array: arr
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