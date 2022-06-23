<template>
  <div class="hello" style="width: 100vw;height: 100vh;overflow: hidden;background-size: cover;">
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <p>云龙湖水族展览馆数字化运营系统</p>
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
              <p class="noticeTitle">购票须知</p>
              <p>成人票：60元/张</p>
              <p>学生票：30元/张</p>
              <p>享受免费入园的人群有：</p>
              <p>1. 6周岁（含）以下或身高1.4米（含）以下；（苏价规[2018]1号文）</p>
              <p>2.残疾人（凭残疾证及身份证）；（苏价规[2018]1号文）</p>
              <p>3.现役军人（凭军人证包括消防救援人员）；（苏价规[2018]1号文）</p>
              <p>4.军队离退休干部;(徐价规[2015]1号文)</p>
              <p>5.70周岁（含）以上老人（凭身份证）；（苏价规[2018]1号文）</p>
              <p>6.60周岁（含60周岁）以上徐州本地市民（凭身份证）；（徐价规[2015]1号文）</p>
              <p>7.“三免”证（无偿献血奉献奖、无偿捐献造血干细胞奖、无偿献血志愿服务终身荣誉奖）；（苏卫医政[2017]48号文）</p>
              <p>8.医护人员（凭医护人员证件及身份证；截止至2021年4月30日）；</p>
              <p>9.全国消防员凭消防证免费；</p>
              <p>10.2021年3月－2022年2月，每个月最后一个周六穿汉服者免费入园。</p>
              <p>享受半价优惠的人群有：</p>
              <p>1. 6周岁（不含6周岁）－18周岁（含18周岁）未成年，全日制大学生本科及以下学历学生（不含成人院校学生）凭学生证实行半票；（苏价规[2018]1号文）</p>
              <p>2.非徐州本地市民60周岁（含60周岁）至70周岁（不含70周岁）凭身份证实行半票。（苏价规[2018]1号文）</p>
              <p>注：所有优惠人群需提供有效证件原件。</p>
            </div>
          </div>
        </div>

        <!-- 中间视图 -->
        <div class="centerView">
          <!-- 入园人数 -->
          <!-- <div class="peopleView">
            <dv-border-box-7>
              <div class="peopleContent">
                <div class="peopleItem">
                  <p>购票人数</p>
                  <dv-digital-flop :config="config1" style="width:200px;height:50px;" />
                </div>
                <div class="peopleItem">
                  <p>在馆人数</p>
                  <dv-digital-flop :config="config2" style="width:200px;height:50px;" />
                </div>
              </div>
            </dv-border-box-7>
          </div> -->
          <!-- 视频部分 -->
          <div class="videoView">
            <dv-border-box-7>
              <img src="../assets/ylhMap.png" >
            </dv-border-box-7>
          </div>

          <!-- 购票流程 -->
          <div class="progressView">
            <p class="progressTitle">购票流程</p>
            <div class="progressList">
              <dv-border-box-8 :reverse="true">1.扫描购票二维码</dv-border-box-8>
              <dv-border-box-8 :reverse="true">2.闸机刷验票二维码</dv-border-box-8>
              <dv-border-box-8 :reverse="true">3.入馆游玩</dv-border-box-8>
            </div>
          </div>

          <!-- 温馨提示 -->
          <div class="wxts">
            <dv-border-box-10>温馨提示：欢迎参观水族展览馆</dv-border-box-10>
          </div>
        </div>

        <!-- 右侧视图 -->
        <div class="rightView">
          <!-- 购票须知 -->
          <div class="noticeView rightNotice">
            <p class="noticeTitle">购票详情</p>
            <dv-scroll-board :config="buyTickets" style="width:100%;height:280px" />
          </div>

          <!-- 售票二维码 -->
          <div class="qrcodeView">
            <p class="qrcodeViewTitle">微信购票二维码</p>
            <div class="qrcodeImgView">
              <img class="qrcodeImg" src="../assets/ylhszg.png">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'YlhszgView',
  data () {
    return {
      buyTickets: {
        data: [
          ['--'],
          ['--'],
          ['--'],
          ['--'],
          ['--']
        ]
      },
      "xscale": 1,
      "yscale": 1,
      "nowDate": "2021-01-19 00:00:00",
      "nowPic": "",
      "weatherList": [],
      "config1": {
        number: [0],
        content: '{nt}',
        style: {
          fontSize: 45,
          fill: '#fff',
          fontWeight: 'bold'
        }
      },
      "config2": {
        number: [0],
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
    axios.get('http://node.smart-ideas.com.cn:3001/datav/common/weather/v1/weatherInfo?city=210000')
      .then(function(res){
        that.weatherList = res.data;
      }).catch(function(err){
        console.log(err);
      })

    var seconds = 0;
    setInterval(function(){
      seconds += 1;
      if(seconds == 1 || seconds % 20 == 0){

      }
    }, 1000);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
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
    padding-bottom: 21px;
  }
  /* 左侧试图 */
  .leftView{
    width: 550px;
    height: 970px;
    position: relative;
    background: url(../assets/left-bg.png) no-repeat left top;
    background-size: 100% 100%;
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
    line-height: 35px;
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
    font-size: 14px;
    line-height: 20px;
  }
  .noticeView p{
    margin-bottom: 5px;
  }
  .noticeTitle{
    font-size: 28px;
    font-weight: bold;
  }
  .noticeView .noticeTitle{
    margin-bottom: 20px;
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
    height: 712px;
    margin: 0 auto;
  }
  .videoView img{
    width: 100%;
    margin-top: 130px;
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
    background: url(../assets/rightBg2.png) no-repeat left top;
    background-size: cover;
    padding: 60px 30px 0;
  }
  .qrcodeViewTitle{
    font-size: 24px;
    color: #fff;
    padding-left: 60px;
    line-height: 40px;
  }
  .qrcodeImgView{
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .qrcodeImg{
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }
</style>
