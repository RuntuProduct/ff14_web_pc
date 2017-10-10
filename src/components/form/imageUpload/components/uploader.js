import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Button, Icon } from 'antd'
import styles from './uploader.less'
import ViewModal from './viewModal'
import UploadModal from './uploadModal'

const countAbs = (num) => {
  // 返回该数的开方值的向上取整数字
  return Math.ceil(Math.sqrt(num))
}

class Uploader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const {
      type,
      len,
      map,
      label,
      level,
      value,
    } = this.props

    const initByMap = () => {
      // 根据map规则初始化表单值
      let res
      if (type == 'object') {
        res = {}
        for (let i = 0; i < map.length; i += 1) {
          // 
          const obj = {}
          obj[map[i]['key']] = ''
          Object.assign(res, obj)
        }
      } else if (type == 'array') {
        res = []
      } else {
        res = ''
      }

      return res
    }

    // 如果有初始值，使用初始值遍历，如无使用map规则初始化数据结构
    const imgValue = value || initByMap()
    // console.log('图片组件使用值', imgValue)

    const initBlock = () => {
      // 根据map规则初始化图片窗格
      let children = null
      // 计算九宫格幂数
      const count = countAbs(len)
      const style = {
        width: `${100 / count}%`,
        height: `${100 / count}%`,
        backgroundSize: '100% auto',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }
      if (type == 'object') {
        children = map.map((ma, idx) => {
          const bgVal = {}
          if (imgValue[ma.key]) {
            bgVal.backgroundImage = `url(${imgValue[ma.key]})`
            const freeStyles = Object.assign(bgVal, style)
            return <div style={freeStyles} key={idx} />
          } else {
            return <div style={style} className={styles.imgPlaceholder} key={idx} ><Icon type="picture" /></div>
          }
        })
        // children.push(<div style={style} key={1}>1</div>)
      } else if (type == 'array') {
        children = imgValue.map((ma, idx) => {
          const bgVal = {}
          bgVal.backgroundImage = `url(${ma})`
          // console.log(bgVal)
          const freeStyles = Object.assign(bgVal, style)
          return <div style={freeStyles} key={idx} />
        })
      } else {
        // 单值的情况
        const bgVal = {}
        if (imgValue) {
          bgVal.backgroundImage = `url(${imgValue})`
          const freeStyles = Object.assign(bgVal, style)
          children = <div style={freeStyles} />
        }
      }

      if (children instanceof Array) {
        if (children.length) {
          return children
        } else {
          return <div className={styles.noImg}>暂无内容</div>
        }
      } else if (children != null) {
        return children
      } else {
        return <div className={styles.noImg}>暂无内容</div>
      }
    }

    const initUpload = () => {
      if (type == 'object' || type == 'array') {
        return (
          <UploadModal title={`${label}上传`} rule={this.props} value={imgValue}>
            <Button className={styles.uploadBtn}>上传</Button>
          </UploadModal>
        )
      } else {
        return (
          <Upload
            className={styles.uploader}
            name="avatar"
          >
            <Button className={styles.uploadBtn}>上传</Button>
          </Upload>
        )
      }
    }

    // 弹窗参数
    const modalProps = {
      modalProps: {
        title: label,
        // key: Date.parse(new Date()),
        width: '60%',
        wrapClassName: 'vertical-center-modal',
        maskClosable: true,
      },
      data: imgValue,
      len,
      map,
      type,
    }

    return (
      <div>
        <div>{label}</div>
        <div className={styles.lab}>
          <div className={styles.imgOuter}>
            {/* 初始化预览九宫格 */}
            {initBlock()}
          </div>
          {/* 预览弹窗 */}
          <ViewModal {...modalProps} >
            <div className={styles.mask}><Icon type="eye-o" /></div>
          </ViewModal>
        </div>
        {/* 上传弹窗或者上传按钮 */}
        {initUpload()}
      </div>
    )
  }
}

Uploader.defaultProps = {
  // dealMenuClick: false,
}

Uploader.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default Uploader
