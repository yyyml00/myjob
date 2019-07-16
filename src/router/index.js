import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import Register from '@/components/register'
import Subindex from '@/components/childrenCps/index'
import Userinfo from '@/components/childrenCps/user/userInfo'
import Jiform from '@/components/childrenCps/xuncha/jiForm'
import Weixiu from '@/components/childrenCps/shebei/weixiu'
import Yanghu from '@/components/childrenCps/shebei/yanghu'
import Efile from '@/components/childrenCps/shebei/e-file'
import Quexian from '@/components/childrenCps/shebei/quexian'
import Addquexian from '@/components/childrenCps/shebei/addquexian'
import Addyanghu from '@/components/childrenCps/shebei/addyanghu'
import Editquexian from '@/components/childrenCps/shebei/editQuexian'
import Edityanghu from '@/components/childrenCps/shebei/edityanghu'
import AddEfile from '@/components/childrenCps/shebei/addE-file'
import EditEfile from '@/components/childrenCps/shebei/editEfile'
import Edituser from '@/components/childrenCps/user/edituser'
import AddWeixiu from '@/components/childrenCps/shebei/addWeixiu'
import Editweixiu from '@/components/childrenCps/shebei/editWeixiu'
import Adduser from '@/components/childrenCps/user/adduser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },{
      path: '/login',
      component: Login
    },{
      path: '/register',
      component: Register
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
          path: '/index/adduser',
          component: Adduser,
        },{
          path: '/index/jiform',
          component: Jiform
        },{
          path: '/index/weixiu',
          component: Weixiu
        },{
          path: '/index/yanghu',
          component: Yanghu
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
          path: '/index/addyanghu',
          component: Addyanghu
        },{
          path: '/index/editQuexain/:id',
          component: Editquexian
        },{
          path: '/index/edituser/:id',
          component: Edituser
        },{
          path: '/index/edityanghu/:id',
          component: Edityanghu
        },{
          path: '/index/addE-file',
          component: AddEfile
        },{
          path: '/index/editEfie/:id',
          component: EditEfile
        },{
          path: '/index/addWeixiu',
          component: AddWeixiu
        },{
          path: '/index/editWeixiu/:id',
          component: Editweixiu
        }



      ]
    }
  ]
})



