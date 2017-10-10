import { fakeNet } from '../setting.js'

const getPri = async () => {
  return fakeNet({
    url: '/rbac/privilege',
    method: 'get',
  })
}

export default [
  {
    path: '/user/login',
    router: {
      // 根据token获取用户信息
      get: async (req, res) => {
        const { uid } = req.query
        if (uid === '001') {
          const { data } = await getPri()

          res(0, {
            data: {
              rbacUserId: '001',
              username: 'runtu',
              privilege: data,
            },
          })
        } else {
          res(1, {
            status: 204,
            message: '用户信息错误',
          })
        }
      },
      // 用户名密码登录
      post: async (req, res) => {
        const { username, password } = req.query
        if (username === 'admin' && password === '11111') {
          const { data } = await getPri()

          res(0, {
            data: {
              rbacUserId: '001',
              username: 'runtu',
              privilege: data,
            },
          })
          const today = new Date()
          const expires = 5 // 分钟
          const expires_date = new Date(today.getTime() + (expires * 60000))
          document.cookie=`token=001`
          + `;expires=${expires_date.toGMTString()}`
        } else {
          res(1, {
            status: 204,
            message: '用户名或密码错误',
          })
        }
      },
    },
  },
]
