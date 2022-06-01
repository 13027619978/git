const App = require('./utils/ald-stat.js').App;
// 位置刷新计时器
let updateLocation;
const util = require('./utils/util.js');
// let lat = 40.181398;
// let long = 116.794281;
App({
  globalData: {
    url: 'https://iot.smart-ideas.com.cn/',
    refundUrl: 'https://smart-ideas.com.cn/bikeRefund/',
    loopCar: 30,
    tickets: 30,
    // url: 'https://test.joybike.com.cn/',
    // refundUrl: 'https://test.joybike.com.cn/bikeRefund/',
    // loopCar: 0.01,
    // tickets: 0.01,
    mapKey: '3VGBZ-EP5WU-4FKVE-46VJL-5VUZ2-5BFLX',
    attractions: [
      {
        name: '白沙滩',
        latitude: 40.182358,
        longitude: 116.797409,
        iconPath: '/image/attractions1.png',
        width: 30,
        height: 30,
        id: '0',
        mp3: 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925318.mp3',
        qrcode: 1959997,
        imgUrl: 'http://joybike-user.oss-cn-shanghai.aliyuncs.com/userImg/4470921a-db9f-4fdc-a092-dd542c2736c5.jpg'
      },
      {
        name: '大地花海',
        latitude: 40.180084,
        longitude: 116.796951,
        iconPath: '/image/attractions2.png',
        width: 30,
        height: 30,
        id: '1',
        mp3: 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925329.mp3',
        qrcode: 1959996,
        imgUrl: 'http://joybike-user.oss-cn-shanghai.aliyuncs.com/userImg/4a6e3d41-b9f4-452c-a15b-c25164212a67.jpg'
      },
      {
        name: '花神广场',
        latitude: 40.177717,
        longitude: 116.799532,
        iconPath: '/image/attractions3.png',
        width: 30,
        height: 30,
        id: '2',
        mp3: 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925340.mp3',
        qrcode: 1959995,
        imgUrl: 'http://joybike-user.oss-cn-shanghai.aliyuncs.com/userImg/12f19958-ceaa-4650-9210-e86e61569d03.jpg'
      },
      {
        name: '花溪餐厅',
        latitude: 40.182686,
        longitude: 116.797089,
        iconPath: '/image/attractions4.png',
        width: 30,
        height: 30,
        id: '3',
        mp3: 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925351.mp3',
        qrcode: 1959993,
        imgUrl: 'http://joybike-user.oss-cn-shanghai.aliyuncs.com/userImg/75e975e3-3ffa-4794-bf70-465e07bfd257.jpg'
      },
      {
        name: '幻花湖',
        latitude: 40.182453,
        longitude: 116.798912,
        iconPath: '/image/attractions5.png',
        width: 30,
        height: 30,
        id: '4',
        mp3: 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925362.mp3',
        qrcode: 1959994,
        imgUrl: 'http://joybike-user.oss-cn-shanghai.aliyuncs.com/userImg/1b0dd21e-6cea-42ba-b174-3590fb63a796.jpg'
      },
      {
        name: '南门区',
        latitude: 40.177471,
        longitude: 116.800156,
        iconPath: '/image/attractions6.png',
        width: 30,
        height: 30,
        id: '5',
        mp3: 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925373.mp3',
        qrcode: 1959992,
        imgUrl: 'http://joybike-user.oss-cn-shanghai.aliyuncs.com/userImg/ed6f95ea-66c4-481a-866b-6d4d4629b4e1.jpg'
      },
      {
        name: '水车',
        latitude: 40.183140,
        longitude: 116.799545,
        iconPath: '/image/attractions7.png',
        width: 30,
        height: 30,
        id: '6',
        mp3: 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925384.mp3',
        qrcode: 1959991,
        imgUrl: 'http://joybike-user.oss-cn-shanghai.aliyuncs.com/userImg/be6be163-efec-44f5-b9a7-3db48e31378a.jpg'
      },
      {
        name: '情人谷',
        latitude: 40.184868,
        longitude: 116.799248,
        iconPath: '/image/attractions8.png',
        width: 30,
        height: 30,
        id: '7',
        mp3: 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925394.mp3',
        qrcode: 1959990,
        imgUrl: 'http://joybike-user.oss-cn-shanghai.aliyuncs.com/userImg/69a040cf-7473-4916-bde6-eef0c119dcf3.jpg'
      },
      {
        name: '水杉林',
        latitude: 40.183239,
        longitude: 116.800423,
        iconPath: '/image/attractions9.png',
        width: 30,
        height: 30,
        id: '8',
        mp3: 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925406.mp3',
        qrcode: 1959989,
        imgUrl: 'http://joybike-user.oss-cn-shanghai.aliyuncs.com/userImg/aa9d5166-ceac-43ee-8033-1ccbd75deb58.jpg'
      },
      {
        name: '万花馆',
        latitude: 40.177185,
        longitude: 116.796692,
        iconPath: '/image/attractions10.png',
        width: 30,
        height: 30,
        id: '9',
        mp3: 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925416.mp3',
        qrcode: 1959988,
        imgUrl: 'http://joybike-user.oss-cn-shanghai.aliyuncs.com/userImg/b76b59c6-95f0-47ab-83e4-3027d78c9fa6.jpg'
      },
      {
        name: '瑞云坪',
        latitude: 40.181107,
        longitude: 116.799370,
        iconPath: '/image/attractions11.png',
        width: 30,
        height: 30,
        id: '10',
        mp3: 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925427.mp3',
        qrcode: 1959987,
        imgUrl: 'http://joybike-user.oss-cn-shanghai.aliyuncs.com/userImg/56175c92-dcd5-49e2-a97e-02bd3c7e97d0.jpg'
      },
      {
        name: '育秀园',
        latitude: 40.185875,
        longitude: 116.799919,
        iconPath: '/image/attractions12.png',
        width: 30,
        height: 30,
        id: '11',
        mp3: 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925438.mp3',
        qrcode: 1959986,
        imgUrl: 'http://joybike-user.oss-cn-shanghai.aliyuncs.com/userImg/dd7000e3-0ec5-46bd-a962-f4ca0f2da366.jpg'
      },
      {
        name: '植物专类园',
        latitude: 40.183411,
        longitude: 116.795982,
        iconPath: '/image/attractions13.png',
        width: 30,
        height: 30,
        id: '12',
        mp3: 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457932496.mp3',
        qrcode: 1959985,
        imgUrl: 'http://joybike-user.oss-cn-shanghai.aliyuncs.com/userImg/7d49eb7b-5f05-4ab1-b08e-a3ec07586630.jpg'
      },
      {
        name: '百花田',
        latitude: 40.180489,
        longitude: 116.800308,
        iconPath: '/image/attractions14.png',
        width: 30,
        height: 30,
        id: '13',
        mp3: 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/power/145794092250695.mp3',
        qrcode: 1959984,
        imgUrl: 'http://joybike-user.oss-cn-shanghai.aliyuncs.com/userImg/ae0a59c8-5fd5-4250-9e5f-34f9139ab6d6.jpg'
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
        // console.log(distanceArr);
        if (distanceArr[0].distance <= 150) {
          if (that.globalData.currPage == 'index' || that.globalData.currPage == 'map'){
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
