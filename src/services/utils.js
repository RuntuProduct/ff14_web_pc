import { request, config } from '@utils'
import { stringify } from 'qs'

const { api } = config
const { jobQuery } = api

// 搜索职业
export async function queryJob(params) {
  console.log(params)
  const res = await request({
    url: `${jobQuery}?${stringify(params)}`,
    method: 'get',
  })
  return res
}

