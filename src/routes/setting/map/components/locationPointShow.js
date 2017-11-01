import React from 'react'
import PropTypes from 'prop-types'
import { Popover, Button } from 'antd'
import les from './locationPoint.less'

const LocationPointCon = ({
  id,
  name,
  axisX,
  axisY,
  type,

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
  const TipsContent = () => {
    let typeTxt = '未知类型'
    if (type === '01') {
      typeTxt = '采集点'
    } else if (type === '02') {
      typeTxt = '挖矿点'
    } else if (type === '03') {
      typeTxt = '传送点'
    }
    return (
      <div>
        <div>地点类型：{typeTxt}</div>
        <div className={les.btnLab}>
          <Button type="primary" size="small" onClick={handleEdit}>编辑</Button>
          <Button type="danger" size="small">删除</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={les.positionPoint}>
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
