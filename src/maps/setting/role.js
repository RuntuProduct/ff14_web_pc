// 格式 - 新键值名：从原始数据中取值的键值名

// const privilegeAddSent = {
//   name: 'name',
//   menu: 'menu',
//   path: 'path',
//   status: 'status',
//   levelId: 'levelId',
// }

// const privilegeEditSent = {
//   id: 'rbacPrivilegeId',
//   name: 'name',
//   menu: 'menu',
//   path: 'path',
//   status: 'status',
//   levelId: 'levelId',
// }

// 获取用户列表传参的map规则
const roleSend = {
  obj: {
    tar: 'obj',
    map: {
      name: 'name',
      create: 'date',
      used: 'used',
    },
  },
  pageProps: {
    tar: 'pageProps',
    map: {
      page: 'page',
      size: 'pageSize',
    },
  },
}

const roleGet = {
  list: {
    tar: 'list',
    map: [{
      id: 'rbacRoleId',
      name: 'name',
      used: 'used',
      privileges: {
        tar: 'privileges',
        map: [{
          status: 'staus',
        }],
      },
      created: 'created',
      authorId: 'authorId',
      author: 'author',
      remark: 'remark',
    }],
  },
  current: 'pageNum',
  pageSize: 'pageSize',
  total: 'total',
}

export default {
  roleSend,
  roleGet,
  // privilegeAddSent,
  // privilegeEditSent,
}
