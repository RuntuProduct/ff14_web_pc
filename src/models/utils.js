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
