// pages/regist/regist.js
const Page = require('../../utils/ald-stat.js').Page;
const app = getApp();
let phone = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 电话输入事件
   */
  writePhone (e) {
    phone = e.detail.value;
  },  

  /**
   * 绑定手机号事件
   */
  registClick () {
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        let openId = res.data;
        if ((/^1[23456789]\d{9}$/.test(phone))){
          wx.request({
            url: app.globalData.url + 'iotsmart/wxUserApp/registerWxUser',
            method: 'post',
            header: {
              'content-type': 'application/json'
            },
            data: {
              phone: phone,
              openId: openId
            },
            success: function(res){
              if (res.data.code == 'SUCCESS'){
                wx.showToast({
                  title: '注册成功'
                })
                wx.setStorage({
                  key: 'wxUserId',
                  data: res.data.data.id,
                  success: function(){
                    wx.setStorageSync('phone', res.data.data.phone);
                    setTimeout(function(){
                      wx.reLaunch({
                        url: '../index/index',
                      });
                    }, 1500);
                  }
                })
              }else{
                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                })
              }
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '请输入正确的手机号',
          })
        }
      }
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