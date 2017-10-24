// 格式 - 新键值名：从原始数据中取值的键值名

const jobAddSent = {
  name: 'name',
  img: 'img',
  jobId: 'jobId',
  difficulty: 'difficulty',
  stamina: 'stamina',
}

const jobEditSent = {
  id: 'id',
  name: 'name',
  img: 'img',
  jobId: 'jobId',
  difficulty: 'difficulty',
  stamina: 'stamina',
}

const jobDeleteSent = {
  id: 'id',
}

const jobGet = {
  list: {
    tar: 'list',
    map: [{
      id: 'id',
      name: 'name',
      jobId: 'jobId',
      jobName: 'jobName',
      img: 'img',
      difficulty: 'difficulty',
      stamina: 'stamina',
    }],
  },
  current: 'current',
  pageSize: 'pageSize',
  total: 'total',
}

const merSend = {
  name: 'name',
}
const merGet = {
  // 
}

export default {
  jobAddSent,
  jobEditSent,
  jobGet,
  jobDeleteSent,

  merSend,
  merGet,
}
