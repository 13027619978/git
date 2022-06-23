<template>
  <div class="hello" :style="{background:url_back_img}" style="width: 100vw;height: 100vh;overflow: hidden;background-size: cover;">
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="contentView">
        <!-- 近7日运营情况 -->
        <div class="operatingInfo">
          <p class="noticeTitle">防诈骗APP下载次数统计</p>
          <div class="downloadView">
            <div class="downloadTitle">
              <p>姓名</p>
              <p>次数</p>
            </div>
            <div class="downloadItem" v-for="(item, i) in downloadList ">
              <p>{{item.name}}</p>
              <p>{{item.downloadNumber}}</p>
            </div>
          </div>
          <dv-charts :option="option3" style="width:100%;height:253px" />
          <p class="nowDate">当前时间：{{nowDate}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QRCode from 'qrcode2';
export default {
  name: 'FzpView',
  data () {
    return {
      "yz": 0,
      "wz": 0,
      "url_back_img": "url("+require('../assets/zhzx-bg.jpg')+") no-repeat left top #000",
      "zlbl": {},
      "xscale": 1,
      "yscale": 1,
      "nowDate": "2021-01-19 00:00:00",
      "nowPic": "",
      "option3": {},
      "downloadList": [],
      "src": ""
    }
  },
  mounted: function(){
    let scenicId = '9c938dcc1cca436093bb4432392dee2b';
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

    var seconds = 0;
    setInterval(function(){
      seconds += 1;
      if(seconds == 1 || seconds % 20 == 0){
        // 近7日运营
        axios.get('http://node.smart-ideas.com.cn:3001/datav/fzp/getDownload')
          .then(function(res){
            console.log(res);
            var nameList = [];
            var downloadList = [];
            res.data.data.forEach(function(value, key){
              nameList.push(value.name);
              downloadList.push(value.downloadNumber);
            })
            that.downloadList = res.data.data;
            that.option3 = {
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
                    fontSize: 15,
                    rotate: 0
                  }
                }
              },
              yAxis: {
                min: 0,
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
                    fontSize: 15,
                    rotate: 0
                  }
                }
              },
              series: [
                {
                  name: '自驾船',
                  data: downloadList,
                  type: 'bar',
                  barStyle: {
                    fill: '#0a73ff'
                  },
                  label: {
                    show: true,
                    position: 'top',
                    offset: [0, -10],
                    style: {
                      fill: '#fff',
                      fontSize: 15,
                    }
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
      }
    }, 1000);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    width: 1920px;
    background: none;
  }
  .contentView{
    /* transform: scale(.9); */
    transform-origin: top center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 内容部分 */
  .contentView{
    width: 100%;
    margin-top: 10px;
  }
  .noticeTitle{
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    padding-left: 20px;
    margin-bottom: 20px;
    text-align: center;
    line-height: 70px;
  }

  .downloadView{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 1600px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    margin-bottom: 40px;
  }
  .downloadView>div{
    flex: 1;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
  }
  .downloadView>div p{
    font-size: 16px;
    color: #333;
    text-align: center;
    line-height: 35px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }

  .nowDate{
    position: fixed;
    bottom: 50px;
    right: 150px;
    color: #fff;
    font-size: 16px;
  }



</style>
