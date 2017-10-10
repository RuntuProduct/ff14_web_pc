import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { tools } from '@components'
// import styles from '.'

const btnStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '16px',
}

const { Modal } = tools

const SetModal = ({
  ...modalProps
}) => {
  return (
    <Modal modalProps={modalProps}>
      <div>
        <Button type="primary" size="large" style={btnStyle}>重置密码</Button>
        <Button type="primary" size="large" style={btnStyle}>批量启用</Button>
        <Button type="primary" size="large" style={btnStyle}>批量停用</Button>
      </div>
    </Modal>
  )
}

SetModal.defaultProps = {
  // dealMenuClick: false,
}

SetModal.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default SetModal
