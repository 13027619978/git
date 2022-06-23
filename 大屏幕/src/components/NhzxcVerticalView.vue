<template>
  <div class="hello">
    <dv-full-screen-container class="container">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <div class="title">
          <p>自行车智慧运营系统</p>
          <p class="childTitle">{{siteName}}</p>
        </div>
      </div>
      <div class="contentView">
          <!-- 左侧视图 -->
          <div class="leftView">
            <dv-border-box-7>
              <div class="left-content">
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

                <!-- 退款二维码 -->

                <div class="qrcodeView" >
                    <p class="noticeTitle">退押金二维码(Refund QR code)</p>
                    <div id="qrcode" ref="qrcode" ></div>
                    <p class="refundTxt">当前二维码为单车还车码，用微信扫码可进行单车还车<br>Scan this QR code with WeChat to return rented bicycles.</p>
                </div>

              </div>
            </dv-border-box-7>
          </div>




          <div class="centerView">
            <!-- 购票流程 -->
            <div class="progressView">
              <p class="progressTitle">自行车租赁流程(How to rent a bicycle:)</p>
              <div class="progressList">
                <div class="progressItem1">
                  <dv-border-box-8 :reverse="true">
                    1.扫码租车</br>Scan the QR code
                  </dv-border-box-8>
                </div>
                <div class="progressItem2">
                  <dv-border-box-8 :reverse="true">
                    2.缴押金开锁</br>Pay the deposit and unlock the bicycle
                  </dv-border-box-8>
                </div>
                <div class="progressItem3">
                  <dv-border-box-8 :reverse="true">
                    3.结束游玩</br>Finishing the ride
                  </dv-border-box-8>
                </div>
                <div class="progressItem4">
                  <dv-border-box-8 :reverse="true">
                    4.扫码退押金</br>Scan the QR code to refund the deposit
                  </dv-border-box-8>
                </div>
              </div>
            </div>
            <!-- 退款二维码 -->
            <div class="imgView">
              <dv-border-box-7>
                 <div class="imgContent">
                   <div class="mapImg">
                     <p class="zxcTxt">空闲双人车：<font>{{onLeaseNumber0}}</font><br>空闲四人车：<font>{{onFourLeaseNumber0}}</font></p>
                     <p class="zxcTxt">空闲双人车：<font>{{onLeaseNumber1}}</font><br>空闲四人车：<font>{{onFourLeaseNumber1}}</font></p>
                     <p class="zxcTxt">空闲双人车：<font>{{onLeaseNumber2}}</font><br>空闲四人车：<font>{{onFourLeaseNumber2}}</font></p>
                     <p class="zxcTxt">空闲双人车：<font>{{onLeaseNumber3}}</font><br>空闲四人车：<font>{{onFourLeaseNumber3}}</font></p>
                     <p class="zxcTxt">空闲双人车：<font>{{onLeaseNumber4}}</font><br>空闲四人车：<font>{{onFourLeaseNumber4}}</font></p>
                     <p class="zxcTxt">空闲双人车：<font>{{onLeaseNumber5}}</font><br>空闲四人车：<font>{{onFourLeaseNumber5}}</font></p>
                     <img :src="mapSrc">
                   </div>
                   <div class="notice-gif">
                     <dv-border-box-8>
                       <div class="gif-content">
                         <p :class="{white:isActive}">标注点位为自行车停车区域<br>The marked spots are parking zones for bicycles</p>
                       </div>
                     </dv-border-box-8>
                   </div>
                 </div>
              </dv-border-box-7>
            </div>
          </div>

          <!-- 右侧视图 -->
          <div class="rightView">
            <!-- 租赁流程 -->
            <div class="ydt">
              <img src="../assets/progressImg.png">
            </div>

            <!-- 收费标准 -->
            <div class="txtView">
              <dv-border-box-7>
                <div class="txtContent">
                  <p class="noticeTitle">观光自行车计费规则：<br>Bicycle Rental Rates & Policy:</p>
                  <p>双人车40元每小时，四人车60元每小时，每辆车押金300元。1小时起租，10分钟内(不含10分钟)不计费，超出10分钟后按照1小时计费，超出1小时不满30分钟按照30分钟计费，以此类推。 <br>The rental rate for a two-person bicycle is RMB 40 per hour, and that for a four-person bicycle is RMB 60 per hour. A RMB 300 deposit is required for each bicycle. Minimum rental is one hour. The first 10 minutes of riding after scanning the QR code are free(10 minutes not included), and a user will be charged for a period of at least one hour after the first 10 minutes of use. Usage after one hour but less than 30 minutes will be charged once per 30 minutes.</p>
                  <!-- <p>1小时起租，10分钟内不计费，超出10分钟后按1小时计费，超出1小时后每30分钟进行一次计费。</br>The first 10 minutes of riding after scanning the QR code are free, and a user will be charged for a period of at least one hour after the first 10 minutes of use. Usage after one hour will be charged once per 30 minutes.</p> -->
                </div>
              </dv-border-box-7>
            </div>
          </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import axios from 'axios';
