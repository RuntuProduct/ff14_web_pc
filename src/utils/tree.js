import _ from 'lodash'

const group = (data) => {
  const resObj = {}
  if (!data) { return resObj }
  for (let i = 0; i < data.length; i += 1) {
    const tar = data[i]
    if (tar) {
      const { level } = tar
      if (level) {
        if (resObj[level.length]) {
          resObj[level.length].push(tar)
        } else {
          resObj[level.length] = []
          resObj[level.length].push(tar)
        }
      }
    }
  }
  return resObj
}

const mapAryFuc = (ary, level, obj) => {
  // console.log(ary, level, obj)
  for (let i = 0; i < ary.length; i += 1) {
    const { level: getLevel } = ary[i]
    // console.log(getLevel, '-', level)
    if (getLevel === level) {
      // console.log('match')
      if (!ary[i]['childrens']) {
        ary[i]['childrens'] = []
      }
      ary[i]['childrens'].push(obj)
      // console.log(ary)
      break
    } else if (ary[i]['childrens']) {
      // 如果没有子元素的话不进行遍历
      mapAryFuc(ary[i]['childrens'], level, obj)
    }
  }
}

const dealChild = (data, length) => {
  let resAry = []
  if (data[length]) {
    // 初始化返回数组，将根节点添加到数组中
    resAry = [].concat(data[length])
  }
  // console.log('截取根节点数组', resAry)
  const keys = Object.keys(data)
  for (let i = 0; i < keys.length; i += 1) {
    const da = keys[i]
    const daLength = parseInt(da, 10)
    // da 为键值名,即当前分级字符串的长度
    if (daLength !== length) {
      // 遍历非根部节点
      const mapAry = [].concat(data[da])
      for (let j = 0; j < mapAry.length; j += 1) {
        const ma = mapAry[j]
        // 1.裁切出父层级的字符串
        const { level } = ma
        const parentLevel = level.slice(0, (daLength - parseInt(length, 10)))
        // 2.查找对应父层级的对象
        mapAryFuc(resAry, parentLevel, ma)
        // 3.并入到对应父层级的子数组中，如找不到父层级，不作处理
      }
    }
  }
  console.log(resAry)
  return resAry
}

const dealTree = (data, length = 3) => {
  // 1.遍历平级对象按照级号 id 长度分组
  const cloneData = _.cloneDeep(data)
  const levelAry = group(cloneData)
  // 2.遍历不同长度的分组数据，处理父子层级关系
  const result = dealChild(levelAry, length)
  return result
}

export const test = {
  group,
  dealChild,
  dealTree,
}
export default {
  dealTree,
}
