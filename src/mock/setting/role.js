import { mock, Random } from 'mockjs'
import _ from 'lodash'
import { dealPage } from '../fuc'

// mock 数据
const dataMock = mock({
  'list|18-100': [{
    rbacRoleId: () => Random.id(),
    name: () => Random.cname(),
    used: () => Random.integer(0, 1),
    created: () => `${new Date(Random.datetime()).valueOf()}`,
    author: () => Random.cname(),
    remark: () => Random.csentence(),
  }],
})

export default [
  {
    path: '/rbac/role/query',
    router: {
      post: (req, res) => {
        const pageProps = req.query
        const obj = req.body
        res(0, dealPage(dataMock.list, { obj, pageProps }, {
          name: ({ name }, tar) => {
            return new RegExp(tar, 'i').exec(name)
          },  // 模糊查询
          used: ({ used }, tar) => {
            if (_.isEmpty(tar)) {
              return true
            } else {
              return tar == used
            }
          },  // 精确查询
          create: ({ created }, tar) => {
            if (_.isEmpty(tar)) {
              return true
            } else {
              const dateAry = tar.split(',')
              return dateAry[0] < created && created < dateAry[1]
            }
          },  // 范围查询
        }))
      },
    },
  },
]
