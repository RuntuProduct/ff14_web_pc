import { url } from './init'

module.exports = {
  name: '委贷系统 Demo',
  logo: '/logo.png',
  footerTxt: '诺维网络版权所有 © 2017',
  baseURL: url || 'http://nova.bank.api.novaszco.com/',
  defaultPage: 1,         // 默认当前页数
  defaultPageSize: 10,    // 默认每页大小
  api: {
    // 用户登录
    login: '/user/login',           // 用户登录
    // 商户管理
    merchant: '/merchant/query',    // 商户列表
    // 渠道管理
    agent: '/agent/query',          // 渠道列表
    // 交易管理
    transactionFlow: 'transaction/flow',  // 订单查询
    // 公共管理
    role: 'rbac/role',              // 角色相关
    roleQuery: '/rbac/role/query',  // 角色列表
    privilege: '/rbac/privilege',   // 权限相关
    userQuery: '/rbac/user/query', // 用户管理
  },
}
