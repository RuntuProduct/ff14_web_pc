// 格式 - 新键值名：从原始数据中取值的键值名

const materialAddSent = {
  name: 'name',
  img: 'img',
  getType: 'getType',
}

const materialEditSent = {
  id: 'id',
  name: 'name',
  img: 'img',
  getType: 'getType',
}

const materialDeleteSent = {
  id: 'id',
}

const materialGet = {
  list: {
    tar: 'list',
    map: [{
      id: 'id',
      name: 'name',
      img: 'img',
      jobId: 'jobId',
      jobName: 'jobName',
      getType: 'getType',
    }],
  },
  current: 'current',
  pageSize: 'pageSize',
  total: 'total',
}

export default {
  materialAddSent,
  materialEditSent,
  materialGet,
  materialDeleteSent,
}
