import React from 'react'
import PropTypes from 'prop-types'
import { Form, Checkbox, Row, Tooltip } from 'antd'
import styles from './index.less'

const FormItem = Form.Item

class MyCheckbox extends React.Component {
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
      son,
    } = this.props

    const {
      getFieldDecorator,
    } = form

    const {
      block,
    } = settings

    // 如果有传入样式定义使用传入值，如无使用默认值
    const lastLayout = settings.layout ? settings.layout : layout

    return (
      <FormItem
        label={fieldName}
        className={styles.outer}
        extra={settings.extra}
        {...lastLayout}
      >
        {getFieldDecorator(valueName, options)(
          <Checkbox.Group>
            <Row>
              {
                block ?
                  son.map((so, idx) => {
                    return (
                      <div key={idx}>
                        <Tooltip placement={so.placement || 'right'} title={so.tips}>
                          <Checkbox value={so.value}>{so.label}</Checkbox>
                        </Tooltip>
                      </div>
                    )
                  }) :
                  son.map((so, idx) => {
                    return (
                      <Tooltip key={idx} placement={so.placement || 'top'} title={so.tips}>
                        <Checkbox value={so.value}>{so.label}</Checkbox>
                      </Tooltip>
                    )
                  })
              }
            </Row>
          </Checkbox.Group>
        )}
      </FormItem>
    )
  }
}

MyCheckbox.defaultProps = {
  layout: {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  },
  settings: {
  },
  options: {},
}

MyCheckbox.propTypes = {
  fieldName: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  valueName: PropTypes.string.isRequired,
  settings: PropTypes.object,
  options: PropTypes.object,
}

export default MyCheckbox
