<template>
  <div class="hello" :style="{background:url_back_img}" style="width: 100%;height: 100vh;overflow: hidden;background-size: cover;">
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <div class="logoView">
          <!-- <img src="../assets/xyyhLogo.png" > -->
        </div>
        <img src="../assets/titleBg1.png">
        <p>第29届中国北京种业大会数据中心</p>
      </div>
      <div class="contentView">
        <!-- 左侧视图 -->
        <div class="leftView">
          <div class="leftContent">
            <!-- 距离大会开始 -->
            <div class="lastTime">
              <dv-border-box-11 title="距大会开会还有">
                <div class="lastTimeContent">
                  <dv-digital-flop :config="khNumber" style="width:90%;height:100px;" />
                  <p class="dayTxt">天</p>
                </div>
              </dv-border-box-11>
            </div>
            <!-- 入园人数 -->
            <div class="peopleView">
              <div class="peopleContent">
                <dv-border-box-8>
                  <p class="title">参展企业</p>
                  <div class="peopleItem">
                    <dv-digital-flop :config="qyNumber" style="width:200px;height:60px;" />
                  </div>
                </dv-border-box-8>
              </div>
              <div class="peopleContent">
                <dv-border-box-8>
                  <p class="title">参展人数</p>
                  <div class="peopleItem">
                    <dv-digital-flop :config="personNumber" style="width:200px;height:60px;" />
                  </div>
                </dv-border-box-8>
              </div>
              <div class="peopleContent">
                <dv-border-box-8>
                  <p class="title">签到企业</p>
                  <div class="peopleItem">
                    <dv-digital-flop :config="qdqyNumber" style="width:200px;height:60px;" />
                  </div>
                </dv-border-box-8>
              </div>
              <div class="peopleContent">
                <dv-border-box-8>
                  <p class="title">签到人数</p>
                  <div class="peopleItem">
                    <dv-digital-flop :config="qdpersonNumber" style="width:200px;height:60px;" />
                  </div>
                </dv-border-box-8>
              </div>
            </div>

            <!-- 展位分布 -->
            <div class="zwView">
              <div class="title xkfTitle" style="z-index: 999;position: relative;"><img src="../assets/line.png"><p>特展/普展企业数量</p><img src="../assets/line.png"></div>
              <dv-charts :option="zws" style="width: 100%;height: 200px;"/>
            </div>

            <!-- 消息推送 -->
            <div class="xxts">
              <div class="title" style="z-index: 999;position: relative;"><img src="../assets/line.png"><p>消息推送</p><img src="../assets/line.png"></div>
              <dv-scroll-board :config="xxts" style="width:100%;height:270px" />
            </div>
          </div>
        </div>

        <!-- 中间视图 -->
        <div class="centerView">
          <!-- 省份 -->
          <div class="yksf" style="overflow: hidden;position: relative;">
            <div class="title xkfTitle" style="z-index: 999;position: relative;"><img src="../assets/line.png"><p>企业分布<br>（全国省份）</p><img src="../assets/line.png"></div>
            <div class="mapView">
              <iframe src="https://smart-ideas.com.cn/mapView/zzdhMap1.html" style="width:123%;height:923px;border: none;margin-left: -12%;margin-top: -208px;"></iframe>
            </div>
            <dv-scroll-board :config="yksf" style="width:160px;height:160px;position: absolute;right: 0;bottom: 0;z-index: 999;" />
          </div>
          <!-- 北京 -->
          <div class="yksf" style="overflow: hidden;position: relative;">
            <div class="title xkfTitle" style="z-index: 999;position: relative;"><img src="../assets/line.png"><p>企业分布<br>（北京市各辖区）</p><img src="../assets/line.png"></div>
            <div class="mapView">
              <iframe src="https://smart-ideas.com.cn/mapView/zzdhMap2.html" style="width:100%;height:630px;border: none;margin-top: -110px;"></iframe>
            </div>
            <dv-scroll-board :config="ykly" style="width:160px;height:160px;position: absolute;right: 0;bottom: 0;" />
          </div>
        </div>

        <!-- 右侧视图 -->
        <div class="rightView">
          <!-- 签到情况 -->
          <div class="qdView">
            <!-- 当日签到曲线 -->
            <div class="qdLine">
              <div class="title xkfTitle" style="z-index: 999;position: relative;"><img src="../assets/line.png"><p>当日游客签到曲线</p><img src="../assets/line.png"></div>
              <dv-charts :option="qdLine" style="width:100%;height: 230px;"/>
            </div>
          </div>

          <!-- 酒店 -->
          <div class="yyqk">
            <div class="title xkfTitle"><img src="../assets/line.png"><p>酒店预订情况</p><img src="../assets/line.png"></div>
            <div class="mqContent">
              <dv-scroll-board :config="jdLabel" style="width:350px;height:120px" />
              <div class="bl">
                <p class="title">预订比例</p>
                <dv-active-ring-chart :config="jd" style="width:110px;height:110px" />
              </div>
            </div>
          </div>

          <!-- 会议室 -->
          <div class="yyqk">
            <div class="title xkfTitle"><img src="../assets/line.png"><p>会议室预订情况</p><img src="../assets/line.png"></div>
            <div class="mqContent">
              <dv-scroll-board :config="hysLabel" style="width:350px;height:120px" />
              <div class="bl">
                <p class="title">预订比例</p>
                <dv-active-ring-chart :config="hys" style="width:110px;height:110px" />
              </div>
            </div>
          </div>

          <!-- 普通展位 -->
          <div class="yyqk">
            <div class="title xkfTitle"><img src="../assets/line.png"><p>普通展位预订情况</p><img src="../assets/line.png"></div>
            <div class="mqContent">
              <dv-scroll-board :config="ptLabel" style="width:350px;height:120px" />
              <div class="bl">
                <p class="title">预订比例</p>
                <dv-active-ring-chart :config="pt" style="width:110px;height:110px" />
              </div>
            </div>
          </div>

          <!-- 特展 -->
          <div class="yyqk">
            <div class="title xkfTitle"><img src="../assets/line.png"><p>特展展位预订情况</p><img src="../assets/line.png"></div>
            <div class="mqContent">
              <dv-scroll-board :config="tzLabel" style="width:350px;height:120px" />
              <div class="bl">
                <p class="title">预订比例</p>
                <dv-active-ring-chart :config="tz" style="width:110px;height:110px" />
              </div>
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
  name: 'zzdhView',
  data () {
    return {
      "qdqyNumber": {
        number: [0],
        content: '{nt}',
        style: {
          fontSize: 65,
          fill: 'yellow',
          fontWeight: 'bold'
        }
      },
      "qdpersonNumber": {
        number: [0],
        content: '{nt}',
        style: {
          fontSize: 65,
          fill: 'yellow',
          fontWeight: 'bold'
        }
      },
      "xxts": {
        rowNum: 6,
        oddRowBGC: 'rgba(0,0,0,0)',
        evenRowBGC: 'rgba(0,0,0,0)',
        data: [],
      },
      "qdLine": {
        xAxis: {
          data: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
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
            },
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
          },
          min: 0,
          max: 1000
        },
        series: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            type: 'line'
          }
        ],
        grid: {
          top: '7px',
          left: '10px',
          right: '10px',
          bottom: '15px'
        }
      },
      "zws": {},
      "url_back_img": "url("+require('../assets/zhzx-bg.jpg')+") no-repeat left top #000",
      "xscale": 1,
      "yscale": 1,
      "yksf": {},
      "nowDate": "2021-01-19 00:00:00",
      "nowPic": "",
      "weatherList": [],
      "ykly": {},
      "mqry": {
        header: ['<p style="text-align: center">房间号</p>', '<p style="text-align: center">预订状态</p>'],
        data: [
          ['<p style="text-align:center;">-</p>', '<p style="text-align:center;">-</p>'],
          ['<p style="text-align:center;">-</p>', '<p style="text-align:center;">-</p>'],
          ['<p style="text-align:center;">-</p>', '<p style="text-align:center;">-</p>']
        ],
        rowNum: 3
      },
      "kll": {},
      "syl": {},
      "bl": {
        radius: '80%',
        activeRadius: '85%',
        data: [
          {
            name: '已预订',
            value: parseInt(0)
          },
          {
            name: '未预订',
            value: parseInt(0)
          }
        ],
        color: ['yellow', 'red'],
        lineWidth: 10,
        digitalFlopStyle: {
          fontSize: 17
        },
        showOriginValue: true
      },
      "jd": {
        radius: '80%',
        activeRadius: '85%',
        data: [
          {
            name: '已预订',
            value: parseInt(0)
          },
          {
            name: '未预订',
            value: parseInt(568)
          }
        ],
        color: ['yellow', 'red'],
        lineWidth: 10,
        digitalFlopStyle: {
          fontSize: 17
        },
        showOriginValue: true
      },
      "hys": {
        radius: '80%',
        activeRadius: '85%',
        data: [
          {
            name: '已预订',
            value: parseInt(0)
          },
          {
            name: '未预订',
            value: parseInt(20)
          }
        ],
        color: ['yellow', 'red'],
        lineWidth: 10,
        digitalFlopStyle: {
          fontSize: 17
        },
        showOriginValue: true
      },
      "pt": {
        radius: '80%',
        activeRadius: '85%',
        data: [
          {
            name: '已预订',
            value: parseInt(0)
          },
          {
            name: '未预订',
            value: parseInt(401)
          }
        ],
        color: ['yellow', 'red'],
        lineWidth: 10,
        digitalFlopStyle: {
          fontSize: 17
        },
        showOriginValue: true
      },
      "tz": {
        radius: '80%',
        activeRadius: '85%',
        data: [
          {
            name: '已预订',
            value: parseInt(0)
          },
          {
            name: '未预订',
            value: parseInt(18)
          }
        ],
        color: ['yellow', 'red'],
        lineWidth: 10,
        digitalFlopStyle: {
          fontSize: 17
        },
        showOriginValue: true
      },
      "jdLabel": {
        header: ['<p style="text-align: center">房间号</p>', '<p style="text-align: center">预订状态</p>'],
        data: [],
        rowNum: 2
      },
      "hysLabel": {
        header: ['<p style="text-align: center">会议室</p>', '<p style="text-align: center">预订状态</p>'],
        data: [
          ['<p style="text-align:center;">-</p>', '<p style="text-align:center;">-</p>'],
          ['<p style="text-align:center;">-</p>', '<p style="text-align:center;">-</p>']
        ],
        rowNum: 2
      },
      "ptLabel": {
        header: ['<p style="text-align: center">展位号</p>', '<p style="text-align: center">预订状态</p>'],
        data: [],
        rowNum: 2
      },
      "tzLabel": {
        header: ['<p style="text-align: center">展位号</p>', '<p style="text-align: center">预订状态</p>'],
        data: [],
        rowNum: 2
      },
      "klqx": {},
      "option2": {},
      "option3": {},
      "option4": {},
      "option5": {},
      "option6": {},
      "qyNumber": {},
      "personNumber": {},
      "khNumber": {}
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
      var setTime = new Date('2021/10/18 00:00:00').getTime();
      var nowTime = new Date().getTime();
      var khNumber = parseInt((setTime - nowTime) / (60*60*24*1000));
      if(khNumber < 0){
        khNumber = 0;
      }
      that.khNumber = {
        number: [khNumber],
        content: '{nt}',
        style: {
          fontSize: 100,
          fill: 'red',
          fontWeight: 'bold'
        }
      }
    }, 1000)

    var seconds = 0;
    setInterval(function(){
      seconds += 1;
      if(seconds == 1 || seconds % 20 == 0){
        // 获取酒店预定情况
        axios.get('https://smart-ideas.com.cn/exhibition/dataView/getRoomDetail')
          .then(function(res){
            let dataList = res.data.data;
            let noSaleNumber = 0;
            let saleNumber = 0;
            let labelList = [];
            dataList.forEach(function(value, key){
              if(value.state == '1' || value.state == '8' || value.state == '2'){
                saleNumber += 1;
                let yyStatus;
                if(value.state == '1'){
                  yyStatus = '已支付';
                }else if(value.state == '2'){
                  yyStatus = '已预定';
                }else if(value.state == '8'){
                  yyStatus = '已锁定';
                }
                labelList.push(['<p style="text-align:center;">'+ value.roomNum +'</p>', '<p style="text-align:center;">'+ yyStatus +'</p>']);
              }else{
                noSaleNumber += 1;
              }
            });
            that.jd = {
              radius: '80%',
              activeRadius: '85%',
              data: [
                {
                  name: '已预订',
                  value: parseInt(saleNumber)
                },
                {
                  name: '未预订',
                  value: parseInt(noSaleNumber)
                }
              ],
              color: ['yellow', 'red'],
              lineWidth: 10,
              digitalFlopStyle: {
                fontSize: 17
              },
              showOriginValue: true
            };
            if(labelList.length == 0){
              labelList = [
                ['<p style="text-align:center;">-</p>', '<p style="text-align:center;">-</p>'],
                ['<p style="text-align:center;">-</p>', '<p style="text-align:center;">-</p>'],
                ['<p style="text-align:center;">-</p>', '<p style="text-align:center;">-</p>']]
            }
            if(that.jdLabel.data.length != labelList.length){
              that.jdLabel = {
                header: ['<p style="text-align: center">房间号</p>', '<p style="text-align: center">预订状态</p>'],
                data: labelList,
                rowNum: 2
              }
            }
          }).catch(function(err){
            console.log(err);
          })

        // 普通展位
        axios.get('https://smart-ideas.com.cn/exhibition/dataView/getBoothDetail?type=1')
          .then(function(res){
            let dataList = res.data.data;
            let noSaleNumber = 0;
            let saleNumber = 0;
            let labelList = [];
            dataList.forEach(function(value, key){
              if(value.state == '1' || value.state == '8' || value.state == '2'){
                saleNumber += 1;
                let yyStatus;
                if(value.state == '1'){
                  yyStatus = '已支付';
                }else if(value.state == '2'){
                  yyStatus = '已预定';
                }else if(value.state == '8'){
                  yyStatus = '已锁定';
                }
                labelList.push(['<p style="text-align:center;">'+ value.boothNum +'</p>', '<p style="text-align:center;">'+ yyStatus +'</p>']);
              }else{
                noSaleNumber += 1;
              }
            });
            that.pt = {
              radius: '80%',
              activeRadius: '85%',
              data: [
                {
                  name: '已预订',
                  value: parseInt(saleNumber)
                },
                {
                  name: '未预订',
                  value: parseInt(noSaleNumber)
                }
              ],
              color: ['yellow', 'red'],
              lineWidth: 10,
              digitalFlopStyle: {
                fontSize: 17
              },
              showOriginValue: true
            };
            if(labelList.length == 0){
              labelList = [
                ['<p style="text-align:center;">-</p>', '<p style="text-align:center;">-</p>'],
                ['<p style="text-align:center;">-</p>', '<p style="text-align:center;">-</p>'],
                ['<p style="text-align:center;">-</p>', '<p style="text-align:center;">-</p>']]
            }
            if(that.ptLabel.data.length != labelList.length){
              that.ptLabel = {
                header: ['<p style="text-align: center">展位号</p>', '<p style="text-align: center">预订状态</p>'],
                data: labelList,
                rowNum: 2
              }
            }
          }).catch(function(err){
            console.log(err);
          })

        // 特展展位
        axios.get('https://smart-ideas.com.cn/exhibition/dataView/getBoothDetail?type=2')
          .then(function(res){
            let dataList = res.data.data;
            let noSaleNumber = 0;
            let saleNumber = 0;
            let labelList = [];
            dataList.forEach(function(value, key){
              if(value.state == '1' || value.state == '8' || value.state == '2'){
                saleNumber += 1;
                let yyStatus;
                if(value.state == '1'){
                  yyStatus = '已支付';
                }else if(value.state == '2'){
                  yyStatus = '已预定';
                }else if(value.state == '8'){
                  yyStatus = '已锁定';
                }
                labelList.push(['<p style="text-align:center;">'+ value.boothNum +'</p>', '<p style="text-align:center;">'+ yyStatus +'</p>']);
              }else{
                noSaleNumber += 1;
              }
            });
            that.tz = {
              radius: '80%',
              activeRadius: '85%',
              data: [
                {
                  name: '已预订',
                  value: parseInt(saleNumber)
                },
                {
                  name: '未预订',
                  value: parseInt(noSaleNumber)
                }
              ],
              color: ['yellow', 'red'],
              lineWidth: 10,
              digitalFlopStyle: {
                fontSize: 17
              },
              showOriginValue: true
            };

            if(labelList.length == 0){
              labelList = [
                ['<p style="text-align:center;">-</p>', '<p style="text-align:center;">-</p>'],
                ['<p style="text-align:center;">-</p>', '<p style="text-align:center;">-</p>'],
                ['<p style="text-align:center;">-</p>', '<p style="text-align:center;">-</p>']]
            }

            if(that.tzLabel.data.length != labelList.length){
              that.tzLabel = {
                header: ['<p style="text-align: center">展位号</p>', '<p style="text-align: center">预订状态</p>'],
                data: labelList,
                rowNum: 2
              }
            }
          }).catch(function(err){
            console.log(err);
          })

        // 获取企业类别
        axios.get('https://smart-ideas.com.cn/exhibition/dataView/getBoothDistribution')
          .then(function(res){
            console.log(res.data.data[0]);
            that.zws = {
              grid: {
                left: 0,
                right: 0,
                top: 16,
                bottom: 25
              },
              xAxis: {
                  type: 'category',
                  data: ['特展企业', '普展企业'],
                  axisLine: {
                    show: false
                  },
                  axisLabel: {
                    style: {
                      fill: '#fff',
                      fontSize: '16'
                    }
                  }
              },
              yAxis: {
                  data: 'value',
                  interval: 1,
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    show: false
                  },
                  axisLine: {
                    show: false
                  },
                  min: 0,
                  max: '0%',
                  splitLine: {
                    show: false
                  }
              },
              series: [
                {
                  data: [parseInt(res.data.data[0].ttotal), parseInt(res.data.data[0].ptotal)],
                  type: 'bar',
                  barWidth: 40,
                  label: {
                    show: true,
                    position: 'top',
                    offset: [0, 0],
                    style: {
                      fill: '#ffffff',
                      fontSize: 18
                    },
                    offset: [0, -10]
                  },
                  gradient: {
                    color: ['rgba(255, 255, 0, .6)', 'rgba(255, 255, 0, .1)']
                  }
                },
              ]
            }
          }).catch(function(err){
            console.log(err);
          })

        // 获取游客省份
        axios.get('https://smart-ideas.com.cn/exhibition/dataView/getExhibitionDistribution')
          .then(function(res){
            let dataList = [];
            console.log(res.data);

            res.data.data.forEach(function(value, key){
              let dataItem = [];
              dataItem[0] = value.provincial;
              dataItem[1] = value.total;
              dataList.push(dataItem);
            })
            that.yksf = {
              data: dataList,
              rowNum: 4,
              oddRowBGC: 'rgba(0,0,0,.6)',
              evenRowBGC: 'rgba(0,0,0,.6)',
              carousel: 'page'
            };
          })
          .catch(function(err){
            console.log(err);
          })

        // 获取游客来源
        axios.get('https://smart-ideas.com.cn/exhibition/dataView/getExhibitionCounty')
          .then(function(res){

            let dataList = [];

            res.data.data.forEach(function(value, key){
              let dataItem = [];
              dataItem[0] = value.county;
              dataItem[1] = value.total;
              dataList.push(dataItem);
            })
            that.ykly = {
              data: dataList,
              rowNum: 4,
              oddRowBGC: 'rgba(0,0,0,.6)',
              evenRowBGC: 'rgba(0,0,0,.6)',
              carousel: 'page'
            };
          })
          .catch(function(err){
            console.log(err);
          })


        // 获取参展企业及人数
        axios.get('https://smart-ideas.com.cn/exhibition/dataView/getExhibitionCollect')
          .then(function(res){
            console.log(res);
            let qyNumber = res.data.data.total;
            let personNumber = res.data.data.personTotal;
            that.qyNumber = {
              number: [qyNumber],
              content: '{nt}',
              style: {
                fontSize: 65,
                fill: 'yellow',
                fontWeight: 'bold'
              }
            }
            that.personNumber = {
              number: [personNumber],
              content: '{nt}',
              style: {
                fontSize: 65,
                fill: 'yellow',
                fontWeight: 'bold'
              }
            }
          })
          .catch(function(err){
            console.log(err);
          })

        // 核销人数
        axios.get('https://smart-ideas.com.cn/exhibition/dataView/getCheckTotal')
          .then(function(res){
            console.log(res);
            let qyNumber = parseInt(res.data.data[0].companySignTotal);
            let personNumber = parseInt(res.data.data[0].visitorSignTotal);
            that.qdqyNumber = {
              number: [qyNumber],
              content: '{nt}',
              style: {
                fontSize: 65,
                fill: 'yellow',
                fontWeight: 'bold'
              }
            }
            that.qdpersonNumber = {
              number: [personNumber],
              content: '{nt}',
              style: {
                fontSize: 65,
                fill: 'yellow',
                fontWeight: 'bold'
              }
            }
          })
          .catch(function(err){
            console.log(err);
          })

        // 核销曲线
        axios.get('https://smart-ideas.com.cn/exhibition/dataView/getVisitorCheck')
          .then(function(res){
            let dataList = res.data.data;
            let timeList = [];
            let valueList = [];
            dataList.forEach(function(value, key){
              timeList.push(value.hour);
              valueList.push(value.number);
            })
            that.qdLine = {
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
                    fontSize: 14,
                    rotate: 0
                  },
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
                },
                min: 0,
                max: 1000
              },
              series: [
                {
                  data: valueList,
                  type: 'line'
                }
              ],
              grid: {
                top: '7px',
                left: '10px',
                right: '10px',
                bottom: '15px'
              }
            }
          })
          .catch(function(err){
            console.log(err);
          })

        // 消息推送
        axios.get('https://smart-ideas.com.cn/exhibition/dataView/getExhibitionPushInfo')
         .then(function(res){
           let msgList = res.data.data;
           let dataList = [];
           msgList.forEach(function(value, key){
             let dataItem = ['<p style="font-size:18px;border-left: 5px solid #1953c8;height: 35px;line-height:35px;padding-left: 10px;background-color:rgba(23,88,208,.6);">'+ value.createDate + ' ' + value.companyName +'注册成功</p>'];
             dataList.push(dataItem)
           })
           if(msgList.length != that.xxts.data.length){
             that.xxts = {
              rowNum: 4,
              oddRowBGC: 'rgba(0,0,0,0)',
              evenRowBGC: 'rgba(0,0,0,0)',
              data: dataList,
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
  .logoView{
    position: absolute;
    left: 20px;
    top: 15px;
    width: 270px;
    padding: 10px;
    background: rgba(255,255,255,.8);
    border-radius: 10px;
  }
  .titleView img{
    width: 100%;
  }
  .titleView p{
    position: absolute;
    color: #fff;
    font-size: 36px;
    /* font-weight: bold; */
    letter-spacing: 5px;
  }
  .title{
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #fff;
    line-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .xkfTitle{
    line-height: 25px;
  }
  .title p{
    margin: 0 10px;
  }
  .title img{
    width: 230px;
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
  /* 距离大会开始 */
  .lastTimeContent{
    width: 100%;
    padding: 70px 0 20px;
    position: relative;
  }
  .dayTxt{
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    font-size: 50px;
    line-height: 100px;
    margin-top: -25px;
    margin-left: 40px;
  }
  /* 在园人数 */
  .peopleView{
    width: 100%;
    /* height: 210px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 10px;
    width: 630px;
  }
  .peopleContent{
    width: 315px;
  }
  .peopleContent .title{
    line-height: 40px;
  }
  .peopleContent .peopleItem{
    flex: 1;
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
    height: 475px;
    margin-bottom: 15px;
  }
  .yksf .title{
    margin-bottom: 15px;
  }
  .yksf .mapView{
    height: 450px;
    overflow: hidden;
  }

  .zlqk{
    width: 100%;
    height: 260px;
  }

  /* 特展/普展企业数量 */
  .zwView{
    margin-top: 15px;
  }

  /* 消息推送 */
  .xxts{
    padding-left: 10px;
    margin-top: 15px;
  }
  .xxts .title{
    margin-bottom: 15px;
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

  .yyqk{
    height: 175px;
  }
  .mqry{
    width: 100%;
    height: 250px;
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
  .bl .title{
    line-height: 30px;
  }

  /* 签到情况 */
  .qdView .title{
    line-height: 50px;
  }
</style>
