import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Popover, Button, Modal } from 'antd'
import { imgs, imgBaseURL } from '@utils/config'
import les from './locationPointShow.less'

const math = require('mathjs')

const { loMining, loQuarrying, loLogging, loHarvesting, loSend } = imgs

const LocationPointCon = ({
  id,
  name,
  axisX,
  axisY,
  type,

  parentX,
  parentY,
  baseX,
  baseY,
  mapId,
  mapImg,

  colList,
  dispatch,
}) => {
  // 进入编辑地点弹窗
  const handleEdit = () => {
    dispatch({
      type: 'map/showModalLocationDetail',
      tit: '编辑地点',
      obj: {
        editType: 'edit',
        mapId,
        img: mapImg,
        baseX,
        baseY,

        id,
        name,
        axisX,
        axisY,
        type,
      },
    })
    // 获取采集物列表
    dispatch({ type: 'map/getCollection', loId: id })
  }
  // 删除地点
  const handleDelete = () => {
    Modal.confirm({
      title: '删除地点',
      content: `确定删除【${name}】吗`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({ type: 'map/deleteLocation', id, mapId })
      },
    })
  }
  const mapColItem = (ary) => {
    return ary.map((da) => {
      const { id, img, name, tarType } = da
      return (
        <div key={id} className={les.colItem}>
          {/* 采集物图标 */}
          <div className={les.img}>
            <img src={`${imgBaseURL}${img}`} alt={name} />
          </div>
          {/* 采集物名称 */}
          <div className={les.tarName}>{name}</div>
          {/* 采集物类型 */}
          <div className={les.tarType}>
            {tarType == '01' && '材料'}
            {tarType == '02' && '鱼类'}
          </div>
        </div>
      )
    })
  }
  const TipsContent = () => {
    let typeTxt = '未知类型'
    if (type === '01') {
      typeTxt = '挖矿点'
    } else if (type === '02') {
      typeTxt = '碎石点'
    } else if (type === '03') {
      typeTxt = '采集点'
    } else if (type === '04') {
      typeTxt = '割草点'
    } else if (type === '05') {
      typeTxt = '传送点'
    }
    return (
      <div className={les.contentCon}>
        <div>地点类型：{typeTxt}</div>
        <div className={les.btnLab}>
          <Button type="primary" size="small" onClick={handleEdit}>编辑</Button>
          <Button type="danger" size="small" onClick={handleDelete}>删除</Button>
        </div>
        <div className={les.colListcon}>{mapColItem(colList)}</div>
      </div>
    )
  }

  // touch-action: none;
  // transform: translate(162px, 284px);

  // 根据实际值计算组件内使用的值
  const realProps = () => {
    const x = axisX
    const y = axisY
    if (!parseInt(parentX, 10) || !parseInt(parentY, 10) || !baseX || !baseY) {
      return { moveX: 0, moveY: 0 }
      // throw new Error('坐标错误')
    } else {
      // 根据传入的规格baseX、baseY计算组件内使用值
      let moveX = math.eval(`(${x} * ${parseInt(parentX, 10)}) / ${baseX}`)
      let moveY = math.eval(`(${y} * ${parseInt(parentY, 10)}) / ${baseY}`)
      moveX = _.floor(moveX)
      moveY = _.floor(moveY)
      // console.log('moveX:', moveX, 'moveY', moveY)
      return { moveX, moveY }
    }
  }

  const realBgImg = () => {
    let img = ''
    if (type === '01') {
      img = loMining
    } else if (type === '02') {
      img = loQuarrying
    } else if (type === '03') {
      img = loLogging
    } else if (type === '04') {
      img = loHarvesting
    } else if (type === '05') {
      img = loSend
    }
    return `url(${img})`
  }

  const realStyles = () => {
    const { moveX, moveY } = realProps()
    return {
      touchAction: 'none',
      transform: `translate(${moveX}px, ${moveY}px)`,
      backgroundImage: realBgImg(),
    }
  }

  const onMouseEnter = () => {
    dispatch({ type: 'map/getCollection', loId: id })
  }

  return (
    <div className={les.positionPoint} style={realStyles()} onMouseEnter={onMouseEnter}>
      <div className={les.nameTxt}>{name}</div>
      <Popover content={TipsContent()} title={name}>
        <div className={les.content} />
      </Popover>
      <div className={les.positionTxt}>{`(${axisX}, ${axisY})`}</div>
    </div>
  )
}

LocationPointCon.defaultProps = {
  // dealMenuClick: false,
}

LocationPointCon.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default LocationPointCon
