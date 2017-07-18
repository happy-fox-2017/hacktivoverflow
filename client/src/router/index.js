import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Signin from '@/components/Signin'
import homeapp from '@/components/Homeapp'
import Register from '@/components/Register'
import Question from '@/components/Question'
import groupquestion from '@/components/GroupQuestion'
import Answer from '@/components/Answer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
     },
     {
          path: '/signin',
          name: 'Signin',
          component: Signin
     },
     {
          path: '/register',
          component: Register
     },
     {
          path: '/home',
          component: homeapp,
          children: [
               {
               path: '/',
               component: groupquestion
          }
       ]
      },
     {
          path: '/question',
          component: Question,
          children: [
               {
               path: '/',
               component: Answer
             }
          ]
     }
  ]
})
