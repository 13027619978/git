<template>
  <div class="hello" :style="{background:url_back_img}" style="width: 100vw;height: 100vh;overflow: hidden;background-size: cover;">
    <div class="hoverView">

    </div>
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <div class="title">
          <p>南北湖皮划艇数字化运营系统</p>
          <p class="childTitle">{{scenicName}}</p>
        </div>
      </div>
      <div class="contentView">
        <!-- 左侧视图 -->
        <div class="leftView">
          <div class="leftContent">
            <p class="leftTitle">皮划艇购票</p>
              <div class="boatList">
                <div class="boatItem">
                  <div class="itemLeft">
                    <p class="boatName">皮划艇单人票</p>
                    <p>营业时间：08:00-17:00</p>
                  </div>
                  <div class="btnView">
                    <a href="javascript:;">暂不售票</a>
                    <p>押金：100元/人</p>
                    <p>票价：100元/小时/人</p>
                  </div>
                </div>
                <span class="line">
                  <img src="../assets/line.png">
                </span>
                <div class="boatItem">
                  <div class="itemLeft">
                    <p class="boatName">皮划艇半价票（1.2米以下）</p>
                    <p>营业时间：08:00-17:00</p>
                  </div>
                  <div class="btnView">
                    <a href="javascript:;">暂不售票</a>
                    <p>押金：50元/人</p>
                    <p>票价：50元/小时/人</p>
                  </div>
                </div>
                <span class="line">
                  <img src="../assets/line.png">
                </span>
                <!-- <div class="boatItem">
                  <div class="itemLeft">
                    <p class="boatName">皮划艇团队票</p>
                    <p>营业时间：08:00-17:00</p>
                  </div>
                  <div class="btnView">
                    <a href="javascript:;">暂不售票</a>
                    <p>票价：40元/小时/人</p>
                  </div>
                </div> -->
                <span class="line">
                  <img src="../assets/line.png">
                </span>
                <div class="boatItem">
                  <div class="itemLeft">
                    <p class="boatName">单人桨板票</p>
                    <p>营业时间：08:00-17:00</p>
                  </div>
                  <div class="btnView">
                    <a href="javascript:;">暂不售票</a>
                    <p>押金：150元/人</p>
                    <p>票价：150元/小时/人</p>
                  </div>
                </div>
                <span class="line">
                  <img src="../assets/line.png">
                </span>
                <div class="boatItem">
                  <div class="itemLeft">
                    <p class="boatName">团体桨板票</p>
                    <p>营业时间：08:00-17:00</p>
                  </div>
                  <div class="btnView">
                    <a href="javascript:;">暂不售票</a>
                    <p>押金：450元/艘</p>
                    <p>票价：450元/小时/艘</p>
                  </div>
                </div>
                <span class="line">
                  <img src="../assets/line.png">
                </span>
              </div>
              <div class="buyNotice">
                <p class="descTitle">安全须知</p>
                <div class="descView" style="transform: scale(1);">
                  <p>1.进入码头前请规范穿着救生衣，活动中禁止松开、脱下救生衣；</p>
                  <p>2.请听从工作人员指导，不进入未指定水域划行；</p>
                  <p>3.未成年人须由成人陪伴，禁止未成年人单独划行；</p>
                  <p>4.活动中贵重物品或电子产品容易浸水受损，请自行妥善保管，否则一切损失自负；</p>
                  <p>5.酒后、孕妇、患有心脏病、哮喘等不适合参加户外活动者禁止参加皮划艇（桨板）活动；</p>
                  <p>6.皮划艇体验时间为1小时，上岸即视为结束，桨板时间为1小时，上岸即为结束；</p>
                  <p>7.不遵守本须知造成的一切损失自负。</p>
                  <p>救援电话(Emergency call)：0573-86514586</p>
                  <p>投诉电话(Complaint)：0573-86568567</p>
                  <p>咨询电话(Information Servicvs)：0573-86513123</p>
                </div>
              </div>
            </div>
          </div>

        <!-- 中间视图 -->
        <div class="centerView">
          <!-- 地图部分 -->
          <div class="mapView">
            <dv-border-box-7>
              <div class="iframeView">
                <img class="mapBg" src="../assets/nbhImg.jpg">
              </div>
            </dv-border-box-7>
          </div>

          <!-- 购票流程 -->
          <div class="progressView">
            <p class="progressTitle">皮划艇购票流程</p>
            <div class="progressList">
              <dv-border-box-8 :reverse="true">1.点击购票</dv-border-box-8>
              <dv-border-box-8 :reverse="true">2.选择购买张数</dv-border-box-8>
              <dv-border-box-8 :reverse="true">3.微信扫码支付</dv-border-box-8>
              <dv-border-box-8 :reverse="true">4.取票</dv-border-box-8>
            </div>
          </div>

          <!-- 温馨提示 -->
          <div class="wxts">
            <dv-border-box-10>温馨提示：欢迎乘坐南北湖游船</dv-border-box-10>
          </div>
        </div>

        <!-- 右侧视图 -->
        <div class="rightView">
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
          <span class="line">
            <img src="../assets/line.png">
          </span>
          <div class="buyNotice" style="padding: 0 40px 0 70px;">
            <p class="descTitle">游玩规则</p>
            <div class="descView" style="transform: scale(1);">
              <p>1.请注意游玩时间，超时部分从押金扣除。</p>
              <p>2.入园、出园请在闸机上扫码，否则无法退还押金。</p>
              <p>3.出园扫码后，剩余押金原路退回。</p>
              <p>桨板收费规则：</br>所有票种超过10分钟不足40分钟按半小时计费；超过40分钟不足60分钟按1小时计费；超出60分钟按整小时计费。</p>
              <p>皮划艇单人票：</br>70分钟内收费100元。</br>70分钟-100分钟按1.5小时计费（150元）；</br>100分钟-120分钟按2小时计费（200元）。</p>
            </div>
          </div>
          <span class="line">
            <img src="../assets/line.png">
          </span>
          <!-- 租赁详情 -->
          <div class="leaseDetailView">
            <p class="noticeTitle">购票情况</p>
            <dv-scroll-board :config="leaseConfig" style="width:100%;height:260px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'NbhPhtView',
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
      "leaseConfig": {
        data: [
          ['-', '-'],
          ['-', '-'],
          ['-', '-'],
          ['-', '-'],
          ['-', '-']
        ],
        align: ['center','center'],
        columnWidth: [250, 250],
        style: {
          fontSize: '20'
        },
        rowNum: 5
      },
      "src": ""
    }
  },
  methods: {

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
                ['-', '-'],
                ['-', '-'],
                ['-', '-'],
                ['-', '-'],
                ['-', '-'],
                ['-', '-'],
                ['-', '-'],
                ['-', '-']
              ]
            }
            // that.leaseConfig = {
            //   data: dataList,
            //   align: ['center','center'],
            //   columnWidth: [250, 250],
            //   style: {
            //     fontSize: '20'
            //   },
            //   rowNum: 9
            // }
          })
          .catch(function(err){
            console.log(err);
          })

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
    bottom: 10px;
    right: 10px;
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
    align-items: center;
    background: url(../assets/left-bg.png) no-repeat left top;
    background-size: 100% 100%;
    padding: 25px 20px 0 50px;
  }

  .leftTitle{
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    padding-left: 20px;
    line-height: 40px;
    margin-bottom: 40px;
  }
  .line{
    display: block;
    width: 100%;
    margin: 10px 0;
  }
  .line img{
    width: 100%;
  }
  /* 摆渡船购票 */
  .boatList{
    width: 100%;
  }
  .boatItem{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .itemLeft{
    display: flex;
    flex-direction: column;
  }
  .itemLeft p{
    font-size: 16px;
    color: #FFFF00;
  }
  .itemLeft .boatName{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .itemLeft img{
    width: 60px;
    margin: 10px 0;
  }
  .btnView{
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
  }
  .btnView p{
    width: 100%;
    text-align: left;
    padding-left: 20px;
  }
  .btnView a{
    display: block;
    width: 120px;
    line-height: 40px;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 10px;
    text-decoration: none;
    background-color: #fff;
    color: #666;
  }

  /* 购票须知 */
  .descTitle{
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    line-height: 30px;
  }
  .descView{
    transform: scaleY(.9);
    transform-origin: 0 0;
  }
  .descView p{
    font-size: 14px;
    color: #fff;
    line-height: 22px;
  }
  .lineView{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .lineView div{
    flex: 1;
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
    padding-left: 40px;
    padding-top: 32px;
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

  /* 租赁详情 */
  .leaseDetailView{
    width: 100%;
    padding: 0 40px 30px 60px;
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
