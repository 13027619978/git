<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  img{
    display: block;
  }
  .container{
    background: url(./assets/bg.png) no-repeat left top;
    background-size: cover;
  }
</style>
