<template>
  <div id="app">
    <img src="./assets/logo.png" height="100px" width="100px">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    console.log(window.echarts)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
