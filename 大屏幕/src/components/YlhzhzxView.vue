<template>
  <div class="hello" :style="{background:url_back_img}" style="width: 100vw;height: 100vh;overflow: hidden;background-size: cover;">
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <div class="title">
          <p>云龙湖景区指挥中心</p>
        </div>
      </div>
      <div class="contentView">
        <!-- 左侧视图 -->
        <div class="leftView">
          <div class="left-top">
            <!-- 天气部分 -->
            <div class="marginRight">
              <dv-border-box-10>
                <div class="weatherBox">
                  <!-- 当日租赁情况 -->
                  <div class="leaseInfo">
                    <p class="title">当日租赁情况</p>
                    <dv-scroll-board :config="leaseConfig" style="width:100%;height:250px" />
                  </div>
                </div>
              </dv-border-box-10>
            </div>
          </div>

          <div class="left-center">
            <div class="marginRight">
              <dv-border-box-10>
                <div class="linePercent">
                  <div class="lineIncome">
                    <p>电瓶车：{{dpcIncome}}元</p>
                    <p>自驾船：{{zjcIncome}}元</p>
                    <p>摆渡船：{{bdcIncome}}元</p>
                  </div>
                  <dv-active-ring-chart :config="linePercent" style="width:155px;height:155px;" />
                </div>
              </dv-border-box-10>
            </div>

            <!-- 地图 -->
            <div class="mapView">
              <iframe src="http://smart-ideas.com.cn/mapView/ylhzhzxmap.html" style="width:1170px;height:665px;"></iframe>
            </div>
          </div>

          <div class="left-bottom">
            <!-- 站点售卡 -->
            <div class="marginRight">
              <dv-border-box-10>
                  <dv-charts :option="zdsk1" style="width:700px;height:312px" />
              </dv-border-box-10>
            </div>
            <div class="marginRight">
              <dv-border-box-10>
                  <dv-charts :option="zdsk2" style="width:600px;height:312px" />
              </dv-border-box-10>
            </div>
          </div>
        </div>

        <!-- 右侧视图 -->
        <div class="rightView">
          <div>
            <!-- 预警部分 -->
            <div class="paper">
              <dv-border-box-10>
                  <div class="paperContent">
                    <dv-scroll-board :config="paper" style="width:360px;height:255px;" />
                  </div>
              </dv-border-box-10>
            </div>

          </div>

          <div class="notice">
            <dv-border-box-10>
              <div class="notice-content">
                <p class="title">信息推送</p>
                <div class="noticeContent">
                  <dv-scroll-board :config="xxts" style="width:320px;height:290px" />
                </div>
              </div>
            </dv-border-box-10>
          </div>

          <!-- 收入统计 -->
          <div>
            <dv-border-box-10>
              <div class="income">
                <p class="title">近七日统计</p>
                <dv-charts :option="option3" style="width:100%;height:265px" />
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
  name: 'YlhzhzxView',
  data () {
    return {
      "mtList": [],
      "leaseConfig": {},
      "option3": {},
      "nhCarPositions": [],
      "xhcCarPositions": [],
      "xscale": 1,
      "yscale": 1,
      "zjcIncome": 0,
      "bdcIncome": 0,
      "dpcIncome": 0,
      "nhxList": [],
      "xhcList": [],
      "zdsk1": {},
      "zdsk2": {},
      "carList": [],
      "linePercent": {},
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
        data: []
      }
    }
  },
  methods: {
    tab: function(num){
      this.num = num;
    },
    zdTab: function(num){
      let that = this;
      // 站点售卡数统计
      axios.get('http://rent.smart-ideas.com.cn/ylhpark/loopDataV/getSiteSaleInfo?lineId=' + num)
        .then(function(res){
          var dataList = [];
          var restDataList = [];
          var nameList = [];
          res.data.forEach(function(value, key){
            dataList.push(parseInt(value.buyQuantity));
            restDataList.push(parseInt(value.restCheckQuantity));
            var siteName = value.siteName;
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
                  fontSize: 14,
                  rotate: 20
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
              bottom: '20px',
              containLabel: true
            }
          };

          if(num == '1'){
            that.zdsk1 = options;
          }else if(num == '2'){
            that.zdsk2 = options;
          }
        }).catch(function(err){
          console.log(err);
        })
    },
    // 获取距离是发展位置
    getNhDistance: function(currentId){
      var startId = 16;
      if(40 <= currentId && currentId < 43){
        currentId = currentId - 14;
      }else if(50 <= currentId && currentId < 53){
        currentId = currentId - 22;
      }else if(60 <= currentId && currentId < 64){
        currentId = currentId - 30;
      }else if(70 <= currentId && currentId < 75){
        currentId = currentId - 37;
      }else if(80 <= currentId && currentId < 84){
        currentId = currentId - 43;
      }else if(currentId == 90){
        currentId = currentId - 50;
      }
      var siteDistance = 1140 / ((document.getElementsByClassName('nhItem').length) - 1);
      console.log(siteDistance);
      var siteNumber = currentId - startId;
      return siteDistance * siteNumber + 10;
    },
    getXhcDistance: function(currentId){
      var startId = 500;
      if(550 <= currentId && currentId < 565){
        currentId = currentId - 35;
      }else if(600 <= currentId && currentId < 608){
        currentId = currentId - 70;
      }else if(650 <= currentId && currentId < 656){
        currentId = currentId - 112;
      }else if(700 <= currentId && currentId < 705){
        currentId = currentId - 158;
      }else if(750 <= currentId && currentId < 764){
        currentId = currentId - 205;
      }else if(800 <= currentId && currentId < 804){
        currentId = currentId - 243;
      }else if(850 <= currentId && currentId < 855){
        currentId = currentId - 291;
      }else if(900 <= currentId && currentId < 909){
        currentId = currentId - 338;
      }else if(950 <= currentId && currentId < 958){
        currentId = currentId - 381;
      }else if(currentId == 1000){
        currentId = currentId - 423;
      }
      var siteDistance = 1140 / ((document.getElementsByClassName('xhcItem').length) - 1);
      var siteNumber = currentId - startId;
      return siteDistance * siteNumber + 10;
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

    // 车辆初始位置
    var nhCarPositions = [];
    var xhcCarPositions = [];
    var seconds = 0;
    setInterval(function(){
      seconds += 1;
      if(seconds == 1 || seconds % 20 == 0){
          that.zdTab('1');
          that.zdTab('2');

          var mtList = [
            '14249a7ee96d4d3f95195a799a3709d2',
            '2a96be8cf7744d9088986920e2f0d6d9',
            '47fca49def99492c80a58d8592400589',
            '4c74b97aaf5b4ff594d11841d4ec8de9',
            '5acd3b7ae10544ec9632b41392c0e695',
            '7911474d3e1b42e891bd91f6eaf55077',
            '8ea1d467f3af4d2aa46b09219d6273f6',
            'b3bb924f74ed4e8ebcad576a382e8791',
            'cdabffaf5cb442da8f5ca9ac50f85efc',
            'ed28b43724f0477d9755de59b28160dd',
            'f769f573bc3e4df5986ec45993e94fbd',
            'e258ca79d5ca4e33b177794a6d815ad5'
          ];
          var completeNumber = 0;
          var dataList = [];
          mtList.forEach(function(mt, key){
            // 获取租赁详情
            axios.get('http://rent.smart-ideas.com.cn/ylhpark/deviceDataView/getDeviceShipLeaseInfo?scenicId=' + mt)
              .then(function(res){
                var refundList = res.data;
                refundList.forEach(function(value, key){
                  var newArr = [];
                  newArr[0] = value.code;
                  if (value.phone) {
                    newArr[1] = value.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
                  } else {
                    newArr[1] = '-';
                  }
                  if (value.money) {
                     newArr[2] = parseFloat(value.money).toFixed(2);
                  }
                  dataList.push(newArr);
                })
                completeNumber += 1;
                if(completeNumber == mtList.length){
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
                    columnWidth: [140, 140, 120],
                    style: {
                      fontSize: '20'
                    },
                    rowNum: 5
                  }
                }

              })
              .catch(function(err){
                console.log(err);
              })
          })


          // 获取消息推送
          axios.get('http://rent.smart-ideas.com.cn/ylhpark/loopDataV/getOrderInfo')
            .then(function(res){
              if(res.data.length > 0){
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
              }
              
            }).catch(function(err){
              console.log(err);
            })

          // 预警
          axios.get('http://rent.smart-ideas.com.cn/ylhpark/batteryDataView/getPrinterStatus')
            .then(function(res){
              var dataList = [];
              res.data.forEach(function(value, key){
                if(value.status != '0'){
                  var siteStatus = value.status;
                  var siteName = value.siteName;
                  var itemString = '';
                  if(siteStatus == '1'){
                  	itemString += siteName + value.printerName + '：缺纸\n';
                  }else if(value.status == '2'){
                  	itemString += siteName + value.printerName + '：纸将尽\n';
                  }else if(value.status == '3'){
                  	itemString += siteName + value.printerName + '：打开失败\n';
                  }else if(value.status == '4'){
                  	itemString += siteName + value.printerName + '：脱机\n';
                  }

                  var money = parseFloat(value.money).toFixed(2);
                  var dataItem = ['<p style="font-size:13px;height: 35px;line-height:35px;padding-left: 10px;background-color:rgba(23,88,208,.6);">'
                  + itemString +
                  '</p>'];
                  dataList.push(dataItem);
                }
              })
              if(dataList.length != 0){
                that.paper = {
                  rowNum: 4,
                  oddRowBGC: 'rgba(0,0,0,0)',
                  evenRowBGC: 'rgba(0,0,0,0)',
                  data: dataList
                };
              }else{
                that.paper = {
                  rowNum: 4,
                  oddRowBGC: 'rgba(0,0,0,0)',
                  evenRowBGC: 'rgba(0,0,0,0)',
                  data: [['<p style="font-size:13px;height: 35px;line-height:35px;padding-left: 10px;background-color:rgba(23,88,208,.6);">暂无异常状态</p>']]
                };
              }
            }).catch(function(err){
              console.log(err);
            })


          // 获取收入比例
          axios.get('http://rent.smart-ideas.com.cn/ylhpark/operationDataView/getCurrentCollection')
            .then(function(res){
              console.log(res.data);
              var incomeList = res.data;
              var zjcIncome;
              var bdcIncome;
              var dpcIncome;
              incomeList.forEach(function(value, key){
                if(value.name == '自驾船'){
                  zjcIncome = parseFloat(value.value).toFixed(2);
                }else if(value.name == '摆渡船'){
                  bdcIncome = parseFloat(value.value).toFixed(2);
                }else{
                  dpcIncome = parseFloat(value.value).toFixed(2);
                }
              })
              if(!isNaN(parseInt(zjcIncome))){
                that.zjcIncome = zjcIncome;
                that.bdcIncome = bdcIncome;
                that.dpcIncome = dpcIncome;
                that.linePercent = {
                  radius: '60%',
                  activeRadius: '65%',
                  lineWidth: 15,
                  digitalFlopStyle: {
                    fontSize: 16
                  },
                  data: [
                    {
                      name: '自驾船',
                      value: parseInt(zjcIncome)
                    },
                    {
                      name: '摆渡船',
                      value: parseInt(bdcIncome)
                    },
                    {
                      name: '电瓶车',
                      value: parseInt(dpcIncome)
                    }
                  ]
                }
              }
            }).catch(function(err){
              console.log(err);
            })

          // 获取各码头租赁情况


          // 获取七日收入情况
          axios.get('http://rent.smart-ideas.com.cn/ylhpark/operationDataView/getIncome')
            .then(function(res){
              var timeList = [];
              var dpcList = [];
              var zjcList = [];
              var bdcList = [];
              res.data.forEach(function(value, key){
                if(key % 3 == 0){
                  timeList.push(value.x);
                }
                if(value.s == '电瓶车'){
                  dpcList.push(parseFloat(value.y));
                }else if(value.s == '摆渡船'){
                  bdcList.push(parseFloat(value.y));
                }else{
                  zjcList.push(parseFloat(value.y));
                }
              })
              that.option3 = {
                legend: {
                  data: [{
                    name: '自驾船',
                    color: '#0a73ff'
                  },{
                    name: '摆渡船',
                    color: '#00ff00'
                  },{
                    name: '电瓶车',
                    color: '#ff0000'
                  }],
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
                      fill: '#00ff00'
                    }
                  },
                  {
                    name: '电瓶车',
                    data: dpcList,
                    type: 'bar',
                    barStyle: {
                      fill: '#ff0000'
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
    height: 305px;
    width: 1310px;
  }

  /* 租赁详情 */
  .leaseInfo{
    width: 350px;
    padding: 0 10px 10px;
  }
  .leaseInfo .title{
    font-size: 18px;
    color: #fff;
    width: 100%;
    text-align: center;
    line-height: 50px;
  }

  /* 收入饼状图 */
  .linePercent{
    width: 350px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .linePercent .lineIncome{
    width: 180px;
  }
  .linePercent .lineIncome p{
    font-size: 18px;
    color: #fff;
    line-height: 45px;
    padding-left: 10px;
  }

  /* 消息推送 */
  .notice{
    width: 580px;
    height: 382px;
    padding-left: 225px;
    margin-top: 10px;
  }
  .noticeContent{
    width: 100%;
    height: 195px;
    padding: 10px;
  }
  .notice-content{
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
    height: 350px;
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
  .income .title{
    font-size: 18px;
    color: #fff;
    width: 100%;
    text-align: center;
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
    width: 1200px;
    height: 695px;
    position: relative;
    margin-top: -278px;
  }
  .paper{
    padding-left: 220px;
  }
  .paperContent{
    background-color: rgba(0, 0, 0, .3);
    padding: 10px 0;
    border-radius: 10px;
  }

  .left-bottom{
    width: 1310px;
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
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
    padding: 30px 0;
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
    padding: 0 20px 0 50px;
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
    top: -30px;
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
    position: relative;
    white-space: nowrap;
    position: relative;
  }
  .siteItem .carIcon{
    position: absolute;
    width: 20px;
    top: -10px;
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
  .mtList{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .mtItem{
    width: 20%;
    font-size: 18px;
    color: #fff;
    margin: 5px 0;
    padding: 0 5px;
  }
  .mtItem .mtContent{
    padding: 5px;
  }
  .mtItem .mtName{
    text-align: center;
  }
  .mtItem font{
    font-size: 28px;
    font-weight: bold;
    color: blue;
  }
  .mtItem .kx{
    color: greenyellow;
  }
  .mtItem .zz{
    color: red;
  }

  /* 站点售卡 */
  .zdIncome{
    width: 100%;
    /* height: 305px; */
    padding: 10px;
  }



</style>
