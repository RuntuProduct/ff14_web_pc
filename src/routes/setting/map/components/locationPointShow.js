import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Popover, Button, Modal } from 'antd'
import les from './locationPoint.less'

const math = require('mathjs')

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
      <div>
        <div>地点类型：{typeTxt}</div>
        <div className={les.btnLab}>
          <Button type="primary" size="small" onClick={handleEdit}>编辑</Button>
          <Button type="danger" size="small" onClick={handleDelete}>删除</Button>
        </div>
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

  const realStyles = () => {
    const { moveX, moveY } = realProps()
    return {
      touchAction: 'none',
      transform: `translate(${moveX}px, ${moveY}px)`,
    }
  }

  return (
    <div className={les.positionPoint} style={realStyles()}>
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
