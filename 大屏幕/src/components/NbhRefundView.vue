<template>
  <div class="hello" :style="{background:url_back_img}" style="width: 100vw;height: 100vh;overflow: hidden;background-size: cover;">
    <div class="hoverView">

    </div>
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <div class="title">
          <p>南北湖自驾船数字化运营系统</p>
          <p class="childTitle">{{scenicName}}</p>
        </div>
      </div>
      <div class="contentView">
        <!-- 左侧视图 -->
        <div class="leftView">
          <div class="leftContent">
            <!-- 天气部分 -->
            <div class="weatherView">
              <p class="dateView">{{nowDate}}</p>
              <!-- 今日天气 -->
              <div class="nowWeather">
                <p class="nowTemp">{{weatherList.length>0?weatherList[0].temperature:'10℃'}}</p>
                <div class="nowWeatherPic">
                   <img :src="weatherList.length>0?weatherList[0].picUrl:'http://smart-ideas.com.cn/ico2/b0.png'">
                </div>
                <div class="nowWeatherItem">
                  <p>今日天气</p>
                  <p class="nowWeatherText">{{weatherList.length>0?weatherList[0].weather:'晴'}}</p>
                </div>
                <div class="nowWeatherItem">
                  <p class="nowWindType">{{weatherList.length>0?weatherList[0].wind:'东'}}风</p>
                  <p class="nowWindLevel">{{weatherList.length>0?weatherList[0].windpower:'>2'}}级</p>
                </div>
              </div>
              <!-- 以后天气 -->
              <div class="lastWeather">
                <div class="lastWeatherItem">
                  <p>{{weatherList.length>0?weatherList[1].date:'明天'}}</p>
                  <p>{{weatherList.length>0?weatherList[1].weather:'多云'}}</p>
                  <p>{{weatherList.length>0?weatherList[1].temperature:'13℃'}}</p>
                  <p>{{weatherList.length>0?weatherList[1].wind:''}}风:{{weatherList.length>0?weatherList[1].windpower:''}}级</p>
                </div>
                <div class="lastWeatherItem">
                  <p>{{weatherList.length>0?weatherList[2].date:'后天'}}</p>
                  <p>{{weatherList.length>0?weatherList[2].weather:'晴'}}</p>
                  <p>{{weatherList.length>0?weatherList[2].temperature:'12℃'}}</p>
                  <p>{{weatherList.length>0?weatherList[2].wind:''}}风:{{weatherList.length>0?weatherList[2].windpower:''}}级</p>
                </div>
                <div class="lastWeatherItem">
                  <p>{{weatherList.length>0?weatherList[3].date:'大后天'}}</p>
                  <p>{{weatherList.length>0?weatherList[3].weather:'晴'}}</p>
                  <p>{{weatherList.length>0?weatherList[3].temperature:'10℃'}}</p>
                  <p>{{weatherList.length>0?weatherList[3].wind:'东'}}风:{{weatherList.length>0?weatherList[3].windpower:''}}级</p>
                </div>
              </div>
            </div>
            <!-- 退款详情 -->
            <div class="rightNotice">
              <p class="noticeTitle">退款详情</p>
              <dv-scroll-board :config="refundConfig" style="width:100%;height:380px" />
            </div>


          </div>
        </div>

        <!-- 中间视图 -->
        <div class="centerView">
          <!-- 地图部分 -->
          <div class="mapView">
            <dv-border-box-7>
              <div class="iframeView">
                <iframe src="http://smart-ideas.com.cn/mapView/nbhzjcmap.html" frameborder="0" width="680px" height="750px"></iframe>
                <!-- <img class="mapBg" src="../assets/xwhmapBg.png"> -->
              </div>
            </dv-border-box-7>
          </div>

          <!-- 购票流程 -->
          <div class="progressView">
            <p class="progressTitle">自驾船租赁流程</p>
            <div class="progressList">
              <dv-border-box-8 :reverse="true">1.排队上船</dv-border-box-8>
              <dv-border-box-8 :reverse="true">2.扫码付押金</dv-border-box-8>
              <dv-border-box-8 :reverse="true">3.结束游玩</dv-border-box-8>
              <dv-border-box-8 :reverse="true">4.上岸扫码退押金</dv-border-box-8>
            </div>
          </div>

          <!-- 温馨提示 -->
          <div class="wxts">
            <dv-border-box-10>温馨提示：欢迎乘坐南北湖游船</dv-border-box-10>
          </div>
        </div>

        <!-- 右侧视图 -->
        <div class="rightView">
          <!-- 退款二维码 -->
          <div class="qrcodeView">
            <p class="qrcodeViewTitle">退款二维码</p>
            <div class="qrcodeImgView">
              <!-- <img class="qrcodeImg" :src="src"> -->
              <div id="qrcode" ref="qrcode" ></div>
            </div>
            <p class="qrcodeNotice">二维码有效期五分钟，请扫码后尽快退款</p>
          </div>

          <!-- 租赁详情 -->
          <div class="leaseDetailView">
            <p class="noticeTitle">租赁详情</p>
            <dv-scroll-board :config="leaseConfig" style="width:100%;height:300px" />
          </div>

          <!-- 租赁情况 -->
          <div class="onLeaseView">
            <p class="noticeTitle">租赁情况</p>
            <div class="onLeaseNumber">
              <p class="leaseTitle">在租数量:</p>
              <dv-digital-flop :config="config1" style="width:200px;height:110px;" />
            </div>
            <p class="updateTime">更新时间：{{updateTime}}</br>技术支持: 北京骑思妙享科技有限公司 400-898-7021</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QRCode from 'qrcode2';
