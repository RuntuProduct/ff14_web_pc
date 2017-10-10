import _ from 'lodash'

// 分页处理
const pageMake = (data, now, size) => {
  try {
    const res = _.chunk(data, size)
    if (now > res.length) {
      return []
    } else {
      return res[now - 1]
    }
  } catch (e) {
    throw e
  }
}

// 查询处理
const queryMake = (data, rule, query) => {
  const ruleAry = Object.keys(rule)
  const queryAry = Object.keys(query)

  const funcAry = ruleAry.filter((ru) => {
    return queryAry.indexOf(ru) !== -1
  })

  return data.filter((da) => {
    for (let i = 0; i < funcAry.length; i += 1) {
      const key = funcAry[i]
      let match = false
      if (typeof rule[key] === 'function') {
        match = rule[key](da, query[key])
      } else {
        match = true
      }
      if (!match) {
        return match
      } else if (i == funcAry.length - 1) {
        return match
      }
    }
  })
}

// 处理分页，查询
const dealPage = (data, query, rule) => {
  // 获取分页数据
  try {
    const { obj, pageProps } = query
    // 处理查询
    if (obj && !_.isEmpty(obj) && rule && !_.isEmpty(rule)) {
      data = queryMake(data, rule, obj)
    }
    // 处理分页
    const { page, size } = pageProps
    const list = pageMake(data, page, size)
    return {
      success: true,
      message: 'SUCCESS',
      data: {
        list,
        pageNum: parseInt(page, 10),
        pageSize: parseInt(size, 10),
        total: data.length,
      },
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      message: '参数错误',
      data: null,
    }
  }
}

export default {
  dealPage,
}
