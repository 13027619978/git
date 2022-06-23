<template>
  <div class="hello" :style="{background:url_back_img}" style="width: 100vw;height: 100vh;overflow: hidden;background-size: cover;">
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <div class="title">
          <p>南北湖游船指挥中心</p>
        </div>
      </div>
      <div class="contentView">
        <!-- 顶部视图 -->
        <div class="topView">
          <div class="topLeft">
            <!-- 天气部分 -->
            <div class="weatherView boxView">
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

            <!-- 购票情况 -->
            <div class="leaseDetailView boxView">
              <p class="noticeTitle">皮划艇购票情况</p>
              <dv-scroll-board :config="gpConfig" style="width:100%;height:240px" />
            </div>

            <!-- 皮划艇当日收入曲线 -->
            <div class="incomeInfo boxView">
               <p class="noticeTitle">当日收入曲线</p>
               <dv-charts :option="option2" style="width:100%;height:250px" />
            </div>
          </div>
          <div class="topCenter">
             <div class="iframeView">
               <iframe src="http://smart-ideas.com.cn/mapView/nbhzjcmap.html" frameborder="0" width="750px" height="605px"></iframe>
             </div>

             <!-- 近7日运营情况 -->
             <div class="operatingInfo boxView">
               <p class="noticeTitle">近7日运营情况</p>
               <dv-charts :option="option3" style="width:100%;height:253px" />
             </div>
          </div>
          <div class="topRight">
            <div class="zlbl boxView">
              <p class="noticeTitle">自驾船租赁比例</p>
              <div class="zlContent">
                <div class="zlNumber">
                  <p>在租数量：<font class="zlValue yz">{{yz}}</font></p>
                  <p>空闲数量：<font class="zlValue wz">{{wz}}</font></p>
                </div>
                <dv-active-ring-chart :config="zlbl" style="width:250px;height:250px;" />
              </div>
            </div>
            <!-- 当日租赁情况 -->
            <div class="leaseDetailView boxView">
              <p class="noticeTitle">当日租赁情况</p>
              <dv-scroll-board :config="leaseConfig" style="width:100%;height:240px" />
            </div>
            <!-- 当日退款情况 -->
            <div class="leaseDetailView boxView">
              <p class="noticeTitle">当日退款情况</p>
              <dv-scroll-board :config="refundConfig" style="width:100%;height:240px" />
            </div>
          </div>
        </div>

        <!-- 底部视图 -->
        <div class="bottomView">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QRCode from 'qrcode2';
