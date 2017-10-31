import React from 'react'
import PropTypes from 'prop-types'
import { Popover, Button } from 'antd'
import Draggable from 'react-draggable'
import { tools } from '@components'
import { imgBaseURL } from '@utils/config'
import les from './locationPoint.less'

const { Modal } = tools

class LocationPointCon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalShow: false,
      moving: false,
      moveX: this.props.axisX,
      moveY: this.props.axisY,
    }
  }
  render() {
    const {
      id,
      name,
      mapId,
      axisX,
      axisY,
      type,
      dispatch,
    } = this.props
    const {
      moving,
      moveX,
      moveY,
    } = this.state
    const handleStart = () => {
      this.setState({ moving: true })
    }
    const handleDrag = (e, data) => {
      // console.log('e:', e)
      // console.log('data:', data)
      const { x, y } = data
      // console.log(x, y)
      this.setState({ moveX: x, moveY: y })
    }
    const handleStop = () => {
      this.setState({ moving: false })
    }
    const dragProps = {
      axis: 'both',
      bounds: 'parent',
      defaultPosition: { x: axisX, y: axisY },
      position: { x: moveX, y: moveY },
      onStart: handleStart,
      onDrag: handleDrag,
      onStop: handleStop,
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
            <Button type="primary" size="small">编辑</Button>
            <Button type="danger" size="small">删除</Button>
          </div>
        </div>
      )
    }

    return (
      <Draggable {...dragProps}>
        <div className={les.positionPoint}>
          <div className={les.nameTxt}>{name}</div>
          <Popover content={TipsContent()} title={name}>
            <div className={les.content} />
          </Popover>
          <div className={les.positionTxt}>{`(${moveX}, ${moveY})`}</div>
        </div>
        
      </Draggable>
    )
  }
}

LocationPointCon.defaultProps = {
  // dealMenuClick: false,
}

LocationPointCon.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default LocationPointCon
