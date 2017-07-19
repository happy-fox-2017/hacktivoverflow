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
      name: 'Main',
      component: Main,
      children: [
        {
          path: '',
          name: 'MainQuestion',
          component: MainQuestion,
        },
        {
          path: '/newquestion',
          name: 'NewQuestion',
          component: NewQuestion,
        },
        {
          path: '/questiondetails/:questionId',
          name: 'QuestionDetails',
          component: QuestionDetails,
        },
      ],
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
  ],
});
