import { url } from './init'

module.exports = {
  name: '生产手册 Demo',
  logo: '/logo.png',
  footerTxt: '诺维网络版权所有 © 2017',
  baseURL: url || 'http://localhost:3000/api/',
  imgBaseURL: 'http://localhost:3000',
  defaultPage: 1,         // 默认当前页数
  defaultPageSize: 10,    // 默认每页大小
  api: {
    // 用户登录
    login: '/user/login',           // 用户登录
    // 系统设置
    job: '/job',                    // 职业设置
    jobQuery: '/job/query',         // 搜索职业
    product: '/product',            // 作物设置
    material: '/material',          // 材料设置
  },
}
