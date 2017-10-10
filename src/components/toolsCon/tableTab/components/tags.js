import React from 'react'
import PropTypes from 'prop-types'
import {  } from 'antd'
import styles from './tags.less'

class TagsCon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { className, props, content } = this.props
    return (
      <span className={className} {...props}>{content}</span>
    )
  }
}

const Nor = (props) => {
  return (
    <TagsCon className={styles.nor} {...props} />
  )
}

const Suc = (props) => {
  return (
    <TagsCon className={styles.suc} {...props} />
  )
}

const Fail = (props) => {
  return (
    <TagsCon className={styles.fail} {...props} />
  )
}

export {
  Nor,
  Suc,
  Fail,
}
