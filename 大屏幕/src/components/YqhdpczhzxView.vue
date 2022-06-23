<template>
  <div class="hello" :style="{background:url_back_img}" style="width: 100vw;height: 100vh;overflow: hidden;background-size: cover;">
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <div class="title">
          <p>雁栖湖景区观光车运营调度中心</p>
        </div>
        <p class="updateTime">更新时间：{{updateTime}}</p>
      </div>
      <div class="contentView">
        <!-- 左侧视图 -->
        <div class="leftView">
          <div class="left-top">
            <!-- 天气部分 -->
            <div class="marginRight">
              <dv-border-box-10>
                <div class="weatherBox">
                  <div class="weatherView">
                    <p class="dateView">{{nowDate}}</p>
                    <!-- 今日天气 -->
                    <div class="nowWeather">
                      <div class="weatherTop">
                        <p class="nowTemp">{{weatherList.length>0?weatherList[0].temperature:'10℃'}}</p>
                        <div class="nowWeatherPic">
                           <img :src="weatherList.length>0?weatherList[0].picUrl:'http://smart-ideas.com.cn/ico2/b0.png'">
                        </div>
                      </div>
                      <div class="weatherBottom">
                        <div class="nowWeatherItem">
                          <p>今日天气</p>
                          <p class="nowWeatherText">{{weatherList.length>0?weatherList[0].weather:'晴'}}</p>
                        </div>
                        <div class="nowWeatherItem">
                          <p class="nowWindType">{{weatherList.length>0?weatherList[0].wind:'东'}}风</p>
                          <p class="nowWindLevel">{{weatherList.length>0?weatherList[0].windpower:'>2'}}级</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 预警部分 -->
                  <div class="paper">
                    <div class="paperContent">
                      <dv-scroll-board :config="paper" style="width:320px;height:215px;" />
                    </div>
                  </div>
                </div>
              </dv-border-box-10>
            </div>

            <!-- 收入饼状图 -->
            <div class="marginRight">
              <dv-border-box-10>
                <div class="linePercent">
                  <div class="lineIncome">
                    <p>迷你小火车：{{xhcMoney}}元</p>
                    <p>观光车出园：{{ggczMoney}}元</p>
                    <p>观光车入园：{{ggcfMoney}}元</p>
                  </div>
                  <dv-active-ring-chart :config="linePercent" style="width:255px;height:255px;" />
                </div>
              </dv-border-box-10>
            </div>
          </div>

          <div class="left-center">
            <!-- 站点售卡 -->
            <div class="marginRight">
              <dv-border-box-10>
                <div class="zdIncome">
                  <div class="zdIncomeItem">
                    <p class="title">观光车出园</p>
                    <dv-charts :option="zdsk1" style="width:510px;height:340px" />
                  </div>
                  <div class="zdIncomeItem">
                    <p class="title">迷你小火车</p>
                    <dv-charts :option="zdsk2" style="width:270px;height:340px" />
                  </div>
                  <div class="zdIncomeItem">
                    <p class="title">观光车入园</p>
                    <dv-charts :option="zdsk3" style="width:510px;height:340px" />
                  </div>
                  <!-- <div class="typeView">
                    <a href="javascript:;" class="typeItem" :class="{active:zdNum=='1'}" @click="zdTab(1)">观光车上行</a>
                    <a href="javascript:;" class="typeItem" :class="{active:zdNum=='2'}" @click="zdTab(2)">迷你小火车</a>
                    <a href="javascript:;" class="typeItem" :class="{active:zdNum=='3'}" @click="zdTab(3)">观光车下行</a>
                  </div>
                  <dv-charts :option="zdsk" style="width:700px;height:330px" /> -->
                </div>
              </dv-border-box-10>
            </div>

            <!-- 地图 -->
            <!-- <div class="mapView">
              <iframe src="http://smart-ideas.com.cn/mapView/yqhdpczhzxmap.html" style="width:100%;height:455px;"></iframe>
            </div> -->
          </div>

          <div class="left-bottom">
            <!-- 路线图 -->
            <div>
              <dv-border-box-10>
                <div class="routeView">
                  <p class="title">车辆行驶位置</p>
                  <!-- <div class="routeItem">
                    <p class="routeName">迷你小火车</p>
                    <div class="routeList">
                      <div class="line"></div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        游船码头
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('500') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('18') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        电瓶车码头
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('500') != -1">
                      </div>
                    </div>
                  </div> -->

                  <div class="routeItem">
                    <p class="routeName">观光车</p>
                    <div class="routeList">
                      <p class="carSn" :class="{animate:item.animate,hidden:item.hidden}" :style="{'left': item.carDistance + 'px','top': item.top + 'px'}" v-for="(item, i) in carPositions ">{{item.carSn}}</p>
                      <img class="carIcon" :class="{animate:item.animate,hidden:item.hidden}" :style="{'left': item.carDistance + 'px'}" :src="item.carIcon" v-for="(item, i) in carPositions ">
                      <div class="line"></div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        游船码头
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('100') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('101') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('102') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('103') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('104') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('105') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('106') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        景区正门站
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('110') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="false">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="false">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="false">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        景区南门站
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('120') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('121') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('122') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('123') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('124') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('125') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('126') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        P6停车场站
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('130') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('131') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('132') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        日出东方站
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('140') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('141') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('142') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('143') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        南码头站
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('150') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('152') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('153') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('154') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('155') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('156') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        大雁楼宾馆站
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('160') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('161') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('162') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('163') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('164') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('165') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('166') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('167') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('168') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('169') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('170') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('171') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('172') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('173') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('174') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        P5停车场站
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('180') != -1">
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

          <!-- 收入统计 -->
          <div>
            <dv-border-box-10>
              <div class="income">
                <div class="typeView">
                  <a href="javascript:;" class="typeItem" :class="{active:num=='0'}" @click="tab(0)">日统计</a>
                  <a href="javascript:;" class="typeItem" :class="{active:num=='1'}" @click="tab(1)">周统计</a>
                  <a href="javascript:;" class="typeItem" :class="{active:num=='2'}" @click="tab(2)">月统计</a>
                </div>
                <p class="totalIncome">总收入：{{num==0?dayIncome:num==1?weekIncome:monthIncome}}元</p>
                <dv-charts :option="incomeData" style="width:555px;height:230px" v-show="num=='0'"/>
                <dv-charts :option="incomeData1" style="width:555px;height:230px" v-show="num=='1'"/>
                <dv-charts :option="incomeData2" style="width:555px;height:230px" v-show="num=='2'"/>
              </div>
            </dv-border-box-10>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QRCode from 'qrcode2';
