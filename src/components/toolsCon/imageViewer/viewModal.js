import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Modal } from 'antd'
import styles from './viewModal.less'

class HelpPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      view: 0,
    }
  }

  render() {
    const { modalProps, data, map, len, type, children } = this.props
    const { show, view } = this.state

    const showModal = () => {
      this.setState({ show: true })
      // console.log('弹窗')
    }

    const handleCancel = () => {
      this.setState({ show: false })
    }

    const picDom = (data, alt) => {
      // 无图片内容
      if (data) {
        return (
          <a href={data} target="_blank" title="点击查看大图">
            <img src={data} alt={alt} className={styles.img} />
          </a>
        )
      } else {
        return (
          <div className={styles.noPic}><Icon type="picture" />&nbsp;暂无图片</div>
        )
      }
    }

    const mapImg = () => {
      // 遍历生成图片列表
      let children
      // console.log(data)
      if (type == 'object') {
        const mapObj = {}
        for (let i = 0; i < map.length; i += 1) {
          const obj = {}
          obj[map[i].key] = map[i].label
          Object.assign(mapObj, obj)
        }
        // console.log(mapObj)
        children = Object.keys(data).map((da, idx) => {
          return (
            <div className={`${styles.imgTab} ${view == idx ? '' : styles.hide}`} key={idx}>
              <div className={styles.title}>{mapObj[da]}</div>
              {picDom(data[da], mapObj[da])}
            </div>
          )
        })
      } else if (type == 'array') {
        children = data.map((da, idx) => {
          return (
            <div className={`${styles.imgTab} ${view == idx ? '' : styles.hide}`} key={idx}>
              <div className={styles.title}>{`图片 ${idx + 1}`}</div>
              {picDom(da, '图片')}
            </div>
          )
        })
        children = children || picDom(null)
      } else {
        children = (
          <div className={styles.imgTab}>
            {picDom(data, '图片')}
          </div>
        )
      }
      if (children instanceof Array) {
        if (children.length) {
          return children
        } else {
          return picDom(null)
        }
      } else if (children != null) {
        return children
      } else {
        return picDom(null)
      }
    }

    const prev = () => {
      const { view } = this.state
      const tar = ((view - 1 < 0)) ? (len - 1) : (view - 1)
      // console.log(tar)
      this.setState({ view: tar })
    }

    const next = () => {
      const { view } = this.state
      const tar = ((view + 1 >= len)) ? 0 : (view + 1)
      // console.log(tar)
      this.setState({ view: tar })
    }

    const childrenDom = mapImg()
    // console.log('tar', childrenDom)

    return (
      <span>
        <span onClick={showModal}>{children}</span>
        <Modal {...modalProps} visible={show} onCancel={handleCancel} >
          <div className={styles.imgCon}>{childrenDom}</div>
          {
            childrenDom instanceof Array && childrenDom.length > 1 ?
              <div className={styles.btnLab}>
                <Button.Group>
                  <Button type="primary" onClick={() => prev()}><Icon type="left" /> 上一张</Button>
                  <Button type="primary" onClick={() => next()}>下一张 <Icon type="right" /></Button>
                </Button.Group>
              </div> : ''
          }
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
