import React from 'react'
import PropTypes from 'prop-types'
import { Form, Cascader } from 'antd'
// import styles from '.'

const FormItem = Form.Item

class HelpPopup extends React.Component {
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
      options,
    } = this.props

    const {
      getFieldDecorator,
      getFieldProps,
      getFieldError,
    } = form

    // 如果有传入样式定义使用传入值，如无使用默认值
    const lastLayout = settings.layout ? settings.layout : layout

    function onChange(value, selectedOptions) {
      console.log(value, selectedOptions)
    }

    return (
      <FormItem
        label={fieldName}
        {...lastLayout}
      >
        {getFieldDecorator(valueName, options)(
          <Cascader
            onChange={onChange}
            {...settings}
          />
        )}
      </FormItem>
    )
  }
}

HelpPopup.defaultProps = {
  layout: {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  },
  settings: {},
  options: {},
}

HelpPopup.propTypes = {
  fieldName: PropTypes.string.isRequired,
  settings: PropTypes.object,
  form: PropTypes.object.isRequired,
  valueName: PropTypes.string.isRequired,
  options: PropTypes.object,
}

export default HelpPopup
