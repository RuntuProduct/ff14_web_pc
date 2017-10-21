import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Icon } from 'antd'
import styles from './index.less'

const Colle = ({
  data,
  className,
}) => {
  // 生成区块
  const getBlock = (dataNode) => {
    return dataNode.map((da, idx) => {
      return (
        <div key={idx} className={`multi-col-con ${da.className || ''}`}>
          <div className={'multi-col-title'}>
            {da.icon && <Icon type={da.icon} />}
            {da.label}
          </div>
          <div className={'multi-col-content'}>{da.childrens}</div>
        </div>
      )
    })
  }

  return (
    <div className={`multi-con ${className}`}>
      {
        getBlock(data)
      }
    </div>
  )
}

Colle.defaultProps = {
  data: [],
  className: '',
}

Colle.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
}

export default Colle
