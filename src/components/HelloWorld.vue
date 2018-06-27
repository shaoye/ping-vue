<template>
  <div class="container" id="main">
    <div class="row">
      <div class="col-md-12">
        <h1>{{ title }}</h1>
        <h2>
          <ul>
            <li><router-link to="/Icmp">ICMP</router-link></li>
            <li><router-link to="/Udp">UDP</router-link></li>
            <li><router-link to="/Tcp">TCP</router-link></li>
          </ul>
        </h2>

       </div>
    </div>
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
#main, #main2 {
  padding-top: 20px;
}
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
