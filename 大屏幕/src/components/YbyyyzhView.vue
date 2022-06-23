<template>
  <div class="hello">
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <p>北京园博园运营指挥平台</p>
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
                    <p>总客流量</p>
                    <dv-digital-flop :config="config1" style="width:200px;height:50px;" />
                  </div>
                  <div class="peopleItem">
                    <p>在园人数</p>
                    <dv-digital-flop :config="config2" style="width:200px;height:50px;" />
                  </div>
                </div>
                <div class="mqList">
                  <div class="mqItem">
                    <p>门区 \ <font>02</font></p>
                    <p>入园：<font class="inNumber">{{erIn}}</font></p>
                    <p>出园：<font class="outNumber">{{erOut}}</font></p>
                  </div>
                  <div class="mqItem">
                    <p>门区\<font>03</font></p>
                    <p>入园：<font class="inNumber">{{sanIn}}</font></p>
                    <p>出园：<font class="outNumber">{{sanOut}}</font></p>
                  </div>
                  <div class="mqItem">
                    <p>门区\<font>04</font></p>
                    <p>入园：<font class="inNumber">{{siIn}}</font></p>
                    <p>出园：<font class="outNumber">{{siOut}}</font></p>
                  </div>
                  <div class="mqItem">
                    <p>门区\<font>05</font></p>
                    <p>入园：<font class="inNumber">{{wuIn}}</font></p>
                    <p>出园：<font class="outNumber">{{wuOut}}</font></p>
                  </div>
                  <div class="mqItem">
                    <p>门区\<font>06</font></p>
                    <p>入园：<font class="inNumber">{{liuIn}}</font></p>
                    <p>出园：<font class="outNumber">{{liuOut}}</font></p>
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
                <div class="blContent">
                  <div class="bl">
                    <p class="title">游客男女比例</p>
                    <dv-active-ring-chart :config="bl" style="width:200px;height:200px" />
                  </div>
                  <div class="bl">
                    <p class="title">游客年龄比例</p>
                    <dv-active-ring-chart :config="nlBl" style="width:200px;height:200px" />
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
          <!-- 当日门票销售统计 -->
          <div class="mpxs">
            <dv-border-box-7>
              <p class="title">当日门票销售统计</p>
              <div class="mpxsContent">
                <dv-scroll-board :config="mpxsTxt" style="width:220px;height:208px" />
                <dv-active-ring-chart :config="mpxsPercent" style="width:220px;height:208px" />
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
              <p class="title">当日（自行车/电瓶车）销售汇总</p>
              <div class="mqContent">
                <div class="mqTxt">
                  <div class="bikeView">
                    <p>自行车</p>
                    <div class="incomeView">
                      <p>{{bikeTotal}}单</p>
                      <p>{{bikeIncome}}元</p>
                    </div>
                  </div>
                  <div class="bikeView">
                    <p>电瓶车电子票</p>
                    <div class="incomeView">
                      <p>{{cardTotal}}张</p>
                      <p>{{cardIncome}}元</p>
                    </div>
                  </div>
                </div>
                <div class="dpcView">
                  <p>电瓶车电子票务销售排名</p>
                  <dv-capsule-chart :config="dpcph" style="width:250px;height:180px" />
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
      bikeTotal: 0,
      bikeIncome: 0,
      cardTotal: 0,
      cardIncome: 0,
      dpcph: {},
      nlBl: {},
      mpxsTxt: {
        data: [
            ['现金票:', '0', '0'],
            ['H5票:', '0', '0'],
            ['POS票:', '0', '0'],
            ['电子票:', '0', '0'],
            ['免票:', '0', '0'],
            ['团体票:', '0', '0']
          ],
          rowNum: 6
      },
      mpxsPercent: {
        radius: '80%',
        activeRadius: '85%',
        data: [
          {
            name: '现金票',
            value: 1
          },
          {
            name: 'H5票',
            value: 1
          },
          {
            name: 'POS票',
            value: 1
          },
          {
            name: '电子票',
            value: 1
          },
          {
            name: '免票',
            value: 1
          },
          {
            name: '团体票',
            value: 1
          }
        ]
      },
      yksf: {},
      ykly: {},
      erIn: 0,
      erOut: 0,
      sanIn: 0,
      sanOut: 0,
      siIn: 0,
      siOut: 0,
      wuIn: 0,
      wuOut: 0,
      liuIn: 0,
      liuOut: 0,
      "nowDate": "2021-01-19 00:00:00",
      "nowPic": "",
      "xscale": 1,
      "yscale": 1,
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
      }
    }
  },
  mounted: function(){
    let that = this;
    let xScale = window.innerWidth / 1920;
    let yScale = window.innerHeight / 1080;
    that.xscale = xScale;
    that.yscale = yScale;
    let nowDateString;
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
      nowDateString = nowYear + '-' + nowMonth + '-' + nowDay;
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
        // 获取电瓶车售卡
        axios.get('https://smart-ideas.com.cn/yby/cardsOrderWeb/web/getIncome?startDate='+nowDateString+' 00:00:00&endDate='+nowDateString+' 23:59:59&id=34')
          .then(function(res){
            var cardTotal = 0;
            var cardIncome = 0;
            var card1 = 0;
            var card2 = 0;
            var card3 = 0;
            var card4 = 0;
            var card5 = 0;
            res.data.rows.forEach(function(value, key){
              cardTotal += item.adultQuantity * 1;
              cardIncome += item.tQuantity;
              if(item.hQuantity == '/SpEnGmdSSjn/CardTest1/update' || item.hQuantity == '/SpEnGmdSSjn/CardTest6/update'){
              	card1 += item.tQuantity * 1;
              }else if(item.hQuantity == '/SpEnGmdSSjn/CardTest2/update' || item.hQuantity == '/SpEnGmdSSjn/CardTest5/update'){
              	card2 += item.tQuantity * 1;
              }else if(item.hQuantity == '/SpEnGmdSSjn/CardTest3/update' || item.hQuantity == '/SpEnGmdSSjn/CardTest4/update'){
              	card3 += item.tQuantity * 1;
              }else if(item.hQuantity == '/SpEnGmdSSjn/CardTest7/update'){
              	card4 += item.tQuantity * 1;
              }else if(item.hQuantity == 'pos'){
              	card5 += item.tQuantity * 1;
              }
            })
            that.cardTotal = cardTotal;
            that.cardIncome = cardIncome;
            that.dpcph = {
                data: [
                  {
                    name: '紫薇园',
                    value: card1
                  },
                  {
                    name: '台湾园',
                    value: card2
                  },
                  {
                    name: '二号门',
                    value: card3
                  },
                  {
                    name: '六号门',
                    value: card4
                  },
                  {
                    name: '单次票',
                    value: card5
                  }
                ]
            }
          })
          .catch(function(err){
            console.log(err);
          })

        // 获取自行车
        axios.get('https://api.joybike.com.cn/ccsmart/dataV/getYbyBikeIncome?type=a')
          .then(function(res){
            that.bikeTotal = res.data[0].value;
          })
          .catch(function(err){
            console.log(err);
          })
        axios.get('https://api.joybike.com.cn/ccsmart/dataV/getYbyBikeIncome?type=b')
          .then(function(res){
            that.bikeIncome = parseFloat(res.data[0].value).toFixed(2);
          })
          .catch(function(err){
            console.log(err);
          })
        // 获取门票
        axios.get('https://iot.smart-ideas.com.cn/ybypark/ticketsDataV/getTicketsIncomeCollection?type=a')
          .then(function(res){

          })
          .catch(function(err){
            console.log(err);
          })

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
            that.erIn = res.data.erIn;
            that.erOut = res.data.erOut;
            that.sanIn = res.data.sanIn;
            that.sanOut = res.data.sanOut;
            that.siIn = res.data.siIn;
            that.siOut = res.data.siOut;
            that.wuIn = res.data.wuIn;
            that.wuOut = res.data.wuOut;
            that.liuIn = res.data.liuIn;
            that.liuOut = res.data.liuOut;
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

        axios.get('https://boss.smart-ideas.com.cn/ticketApi/orderView/getVisitorAgePercent?enterpriseCode=TgsEpcYby&ticketGroupNum=TGN20201210095942945')
         .then(function(res){
           that.nlBl = {
            radius: '80%',
            activeRadius: '85%',
            digitalFlopStyle: {
              fontSize: 20,
              fill: '#fff'
            },
            data: [
              {
                name: '20岁以下',
                value: parseInt(res.data[0].y)
              },
              {
                name: '20岁-30岁',
                value: parseInt(res.data[1].y)
              },
              {
                name: '30岁-40岁',
                value: parseInt(res.data[2].y)
              },
              {
                name: '40岁-50岁',
                value: parseInt(res.data[3].y)
              },
              {
                name: '50岁-60岁',
                value: parseInt(res.data[4].y)
              },
              {
                name: '60岁-70岁',
                value: parseInt(res.data[5].y)
              },
              {
                name: '70岁以上',
                value: parseInt(res.data[6].y)
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
                min: 0,
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
  }
  .peopleContent{
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 10px 0;
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
  }
  .mqList{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .mqList .mqItem{
    flex: 1;
    padding: 5px;
  }
  .mqList .mqItem p{
    font-size: 18px;
    color: #fff;
    line-height: 48.9px;
  }
  .mqList .mqItem p font{
    color: #1370FB;
    font-size: 24px;
  }
  .mqList .mqItem p .inNumber{
    color: #ADFF2F;
  }
  .mqList .mqItem p .outNumber{
    color: #fff;
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
  .mqry{
    width: 100%;
    height: 260px;
  }
  .mqContent{
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .mqContent>div{
    width: 200px;
    font-size: 20px;
    color: #fff;
  }
  .mqContent .dpcView{
    width: 300px;
  }
  .mqContent .dpcView p{
    font-size: 16px;
  }
  .incomeView{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 30px;
  }

  .bl{
    width: 230px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  /* 当日门票销售 */
  .mpxsContent{
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .blContent{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>
