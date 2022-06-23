<template>
  <div class="hello" :style="{background:url_back_img}"  style="width: 100%;height: 100vh;overflow: hidden;background-size: cover;">
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <p>什刹海游客大数据系统中心</p>
        <div class="dateView">
          {{nowDate}}&nbsp&nbsp&nbsp&nbsp&nbsp{{weatherList[0].weather}} {{weatherList[0].temperature}} {{weatherList[0].wind}}风：{{weatherList[0].windpower}}
        </div>
      </div>
      <div class="contentView">
        <!-- 左侧视图 -->
        <div class="leftView">
          <div class="leftContent">
            <!-- 入园人数 -->
            <div class="peopleView">
              <dv-border-box-7>
                <div class="peopleContent">
                  <div class="peopleItem">
                    <p>前海统计</p>
                    <div class="item-box">
                      <p>总检票数：</p>
                      <p class="numberTxt">{{qhTotal}}</p>
                    </div>
                    <div class="item-box">
                      <p>冰上人数：</p>
                      <p class="numberTxt zc">{{qhStay}}</p>
                    </div>
                  </div>
                  <div class="peopleItem">
                    <p>后海统计</p>
                    <div class="item-box">
                      <p>总检票数：</p>
                      <p class="numberTxt">{{hhTotal}}</p>
                    </div>
                    <div class="item-box">
                      <p>冰上人数：</p>
                      <p class="numberTxt zc">{{hhStay}}</p>
                    </div>
                  </div>
                </div>
              </dv-border-box-7>
            </div>

            <!-- 游客省份 -->
            <div class="yksf" style="overflow: hidden;">
              <dv-border-box-7>
                <p class="title" style="z-index: 999;position: relative;">游客省份</p>
                <iframe src="http://smart-ideas.com.cn/mapView/schYkzxMap2.html" style="width:122%;height:663px;border: none;margin-left: -12%;margin-top: -110px;"></iframe>
                <dv-scroll-board :config="yksf" style="width:200px;height:200px;position: absolute;right: 0;bottom: 0;z-index: 999;" />
              </dv-border-box-7>
            </div>

            <!-- 游客比例 -->
            <div class="zlqk">
              <dv-border-box-7>
                <p class="title">游客比例</p>
                <div class="blContent">
                  <div class="blItem">
                    <p>男女比例</p>
                    <dv-active-ring-chart :config="xbbl" style="width:150px;height:150px;margin: 0 auto;" />
                    <!-- <dv-active-ring-chart :config="config" style="width:150px;height:150px" /> -->
                  </div>
                  <div class="blItem">
                    <p>年龄比例</p>
                    <dv-active-ring-chart :config="nlbl" style="width:150px;height:150px;margin: 0 auto;" />
                  </div>
                </div>
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
              <p class="fzll">冰面峰值流量：<font>{{fzll}}</font> {{fzll=='当日未获取'?'':'获取时间：'}}<font>{{fzll=='当日未获取'?'':fzllDate}}</font></p>
              <dv-charts :option="klqx" style="width:100%;height:180px"/>
            </dv-border-box-7>
          </div>

          <!-- 每日客流量对比 -->
          <div class="kll" style="height: 430px;margin-top: 16px;">
            <dv-border-box-7>
              <p class="title" style="line-height: 30px;">每日客流量对比</p>
              <dv-charts :option="kll" style="width:600px;height:310px;margin: 0 auto;"/>
              <div class="weatherList" >
                <div class="weatherItem" v-for="(item, i) in lastWeather ">
                  <p>{{item.weather}}<img :src="item.picUrl"></p>
                  <p>{{item.temperature}}</p>
                  <p>{{item.wind?"风:"+item.windpower+"级":""}}</p>
                </div>
              </div>
            </dv-border-box-7>
          </div>

          <!-- 实时交通图 -->
          <div class="yksf" style="height: 260px;">
            <dv-border-box-7>
              <p class="title">实时交通图</p>
              <iframe src="http://smart-ideas.com.cn/mapView/schYkzxMap1.html" style="width:100%;height:205px;border: none;"></iframe>
            </dv-border-box-7>
          </div>

        </div>

        <!-- 右侧视图 -->
        <div class="rightView">
          <!-- 入园人数 -->
          <div class="peopleView">
            <dv-border-box-7>
              <div class="peopleContent ysContent">
                <div class="peopleItem">
                  <p>综合区预售统计</p>
                  <div class="item-box">
                    <p>预售库存：</p>
                    <p class="numberTxt">{{zhqTotal}}</p>
                  </div>
                  <div class="item-box">
                    <p>当日售票：</p>
                    <p class="numberTxt zc">{{zhqYs}}</p>
                  </div>
                  <div class="item-box">
                    <p>当日余量：</p>
                    <p class="numberTxt zc">{{zhqYl}}</p>
                  </div>
                </div>
                <div class="peopleItem">
                  <p>速滑区预售统计</p>
                  <div class="item-box">
                    <p>预售库存：</p>
                    <p class="numberTxt">{{shqTotal}}</p>
                  </div>
                  <div class="item-box">
                    <p>当日售票：</p>
                    <p class="numberTxt zc">{{shqYs}}</p>
                  </div>
                  <div class="item-box">
                    <p>当日余量：</p>
                    <p class="numberTxt zc">{{shqYl}}</p>
                  </div>
                </div>
              </div>
            </dv-border-box-7>
          </div>

          <!-- 游客来源情况 -->
          <div class="yksf">
            <dv-border-box-7>
              <p class="title">游客来源情况（北京市各辖区）</p>
              <iframe src="http://smart-ideas.com.cn/mapView/schYkzxMap3.html" style="width:100%;height:370px;border: none;"></iframe>
              <dv-scroll-board :config="ykly" style="width:200px;height:200px;position: absolute;right: 0;bottom: 0;" />
            </dv-border-box-7>
          </div>

          <!-- 检票情况 -->
          <div class="mqry">
            <dv-border-box-7>
              <p class="title">检票情况</p>
              <div class="mqContent">
                <dv-scroll-board :config="jpqk" style="width:100%;height:200px" />
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
  name: 'SchykzxView',
  data () {
    return {
      lastWeather: [],
      zhqTotal: 10000,
      shqTotal: 1500,
      zhqYs: 0,
      zhqYl: 0,
      shqYl: 0,
      shqYs: 0,
      xscale: 1,
      yscale: 1,
      url_back_img: "url("+require('../assets/bg.png')+") no-repeat left top #0e2a42",
      qhTotal: 0,
      qhStay: 0,
      hhTotal: 0,
      hhStay: 0,
      ykly: {
        data: [],
        rowNum: 5,
        oddRowBGC: 'rgba(0,0,0,.6)',
        evenRowBGC: 'rgba(0,0,0,.6)',
        carousel: 'page'
      },
      yksf: {
        data: [],
        rowNum: 5,
        oddRowBGC: 'rgba(0,0,0,.6)',
        evenRowBGC: 'rgba(0,0,0,.6)',
        carousel: 'page'
      },
      jpqk: {
        header: ['时间', '姓名', '身份证'],
        data: [
          ['2021-12-23 00:00:00','魏**','410521********0018'],
          ['-','-','-'],
          ['-','-','-'],
          ['-','-','-']
        ],
        columnWidth: [200, 100, 300],
        align: ['center','center','center'],
        rowNum: 4
      },
      xbbl: {
      },
      nlbl: {
      },
      "nowDate": "2021-01-19 00:00:00",
      "nowPic": "",
      "weatherList": [],
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
      fzll: '当日未获取'
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
      if(nowMinutes == '00'){
        axios.get('http://node.smart-ideas.com.cn:3001/datav/sch/getLastWeather')
          .then(function(res){
            that.lastWeather = res.data;
          }).catch(function(err){
            console.log(err);
          })
      }
    }, 1000)

    //获取天气情况
    axios.get('http://node.smart-ideas.com.cn:3001/datav/common/weather/v1/weatherInfo?city=110106')
      .then(function(res){
        that.weatherList = res.data;
      }).catch(function(err){
        console.log(err);
      })

    axios.get('http://node.smart-ideas.com.cn:3001/datav/sch/getLastWeather')
      .then(function(res){
        that.lastWeather = res.data;
      }).catch(function(err){
        console.log(err);
      })

    var seconds = 0;
    setInterval(function(){
      seconds += 1;
      if(seconds == 1 || seconds % 20 == 0){
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
        var currDate = nowYear + '-' + nowMonth + '-' + nowDay;
        var startDate = encodeURI(nowYear + '-' + nowMonth + '-' + nowDay + ' 00:00:00');
        var endDate = encodeURI(nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds);

        if(nowHour > 10){
          axios.get('http://node.smart-ideas.com.cn:3001/datav/sch/getIcePeople')
            .then(function(res){
              console.log(res);
              that.fzll = res.data.data.value;
              that.fzllDate = res.data.data.date
            })
            .catch(function(err){
              console.log(err);
            })
        }

        axios.get('http://boss.smart-ideas.com.cn/ticketApi/robotCollection/brakeData/get?enterpriseCode=TgsEpcSh&ticketGroupNum=TGN20211223142734998&startTime='+ startDate +'&endTime=' + endDate)
          .then(function(res){
            var dataList = res.data.data;
            dataList.forEach(function(value, key){
              if(value.categoryName.indexOf('前海') != -1){
                that.qhTotal = parseInt(value.inTotal);
              }else{
                that.hhTotal = parseInt(value.inTotal);
              }
              axios.get('http://node.smart-ideas.com.cn:3001/datav/sch/getOutPeopleInfo')
                .then(function(res){
                  var qhOut = res.data.qhOut?res.data.qhOut:0;
                  var hhOut = res.data.hhOut?res.data.hhOut:0;
                  if(that.qhTotal < qhOut){
                    qhOut = that.qhTotal;
                  }
                  if(that.hhTotal < hhOut){
                    hhOut = that.hhTotal;
                  }
                  that.qhStay = that.qhTotal - qhOut;
                  that.hhStay = that.hhTotal - hhOut;
                })
                .catch(function(err){
                  console.log(err);
                })
            })
          })
          .catch(function(err){
            console.log(err);
          })

        axios.get('http://boss.smart-ideas.com.cn/ticketApi/orderView/getTicketAppoint?enterpriseCode=TgsEpcSh&ticketGroupNum=TGN20211223142734998&today='+ currDate)
          .then(function(res){
            console.log(res);
            var dataList = res.data;
            var zhqYsTotal = 0;
            var shqYsTotal = 0;
            dataList.forEach(function(value, key){
              if(value.ticketName.indexOf('综合区') != -1){
                zhqYsTotal += parseInt(value.total);
              }else if(value.ticketName.indexOf('速滑区') != -1){
                shqYsTotal += parseInt(value.total);
              }
            })
            that.zhqYs = zhqYsTotal;
            that.shqYs = shqYsTotal;
            that.zhqYl = that.zhqTotal - zhqYsTotal;
            that.shqYl = that.shqTotal - shqYsTotal;
          })
          .catch(function(err){
            console.log(err);
          })


        // 获取游客省份
        axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getVisitorProvinceName?enterpriseCode=TgsEpcSh&ticketGroupNum=TGN20211223142734998')
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
        axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getVisitorCategoryName?enterpriseCode=TgsEpcSh&ticketGroupNum=TGN20211223142734998')
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
        axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getPassengerHourFlow?enterpriseCode=TgsEpcSh&ticketGroupNum=TGN20211223142734998')
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


        axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getVisitorSexPercent?enterpriseCode=TgsEpcSh&ticketGroupNum=TGN20211223142734998')
         .then(function(res){
           that.xbbl = {
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
            lineWidth: 10,
             digitalFlopStyle: {
               fontSize: 18
             }
          }
         })
         .catch(function(err){
           console.log(err);
         })

         // 年龄比例
         axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getVisitorAgePercent?enterpriseCode=TgsEpcSh&ticketGroupNum=TGN20211223142734998')
          .then(function(res){
            that.nlbl = {
             radius: '80%',
             activeRadius: '85%',
             data: [
               {
                 name: res.data[0].x,
                 value: parseInt(res.data[0].y)
               },
               {
                 name: res.data[1].x,
                 value: parseInt(res.data[1].y)
               },
               {
                 name: res.data[2].x,
                 value: parseInt(res.data[2].y)
               },
               {
                 name: res.data[3].x,
                 value: parseInt(res.data[3].y)
               },
               {
                 name: res.data[4].x,
                 value: parseInt(res.data[4].y)
               },
               {
                 name: res.data[5].x,
                 value: parseInt(res.data[5].y)
               }
             ],
             color: ['yellow', 'red'],
             lineWidth: 10,
             digitalFlopStyle: {
               fontSize: 18
             }
           }
          })
          .catch(function(err){
            console.log(err);
          })

         axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getPassengerDayFlow?enterpriseCode=TgsEpcSh&ticketGroupNum=TGN20211223142734998')
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
                min: 0,
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
                bottom: '10px',
                containLabel: true
              }
            };
          })
          .catch(function(err){
            console.log(err);
          })

        // 核销信息
        axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getCheckVisitorInfo?enterpriseCode=TgsEpcSh&ticketGroupNum=TGN20211223142734998')
          .then(function(res){
            var dataList = [];
            if(res.data.length < 5){
              for(var i = 1; i < 5; i++){
                if(i > res.data.length){
                  dataList.push(['--','--','--']);
                }
              }
            }else{
              res.data.forEach(function(value, key){
                var name = value.userName;
                name = name[0] + '**';
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
            if(dataList[0][0] != that.jpqk.data[0][0]){
              that.jpqk = {
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
  /* 标题 */
  .titleView{
    width: 1920px;
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
  .dateView{
    position: absolute;
    right: 10px;
    top: 0;
    color: #fff;
    font-size: 16px;
    line-height: 30px;
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
    /* height: 152px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .peopleContent .peopleItem p{
    font-size: 24px;
    color: #fff;
  }
  .peopleContent .peopleItem .item-box{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 20px;
    width: 100%;
    margin-top: 10px;
  }
  .peopleContent .peopleItem .item-box p{
    font-size: 16px;
    color: #fff;
    flex: 0 0 100px;
  }
  .peopleContent .peopleItem .item-box .numberTxt{
    font-size: 55px;
    font-weight: bold;
    color: blue;
    flex: 1;
  }
  .ysContent .peopleItem .item-box{
    margin-top: 5px;
    padding: 0 20px;
  }
  .ysContent .peopleItem .item-box .numberTxt{
    font-size: 46px;
  }
  .peopleContent .peopleItem .item-box .numberTxt.zc{
    color: #ADFF2F;
  }
  .yksf{
    margin: 16px 0;
    height: 430px;
  }

  .zlqk{
    width: 100%;
    height: 260px;
  }
  .blContent{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .blItem{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #fff;
  }
  .blItem p{
    line-height: 30px;
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

  .fzll{
    font-size: 16px;
    color: #fff;
    text-align: right;
    padding-right: 60px;
  }
  .fzll font{
    color: #ADFF2F;
  }

  .weatherList{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 600px;
    margin: 0 auto;
    padding: 0 60px;
    height: 65px;
    margin-top: 5px;
  }
  .weatherList .weatherItem{
    flex: 1;
    height: 65px;
    font-size: 12px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 20px;
  }
  .weatherList .weatherItem img{
    width: 20px;
  }
  .weatherList .weatherItem p{
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
    padding: 10px;
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
  .mqContent{
    padding: 0 10px 8px;
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
