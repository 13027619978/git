<template>
  <div class="hello">
    <div class="container" :style="{transform:`scale(`+xscale+`,`+yscale+`)`}" style="transform-origin: 0 0;">
      <div class="titleView">
        <img src="../assets/titleBg1.png">
        <div class="dateView">
          <p>2021-11-16 星期二 24:00:00</p>
          <span>|</span>
          <p>0~10℃ 晴</p>
        </div>
        <div class="title">
          <p>玄武湖景区观光车运营调度中心</p>
        </div>
        <div class="tabView">
          <router-link to="/xwhzhzxview"></router-link>
          <router-link to="/xwhdpczhzxview">About</router-link>
        </div>
      </div>
      <div class="contentView">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'NewXwhdpczhzxView',
  data () {
    return {
      xscale: 1,
      yscale: 1
    }
  },
  methods: {

  },
  mounted: function(){
    let that = this;
    let xScale = window.innerWidth / 1920;
    let yScale = window.innerHeight / 1080;
    that.xscale = xScale;
    that.yscale = yScale;
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    background-color: #001133;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-size: cover;
  }
  .container{
    width: 1920px;
    background: none;
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
  
  .tabView{
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px 0;
    color: #fff;
    font-size: 14px;
  }

</style>
