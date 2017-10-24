import { request, config, pubfuc } from '@utils'
import { stringify } from 'qs'
import { materialGet, materialAddSent, materialEditSent, materialDeleteSent } from '@maps/setting/product'

const { api } = config
const { material } = api
const { dealMap } = pubfuc

export async function query(params) {
  const res = await request({
    url: `${material}?${stringify(params)}`,
    method: 'get',
  })
  res.data = dealMap(materialGet, res.data)
  return res
}

// 添加节点
export async function add(params) {
  params = dealMap(materialAddSent, params)
  const res = await request({
    url: `${material}`,
    method: 'post',
    data: params,
  })
  return res
}

// 编辑节点
export async function edit(params) {
  params = dealMap(materialEditSent, params)
  console.log(params)
  const res = await request({
    url: `${material}`,
    method: 'put',
    data: params,
  })
  return res
}

// 编辑节点
export async function deleteNode(params) {
  params = dealMap(materialDeleteSent, params)
  console.log(params)
  const res = await request({
    url: `${material}`,
    method: 'delete',
    data: params,
  })
  return res
}
