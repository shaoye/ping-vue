<template>
  <div class="main">
    <h1>{{ title }}</h1>
    <h2><router-link to="/">Go Back</router-link></h2>
  </div>
</template>

<script>
export default {
  name: 'Udp',
  data () {
    return {
      title: '延迟检测程序 - Udp'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
