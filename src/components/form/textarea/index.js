import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input } from 'antd'
// import styles from './index.less'

const FormItem = Form.Item

class MyInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  // 清除表单输入内容
  clearVal = () => {
    const { valueName } = this.props
    const { setFields } = this.props.form
    const tar = {}
    tar[valueName] = null
    setFields(tar)
  }

  render() {
    const {
      fieldName,
      settings,
      form,
      layout,
      valueName,
      options,
    } = this.props

    const {
      getFieldDecorator,
      // getFieldProps,
      // getFieldError,
    } = form

    // console.log(settings)

    // 如果有传入样式定义使用传入值，如无使用默认值
    const lastLayout = settings.layout ? settings.layout : layout

    return (
      <FormItem
        label={fieldName}
        {...lastLayout}
      >
        {getFieldDecorator(valueName, options)(
          <Input.TextArea {...settings} />
        )}
      </FormItem>
    )
  }
}

MyInput.defaultProps = {
  layout: {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  },
  settings: {
    // type: 'text',
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
