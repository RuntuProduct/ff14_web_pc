import React from 'react'
import PropTypes from 'prop-types'
import { Form, Upload, Button, Icon } from 'antd'
import styles from './index.less'
import Uploader from './components/uploader'

class ImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const {
      fieldName,
      settings,
      form,
      layout,
      valueName,
      mapRules,
      options,
    } = this.props

    const {
      getFieldDecorator,
      getFieldProps,
      getFieldError,
    } = form

    const uploaderProps = {
      ...mapRules,
      label: fieldName,
      level: 'root',
      value: options.initialValue,
    }

    return (
      <div>
        <Uploader {...uploaderProps} />
      </div>
    )
  }
}

ImageUpload.defaultProps = {
  fieldName: '',
  settings: {},
  options: {},
}

ImageUpload.propTypes = {
  fieldName: PropTypes.string.isRequired,
  settings: PropTypes.object,
  form: PropTypes.object.isRequired,
  valueName: PropTypes.string.isRequired,
  options: PropTypes.object,
}

export default ImageUpload
