import { checkFuc } from '@services/login'
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import { config, menu, pubfuc } from '../utils'

const { prefix } = config
const { getCookieByString, delCookie } = pubfuc

// 遍历权限路由数组判断权限
const checkRoutes = (tar, ary) => {
  for (const i in ary) {
    if (tar && tar === ary[i]) {
      return true
    }
  }
  return false
}

export default {
  namespace: 'app',
  state: {
    login: false,
    user: {},
    privilege: [],
    permissions: ['/merchant', '/merchant/audit', '/merchant/review', '/setting/role', '/setting/user', '/setting/audit', '/setting/privilege', '/agent', '/agent/audit', '/agent/review', '/transaction/total', '/transaction/flow', '/statistic/merchant', '/statistic/agent', '/statistic/contrast', '/statistic/remit', '/materials/qrcode', '/materials/board'],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // 检查登录状态
      dispatch({
        type: 'checkLogin',
      })
    },
  },
  effects: {
    // 检查登录状态(token)，无登录进入登录界面
    *checkLogin({
      payload,
    }, { call, put, select }) {
      // 获取cookies
      const uid = getCookieByString('token')
      const { pathname, search } = location
      if (uid) {
        // 获取登录信息
        yield put({ type: 'login/tokenLogin', payload: { uid, pathname, search } })
        console.log(1)
      } else {
        // 进入登录页
        const { login } = yield select(state => state.app)
        if (!login) {
          if (pathname !== '/login') {
            yield put(routerRedux.push(`/login?from=${pathname + search}`))
          } else {
            yield put(routerRedux.push('/login'))
          }
        }
      }
    },
    // 路由跳转
    *link({
      payload,
    }, { call, put }) {
      const { path, rpath } = payload
      yield put({
        type: 'checkPermissions',
        payload: {
          path,
          rpath,
        },
      })
    },
    // 检查路由权限--处理路由跳转
    *checkPermissions({
      payload,
    }, { call, put, select }) {
      const { path, rpath, cb } = payload
      // console.log(path)
      // 进行权限检查
      const { permissions } = yield select(state => state.app)
      const per = checkRoutes(rpath, permissions)
      if (per) {
        // 有权限进入此路由
        // 传参时带有path是路由跳转的情况，不带path是意外进入无权限路由的情况
        if (path) {
          yield put(routerRedux.push(path))
        }
      } else {
        // 无权限进入
        yield put(routerRedux.push('/'))
        throw new Error('您没有权限进入此模块')
      }
    },
    // 检查操作权限--处理操作权限甄别
    *checkActionPermissions({
      payload,
    }, { call, put, select }) {
      const { path, cb } = payload
      // console.log(path)
      // 进行权限检查
      const { permissions } = yield select(state => state.app)
      const per = checkRoutes(path, permissions)
      if (per) {
        // 有权限进入此路由
        // 传参时带有path是路由跳转的情况，不带path是意外进入无权限路由的情况
        if (cb && typeof cb === 'function') {
          cb()
        }
      } else {
        // 无权限进行操作
        throw new Error('您没有权限进行此操作')
      }
    },
    // 退出登录
    *logout({}, { put }) {
      delCookie('token')
      yield put({ type: 'clearLogin' })
      yield put({ type: 'checkLogin' })
    },
  },
  reducers: {
    // 登录成功，保存登录之后传来的数据
    loginSuccess(state, { payload: user }) {
      const login = true
      return {
        ...state,
        login,
        user,
      }
    },
    // 清除登录状态
    clearLogin(state) {
      const login = false
      return {
        ...state,
        login,
      }
    },

  },
}
