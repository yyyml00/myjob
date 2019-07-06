import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Subindex from '@/components/childrenCps/index'
import Userinfo from '@/components/childrenCps/user/userInfo'
import Jiform from '@/components/childrenCps/xuncha/jiForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },{
      path: '/index',
      component: Index,
      children: [
        {
          path: '/index',
          component: Subindex,
        },{
          path: '/index/userinfo',
          component: Userinfo,
        },{
          path: '/index/jiform',
          component: Jiform
        }

      ]
    }
  ]
})
