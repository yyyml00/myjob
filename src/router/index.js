import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Index from '@/components/index'
import Login from '@/components/login'
import Register from '@/components/register'
import Subindex from '@/components/childrenCps/index'
import Gzliu from '@/components/childrenCps/gzliu/index'
import Renwu from '@/components/childrenCps/gzliu/renwu'
// import Task from '@/components/childrenCps/gzliu/task'
import Userinfo from '@/components/childrenCps/user/userInfo'
import dayxuncha from '@/components/childrenCps/xuncha/dayxuncha'
import Weixiu from '@/components/childrenCps/shebei/weixiu'
import Jiaojieban from '@/components/childrenCps/jiaojieban/index'
import Yanghu from '@/components/childrenCps/shebei/yanghu'
import Diba from '@/components/childrenCps/tiba/index'
import Efile from '@/components/childrenCps/shebei/e-file'
import Zichan from '@/components/childrenCps/shebei/zichan'
import Quexian from '@/components/childrenCps/shebei/quexian'
import Dayyanghu from '@/components/childrenCps/shebei/dayyanghu'
import Diaodu from '@/components/childrenCps/diaodu/diaodu'

Vue.use(Router)

 const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index',
      meta: { requiresAuth: true }
    },{
      path: '/login',
      component: Login
    },{
      path: '/register',
      component: Register
    },{
      path: '/index',
      component: Index,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/index',
          component: Subindex,
        },{
          path: '/index/userinfo',
          component: Userinfo,
        },{
          path: '/index/gzliu',
          component: Gzliu,
        },{
          path: '/index/jiaojieban',
          component: Jiaojieban,
        },{
          path: '/index/diaodu',
          component: Diaodu,
        },{
          path: '/index/diba',
          component: Diba,
        },{
          path: '/index/dayyanghu',
          component: Dayyanghu,
        },{
          path: '/index/renwu',
          component: Renwu,
        },{
          path: '/index/e-file',
          component: Efile,
        },{
          path: '/index/zichan',
          component: Zichan,
        },{
          path: '/index/dayxuncha',
          component: dayxuncha
        },{
          path: '/index/weixiu',
          component: Weixiu
        },{
          path: '/index/yanghu',
          component: Yanghu
        },{
          path: '/index/quexian',
          component: Quexian
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => { 
  if (to.matched.some(record => record.meta.requiresAuth)) {  // 判断该路由是否需要登录权限
    if (store.state.username || !store.state.username === '') { 
       // 通过vuex state获取当前的token是否存在
       NProgress.start()
        next();
    }
    else {
        NProgress.start()
        next({
            path: '/login',
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }
}
else {
    NProgress.start()
    next();
}
});
router.afterEach(() => {

  NProgress.done()
})

export default router



