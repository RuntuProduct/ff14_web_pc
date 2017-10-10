// 浮点数精确相加
function floatAdd(arg1, arg2) {
  let r1
  let r2
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  const c = Math.abs(r1 - r2)
  const m = 10 ** Math.max(r1, r2)
  if (c > 0) {
    const cm = 10 ** c
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return (arg1 + arg2) / m
}

// 获取值的类型（针对无法直接判断数组类型而设）
function getValType(val) {
  if (val instanceof Array) {
    return 'array'
  } else if (val) {
    return typeof val
  } else {
    return 'undefined'
  }
}

// 检查两者的值类型是否一致
function matchValType(val1, val2) {
  const t1 = getValType(val1)
  const t2 = getValType(val2)
  if (t1 === t2) {
    return { t1, t2 }
  } else {
    return false
  }
}

// 处理数组遍历
function dealAryMap(tar, data) {
  const res = []
  // 获取map对象的数据格式判断取值方式
  const test = matchValType(tar[0], data[0])
  if (test) {
    // console.log(test)
    const { t1 } = test
    if (t1 === 'object') {
      // 处理对象数组,规则对象中定义为对象数组的取第一个元素作为映射规则
      data.map((da, idx) => {
        // console.log('对象数组处理', tar[0], da)
        res[idx] = Object.assign({}, dealObjMap(tar[0], da))
      })
    } else {
      // 处理多维数组和一维数组
      data.map((da, idx) => {
        const dType = getValType(da)
        if (dType === 'array') {
          res[idx] = [].concat(dealAryMap(tar[idx], da))
        } else if (dType === 'object') {
          res[idx] = Object.assign({}, dealObjMap(tar[idx], da))
        } else {
          res[idx] = dealNorMap(da)
        }
      })
    }
  } else if (!data[0]) {
    // 处理值为空数组
  } else {
    console.error('两值类型不一致')
  }
  return res
}

// 处理对象属性遍历
function dealObjMap(tar, data) {
  const res = {}
  Object.keys(tar).map((ta) => {
    // ta 为键值名
    // 读取规则体，若不为字符（即为对象），则是复杂映射
    const map = tar[ta]
    const mType = getValType(map)
    let val
    let vType
    if (mType === 'object') {
      val = data[map.tar]
      vType = getValType(val)
    } else {
      val = data[tar[ta]]
      vType = getValType(val)
    }
    // console.log('对象处理：', tar[ta], mType, val, vType)
    if (vType === 'array') {
      res[ta] = [].concat(dealAryMap(map.map, val))
    } else if (vType === 'object') {
      res[ta] = Object.assign({}, dealObjMap(map.map, val))
    } else {
      res[ta] = dealNorMap(val)
    }
  })
  return res
}

// 处理非对象非数组数据
function dealNorMap(data) {
  return data
}

// 对后端数据进行 map 映射
// map:映射规则
// data:请求对象
function dealMap(map, data) {
  let newData = null
  // console.log('映射规则：', map, '要处理的数据：', data)
  const mType = getValType(map)
  const dType = getValType(data)
  if (mType == 'array' && dType === 'array') {
    // 数组类型的data处理
    newData = [].concat(dealAryMap(map, data))
  } else if (mType === 'object' && dType === 'object') {
    // 对象类型的 data 处理
    newData = Object.assign({}, dealObjMap(map, data))
  } else {
    newData = dealNorMap(data)
  }
  // console.log('接收到的数据：', data, '\n', '转换后的数据：', newData)
  return newData
}

// 将字符串转化为数组
const dealStrAry = (str) => {
  if (str) {
    return str.split(',')
  } else {
    return []
  }
}

// 获取cookies
const getCookieByString = (cookieName) => {
  let start = document.cookie.indexOf(cookieName+'=')
  if (start == -1) return false
  start = start + cookieName.length + 1
  let end = document.cookie.indexOf(';', start)
  if (end == -1) end = document.cookie.length
  return document.cookie.substring(start, end)
}

// 删除cookies
const delCookie = (name) => {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const cval = getCookieByString(name)
  if (cval!=null) {
    document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`
  }
}

export default {
  floatAdd,
  dealMap,
  dealStrAry,
  getCookieByString,
  delCookie,
}
