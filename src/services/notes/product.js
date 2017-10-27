import { request, config, pubfuc } from '@utils'
import { stringify } from 'qs'
import { productGet } from '@maps/notes/product'

const { api } = config
const { productNotes, formula } = api
const { dealMap } = pubfuc

// 获取手册数据
export async function query(params) {
  const res = await request({
    url: `${productNotes}?${stringify(params)}`,
    method: 'get',
  })
  res.data = dealMap(productGet, res.data)
  return res
}

// 获取配方
export async function getFormula(params) {
  const res = await request({
    url: `${formula}?${stringify(params)}`,
    method: 'get',
  })
  // res.data = dealMap(productGet, res.data)
  return res
}
