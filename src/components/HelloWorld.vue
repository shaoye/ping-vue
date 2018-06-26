<template>
  <div class="main">
    <h1>{{ title }}</h1>
    <ul>
       <li><router-link to="/Icmp">Icmp</router-link></li>
       <li><router-link to="/Udp">Udp</router-link></li>
       <li><router-link to="/Tcp">Tcp</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: '延迟检测程序'
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
