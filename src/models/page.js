import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'
import _ from 'lodash'

// 根据路由遍历路由表找出对应id
const matchRouterToId = (menu, router) => {
  let horizonKey = '0'
  let sideKey = '0'
  let name = '首页'
  for (let i = 0; i < menu.length; i += 1) {
    const tar = menu[i]
    const { id: tarId, childrens } = tar
    if (childrens && childrens.length) {
      for (let j = 0; j < childrens.length; j += 1) {
        const { id, path } = childrens[j]
        // console.log(path, router)
        if (path == router) {
          horizonKey = tarId.toString()
          sideKey = id.toString()
          name = childrens[j].name
          break
        }
      }
    }
  }
  return { horizonKey, sideKey, name }
}

// 根据id寻找router
const findRouter = (id, panes, menu) => {
  id = parseInt(id, 10)
  let router = null
  // 从panes中寻找已经打开的panes
  for (let i = 0; i < panes.length; i += 1) {
    const { id: pid, path, rpath } = panes[i]
    if (id === pid) {
      router = { path, rpath }
    }
  }
  if (!router) {
    // 从menu中寻找路由
    for (let i = 0; i < menu.length; i += 1) {
      const { id: pid, childrens } = menu[i]
      if (childrens && childrens.length) {
        for (let j = 0; j < childrens.length; j += 1) {
          const { id: cid, path } = childrens[j]
          if (id === cid || id === pid) {
            router = { path, rpath: path }
            return router
          }
        }
      }
    }
  }
  return null
}

// 更新panes
const updatePanes = (newTar, panes) => {
  if (newTar.id == '0') {
    return panes
  }
  if (!panes || panes.length == 0) {
    panes = [newTar]
    return panes
  }
  for (let i = 0; i < panes.length; i += 1) {
    const { id } = panes[i]
    if (panes[i].id == newTar.id || panes[i].id == '0') {
      panes[i] = newTar
      break
    } else if (i == panes.length - 1) {
      panes.push(newTar)
    }
  }
  return panes
}

export default {
  namespace: 'page',
  state: {
    menu: [], // 显示的菜单

    showFloatMenu: false,
    isNavbar: document.body.clientWidth < 769,  // 控制是否显示上方和左侧菜单
    horizonKey: '0',
    sideKey: '0',
    panes: [],
  },
  subscriptions: {

    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        // 检测页面路由
        const match1 = pathToRegexp('/:path1').exec(pathname)
        const match2 = pathToRegexp('/:path1/:path2').exec(pathname)
        const match = match1 || match2
        // console.log('match:', match)
        if (match && pathname != '/login') {
          const router = match[0]
          if (router) {
            dispatch({ type: 'restoreRouter', router })
          }
        } else {
          dispatch({ type: 'restoreRouter', router: '/' })
        }
      })

      // 检测body宽度，过小调整显示的ui
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {
    // 检测是否存在旧有路由显示信息
    *restoreRouter({
      router,
    }, { put, select }) {
      const { menu, panes } = yield select(state => state.page)

      const { horizonKey, sideKey, name } = matchRouterToId(menu, router)
      // const newPanes = sideKey ? [{ id: sideKey, name, path: router, rpath: router }] : []
      const newPanes = updatePanes({ id: sideKey, name, path: router, rpath: router }, panes)
      yield put({
        type: 'handleMenuKey',
        payload: { horizonKey, sideKey, panes: newPanes },
      })
    },
    // 修改菜单布局方式
    *changeNavbar({
      payload,
    }, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },
    // 切换浮动菜单的显示状态
    *changeFloatMenu(payload, { put, select }) {
      const { showFloatMenu } = yield (select(state => state.page))
      yield put({ type: 'handleFloatMenu', payload: !showFloatMenu })
    },
    // 回到首页
    *home(payload, { put }) {
      yield put(routerRedux.push('/'))
    },
    // 根据menuId进行路由跳转
    *linkTo({
      id,
    }, { put, select }) {
      const { menu, panes } = yield select(state => state.page)
      const router = findRouter(id, panes, menu)
      if (router) {
        // 路由跳转
        yield put({
          type: 'app/link',
          payload: router,
        })
      }
    },
    // 删除tab节点
    *paneRemove({
      id,
    }, { put, select }) {
      const { menu, panes } = yield select(state => state.page)
      if (panes.length > 1) {
        for (let i = 0; i < panes.length; i += 1) {
          if (panes[i]['id'] == id) {
            panes.splice(i, 1)
            break
          }
        }
        const len = panes.length - 1
        const { id: pid } = panes[len]
        yield put({
          type: 'handleMenuKey',
          payload: { horizonKey: '0', sideKey: '0', panes },
        })
        yield put({ type: 'linkTo', id: pid })
      } else {
        throw new Error('无法全部关闭！')
      }
    },

  },
  reducers: {

    handleNavbar(state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleMenuKey(state, { payload: menuKey }) {
      return {
        ...state,
        ...menuKey,
      }
    },

    handleFloatMenu(state, { payload: showFloatMenu }) {
      return {
        ...state,
        showFloatMenu,
      }
    },
    // 保存菜单信息
    saveMenu(state, { payload: menu }) {
      return {
        ...state,
        menu,
      }
    },

  },
}
