<template>
  <div class="hello" :style="{background:url_back_img}" style="width: 100%;height: 100vh;overflow: hidden;background-size: cover;">
    <div class="loginView" :style="{display:loginShow}">
      <div class="loginContent">
        <p class="loginTitle">大兴生物医药基地非机动车停车场指挥中心</p>
        <div class="loginItem">
          <p>帐号</p>
          <input type="text" placeholder="请输入帐号" v-model="userName">
        </div>
        <div class="loginItem">
          <p>密码</p>
          <input type="password" placeholder="请输入密码" v-model="passWord">
        </div>
        <a class="loginBtn" href="javascript:;" @click="doLogin">登录</a>
      </div>
    </div>
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <p>大兴生物医药基地非机动车停车场指挥中心</p>
        <p class=""></p>
      </div>
      <div class="contentView">
        <!-- 左侧视图 -->
        <div class="leftView">
          <div class="leftContent">
            <!-- 入园人数 -->
            <div class="peopleView">
              <dv-border-box-7>
                <p class="title">防疫重点人员名单</p>
                <div class="peopleContent">
                  <dv-scroll-board :config="fymd" style="width:600px;height:195px;margin:0 auto;" />
                </div>
              </dv-border-box-7>
            </div>

            <!-- 游客省份 -->
            <div class="yksf" style="overflow: hidden;">
              <dv-border-box-7>
                <p class="title" style="z-index: 999;position: relative;">当日全国人群分布</p>
                <iframe src="http://smart-ideas.com.cn/mapView/dxzhzxMap1.html" style="width:122%;height:663px;border: none;margin-left: -12%;margin-top: -110px;"></iframe>
                <dv-scroll-board :config="yksf" style="width:200px;height:200px;position: absolute;right: 0;bottom: 0;z-index: 999;" />
              </dv-border-box-7>
            </div>
          </div>
        </div>

        <!-- 中间视图 -->
        <div class="centerView">
          <!-- 当日客流曲线 -->
          <div class="klqxView">
            <dv-border-box-7>
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
            </dv-border-box-7>
          </div>
          <!-- 当日人流曲线 -->
          <div class="yksf rlqx">
            <dv-border-box-7>
              <p class="title">当日人流曲线</p>
              <dv-charts :option="klqx" style="width:100%;height:200px"/>
            </dv-border-box-7>
          </div>
          <!-- 拓展模块 -->
          <div class="tzmk">
            <dv-border-box-7>
              <p class="title">拓展模块</p>
              <div class="tzmkContent">
                <p>【火灾烟雾监测预警】</p>
                <p>【人员徘徊逗留监测】</p>
                <p>【自行车/电瓶车识别】</p>
                <p>【快速移动监测预警】</p>
                <p>【人员摔倒监测识别】</p>
                <p>【人员密集/拥堵识别】</p>
              </div>
            </dv-border-box-7>
          </div>
        </div>

        <!-- 右侧视图 -->
        <div class="rightView">
          <div class="peopleView">
            <dv-border-box-7>
              <p class="title">进入名单</p>
              <div class="peopleContent">
                <dv-scroll-board :config="lastEnter" style="width:600px;height:195px;margin:0 auto;" />
              </div>
            </dv-border-box-7>
          </div>

          <!-- 游客来源情况 -->
          <div class="yksf">
            <dv-border-box-7>
              <p class="title">当日北京人群分布</p>
              <iframe src="http://smart-ideas.com.cn/mapView/dxzhzxMap2.html" style="width:100%;height:370px;border: none;"></iframe>
              <dv-scroll-board :config="ykly" style="width:200px;height:200px;position: absolute;right: 0;bottom: 0;" />
            </dv-border-box-7>
          </div>
        </div>
      </div>
      <!-- 照片 -->
      <div class="picView">
        <dv-border-box-7>
          <div style="display: flex;justify-content: center;align-items: center;height:340px;width:100%;">
            <dv-scroll-board :config="yxzt1" style="width:100%;height:300px;" />
          </div>
        </dv-border-box-7>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'DxtcczhzxView',
  data () {
    return {
      "loginShow": "flex",
      "userName": "",
      "passWord": "",
      "weather": "",
      "xscale": 1,
      "yscale": 1,
      "url_back_img": "url("+require('../assets/zhzx-bg.jpg')+") no-repeat left top #000",
      "nowDate": "2021-01-19 00:00:00",
      "nowPic": "",
      "weatherList": [],
      "mqry": {},
      "ykly": {},
      "yksf": {},
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
      },
      "yxzt1": {
        rowNum: 1,
        oddRowBGC: 'rgba(0,0,0,0)',
        evenRowBGC: 'rgba(0,0,0,0)',
        data: [
          ['--', '--']
        ],
        waitTime: 3000,
      },
      "yxzt2": {
        rowNum: 1,
        oddRowBGC: 'rgba(0,0,0,0)',
        evenRowBGC: 'rgba(0,0,0,0)',
        data: [
          ['--', '--']
        ],
        waitTime: 3000,
      },
      "yxzt3": {
        rowNum: 1,
        oddRowBGC: 'rgba(0,0,0,0)',
        evenRowBGC: 'rgba(0,0,0,0)',
        data: [
          ['--', '--']
        ],
        waitTime: 3000,
      },
      "fymd": {
        header: ['时间', '姓名', '手机号', '身份证'],
        headerHeight: 35,
        headerBGC: '#ff0000',
        data: [
          ['--', '--', '--', '--'],
          ['--', '--', '--', '--'],
          ['--', '--', '--', '--'],
          ['--', '--', '--', '--']
        ],
        align: ['center','center','center','center'],
        columnWidth: [170, 80, 150, 200],
        rowNum: 4
      },
      "lastEnter": {
        header: ['时间', '姓名', '身份证'],
        headerHeight: 35,
        data: [
          ['--', '--', '--'],
          ['--', '--', '--'],
          ['--', '--', '--'],
          ['--', '--', '--']
        ],
        align: ['center','center','center'],
        columnWidth: [200, 100, 300],
        rowNum: 4
      },
    }
  },
  methods: {
    doLogin () {
      console.log(this.userName);
      console.log(this.passWord);
      let userName = this.userName;
      let passWord = this.passWord;
      if(userName == 'admin' && passWord == '123456'){
        this.loginShow = 'none';
      }else{
        alert('请输入正确的帐号密码');
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
        console.log(res);
        that.weatherList = res.data;
        that.weather = '今日天气:' + res.data[0].temperature + '  ' + res.data[0].weather + ' ' + res.data[0].wind + '风:' + res.data[0].windpower + '级';
      }).catch(function(err){
        console.log(err);
      })

    var seconds = 0;
    setInterval(function(){
      seconds += 1;
      if(seconds == 1 || seconds % 20 == 0){
        // 获取游客省份
        axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getVisitorProvinceName?enterpriseCode=TgsEpcDxswyy&ticketGroupNum=TGN20211021150501640')
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
        axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getVisitorCategoryName?enterpriseCode=TgsEpcDxswyy&ticketGroupNum=TGN20211021150501640')
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
        axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getPassengerHourFlow?enterpriseCode=TgsEpcDxswyy&ticketGroupNum=TGN20211021150501640')
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

        // 获取照片
        axios.get('http://letusgofile.seed.smart-ideas.com.cn/loadpic.php')
          .then(function(res){
            console.log(res);
            var picList = res.data;
            var newPicList = [];
            var dataList1 = [];
            for(var i = 0; i < picList.length; i+=10){
              newPicList.push(picList.slice(i,i+10));
            }
            console.log(newPicList);
            newPicList.forEach(function(value, key){
              var dataItem = [
                '<div style="display:flex;justify-content:flex-start;align-items:flex-end;"><div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right:10px;margin-bottom:10px;"><img style="width:180px;height:220px;" src="'
                + value[0].url + '"></div><p style="height:30px;line-height:30px;font-size:13px;text-align:center;">时间：'
                + value[0].date + '</p></div>' +
                '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:180px;height:220px;" src="'
                + value[1].url + '"></div><p style="height:30px;line-height:30px;font-size:13px;text-align:center;">时间：'
                + value[1].date + '</p></div>' +
                '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:180px;height:220px;" src="'
                + value[2].url + '"></div><p style="height:30px;line-height:30px;font-size:13px;text-align:center;">时间：'
                + value[2].date + '</p></div>' +
                '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:180px;height:220px;" src="'
                + value[3].url + '"></div><p style="height:30px;line-height:30px;font-size:13px;text-align:center;">时间：'
                + value[3].date + '</p></div>' +
                '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:180px;height:220px;" src="'
                + value[4].url + '"></div><p style="height:30px;line-height:30px;font-size:13px;text-align:center;">时间：'
                + value[4].date + '</p></div>' +
                '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:180px;height:220px;" src="'
                + value[5].url + '"></div><p style="height:30px;line-height:30px;font-size:13px;text-align:center;">时间：'
                + value[5].date + '</p></div>' +
                '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:180px;height:220px;" src="'
                + value[6].url + '"></div><p style="height:30px;line-height:30px;font-size:13px;text-align:center;">时间：'
                + value[6].date + '</p></div>' +
                '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:180px;height:220px;" src="'
                + value[7].url + '"></div><p style="height:30px;line-height:30px;font-size:13px;text-align:center;">时间：'
                + value[7].date + '</p></div>' +
                '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:180px;height:220px;" src="'
                + value[8].url + '"></div><p style="height:30px;line-height:30px;font-size:13px;text-align:center;">时间：'
                + value[8].date + '</p></div>' +
                '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-bottom:10px;"><img style="width:180px;height:220px;" src="'
                + value[9].url + '"></div><p style="height:30px;line-height:30px;font-size:13px;text-align:center;">时间：'
                + value[9].date + '</p></div></div>',
              ];
              dataList1.push(dataItem);
            })
            if(dataList1[0][0] != that.yxzt1.data[0][0]){
              that.yxzt1 = {
                rowNum: 1,
                waitTime: 6000,
                oddRowBGC: 'rgba(0,0,0,0)',
                evenRowBGC: 'rgba(0,0,0,0)',
                data: dataList1,
                hoverPause: false
              };
            }
          }).catch(function(err){
            console.log(err);
          })

        // 核销信息
        axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getCheckVisitorInfo?enterpriseCode=TgsEpcDxswyy&ticketGroupNum=TGN20211021150501640')
          .then(function(res){
            var dataList = [];
            if(res.data.length < 6){
              for(var i = 1; i < 7; i++){
                if(i > res.data.length){
                  dataList.push(['--','--','--']);
                }
              }
            }else{
              res.data.forEach(function(value, key){
                var name = value.userName;
                name = name?name:'无';
                var checkTime = value.checkTime;
                checkTime = checkTime?checkTime:'无';
                var certNumber = value.certNumber;
                certNumber = certNumber.replace(/^(.{4})(?:\d+)(.{4})$/,"$1******$2");
                certNumber = certNumber?certNumber:'无';
                var dataItem = [
                  checkTime,
                  name,
                  certNumber
                ];
                dataList.push(dataItem);
              })
            }
            console.log(dataList[0][0])
            if(dataList[0][0] != that.lastEnter.data[0][0]){
              that.lastEnter = {
                header: ['时间', '姓名', '身份证'],
                headerHeight: 35,
                data: dataList,
                align: ['center','center','center'],
                columnWidth: [200, 100, 300],
                rowNum: 4
              }
            }
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
  .loginView{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #1370FB;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loginTitle{
    font-size: 16px;
    color: #333;
    font-weight: bold;
    width: 100%;
    line-height: 60px;
  }
  .loginContent{
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px 40px;
  }
  .loginItem{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
  }
  .loginItem p{
    flex: 0 0 50px;
    color: #333;
    font-size: 14px;
    text-align: center;
  }
  .loginItem input{
    flex: 1;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 5px;
    outline: none;
    font-size: 14px;
    color: #333;
    padding: 0 10px;
  }
  .loginBtn{
    width: 100%;
    display: block;
    text-decoration: none;
    color: #fff;
    background-color: #1370FB;
    text-align: center;
    line-height: 45px;
    border-radius: 5px;
  }

  .container{
    background: none;
    width: 1920px;
  }
  .nowDate{
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 14px;
    color: #fff;
  }
  .weather{
    position: absolute;
    left: 10px;
    bottom: 10px;
    font-size: 14px;
    color: #fff;
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
    font-size: 35px;
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
    height: 695px;
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
    height: 250px;
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

  .yksf{
    margin: 16px 0;
    height: 430px;
  }

  .rlqx{
    height: 230px;
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
    height: 250px;
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
    flex: 0 0 20%;
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

  .picView{
    height: 285px;
    margin-top: 10px;
  }

  /* 拓展模块 */
  .tzmk{
    height: 183px;
    background-color: rgba(0,0,0,.5);
  }

  .tzmkContent{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .tzmkContent p{
    flex: 0 0 33.33%;
    font-size: 16px;
    text-align: center;
    line-height: 60px;
    color: #fff;
  }

</style>
