<template>
  <div class="hello">
    <dv-full-screen-container class="container">
      <p class="jszc">技术支持: 北京骑思妙享科技有限公司 400-898-7021</p>
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <p>圆明园自驾船数字化运营系统</p>
      </div>
      <div class="contentView">
        <!-- 左侧视图 -->
        <div class="leftView">
          <div class="leftContent">
            <div class="leftContent-left">
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

              <!-- 线 -->
             <!-- <span class="line"></span> -->

              <!-- 购票流程 -->
              <!-- <div class="progressView">
                <div class="progressItem">
                  <p class="progressTitle">电瓶船租赁流程</p>
                  <div class="progressList">
                    <div>
                      <dv-border-box-8 >
                        <p>1.排队上船</p>
                      </dv-border-box-8>
                    </div>
                    <div>
                      <dv-border-box-8>
                        <p>2.扫码付押金</p>
                      </dv-border-box-8>
                    </div>
                    <div>
                      <dv-border-box-8>
                        <p>3.结束游玩</p>
                      </dv-border-box-8>
                    </div>
                    <div>
                      <dv-border-box-8>
                        <p>4.上岸扫码退押金</p>
                      </dv-border-box-8>
                    </div>
                  </div>
                </div>
                <div class="progressItem">
                  <p class="progressTitle">脚踏船租赁流程</p>
                  <div class="progressList">
                    <div>
                      <dv-border-box-8>
                        <p>1.联系管理员</p>
                      </dv-border-box-8>
                    </div>
                    <div>
                      <dv-border-box-8>
                        <p>2.付款码付押金</p>
                      </dv-border-box-8>
                    </div>
                    <div>
                      <dv-border-box-8>
                        <p>3.打印订单上船</p>
                      </dv-border-box-8>
                    </div>
                    <div>
                      <dv-border-box-8>
                        <p>4.上岸扫码退押金</p>
                      </dv-border-box-8>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>

            <div class="leftContent-right">
              <!-- 租赁情况 -->
              <div class="leaseView">
                <div class="leaseList">
                  <div class="leaseItem">
                    <p>四人电瓶船</p>
                    <dv-active-ring-chart :config="option1" style="width:120px;height:120px" />
                  </div>
                  <div class="leaseItem">
                    <p>六人电瓶船</p>
                    <dv-active-ring-chart :config="option2" style="width:120px;height:120px" />
                  </div>
                  <div class="leaseItem">
                    <p>四人脚踏船</p>
                    <dv-active-ring-chart :config="option3" style="width:120px;height:120px" />
                  </div>
                  <div class="leaseItem">
                    <p>六人脚踏船</p>
                    <dv-active-ring-chart :config="option4" style="width:120px;height:120px" />
                  </div>
                </div>
              </div> -->

              <!-- 线 -->
              <!-- <span class="line"></span>

              <iframe style="width: 410px;height: 380px;" src="http://smart-ideas.com.cn/mapView/ymymap.html" id="myMap"></iframe> -->

            </div>
          </div>
        </div>

        <!-- 中间视图 -->
        <div class="centerView">
          <!-- 地图部分 -->
          <div class="videoView">
            <dv-border-box-7>
              <!-- <iframe src="http://smart-ideas.com.cn/mapView/ymymap.html" id="myMap"></iframe> -->
              <!-- 退款二维码 -->
              <div class="qrcodeView">
                <p class="qrcodeViewTitle">退押金二维码</p>
                <div class="qrcodeImgView">
                  <div class="qrcodeImg">
                    <div id="qrcode" ref="qrcode" ></div>
                  </div>
                </div>
                <p class="qrcodeNotice">二维码有效期五分钟，请扫码后尽快退款</p>
              </div>
              <div class="rideNotice">
                <dv-border-box-8 :reverse="true">
                  <div class="rideNoticeImg">
                    <p>温馨提示：欢迎乘坐圆明园游船</p>
                  </div>
                </dv-border-box-8>
              </div>
            </dv-border-box-7>
          </div>

          <!-- 温馨提示 -->
          <!-- <div class="wxts">
            <dv-border-box-10>温馨提示：欢迎乘坐圆明园自驾车</dv-border-box-10>
          </div> -->
        </div>

        <!-- 右侧视图 -->
        <div class="rightView">
          <!-- 购票须知 -->
          <div class="rightNotice">
            <p class="noticeTitle">退款详情</p>
            <dv-scroll-board :config="refundConfig" style="width:100%;height:260px" />
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
  name: 'YmydpcspView',
  data () {
    return {
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
        number: [],
        content: '{nt}',
        style: {
          fontSize: 45,
          fill: '#fff',
          fontWeight: 'bold'
        }
      },
      "config2": {
        number: [],
        content: '{nt}',
        style: {
          fontSize: 45,
          fill: '#fff',
          fontWeight: 'bold'
        }
      },
      "refundConfig": {
        header: ['手机号', '退款状态'],
        data: [

        ],
        rowNum: 3,
        align: ['center','center'],
        columnWidth: [350, 150]
      },
      "leaseConfig": {
        header: ['编号', '手机号', '押金'],
        data: [

        ],
        rowNum: 3,
        align: ['center','center','center'],
        columnWidth: [150, 200, 150]
      }
    }
  },
  methods: {
    createCode(){
      let qrcode = new QRCode('qrcode', {
        width: 340,  // 二维码宽度
        height: 340, // 二维码高度
        text: 'http://api.smart-ideas.com.cn/ymyPosRefund/?date=' + new Date().getTime()
      })
    },
    clearCode () {
      this.$refs.qrcode.innerHTML = ''
    }
  },
  mounted: function(){
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
    }, 1000)

    //获取天气情况
    axios.get('http://node.smart-ideas.com.cn:3001/datav/common/weather/v1/weatherInfo?city=110106')
      .then(function(res){
        that.weatherList = res.data;
      }).catch(function(err){
        console.log(err);
      })

    var seconds = 0;
    setInterval(function(){
      seconds += 1;
      if(seconds == 1 || seconds % 20 == 0){
        // 获取退款二维码
        that.clearCode();
        that.createCode();
        // 获取退款详情
        axios.get('http://api.smart-ideas.com.cn/ymypark/deviceDataView/getDeviceShipRefundInfo')
          .then(function(res){
            var leaseList = res.data;
            var dataList = [];
            leaseList.forEach(function(value, key){
              var newArr = [];
              if (value.phone) {
                newArr[0] = value.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
              } else {
                newArr[0] = '---';
              }
              newArr[1] = value.status;
              dataList[key] = newArr;
            })
            that.refundConfig = {
              header: ['手机号', '退款状态'],
              headerHeight: 56,
              data: dataList,
              rowNum: 4,
              align: ['center','center'],
              columnWidth: [500, 500],
              style: {
                fontSize: 22
              }
            }
          })
          .catch(function(err){
            console.log(err);
          })


        // 获取租赁情况
        axios.get('http://api.smart-ideas.com.cn/ymypark/deviceDataView/getDeviceShipLeasePercent?type=6')
          .then(function(res){
            that.option1 = {
              radius: '85%',
              activeRadius: '89%',
              color: ['red', '#00ffff'],
              data: [
                {
                  name: '已租',
                  value: parseInt(res.data[0].y)?parseInt(res.data[0].y):0
                },
                {
                  name: '未租',
                  value: parseInt(res.data[1].y)?parseInt(res.data[1].y):0
                }
              ],
              lineWidth: 14,
            }
          })
          .catch(function(err){
            console.log(err);
          })

        axios.get('http://api.smart-ideas.com.cn/ymypark/deviceDataView/getDeviceShipLeasePercent?type=7')
         .then(function(res){
           that.option2 = {
              radius: '85%',
              activeRadius: '89%',
              color: ['red', '#00ffff'],
              data: [
                {
                  name: '已租',
                  value: parseInt(res.data[0].y)?parseInt(res.data[0].y):0
                },
                {
                  name: '未租',
                  value: parseInt(res.data[1].y)?parseInt(res.data[1].y):0
                }
              ],
              lineWidth: 14,
            }
         })
         .catch(function(err){
           console.log(err);
         })

        axios.get('http://api.smart-ideas.com.cn/ymypark/deviceDataView/getDeviceShipLeasePercent?type=8')
         .then(function(res){
           that.option3 = {
              radius: '85%',
              activeRadius: '89%',
              color: ['red', '#00ffff'],
              data: [
                {
                  name: '已租',
                  value: parseInt(res.data[0].y)?parseInt(res.data[0].y):0
                },
                {
                  name: '未租',
                  value: parseInt(res.data[1].y)?parseInt(res.data[1].y):0
                }
              ],
              lineWidth: 14,
            }
         })
         .catch(function(err){
           console.log(err);
         })

        axios.get('http://api.smart-ideas.com.cn/ymypark/deviceDataView/getDeviceShipLeasePercent?type=9')
         .then(function(res){
           that.option4 = {
              radius: '85%',
              activeRadius: '89%',
              color: ['red', '#00ffff'],
              data: [
                {
                  name: '已租',
                  value: parseInt(res.data[0].y)?parseInt(res.data[0].y):0
                },
                {
                  name: '未租',
                  value: parseInt(res.data[1].y)?parseInt(res.data[1].y):0
                }
              ],
              lineWidth: 14,
            }
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
  .jszc{
    position: fixed;
    bottom: 0;
    right: 40px;
    line-height: 50px;
    font-size: 15px;
    text-align: right;
    color: #fff;
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
    width: 180%;
  }
  .titleView p{
    position: absolute;
    color: #fff;
    font-size: 46px;
    font-weight: bold;
    letter-spacing: 5px;
  }

  /* 内容部分 */
  .contentView{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    flex-wrap: nowrap;
    margin-top: 10px;
    padding: 20px 30px;
    padding-top: 40px;
  }
  /* 左侧试图 */
  .leftView{
    width: 100%;
    position: relative;
  }
  .peopleView{
    width: 100%;
    height: 120px;
    margin-bottom: 20px;
  }
  .peopleContent{
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .peopleContent .peopleItem{
    flex: 1;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .peopleContent .peopleItem p{
    font-size: 24px;
    color: #fff;
    margin-bottom: 20px;
  }
  .leftContent{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background: url(../assets/rightBg1.png) no-repeat left top;
    background-size: 100% 100%;
  }
  .leftContent-left{
    padding: 66px 0 20px;
  }
  .weatherView{
    padding-left: 20px;
    margin-bottom: 10px;
  }
  .weatherView .dateView{
    font-size: 23px;
    color: #fff;
    padding-left: 105px;
    line-height: 45px;
  }
  .nowWeather{
    display: flex;
    justify-content: start;
    align-items: center;
    padding-top: 40px;
    margin-bottom: 10px;
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
    padding-top: 50px;
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


  /* 线 */
  .line{
    display: block;
    width: 100%;
    background: url(../assets/line.png) no-repeat left top;
    height: 1px;
    background-size: cover;
    margin: 30px 0;
  }


  .leaseView{
    width: 100%;
    padding: 50px 0 0;
  }
  .leaseView .leaseList{
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 20px;
  }
  .leaseView .leaseList .leaseItem{
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .leaseView .leaseList .leaseItem p{
    font-size: 22px;
    color: #fff;
    text-align: center;
    margin: 10px 0;
  }

  .leftContent-right{
    flex: 1;
    padding-bottom: 20px;
  }

  .qrcodeView{
    flex: 1;
    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .qrcodeViewTitle{
    width: 100%;
    font-size: 36px;
    color: #fff;
    padding-left: 20px;
    line-height: 35px;
    font-weight: bold;
    margin-bottom: 100px;
    text-align: center;
  }
  .qrcodeImgView{
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .qrcodeImg{
    width: 350px;
    height: 350px;
    margin: 0 auto;
    padding: 5px;
    background-color: #fff;
  }
  .qrcodeNotice{
    font-size: 24px;
    color: #fff;
    width: 100%;
    text-align: center;
    line-height: 100px;
  }

  .progressView{
    width: 100%;
    font-size: 22px;
    color: #fff;
    padding: 0 40px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .progressItem{
    width: 50%;
    padding: 0 10px;
  }
  .progressView .progressTitle{
    font-size: 23px;
  }
  .progressView .progressList{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 15px;
  }
  .progressView .progressList div{
    margin-bottom: 17px;
    width: 100%;
  }
  .progressView .progressList p{
    width: 100%;
    text-align: left;
    line-height: 50px;
    height: 50px;
    padding: 0 10px;
  }

  /* 中间视图 */
  .centerView{
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .videoView{
    width: 100%;
    margin: 10px auto;
    margin-bottom: 20px;
  }
  .videoView #myMap{
    width: 710px;
    height: 510px;
    margin: 0 auto;
    display: block;
    border: none;
  }
  .videoView .rideNotice{
    width: 100%;
    height: 85px;
    margin: 0 auto;
    margin-top: 10px;
  }
  .videoView .rideNotice .rideNoticeImg{
    width: 672px;
    height: 85px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .videoView .rideNotice .rideNoticeImg p{
    font-size: 35px;
    font-weight: bold;
    color: #fff;
  }
  .wxts{
    font-size: 35px;
    font-weight: bold;
    color: #fff;
    width: 100%;
    line-height: 95px;
    height: 95px;
    text-align: center;
  }

  /* 右侧视图 */
  .rightView{
    width: 100%;
    padding: 0 10px;
   /* background: url(../assets/rightBg1.png) no-repeat left top;
    background-size: cover; */
  }
  .rightContent{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .noticeTitle{
    font-size: 28px;
    font-weight: bold;
    color: #fff;
    padding-left: 40px;
    margin-bottom: 20px;
  }
  .rightNotice{
    width: 100%;
    padding: 10px 0;
  }

  .leaseDetailView{
    width: 100%;
    padding: 20px;
  }

</style>
