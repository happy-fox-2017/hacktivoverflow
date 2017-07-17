import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import navbarku from '@/components/navBarKu'
import Homenya from '@/components/Homenya'
import newQuestion from '@/components/newQuestion'
import detailQuestion from '@/components/detailQuestion'
import editQuestion from '@/components/editQuestion'
import yourQuestions from '@/components/yourQuestions'

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
    }, {
      path: '/questions/:questId/edit',
      name: 'edit-question',
      component: editQuestion,
      props: true
    }, {
      path: '/your-questions',
      name: 'your-questions',
      component: yourQuestions
    }
  ]
})
