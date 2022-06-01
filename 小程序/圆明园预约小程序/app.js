//app.js
App({
  onLaunch: function () {
    let that = this;
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        wx.request({
          url: that.globalData.url + 'wxAuth/miniAuthorize',
          data: {
            enterpriseCode: that.globalData.enterpriseCode,
            ticketGroupNum: that.globalData.ticketGroupNum,
            code: res.code
          },
          method: 'GET',
          success: function (res) {
            console.log('123');
            console.log(res);
            if(res.data.success){
              let openId = res.data.data;
              wx.setStorage({
                data: openId,
                key: 'openId'
              })
            }else{
              wx.showModal({
                content: res.data.message
              })
            }
          }
        })
      }
    })
  },
  globalData: {
    url: 'https://boss.smart-ideas.com.cn/ticketApi/',
    enterpriseCode: 'TgsEpcYmy',
    ticketGroupNum: 'TGN20201125101904070',
  }
})