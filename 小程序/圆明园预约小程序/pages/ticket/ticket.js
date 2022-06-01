// pages/ticket/ticket.js
const util = require('../../utils/util');
const app = getApp();
// 游客信息
var visitorInfo;
// 性别限制
var sexType;
// 年龄限制
var ageRequired;
// 最小年龄
var ageMin;
// 最大年龄
var ageMax;
// 地区限制
var regionRequired;
// 限制地区参照
var regionValue;
// 可够最远周期
var buyCycleType;
// 可够最近天数
var buyCycleDays;
// 有效开始日期
var effectStartDate;
// 有效结束日期
var effectEndDate;
// 购买张数限制
var buyNumberType;
// 购买张数
var buyNumber;
// 票价
var settlePrice;
// 产品ID
var ticketInfoId;
// 身份证限制
var idCardRequired;

// 证件类型
var certType = 0;

// 旅行史
var lxs;
// 接触史
var jcs;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hoverHide: true,
    sure: false,
    ticketNumber: 1,
    subWidth: '60rpx',
    items: [
      {value: '0', name: '身份证', checked: 'true'},
      {value: '1', name: '护照'}
    ],
    fyItems: [
      {value: '0', name: '是'},
      {value: '1', name: '否'}
    ],
    certType: 0
  },

  // 证件类型
  radioChange(e) {
    let certType = e.detail.value;
    this.setData({
      certType: certType
    })
  },

  // 旅行史
  lxsChange(e){
    lxs = e.detail.value;
  },

  // 接触史
  jcsChange(e){
    jcs = e.detail.value;
  },

  // 询问层取消
  cancelClick: function(){
    this.setData({
      hoverHide: true
    })
  },

  // 询问层确认
  confirmClick: function(){
    let that = this;
    let openId = wx.getStorageSync('openId');
    let totalPrice = that.data.ticketInfo.settlePrice * that.data.ticketNumber;
    that.setData({
      hoverHide: true
    })
    wx.showLoading({
      title: '加载中',
    })
    var params = {
      source: 'MINI',
      payWay: 'UNIONPAY',
      ticketInfoId: that.data.ticketInfo.id,
      openId: openId,
      totalPrice: totalPrice,
      unitPrice: that.data.ticketInfo.settlePrice,
      visitDate: that.data.selectDate,
      buyQuantity: that.data.ticketNumber,
      visitors: that.data.visitors
    };
    wx.request({
      url: app.globalData.url + 'order/create',
      method: 'POST',
      data: params,
      success: function(res){
        let payParams = res.data.data.payParams;
        let ticketOrderId = res.data.data.ticketOrderId;
        let payStatus = res.data.data.payStatus;
        wx.hideLoading();
        if(payStatus == '1'){
          wx.redirectTo({
            url: '../orderDetail/orderDetail?ticketId=' + ticketOrderId,
          })
        }else{
          wx.requestPayment({
            nonceStr: payParams.nonceStr,
            package: payParams.package,
            paySign: payParams.paySign,
            timeStamp: payParams.timeStamp,
            signType: payParams.signType,
            success (res){
              wx.redirectTo({
                url: '../orderDetail/orderDetail?ticketId=' + ticketOrderId,
              })
            }
          })
        }
      }
    })
  },

  // 确认须知点击事件
  sureClick: function(){
    this.setData({
      sure: true
    })
  },

  // 选择日期
  selectDate: function (e) {
    let that = this;
    that.setData({
      startTime: e.detail.value
    })
  },
  // 增加购票数
  addClick: function(){
    let ticketNumber = parseInt(this.data.ticketNumber);
    let subWidth;
    if(ticketNumber == buyNumber && buyNumberType == '1'){
      wx.showModal({
        content: '单次最多预约'+buyNumber+'人'
      });
      return;
    }
    ticketNumber += 1;
    if(ticketNumber > 0){
      subWidth = '60rpx';
    }else{
      subWidth = '0';
    }
    this.setData({
      ticketNumber: ticketNumber,
      subWidth: subWidth
    })
  },
  // 减少购票数
  subClick: function(){
    let ticketNumber = parseInt(this.data.ticketNumber);
    let subWidth;
    ticketNumber -= 1;
    if(ticketNumber > 0){
      subWidth = '60rpx';
    }else{
      ticketNumber = 0;
      subWidth = '0';
    }
    this.setData({
      ticketNumber: ticketNumber,
      subWidth: subWidth
    })
  },

  // 在线支付
  submit: function(e){
    var that = this;
    let isokNumber = 0;
    var ticketNumber = this.data.ticketNumber;
    let nowDate = util.formatTime(new Date());
    let nowHour = new Date().getHours();
    if(that.data.selectDate == nowDate){
      if(nowHour >= 16){
        wx.showModal({
          content: '16点后不支持当日票预约',
        })
        return;
      }
    }

    if(lxs && jcs){
      if(lxs == '0' || jcs == '0'){
        wx.showModal({
          content: '建议您向社区报到并进行相关隔离防护, 谢谢您的配合'
        })
        return;
      }
    }else{
      wx.showModal({
        content: '请确认您是否存在中高风险地区旅行史和新冠检测阳性人员接触史'
      })
      return;
    }

    if(ticketNumber == 0){
      wx.showToast({
        title: '请先选择购票张数',
        icon: "none"
      })
      return;
    }
    var visitors = [];
    for(var i = 0; i < ticketNumber; i++){
      var visitorName = e.detail.value['name' + i];
      var visitorPhone = e.detail.value['phone' + i];
      var visitorIdCard = e.detail.value['idCard' + i];
      if(visitorName && visitorPhone && visitorIdCard){
        if(visitorPhone.length != 11){
          wx.showToast({
            title: '请输入正确的手机号',
            icon: 'none'
          })
          return;
        }

        if(that.data.certType == 0){
          if(visitorIdCard.length != 18){
            wx.showToast({
              title: '请输入正确的身份证号',
              icon: 'none'
            })
            return;
          }
        }

        var visitorItem = {
          userName: visitorName,
          phone: visitorPhone,
          certNumber: visitorIdCard,
          certType: '0'
        }
        visitors.push(visitorItem);
      }else{
        wx.showToast({
          title: '请先完善游客信息',
          icon: 'none'
        })
        return;
      }
    };

    // 判断身份证是否重复
    let idcardList = [];
    visitors.forEach(function(visitor, key){
      let itemIdCard = visitor.certNumber;
      idcardList.push(itemIdCard);
    })
    if(new Set(idcardList).size != idcardList.length){
      wx.showModal({
        content: '请勿输入重复的身份证号！',
      })
      return;
    }else{
      // 验证游客身份信息
      // if(that.data.certType == 0){
      //   var visitorNumber = 0;
      //   getIsok(visitors, visitorNumber, that);
      // }else{
      //   that.setData({
      //     visitors: visitors,
      //     hoverHide: false
      //   })
      // }
      that.setData({
        visitors: visitors,
        hoverHide: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    var ticketId = options.ticketId;
    var selectDate = options.enterDate;
    wx.request({
      url: app.globalData.url + 'ticketInfo/get',
      data: {
        ticketInfoId: ticketId
      },
      method: 'GET',
      success: function(res){
        wx.hideLoading();
        if(res.data.success){
          let ticketInfo = res.data.data.ticketInfo;
          let ticketInfoBuyRules = res.data.data.ticketInfoBuyRules;
          let ticketInfoCheckRules = res.data.data.ticketInfoCheckRules;
          let rulesList = [];
          
          // 售票日期
          let effectRules = '售卖日期：' +  ticketInfoBuyRules.salesStartDate + '至' + ticketInfoBuyRules.salesEndDate;
          rulesList.push(effectRules);

          // 单次最多购买
          buyNumberType = ticketInfoBuyRules.buyNumberType;
          buyNumber = ticketInfoBuyRules.buyNumber;
          if(buyNumberType == '1'){
            let maxNumberRules = '单次最多预定' + buyNumber + '张门票';
            rulesList.push(maxNumberRules);
          }

          // 年龄限制
          ageRequired = ticketInfoBuyRules.ageRequired;
					ageMax = ticketInfoBuyRules.ageMax;
					ageMin = ticketInfoBuyRules.ageMin;
					if(ageRequired == '1'){
            let ageRules = '购票年龄限制：'+ageMin+'至'+ageMax+'周岁';
            rulesList.push(ageRules);
          }
          
          // 购买地区限制
          regionRequired = ticketInfoBuyRules.regionRequired;
          regionValue = ticketInfoBuyRules.regionValue;
          let regionList = util.regionList;
          var regionString = '';
          if(regionRequired == '1'){
            var regionValueList = regionValue.split(',');
            regionValueList.forEach(function(value, key){
              regionList.forEach(function(region, regionKey){
                if(value == region.key){
                  regionString += region.value + '、';
                }
              })
            })
            regionString = regionString.substr(0, regionString.length - 1);
            let regionRules = '暂不支持'+ regionString +'地区购票';
            rulesList.push(regionRules);
          }

          // 性别限制
					sexType = ticketInfoBuyRules.sexType;
					if(sexType == '1' || sexType == '2'){
            let sexRules;
						if(sexType == '1'){
              sexRules = '仅限男性购票';
						}else{
							sexRules = '仅限女性购票';
            }
            rulesList.push(sexRules);
          }

          let ticketName = ticketInfo.ticketName;
          if(ticketName.indexOf('上午票') != -1){
            ticketName = ' 08:30-11:00';
          }else if(ticketName.indexOf('中午票') != -1){
            ticketName = ' 11:00-14:00';
          }else{
            ticketName = ' 14:00-16:00';
          }

          that.setData({
            ticketInfo: ticketInfo,
            rulesList: rulesList,
            selectDate: selectDate,
            ticketName: ticketName
          })
        }else{
          wx.showModal({
            content: res.data.message,
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

// 验证游客身份证信息是否正确
function getIsok(visitors, isokNumber, that){
  wx.request({
    url: 'https://zid.market.alicloudapi.com/idcard/VerifyIdcardv2',
    method: 'GET',
    header: {
      'Authorization': 'APPCODE 8e2e35c3f1214969809962a3fe2f72a3'
    },
    data: {
      cardNo: visitors[isokNumber].certNumber,
      realName: visitors[isokNumber].userName
    },
    success: function(res){
      console.log(res);
      if(res.data){
        let isok = res.data.result.isok;
        if(res.data.error_code == '0'){
          if(!isok){
            wx.showModal({
              content: '身份信息错误, 请您先核对身份证信息',
            })
            return;
          }else{
            isokNumber += 1;
            let visitorNumber = visitors.length;
            if(isokNumber < visitorNumber){
              getIsok(visitors, isokNumber, that);
            }else{
              that.setData({
                visitors: visitors,
                hoverHide: false
              })
            }
          }
        }else if(res.data.error_code == '206501'){
          wx.showModal({
            content: '身份信息错误, 请您先核对身份证信息',
          })
        }else{
          that.setData({
            visitors: visitors,
            hoverHide: false
          })
        }
      }else{
        that.setData({
          visitors: visitors,
          hoverHide: false
        })
      }
    }
  })
}