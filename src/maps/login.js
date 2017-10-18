// 格式 - 新键值名：从原始数据中取值的键值名

const loginSent = {
  username: 'username',
  password: 'password',
}

const loginGet = {
  user: {
    tar: 'user',
    map: {
      id: 'id',
      name: 'name',
    },
  },
  rbacPrivileges: {
    tar: 'rbacPrivileges',
    map: [{
      id: 'privilegeId',
      menu: 'menu',
      level: 'levelId',
      path: 'path',
      name: 'privilegeName',
      remark: 'remark',
    }],
  },
}

export default {
  loginSent,
  loginGet,
}
