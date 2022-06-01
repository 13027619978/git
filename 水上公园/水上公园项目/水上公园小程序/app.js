const App = require('./utils/ald-stat.js').App;
// 位置刷新计时器
let updateLocation;
const util = require('./utils/util.js');
// let lat = 40.178131;
// let long = 116.692322;
App({
  globalData: {
    url: 'https://iot.smart-ideas.com.cn/ssgy/',
    refundUrl: 'https://iot.smart-ideas.com.cn/ssgyBikeRefund/',
    loopCar: 30,  //环线价格
    tickets: 20, //门票价格
    sslyTickets: 79, //水上乐园门票
    // tickets: 0.01, //测试门票价格
    // sslyTickets: 0.01, //测试水上乐园门票
    mapKey: '3VGBZ-EP5WU-4FKVE-46VJL-5VUZ2-5BFLX',
    attractions: [
      {
        name: '末堂小镇',
        qrcode: 0,
        latitude: 40.171249,
        longitude: 116.691123,
        imgUrl: 'https://iot.smart-ideas.com.cn/ssgyImage/wtxz1.jpg'
      }, {
        name: '水奥雪世界',
        qrcode: 1,
        latitude: 40.173529,
        longitude: 116.692572,
        imgUrl: '/image/banner.jpg'
      }, {
        name: '帆船俱乐部',
        qrcode: 2,
        latitude: 40.175271,
        longitude: 116.692212,
        imgUrl: '/image/banner.jpg'
      }, {
        name: '索道滑水',
        qrcode: 3,
        latitude: 40.178131,
        longitude: 116.692322,
        imgUrl: '/image/banner.jpg'
      }, {
        name: '北京华彩创佳公司',
        qrcode: 4,
        latitude: 40.177463,
        longitude: 116.692121,
        imgUrl: '/image/banner.jpg'
      }
    ],
    currAttraction: '',
    currPage: 'index',
    modalShow: false
  },

  updateLocation: function(callback){
    let that = this;
    let attractions = that.globalData.attractions;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        let distanceArr = [];
        for (let i = 0; i < attractions.length; i++) {
          let distance = {
            distance: util.getDistance(res.latitude, res.longitude, attractions[i].latitude, attractions[i].longitude) * 1000,
            // distance: util.getDistance(lat, long, attractions[i].latitude, attractions[i].longitude) * 1000,
            attraction: i
          }
          distanceArr.push(distance);
        }
        distanceArr = distanceArr.sort(function (a, b) {
          return a.distance - b.distance;
        });
        if (distanceArr[0].distance <= 150) {
          if (that.globalData.currPage == 'index' || that.globalData.currPage == 'map'){
            console.log(that.globalData.attractions[distanceArr[0].attraction].name);
            if (that.globalData.attractions[distanceArr[0].attraction].name == that.globalData.currAttraction) {
              return;
            }
            clearInterval(updateLocation);
            // 记录上个景区，避免重复提醒
            that.globalData.currAttraction = that.globalData.attractions[distanceArr[0].attraction].name;
            if (that.globalData.currPage == 'index'){
              that.globalData.modalShow = true;
              if(callback){
                callback(that.globalData.modalShow, that.globalData.attractions[distanceArr[0].attraction].qrcode, that.globalData.attractions[distanceArr[0].attraction].name, distanceArr[0].distance, that.globalData.attractions[distanceArr[0].attraction].imgUrl);
              }
            }else{
              wx.showModal({
                title: '温馨提示',
                content: '附近景点：' + that.globalData.attractions[distanceArr[0].attraction].name + '\r\n距离您：' + distanceArr[0].distance + '米\r\n是否让我为您导览？',
                confirmText: '是',
                cancelText: '否',
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../explain/explain?qrCode=' + that.globalData.attractions[distanceArr[0].attraction].qrcode,
                    })
                  } else {
                    that.globalData.currAttraction = that.globalData.attractions[distanceArr[0].attraction].name;
                    updateLocation = setInterval(that.updateLocation, 5000);
                  }
                }
              })
            }
          }
        }
      },
      fail: function(res){
        wx.showModal({
          title: '提示',
          content: '用户未开启地理位置授权',
        });
        clearInterval(updateLocation);
      }
    })
  },

  clearUpdate: function(){
    clearInterval(updateLocation);
  },

  setUpdateLocation: function(){
    let that = this;
    updateLocation = setInterval(that.updateLocation, 5000);
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    let that = this;
    that.setUpdateLocation();
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
