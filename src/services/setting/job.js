import { request, config, pubfuc } from '@utils'
import { stringify } from 'qs'
import { jobGet } from '@maps/setting/job'

const { api } = config
const { job } = api
const { dealMap } = pubfuc

export async function query(params) {
  const res = await request({
    url: `${job}?${stringify(params.pageProps)}`,
    method: 'get',
  })
  res.data = dealMap(jobGet, res.data)
  return res
}
