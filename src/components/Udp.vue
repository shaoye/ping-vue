<template>
  <div class="container">
      <div class="row">
          <div class="col-md-12">
            <h1>{{ title }}</h1>
            <h2><router-link to="/">Go Back</router-link></h2>
          </div>
      </div>
      <div class="row">
          <div class="col-md-3">
              <h2>
                    <li>目标 ip: {{ destinationIp }}</li>
              </h2>
          </div>
          <div class="col-md-3">
              <h2>
                    <li>本机 ip: {{ selfIp }}</li>
              </h2>
          </div>
          <div class="col-md-3">
              <h2>
                    <li>From port: {{ fromPort }}</li>
              </h2>
          </div>
          <div class="col-md-3">
              <h2>
                    <li>Target port: {{ targetPort }}</li>
              </h2>
          </div>
      </div>
    <div class="row align-items-center justify-content-center" >
            <form class="form-inline" >
                    <div class="form-group">
                        <input id="inpt1" type="text"  class="form-control " placeholder="请输入域名或 IP 地址" v-model="host">
                        <input id="inpt2" type="text"  class="form-control" placeholder="请输入域名或 IP 地址" v-model="port">
                        <button id="inpt2" type="submot" class="btn btn-success" @click="handleClick()" >开始测试</button>
                    </div>
            </form>
    </div>
    <div class="row align-items-center justify-content-center">
         <div id="main"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Udp',
  data () {
    return {
      title: '延迟检测程序 - UDP',
      count: 11,
      option: null,
      myChart: null,
      responseData: null,
      destinationIp: null,
      selfIp: null,
      host: 'udp_test.gaoliang.im',
      fromPort: null,
      targetPort: null,
      port: 9999
    }
  },
  mounted () { 
      this.myChart = window.echarts.init(document.getElementById('main'))
      this.initOption()
      this.myChart.setOption(this.option)
      

  },
  methods: {
      handleClick () {
        this.updateOption() 
        setInterval(this.updateOption,2100)
      },
      initOption (){
        // window.echarts.dispose(document.getElementById('main'))
        this.option = {
            title: {
                text: '延迟测量数据',
                subtext: 'Delay'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#283b56'
                    }
                }
            },
            legend: {
                data: '延迟'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            dataZoom: {
                show: false,
                start: 0,
                end: 100
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data: (function (){
                        var now = new Date();
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                },
                {
                    type: 'category',
                    boundaryGap: true,
                    data: (function (){
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(10 - len - 1);
                        }
                        return res;
                    })()
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    name: 'ms - 延迟',
                    boundaryGap: ['0%', '60%'],
                    min: 0,
                    max: function(value) {
                        return value.max + 20;
                    }
                },
                {
                    // type: 'value',
                    // scale: true,
                    // name: 'ms - TTL',
                    // boundaryGap: ['0%', '60%'],
                    // min: 0,
                    // max: 100
                }
            ],
            series: [
                {
                    name:'TTL',
                    type:'line',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    // data:(function (){
                    //     var res = [];
                    //     var len = 10;
                    //     while (len--) {
                    //         res.push(20);
                    //     }
                    //     return res;
                    // })()
                },
                {
                    name:'延迟',
                    type:'line',
                    data:(function (){
                        var res = [];
                        var len = 0;
                        while (len < 10) {
                            res.push(0);
                            len++;
                        }
                        return res;
                    })()
                }
            ]
        };
      },
      updateOption () {
        //先直接赋值，等接口写好后再用 vue-axios 获取 respinsData
        // var responseData = {
        //     "successs": true,
        //     "result": {
        //         "delay": 55,
        //         "ttl": 80,
        //         "destination_ip": "127.0.0.1",
        //         "self_ip": "192.168.1.1"
        //     }
        // }
        this.axios.post('http://0.0.0.0:23948/udp/ping',{
            host: this.host,
            port: this.port
        }).then((response) => {
            this.responseData = response.data
            this.destinationIp = this.responseData['result'].destination_ip
            this.selfIp = this.responseData['result'].self_ip
            this.fromPort = this.responseData['result'].from_port
            this.targetPort = this.responseData['result'].target_port
            var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
            this.option.series[1].data.shift(); //Delay
            this.option.series[1].data.push(this.responseData['result'].delay.toFixed(2)) //Delay
            this.option.xAxis[1].data.shift();
            this.option.xAxis[1].data.push(this.count++);
            this.myChart.setOption(this.option);
        })
        
      }
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
    padding-top: 20px;
}
#centerform {
    float: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 50px;
}
#inpt1 {
    width: 350px;
}
#inpt2 {
    width: 100px;
    margin-left:  20px;
}
#main {
    height: 600px;
    width: 600px;
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
