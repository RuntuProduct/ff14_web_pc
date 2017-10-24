import React from 'react'
import PropTypes from 'prop-types'
import { Form, Radio, Tooltip } from 'antd'
import styles from './index.less'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class RadioCon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const {
      radioType,
      fieldName,
      settings,
      form,
      layout,
      valueName,
      options,
      son,
    } = this.props

    const {
      getFieldDecorator,
      getFieldProps,
      getFieldError,
    } = form

    // 如果有传入样式定义使用传入值，如无使用默认值
    const lastLayout = settings.layout ? settings.layout : layout

    return (
      <FormItem
        label={fieldName}
        extra={settings.extra}
        className={styles.outer}
        {...lastLayout}
      >
        {
          radioType === 'radioButton' ?
            getFieldDecorator(valueName, options)(
              <RadioGroup size="large">
                {
                  son.map((so, idx) => {
                    return (
                      <Tooltip key={idx} placement={so.placement || 'top'} title={so.tips}>
                        <RadioButton value={so.value} className={so.img ? styles.imgRadio : ''}>
                          <span className={styles.outer}>
                            {so.img && <img className={styles.img} src={so.img} alt="img" />}
                            <span className={styles.label}>{so.label}</span>
                          </span>
                        </RadioButton>
                      </Tooltip>
                    )
                  })
                }
              </RadioGroup>
            ) :
            ''
        }
      </FormItem>
    )
  }
}

RadioCon.defaultProps = {
  settings: {},
  layout: {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  },
  radioType: 'radioButton',
}

RadioCon.propTypes = {
  radioType: PropTypes.string,
}

export default RadioCon
