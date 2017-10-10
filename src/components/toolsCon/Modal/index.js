import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
// import styles from './index.less'

const ModalCon = ({
  modalProps,
  children,
}) => {
  // console.log(modalProps)
  return (
    <Modal
      {...modalProps}
    >
      {children}
    </Modal>
  )
}

ModalCon.defaultProps = {
  // dealMenuClick: false,
}

ModalCon.propTypes = {
  modalProps: PropTypes.object.isRequired,
  // body: PropTypes.object.isRequired,
}

export default ModalCon
