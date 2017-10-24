import { request, config, pubfuc } from '@utils'
import { stringify } from 'qs'
import { jobGet, jobAddSent, jobEditSent, jobDeleteSent } from '@maps/setting/product'

const { api } = config
const { product } = api
const { dealMap } = pubfuc

export async function query(params) {
  const res = await request({
    url: `${product}?${stringify(params)}`,
    method: 'get',
  })
  res.data = dealMap(jobGet, res.data)
  return res
}

// 添加节点
export async function add(params) {
  params = dealMap(jobAddSent, params)
  const res = await request({
    url: `${product}`,
    method: 'post',
    data: params,
  })
  return res
}

// 编辑节点
export async function edit(params) {
  params = dealMap(jobEditSent, params)
  console.log(params)
  const res = await request({
    url: `${product}`,
    method: 'put',
    data: params,
  })
  return res
}

// 编辑节点
export async function deleteNode(params) {
  params = dealMap(jobDeleteSent, params)
  console.log(params)
  const res = await request({
    url: `${product}`,
    method: 'delete',
    data: params,
  })
  return res
}

// 搜索材料
export async function searchMer(params) {
  params = dealMap(jobDeleteSent, params)
  console.log(params)
  const res = await request({
    url: `${product}`,
    method: 'delete',
    data: params,
  })
  return res
}
// 搜索作物
export async function searchPro(params) {
  params = dealMap(jobDeleteSent, params)
  console.log(params)
  const res = await request({
    url: `${product}`,
    method: 'delete',
    data: params,
  })
  return res
}
// 搜索鱼类
export async function searchFish(params) {
  params = dealMap(jobDeleteSent, params)
  console.log(params)
  const res = await request({
    url: `${product}`,
    method: 'delete',
    data: params,
  })
  return res
}
