import React from 'react'
import { connect } from 'dva'
import { Icon } from 'antd'
import styles from './index.less'

const Error = (loading) => <div className={styles.content}>
  <div className={`${styles.error} ${loading ? 'animated' : ''} headShake`}>
    <Icon type="frown-o" />
    <h1>404 Not Found</h1>
  </div>
</div>

export default connect()(Error)
