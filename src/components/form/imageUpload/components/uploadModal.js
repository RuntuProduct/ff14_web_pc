import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col } from 'antd'
import styles from './uploadModal.less'
import Uploader from './uploader'

class HelpPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
  }

  render() {
    const { title, rule, value, children } = this.props
    const { show } = this.state

    const showModal = () => {
      this.setState({ show: true })
      // console.log('弹窗')
    }

    const handleCancel = () => {
      this.setState({ show: false })
    }

    const initUpload = () => {
      // 初始化上传组件
      const { type, len, map } = rule
      let res
      if (type == 'object') {
        // 对象遍历、赋值
        res = map.map((ma, idx) => {
          const props = {
            type: 'single',
            len: 1,
            label: ma.label,
            level: 'children',
            value: value[ma.key],
          }
          // console.log(props)
          return <Uploader key={idx} {...props} />
        })
      } else if (type == 'array') {
        // 数组遍历、赋值
        res = []
        for (let i = 0; i < len; i += 1) {
          const props = {
            type: 'single',
            len: 1,
            label: `图片 ${i + 1}`,
            level: 'children',
            value: value[i],
          }
          // console.log(props)
          res.push(<Uploader key={i} {...props} />)
        }
      }
      return res
    }

    const modalProps = {
      title,
      visible: show,
      onCancel: handleCancel,
    }

    return (
      <span>
        <span onClick={showModal}>{children}</span>
        <Modal {...modalProps} >
          <Row gutter={16}>
            {initUpload().map((da, idx) => {
              return <Col xs={8} lg={6} key={idx}>{da}</Col>
            })}
            {/* <Col xs={8} lg={6}>{initUpload()}</Col> */}
          </Row>
        </Modal>
      </span>
    )
  }
}

HelpPopup.defaultProps = {
  // dealMenuClick: false,
}

HelpPopup.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default HelpPopup
