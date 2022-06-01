const util = require('../../utils/util.js');
const Page = require('../../utils/ald-stat.js').Page;
const app = getApp();
let disabled = false;
let setUpdateLocation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openScope: false,
    modalShow: false,
    animationData: {},
    size: 12,
    marqueePace: 0.5,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    orientation: 'left',//滚动方向
    interval: 20, // 时间间隔
    time: '',
    text: ''
  },

  // 初始化文字滚动
  run2: function () {
    var vm = this;
    var interval = setInterval(function () {
      if (-vm.data.marqueeDistance2 < vm.data.length) {
        // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示
        vm.setData({
          marqueeDistance2: vm.data.marqueeDistance2 - vm.data.marqueePace,
          marquee2copy_status: vm.data.length + vm.data.marqueeDistance2 <= vm.data.windowWidth + vm.data.marquee2_margin,
        });
      } else {
        if (-vm.data.marqueeDistance2 >= vm.data.marquee2_margin) { // 当第二条文字滚动到最左边时
          vm.setData({
            marqueeDistance2: vm.data.marquee2_margin // 直接重新滚动
          });
          clearInterval(interval);
          vm.run2();
        } else {
          clearInterval(interval);
          vm.setData({
            marqueeDistance2: -vm.data.windowWidth
          });
          vm.run2();
        }
      }
    }, vm.data.interval);
  },

  /**
   * 扫码点击事件
   */
  scanClick () {
    if(disabled){
      return;
    }
    disabled = true;
    wx.getStorage({
      key: 'wxUserId',
      success: function(res) {
        wx.scanCode({
          success: function(res){
            console.log(res);
            if (res.result.indexOf("code=") != -1){
              let qrCode = res.result.split('code=')[1].split('&type=')[0];
              let qrType = res.result.split('&type=')[1];
              console.log(res.result);
              util.scanResult(qrCode, qrType, app);
            }else{
              if (res.result == app.globalData.refundUrl) {
                wx.navigateTo({
                  url: '../refund/refund?url=' + res.result,
                })
              }
            }
          },
          complete: function(){
            disabled = false;
          }
        })
      },
      fail: function(res){
        disabled = false;
        wx.reLaunch({
          url: '../regist/regist',
        })
      }
    })
  },

  /**
   * 地图点击事件
   */
  mapClick () {
    wx.navigateTo({
      url: '../map/map',
    })
  },

  /**
   * 订单点击事件
   */
  orderClick () {
    wx.getStorage({
      key: 'wxUserId',
      success: function (res) {
        wx.navigateTo({
          url: '../order/order',
        })
      },
      fail: function (res) {
        wx.reLaunch({
          url: '../regist/regist',
        })
      }
    })
  },

  /**
   * 讲解点击事件
   */
  explainClick (e) {
    let that = this;
    that.setData({
      modalShow: false
    })
    app.globalData.modalShow = false;
    wx.navigateTo({
      url: '../explain/explain?qrCode=' + e.currentTarget.dataset.qrcode,
    })
  },

  /**
   * modal取消点击事件
   */
  modalCancel () {
    let that = this;
    that.setData({
      modalShow: false
    })
    app.globalData.modalShow = false;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let qrCode;
    let qrType;
    if(options.q){
      qrCode = decodeURIComponent(options.q).split('?code=')[1].split('&')[0];
      qrType = decodeURIComponent(options.q).split('?code=')[1].split('&type=')[1];
    }
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    
    wx.login({
      success: function (res) {
        console.log(res);
        wx.request({
          url: app.globalData.url + 'iotsmart/wx/miniOpenId?code=' + res.code,
          method: 'get',
          success: function (res) {
            wx.hideLoading();
            wx.setStorage({
              key: 'openId',
              data: res.data.rows
            })
            wx.request({
              url: app.globalData.url + 'iotsmart/wxUserApp/verifyWxUser',
              method: 'get',
              data: {
                openId: res.data.rows
              },
              success: function (res) {
                console.log(res);
                if (res.data.code == 'SUCCESS') {
                  wx.setStorageSync('wxUserId', res.data.data.id);
                  wx.setStorageSync('phone', res.data.data.phone);
                  var openId = wx.getStorageSync('openId');
                  var wxUserId = wx.getStorageSync('wxUserId');
                  if (openId && wxUserId) {
                    if (qrCode && qrType) {
                      util.scanResult(qrCode, qrType, app);
                    }
                  }
                  that.setData({
                    text: '您当前登录的手机号为：' + res.data.data.phone
                  })
                }else{
                  that.setData({
                    text: '注册成为会员，体验更多功能！'
                  })
                }

                var length = that.data.text.length * that.data.size;//文字长度
                var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
                var query = wx.createSelectorQuery();
                query.select('.notice_txt').boundingClientRect();
                query.exec(function (res) {
                  console.log(res);
                  windowWidth = res[0].width
                })

                that.setData({
                  length: length,
                  windowWidth: windowWidth,
                  marquee2_margin: 20
                });
                that.run2();
              }
            })
          }
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
    let that = this;
    console.log('show');
    app.globalData.currPage = 'index';
    app.clearUpdate();
    setUpdateLocation = setInterval(function(){
      app.updateLocation(function (modalShow, qrCode, attraction, distance, imgUrl) {
        const animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'linear',
        });
        that.animation = animation;
        animation.scale(0.5, 0.5).rotate(-180).step();
        animation.scale(1, 1).rotate(0).step();
        that.setData({
          modalShow: modalShow,
          qrCode: qrCode,
          attraction: attraction,
          distance: distance,
          imgUrl: imgUrl
        })
        setTimeout(function(){
          that.setData({
            animationData: animation.export()
          })
        }, 50);
      })
    }, 5000);
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.currPage = 'others';
    clearInterval(setUpdateLocation);
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