import carCurrent from '../assets/car-icon.png';
import carLeft from '../assets/car-left.png';
import carRight from '../assets/car-right.png';
export default {
  name: 'YqhdpczhzxView',
  data () {
    return {
      "updateTime": '',
      "xscale": 1,
      "yscale": 1,
      "xhcMoney": 0,
      "ggczMoney": 0,
      "ggcfMoney": 0,
      "xwmDayMoney": 0,
      "xwmNightMoney": 0,
      "jfmMoney": 0,
      "oldPositon": [],  // 记录车辆前20秒位置
      "nhxList": [],     // 车辆当前位置
      "carPositions": [],
      "xhcList": [],
      "dayIncome": 0,
      "weekIncome": 0,
      "monthIncome": 0,
      "totalIncome": 0,
      "zdsk": {},
      "zdsk1": {},
      "zdsk2": {},
      "zdsk3": {},
      "carList": [],
      "linePercent": {
        radius: '60%',
        activeRadius: '65%',
        lineWidth: 15,
        digitalFlopStyle: {
          fontSize: 16
        }
      },
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
      "paper": {
        rowNum: 4,
        oddRowBGC: 'rgba(0,0,0,0)',
        evenRowBGC: 'rgba(0,0,0,0)',
        data: [['<p style="font-size:13px;height: 35px;line-height:35px;padding-left: 10px;background-color:rgba(23,88,208,.6);">暂无异常状态</p>']]
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
      let that = this;
      // 站点售卡数统计
      axios.get('http://api.smart-ideas.com.cn/yqhpark/loopDataV/getSiteSaleInfo?lineId=' + num)
        .then(function(res){
          var dataList = [];
          var restDataList = [];
          var nameList = [];
          res.data.forEach(function(value, key){
            dataList.push(parseInt(value.buyQuantity));
            restDataList.push(parseInt(value.restCheckQuantity));
            var siteName = value.siteName;
            siteName = siteName.split('站')[0];
            nameList.push(siteName);
          })
          var options = {
            legend: {
              data: [
                {
                  name: '已售票',
                  color: 'yellow'
                },
                {
                  name: '未验票',
                  color: 'blue'
                },
              ],
              textStyle: {
                fill: '#fff',
                fontSize: 12
              },
              bottom: 5
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
                  fontSize: 11
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
                name: '已售票',
                data: dataList,
                type: 'bar',
                barWidth: 10,
                barStyle: {
                  fill: 'yellow'
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
              },
              {
                name: '未验票',
                data: restDataList,
                type: 'bar',
                barWidth: 10,
                barStyle: {
                  fill: 'blue'
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
              top: '10px',
              left: '10px',
              right: '10px',
              bottom: '15px',
              containLabel: true
            }
          };
          if(num == '1'){
            that.zdsk1 = options;
          }else if(num == '2'){
            that.zdsk2 = options;
          }else if(num == '3'){
            that.zdsk3 = options;
          }
          // that.zdsk =
        }).catch(function(err){
          console.log(err);
        })
    },
    // 获取距离是发展位置
    getDistance: function(currentId){
      var startId = 100;
      if(currentId == 110){
        currentId = 107;
      }else if(120 <= currentId && currentId < 127){
        currentId = currentId - 9;
      }else if(130 <= currentId && currentId < 133){
        currentId = currentId - 12;
      }else if(140 <= currentId && currentId < 144){
        currentId = currentId - 19;
      }else if(150 <= currentId && currentId < 157){
        currentId = currentId - 25;
      }else if(160 <= currentId && currentId < 175){
        currentId = currentId - 28;
      }else if(currentId == 180){
        currentId = 147
      }
      var siteDistance = 1090 / ((document.getElementsByClassName('siteItem').length) - 1);
      var siteNumber = currentId - startId;
      return siteDistance * siteNumber + 35;
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
    axios.get('http://node.smart-ideas.com.cn:3001/datav/common/weather/v1/weatherInfo?city=320300')
      .then(function(res){
        that.weatherList = res.data;
      }).catch(function(err){
        console.log(err);
      })

    // 车辆初始位置
    var carPositions = [];
    var carSnList = [];
    var seconds = 0;
    setInterval(function(){
      seconds += 1;
      if(seconds == 1 || seconds % 20 == 0){

          // 获取消息推送
          axios.get('http://api.smart-ideas.com.cn/yqhpark/loopDataV/getOrderInfo')
            .then(function(res){
              var dataList = [];
              res.data.forEach(function(value, key){
                var siteName = value.siteName;

                var money = parseFloat(value.money).toFixed(2);
                var dataItem = ['<p style="font-size:18px;border-left: 5px solid #1953c8;height: 35px;line-height:35px;padding-left: 10px;background-color:rgba(23,88,208,.6);">'
                + value.payDate + siteName + '购'+ value.lineName +'票:' + money +
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

          // 预警
          // axios.get('http://api.smart-ideas.com.cn/yqhpark/batteryDataView/getPrinterStatus')
          //   .then(function(res){
          //     var dataList = [];
          //     res.data.forEach(function(value, key){
          //       if(value.status != '0'){
          //         var siteStatus = value.status;
          //         var itemString = '';
          //         if(siteStatus == '1'){
          //         	itemString += value.siteName + value.printerName + '：缺纸\n';
          //         }else if(value.status == '2'){
          //         	itemString += value.siteName + value.printerName + '：纸将尽\n';
          //         }else if(value.status == '3'){
          //         	itemString += value.siteName + value.printerName + '：打开失败\n';
          //         }else if(value.status == '4'){
          //         	itemString += value.siteName + value.printerName + '：脱机\n';
          //         }

          //         var money = parseFloat(value.money).toFixed(2);
          //         var dataItem = ['<p style="font-size:13px;height: 35px;line-height:35px;padding-left: 10px;background-color:rgba(23,88,208,.6);">'
          //         + itemString +
          //         '</p>'];
          //         dataList.push(dataItem);
          //       }
          //     })
          //     console.log('异常状态=================' + dataList);
          //     if(dataList.length != 0){
          //       that.paper = {
          //         rowNum: 4,
          //         oddRowBGC: 'rgba(0,0,0,0)',
          //         evenRowBGC: 'rgba(0,0,0,0)',
          //         data: dataList
          //       };
          //     }else{
          //       that.paper = {
          //         rowNum: 4,
          //         oddRowBGC: 'rgba(0,0,0,0)',
          //         evenRowBGC: 'rgba(0,0,0,0)',
          //         data: [['<p style="font-size:13px;height: 35px;line-height:35px;padding-left: 10px;background-color:rgba(23,88,208,.6);">暂无异常状态</p>']]
          //       };
          //     }
          //   }).catch(function(err){
          //     console.log(err);
          //   })


          // 站点售票
          that.zdTab(1);
          that.zdTab(2);
          that.zdTab(3);

          // 车载信息
          axios.get('http://api.smart-ideas.com.cn/yqhpark/loopDataV/getVehicleMountedInfo')
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

          // 收入曲线
          axios.get('http://api.smart-ideas.com.cn/yqhpark/loopDataV/getIncome?lineId=1')
            .then(function(res){
              var nhxDayDataList = [];
              var nhxDayTimeList = [];
              var nhxWeekDataList = [];
              var nhxWeekTimeList = [];
              var nhxMonthDataList = [];
              var nhxMonthTimeList = [];
              var qlyDayDataList = [];
              var qlyDayTimeList = [];
              var qlyWeekDataList = [];
              var qlyWeekTimeList = [];
              var qlyMonthDataList = [];
              var qlyMonthTimeList = [];
              var xhcDayDataList = [];
              var xhcDayTimeList = [];
              var xhcWeekDataList = [];
              var xhcWeekTimeList = [];
              var xhcMonthDataList = [];
              var xhcMonthTimeList = [];
              var dayIncome = 0;
              var weekIncome = 0;
              var monthIncome = 0;
              res.data.forEach(function(value, key){
                if(value.key == 'now'){
                  value.data.forEach(function(dayItem, dayKey){
                    var incomeText = dayItem.income;
                    incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                    if(dayKey % 2 == 0){
                      nhxDayTimeList.push(dayItem.date);
                    }else{
                      nhxDayTimeList.push('');
                    }
                    nhxDayDataList.push(incomeText);
                    dayIncome += incomeText;
                  })
                }
                if(value.key == 'week'){
                  value.data.forEach(function(weekItem, dayKey){
                    var incomeText = weekItem.income;
                    incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                    weekIncome += incomeText;
                    var timeText = weekItem.date;
                    timeText = timeText.split('-')[1] + '-' + timeText.split('-')[2];
                    nhxWeekTimeList.push(timeText);
                    nhxWeekDataList.push(incomeText);
                  })
                }
                if(value.key == 'month'){
                  value.data.forEach(function(monthItem, dayKey){
                    var incomeText = monthItem.income;
                    incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                    monthIncome += incomeText;
                    var timeText = monthItem.date;
                    timeText = timeText.split('-')[1] + '-' + timeText.split('-')[2];
                    if(dayKey % 3 == 0){
                      nhxMonthTimeList.push(timeText);
                    }else{
                      nhxMonthTimeList.push('');
                    }
                    nhxMonthDataList.push(incomeText);
                  })
                }
              })
              axios.get('http://api.smart-ideas.com.cn/yqhpark/loopDataV/getIncome?lineId=2')
                .then(function(qlyRes){
                  qlyRes.data.forEach(function(value, key){
                    if(value.key == 'now'){
                      value.data.forEach(function(dayItem, dayKey){
                        var incomeText = dayItem.income;
                        incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                        dayIncome += incomeText;
                        if(dayKey % 2 == 0){
                          qlyDayTimeList.push(dayItem.date);
                        }else{
                          qlyDayTimeList.push('');
                        }
                        qlyDayDataList.push(incomeText);
                      })
                    }
                    if(value.key == 'week'){
                      value.data.forEach(function(weekItem, dayKey){
                        var incomeText = weekItem.income;
                        incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                        weekIncome += incomeText;
                        var timeText = weekItem.date;
                        timeText = timeText.split('-')[1] + '-' + timeText.split('-')[2];
                        qlyWeekTimeList.push(timeText);
                        qlyWeekDataList.push(incomeText);
                      })
                    }
                    if(value.key == 'month'){
                      value.data.forEach(function(monthItem, dayKey){
                        var incomeText = monthItem.income;
                        incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                        monthIncome += incomeText;
                        var timeText = monthItem.date;
                        timeText = timeText.split('-')[1] + '-' + timeText.split('-')[2];
                        if(dayKey % 3 == 0){
                          qlyMonthTimeList.push(timeText);
                        }else{
                          qlyMonthTimeList.push('');
                        }
                        qlyMonthDataList.push(incomeText);
                      })
                    }
                  })

                  axios.get('http://api.smart-ideas.com.cn/yqhpark/loopDataV/getIncome?lineId=3')
                    .then(function(xhcRes){
                      xhcRes.data.forEach(function(value, key){
                        if(value.key == 'now'){
                          value.data.forEach(function(dayItem, dayKey){
                            var incomeText = dayItem.income;
                            incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                            dayIncome += incomeText;
                            if(dayKey % 2 == 0){
                              xhcDayTimeList.push(dayItem.date);
                            }else{
                              xhcDayTimeList.push('');
                            }
                            xhcDayDataList.push(incomeText);
                          })
                        }
                        if(value.key == 'week'){
                          value.data.forEach(function(weekItem, dayKey){
                            var incomeText = weekItem.income;
                            incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                            weekIncome += incomeText;
                            var timeText = weekItem.date;
                            timeText = timeText.split('-')[1] + '-' + timeText.split('-')[2];
                            xhcWeekTimeList.push(timeText);
                            xhcWeekDataList.push(incomeText);
                          })
                        }
                        if(value.key == 'month'){
                          value.data.forEach(function(monthItem, dayKey){
                            var incomeText = monthItem.income;
                            incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                            monthIncome += incomeText;
                            var timeText = monthItem.date;
                            timeText = timeText.split('-')[1] + '-' + timeText.split('-')[2];

                            if(dayKey % 3 == 0){
                              xhcMonthTimeList.push(timeText);
                            }else{
                              xhcMonthTimeList.push('');
                            }
                            xhcMonthDataList.push(incomeText);
                          })
                        }
                      })

                      that.dayIncome = dayIncome;
                      that.weekIncome = weekIncome;
                      that.monthIncome = monthIncome;

                      that.incomeData = {
                        animation: false,
                        legend: {
                          data: [
                            {
                              name: '观光车出园',
                              color: 'red'
                            },{
                              name: '迷你小火车',
                              color: 'yellow'
                            },{
                              name: '观光车入园',
                              color: 'blue'
                            },
                          ],
                          textStyle: {
                            fill: '#fff',
                            fontSize: 12
                          }
                        },
                        xAxis: {
                          axisTick: {
                            show: true
                          },
                          data: nhxDayTimeList,
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
                            name: '观光车出园',
                            data: nhxDayDataList,
                            stack: 'a',
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
                              stroke: 'red',
                              lineWidth: 2
                            }
                          },
                          {
                            name: '迷你小火车',
                            data: qlyDayDataList,
                            stack: 'a',
                            type: 'line',
                            label: {
                              show: false,
                              formatter: '{value} 元',
                              style: {
                                fontSize: 14,
                                fill: 'yellow',
                              }
                            },
                            lineStyle: {
                              stroke: '#66CDAA',
                              lineWidth: 2
                            }
                          },
                          {
                            name: '观光车入园',
                            data: xhcDayDataList,
                            stack: 'a',
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
                              stroke: 'blue',
                              lineWidth: 2
                            }
                          }
                        ],
                        grid: {
                          top: '20px',
                          left: '10px',
                          right: '0',
                          bottom: '25px'
                        }
                      };

                      that.incomeData1 = {
                        animation: false,
                        legend: {
                          data: [
                            {
                              name: '观光车出园',
                              color: 'red'
                            },{
                              name: '迷你小火车',
                              color: 'yellow'
                            },{
                              name: '观光车入园',
                              color: 'blue'
                            },
                          ],
                          textStyle: {
                            fill: '#fff',
                            fontSize: 12
                          }
                        },
                        xAxis: {
                          axisTick: {
                            show: true
                          },
                          data: nhxWeekTimeList,
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
                            name: '观光车出园',
                            data: nhxWeekDataList,
                            stack: 'a',
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
                              stroke: 'red',
                              lineWidth: 2
                            }
                          },
                          {
                            name: '迷你小火车',
                            data: qlyWeekDataList,
                            stack: 'a',
                            type: 'line',
                            label: {
                              show: false,
                              formatter: '{value} 元',
                              style: {
                                fontSize: 14,
                                fill: 'yellow',
                              }
                            },
                            lineStyle: {
                              stroke: '#66CDAA',
                              lineWidth: 2
                            }
                          },
                          {
                            name: '观光车入园',
                            data: xhcWeekDataList,
                            stack: 'a',
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
                              stroke: 'blue',
                              lineWidth: 2
                            }
                          }
                        ],
                        grid: {
                          top: '20px',
                          left: '10px',
                          right: '0',
                          bottom: '25px'
                        }
                      };

                      that.incomeData2 = {
                        animation: false,
                        legend: {
                          data: [
                            {
                              name: '观光车出园',
                              color: 'red'
                            },{
                              name: '迷你小火车',
                              color: 'yellow'
                            },{
                              name: '观光车入园',
                              color: 'blue'
                            },
                          ],
                          textStyle: {
                            fill: '#fff',
                            fontSize: 12
                          }
                        },
                        xAxis: {
                          axisTick: {
                            show: true
                          },
                          data: nhxMonthTimeList,
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
                            name: '观光车出园',
                            data: nhxMonthDataList,
                            type: 'line',
                            stack: 'a',
                            label: {
                              show: false,
                              formatter: '{value} 元',
                              style: {
                                fontSize: 14,
                                fill: '#F0E68C',
                              }
                            },
                            lineStyle: {
                              stroke: 'red',
                              lineWidth: 2
                            }
                          },
                          {
                            name: '迷你小火车',
                            data: qlyMonthDataList,
                            stack: 'a',
                            type: 'line',
                            label: {
                              show: false,
                              formatter: '{value} 元',
                              style: {
                                fontSize: 14,
                                fill: 'yellow',
                              }
                            },
                            lineStyle: {
                              stroke: '#66CDAA',
                              lineWidth: 2
                            }
                          },
                          {
                            name: '观光车入园',
                            data: xhcMonthDataList,
                            stack: 'a',
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
                              stroke: 'blue',
                              lineWidth: 2
                            }
                          }
                        ],
                        grid: {
                          top: '20px',
                          left: '10px',
                          right: '10px',
                          bottom: '25px'
                        }
                      };

                    }).catch(function(err){
                      console.log(err);
                    })

                }).catch(function(err){
                  console.log(err);
                })

            }).catch(function(err){
              console.log(err);
            })



          // 获取卡尺位置

          axios.get('http://api.smart-ideas.com.cn/yqhpark/loopDataV/getVehicleMountedLocation?lineId=1')
            .then(function(res){
              var carList = [];
              var snList = [];
              var idList = [];
              if(res.data.length > 0){
                res.data.forEach(function(value, key){
                  if(snList.indexOf(value.vehicleMountedSn) == -1){
                    snList.push(value.vehicleMountedSn);
                    carList.push(value);
                    idList.push(value.id + value.vehicleMountedSn);
                  }
                })
                if(carPositions.length == 0){
                  carList.forEach(function(value, key){
                    // 编号位置
                    var idTopList = idList.filter(function(val){
                      console.log(val);
                      val = val.toString().substring(0,3);
                      return val == value.id
                    });
                    var topSize = (idTopList.indexOf(value.id + value.vehicleMountedSn)) * 15 * -1 - 30;
                    var carDistance = that.getDistance(value.id);
                    var position = {
                      oldId: value.id,
                      currentId: value.id,
                      vehicleMountedSn: value.vehicleMountedSn,
                      carDistance: carDistance,
                      animate: false,
                      carIcon: carCurrent,
                      hidden: false,
                      carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3),
                      top: topSize
                    }
                    carPositions[key] = position;
                  })
                }else{
                  var nowSnList = [];
                  carPositions.forEach(function(value, key){
                    nowSnList[key] = value.vehicleMountedSn;
                  })

                  snList.forEach(function(value, key){
                    // 编号位置
                    var idTopList = idList.filter(function(val){
                      console.log(val);
                      val = val.toString().substring(0,3);
                      return val == carList[key].id
                    });
                    var topSize = (idTopList.indexOf(carList[key].id + carList[key].vehicleMountedSn)) * 15 * -1 -30;
                    if(nowSnList.indexOf(value) != -1){
                      var carDistance = that.getDistance(carList[key].id);
                      var carIcon;
                      if(carPositions[nowSnList.indexOf(value)].currentId == carList[key].id){
                        carIcon = carCurrent
                      }else if(carPositions[nowSnList.indexOf(value)].currentId < carList[key].id){
                        carIcon = carRight
                      }else{
                        carIcon = carLeft
                      }
                      var position = {};
                      if(carPositions[nowSnList.indexOf(value)].hidden){
                        // 丢失过GPS
                        position = {
                          oldId: carList[key].id,
                          currentId: carList[key].id,
                          vehicleMountedSn: carList[key].vehicleMountedSn,
                          carDistance: carDistance,
                          animate: false,
                          carIcon: carIcon,
                          hidden: false,
                          carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3),
                          top: topSize
                        }
                      }else{
                        position = {
                          oldId: carPositions[nowSnList.indexOf(value)].currentId,
                          currentId: carList[key].id,
                          vehicleMountedSn: carList[key].vehicleMountedSn,
                          carDistance: carDistance,
                          animate: true,
                          carIcon: carIcon,
                          hidden: false,
                          carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3),
                          top: topSize
                        }
                      }
                      carPositions[nowSnList.indexOf(value)] = position;
                    }else{
                      var carDistance = that.getDistance(carList[key].id);
                      var carIcon = carCurrent;
                      var position = {
                        oldId: carList[key].id,
                        currentId: carList[key].id,
                        vehicleMountedSn: carList[key].vehicleMountedSn,
                        carDistance: carDistance,
                        animate: false,
                        carIcon: carIcon,
                        hidden: false,
                        carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3),
                          top: topSize
                      }
                      carPositions.push(position);
                    }
                  })
                  nowSnList.forEach(function(value, key){
                    if(snList.indexOf(value) == -1){
                      carPositions[key].hidden = true;
                    }
                  })
                }
              }
              console.log(snList);
              console.log(carPositions);
              that.carPositions = carPositions;
            }).catch(function(err){
              console.log(err);
            })

          // 获取收入比例
          axios.get('http://api.smart-ideas.com.cn/yqhpark/batteryDataView/getIncome')
            .then(function(res){
              var ggczMoney = parseFloat(res.data[0].ggczTotalMoney).toFixed(2);
              var xhcMoney = parseFloat(res.data[0].xhcTotalMoney).toFixed(2);
              var ggcfMoney = parseFloat(res.data[0].ggcfTotalMoney).toFixed(2);
              if(!isNaN(parseInt(ggczMoney))){
                that.ggczMoney = ggczMoney;
                that.xhcMoney = xhcMoney;
                that.ggcfMoney = ggcfMoney;
                that.linePercent = {
                  radius: '60%',
                  activeRadius: '65%',
                  lineWidth: 15,
                  digitalFlopStyle: {
                    fontSize: 16
                  },
                  data: [
                    {
                      name: '迷你小火车',
                      value: parseInt(xhcMoney)
                    },
                    {
                      name: '观光车出园',
                      value: parseInt(ggczMoney)
                    },
                    {
                      name: '观光车入园',
                      value: parseInt(ggcfMoney)
                    }
                  ]
                }
              }

              // 设置更新时间
              var nowDate = new Date();
              var nowYear = nowDate.getFullYear();
              var nowMonth = nowDate.getMonth();
              var nowDay = nowDate.getDate();
              var nowHour = nowDate.getHours();
              nowHour = nowHour>9?nowHour:'0'+nowHour;
              var nowMinutes = nowDate.getMinutes();
              nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
              var nowSeconds = nowDate.getSeconds();
              nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
              that.updateTime = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
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
    letter-spacing: 5px;
  }
  .childTitle{
    font-size: 18px;
    text-align: center;
  }
  .updateTime{
    position: absolute;
    right: 0;
    top: 0;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    padding-right: 20px;
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
    align-items: flex-start;
    height: 255px;
    width: 1310px;
  }

  /* 天气预报 */
  .weatherView{
    width: 380px;
    height: 255px;
    padding: 10px;
  }
  .weatherBox{
    display: flex;
    justify-content: start;
    align-items: flex-start;
  }
  .weatherView .dateView{
    font-size: 23px;
    color: #fff;
    padding-left: 40px;
    line-height: 60px;
    background: url(../assets/time-icon.png) no-repeat left center;
    background-size: 30px 30px;
  }
  .nowWeather{
    height: 170px;
    padding-top: 15px;
  }
  .weatherTop{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
  }
  .nowWeather .nowTemp{
    flex: 0 0 65%;
    font-size: 38px;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }
  .nowWeather .nowWeatherPic{
    flex: 0 0 20%;
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
  .weatherBottom{
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .nowWeather .nowWeatherItem{
    flex: 0 0 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #fff;
  }
  .nowWeather .nowWeatherItem p{
    letter-spacing: 3px;
    text-align: center;
  }
/*  .lastWeather{
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
  } */

  /* 收入饼状图 */
  .linePercent{
    width: 580px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .linePercent .lineIncome{
    width: 300px;

  }
  .linePercent .lineIncome p{
    font-size: 20px;
    color: #fff;
    line-height: 60px;
    padding-left: 30px;
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
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    position: relative;
  }
  .totalIncome{
    position: absolute;
    top: 60px;
    right: 20px;
    line-height: 40px;
    text-align: right;
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
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
    width: 600px;
    height: 455px;
    position: relative;
    margin-top: -50px;
  }
  .paper{
    padding: 10px;
  }
  .paperContent{
    background-color: rgba(0, 0, 0, .3);
    padding: 10px 0;
    border-radius: 10px;
  }

  .left-bottom{
    width: 1310px;
    margin-top: 10px;
  }

  /* 车辆行驶位置 */
  .routeView{
    width: 100%;
    height: 305px;
    padding: 5px 20px;
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
    padding: 75px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .routeName{
    color: #e40013;
    background-color: #fff;
    line-height: 20px;
    border-radius: 20px;
    font-size: 16px;
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
    padding: 0 45px;
    position: relative;
  }
  .routeList>.carIcon{
    position: absolute;
    width: 20px;
    left: 35px;
    top: -10px;
  }
  .carSn{
    position: absolute;
    width: 20px;
    /* top: -30px; */
    font-size: 10px;
    color: #FFFF00;
    text-align: center;
  }
  .animate{
    transition: left 20s linear;
  }
  .hidden{
    display: none;
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
    width: 1px;
    height: 70px;
    font-size: 14px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    position: relative;
  }
  .siteItem .carIcon{
    position: absolute;
    width: 20px;
    top: -10px;
    left: -10px;
    transition: left 18s;
  }
  .siteItem img{
    width: 15px;
    margin-bottom: 5px;
  }
  .siteItem .siteIcon{
    width: 5px;
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
    /* height: 305px; */
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .zdIncome .title{
    font-size: 23px;
    line-height: 40px;
    color: #fff;
    text-align: center;
  }



</style>
