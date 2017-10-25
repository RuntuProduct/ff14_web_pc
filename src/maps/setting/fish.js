// 格式 - 新键值名：从原始数据中取值的键值名

const fishAddSent = {
  name: 'name',
  img: 'img',
}

const fishEditSent = {
  id: 'id',
  name: 'name',
  img: 'img',
}
const fishDeleteSent = {
  id: 'id',
}

const fishGet = {
  list: {
    tar: 'list',
    map: [{
      id: 'id',
      name: 'name',
      img: 'img',
    }],
  },
  current: 'current',
  pageSize: 'pageSize',
  total: 'total',
}

export default {
  fishAddSent,
  fishEditSent,
  fishDeleteSent,
  fishGet,
}
