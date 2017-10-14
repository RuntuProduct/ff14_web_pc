import { request, config, pubfuc } from '@utils'
import { stringify } from 'qs'
import { loginSent, loginGet } from '@maps/login'

const { api } = config
const { login } = api
const { dealMap } = pubfuc

export async function loginFuc(params) {
  params = dealMap(loginSent, params)
  const res = await request({
    url: login,
    method: 'post',
    data: params,
  })
  res.data = dealMap(loginGet, res.data)
  return res
}

export async function checkFuc(params) {
  const res = await request({
    url: `${login}?${stringify(params)}`,
    method: 'get',
  })
  res.data = dealMap(loginGet, res.data)
  return res
}
