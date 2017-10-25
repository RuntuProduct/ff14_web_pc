// 格式 - 新键值名：从原始数据中取值的键值名

const productAddSent = {
  name: 'name',
  img: 'img',
  jobId: 'jobId',
  level: 'level',
  difficulty: 'difficulty',
  stamina: 'stamina',
}

const productEditSent = {
  id: 'id',
  name: 'name',
  img: 'img',
  jobId: 'jobId',
  level: 'level',
  difficulty: 'difficulty',
  stamina: 'stamina',
}

const productDeleteSent = {
  id: 'id',
}

const productGet = {
  list: {
    tar: 'list',
    map: [{
      id: 'id',
      name: 'name',
      jobId: 'jobId',
      jobName: 'jobName',
      img: 'img',
      level: 'level',
      difficulty: 'difficulty',
      stamina: 'stamina',
    }],
  },
  current: 'current',
  pageSize: 'pageSize',
  total: 'total',
}

const formulaSend = {
  pid: 'pid',
  tarId: 'tarId',
  tarType: 'tarType',
  num: 'num',
}

export default {
  productAddSent,
  productEditSent,
  productGet,
  productDeleteSent,
  formulaSend,
}
