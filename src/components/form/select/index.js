import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select } from 'antd'
import styles from './index.less'

const FormItem = Form.Item
const Option = Select.Option

class SelectCon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {
    const {
      fieldName,
      fieldInputType,
      settings,
      son,
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

    const errors = getFieldError(valueName)

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
          <Select style={{ width: 120 }} onChange={this.handleChange}>
            {
              son.map((so, idx) => {
                return (
                  <Option value={'' + so.value} key={idx}>
                    <span className={styles.outer}>
                      {so.img && <img className={styles.img} src={so.img} alt="img" />}
                      <span className={styles.label}>{so.label}</span>
                    </span>
                  </Option>
                )
              })
            }
          </Select>
        )}
      </FormItem>
    )
  }
}

SelectCon.defaultProps = {
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

SelectCon.propTypes = {
  fieldName: PropTypes.string.isRequired,
  settings: PropTypes.object,
  form: PropTypes.object.isRequired,
  valueName: PropTypes.string.isRequired,
  options: PropTypes.object,
}

export default SelectCon
