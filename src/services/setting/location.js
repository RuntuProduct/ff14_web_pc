import { request, config, pubfuc } from '@utils'
import { stringify } from 'qs'
import { locaitonAddSent, locationEditSent, locationDeleteSent } from '@maps/setting/location'

const { api } = config
const { location, collectionQuery } = api
const { dealMap } = pubfuc

// 添加地点
export async function add(params) {
  params = dealMap(locaitonAddSent, params)
  const res = await request({
    url: `${location}`,
    method: 'post',
    data: params,
  })
  return res
}

// 编辑地点
export async function edit(params) {
  params = dealMap(locationEditSent, params)
  console.log(params)
  const res = await request({
    url: `${location}`,
    method: 'put',
    data: params,
  })
  return res
}

// 删除地点
export async function deleteNode(params) {
  params = dealMap(locationDeleteSent, params)
  const res = await request({
    url: `${location}?${stringify(params)}`,
    method: 'delete',
  })
  return res
}

// 获取目标搜索值
export async function searchCol(params) {
  // params = dealMap(locationDeleteSent, params)
  const res = await request({
    url: `${collectionQuery}?${stringify(params)}`,
    method: 'get',
  })
  return res
}
