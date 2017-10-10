import pathToRegexp from 'path-to-regexp'
import { parse } from 'qs'
import LOGIN from './login/index'
import ROLE from './setting/role'
import PRIVILEGE from './setting/privilege'

const Router = [].concat(LOGIN, ROLE, PRIVILEGE)

// 分发URL
const mapUrl = (func, url, data, options, cb) => {
  for (let i = 0; i < Router.length; i += 1) {
    const part = Router[i]
    const { path, router } = part
    // 匹配路径传参
    const pathMatch = pathToRegexp(path).exec(url)
    // console.log(pathMatch)
    // 匹配query传参
    const queryMatch = pathToRegexp(`${path}?:query`).exec(url)
    // console.log(queryMatch)
    const req = {
      path,
      query: queryMatch ? parse(queryMatch[1]) : undefined,
      params: pathMatch,
      body: data,
    }
    if (path === url || pathMatch || queryMatch) {
      // 找到匹配路由
      if (router[func] && typeof router[func] === 'function') {
        // 找到匹配处理方法
        router[func](req, cb)
      } else {
        // 找不到匹配处理方法
        cb(1, {
          status: 404,
          message: 'router not found',
        })
      }
      break
    } else if (i === Router.length - 1) {
      // 找不到匹配路由
      cb(1, {
        status: 404,
        message: 'router not found',
      })
    }
  }
}

export {
  mapUrl,
}
