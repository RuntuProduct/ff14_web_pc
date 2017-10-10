import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Icon } from 'antd'
import { matchForm } from '@components/form'
import styles from './index.less'

// 垂直布局表单元素
const VerForm = ({
  fields,
  layout = { span: 24 },
}) => {
  // 生成行
  const getFields = (dataNode) => {
    const children = dataNode.map((da, idx) => {
      const { fieldType } = da
      let { cols } = da

      cols = (cols && JSON.stringify(cols) !== '{}') ? cols : layout
      cols = fieldType == 'Hidden' ? { span: 0 } : cols
      return (
        <Col key={idx} {...cols}>
          {matchForm(da)}
        </Col>
      )
    })
    return children
  }

  return (
    <Row gutter={24}>
      {
        getFields(fields)
      }
    </Row>
  )
}

VerForm.defaultProps = {
  fields: [],
}

VerForm.propTypes = {
  fields: PropTypes.array.isRequired,
  // from: PropTypes.object.isRequired,
}

export default VerForm
