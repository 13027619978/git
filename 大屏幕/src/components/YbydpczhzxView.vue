<template>
  <div class="hello">
    <dv-full-screen-container class="container" :style="{background:url_back_img}">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <div class="title">
          <p>北京园博园电瓶车指挥中心</p>
        </div>
      </div>
      <div class="contentView">
        <!-- 左侧视图 -->
        <div class="leftView">
          <div class="left-top">
            <!-- 天气部分 -->
            <div class="marginRight">
              <dv-border-box-10>
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
              </dv-border-box-10>
            </div>
          </div>

          <div class="left-center">
            <!-- 收入统计 -->
            <div class="marginRight">
              <dv-border-box-10>
                <div class="income">
                  <div class="typeView">
                    <a href="javascript:;" class="typeItem" :class="{active:num=='0'}" @click="tab(0)">日收入</a>
                    <a href="javascript:;" class="typeItem" :class="{active:num=='1'}" @click="tab(1)">周收入</a>
                    <a href="javascript:;" class="typeItem" :class="{active:num=='2'}" @click="tab(2)">月收入</a>
                  </div>
                  <dv-charts :option="incomeData" style="width:650px;height:330px" v-show="num==0"/>
                  <dv-charts :option="incomeData1" style="width:650px;height:330px" v-show="num==1"/>
                  <dv-charts :option="incomeData2" style="width:650px;height:330px" v-show="num==2"/>
                </div>
              </dv-border-box-10>
            </div>

            <!-- 地图 -->
            <div class="mapView">
              <iframe src="http://smart-ideas.com.cn/mapView/ybydpcMap.html" style="width:100%;height:665px;margin-top: -265px;"></iframe>
            </div>
          </div>

          <div class="left-bottom">
            <!-- 路线图 -->
            <div>
              <dv-border-box-10>
                <div class="routeView">
                  <p class="title">车辆行驶位置</p>
                  <div class="routeItem">
                    <p class="routeName">平原线</p>
                    <div class="routeList">
                      <div class="line"></div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        二号门
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('1') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('2') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('3') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('4') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('5') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        台湾园
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('20') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('21') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('22') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('23') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('24') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        锦绣谷北
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('40') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('41') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('42') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('43') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('44') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('45') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('46') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        西安园
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('60') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('61') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('62') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        紫薇园
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('80') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('81') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('82') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('83') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('84') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('85') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        江苏园
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('100') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('101') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('102') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('103') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        北京园
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('120') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('121') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('122') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        台湾园
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('140') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('141') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('142') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('143') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('144') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        二号门
                        <img class="carIcon" src="../assets/car-icon.png" v-show="carList.indexOf('160') != -1">
                      </div>
                    </div>
                  </div>
                </div>
              </dv-border-box-10>
            </div>
          </div>
        </div>

        <!-- 右侧视图 -->
        <div class="rightView">
          <!-- 消息推送 -->
          <div>
            <dv-border-box-10>
              <div class="notice">
                  <p class="title">信息推送</p>
                  <div class="noticeContent">
                    <dv-scroll-board :config="xxts" style="width:550px;height:175px" />
                  </div>
              </div>
            </dv-border-box-10>
          </div>

          <!-- 车载画面 -->
          <div>
            <dv-border-box-10>
              <div class="czView">
                <p class="title">车辆运行信息</p>
                <dv-scroll-board :config="yxzt" style="width:560px;height:320px;" />
              </div>
            </dv-border-box-10>
          </div>

          <!-- 站点售卡 -->
          <div>
            <dv-border-box-10>
              <div class="zdIncome">
                <div class="typeView">
                  <a href="javascript:;" class="typeItem" :class="{active:zdNum=='1'}" @click="zdTab(1)">日统计</a>
                  <a href="javascript:;" class="typeItem" :class="{active:zdNum=='2'}" @click="zdTab(2)">周统计</a>
                  <a href="javascript:;" class="typeItem" :class="{active:zdNum=='3'}" @click="zdTab(3)">月统计</a>
                </div>
                <dv-charts :option="zdsk" style="width:545px;height:230px" />
              </div>
            </dv-border-box-10>
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
  name: 'XwhdpczhzxView',
  data () {
    return {
      "zdsk": {},
      "carList": [],
      "url_back_img": "url("+require('../assets/zhzx-bg.jpg')+") no-repeat left top #000",
      "nowDate": "2021-01-19 00:00:00",
      "num": 0,
      "zdNum": 1,
      "weatherList": [],
      "xxts": {
        rowNum: 4,
        oddRowBGC: 'rgba(0,0,0,0)',
        evenRowBGC: 'rgba(0,0,0,0)',
        data: []
      },
      "clhj": {
        rowNum: 5,
        oddRowBGC: 'rgba(0,0,0,0)',
        evenRowBGC: 'rgba(0,0,0,0)',
        data: []
      },
      "yxzt": {
        rowNum: 1,
        oddRowBGC: 'rgba(0,0,0,0)',
        evenRowBGC: 'rgba(0,0,0,0)',
        data: []
      },
      "incomeData": {},
      "incomeData1": {},
      "incomeData2": {}
    }
  },
  methods: {
    tab: function(num){
      this.num = num;
    },
    zdTab: function(num){
      this.zdNum = num;
      let that = this;
      // 站点售卡数统计
      axios.get('http://smart-ideas.com.cn/yby/loopDataV/getSiteCheckInfo?type='+ num +'&lineId=1')
        .then(function(res){
          var dataList = [];
          var nameList = [];
          res.data.forEach(function(value, key){
            dataList.push(parseInt(value.checkNumber));
            nameList.push(value.siteName);
          })
          that.zdsk = {
            title: {
              text: '检卡数统计',
              style: {
                fill: '#fff'
              }
            },
            xAxis: {
              data: nameList,
              axisLine:{
                style: {
                  stroke: '#fff',
                  lineWidth: 1
                }
              },
              axisLabel: {
                style: {
                  fill: '#fff',
                  fontSize: 14,
                  rotate: 0
                }
              }
            },
            yAxis: {
              name: '张',
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
                  fontSize: 14,
                  rotate: 0
                }
              },
              min: 0
            },
            series: [
              {
                data: dataList,
                type: 'bar',
                barWidth: 15,
                gradient: {
                  color: ['#37a2da', '#0080FF']
                },
                label: {
                  show: true,
                  position: 'top',
                  offset: [0, -10],
                  style: {
                    fill: '#fff',
                    fontSize: 14,
                  }
                }
              }
            ],
            grid: {
              top: '20px',
              left: '10px',
              right: '10px',
              bottom: '15px',
              containLabel: true
            }
          };
        }).catch(function(err){
          console.log(err);
        })
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
        // 获取消息推送
          axios.get('http://smart-ideas.com.cn/yby/loopDataV/getOrderInfo')
            .then(function(res){
              var dataList = [];
              res.data.forEach(function(value, key){
                var siteName = value.topic;
                if(siteName == '/SpEnGmdSSjn/CardTest4/update' || siteName == '/SpEnGmdSSjn/CardTest3/update'){
                  siteName = '二号门';
                }else if(siteName == '/SpEnGmdSSjn/CardTest5/update' || siteName == '/SpEnGmdSSjn/CardTest2/update'){
                  siteName = '台湾园';
                }else if(siteName == '/SpEnGmdSSjn/CardTest6/update' || siteName == '/SpEnGmdSSjn/CardTest1/update'){
                  siteName = '紫薇园';
                }else if(siteName == '/SpEnGmdSSjn/CardTest7/update'){
                  siteName = '六号门';
                }
                var money = parseFloat(value.totalMoney).toFixed(2);
                var dataItem = ['<p style="font-size:20px;border-left: 5px solid #1953c8;height: 35px;line-height:35px;padding-left: 10px;background-color:rgba(23,88,208,.6);">'
                + value.payDate + siteName + '购票:' + money +
                '元</p>'];
                // var dataItem = ['<p style="font-size:20px;border-left: 5px solid #1953c8;height: 35px;line-height:35px;padding-left: 10px;background-color:rgba(23,88,208,.6);">1元</p>'];
                dataList.push(dataItem);
              })
              if(dataList[0] != that.xxts.data[0]){
                that.xxts = {
                  rowNum: 4,
                  oddRowBGC: 'rgba(0,0,0,0)',
                  evenRowBGC: 'rgba(0,0,0,0)',
                  data: dataList
                };
              }
            }).catch(function(err){
              console.log(err);
            })

          // 站点售卡数统计
          axios.get('http://smart-ideas.com.cn/yby/loopDataV/getSiteCheckInfo?type=1&lineId=1')
            .then(function(res){
              var dataList = [];
              var nameList = [];
              res.data.forEach(function(value, key){
                dataList.push(parseInt(value.checkNumber));
                nameList.push(value.siteName);
              })
              that.zdsk = {
                title: {
                  text: '检卡数统计',
                  style: {
                    fill: '#fff'
                  }
                },
                xAxis: {
                  data: nameList,
                  axisLine:{
                    style: {
                      stroke: '#fff',
                      lineWidth: 1
                    }
                  },
                  axisLabel: {
                    style: {
                      fill: '#fff',
                      fontSize: 14,
                      rotate: 0
                    }
                  }
                },
                yAxis: {
                  nameTextStyle: {
                     fontSize: 14,
                     fill: '#fff'
                  },
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
                      fontSize: 14,
                      rotate: 0
                    }
                  },
                  min: 0
                },
                series: [
                  {
                    data: dataList,
                    type: 'bar',
                    barWidth: 15,
                    gradient: {
                      color: ['#37a2da', '#0080FF']
                    },
                    label: {
                      show: true,
                      position: 'top',
                      offset: [0, -10],
                      style: {
                        fill: '#fff',
                        fontSize: 14,
                      }
                    }
                  }
                ],
                grid: {
                  top: '20px',
                  left: '10px',
                  right: '10px',
                  bottom: '15px',
                  containLabel: true
                }
              };
            }).catch(function(err){
              console.log(err);
            })

          // 获取当日车辆信息
          axios.get('http://smart-ideas.com.cn/yby/loopDataV/getVehicleMountedInfo')
            .then(function(res){
              var dataList = [];
              res.data.forEach(function(value, key){
                var driverName = value.driverName;
                driverName = driverName?driverName:'无';
                var dataItem = ['<div><div style="width:100%;height:250px;display:flex;justify-content:center;align-items:center;margin-bottom:10px;"><img style="width:100%;height:100%;" src="'
                  + value.picUrl + '"></div><p style="height:30px;line-height:30px;font-size:20px;">车辆号：'
                  + value.vehicleMountedSn + '</p><p style="height:30px;line-height:30px;font-size:20px;">司机：'
                  + driverName + '</p></div>'];
                dataList.push(dataItem);
              })
              if(dataList[0] != that.yxzt.data[0]){
                that.yxzt = {
                  rowNum: 1,
                  waitTime: 3000,
                  oddRowBGC: 'rgba(0,0,0,0)',
                  evenRowBGC: 'rgba(0,0,0,0)',
                  data: dataList
                };
              }
            }).catch(function(err){
              console.log(err);
            })

          // 收入曲线
          let type;
          if(that.num == '0'){
            type = 'a';
          }else if(that.num == '1'){
            type = 'b';
          }else{
            type = 'c';
          }
          axios.get('http://smart-ideas.com.cn/yby/loopDataV/getIncome?type=a')
            .then(function(res){
              var dataList = [];
              var timeList = [];
              res.data.forEach(function(value, key){
                var incomeText = value.income;
                incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                timeList.push(value.date);
                dataList.push(incomeText);
              })
              that.incomeData = {
                animation: false,
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
                      fontSize: 14,
                      rotate: 0
                    }
                  }
                },
                yAxis: {
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
                      fontSize: 14,
                      rotate: 0
                    }
                  }
                },
                series: [
                  {
                    data: dataList,
                    type: 'line',
                    label: {
                      show: false,
                      formatter: '{value} 元',
                      style: {
                        fontSize: 14,
                        fill: '#F0E68C',
                      }
                    },
                    lineStyle: {
                      stroke: '#66CDAA',
                      lineWidth: 2
                    }
                  }
                ]
              };
            }).catch(function(err){
              console.log(err);
            })

          axios.get('http://smart-ideas.com.cn/yby/loopDataV/getIncome?type=b')
            .then(function(res){
              var dataList = [];
              var timeList = [];
              res.data.forEach(function(value, key){
                var incomeText = value.income;
                incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                var timeText = value.date;
                timeText = timeText.split('-')[1] + '-' + timeText.split('-')[2];
                timeList.push(timeText);
                dataList.push(incomeText);
              })
              that.incomeData1 = {
                animation: false,
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
                      fontSize: 14,
                      rotate: 0
                    }
                  }
                },
                yAxis: {
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
                      fontSize: 14,
                      rotate: 0
                    }
                  }
                },
                series: [
                  {
                    data: dataList,
                    type: 'line',
                    label: {
                      show: false,
                      formatter: '{value} 元',
                      style: {
                        fontSize: 14,
                        fill: '#F0E68C',
                      }
                    },
                    lineStyle: {
                      stroke: '#66CDAA',
                      lineWidth: 2
                    }
                  }
                ]
              };
            }).catch(function(err){
              console.log(err);
            })

          axios.get('http://smart-ideas.com.cn/yby/loopDataV/getIncome?type=c')
            .then(function(res){
              var dataList = [];
              var timeList = [];
              res.data.forEach(function(value, key){
                var incomeText = value.income;
                incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                var timeText = value.date;
                timeText = timeText.split('-')[1] + '-' + timeText.split('-')[2];
                if(key % 3 == 0){
                  timeList.push(timeText);
                }else{
                  timeList.push('');
                }
                dataList.push(incomeText);
              })
              if(dataList.length > 0 || timeList.length > 0){
                that.incomeData2 = {
                  animation: false,
                  xAxis: {
                    axisTick: {
                      show: true
                    },
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
                        fontSize: 14,
                        rotate: 0
                      }
                    }
                  },
                  yAxis: {
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
                        fontSize: 14,
                        rotate: 0
                      }
                    }
                  },
                  series: [
                    {
                      data: dataList,
                      type: 'line',
                      label: {
                        show: false,
                        formatter: '{value} 元',
                        style: {
                          fontSize: 14,
                          fill: '#F0E68C',
                        }
                      },
                      lineStyle: {
                        stroke: '#66CDAA',
                        lineWidth: 2
                      }
                    }
                  ]
                };
              }
            }).catch(function(err){
              console.log(err);
            })
          // 获取卡尺位置
          axios.get('http://smart-ideas.com.cn/yby/loopDataV/getVehicleMountedLocation?lineId=1')
            .then(function(res){
              var carList = res.data;
              var newCarList = [];
              if(carList.length > 0){
                carList.forEach(function(value, key){
                  let carId = value.id;
                  newCarList.push(carId);
                })
              }
              that.carList = newCarList;
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
  .container{
    background: url(../assets/bg.png) no-repeat left top #000;
    background-size: cover;
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
    letter-spacing: 5px;
  }
  .childTitle{
    font-size: 18px;
    text-align: center;
  }

  /* 内容部分 */
  .contentView{
    width: 100%;
    transform-origin: top center;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .marginRight{
    margin-right: 10px;
  }
  /* 左侧试图 */
  .left-top{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 255px;
    width: 1310px;
  }

  /* 天气预报 */
  .weatherView{
    width: 650px;
    height: 255px;
    padding: 10px;
  }
  .weatherView .dateView{
    font-size: 23px;
    color: #fff;
    padding-left: 40px;
    line-height: 30px;
    background: url(../assets/time-icon.png) no-repeat left center;
    background-size: 30px 30px;
  }
  .nowWeather{
    display: flex;
    justify-content: start;
    align-items: center;
    padding-top: 15px;
  }
  .nowWeather .nowTemp{
    flex: 0 0 42%;
    font-size: 45px;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }
  .nowWeather .nowWeatherPic{
    flex: 0 0 13%;
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
    font-size: 20px;
    color: #fff;
  }

  /* 消息推送 */
  .notice{
    width: 100%;
    height: 255px;
    padding: 10px;
  }
  .noticeContent{
    width: 100%;
    height: 195px;
    padding: 10px;
  }
  .notice .title{
    font-size: 23px;
    line-height: 40px;
    color: #fff;
    padding-left: 40px;
    background: url(../assets/xxts-icon.png) no-repeat left center;
    background-size: 35px auto;
  }

  .left-center{
    width: 1310px;
    height: 400px;
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  /* 收入统计 */
  .income{
    width: 650px;
    padding: 10px;
  }
  .typeView{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .typeItem{
    flex: 1;
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    border-bottom: 1px solid #1370FB;
    text-decoration: none;
  }
  .typeItem.active{
    background-color: #1370FB;
  }

  /* 地图 */
  .mapView{
    width: 650px;
    height: 400px;
  }

  .left-bottom{
    width: 1310px;
    margin-top: 10px;
  }

  /* 车辆行驶位置 */
  .routeView{
    width: 100%;
    height: 305px;
    padding: 20px;
  }
  .routeView .title{
    font-size: 23px;
    line-height: 40px;
    color: #fff;
    padding-left: 40px;
    background: url(../assets/wz-icon.png) no-repeat left center;
    background-size: 30px auto;
  }
  .routeItem{
    padding: 85px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .routeName{
    color: #e40013;
    background-color: #fff;
    line-height: 20px;
    border-radius: 20px;
    font-size: 18px;
    font-weight: bolder;
    flex: 0 0 90px;
    text-align: center;
    padding: 5px 0;
  }
  .routeList{
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    position: relative;
  }
  .line{
    position: absolute;
    top: 50%;
    left: 20px;
    right: 20px;
    height: 5px;
    background-color: blue;
    margin-top: -6px;
  }
  .siteItem{
    width: 20px;
    height: 70px;
    font-size: 18px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    white-space: nowrap;
    position: relative;
  }
  .siteItem .carIcon{
    position: absolute;
    width: 30px;
    top: -30px;
  }
  .siteItem img{
    width: 20px;
    margin-bottom: 5px;
  }
  .siteItem .siteIcon{
    width: 15px;
  }

  /* 右侧视图 */
  .rightView{
    width: 580px;
    margin-left: 10px;
  }

  /* 车载信息 */
  .czView{
    width: 100%;
    height: 400px;
    padding: 10px;
    margin-top: 10px;
  }
  .czView .title{
    font-size: 23px;
    line-height: 40px;
    color: #fff;
    padding-left: 40px;
    background: url(../assets/yxzt-icon.png) no-repeat left center;
    background-size: 35px auto;
    margin-bottom: 10px;
  }

  /* 站点售卡 */
  .zdIncome{
    width: 100%;
    height: 305px;
    padding: 10px;
    margin-top: 10px;
  }



</style>
