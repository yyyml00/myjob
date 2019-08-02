import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)



const store = new Vuex.Store({
    state: {
        user: false,
        username: localStorage.getItem('username') || ""
      },
      mutations: {
        login (state) {
          // 变更状态
          state.username = localStorage.getItem('username') || ""
          state.user = true
        },
        logout(state) {
          state.username = localStorage.getItem('username') || ""
          state.user = false
        }
      }
})
  
export default store