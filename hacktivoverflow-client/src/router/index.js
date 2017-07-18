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
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Mainmenu',
      component: Mainmenu
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
