import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Router, Switch, Route, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import { baseName } from './utils/config'

const { ConnectedRouter } = routerRedux

// 路由处理及生成
const Routers = function router({ history, app }) {
  // 根据路由结构遍历生成路由节点树
  const mapRoutes = (ary, parent) => {
    const nodeAry = []
    for (let i = 0; i < ary.length; i += 1) {
      const { path } = ary[i]
      const { routes, component: Component, exact = true } = ary[i]
      let key = i
      if (parent) {
        const { key: parKey } = parent
        key = `${parKey}-${key}`
      }
      // 判断有无子节点
      if (routes && routes.length) {
        // nodeAry.push(...mapRoutes(routes, { key, ...ary[i] }))
        nodeAry.push(
          <Route
            key={key}
            path={path}
            exact={exact}
            render={
              (props) => {
                if (Component) {
                  return (
                    <Component {...props}>
                      {mapRoutes(routes, { key, ...ary[i] })}
                    </Component>
                  )
                } else {
                  return mapRoutes(routes, { key, ...ary[i] })
                }
              }
            }
          />,
        )
      } else {
        nodeAry.push(<Route key={key} path={path} exact={exact} component={Component} />)
      }
    }
    return (
      <Switch>
        {nodeAry}
        <Route
          component={
            dynamic({
              app,
              modules: () => [],
              component: () => import('./routes/error/index'),
            })
          }
        />
      </Switch>
    )
  }
  const routeData = [
    {
      // 首页
      path: '/',
      exact: false,
      component: dynamic({
        app,
        models: () => [],
        component: () => import('./routes/app'),
      }),
      routes: [
        {
          // 首页
          path: '/',
          component: dynamic({
            app,
            models: () => [],
            component: () => import('./routes/indexPage'),
          }),
        },
        {
          // 登录
          path: '/login',
          component: dynamic({
            app,
            models: () => [],
            component: () => import('./routes/login/index'),
          }),
        },
        {
          path: '/setting',
          exact: false,
          routes: [
            {
              // 系统管理 - 职业配置
              path: '/setting/job',
              component: dynamic({
                app,
                models: () => [
                  import('./models/setting/job'),
                ],
                component: () => import('./routes/setting/job'),
              }),
            },
            {
              // 系统管理 - 作物配置
              path: '/setting/product',
              component: dynamic({
                app,
                models: () => [
                  import('./models/setting/job'),
                  import('./models/setting/product'),
                ],
                component: () => import('./routes/setting/product'),
              }),
            },
            {
              // 系统管理 - 材料配置
              path: '/setting/material',
              component: dynamic({
                app,
                models: () => [
                  import('./models/setting/job'),
                  import('./models/setting/material'),
                ],
                component: () => import('./routes/setting/material'),
              }),
            },
            {
              // 系统管理 - 鱼类配置
              path: '/setting/fish',
              component: dynamic({
                app,
                models: () => [
                  import('./models/setting/fish'),
                ],
                component: () => import('./routes/setting/fish'),
              }),
            },
          ],
        },
        {
          // 各类笔记
          path: '/notes',
          exact: false,
          routes: [
            {
              // 制作笔记
              path: '/notes/product',
              component: dynamic({
                app,
                models: () => [],
                component: () => import('./routes/setting/job'),
              }),
            },
            {
              // 采集笔记
              path: '/notes/gather',
              component: dynamic({
                app,
                models: () => [],
                component: () => import('./routes/setting/job'),
              }),
            },
            {
              // 钓鱼笔记
              path: '/notes/fish',
              component: dynamic({
                app,
                models: () => [],
                component: () => import('./routes/setting/job'),
              }),
            },
          ],
        },
      ],
    },
  ]

  // return <Router history={history} routes={routes} />
  return (
    <ConnectedRouter history={history}>
      <BrowserRouter basename={baseName}>
        <Router history={history}>
          {mapRoutes(routeData)}
        </Router>
      </BrowserRouter>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
}

export default Routers
