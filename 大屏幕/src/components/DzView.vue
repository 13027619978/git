<template>
  <div class="hello">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <div class="title">
          <p>梧州市地质灾害监测预警系统平台</p>
        </div>
      </div>
      <div class="contentView">
        <!-- 左侧视图 -->
        <div class="leftView">
          <div class="leftContent">
            <dv-border-box-7>
              <!-- 退款详情 -->
              <div class="rightNotice">
                <p class="noticeTitle">预警情况</p>
                <dv-scroll-board :config="refundConfig" style="width:100%;height:350px;" ref="scrollBoard"/>
              </div>
              <!-- 地图部分 -->
              <div class="mapView">
                  <div class="iframeView">
                    <iframe src="http://smart-ideas.com.cn/mapView/dzmap.html" frameborder="0" width="515px" height="500px"></iframe>
                  </div>
              </div>
            </dv-border-box-7>
          </div>
        </div>

        <!-- 中间视图 -->
       <!-- <div class="centerView">

        </div> -->

        <!-- 右侧视图 -->
        <div class="rightView">
          <div class="rightContent">
            <dv-border-box-7>
              <!-- 退款详情 -->
              <div class="rightNotice">
                <!-- <dv-scroll-board :config="measuredValues" style="width:100%;height:790px" ref="scrollBoard1"/> -->
                <div class="rightItem">
                    <p class="noticeTitle">温度（单位：℃）</p>
                    <div class="item">
                      <div class="zhu">
                        <div class="jd"></div>
                        <div class="jd"></div>
                        <div class="jd"></div>
                      </div>
                      <div class="nodeItem">
                        <p class="nodeName">节点1</p>
                        <div class="chartItem">
                            <dv-charts :option="temp1"/>
                        </div>
                      </div>
                      <div class="nodeItem">
                        <p class="nodeName">节点2</p>
                        <div class="chartItem">
                            <dv-charts :option="temp2"/>
                        </div>
                      </div>
                      <div class="nodeItem">
                        <p class="nodeName">节点3</p>
                        <div class="chartItem">
                            <dv-charts :option="temp3"/>
                        </div>
                      </div>
                    </div>
                    <div class="dateView">
                      <p class="startDate">{{endDate}}</p>
                      <p class="endDate">{{startDate}}</p>
                    </div>
                </div>
                <div class="rightItem">
                    <p class="noticeTitle">含水量（单位：%）</p>
                    <div class="item">
                      <div class="zhu">
                        <div class="jd"></div>
                        <div class="jd"></div>
                        <div class="jd"></div>
                      </div>
                      <div class="nodeItem">
                        <p class="nodeName">节点1</p>
                        <div class="chartItem">
                            <dv-charts :option="water1"/>
                        </div>
                      </div>
                      <div class="nodeItem">
                        <p class="nodeName">节点2</p>
                        <div class="chartItem">
                            <dv-charts :option="water2"/>
                        </div>
                      </div>
                      <div class="nodeItem">
                        <p class="nodeName">节点3</p>
                        <div class="chartItem">
                            <dv-charts :option="water3"/>
                        </div>
                      </div>
                    </div>
                    <div class="dateView">
                      <p class="startDate">{{endDate}}</p>
                      <p class="endDate">{{startDate}}</p>
                    </div>
                </div>
                <div class="rightItem">
                    <p class="noticeTitle">俯仰/横滚角（单位：°）</p>
                    <div class="item">
                      <div class="zhu">
                        <div class="jd"></div>
                        <div class="jd"></div>
                        <div class="jd"></div>
                      </div>
                      <div class="nodeItem">
                        <p class="nodeName">节点1</p>
                        <div class="chartItem">
                            <dv-charts :option="py1"/>
                        </div>
                      </div>
                      <div class="nodeItem">
                        <p class="nodeName">节点2</p>
                        <div class="chartItem">
                            <dv-charts :option="py2"/>
                        </div>
                      </div>
                      <div class="nodeItem">
                        <p class="nodeName">节点3</p>
                        <div class="chartItem">
                            <dv-charts :option="py3"/>
                        </div>
                      </div>
                    </div>
                    <div class="dateView">
                      <p class="startDate">{{endDate}}</p>
                      <p class="endDate">{{startDate}}</p>
                    </div>
                </div>
              </div>
            </dv-border-box-7>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import QRCode from 'qrcode2';
