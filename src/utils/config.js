import { url } from './init'

const baseUrlRoot = 'http://192.168.31.78:3000'

module.exports = {
  name: '生产手册 Demo',
  logo: '/logo.png',
  footerTxt: '诺维网络版权所有 © 2017',
  baseName: '/', // 网页前置域名
  baseURL: url || `${baseUrlRoot}/api/`,
  imgBaseURL: baseUrlRoot,
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
    fish: '/fish',                  // 鱼类设置
    formula: '/formula',            // 配方相关
  },
  imgs: {
    mining: `${baseUrlRoot}/060438.png`, // 挖掘
    quarrying: `${baseUrlRoot}/060437.png`,  // 碎石
    logging: `${baseUrlRoot}/060433.png`,  // 采伐
    harvesting: `${baseUrlRoot}/060432.png`, // 割草
  },
}
