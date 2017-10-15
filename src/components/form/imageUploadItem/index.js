import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
// import les from '.'
import Uploader from './components/upload'

const FormItem = Form.Item

const ImageUploadItemCon = ({
  fieldName,
  settings,
  form,
  layout,
  valueName,
  options,
}) => {
  const {
    getFieldDecorator,
  } = form

  // 如果有传入样式定义使用传入值，如无使用默认值
  const lastLayout = settings.layout ? settings.layout : layout

  const uploaderProps = {
    ...settings,
  }

  return (
    <FormItem
      label={fieldName}
      {...lastLayout}
    >
      {getFieldDecorator(valueName, options)(
        <Uploader {...uploaderProps} />,
      )}
    </FormItem>
  )
}

ImageUploadItemCon.defaultProps = {
  layout: {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  },
}

ImageUploadItemCon.propTypes = {
  fieldName: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  valueName: PropTypes.string.isRequired,
}

export default ImageUploadItemCon
