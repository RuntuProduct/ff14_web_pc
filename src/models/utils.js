import { query } from '@services/agent'
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import { config, menu } from '../utils'

const { defaultPage, defaultPageSize } = config

export default {
  namespace: 'utils',
  state: {
    // 渠道列表相关
    agentList: [],
    agentQuery: {},
    agentPagination: {
      showTotal: total => `共 ${total} 条`,
      current: defaultPage,
      total: null,
    },
    agentModalProps: {
      selectType: 'single',
      selectVal: null,
      searchType: 'name',
      searchVal: null,
    },
    agentModalVisible: false, // 渠道选择弹窗显示状态
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // do nothing
    },
  },
  effects: {
    // 检查登录状态，无登录进入登录界面
    *query({
      payload,
    }, { call, put, select }) {
      const { agentQuery } = yield select(state => state.utils)
      let urlQuery = {}
      if (payload) {
        urlQuery = Object.assign(urlQuery, agentQuery, payload)
        yield put({ type: 'updateQuery', payload })
      } else {
        urlQuery = Object.assign(urlQuery, agentQuery)
      }
      const { page } = urlQuery
      const pageProps = {
        page: page || defaultPage,
        pageSize: defaultPageSize,
      }
      const { success, data, message } = yield call(query, {
        obj: urlQuery,
        pageProps,
      })
      if (success) {
        console.log('target:', data)
        yield put({ type: 'querySuccess', payload: data })
      } else {
        throw message
      }
    },
    // 选取值
    *select({
      payload,
    }, { call, put, select }) {
      const val = payload
      // 当前选中值
      const { agentModalProps } = yield select(state => state.utils)
      const { selectType, selectVal } = agentModalProps
      if (selectType === 'single') {
        yield put({ type: 'setSelect', payload: val })
      } else {
        let sendPayload
        if (selectVal) {
          const idx = selectVal.indexOf(val)
          console.log(idx)
          if (idx >= 0) {
            // 取消选择
            selectVal.splice(idx, 1)
            sendPayload = selectVal
          } else {
            selectVal.push(val)
            sendPayload = selectVal
          }
        } else {
          sendPayload = [val]
        }
        yield put({ type: 'setSelect', payload: sendPayload })
      }
    },
  },
  reducers: {
    // 登录成功，保存登录之后传来的数据
    querySuccess(state, { payload }) {
      const { list: agentList, current, total } = payload
      return {
        ...state,
        agentList,
        agentPagination: {
          ...state.agentPagination,
          current,
          total,
        },
      }
    },
    // 更新query
    updateQuery(state, { payload }) {
      return {
        ...state,
        agentQuery: {
          ...state.agentQuery,
          payload,
        },
      }
    },
    // 显示弹窗
    showAgentModal(state, { payload }) {
      let type = null
      if (payload) { type = payload.type }
      if (type) {
        return {
          ...state,
          agentModalVisible: true,
          agentModalProps: {
            ...state.agentModalProps,
            selectType: type,
          },
        }
      } else {
        return { ...state, agentModalVisible: true }
      }
    },
    // 关闭弹窗
    hideAgentModal(state) {
      return { ...state, agentModalVisible: false }
    },
    // 设置选取值
    setSelect(state, { payload }) {
      return {
        ...state,
        agentModalProps: {
          ...state.agentModalProps,
          selectVal: payload,
        },
      }
    },
    // 设置搜索值
    setAgentSearch(state, { payload }) {
      return {
        ...state,
        agentModalProps: {
          ...state.agentModalProps,
          ...payload,
        },
      }
    },

  },
}
