<template>
  <div class="hello">
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <p>圆明园运营大数据中心</p>
      </div>
      <div class="contentView">
        <div class="topView">
          <!-- 左侧视图 -->
          <div class="leftView">
            <div class="leftContent">
              <!-- 天气部分 -->
              <div class="weatherView">
                <dv-border-box-7>
                  <div class="weatherContent">
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
                </dv-border-box-7>
              </div>

              <!-- 游客省份 -->
              <div class="yksf" style="overflow: hidden;">
                <dv-border-box-7>
                  <iframe src="http://smart-ideas.com.cn/mapView/ymymap.html" style="width:122%;height:663px;border: none;margin-left: -12%;margin-top: -110px;"></iframe>
                </dv-border-box-7>
              </div>
            </div>
          </div>

          <!-- 中间视图 -->
          <div class="centerView">
            <!-- 当日客流曲线 -->
            <div class="klqxView">
              <dv-border-box-7>
                <p class="title">当日客流曲线</p>
                <div class="peopleContent">
                  <div class="peopleItem">
                    <p>总客流量</p>
                    <dv-digital-flop :config="config1" style="width:200px;height:30px;" />
                  </div>
                  <div class="peopleItem">
                    <p>在园人数</p>
                    <dv-digital-flop :config="config2" style="width:200px;height:30px;" />
                  </div>
                </div>
                <dv-charts :option="klqx" style="width:100%;height:150px"/>
              </dv-border-box-7>
            </div>
            <!-- 实时交通图 -->
            <div class="yksf">
              <dv-border-box-7>
                <p class="title">周边交通</p>
                <iframe src="http://smart-ideas.com.cn/mapView/ymyjtmap.html" style="width:100%;height:370px;border: none;"></iframe>
              </dv-border-box-7>
            </div>
          </div>

          <!-- 右侧视图 -->
          <div class="rightView">
            <!-- 当日运营汇总 -->
            <div class="yyhz">
              <dv-border-box-7>
                <p class="title">当日运营汇总</p>
                <div class="yyhzContent">
                  <div class="yyhzTxt">
                    <p>自行车收入：{{bikeIncome}}元</p>
                    <p>自驾船收入：{{zjcIncome}}元</p>
                    <p>交通船收入：{{jtcIncome}}元</p>
                    <p>电瓶车收入：{{dpcIncome}}元</p>
                  </div>
                  <dv-active-ring-chart :config="syl" style="width:200px;height:200px;margin: 0 auto;" />
                </div>
              </dv-border-box-7>
            </div>

            <!-- 游客来源情况 -->
            <div class="yksf">
              <dv-border-box-7>
                <iframe src="http://smart-ideas.com.cn/mapView/ymydpcmap.html" style="width:100%;height:430px;border: none;"></iframe>
              </dv-border-box-7>
            </div>
          </div>
        </div>

        <div class="bottomView">
          <div class="bottomItem">
            <dv-border-box-7>
              <p class="title">交通船运营收入</p>
              <dv-charts style="width: 450px;height: 200px;" :option="jtcyy" />
            </dv-border-box-7>
          </div>
          <div class="bottomItem">
            <dv-border-box-7>
              <p class="title">自行车运营收入</p>
              <dv-charts style="width: 450px;height: 200px;" :option="zxcyy" />
            </dv-border-box-7>
          </div>
          <div class="bottomItem">
            <dv-border-box-7>
              <p class="title">电瓶车运营收入</p>
              <dv-charts style="width: 450px;height: 200px;" :option="dpcyy" />
            </dv-border-box-7>
          </div>
          <div class="bottomItem">
            <dv-border-box-7>
              <p class="title">自驾船运营收入</p>
              <dv-charts style="width: 450px;height: 200px;" :option="zjcyy" />
            </dv-border-box-7>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'YbyykzxView',
  data () {
    return {
      jtcyy: {},
      zxcyy: {},
      dpcyy: {},
      zjcyy: {},
      bikeIncome: 0,
      zjcIncome: 0,
      dpcIncome: 0,
      jtcIncome: 0,
      "nowDate": "2021-01-19 00:00:00",
      "nowPic": "",
      "xscale": 1,
      "yscale": 1,
      "weatherList": [],
      "mqry": {},
      "kll": {},
      "syl": {},
      "bl": {},
      "klqx": {},
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
        // 获取在入园人数
        axios.get('http://47.94.82.166:3001/datav/ymy/getPeopleInfo')
          .then(function(res){
            // 总入园人数
            var DataIn = parseInt(res.data.Data.DataIn);
            // 在园人数
            var stayData = parseInt(res.data.Data.DataStay);

            that.config1 = {
              number: [DataIn],
              content: '{nt}',
              style: {
                fontSize: 35,
                fill: '#fff',
                fontWeight: 'bold'
              }
            };
            that.config2 = {
              number: [stayData],
              content: '{nt}',
              style: {
                fontSize: 35,
                fill: '#fff',
                fontWeight: 'bold'
              }
            };
          })
          .catch(function(err){
            console.log(err);
          })



        // 获取客流曲线
        axios.get('http://47.94.82.166:3001/datav/ymy/getPeopleCurve')
          .then(function(res){
            var klList = res.data.peopleInfo;
            var timeList = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
            var dataList = [];
            timeList.forEach(function(value, key){
              dataList.push(klList[value]);
            })
            that.klqx = {
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
                  data: dataList,
                  type: 'line',
                  lineArea: {
                    show: true
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

        axios.get('http://api.smart-ideas.com.cn/ymypark/operationDataView/getCurrentCollection')
         .then(function(res){
           let bikeIncome;
           let dpcIncome;
           let jtcIncome;
           let zjcIncome;
           res.data.forEach(function(value, key){
             if(value.name == '自行车'){
               bikeIncome = parseInt(value.value);
             }
             if(value.name == '自驾船'){
               zjcIncome = parseInt(value.value);
             }
             if(value.name == '交通船'){
               jtcIncome = parseInt(value.value);
             }
             if(value.name == '电瓶车'){
               dpcIncome = parseInt(value.value)
             }
           })
           that.bikeIncome = bikeIncome;
           that.dpcIncome = dpcIncome;
           that.jtcIncome = jtcIncome;
           that.zjcIncome = zjcIncome;
           that.syl = {
            radius: '80%',
            activeRadius: '85%',
            data: [
              {
                name: '自行车',
                value: bikeIncome
              },
              {
                name: '自驾船',
                value: zjcIncome
              },
              {
                name: '交通船',
                value: jtcIncome
              },
              {
                name: '电瓶车',
                value: dpcIncome
              }
            ],
            color: ['red', 'yellow'],
            lineWidth: 10
          }
         })
         .catch(function(err){
           console.log(err);
         })

        axios.get('http://api.smart-ideas.com.cn/ymypark/operationDataView/getIncome?type=c')
          .then(function(res){
            let timeList = [];
            let dataList = [];
            let max = 0;
            res.data.forEach(function(value, key){
              let timeItem = value.x.split('-')[1] + '-' + value.x.split('-')[2];
              let dataItem = parseInt(value.y);
              timeList.push(timeItem);
              dataList.push(dataItem);
            })
            that.jtcyy = {
                color: ['blue'],
                xAxis: {
                  data: timeList,
                  axisLabel: {
                    style: {
                      fill: '#fff',
                      fontSize: 12
                    }
                  }
                },
                yAxis: {
                  data: 'value',
                  max: '0%',
                  min: 0,
                  splitLine: {
                    show: false
                  },
                  axisLabel: {
                    style: {
                      fill: '#fff',
                      fontSize: 12
                    }
                  }
                },
                series: [
                  {
                    data: dataList,
                    type: 'bar'
                  }
                ],
                grid: {
                  top: 10,
                  left: 45,
                  bottom: 20,
                  right: 0
                }
            }
          })
          .catch(function(err){
            console.log(err);
          })

        axios.get('http://api.smart-ideas.com.cn/ymypark/operationDataView/getIncome?type=a')
          .then(function(res){
            let timeList = [];
            let dataList = [];
            let max = 0;
            res.data.forEach(function(value, key){
              let timeItem = value.x.split('-')[1] + '-' + value.x.split('-')[2];
              let dataItem = parseInt(value.y);
              timeList.push(timeItem);
              dataList.push(dataItem);
            })
            that.zxcyy = {
                color: ['#ff9e79'],
                xAxis: {
                  data: timeList,
                  axisLabel: {
                    style: {
                      fill: '#fff',
                      fontSize: 12
                    }
                  }
                },
                yAxis: {
                  data: 'value',
                  max: '0%',
                  min: 0,
                  splitLine: {
                    show: false
                  },
                  axisLabel: {
                    style: {
                      fill: '#fff',
                      fontSize: 12
                    }
                  }
                },
                series: [
                  {
                    data: dataList,
                    type: 'bar'
                  }
                ],
                grid: {
                  top: 10,
                  left: 45,
                  bottom: 20,
                  right: 0
                }
            }
          })
          .catch(function(err){
            console.log(err);
          })

        axios.get('http://api.smart-ideas.com.cn/ymypark/operationDataView/getIncome?type=d')
          .then(function(res){
            let timeList = [];
            let dataList = [];
            let max = 0;
            res.data.forEach(function(value, key){
              let timeItem = value.x.split('-')[1] + '-' + value.x.split('-')[2];
              let dataItem = parseInt(value.y);
              timeList.push(timeItem);
              dataList.push(dataItem);
            })
            that.dpcyy = {
                color: ['#f6ff3d'],
                xAxis: {
                  data: timeList,
                  axisLabel: {
                    style: {
                      fill: '#fff',
                      fontSize: 12
                    }
                  }
                },
                yAxis: {
                  data: 'value',
                  max: '0%',
                  min: 0,
                  splitLine: {
                    show: false
                  },
                  axisLabel: {
                    style: {
                      fill: '#fff',
                      fontSize: 12
                    }
                  }
                },
                series: [
                  {
                    data: dataList,
                    type: 'bar'
                  }
                ],
                grid: {
                  top: 10,
                  left: 45,
                  bottom: 20,
                  right: 0
                }
            }
          })
          .catch(function(err){
            console.log(err);
          })

        axios.get('http://api.smart-ideas.com.cn/ymypark/operationDataView/getIncome?type=b')
          .then(function(res){
            let timeList = [];
            let dataList = [];
            let max = 0;
            res.data.forEach(function(value, key){
              let timeItem = value.x.split('-')[1] + '-' + value.x.split('-')[2];
              let dataItem = parseInt(value.y);
              timeList.push(timeItem);
              dataList.push(dataItem);
            })
            that.zjcyy = {
                color: ['#c724b8'],
                xAxis: {
                  data: timeList,
                  axisLabel: {
                    style: {
                      fill: '#fff',
                      fontSize: 12
                    }
                  }
                },
                yAxis: {
                  data: 'value',
                  max: '0%',
                  min: 0,
                  splitLine: {
                    show: false
                  },
                  axisLabel: {
                    style: {
                      fill: '#fff',
                      fontSize: 12
                    }
                  }
                },
                series: [
                  {
                    data: dataList,
                    type: 'bar'
                  }
                ],
                grid: {
                  top: 10,
                  left: 45,
                  bottom: 20,
                  right: 0
                }
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
  .container{
    width: 1920px;
    height: 1080px;
  }
  .topView{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
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
  .titleView p{
    position: absolute;
    color: #fff;
    font-size: 40px;
    /* font-weight: bold; */
    letter-spacing: 5px;
  }
  .title{
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #fff;
    line-height: 50px;
  }

  /* 内容部分 */
  .contentView{
    min-width: 1920px;
    width: 100%;
    margin-top: 10px;
  }
  /* 左侧试图 */
  .leftView{
    width: 630px;
  }
  /* 在园人数 */
  .peopleView{
    width: 100%;
    height: 260px;
  }
  .peopleContent{
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .peopleContent .peopleItem{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .peopleContent .peopleItem p{
    font-size: 18px;
    color: #fff;
    margin-bottom: 5px;
  }

  .yksf{
    margin: 16px 0;
    height: 430px;
  }

  .zlqk{
    width: 100%;
    height: 260px;
  }


  /* 中间视图 */
  .centerView{
    width: 630px;
  }

  .klqxView{
    width: 100%;
    height: 260px;
  }

  .kll{
    width: 100%;
    height: 260px;
  }



  /* 右侧视图 */
  .rightView{
    width: 630px;
  }

  .weatherView{
    width: 100%;
    height: 260px;
  }
  .weatherContent{
    padding: 20px;
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
    flex: 0 0 20%;
    max-height: 60px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  .nowWeather .nowWeatherPic img{
    width: 65%;
  }
  .nowWeather .nowWeatherItem{
    flex: 0 0 30%;
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

  .mqry{
    width: 100%;
    height: 260px;
  }
  .mqContent{
    padding: 0 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .bl{
    width: 230px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .yyhzContent{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 4px 20px;
  }
  .yyhzContent .yyhzTxt{
    width: 250px;
    font-size: 20px;
    color: #fff;
  }
  .yyhzContent .yyhzTxt p{
    padding: 10px 0;
  }

  .bottomView{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .bottomView .bottomItem{
    width: 470px;
  }
</style>
