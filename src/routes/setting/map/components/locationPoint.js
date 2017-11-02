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
      moveX: null,  // 组件内使用的坐标值
      moveY: null,  // 组件内使用的坐标值
      realX: this.props.axisX,  // 存库里的实际坐标值
      realY: this.props.axisY,  // 存库里的实际坐标值
    }
  }

  componentWillReceiveProps = (nextProps) => {
    // console.log(nextProps)
    const { parentX, parentY } = nextProps
    const { moveX, moveY } = this.state
    // 各个值都初始化完成之后
    if ((moveX === null || moveY === null) && (parentX !== 0 || parentY !== 0)) {
      console.log('get')
      const { baseX, baseY, axisX, axisY } = nextProps
      const { moveX: newX, moveY: newY } = this.mathState(parentX, parentY, baseX, baseY, axisX, axisY)
      this.setState({ moveX: newX, moveY: newY })
    }
  }

  // 计算实际值
  mathReal = (x, y) => {
    const { parentX, parentY, baseX, baseY } = this.props
    if (!parseInt(parentX, 10) || !parseInt(parentY, 10) || !baseX || !baseY) {
      throw new Error('坐标错误')
    }
    // 根据传入的规格baseX、baseY作为底数计算实际坐标值
    let realX = math.eval(`(${x} * ${baseX}) / ${parseInt(parentX, 10)}`)
    let realY = math.eval(`(${y} * ${baseY}) / ${parseInt(parentY, 10)}`)
    realX = _.floor(realX)
    realY = _.floor(realY)
    // console.log('realX:', realX, 'realY', realY)
    return { realX, realY }
  }
  // 根据实际值计算组件内使用的值
  mathState = (parentX, parentY, baseX, baseY, x, y) => {
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

  render() {
    const {
      onChange,
    } = this.props
    const {
      moveX,
      moveY,
      realX,
      realY,
    } = this.state
    // const { moveX: defX, moveY: defY } = this.mathState(axisX, axisY)
    const handleStart = () => {
      // this.setState({ moving: true })
    }
    const handleDrag = (e, data) => {
      const { x, y } = data
      this.setState({ moveX: x, moveY: y })
      const { realX, realY } = this.mathReal(x, y)
      this.setState({ realX, realY })
    }
    const handleStop = (e, data) => {
      const { x, y } = data
      const { realX, realY } = this.mathReal(x, y)
      this.setState({ realX, realY })
      onChange(realX, realY)
    }
    const dragProps = {
      axis: 'both',
      bounds: 'parent',
      defaultPosition: { x: moveX, y: moveY },
      position: { x: moveX, y: moveY },
      onStart: handleStart,
      onDrag: handleDrag,
      onStop: handleStop,
    }

    return (
      <Draggable {...dragProps}>
        <div className={les.positionPoint}>
          <div className={les.content} />
          <div className={les.positionTxt}>{`(${realX}, ${realY})`}</div>
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
