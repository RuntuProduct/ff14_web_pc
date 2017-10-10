import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Checkbox } from 'antd'
import { config } from '../../utils'
import styles from './index.less'

const FormItem = Form.Item

const Login = ({
  login,
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      values.loginType = '0'
      dispatch({ type: 'login/login', payload: values })
    })
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logo} />
        <span>{config.name}</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            initialValue: 'admin',
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" onPressEnter={handleOk} placeholder="用户名" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            initialValue: '11111',
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('rememberMe', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住我</Checkbox>)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading={loading['effects']['login/login']}>
            登录
          </Button>
        </Row>

      </form>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({ login, loading }) => ({ login, loading }))(Form.create()(Login))
