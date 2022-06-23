<template>
  <div class="hello">
    <dv-full-screen-container class="container">
      <p class="jszc">技术支持: 北京骑思妙享科技有限公司 400-898-7021</p>
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <p>野鸭湖自驾车数字化运营系统</p>
      </div>
      <div class="contentView">
        <!-- 左侧视图 -->
        <div class="leftView">
          <div class="leftContent">
            <!-- 租赁详情 -->
            <div class="leaseDetailView">
              <p class="noticeTitle">租赁详情</p>
              <dv-scroll-board :config="leaseConfig" style="width:490px;height:285px" />
            </div>

            <!-- 线 -->
            <span class="line"></span>

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
              <div class="noticeView">
                 <p style="font-size: 25px;color: #fff;margin: 10px 0;">安全须知</p>
                 <dv-border-box-8 :reverse="true">
                   <div class="noticeContent" style="width: 100%;overflow: hidden;padding: 10px;">
                     <div class="slideView" style="width: 100%;overflow: hidden;position: relative;">
                       <p class="aqTxt" style="width: auto;font-size: 25px;color:#fff;font-weight:bold;line-height:55px;white-space:nowrap;position:relative;" :style="{'left': left + 'px'}">车辆安全使用须知：租车前请您仔细阅读游客须知，承租后则视为已知悉本须知内容，并能遵守以下规定：1. 自觉遵守公共秩序，保持环境卫生；2. 请游客与工作人员确认车辆物品并保持租赁车辆及随身物品的完好；3. 未满12周岁的儿童及70周岁以上的老人禁止租赁和驾驶车辆，须在监护人陪同下乘坐车辆。4. 按租赁车辆核定人数乘车，不得超载； 5. 使用中不得追逐比赛，请按规定线路骑行或驾驶，严禁闯入设有禁止标志的道路或区域；6. 禁止酒后或身体不佳者租赁使用车辆；7. 工作人员有权劝阻租车人的危险行为，如租车人拒绝劝阻，工作人员可回收出租车辆，停止计时并退回所剩余额；8. 遵守交通规则，礼让行人，右侧行驶，行车遇到坡道及桥梁请慢行或下车推行；9. 使用车辆时，非车辆自身原因或违反须知造成骑车人，他人及财务损失等后果由租用人自负，车辆人为损坏及丢失，则按照车辆的采购价格照价赔偿。</p>
                     </div>
                   </div>
                 </dv-border-box-8>
              </div>
            </div>

            <!-- 线 -->
            <span class="line"></span>

            <!-- 租赁情况 -->
            <div class="leaseView">
              <div class="leaseList">
                <div class="leaseItem">
                  <p>双人自行车</p>
                  <dv-active-ring-chart :config="option1" style="width:220px;height:220px" />
                </div>
                <div class="leaseItem">
                  <p>四人自行车</p>
                  <dv-active-ring-chart :config="option2" style="width:220px;height:220px" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 中间视图 -->
        <div class="centerView">
          <!-- 地图部分 -->
          <div class="videoView">
            <dv-border-box-7>
              <img class="mapImg" src="../assets/yyhImg.png">
              <div class="rideNotice">
                <dv-border-box-8 :reverse="true">
                  <div class="rideNoticeImg">
                    <img src="../assets/rideNotice.gif">
                  </div>
                </dv-border-box-8>
              </div>
            </dv-border-box-7>
          </div>

          <!-- 购票流程 -->
          <div class="progressView">
            <p class="progressTitle">自驾车租赁流程</p>
            <div class="progressList">
              <dv-border-box-8 :reverse="true">1.扫码租车</dv-border-box-8>
              <dv-border-box-8 :reverse="true">2.缴押金开锁</dv-border-box-8>
              <dv-border-box-8 :reverse="true">3.结束游玩</dv-border-box-8>
              <dv-border-box-8 :reverse="true">4.扫码退押金</dv-border-box-8>
            </div>
          </div>

          <!-- 温馨提示 -->
          <div class="wxts">
            <dv-border-box-10>
              <div style="display: flex;justify-content: flex-start;align-items: center;padding: 0 20px;" class="wxtsView">
                <p style="flex: 0 0 185px;">温馨提示：</p>
                <div class="wxtsSlide" style="width: 100%;overflow: hidden;flex: 1;position: relative;">
                  <p style="font-size: 35px;font-weight: bold;white-space: nowrap;position: relative;" :style="{'left': wxtsLeft + 'px'}">欢迎使用野鸭湖观光自行车, 租车请您使用微信直接扫码车身左后轮二维码, 手机缴纳押金, 开锁即可骑行. 退押金, 请手动锁车, 使用微信扫描此大屏幕退款二维码退款, 押金扣除骑行费用后, 秒退到账.</p>
                </div>
              </div>
            </dv-border-box-10>
          </div>
        </div>

        <!-- 右侧视图 -->
        <div class="rightView">
          <!-- 退款二维码 -->
          <div class="qrcodeView">
            <p class="qrcodeViewTitle">退款二维码</p>
            <div class="qrcodeImgView">
              <img class="qrcodeImg" src="../assets/yyhRefund.png">
            </div>
            <p class="qrcodeNotice">二维码有效期五分钟，请扫码后尽快退款</p>
          </div>

          <!-- 购票须知 -->
          <div class="rightNotice" style="padding-bottom: 10px;height: auto;">
            <p class="noticeTitle">租赁须知</p>
            <p style="font-size: 22px;color: #fff;line-height: 40px;">押金: 400元, 单排60元/小时, 双排100元/小时.</p>
            <p style="font-size: 22px;color: #fff;line-height: 40px;">一小时起租, 超过一小时按半小时累计.</p>
            <p style="font-size: 22px;color: #fff;line-height: 40px;color: yellow;">中途锁车不停止计费.</p>
            <p style="font-size: 22px;color: #fff;line-height: 40px;">使用缴纳押金手机可继续开锁, 其他人无法开锁.</p>
            <p style="font-size: 22px;color: #fff;line-height: 40px;">救援电话: 69131458 、 13126962060</p>
          </div>

          <!-- 购票须知 -->
          <div class="rightNotice" style="padding-bottom: 20px;height: auto;">
            <p class="noticeTitle">退款详情</p>
            <dv-scroll-board :config="refundConfig" style="width:480px;height:180px" />
          </div>


        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'YmyjtcView',
  data () {
    return {
      "nowDate": "2021-01-19 00:00:00",
      left: 0,
      wxtsLeft: 0,
      "nowPic": "",
      "weatherList": [],
      "option1": {},
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
      "refundConfig": {
        header: ['手机号', '退款状态'],
        data: [

        ],
        rowNum: 3,
        align: ['center','center'],
        columnWidth: [350, 150]
      },
      "leaseConfig": {
        header: ['编号', '手机号', '押金'],
        data: [

        ],
        align: ['center','center','center'],
        columnWidth: [150, 200, 150]
      }
    }
  },
  mounted: function(){
    let that = this;
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

    setInterval(function(){
      let leftValue = that.left;
      if(leftValue > -9000){
        leftValue -= 1;
      }else{
        leftValue = 0;
      }
      that.left = leftValue;
    }, 15)

    setInterval(function(){
      let leftValue = that.wxtsLeft;
      if(leftValue > -3000){
        leftValue -= 1;
      }else{
        leftValue = 0;
      }
      that.wxtsLeft = leftValue;
    }, 15)

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
        // 获取租赁详情
        axios.get('http://lease.smart-ideas.com.cn/yyhpark/deviceDataView/getDeviceBikeLeaseInfo')
          .then(function(res){
            var refundList = res.data;
            var dataList = [];
            refundList.forEach(function(value, key){
              var newArr = [];
              newArr[0] = value.code;
              if (value.phone) {
                newArr[1] = value.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
              } else {
                newArr[1] = '---';
              }
              newArr[2] = parseFloat(value.money).toFixed(2);
              dataList[key] = newArr;
            })
            that.leaseConfig = {
              header: ['编号', '手机号', '押金'],
              data: dataList,
              align: ['center','center','center'],
              columnWidth: [150, 200, 150],
              style: {
                fontSize: '20'
              }
            }
          })
          .catch(function(err){
            console.log(err);
          })

        // 获取退款详情
        axios.get('http://lease.smart-ideas.com.cn/yyhpark/deviceDataView/getDeviceBikeRefundInfo')
          .then(function(res){
            var leaseList = res.data;
            var dataList = [];
            leaseList.forEach(function(value, key){
              var newArr = [];
              if (value.phone) {
                newArr[0] = value.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
              } else {
                newArr[0] = '---';
              }
              newArr[1] = value.status;
              dataList[key] = newArr;
            })
            that.refundConfig = {
              header: ['手机号', '退款状态'],
              data: dataList,
              rowNum: 3,
              align: ['center','center'],
              columnWidth: [350, 150]
            }
          })
          .catch(function(err){
            console.log(err);
          })

        // 获取租赁情况
        axios.get('http://lease.smart-ideas.com.cn/yyhpark/deviceDataView/getDeviceBikeLeasePercent?type=0')
          .then(function(res){
            let leasePercent = Math.ceil(res.data[0].y)?Math.ceil(res.data[0].y):0
            let noLeasePercent = 100 - leasePercent;
            that.option1 = {
              radius: '70%',
              activeRadius: '80%',
              color: ['red', '#00ffff'],
              data: [
                {
                  name: '已租',
                  value: leasePercent
                },
                {
                  name: '未租',
                  value: noLeasePercent
                }
              ],
              lineWidth: 16,
            }
          })
          .catch(function(err){
            console.log(err);
          })

        axios.get('http://lease.smart-ideas.com.cn/yyhpark/deviceDataView/getDeviceBikeLeasePercent?type=1')
         .then(function(res){
           let leasePercent = Math.ceil(res.data[0].y)?Math.ceil(res.data[0].y):0
           let noLeasePercent = 100 - leasePercent;
           that.option2 = {
              radius: '70%',
              activeRadius: '80%',
              color: ['red', '#00ffff'],
              data: [
                {
                  name: '已租',
                  value: leasePercent
                },
                {
                  name: '未租',
                  value: noLeasePercent
                }
              ],
              lineWidth: 16,
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
  .jszc{
    position: fixed;
    bottom: 0;
    right: 10px;
    line-height: 40px;
    font-size: 15px;
    text-align: right;
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
  }
  /* 左侧试图 */
  .leftView{
    width: 550px;
    height: 950px;
    position: relative;
    background: url(../assets/left-bg.png) no-repeat left top;
    background-size: cover;
  }
  .leftContent{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    padding: 30px;
  }
  .weatherView{
    padding-left: 20px;
  }
  .weatherView .dateView{
    font-size: 23px;
    color: #fff;
    /* padding-left: 40px; */
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


  .leaseView{
    width: 100%;
    height: 236px;
  }
  .leaseView .leaseList{
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    height: 236px;
    padding: 0 20px;
  }
  .leaseView .leaseList .leaseItem{
    width: 50%;
    height: 236px;
  }
  .leaseView .leaseList .leaseItem p{
    font-size: 22px;
    color: #fff;
    text-align: center;
  }

  .qrcodeView{
    width: 100%;
    background: url(../assets/rightBg1.png) no-repeat left top;
    background-size: cover;
    padding-top: 40px;
    padding-bottom: 20px;
  }
  .qrcodeViewTitle{
    font-size: 24px;
    color: #fff;
    padding-left: 70px;
    line-height: 40px;
  }
  .qrcodeImgView{
    width: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .qrcodeImg{
    width: 150px;
    height: 150px;
    margin: 0 auto;
  }
  .qrcodeNotice{
    font-size: 20px;
    color: #fff;
    width: 100%;
    text-align: center;
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
    height: 120px;
  }
  .peopleContent{
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .peopleContent .peopleItem{
    flex: 1;
    height: 120px;
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
    width: 750px;
    height: 730px;
    margin: 0 auto;
  }
  .videoView .mapImg{
    width: 650px;
    height: 620px;
    margin: 0 auto;
  }
  .videoView .rideNotice{
    width: 672px;
    height: 85px;
    margin: 0 auto;
    margin-top: 10px;
  }
  .videoView .rideNotice .rideNoticeImg{
    width: 672px;
    height: 85px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .videoView .rideNotice .rideNoticeImg img{
    width: 512px;
    height: 43px;
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
  .noticeTitle{
    font-size: 28px;
    font-weight: bold;
    color: #fff;
    padding-left: 40px;
    margin-bottom: 20px;
  }
  .rightNotice{
    width: 100%;
    height: 420px;
    background: url(../assets/rightBg1.png) no-repeat left top;
    background-size: cover;
    padding: 40px;
  }

  .leaseDetailView{
    width: 100%;
    /* height: 420px; */
    background-size: cover;
    padding: 0 10px;
  }

</style>
