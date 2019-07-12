import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Subindex from '@/components/childrenCps/index'
import Userinfo from '@/components/childrenCps/user/userInfo'
import Jiform from '@/components/childrenCps/xuncha/jiForm'
import Weixiu from '@/components/childrenCps/shebei/weixiu'
import Efile from '@/components/childrenCps/shebei/e-file'
import Quexian from '@/components/childrenCps/shebei/quexian'
import Addquexian from '@/components/childrenCps/shebei/addquexian'
import Editquexian from '@/components/childrenCps/shebei/editQuexian'

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
        },{
          path: '/index/weixiu',
          component: Weixiu
        },{
          path: '/index/e-file',
          component: Efile
        },{
          path: '/index/quexian',
          component: Quexian
        },{
          path: '/index/addquexian',
          component: Addquexian
        },{
          path: '/index/editQuexain/:id',
          component: Editquexian
        }


      ]
    }
  ]
})
