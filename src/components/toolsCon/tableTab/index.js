import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import styles from './index.less'
import { Nor, Suc, Fail } from './components/tags'

class TableTabCon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { content } = this.props
    return (
      <div className={styles.tags}>
        <Icon type="check-circle" className={styles.icon} />
        <span className={styles.context}>{content}</span>
      </div>
    )
  }
}

TableTabCon.defaultProps = {
  // dealMenuClick: false,
}

TableTabCon.propTypes = {
}

TableTabCon.Nor = Nor
TableTabCon.Suc = Suc
TableTabCon.Fail = Fail

export default TableTabCon
