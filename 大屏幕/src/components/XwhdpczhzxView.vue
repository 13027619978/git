<template>
  <div class="hello" :style="{background:url_back_img}" style="width: 100vw;height: 100vh;overflow: hidden;background-size: cover;">
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <div class="title">
          <p>玄武湖景区观光车运营调度中心</p>
        </div>
      </div>
      <div class="contentView">
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
                      <dv-scroll-board :config="paper" style="width:320px;height:215px;" />
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
                    <p>观光小火车票：{{xhcMoney}}元</p>
                    <p>内环线10元票：{{nhTenMoney}}元</p>
                    <p>内环线40元票：{{nhFortyMoney}}元</p>
                    <p>外环玄武门日：{{xwmDayMoney}}元</p>
                    <p>外环玄武门夜：{{xwmNightMoney}}元</p>
                    <p>外环解放门票：{{jfmMoney}}元</p>
                  </div>
                  <dv-active-ring-chart :config="linePercent" style="width:255px;height:255px;" />
                </div>
              </dv-border-box-10>
            </div>
          </div>

          <div class="left-center">
            <!-- 站点售卡 -->
            <div class="marginRight">
              <dv-border-box-10>
                <div class="zdIncome">
                  <div class="typeView">
                    <a href="javascript:;" class="typeItem" :class="{active:zdNum=='1'}" @click="zdTab(1)">内环线</a>
                    <a href="javascript:;" class="typeItem" :class="{active:zdNum=='3'}" @click="zdTab(3)">玄武门线</a>
                    <a href="javascript:;" class="typeItem" :class="{active:zdNum=='4'}" @click="zdTab(4)">解放门线</a>
                    <a href="javascript:;" class="typeItem" :class="{active:zdNum=='2'}" @click="zdTab(2)">小火车</a>
                  </div>
                  <dv-charts :option="zdsk" style="width:700px;height:330px" />
                </div>
              </dv-border-box-10>
            </div>

            <!-- 地图 -->
            <div class="mapView">

              <iframe src="http://smart-ideas.com.cn/mapView/xwhdpczhzxmap1.html" style="width:100%;height:400px;"></iframe>
            </div>
          </div>

          <div class="left-bottom">
            <!-- 路线图 -->
            <div>
              <dv-border-box-10>
                <div class="routeView">
                  <p class="title">车辆行驶位置</p>
                  <div class="routeItem">
                    <p class="routeName">内环线</p>
                    <div class="routeList">
                      <p class="carSn" :class="{animate:item.animate,hidden:item.hidden}" :style="{'left': item.carDistance + 'px'}" v-for="(item, i) in nhCarPositions ">{{item.carSn}}</p>
                      <img class="carIcon" :class="{animate:item.animate,hidden:item.hidden}" :style="{'left': item.carDistance + 'px'}" :src="item.carIcon" v-for="(item, i) in nhCarPositions ">
                      <div class="line"></div>
                      <div class="siteItem nhItem">
                        <img src="../assets/siteImg.png">
                        樱洲
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('16') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('17') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('18') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('19') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('20') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('21') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('22') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('23') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img src="../assets/siteImg.png">
                        白苑
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('24') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('25') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('26') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img src="../assets/siteImg.png">
                        梁洲
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('40') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('41') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('42') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img src="../assets/siteImg.png">
                        蒲仙岛
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('50') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('51') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('52') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img src="../assets/siteImg.png">
                        莲花广场
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('60') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('61') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('62') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('63') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img src="../assets/siteImg.png">
                        假山瀑布
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('70') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('71') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('72') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('73') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('74') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img src="../assets/siteImg.png">
                        月季园
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('80') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('82') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('83') != -1">
                      </div>
                      <div class="siteItem nhItem">
                        <img src="../assets/siteImg.png">
                        菱洲
                        <img class="carIcon" src="../assets/car-icon.png" v-show="nhxList.indexOf('90') != -1">
                      </div>
                    </div>
                  </div>

                  <div class="routeItem">
                    <p class="routeName">小火车</p>
                    <div class="routeList">
                      <p class="carSn" :class="{animate:item.animate,hidden:item.hidden}" :style="{'left': item.carDistance + 'px'}" v-for="(item, i) in xhcCarPositions ">{{item.carSn}}</p>
                      <img class="carIcon" :class="{animate:item.animate,hidden:item.hidden}" :style="{'left': item.carDistance + 'px'}" :src="item.carIcon" v-for="(item, i) in xhcCarPositions ">
                      <div class="line"></div>
                      <div class="siteItem xhcItem">
                        <img src="../assets/siteImg.png">
                        玄武门
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('500') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('501') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('502') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('503') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('504') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('505') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('506') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('507') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('508') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('509') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('510') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('511') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('512') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('513') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('514') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img src="../assets/siteImg.png">
                        解放门
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('550') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('551') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('552') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('553') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('554') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('555') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('556') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('557') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('558') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('559') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('560') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('561') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('562') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('563') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('564') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img src="../assets/siteImg.png">
                        太平堤
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('600') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('601') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('602') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('603') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('604') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('605') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('606') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('607') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img src="../assets/siteImg.png">
                        十里长堤
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('650') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('651') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('652') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('653') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('654') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('655') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img src="../assets/siteImg.png">
                        水岸听风
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('700') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('701') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('702') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('703') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('704') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img src="../assets/siteImg.png">
                        翠洲门
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('750') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('751') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('752') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('753') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('754') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('755') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('756') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('757') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('758') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('759') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('760') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('761') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('762') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('763') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img src="../assets/siteImg.png">
                        南京站(南)
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('800') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('801') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('802') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('803') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img src="../assets/siteImg.png">
                        和平门
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('850') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('851') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('852') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('853') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('854') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img src="../assets/siteImg.png">
                        和平门湿地
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('900') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('901') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('902') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('903') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('904') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('905') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('906') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('907') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('908') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img src="../assets/siteImg.png">
                        后湖印月
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('950') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('951') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('952') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('953') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('954') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('955') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('956') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img class="siteIcon" src="../assets/site-icon.png">
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('957') != -1">
                      </div>
                      <div class="siteItem xhcItem">
                        <img src="../assets/siteImg.png">
                        玄武门
                        <img class="carIcon" src="../assets/car-icon.png" v-show="xhcList.indexOf('1000') != -1">
                      </div>
                    </div>
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
                    <dv-scroll-board :config="xxts" style="width:550px;height:175px" />
                  </div>
              </div>
            </dv-border-box-10>
          </div>

          <!-- 车载画面 -->
          <div>
            <dv-border-box-10>
              <div class="czView">
                <p class="title">车辆运行信息</p>
                <dv-scroll-board :config="yxzt" style="width:560px;height:320px;" />
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
  name: 'XwhdpczhzxView',
  data () {
    return {
      "nhCarPositions": [],
      "xhcCarPositions": [],
      "xscale": 1,
      "yscale": 1,
      "xhcMoney": 0,
      "nhTenMoney": 0,
      "nhFortyMoney": 0,
      "xwmDayMoney": 0,
      "xwmNightMoney": 0,
      "jfmMoney": 0,
      "nhxList": [],
      "xhcList": [],
      "dayIncome": 0,
      "weekIncome": 0,
      "monthIncome": 0,
      "totalIncome": 0,
      "zdsk": {},
      "carList": [],
      "linePercent": {},
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
        data: []
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
      this.zdNum = num;
      let that = this;
      // 站点售卡数统计
      axios.get('http://hd.smart-ideas.com.cn/xwhpark/loopDataV/getSiteSaleInfo?lineId=' + that.zdNum)
        .then(function(res){
          var dataList = [];
          var restDataList = [];
          var nameList = [];
          res.data.forEach(function(value, key){
            if(that.zdNum == '3' || that.zdNum == '4'){
              if(key < 1){
                dataList.push(parseInt(value.buyQuantity));
                restDataList.push(parseInt(value.restCheckQuantity));
                var siteName = value.siteName;
                siteName = siteName=='长岸听风'?'水岸听风':siteName;
                nameList.push(siteName);
              }
            }else{
              if(key < 10){
                dataList.push(parseInt(value.buyQuantity));
                restDataList.push(parseInt(value.restCheckQuantity));
                var siteName = value.siteName;
                siteName = siteName=='长岸听风'?'水岸听风':siteName;
                nameList.push(siteName);
              }
            }
          })
          that.zdsk = {
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
        }).catch(function(err){
          console.log(err);
        })
    },
    // 获取距离是发展位置
    getNhDistance: function(currentId){
      var startId = 16;
      if(40 <= currentId && currentId < 43){
        currentId = currentId - 14;
      }else if(50 <= currentId && currentId < 53){
        currentId = currentId - 22;
      }else if(60 <= currentId && currentId < 64){
        currentId = currentId - 30;
      }else if(70 <= currentId && currentId < 75){
        currentId = currentId - 37;
      }else if(80 <= currentId && currentId < 84){
        currentId = currentId - 43;
      }else if(currentId == 90){
        currentId = currentId - 50;
      }
      var siteDistance = 1140 / ((document.getElementsByClassName('nhItem').length) - 1);
      console.log(siteDistance);
      var siteNumber = currentId - startId;
      return siteDistance * siteNumber + 10;
    },
    getXhcDistance: function(currentId){
      var startId = 500;
      if(550 <= currentId && currentId < 565){
        currentId = currentId - 35;
      }else if(600 <= currentId && currentId < 608){
        currentId = currentId - 70;
      }else if(650 <= currentId && currentId < 656){
        currentId = currentId - 112;
      }else if(700 <= currentId && currentId < 705){
        currentId = currentId - 158;
      }else if(750 <= currentId && currentId < 764){
        currentId = currentId - 205;
      }else if(800 <= currentId && currentId < 804){
        currentId = currentId - 243;
      }else if(850 <= currentId && currentId < 855){
        currentId = currentId - 291;
      }else if(900 <= currentId && currentId < 909){
        currentId = currentId - 338;
      }else if(950 <= currentId && currentId < 958){
        currentId = currentId - 381;
      }else if(currentId == 1000){
        currentId = currentId - 423;
      }
      var siteDistance = 1140 / ((document.getElementsByClassName('xhcItem').length) - 1);
      var siteNumber = currentId - startId;
      return siteDistance * siteNumber + 10;
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
    var nhCarPositions = [];
    var xhcCarPositions = [];
    var seconds = 0;
    setInterval(function(){
      seconds += 1;
      if(seconds == 1 || seconds % 20 == 0){
        console.log(seconds);

          // 获取消息推送
          axios.get('http://hd.smart-ideas.com.cn/xwhpark/loopDataV/getOrderInfo')
            .then(function(res){
              var dataList = [];
              res.data.forEach(function(value, key){
                var siteName = value.siteName;

                var money = parseFloat(value.money).toFixed(2);
                var dataItem = ['<p style="font-size:18px;border-left: 5px solid #1953c8;height: 35px;line-height:35px;padding-left: 10px;background-color:rgba(23,88,208,.6);">'
                + value.payDate + siteName + '购'+ value.lineName +'票:' + money +
                '元</p>'];
                // var dataItem = ['<p style="font-size:20px;border-left: 5px solid #1953c8;height: 35px;line-height:35px;padding-left: 10px;background-color:rgba(23,88,208,.6);">1元</p>'];
                dataList.push(dataItem);
              })
              if(dataList[0] != that.xxts.data[0]){
                that.xxts = {
                  rowNum: 4,
                  oddRowBGC: 'rgba(0,0,0,0)',
                  evenRowBGC: 'rgba(0,0,0,0)',
                  data: dataList
                };
              }
            }).catch(function(err){
              console.log(err);
            })

          // 预警
          axios.get('http://hd.smart-ideas.com.cn/xwhpark/batteryDataView/getPrinterStatus')
            .then(function(res){
              var dataList = [];
              res.data.forEach(function(value, key){
                if(value.status != '0'){
                  var siteStatus = value.status;
                  var siteName = value.siteName;
                  siteName = siteName=='长岸听风'?'水岸听风':siteName;
                  var itemString = '';
                  if(siteStatus == '1'){
                  	itemString += siteName + value.printerName + '：缺纸\n';
                  }else if(value.status == '2'){
                  	itemString += siteName + value.printerName + '：纸将尽\n';
                  }else if(value.status == '3'){
                  	itemString += siteName + value.printerName + '：打开失败\n';
                  }else if(value.status == '4'){
                  	itemString += siteName + value.printerName + '：脱机\n';
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
          axios.get('http://hd.smart-ideas.com.cn/xwhpark/loopDataV/getSiteSaleInfo?lineId=' + that.zdNum)
            .then(function(res){
              var dataList = [];
              var restDataList = [];
              var nameList = [];
              res.data.forEach(function(value, key){
                if(that.zdNum == '3' || that.zdNum == '4'){
                  if(key < 1){
                    dataList.push(parseInt(value.buyQuantity));
                    restDataList.push(parseInt(value.restCheckQuantity));
                    var siteName = value.siteName;
                    siteName = siteName=='长岸听风'?'水岸听风':siteName;
                    nameList.push(siteName);
                  }
                }else{
                  if(key < 10){
                    dataList.push(parseInt(value.buyQuantity));
                    restDataList.push(parseInt(value.restCheckQuantity));
                    var siteName = value.siteName;
                    siteName = siteName=='长岸听风'?'水岸听风':siteName;
                    nameList.push(siteName);
                  }
                }
              })
              that.zdsk = {
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
            }).catch(function(err){
              console.log(err);
            })



          // 车载信息
          axios.get('http://hd.smart-ideas.com.cn/xwhpark/loopDataV/getVehicleMountedInfo')
            .then(function(res){
              var dataList = [];
              res.data.forEach(function(value, key){
                var driverName = value.driverName;
                driverName = driverName?driverName:'无';
                var dataItem = ['<div><div style="width:100%;height:250px;display:flex;justify-content:center;align-items:center;margin-bottom:10px;"><img style="width:100%;height:100%;" src="'
                  + value.picUrl + '"></div><p style="height:30px;line-height:30px;font-size:20px;">车辆号：'
                  + value.vehicleMountedSn + '</p><p style="height:30px;line-height:30px;font-size:20px;">司机：'
                  + driverName + '</p></div>'];
                dataList.push(dataItem);
              })
              if(dataList[0] != that.yxzt.data[0]){
                that.yxzt = {
                  rowNum: 1,
                  waitTime: 3000,
                  oddRowBGC: 'rgba(0,0,0,0)',
                  evenRowBGC: 'rgba(0,0,0,0)',
                  data: dataList
                };
              }
            }).catch(function(err){
              console.log(err);
            })

          // 收入曲线
          let type;

          // 收入曲线
          axios.get('http://hd.smart-ideas.com.cn/xwhpark/loopDataV/getIncome?lineId=1')
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
                    nhxDayTimeList.push(dayItem.date);
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
              axios.get('http://hd.smart-ideas.com.cn/xwhpark/loopDataV/getIncome?lineId=2')
                .then(function(qlyRes){
                  qlyRes.data.forEach(function(value, key){
                    if(value.key == 'now'){
                      value.data.forEach(function(dayItem, dayKey){
                        var incomeText = dayItem.income;
                        incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                        dayIncome += incomeText;
                        qlyDayTimeList.push(dayItem.date);
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

                  axios.get('http://hd.smart-ideas.com.cn/xwhpark/loopDataV/getIncome?lineId=3')
                    .then(function(xhcRes){
                      xhcRes.data.forEach(function(value, key){
                        if(value.key == 'now'){
                          value.data.forEach(function(dayItem, dayKey){
                            var incomeText = dayItem.income;
                            incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                            dayIncome += incomeText;
                            xhcDayTimeList.push(dayItem.date);
                            xhcDayDataList.push(incomeText);
                          })
                        }
                        if(value.key == 'week'){
                          value.data.forEach(function(weekItem, dayKey){
                            var incomeText = weekItem.income;
                            incomeText = parseFloat(parseFloat(incomeText).toFixed(2));
                            weekIncome += incomeText;
                            var timeText = weekItem.date;
                            timeText = timeText.split('-')[1] + '-' + timeText.split('-')[2];
                            xhcWeekTimeList.push(timeText);
                            xhcWeekDataList.push(incomeText);
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
                              xhcMonthTimeList.push(timeText);
                            }else{
                              xhcMonthTimeList.push('');
                            }
                            xhcMonthDataList.push(incomeText);
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
                              name: '内环线',
                              color: 'red'
                            },{
                              name: '外环线',
                              color: 'yellow'
                            },{
                              name: '小火车',
                              color: 'blue'
                            },
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
                            name: '内环线',
                            data: nhxDayDataList,
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
                            name: '外环线',
                            data: qlyDayDataList,
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
                          },
                          {
                            name: '小火车',
                            data: xhcDayDataList,
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
                              stroke: 'blue',
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
                              name: '内环线',
                              color: 'red'
                            },{
                              name: '外环线',
                              color: 'yellow'
                            },{
                              name: '小火车',
                              color: 'blue'
                            },
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
                            name: '内环线',
                            data: nhxWeekDataList,
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
                            name: '外环线',
                            data: qlyWeekDataList,
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
                          },
                          {
                            name: '小火车',
                            data: xhcWeekDataList,
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
                              stroke: 'blue',
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
                              name: '内环线',
                              color: 'red'
                            },{
                              name: '外环线',
                              color: 'yellow'
                            },{
                              name: '小火车',
                              color: 'blue'
                            },
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
                            name: '内环线',
                            data: nhxMonthDataList,
                            type: 'line',
                            stack: 'a',
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
                            name: '外环线',
                            data: qlyMonthDataList,
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
                          },
                          {
                            name: '小火车',
                            data: xhcMonthDataList,
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
                              stroke: 'blue',
                              lineWidth: 2
                            }
                          }
                        ],
                        grid: {
                          top: '20px',
                          left: '10px',
                          right: '10px',
                          bottom: '25px'
                        }
                      };

                    }).catch(function(err){
                      console.log(err);
                    })

                }).catch(function(err){
                  console.log(err);
                })

            }).catch(function(err){
              console.log(err);
            })

          // 获取卡尺位置
          axios.get('http://hd.smart-ideas.com.cn/xwhpark/loopDataV/getVehicleMountedLocation?lineId=1')
            .then(function(res){
              // var carList = res.data;
              // var newCarList = [];
              // if(carList.length > 0){
              //   carList.forEach(function(value, key){
              //     let carId = value.id;
              //     newCarList.push(carId);
              //   })
              // }
              // that.nhxList = newCarList;
              var carList = [];
              var snList = [];
              if(res.data.length > 0){
                res.data.forEach(function(value, key){
                  if(snList.indexOf(value.vehicleMountedSn) == -1){
                    snList.push(value.vehicleMountedSn);
                    carList.push(value);
                  }
                })
                if(nhCarPositions.length == 0){
                  carList.forEach(function(value, key){
                    var carDistance = that.getNhDistance(value.id);
                      var position = {
                        oldId: value.id,
                        currentId: value.id,
                        vehicleMountedSn: value.vehicleMountedSn,
                        carDistance: carDistance,
                        animate: false,
                        carIcon: carCurrent,
                        hidden: false,
                        carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3)
                      }
                      nhCarPositions[key] = position;
                  })
                }else{
                  var nowSnList = [];
                  nhCarPositions.forEach(function(value, key){
                    nowSnList[key] = value.vehicleMountedSn;
                  })

                  snList.forEach(function(value, key){
                    if(nowSnList.indexOf(value) != -1){
                      var carDistance = that.getNhDistance(carList[key].id);
                      var carIcon;
                      if(nhCarPositions[nowSnList.indexOf(value)].currentId == carList[key].id){
                        carIcon = carCurrent
                      }else if(nhCarPositions[nowSnList.indexOf(value)].currentId < carList[key].id){
                        carIcon = carRight
                      }else{
                        carIcon = carLeft
                      }
                      var position = {};
                      if(nhCarPositions[nowSnList.indexOf(value)].hidden){
                        // 丢失过GPS
                        position = {
                          oldId: carList[key].id,
                          currentId: carList[key].id,
                          vehicleMountedSn: carList[key].vehicleMountedSn,
                          carDistance: carDistance,
                          animate: false,
                          carIcon: carIcon,
                          hidden: false,
                          carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3)
                        }
                      }else{
                        position = {
                          oldId: nhCarPositions[nowSnList.indexOf(value)].currentId,
                          currentId: carList[key].id,
                          vehicleMountedSn: carList[key].vehicleMountedSn,
                          carDistance: carDistance,
                          animate: true,
                          carIcon: carIcon,
                          hidden: false,
                          carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3)
                        }
                      }
                      nhCarPositions[nowSnList.indexOf(value)] = position;
                    }else{
                      var carDistance = that.getNhDistance(carList[key].id);
                      var carIcon = carCurrent;
                      var position = {
                        oldId: carList[key].id,
                        currentId: carList[key].id,
                        vehicleMountedSn: carList[key].vehicleMountedSn,
                        carDistance: carDistance,
                        animate: false,
                        carIcon: carIcon,
                        hidden: false,
                        carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3)
                      }
                      nhCarPositions.push(position);
                    }
                  })
                  nowSnList.forEach(function(value, key){
                    if(snList.indexOf(value) == -1){
                      nhCarPositions[key].hidden = true;
                    }
                  })
                }
              }
              console.log(snList);
              console.log(nhCarPositions);
              that.nhCarPositions = nhCarPositions;
            }).catch(function(err){
              console.log(err);
            })

          axios.get('http://hd.smart-ideas.com.cn/xwhpark/loopDataV/getVehicleMountedLocation?lineId=2')
            .then(function(res){
              // var carList = res.data;
              // var newCarList = [];
              // if(carList.length > 0){
              //   carList.forEach(function(value, key){
              //     let carId = value.id;
              //     newCarList.push(carId);
              //   })
              // }
              // that.xhcList = newCarList;
              var carList = [];
              var snList = [];
              if(res.data.length > 0){
                res.data.forEach(function(value, key){
                  if(snList.indexOf(value.vehicleMountedSn) == -1){
                    snList.push(value.vehicleMountedSn);
                    carList.push(value);
                  }
                })
                if(xhcCarPositions.length == 0){
                  carList.forEach(function(value, key){
                    var carDistance = that.getXhcDistance(value.id);
                      var position = {
                        oldId: value.id,
                        currentId: value.id,
                        vehicleMountedSn: value.vehicleMountedSn,
                        carDistance: carDistance,
                        animate: false,
                        carIcon: carCurrent,
                        hidden: false,
                        carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3)
                      }
                      xhcCarPositions[key] = position;
                  })
                }else{
                  var nowSnList = [];
                  xhcCarPositions.forEach(function(value, key){
                    nowSnList[key] = value.vehicleMountedSn;
                  })

                  snList.forEach(function(value, key){
                    if(nowSnList.indexOf(value) != -1){
                      var carDistance = that.getXhcDistance(carList[key].id);
                      var carIcon;
                      if(xhcCarPositions[nowSnList.indexOf(value)].currentId == carList[key].id){
                        carIcon = carCurrent
                      }else if(xhcCarPositions[nowSnList.indexOf(value)].currentId < carList[key].id){
                        carIcon = carRight
                      }else{
                        carIcon = carLeft
                      }
                      var position = {};
                      if(xhcCarPositions[nowSnList.indexOf(value)].hidden){
                        // 丢失过GPS
                        position = {
                          oldId: carList[key].id,
                          currentId: carList[key].id,
                          vehicleMountedSn: carList[key].vehicleMountedSn,
                          carDistance: carDistance,
                          animate: false,
                          carIcon: carIcon,
                          hidden: false,
                          carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3)
                        }
                      }else{
                        position = {
                          oldId: xhcCarPositions[nowSnList.indexOf(value)].currentId,
                          currentId: carList[key].id,
                          vehicleMountedSn: carList[key].vehicleMountedSn,
                          carDistance: carDistance,
                          animate: true,
                          carIcon: carIcon,
                          hidden: false,
                          carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3)
                        }
                      }
                      xhcCarPositions[nowSnList.indexOf(value)] = position;
                    }else{
                      var carDistance = that.getXhcDistance(carList[key].id);
                      var carIcon = carCurrent;
                      var position = {
                        oldId: carList[key].id,
                        currentId: carList[key].id,
                        vehicleMountedSn: carList[key].vehicleMountedSn,
                        carDistance: carDistance,
                        animate: false,
                        carIcon: carIcon,
                        hidden: false,
                        carSn: carList[key].vehicleMountedSn.substring(carList[key].vehicleMountedSn.length-3)
                      }
                      xhcCarPositions.push(position);
                    }
                  })
                  nowSnList.forEach(function(value, key){
                    if(snList.indexOf(value) == -1){
                      xhcCarPositions[key].hidden = true;
                    }
                  })
                }
              }
              xhcCarPositions.forEach(function(value, key){
                if(value.oldId == '1000' && value.currentId != '1000'){
                  value.oldId = 500;
                }
              })
              that.xhcCarPositions = xhcCarPositions;
            }).catch(function(err){
              console.log(err);
            })

          // 获取收入比例
          axios.get('http://hd.smart-ideas.com.cn//xwhpark/batteryDataView/getIncome')
            .then(function(res){
              console.log(res.data);
              var jfmMoney = parseInt(res.data[0].jfmMoney);
              var nhFortyMoney = parseInt(res.data[0].nhFortyMoney);
              var nhTenMoney = parseInt(res.data[0].nhTenMoney);
              var xhcMoney = parseInt(res.data[0].xhcMoney);
              var xwmDayMoney = parseInt(res.data[0].xwmDayMoney);
              var xwmNightMoney = parseInt(res.data[0].xwmNightMoney);
              if(!isNaN(parseInt(xhcMoney))){
                that.jfmMoney = jfmMoney;
                that.nhFortyMoney = nhFortyMoney;
                that.nhTenMoney = nhTenMoney;
                that.xhcMoney = xhcMoney;
                that.xwmDayMoney = xwmDayMoney;
                that.xwmNightMoney = xwmNightMoney;
                that.linePercent = {
                  radius: '60%',
                  activeRadius: '65%',
                  lineWidth: 15,
                  digitalFlopStyle: {
                    fontSize: 16
                  },
                  data: [
                    {
                      name: '观光小火车',
                      value: xhcMoney
                    },
                    {
                      name: '解放门',
                      value: jfmMoney
                    },
                    {
                      name: '内环10元',
                      value: nhTenMoney
                    },
                    {
                      name: '内环40元',
                      value: nhFortyMoney
                    },
                    {
                      name: '玄武门日场',
                      value: xwmDayMoney
                    },
                    {
                      name: '玄武门夜场',
                      value: xwmNightMoney
                    }
                  ]
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

  /* 内容部分 */
  .contentView{
    width: 100%;
    transform-origin: top center;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .marginRight{
    margin-right: 10px;
  }
  /* 左侧试图 */
  .left-top{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 255px;
    width: 1310px;
  }

  /* 天气预报 */
  .weatherView{
    width: 380px;
    height: 255px;
    padding: 10px;
  }
  .weatherBox{
    display: flex;
    justify-content: start;
    align-items: flex-start;
  }
  .weatherView .dateView{
    font-size: 23px;
    color: #fff;
    padding-left: 40px;
    line-height: 60px;
    background: url(../assets/time-icon.png) no-repeat left center;
    background-size: 30px 30px;
  }
  .nowWeather{
    height: 170px;
    padding-top: 15px;
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
/*  .lastWeather{
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
  } */

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
    line-height: 35px;
    padding-left: 30px;
  }

  /* 消息推送 */
  .notice{
    width: 100%;
    height: 255px;
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
    height: 400px;
    margin-top: 10px;
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
    height: 400px;
    position: relative;
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
    width: 1310px;
    margin-top: 10px;
  }

  /* 车辆行驶位置 */
  .routeView{
    width: 100%;
    height: 305px;
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
    padding: 30px 0;
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
    padding: 0 20px;
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
    top: -30px;
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
    position: relative;
    white-space: nowrap;
    position: relative;
  }
  .siteItem .carIcon{
    position: absolute;
    width: 20px;
    top: -10px;
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
  }



</style>
