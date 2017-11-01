import React from 'react'
import PropTypes from 'prop-types'
import { tools } from '@components'
import { imgBaseURL } from '@utils/config'
import les from './locationSetting.less'
import LocationPoint from './locationPoint'

const math = require('mathjs')

class LocationPointCon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pX: 0,
      pY: 0,
    }
  }

  componentDidMount = () => {
    const component = this.parentCon
    const { width, height } = window.getComputedStyle(component)
    this.setState({ pX: width, pY: height })
  }

  render() {
    const {
      data,
      form,
    } = this.props
    const {
      pX,
      pY,
    } = this.state
    const {
      img,
      baseX,
      baseY,
    } = data
    const pointProps = {
      parentX: pX,
      parentY: pY,
      baseX,
      baseY,
      axisX: data['axisX'] || 0,
      axisY: data['axisY'] || 0,
      onChange: (axisX, axisY) => form.setFieldsValue({ axisX, axisY }),
    }
    return (
      <div ref={(c) => { this.parentCon = c }} className={les.imgArea}>
        <LocationPoint {...pointProps} />
        <img src={`${imgBaseURL}${img}`} alt="地图图片" />
      </div>
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
