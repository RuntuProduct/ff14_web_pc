import { request, config, pubfuc } from '@utils'
import { stringify } from 'qs'
import { mapGet, fishAddSent, fishEditSent } from '@maps/setting/map'

const { api } = config
const { map } = api
const { dealMap } = pubfuc

export async function query(params) {
  const res = await request({
    url: `${map}?${stringify(params)}`,
    method: 'get',
  })
  res.data = dealMap(mapGet, res.data)
  return res
}

// 添加鱼类
export async function add(params) {
  params = dealMap(fishAddSent, params)
  const res = await request({
    url: `${map}`,
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
    url: `${map}`,
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
