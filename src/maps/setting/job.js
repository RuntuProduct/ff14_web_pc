// 格式 - 新键值名：从原始数据中取值的键值名

const jobAddSent = {
  name: 'name',
  menu: 'menu',
  path: 'path',
  status: 'status',
  levelId: 'levelId',
}

const jobEditSent = {
  rbacPrivilegeId: 'id',
  name: 'name',
  menu: 'menu',
  path: 'path',
  status: 'status',
  levelId: 'levelId',
}

const jobGet = {
  list: {
    tar: 'list',
    map: [{
      id: 'id',
      name: 'name',
      type: 'type',
      img: 'img',
    }],
  },
  current: 'current',
  pageSize: 'pageSize',
  total: 'total',
}

export default {
  jobAddSent,
  jobEditSent,
  jobGet,
}
