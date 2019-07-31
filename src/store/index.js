import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)



const store = new Vuex.Store({
    state: {
        user: true,
        username: localStorage.getItem('username') || " "
      },
      mutations: {
        
      }
})
  
export default store