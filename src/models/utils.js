import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { queryJob } from '@services/utils'

export default {
  namespace: 'utils',
  state: {
    jobQuery: [],
  },
  subscriptions: {},
  effects: {
    // 检索职业列表
    *jobQuery({
      payload,
    }, { put, call }) {
      const value = payload
      // 搜索职业
      const { success, data, message } = yield call(queryJob, { value })
      if (success) {
        yield put({ type: 'queryJobSuccess', payload: data })
      } else {
        throw new Error(message)
      }
    },
    // 全局搜索函数（通过url）
    *search({
      pathname,
      values,
    }, { put }) {
      yield put(routerRedux.push({
        pathname,
        search: queryString.stringify(values),
      }))
    },
  },
  reducers: {
    // 获取职业搜索列表成功
    queryJobSuccess(state, { payload }) {
      const jobQuery = payload
      return {
        ...state,
        jobQuery,
      }
    },

  },
}
