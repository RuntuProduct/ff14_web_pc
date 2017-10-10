import React from 'react'
import PropTypes from 'prop-types'
import {  } from 'antd'
import styles from './indexPage.less'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className={styles.body}>
        <img className={styles.homeImg} src="/login-bg.jpeg" alt="主页首图"/>
      </div>
    );
  }
}

Index.propTypes = {
  // dealMenuClick: PropTypes.bool,
}

export default Index