export default {
  name: 'NbhRefundView',
  data () {
    return {
      "url_back_img": "url("+require('../assets/zhzx-bg.jpg')+") no-repeat left top #000",
      "xscale": 1,
      "yscale": 1,
      "updateTime": '',
      "scenicName": '',
      "nowDate": "2021-01-19 00:00:00",
      "nowPic": "",
      "weatherList": [],
      "option1": {},
      "option2": {},
      "option3": {},
      "option4": {},
      "option5": {},
      "option6": {},
      "config1": {
        number: [0],
        content: '{nt}',
        style: {
          fontSize: 120,
          fill: '#0aff4d',
          fontWeight: 'bold'
        }
      },
      "refundConfig": {
        header: ['手机号', '退款状态'],
        data: [

        ],
        rowNum: 7,
        align: ['center','center'],
        columnWidth: [350, 150]
      },
      "leaseConfig": {
        header: ['编号', '手机号', '押金'],
        data: [

        ],
        align: ['center','center','center'],
        columnWidth: [150, 200, 150]
      },
      "src": ""
    }
  },
  methods: {
    createCode(){
      let qrcode = new QRCode('qrcode', {
        width: 150,  // 二维码宽度
        height: 150, // 二维码高度
        text: 'http://rent.smart-ideas.com.cn/nbhWeb/nbhRefund/?date=' + new Date().getTime()
      })
    },
    clearCode () {
      this.$refs.qrcode.innerHTML = ''
    }
  },
  mounted: function(){
    let scenicId = '9c938dcc1cca436093bb4432392dee2b';
    let that = this;
    let xScale = window.innerWidth / 1920;
    let yScale = window.innerHeight / 1080;
    that.xscale = xScale;
    that.yscale = yScale;
    // 初始化时间
    setInterval(function(){
      var nowYear = new Date().getFullYear();
      var nowMonth = new Date().getMonth() + 1;
      nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
      var nowDay = new Date().getDate();
      nowDay = nowDay>9?nowDay:'0'+nowDay;
      var nowHour = new Date().getHours();
      nowHour = nowHour>9?nowHour:'0'+nowHour;
      var nowMinutes = new Date().getMinutes();
      nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
      var nowSeconds = new Date().getSeconds();
      nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
      that.nowDate = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
      if(that.updateTime != '设备离线, 请您重新启动设备' && that.updateTime){
        var nowDateString = new Date(that.nowDate);
        var updateString = new Date(that.updateTime);
        if(nowDateString - updateString >= 120 * 1000){
          that.updateTime = '设备离线, 请您重新启动设备';
        }
      }
    }, 1000)

    //获取天气情况
    axios.get('http://node.smart-ideas.com.cn:3001/datav/common/weather/v1/weatherInfo?city=330100')
      .then(function(res){
        console.log(res);
        that.weatherList = res.data;
      }).catch(function(err){
        console.log(err);
      })

    var seconds = 0;
    setInterval(function(){
      seconds += 1;
      if(seconds == 1 || seconds % 20 == 0){
        // 获取租赁详情
        axios.get('http://rent.smart-ideas.com.cn/nbhpark/deviceDataView/getDeviceShipLeaseInfo?scenicId=' + scenicId)
          .then(function(res){
            var refundList = res.data;
            var dataList = [];
            refundList.forEach(function(value, key){
              var newArr = [];
              newArr[0] = value.code;
              if (value.phone) {
                newArr[1] = value.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
              } else {
                newArr[1] = '---';
              }
              if (value.money) {
                 newArr[2] = parseFloat(value.money).toFixed(2);
              }
              dataList[key] = newArr;
            })
            if(dataList.length == 0){
              dataList = [
                ['-', '-', '-'],
                ['-', '-', '-'],
                ['-', '-', '-'],
                ['-', '-', '-'],
                ['-', '-', '-']
              ]
            }
            that.leaseConfig = {
              header: ['编号', '手机号', '押金'],
              data: dataList,
              align: ['center','center','center'],
              columnWidth: [150, 200, 150],
              style: {
                fontSize: '20'
              },
              rowNum: 5
            }
          })
          .catch(function(err){
            console.log(err);
          })

        // 获取退款详情
        axios.get('http://rent.smart-ideas.com.cn/nbhpark/deviceDataView/getDeviceShipRefundInfo?scenicId=' + scenicId)
          .then(function(res){
            var leaseList = res.data;
            var dataList = [];
            leaseList.forEach(function(value, key){
              var newArr = [];
              newArr[1] = value.status;
              if (value.phone) {
                newArr[0] = value.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
              } else {
                newArr[0] = '---';
              }
              dataList[key] = newArr;
            })
            if(dataList.length == 0){
              dataList = [
                ['-', '-'],
                ['-', '-'],
                ['-', '-'],
                ['-', '-'],
                ['-', '-'],
                ['-', '-'],
                ['-', '-']
              ]
            }
            that.refundConfig = {
              header: ['手机号', '退款状态'],
              data: dataList,
              rowNum: 7,
              align: ['center','center'],
              columnWidth: [350, 150]
            }
          })
          .catch(function(err){
            console.log(err);
          })

        // 获取在租人数
        axios.get('http://rent.smart-ideas.com.cn/nbhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=' + scenicId)
          .then(function(res){
            console.log(res);
            that.config1 = {
              number: [parseInt(res.data[1].number)],
              content: '{nt}',
              style: {
                fontSize: 120,
                fill: '#0aff4d',
                fontWeight: 'bold'
              }
            };
            var nowYear = new Date().getFullYear();
            var nowMonth = new Date().getMonth() + 1;
            nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
            var nowDay = new Date().getDate();
            nowDay = nowDay>9?nowDay:'0'+nowDay;
            var nowHour = new Date().getHours();
            nowHour = nowHour>9?nowHour:'0'+nowHour;
            var nowMinutes = new Date().getMinutes();
            nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
            var nowSeconds = new Date().getSeconds();
            nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
            that.updateTime = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
          })
          .catch(function(err){
            console.log(err);
          })

        // 获取退款二维码
        that.clearCode();
        that.createCode();
      }
    }, 1000);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hoverView{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
  }
  .updateTime{
     width: 100%;
     text-align: right;
     font-size: 12px;
     color: #fff;
     position: absolute;
     bottom: -25px;
     right: 10px;
     line-height: 25px;
  }
  .container{
    background: none;
    width: 1920px;
  }
  /* 标题 */
  .titleView{
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .titleView img{
    width: 100%;
  }
  .titleView .title{
    position: absolute;
    color: #fff;
    font-size: 30px;
    /* font-weight: bold; */
    letter-spacing: 5px;
  }
  .childTitle{
    font-size: 18px;
    text-align: center;
  }

  /* 内容部分 */
  .contentView{
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: nowrap;
    margin-top: 10px;
  }
  /* 左侧试图 */
  .leftView{
    width: 550px;
    height: 950px;
    position: relative;
  }
  .leftContent{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  /* 退款详情 */
  .noticeTitle{
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    padding-left: 20px;
    margin-bottom: 20px;
  }
  .rightNotice{
    width: 100%;
    height: 521px;
    background: url(../assets/rightBg1.png) no-repeat left top;
    background-size: cover;
    padding: 50px 40px 40px 50px;
    padding-top: 50px;
  }

  /* 退款二维码 */
  .qrcodeView{
    width: 100%;
    padding-top: 25px;
    height: 300px;
  }
  .qrcodeViewTitle{
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    padding-left: 75px;
    line-height: 40px;
  }
  .qrcodeImgView{
    width: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #qrcode{
    padding: 5px;
    background-color: #fff;
  }
  .qrcodeImg{
    width: 150px;
    height: 150px;
    margin: 0 auto;
  }
  .qrcodeNotice{
    font-size: 20px;
    color: #fff;
    width: 100%;
    text-align: center;
  }

  /* 中间视图 */
  .centerView{
    width: 840px;
    height: 950px;
    padding: 10px 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .mapView{
    width: 710px;
    height: 770px;
    margin: 0 auto;
  }
  .iframeView{
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url(../assets/xwhmapBg1.jpg) no-repeat 14px 10px; */
    background-size: 680px 750px;
    position: relative;
  }
  .mapBg{
    position: absolute;
    left: 14px;
    top: 10px;
    width: 680px;
    height: 750px;
  }

  .progressView{
    width: 100%;
    font-size: 22px;
    color: #fff;
    padding-top: 10px;
  }
  .progressView .progressTitle{
    font-size: 20px;
    padding-left: 30px;
  }
  .progressView .progressList{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10px;
  }
  .progressView .progressList div{
    flex: 1;
    text-align: center;
    line-height: 50px;
    height: 50px;
  }

  .wxts{
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    width: 100%;
    line-height: 50px;
    height: 50px;
    text-align: center;
  }

  /* 右侧视图 */
  .rightView{
    width: 545px;
    height: 950px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background: url(../assets/left-bg.png) no-repeat left top;
    background-size: cover;
  }

  /* 天气预报 */
  .weatherView{
    width: 100%;
    height: 350px;
    padding-left: 30px;
    padding-top: 42px;
    padding-bottom: 20px;
    background: url(../assets/rightBg2.png) no-repeat left top;
    background-size: cover;
  }
  .weatherView .dateView{
    font-size: 23px;
    color: #fff;
    padding-left: 40px;
    line-height: 30px;
  }
  .nowWeather{
    display: flex;
    justify-content: start;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 20px;
  }
  .nowWeather .nowTemp{
    flex: 0 0 40%;
    font-size: 45px;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }
  .nowWeather .nowWeatherPic{
    flex: 0 0 16%;
    max-height: 60px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  .nowWeather .nowWeatherPic img{
    width: 100%;
  }
  .nowWeather .nowWeatherItem{
    flex: 0 0 22%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: #fff;
  }
  .lastWeather{
    display: flex;
    justify-content: start;
    align-items: center;
    padding-top: 15px;
  }
  .lastWeather .lastWeatherItem{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: #fff;
  }

  /* 租赁详情 */
  .leaseDetailView{
    width: 100%;
    height: 406px;
    padding: 20px 40px 30px 60px;
  }

  /* 在租数量 */
  .onLeaseView{
    width: 100%;
    height: 270px;
    padding: 0 40px 30px 60px;
  }
  .onLeaseView .onLeaseNumber{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .onLeaseView .noticeTitle{
    margin-bottom: 60px;
  }
  .onLeaseView .leaseTitle{
    color: #fff;
    font-size: 30px;
    line-height: 70px;
  }
</style>
