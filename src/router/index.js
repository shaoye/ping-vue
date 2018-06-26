import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Icmp from '@/components/Icmp'
import Udp from '@/components/Udp'
import Tcp from '@/components/Tcp'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/icmp',
      name: 'Icmp',
      component: Icmp
    },
    {
      path:'/udp',
      name: 'Udp',
      component: Udp
    },
    {
      path:'/tcp',
      name: 'Tcp',
      component: Tcp
    }
  ]
})
