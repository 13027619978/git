const app = getApp();
const util = require('../../utils/util');
let ticketId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectHeight: '-100vh',
    currentIndex: null,
    hoverHidden: true,
    allBtn: '展开全部',
    maxHeight: 'maxHeight',
    freeStartTime: new Date('2021-02-11').getTime(),
    freeEndTime: new Date('2021-02-17 23:59:59').getTime(),
    sure: false
  },
  // 展开全部
  allBtnClick: function(){
    let that = this;
    if(that.data.maxHeight){
      that.setData({
        allBtn: '收起全部',
        maxHeight: ''
      })
    }else{
      that.setData({
        allBtn: '展开全部',
        maxHeight: 'maxHeight'
      })
    }
  },

  // 门票点击事件
  ticketClick: function(e){
    let that = this;
    let newTicketList = that.data.newTicketList;
    let ticketIndex = e.currentTarget.dataset.ticketindex;
    if(that.data.selectDate == '2021-10-18'){
      if(ticketIndex < 2){
        wx.showModal({
          content: '2021-10-18日为免费开放日，请选择政策性免票购票'
        })
        return;
      }
    }
    // if(that.data.selectDate == '2021-10-27' || that.data.selectDate == '2021-10-28' || that.data.selectDate == '2021-10-29'){
    //   if(newTicketList[ticketIndex].settlePrice != '0'){
    //     wx.showModal({
    //       content: '所选时间暂不支持购票，请选择其他时间预约'
    //     })
    //     return;
    //   }
    // }
    if(that.data.selectDate == '2021-10-01' || that.data.selectDate == '2021-10-02' || that.data.selectDate == '2021-10-03' || that.data.selectDate == '2021-10-04' || that.data.selectDate == '2021-10-05' || that.data.selectDate == '2021-10-06' || that.data.selectDate == '2021-10-07'){
      wx.showModal({
        content: '2021年10月1日至7日，正觉寺内所有展厅（包括马首展）关闭。正觉寺作为入园通道正式开放。感谢您的理解与支持。'
      })
      return;
    }
    let subTicketList = newTicketList[ticketIndex].ticketList;
    let restTotal = that.data.restTotal;
    let stockTotal = that.data.stockTotal;
    let nowTicketList = [];
    let nowDate = util.formatTime(new Date());
    if(restTotal > 0 && stockTotal > 0){
      if(nowDate == that.data.selectDate){
        let nowHour = new Date().getHours();
        if(nowHour >= 11 && nowHour < 14){
          nowTicketList[0] = subTicketList[1];
          nowTicketList[1] = subTicketList[2];
        }else if(nowHour >= 14 && nowHour < 16){
          nowTicketList[0] = subTicketList[2];
        }else if(nowHour < 11){
          nowTicketList = subTicketList;
        }
      }else{
        nowTicketList = subTicketList;
      }
      that.setData({
        selectList: nowTicketList,
        hoverHidden: false
      })
    }else{
      wx.showModal({
        content: '余票不足，请选择其他时间段预约',
      })
    }
  },

  // 票种点击事件
  selectTicketType: function(e){
    ticketId = e.detail.value;
  },

  // 取消点击事件
  cancleClick: function(){
    let that = this;
    ticketId = '';
    that.setData({
      hoverHidden: true,
      selectList: []
    })
  },

  // 确认点击事件
  confirmClick: function(){
    let that = this;
    if(ticketId){
      wx.showLoading({
        title: '加载中',
      })
      wx.navigateTo({
        url: '/pages/ticket/ticket?ticketId=' + ticketId + '&enterDate=' + that.data.selectDate,
        success: function(){
          wx.hideLoading();
          ticketId = '';
          that.setData({
            hoverHidden: true,
            selectList: []
          })
        }
      })
    }else{
      wx.showToast({
        title: '请先选择入园时间段',
        icon: 'none'
      })
    }
    
  },

  // 更多日期点击事件
  moreClick: function(){
    this.setData({
      selectHeight: '0'
    })
  },

  // 选择日期
  selectClick: function(e){
    let that = this;
    let index = e.currentTarget.dataset.index;
    let stockList = that.data.stockList;
    let currentDateList = that.data.currentDateList;
    let restTotal;
    let stockTotal;
    let selectDate = e.currentTarget.dataset.date;
    let selectTime = new Date(selectDate).getTime();
    let newTicketList = that.data.newTicketList;
    stockList.forEach(function(value, key){
      if(value.date == selectDate){
        restTotal = value.restTotal;
        stockTotal = value.stockTotal;
        if(index > 2){
          var selectItem = {};
          selectItem = value;
          currentDateList.splice(2, 1, selectItem);
        }else{
          currentDateList.splice(0, 3, stockList[0], stockList[1], stockList[2]);
        }
      }
    })

    newTicketList.forEach(function(ticket, key){
      if(ticket.ticketList[0].effectStartTime == new Date('2020-11-25').getTime()){
        if(ticket.categoryName != '政策性免票'){
          if(selectTime >= 1613001600000 && selectTime < 1613606400000){
            ticket.ticketList[0].shouldHide = true;
          }else{
            ticket.ticketList[0].shouldHide = false;
          }
        }else{
          ticket.ticketList[0].shouldHide = false;
        }
      }else{
        if(selectTime >= 1613001600000 && selectTime < 1613606400000){
          ticket.ticketList[0].shouldHide = false;
        }else{
          ticket.ticketList[0].shouldHide = true;
        }
      }
    })
    
    that.setData({
      selectDate: selectDate,
      selectTime: selectTime,
      currentDateList: currentDateList,
      restTotal: restTotal,
      stockTotal: stockTotal,
      selectHeight: '-100vh',
      newTicketList: newTicketList
    })
  },

  // 选择器选择日期
  dateSelect: function(e){
    let that = this;
    let dateList = that.data.dateList;
    let selectDate = that.data.dateList[e.detail.value];
    let stockList = that.data.stockList;
    let currentDateList = that.data.currentDateList;
    let restTotal;
    let stockTotal;
    stockList.forEach(function(value, key){
      if(value.date == selectDate){
        restTotal = value.restTotal;
        stockTotal = value.stockTotal;
        if(dateList.indexOf(selectDate) > 2){
          var selectItem = {};
          selectItem = value;
          currentDateList.splice(2, 1, selectItem);
        }else{
          currentDateList.splice(0, 3, stockList[0], stockList[1], stockList[2]);
        }
      }
    })

    that.setData({
      selectDate: selectDate,
      currentDateList: currentDateList,
      restTotal: restTotal,
      stockTotal: stockTotal
    })
  },

  // 确认须知点击事件
  sureClick: function(){
    this.setData({
      sure: true
    })
  },

  // 未到售票日期
  cantBuy: function(){
    wx.showModal({
     content: '所选时间暂不支持购买当前票种，请选择其他日期'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let nowMonth = new Date().getMonth() + 1;
    let nowDay = new Date().getDate();
    wx.request({
      url: app.globalData.url + 'ticketInfo/getTicketStockList',
      data: {
        enterpriseCode: app.globalData.enterpriseCode,
        ticketGroupNum: app.globalData.ticketGroupNum,
      },
      method: 'GET',
      success: function(res){
        if(res.data.success){
          let stockList = res.data.data;
          let dateList = [];
          let currentDateList = [];
          let selectDate;
          let selectTime;
          let restTotal;
          let stockTotal;
          let shwoStockList = [];
          let currentHour = new Date().getHours();
          stockList.forEach(function(value, key){
            // 16点后禁卖当天票
            console.log(currentHour);
            if(currentHour >= 16){
              if(key == 1){
                selectDate = value.date;
                selectTime = new Date(selectDate + ' 23:59:58').getTime();
                restTotal = value.restTotal;
                stockTotal = value.stockTotal;
              }
              if(key < 4 && key != 0){
                currentDateList.push(value);
              }
              if(key > 0){
                shwoStockList.push(value);
                dateList.push(value.date);
              }
            }else{
              shwoStockList.push(value);
              if(key == 0){
                selectDate = value.date;
                selectTime = new Date(selectDate  + ' 23:59:58').getTime();
                restTotal = value.restTotal;
                stockTotal = value.stockTotal;
              }
              if(key < 3){
                currentDateList.push(value);
              }
              dateList.push(value.date);
            }
          })
          that.setData({
            stockList: shwoStockList,
            dateList: dateList,
            selectDate: selectDate,
            selectTime: selectTime,
            currentDateList: currentDateList,
            restTotal: restTotal,
            stockTotal: stockTotal
          })
          wx.request({
            url: app.globalData.url + 'ticketInfo/getSalesList',
            data: {
              enterpriseCode: app.globalData.enterpriseCode,
              ticketGroupNum: app.globalData.ticketGroupNum,
              ticketSalesChannelsNum: 'MINI'
            },
            method: 'GET',
            success:function (res) {
              let groupInfo = res.data.data;
              if(res.data.success){
                that.setData({
                  groupInfo: groupInfo
                })
                let ticketList = groupInfo.ticketSalesInfoList;
                let ticketNameList = [];
                let newTicketList = [];
                ticketList.forEach(function(value, key){
                  let ticketName;
                  if(value.ticketName.indexOf('上午票') > 0){
                    ticketName = (value.ticketName.split('上午票')[0]?value.ticketName.split('上午票')[0]:'') + (value.ticketName.split('上午票')[1]?value.ticketName.split('上午票')[1]:'');
                    ticketName = ticketName.replace(/\s+/g,"");
                  }else if(value.ticketName.indexOf('下午票') > 0){
                    ticketName = (value.ticketName.split('下午票')[0]?value.ticketName.split('下午票')[0]:'') + (value.ticketName.split('下午票')[1]?value.ticketName.split('下午票')[1]:'');
                    ticketName = ticketName.replace(/\s+/g,"");
                  }else if(value.ticketName.indexOf('中午票') > 0){
                    ticketName = (value.ticketName.split('中午票')[0]?value.ticketName.split('中午票')[0]:'') + (value.ticketName.split('中午票')[1]?value.ticketName.split('中午票')[1]:'');
                    ticketName = ticketName.replace(/\s+/g,"");
                  }
                  ticketNameList.push(ticketName);
                  newTicketList.push(ticketName);
                  ticketNameList = Array.from(new Set(ticketNameList));
                  newTicketList = Array.from(new Set(newTicketList));
                })
                
                let hoverList = [];
                // 根据关键词排序票名
                ticketNameList.forEach(function(value, key){
                  let ticketItem = {
                    ticketName: value,
                    ticketList: []
                  }
                  newTicketList[key] = ticketItem;
                })
                
                // 新列表添加票种
                newTicketList.forEach(function(value, key){
                  ticketList.forEach(function(ticket, ticketIndex){
                    let ticketName;
                    if(ticket.ticketName.indexOf('上午票') > 0){
                      ticketName = (ticket.ticketName.split('上午票')[0]?ticket.ticketName.split('上午票')[0]:'') + (ticket.ticketName.split('上午票')[1]?ticket.ticketName.split('上午票')[1]:'');
                      ticketName = ticketName.replace(/\s+/g,"");
                    }else  if(ticket.ticketName.indexOf('下午票') > 0){
                      ticketName = (ticket.ticketName.split('下午票')[0]?ticket.ticketName.split('下午票')[0]:'') + (ticket.ticketName.split('下午票')[1]?ticket.ticketName.split('下午票')[1]:'');
                      ticketName = ticketName.replace(/\s+/g,"");
                    }else{
                      ticketName = (ticket.ticketName.split('中午票')[0]?ticket.ticketName.split('中午票')[0]:'') + (ticket.ticketName.split('中午票')[1]?ticket.ticketName.split('中午票')[1]:'');
                      ticketName = ticketName.replace(/\s+/g,"");
                    }
                    if(value.ticketName == ticketName){
                      var newTicket = ticket;
                      newTicket.effectStartTime = new Date(ticket.effectStartDate).getTime();
                      newTicket.effectEndTime = new Date(ticket.effectEndDate + ' 23:59:59').getTime();
                      let effectStartTime = new Date(ticket.effectStartDate).getTime();
                      let effectEndTime = new Date(ticket.effectEndDate + ' 23:59:59').getTime();
                      if(value.categoryName != '政策性免票'){
                        if(effectStartTime == new Date('2020-11-25').getTime()){
                          if(selectTime >= 1613001600000 && selectTime < 1613606400000){
                            newTicket.shouldHide = true;
                          }else{
                            newTicket.shouldHide = false;
                          }
                        }else{
                          if(selectTime >= 1613001600000 && selectTime < 1613606400000){
                            newTicket.shouldHide = false;
                          }else{
                            newTicket.shouldHide = true;
                          }
                        }
                      }else{
                        newTicket.shouldHide = false;
                      }
                      
                      newTicket.ticketName = newTicket.ticketName.indexOf('上午票')!=-1?newTicket.ticketName.split('上午票')[0] + '上午票08:30-11:00' + newTicket.ticketName.split('上午票')[1]:newTicket.ticketName.indexOf('中午票')!=-1?newTicket.ticketName.split('中午票')[0] + '中午票11:00-14:00' + newTicket.ticketName.split('中午票')[1]:newTicket.ticketName.split('下午票')[0] + '下午票14:00-16:00' + newTicket.ticketName.split('下午票')[1];
                      if(newTicket.ticketName.indexOf('上午票') != -1){
                        value.ticketList[0] = newTicket;
                      }else if(newTicket.ticketName.indexOf('中午票') != -1){
                        value.ticketList[1] = newTicket;
                      }else if(newTicket.ticketName.indexOf('下午票') != -1){
                        value.ticketList[2] = newTicket;
                      }
                      value.categoryName = ticket.categoryName;
                      value.settlePrice = ticket.settlePrice;
                    }
                  })
                })
                that.setData({
                  newTicketList: newTicketList
                })
              }else{
                let msg = res.data.message;
                if(msg == '景区已闭园，请留意闭园通知'){
                  msg = '马首展览已关闭，请关注游园公告'
                }
                wx.showModal({
                  content: msg,
                })
              }
            }
          })
          
        }else{
          wx.showModal({
            content: res.data.message,
          })
        }
        wx.hideLoading();
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