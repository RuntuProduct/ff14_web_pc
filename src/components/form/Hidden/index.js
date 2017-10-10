import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import styles from './index.less'

const FormItem = Form.Item

class HiddenCon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const {
      fieldName,
      form,
      valueName,
      options,
    } = this.props

    const {
      getFieldDecorator,
      getFieldProps,
      getFieldError,
    } = form

    return (
      <FormItem
        label={fieldName}
        className={styles.outer}
      >
        {getFieldDecorator(valueName, options)(
          <Input
            type="text"
          />
        )}
      </FormItem>
    )
  }
}

HiddenCon.defaultProps = {
  // dealMenuClick: false,
}

HiddenCon.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default HiddenCon
