<template>
  <div class="hello">
    <dv-full-screen-container class="container">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <p>圆明园交通船数字化运营系统</p>
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

            <!-- 线 -->
            <span class="line"></span>

            <!-- 乘船须知 -->
            <div class="noticeView">
              <p class="noticeTitle">乘船须知</p>
              <p>1.请您先下船后上船，船未停稳不得擅自上下。</p>
              <p>2.请您照顾好老人和小孩，保管好自己的物品，以防丢失或落入水中。</p>
              <p>3.严禁将身体探出船外，以免发生危险。</p>
              <p>4.严禁在船上喝酒，严禁酒后驾船、乘船，请勿在船上相互追逐打闹、站立、抽烟。</p>
            </div>

            <!-- 线 -->
            <span class="line"></span>

            <!-- 租赁情况 -->
            <div class="leaseView">
              <div class="leaseList">
                <div class="leaseItem">
                  <dv-charts :option="option1" />
                </div>
                <div class="leaseItem">
                  <dv-charts :option="option2" />
                </div>
                <div class="leaseItem">
                  <dv-charts :option="option3" />
                </div>
                <div class="leaseItem">
                  <dv-charts :option="option4" />
                </div>
                <div class="leaseItem">
                  <dv-charts :option="option5" />
                </div>
                <div class="leaseItem">
                  <dv-charts :option="option6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 中间视图 -->
        <div class="centerView">
          <!-- 入园人数 -->
          <div class="peopleView">
            <dv-border-box-7>
              <div class="peopleContent">
                <div class="peopleItem">
                  <p>总客流量</p>
                  <dv-digital-flop :config="config1" style="width:200px;height:50px;" />
                </div>
                <div class="peopleItem">
                  <p>在园人数</p>
                  <dv-digital-flop :config="config2" style="width:200px;height:50px;" />
                </div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 视频部分 -->
          <div class="videoView">
            <dv-border-box-7>
              <div class="qrcodeContent" style="display: flex;justify-content: center;align-items: center;flex-direction: column;height: 530px;">
                <p class="qrcodeViewTitle" style="padding: 0;font-weight: bold;font-size: 35px;">交通船购票二维码</p>
                <div class="qrcodeImgView">
                  <img class="qrcodeImg" src="../assets/ymyjtcQrcode.png">
                </div>
              </div>
            </dv-border-box-7>
          </div>

          <!-- 购票流程 -->
          <div class="progressView">
            <p class="progressTitle">交通船购票流程</p>
            <div class="progressList">
              <dv-border-box-8 :reverse="true">1.扫码购票</dv-border-box-8>
              <dv-border-box-8 :reverse="true">2.排队验票</dv-border-box-8>
              <dv-border-box-8 :reverse="true">3.验票上船</dv-border-box-8>
              <dv-border-box-8 :reverse="true">4.结束游玩</dv-border-box-8>
            </div>
          </div>

          <!-- 温馨提示 -->
          <div class="wxts">
            <dv-border-box-10>温馨提示：欢迎乘坐圆明园交通船</dv-border-box-10>
          </div>
        </div>

        <!-- 右侧视图 -->
        <div class="rightView">
          <!-- 购票须知 -->
          <div class="noticeView rightNotice">
            <p class="noticeTitle">购票须知</p>
            <p>票价：25元/人</p>
            <p>单程票</p>
            <p>南门处口码头--&gt;西洋遗址码头</p>
            <p>西洋遗址码头--&gt;南门处口码头</p>
            <p>1.3米以下儿童免票</p>
            <p>1.3米以上购买成人票</p>
          </div>

          <!-- 售票二维码 -->
          <div class="qrcodeView">
            <img src="../assets/ymyImg.jpg" style="height: 100%;margin: 0 auto;" >
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'YmyjtcView',
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
      }
    }
  },
  mounted: function(){
    let that = this;
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
        // 获取在入园人数
        axios.get('http://node.smart-ideas.com.cn:3001/datav/ymy/getPeopleInfo')
          .then(function(res){
            console.log(res);
            // 总入园人数
            var DataIn = parseInt(res.data.Data.DataIn);
            // 在园人数
            var stayData = parseInt(res.data.Data.DataStay);
            that.config1 = {
              number: [DataIn],
              content: '{nt}',
              style: {
                fontSize: 45,
                fill: '#fff',
                fontWeight: 'bold'
              }
            };
            that.config2 = {
              number: [stayData],
              content: '{nt}',
              style: {
                fontSize: 45,
                fill: '#fff',
                fontWeight: 'bold'
              }
            };
          })
          .catch(function(err){
            console.log(err);
          })
        // 获取租赁情况
        axios.get('http://api.smart-ideas.com.cn/ymypark/deviceDataView/getDeviceBikeLeasePercent?type=0')
          .then(function(res){
            that.option1 = {
               color: ['red', 'yellow'],
              title: {
                text: '双人自行车',
                style: {
                  fill: '#fff'
                },
                offset: [0, -40]
              },
              series: [
                {
                  type: 'pie',
                  data: [
                    { name: '已租', value: parseInt(res.data[0].y)?parseInt(res.data[0].y):0 },
                    { name: '未租', value: parseInt(res.data[1].y)?parseInt(res.data[1].y):0 }
                  ],
                  radius: ['40%', '50%'],
                  insideLabel: {
                    show: true
                  },
                 outsideLabel: {
                   show: true,
                   labelLineEndLength: 10,
                   style: {
                     fontSize: 12,
                     fill: '#fff',
                     textAlign: 'center',
                     textBaseline: 'middle'
                   }
                 }
                }
              ]
            }
          })
          .catch(function(err){
            console.log(err);
          })

        axios.get('http://api.smart-ideas.com.cn/ymypark/deviceDataView/getDeviceBikeLeasePercent?type=1')
         .then(function(res){
           that.option2 = {
               color: ['red', 'yellow'],
             title: {
               text: '四人自行车',
               style: {
                 fill: '#fff'
               },
               offset: [0, -40]
             },
             series: [
               {
                 type: 'pie',
                 data: [
                   { name: '已租', value: parseInt(res.data[0].y)?parseInt(res.data[0].y):0 },
                   { name: '未租', value: parseInt(res.data[1].y)?parseInt(res.data[1].y):0 }
                 ],
                 radius: ['40%', '50%'],
                 insideLabel: {
                   show: true
                 },
                 outsideLabel: {
                   show: true,
                   labelLineEndLength: 10,
                   style: {
                     fontSize: 12,
                     fill: '#fff',
                     textAlign: 'center',
                     textBaseline: 'middle'
                   }
                 }
               }
             ]
           }
         })
         .catch(function(err){
           console.log(err);
         })

        axios.get('http://api.smart-ideas.com.cn/ymypark/deviceDataView/getDeviceBikeLeasePercent?type=6')
          .then(function(res){
            that.option3 = {
               color: ['red', 'yellow'],
              title: {
                text: '四人电瓶车',
                style: {
                  fill: '#fff'
                },
                offset: [0, -40]
              },
              series: [
                {
                  type: 'pie',
                  data: [
                    { name: '已租', value: parseInt(res.data[0].y)?parseInt(res.data[0].y):0 },
                    { name: '未租', value: parseInt(res.data[1].y)?parseInt(res.data[1].y):0 }
                  ],
                  radius: ['40%', '50%'],
                  insideLabel: {
                    show: true
                  },
                 outsideLabel: {
                   show: true,
                   labelLineEndLength: 10,
                   style: {
                     fontSize: 12,
                     fill: '#fff',
                     textAlign: 'center',
                     textBaseline: 'middle'
                   }
                 }
                }
              ]
            }
          })
          .catch(function(err){
            console.log(err);
          })

        axios.get('http://api.smart-ideas.com.cn/ymypark/deviceDataView/getDeviceBikeLeasePercent?type=7')
         .then(function(res){
           that.option4 = {
               color: ['red', 'yellow'],
             title: {
               text: '六人电瓶车',
               style: {
                 fill: '#fff'
               },
               offset: [0, -40]
             },
             series: [
               {
                 type: 'pie',
                 data: [
                   { name: '已租', value: parseInt(res.data[0].y)?parseInt(res.data[0].y):0 },
                   { name: '未租', value: parseInt(res.data[1].y)?parseInt(res.data[1].y):0 }
                 ],
                 radius: ['40%', '50%'],
                 insideLabel: {
                   show: true
                 },
                 outsideLabel: {
                   show: true,
                   labelLineEndLength: 10,
                   style: {
                     fontSize: 12,
                     fill: '#fff',
                     textAlign: 'center',
                     textBaseline: 'middle'
                   }
                 }
               }
             ]
           }
         })
         .catch(function(err){
           console.log(err);
         })

        axios.get('http://api.smart-ideas.com.cn/ymypark/deviceDataView/getDeviceBikeLeasePercent?type=8')
          .then(function(res){
            that.option5 = {
               color: ['red', 'yellow'],
              title: {
                text: '四人脚踏船',
                style: {
                  fill: '#fff'
                },
                offset: [0, -40]
              },
              series: [
                {
                  type: 'pie',
                  data: [
                    { name: '已租', value: parseInt(res.data[0].y)?parseInt(res.data[0].y):0 },
                    { name: '未租', value: parseInt(res.data[1].y)?parseInt(res.data[1].y):0 }
                  ],
                  radius: ['40%', '50%'],
                  insideLabel: {
                    show: true
                  },
                 outsideLabel: {
                   show: true,
                   labelLineEndLength: 10,
                   style: {
                     fontSize: 12,
                     fill: '#fff',
                     textAlign: 'center',
                     textBaseline: 'middle'
                   }
                 }
                }
              ]
            }
          })
          .catch(function(err){
            console.log(err);
          })

          axios.get('http://api.smart-ideas.com.cn/ymypark/deviceDataView/getDeviceBikeLeasePercent?type=9')
           .then(function(res){
             that.option6 = {
               color: ['red', 'yellow'],
               title: {
                 text: '六人脚踏船',
                 style: {
                   fill: '#fff'
                 },
                 offset: [0, -40]
               },
               series: [
                 {
                   type: 'pie',
                   data: [
                     { name: '已租', value: parseInt(res.data[0].y)?parseInt(res.data[0].y):0 },
                     { name: '未租', value: parseInt(res.data[1].y)?parseInt(res.data[1].y):0 }
                   ],
                   radius: ['40%', '50%'],
                   insideLabel: {
                     show: true
                   },
                 outsideLabel: {
                   show: true,
                   labelLineEndLength: 10,
                   style: {
                     fontSize: 12,
                     fill: '#fff',
                     textAlign: 'center',
                     textBaseline: 'middle'
                   }
                 }
                 }
               ]
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
  .titleView p{
    position: absolute;
    color: #fff;
    font-size: 40px;
    /* font-weight: bold; */
    letter-spacing: 5px;
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
    background: url(../assets/left-bg.png) no-repeat left top;
    background-size: cover;
  }
  .leftContent{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    padding: 30px;
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

  /* 线 */
  .line{
    display: block;
    width: 100%;
    background: url(../assets/line.png) no-repeat left top;
    height: 1px;
    background-size: cover;
    margin: 20px 0;
  }

  /* 须知 */
  .noticeView{
    padding: 0 30px;
    color: #fff;
    font-size: 22px;
    line-height: 35px;
  }
  .noticeView p{
    margin-bottom: 5px;
  }
  .noticeTitle{
    font-size: 28px;
    font-weight: bold;
  }

  .leaseView{
    width: 100%;
  }
  .leaseView .leaseList{
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    height: 300px;
    padding: 0 20px;
  }
  .leaseView .leaseList .leaseItem{
    flex: 0 0 33%;
    height: 150px;
  }

  /* 中间视图 */
  .centerView{
    width: 840px;
    height: 950px;
    padding: 20px 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .peopleView{
    width: 710px;
    height: 152px;
  }
  .peopleContent{
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .peopleContent .peopleItem{
    flex: 1;
    height: 152px;
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

  .videoView{
    width: 710px;
    height: 560px;
    margin: 0 auto;
  }

  .progressView{
    width: 100%;
    font-size: 22px;
    color: #fff;
    padding-top: 10px;
  }
  .progressView .progressTitle{
    font-size: 23px;
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
    width: 545px;
    height: 950px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  .rightNotice{
    width: 100%;
    background: url(../assets/rightBg1.png) no-repeat left top;
    background-size: cover;
    padding: 40px 50px 40px;
  }
  .rightNotice .noticeTitle{
    padding-left: 30px;
    margin-bottom: 40px;
  }

  .qrcodeView{
    width: 100%;
    height: 540px;
    background: url(../assets/rightBg2.png) no-repeat left top;
    background-size: 100% 100%;
    padding: 120px 30px 30px 60px;
  }
  .qrcodeViewTitle{
    font-size: 24px;
    color: #fff;
    padding-left: 60px;
    line-height: 40px;
  }
  .qrcodeImgView{
    width: 100%;
    height: 290px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .qrcodeImg{
    width: 250px;
    height: 250px;
    margin: 0 auto;
  }
</style>
