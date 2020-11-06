import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import merge from 'lodash/merge'
import {toAuthLogin} from '@/utils'
import store from '@/store'
// import RouterConstants from '@/constants/router.js'
import runtimeArgs from '@/runtime-args'

const http = axios.create({
    timeout: 1000 * 30,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    // let authorization = Vue.cookie.get('Authorization')
    // console.log('Authorization', authorization)
    // if(authorization){
    //     config.headers['Authorization'] = authorization // 请求头带上token
    //     // config.headers['Authorization'] = 'bearer ' + Vue.cookie.get('Authorization') // 请求头带上token
    // }

    //全局loading
    if (store.state.loadingStatus == true) {
        store.commit('loadingFalse')
    } else {
        store.commit('loadingTrue')
    }

    return config
}, error => {
    return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    // alert(JSON.stringify(response))
    // let responseURL = response.request.responseURL;
    // if(!sessionStorage.getItem(RouterConstants.permissions) && (null != responseURL) && responseURL.indexOf(RouterConstants.userUrl)!=-1){
    //     sessionStorage.setItem(RouterConstants.permissions,JSON.stringify(response.data.permissionCodes || '[]'));
    //     location.reload()
    // }
    store.commit('loadingFalse')
    store.commit('loadingStatusFalse')
    return response
}, error => {
    store.commit('loadingFalse')
    store.commit('loadingStatusFalse')

    console.log('异常信息-----------------------------------------start')
    let resMsg = "请求异常"
    console.log(error)
    if (error.response && error.response.data) {
        if (error.response.data.code === '401' || error.response.status == '401') {
            console.log('跳转到登录地址: 401')
            toAuthLogin()
            return
        } else if (error.response.data.message) {
            resMsg = error.response.data.message
            if ("用户未登录" === resMsg) {
                console.log('跳转到登录地址: 用户未登录')
                toAuthLogin()
                return
            }
        }
    }
    Vue.prototype.$message.error(resMsg)
    console.log('异常信息-------------------------------------------end')
    return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
    // return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
    return runtimeArgs.VUE_APP_TAG_SERVER_URL + actionName
}

/**
 * 标签系统接口请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornTAGUrl = (actionName) => {
    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
    // return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
    return runtimeArgs.VUE_APP_TAG_API_URL + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        't': new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
    var defaults = {
        't': new Date().getTime()
    }
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}
window.isObject = (o)=>{return Object.prototype.toString.call(o) == '[object Object]'}
Vue.prototype.$download = function (parm){
    // let load = Loading.service({
    //      text:'正在进行导出，请耐心等待........'
    //  })
    parm = parm || {url:'',data:{}}
    if(parm.url) parm.url = this.$httpTAG.adornUrl(parm.url);
    var contentType = 'application/octet-stream; charset=utf-8';

    if(parm.data){
        if (isObject(parm.data)) {
            contentType  = 'application/json;charset=utf-8';
        }
        parm.data = isObject(parm.data) ? this.$httpTAG.adornData(parm.data) : JSON.stringify(parm.data)
    }
    let opt = merge({}, parm, {
        method: 'post',
        responseType: 'blob',
        headers: {
            'Content-Type': contentType
        }
    })
    return this.$httpTAG(opt).then(
        res => { // 处理返回的文件流
            let fileName = res.headers['content-disposition'] ? decodeURIComponent(res.headers['content-disposition'].split('=')[1]) : (parm.file || "导出文件") + ".xlsx"
            const blob = new Blob([res.data])
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
            // load.close()
        })
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
    console.log("clear login info is running....")
    Vue.cookie.delete('token')
    sessionStorage.clear();
}

Vue.prototype.$downloadFile = function (parm){
    // let load = Loading.service({
    //      text:'正在进行导出，请耐心等待........'
    //  })
    parm = parm || {url:'',data:{}}
    if(parm.url) parm.url = this.$httpTAG.adornUrl(parm.url);
    var contentType = 'application/octet-stream; charset=utf-8';

    if(parm.data){
        if (isObject(parm.data)) {
            contentType  = 'application/json;charset=utf-8';
        }
        parm.data = isObject(parm.data) ? this.$httpTAG.adornData(parm.data) : JSON.stringify(parm.data)
    }
    let opt = merge({}, parm, {
        method: 'post',
        responseType: 'blob',
        headers: {
            'Content-Type': contentType
        }
    })
    return this.$httpTAG(opt).then(
        res => { // 处理返回的文件流
            let data = JSON.parse(parm.data)
            let fileName =data.fileName; //res.headers['content-disposition'] ? decodeURIComponent(res.headers['content-disposition'].split('=')[1]) : (parm.data.fileName || "导出文件.xls")
            const blob = new Blob([res.data])
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
            // load.close()
        })
}
export default http
