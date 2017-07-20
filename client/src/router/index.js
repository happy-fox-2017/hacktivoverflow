import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Asking from '@/components/Asking'
import Listings from '@/components/Listings'
import SingleQ from '@/components/SingleQ'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ask',
      name: 'Asking',
      component: Asking
    },
    {
      path: '/lists',
      name: 'Listings',
      component: Listings
    },
    {
      path: '/question/:id',
      name: 'SingleQ',
      props: true,
      component: SingleQ
    }
  ]
})
