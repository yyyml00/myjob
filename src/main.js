// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App'

import router from './router'
import qs from 'qs'
import axios from 'axios'
import {dateFormat} from './assets/utils.js'

import moment from 'moment'//导入文件

Vue.prototype.moment = moment;//赋值使用

moment.locale('zh-cn');//需要汉化

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.axios = axios;
Vue.prototype.qs=qs;
Vue.prototype.dateFormat = dateFormat

Vue.use(ElementUI);
// Vue.use(qs);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
