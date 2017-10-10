import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { tools } from '@components'
// import styles from '.'
import Tree from './components/tree'

const { MultiCol } = tools

const HelpPopup = ({
  data,
}) => {
  return (
    <Row gutter={16}>
      <Col sm={12} xs={24}>
        <MultiCol
          data={
            [{ label: '渠道审核设置', childrens: <Tree /> }]
          }
        />
      </Col>
      <Col sm={12} xs={24}>
        <MultiCol
          data={
            [{ label: '商户审核设置', childrens: <Tree /> }]
          }
        />
      </Col>
    </Row>
  )
}

HelpPopup.defaultProps = {
  dealMenuClick: false,
}

HelpPopup.propTypes = {
  dealMenuClick: PropTypes.bool,
}

export default HelpPopup
