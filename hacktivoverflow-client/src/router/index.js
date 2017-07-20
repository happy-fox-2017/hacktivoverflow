import Vue from 'vue'
import Router from 'vue-router'
import Mainmenu from '@/components/Mainmenu'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      props: true
    },
    {
      path: '/dashboard',
      name: 'Mainmenu',
      component: Mainmenu,
      props: true
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      props: true
    }
  ]
})
