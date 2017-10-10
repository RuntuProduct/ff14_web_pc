import { request, config, pubfuc } from '@utils'
import { stringify } from 'qs'
import { privilegeGet, privilegeAddSent, privilegeEditSent } from '@maps/setting/privilege'

const { api } = config
const { privilege } = api
const { dealMap } = pubfuc

// 获取节点列表
export async function query(params) {
  // params = dealMap(loginSent, params)
  const res = await request({
    url: `${privilege}?${stringify({ page: 1 })}`,
    method: 'get',
  })
  res.data = dealMap(privilegeGet, res.data)
  console.log('data', res.data)
  return res
}

// 添加节点
export async function add(params) {
  params = dealMap(privilegeAddSent, params)
  const res = await request({
    url: `${privilege}`,
    method: 'post',
    data: params,
  })
  return res
}

// 编辑节点
export async function edit(params) {
  params = dealMap(privilegeEditSent, params)
  const res = await request({
    url: `${privilege}`,
    method: 'put',
    data: params,
  })
  return res
}


// 删除节点
export async function deleteNode(params) {
  // params = dealMap(loginSent, params)
  const res = await request({
    url: `${privilege}/${params}`,
    method: 'delete',
  })
  return res
}
