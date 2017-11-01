import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Draggable from 'react-draggable'
import les from './locationPoint.less'

const math = require('mathjs')

class LocationPointCon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      moving: false,
      moveX: this.props.axisX,
      moveY: this.props.axisY,
    }
  }
  render() {
    const {
      parentX,
      parentY,
      baseX,
      baseY,
      axisX,
      axisY,
      onChange,
    } = this.props
    const {
      moving,
      moveX,
      moveY,
    } = this.state
    // 计算实际值
    const mathReal = (x, y) => {
      if (!parseInt(parentX, 10) || !parseInt(parentY, 10) || !baseX || !baseY) {
        throw new Error('坐标错误')
      }
      // 根据传入的规格baseX、baseY作为底数计算实际坐标值
      const realX = math.eval(`(${x} * ${baseX}) / ${parseInt(parentX, 10)}`)
      const realY = math.eval(`(${y} * ${baseY}) / ${parseInt(parentY, 10)}`)
      console.log(realX, realY)
      return { realX, realY }
    }
    const handleStart = () => {
      // this.setState({ moving: true })
    }
    const handleDrag = (e, data) => {
      // console.log('e:', e)
      // console.log('data:', data)
      const { x, y } = data
      // console.log(baseX, baseY)
      // console.log(x, y)
      this.setState({ moveX: x, moveY: y })
    }
    const handleStop = (e, data) => {
      console.log('e:', e)
      console.log('data:', data)
      const { x, y } = data
      if (!parseInt(parentX, 10) || !parseInt(parentY, 10) || !baseX || !baseY) {
        throw new Error('坐标错误')
      }
      // 根据传入的规格baseX、baseY作为底数计算实际坐标值
      const realX = math.eval(`(${x} * ${baseX}) / ${parseInt(parentX, 10)}`)
      const realY = math.eval(`(${y} * ${baseY}) / ${parseInt(parentY, 10)}`)
      console.log(realX, realY)
      // this.setState({ moving: false })
      onChange(x, y)
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

    return (
      <Draggable {...dragProps}>
        <div className={les.positionPoint}>
          <div className={les.content} />
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
