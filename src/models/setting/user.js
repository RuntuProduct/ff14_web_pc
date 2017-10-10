import { query, add, edit } from '@services/setting/user'
// import { parse } from 'qs'
import { config } from '@utils'

const { defaultPage, defaultPageSize } = config

export default {

  namespace: 'settingUser',

  state: {
    list: [],
    selectedRowKeys: [],
    pagination: {
      showSizeChanger: true,
      showTotal: total => `共 ${total} 条`,
      current: defaultPage,
      total: null,
    },

    modalTitle: '',   // 弹窗标题
    modalItem: null,  // 当前编辑对象
    modalVisible: false,  // 添加、编辑弹窗显示状态

    setModalVivible: false, // 批量设置弹窗显示状态
  },

  subscriptions: {

    setup({ dispatch, history }) {
      history.listen((location) => {
        // 进入路由，获取数据
        if (location.pathname === '/setting/user') {
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

    // 多选数据项
    selectRow(state, { payload }) {
      const { selectedRowKeys } = payload
      return {
        ...state,
        selectedRowKeys,
      }
    },

    // 显示弹窗
    showModal(state, { payload }) {
      const { title: modalTitle, obj: modalItem } = payload
      return { ...state, modalItem, modalTitle, modalVisible: true }
    },
    // 关闭弹窗
    hideModal(state) {
      const modalItem = null
      const modalTitle = null
      return { ...state, modalTitle, modalItem, modalVisible: false }
    },

    // 显示批量设置弹窗
    showSetModal(state, { payload }) {
      return { ...state, setModalVivible: true }
    },
    // 关闭批量设置弹窗
    hideSetModal(state) {
      return { ...state, setModalVivible: false }
    },
  },

}
