import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import chat from '@/components/chat'
import signin from '@/pages/signin'
import allGroup from '@/components/allGroup'
import signup from '@/pages/signup'
import file from '@/components/file'
import meeting from '@/components/meeting'
import notification from '@/components/notification'
import exercise from '@/components/exercise'
import exStudent from '@/components/exStudent'
import exAdmin from '@/components/exAdmin'
import error from '@/components/error'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: index,
      redirect: "/allGroup",
      children: 
      [
        // {
        //   path: '',
        //   name: 'index',
        //   component: allGroup
        // },
        {
          path: 'chat',
          name: 'chat',
          component: chat
        },
    
        {
          path: 'allGroup',
          name: 'allGroup',
          component: allGroup
        },
    
        {
          path: 'file',
          name: 'file',
          component: file
        },
        {
          path: 'notification',
          name: 'notification',
          component: notification
        },
        {
          path: 'exercise',
          name: 'exercise',
          component: exercise
        },
        {
          path: 'meeting/:id',
          name: 'meeting',
          component: meeting
        },
        {
          path: 'exStudent/:id',
          name: 'Exercise',
          component: exStudent
        },
        {
          path: 'exAdmin/:id',
          name: 'Manage',
          component: exAdmin
        },
      ]
    },
    
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '*',
      name: 'error',
      component: error
    },
  ],

})
router.beforeEach((to, from, next) => {
  switch (to.fullPath) {
    case '/signin':
      {
        if (localStorage.token != undefined)
          next('/')
        else
          next();
        break;
      };
    case '/signup':
      {
        if (localStorage.token != undefined) {
          alert('vui lòng đăng xuất trước');
          next('/')
        }
        else
          next();
        break;
      };
    default: {
      if (localStorage.token != undefined)
        next()
      else
        next('/signin')
      break;
    }
  }
})
export default router;