// pages/orderDetail/orderDetail.js
const app = getApp();
let ticketId;
let drawQrcode = require("../../utils/weapp.qrcode.min.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 确认须知点击事件
  sureClick: function(){
    this.setData({
      sure: true
    })
  },

  // 申请退票
  refundClick: function(){
    let that = this;
    let refundBtn = that.data.refundBtn;
    if(refundBtn == '申请退款'){
      wx.showModal({
        content: '确认是否退票？',
        success: function(res){
          if(res.confirm){
            // 获取门票详情
            wx.request({
              url: app.globalData.url + 'order/getDetailsById',
              data: {
                ticketOrderId: ticketId
              },
              method: 'GET',
              success: function(res){
                if(res.data.success){
                  let ticketInfo = res.data.data;
                  let refundBtn;
                  if(ticketInfo.payStatus == '1'){
                    if(ticketInfo.checkQuantity == ticketInfo.restCheckQuantity){
                      let useDate = ticketInfo.visitDate.replace(/-/, '/').replace(/-/, '/') + ' ' + ticketInfo.details[0].checkEndTime;
                      if(new Date().getTime() < new Date(useDate).getTime()){
                        wx.showLoading({
                          title: '退票中',
                        })
                        wx.request({
                          url: app.globalData.url + 'orderRefund/refundByWeb',
                          data: {
                            refundWay: 'mini',
                            ticketOrderId: ticketId,
                            refundMoney: that.data.ticketInfo.totalPrice,
                            refundDescription: '微信用户手动退款'
                          },
                          method: 'POST',
                          success: function(res1){
                            wx.hideLoading()
                            if(res1.data.success){
                              wx.showToast({
                                title: '退票成功！',
                                success: function(){
                                  wx.switchTab({
                                    url: '/pages/order/order',
                                  })
                                }
                              })
                            }else{
                              wx.showModal({
                                content: res1.data.message
                              })
                            }
                          }
                        })
                      }else{
                        wx.showModal({
                          content: '已过期',
                        })
                      }
                    }else if(ticketInfo.restCheckQuantity > 0 && ticketInfo.checkQuantity != ticketInfo.restCheckQuantity){
                      wx.showModal({
                        content: '已部分核销',
                      })
                    }else{
                      wx.showModal({
                        content: '已核销',
                      })
                    }
                  }
                }
              }
            })
          }
        }
      })
    }else{
      wx.showModal({
        content: refundBtn + '票不支持退票操作'
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ticketId = options.ticketId;
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
    // 获取门票详情
    wx.request({
      url: app.globalData.url + 'order/getDetailsById',
      data: {
        ticketOrderId: ticketId
      },
      method: 'GET',
      success: function(res){
        if(res.data.success){
          let ticketInfo = res.data.data;
          let refundBtn;
          if(ticketInfo.payStatus == '1'){
            if(ticketInfo.checkQuantity == ticketInfo.restCheckQuantity){
              let useDate = ticketInfo.visitDate.replace(/-/, '/').replace(/-/, '/') + ' ' + ticketInfo.details[0].checkEndTime;
              if(new Date().getTime() < new Date(useDate).getTime()){
                refundBtn = '申请退款';
              }else{
                refundBtn = '已过期';
              }
            }else if(ticketInfo.restCheckQuantity > 0 && ticketInfo.checkQuantity != ticketInfo.restCheckQuantity){
              refundBtn = '已部分核销';
            }else{
              refundBtn = '已核销';
            }
          }else{
            refundBtn = '已退票成功';
          }
          drawQrcode({
            width: 120,
            height: 120,
            canvasId: 'myQrcode',
            text: ticketInfo.checkCode
          })
          
          var visitTime;
          if(ticketInfo.ticketName.indexOf('上午票') != -1){
            visitTime = '08:30-11:00';
          }else if(ticketInfo.ticketName.indexOf('中午票') != -1){
            visitTime = '11:00-14:00';
          }else if(ticketInfo.ticketName.indexOf('下午票') != -1){
            visitTime = '14:00-16:00';
          }

          that.setData({
            ticketInfo: ticketInfo,
            refundBtn: refundBtn,
            visitTime: visitTime
          })
          wx.hideLoading();
        }else{
          wx.showModal({
            content: res.data.message
          })
        }
      }
    })

    // 获取游客信息
    wx.request({
      url: app.globalData.url + 'orderVisitors/getOrderVisitors',
      data: {
        ticketOrderId: ticketId
      },
      method: 'GET',
      success: function(res){
        if(res.data.success){
          let visitorList = res.data.data;
          that.setData({
            visitorList: visitorList
          })
        }else{
          wx.showModal({
            content: res.data.message
          })
        }
      }
    })

    // 获取检票信息
    wx.request({
      url: app.globalData.url + 'orderCheck/getCheckList',
      data: {
        ticketOrderId: ticketId
      },
      method: 'GET',
      success: function(res){
        if(res.data.success){
          let checkList = res.data.data;
          that.setData({
            checkList: checkList
          })
        }else{
          wx.showModal({
            content: res.data.message
          })
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