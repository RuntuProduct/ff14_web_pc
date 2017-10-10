// 格式 - 新键值名：从原始数据中取值的键值名

const privilegeAddSent = {
  name: 'name',
  menu: 'menu',
  path: 'path',
  status: 'status',
  levelId: 'levelId',
}

const privilegeEditSent = {
  rbacPrivilegeId: 'id',
  name: 'name',
  menu: 'menu',
  path: 'path',
  status: 'status',
  levelId: 'levelId',
}

const privilegeGet = {
  list: {
    tar: 'list',
    map: [{
      id: 'rbacPrivilegeId',
      name: 'name',
      menu: 'menu',
      path: 'path',
      level: 'levelId',
      status: 'status',
      createdDate: 'created',
    }],
  },
}

export default {
  privilegeAddSent,
  privilegeEditSent,
  privilegeGet,
}
