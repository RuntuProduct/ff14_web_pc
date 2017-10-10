import { query, add, edit, deleteNode } from '@services/setting/privilege'
import { tree } from '@utils'
// import { parse } from 'qs'

const { dealTree } = tree

// 传入值，返回三位字符串
const levelPatch = (val) => {
  const getVal = Number(val)
  // console.log('分级值', val, getVal)
  if (val > 99 && val <= 999) {
    return '' + getVal
  } else if (val > 9 && val <= 99) {
    return '0' + getVal
  } else if (val >= 0 && val <= 9) {
    return '00' + getVal
  } else {
    throw new Error('传入的分级值错误')
  }
}

// 查找父节点对象，返回父节点的子节点长度
const findParent = (ary, tar) => {
  // console.log('查找的范围：', ary)
  // console.log('查找的目标id', tar)
  let result = null
  for (const i in ary) {
    if (ary[i].level === tar) {
      result = ary[i]['childrens'] ? ary[i]['childrens'].length : 0
    } else if (ary[i]['childrens']) {
      const search = findParent(ary[i]['childrens'], tar)
      if (search) {
        result = search
      }
    }
    if (result) {
      // console.log('父节点子节点长度', result)
      return result
    }
  }
  // console.log('父节点子节点长度', result)
  return result
}

// 计算levelID的内容
const countLevel = (ary, tar) => {
  if (tar === '0') {
    // 根节点
    return levelPatch(ary.length + 1)
  } else {
    // 非根节点
    return tar + levelPatch(findParent(ary, tar) + 1)
  }
}

export default {
  namespace: 'privilege',
  state: {
    list: [],             // 数据列表
    modalVisible: false,  // 弹窗显示状态
    modalTitle: null,  // 弹窗名称
    currentItem: {},  // 当前编辑对象
  },
  subscriptions: {

    setup({ dispatch, history }) {
      history.listen((location) => {
        // 进入路由，获取列表数据
        if (location.pathname === '/setting/privilege') {
          dispatch({ type: 'query' })
        }
      })
    },

  },
  effects: {
    // 获取权限列表
    *query({
      payload,
    }, { put, call, select }) {
      const { success, data, message } = yield call(query)
      if (success) {
        console.log('target:', data)
        const list = data
        const treeData = dealTree(list)
        yield put({ type: 'querySuccess', payload: { list, tree: treeData } })
      } else {
        throw message
      }
    },
    // 编辑节点
    *edit({
      payload,
    }, { put, call, select }) {
      const {
        editType,
        id,
        parent,
        status,
        path,
        menu,
        name,
        levelId,
      } = payload
      console.log(payload)
      const { tree } = yield select(state => state.privilege)
      const params = {
        name,
        menu,
        path,
        status,
        levelId,
      }
      console.log('params:', params)
      if (editType === 'add') {
        // 添加节点逻辑
        params.levelId = countLevel(tree, parent)
        const { success, data, message } = yield call(add, params)
        if (success) {
          yield put({ type: 'query' })
          yield put({ type: 'hideModal' })
        } else {
          throw message
        }
      } else {
        params.id = id
        // 编辑节点逻辑
        const { success, data, message } = yield call(edit, params)
        if (success) {
          yield put({ type: 'query' })
          yield put({ type: 'hideModal' })
        } else {
          throw message
        }
      }
    },

    // 删除节点
    *delete({
      payload,
    }, { put, call }) {
      const { success, data, message } = yield call(deleteNode, payload)
      if (success) {
        yield put({ type: 'query' })
      } else {
        throw message
      }
    },
  },
  reducers: {
    // 取值成功，保存传来的数据
    querySuccess(state, { payload }) {
      const { list, tree } = payload
      return {
        ...state,
        list,
        tree,
      }
    },

    // 显示弹窗
    showModal(state, { payload }) {
      const { title: modalTitle, obj: currentItem } = payload
      return { ...state, currentItem, modalTitle, modalVisible: true }
    },

    // 关闭弹窗
    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
}
