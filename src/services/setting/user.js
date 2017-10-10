import { request, config, pubfuc } from '@utils'
import { stringify } from 'qs'
import { userSend, userGet } from '@maps/setting/user'

const { api } = config
const { userQuery } = api
const { dealMap } = pubfuc

// 获取角色列表
export async function query(params) {
  params = dealMap(userSend, params)
  const res = await request({
    url: `${userQuery}?${stringify(params.pageProps)}`,
    method: 'post',
    data: params.obj,
  })
  res.data = dealMap(userGet, res.data[0])
  return res
}

// // 添加节点
// export async function add(params) {
//   params = dealMap(privilegeAddSent, params)
//   const res = await request({
//     url: `${role}`,
//     method: 'post',
//     data: params,
//   })
//   return res
// }

// // 编辑节点
// export async function edit(params) {
//   // params = dealMap(loginSent, params)
//   const res = await request({
//     url: `${role}`,
//     method: 'put',
//     data: params,
//   })
//   return res
// }


// // 删除节点
// export async function deleteNode(params) {
//   // params = dealMap(loginSent, params)
//   const res = await request({
//     url: `${role}/${params}`,
//     method: 'delete',
//   })
//   return res
// }
