<template>
  <div class="hello">
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <div class="title">
          <p>玄武湖自驾船数字化运营系统</p>
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

            <!-- 一卡通消费 -->
            <div class="boxView">
              <p class="noticeTitle">一卡通消费</p>
              <div class="incomeView">
                <p>一卡通总消费:<font>{{cardTotal}}</font></p>
              </div>
              <div class="cardContent">
                <dv-charts :option="cardIncome" style="width:50%;height:178px" />
                <dv-active-ring-chart :config="cardIncomePercent" style="width:50%;height:178px" />
              </div>
            </div>

            <!-- 当日收入曲线 -->
            <div class="incomeInfo boxView">
               <p class="noticeTitle">当日收入曲线</p>
               <dv-charts :option="option2" style="width:100%;height:150px" />
            </div>
          </div>
          <div class="topCenter">
           <dv-border-box-7>
             <div class="iframeView">
               <iframe src="http://smart-ideas.com.cn/mapView/xwhzhzxmap.html" frameborder="0" width="770px" height="750px"></iframe>
             </div>
           </dv-border-box-7>
          </div>
          <div class="topRight">
            <!-- 当日租赁情况 -->
            <div class="leaseDetailView boxView">
              <p class="noticeTitle">当日租赁情况</p>
              <dv-scroll-board :config="leaseConfig" style="width:100%;height:220px" />
            </div>
            <!-- 近7日运营情况 -->
            <div class="operatingInfo boxView">
              <p class="noticeTitle">近7日运营情况</p>
              <div class="incomeView">
                <p>当日自驾船收入：<font>{{zjcTotal}}</font></p>
                <p>当日摆渡船收入：<font>{{bdcTotal}}</font></p>
              </div>
              <dv-charts :option="option3" style="width:100%;height:150px" />
            </div>
            <!-- 水上运动基地 -->
            <div class="boxView">
              <p class="noticeTitle">水上运动基地</p>
              <div class="incomeView">
                <p>总收入：<font>{{ssxmTotal}}</font></p>
              </div>
              <dv-charts :option="ssxmIncome" style="width:100%;height:117px" />
            </div>
          </div>
        </div>

        <!-- 底部视图 -->
        <div class="bottomView">
          <!-- 码头视图 -->
          <div class="mtView">
            <dv-border-box-7>
              <div class="mtContent">
                <p class="mtTitle">解放门码头</p>
                <div class="numberView">
                  <p class="numberTxt">总数：</p>
                  <dv-digital-flop :config="jfmBoatTotal" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">空闲：</p>
                  <dv-digital-flop :config="jfmFree" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">在租：</p>
                  <dv-digital-flop :config="jfmOnlease" style="width:82px;height:45px;" />
                </div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 码头视图 -->
          <div class="mtView">
            <dv-border-box-7>
              <div class="mtContent">
                <p class="mtTitle">菱洲码头</p>
                <div class="numberView">
                  <p class="numberTxt">总数：</p>
                  <dv-digital-flop :config="lzBoatTotal" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">空闲：</p>
                  <dv-digital-flop :config="lzFree" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">在租：</p>
                  <dv-digital-flop :config="lzOnlease" style="width:82px;height:45px;" />
                </div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 码头视图 -->
          <div class="mtView">
            <dv-border-box-7>
              <div class="mtContent">
                <p class="mtTitle">台菱堤码头</p>
                <div class="numberView">
                  <p class="numberTxt">总数：</p>
                  <dv-digital-flop :config="tldBoatTotal" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">空闲：</p>
                  <dv-digital-flop :config="tldFree" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">在租：</p>
                  <dv-digital-flop :config="tldOnlease" style="width:82px;height:45px;" />
                </div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 码头视图 -->
          <div class="mtView">
            <dv-border-box-7>
              <div class="mtContent">
                <p class="mtTitle">玄武门南码头</p>
                <div class="numberView">
                  <p class="numberTxt">总数：</p>
                  <dv-digital-flop :config="xwmnBoatTotal" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">空闲：</p>
                  <dv-digital-flop :config="xwmnFree" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">在租：</p>
                  <dv-digital-flop :config="xwmnOnlease" style="width:82px;height:45px;" />
                </div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 码头视图 -->
          <div class="mtView">
            <dv-border-box-7>
              <div class="mtContent">
                <p class="mtTitle">玄武门北码头</p>
                <div class="numberView">
                  <p class="numberTxt">总数：</p>
                  <dv-digital-flop :config="xwmbBoatTotal" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">空闲：</p>
                  <dv-digital-flop :config="xwmbFree" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">在租：</p>
                  <dv-digital-flop :config="xwmbOnlease" style="width:82px;height:45px;" />
                </div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 码头视图 -->
          <div class="mtView">
            <dv-border-box-7>
              <div class="mtContent">
                <p class="mtTitle">后湖印月码头</p>
                <div class="numberView">
                  <p class="numberTxt">总数：</p>
                  <dv-digital-flop :config="hhyyBoatTotal" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">空闲：</p>
                  <dv-digital-flop :config="hhyyFree" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">在租：</p>
                  <dv-digital-flop :config="hhyyOnlease" style="width:82px;height:45px;" />
                </div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 码头视图 -->
          <div class="mtView">
            <dv-border-box-7>
              <div class="mtContent">
                <p class="mtTitle">和平门码头</p>
                <div class="numberView">
                  <p class="numberTxt">总数：</p>
                  <dv-digital-flop :config="hpmBoatTotal" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">空闲：</p>
                  <dv-digital-flop :config="hpmFree" style="width:82px;height:45px;" />
                </div>
               <div class="numberView">
                  <p class="numberTxt">在租：</p>
                  <dv-digital-flop :config="hpmOnlease" style="width:82px;height:45px;" />
                </div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 码头视图 -->
          <div class="mtView">
            <dv-border-box-7>
              <div class="mtContent">
                <p class="mtTitle">翠洲门码头</p>
                <div class="numberView">
                  <p class="numberTxt">总数：</p>
                  <dv-digital-flop :config="czmBoatTotal" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">空闲：</p>
                  <dv-digital-flop :config="czmFree" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">在租：</p>
                  <dv-digital-flop :config="czmOnlease" style="width:82px;height:45px;" />
                </div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 码头视图 -->
          <div class="mtView">
            <dv-border-box-7>
              <div class="mtContent">
                <p class="mtTitle">阳光码头</p>
                <div class="numberView">
                  <p class="numberTxt">总数：</p>
                  <dv-digital-flop :config="ygBoatTotal" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">空闲：</p>
                  <dv-digital-flop :config="ygFree" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">在租：</p>
                  <dv-digital-flop :config="ygOnlease" style="width:82px;height:45px;" />
                </div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 码头视图 -->
          <div class="mtView">
            <dv-border-box-7>
              <div class="mtContent">
                <p class="mtTitle">芳桥码头</p>
                <div class="numberView">
                  <p class="numberTxt">总数：</p>
                  <dv-digital-flop :config="fqBoatTotal" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">空闲：</p>
                  <dv-digital-flop :config="fqFree" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">在租：</p>
                  <dv-digital-flop :config="fqOnlease" style="width:82px;height:45px;" />
                </div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 码头视图 -->
          <div class="mtView">
            <dv-border-box-7>
              <div class="mtContent">
                <p class="mtTitle">郭璞敦码头</p>
                <div class="numberView">
                  <p class="numberTxt">总数：</p>
                  <dv-digital-flop :config="gpdBoatTotal" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">空闲：</p>
                  <dv-digital-flop :config="gpdFree" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">在租：</p>
                  <dv-digital-flop :config="gpdOnlease" style="width:82px;height:45px;" />
                </div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 码头视图 -->
          <div class="mtView">
            <dv-border-box-7>
              <div class="mtContent">
                <p class="mtTitle">环洲码头</p>
                <div class="numberView">
                  <p class="numberTxt">总数：</p>
                  <dv-digital-flop :config="hzBoatTotal" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">空闲：</p>
                  <dv-digital-flop :config="hzFree" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">在租：</p>
                  <dv-digital-flop :config="hzOnlease" style="width:82px;height:45px;" />
                </div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 码头视图 -->
          <div class="mtView">
            <dv-border-box-7>
              <div class="mtContent">
                <p class="mtTitle">台菱堤西码头</p>
                <div class="numberView">
                  <p class="numberTxt">总数：</p>
                  <dv-digital-flop :config="tldxBoatTotal" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">空闲：</p>
                  <dv-digital-flop :config="tldxFree" style="width:82px;height:45px;" />
                </div>
                <div class="numberView">
                  <p class="numberTxt">在租：</p>
                  <dv-digital-flop :config="tldxOnlease" style="width:82px;height:45px;" />
                </div>
              </div>
            </dv-border-box-7>
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
  name: 'YmyjtcView',
  data () {
    return {
      ssxmTotal: 0,
      ssxmIncome: {},
      cardIncome: {},
      cardIncomePercent: {},
      cardTotal: 0,
      zjcTotal: 0,
      bdcTotal: 0,
      "xscale": 1,
      "yscale": 1,
      "nowDate": "2021-01-19 00:00:00",
      "nowPic": "",
      jfmFree: {},
      lzFree: {},
      tldFree: {},
      xwmnFree: {},
      xwmbFree: {},
      hhyyFree: {},
      hpmFree: {},
      czmFree: {},
      ygFree: {},
      fqFree: {},
      gpdFree: {},
      hzFree: {},
      tldxFree: {},
      "leaseConfig": {},
      "weatherList": [],
      "jfmOnlease": {},
      "lzOnlease": {},
      "tldOnlease": {},
      "tldxOnlease": {},
      "xwmnOnlease": {},
      "xwmbOnlease": {},
      "hhyyOnlease": {},
      "hpmOnlease": {},
      "czmOnlease": {},
      "ygOnlease": {},
      "fqOnlease": {},
      "gpdOnlease": {},
      "hzOnlease": {},
      "jfmBoatTotal": {},
      "tldBoatTotal": {},
      "xwmnBoatTotal": {},
      "lzBoatTotal": {},
      "xwmbBoatTotal": {},
      "hhyyBoatTotal": {},
      "hpmBoatTotal": {},
      "czmBoatTotal": {},
      "ygBoatTotal": {},
      "fqBoatTotal": {},
      "gpdBoatTotal": {},
      "hzBoatTotal": {},
      "tldxBoatTotal": {},
      "option1": {},
      "option2": {},
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
      "src": ""
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
    axios.get('http://node.smart-ideas.com.cn:3001/datav/common/weather/v1/weatherInfo?city=320100')
      .then(function(res){
        that.weatherList = res.data;
      }).catch(function(err){
        console.log(err);
      })

    var seconds = 0;
    setInterval(function(){
      seconds += 1;
      if(seconds == 1 || seconds % 20 == 0){
        // 获取水上运动基地信息
        axios.get('http://hd.smart-ideas.com.cn/xwhpark/collection/canoe/table/get?startDate=&endDate=')
          .then(function(res){
            let totalMoney = 0;
            let nameList = [];
            let dataList = [];
            res.data.data.forEach(function (value, key) {
              if (value.ticketName == '合计') {
                totalMoney = value.totalMoney;
              }else{
                let ticketName = value.ticketName;
                if(ticketName.indexOf('POS') != -1){
                  ticketName = '皮划艇POS';
                }
                nameList.push(ticketName);
                dataList.push(value.totalMoney);
              }
            })
            that.ssxmTotal = totalMoney;
            that.ssxmIncome = {
              xAxis: {
                data: nameList,
                splitLine: {
                  show: false
                },
                axisLabel: {
                  style: {
                    fill: '#fff',
                    fontSize: 16,
                    rotate: 0
                  }
                }
              },
              yAxis: {
                min: 0,
                data: 'value',
                splitLine: {
                  show: false
                }
              },
              series: [
                {
                  data: dataList,
                  type: 'bar',
                  label: {
                    show: true,
                    style: {
                      fontSize: 14,
                      fill: 'yellow'
                    }
                  }
                }
              ],
              grid: {
                left: 0,
                bottom: 25,
                right: 0,
                top: 0
              }
            }
          })
          .catch(function(err){
            console.log(err);
          })

        // 获取一卡通信息
        axios.get('http://xwhykt.smart-ideas.com.cn/prod-api/api/datav/item/consume?type=day')
          .then(function(res){
            let cardTotal = 0;
            let zjcTotal = 0;
            let bdcTotal = 0;
            res.data.data.forEach(function(value, key){
              if (value.itemName == '电瓶船' || value.itemName == '摆渡船票') {
                  cardTotal += value.totalIncome;
                  cardTotal -= value.totalRefund;
                  if(value.itemName == '电瓶船'){
                    zjcTotal += value.totalIncome;
                    zjcTotal -= value.totalRefund;
                  }
                  if(value.itemName == '摆渡船票'){
                    bdcTotal += value.totalIncome;
                    bdcTotal -= value.totalRefund;
                  }
                }
            })
            let zjcPercent;
            let bdcPercent;
            if(cardTotal == 0){
              zjcPercent = 0;
              bdcPercent = 0;
            }else{
               zjcPercent = Math.ceil(zjcTotal / cardTotal * 100);
               bdcPercent = 100 - zjcPercent;
               that.cardIncomePercent = {
                   radius: '70%',
                   activeRadius: '80%',
                   color: ['blue','yellow'],
                   data: [
                     {
                       name: '电瓶船',
                       value: zjcPercent
                     },
                     {
                       name: '摆渡船',
                       value: bdcPercent
                     }
                   ]
               }
            }
            that.cardTotal = cardTotal;
            
            that.cardIncome = {
              xAxis: {
                data: ['电瓶船', '摆渡船'],
                splitLine: {
                  show: false
                },
                axisLabel: {
                  style: {
                    fill: '#fff',
                    fontSize: 16,
                    rotate: 0
                  }
                }
              },
              yAxis: {
                min: 0,
                data: 'value',
                splitLine: {
                  show: false
                }
              },
              series: [
                {
                  data: [parseFloat(zjcTotal), parseFloat(bdcTotal)],
                  type: 'bar',
                  label: {
                    show: true,
                    style: {
                      fontSize: 14,
                      fill: 'yellow'
                    }
                  }
                }
              ],
              grid: {
                left: 0,
                bottom: 25,
                right: 0,
                top: 0
              }
            }
          })
          .catch(function(err){
            console.log(err);
          })

        // 获取租赁详情
        axios.get('https://hd.smart-ideas.com.cn/xwhpark/deviceDataView/getDeviceShipLeaseInfo?scenicId=b4124ce0c8b244208de6d870ceb824a0')
          .then(function(res){
            var leaseList = res.data;
            var dataList = [];
            leaseList.forEach(function(value, key){
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
            that.option2 = {
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
                  data: moneyList,
                  type: 'line',
                  smooth: true,
                  lineStyle: {color: "#fff"}
                }
              ],
              grid: {
                top: "10px",
                bottom: "20px",
                left: "10px",
                right: "10px"
              }
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
            let zjcNowIncome = res.data[res.data.length - 2].y;
            let bdcNowIncome = res.data[res.data.length - 1].y;
            that.zjcTotal = parseInt(zjcNowIncome);
            that.bdcTotal = parseInt(bdcNowIncome);
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
              legend: {
                data: ['自驾船', '摆渡船'],
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
                  data: zjcList,
                  type: 'bar',
                  barStyle: {
                    fill: '#0a73ff'
                  }
                },
                {
                  name: '摆渡船',
                  data: bdcList,
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

        // 获取手动开船人数
        axios.get('http://node.smart-ideas.com.cn:3001/datav/xwh/getBoatOpenInfo')
          .then(function(res){
            var openInfo = res.data.data.openInfo;
            openInfo.forEach(function(value, key){
              if(value.mt == '解放门码头'){
                that.jfmSd = {
                  number: [parseInt(value.openTotal)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#ff0000',
                    fontWeight: 'bold'
                  }
                };
                var sdInfo = [];
                if(value.openList.length > 0){
                  value.openList.forEach(function(sdItem, sdKey){
                    var newSdItem = [];
                    newSdItem[0] = sdItem.code.split('1230')[1];
                    newSdItem[1] = sdItem.openDate.split(' ')[1];
                    sdInfo.push(newSdItem);
                  })
                }else{
                  sdInfo = [
                    ['-', '--'],
                    ['-', '--'],
                    ['-', '--']
                  ]
                }
                that.jfmSdInfo = {
                  data: sdInfo,
                  rowNum: 3,
                  align: ['center','center'],
                  columnWidth: [50, 90]
                }
              }else if(value.mt == '菱洲码头'){
                that.lzSd = {
                  number: [parseInt(value.openTotal)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#ff0000',
                    fontWeight: 'bold'
                  }
                };
                var sdInfo = [];
                if(value.openList.length > 0){
                  value.openList.forEach(function(sdItem, sdKey){
                    var newSdItem = [];
                    newSdItem[0] = sdItem.code.split('1230')[1];
                    newSdItem[1] = sdItem.openDate.split(' ')[1];
                    sdInfo.push(newSdItem);
                  })
                }else{
                  sdInfo = [
                    ['-', '--'],
                    ['-', '--'],
                    ['-', '--']
                  ]
                }
                that.lzSdInfo = {
                  data: sdInfo,
                  rowNum: 3,
                  align: ['center','center'],
                  columnWidth: [50, 90]
                }
              }else if(value.mt == '台菱堤码头'){
                that.tldSd = {
                  number: [parseInt(value.openTotal)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#ff0000',
                    fontWeight: 'bold'
                  }
                };
                var sdInfo = [];
                if(value.openList.length > 0){
                  value.openList.forEach(function(sdItem, sdKey){
                    var newSdItem = [];
                    newSdItem[0] = sdItem.code.split('1230')[1];
                    newSdItem[1] = sdItem.openDate.split(' ')[1];
                    sdInfo.push(newSdItem);
                  })
                }else{
                  sdInfo = [
                    ['-', '--'],
                    ['-', '--'],
                    ['-', '--']
                  ]
                }
                that.tldSdInfo = {
                  data: sdInfo,
                  rowNum: 3,
                  align: ['center','center'],
                  columnWidth: [50, 90]
                }
              }else if(value.mt == '玄武门南码头'){
                that.xwmnSd = {
                  number: [parseInt(value.openTotal)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#ff0000',
                    fontWeight: 'bold'
                  }
                };
                var sdInfo = [];
                if(value.openList.length > 0){
                  value.openList.forEach(function(sdItem, sdKey){
                    var newSdItem = [];
                    newSdItem[0] = sdItem.code.split('1230')[1];
                    newSdItem[1] = sdItem.openDate.split(' ')[1];
                    sdInfo.push(newSdItem);
                  })
                }else{
                  sdInfo = [
                    ['-', '--'],
                    ['-', '--'],
                    ['-', '--']
                  ]
                }
                that.xwmnSdInfo = {
                  data: sdInfo,
                  rowNum: 3,
                  align: ['center','center'],
                  columnWidth: [50, 90]
                }
              }else if(value.mt == '玄武门北码头'){
                that.xwmbSd = {
                  number: [parseInt(value.openTotal)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#ff0000',
                    fontWeight: 'bold'
                  }
                };
                var sdInfo = [];
                if(value.openList.length > 0){
                  value.openList.forEach(function(sdItem, sdKey){
                    var newSdItem = [];
                    newSdItem[0] = sdItem.code.split('1230')[1];
                    newSdItem[1] = sdItem.openDate.split(' ')[1];
                    sdInfo.push(newSdItem);
                  })
                }else{
                  sdInfo = [
                    ['-', '--'],
                    ['-', '--'],
                    ['-', '--']
                  ]
                }
                that.xwmbSdInfo = {
                  data: sdInfo,
                  rowNum: 3,
                  align: ['center','center'],
                  columnWidth: [50, 90]
                }
              }else if(value.mt == '后湖印月码头'){
                that.hhyySd = {
                  number: [parseInt(value.openTotal)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#ff0000',
                    fontWeight: 'bold'
                  }
                };
                var sdInfo = [];
                if(value.openList.length > 0){
                  value.openList.forEach(function(sdItem, sdKey){
                    var newSdItem = [];
                    newSdItem[0] = sdItem.code.split('1230')[1];
                    newSdItem[1] = sdItem.openDate.split(' ')[1];
                    sdInfo.push(newSdItem);
                  })
                }else{
                  sdInfo = [
                    ['-', '--'],
                    ['-', '--'],
                    ['-', '--']
                  ]
                }
                that.hhyySdInfo = {
                  data: sdInfo,
                  rowNum: 3,
                  align: ['center','center'],
                  columnWidth: [50, 90]
                }
              }else if(value.mt == '和平门码头'){
                that.hpmSd = {
                  number: [parseInt(value.openTotal)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#ff0000',
                    fontWeight: 'bold'
                  }
                };
                var sdInfo = [];
                if(value.openList.length > 0){
                  value.openList.forEach(function(sdItem, sdKey){
                    var newSdItem = [];
                    newSdItem[0] = sdItem.code.split('1230')[1];
                    newSdItem[1] = sdItem.openDate.split(' ')[1];
                    sdInfo.push(newSdItem);
                  })
                }else{
                  sdInfo = [
                    ['-', '--'],
                    ['-', '--'],
                    ['-', '--']
                  ]
                }
                that.hpmSdInfo = {
                  data: sdInfo,
                  rowNum: 3,
                  align: ['center','center'],
                  columnWidth: [50, 90]
                }
              }else if(value.mt == '翠洲门码头'){
                that.czmSd = {
                  number: [parseInt(value.openTotal)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#ff0000',
                    fontWeight: 'bold'
                  }
                };
                var sdInfo = [];
                if(value.openList.length > 0){
                  value.openList.forEach(function(sdItem, sdKey){
                    var newSdItem = [];
                    newSdItem[0] = sdItem.code.split('1230')[1];
                    newSdItem[1] = sdItem.openDate.split(' ')[1];
                    sdInfo.push(newSdItem);
                  })
                }else{
                  sdInfo = [
                    ['-', '--'],
                    ['-', '--'],
                    ['-', '--']
                  ]
                }
                that.czmSdInfo = {
                  data: sdInfo,
                  rowNum: 3,
                  align: ['center','center'],
                  columnWidth: [50, 90]
                }
              }else if(value.mt == '阳光码头'){
                that.ygSd = {
                  number: [parseInt(value.openTotal)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#ff0000',
                    fontWeight: 'bold'
                  }
                };
                var sdInfo = [];
                if(value.openList.length > 0){
                  value.openList.forEach(function(sdItem, sdKey){
                    var newSdItem = [];
                    newSdItem[0] = sdItem.code.split('1230')[1];
                    newSdItem[1] = sdItem.openDate.split(' ')[1];
                    sdInfo.push(newSdItem);
                  })
                }else{
                  sdInfo = [
                    ['-', '--'],
                    ['-', '--'],
                    ['-', '--']
                  ]
                }
                that.ygSdInfo = {
                  data: sdInfo,
                  rowNum: 3,
                  align: ['center','center'],
                  columnWidth: [50, 90]
                }
              }else if(value.mt == '芳桥码头'){
                that.fqSd = {
                  number: [parseInt(value.openTotal)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#ff0000',
                    fontWeight: 'bold'
                  }
                };
                var sdInfo = [];
                if(value.openList.length > 0){
                  value.openList.forEach(function(sdItem, sdKey){
                    var newSdItem = [];
                    newSdItem[0] = sdItem.code.split('1230')[1];
                    newSdItem[1] = sdItem.openDate.split(' ')[1];
                    sdInfo.push(newSdItem);
                  })
                }else{
                  sdInfo = [
                    ['-', '--'],
                    ['-', '--'],
                    ['-', '--']
                  ]
                }
                that.fqSdInfo = {
                  data: sdInfo,
                  rowNum: 3,
                  align: ['center','center'],
                  columnWidth: [50, 90]
                }
              }else if(value.mt == '郭璞敦码头'){
                that.gpdSd = {
                  number: [parseInt(value.openTotal)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#ff0000',
                    fontWeight: 'bold'
                  }
                };
                var sdInfo = [];
                if(value.openList.length > 0){
                  value.openList.forEach(function(sdItem, sdKey){
                    var newSdItem = [];
                    newSdItem[0] = sdItem.code.split('1230')[1];
                    newSdItem[1] = sdItem.openDate.split(' ')[1];
                    sdInfo.push(newSdItem);
                  })
                }else{
                  sdInfo = [
                    ['-', '--'],
                    ['-', '--'],
                    ['-', '--']
                  ]
                }
                that.gpdSdInfo = {
                  data: sdInfo,
                  rowNum: 3,
                  align: ['center','center'],
                  columnWidth: [50, 90]
                }
              }else if(value.mt == '环洲码头'){
                that.hzSd = {
                  number: [parseInt(value.openTotal)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#ff0000',
                    fontWeight: 'bold'
                  }
                };
                var sdInfo = [];
                if(value.openList.length > 0){
                  value.openList.forEach(function(sdItem, sdKey){
                    var newSdItem = [];
                    newSdItem[0] = sdItem.code.split('1230')[1];
                    newSdItem[1] = sdItem.openDate.split(' ')[1];
                    sdInfo.push(newSdItem);
                  })
                }else{
                  sdInfo = [
                    ['-', '--'],
                    ['-', '--'],
                    ['-', '--']
                  ]
                }
                that.hzSdInfo = {
                  data: sdInfo,
                  rowNum: 3,
                  align: ['center','center'],
                  columnWidth: [50, 90]
                }
              }
            })

            // 解放门码头
             axios.get('http://hd.smart-ideas.com.cn/xwhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=f57419d544e741838fb789056f63ee80')
               .then(function(res){
                 that.jfmOnlease = {
                   number: [parseInt(res.data[1].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#ff0000',
                     fontWeight: 'bold'
                   }
                 };

                 that.jfmBoatTotal = {
                  number: [parseInt(res.data[0].number)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#0a6af5',
                    fontWeight: 'bold'
                  }
                }

                 var freeNumber = that.jfmBoatTotal.number[0] - parseInt(res.data[1].number);
                 that.jfmFree = {
                   number: [freeNumber],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0aff4d',
                     fontWeight: 'bold'
                   }
                 };
               })
               .catch(function(err){
                 console.log(err);
               })

            // 翠洲门
            axios.get('http://hd.smart-ideas.com.cn/xwhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=41ab29656e5b405a9c94871488050ec3')
              .then(function(res){
                that.czmOnlease = {
                  number: [parseInt(res.data[1].number)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#ff0000',
                    fontWeight: 'bold'
                  }
                };
                that.czmBoatTotal = {
                  number: [parseInt(res.data[0].number)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#0a6af5',
                    fontWeight: 'bold'
                  }
                }
                var freeNumber = that.czmBoatTotal.number[0] - parseInt(res.data[1].number);
                that.czmFree = {
                  number: [freeNumber],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#0aff4d',
                    fontWeight: 'bold'
                  }
                };
              })
              .catch(function(err){
                console.log(err);
              })

             // 菱洲码头
             axios.get('http://hd.smart-ideas.com.cn/xwhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=59800000eb4a4c4287652f86eaba848c')
               .then(function(res){
                 that.lzOnlease = {
                   number: [parseInt(res.data[1].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#ff0000',
                     fontWeight: 'bold'
                   }
                 };
                 that.lzBoatTotal = {
                   number: [parseInt(res.data[0].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0a6af5',
                     fontWeight: 'bold'
                   }
                 }
                 var freeNumber = that.lzBoatTotal.number[0] - parseInt(res.data[1].number);
                 that.lzFree = {
                   number: [freeNumber],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0aff4d',
                     fontWeight: 'bold'
                   }
                 };
               })
               .catch(function(err){
                 console.log(err);
               })

             // 台菱堤码头
             axios.get('http://hd.smart-ideas.com.cn/xwhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=bcd98681896f48ed878486519bfdeacf')
               .then(function(res){
                 that.tldOnlease = {
                   number: [parseInt(res.data[1].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#ff0000',
                     fontWeight: 'bold'
                   }
                 };
                 that.tldBoatTotal = {
                   number: [parseInt(res.data[0].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0a6af5',
                     fontWeight: 'bold'
                   }
                 }
                 var freeNumber = that.tldBoatTotal.number[0] - parseInt(res.data[1].number);
                 that.tldFree = {
                   number: [freeNumber],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0aff4d',
                     fontWeight: 'bold'
                   }
                 };
               })
               .catch(function(err){
                 console.log(err);
               })

             // 玄武门南码头
             axios.get('http://hd.smart-ideas.com.cn/xwhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=b4124ce0c8b244208de6d870ceb824a0')
               .then(function(res){
                 that.xwmnOnlease = {
                   number: [parseInt(res.data[1].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#ff0000',
                     fontWeight: 'bold'
                   }
                 };
                 that.xwmnBoatTotal = {
                   number: [parseInt(res.data[0].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0a6af5',
                     fontWeight: 'bold'
                   }
                 }
                 var freeNumber = that.xwmnBoatTotal.number[0] - parseInt(res.data[1].number);
                 that.xwmnFree = {
                   number: [freeNumber],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0aff4d',
                     fontWeight: 'bold'
                   }
                 };
               })
               .catch(function(err){
                 console.log(err);
               })

             // 玄武门北码头
             axios.get('http://hd.smart-ideas.com.cn/xwhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=43a3c0756f854990ad7fd13f597cda3c')
               .then(function(res){
                 that.xwmbOnlease = {
                   number: [parseInt(res.data[1].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#ff0000',
                     fontWeight: 'bold'
                   }
                 };
                 that.xwmbBoatTotal = {
                   number: [parseInt(res.data[0].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0a6af5',
                     fontWeight: 'bold'
                   }
                 }
                 var freeNumber = that.xwmbBoatTotal.number[0] - parseInt(res.data[1].number);
                 that.xwmbFree = {
                   number: [freeNumber],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0aff4d',
                     fontWeight: 'bold'
                   }
                 };
               })
               .catch(function(err){
                 console.log(err);
               })

             // 后湖印月码头
             axios.get('http://hd.smart-ideas.com.cn/xwhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=a9f74e0b584945bea69985cd17f66a9d')
               .then(function(res){
                 that.hhyyOnlease = {
                   number: [parseInt(res.data[1].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#ff0000',
                     fontWeight: 'bold'
                   }
                 };
                 that.hhyyBoatTotal = {
                   number: [parseInt(res.data[0].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0a6af5',
                     fontWeight: 'bold'
                   }
                 }
                 var freeNumber = that.hhyyBoatTotal.number[0] - parseInt(res.data[1].number);
                 that.hhyyFree = {
                   number: [freeNumber],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0aff4d',
                     fontWeight: 'bold'
                   }
                 };
               })
               .catch(function(err){
                 console.log(err);
               })

             // 和平门码头
             axios.get('http://hd.smart-ideas.com.cn/xwhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=8698c2bb90d645b3912528473f5ce930')
               .then(function(res){
                 that.hpmOnlease = {
                   number: [parseInt(res.data[1].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#ff0000',
                     fontWeight: 'bold'
                   }
                 };
                 that.hpmBoatTotal = {
                   number: [parseInt(res.data[0].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0a6af5',
                     fontWeight: 'bold'
                   }
                 }
                 var freeNumber = that.hpmBoatTotal.number[0] - parseInt(res.data[1].number);
                 that.hpmFree = {
                   number: [freeNumber],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0aff4d',
                     fontWeight: 'bold'
                   }
                 };
               })
               .catch(function(err){
                 console.log(err);
               })

             // 阳光码头
             axios.get('http://hd.smart-ideas.com.cn/xwhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=283db1801eda4d0d9b542570b4506219')
               .then(function(res){
                 that.ygOnlease = {
                   number: [parseInt(res.data[1].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#ff0000',
                     fontWeight: 'bold'
                   }
                 };
                 that.ygBoatTotal = {
                   number: [parseInt(res.data[0].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0a6af5',
                     fontWeight: 'bold'
                   }
                 }
                 var freeNumber = that.ygBoatTotal.number[0] - parseInt(res.data[1].number);
                 that.ygFree = {
                   number: [freeNumber],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0aff4d',
                     fontWeight: 'bold'
                   }
                 };
               })
               .catch(function(err){
                 console.log(err);
               })

             // 芳桥码头
             axios.get('http://hd.smart-ideas.com.cn/xwhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=3f288414620f42cba6a7634401f71bca')
               .then(function(res){
                 that.fqOnlease = {
                   number: [parseInt(res.data[1].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#ff0000',
                     fontWeight: 'bold'
                   }
                 };
                 that.fqBoatTotal = {
                   number: [parseInt(res.data[0].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0a6af5',
                     fontWeight: 'bold'
                   }
                 }
                 var freeNumber = that.fqBoatTotal.number[0] - parseInt(res.data[1].number);
                 that.fqFree = {
                   number: [freeNumber],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0aff4d',
                     fontWeight: 'bold'
                   }
                 };
               })
               .catch(function(err){
                 console.log(err);
               })

             // 郭璞敦码头
             axios.get('http://hd.smart-ideas.com.cn/xwhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=9030c8e60fa34f37b674a30f3c890143')
               .then(function(res){
                 that.gpdOnlease = {
                   number: [parseInt(res.data[1].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#ff0000',
                     fontWeight: 'bold'
                   }
                 };
                 that.gpdBoatTotal = {
                   number: [parseInt(res.data[0].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0a6af5',
                     fontWeight: 'bold'
                   }
                 }
                 var freeNumber = that.gpdBoatTotal.number[0] - parseInt(res.data[1].number);
                 that.gpdFree = {
                   number: [freeNumber],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0aff4d',
                     fontWeight: 'bold'
                   }
                 };
               })
               .catch(function(err){
                 console.log(err);
               })

             // 环洲码头
             axios.get('http://hd.smart-ideas.com.cn/xwhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=696dc31a1125458fa5ba1696f6e445c7')
               .then(function(res){
                 that.hzOnlease = {
                   number: [parseInt(res.data[1].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#ff0000',
                     fontWeight: 'bold'
                   }
                 };
                 that.hzBoatTotal = {
                   number: [parseInt(res.data[0].number)],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0a6af5',
                     fontWeight: 'bold'
                   }
                 }
                 var freeNumber = that.hzBoatTotal.number[0] - parseInt(res.data[1].number);
                 that.hzFree = {
                   number: [freeNumber],
                   content: '{nt}',
                   textAlign: 'left',
                   style: {
                     fontSize: 50,
                     fill: '#0aff4d',
                     fontWeight: 'bold'
                   }
                 };
               })
               .catch(function(err){
                 console.log(err);
               })

            // 台菱堤西
            axios.get('http://hd.smart-ideas.com.cn/xwhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=80b566bb372a47f7a4a24fda6ed0d476')
              .then(function(res){
                that.tldxOnlease = {
                  number: [parseInt(res.data[1].number)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#ff0000',
                    fontWeight: 'bold'
                  }
                };
                that.tldxBoatTotal = {
                  number: [parseInt(res.data[0].number)],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#0a6af5',
                    fontWeight: 'bold'
                  }
                }
                var freeNumber = that.tldxBoatTotal.number[0] - parseInt(res.data[1].number);
                that.tldxFree = {
                  number: [freeNumber],
                  content: '{nt}',
                  textAlign: 'left',
                  style: {
                    fontSize: 50,
                    fill: '#0aff4d',
                    fontWeight: 'bold'
                  }
                };
              })
              .catch(function(err){
                console.log(err);
              })
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
    height: 1080px;
    padding: 0;
    overflow: hidden;
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
    margin-bottom: 10px;
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
    padding-left: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .weatherView .dateView{
    font-size: 23px;
    color: #fff;
    padding-left: 10px;
    line-height: 30px;
  }
  .nowWeather{
    display: flex;
    justify-content: start;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 0;
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


  /* 底部视图 */
  .bottomView{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    margin-top: 10px;
  }
  .mtView{
    width: 150px;
  }
  .mtContent{
    padding: 5px;
  }
  .mtContent .mtTitle{
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    margin-bottom: 10px;
  }
  .numberView{
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    margin-bottom: 5px;
  }
  .numberTxt{
    font-size: 14px;
    color: #fff;
    line-height: 45px;
    /* margin-right: 10px; */
  }


  .incomeView{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .incomeView p{
    font-size: 18px;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .incomeView font{
    font-size: 35px;
    font-weight: bold;
    color: yellow;
  }

  .cardContent{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
