import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import RouterConstants from '@/constants/router.js'
import runtimeArgs from '@/runtime-args'

/**
 * 获取uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth (keys) {
  let flag = true;
  if('NO' == runtimeArgs.VUE_APP_AUTH_NEED){
    return flag
  }

  if(null == keys){
    return flag
  }

  let permissions = JSON.parse(sessionStorage.getItem(RouterConstants.permissions) || '[]')
  let ownCode = keys.split(",")
  let ownCodeLength = ownCode.length
  if(null != ownCode && ownCodeLength > 0){
    flag = false
    for(let i=0; i<ownCodeLength; i++){
      if(ownCode[i] && permissions.indexOf(ownCode[i].trim()) !== -1){
        flag = true
        break;
      }
    }
  }

  return flag
}

export function toAuthLogin () {
    const httpLogin = runtimeArgs.VUE_APP_AC_HTTP_LOGIN
    let locationHref = runtimeArgs.VUE_APP_BACK_RETURN
    let url = `${httpLogin}?redirect_url=`+locationHref
    location.href = url
}

export function toAuthLogin2 () {
    const httpLogin = runtimeArgs.VUE_APP_AC_HTTP_LOGIN
    let locationHref = location.href
    let url = `${httpLogin}?redirect_url=${encodeURIComponent(locationHref)}`
    location.href = url
}

export function logoutAfter () {
  const afterUrl = runtimeArgs.VUE_APP_LOGIN_AFTER
  location.href = afterUrl
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'id', pid = 'parentId') {
  let res = []
  let temp = {}
  for (let i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  Vue.cookie.delete('token')
  store.commit('resetStore')
  router.options.isAddDynamicMenuRoutes = false
}
