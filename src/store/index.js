import Vue from 'vue'
import Vuex from 'vuex'
import city from './module/cityModule'
import cinema from './module/cinemaModule'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 状态管理(共享)
// 缓存数据==>内存， 只要刷新页面，数据就丢了
// 订单，详情，，，不适用vuex缓存数据
/*
  1. 非父子通信的问题
  2. 缓存后端数据，提供用户体验
*/
const store = new Vuex.Store({
  plugins: [createPersistedState({
    reducer (data) {
      return {
        city: data.city
      }
    }
  })],
  state: {
    isTabbarShow: true

  }, // "全局"状态
  mutations: {
    show (state) {
      // console.log("show")
      state.isTabbarShow = true
    },
    hide (state) {
      // console.log("hide")
      state.isTabbarShow = false
    }

  },
  // 异步处理
  actions: {

  },
  modules: {
    city,
    cinema
  }

})
export default store
