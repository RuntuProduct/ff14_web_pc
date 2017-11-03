import { request, config, pubfuc } from '@utils'
import { stringify } from 'qs'
import { mapGet, mapDetailGet, mapAddSent, mapEditSent } from '@maps/setting/map'

const { api } = config
const { map, mapList } = api
const { dealMap } = pubfuc

export async function query(params) {
  const res = await request({
    url: `${mapList}?${stringify(params)}`,
    method: 'get',
  })
  res.data = dealMap(mapGet, res.data)
  return res
}

export async function detail(params) {
  const res = await request({
    url: `${map}?${stringify(params)}`,
    method: 'get',
  })
  res.data = dealMap(mapDetailGet, res.data[0])
  return res
}

// 添加地图
export async function add(params) {
  params = dealMap(mapAddSent, params)
  const res = await request({
    url: `${map}`,
    method: 'post',
    data: params,
  })
  return res
}

// 编辑地图
export async function edit(params) {
  params = dealMap(mapEditSent, params)
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
