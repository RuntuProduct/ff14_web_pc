import { request, config, pubfuc } from '@utils'
import { stringify } from 'qs'
import { agentSend, agentGet } from '@maps/agent/index'

const { api } = config
const { agent } = api
const { dealMap } = pubfuc

export async function query(params) {
  params = dealMap(agentSend, params)
  const res = await request({
    url: `${agent}?${stringify(params.pageProps)}`,
    method: 'post',
    data: params.obj,
  })
  res.data = dealMap(agentGet, res.data[0])
  return res
}
