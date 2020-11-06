import Vue from 'vue'
import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {getRuntimeArgs} from './runtime-args'

Vue.use(ElementUI)                       // api: https://github.com/ElemeFE/element
import '@/icons'                              // api: http://www.iconfont.cn/
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
// import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth } from '@/utils'
import common from '@/utils/common'
import httpTAG from '@/utils/httpTAG'
import httpTAGUrl from '@/utils/httpTagRequest'
// import httpUC from '@/utils/httpUC'
// import cloneDeep from 'lodash/cloneDeep'
// import vueResource from 'vue-resource'

// Vue.use(vueResource)
Vue.use(VueCookie)
Vue.use(common)

import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

Vue.config.productionTip = false

// 挂载全局
Vue.prototype.$httpTAG = httpTAG // ajax请求方法
Vue.prototype.$httpTAGUrl = httpTAGUrl // ajax请求方法
// Vue.prototype.$httpUC = httpUC
Vue.prototype.isAuth = isAuth     // 权限方法

// 保存整站vuex本地储存初始状态
// window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

/* eslint-disable no-new */

getRuntimeArgs().then(async () => {
    new Vue({
        router,
        store,
        ...App,
    }).$mount('#app')
})
