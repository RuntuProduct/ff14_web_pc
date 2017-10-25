import { request, config, pubfuc } from '@utils'
import { stringify } from 'qs'
import { fishGet, fishAddSent, fishEditSent, fishDeleteSent } from '@maps/setting/fish'

const { api } = config
const { fish } = api
const { dealMap } = pubfuc

export async function query(params) {
  const res = await request({
    url: `${fish}?${stringify(params)}`,
    method: 'get',
  })
  res.data = dealMap(fishGet, res.data)
  return res
}

// 添加鱼类
export async function add(params) {
  params = dealMap(fishAddSent, params)
  const res = await request({
    url: `${fish}`,
    method: 'post',
    data: params,
  })
  return res
}

// 编辑鱼类
export async function edit(params) {
  params = dealMap(fishEditSent, params)
  console.log(params)
  const res = await request({
    url: `${fish}`,
    method: 'put',
    data: params,
  })
  return res
}

// // 编辑鱼类
// export async function deleteNode(params) {
//   params = dealMap(fishDeleteSent, params)
//   const res = await request({
//     url: `${fish}`,
//     method: 'delete',
//     data: params,
//   })
//   return res
// }
