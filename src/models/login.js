import { loginFuc, checkFuc } from '@services/login'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'login',
  state: {
    url: '/',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        // 进入路由，获取数据
        if (location.pathname === '/login') {
          dispatch({
            type: 'saveFrom',
            payload: location.query,
          })
        }
      })
    },

  },

  effects: {
    *login({
      payload,
    }, { put, call, select }) {
      const { pathname, search, ...newData } = payload
      const { success, message, data } = yield call(loginFuc, newData)
      if (success) {
        // TODO: 方便调试的改动，记得改回来
        yield put({ type: 'app/loginSuccess', payload: data })
        // 进入主页
        const { url } = yield select(state => state.login)
        // yield put(routerRedux.replace('/'))
        yield put(routerRedux.replace(url))
      } else {
        throw new Error(data || message)
      }
    },
    // token登录
    *tokenLogin({
      payload,
    }, { put, call }) {
      const { uid, pathname, search } = payload
      const { success, message, data } = yield call(checkFuc, { uid })
      if (success) {
        // TODO: 方便调试的改动，记得改回来
        yield put({ type: 'app/loginSuccess', payload: data })
        // 进入主页
        yield put(routerRedux.push(`${pathname}${search}`))
      } else {
        throw new Error(data || message)
      }
    },
    // 保存来源信息
    *logout({
      payload,
    }, { put, call }) {
      yield put()
    },

  },
  reducers: {
    // 保存来源信息
    saveFrom(state, { payload }) {
      const { from: url } = payload
      return {
        ...state,
        url: url || '/',
      }
    },
  },
}
