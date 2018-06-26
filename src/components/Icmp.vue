<template>
  <div>
    <h1>{{ title }}</h1>
    <h2><router-link to="/">Go Back</router-link></h2>
    <h2>目标 ip: {{ destinationIp }}</h2>
    <h2>本机 ip: {{ selfIp }}</h2>
    <div>
        <input type="text" v-model="host">
        <input type="button" @click="handleClick()" value="发送">
    </div>
    
    <div id="main"></div>
  </div>
</template>

<script>
export default {
  name: 'Icmp',
  data () {
    return {
      title: '延迟检测程序 - Icmp',
      count: 11,
      option: null,
      myChart: null,
      responseData: null,
      destinationIp: null,
      selfIp: null,
      host: null
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
                subtext: 'Delay + '
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
                data:['延迟', 'TTL']
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
                    boundaryGap: [0, '100%']
                },
                {
                    type: 'value',
                    scale: true,
                    name: 'ms - TTL',
                    boundaryGap: [0, '100%']
                }
            ],
            series: [
                {
                    name:'TTL',
                    type:'line',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data:(function (){
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(20);
                        }
                        return res;
                    })()
                },
                {
                    name:'延迟',
                    type:'line',
                    data:(function (){
                        var res = [];
                        var len = 0;
                        while (len < 10) {
                            res.push(10);
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
        this.axios.post('http://103.94.185.59/icmp/ping',{
            host: this.host
        }).then((response) => {
            this.responseData = response.data
            this.destinationIp = this.responseData['result'].destination_ip
            this.selfIp = this.responseData['result'].self_ip
            var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
            var data0 = this.option.series[0].data; //TTL
            var data1 = this.option.series[1].data; //Delay
            data0.shift();
            // data0.push(Math.round(Math.random() * 20));
            data0.push(this.responseData['result'].ttl)
            data1.shift();
            // data1.push((Math.random() * 10 + 5).toFixed(1) - 0);
            data1.push(this.responseData['result'].delay)
            this.option.xAxis[0].data.shift();
            this.option.xAxis[0].data.push(axisData);
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