export default {
  name: 'NbhzhzxView',
  data () {
    return {
      "yz": 0,
      "wz": 0,
      "url_back_img": "url("+require('../assets/zhzx-bg.jpg')+") no-repeat left top #000",
      "zlbl": {},
      "xscale": 1,
      "yscale": 1,
      "nowDate": "2021-01-19 00:00:00",
      "nowPic": "",
      "leaseConfig": {},
      "refundConfig": {},
      "weatherList": [],
      "option1": {},
      "option2": {
        color: ['blue','#ADFF2F'],
        legend: {
          data: ['自驾船', '皮划艇'],
          textStyle: {
            fill: '#fff'
          }
        },
        xAxis: {
          data: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
          axisLine:{
            style: {
              stroke: '#fff',
              lineWidth: 1
            }
          },
          axisLabel: {
            style: {
              fill: '#fff',
              fontSize: 10,
              rotate: 0
            }
          }
        },
        yAxis: {
          data: 'value',
          min: 0,
          axisLine:{
            style: {
              stroke: '#fff',
              lineWidth: 1
            }
          },
          axisLabel: {
            style: {
              fill: '#fff',
              fontSize: 10,
              rotate: 0
            }
          }
        },
        series: [
          {
            name: '自驾船',
            data: [],
            type: 'line'
          },
          {
            name: '皮划艇',
            data: [],
            type: 'line'
          }
        ],
        grid: {
          top: "10px",
          bottom: "20px",
          left: "10px",
          right: "10px"
        }
      },
      "option3": {},
      "config1": {
        number: [0],
        content: '{nt}',
        style: {
          fontSize: 50,
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
      "gpConfig": {
        data: [
          []
        ],
        rowNum: 4,
        align: ['left']
      },
      "src": ""
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
    }, 1000)

    //获取天气情况
    axios.get('http://node.smart-ideas.com.cn:3001/datav/common/weather/v1/weatherInfo?city=330100')
      .then(function(res){
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
              rowNum: 4
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
                ['-', '-']
              ]
            }
            that.refundConfig = {
              header: ['手机号', '退款状态'],
              data: dataList,
              rowNum: 4,
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
            let yz = parseInt(res.data[1].number);
            let totalNumber = res.data[0].number;
            let wz = totalNumber - yz;
            that.yz = yz;
            that.wz = wz;
            that.zlbl = {
              radius: '60%',
              activeRadius: '65%',
              lineWidth: 12,
              digitalFlopStyle: {
                fontSize: 16
              },
              color: ['blue','#ADFF2F'],
              data: [
                {
                  name: '已租',
                  value: yz
                },
                {
                  name: '未租',
                  value: wz
                }
              ]
            };
          })
          .catch(function(err){
            console.log(err);
          })

        // 当日收入曲线
        axios.get('http://hd.smart-ideas.com.cn/xwhpark/operationDataView/getDeviceLeaseHourIncome')
          .then(function(res){
            var incomeList = res.data;
            var timeList = [];
            var moneyList  = [];
            if(incomeList.length > 0){
              incomeList.forEach(function(value, key){
                timeList.push(value.x);
                moneyList.push(parseInt(value.y));
              })
            }else{
              timeList = [0];
              moneyList  = [0];
            }
          })
          .catch(function(err){
            console.log(err);
          })

        // 近7日运营
        axios.get('http://hd.smart-ideas.com.cn/xwhpark/operationDataView/getIncome')
          .then(function(res){
            console.log(res);
            var timeList = [];
            var zjcList = [];
            var bdcList = [];
            res.data.forEach(function(value, key){
              var month = value.x.split('-')[1];
              var day = value.x.split('-')[2];
              if(timeList.indexOf(month + '-' + day) < 0){
                timeList.push(month + '-' + day);
              }
              if(key % 2 == 0){
                zjcList.push(parseInt(value.y));
              }else{
                bdcList.push(parseInt(value.y));
              }
            })
            console.log(bdcList);
            that.option3 = {
              color: ['blue','#ADFF2F'],
              legend: {
                data: ['自驾船', '皮划艇'],
                textStyle: {
                  fill: '#fff'
                }
              },
              xAxis: {
                data: timeList,
                axisLine:{
                  style: {
                    stroke: '#fff',
                    lineWidth: 1
                  }
                },
                axisLabel: {
                  style: {
                    fill: '#fff',
                    fontSize: 10,
                    rotate: 0
                  }
                }
              },
              yAxis: {
                min: 0,
                data: 'value',
                axisLine:{
                  style: {
                    stroke: '#fff',
                    lineWidth: 1
                  }
                },
                axisLabel: {
                  style: {
                    fill: '#fff',
                    fontSize: 10,
                    rotate: 0
                  }
                }
              },
              series: [
                {
                  name: '自驾船',
                  data: [],
                  type: 'bar',
                  barStyle: {
                    fill: '#0a73ff'
                  }
                },
                {
                  name: '皮划艇',
                  data: [],
                  type: 'bar',
                  barStyle: {
                    fill: '#3dabff'
                  }
                }
              ],
              grid: {
                top: "10px",
                bottom: "20px",
                left: "10px",
                right: "10px"
              }
            };
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
  .container{
    width: 1920px;
    background: none;
  }
  .contentView{
    /* transform: scale(.9); */
    transform-origin: top center;
  }
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
  }
  /* 顶部视图 */
  .topView{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .topLeft, .topRight{
    width: 550px;
  }
  .topView .topCenter{
    margin: 0 10px;
  }
  .iframeView{
    padding: 10px;
  }
  .noticeTitle{
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    padding-left: 20px;
    margin-bottom: 20px;
    text-align: center;
  }
  .boxView{
    background: url(../assets/itemBg.png) no-repeat left top;
    background-size: 100% 100%;
    padding: 15px;
  }

  /* 天气预报 */
  .weatherView{
    width: 100%;
    height: 315px;
    padding-left: 30px;
    padding-top: 22px;
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

  .zlContent{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .zlContent .zlNumber p{
    font-size: 20px;
    color: #fff;
    line-height: 70px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .zlContent .zlNumber .zlValue{
    font-size: 60px;
    font-weight: bold;
    color: blue;
  }
  .zlContent .zlNumber .wz{
    color: #ADFF2F;
  }

</style>
