import { mock, Random } from 'mockjs'

// mock 数据
const staData = [
  {
    id: '001',
    name: '系统管理',
    menu: 1,
    path: '/setting',
    level: '001',
    status: 1,
  },
  {
    id: '001001',
    name: '角色管理',
    menu: 1,
    path: '/setting/role',
    level: '001001',
    status: 1,
  },
  {
    id: '001002',
    name: '用户管理',
    menu: 1,
    path: '/setting/user',
    level: '001002',
    status: 1,
  },
  {
    id: '001003',
    name: '审核管理',
    menu: 1,
    path: '/setting/audit',
    level: '001003',
    status: 1,
  },
  {
    id: '001004',
    name: '权限管理',
    menu: 1,
    path: '/setting/privilege',
    level: '001004',
    status: 1,
  },
]

export default [
  {
    path: '/rbac/privilege',
    router: {
      get: (req, res) => {
        res(0, {
          data: staData,
        })
      },
    },
  },
]
