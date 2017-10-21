import queryString from 'query-string'
import { query, add, edit, deleteNode } from '@services/setting/product'
import { message } from 'antd'
// import { parse } from 'qs'
import { config } from '@utils'

const MSG = message
const { defaultPage, defaultPageSize } = config

export default {

  namespace: 'product',

  state: {
    list: [],
    pagination: {
      // showSizeChanger: true,
      showTotal: total => `共 ${total} 条`,
      current: defaultPage,
      total: null,
    },

    modalTitle: '',   // 弹窗标题
    modalVisible: false,  // 添加、编辑弹窗显示状态
    modalFVisible: false, // 配方编辑弹窗
    modalItem: null,  // 当前编辑对象

    modalSelectVisible: false,  // 选择素材弹窗显示状态
  },

  subscriptions: {

    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        // 进入路由，获取数据
        if (pathname === '/setting/product') {
          const query = queryString.parse(search)
          dispatch({
            type: 'query',
            payload: query,
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
        pageSize: defaultPageSize,
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
    // 添加、编辑作物
    *edit({
      payload,
    }, { put, call, select }) {
      const {
        editType,
        id,
        img,
        ...params
      } = payload
      if (img && img.length) {
        params.img = img[0]['url']
      }
      console.log('params:', params)
      if (editType === 'add') {
        // 添加节点逻辑
        const { success, data, message } = yield call(add, params)
        if (success) {
          MSG.success(data)
          yield put({ type: 'query', payload: {} })
          yield put({ type: 'hideModal' })
        } else {
          throw new Error(message)
        }
      } else {
        params.id = id
        // 编辑节点逻辑
        const { success, data, message } = yield call(edit, params)
        if (success) {
          MSG.success(data)
          yield put({ type: 'query', payload: {} })
          yield put({ type: 'hideModal' })
        } else {
          throw new Error(message)
        }
      }
    },
    // 添加、编辑作物
    *delete({
      payload,
    }, { put, call }) {
      const {
        id,
      } = payload
      if (!id) {
        throw new Error('作物id错误！')
      }
      // 删除作物
      const { success, data, message } = yield call(deleteNode, { id })
      if (success) {
        MSG.success(data)
        yield put({ type: 'query', payload: {} })
      } else {
        throw new Error(message)
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

    // 显示配方编辑弹窗
    showModalF(state, { payload }) {
      const { title: modalTitle, obj: modalItem } = payload
      return { ...state, modalItem, modalTitle, modalFVisible: true }
    },
    // 隐藏配方编辑弹窗
    hideModalF(state) {
      const modalItem = null
      const modalTitle = null
      return { ...state, modalTitle, modalItem, modalFVisible: false }
    },

    // 显示配方编辑弹窗
    showSelect(state, { payload }) {
      const { title: modalTitle, obj: modalItem } = payload
      return { ...state, modalItem, modalTitle, modalSelectVisible: true }
    },
    // 隐藏配方编辑弹窗
    hideSelect(state) {
      const modalItem = null
      const modalTitle = null
      return { ...state, modalTitle, modalItem, modalSelectVisible: false }
    },

  },

}
