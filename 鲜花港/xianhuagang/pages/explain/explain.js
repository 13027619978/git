// pages/explain/explain.js
const Page = require('../../utils/ald-stat.js').Page;
const plugin = requirePlugin("myPlugin");
const myAudio = wx.createInnerAudioContext();
wx.setInnerAudioOption({
  obeyMuteSwitch: false
})
myAudio.onPlay(function () {
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
    wx.showLoading({
      title: '音频加载中...',
    })
    let qrCode = options.qrCode;
    let that = this;
    wx.request({
      url: app.globalData.url + 'iotsmart/flowersApp/getFlowersInfo',
      method: 'get',
      data: {
        flowersCode: qrCode
      },
      success: function(res){
        
        if(res.data.code == 'SUCCESS'){
          let flowerInfo = res.data.data;
          that.setData({
            flowerInfo: flowerInfo
          })
          if (qrCode >= 1959984 && qrCode <= 1959998) {
            switch(qrCode){
              case '1959998':
                myAudio.src = 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/power/145999945067446.mp3';
              break;

              case '1959997':
                myAudio.src = 'https://iot.smart-ideas.com.cn/xhgAudio/40480570.mp3';
              break;

              case '1959996':
                myAudio.src = 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925329.mp3';
                break;

              case '1959995':
                myAudio.src = 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925340.mp3';
                break;

              case '1959994':
                myAudio.src = 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925362.mp3';
                break;

              case '1959993':
                myAudio.src = 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925351.mp3';
                break;

              case '1959992':
                myAudio.src = 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925373.mp3';
                break;

              case '1959991':
                myAudio.src = 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925384.mp3';
                break;

              case '1959990':
                myAudio.src = 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925394.mp3';
                break;

              case '1959989':
                myAudio.src = 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925406.mp3';
                break;

              case '1959988':
                myAudio.src = 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925416.mp3';
                break;

              case '1959987':
                myAudio.src = 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925427.mp3';
                break;

              case '1959986':
                myAudio.src = 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457925438.mp3';
                break;

              case '1959985':
                myAudio.src = 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/1457932496.mp3';
                break;

              case '1959984':
                myAudio.src = 'https://newlj.oss-cn-beijing.aliyuncs.com/yjly/power/145794092250695.mp3';
                break;
            }
            myAudio.play();
          }else{
            if (flowerInfo.feature) {
              plugin.textToSpeech({
                lang: "zh_CN",
                tts: true,
                content: flowerInfo.feature,
                success: function (res) {
                  console.log('123');
                  if (res.retcode == 0) {
                    myAudio.src = res.filename;
                    myAudio.play();
                  } else {
                    myAudio.src = 'https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text=' + flowerInfo.feature;
                    myAudio.play();
                  }
                },
                fail: function (res) {
                  console.log(res);
                  console.log('321');
                  myAudio.src = 'https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text=' + flowerInfo.feature;
                  myAudio.play();
                }
              })
              myAudio.loop = true;
            } else {
              wx.hideLoading();
            }
          }
        }else{
          wx.showModal({
            title: '提示',
            content: '暂无数据',
            success: function(){
              wx.navigateBack({});
            }
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