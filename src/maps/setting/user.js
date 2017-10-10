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
const userSend = {
  obj: {
    tar: 'obj',
    map: {
      name: 'name',
      create: 'date',
      used: 'status',
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

const userGet = {
  list: {
    tar: 'list',
    map: [{
      id: 'rbacUserId',
      account: 'username',
      phone: 'phone',
      apartment: 'apartment', // 部门
      post: 'post', // 职位
      used: 'used',
      roles: {
        tar: 'roles',
        map: [],
      },
      created: 'created',
      authorId: 'authorId',
    }],
  },
  current: 'pageNum',
  pageSize: 'pageSize',
  total: 'total',
}

export default {
  userSend,
  userGet,
  // privilegeAddSent,
  // privilegeEditSent,
}
