'use strict'

module.exports = {

  port: process.env.PORT || 4000,
  website: '127.0.0.1:4000',
  //天气配置
  weatherConfig: {
    gaodeWeatherUrl: 'http://restapi.amap.com/v3/weather/weatherInfo?key=4029e5ad93ef93ad8821cad8b05d5978&extensions=all&city=',
    weatherPicUrl: 'http://47.94.82.166:3001/static/images/tianqi2019/ico2/'
  },
  //园博园接口配置
  ybyApiConfig:{
    getTicketsIncomeTodayUrl:'https://smart-ideas.com.cn/yby/ticketsOrder/web/getIncome?id=34',
    getTicketsIncomeTodayCacheKey:'getTicketsIncomeTodayCacheKey',
    getCardsIncomeTodayUrl:'https://smart-ideas.com.cn/yby/cardsOrderWeb/web/getIncome?id=34',
    getCardsIncomeTodayCacheKey:'getCardsIncomeTodayCacheKey',
    getBikeIncomeTodayUrl:'https://api.joybike.com.cn/ccsmart/settle/web/getCurrentIncome1?id=34',
    getBikeIncomeTodayCacheKey:'getBikeIncomeTodayCacheKey',   
    getNationalDayIncomeTodayUrl:'https://smart-ideas.com.cn/yby/anotherTicketsOrder/web/getIncome?id=34',
    getNationalDayIncomeTodayCacheKey:'getNationalDayIncomeTodayCacheKey',   
  },
  mysqlConfig:{
    mysqlHost         : '47.94.82.166',     
    mysqlUserName     : 'qsmx',              
    mysqlPassword     : '123456',       
    mysqlPort         : '3306',                   
    mysqlDatabase     : 'qsmx_datav' 
  }
}