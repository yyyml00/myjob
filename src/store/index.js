import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)



const store = new Vuex.Store({
    state: {
        user: false,
        username: localStorage.getItem('username') || "",
        id: localStorage.getItem('id') || "",
      },
      mutations: {
        login (state) {
          // 变更状态
          state.username = localStorage.getItem('username')
          console.log(localStorage.getItem('username'))
          state.user = true
          state.id = localStorage.getItem('id')
          console.log(localStorage.getItem('id'))
        },
        logout(state) {
          state.username = ""
          state.user = false
          state.id = ""
        }
      }
})
  
export default store