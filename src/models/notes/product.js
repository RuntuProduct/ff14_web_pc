import queryString from 'query-string'
import { query, getFormula } from '@services/notes/product'
// import { parse } from 'qs'
import { config } from '@utils'

const { levelAry } = config

export default {

  namespace: 'productNotes',

  state: {
    jobId: 4,
    level: levelAry[0],
    data: [],
  },

  subscriptions: {

    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        // 进入路由，获取数据
        if (pathname === '/notes/product') {
          const query = queryString.parse(search)
          dispatch({
            type: 'query',
            payload: query,
          })
          dispatch({ type: 'job/query', payload: {} })
        }
      })
    },

  },

  effects: {

    // 获取数据
    *query({
      payload,
    }, { put, call, select }) {
      const { jobId, level } = payload
      const { jobId: jobIdSave, level: levelSave } = yield select(state => state.productNotes)
      const params = {
        jobId: jobId || jobIdSave,
        level: level || levelSave,
      }
      const { success, data, message } = yield call(query, {
        jobId: params.jobId,
        lvStart: params.level.ary[0],
        lvEnd: params.level.ary[1],
      })
      if (success) {
        console.log('target:', data)
        yield put({ type: 'querySuccess', payload: data })
        yield put({ type: 'saveQuery', payload: params })
      } else {
        throw message
      }
    },
    // 获取配方
    *getFormula({
      pid,
    }, { put, call, select }) {
      if (!pid) throw new Error('作物id错误！')
      const { success, data, message } = yield call(getFormula, { pid })
      if (success) {
        //
      } else {
        throw new Error('获取配方失败')
      }
    },

  },

  reducers: {

    // 取值成功，保存传来的数据
    querySuccess(state, { payload }) {
      return {
        ...state,
        data: payload,
      }
    },
    // 保存搜索条件
    saveQuery(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

  },

}
