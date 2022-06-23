<template>
  <div class="hello" :style="{background:url_back_img}" style="width: 100vw;height: 100vh;overflow: hidden;background-size: cover;">
    <div class="hoverView">

    </div>
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <p class="updateTime">{{nowDate}}</p>
        <div class="title">
          <p>云龙湖自驾船数字化运营系统</p>
          <p class="childTitle">{{scenicName}}</p>
        </div>
      </div>
      <div class="contentView">
        <!-- 右侧视图 -->
        <div class="rightView">
          <!-- 退款二维码 -->
          <div class="qrcodeView">
            <p class="qrcodeViewTitle">退款二维码</p>
            <div class="qrcodeImgView">
              <!-- <img class="qrcodeImg" :src="src"> -->
              <div id="qrcode" ref="qrcode" ></div>
            </div>
            <p class="qrcodeNotice">二维码有效期五分钟，请扫码后尽快退款</p>
          </div>

          <!-- 租赁详情 -->
          <div class="leaseDetailView">
            <p class="noticeTitle">租赁详情</p>
            <dv-scroll-board :config="leaseConfig" style="width:100%;height:300px" />
          </div>

          <!-- 租赁情况 -->
          <div class="onLeaseView">
            <p class="noticeTitle">租赁情况</p>
            <div class="onLeaseNumber">
              <p class="leaseTitle">总船数:</p>
              <dv-digital-flop :config="config1" style="width:200px;height:70px;" />
            </div>
            <div class="onLeaseNumber">
              <p class="leaseTitle">在租数:</p>
              <dv-digital-flop :config="config2" style="width:200px;height:70px;" />
            </div>
            <div class="onLeaseNumber">
              <p class="leaseTitle">未租数:</p>
              <dv-digital-flop :config="config3" style="width:200px;height:70px;" />
            </div>
            <p class="updateTime">更新时间：{{updateTime}}</br>技术支持: 北京骑思妙享科技有限公司 400-898-7021</p>
          </div>
        </div>

        <!-- 中间视图 -->
        <div class="centerView">
          <!-- 地图部分 -->
          <div class="mapView">
            <dv-border-box-7>
              <div class="iframeView">
                <iframe :src="mapSrc" frameborder="0" width="680px" height="750px"></iframe>
                <!-- <img class="mapBg" src="../assets/xwhmapBg.png"> -->
              </div>
            </dv-border-box-7>
          </div>

          <!-- 购票流程 -->
          <div class="progressView">
            <p class="progressTitle">自驾船租赁流程</p>
            <div class="progressList">
              <dv-border-box-8 :reverse="true">1.排队上船</dv-border-box-8>
              <dv-border-box-8 :reverse="true">2.扫码付押金</dv-border-box-8>
              <dv-border-box-8 :reverse="true">3.结束游玩</dv-border-box-8>
              <dv-border-box-8 :reverse="true">4.上岸扫码退押金</dv-border-box-8>
            </div>
          </div>

          <!-- 温馨提示 -->
          <div class="wxts">
            <dv-border-box-10>温馨提示：欢迎乘坐云龙湖游船</dv-border-box-10>
          </div>
        </div>

        <!-- 左侧视图 -->
        <div class="leftView">
          <div class="leftContent">
            <p class="leftTitle">摆渡船购票</p>
            <div class="boatList">
              <div class="boatItem">
                <div class="itemLeft">
                  <p class="boatName">画舫环湖票</p>
                  <p>营业时间：{{hfTime}}</p>
                </div>
                <div class="btnView">
                  <a href="javascript:;">暂不售票</a>
                  <p>票价：60元/人/次</p>
                </div>
              </div>
              <span class="line">
                <img src="../assets/line.png">
              </span>
              <div class="boatItem">
                <div class="itemLeft">
                  <p class="boatName">快艇环湖票</p>
                  <p>营业时间：09:00-17:00</p>
                </div>
                <div class="btnView">
                  <a href="javascript:;">暂不售票</a>
                  <p>票价：60元/人/次</p>
                </div>
              </div>
              <span class="line">
                <img src="../assets/line.png">
              </span>
              <div class="boatItem">
                <div class="itemLeft">
                  <p class="boatName">快艇直达单次票</p>
                  <p>营业时间：09:00-17:00</p>
                </div>
                <div class="btnView">
                  <a href="javascript:;">暂不售票</a>
                  <p>票价：60元/人/次</p>
                </div>
              </div>
              <span class="line">
                <img src="../assets/line.png">
              </span>
              <div class="boatItem">
                <div class="itemLeft">
                  <p class="boatName">快艇直达往返票</p>
                  <p>营业时间：09:00-17:00</p>
                </div>
                <div class="btnView">
                  <a href="javascript:;">暂不售票</a>
                  <p>票价：120元/人/2次</p>
                </div>
              </div>
              <span class="line">
                <img src="../assets/line.png">
              </span>
              <div class="boatItem">
                <div class="itemLeft">
                  <p class="boatName">摇橹船票</p>
                  <p>营业时间：09:00-17:00</p>
                </div>
                <div class="btnView">
                  <a href="javascript:;">暂不售票</a>
                  <p>票价：60元/人/次</p>
                </div>
              </div>
              <span class="line">
                <img src="../assets/line.png">
              </span>
              <div class="boatItem">
                <div class="itemLeft">
                  <p class="boatName">电动自驾船</p>
                  <p>营业时间：09:00-17:00</p>
                </div>
                <div class="btnView">
                  <a href="javascript:;">上船扫码</a>
                </div>
              </div>
              <span class="line">
                <img src="../assets/line.png">
              </span>
              <div class="boatItem">
                <div class="itemLeft">
                  <p class="boatName">{{hfhxhName}}</p>
                  <p>营业时间：{{hfhxhTime}}</p>
                </div>
                <div class="btnView">
                  <a href="javascript:;">暂不售票</a>
                  <p>票价：{{hfhxhPrice}}</p>
                </div>
              </div>
            </div>
            <div class="buyNotice">
              <p class="descTitle">购票须知</p>
              <div class="descView">
                <p>画舫环湖观光游览：环东湖一周，途径：苏公塔-索滑道-音乐厅-水族馆</p>
                <p>环西湖观光游览：环西湖一周</p>
                <p>高速艇环湖观光游览：环东湖一周，时间约8分钟（2人起航）</p>
                <div class="lineView">
                  <div class="ktLine">
                    <p>高速艇景点直达：</p>
                    <p v-for="(item, i) in ktzdList ">{{item}}</p>
                  </div>
                  <div class="ylcLine">
                    <p>摇橹船：</p>
                    <p>{{scenicName=='水族馆（沙月岛）'||scenicName=='沉水廊道'?scenicName+'<——>任意码头':'本码头暂不开放摇橹船'}}</p>
                  </div>
                </div>
                <p>乘船须知</p>
                <p>1.请遵从疫情防控要求文明乘船，不夹带危险物品。</p>
                <p>2.严重的心脏病、精神病、高血压、高度近视、颈椎病、腰椎病、骨折等疾病患者不能参与快艇活动。</p>
                <p>3.每位游客乘坐快艇时必须穿救生衣，找到安全绳。</p>
                <p>4.乘搭快艇时，不要集中在快艇的一侧，以免快艇失去平衡。严禁在快艇内启动，头、手不要放在快艇的边缘，以免被触碰及发生其他意外。</p>
                <p>5.参与快艇活动者在途中未经许可不得离艇下水。</p>
                <p>温馨提示：票据是结算的依据，如有遗失，责任自负。</p>
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
import QRCode from 'qrcode2';
export default {
  name: 'YlhRefundView',
  data () {
    return {
      "hfhxhName": '环西湖观光票',
      "hfhxhTime": '09:00-17:00',
      "hfhxhPrice": '80元/人/次',
      "ktzdList": [],
      "hfTime": '09:00-17:00',
      "url_back_img": "url("+require('../assets/zhzx-bg.jpg')+") no-repeat left top #000",
      "xscale": 1,
      "yscale": 1,
      "mapSrc": '',
      "updateTime": '',
      "scenicName": '',
      "nowDate": "2021-01-19 00:00:00",
      "nowPic": "",
      "weatherList": [],
      "option1": {},
      "option2": {},
      "option3": {},
      "option4": {},
      "option5": {},
      "option6": {},
      "config1": {
        number: [0],
        content: '{nt}',
        style: {
          fontSize: 70,
          fill: 'yellow',
          fontWeight: 'bold'
        }
      },
      "config2": {
        number: [0],
        content: '{nt}',
        style: {
          fontSize: 70,
          fill: 'red',
          fontWeight: 'bold'
        }
      },
      "config3": {
        number: [0],
        content: '{nt}',
        style: {
          fontSize: 70,
          fill: 'green',
          fontWeight: 'bold'
        }
      },
      "refundConfig": {
        header: ['手机号', '退款状态'],
        data: [

        ],
        rowNum: 7,
        align: ['center','center'],
        columnWidth: [350, 150]
      },
      "leaseConfig": {
        header: ['编号', '手机号', '押金'],
        data: [

        ],
        align: ['center','center','center'],
        columnWidth: [150, 200, 150]
      },
      "src": ""
    }
  },
  methods: {
    createCode(scenicId){
      let qrcode = new QRCode('qrcode', {
        width: 150,  // 二维码宽度
        height: 150, // 二维码高度
        text: 'http://rent.smart-ideas.com.cn/ylhWeb/ylhRefundTest/?scenicId=' + scenicId + '&date=' + new Date().getTime()
      })
    },
    clearCode () {
      this.$refs.qrcode.innerHTML = ''
    }
  },
  mounted: function(){
    let that = this;
    let xScale = window.innerWidth / 1920;
    let yScale = window.innerHeight / 1080;
    that.xscale = xScale;
    that.yscale = yScale;
    let scenicId = that.$route.query.scenicId;
    that.mapSrc = 'http://smart-ideas.com.cn/mapView/ylhzjcmap.html?scenicId=' + scenicId;
    var scenicName;
    if(scenicId == '14249a7ee96d4d3f95195a799a3709d2'){
      scenicName = '杏花坞';
      that.hfTime = '09:00-18:00';
    }else if(scenicId == '2a96be8cf7744d9088986920e2f0d6d9'){
      scenicName = '开元宾馆';
    }else if(scenicId == '47fca49def99492c80a58d8592400589'){
      scenicName = '老子水居';
    }else if(scenicId == '4c74b97aaf5b4ff594d11841d4ec8de9'){
      scenicName = '南湖一号';
    }else if(scenicId == '5acd3b7ae10544ec9632b41392c0e695'){
      scenicName = '解忧桥';
    }else if(scenicId == '7911474d3e1b42e891bd91f6eaf55077'){
      scenicName = '未定';
    }else if(scenicId == '8ea1d467f3af4d2aa46b09219d6273f6'){
      scenicName = '断桥';
    }else if(scenicId == 'b3bb924f74ed4e8ebcad576a382e8791'){
      scenicName = '沉水廊道';
    }else if(scenicId == 'cdabffaf5cb442da8f5ca9ac50f85efc'){
      scenicName = '水族馆（沙月岛）';
    }else if(scenicId == 'ed28b43724f0477d9755de59b28160dd'){
      scenicName = '音乐厅';
    }else if(scenicId == 'f769f573bc3e4df5986ec45993e94fbd'){
      scenicName = '苏公塔';
      that.hfTime = '09:00-18:00';
      that.hfhxhName = '画舫夜游票';
      that.hfhxhTime = '18:00-21:00';
      that.hfhxhPrice = '30元/人/次';
    }else if(scenicId == 'e258ca79d5ca4e33b177794a6d815ad5'){
      scenicName = '测试码头';
    }
    that.scenicName = scenicName;

    // 快艇直达
    var ktMtList = [
      '杏花坞',
      '苏公塔',
      '水族馆（沙月岛）',
      '断桥',
      '音乐厅',
      '沉水廊道'
      // '开元宾馆'
    ]
    var ktzdList = [];
    if(ktMtList.indexOf(scenicName) != -1){
      ktMtList.forEach(function(value, key){
        if(value != scenicName){
          ktzdList.push(scenicName + '<——>' + value);
        }
      })
    }else{
      ktzdList.push('本码头暂不开放快艇直达');
    }
    that.ktzdList = ktzdList;

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
      if(that.updateTime != '设备离线, 请您重新启动设备' && that.updateTime){
        var nowDateString = new Date(that.nowDate);
        var updateString = new Date(that.updateTime);
        if(nowDateString - updateString >= 120 * 1000){
          that.updateTime = '设备离线, 请您重新启动设备';
        }
      }
    }, 1000)

    //获取天气情况
    axios.get('http://node.smart-ideas.com.cn:3001/datav/common/weather/v1/weatherInfo?city=320100')
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
        axios.get('http://rent.smart-ideas.com.cn/ylhpark/deviceDataView/getDeviceShipLeaseInfo?scenicId=' + scenicId)
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
              if (value.money) {
                 newArr[2] = parseFloat(value.money).toFixed(2);
              }
              dataList[key] = newArr;
            })
            if(dataList.length == 0){
              dataList = [
                ['-', '-', '-'],
                ['-', '-', '-'],
                ['-', '-', '-'],
                ['-', '-', '-'],
                ['-', '-', '-']
              ]
            }
            that.leaseConfig = {
              header: ['编号', '手机号', '押金'],
              data: dataList,
              align: ['center','center','center'],
              columnWidth: [150, 200, 150],
              style: {
                fontSize: '20'
              },
              rowNum: 5
            }
          })
          .catch(function(err){
            console.log(err);
          })

        // 获取在租人数
        axios.get('http://rent.smart-ideas.com.cn/ylhpark/deviceDataView/getDeviceShipLeaseQuantity?scenicId=' + scenicId)
          .then(function(res){
            console.log(res);
            that.config1 = {
              number: [parseInt(res.data[0].number)],
              content: '{nt}',
              style: {
                fontSize: 70,
                fill: 'yellow',
                fontWeight: 'bold'
              }
            };
            that.config2 = {
              number: [parseInt(res.data[1].number)],
              content: '{nt}',
              style: {
                fontSize: 70,
                fill: 'red',
                fontWeight: 'bold'
              }
            };
            that.config3 = {
              number: [parseInt(res.data[0].number) - parseInt(res.data[1].number)],
              content: '{nt}',
              style: {
                fontSize: 70,
                fill: 'green',
                fontWeight: 'bold'
              }
            };
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
            that.updateTime = nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds;
          })
          .catch(function(err){
            console.log(err);
          })

        // 获取退款二维码
        that.clearCode();
        that.createCode(scenicId);
      }
    }, 1000);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hoverView{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
  }
  .contentView{
    width: 100%;
  }
  .updateTime{
    width: 100%;
    text-align: right;
    font-size: 12px;
    color: #fff;
    position: absolute;
    bottom: -25px;
    right: 10px;
    line-height: 25px;
  }
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
    /* font-weight: bold; */
    letter-spacing: 5px;
  }
  .childTitle{
    font-size: 18px;
    text-align: center;
  }

  /* 内容部分 */
  .contentView{
    width: 1920px;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: nowrap;
    margin-top: 10px;
    /* transform: scale(.9); */
    transform-origin: top center;
  }
  /* 左侧试图 */
  .leftView{
    width: 550px;
    height: 970px;
    position: relative;
  }
  .leftContent{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    align-items: center;
    background: url(../assets/left-bg.png) no-repeat left top;
    background-size: 100% 100%;
    padding: 25px 20px 0 50px;
  }
  .leftTitle{
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    padding-left: 20px;
    line-height: 40px;
    margin-bottom: 10px;
  }
  .line{
    display: block;
    width: 100%;
    margin: 10px 0;
  }
  .line img{
    width: 100%;
  }
  /* 摆渡船购票 */
  .boatList{
    width: 100%;
  }
  .boatItem{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .itemLeft{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .itemLeft p{
    font-size: 16px;
    color: #FFFF00;
  }
  .itemLeft .boatName{
    font-size: 18px;
    font-weight: bold;
  }
  .itemLeft img{
    width: 60px;
    margin: 10px 0;
  }
  .btnView{
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
  }
  .btnView a{
    display: block;
    width: 120px;
    line-height: 40px;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 10px;
    text-decoration: none;
    background-color: #fff;
    color: #666;
  }

  /* 购票须知 */
  .descTitle{
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    padding-left: 20px;
    line-height: 30px;
  }
  .descView{
    transform: scaleY(.72);
    transform-origin: 0 0;
  }
  .descView p{
    font-size: 12px;
    color: #fff;
    line-height: 18px;
  }
  .lineView{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .lineView div{
    flex: 1;
  }

  /* 退款详情 */
  .noticeTitle{
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    padding-left: 20px;
    margin-bottom: 20px;
  }
  .rightNotice{
    width: 100%;
    height: 521px;
    background: url(../assets/rightBg1.png) no-repeat left top;
    background-size: cover;
    padding: 50px 40px 40px 50px;
    padding-top: 50px;
  }

  /* 退款二维码 */
  .qrcodeView{
    width: 100%;
    padding-top: 25px;
    height: 300px;
  }
  .qrcodeViewTitle{
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    padding-left: 75px;
    line-height: 40px;
  }
  .qrcodeImgView{
    width: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #qrcode{
    padding: 5px;
    background-color: #fff;
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
    height: 970px;
    padding: 10px 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .mapView{
    width: 710px;
    height: 770px;
    margin: 0 auto;
  }
  .iframeView{
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: url(../assets/xwhmapBg1.jpg) no-repeat 14px 10px; */
    background-size: 680px 750px;
    position: relative;
  }
  .mapBg{
    position: absolute;
    left: 14px;
    top: 10px;
    width: 680px;
    height: 750px;
  }

  .progressView{
    width: 100%;
    font-size: 22px;
    color: #fff;
    padding-top: 10px;
  }
  .progressView .progressTitle{
    font-size: 20px;
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
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    width: 100%;
    line-height: 50px;
    height: 50px;
    text-align: center;
  }

  /* 右侧视图 */
  .rightView{
    width: 545px;
    height: 970px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background: url(../assets/left-bg.png) no-repeat left top;
    background-size: cover;
  }

  /* 天气预报 */
  .weatherView{
    width: 100%;
    height: 350px;
    padding-left: 60px;
    padding-top: 42px;
    padding-bottom: 20px;
    /* background: url(../assets/rightBg2.png) no-repeat left top;
    background-size: cover; */
  }
  .weatherView .dateView{
    font-size: 23px;
    color: #fff;
    line-height: 30px;
  }
  .nowWeather{
    display: flex;
    justify-content: start;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 20px;
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

  /* 租赁详情 */
  .leaseDetailView{
    width: 100%;
    height: 406px;
    padding: 20px 40px 30px 60px;
  }

  /* 在租数量 */
  .onLeaseView{
    width: 100%;
    height: 270px;
    padding: 0 40px 30px 60px;
  }
  .onLeaseView .onLeaseNumber{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .onLeaseView .noticeTitle{
    margin-bottom:10px;
  }
  .onLeaseView .leaseTitle{
    color: #fff;
    font-size: 24px;
    line-height: 70px;
  }
</style>
