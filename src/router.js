import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

// 在此文件添加路由之后还需在 @utils/router中添加对应的路由及权限
const Routers = function router({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, { component: require('./routes/indexPage') })
        }, 'index')
      },
      childRoutes: [
        // {
        //   // 系统管理 - 角色管理
        //   path: 'setting/role',
        //   getComponent(nextState, cb) {
        //     require.ensure([], (require) => {
        //       registerModel(app, require('./models/setting/role'))
        //       registerModel(app, require('./models/setting/privilege'))
        //       cb(null, require('./routes/setting/role'))
        //     }, 'role')
        //   },
        // },
        // {
        //   // 系统管理 - 权限配置
        //   path: 'setting/privilege',
        //   getComponent(nextState, cb) {
        //     require.ensure([], (require) => {
        //       registerModel(app, require('./models/setting/privilege'))
        //       cb(null, require('./routes/setting/privilege'))
        //     }, 'privilege')
        //   },
        // },
        {
          // 系统管理 - 职业配置
          path: 'setting/job',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/setting/job'))
              cb(null, require('./routes/setting/job'))
            })
          },
        },
        {
          // 系统管理 - 作物配置
          path: 'setting/product',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/setting/product'))
              cb(null, require('./routes/setting/product'))
            })
          },
        },
        {
          // 系统管理 - 材料配置
          path: 'setting/material',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/setting/material'))
              cb(null, require('./routes/setting/material'))
            })
          },
        },
        // {
        //   // 系统管理 - 用户管理
        //   path: 'setting/user',
        //   getComponent(nextState, cb) {
        //     require.ensure([], (require) => {
        //       registerModel(app, require('./models/setting/user'))
        //       cb(null, require('./routes/setting/user'))
        //     }, 'user')
        //   },
        // },
        {
          // 登录
          path: 'login',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login'))
            }, 'login')
          },
        },
        {
          // 404页
          path: '*',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/error/'))
            })
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
}

export default Routers
