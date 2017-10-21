import React from 'react'
import PropTypes from 'prop-types'
import { Router, Switch, Route } from 'dva/router'
import dynamic from 'dva/dynamic'

// 在此文件添加路由之后还需在 @utils/router中添加对应的路由及权限
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
              props => (
                <Component {...props}>
                  {mapRoutes(routes, { key, ...ary[i] })}
                </Component>
              )
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
              import('./models/setting/material'),
            ],
            component: () => import('./routes/setting/material'),
          }),
        },
      ],
    },
  ]

  // return <Router history={history} routes={routes} />
  return (
    <Router history={history}>
      {mapRoutes(routeData)}
    </Router>
  )
}

Routers.propTypes = {
  history: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
}

export default Routers
