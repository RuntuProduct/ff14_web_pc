import React from 'react'
import PropTypes from 'prop-types'
import { Form, DatePicker } from 'antd'
// import styles from '.'

const { MonthPicker, RangePicker } = DatePicker

const FormItem = Form.Item

class DatePickerCon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
  }

  render() {
    const {
      fieldName,
      fieldInputType,
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

    const errors = getFieldError(valueName);

    // 如果有传入样式定义使用传入值，如无使用默认值
    const lastLayout = settings.layout ? settings.layout : layout

    return (
      <FormItem
        label={fieldName}
        {...lastLayout}
        validateStatus={errors ? errors.join(',') : ''}
        help={errors || ''}
      >
        {getFieldDecorator(valueName, options)(
          <RangePicker
            onChange={this.onChange}
            format={settings.format || 'YYYY-MM-DD'}
            showTime={settings.showTime}
          />
        )}
      </FormItem>
    )
  }
}

DatePickerCon.defaultProps = {
  fieldName: '',
  layout: {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  },
  settings: {
  },
  valueName: '',
  options: {},
}

DatePickerCon.propTypes = {
  fieldName: PropTypes.string.isRequired,
  settings: PropTypes.object,
  form: PropTypes.object.isRequired,
  valueName: PropTypes.string.isRequired,
  options: PropTypes.object,
}

export default DatePickerCon
