import { request, config, pubfuc } from '@utils'
import { stringify } from 'qs'
import { productGet, productAddSent, productEditSent, productDeleteSent, formulaSend } from '@maps/setting/product'

const { api } = config
const { product, formula } = api
const { dealMap } = pubfuc

export async function query(params) {
  const res = await request({
    url: `${product}?${stringify(params)}`,
    method: 'get',
  })
  res.data = dealMap(productGet, res.data)
  return res
}

// 添加节点
export async function add(params) {
  params = dealMap(productAddSent, params)
  const res = await request({
    url: `${product}`,
    method: 'post',
    data: params,
  })
  return res
}

// 编辑节点
export async function edit(params) {
  params = dealMap(productEditSent, params)
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
  params = dealMap(productDeleteSent, params)
  console.log(params)
  const res = await request({
    url: `${product}`,
    method: 'delete',
    data: params,
  })
  return res
}

// 添加配方
export async function addFormula(params) {
  params = dealMap(formulaSend, params)
  const res = await request({
    url: `${formula}`,
    method: 'post',
    data: params,
  })
  return res
}

// 编辑配方
export async function editFormula(params) {
  // params = dealMap(formulaSend, params)
  const res = await request({
    url: `${formula}`,
    method: 'put',
    data: params,
  })
  return res
}

// 删除配方
export async function delFormula(params) {
  // params = dealMap(formulaSend, params)
  const res = await request({
    url: `${formula}?${stringify(params)}`,
    method: 'delete',
  })
  return res
}
