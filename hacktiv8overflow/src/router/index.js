import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import navbarku from '@/components/navBarKu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start-page',
      component: Hello
    }
  ]
})
