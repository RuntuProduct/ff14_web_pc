import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Tooltip, message } from 'antd'
import CopyToClipboard from 'react-copy-to-clipboard';
import styles from './index.less'

const FormItem = Form.Item

class ViewItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const {
      fieldName,
      settings,
      value,
      layout,
    } = this.props
    const {
      copy,
    } = settings

    // 如果有传入样式定义使用传入值，如无使用默认值
    const lastLayout = settings.layout ? settings.layout : layout

    const copyDom = (value) => {
      return (
        <CopyToClipboard
          text={value}
          onCopy={() => message.success('复制成功')}
        >
          <Tooltip placement="top" title="复制内容">
            <Icon type="copy" className={styles.copy} />
          </Tooltip>
        </CopyToClipboard>
      )
    }

    const noCotent = () => {
      return <span className={styles.noContent}>无</span>
    }

    return (
      <FormItem
        label={fieldName}
        className={styles.outer}
        {...lastLayout}
      >
        <span className={styles.content}>
          {value || noCotent()}
          { copy && copyDom(value) }
        </span>
      </FormItem>
    )
  }
}

ViewItem.defaultProps = {
  layout: {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  },
  settings: {},
}

ViewItem.propTypes = {
  fieldName: PropTypes.string.isRequired,
  settings: PropTypes.object,
}

export default ViewItem
