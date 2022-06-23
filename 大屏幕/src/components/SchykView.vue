<template>
  <div class="hello">
    <dv-full-screen-container class="container">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <p>什刹海冰场游客大数据系统中心</p>
      </div>
      <div class="contentView">
        <div class="videoView">
          <video src="http://smart-ideas.com.cn/videoFile/schVideo.mp4" autoplay="autoplay" width="100%" height="100%" loop="loop"></video>
        </div>

        <div class="bottomView">
          <div class="bottomItem">
            <p class="bottomTitle">前海冰场</p>
            <div class="saleContent">
              <div class="bottomBox">
                <p>购票总人数</p>
                <p class="number">{{qhTotal}}</p>
              </div>
            </div>
          </div>
          <div class="bottomItem">
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
          </div>
          <div class="bottomItem">
            <p class="bottomTitle">后海冰场</p>
            <div class="saleContent">
              <div class="bottomBox">
                <p>购票总人数</p>
                <p class="number">{{hhTotal}}</p>
              </div>
            </div>
          </div>
        </div>
        <p class="notice">温馨提示：疫情期间，遇到什刹海冰场限流，请您谅解</p>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'SchykView',
    data() {
      return {
        qhTotal: 0,
        hhTotal: 0,
        "nowDate": "2021-01-19 00:00:00",
        "nowPic": "",
        "weatherList": []
      }
    },
    mounted: function() {
      let that = this;
      // 初始化时间
      setInterval(function() {
        var nowYear = new Date().getFullYear();
        var nowMonth = new Date().getMonth() + 1;
        nowMonth = nowMonth > 9 ? nowMonth : '0' + nowMonth;
        var nowDay = new Date().getDate();
        nowDay = nowDay > 9 ? nowDay : '0' + nowDay;
        var nowHour = new Date().getHours();
        nowHour = nowHour > 9 ? nowHour : '0' + nowHour;
        var nowMinutes = new Date().getMinutes();
        nowMinutes = nowMinutes > 9 ? nowMinutes : '0' + nowMinutes;
        var nowSeconds = new Date().getSeconds();
        nowSeconds = nowSeconds > 9 ? nowSeconds : '0' + nowSeconds;
        that.nowDate = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' +
          nowSeconds;
      }, 1000)

      //获取天气情况
      axios.get('http://node.smart-ideas.com.cn:3001/datav/common/weather/v1/weatherInfo?city=110106')
        .then(function(res) {
          that.weatherList = res.data;
        }).catch(function(err) {
          console.log(err);
        })

      var seconds = 0;
      setInterval(function() {
        seconds += 1;
        if (seconds == 1 || seconds % 20 == 0) {
          var nowYear = new Date().getFullYear();
          var nowMonth = new Date().getMonth() + 1;
          nowMonth = nowMonth > 9 ? nowMonth : '0' + nowMonth;
          var nowDay = new Date().getDate();
          nowDay = nowDay > 9 ? nowDay : '0' + nowDay;
          var nowHour = new Date().getHours();
          nowHour = nowHour > 9 ? nowHour : '0' + nowHour;
          var nowMinutes = new Date().getMinutes();
          nowMinutes = nowMinutes > 9 ? nowMinutes : '0' + nowMinutes;
          var nowSeconds = new Date().getSeconds();
          nowSeconds = nowSeconds > 9 ? nowSeconds : '0' + nowSeconds;
          var startDate = encodeURI(nowYear + '-' + nowMonth + '-' + nowDay + ' 00:00:00');
          var endDate = encodeURI(nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds);
          axios.get('http://boss.smart-ideas.com.cn/ticketApi/robotCollection/brakeData/get?enterpriseCode=TgsEpcSh&ticketGroupNum=TGN20211223142734998&startTime='+ startDate +'&endTime=' + endDate)
            .then(function(res){
              var dataList = res.data.data;
              dataList.forEach(function(value, key){
                if(value.categoryName.indexOf('前海') != -1){
                  that.qhTotal = parseInt(value.inTotal);
                }else{
                  that.hhTotal = parseInt(value.inTotal);
                }
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
<style scoped="scoped">
  /* 标题 */
  .titleView {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .titleView img {
    width: 100%;
  }

  .titleView p {
    position: absolute;
    color: #fff;
    font-size: 40px;
    /* font-weight: bold; */
    letter-spacing: 5px;
  }

  .title {
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #fff;
    line-height: 50px;
  }

  /* 内容部分 */
  .contentView {
    min-width: 1920px;
    width: 100%;
    margin-top: 10px;
  }

  .videoView{
    width: 100%;
    height: 650px;
    background: url('http://smart-ideas.com.cn/videoFile/schImg.png') no-repeat left top;
    background-size: 100% 100%;
  }
  .videoView video{
    width: 100%;
    height: 100%;
  }

  .bottomView{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .bottomItem{
    width: 33%;
    padding: 10px 0;
    background: url(../assets/itemBg.png) no-repeat left top;
    background-size: 100% 100%;
    height: 280px;
  }

  /* 天气部分 */
  .weatherView {
    width: 100%;
    height: 260px;
  }

  .weatherContent {
    padding: 10px;
  }

  .weatherView .dateView {
    font-size: 23px;
    color: #fff;
    padding-left: 40px;
    line-height: 30px;
  }

  .nowWeather {
    display: flex;
    justify-content: start;
    align-items: center;
    padding-top: 15px;
  }

  .nowWeather .nowTemp {
    flex: 0 0 40%;
    font-size: 45px;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }

  .nowWeather .nowWeatherPic {
    flex: 0 0 20%;
    max-height: 60px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .nowWeather .nowWeatherPic img {
    width: 65%;
  }

  .nowWeather .nowWeatherItem {
    flex: 0 0 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: #fff;
  }

  .lastWeather {
    display: flex;
    justify-content: start;
    align-items: center;
    padding-top: 15px;
  }

  .lastWeather .lastWeatherItem {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: #fff;
  }

  .bottomTitle{
    font-size: 20px;
    color: #ADFF2F;
    width: 100%;
    text-align: center;
    line-height: 50px;
  }
  .saleContent{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 0;
  }
  .saleContent .bottomBox{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #fff;
  }
  .saleContent .bottomBox .number{
    font-size: 55px;
    color: #007AFF;
    font-weight: bold;
    line-height: 100px;
    margin-top: 20px;
  }
  .saleContent .bottomBox .number.lastNumber{
    color: #ADFF2F;
  }

  .notice{
    font-size: 28px;
    text-align: center;
    width: 100%;
    font-weight: bold;
    color: #fff;
    line-height: 55px;
  }
</style>
