const webpack = require('webpack')

module.exports = function wp(webpackConfig, env) {
  // 对roadhog默认配置进行操作，比如：
  if (env === 'production') {
    // 上线环境使用分包打包方式  
    // webpackConfig.entry = {
    //   index: './src/index.js',
    //   vendor: [
    //     'moment',
    //     'mockjs',
    //     'lodash',
    //     'react',
    //     'react-dom',
    //     'react-helmet',
    //   ],
    //   antd: [
    //     'antd/lib/button',
    //     'antd/lib/icon',
    //     'antd/lib/table',
    //     'antd/lib/date-picker',
    //     'antd/lib/form',
    //     'antd/lib/modal',
    //     'antd/lib/grid',
    //     'antd/lib/input',
    //   ],
    // }
    // // webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    // webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    //   name: ['vendor', 'antd'],
    //   minChunks: Infinity,
    // }))
  }

  return webpackConfig
}
