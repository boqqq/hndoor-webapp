import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import common from './modules/common'
import user from './modules/user'
// import tag from './modules/tag'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    // tag
  },
  state:{
    isLoading:true,
    loadingStatus:false,
  },
  mutations: {
    loadingTrue(state) {
      state.isLoading = true
    },
    loadingFalse(state) {
      state.isLoading = false
    },
    loadingStatusTrue(state) {
      state.loadingStatus = true
    },
    loadingStatusFalse(state) {
      state.loadingStatus = false
    },
    // 重置vuex本地储存状态
    resetStore (state) {
      // Object.keys(state).forEach((key) => {
      //   state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
      // })
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
