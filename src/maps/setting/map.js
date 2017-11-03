// 格式 - 新键值名：从原始数据中取值的键值名

const mapAddSent = {
  name: 'name',
  img: 'img',
  baseX: 'baseX',
  baseY: 'baseY',
}

const mapEditSent = {
  id: 'id',
  name: 'name',
  img: 'img',
  baseX: 'baseX',
  baseY: 'baseY',
}
const fishDeleteSent = {
  id: 'id',
}

const mapDetailGet = {
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
  mapAddSent,
  mapEditSent,
  fishDeleteSent,
  mapDetailGet,
  mapGet,
}
