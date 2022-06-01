// pages/explain/explain.js
const Page = require('../../utils/ald-stat.js').Page;
const plugin = requirePlugin("myPlugin");
const myAudio = wx.createInnerAudioContext();
myAudio.onPlay(function () {
  console.log('播放');
  wx.hideLoading();
});
myAudio.onPause(function(){
  app.setUpdateLocation();
})
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    close: false
  },

  /**
   * 音乐点击事件
   */
  audioClick () {
    if(this.data.close){
      this.setData({
        close: false
      })
      myAudio.play();
      wx.showLoading({
        title: '音频加载中...',
      })
    }else{
      this.setData({
        close: true
      })
      myAudio.pause();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let qrCode = options.qrCode;
    wx.showLoading({
      title: '音频加载中...',
    })
    let that = this;
    let flowerInfo;
    if (qrCode == '0') {
      flowerInfo = {
        flowersCnName: '未堂小镇',
        family: '景点',
        feature: '一期总建筑面积为3558.2平方米，利用集装箱，焊接组合出形态各异的建筑造型，打造了餐饮美食区、时尚购物区、音乐酒吧区、畅想书吧区四个主要区域，为广大游客提供一个集餐饮、休闲、聚会、购物、娱乐为一体的特色消费场所。',
        imageUrl: 'https://iot.smart-ideas.com.cn/ssgyImage/wtxz1.jpg'
      };
    } else if (qrCode == '1') {
      flowerInfo = {
        flowersCnName: '顺奥冰世界',
        family: '景点',
        feature: '顺奥冰世界，为积极响应“三亿人上冰雪”的号召，助力2022年冬奥会，投资2200万元，建设面积4000平方米的冰世界项目，冰场包括国际专业冰球场地、娱乐冰场、趣味滑道、移动看台及服务区，其中，专业冰场面积1586㎡，严格按照NHL（北美职业冰球联盟）冰场标准建造，娱乐冰场由趣味滑道巧妙连接，面积750㎡，冰场配备进口冰鞋、专业护具等全套冰上运动设备，提供专业教练、滑冰小助手等帮助没有经验的游客进行冰上体验。现已推出了基础滑冰培训、速度滑冰培训、花样滑冰培训等课程，为广大青少年及企业团队拓展提供独具特色的体验内容。',
        imageUrl: ''
      };
    } else if (qrCode == '2') {
      flowerInfo = {
        flowersCnName: '索道滑水',
        family: '景点',
        feature: '索道滑水俱乐部，是由国际滑水联合会、国家体育局水上运动管理中心认定、中国首家符合国际标准的索道滑水比赛场地，拥有全球最长、设施最完善的索道滑水赛道，是全国乃至全亚洲内容最丰富、阵容最强大、设备最先进的索道滑水俱乐部，曾于2013年、2014年举办了两届国际大型世界杯索道滑水赛事。',
        imageUrl: ''
      };
    } else if (qrCode == '3') {
      flowerInfo = {
        flowersCnName: '帆船俱乐部',
        family: '景点',
        feature: '帆船俱乐部，是一家为儿童、青少年和成人提供团体和私人航海课程的专业机构，拥有多种水上运动船并提供租赁和教练服务，包括OP帆船、浪行11帆船、WETA三体帆船、Omega帆船、单人双人皮划艇、SUP桨板、皮筏子帆板项目等。',
        imageUrl: ''
      };
    } else if (qrCode == '4') {
      flowerInfo = {
        flowersCnName: '北京华彩创佳文化传媒有限公司',
        family: '景点',
        feature: '北京华彩创佳文化传媒有限公司，主要开展版权登记、授权、管理等服务，并运营以民族文化为主题的系列体验交流活动，逐步形成民族作品内容创作、技术运行支持、设计素材孵化、版权授权与交易、交流体验相关要素集合的产业功能区域。',
        imageUrl: ''
      };
    }
    that.setData({
      flowerInfo: flowerInfo
    });
    myAudio.src = 'https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text=' + flowerInfo.feature;
    myAudio.play();
    myAudio.loop = true;
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
    app.setUpdateLocation();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    myAudio.stop();
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