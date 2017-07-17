import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import navbarku from '@/components/navBarKu'
import Homenya from '@/components/Homenya'
import newQuestion from '@/components/newQuestion'
import detailQuestion from '@/components/detailQuestion'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start-page',
      component: Hello
    }, {
      path: '/home',
      name: 'home-page',
      component: Homenya
    }, {
      path: '/new-question',
      name: 'new-question',
      component: newQuestion
    }, {
      path: '/questions/:questId',
      name: 'detail-question',
      component: detailQuestion,
      props: true
    }
  ]
})
