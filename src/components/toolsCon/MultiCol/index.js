import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Icon } from 'antd'
import styles from './index.less'

const Colle = ({
  data,
}) => {
  // 生成区块
  const getBlock = (dataNode) => {
    return dataNode.map((da, idx) => {
      return (
        <div key={idx}>
          <div className={styles.title}>
            <Icon type="bars" />
            {da.label}
          </div>
          {da.childrens}
        </div>
      )
    })
  }

  return (
    <div>
      {
        getBlock(data)
      }
    </div>
  )
}

Colle.defaultProps = {
  data: [],
}

Colle.propTypes = {
  data: PropTypes.array.isRequired,
  // from: PropTypes.object.isRequired,
}

export default Colle
