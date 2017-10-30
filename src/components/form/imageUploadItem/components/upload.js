import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal } from 'antd'
import _ from 'lodash'
import { baseURL, imgBaseURL } from '../../../../utils/config'
import les from './upload.less'

class UploadCon extends React.Component {
  constructor(props) {
    super(props)

    const value = this.props.value || []
    this.state = {
      previewVisible: false,
      previewImage: '',
      zoom: '100%',
      value,
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = ({ file, fileList }) => {
    // 处理上传状态
    console.log(file, fileList)
    const { uid, status, response } = file
    if (status == 'done') {
      const { data } = response
      const { filename } = data
      const tarIndex = _.findIndex(fileList, (fi) => {
        return fi.uid === uid
      })
      if (tarIndex !== -1) {
        fileList[tarIndex]['url'] = `/${filename}`
      }
    }
    this.setState({ value: fileList })
    this.triggerChange(fileList)
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange
    if (onChange) {
      onChange(changedValue)
    }
  }

  render() {
    const { length, url, viewProps } = this.props
    const { previewVisible, previewImage, value, zoom } = this.state
    const fileList = value.map((da, idx) => {
      if (imgBaseURL && da.url) {
        return {
          ...da,
          uid: `uploader-${idx}`,
          url: `${imgBaseURL}${da.url}`,
        }
      }
      return da
    })
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    )
    const handleZoom = (e) => {
      // console.log(e.deltaMode)
      // console.log(e.deltaX)
      // console.log(e.deltaY)
      // console.log(e.deltaZ)
      const { deltaX, deltaY } = e
      if (deltaY < 0) {
        this.setState({ zoom: `${parseInt(zoom, 10) * 1.1}%` })
      } else {
        this.setState({ zoom: `${parseInt(zoom, 10) * 0.9}%` })
      }
    }
    return (
      <div className="clearfix">
        <Upload
          action={`${baseURL}${url}`}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {value.length >= length ? null : uploadButton}
        </Upload>
        <Modal {...viewProps} className={les.modal} visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="图片" style={{ width: '100%' }} className={les.img} onWheel={handleZoom} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

UploadCon.defaultProps = {
  length: 3,
  url: '/upload',
  viewProps: { width: '400px' },
}

UploadCon.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default UploadCon