import QRCode from 'qrcode2';
export default {
  name: 'NhzxcVerticalView',
  data () {
    return {
      "weatherList": [],
      "siteItem0": '',
      "onLeaseNumber0": 0,
      "onFourLeaseNumber0": 0,
      "siteItem1": '',
      "onLeaseNumber1": 0,
      "onFourLeaseNumber1": 0,
      "siteItem2": '',
      "onLeaseNumber2": 0,
      "onFourLeaseNumber2": 0,
      "siteItem3": '',
      "onLeaseNumber3": 0,
      "onFourLeaseNumber3": 0,
      "siteItem4": '',
      "onLeaseNumber4": 0,
      "onFourLeaseNumber4": 0,
      "siteItem5": '',
      "onLeaseNumber5": 0,
      "onFourLeaseNumber5": 0,
      "siteName": "",
      "mapSrc": require('../assets/nhMap.png'),
      "isActive": true,
      "nowDate": '',
      "useConfig": {
        color: ['#f47e86','#00ff00'],
        radius: '80%',
        activeRadius: '85%',
        data: [
            {
              name: '已使用',
              value: 0
            },
            {
              name: '未使用',
              value: 120
            }
          ],
          lineWidth: 10
      },
      "leaseConfig": {
        header: ['<span style="font-size:18px;">编号</span>',
              '<span style="font-size:18px;">手机号</span>',
              '<span style="font-size:18px;">押金</span>'
        ],
        data: [

        ],
        align: ['center','center','center'],
        columnWidth: [300, 400, 300]
      },
      "refundConfig": {
        header: ['<span style="font-size:18px;">手机号</span>',
              '<span style="font-size:18px;">退款状态</span>'
        ],
        data: [

        ],
        rowNum: 2,
        align: ['center','center'],
        columnWidth: [350, 150]
      },
    }
  },
  methods: {
    createCode(){
      let qrcode = new QRCode('qrcode', {
        width: 200,  // 二维码宽度
        height: 200, // 二维码高度
        text: 'https://jqadmin.tangshannanhu.com/weixintest/rich1/index?time='+new Date().getTime()
      })
    },
    clearCode () {
      this.$refs.qrcode.innerHTML = ''
    }
  },
  mounted: function(){
    let that = this;
    var siteId = window.location.href.split('?siteId=')[1];
    if(siteId == '0'){
      that.mapSrc = require('../assets/ykzx.png');
    }else if(siteId == '1'){
      that.mapSrc = require('../assets/dfcy.png');
    }else if(siteId == '2'){
      that.mapSrc = require('../assets/ls.png');
    }else if(siteId == '3'){
      that.mapSrc = require('../assets/gny.png');
    }else if(siteId == '4'){
      that.mapSrc = require('../assets/tht.png');
    }else if(siteId == '5'){
      that.mapSrc = require('../assets/fht.png');
    }
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
    }, 1000)

    getWeatherInfo();
    setInterval(function(){
    	getWeatherInfo();
    }, 300000);
    //获取天气情况
    function getWeatherInfo(){
      axios.get('http://node.smart-ideas.com.cn:3001/datav/common/weather/v1/weatherInfo?city=130202')
        .then(function(res){
          that.weatherList = res.data;
        }).catch(function(err){
          console.log(err);
        })
    }

    var seconds = 0;
    setInterval(function(){
      seconds += 1;
      if(seconds == 1 || seconds % 10 == 0){
        // 获取退款二维码
        that.clearCode();
        that.createCode();
        // 获取空闲车辆数
        axios.get('https://lease.smart-ideas.com.cn/nhpark/deviceLeaseApp/getSiteUseDetail?type=bike')
          .then(function(res){
            var leaseList = res.data.data;
            console.log(leaseList);
            var dataList = [];
            var refundList = [];
            that.siteItem0 = leaseList[0].siteName;
            that.onLeaseNumber0 = leaseList[0].twoBicycleNoLeaseTotal;
            that.onFourLeaseNumber0 = leaseList[0].fourBicycleNoLeaseTotal;
             that.siteItem1 = leaseList[1].siteName;
             that.onLeaseNumber1 = leaseList[1].twoBicycleNoLeaseTotal;
             that.onFourLeaseNumber1 = leaseList[1].fourBicycleNoLeaseTotal;
             that.siteItem2 = leaseList[2].siteName;
             that.onLeaseNumber2 = leaseList[2].twoBicycleNoLeaseTotal;
             that.onFourLeaseNumber2 = leaseList[2].fourBicycleNoLeaseTotal;
             that.siteItem3 = leaseList[3].siteName;
             that.onLeaseNumber3 = leaseList[3].twoBicycleNoLeaseTotal;
             that.onFourLeaseNumber3 = leaseList[3].fourBicycleNoLeaseTotal;
             that.siteItem4 = leaseList[4].siteName;
             that.onLeaseNumber4 = leaseList[4].twoBicycleNoLeaseTotal;
             that.onFourLeaseNumber4 = leaseList[4].fourBicycleNoLeaseTotal;
             that.siteItem5 = leaseList[5].siteName;
             that.onLeaseNumber5 = leaseList[5].twoBicycleNoLeaseTotal;
             that.onFourLeaseNumber5 = leaseList[5].fourBicycleNoLeaseTotal;
          }).catch(function(err){
            console.log(err);
          })

        // 获取退款详情
        axios.get('http://lease.smart-ideas.com.cn/nhpark/deviceDataView/getDeviceShipRefundInfo?scenicId=ba075c5f54db4a338a22867f017f85b2')
          .then(function(res){
            var leaseList = res.data;
            var dataList = [];
            var refundList = [];
            leaseList.forEach(function(value, key){
              var newArr = [];
              if (value.phone) {
                newArr[0] = '<span style="font-size:18px;">'+value.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")+'</span>'
              } else {
                newArr[0] = '---';
              }
              newArr[1] = '<span style="font-size:18px;">已退款</span>';
              refundList.push(newArr);
            })

            if(refundList.length == 0){
              refundList = [
                ['-', '-'],
                ['-', '-']
              ]
            }
            that.refundConfig = {
              header: ['<span style="font-size:18px;">手机号</span>',
              '<span style="font-size:18px;">退款状态</span>'],
              headerHeight: 50,
              data: refundList,
              rowNum: 2,
              align: ['center','center'],
              columnWidth: [350, 150]
            }
          }).catch(function(err){
            console.log(err);
          })

        // 获取租赁详情
        axios.get('http://lease.smart-ideas.com.cn/nhpark/deviceDataView/getDeviceShipLeaseInfo?scenicId=ba075c5f54db4a338a22867f017f85b2')
          .then(function(res){
            var leaseList = res.data;
            var refundList = [];
            leaseList.forEach(function(value, key){
              var newArr = [];
              newArr[0] = '<span style="font-size:18px;">'+value.code+'</span>';
              if (value.phone) {
                newArr[1] = '<span style="font-size:18px;">'+value.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")+'</span>'
              } else {
                newArr[1] = '---';
              }
              newArr[2] = '<span style="font-size:18px;">'+parseFloat(value.money).toFixed(2)+'</span>';
              refundList.push(newArr);
            })

            if(refundList.length == 0){
              refundList = [
                ['-', '-', '-'],
                ['-', '-', '-'],
                ['-', '-', '-']
              ]
            }
            that.leaseConfig = {
              header: ['<span style="font-size:18px;">编号</span>',
              '<span style="font-size:18px;">手机号</span>',
              '<span style="font-size:18px;">押金</span>'],
              headerHeight: 50,
              data: refundList,
              align: ['center','center','center'],
              columnWidth: [300, 400, 300],
              style: {
                fontSize: '25'
              },
              rowNum: 2
            }
          }).catch(function(err){
            console.log(err);
          })

        // 使用情况
        axios.get('http://lease.smart-ideas.com.cn/nhpark/deviceDataView/getDeviceShipLeasePercent?scenicId=ba075c5f54db4a338a22867f017f85b2')
          .then(function(res){
            that.useConfig = {
              color: ['#f47e86','#00ff00'],
              radius: '80%',
              activeRadius: '85%',
              data: [
                  {
                    name: '已使用',
                    value: 100 - parseInt(res.data[1].y)
                  },
                  {
                    name: '未使用',
                    value: parseInt(res.data[1].y)
                  }
                ],
                lineWidth: 10
            }
          }).catch(function(err){
            console.log(err);
          })

      }
    }, 1000);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* 标题 */
  .titleView{
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
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
    margin-top: 10px;
    transform: scale(.9, .96);
    transform-origin: top center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  /* 左侧视图 */
  .leftView{
    width: 1080px;
    height: 400px;
    padding-top: 20px;
  }
  .left-content{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 15px;
  }

  /* 天气预报 */
  .weatherView{
    width: 620px;
    height: 350px;
    padding-left: 30px;
    padding-top: 42px;
    padding-bottom: 20px;
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


  /* 中间部分 */
  .centerView{
    width: 1080px;
  }
  /* 骑行路线 */
  .imgView{
    width: 100%;
    height: 880px;
    padding: 20px;
  }
  .imgContent{
    width: 100%;
    /* height: 900px; */
    padding: 20px;
  }
  .mapImg{
    width: 100%;
    height: 700px;
    position: relative;
  }
  .mapImg .zxcTxt{
    position: absolute;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    text-align: right;
    background-color: rgba(128, 0, 128, .9);
    padding: 0 5px;
  }
  .mapImg .zxcTxt:nth-of-type(1){
    left: 400px;
    top: 207px;
    z-index: 999;
  }
  .mapImg .zxcTxt:nth-of-type(2){
    left: 705px;
    top: 5px;
  }
  .mapImg .zxcTxt:nth-of-type(3){
    left: 447px;
    top: 270px;
  }
  .mapImg .zxcTxt:nth-of-type(4){
    left: 281px;
    top: 486px;
  }
  .mapImg .zxcTxt:nth-of-type(5){
    left: 232px;
    top: 275px;
  }
  .mapImg .zxcTxt:nth-of-type(6){
    left: 512px;
    top: 177px;
  }
  .mapImg .zxcTxt font{
    color: yellow;
    font-size: 14px;
  }
  .mapImg img{
    height: 700px;
    margin: 0 auto;
  }
  .gif-content{
    padding: 20px;
  }
  .gif-content img{
    margin: 0 auto;
  }
  .gif-content p{
    font-size: 28px;
    color: red;
    text-align: center;
    font-weight: bold;
  }
  .gif-content .white{
    color: #fff;
  }

  /* 租赁流程 */
  .progressView{
    width: 100%;
    font-size: 28px;
    color: #fff;
    padding: 20px;
    padding-top: 18px;
    padding-bottom: 0;
  }
  .progressView .progressTitle{
    font-size: 28px;
    padding-left: 30px;
    padding-bottom: 10px;
    font-weight: bold;
  }
  .progressView .progressList{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
  }
  .progressView .progressList div{
    text-align: center;
    line-height: 20px;
    height: 50px;
    font-size: 14px;
    font-weight: bold;
    padding: 5px 0;
    color: #FFC000;
  }
  .progressItem1{
    width: 200px;
  }
  .progressItem2{
    width: 300px;
  }
  .progressItem3{
    width: 180px;
  }
  .progressItem4{
    width: 320px;
  }

  /* 租赁详情 */
  .rightView{
    width: 100%;
    height: 440px;
    /* background: url(../assets/left-bg.png) no-repeat left top;
    background-size: cover; */
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .leaseView{
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  .leaseContent{
    /* padding: 10px 10px 10px 10px; */
    width: 100%;
    margin-top: 20px;
  }
  .noticeTitle{
    font-size: 20px;
    padding-left: 30px;
    padding-bottom: 20px;
    color: #fff;
    line-height: 30px;
  }

  /* 线 */
  .line{
    display: block;
    width: 100%;
    background: url(../assets/line.png) no-repeat left top;
    height: 1px;
    background-size: cover;
    margin: 14px 0;
  }
  /* 退款详情 */
  .noticeTitle{
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    padding-left: 20px;
  }
  .rightNotice{
    width: 400px;
    height: 440px;
    /* background: url(../assets/rightBg1.png) no-repeat left top;
    background-size: cover; */
  }
  /* 使用率 */
  .useView{
    width: 200px;
    padding-bottom: 20px;
  }
  .useContent{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .useView .noticeTitle{
    margin-bottom: 0;
  }

  /* 退款二维码 */
  .qrcodeView{
    height: 350px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .qrcodeView .noticeTitle{
    margin-bottom: 0;
    font-size: 24px;
    font-weight: bold;
  }
  #qrcode{
    padding: 5px;
    background-color: #fff;
    width: 210px;
    margin: 30px auto 0;
    margin-bottom: 15px;
  }
  .refundTxt{
    width: 100%;
    font-size: 12px;
    color: #fff;
    text-align: center;
  }

  /* 计费规则 */
  .txtView{
    width: 400px;
    height: 460px;
  }
  .txtContent{
    padding: 20px;
  }
  .txtView .noticeTitle{
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    padding-left: 0;
  }
  .txtView p{
    font-size: 16px;
    color: #fff;
    line-height: 25px;
    margin-bottom: 10px;
  }

  /* 租赁流程 */
  .ydt{
    flex: 1;
    height: 460px;
    margin-right: 20px;
    overflow: hidden;
  }
  .ydt img{
    width: 100%;
  }
</style>
