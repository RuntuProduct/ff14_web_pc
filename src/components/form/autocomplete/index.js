import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, AutoComplete } from 'antd'
import pubSty from '../public.less'
// import styles from './index.less'

const FormItem = Form.Item

const MyInput = ({
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

  // console.log(settings)

  // 如果有传入样式定义使用传入值，如无使用默认值
  const lastLayout = settings.layout ? settings.layout : layout

  const value = options.initialValue

  return (
    <FormItem
      label={fieldName}
      {...lastLayout}
    >
      {getFieldDecorator(valueName, options)(
        <AutoComplete {...settings} />
      )}
    </FormItem>
  )
}

MyInput.defaultProps = {
  layout: {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  },
  settings: {
  },
  options: {},
}

MyInput.propTypes = {
  fieldName: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  valueName: PropTypes.string.isRequired,
  settings: PropTypes.object,
  options: PropTypes.object,
}

export default MyInput
