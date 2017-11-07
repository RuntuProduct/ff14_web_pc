import { url } from './init'

const baseUrlRoot = 'http://192.168.31.200:3000'

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
    map: '/map',                    // 地图相关
    mapList: '/map/list',           // 地图列表
    location: '/location',          // 地点相关
    collection: '/collection',      // 采集相关
    collectionQuery: '/collection/query', // 获取采集目标物
    // 各类笔记
    productNotes: '/notes/product', // 制作笔记
  },
  imgs: {
    mining: `${baseUrlRoot}/060438.png`, // 挖掘
    quarrying: `${baseUrlRoot}/060437.png`,  // 碎石
    logging: `${baseUrlRoot}/060433.png`,  // 采伐
    harvesting: `${baseUrlRoot}/060432.png`, // 割草

    loMining: `${baseUrlRoot}/lo_01.png`, // 挖掘点图标
    loQuarrying: `${baseUrlRoot}/lo_02.png`, // 碎石点图标
    loLogging: `${baseUrlRoot}/lo_03.png`,  // 采伐点图标
    loHarvesting: `${baseUrlRoot}/lo_04.png`, // 割草点图标
    loSend: `${baseUrlRoot}/lo_05.png`, // 传送点图标
  },
  levelAry: [
    { key: 0, ary: [1, 5] },
    { key: 1, ary: [6, 10] },
    { key: 2, ary: [11, 15] },
    { key: 3, ary: [16, 20] },
    { key: 4, ary: [21, 25] },
  ],
}