export default {
  name: 'DzView',
  data () {
    return {
      "startDate": '',
      "endDate": '',
      "temp1": {},
      "temp2": {},
      "temp3": {},
      "water1": {},
      "water2": {},
      "water3": {},
      "py1": {},
      "py2": {},
      "py3": {},
      "config1": {
        number: [0],
        content: '{nt}',
        style: {
          fontSize: 120,
          fill: '#0aff4d',
          fontWeight: 'bold'
        }
      },
      "refundConfig": {
        header: [
          '<span style="height:43px;line-height:43px">时间</span>',
          '<span style="height:43px;line-height:43px">id</span>',
          '<span style="height:43px;line-height:43px">node</span>',
          '<span style="height:43px;line-height:43px">pitch</span>',
          '<span style="height:43px;line-height:43px">yaw</span>'
        ],
        headerHeight: 56,
        data: [
          ['-', '-', '-', '-', '-'],
          ['-', '-', '-', '-', '-'],
          ['-', '-', '-', '-', '-'],
          ['-', '-', '-', '-', '-'],
          ['-', '-', '-', '-', '-']
        ],
        rowNum: 5,
        align: ['center','center','center','center','center'],
        columnWidth: [200, 70, 70, 80, 80]
      }
    }
  },
  methods: {
    doUpdate () {
      var that = this;
      // 获取报警详情
      axios.get('http://node.smart-ideas.com.cn:3001/datav/dz/getWarningInfo')
        .then(function(res){
          var warningList = res.data.data;
          var dataList = [];
          warningList.forEach(function(value, key){
            if(Math.abs(value.pitch) >= 10000 || Math.abs(value.yaw) >= 10000){
              var newArr = [];
              var warningDate = new Date(value.time*1000);
              var warningYear = warningDate.getFullYear();
              var warningMonth = warningDate.getMonth() + 1;
              warningMonth = warningMonth>9?warningMonth:'0'+warningMonth;
              var warningDay = warningDate.getDate();
              warningDay = warningDay>9?warningDay:'0'+warningDay;
              var warningHour = warningDate.getHours();
              warningHour = warningHour>9?warningHour:'0'+warningHour;
              var warningMinutes = warningDate.getMinutes();
              warningMinutes = warningMinutes>9?warningMinutes:'0'+warningMinutes;
              var warningSeconds = warningDate.getSeconds();
              warningSeconds = warningSeconds>9?warningSeconds:'0'+warningSeconds;
              warningDate = warningYear+'-'+warningMonth+'-'+warningDay + ' '+warningHour+':'+warningMinutes+':'+warningSeconds;
              newArr[0] = warningDate;
              newArr[1] = value.id;
              newArr[2] = value.node;
              newArr[3] = value.pitch / 1000 + '°';
              newArr[4] = value.yaw / 1000 + '°';
              dataList.push(newArr);
            }
          })
          var newDataList = [];
          if(dataList.length == 0){
            dataList = [
              ['-', '-', '-', '-', '-'],
              ['-', '-', '-', '-', '-'],
              ['-', '-', '-', '-', '-'],
              ['-', '-', '-', '-', '-'],
              ['-', '-', '-', '-', '-']
            ]
          }else if(dataList.length <= 5){
            newDataList = dataList;
          }else{
            newDataList.push(dataList[dataList.length - 5]);
            newDataList.push(dataList[dataList.length - 4]);
            newDataList.push(dataList[dataList.length - 3]);
            newDataList.push(dataList[dataList.length - 2]);
            newDataList.push(dataList[dataList.length - 1]);
          }
          that.$refs['scrollBoard'].updateRows(newDataList)
        })
        .catch(function(err){
          console.log(err);
        })
    }
  },
  mounted: function(){
    let that = this;
    var seconds = 0;
    setInterval(function(){
      seconds += 1;
      if(seconds == 1 || seconds % 60 == 0){
        that.doUpdate();
        var nowDate = new Date();
        var nowYear = nowDate.getFullYear();
        var nowMonth = nowDate.getMonth() + 1;
        nowMonth = nowMonth>9?nowMonth:'0'+nowMonth;
        var nowDay = nowDate.getDate();
        nowDay = nowDay>9?nowDay:'0'+nowDay;
        var nowHour = nowDate.getHours();
        nowHour = nowHour>9?nowHour:'0'+nowHour;
        var nowMinutes = nowDate.getMinutes();
        nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
        var nowSeconds = nowDate.getSeconds();
        nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
        var startTime = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
        var endDate = new Date(new Date().getTime() - (60 * 20 * 1000));
        var endYear = endDate.getFullYear();
        var endMonth = endDate.getMonth() + 1;
        endMonth = endMonth>9?endMonth:'0'+endMonth;
        var endDay = endDate.getDate();
        endDay = endDay>9?endDay:'0'+endDay;
        var endHour = endDate.getHours();
        endHour = endHour>9?endHour:'0'+endHour;
        var endMinutes = endDate.getMinutes();
        endMinutes = endMinutes>9?endMinutes:'0'+endMinutes;
        var endSeconds = endDate.getSeconds();
        endSeconds = endSeconds>9?endSeconds:'0'+endSeconds;
        var endTime = endYear + '-' + endMonth + '-' + endDay + ' ' + endHour + ':' + endMinutes + ':' + endSeconds;
        that.startDate = startTime;
        that.endDate = endTime;
        // 获取使用记录
        axios.get('http://node.smart-ideas.com.cn:3001/datav/dz/measuredValues')
          .then(function(res){
            var infoList = res.data.data;
            var temList1 = [];
            var temList2 = [];
            var temList3 = [];
            var waterList1 = [];
            var waterList2 = [];
            var waterList3 = [];
            var yList1 = [];
            var yList2 = [];
            var yList3 = [];
            var pList1 = [];
            var pList2 = [];
            var pList3 = [];
            if(infoList && infoList.length > 0){
              infoList.forEach(function(value, key){
                // if(value.temp != -1 && value.waterContent != -1 && value.yaw != -1 && value.pitch != -1){
                //   if(value.node == '1'){
                //     temList1.push(value.temp / 10);
                //     waterList1.push(value.waterContent / 10);
                //     yList1.push(value.yaw / 1000);
                //     pList1.push(value.pitch / 1000);
                //   }else if(value.node == '2'){
                //     temList2.push(value.temp / 10);
                //     waterList2.push(value.waterContent / 10);
                //     yList2.push(value.yaw / 1000);
                //     pList2.push(value.pitch / 1000);
                //   }else if(value.node == '3'){
                //     temList3.push(value.temp / 10);
                //     waterList3.push(value.waterContent / 10);
                //     yList3.push(value.yaw / 1000);
                //     pList3.push(value.pitch / 1000);
                //   }
                // }
                if(value.node == '1'){
                  temList1.push(value.temp / 10);
                  waterList1.push(value.waterContent / 10);
                  yList1.push(value.yaw / 1000);
                  pList1.push(value.pitch / 1000);
                }else if(value.node == '2'){
                  temList2.push(value.temp / 10);
                  waterList2.push(value.waterContent / 10);
                  yList2.push(value.yaw / 1000);
                  pList2.push(value.pitch / 1000);
                }else if(value.node == '3'){
                  temList3.push(value.temp / 10);
                  waterList3.push(value.waterContent / 10);
                  yList3.push(value.yaw / 1000);
                  pList3.push(value.pitch / 1000);
                }
              })
            }
            var newArr = [];
            temList1.forEach(function(value, key){
              if(key % 2 == 0){
                newArr.push(value);
              }
            })
            temList1 = newArr;

            var newArr = [];
            temList2.forEach(function(value, key){
              if(key % 2 == 0){
                newArr.push(value);
              }
            })
            temList2 = newArr;

            var newArr = [];
            temList3.forEach(function(value, key){
              if(key % 2 == 0){
                newArr.push(value);
              }
            })
            temList3 = newArr;

            var newArr = [];
            waterList1.forEach(function(value, key){
              if(key % 2 == 0){
                newArr.push(value);
              }
            })
            waterList1 = newArr;

            var newArr = [];
            waterList2.forEach(function(value, key){
              if(key % 2 == 0){
                newArr.push(value);
              }
            })
            waterList2 = newArr;

            var newArr = [];
            waterList3.forEach(function(value, key){
              if(key % 2 == 0){
                newArr.push(value);
              }
            })
            waterList3 = newArr;

            var newArr = [];
            yList1.forEach(function(value, key){
              if(key % 2 == 0){
                newArr.push(value);
              }
            })
            yList1 = newArr;

            var newArr = [];
            yList2.forEach(function(value, key){
              if(key % 2 == 0){
                newArr.push(value);
              }
            })
            yList2 = newArr;

            var newArr = [];
            yList3.forEach(function(value, key){
              if(key % 2 == 0){
                newArr.push(value);
              }
            })
            yList3 = newArr;

            var newArr = [];
            pList1.forEach(function(value, key){
              if(key % 2 == 0){
                newArr.push(value);
              }
            })
            pList1 = newArr;

            var newArr = [];
            pList2.forEach(function(value, key){
              if(key % 2 == 0){
                newArr.push(value);
              }
            })
            pList2 = newArr;

            var newArr = [];
            pList3.forEach(function(value, key){
              if(key % 2 == 0){
                newArr.push(value);
              }
            })
            pList3 = newArr;

            if(temList1.length > 3){
              // 温度赋值
              that.temp1 = {
                xAxis: {
                  name: '节点1',
                  data: temList1,
                  splitLine: {
                    show: false
                  }
                },
                yAxis: {
                  name: '温度',
                  data: 'value',
                  splitNumber: 2,
                  splitLine: {
                    show: false
                  }
                },
                series: [
                  {
                    data: temList1,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                      stroke: '#fff'
                    },
                    label: {
                      show: true,
                      formatter: '{value}℃',
                      position: 'bottom',
                      style: {
                        fontSize: 14,
                        stroke: '#fff'
                      }
                    }
                  }
                ],
                grid: {
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0"
                }
              };
            }


            if(temList2.length > 3){
              that.temp2 = {
                xAxis: {
                  name: '节点2',
                  data: temList2,
                  splitLine: {
                    show: false
                  }
                },
                yAxis: {
                  name: '温度',
                  data: 'value',
                  splitNumber: 2,
                  splitLine: {
                    show: false
                  }
                },
                series: [
                  {
                    data: temList2,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                      stroke: '#fff'
                    },
                    label: {
                      show: true,
                      formatter: '{value}℃',
                      position: 'bottom',
                      style: {
                        fontSize: 14,
                        stroke: '#fff'
                      }

                    }
                  }
                ],
                grid: {
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0"
                }
              };
            }

            if(temList3.length > 3){
              that.temp3 = {
                xAxis: {
                  name: '节点3',
                  data: temList3,
                  splitLine: {
                    show: false
                  }
                },
                yAxis: {
                  name: '温度',
                  data: 'value',
                  splitNumber: 2,
                  splitLine: {
                    show: false
                  }
                },
                series: [
                  {
                    data: temList3,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                      stroke: '#fff'
                    },
                    label: {
                      show: true,
                      formatter: '{value}℃',
                      position: 'bottom',
                      style: {
                        fontSize: 14,
                        stroke: '#fff'
                      }
                    }
                  }
                ],
                grid: {
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0"
                }
              };
            }

            if(waterList1.length > 3){
              // 湿度赋值
              that.water1 = {
                xAxis: {
                  name: '节点1',
                  data: waterList1,
                  splitLine: {
                    show: false
                  }
                },
                yAxis: {
                  name: '湿度',
                  data: 'value',
                  splitNumber: 2,
                  splitLine: {
                    show: false
                  }
                },
                series: [
                  {
                    data: waterList1,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                      stroke: '#fff'
                    },
                    label: {
                      show: true,
                      formatter: '{value}%',
                      position: 'bottom',
                      style: {
                        fontSize: 14,
                        stroke: '#fff'
                      }
                    }
                  }
                ],
                grid: {
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0"
                }
              };
            }

            if(waterList2.length > 3){
              that.water2 = {
                xAxis: {
                  name: '节点2',
                  data: waterList2,
                  splitLine: {
                    show: false
                  }
                },
                yAxis: {
                  name: '湿度',
                  data: 'value',
                  splitNumber: 2,
                  splitLine: {
                    show: false
                  }
                },
                series: [
                  {
                    data: waterList2,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                      stroke: '#fff'
                    },
                    label: {
                      show: true,
                      formatter: '{value}%',
                      position: 'bottom',
                      style: {
                        fontSize: 14,
                        stroke: '#fff'
                      }
                    }
                  }
                ],
                grid: {
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0"
                }
              };
            }

            if(waterList3.length > 3){
              that.water3 = {
                xAxis: {
                  name: '节点3',
                  data: waterList3,
                  splitLine: {
                    show: false
                  }
                },
                yAxis: {
                  name: '湿度',
                  data: 'value',
                  splitNumber: 2,
                  splitLine: {
                    show: false
                  }
                },
                series: [
                  {
                    data: waterList3,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                      stroke: '#fff'
                    },
                    label: {
                      show: true,
                      formatter: '{value}%',
                      position: 'bottom',
                      style: {
                        fontSize: 14,
                        stroke: '#fff'
                      }
                    }
                  }
                ],
                grid: {
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0"
                }
              };
            }


            // p/y赋值
            if(yList1.length > 3 && pList1.length > 3){
              that.py1 = {
                xAxis: {
                  name: '节点1',
                  data: yList1
                },
                legend: {
                  data: ['Y', 'P']
                },
                yAxis: {
                  name: '温度',
                  data: 'value',
                  splitNumber: 2,
                  splitLine: {
                    show: false
                  }
                },
                series: [
                  {
                    name: 'Y',
                    data: yList1,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                      stroke: "#0000FF",
                    },
                    label: {
                      show: true,
                      formatter: '{value}°',
                      style: {
                        fontSize: 14,
                        stroke: '#fff'
                      }
                    }
                  },
                  {
                    name: 'P',
                    data: pList1,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                      stroke: "#FFFF00",
                    },
                    label: {
                      show: true,
                      formatter: '{value}°',
                      position: 'bottom',
                      style: {
                        fontSize: 14,
                        stroke: '#fff'
                      }
                    }
                  }
                ],
                grid: {
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0"
                }
              }
            }

            if(yList2.length > 3 && pList2.length > 3){
              that.py2 = {
                xAxis: {
                  name: '节点2',
                  data: yList2
                },
                legend: {
                  data: ['Y', 'P']
                },
                yAxis: {
                  name: '温度',
                  data: 'value',
                  splitNumber: 2,
                  splitLine: {
                    show: false
                  }
                },
                series: [
                  {
                    name: 'Y',
                    data: yList2,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                      stroke: "#0000FF",
                    },
                    label: {
                      show: true,
                      formatter: '{value}°',
                      style: {
                        fontSize: 14,
                        stroke: '#fff'
                      }
                    }
                  },
                  {
                    name: 'P',
                    data: pList2,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                      stroke: "#FFFF00",
                    },
                    label: {
                      show: true,
                      formatter: '{value}°',
                      position: 'bottom',
                      style: {
                        fontSize: 14,
                        stroke: '#fff'
                      }
                    }
                  }
                ],
                grid: {
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0"
                }
              }
            }


            if(yList3.length > 3 && pList3.length > 3){
              that.py3 = {
                xAxis: {
                  data: yList3
                },
                legend: {
                  data: ['Y', 'P']
                },
                yAxis: {
                  name: '温度',
                  data: 'value',
                  splitNumber: 2,
                  splitLine: {
                    show: false
                  }
                },
                series: [
                  {
                    name: 'Y',
                    data: yList3,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                      stroke: "#0000FF",
                    },
                    label: {
                      show: true,
                      formatter: '{value}°',
                      style: {
                        fontSize: 14,
                        stroke: '#fff'
                      }
                    }
                  },
                  {
                    name: 'P',
                    data: pList3,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                      stroke: "#FFFF00",
                    },
                    label: {
                      show: true,
                      formatter: '{value}°',
                      position: 'bottom',
                      offset: [10, -10],
                      style: {
                        fontSize: 14,
                        stroke: '#fff'
                      },
                      positon: 'center'
                    }
                  }
                ],
                grid: {
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0"
                }
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
  .hello{
    background: url(../assets/bg.png) no-repeat left top;
    background-size: cover;
  }
  .container{
    padding: 0 60px 60px 70px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  /* 标题 */
  .titleView{
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
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
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: nowrap;
    margin-top: 40px;
    transform: scale(.95, .85);
    transform-origin: top center;
  }
  /* 左侧试图 */
  .leftView{
    width: 600px;
    height: 1040px;
    position: relative;
  }
  .leftContent{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  /* 退款详情 */
  .noticeTitle{
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 30px;
  }
  .rightNotice{
    width: 100%;
    padding: 40px;
  }

  /* 中间视图 */
  .centerView{
    width: 600px;
    height: 950px;
    margin-left: 40px;
    margin-right: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .mapView{
    width: 600px;
    height: 540px;
    margin: 0 auto;
    overflow: hidden;
  }
  .iframeView{
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 右侧视图 */
  .rightView{
    margin-left: 40px;
    width: 1200px;
    height: 1040px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
  }
  .rightContent{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .rightItem{
    margin: 10px;
  }
  .item{
    margin-bottom: 10px;
    position: relative;
    padding-left: 20px;
  }
  .item .zhu{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 20px;
    background-color: #a5a5a5;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .item .zhu .jd{
    width: 100%;
    height: 20px;
    background-color: #ffc000;
  }
  .chartItem{
    height: 65px;
    flex: 1;
  }
  .nodeItem{
    display: flex;
    justify-content: start;
    align-items: center;
    border-bottom: 1px solid #fff;
    padding-bottom: 5px;
  }
  .nodeItem .nodeName{
    flex: 0 0 100px;
    font-size: 18px;
    color: #fff;
    text-align: center;
  }
  .dateView{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #fff;
    padding-left: 110px;
    height: 25px;
  }
  .dateView p{
    line-height: 25px;
  }

</style>
