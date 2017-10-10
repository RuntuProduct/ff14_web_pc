import { query, add, edit } from '@services/setting/audit'
// import { parse } from 'qs'
import { config } from '@utils'

const { defaultPage, defaultPageSize } = config

export default {

  namespace: 'settingAudit',

  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showTotal: total => `共 ${total} 条`,
      current: defaultPage,
      total: null,
    },
  },

  subscriptions: {

    setup({ dispatch, history }) {
      history.listen((location) => {
        // 进入路由，获取数据
        if (location.pathname === '/setting/audit') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },

  },

  effects: {

    // 获取数据
    *query({
      payload,
    }, { put, call }) {
      const { page, pageSize } = payload
      const pageProps = {
        page: page || defaultPage,
        pageSize: pageSize || defaultPageSize,
      }
      const { success, data, message } = yield call(query, {
        obj: payload,
        pageProps,
      })
      if (success) {
        console.log('target:', data)
        yield put({ type: 'querySuccess', payload: data })
      } else {
        throw message
      }
    },

  },

  reducers: {

    // 取值成功，保存传来的数据
    querySuccess(state, { payload }) {
      const { list, current, pageSize, total } = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          current,
          pageSize,
          total,
        },
      }
    },
    
  },

}
