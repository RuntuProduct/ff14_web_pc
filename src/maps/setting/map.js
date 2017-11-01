// 格式 - 新键值名：从原始数据中取值的键值名

const fishAddSent = {
  name: 'name',
  img: 'img',
  baseX: 'baseX',
  baseY: 'baseY',
}

const fishEditSent = {
  id: 'id',
  name: 'name',
  img: 'img',
  baseX: 'baseX',
  baseY: 'baseY',
}
const fishDeleteSent = {
  id: 'id',
}

const mapGet = {
  list: {
    tar: 'list',
    map: [{
      id: 'id',
      name: 'name',
      img: 'img',
      baseX: 'baseX',
      baseY: 'baseY',
      positionAry: {
        tar: 'positionAry',
        map: [{
          id: 'id',
          name: 'name',
          mapId: 'mapId',
          axisX: 'axisX',
          axisY: 'axisY',
          type: 'type',
        }],
      },
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
  mapGet,
}
