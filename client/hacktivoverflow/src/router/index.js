import Vue from 'vue';
import Router from 'vue-router';
// import Hello from '@/components/Hello';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import Main from '@/components/Main';
import MainQuestion from '@/components/MainQuestion';
import NewQuestion from '@/components/NewQuestion';
import QuestionDetails from '@/components/QuestionDetails';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/main/questions',
          name: 'MainQuestion',
          component: MainQuestion,
        },
        {
          path: '/main/newquestion',
          name: 'NewQuestion',
          component: NewQuestion,
        },
        {
          path: '/main/questiondetails/:questionId',
          name: 'QuestionDetails',
          component: QuestionDetails,
        },
      ],
    },
  ],
});
