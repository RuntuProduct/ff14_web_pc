// 格式 - 新键值名：从原始数据中取值的键值名

const loginSent = {
  username: 'username',
  password: 'password',
}

const loginGet = {
  id: 'id',
  name: 'name',
  privilege: {
    tar: 'privilege',
    map: [{
      id: 'id',
      name: 'name',
      menu: 'menu',
      path: 'path',
      level: 'level',
      status: 'status',
    }],
  },
}

export default {
  loginSent,
  loginGet,
}
