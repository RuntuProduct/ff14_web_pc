// import { query, logout } from '../services/app'
import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import { config, menu } from '../utils'

const { prefix } = config

// 根据路由遍历路由表找出对应id
const matchRouterToId = (router) => {
  let tarid
  for (const i in menu) {
    if (menu[i].router && menu[i].router === router) {
      tarid = menu[i].id
      break
    }
  }
  return tarid ? `${tarid}` : tarid
}

export default {
  namespace: 'page',
  state: {
    showFloatMenu: false,
    isNavbar: document.body.clientWidth < 769,  // 控制是否显示上方和左侧菜单
    menuKey: {
      horizonKey: '0',
      sideKey: '0',
      panes: [],
    },
  },
  subscriptions: {

    setup({ dispatch, history }) {
      history.listen((location) => {
        // 检测刷新页面进入时旧有的路由
        const match = pathToRegexp('/:path1').exec(location.pathname) || pathToRegexp('/:path1/:path2').exec(location.pathname)
        console.log(match)
        if (match) {
          const tarid = matchRouterToId(match[0])
          console.log(tarid)
          if (tarid) {
            dispatch({
              type: 'restoreRouter',
              payload: {
                tarid,
              },
            })
          }
        } else {
          // 回到 "/" 首页的时候
          dispatch({
            type: 'handleMenuKey',
            payload: {
              menuKey: {
                horizonKey: '0',
                sideKey: '0',
                panes: [],
              },
            },
          })
        }
      })

      dispatch({ type: 'query' })
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
      payload,
    }, { put, select }) {
      const { menuKey } = yield select(state => state.page)
      const { horizonKey, sideKey, panes } = menuKey
      if (horizonKey === '0' && sideKey === '0' && panes.length === 0) {
        // 如果菜单情况为初始值，进入旧值赋新流程
        const { tarid } = payload
        const horizonKey = (tarid.length > 1) ? tarid[0] : (tarid + '')
        const sideKey = (tarid.length > 1) ? tarid : (tarid + '1')
        const panes = (tarid.length > 1) ? [tarid] : ([tarid + '1'])
        yield put({
          type: 'handleMenuKey',
          payload: {
            menuKey: {
              horizonKey,
              sideKey,
              panes,
            },
          },
        })
      }
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

  },
}
