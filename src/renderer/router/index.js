import Vue from 'vue'
import Router from 'vue-router'

import BI from '../pages/BI/main'
import Login from '../pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/landing-page',
      name: 'landing-page',
      component: Login
    },
    {
      path: '/',
      name: 'dataVisual',
      component: BI
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
