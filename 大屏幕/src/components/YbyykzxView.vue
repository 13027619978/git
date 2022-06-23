<template>
  <div class="hello">
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <p>北京园博园游客大数据系统中心</p>
      </div>
      <div class="contentView">
        <!-- 左侧视图 -->
        <div class="leftView">
          <div class="leftContent">
            <!-- 入园人数 -->
            <div class="peopleView">
              <dv-border-box-7>
                <p class="title">当日人数统计</p>
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

            <!-- 游客省份 -->
            <div class="yksf" style="overflow: hidden;">
              <dv-border-box-7>
                <p class="title" style="z-index: 999;position: relative;">游客省份</p>
                <iframe src="http://smart-ideas.com.cn/mapView/ybyYkzxMap2.html" style="width:122%;height:663px;border: none;margin-left: -12%;margin-top: -110px;"></iframe>
                <dv-scroll-board :config="yksf" style="width:200px;height:200px;position: absolute;right: 0;bottom: 0;z-index: 999;" />
              </dv-border-box-7>
            </div>

            <!-- 自行车租赁情况 -->
            <div class="zlqk">
              <dv-border-box-7>
                <p class="title">自行车租赁情况</p>
                <dv-active-ring-chart :config="syl" style="width:200px;height:200px;margin: 0 auto;" />
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
              <dv-charts :option="klqx" style="width:100%;height:210px"/>
            </dv-border-box-7>
          </div>
          <!-- 实时交通图 -->
          <div class="yksf">
            <dv-border-box-7>
              <p class="title">实时交通图</p>
              <iframe src="http://smart-ideas.com.cn/mapView/ybyYkzxMap1.html" style="width:100%;height:370px;border: none;"></iframe>
            </dv-border-box-7>
          </div>

          <!-- 每日客流量对比 -->
          <div class="kll">
            <dv-border-box-7>
              <p class="title">每日客流量对比</p>
              <dv-charts :option="kll" style="width:600px;height:200px;margin: 0 auto;"/>
            </dv-border-box-7>
          </div>

        </div>

        <!-- 右侧视图 -->
        <div class="rightView">
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

          <!-- 游客来源情况 -->
          <div class="yksf">
            <dv-border-box-7>
              <p class="title">游客来源情况（北京市各辖区）</p>
              <iframe src="http://smart-ideas.com.cn/mapView/ybyYkzxMap3.html" style="width:100%;height:370px;border: none;"></iframe>
              <dv-scroll-board :config="ykly" style="width:200px;height:200px;position: absolute;right: 0;bottom: 0;" />
            </dv-border-box-7>
          </div>

          <!-- 门区入园人数 -->
          <div class="mqry">
            <dv-border-box-7>
              <p class="title">门区入园人数</p>
              <div class="mqContent">
                <dv-scroll-board :config="mqry" style="width:350px;height:200px" />
                <div class="bl">
                  <p class="title">男女比例</p>
                  <dv-active-ring-chart :config="bl" style="width:150px;height:150px" />
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
export default {
  name: 'YbyykzxView',
  data () {
    return {
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
        axios.get('http://node.smart-ideas.com.cn:3001/datav/yby/inPeopleInfo')
          .then(function(res){
            // 总入园人数
            var DataIn = parseInt(res.data.totalInPeople);
            // 在园人数
            var stayData = parseInt(res.data.nowInPeople);

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
            let erCz = res.data.erIn - res.data.erOut;
            erCz = erCz>0?erCz:0;
            let sanCz = res.data.sanIn - res.data.sanOut;
            sanCz = sanCz>0?sanCz:0;
            let liuCz = res.data.liuIn - res.data.liuOut;
            liuCz = liuCz>0?liuCz:0;
            that.mqry = {
              header: ['门区', '入园人数', '承载量'],
              data: [
                ['二号门', res.data.erIn, erCz],
                ['三号门', res.data.sanIn, sanCz],
                ['六号门', res.data.liuIn, liuCz],
              ],
              rowNum: 3
            };
          })
          .catch(function(err){
            console.log(err);
          })

        // 获取游客省份
        axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getVisitorProvinceName?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945')
          .then(function(res){

            let dataList = [];

            res.data.forEach(function(value, key){
              let dataItem = [];
              dataItem[0] = value.area;
              dataItem[1] = value.value;
              dataList.push(dataItem);
            })
            that.yksf = {
              data: dataList,
              rowNum: 5,
              oddRowBGC: 'rgba(0,0,0,.6)',
              evenRowBGC: 'rgba(0,0,0,.6)',
              carousel: 'page'
            };
          })
          .catch(function(err){
            console.log(err);
          })

        // 获取游客来源
        axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getVisitorCategoryName?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945')
          .then(function(res){

            let dataList = [];

            res.data.forEach(function(value, key){
              let dataItem = [];
              dataItem[0] = value.area;
              dataItem[1] = value.value;
              dataList.push(dataItem);
            })
            that.ykly = {
              data: dataList,
              rowNum: 5,
              oddRowBGC: 'rgba(0,0,0,.6)',
              evenRowBGC: 'rgba(0,0,0,.6)',
              carousel: 'page'
            };
          })
          .catch(function(err){
            console.log(err);
          })


        // 获取客流曲线
        axios.get('http://boss.smart-ideas.com.cn/ticketApi/orderView/getPassengerHourFlow?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945')
          .then(function(res){
            var klList = res.data;
            var timeList = [];
            var dataList = [];
            klList.forEach(function(value, key){
              timeList.push(value.x);
              dataList.push(parseInt(value.y));
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

        axios.get('http://node.smart-ideas.com.cn:3001/datav/yby/getBikeUseInfo')
         .then(function(res){
           that.syl = {
            radius: '80%',
            activeRadius: '85%',
            data: [
              {
                name: '已使用',
                value: parseInt(res.data[0].actua)
              },
              {
                name: '未使用',
                value: parseInt(res.data[0].aims)
              }
            ],
            color: ['red', 'yellow'],
            lineWidth: 10
          }
         })
         .catch(function(err){
           console.log(err);
         })

        axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getVisitorSexPercent?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945')
         .then(function(res){
           that.bl = {
            radius: '80%',
            activeRadius: '85%',
            data: [
              {
                name: '男',
                value: parseInt(res.data[0].y)
              },
              {
                name: '女',
                value: parseInt(res.data[1].y)
              }
            ],
            color: ['yellow', 'red'],
            lineWidth: 10
          }
         })
         .catch(function(err){
           console.log(err);
         })

         axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getPassengerDayFlow?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945')
          .then(function(res){
            let timeList = [];
            let dataList = [];
            res.data.forEach(function(value, key){
              var timeItem = value.x.split('-')[1] + '-' + value.x.split('-')[2];
              timeList.push(timeItem);
              dataList.push(parseInt(value.y));
            })
            that.kll = {
              xAxis: {
                data: timeList,
                axisLabel: {
                  style: {
                    fill: '#fff',
                    fontSize: 14,
                    rotate: 0
                  }
                },
                axisLine:{
                  style: {
                    stroke: '#fff',
                    lineWidth: 1
                  }
                }
              },
              yAxis: {
                data: 'value',
                axisLabel: {
                  style: {
                    fill: '#fff',
                    fontSize: 14,
                    rotate: 0
                  }
                },
                axisLine:{
                  style: {
                    stroke: '#fff',
                    lineWidth: 1
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
                top: '10px',
                left: '10px',
                right: '10px',
                bottom: '15px',
                containLabel: true
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
    height: 1080px;
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
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: nowrap;
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
    padding: 20px 0;
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
    height: 950px;
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
    height: 950px;
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
    font-size: 22px;
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

</style>
