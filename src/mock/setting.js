import { mapUrl } from './index.js'

// 请求分发
const fetch = (options) => {
  return new Promise((resolve, reject) => {
    const {
      method = 'get',
      netTime = 300,
      data,
      paramsType,
      url,
      headers,
    } = options
    console.log(`${method}: ${url}`, options)
    setTimeout(() => {
      mapUrl(method, url, data, options, (result, { status, message: msg, data }) => {
        if (result) {
          // 请求失败
          reject({
            response: {
              status,
              statusText: msg,
              data: data || {},
            },
          })
        } else {
          // 请求成功
          resolve({
            status: status || 200,
            statusText: msg || 'SUCCESS',
            data,
          })
        }
      })
    }, netTime)
  })
}

// 模拟请求
const fakeNet = (options) => {
  return fetch(options).then((response) => {
    console.log('success', response)
    const { statusText, status, data } = response
    return {
      success: true,
      message: statusText,
      status,
      data,
    }
  }).catch((error) => {
    console.log('err:', error)
    const { response } = error
    let msg
    let status
    let data
    if (response) {
      const { data, statusText } = response
      status = response.status
      msg = data.message || statusText
    } else {
      status = 600
      msg = 'Network Error'
    }
    return { success: false, status, message: msg, data }
  })
}

const mock = true
export {
  mock,
  fakeNet,
}
