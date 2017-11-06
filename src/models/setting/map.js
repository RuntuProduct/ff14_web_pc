import queryString from 'query-string'
import { query, add, edit, detail } from '@services/setting/map'
import { add as addLo, edit as editLo, deleteNode as delLo } from '@services/setting/location'
import { message } from 'antd'
// import { parse } from 'qs'
import { config } from '@utils'

const MSG = message
const { defaultPage, defaultPageSize } = config

export default {

  namespace: 'map',

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
    modalItem: null,  // 当前编辑对象

    modalLocationVisible: false,  // 地点编辑弹窗显示状态

    modalLocationDetailTitle: null,
    modalLocationDetailItem: null,
    modalLocationDetailVisible: false,  // 地点详情编辑弹窗显示状态
  },

  subscriptions: {

    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        // 进入路由，获取数据
        if (pathname === '/setting/map') {
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
    // 获取单一地图数据
    *mapDetail({
      id,
    }, { put, call }) {
      if (id === undefined || parseInt(id, 10) != id) {
        throw new Error('id错误')
      }
      const { success, data, message } = yield call(detail, { id })
      if (success) {
        console.log('target:', data)
        yield put({ type: 'updateModal', payload: data })
      } else {
        throw message
      }
    },
    // 添加、编辑地图
    *edit({
      payload,
    }, { put, call }) {
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
    // 添加、编辑地点
    *editLocation({
      payload,
    }, { put, call }) {
      const {
        editType,
        id,
        mapId,
        ...params
      } = payload
      console.log('params:', params)
      if (editType === 'add') {
        params.mapId = mapId
        // 添加节点逻辑
        const { success, data, message } = yield call(addLo, params)
        if (success) {
          MSG.success(data)
          yield put({ type: 'query', payload: {} })
          yield put({ type: 'hideModalLocationDetail' })
          yield put({ type: 'mapDetail', id: mapId })
        } else {
          throw new Error(message)
        }
      } else {
        params.mapId = mapId
        params.id = id
        // 编辑节点逻辑
        const { success, data, message } = yield call(editLo, params)
        if (success) {
          MSG.success(data)
          yield put({ type: 'query', payload: {} })
          yield put({ type: 'hideModalLocationDetail' })
          yield put({ type: 'mapDetail', id: mapId })
        } else {
          throw new Error(message)
        }
      }
    },
    // // 删除地图
    // *delete({
    //   payload,
    // }, { put, call }) {
    //   const {
    //     id,
    //   } = payload
    //   if (!id) {
    //     throw new Error('鱼类id错误！')
    //   }
    //   // 删除作物
    //   const { success, data, message } = yield call(deleteNode, { id })
    //   if (success) {
    //     MSG.success(data)
    //     yield put({ type: 'query', payload: {} })
    //   } else {
    //     throw new Error(message)
    //   }
    // },
    // 删除地图
    *deleteLocation({
      id,
      mapId,
    }, { put, call }) {
      if (id === undefined) throw new Error('地点id错误')
      if (mapId === undefined) throw new Error('地图id错误')
      const { success, data, message } = yield call(delLo, { id })
      if (success) {
        MSG.success(data)
        // 获取删除后的详情
        yield put({ type: 'mapDetail', id: mapId })
        yield put({ type: 'query' })
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
    // 更新弹窗数据
    updateModal(state, { payload }) {
      return { ...state, modalItem: payload }
    },

    // 显示地点配置弹窗
    showModalLocation(state, { payload }) {
      const { obj: modalItem } = payload
      return { ...state, modalItem, modalLocationVisible: true }
    },
    // 关闭地点配置弹窗
    hideModalLocation(state) {
      const modalItem = null
      return { ...state, modalItem, modalLocationVisible: false }
    },

    // 显示地点详情配置弹窗
    showModalLocationDetail(state, { tit: modalLocationDetailTitle, obj: modalLocationDetailItem }) {
      return {
        ...state,
        modalLocationDetailTitle,
        modalLocationDetailItem,
        modalLocationDetailVisible: true,
      }
    },
    // 关闭地点详情配置弹窗
    hideModalLocationDetail(state) {
      return {
        ...state,
        modalLocationDetailTitle: null,
        modalLocationDetailItem: null,
        modalLocationDetailVisible: false,
      }
    },

    // 保存query
    saveQuery(state, { query }) {
      return { ...state, listQuery: query }
    },

  },

}
