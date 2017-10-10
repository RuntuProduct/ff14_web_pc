import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Helmet } from 'react-helmet'
// import {  } from 'antd'
import { config } from '@utils'
import * as styles from './app.less'
import '../themes/index.less'
import PageCon from './layout'

const App = ({ app, children, location, dispatch, loading }) => {
  const pageProps = {
    children,
    location,
  }
  return (
    <div className={styles.fh}>
      <Helmet>
        <title>{config.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {/*<link rel="icon" href={logo} type="image/x-icon" />*/}
        {/*引入字体样式文件，暂不使用*/}
        {/*{iconFontJS && <script src={iconFontJS}></script>}*/}
        {/*{iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}*/} 
      </Helmet>
      {/* 整个页面的主要样式结构 */}
      {
        (location.pathname !== '/login' && app.login) ?
          <PageCon {...pageProps} /> :
          children
      }
    </div>
  )
}

App.propTypes = {
  app: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
}

export default connect(({ app, loading }) => ({ app, loading }))(App)
