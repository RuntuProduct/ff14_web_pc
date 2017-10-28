import queryString from 'query-string'
import { query, add, edit, deleteNode, addFormula } from '@services/setting/product'
import { getFormula } from '@services/notes/product'
import * as MAT from '@services/setting/material'
import { message } from 'antd'
// import { parse } from 'qs'
import { config } from '@utils'

const MSG = message
const { defaultPage, defaultPageSize } = config

export default {

  namespace: 'product',

  state: {
    list: [],
    listQuery: {},
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
    formula: {},    // 当前编辑对象的配方列表

    modalSelectVisible: false,  // 选择素材弹窗显示状态
    modalSelectType: '01',   // 搜索类型：01-材料、02-作物、03-鱼类
    modalSelectVal: '',
    modalSelectList: [],  // 搜索结果
    modalSelectPage: {
      showTotal: total => `共 ${total} 条`,
      current: defaultPage,
      total: null,
    },

    modalItemSetVisible: false, // 素材添加弹窗显示状态
    modalItemSetItem: {}, // 素材添加对象
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
          dispatch({ type: 'job/query', payload: {} })
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
        ...payload,
        ...pageProps,
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
    // 搜索材料
    *searchMat({
      name, pageData,
    }, { put, call }) {
      const { page, pageSize } = pageData
      const pageProps = {
        page: page || defaultPage,
        pageSize: pageSize || defaultPageSize,
      }
      const { success, data, message } = yield call(MAT.query, {
        name,
        ...pageProps,
      })
      if (success) {
        // console.log('target:', data)
        yield put({ type: 'querySelectSuccess', payload: data })
      } else {
        throw message
      }
    },
    // 搜索作物
    *searchPro({
      name, pageData,
    }, { put, call }) {
      const { page, pageSize } = pageData
      const pageProps = {
        page: page || defaultPage,
        pageSize: pageSize || defaultPageSize,
      }
      const { success, data, message } = yield call(query, {
        name,
        ...pageProps,
      })
      if (success) {
        // console.log('target:', data)
        yield put({ type: 'querySelectSuccess', payload: data })
      } else {
        throw message
      }
    },
    // 添加素材
    *addMat({
      obj,
    }, { put, call, select }) {
      const { modalItem, modalItemSetItem, modalSelectType: tarType } = yield select(state => state.product)
      const { id: pid } = modalItem
      const { id: tarId } = modalItemSetItem
      const { addNum: num } = obj
      if (pid !== undefined && tarId !== undefined && tarType && parseInt(num, 10)) {
        const { success, data, message } = yield call(addFormula, {
          pid,
          tarId,
          tarType,
          num,
        })
        console.log(data)
      } else {
        throw new Error('配方信息错误！')
      }
    },
    // 获取配方
    *getFormula({
      payload,
    }, { put, call, select }) {
      const { pid } = payload
      if (!pid) throw new Error('作物id错误！')
      const { success, data, message } = yield call(getFormula, { pid })
      if (success) {
        yield put({ type: 'saveFormula', payload: data })
      } else {
        throw new Error('获取配方失败')
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

    // 搜索取值成功
    querySelectSuccess(state, { payload }) {
      const { list, current, pageSize, total } = payload
      return {
        ...state,
        modalSelectList: list,  // 搜索结果
        modalSelectPage: {
          ...state.modalSelectPage,
          current,
          pageSize,
          total,
        },
      }
    },
    // 保存搜索类型
    saveSelectType(state, { payload }) {
      return {
        ...state,
        modalSelectType: payload,
      }
    },
    // 保存搜索关键字
    saveSelectVal(state, { payload }) {
      return {
        ...state,
        modalSelectVal: payload,
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
    // 保存配方
    saveFormula(state, { payload }) {
      return {
        ...state,
        formula: payload,
      }
    },

    // 显示配方编辑弹窗
    showSelect(state, { obj }) {
      return { ...state, modalSelectVisible: true }
    },
    // 隐藏配方编辑弹窗
    hideSelect(state) {
      return { ...state, modalSelectVisible: false }
    },

    // 显示配方编辑弹窗
    showSet(state, { obj }) {
      return { ...state, modalItemSetVisible: true, modalItemSetItem: obj }
    },
    // 隐藏配方编辑弹窗
    hideSet(state) {
      return { ...state, modalItemSetVisible: false, modalItemSetItem: {} }
    },

    // 保存query
    saveQuery(state, { query }) {
      return { ...state, listQuery: query }
    },

  },

}
