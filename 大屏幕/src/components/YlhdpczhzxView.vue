<template>
  <div class="hello" :style="{background:url_back_img}" style="width: 100vw;height: 100vh;overflow: hidden;background-size: cover;">
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <div class="title">
          <p>云龙湖景区观光车运营调度中心</p>
        </div>
        <p class="updateTime">更新时间：{{updateTime}}</p>
      </div>
      <div class="contentView">
        <div class="topView">
          <!-- 左侧视图 -->
          <div class="leftView">
            <div class="left-top">
              <!-- 天气部分 -->
              <div class="marginRight">
                <dv-border-box-10>
                  <div class="weatherBox">
                    <div class="weatherView">
                      <p class="dateView">{{nowDate}}</p>
                      <!-- 今日天气 -->
                      <div class="nowWeather">
                        <div class="weatherTop">
                          <p class="nowTemp">{{weatherList.length>0?weatherList[0].temperature:'10℃'}}</p>
                          <div class="nowWeatherPic">
                             <img :src="weatherList.length>0?weatherList[0].picUrl:'http://smart-ideas.com.cn/ico2/b0.png'">
                          </div>
                        </div>
                        <div class="weatherBottom">
                          <div class="nowWeatherItem">
                            <p>今日天气</p>
                            <p class="nowWeatherText">{{weatherList.length>0?weatherList[0].weather:'晴'}}</p>
                          </div>
                          <div class="nowWeatherItem">
                            <p class="nowWindType">{{weatherList.length>0?weatherList[0].wind:'东'}}风</p>
                            <p class="nowWindLevel">{{weatherList.length>0?weatherList[0].windpower:'>2'}}级</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 预警部分 -->
                    <div class="paper">
                      <div class="paperContent">
                        <dv-scroll-board :config="paper" style="width:320px;height:160px;" />
                      </div>
                    </div>
                  </div>
                </dv-border-box-10>
              </div>

              <!-- 收入饼状图 -->
              <div class="marginRight">
                <dv-border-box-10>
                  <div class="linePercent">
                    <div class="lineIncome">
                      <p>电瓶车：{{dpcIncome}}元</p>
                      <p>自驾船：{{zjcIncome}}元</p>
                      <p>摆渡船：{{bdcIncome}}元</p>
                    </div>
                    <dv-active-ring-chart :config="linePercent" style="width:200px;height:200px;" />
                  </div>
                </dv-border-box-10>
              </div>
            </div>

            <div class="left-center">
              <!-- 站点售卡 -->
              <div class="marginRight">
                <dv-border-box-10>
                  <div class="zdIncome">
                    <div class="zdIncomeItem">
                      <p class="title">湖东线</p>
                      <dv-charts :option="zdsk1" style="width:710px;height:240px" />
                    </div>
                    <div class="zdIncomeItem">
                      <p class="title">湖西线</p>
                      <dv-charts :option="zdsk2" style="width:580px;height:240px" />
                    </div>
                  </div>
                </dv-border-box-10>
              </div>
            </div>


          </div>

          <!-- 右侧视图 -->
          <div class="rightView">
            <!-- 消息推送 -->
            <div>
              <dv-border-box-10>
                <div class="notice">
                    <p class="title">信息推送</p>
                    <div class="noticeContent">
                      <dv-scroll-board :config="xxts" style="width:550px;height:120px" />
                    </div>
                </div>
              </dv-border-box-10>
            </div>
            <!-- 收入统计 -->
            <div>
              <dv-border-box-10>
                <div class="income">
                  <div class="typeView">
                    <a href="javascript:;" class="typeItem" :class="{active:num=='0'}" @click="tab(0)">日统计</a>
                    <a href="javascript:;" class="typeItem" :class="{active:num=='1'}" @click="tab(1)">周统计</a>
                    <a href="javascript:;" class="typeItem" :class="{active:num=='2'}" @click="tab(2)">月统计</a>
                  </div>
                  <p class="totalIncome">总收入：{{num==0?dayIncome:num==1?weekIncome:monthIncome}}元</p>
                  <dv-charts :option="incomeData" style="width:555px;height:230px" v-show="num=='0'"/>
                  <dv-charts :option="incomeData1" style="width:555px;height:230px" v-show="num=='1'"/>
                  <dv-charts :option="incomeData2" style="width:555px;height:230px" v-show="num=='2'"/>
                </div>
              </dv-border-box-10>
            </div>
          </div>
        </div>

        <div class="bottomView">
          <div class="left-bottom">
            <!-- 路线图 -->
            <div>
              <dv-border-box-10>
                <div class="routeView">
                  <p class="title">车辆行驶位置</p>
                  <div class="routeItem">
                    <p class="routeName">湖东线</p>
                    <div class="routeList">
                      <p class="carSn" :class="{animate:item.animate,hidden:item.hidden}" :style="{'left': item.carDistance + 'px','top': item.top + 'px'}" v-for="(item, i) in hdCarPositions ">{{item.carSn}}</p>
                      <img class="carIcon" :class="{animate:item.animate,hidden:item.hidden}" :style="{'left': item.carDistance + 'px'}" :src="item.carIcon" v-for="(item, i) in hdCarPositions ">
                      <div class="line"></div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        滨湖公园东门
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('100') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        寿石广场
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('110') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        音乐厅
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('120') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        断桥码头
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('130') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        水族馆
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('130') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        天师岭瀑布
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('140') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        沉水廊道
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('150') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        古柏广场
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('150') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        苏公岛
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('150') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        小南湖
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('150') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        解忧桥
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('150') != -1">
                      </div>
                    </div>
                  </div>

                  <div class="routeItem">
                    <p class="routeName">湖西线</p>
                    <div class="routeList">
                      <p class="carSn" :class="{animate:item.animate,hidden:item.hidden}" :style="{'left': item.carDistance + 'px','top': item.top + 'px'}" v-for="(item, i) in hxCarPositions ">{{item.carSn}}</p>
                      <img class="carIcon" :class="{animate:item.animate,hidden:item.hidden}" :style="{'left': item.carDistance + 'px'}" :src="item.carIcon" v-for="(item, i) in hxCarPositions ">
                      <div class="line"></div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        音乐厅站
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('100') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        断桥码头站
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('110') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        水族馆站
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('120') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        好人园站
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('130') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        望湖阁站
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('140') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('151') != -1">
                      </div>
                      <div class="siteItem">
                        <img src="../assets/siteImg.png">
                        玉带路站
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('150') != -1">
                      </div>
                    </div>
                  </div>
                </div>
              </dv-border-box-10>
            </div>
          </div>

          <!-- 照片 -->
          <div class="picView">
            <dv-border-box-10>
              <div style="display: flex;justify-content: center;align-items: center;height:210px;width:100%;margin-top: 10px;">
                <dv-scroll-board :config="yxzt1" style="width:100%;height:170px;" />
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
  name: 'YlhdpczhzxView',
  data () {
    return {
      "yxzt1": {
        rowNum: 1,
        oddRowBGC: 'rgba(0,0,0,0)',
        evenRowBGC: 'rgba(0,0,0,0)',
        data: [
          ['--', '--']
        ],
        waitTime: 3000,
      },
      "updateTime": '',
      "xscale": 1,
      "yscale": 1,
      "zjcIncome": 0,
      "bdcIncome": 0,
      "dpcIncome": 0,
      "xwmDayMoney": 0,
      "xwmNightMoney": 0,
      "jfmMoney": 0,
      "oldPositon": [],  // 记录车辆前20秒位置
      "nhxList": [],     // 车辆当前位置
      "hxCarPositions": [],
      "hdCarPositions": [],
      "xhcList": [],
      "dayIncome": 0,
      "weekIncome": 0,
      "monthIncome": 0,
      "totalIncome": 0,
      "zdsk": {},
      "zdsk1": {},
      "zdsk2": {},
      "zdsk3": {},
      "carList": [],
      "linePercent": {
        radius: '60%',
        activeRadius: '65%',
        lineWidth: 15,
        digitalFlopStyle: {
          fontSize: 16
        }
      },
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
        data: [['<p style="font-size:13px;height: 35px;line-height:35px;padding-left: 10px;background-color:rgba(23,88,208,.6);">暂无异常状态</p>']]
      },
      "clhj": {
        rowNum: 5,
        oddRowBGC: 'rgba(0,0,0,0)',
        evenRowBGC: 'rgba(0,0,0,0)',
        data: []
      },
      "yxzt": {
        rowNum: 1,
        oddRowBGC: 'rgba(0,0,0,0)',
        evenRowBGC: 'rgba(0,0,0,0)',
        data: []
      },
      "incomeData": {},
      "incomeData1": {},
      "incomeData2": {}
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
    getDistance: function(currentId){
      var startId = 1;
      if(100 == currentId){
        currentId = 10;
      }else if(102 <= currentId && currentId < 110){
        currentId = currentId - 91;
      }else if(200 == currentId){
        currentId = 181;
      }else if(202 <= currentId && currentId < 211){
        currentId = currentId - 182;
      }else if(300 == currentId){
        currentId = 29;
      }else if(400 == currentId){
        currentId = 31;
      }else if(402 <= currentId && currentId < 411){
        currentId = currentId - 370;
      }else if(500 == currentId){
        currentId = 41;
      }else if(502 <= currentId && currentId < 505){
        currentId = currentId - 460;
      }else if(600 == currentId){
        currentId = 45;
      }else if(602 <= currentId && currentId < 606){
        currentId = currentId - 556;
      }else if(700 == currentId){
        currentId = 50;
      }else if(702 <= currentId && currentId < 710){
        currentId = currentId - 651;
      }else if(800 == currentId){
        currentId = 59;
      }else if(802 <= currentId && currentId < 807){
        currentId = currentId - 742;
      }else if(900 == currentId){
        currentId = 65;
      }else if(902 <= currentId && currentId < 904){
        currentId = currentId - 836;
      }else if(1000 == currentId){
        currentId = 68;
      }else if(10000 == currentId){
        currentId = 1;
      }else if(10002 <= currentId && currentId < 10014){
        currentId = currentId - 10000;
      }else if(11000 == currentId){
        currentId = 14;
      }else if(11002 <= currentId && currentId < 11010){
        currentId = currentId - 10987;
      }else if(12000 == currentId){
        currentId = 23;
      }else if(13000 <= currentId && currentId < 13011){
        currentId = currentId - 12976;
      }else if(14000 <= currentId && currentId < 14003){
        currentId = currentId - 13965;
      }else if(15000 <= currentId && currentId < 15003){
        currentId = currentId - 14962;
      }else if(16000 == currentId){
        currentId = 41;
      }
      var siteDistance = 1670 / ((document.getElementsByClassName('siteItem').length) - 1);
      console.log(siteDistance);
      var siteNumber = currentId - startId;
      return siteDistance * siteNumber + 35;
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
    var carPositions = [];
    var hxCarPositions = [];
    var seconds = 0;
    setInterval(function(){
      seconds += 1;
      if(seconds == 1 || seconds % 20 == 0){

          // 获取消息推送
          axios.get('http://rent.smart-ideas.com.cn/ylhpark/loopDataV/getOrderInfo')
            .then(function(res){
              var dataList = [];
              res.data.forEach(function(value, key){
                var siteName = value.siteName;
                var money = parseFloat(value.money).toFixed(2);
                var dataItem = ['<p style="font-size:18px;border-left: 5px solid #1953c8;height: 35px;line-height:35px;padding-left: 10px;background-color:rgba(23,88,208,.6);">'
                + value.payDate + siteName + '购'+ value.lineName +'票:' + money +
                '元</p>'];
                dataList.push(dataItem);
              })
              if(dataList[0] != that.xxts.data[0]){
                that.xxts = {
                  rowNum: 3,
                  oddRowBGC: 'rgba(0,0,0,0)',
                  evenRowBGC: 'rgba(0,0,0,0)',
                  data: dataList
                };
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
                  	itemString += value.siteName + value.printerName + '：缺纸\n';
                  }else if(value.status == '2'){
                  	itemString += value.siteName + value.printerName + '：纸将尽\n';
                  }else if(value.status == '3'){
                  	itemString += value.siteName + value.printerName + '：打开失败\n';
                  }else if(value.status == '4'){
                  	itemString += value.siteName + value.printerName + '：脱机\n';
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


          // 站点售票
          that.zdTab(1);
          that.zdTab(2);

          // 收入曲线
          let type;
          axios.get('http://rent.smart-ideas.com.cn/ylhpark/loopDataV/getIncome?lineId=1')
            .then(function(res){
              var nhxDayDataList = [];
              var nhxDayTimeList = [];
              var nhxWeekDataList = [];
              var nhxWeekTimeList = [];
              var nhxMonthDataList = [];
              var nhxMonthTimeList = [];
              var qlyDayDataList = [];
              var qlyDayTimeList = [];
              var qlyWeekDataList = [];
              var qlyWeekTimeList = [];
              var qlyMonthDataList = [];
              var qlyMonthTimeList = [];
              var xhcDayDataList = [];
              var xhcDayTimeList = [];
              var xhcWeekDataList = [];
              var xhcWeekTimeList = [];
              var xhcMonthDataList = [];
              var xhcMonthTimeList = [];
              var dayIncome = 0;
              var weekIncome = 0;
              var monthIncome = 0;
              res.data.forEach(function(value, key){
                if(value.key == 'now'){
                  value.data.forEach(function(dayItem, dayKey){
                    var incomeText = dayItem.income;
                    incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                    if(dayKey % 2 == 0){
                      nhxDayTimeList.push(dayItem.date);
                    }else{
                      nhxDayTimeList.push('');
                    }
                    nhxDayDataList.push(incomeText);
                    dayIncome += incomeText;
                  })
                }
                if(value.key == 'week'){
                  value.data.forEach(function(weekItem, dayKey){
                    var incomeText = weekItem.income;
                    incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                    weekIncome += incomeText;
                    var timeText = weekItem.date;
                    timeText = timeText.split('-')[1] + '-' + timeText.split('-')[2];
                    nhxWeekTimeList.push(timeText);
                    nhxWeekDataList.push(incomeText);
                  })
                }
                if(value.key == 'month'){
                  value.data.forEach(function(monthItem, dayKey){
                    var incomeText = monthItem.income;
                    incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                    monthIncome += incomeText;
                    var timeText = monthItem.date;
                    timeText = timeText.split('-')[1] + '-' + timeText.split('-')[2];
                    if(dayKey % 3 == 0){
                      nhxMonthTimeList.push(timeText);
                    }else{
                      nhxMonthTimeList.push('');
                    }
                    nhxMonthDataList.push(incomeText);
                  })
                }
              })
              axios.get('http://rent.smart-ideas.com.cn/ylhpark/loopDataV/getIncome?lineId=2')
                .then(function(qlyRes){
                  qlyRes.data.forEach(function(value, key){
                    if(value.key == 'now'){
                      value.data.forEach(function(dayItem, dayKey){
                        var incomeText = dayItem.income;
                        incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                        dayIncome += incomeText;
                        if(dayKey % 2 == 0){
                          qlyDayTimeList.push(dayItem.date);
                        }else{
                          qlyDayTimeList.push('');
                        }
                        qlyDayDataList.push(incomeText);
                      })
                    }
                    if(value.key == 'week'){
                      value.data.forEach(function(weekItem, dayKey){
                        var incomeText = weekItem.income;
                        incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                        weekIncome += incomeText;
                        var timeText = weekItem.date;
                        timeText = timeText.split('-')[1] + '-' + timeText.split('-')[2];
                        qlyWeekTimeList.push(timeText);
                        qlyWeekDataList.push(incomeText);
                      })
                    }
                    if(value.key == 'month'){
                      value.data.forEach(function(monthItem, dayKey){
                        var incomeText = monthItem.income;
                        incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                        monthIncome += incomeText;
                        var timeText = monthItem.date;
                        timeText = timeText.split('-')[1] + '-' + timeText.split('-')[2];
                        if(dayKey % 3 == 0){
                          qlyMonthTimeList.push(timeText);
                        }else{
                          qlyMonthTimeList.push('');
                        }
                        qlyMonthDataList.push(incomeText);
                      })
                    }
                  })

                  that.dayIncome = dayIncome;
                  that.weekIncome = weekIncome;
                  that.monthIncome = monthIncome;
                  that.incomeData = {
                    animation: false,
                    legend: {
                      data: [
                        {
                          name: '湖西线',
                          color: 'red'
                        },{
                          name: '湖东线',
                          color: 'yellow'
                        }
                      ],
                      textStyle: {
                        fill: '#fff',
                        fontSize: 12
                      }
                    },
                    xAxis: {
                      axisTick: {
                        show: true
                      },
                      data: nhxDayTimeList,
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
                          fontSize: 14,
                          rotate: 0
                        }
                      }
                    },
                    series: [
                      {
                        name: '湖东线',
                        data: qlyDayDataList,
                        stack: 'a',
                        type: 'line',
                        label: {
                          show: false,
                          formatter: '{value} 元',
                          style: {
                            fontSize: 14,
                            fill: '#F0E68C',
                          }
                        },
                        lineStyle: {
                          stroke: 'red',
                          lineWidth: 2
                        }
                      },
                      {
                        name: '湖西线',
                        data: nhxDayDataList,
                        stack: 'a',
                        type: 'line',
                        label: {
                          show: false,
                          formatter: '{value} 元',
                          style: {
                            fontSize: 14,
                            fill: 'yellow',
                          }
                        },
                        lineStyle: {
                          stroke: '#66CDAA',
                          lineWidth: 2
                        }
                      }
                    ],
                    grid: {
                      top: '20px',
                      left: '10px',
                      right: '0',
                      bottom: '25px'
                    }
                  };

                  that.incomeData1 = {
                    animation: false,
                    legend: {
                      data: [
                        {
                          name: '湖西线',
                          color: 'red'
                        },{
                          name: '湖东线',
                          color: 'yellow'
                        }
                      ],
                      textStyle: {
                        fill: '#fff',
                        fontSize: 12
                      }
                    },
                    xAxis: {
                      axisTick: {
                        show: true
                      },
                      data: nhxWeekTimeList,
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
                          fontSize: 14,
                          rotate: 0
                        }
                      }
                    },
                    series: [
                      {
                        name: '湖东线',
                        data: qlyWeekDataList,
                        stack: 'a',
                        type: 'line',
                        label: {
                          show: false,
                          formatter: '{value} 元',
                          style: {
                            fontSize: 14,
                            fill: '#F0E68C',
                          }
                        },
                        lineStyle: {
                          stroke: 'red',
                          lineWidth: 2
                        }
                      },
                      {
                        name: '湖西线',
                        data: nhxWeekDataList,
                        stack: 'a',
                        type: 'line',
                        label: {
                          show: false,
                          formatter: '{value} 元',
                          style: {
                            fontSize: 14,
                            fill: 'yellow',
                          }
                        },
                        lineStyle: {
                          stroke: '#66CDAA',
                          lineWidth: 2
                        }
                      }
                    ],
                    grid: {
                      top: '20px',
                      left: '10px',
                      right: '0',
                      bottom: '25px'
                    }
                  };

                  that.incomeData2 = {
                    animation: false,
                    legend: {
                      data: [
                        {
                          name: '湖西线',
                          color: 'red'
                        },{
                          name: '湖东线',
                          color: 'yellow'
                        }
                      ],
                      textStyle: {
                        fill: '#fff',
                        fontSize: 12
                      }
                    },
                    xAxis: {
                      axisTick: {
                        show: true
                      },
                      data: nhxMonthTimeList,
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
                          fontSize: 14,
                          rotate: 0
                        }
                      }
                    },
                    series: [
                      {
                        name: '湖东线',
                        data: qlyMonthDataList,
                        stack: 'a',
                        type: 'line',
                        label: {
                          show: false,
                          formatter: '{value} 元',
                          style: {
                            fontSize: 14,
                            fill: '#F0E68C',
                          }
                        },
                        lineStyle: {
                          stroke: 'red',
                          lineWidth: 2
                        }
                      },
                      {
                        name: '湖西线',
                        data: nhxMonthDataList,
                        stack: 'a',
                        type: 'line',
                        label: {
                          show: false,
                          formatter: '{value} 元',
                          style: {
                            fontSize: 14,
                            fill: 'yellow',
                          }
                        },
                        lineStyle: {
                          stroke: '#66CDAA',
                          lineWidth: 2
                        }
                      }
                    ],
                    grid: {
                      top: '20px',
                      left: '10px',
                      right: '0',
                      bottom: '25px'
                    }
                  };

                }).catch(function(err){
                  console.log(err);
                })

            }).catch(function(err){
              console.log(err);
            })



          // 获取卡尺位置
          axios.get('http://rent.smart-ideas.com.cn/ylhpark/loopDataV/getVehicleMountedLocation?lineId=1')
            .then(function(res){
              var carList = [];
              var snList = [];
              var idList = [];
              if(res.data.length > 0){
                res.data.forEach(function(value, key){
                  if(snList.indexOf(value.vehicleMountedSn) == -1){
                    snList.push(value.vehicleMountedSn);
                    carList.push(value);
                    idList.push(value.id + value.vehicleMountedSn);
                  }
                })
                if(carPositions.length == 0){
                  carList.forEach(function(value, key){
                    // 编号位置
                    var idTopList = idList.filter(function(val){
                      console.log(val);
                      val = val.toString().substring(0,3);
                      return val == value.id
                    });
                    var topSize = (idTopList.indexOf(value.id + value.vehicleMountedSn)) * 15 * -1 - 30;
                    var carDistance = that.getDistance(value.id);
                    var position = {
                      oldId: value.id,
                      currentId: value.id,
                      vehicleMountedSn: value.vehicleMountedSn,
                      carDistance: carDistance,
                      animate: false,
                      carIcon: carCurrent,
                      hidden: false,
                      carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3),
                      top: topSize
                    }
                    carPositions[key] = position;
                  })
                }else{
                  var nowSnList = [];
                  carPositions.forEach(function(value, key){
                    nowSnList[key] = value.vehicleMountedSn;
                  })

                  snList.forEach(function(value, key){
                    // 编号位置
                    var idTopList = idList.filter(function(val){
                      console.log(val);
                      val = val.toString().substring(0,3);
                      return val == carList[key].id
                    });
                    var topSize = (idTopList.indexOf(carList[key].id + carList[key].vehicleMountedSn)) * 15 * -1 -30;
                    if(nowSnList.indexOf(value) != -1){
                      var carDistance = that.getDistance(carList[key].id);
                      var carIcon;
                      if(carPositions[nowSnList.indexOf(value)].currentId == carList[key].id){
                        carIcon = carCurrent
                      }else if(carPositions[nowSnList.indexOf(value)].currentId < carList[key].id){
                        carIcon = carRight
                      }else{
                        carIcon = carLeft
                      }
                      var position = {};
                      if(carPositions[nowSnList.indexOf(value)].hidden){
                        // 丢失过GPS
                        position = {
                          oldId: carList[key].id,
                          currentId: carList[key].id,
                          vehicleMountedSn: carList[key].vehicleMountedSn,
                          carDistance: carDistance,
                          animate: false,
                          carIcon: carIcon,
                          hidden: false,
                          carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3),
                          top: topSize
                        }
                      }else{
                        position = {
                          oldId: carPositions[nowSnList.indexOf(value)].currentId,
                          currentId: carList[key].id,
                          vehicleMountedSn: carList[key].vehicleMountedSn,
                          carDistance: carDistance,
                          animate: true,
                          carIcon: carIcon,
                          hidden: false,
                          carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3),
                          top: topSize
                        }
                      }
                      carPositions[nowSnList.indexOf(value)] = position;
                    }else{
                      var carDistance = that.getDistance(carList[key].id);
                      var carIcon = carCurrent;
                      var position = {
                        oldId: carList[key].id,
                        currentId: carList[key].id,
                        vehicleMountedSn: carList[key].vehicleMountedSn,
                        carDistance: carDistance,
                        animate: false,
                        carIcon: carIcon,
                        hidden: false,
                        carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3),
                          top: topSize
                      }
                      carPositions.push(position);
                    }
                  })
                  nowSnList.forEach(function(value, key){
                    if(snList.indexOf(value) == -1){
                      carPositions[key].hidden = true;
                    }
                  })
                }
              }
              that.hdCarPositions = carPositions;
            }).catch(function(err){
              console.log(err);
            })

          axios.get('http://rent.smart-ideas.com.cn/ylhpark/loopDataV/getVehicleMountedLocation?lineId=2')
            .then(function(res){
              var carList = [];
              var snList = [];
              var idList = [];
              if(res.data.length > 0){
                res.data.forEach(function(value, key){
                  if(snList.indexOf(value.vehicleMountedSn) == -1){
                    snList.push(value.vehicleMountedSn);
                    carList.push(value);
                    idList.push(value.id + value.vehicleMountedSn);
                  }
                })
                if(carPositions.length == 0){
                  carList.forEach(function(value, key){
                    // 编号位置
                    var idTopList = idList.filter(function(val){
                      console.log(val);
                      val = val.toString().substring(0,3);
                      return val == value.id
                    });
                    var topSize = (idTopList.indexOf(value.id + value.vehicleMountedSn)) * 15 * -1 - 30;
                    var carDistance = that.getDistance(value.id);
                    var position = {
                      oldId: value.id,
                      currentId: value.id,
                      vehicleMountedSn: value.vehicleMountedSn,
                      carDistance: carDistance,
                      animate: false,
                      carIcon: carCurrent,
                      hidden: false,
                      carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3),
                      top: topSize
                    }
                    hxCarPositions[key] = position;
                  })
                }else{
                  var nowSnList = [];
                  hxCarPositions.forEach(function(value, key){
                    nowSnList[key] = value.vehicleMountedSn;
                  })

                  snList.forEach(function(value, key){
                    // 编号位置
                    var idTopList = idList.filter(function(val){
                      console.log(val);
                      val = val.toString().substring(0,3);
                      return val == carList[key].id
                    });
                    var topSize = (idTopList.indexOf(carList[key].id + carList[key].vehicleMountedSn)) * 15 * -1 -30;
                    if(nowSnList.indexOf(value) != -1){
                      var carDistance = that.getDistance(carList[key].id);
                      var carIcon;
                      if(hxCarPositions[nowSnList.indexOf(value)].currentId == carList[key].id){
                        carIcon = carCurrent
                      }else if(hxCarPositions[nowSnList.indexOf(value)].currentId < carList[key].id){
                        carIcon = carRight
                      }else{
                        carIcon = carLeft
                      }
                      var position = {};
                      if(hxCarPositions[nowSnList.indexOf(value)].hidden){
                        // 丢失过GPS
                        position = {
                          oldId: carList[key].id,
                          currentId: carList[key].id,
                          vehicleMountedSn: carList[key].vehicleMountedSn,
                          carDistance: carDistance,
                          animate: false,
                          carIcon: carIcon,
                          hidden: false,
                          carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3),
                          top: topSize
                        }
                      }else{
                        position = {
                          oldId: hxCarPositions[nowSnList.indexOf(value)].currentId,
                          currentId: carList[key].id,
                          vehicleMountedSn: carList[key].vehicleMountedSn,
                          carDistance: carDistance,
                          animate: true,
                          carIcon: carIcon,
                          hidden: false,
                          carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3),
                          top: topSize
                        }
                      }
                      hxCarPositions[nowSnList.indexOf(value)] = position;
                    }else{
                      var carDistance = that.getDistance(carList[key].id);
                      var carIcon = carCurrent;
                      var position = {
                        oldId: carList[key].id,
                        currentId: carList[key].id,
                        vehicleMountedSn: carList[key].vehicleMountedSn,
                        carDistance: carDistance,
                        animate: false,
                        carIcon: carIcon,
                        hidden: false,
                        carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3),
                          top: topSize
                      }
                      hxCarPositions.push(position);
                    }
                  })
                  nowSnList.forEach(function(value, key){
                    if(snList.indexOf(value) == -1){
                      hxCarPositions[key].hidden = true;
                    }
                  })
                }
              }
              that.hxCarPositions = hxCarPositions;
            }).catch(function(err){
              console.log(err);
            })

          // 获取照片
          axios.get('http://rent.smart-ideas.com.cn/ylhpark/loopDataV/getVehicleMountedInfo')
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
                var name0 = value[0].driverName;
                name0 = name0?name0:'无签到信息';
                var name1 = value[1].driverName;
                name1 = name1?name1:'无签到信息';
                var name2 = value[2].driverName;
                name2 = name2?name2:'无签到信息';
                var name3 = value[3].driverName;
                name3 = name3?name3:'无签到信息';
                var name4 = value[0].driverName;
                name4 = name4?name4:'无签到信息';
                var name5 = value[5].driverName;
                name5 = name5?name5:'无签到信息';
                var name6 = value[6].driverName;
                name6 = name6?name6:'无签到信息';
                var name7 = value[7].driverName;
                name7 = name7?name7:'无签到信息';
                var name8 = value[8].driverName;
                name8 = name8?name8:'无签到信息';
                var name9 = value[9].driverName;
                name9 = name9?name9:'无签到信息';
                var dataItem = [
                  '<div style="display:flex;justify-content:flex-start;align-items:flex-end;">'+
                  '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;"><img style="width:150px;height:130px;" src="'
                  + value[0].picUrl + '"></div><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">车号：'
                  + value[0].vehicleMountedSn + '</p><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">司机：'+ name0 + '</p></div>' +
                  '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:150px;height:130px;" src="'
                  + value[1].picUrl + '"></div><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">车号：'
                  + value[1].vehicleMountedSn + '</p><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">司机：'+ name1 + '</p></div>' +
                  '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:150px;height:130px;" src="'
                  + value[2].picUrl + '"></div><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">车号：'
                  + value[2].vehicleMountedSn + '</p><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">司机：'+ name2 + '</p></div>' +
                  '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:150px;height:130px;" src="'
                  + value[3].picUrl + '"></div><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">车号：'
                  + value[3].vehicleMountedSn + '</p><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">司机：'+ name3 + '</p></div>' +
                  '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:150px;height:130px;" src="'
                  + value[4].picUrl + '"></div><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">车号：'
                  + value[4].vehicleMountedSn + '</p><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">司机：'+ name4 + '</p></div>' +
                  '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:150px;height:130px;" src="'
                  + value[5].picUrl + '"></div><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">车号：'
                  + value[5].vehicleMountedSn + '</p><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">司机：'+ name5 + '</p></div>' +
                  '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:150px;height:130px;" src="'
                  + value[6].picUrl + '"></div><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">车号：'
                  + value[6].vehicleMountedSn + '</p><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">司机：'+ name6 + '</p></div>' +
                  '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:150px;height:130px;" src="'
                  + value[7].picUrl + '"></div><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">车号：'
                  + value[7].vehicleMountedSn + '</p><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">司机：'+ name7 + '</p></div>' +
                  '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-right: 10px;margin-bottom:10px;" ><img style="width:150px;height:130px;" src="'
                  + value[8].picUrl + '"></div><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">车号：'
                  + value[8].vehicleMountedSn + '</p><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">司机：'+ name8 + '</p></div>' +
                  '<div><div style="width:180px;display:flex;justify-content:center;align-items:center;margin-bottom:10px;"><img style="width:150px;height:130px;" src="'
                  + value[9].picUrl + '"></div><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">车号：'
                  + value[9].vehicleMountedSn + '</p><p style="height:15px;line-height:15px;font-size:13px;text-align:left;">司机：'+ name9 + '</p></div></div>',
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
              // 设置更新时间
              var nowDate = new Date();
              var nowYear = nowDate.getFullYear();
              var nowMonth = nowDate.getMonth();
              var nowDay = nowDate.getDate();
              var nowHour = nowDate.getHours();
              nowHour = nowHour>9?nowHour:'0'+nowHour;
              var nowMinutes = nowDate.getMinutes();
              nowMinutes = nowMinutes>9?nowMinutes:'0'+nowMinutes;
              var nowSeconds = nowDate.getSeconds();
              nowSeconds = nowSeconds>9?nowSeconds:'0'+nowSeconds;
              that.updateTime = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
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
  .updateTime{
    position: absolute;
    right: 0;
    top: 0;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    padding-right: 20px;
  }

  /* 内容部分 */
  .contentView{
    width: 100%;
    transform-origin: top center;
    padding: 10px;
  }
  .marginRight{
    margin-right: 10px;
  }
  .topView{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  /* 左侧试图 */
  .left-top{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 200px;
    width: 1310px;
  }

  /* 天气预报 */
  .weatherView{
    width: 380px;
    height: 200px;
    padding: 10px;
  }
  .weatherBox{
    display: flex;
    justify-content: start;
    align-items: flex-start;
  }
  .weatherView .dateView{
    font-size: 20px;
    color: #fff;
    padding-left: 40px;
    line-height: 30px;
    background: url(../assets/time-icon.png) no-repeat left center;
    background-size: 30px 30px;
  }
  .nowWeather{
    height: 145x;
    padding-top: 5px;
  }
  .weatherTop{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
  }
  .nowWeather .nowTemp{
    flex: 0 0 65%;
    font-size: 38px;
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
    width: 100%;
  }
  .weatherBottom{
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .nowWeather .nowWeatherItem{
    flex: 0 0 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #fff;
  }
  .nowWeather .nowWeatherItem p{
    letter-spacing: 3px;
    text-align: center;
  }

  /* 收入饼状图 */
  .linePercent{
    width: 580px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .linePercent .lineIncome{
    width: 300px;

  }
  .linePercent .lineIncome p{
    font-size: 20px;
    color: #fff;
    line-height: 45px;
    padding-left: 30px;
  }

  /* 消息推送 */
  .notice{
    width: 100%;
    height: 200px;
    padding: 10px;
  }
  .noticeContent{
    width: 100%;
    height: 195px;
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
    height: 310px;
    margin-top: 5px;
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
    width: 600px;
    height: 455px;
    position: relative;
    margin-top: -50px;
  }
  .paper{
    padding: 10px;
  }
  .paperContent{
    background-color: rgba(0, 0, 0, .3);
    padding: 10px 0;
    border-radius: 10px;
  }

  .left-bottom{
    width: 1900px;
    margin-top: 10px;
  }

  /* 车辆行驶位置 */
  .routeView{
    width: 100%;
    height: 240px;
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
    padding: 10px 0;
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
    padding: 0 45px;
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
    /* top: -30px; */
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
    white-space: nowrap;
    position: relative;
  }
  .siteItem .carIcon{
    position: absolute;
    width: 20px;
    top: -10px;
    left: -10px;
    transition: left 18s;
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

  /* 站点售卡 */
  .zdIncome{
    width: 100%;
    /* height: 305px; */
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .zdIncome .title{
    font-size: 23px;
    line-height: 40px;
    color: #fff;
    text-align: center;
  }



</style>
