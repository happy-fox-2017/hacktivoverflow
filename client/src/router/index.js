import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Question from '@/components/Questions'
import Answer from '@/components/Answer'
import Signin from '@/components/Signin'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          name: 'question',
          component: Question,
        },
        {
          path: 'signin/',
          name: 'signin',
          component: Signin
        },
        {
          path: 'users/',
          name: 'users',
          component: Users
        },
        {
          path: 'answer/',
          name: 'answer',
          component: Answer
        }
      ]
    }
  ]
})
