// pages/map/map.js
const Page = require('../../utils/ald-stat.js').Page;
const util = require('../../utils/util.js');
const app = getApp();
let points = [];
let point = {};
let longitude;
let latitude;
Page({

  /**
   * 页面的初始数据
   **/
  data: {
    longitude: 116.796756,
    latitude: 40.181807,
    scale: 17,
    distanceHidden: true,
    categoryList: ['景点', '自行车服务', '电瓶车服务', '游船服务', '环线观光车服务'],
    currentIndex: 0,
    markers: app.globalData.attractions,
    inPark: true
  },

  /**
   * 地图点击事件
   */
  mapClick () {
    this.setData({
      distanceHidden: true
    })
  },

  /**
   * 定位点击事件
   */
  positionClick () {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      },
    })
  },

  /**
   * 分类点击事件
   */
  categoryClick (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: index,
      distanceHidden: true,
      polyline: [],
      longitude: 116.796756,
      latitude: 40.181807
    })

    switch(index){
      case 0:
        that.setData({
          markers: app.globalData.attractions
        })
      break;

      //自行车租赁
      case 1:
        that.setData({
          markers: [{
            latitude: 40.186626, 
            longitude: 116.797424,
            iconPath: '/image/bike-icon.png',
            width: 30,
            height: 30,
            id: '0'
          }, {
            latitude: 40.177467, 
            longitude: 116.800163,
            iconPath: '/image/bike-icon.png',
            width: 30,
            height: 30,
            id: '1'
            }, {
              latitude: 40.181263, 
              longitude: 116.801196,
              iconPath: '/image/bike-icon.png',
              width: 30,
              height: 30,
              id: '2'
            }, {
              latitude: 40.177976,
              longitude: 116.797017,
              iconPath: '/image/bike-icon.png',
              width: 30,
              height: 30,
              id: '3'
            }]
        })
      break;

      //电瓶车租赁
      case 2:
        that.setData({
          markers: [{
            latitude: 40.186626,
            longitude: 116.797424,
            iconPath: '/image/batteryCar-icon.png',
            width: 30,
            height: 30,
            id: '0'
          }, {
            latitude: 40.177467,
            longitude: 116.800163,
            iconPath: '/image/batteryCar-icon.png',
            width: 30,
            height: 30,
            id: '1'
          }, {
            latitude: 40.181263,
            longitude: 116.801196,
            iconPath: '/image/batteryCar-icon.png',
            width: 30,
            height: 30,
            id: '2'
          }, {
            latitude: 40.177976,
            longitude: 116.797017,
            iconPath: '/image/batteryCar-icon.png',
            width: 30,
            height: 30,
            id: '3'
          }]
        })
        break;    
    
      case 3:
        that.setData({
          markers: [{
            latitude: 40.182447,
            longitude: 116.798910,
            iconPath: '/image/boat-icon.png',
            width: 30,
            height: 30,
            id: '0'
          }]
        })
        break;

      case 4:
        that.setData({
          markers: [{
            latitude: 40.186626,
            longitude: 116.797424,
            iconPath: '/image/loopCar-icon.png',
            width: 30,
            height: 30,
            id: '0'
          }, {
            latitude: 40.177467,
            longitude: 116.800163,
            iconPath: '/image/loopCar-icon.png',
            width: 30,
            height: 30,
            id: '1'
          }, {
            latitude: 40.181263,
            longitude: 116.801196,
            iconPath: '/image/loopCar-icon.png',
            width: 30,
            height: 30,
            id: '2'
          }, {
            latitude: 40.177976,
            longitude: 116.797017,
            iconPath: '/image/loopCar-icon.png',
            width: 30,
            height: 30,
            id: '3'
            }, {
              latitude: 40.184046,
              longitude: 116.800611,
              iconPath: '/image/loopCar-icon.png',
              width: 30,
              height: 30,
              id: '4'
            }, {
              latitude: 40.183066,
              longitude: 116.795198,
              iconPath: '/image/loopCar-icon.png',
              width: 30,
              height: 30,
              id: '5'
            }]
        })
        break;
    }
  },

  /**
   * marker点击事件
   */
  markerClick (e) {
    wx.showLoading({
      title: '路线规划中',
      mask: true
    })
    
    let that = this;
    // 记录marker信息
    let markerInfo = {};
    let toPoint = {};
    toPoint.latitude = that.data.markers[e.markerId].latitude;
    toPoint.longitude = that.data.markers[e.markerId].longitude;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        let long = res.longitude;
        let lat = res.latitude;
        // let long = 116.79503;
        // let lat = 40.1769;
        if(that.data.currentIndex == 0){
          console.log(e);
          switch (e.markerId) {
            case "0":
              markerInfo.name = '白沙滩';
              markerInfo.qrcode = 1959997;
              break;

            case "1":
              markerInfo.name = '大地花海';
              markerInfo.qrcode = 1959996;
              break;

            case "2":
              markerInfo.name = '花神广场';    
              markerInfo.qrcode = 1959995;      
            break;

            case "3":
              markerInfo.name = '花溪餐厅';
              markerInfo.qrcode = 1959993;
              break;

            case "4":
              markerInfo.name = '幻花湖';
              markerInfo.qrcode = 1959994;
              break;

            case "5":
              markerInfo.name = '南门区';
              markerInfo.qrcode = 1959992;
              break;

            case "6":
              markerInfo.name = '水车';
              markerInfo.qrcode = 1959991;
              break;

            case "7":
              markerInfo.name = '情人谷';
              markerInfo.qrcode = 1959990;
              break;

            case "8":
              markerInfo.name = '水杉林';
              markerInfo.qrcode = 1959989;
              break;

            case "9":
              markerInfo.name = '万花馆';
              markerInfo.qrcode = 1959988;
              break;

            case "10":
              markerInfo.name = '瑞云坪';
              markerInfo.qrcode = 1959987;
              break;

            case "11":
              markerInfo.name = '育秀园';
              markerInfo.qrcode = 1959986;
              break;

            case "12":
              markerInfo.name = '植物专类园';
              markerInfo.qrcode = 1959985;
              break;

            case "13":
              markerInfo.name = '百花田';
              markerInfo.qrcode = 1959984;
              break;

          }
        }else if(that.data.currentIndex == 1){
          switch (e.markerId) {
            case "0":
              markerInfo.name = '自行车北门租赁处';
              break;

            case "1":
              markerInfo.name = '自行车南门租赁处';
              break;

            case "2":
              markerInfo.name = '自行车幻花湖租赁处';
              break;

            case "3":
              markerInfo.name = '自行车万花馆租赁处';
              break;
          }
        } else if (that.data.currentIndex == 2) {
          switch (e.markerId) {
            case "0":
              markerInfo.name = '电瓶车北门租赁处';
              break;

            case "1":
              markerInfo.name = '电瓶车南门租赁处';
              break;

            case "2":
              markerInfo.name = '电瓶车幻花湖租赁处';
              break;

            case "3":
              markerInfo.name = '电瓶车万花馆租赁处';
              break;
          }
        } else if (that.data.currentIndex == 3){
          switch (e.markerId) {
            case "0":
              markerInfo.name = '游船租赁处';
              break;
          }
        } else if (that.data.currentIndex == 4){
          switch (e.markerId) {
            case "0":
              markerInfo.name = '环线观光车北门站';
              break;

            case "1":
              markerInfo.name = '环线观光车南门站';
              break;

            case "2":
              markerInfo.name = '环线观光车幻花湖站';
              break;

            case "3":
              markerInfo.name = '环线观光车万花馆站';
              break;

            case "4":
              markerInfo.name = '环线观光车育秀园站';
              break;

            case "5":
              markerInfo.name = '环线观光车植物专类园站';
              break;
          }
        }
        wx.request({
          url: 'https://apis.map.qq.com/ws/distance/v1',
          method: 'get',
          data: {
            from: lat + ',' + long,
            to: toPoint.latitude + ',' + toPoint.longitude,
            mode: 'walking',
            key: app.globalData.mapKey
          },
          success: function(res){
            markerInfo.distance = res.data.result.elements[0].distance;
            markerInfo.walkTime = parseInt(markerInfo.distance / 100);
            if (markerInfo.walkTime < 1){
              markerInfo.walkTime = 1;
            }
            markerInfo.bikeTime = parseInt(markerInfo.distance / 250);
            if (markerInfo.bikeTime < 1) {
              markerInfo.bikeTime = 1;
            }
            markerInfo.batteyCarTime = parseInt(markerInfo.distance / 350);
            if (markerInfo.batteyCarTime < 1) {
              markerInfo.batteyCarTime = 1;
            }
            that.setData({
              distanceHidden: false,
              markerInfo: markerInfo
            })
          }
        })

        if(that.data.inPark){
          wx.request({
            url: 'https://apis.map.qq.com/ws/direction/v1/walking',
            method: 'get',
            data: {
              from: lat + ',' + long,
              to: toPoint.latitude + ',' + toPoint.longitude,
              key: app.globalData.mapKey
            },
            success: function (res) {
              console.log(res);
              if (res.data.status == 0) {
                var coors = res.data.result.routes[0].polyline;
                for (var i = 2; i < coors.length; i++) {
                  coors[i] = coors[i - 2] + coors[i] / 1000000;
                }

                var points = [];
                for (var i = 0; i < coors.length; i += 2) {
                  points[i / 2] = {
                    latitude: coors[i], longitude: coors[i + 1]
                  };
                }
                that.setData({
                  polyline: [{
                    points: points,
                    color: "#0091ff",
                    width: 4
                  }]
                })
              }
              wx.hideLoading();
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '您距离目标区域较远，是否开启导航？',
            confirmText: '导航',
            success: function (res) {
              if (res.confirm) {
                wx.openLocation({
                  latitude: toPoint.latitude,
                  longitude: toPoint.longitude,
                  name: '国际鲜花港-' + markerInfo.name
                })
              }
            }
          });
          that.setData({
            polyline: []
          });
          wx.hideLoading();
        }

        
      },
    })
  },

  /**
   * 导览点击事件
   */
  explainClick (e) {
    console.log(e.currentTarget.dataset.qrcode);
    wx.navigateTo({
      url: '../explain/explain?qrCode=' + e.currentTarget.dataset.qrcode,
    })
  },

  /**
   * 导航点击事件
   */
  navigateClick () {
    let that = this;
    wx.openLocation({
      latitude: that.data.latitude,
      longitude: that.data.longitude,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var longitude = res.longitude;
        var latitude = res.latitude;
        // longitude = 116.797409;
        // latitude = 40.182358;
        wx.request({
          url: 'https://apis.map.qq.com/ws/distance/v1',
          method: 'get',
          data: {
            from: latitude + ',' + longitude,
            to: that.data.latitude + ',' + that.data.longitude,
            mode: 'walking',
            key: app.globalData.mapKey
          },
          success: function (res) {
            var distance = res.data.result.elements[0].distance;
            console.log(distance);
            if(distance < 1500){
              that.setData({
                longitude: longitude,
                latitude: latitude,
                inPark: true
              })
            }else{
              that.setData({
                inPark: false
              })
            }
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
    app.globalData.currPage = 'map';
    app.clearUpdate();
    app.setUpdateLocation();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.currPage = 'others';
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